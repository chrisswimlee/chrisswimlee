export const site = {
  name: 'Chris Swim Lee',
  legalName: 'Chris SuYoung Lee',
  title: 'Chris Swim Lee, New York',
  description:
    'Engineer in New York. Goldman Sachs, a founding CTO role, Local Lattice on PyPI, and DeskBreak and fluidSubtitles on macOS.',
  url: 'https://chrisswimlee.com',
  location: 'New York, NY',
  email: 'suyoung.lee99@gmail.com',
  github: 'https://github.com/chrisswimlee',
  linkedin: 'https://www.linkedin.com/in/chris-suyoung-lee',
  photo: '/images/chris.jpg',
  ogImage: '/images/chris-og.jpg',
  jobTitle: 'Technical Lead',
  built: 'Astro, no React. Printable CV.',
};

export const nav = [
  { href: '/#achievements', label: 'Achievements' },
  { href: '/#range', label: 'Range' },
  { href: '/#work', label: 'Work' },
  { href: '/#experience', label: 'Experience' },
];

export const mail = `mailto:suyoung.lee99@gmail.com?subject=${encodeURIComponent('Chris Swim Lee')}&body=${encodeURIComponent('What you need (role / project / tutoring):\n\nWhat’s stuck:\n\nWhere (city / remote):\n')}`;

export const hero = {
  kicker: 'New York',
  lede: 'Three years on Goldman account systems. Then a Kraken futures desk I cannot name. Now I run IT for a school that does not have a campus yet.',
};

export const experienceIntro = 'Goldman Sachs, a founding CTO role, then HAIT. Email if you have a job.';

export const achievementsNote = 'From Goldman and the trading desk.';

type Spike = {
  id: 'theory' | 'build' | 'strategy';
  label: string;
  domain: string;
  trains: string;
  proof: string[];
};

export const range = {
  lede: 'A math degree, engineering jobs, and a long stretch on a game ladder.',
  thread: 'People ask about the degree, Goldman, and Hearthstone. Those are the three things.',
  meet: 'Click a peak.',
  spikes: [
    {
      id: 'theory',
      label: 'Pure theory',
      domain: 'Formal mathematics',
      trains: 'I want the proof before I write the code.',
      proof: [
        'B.S. in Computer Science and Mathematics, Trinity College.',
        '1823 Scholar — full-ride scholarship.',
      ],
    },
    {
      id: 'build',
      label: 'Implementation',
      domain: 'Enterprise and AI engineering',
      trains: 'Deadlines and a pager.',
      proof: [
        'Three years at Goldman Sachs — 10,000+ accounts, 50+ internal teams on the APIs.',
        'Founding CTO on a Kraken futures trading engine.',
        'Local Lattice, an OpenAI-compatible gateway on PyPI.',
        'fluidSubtitles, live Korean, English, Thai, and Japanese captions on macOS.',
      ],
    },
    {
      id: 'strategy',
      label: 'Strategic execution',
      domain: 'Competitive play',
      trains: 'Same Hearthstone ladder in 2016, 2019, and 2025.',
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
    proof: 'At Goldman, processing time dropped 80%. More than 50 teams used the APIs.',
  },
  {
    id: 'speed',
    label: 'Speed',
    value: 100,
    prefix: '<',
    suffix: 'ms',
    claim: 'Kraken futures data, feed to book.',
    proof: 'Python and Kafka. Millions of ticks. That is what the trading agents sat on.',
  },
  {
    id: 'models',
    label: 'Models',
    value: 90,
    suffix: '%',
    claim: 'Less manual work before the open.',
    proof: 'PyTorch time-series models on a 24/7 loop, plus a daily pre-market brief.',
  },
];

export const trading = {
  kicker: 'Stealth fintech · founding CTO',
  title: 'Trading engine',
  metric: '0 → 1',
  metricLabel: 'from market data to live signals',
  problem: 'They needed live Kraken futures data in, and executions out. There was no pipeline.',
  constraint: 'Kraken crypto futures and an old SQL ledger. I cannot show the product.',
  decision: 'Python and Kafka on the Kraken feed. Models for the morning brief. Agents to check the SQL.',
  outcome: 'They run it. I am not on the pager.',
};

export const work = {
  lede: 'Lattice, two Mac apps, two sites. A trading engine I cannot name.',
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
      'A local gateway that speaks the OpenAI API. You ask for a role like coder or reasoner, and it picks a model.',
    points: [
      'Works with MLX, LM Studio, or a cloud key.',
      'Can send one question to several models and vote, pipeline, or debate the answers.',
    ],
    command: 'pip install local-lattice',
    commandNote: 'role:coder · role:reasoner · role:fast',
    links: [
      { label: 'GitHub', href: 'https://github.com/chrisswimlee/local-lattice' },
      { label: 'PyPI', href: 'https://pypi.org/project/local-lattice/' },
    ],
  },
  {
    id: 'fluidsubtitles',
    kind: 'Open source',
    title: 'fluidSubtitles',
    url: 'chrisswimlee.com/fluidSubtitles',
    year: '2026',
    summary:
      'Live captions on a Mac. Speak Korean, English, Thai, or Japanese. A translation or a caption shows up on screen.',
    image: '/images/work/fluidsubtitles.jpg',
    points: [
      'A Theater window over slides. It can hide from Zoom and screen share.',
      'On-device Apple Translation. A FluidVoice branch, not a cloud caption API.',
    ],
    links: [
      { label: 'Get it', href: '/fluidSubtitles/' },
      { label: 'GitHub', href: 'https://github.com/chrisswimlee/fluidSubtitles' },
    ],
  },
  {
    id: 'deskbreak',
    kind: 'Open source',
    title: 'DeskBreak',
    url: 'github.com/chrisswimlee/deskbreak',
    year: '2026',
    summary:
      'A menu-bar timer for people who sit too long. After 40 minutes a little character shows up and tells you to stand.',
    image: '/images/work/deskbreak.jpg',
    points: [
      'Walk away and the timer resets. It never talks to a server.',
      'Twenty characters, five moods, or drop in your own image. It will not steal the keyboard.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/chrisswimlee/deskbreak' }],
  },
  {
    id: 'haitedu',
    kind: 'Site',
    title: 'HAIT',
    url: 'haitedu.com',
    year: '2026',
    summary: 'Public site and hosting for an AI institute in Chiang Rai. They do not have a campus yet.',
    image: '/images/work/haitedu.jpg',
    points: [
      'I rebuilt the front-end and the old PHP.',
      'I run hosting and security until they hire an IT person.',
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
      'Site for Wayne “D22-soso” Chiang — 1999 Brood War World Champion, WSOP talent manager, and inventor of 2 Hand Hold’em.',
    image: '/images/work/d22soso.jpg',
    points: [
      'Championship record, WSOP clips, and the two-hand game, on one site.',
      'A random race roll and a 2HH table you can play in the browser.',
    ],
    links: [{ label: 'Live site', href: 'https://d22soso.com' }],
  },
];

