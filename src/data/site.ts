export const site = {
  name: 'Chris Swim Lee',
  legalName: 'Chris SuYoung Lee',
  title: 'Chris Swim Lee, New York',
  description:
    'Problem solver in New York. I learn the unfamiliar stack, break the work into modules, and ship systems built to be upgraded — Goldman, a founding CTO seat, Local Lattice on PyPI.',
  url: 'https://chrisswimlee.com',
  location: 'New York, NY',
  email: 'suyoung.lee99@gmail.com',
  github: 'https://github.com/chrisswimlee',
  linkedin: 'https://www.linkedin.com/in/chris-suyoung-lee',
  photo: '/images/chris.jpg',
  ogImage: '/images/chris-og.jpg',
  jobTitle: 'Technical Lead',
  built: 'Astro. No React. A live constellation field. Printable CV.',
};

export const nav = [
  { href: '/#achievements', label: 'Achievements' },
  { href: '/#range', label: 'Range' },
  { href: '/#work', label: 'Work' },
  { href: '/#experience', label: 'Experience' },
];

export const mail = `mailto:suyoung.lee99@gmail.com?subject=${encodeURIComponent('Chris Swim Lee')}&body=${encodeURIComponent('What you need (role / project / tutoring):\n\nWhat’s stuck, or what you’re hiring for:\n\nWhere (city / remote):\n')}`;

export const hero = {
  kicker: 'Problem solver · New York',
  lede: 'Put the problem in front of me. I will find a way through it — even if I have to learn the stack first.',
};

export const thesis = [
  'I learn the unfamiliar piece, cut it into modules, and ship.',
  'The product is a system with seams — so the next constraint can land.',
];

export const experienceIntro = 'Goldman. A founding CTO seat. Then HAIT. Click a job to open the work.';

export const achievementsNote = 'Goldman, then a founding clock.';

type Spike = {
  id: 'theory' | 'build' | 'strategy';
  label: string;
  domain: string;
  trains: string;
  proof: string[];
};

export const range = {
  lede: 'Math, systems, and a competitive streak.',
  thread: 'The degree, the ladder, and Goldman look unrelated until you watch how I work.',
  meet: 'I do not need to know it yet. I need the constraint, then a way to break it into parts.',
  spikes: [
    {
      id: 'theory',
      label: 'Pure theory',
      domain: 'Formal mathematics',
      trains: 'I prove it before I write it.',
      proof: [
        'B.S. in Computer Science and Mathematics, Trinity College.',
        '1823 Scholar — full-ride scholarship.',
      ],
    },
    {
      id: 'build',
      label: 'Implementation',
      domain: 'Enterprise and AI engineering',
      trains: 'Infrastructure on a deadline, with the pager on.',
      proof: [
        'Three years at Goldman Sachs — 10,000+ accounts, 50+ internal teams on the APIs.',
        'Founding CTO on an agentic trading engine, zero to one.',
        'Local Lattice — an OpenAI-compatible gateway, published on PyPI.',
      ],
    },
    {
      id: 'strategy',
      label: 'Strategic execution',
      domain: 'Competitive meta and rapid learning',
      trains: 'Nine years apart at the top of the same ladder, three different metagames.',
      proof: [
        '#1 on the Hearthstone Americas Wild ladder — October 2016, January 2019, and November 2025.',
        '#1 seed for the 2019 Wild Open.',
        'Two-time Americas Continental Qualifier — 2016 and 2017, top ~75 across the Americas.',
      ],
    },
  ] as Spike[],
};

export type TechnicalAchievement = {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix: string;
  claim: string;
  proof: string;
};

export const technicalAchievements: TechnicalAchievement[] = [
  {
    id: 'scale',
    label: 'Scale',
    value: 10000,
    suffix: '+',
    claim: 'Accounts on one beneficiary system.',
    proof:
      'Goldman. Processing time down 80%. Fifty-plus teams on the APIs. Latency down 15%. Test accuracy up 22%.',
  },
  {
    id: 'speed',
    label: 'Speed',
    value: 100,
    prefix: '<',
    suffix: 'ms',
    claim: 'Market-data in, end to end.',
    proof: 'Kafka on Kraken crypto futures. Millions of ticks. Sub-100ms from feed to the book the agents traded on.',
  },
  {
    id: 'models',
    label: 'Models',
    value: 90,
    suffix: '%',
    claim: 'Less manual analysis before the open.',
    proof:
      'PyTorch time-series signals. Unified-memory training on Apple silicon next to cloud. Daily pre-market briefings that cut the manual pass by 90%.',
  },
];

