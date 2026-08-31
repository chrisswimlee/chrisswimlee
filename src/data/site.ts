export const site = {
  name: 'Chris Swim Lee',
  legalName: 'Chris Su-Young Lee',
  title: 'Chris Swim Lee, New York',
  description:
    'Technical lead in New York with six years of engineering experience. Pure mathematics, Goldman Sachs infrastructure, a #1 competitive rank, and a professor at an AI university.',
  url: 'https://chrisswimlee.com',
  location: 'New York, NY',
  email: 'suyoung.lee99@gmail.com',
  github: 'https://github.com/chrisswimlee',
  linkedin: 'https://www.linkedin.com/in/chris-suyoung-lee',
  photo: '/images/chris.jpg',
  ogImage: '/images/chris-og.jpg',
  jobTitle: 'Technical Lead',
};

export const nav = [
  { href: '/#gallery', label: 'Gallery' },
  { href: '/#range', label: 'Range' },
  { href: '/#systems', label: 'Systems' },
  { href: '/#experience', label: 'Experience' },
  { href: '/#work', label: 'Work' },
  { href: '/#services', label: 'Services' },
];

export const briefMail = `mailto:suyoung.lee99@gmail.com?subject=${encodeURIComponent('Consulting — Chris Swim Lee')}&body=${encodeURIComponent('What the company does:\n\nWhat’s stuck (data / automation / agents):\n\nWhere you are (city / remote):\n')}`;
export const tutorMail = `mailto:suyoung.lee99@gmail.com?subject=${encodeURIComponent('Tutoring — software and math')}`;

export const hero = {
  kicker: 'Engineer · New York',
  lede: 'Six years of engineering. Pure math, three years at Goldman, #1 on a competitive ladder, and I teach at an AI university.',
  now: 'I work with companies that need a technical lead — data, automation, agents — not a ticket queue.',
  stack: ['Mathematics', 'Java', 'Python', 'Kafka', 'PyTorch', 'MLX'],
  stamp: 'AVAILABLE',
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

export const services = {
  lede: 'Technical lead work for funded teams with a stuck system — data, automation, or agents.',
  promise:
    'Most engagements start with a diagnostic. You get everything in writing before I start.',
  engagements: [
    {
      id: 'map',
      name: 'Diagnostic',
      price: '$1,000',
      unit: '90 minutes',
      summary: 'We look at what is stuck and I tell you what to do first. You leave with that in writing.',
    },
    {
      id: 'build',
      name: 'Build',
      price: 'From $20,000',
      unit: 'Scoped project',
      summary: 'An internal tool, an agent, or the pipeline under them. A public site alone is not the job.',
    },
    {
      id: 'retain',
      name: 'Retainer',
      price: '$12,000',
      unit: 'per month',
      summary: 'I stay on it. Priorities, reviews, and shipping every month.',
    },
  ],
  day: {
    price: '$3,000',
    unit: 'day',
    note: 'A workshop, a review, or a day in the room to ship something.',
  },
  notes: [
    'For companies that already pay for software. Not for brochure sites, students, or equity-only work.',
    'New York or remote. Builds start with a diagnostic unless the scope is already clear.',
    'Diagnostic, retainer, and day rate are listed. Builds start at $20,000.',
  ],
  cta: 'Email about a project',
  href: briefMail,
};

export const experienceIntro = 'Six years in. Banking infrastructure, a founding year on an agent stack, and a classroom.';

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
    'The degree, the ladder, Goldman, and the classroom look unrelated until you watch how I work.',
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
      domain: 'Competitive meta and pedagogy',
      trains: 'A clock, a hidden hand, then getting a room to move.',
      proof: [
        '#1 on the Hearthstone Americas Wild ladder — January 2019, again November 2025.',
        '#1 seed for the 2019 Wild Open. HCT Tavern Champion, 2017.',
        'Professor at an AI university.',
      ],
    },
  ] as Spike[],
  synthesis: [
    {
      title: 'Reading a hidden hand',
      detail:
        'Ladder play is risk on a clock. I read a system the same way: what I cannot see, what being wrong costs, what I do first.',
    },
    {
      title: 'Proof, then the migration',
      detail: 'I find the constraint before I write the change, not after it pages someone at 3am.',
    },
    {
      title: 'A school can teach it',
      detail: 'Something that changed six months ago becomes a class, and a budget, and a site that runs.',
    },
  ],
};

