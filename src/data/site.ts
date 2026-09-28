export const site = {
  name: 'Chris Swim Lee',
  legalName: 'Chris SuYoung Lee',
  title: 'Chris Swim Lee, New York',
  description:
    'Forward-deployed data systems, local software for work that cannot leave the machine, and a college course in AI. local-host.ai and Connecting Captions.',
  url: 'https://chrisswimlee.com',
  location: 'New York · remote',
  email: 'suyoung.lee99@gmail.com',
  github: 'https://github.com/chrisswimlee',
  linkedin: 'https://www.linkedin.com/in/chris-suyoung-lee',
  photo: '/images/chris.jpg',
  ogImage: '/images/chris-og.jpg',
  jobTitle: 'College Professor',
  built: 'Astro. Printable CV.',
};

export const nav = [
  { href: '/#localhost', label: 'local-host.ai' },
  { href: '/#work', label: 'Work' },
  { href: '/#achievements', label: 'Record' },
  { href: '/experience/', label: 'Experience' },
];

export const mail = `mailto:suyoung.lee99@gmail.com?subject=${encodeURIComponent('Advisory — Chris Swim Lee')}&body=${encodeURIComponent('System:\n\nConstraint:\n\nRequest: technical advisory, architecture audit, or a product question\n')}`;

export const commercialMail = `mailto:suyoung.lee99@gmail.com?subject=${encodeURIComponent(
  'Connecting Captions commercial license',
)}&body=${encodeURIComponent(
  'Organization:\n\nSeat count:\n\nDo you need a written SLA?\n\nAnything else IT or legal needs:\n',
)}`;

export const hero = {
  kicker: 'New York · remote',
  lede: 'Forward-deployed data engineering, local execution where a vendor API is not allowed, and a college course in AI.',
  constraints: [
    'One reporting path that developers, traders, and lawyers would sign.',
    'A live futures book, under 100ms from feed to book.',
    'Defense systems and a nuclear contractor, reviewed from the first ticket.',
    'A college course in AI, and the school’s IT, in the same term.',
  ],
  actions: [
    { label: 'local-host.ai', href: '/#localhost' },
    { label: 'Connecting Captions', href: '/connectingCaptions/' },
    { label: 'Advisory', href: '/engage/' },
  ],
};

export const experienceIntro = 'College professor and IT at HAIT. Contracts start with an email.';

