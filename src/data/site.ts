export const site = {
  name: 'Chris Swim Lee',
  legalName: 'Chris Su-Young Lee',
  title: 'Chris Swim Lee, New York',
  description:
    'Senior engineer in New York. Six years in data pipelines, agents, and application systems — Goldman infrastructure, a founding year on an agent stack, and Local Lattice on PyPI.',
  url: 'https://chrisswimlee.com',
  location: 'New York, NY',
  email: 'suyoung.lee99@gmail.com',
  github: 'https://github.com/chrisswimlee',
  linkedin: 'https://www.linkedin.com/in/chris-suyoung-lee',
  photo: '/images/chris.jpg',
  ogImage: '/images/chris-og.jpg',
  jobTitle: 'Senior Engineer',
  built: 'Astro. No React. Custom canvas topologies. Printable CV.',
};

export const nav = [
  { href: '/#systems', label: 'Systems' },
  { href: '/#work', label: 'Work' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#about', label: 'About' },
];

export const briefMail = `mailto:suyoung.lee99@gmail.com?subject=${encodeURIComponent('Consulting — Chris Swim Lee')}&body=${encodeURIComponent('What the company does:\n\nWhat’s stuck (data / automation / agents):\n\nWhere you are (city / remote):\n')}`;
export const hireMail = `mailto:suyoung.lee99@gmail.com?subject=${encodeURIComponent('Role — Chris Swim Lee')}&body=${encodeURIComponent('Role / company:\n\nWhat you need:\n\nWhere (city / remote):\n')}`;
export const tutorMail = `mailto:suyoung.lee99@gmail.com?subject=${encodeURIComponent('Tutoring — software and math')}`;

export const hero = {
  kicker: 'Senior engineer · New York',
  lede: 'Data pipelines, agents, and the systems under them. Six years — Goldman infrastructure, then a founding year on an agent stack.',
  stack: ['Java', 'Python', 'Kafka', 'PyTorch', 'MLX', 'SQL'],
};

export const tutor = {
  title: 'Software and math',
  lede: 'One-to-one. Separate from the consulting.',
  paragraphs: [
    'I tutor software development and math — I studied both at Trinity. Students, career-switchers, interview prep. 60-minute sessions, remote or in New York.',
    'Email me what you’re working on and I’ll reply with times.',
  ],
  cta: 'Email about tutoring',
  href: tutorMail,
};

export const experienceIntro = 'Goldman, a founding year on an agent stack, then the systems I can put a URL on.';

type Spike = {
  id: 'theory' | 'build' | 'strategy';
  label: string;
  domain: string;
  trains: string;
  proof: string[];
};

export const range = {
  lede: 'Math, systems, and a competitive streak. Deep in each.',
  thread:
    'The degree, the ladder, and Goldman look unrelated until you watch how I work.',
  meet: 'Read what you cannot see. Prove the constraint. Ship before the brief goes stale.',
  spikes: [
    {
      id: 'theory',
      label: 'Pure theory',
      domain: 'Formal mathematics',
      trains: 'I prove it before I write it.',
      proof: [
        'B.S. in Computer Science and Mathematics, Trinity College.',
        '1823 Scholar — full-ride scholarship.',
        'M.S. Information Studies, 2026.',
      ],
    },
    {
      id: 'build',
      label: 'Implementation',
      domain: 'Enterprise and AI engineering',
      trains: 'Infrastructure on a deadline, with the pager on.',
      proof: [
        'Three years at Goldman Sachs — 10,000+ accounts, 50+ internal teams on the APIs.',
        'Founding engineer on an agentic trading engine, zero to one.',
        'Local Lattice — an OpenAI-compatible gateway, published on PyPI.',
      ],
    },
    {
      id: 'strategy',
      label: 'Strategic execution',
      domain: 'Competitive meta and rapid learning',
      trains: 'A clock, a hidden hand, then a system I have not seen yet.',
      proof: [
        '#1 on the Hearthstone Americas Wild ladder — January 2019, again November 2025.',
        '#1 seed for the 2019 Wild Open. HCT Tavern Champion, 2017.',
        'New stack, new constraint — I learn it and ship.',
      ],
    },
  ] as Spike[],
};

type Proof = {
  prefix?: string;
  value: number | string;
  suffix: string;
  label: string;
  hint: string;
};

export const proof: Proof[] = [
  { value: 10000, suffix: '+', label: 'client accounts', hint: 'Goldman beneficiary system' },
  { value: 80, suffix: '%', label: 'faster processing', hint: 'data pipeline rewrite' },
  { value: 50, suffix: '+', label: 'internal teams', hint: 'Java and Kafka APIs' },
  { value: 'PyPI', suffix: '', label: 'local-lattice', hint: 'OpenAI-compatible gateway' },
];

type CaseBrief = {
  problem: string;
  constraint: string;
  decision: string;
  outcome: string;
  interfaces?: string;
  again?: string;
};

export const cases: Record<'lattice' | 'goldman' | 'trading', CaseBrief> = {
  lattice: {
    problem: 'Agents were bound to model strings. Switching a backend meant rewriting the call site.',
    constraint: 'Local-first — MLX and LM Studio — without locking out cloud when a role needs it.',
    decision: 'An OpenAI-compatible gateway. Assign role:coder, role:reasoner, role:fast. Swarm primitives over HTTP.',
    outcome: 'Published on PyPI, Apache-2.0. Agents ask for a capability and get a model back. The console on this page runs the same router.',
  },
  goldman: {
    problem: 'Beneficiary data for 10,000+ client accounts was too slow to operate.',
    constraint: 'Compliance, 50+ internal consumers, and the pager after it shipped.',
    decision:
      'Java and Kafka on beneficiary.* plus REST /v1/accounts. TestNG and Selenium on the KYC and compliance cases. Stayed on the line.',
    outcome: '80% faster processing. 15% lower data-access latency. Test accuracy up 22%.',
    interfaces: 'kafka topic beneficiary.* · REST /v1/accounts · TestNG + Selenium KYC',
    again: 'I would split the batch job from the serving path earlier. The 80% was the pipeline; the pager was the coupling.',
  },
  trading: {
    problem: 'A stealth desk needed market-data in and signals out. No pipeline existed.',
    constraint: 'Multiple exchanges, a legacy SQL book. The product cannot be shown.',
    decision: 'Python and Kafka across the feeds. Agents audit SQL. A PyTorch brief on a clock.',
    outcome: 'Zero to one on a clock the desk can run.',
  },
};

type System = {
  id: 'lattice' | 'goldman' | 'trading';
  kind: string;
  year: string;
  kicker: string;
  title: string;
  metric: string;
  metricLabel: string;
  summary: string;
  stack: string[];
  href?: string;
  command?: string;
};

export const systems: System[] = [
  {
    id: 'lattice',
    kind: 'Open source',
    year: '2026',
    kicker: 'Apache-2.0 · PyPI',
    title: 'Local Lattice',
    metric: 'role:*',
    metricLabel: 'capability, not a model string',
    summary:
      'Local-first OpenAI-compatible gateway. Plug MLX, LM Studio, or cloud into Lattice, then assign the role switch. Agents ask for coder or reasoner — not a model string.',
    stack: ['Python', 'MLX', 'OpenAI API', 'Swarm'],
    href: 'https://github.com/chrisswimlee/local-lattice',
    command: 'pip install local-lattice',
  },
  {
    id: 'goldman',
    kind: 'System',
    year: '2022–25',
    kicker: 'Goldman Sachs · 2022–2025',
    title: 'Beneficiary management',
    metric: '80%',
    metricLabel: 'faster processing, 10k+ accounts',
    summary:
      'Designed and shipped the beneficiary system behind 10,000+ client accounts. Java and Kafka pipelines used by 50+ internal teams. Stayed on the line after it shipped.',
    stack: ['Java', 'Kafka', 'REST', 'Selenium'],
  },
  {
    id: 'trading',
    kind: 'System',
    year: '2025–26',
    kicker: 'Stealth fintech · founding',
    title: 'Agentic trading engine',
    metric: '0 → 1',
    metricLabel: 'market-data to live signals',
    summary:
      'Python and Kafka across multiple exchanges. Agents that audit portfolios against legacy SQL. PyTorch time-series, backtests, and a daily pre-market brief.',
    stack: ['Python', 'Kafka', 'PyTorch', 'LLMs'],
  },
];

export const work = {
  lede: 'Two sites you can open.',
};

type Project = {
  id: string;
  featured: boolean;
  tone: 'accent' | 'warm';
  kind: string;
  title: string;
  url: string;
  year: string;
  summary: string;
  image?: string;
  points: string[];
  tags: string[];
  command?: string;
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: 'lattice',
    featured: false,
    tone: 'accent',
    kind: 'Open source',
    title: 'Local Lattice',
    url: 'pypi.org/project/local-lattice',
    year: '2026',
    summary:
      'Local-first OpenAI-compatible gateway. Plug MLX, LM Studio, or cloud into Lattice, then assign the role switch. Agents ask for a capability and get a model back.',
    points: [
      'Backends fit in — MLX, LM Studio, cloud — then you assign role:coder, role:reasoner, role:fast.',
      'Swarm primitives as HTTP: fanout, vote, pipeline, debate.',
      'Admission queue and a hybrid local + cloud swarm, MLX-native. Apache-2.0.',
    ],
    tags: ['Python', 'MLX', 'OpenAI API', 'Apache-2.0'],
    command: 'pip install local-lattice',
    links: [
      { label: 'GitHub', href: 'https://github.com/chrisswimlee/local-lattice' },
      { label: 'PyPI', href: 'https://pypi.org/project/local-lattice/' },
    ],
  },
  {
    id: 'haitedu',
    featured: true,
    tone: 'accent',
    kind: 'Site',
    title: 'HAIT',
    url: 'haitedu.com',
    year: '2025',
    summary:
      'The public site for HAIT, an AI university in Chiang Rai still recruiting before there is a campus. I built the site and the systems behind it.',
    image: '/images/work/haitedu.jpg',
    points: [
      'Redesigned the front-end and upgraded the PHP underneath it.',
      'The sites were slow. I reconfigured them so they run.',
      'Now designing their IT systems — hosting, security, and the stack the school will run on.',
    ],
    tags: ['Chiang Rai', 'Pre-opening', 'AI engineering'],
    links: [{ label: 'Live site', href: 'https://haitedu.com' }],
  },
  {
    id: 'd22soso',
    featured: true,
    tone: 'warm',
    kind: 'Site',
    title: 'D22-soso',
    url: 'd22soso.com',
    year: '2025',
    summary:
      'A site for Wayne “D22-soso” Chiang — 1999 Brood War World Champion, WSOP talent manager, and inventor of 2 Hand Hold’em.',
    image: '/images/work/d22soso.jpg',
    points: [
      'Championship record, WSOP media, and the patented two-hand game, on one site.',
      'Playable pieces in the record — a Random race roll and an in-site 2HH table.',
    ],
    tags: ['Brood War', 'WSOP', '2 Hand Hold’em'],
    links: [{ label: 'Live site', href: 'https://d22soso.com' }],
  },
];