export const trading = {
  kicker: 'Stealth fintech · founding CTO',
  title: 'Agentic trading engine',
  metric: '0 → 1',
  metricLabel: 'market-data to live signals',
  problem: 'A stealth desk needed market-data in and live futures execution out. No pipeline existed.',
  constraint: 'Kraken crypto futures, a legacy SQL book. The product cannot be shown.',
  decision: 'Python and Kafka on the Kraken feed. Agents audit SQL. A PyTorch brief on a clock.',
  outcome: 'Zero to one on a clock the desk can run.',
};

export const work = {
  lede: 'The engine stays off-site. Lattice is on PyPI. Two sites you can open.',
};

type Project = {
  id: string;
  kind: string;
  title: string;
  url: string;
  year: string;
  summary: string;
  image?: string;
  points: string[];
  command?: string;
  commandNote?: string;
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: 'lattice',
    kind: 'Open source',
    title: 'Local Lattice',
    url: 'pypi.org/project/local-lattice',
    year: '2026',
    summary:
      'Local-first OpenAI-compatible gateway. Plug MLX, LM Studio, or cloud into Lattice, then assign the role switch. Agents ask for a capability and get a model back.',
    points: [
      'Backends fit in — MLX, LM Studio, cloud — then you assign role:coder, role:reasoner, role:fast.',
      'Swarm primitives as HTTP: fanout, vote, pipeline, debate.',
    ],
    command: 'pip install local-lattice',
    commandNote: 'role:coder · role:reasoner · role:fast',
    links: [
      { label: 'GitHub', href: 'https://github.com/chrisswimlee/local-lattice' },
      { label: 'PyPI', href: 'https://pypi.org/project/local-lattice/' },
    ],
  },
  {
    id: 'haitedu',
    kind: 'Site',
    title: 'HAIT',
    url: 'haitedu.com',
    year: '2026',
    summary:
      'Public site and systems for Hebron Asia International Institute of Technology, an AI institute standing up in Chiang Rai.',
    image: '/images/work/haitedu.jpg',
    points: [
      'Redesigned the front-end and upgraded the PHP underneath it.',
      'Now designing their IT systems — hosting, security, and the stack the school will run on.',
    ],
    links: [{ label: 'Live site', href: 'https://haitedu.com' }],
  },
  {
    id: 'd22soso',
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
    links: [{ label: 'Live site', href: 'https://d22soso.com' }],
  },
];

export type RoleProject = {
  id: string;
  title: string;
  oneLiner: string;
  stack?: string[];
  points: string[];
  brief?: { problem: string; constraint: string; decision: string; outcome: string };
  links?: { label: string; href: string }[];
};

export type Role = {
  id: string;
  company: string;
  title: string;
  dates: string;
  location: string;
  note: string;
  scan: string;
  bullets: string[];
  projects: RoleProject[];
};

