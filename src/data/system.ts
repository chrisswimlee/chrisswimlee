/**
 * The home page: my career drawn as a system diagram.
 *
 * Each lane is one job (or my own studio). Inside a lane, boxes are systems I
 * built and dashed boxes are the outside world they talk to. Arrows are data
 * flowing between them. Every built box opens the same case study the
 * Experience page uses (problem, constraint, decision, outcome).
 */
import { education, projects, roles, type RoleProject } from './site';

export type NodeKind = 'service' | 'model' | 'agent' | 'api' | 'app' | 'gateway' | 'infra' | 'suite' | 'course' | 'site' | 'source' | 'sink';

export type SysLink = { label: string; href: string };

export type SysNode = {
  id: string;
  kind: NodeKind;
  title: string;
  /** One line under the title, usually the number that matters. */
  metric?: string;
  stack?: string[];
  /** Grid placement inside the lane on wide screens. */
  col: number;
  row: number;
  rowSpan?: number;
  /** Outside systems are drawn dashed and do not open a case study. */
  external?: boolean;
  status?: 'live' | 'shipped' | 'building';
  detail?: {
    lede: string;
    brief?: RoleProject['brief'];
    points: string[];
    links: SysLink[];
  };
};

export type SysEdge = { from: string; to: string; label?: string; style?: 'test' };

export type Lane = {
  id: string;
  index: string;
  org: string;
  role: string;
  dates: string;
  place: string;
  status: 'running' | 'shipped';
  summary: string;
  cols: number;
  rows: number;
  nodes: SysNode[];
  edges: SysEdge[];
  more?: SysLink;
};

const role = (id: string) => {
  const r = roles.find((x) => x.id === id);
  if (!r) throw new Error(`Missing role ${id}`);
  return r;
};
const proj = (roleId: string, id: string) => {
  const p = role(roleId).projects.find((x) => x.id === id);
  if (!p) throw new Error(`Missing project ${id}`);
  return p;
};
const site = (id: string) => {
  const p = projects.find((x) => x.id === id);
  if (!p) throw new Error(`Missing site project ${id}`);
  return p;
};

/** A box for a system I built at a job, filled from that job's write-up. */
function built(
  roleId: string,
  id: string,
  kind: NodeKind,
  at: { col: number; row: number; rowSpan?: number },
  metric?: string,
): SysNode {
  const p = proj(roleId, id);
  return {
    id,
    kind,
    title: p.title,
    metric: metric ?? p.oneLiner,
    stack: p.stack,
    ...at,
    status: 'shipped',
    detail: {
      lede: p.oneLiner,
      brief: p.brief,
      points: p.points,
      links: [...(p.links ?? []), { label: 'Full role on Experience', href: `/experience/#${roleId}` }],
    },
  };
}

/** A dashed box for the world outside: a feed, a team, a client. */
const outside = (id: string, kind: 'source' | 'sink', title: string, at: { col: number; row: number; rowSpan?: number }, metric?: string): SysNode => ({
  id,
  kind,
  title,
  metric,
  external: true,
  ...at,
});

/** A box for something I shipped on my own, filled from its project card. */
function product(id: string, kind: NodeKind, at: { col: number; row: number; rowSpan?: number }, stack: string[], status: SysNode['status'] = 'live', metric?: string): SysNode {
  const p = site(id);
  return {
    id,
    kind,
    title: p.title,
    metric: metric ?? p.summary,
    stack,
    ...at,
    status,
    detail: { lede: p.summary, points: p.points, links: p.links },
  };
}

const hait = role('hait');
const stealth = role('stealth');
const goldman = role('goldman');
const onedave = role('onedave');