export const roles = [
  {
    company: 'HAIT',
    title: 'Technical Lead',
    dates: '2025 — present',
    location: 'Chiang Rai, remote',
    note: 'Public site and IT systems',
    scan: 'Public site, hosting, and the stack before there is a campus.',
    bullets: [
      'Own the IT — hosting, security, and the stack the school runs on.',
      'Rebuilt the public site and the PHP under it so recruiting works.',
      'Standing up the systems a new institution needs before it has a campus.',
    ],
  },
  {
    company: 'Stealth fintech',
    title: 'Lead Founding AI Engineer',
    dates: 'Sep 2025 — Aug 2026',
    location: 'New York',
    note: 'Agentic stock trading engine, zero to one',
    scan: 'Zero to one: market-data to live signals on a founding clock.',
    bullets: [
      'Built the Python and Kafka market-data pipeline the agents traded on, across multiple exchanges.',
      'Built the agent loop that audits portfolios against legacy SQL with modern LLMs.',
      'Owned MLOps: PyTorch time-series models, live signals, backtesting, and daily pre-market briefings.',
    ],
  },
  {
    company: 'Goldman Sachs',
    title: 'Full Stack Engineer',
    dates: 'May 2022 — Jul 2025',
    location: 'New York',
    note: 'Forward deployment and automation',
    scan: '80% faster processing. 10,000+ accounts. 50+ internal teams.',
    bullets: [
      'Designed and shipped a beneficiary management system serving 10,000+ client accounts and cut data processing time by 80%.',
      'Scaled Java and Kafka pipelines and REST APIs used by 50+ internal teams, cutting data-access latency by 15%.',
      'Built a Selenium and TestNG suite that raised test accuracy 22% across hundreds of financial and compliance scenarios, and stayed on the line for trading, compliance, and market-data APIs after they shipped.',
    ],
  },
  {
    company: 'One Dave Software',
    title: 'Full Stack Software Engineer',
    dates: 'Oct 2020 — May 2022',
    location: '',
    note: '',
    scan: 'Full-stack for defense and nuclear. Email path 70% faster.',
    bullets: [
      'Built and maintained full-stack web applications for clients in national defense and nuclear energy.',
      'Led a system-wide upgrade that improved email server response time by 70%.',
    ],
  },
];