// One ticket per spike, so the fold shows range rather than four banking metrics.
export const proof = [
  { prefix: '#', value: 1, suffix: '', label: 'Americas Wild ladder', hint: 'Hearthstone, 2019 and 2025' },
  { value: 10000, suffix: '+', label: 'client accounts', hint: 'Goldman beneficiary system' },
  { value: 100, suffix: '%', label: 'scholarship, full ride', hint: '1823 Scholar, Trinity' },
  { value: 80, suffix: '%', label: 'faster processing', hint: 'data pipeline rewrite' },
];

type System = {
  id: 'trading' | 'goldman' | 'lattice';
  kicker: string;
  title: string;
  metric: string;
  metricLabel: string;
  summary: string;
  stack: string[];
  href?: string;
};

export const systems: System[] = [
  {
    id: 'trading',
    kicker: 'Stealth fintech · founding',
    title: 'Agentic trading engine',
    metric: '0 → 1',
    metricLabel: 'market-data to live signals',
    summary:
      'Python and Kafka across multiple exchanges. Agents that audit portfolios against legacy SQL. PyTorch time-series, backtests, and a daily pre-market brief.',
    stack: ['Python', 'Kafka', 'PyTorch', 'LLMs'],
  },
  {
    id: 'goldman',
    kicker: 'Goldman Sachs · 2022–2025',
    title: 'Beneficiary management',
    metric: '80%',
    metricLabel: 'faster processing, 10k+ accounts',
    summary:
      'Designed and shipped the beneficiary system behind 10,000+ client accounts. Java and Kafka pipelines used by 50+ internal teams. Stayed on the line after it shipped.',
    stack: ['Java', 'Kafka', 'REST', 'Selenium'],
  },
  {
    id: 'lattice',
    kicker: 'Open source · Apache-2.0',
    title: 'Local Lattice',
    metric: 'role:*',
    metricLabel: 'capability, not a model string',
    summary:
      'Local-first OpenAI-compatible gateway. Plug MLX, LM Studio, or cloud into Lattice, then assign the role switch. Agents ask for coder or reasoner — not a model string.',
    stack: ['Python', 'MLX', 'OpenAI API', 'Swarm'],
    href: 'https://github.com/chrisswimlee/local-lattice',
  },
];

export const work = {
  lede: 'Local Lattice on PyPI. Then the sites I can put a URL on.',
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
    featured: true,
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
    kind: 'University',
    title: 'HAIT',
    url: 'haitedu.com',
    year: '2025',
    summary:
      'The public site for HAIT, an AI university in Chiang Rai still recruiting before there is a campus. I teach there, and I built the site and the systems behind it.',
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
    kind: 'Archive',
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

export const hearthstone = {
  lede: 'Hearthstone at the top of the Americas Wild ladder — #1 in January 2019 and again in November 2025. The record is public.',
};

export const roles = [
  {
    company: 'HAIT',
    title: 'Professor',
    dates: '2025 — present',
    location: 'Chiang Rai, remote',
    note: 'AI university',
    bullets: [
      'Teach at an AI university still standing up.',
      'Own the IT — hosting, security, and the stack the school runs on.',
      'Rebuilt the public site and the PHP under it so recruiting works.',
    ],
  },
  {
    company: 'Stealth fintech',
    title: 'Lead Founding AI Engineer',
    dates: 'Sep 2025 — Aug 2026',
    location: 'New York',
    note: 'Agentic stock trading engine, zero to one',
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
    'I studied mathematics and computer science at Trinity on a full-ride scholarship. Six years of engineering since — three of them on Goldman Sachs infrastructure, then a founding seat on an agentic trading stack. In between I played Hearthstone to #1 in the Americas.',
    'Math taught me to find the constraint. The ladder taught me to bet when the information is incomplete. Goldman taught me what happens when either one is wrong at scale.',
    'Now I consult in New York and teach at an AI university. Same job in both rooms: look at the stuck system, decide the direction, and ship.',
  ],
};

export const contact = {
  heading: 'Email',
  lede: 'Tell me what’s stuck. Data, automation, agents — I’ll tell you what to do first.',
  projectCta: 'Email me',
};
