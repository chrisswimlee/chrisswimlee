export type RoleId = 'role:coder' | 'role:reasoner' | 'role:fast';
export type BackendId = 'mlx' | 'lm-studio' | 'cloud';
export type SwarmVerb = 'fanout' | 'vote' | 'pipeline' | 'debate';

export type Backend = {
  id: BackendId;
  label: string;
  kind: 'local' | 'cloud';
  available: boolean;
  models: Record<RoleId, string>;
};

export type Assignment = {
  role: RoleId;
  backend: BackendId;
  model: string;
  fallback: boolean;
};

export const ROLES: { id: RoleId; label: string; hint: string }[] = [
  { id: 'role:coder', label: 'role:coder', hint: 'implementation' },
  { id: 'role:reasoner', label: 'role:reasoner', hint: 'plan / judge' },
  { id: 'role:fast', label: 'role:fast', hint: 'low latency' },
];

export const BACKENDS: Backend[] = [
  {
    id: 'mlx',
    label: 'MLX',
    kind: 'local',
    available: true,
    models: {
      'role:coder': 'qwen2.5-coder-14b',
      'role:reasoner': 'qwen2.5-32b',
      'role:fast': 'qwen2.5-7b',
    },
  },
  {
    id: 'lm-studio',
    label: 'LM Studio',
    kind: 'local',
    available: true,
    models: {
      'role:coder': 'qwen2.5-coder-14b',
      'role:reasoner': 'llama-3.3-70b',
      'role:fast': 'llama-3.2-3b',
    },
  },
  {
    id: 'cloud',
    label: 'Cloud',
    kind: 'cloud',
    available: true,
    models: {
      'role:coder': 'gpt-4.1',
      'role:reasoner': 'o4-mini',
      'role:fast': 'gpt-4.1-mini',
    },
  },
];

export const SWARMS: { id: SwarmVerb; path: string; hint: string }[] = [
  { id: 'fanout', path: '/swarm/fanout', hint: 'same prompt → N models' },
  { id: 'vote', path: '/swarm/vote', hint: 'fanout + judge' },
  { id: 'pipeline', path: '/swarm/pipeline', hint: 'plan → code → review' },
  { id: 'debate', path: '/swarm/debate', hint: 'argue, then synthesize' },
];

const LOCAL_ORDER: BackendId[] = ['mlx', 'lm-studio', 'cloud'];

export function parseRole(model: string): RoleId | null {
  const value = model.trim();
  if (value === 'role:coder' || value === 'role:reasoner' || value === 'role:fast') return value;
  return null;
}

export function route(
  role: RoleId,
  backends: Backend[] = BACKENDS,
  opts: { prefer?: BackendId; localDown?: BackendId[] } = {},
): Assignment {
  const down = new Set(opts.localDown ?? []);
  const live = backends.filter((backend) => backend.available && !down.has(backend.id));
  const order = opts.prefer
    ? [opts.prefer, ...LOCAL_ORDER.filter((id) => id !== opts.prefer)]
    : LOCAL_ORDER;

  for (const id of order) {
    const backend = live.find((item) => item.id === id);
    if (!backend) continue;
    const model = backend.models[role];
    if (!model) continue;
    return {
      role,
      backend: backend.id,
      model,
      fallback: backend.kind === 'cloud',
    };
  }

  throw new Error(`No backend can serve ${role}`);
}

export function chatRequest(role: RoleId, content: string) {
  return {
    model: role,
    messages: [{ role: 'user' as const, content }],
  };
}

const FIXTURES: Record<RoleId, string> = {
  'role:coder':
    'def route(role, backends):\n    for backend in prefer_local(backends):\n        if backend.serves(role):\n            return backend.assign(role)\n    return cloud_fallback(role)',
  'role:reasoner':
    'Constraint first: agents must ask for a capability, not a model string. Local backends win unless they are down. Cloud is the fallback, never the default.',
  'role:fast': 'pong · role:fast · mlx:qwen2.5-7b',
};

export function complete(assignment: Assignment, content: string, started = 12) {
  const text = FIXTURES[assignment.role];
  return {
    id: `chatcmpl-lattice-${assignment.role.slice(5)}`,
    object: 'chat.completion',
    created: 1_725_000_000,
    model: assignment.model,
    choices: [
      {
        index: 0,
        message: { role: 'assistant' as const, content: text },
        finish_reason: 'stop',
      },
    ],
    usage: { prompt_tokens: Math.max(8, content.length / 4), completion_tokens: 48, total_tokens: 56 },
    lattice: {
      role: assignment.role,
      backend: assignment.backend,
      fallback: assignment.fallback,
      fixture: true,
    },
    headers: {
      'X-Lattice-Resolved-Role': assignment.role,
      'X-Lattice-Backend': assignment.backend,
      'X-Lattice-Model': assignment.model,
      'X-Lattice-Resolve-Ms': String(started),
    },
  };
}

export function swarm(verb: SwarmVerb, content: string, backends: Backend[] = BACKENDS) {
  if (verb === 'fanout') {
    const hops = ROLES.map((role) => route(role.id, backends));
    return {
      object: 'swarm.fanout',
      path: '/swarm/fanout',
      n: hops.length,
      candidates: hops.map((hop) => ({
        role: hop.role,
        backend: hop.backend,
        model: hop.model,
        text: FIXTURES[hop.role],
      })),
    };
  }

  if (verb === 'vote') {
    const hops = ROLES.map((role) => route(role.id, backends));
    const judge = route('role:reasoner', backends);
    return {
      object: 'chat.completion',
      model: judge.model,
      path: '/swarm/vote',
      choices: [
        {
          index: 0,
          message: { role: 'assistant', content: FIXTURES['role:reasoner'] },
          finish_reason: 'stop',
        },
      ],
      swarm: {
        strategy: 'vote',
        judge: judge.role,
        winner: hops[1].role,
        candidates: hops.map((hop) => hop.role),
      },
      lattice: { fixture: true, backend: judge.backend },
    };
  }

  if (verb === 'pipeline') {
    const steps = [
      { name: 'plan', role: 'role:reasoner' as const },
      { name: 'code', role: 'role:coder' as const },
      { name: 'review', role: 'role:reasoner' as const },
    ].map((step) => ({ ...step, ...route(step.role, backends) }));
    const last = steps[steps.length - 1];
    return {
      object: 'chat.completion',
      model: last.model,
      path: '/swarm/pipeline',
      choices: [
        {
          index: 0,
          message: { role: 'assistant', content: FIXTURES['role:coder'] },
          finish_reason: 'stop',
        },
      ],
      swarm: {
        strategy: 'pipeline',
        history: steps.map((step) => ({ name: step.name, role: step.role, model: step.model })),
      },
      lattice: { fixture: true, prompt: content.slice(0, 80) },
    };
  }

  const sides = [route('role:coder', backends), route('role:reasoner', backends)];
  const judge = route('role:reasoner', backends);
  return {
    object: 'chat.completion',
    model: judge.model,
    path: '/swarm/debate',
    choices: [
      {
        index: 0,
        message: { role: 'assistant', content: FIXTURES['role:reasoner'] },
        finish_reason: 'stop',
      },
    ],
    swarm: {
      strategy: 'debate',
      judge: judge.role,
      sides: sides.map((side) => side.role),
    },
    lattice: { fixture: true, backend: judge.backend },
  };
}

export function assignLog(assignment: Assignment) {
  const via = assignment.fallback ? 'cloud fallback' : assignment.backend;
  return `assign             ${assignment.role} → ${via}:${assignment.model}`;
}