export const education = [
  {
    school: 'Trine University',
    degree: 'M.S. Information Studies',
    dates: 'Graduated May 2026',
    note: '',
  },
  {
    school: 'Trinity College, Hartford',
    degree: 'B.S. Computer Science and Mathematics',
    dates: 'May 2020',
    note: '1823 Scholar — full-ride scholarship',
  },
];

export const achievements = [
  {
    title: 'Professional Hearthstone, Americas',
    detail:
      '#1 on the Americas Wild ladder twice — January 2019 and again November 2025. #1 seed for the 2019 Wild Open. 2016 HCT Americas Spring Preliminary. Official HCT tavern champion, Rancho Cucamonga, July 2017. Seven years apart at the top of the same ladder, against two completely different metagames.',
  },
];

export const skills = {
  Languages: ['Java', 'Python', 'SQL', 'JavaScript'],
  'AI & ML': ['PyTorch', 'LangChain', 'NumPy', 'Quantitative modeling'],
  Platforms: ['Spring Boot', 'Apache Kafka', 'Docker', 'GitLab CI/CD'],
  Tools: ['Git', 'Selenium', 'TestNG', 'JUnit'],
};

export const about = {
  lede: 'Chris Su-Young Lee.',
  paragraphs: [
    'Chris Swim Lee is 수영 — swim — said in English.',
    'Mathematics at Trinity on a full-ride. The ladder and Goldman taught the same lesson: find the constraint, then ship.',
  ],
};