export const roles: Role[] = [
  {
    id: 'hait',
    company: 'HAIT',
    title: 'Technical Lead',
    dates: '2026 — present',
    location: 'Chiang Rai, remote',
    note: 'Public site, IT, and AI curriculum',
    scan: 'Public site, curriculum, and agents before there is a campus.',
    bullets: [
      'Own the IT — hosting, security, and the stack the school runs on.',
      'Rebuilt the public site and the PHP under it so recruiting works.',
      'Designed the foundational AI curriculum, audited systems, and taught the inaugural cohort.',
      'Built multi-agent ecosystems (OpenClaw, OpenAgent, Cursor) and collaborated with a Korea University expert on AI orchestration for data recollection.',
    ],
    projects: [
      {
        id: 'hait-site',
        title: 'Public site',
        oneLiner: 'PHP rebuild so recruiting works before there is a campus.',
        stack: ['PHP', 'Hosting'],
        points: [
          'Redesigned the front-end and upgraded the PHP underneath it.',
          'The sites were slow. I reconfigured them so they run.',
        ],
        brief: {
          problem: 'An AI institute still recruiting before there is a campus. The public site was slow and the PHP underneath it was dated.',
          constraint: 'Recruiting has to work now, on hosting the school already has.',
          decision: 'Redesign the front-end, upgrade the PHP, and reconfigure the sites so they run.',
          outcome: 'Recruiting works on haitedu.com before there is a campus.',
        },
        links: [{ label: 'haitedu.com', href: 'https://haitedu.com' }],
      },
      {
        id: 'hait-it',
        title: 'Institutional IT',
        oneLiner: 'Hosting, security, and the stack the school will run on.',
        stack: ['Hosting', 'Security'],
        points: [
          'Own hosting, security, and the stack a new institution needs before it has a campus.',
          'The public site is live. The rest of the systems are standing up behind it.',
        ],
        brief: {
          problem: 'A new institution needs hosting, security, and a stack before it has a campus.',
          constraint: 'No campus IT org yet. The public site is already live.',
          decision: 'Own the IT — hosting, security, and the stack the school will run on.',
          outcome: 'The systems a new institution needs are standing up before the building exists.',
        },
      },
      {
        id: 'hait-curriculum',
        title: 'AI curriculum',
        oneLiner: 'Foundational curriculum, audited systems, inaugural cohort.',
        points: [
          'Designed the foundational curriculum for a pioneering AI institute.',
          'Audited the systems the first students would learn on, then taught the inaugural cohort.',
        ],
        brief: {
          problem: 'The institute needed a foundational curriculum and someone to teach the first students.',
          constraint: 'Inaugural cohort. Systems that had not been audited.',
          decision: 'Design the curriculum, audit the systems, teach the cohort.',
          outcome: 'The first students have a curriculum and a path through it.',
        },
      },
      {
        id: 'hait-agents',
        title: 'Multi-agent orchestration',
        oneLiner: 'OpenClaw, OpenAgent, Cursor — and data recollection with a Korea University collaborator.',
        stack: ['OpenClaw', 'OpenAgent', 'Cursor'],
        points: [
          'Built multi-agent ecosystems the institute can run — OpenClaw, OpenAgent, Cursor.',
          'Collaborated with a Korea University expert on AI orchestration for data recollection.',
        ],
        brief: {
          problem: 'The institute needed multi-agent systems for teaching and for data recollection.',
          constraint: 'A stack students and staff can actually run.',
          decision: 'Build the agent ecosystem. Design recollection orchestration with a Korea University collaborator.',
          outcome: 'Agents in the curriculum loop, and a recollection path designed with that collaborator.',
        },
      },
    ],
  },
  {
    id: 'stealth',
    company: 'Stealth fintech',
    title: 'Founding CTO',
    dates: 'Sep 2025 — Aug 2026',
    location: 'New York',
    note: 'Agentic Kraken futures engine, zero to one',
    scan: 'Kraken futures. Sub-100ms ingest. Signals on a founding clock.',
    bullets: [
      'Built a fully agentic trading engine executing Kraken crypto futures via a sub-100ms Python/Kafka ingestion pipeline.',
      'Built the agent loop that audits portfolios against legacy SQL with modern LLMs.',
      'Owned MLOps: PyTorch time-series models, 24/7 retraining, news processors for episodic pivots, and daily pre-market briefings that cut manual analysis 90%.',
    ],
    projects: [
      {
        id: 'stealth-ingest',
        title: 'Kraken futures ingestion',
        oneLiner: 'Sub-100ms Python/Kafka pipeline. Agents execute on Kraken crypto futures.',
        stack: ['Python', 'Kafka'],
        points: [
          'Python and Kafka on the Kraken crypto futures feed — millions of ticks, sub-100ms end to end.',
          'A fully agentic engine on that book. The product cannot be shown.',
        ],
        brief: {
          problem: 'A stealth desk needed market-data in and live futures execution out. No pipeline existed.',
          constraint: 'Kraken crypto futures. Sub-100ms. The product cannot be shown.',
          decision: 'Python and Kafka on the Kraken feed. Agents on the book.',
          outcome: 'Zero to one: ticks in, executions out, on a founding clock.',
        },
      },
      {
        id: 'stealth-forecast',
        title: 'Forecasting and retraining',
        oneLiner: 'PyTorch time-series models on a 24/7 retraining loop.',
        stack: ['PyTorch'],
        points: [
          'PyTorch time-series models for live signals and backtests.',
          'Automated 24/7 retraining. Unified-memory local training next to cloud.',
        ],
        brief: {
          problem: 'The desk needed signals, not a one-off model.',
          constraint: 'Markets do not pause for a retraining window.',
          decision: 'PyTorch time-series models and a 24/7 retraining pipeline. Train locally on unified memory next to cloud.',
          outcome: 'Live signals and backtests the desk can run without a manual train.',
        },
      },
      {
        id: 'stealth-news',
        title: 'News processors',
        oneLiner: 'Unstructured news in, episodic pivot signals out.',
        points: [
          'News processors on the same clock as the models.',
          'Live unstructured text, aimed at episodic market pivots.',
        ],
        brief: {
          problem: 'Episodic pivots show up in unstructured news before they show up in the book.',
          constraint: 'Live text, not a clean feed. The product cannot be shown.',
          decision: 'News processors on the same clock as the forecasting path.',
          outcome: 'Pivot signals from news, next to the time-series path.',
        },
      },
      {
        id: 'stealth-agents',
        title: 'Portfolio audit and pre-market brief',
        oneLiner: 'Agents against legacy SQL. Daily brief that cut the manual pass 90%.',
        stack: ['Python', 'SQL', 'LLMs'],
        points: [
          'Agents that audit portfolios against a legacy SQL book with modern LLMs.',
          'Daily pre-market briefings that cut the manual analysis pass by 90%.',
        ],
        brief: {
          problem: 'The book lived in legacy SQL. Manual pre-market analysis ate the morning.',
          constraint: 'Modern LLMs on an old schema. A daily clock.',
          decision: 'Agents that audit portfolios against the SQL. A PyTorch brief before the open.',
          outcome: 'Manual analysis down 90%. The desk runs the brief.',
        },
      },
    ],
  },
  {
    id: 'goldman',
    company: 'Goldman Sachs',
    title: 'Full Stack Engineer',
    dates: 'May 2022 — Jul 2025',
    location: 'New York',
    note: 'Forward deployment and automation',
    scan: '80% faster processing. Forward-deployed. 50+ internal teams.',
    bullets: [
      'Served as a forward-deployment engineer — developers, traders, and lawyers on one reporting path, so the numbers stayed auditable and legally compliant.',
      'Designed and shipped a beneficiary management system serving 10,000+ client accounts and cut data processing time by 80%.',
      'Scaled Java and Kafka pipelines and REST APIs used by 50+ internal teams, cutting data-access latency by 15%.',
      'Built a Selenium and TestNG suite that raised test accuracy 22% across hundreds of financial and compliance scenarios, and stayed on the line for trading, compliance, and market-data APIs after they shipped.',
    ],
    projects: [
      {
        id: 'gs-beneficiary',
        title: 'Beneficiary management',
        oneLiner: '10,000+ accounts. Processing time down 80%.',
        stack: ['Java', 'Kafka'],
        points: [
          'Designed and shipped the beneficiary system behind 10,000+ client accounts.',
          'Cut data processing time by 80%. Stayed on the line after it shipped.',
        ],
        brief: {
          problem: 'Beneficiary data for 10,000+ client accounts was too slow to operate.',
          constraint: 'Compliance, 50+ internal consumers, and the pager after it shipped.',
          decision: 'Java and Kafka on beneficiary.* plus REST /v1/accounts.',
          outcome: '80% faster processing. The system stayed in service.',
        },
      },
      {
        id: 'gs-apis',
        title: 'Java, Kafka, and REST',
        oneLiner: 'Pipelines and APIs used by 50+ internal teams. Latency down 15%.',
        stack: ['Java', 'Kafka', 'REST'],
        points: [
          'Scaled Java and Kafka pipelines and REST APIs used by 50+ internal teams.',
          'Cut data-access latency by 15%.',
        ],
        brief: {
          problem: 'Internal teams needed beneficiary and account data over APIs they could share.',
          constraint: '50+ consumers. Compliance. The pager after it shipped.',
          decision: 'Java and Kafka pipelines plus REST /v1/accounts.',
          outcome: 'Data-access latency down 15%. Fifty-plus teams on the APIs.',
        },
      },
      {
        id: 'gs-forward',
        title: 'Forward deployment',
        oneLiner: 'Developers, traders, and lawyers on one reporting path.',
        points: [
          'Bridged downstream developers, traders, and lawyers on the same reporting path.',
          'The job was auditability — one set of numbers the three sides could stand behind.',
        ],
        brief: {
          problem: 'Reporting had to be auditable for developers, traders, and lawyers at once.',
          constraint: 'Downstream consumers who do not share a stack, and legal review on the same numbers.',
          decision: 'Forward-deploy: sit between the teams and make the reporting path one system.',
          outcome: 'Reporting the three sides can stand behind.',
        },
      },
      {
        id: 'gs-test',
        title: 'Selenium and TestNG',
        oneLiner: 'Test accuracy up 22%. Stayed on the line after it shipped.',
        stack: ['Selenium', 'TestNG'],
        points: [
          'Built a Selenium and TestNG suite across hundreds of financial and compliance scenarios.',
          'Raised test accuracy 22%, then stayed on trading, compliance, and market-data APIs after they shipped.',
        ],
        brief: {
          problem: 'KYC and compliance cases were too easy to miss in a manual pass.',
          constraint: 'Hundreds of financial and compliance scenarios. The APIs stay live after ship.',
          decision: 'Selenium and TestNG on the KYC and compliance cases. Stay on the line.',
          outcome: 'Test accuracy up 22%. The APIs still owned after they shipped.',
        },
      },
    ],
  },
  {
    id: 'onedave',
    company: 'One Dave Software',
    title: 'Full Stack Software Engineer',
    dates: 'Oct 2020 — May 2022',
    location: 'La Brea, CA',
    note: 'Curtis, defense, and email systems',
    scan: 'Curtis inventory. Defense apps. Email path 70% faster.',
    bullets: [
      'Built inventory pipelines and frontends for Curtis, a government nuclear pipeline contractor.',
      'Led a system-wide upgrade that improved email server response time by 70%.',
      'Built and maintained secure National Defense web applications.',
    ],
    projects: [
      {
        id: 'od-curtis',
        title: 'Curtis inventory',
        oneLiner: 'Pipelines and frontends for a government nuclear contractor.',
        points: [
          'Full-stack inventory pipelines and the interfaces on top of them.',
          'Curtis — a government nuclear pipeline contractor.',
        ],
        brief: {
          problem: 'Curtis needed inventory pipelines and interfaces for a government nuclear contract.',
          constraint: 'A contractor stack, not a greenfield product.',
          decision: 'Build the inventory pipelines and the frontends on top of them.',
          outcome: 'Inventory the contractor can run.',
        },
      },
      {
        id: 'od-email',
        title: 'Email systems',
        oneLiner: 'System-wide upgrade. Response time down 70%.',
        points: [
          'Managed the email path for the same clients.',
          'A system-wide upgrade that cut email-server response time by 70%.',
        ],
        brief: {
          problem: 'Email server response was too slow for the clients on it.',
          constraint: 'A system-wide upgrade, not a single mailbox fix.',
          decision: 'Upgrade the email path across the system.',
          outcome: 'Response time down 70%.',
        },
      },
      {
        id: 'od-defense',
        title: 'National Defense apps',
        oneLiner: 'Full-stack web applications under a security constraint.',
        points: [
          'Built and maintained full-stack web applications for national defense clients.',
          'Security was the constraint on the work, not a later pass.',
        ],
        brief: {
          problem: 'National defense clients needed web applications that stay up and stay closed.',
          constraint: 'Security is the product constraint, not a later pass.',
          decision: 'Build and maintain the full-stack apps under that constraint.',
          outcome: 'Defense applications that stayed in service.',
        },
      },
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

export const record = [
  {
    label: '2016 · HCT Spring Preliminary',
    href: 'https://liquipedia.net/hearthstone/2016_Hearthstone_Championship_Tour/Spring/Americas/Preliminary',
  },
  {
    label: 'Oct 2016 · #1 Americas Hearthstone',
    href: 'https://www.hearthpwn.com/decks/661171-1-wild-aggro-beast-druid',
  },
  {
    label: '2017 · HCT Summer Preliminary',
    href: 'https://liquipedia.net/hearthstone/2017_Hearthstone_Championship_Tour/Summer/Preliminary/Americas',
  },
  {
    label: 'Jan 2019 · Wild Open Qualifier Rank #1',
    href: 'https://liquipedia.net/hearthstone/Ladder_Ranking/2019/Americas/Wild/January',
  },
  {
    label: 'Nov 2025 · Rank 1 Hearthstone Americas',
    href: 'https://x.com/chrisswimlee/status/1994461923346452901',
  },
];

export const recordProof = record.filter((item) => /#1|Rank 1/.test(item.label));

export const competitive = [
  {
    title: 'Professional Hearthstone, Americas',
    detail:
      '#1 on the Americas Wild ladder three times — October 2016, January 2019, and November 2025. #1 seed for the 2019 Wild Open. Two-time Americas Continental Qualifier in 2016 and 2017, including a 2016 HCT Spring Preliminary lower-bracket run and a 3–2 over Flamekilla, and the 2017 HCT Summer Preliminary as tavern champion at Rancho Cucamonga. Nine years apart at the top of the same ladder, against three different metagames.',
    links: record,
  },
];

export const skills = {
  Languages: ['Java', 'Python', 'SQL', 'JavaScript', 'C++', 'C#'],
  'AI & ML': ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'LangChain', 'NumPy', 'Quantitative modeling'],
  Platforms: ['Spring Boot', 'ASP.NET', 'Apache Kafka', 'Docker', 'GitLab CI/CD'],
  'Agent tooling': ['Claude', 'Cursor', 'n8n', 'OpenClaw'],
  Tools: ['Git', 'Selenium', 'TestNG', 'JUnit'],
};

export const about = {
  lede: 'Chris SuYoung Lee. Suyoung means swim.',
  line: 'Math taught me to find the constraint. Goldman taught me what happens when it is wrong at scale.',
};

export const engage = {
  heading: 'Engage',
  lede: 'A role or a stuck system. Tutoring by request.',
  promise: 'Tell me which it is. You get a clear yes or no — and for builds, everything in writing before I start.',
  paths: [
    { name: 'Role', detail: 'A seat where the work is hard and the stack may be new.' },
    { name: 'Build', detail: 'Technical lead work for funded teams — data, automation, or agents.' },
    { name: 'Tutoring', detail: 'Software and math. One-to-one, 60 minutes, remote or in New York. I studied both at Trinity.' },
  ],
  rates: [
    { name: 'Diagnostic', price: '$1,000', unit: '90 minutes' },
    { name: 'Build', price: 'From $20,000', unit: 'scoped project' },
    { name: 'Retainer', price: '$12,000', unit: 'per month' },
    { name: 'Day', price: '$3,000', unit: 'day' },
  ],
  notes: [
    'Builds are for companies that already pay for software — not brochure sites or equity-only.',
    'New York or remote. Builds start with a diagnostic unless the scope is already clear.',
  ],
  cta: 'Email me',
  href: mail,
};

export const contact = {
  heading: 'Email',
  lede: 'One inbox. A role or a stuck system.',
  projectCta: 'Email me',
  href: mail,
};

export const built = {
  lede: 'This site.',
  detail:
    'Astro. No React. A live constellation field you can draw in. Printable CV. The source is the proof.',
  href: 'https://github.com/chrisswimlee/chrisswimlee',
};