export const fluidSubtitles = {
  path: '/fluidSubtitles/',
  title: 'fluidSubtitles',
  kicker: 'Open source · 2026',
  lede: 'Live captions on a Mac. Speak Korean, English, Thai, or Japanese. A translation or a caption shows up on screen.',
  description:
    'Live Korean, English, Thai, and Japanese captions for macOS. Download the preview zip.',
  repo: 'https://github.com/chrisswimlee/fluidSubtitles',
  image: '/images/work/fluidsubtitles.jpg',
  about: [
    'A Theater window over slides. It can hide from Zoom and screen share.',
    'On-device Apple Translation. A FluidVoice branch, not a cloud caption API.',
    'Voice stays on this Mac unless you opt in to a cloud speech model.',
  ],
  needs: [
    'macOS 15 or later. Theater streaming wants Apple Silicon.',
    'Microphone for Listen. Accessibility only if you type into another app.',
  ],
  open: [
    'Unzip it and drag fluidSubtitles to Applications.',
    'The zip is not signed. macOS will block it once. Open Anyway under Privacy & Security.',
    'Open Theater, allow the microphone, pick Voice or Translate, then Listen.',
  ],
};

export type PreviewZip = {
  href: string;
  name: string;
  tag: string;
  command: string;
};

const fallbackZip = (name: string, tag: string): PreviewZip => {
  const href = `https://github.com/chrisswimlee/fluidSubtitles/releases/download/${tag}/${name}`;
  return {
    href,
    name,
    tag,
    command: `curl -L -O ${href}`,
  };
};

const fallbackPreview = fallbackZip(
  'fluidsubtitles-1.6.11-preview-unsigned.zip',
  'preview-1.6.11-1',
);

type GithubRelease = {
  tag_name?: string;
  assets?: { name?: string; browser_download_url?: string }[];
};