export const achievementsNote = 'The constraint on each job. The writeups are in Experience.';

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
      trains: 'The proof comes before the code.',
      proof: [
        'B.S. in Computer Science and Mathematics, Trinity College.',
        '1823 Scholar — full-ride scholarship.',
      ],
    },
    {
      id: 'build',
      label: 'Implementation',
      domain: 'Enterprise and AI engineering',
      trains: 'The work ships when there’s a date.',
      proof: [
        'Three years at Goldman Sachs — 10,000+ accounts, 50+ internal teams on the APIs.',
        'Founding CTO on a Kraken futures trading engine.',
        'local-host.ai, a local AI framework.',
        'Connecting Captions, live Korean, English, Thai, and Japanese captions on macOS.',
        'Local Lattice, an OpenAI-compatible gateway on PyPI.',
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
  place: string;
  when: string;
  claim: string;
  proof: string;
};

export const technicalAchievements: TechnicalAchievement[] = [
  {
    id: 'hait',
    place: 'HAIT',
    when: '2026 — present',
    claim: 'Taught the first AI course while running the school’s IT.',
    proof: 'Wrote the curriculum, checked the lab machines, and taught the cohort. OpenClaw and OpenAgent for students and staff. Hosting and security included.',
  },
  {
    id: 'stealth',
    place: 'Stealth fintech',
    when: 'Sep 2025 – Aug 2026',
    claim: 'A live Kraken futures engine, from an empty pipeline to orders going out.',
    proof: 'Founding CTO. Python and Kafka, under 100ms from feed to book. Models that retrain all day, and a morning brief that took about 90% of the analysis off the desk.',
  },
  {
    id: 'goldman',
    place: 'Goldman Sachs',
    when: 'May 2022 – Jul 2025',
    claim: 'One reporting path that developers, traders, and lawyers would sign.',
    proof: 'Forward-deployed on the beneficiary system behind 10,000+ accounts. That path ran 80% faster than the one it replaced. More than 50 teams on the APIs.',
  },
  {
    id: 'onedave',
    place: 'One Dave',
    when: 'Oct 2020 – May 2022',
    claim: 'Systems for a government nuclear contractor and national defense clients.',
    proof: 'Inventory pipelines for Curtis, inside the systems they already had. Defense web apps with security review from the first ticket.',
  },
];

export const trading = {
  kicker: 'Stealth fintech · founding CTO',
  title: 'Trading engine',
  metric: '0 → 1',
  metricLabel: 'from market data to live signals',
  problem: 'They wanted live Kraken futures in, and executions out.',
  constraint: 'Kraken crypto futures, and a SQL ledger that was already there.',
  decision: 'Python and Kafka on the Kraken feed. Models for the morning brief. Agents to check the SQL.',
  outcome: 'They still run it.',
};

export const work = {
  lede: 'Connecting Captions is the install. The other cards are the rest of the software.',
};

export const localHost = {
  kicker: 'Product · 2026',
  title: 'local-host.ai',
  url: 'local-host.ai',
  pitch:
    'A local-first agent for private work. It thinks on the Mac, keeps memory on disk, and runs skills you can open.',
  points: [
    'Execution stays on the machine. A vendor API is not part of the design.',
    'Memory stays on disk. Skills are files you can open and change.',
    'For work that is not allowed to leave the building.',
  ],
  image: '/images/work/local-host.jpg',
  links: [
    { label: 'The site', href: 'https://local-host.ai' },
    { label: 'Repository', href: 'https://github.com/chrisswimlee/local-host.ai' },
  ],
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
  featured?: boolean;
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: 'connectingCaptions',
    kind: 'Open source',
    title: 'Connecting Captions',
    url: 'chrisswimlee.com/connectingCaptions',
    year: '2026',
    summary:
      'Live subtitles on a Mac. Translation stays on the machine. Each sentence appears when it is ready.',
    image: '/images/work/connectingCaptions.jpg',
    points: [
      'Set I speak and Show as. A Theater window sits over the slides.',
      'Share the slides window when the room should not see the captions.',
    ],
    links: [
      { label: 'Get it', href: '/connectingCaptions/' },
      { label: 'For work', href: '/connectingCaptions/license/' },
      { label: 'GitHub', href: 'https://github.com/chrisswimlee/connectingCaptions' },
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
      'Walk away and the timer resets. It runs on the Mac by itself.',
      'Twenty characters, five moods, or your own image. It leaves the keyboard alone.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/chrisswimlee/deskbreak' }],
  },
  {
    id: 'haitedu',
    kind: 'Site',
    title: 'HAIT',
    url: 'haitedu.com',
    year: '2026',
    summary: 'Public site and hosting for an AI institute in Chiang Rai.',
    image: '/images/work/haitedu.jpg',
    points: [
      'Rebuilt the front-end and brought the PHP up to date.',
      'Runs the school’s IT.',
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
];

export const connectingCaptions = {
  path: '/connectingCaptions/',
  title: 'Connecting Captions',
  kicker: 'Open source · 2026',
  lede: 'Live subtitles on a Mac. Translation stays on the machine. Each sentence appears when it is ready.',
  description:
    'Live subtitles for macOS, with translation on the machine. Download the latest release.',
  repo: 'https://github.com/chrisswimlee/connectingCaptions',
  image: '/images/work/connectingCaptions.jpg',
  homeImage: '/images/work/connectingCaptions-home.jpg',
  langs: ['Korean', 'English', 'Thai', 'Japanese'],
  brew: [
    'brew tap chrisswimlee/connectingcaptions',
    'brew trust chrisswimlee/connectingcaptions',
    'brew install --cask connectingcaptions',
  ],
  about: [
    'Set I speak and Show as. Translate follows one into the other. The same language needs no download.',
    'Open Theater and press Listen. A new Listen starts with an empty board. A sentence appears when it is ready.',
    'A whole-screen share includes Theater. Share the slides window when viewers should not see the captions.',
    'Translation uses Apple’s on-device Translation. Voice stays on the Mac unless a cloud model is turned on.',
  ],
  needs: [
    'macOS 15 or later. Theater streaming needs Apple Silicon.',
    'Microphone for Listen. Accessibility only if a translation is typed into another app.',
    'A language pack downloads once when I speak and Show as differ.',
  ],
  open: [
    'Download the latest zip and drag Connecting Captions to Applications.',
    'A notarized zip should open without an extra prompt.',
    'Open Theater, allow the microphone, and press Listen.',
  ],
};

/** Same bytes as the versioned release zip. GitHub /releases/latest/download serves this name from the newest release. */
export const releaseDownload = {
  href: 'https://github.com/chrisswimlee/connectingCaptions/releases/latest/download/Connecting-Captions.zip',
  name: 'Connecting-Captions.zip',
  page: 'https://github.com/chrisswimlee/connectingCaptions/releases/latest',
};

export const commercialLicense = {
  path: '/connectingCaptions/license/',
  title: 'Commercial license',
  kicker: 'For work',
  heading: 'Commercial license',
  lede: 'Personal, student, and evaluation use is free under GPLv3. If IT or legal need a vendor they can sanction, request a named commercial license.',
  cta: 'For work: Request a commercial license',
  emailCta: 'Email IT or legal',
  href: commercialMail,
  workTitle: 'For work',
  workLede:
    'The free zip is for people. Firms that need a named license, a security contact, or an SLA should buy a commercial license.',
  answers: [
    {
      question: 'How does this monetize?',
      answer:
        'A named license, and support if you want it. Transcripts, voiceprints, and training data are not part of the sale.',
    },
    {
      question: 'Does voice leave this Mac?',
      answer:
        'It stays on the Mac unless someone turns on a cloud speech model. Theater doesn’t send anything home.',
    },
    {
      question: 'Who fixes a break?',
      answer:
        'Security reports get a reply within 7 days. A paid license can add a written SLA.',
    },
  ],
  points: [
    'Personal and evaluation: the GPLv3 zip. Theater Listen stays unlocked.',
    'Work: a named organization license if IT or legal need a vendor, a signed license on the Mac, or an SLA.',
    'Activation is an offline signed key. It doesn’t call home.',
  ],
  includes: [
    'A named organization license and an air-gapped activation key.',
    'The same security mailbox, with an optional written SLA.',
    'A Licensed to {org} line in the app so procurement can see the Mac is covered.',
  ],
};

export type PreviewZip = {
  href: string;
  name: string;
  tag: string;
  command: string;
};

const fallbackZip = (name: string, tag: string): PreviewZip => {
  const href = `https://github.com/chrisswimlee/connectingCaptions/releases/download/${tag}/${name}`;
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
    const res = await fetch('https://api.github.com/repos/chrisswimlee/connectingCaptions/releases', {
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
    title: 'College Professor',
    dates: '2026 — present',
    location: 'Chiang Rai, remote',
    note: 'IT systems and AI curriculum',
    scan: 'The IT, the public site, and the first AI class.',
    bullets: [
      'Runs hosting and security for the school.',
      'Rebuilt the public site and the PHP under it.',
      'Wrote the first AI curriculum and taught the first cohort.',
      'Set up OpenClaw and OpenAgent workflows, and a data-recollection project with someone at Korea University.',
    ],
    projects: [
      {
        id: 'hait-site',
        title: 'Public site',
        oneLiner: 'The public site is up.',
        stack: ['PHP', 'Hosting'],
        points: [
          'Rebuilt the front-end and upgraded PHP.',
          'Fixed the hosting so the pages load.',
        ],
        brief: {
          problem: 'The school needed a public site that loaded cleanly.',
          constraint: 'We kept the host they already had.',
          decision: 'Redesigned the front-end, upgraded PHP, and fixed the hosting config.',
          outcome: 'The site is live.',
        },
        links: [{ label: 'haitedu.com', href: 'https://haitedu.com' }],
      },
      {
        id: 'hait-it',
        title: 'Institutional IT',
        oneLiner: 'Runs hosting and security for the school.',
        stack: ['Hosting', 'Security'],
        points: [
          'Runs hosting and security.',
          'The site is up.',
        ],
        brief: {
          problem: 'The school needed someone on hosting and security.',
          constraint: 'The public site was going live at the same time.',
          decision: 'Took hosting and security.',
          outcome: 'Hosting and security are still covered.',
        },
      },
      {
        id: 'hait-curriculum',
        title: 'AI curriculum',
        oneLiner: 'Wrote the first course and taught it.',
        points: [
          'Wrote the first AI course.',
          'Checked the lab machines, then taught the class.',
        ],
        brief: {
          problem: 'They needed a first AI course and someone to teach it.',
          constraint: 'First cohort. The lab machines were checked first.',
          decision: 'Wrote the course, checked the machines, and taught the class.',
          outcome: 'The first students finished the course.',
        },
      },
      {
        id: 'hait-agents',
        title: 'Multi-agent orchestration',
        oneLiner: 'OpenClaw and OpenAgent for the school, plus a recollection project with Korea University.',
        stack: ['OpenClaw', 'OpenAgent'],
        points: [
          'OpenClaw and OpenAgent, set up so students and staff can run them.',
          'A separate recollection workflow with a collaborator at Korea University.',
        ],
        brief: {
          problem: 'The school wanted agents students and staff could run, plus a data project with someone at Korea University.',
          constraint: 'Everything had to run on the lab machines.',
          decision: 'OpenClaw and OpenAgent on the teaching side. A separate recollection workflow with that collaborator.',
          outcome: 'Students and staff use the teaching agents. The recollection project is drawn up.',
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
      'Agents that check portfolios against the SQL ledger.',
      'Owned the models: PyTorch time-series, retraining around the clock, news processors for sudden moves, and a daily pre-market brief that cut the morning analysis by 90%.',
    ],
    projects: [
      {
        id: 'stealth-ingest',
        title: 'Kraken futures ingestion',
        oneLiner: 'Python and Kafka on the Kraken feed, under 100ms.',
        stack: ['Python', 'Kafka'],
        points: [
          'Millions of ticks. Under 100ms end to end.',
          'Python and Kafka on the official feed.',
        ],
        brief: {
          problem: 'A live feed into the trading book.',
          constraint: 'Kraken crypto futures, under 100ms.',
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
          'A retraining job that runs all day, plus local training on a Mac.',
        ],
        brief: {
          problem: 'They wanted signals that kept up with the market.',
          constraint: 'Training had to keep going through the day.',
          decision: 'PyTorch time-series models, retraining all day.',
          outcome: 'Live signals and backtests. The models retrain on their own.',
        },
      },
      {
        id: 'stealth-news',
        title: 'News processors',
        oneLiner: 'News text in, pivot flags out.',
        points: [
          'Same schedule as the models.',
          'It reads live headlines and flags pivots.',
        ],
        brief: {
          problem: 'Some moves show up in the news before they show up in prices.',
          constraint: 'The input is live headlines.',
          decision: 'A news processor on the same clock as the forecasting job.',
          outcome: 'Pivot flags from headlines, next to the time-series path.',
        },
      },
      {
        id: 'stealth-agents',
        title: 'Portfolio audit and pre-market brief',
        oneLiner: 'Agents on the SQL ledger, and a morning brief that took about 90% of the analysis off the desk.',
        stack: ['Python', 'SQL', 'LLMs'],
        points: [
          'Agents that query the SQL and check portfolios.',
          'A daily pre-market brief that cut the morning analysis pass by 90%.',
        ],
        brief: {
          problem: 'The morning portfolio check lived in SQL.',
          constraint: 'The models had to work with the ledger they already used.',
          decision: 'Agents that query the SQL, plus a PyTorch brief before the open.',
          outcome: 'They run the brief every morning.',
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
          'Cut data processing time by 80%. Stayed on it after launch.',
        ],
        brief: {
          problem: 'More than 10,000 accounts needed a beneficiary system people could use.',
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
          constraint: 'More than 50 teams were on it, and the APIs had to stay up.',
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
          problem: 'Developers, traders, and lawyers all had to sign the same numbers.',
          constraint: 'Three groups, one report.',
          decision: 'Sat between the three groups and made one path.',
          outcome: 'One set of numbers all three would sign.',
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
          problem: 'KYC and compliance checks needed a real test suite.',
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
          'Built inside their contractor systems.',
        ],
        brief: {
          problem: 'Curtis needed inventory tracking for a government nuclear contract.',
          constraint: 'We were working inside their existing systems.',
          decision: 'Built the pipelines and the frontends.',
          outcome: 'They use it for inventory.',
        },
      },
      {
        id: 'od-email',
        title: 'Email systems',
        oneLiner: 'System-wide upgrade. Response time down 70%.',
        points: [
          'Managed email for the same clients.',
          'A full-path upgrade that cut server response time by 70%.',
        ],
        brief: {
          problem: 'The same clients needed faster email.',
          constraint: 'The upgrade covered the whole mail path.',
          decision: 'Upgraded the mail servers.',
          outcome: 'Response time dropped 70%.',
        },
      },
      {
        id: 'od-defense',
        title: 'National Defense apps',
        oneLiner: 'Web apps for national defense clients, with security as the starting point.',
        points: [
          'Built and kept full-stack apps for national defense clients.',
          'Security review from the first ticket.',
        ],
        brief: {
          problem: 'Defense clients needed web apps that stayed up and stayed locked down.',
          constraint: 'Security review from the first ticket.',
          decision: 'Built those apps and kept them running.',
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
  Data: ['SQL', 'Apache Kafka'],
  Delivery: ['Docker', 'GitLab CI/CD', 'Git'],
  Platforms: ['Spring Boot', 'ASP.NET'],
  'Agent tooling': ['Claude', 'Cursor', 'n8n', 'OpenClaw'],
  Testing: ['Selenium', 'TestNG', 'JUnit'],
};

export const about = {
  lede: 'Chris SuYoung Lee. Suyoung means swim.',
  line: 'Trinity was proofs. Goldman was one reporting path. The work now is local software and a college course.',
};

export const engage = {
  heading: 'Advisory',
  lede: 'A written advisory, an architecture audit, or a product you run. Prices are for the first two.',
  promise: 'Name the system, the constraint, and which of the three you want.',
  paths: [
    {
      name: 'Technical advisory',
      detail: 'Ninety minutes on a system that is already running. The diagnostic rate is the price.',
    },
    {
      name: 'Architecture audit',
      detail: 'The data path, the boundary, and what is not allowed to leave.',
    },
    {
      name: 'Product trial',
      detail: 'Connecting Captions is a notarized zip. local-host.ai is the product site and the repository.',
    },
  ],
  rates: [
    { name: 'Diagnostic', price: '$1,000', unit: '90 minutes' },
    { name: 'Build', price: 'From $20,000', unit: 'scoped project' },
    { name: 'Retainer', price: '$12,000', unit: 'per month' },
    { name: 'Day', price: '$3,000', unit: 'day' },
  ],
  notes: [
    'New York or remote.',
    'The email should name the system and the constraint.',
  ],
  cta: 'Request an advisory',
  href: mail,
};

export const contact = {
  heading: 'Advisory',
  lede: 'Inbound is a written advisory, an architecture audit, or a product you run.',
  projectCta: 'Advisory',
  href: '/engage/',
};

export const built = {
  lede: 'This site.',
  detail: 'Astro, and a CV you can print. The source is on GitHub.',
  href: 'https://github.com/chrisswimlee/chrisswimlee',
};