export const engage = {
  heading: 'Engage',
  lede: 'Technical lead work for funded teams with a stuck system — data, automation, or agents.',
  promise:
    'Most engagements start with a diagnostic. You get everything in writing before I start.',
  rates: [
    { name: 'Diagnostic', price: '$1,000', unit: '90 minutes' },
    { name: 'Build', price: 'From $20,000', unit: 'scoped project' },
    { name: 'Retainer', price: '$12,000', unit: 'per month' },
    { name: 'Day', price: '$3,000', unit: 'day' },
  ],
  notes: [
    'For companies that already pay for software. Not for brochure sites, students, or equity-only work.',
    'New York or remote. Builds start with a diagnostic unless the scope is already clear.',
    'Diagnostic, retainer, and day rate are listed. Builds start at $20,000.',
  ],
  cta: 'Email about a project',
  href: briefMail,
};

export const contact = {
  heading: 'Email',
  lede: 'Roles, systems, or a question. I’ll tell you if I’m the person.',
  projectCta: 'Email about a role',
  href: hireMail,
};

export const built = {
  lede: 'This site.',
  detail:
    'Astro. No React. A custom canvas DAG and a Lattice router that runs in the page. Printable CV. The source is the proof.',
  href: 'https://github.com/chrisswimlee/chrisswimlee',
};