export async function latestPreviewZip(): Promise<PreviewZip> {
  try {
    const res = await fetch('https://api.github.com/repos/chrisswimlee/fluidSubtitles/releases', {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'chrisswimlee.com',
      },
    });
    if (!res.ok) return fallbackPreview;
    const releases = (await res.json()) as GithubRelease[];
    const zips: PreviewZip[] = [];
    for (const release of releases) {
      for (const asset of release.assets ?? []) {
        if (asset.browser_download_url && asset.name?.endsWith('.zip') && release.tag_name) {
          zips.push({
            href: asset.browser_download_url,
            name: asset.name,
            tag: release.tag_name,
            command: `curl -L -O ${asset.browser_download_url}`,
          });
        }
      }
    }
    const signed = zips.find((item) => !item.name.includes('unsigned'));
    if (signed) return signed;
    if (zips[0]) return zips[0];
  } catch {
    return fallbackPreview;
  }
  return fallbackPreview;
}

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
    scan: 'Site, IT, and the first AI class, before they have a building.',
    bullets: [
      'I run hosting and security. They do not have an IT staff yet.',
      'Rebuilt the public site and the PHP under it.',
      'Wrote the first AI curriculum and taught the first cohort.',
      'Set up OpenClaw and OpenAgent workflows, and a data-recollection project with someone at Korea University.',
    ],
    projects: [
      {
        id: 'hait-site',
        title: 'Public site',
        oneLiner: 'The public site had to work before they had a campus.',
        stack: ['PHP', 'Hosting'],
        points: [
          'Rebuilt the front-end and upgraded the PHP.',
          'Fixed the hosting config so the pages actually load.',
        ],
        brief: {
          problem: 'haitedu.com was slow and the PHP was old.',
          constraint: 'We had to keep the existing host. A full rewrite was not in the cards.',
          decision: 'I redesigned the front-end, upgraded PHP, and fixed the hosting config.',
          outcome: 'The site is live.',
        },
        links: [{ label: 'haitedu.com', href: 'https://haitedu.com' }],
      },
      {
        id: 'hait-it',
        title: 'Institutional IT',
        oneLiner: 'Hosting and security with no campus IT team.',
        stack: ['Hosting', 'Security'],
        points: [
          'I handle hosting and security.',
          'The site is up. Email, accounts, and the rest are still being stood up.',
        ],
        brief: {
          problem: 'They needed someone on hosting and security before they had a building.',
          constraint: 'No IT org, and the public site was already supposed to be live.',
          decision: 'I took hosting and security.',
          outcome: 'Those two are on me. Other systems are still coming up.',
        },
      },
      {
        id: 'hait-curriculum',
        title: 'AI curriculum',
        oneLiner: 'I wrote the first course and taught it.',
        points: [
          'Wrote the first AI course.',
          'Checked the lab machines, then taught the class.',
        ],
        brief: {
          problem: 'They needed a first AI course and someone to teach it.',
          constraint: 'First cohort. The lab machines had not been checked.',
          decision: 'I wrote the course, checked the machines, and taught the class.',
          outcome: 'The first students finished the course.',
        },
      },
      {
        id: 'hait-agents',
        title: 'Multi-agent orchestration',
        oneLiner: 'OpenClaw and OpenAgent for the school, plus a recollection project with Korea University.',
        stack: ['OpenClaw', 'OpenAgent'],
        points: [
          'OpenClaw and OpenAgent for work students and staff can run.',
          'A separate recollection workflow with a collaborator at Korea University.',
        ],
        brief: {
          problem: 'They wanted agents the school could actually run, and a way to collect data with someone at Korea University.',
          constraint: 'It had to run on machines they already had.',
          decision: 'OpenClaw and OpenAgent on the teaching side. A separate recollection workflow with that collaborator.',
          outcome: 'The teaching agents are in use. Recollection is designed.',
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
    note: 'Kraken futures engine',
    scan: 'Kraken futures. Ingest under 100ms.',
    bullets: [
      'Built a trading engine on Kraken crypto futures. Python and Kafka, under 100ms from feed to book.',
      'Agents that check portfolios against the old SQL ledger.',
      'Owned MLOps: PyTorch time-series models, 24/7 retraining, news processors for episodic pivots, and daily pre-market briefs that cut manual analysis 90%.',
    ],
    projects: [
      {
        id: 'stealth-ingest',
        title: 'Kraken futures ingestion',
        oneLiner: 'Python and Kafka on the Kraken feed, under 100ms.',
        stack: ['Python', 'Kafka'],
        points: [
          'Millions of ticks. Under 100ms end to end.',
          'I cannot show the product.',
        ],
        brief: {
          problem: 'They had no live feed into the trading book.',
          constraint: 'Kraken crypto futures, and it had to stay under 100ms. I cannot name the firm.',
          decision: 'Python and Kafka on the official feed, then agents on top of that book.',
          outcome: 'Ticks come in. Orders go out.',
        },
      },
      {
        id: 'stealth-forecast',
        title: 'Forecasting and retraining',
        oneLiner: 'PyTorch models that retrain around the clock.',
        stack: ['PyTorch'],
        points: [
          'Time-series models for live signals and backtests.',
          'A retraining job that runs all day. I also trained locally on a Mac when I did not want to wait on the cloud.',
        ],
        brief: {
          problem: 'They needed ongoing signals, not a model I trained once and left.',
          constraint: 'The market does not wait for a training window.',
          decision: 'PyTorch time-series models and a retraining job that runs all day.',
          outcome: 'Live signals and backtests without a manual train step.',
        },
      },
      {
        id: 'stealth-news',
        title: 'News processors',
        oneLiner: 'News text in, pivot flags out.',
        points: [
          'Same schedule as the models.',
          'Raw headlines, not a clean vendor feed.',
        ],
        brief: {
          problem: 'Some moves show up in the news before they show up in prices.',
          constraint: 'Live messy text.',
          decision: 'A news processor on the same clock as the forecasting job.',
          outcome: 'Pivot flags from headlines, next to the time-series path.',
        },
      },
      {
        id: 'stealth-agents',
        title: 'Portfolio audit and pre-market brief',
        oneLiner: 'Agents on the old SQL ledger. A morning brief that cut the manual work by about 90%.',
        stack: ['Python', 'SQL', 'LLMs'],
        points: [
          'Agents that query the old SQL and check portfolios.',
          'A daily pre-market brief that cut the morning analysis pass by 90%.',
        ],
        brief: {
          problem: 'Portfolio data lived in old SQL, and someone spent the morning reading it by hand.',
          constraint: 'Modern models on a schema nobody wanted to migrate.',
          decision: 'Agents that query the SQL, plus a PyTorch brief before the open.',
          outcome: 'The morning pass is mostly gone. They run the brief.',
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
      'Forward-deployment engineer — developers, traders, and lawyers on one reporting path, so the numbers stayed auditable and legally compliant.',
      'Designed and shipped a beneficiary management system serving 10,000+ client accounts and cut data processing time by 80%.',
      'Scaled Java and Kafka pipelines and REST APIs used by 50+ internal teams, cutting data-access latency by 15%.',
      'Built a Selenium and TestNG suite that raised test accuracy 22% across hundreds of financial and compliance scenarios.',
      'Stayed on trading, compliance, and market-data APIs after they shipped.',
    ],
    projects: [
      {
        id: 'gs-beneficiary',
        title: 'Beneficiary management',
        oneLiner: '10,000+ accounts. Processing time down 80%.',
        stack: ['Java', 'Kafka'],
        points: [
          'Designed and shipped the beneficiary system behind 10,000+ client accounts.',
          'Cut data processing time by 80%. I stayed on it after launch.',
        ],
        brief: {
          problem: 'Beneficiary data for more than 10,000 accounts was too slow to work with.',
          constraint: 'Compliance, and more than 50 teams reading the same data.',
          decision: 'Java and Kafka, plus a REST API for accounts.',
          outcome: 'Processing time dropped 80%.',
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
          problem: 'Internal teams needed account data they could share over an API.',
          constraint: 'More than 50 consumers, and the APIs had to stay up.',
          decision: 'Same Java and Kafka pipelines, REST on /v1/accounts.',
          outcome: 'Access latency dropped about 15%.',
        },
      },
      {
        id: 'gs-forward',
        title: 'Forward deployment',
        oneLiner: 'Developers, traders, and lawyers on one reporting path.',
        points: [
          'Sat between downstream developers, traders, and lawyers on the same reporting path.',
          'The job was one set of numbers all three sides would sign.',
        ],
        brief: {
          problem: 'Developers, traders, and lawyers all needed the same reporting numbers to hold up in review.',
          constraint: 'Those groups do not share a stack.',
          decision: 'I sat between them and made it one path.',
          outcome: 'One set of numbers the three sides would sign.',
        },
      },
      {
        id: 'gs-test',
        title: 'Selenium and TestNG',
        oneLiner: 'Test accuracy up 22%.',
        stack: ['Selenium', 'TestNG'],
        points: [
          'Built a Selenium and TestNG suite across hundreds of financial and compliance scenarios.',
          'Raised test accuracy 22%.',
        ],
        brief: {
          problem: 'KYC and compliance cases were easy to miss if you checked them by hand.',
          constraint: 'Hundreds of cases. The APIs were already in production.',
          decision: 'Selenium and TestNG on those cases.',
          outcome: 'Accuracy up 22%.',
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
    scan: 'Curtis inventory. Defense apps. Email 70% faster.',
    bullets: [
      'Built inventory pipelines and frontends for Curtis, a government nuclear pipeline contractor.',
      'Led a system-wide upgrade that cut email-server response time by 70%.',
      'Built and maintained secure National Defense web applications.',
    ],
    projects: [
      {
        id: 'od-curtis',
        title: 'Curtis inventory',
        oneLiner: 'Inventory for Curtis, a government nuclear contractor.',
        points: [
          'Pipelines and the screens on top of them.',
          'Existing contractor systems, not a new product.',
        ],
        brief: {
          problem: 'Curtis needed inventory tracking for a government nuclear contract.',
          constraint: 'We were working inside their existing systems.',
          decision: 'I built the pipelines and the frontends.',
          outcome: 'They use it for inventory.',
        },
      },
      {
        id: 'od-email',
        title: 'Email systems',
        oneLiner: 'System-wide upgrade. Response time down 70%.',
        points: [
          'I managed email for the same clients.',
          'A full-path upgrade that cut server response time by 70%.',
        ],
        brief: {
          problem: 'Email was slow for the same clients.',
          constraint: 'The whole mail path, not one mailbox.',
          decision: 'I upgraded the mail servers.',
          outcome: 'Response time dropped 70%.',
        },
      },
      {
        id: 'od-defense',
        title: 'National Defense apps',
        oneLiner: 'Web apps for national defense clients, with security as the starting point.',
        points: [
          'Built and kept full-stack apps for national defense clients.',
          'Security review started with the first ticket, not after launch.',
        ],
        brief: {
          problem: 'Defense clients needed web apps that stayed up and stayed locked down.',
          constraint: 'Security review from the start, not after launch.',
          decision: 'I built and kept those apps.',
          outcome: 'They stayed in service.',
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
      '#1 on the Americas Wild ladder three times — October 2016, January 2019, and November 2025. #1 seed for the 2019 Wild Open. Two-time Americas Continental Qualifier in 2016 and 2017.',
    links: record,
  },
];

export const skills = {
  Languages: ['Java', 'Python', 'Swift', 'SQL', 'JavaScript', 'C++', 'C#'],
  'AI & ML': ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'LangChain', 'NumPy', 'Quantitative modeling'],
  Platforms: ['Spring Boot', 'ASP.NET', 'Apache Kafka', 'Docker', 'GitLab CI/CD'],
  'Agent tooling': ['Claude', 'Cursor', 'n8n', 'OpenClaw'],
  Tools: ['Git', 'Selenium', 'TestNG', 'JUnit'],
};

export const about = {
  lede: 'Chris SuYoung Lee. Suyoung means swim.',
  line: 'Trinity was proofs. Goldman was what a wrong number costs at 10,000 accounts.',
};

export const engage = {
  heading: 'Engage',
  lede: 'Roles, builds, and tutoring.',
  promise: 'Tell me which. I will say yes or no. Builds start in writing.',
  paths: [
    { name: 'Role', detail: 'A job. The stack does not have to be one I already know.' },
    { name: 'Build', detail: 'Technical lead for funded teams — data, automation, or agents.' },
    { name: 'Tutoring', detail: 'Software and math. 60 minutes, one-to-one, remote or in New York.' },
  ],
  rates: [
    { name: 'Diagnostic', price: '$1,000', unit: '90 minutes' },
    { name: 'Build', price: 'From $20,000', unit: 'scoped project' },
    { name: 'Retainer', price: '$12,000', unit: 'per month' },
    { name: 'Day', price: '$3,000', unit: 'day' },
  ],
  notes: [
    'Builds are for teams that already pay for software — not marketing sites, not equity-only.',
    'New York or remote. Builds start with a diagnostic unless the scope is already clear.',
  ],
  cta: 'Email me',
  href: mail,
};

export const contact = {
  heading: 'Email',
  lede: 'Email if you have a role, or a system that is stuck.',
  projectCta: 'Email me',
  href: mail,
};

export const built = {
  lede: 'This site.',
  detail: 'Astro, no React, with a printable CV. Source is on GitHub.',
  href: 'https://github.com/chrisswimlee/chrisswimlee',
};