export const lanes: Lane[] = [
  {
    id: 'localhost',
    index: '01',
    org: 'local-host.ai',
    role: 'Founder · open source',
    dates: '2026 — present',
    place: 'On the Mac',
    status: 'running',
    summary: 'Software that runs on your own computer. Nothing leaves the machine unless you ask.',
    cols: 3,
    rows: 2,
    nodes: [
      outside('cc-voice', 'source', 'Speaker + mic', { col: 1, row: 1 }, 'a talk, a class, a meeting'),
      product('connectingCaptions', 'app', { col: 2, row: 1 }, ['macOS', 'Apple Speech', 'On-device Translation', 'GPLv3'], 'live', 'Live subtitles, translated on the Mac'),
      outside('cc-room', 'sink', 'The room', { col: 3, row: 1 }, 'a Theater window over the slides'),
      outside('lattice-apps', 'source', 'Your apps', { col: 1, row: 2 }, 'anything that speaks the OpenAI API'),
      product('lattice', 'gateway', { col: 2, row: 2 }, ['Python', 'OpenAI API', 'PyPI'], 'live', 'Ask for a role, it picks the model'),
      outside('lattice-models', 'sink', 'Local + cloud models', { col: 3, row: 2 }, 'MLX · LM Studio · a cloud key'),
    ],
    edges: [
      { from: 'cc-voice', to: 'connectingCaptions', label: 'speech' },
      { from: 'connectingCaptions', to: 'cc-room', label: 'captions' },
      { from: 'lattice-apps', to: 'lattice', label: 'API' },
      { from: 'lattice', to: 'lattice-models', label: 'route' },
    ],
    more: { label: 'local-host.ai', href: 'https://local-host.ai' },
  },
  {
    id: 'stealth',
    index: '02',
    org: stealth.company,
    role: stealth.title,
    dates: stealth.dates,
    place: stealth.location,
    status: 'shipped',
    summary: 'A live crypto futures engine, the models on top of it, and agents that write the morning brief.',
    cols: 4,
    rows: 3,
    nodes: [
      // listed in reading order for phones, where the lane becomes one column
      outside('kraken', 'source', 'Kraken futures', { col: 1, row: 1 }, 'official market feed'),
      built('stealth', 'stealth-ingest', 'service', { col: 2, row: 1 }, '< 100ms feed to book'),
      built('stealth', 'stealth-forecast', 'model', { col: 3, row: 1 }, 'retrains around the clock'),
      outside('headlines', 'source', 'Live headlines', { col: 1, row: 2 }),
      built('stealth', 'stealth-news', 'model', { col: 2, row: 2 }, 'headlines in, pivot flags out'),
      outside('ledger', 'source', 'SQL ledger', { col: 3, row: 3 }, 'the book of record'),
      built('stealth', 'stealth-agents', 'agent', { col: 4, row: 2 }, 'morning analysis down 90%'),
      outside('desk', 'sink', 'Trading desk', { col: 4, row: 3 }, 'reads the brief before the open'),
    ],
    edges: [
      { from: 'kraken', to: 'stealth-ingest', label: 'ticks' },
      { from: 'stealth-ingest', to: 'stealth-forecast', label: 'Kafka' },
      { from: 'headlines', to: 'stealth-news', label: 'text' },
      { from: 'stealth-forecast', to: 'stealth-agents', label: 'signals' },
      { from: 'stealth-news', to: 'stealth-agents', label: 'flags' },
      { from: 'ledger', to: 'stealth-agents', label: 'SQL' },
      { from: 'stealth-agents', to: 'desk', label: 'brief' },
    ],
    more: { label: 'Full role', href: '/experience/#stealth' },
  },
  {
    id: 'goldman',
    index: '03',
    org: goldman.company,
    role: goldman.title,
    dates: goldman.dates,
    place: goldman.location,
    status: 'shipped',
    summary: 'Account data for 10,000+ clients, shared with 50+ teams, reported once for developers, traders, and lawyers.',
    cols: 4,
    rows: 2,
    nodes: [
      outside('gs-accounts', 'source', 'Client accounts', { col: 1, row: 1 }, '10,000+'),
      built('goldman', 'gs-beneficiary', 'service', { col: 2, row: 1 }, 'processing time down 80%'),
      built('goldman', 'gs-apis', 'api', { col: 3, row: 1 }, '50+ teams · latency down 15%'),
      outside('gs-teams', 'sink', '50+ internal teams', { col: 4, row: 1 }),
      built('goldman', 'gs-test', 'suite', { col: 2, row: 2 }, 'test accuracy up 22%'),
      built('goldman', 'gs-forward', 'service', { col: 3, row: 2 }, 'one report all three sign off on'),
      outside('gs-signoff', 'sink', 'Developers · traders · lawyers', { col: 4, row: 2 }),
    ],
    edges: [
      { from: 'gs-accounts', to: 'gs-beneficiary', label: 'data' },
      { from: 'gs-beneficiary', to: 'gs-apis', label: 'Kafka' },
      { from: 'gs-apis', to: 'gs-teams', label: 'REST' },
      { from: 'gs-test', to: 'gs-apis', label: 'tests', style: 'test' },
      { from: 'gs-apis', to: 'gs-forward', label: 'numbers' },
      { from: 'gs-forward', to: 'gs-signoff', label: 'report' },
    ],
    more: { label: 'Full role', href: '/experience/#goldman' },
  },
  {
    id: 'hait',
    index: '04',
    org: hait.company,
    role: hait.title,
    dates: hait.dates,
    place: hait.location,
    status: 'running',
    summary: 'The school’s IT and public site, its first AI course, and agents students can run.',
    cols: 3,
    rows: 3,
    nodes: [
      built('hait', 'hait-it', 'infra', { col: 1, row: 1 }, 'hosting and security'),
      built('hait', 'hait-site', 'site', { col: 2, row: 1 }, 'haitedu.com, rebuilt'),
      outside('hait-public', 'sink', 'The public', { col: 3, row: 1 }),
      built('hait', 'hait-curriculum', 'course', { col: 1, row: 2 }, 'the school’s first AI course'),
      built('hait', 'hait-agents', 'agent', { col: 2, row: 3 }, 'OpenClaw + OpenAgent'),
      outside('hait-students', 'sink', 'Students + staff', { col: 3, row: 2, rowSpan: 2 }, 'the first cohort'),
    ],
    edges: [
      { from: 'hait-it', to: 'hait-site', label: 'host' },
      { from: 'hait-site', to: 'hait-public', label: 'HTTPS' },
      { from: 'hait-curriculum', to: 'hait-students', label: 'lessons' },
      { from: 'hait-curriculum', to: 'hait-agents', label: 'labs' },
      { from: 'hait-agents', to: 'hait-students', label: 'agents' },
    ],
    more: { label: 'Full role', href: '/experience/#hait' },
  },
  {
    id: 'onedave',
    index: '05',
    org: onedave.company,
    role: onedave.title,
    dates: onedave.dates,
    place: onedave.location,
    status: 'shipped',
    summary: 'Inventory for a nuclear contractor, a faster mail path, and defense web apps reviewed from the first ticket.',
    cols: 2,
    rows: 3,
    nodes: [
      built('onedave', 'od-curtis', 'service', { col: 1, row: 1 }, 'pipelines + the screens on top'),
      outside('od-curtis-out', 'sink', 'Curtis', { col: 2, row: 1 }, 'government nuclear contractor'),
      built('onedave', 'od-email', 'infra', { col: 1, row: 2 }, 'server response down 70%'),
      outside('od-clients', 'sink', 'Client mail', { col: 2, row: 2 }),
      built('onedave', 'od-defense', 'app', { col: 1, row: 3 }, 'security review from ticket one'),
      outside('od-defense-out', 'sink', 'Defense clients', { col: 2, row: 3 }),
    ],
    edges: [
      { from: 'od-curtis', to: 'od-curtis-out', label: 'stock' },
      { from: 'od-email', to: 'od-clients', label: 'mail' },
      { from: 'od-defense', to: 'od-defense-out', label: 'apps' },
    ],
    more: { label: 'Full role', href: '/experience/#onedave' },
  },
];

/** Smaller things I shipped, shown as a row of boxes under the lanes. */
export const shipped: SysNode[] = [
  {
    id: 'world',
    kind: 'app',
    title: 'The Developer’s World',
    metric: 'a pixel town engine, from scratch',
    stack: ['TypeScript', 'Canvas 2D', 'A* pathfinding'],
    col: 1,
    row: 1,
    status: 'live',
    detail: {
      lede: 'A walkable pixel-art town where every building is one of my jobs or projects.',
      points: [
        'No game engine and no image files: every tile, building, and character is drawn in code.',
        'Tile collision, A* pathfinding for click-to-walk, depth sorting, and a day/night lighting pass tied to the site theme.',
        'Keyboard, mouse, and touch controls, plus a text version for screen readers.',
      ],
      links: [{ label: 'Walk around the town', href: '/town/' }],
    },
  },
  product('phonecoding', 'app', { col: 2, row: 1 }, ['SwiftUI', 'iOS'], 'building', 'SwiftUI apps from the phone you’re holding'),
  product('deskbreak', 'app', { col: 3, row: 1 }, ['macOS', 'menu bar', 'MIT'], 'live', 'a menu-bar timer that tells you to stand'),
  product('d22soso', 'site', { col: 4, row: 1 }, ['3D', 'web'], 'live', 'a 3D archive of a champion’s career'),
  product('2handholdem', 'site', { col: 5, row: 1 }, ['web', 'iPhone'], 'live', 'a patented table game, playable in the browser'),
];

export const schools = education.map((e) => ({ school: e.school, degree: e.degree, dates: e.dates, note: e.note }));

export const kindLabel: Record<NodeKind, string> = {
  service: 'service',
  model: 'model',
  agent: 'agent',
  api: 'api',
  app: 'app',
  gateway: 'gateway',
  infra: 'infra',
  suite: 'test suite',
  course: 'course',
  site: 'site',
  source: 'input',
  sink: 'output',
};

/** Old links from the 3D sky and the town still land somewhere sensible. */
export const legacyToTown = ['townhall', 'study', 'trine', 'trinity', 'play', 'hct-2016-spring', 'americas-2016', 'hct-2017-summer', 'wild-2019', 'americas-2025', 'achievements', 'mail', 'welcome', 'record'];
export const legacyAlias: Record<string, string> = {
  work: 'stealth',
  projects: 'localhost',
  'local-host-site': 'localhost',
  haitedu: 'hait-site',
  phone: 'phonecoding',
};
