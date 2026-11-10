import type { ImageMetadata } from 'astro';
import chrisPhoto from '../assets/chris.jpg';
import connectingCaptionsShot from '../assets/work/connectingCaptions.jpg';
import connectingCaptionsHomeShot from '../assets/work/connectingCaptions-home.jpg';
import connectingCaptionsSiteShot from '../assets/work/connectingCaptions-site.jpg';
import d22sosoShot from '../assets/work/d22soso.jpg';
import deskbreakShot from '../assets/work/deskbreak.jpg';
import haiteduShot from '../assets/work/haitedu.jpg';
import localHostShot from '../assets/work/local-host.jpg';
import localHostSiteShot from '../assets/work/local-host-site.jpg';
import localLatticeShot from '../assets/work/local-lattice.jpg';
import d22ArchiveShot from '../assets/work/d22soso-archive.jpg';
import connectingCaptionsTheaterShot from '../assets/work/connectingCaptions-theater.jpg';
import connectingCaptionsLanguagesShot from '../assets/work/connectingCaptions-languages.jpg';
import phonecodingShot from '../assets/work/phonecoding.jpg';
import twoHandShot from '../assets/work/2handholdem.jpg';

export const site = {
  name: 'Chris Swim Lee',
  legalName: 'Chris SuYoung Lee',
  title: 'Chris Swim Lee — Software engineer, local AI and data systems',
  description:
    'I build data systems and local software for work that can’t leave the machine, and I teach AI at a college in Thailand. I make local-host.ai and Connecting Captions.',
  url: 'https://chrisswimlee.com',
  location: 'New York · remote',
  email: 'suyoung.lee99@gmail.com',
  github: 'https://github.com/chrisswimlee',
  linkedin: 'https://www.linkedin.com/in/chris-suyoung-lee',
  photo: chrisPhoto,
  ogImage: '/images/chris-og.jpg',
  jobTitle: 'Software Engineer',
  built: 'Data systems and local tools.',
};

export const nav = [
  { href: '/hire/', label: 'Hire me' },
  { href: '/experience/', label: 'Experience' },
  { href: '/connectingCaptions/', label: 'Captions' },
  { href: '/#localhost', label: 'local-host.ai' },
];
// The town and the system map are extras: linked from the homepage and footer, not the top nav.

export const mail = `mailto:suyoung.lee99@gmail.com?subject=${encodeURIComponent('Pricing — Chris Swim Lee')}&body=${encodeURIComponent('Which tier: scoping call, architecture audit, custom build, or complete works\n\nWhat you need:\n\nConstraint:\n')}`;

export const commercialMail = `mailto:support@local-host.ai?subject=${encodeURIComponent(
  'Connecting Captions commercial license',
)}&body=${encodeURIComponent(
  'Organization:\n\nMac count (5 minimum):\n\nWork license $240/Mac/year (schools $120). Add written SLA $3,000/org/year? (yes/no)\n\nMDM / Jamf pkg $2,500 once? (yes/no)\n\nAnything else IT or legal needs:\n',
)}`;

export const hero = {
  kicker: 'Ex-Goldman Sachs · New York · remote',
  lede: 'I’m a software engineer. I build data systems, and local tools for work that can’t go through a vendor API. These days I also teach an AI course.',
  constraints: [
    'At Goldman, one reporting path that developers, traders, and lawyers all signed off on.',
    'A live crypto futures engine that gets a tick onto the book in under 100ms.',
    'Web apps for defense clients and a nuclear contractor, with security review from the first ticket.',
    'A first AI course at a college, plus the school’s IT, in the same term.',
  ],
  actions: [
    { label: 'local-host.ai', href: '/#localhost' },
    { label: 'Connecting Captions', href: '/connectingCaptions/' },
    { label: 'Pricing', href: '/engage/' },
  ],
};

// The /hire/ page: the recruiter-facing dossier. No pricing on this one.
export const hireMail = `mailto:suyoung.lee99@gmail.com?subject=${encodeURIComponent('Role — Chris Swim Lee')}`;

export const hire = {
  path: '/hire/',
  title: 'Hire me',
  kicker: 'Open to AI roles · US',
  role: 'Software engineer for AI and data systems.',
  lede: 'Three years at Goldman Sachs, then founding CTO of a fintech. Now I build local AI tools and teach a college AI course.',
  // Single source for the proof stats: HireHero and SystemMap both render this.
  proof: [
    { value: '80%', label: 'less processing time on a 10,000-account system', source: 'Goldman Sachs' },
    { value: '<100ms', label: 'from market feed to order book', source: 'Founding CTO' },
    { value: '90%', label: 'less morning analysis with a daily pre-market brief', source: 'Founding CTO' },
    { value: '50+', label: 'internal teams on my Kafka and REST pipelines', source: 'Goldman Sachs' },
  ],
  recordNote: 'What each job was really about. The longer versions are under Experience.',
  workNote: 'Things I built and shipped on my own, with the source.',
  contactHeading: 'Hiring for AI or data systems?',
  contactLede: 'Send me the role and the team. I reply within a day, and I can talk through any project here in depth.',
};

export const achievementsNote = 'What each job was really about. The longer versions are under Experience.';

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
    claim: 'Wrote and taught the school’s first AI course, and ran its IT.',
    proof: 'I wrote the curriculum, checked the lab machines, and taught the first cohort. I also set up OpenClaw and OpenAgent for students and staff, and handle the school’s hosting and security.',
  },
  {
    id: 'stealth',
    place: 'Stealth fintech',
    when: 'Sep 2025 — Aug 2026',
    claim: 'Took a Kraken futures engine from nothing to live orders.',
    proof: 'As founding CTO I built it on Python and Kafka, with under 100ms from feed to book. The models retrain through the day, and a morning brief cut the desk’s analysis work by about 90%.',
  },
  {
    id: 'goldman',
    place: 'Goldman Sachs',
    when: 'May 2022 — Jul 2025',
    claim: 'One reporting path that developers, traders, and lawyers all signed off on.',
    proof: 'I was embedded with the team on the beneficiary system behind 10,000+ accounts. The new path ran 80% faster than the old one, and more than 50 teams used the APIs.',
  },
  {
    id: 'onedave',
    place: 'One Dave',
    when: 'Oct 2020 — May 2022',
    claim: 'Built systems for a government nuclear contractor and for national defense clients.',
    proof: 'I built inventory pipelines for Curtis that worked inside the systems they already had, and defense web apps that went through security review from the first ticket.',
  },
];

export const work = {
  lede: 'Connecting Captions is the one most people install. The rest are other things I’ve built.',
};

export const localHost = {
  kicker: 'Product, 2026',
  title: 'local-host.ai',
  url: 'local-host.ai',
  pitch:
    'Software that stays on the Mac. Connecting Captions is the release you can install. A local agent, with memory on disk and skills you can open, is still coming.',
  points: [
    'The site leads with Connecting Captions. Speech and translation run on the machine.',
    'The agent is listed as still coming. It is meant to think on the device and keep its memory on disk.',
    'The rule for both: it runs on your computer, and you own it.',
  ],
  image: localHostShot,
  links: [
    { label: 'Visit local-host.ai', href: 'https://local-host.ai' },
    { label: 'GitHub', href: 'https://github.com/chrisswimlee/local-host.ai' },
  ],
};

type Project = {
  id: string;
  kind: string;
  title: string;
  url: string;
  year: string;
  summary: string;
  image?: ImageMetadata;
  points: string[];
  command?: string;
  commandNote?: string;
  featured?: boolean;
  links: { label: string; href: string }[];
  /** A write-up gets its own page at /work/<id>/. Projects without one stay as cards. */
  story?: ProjectStory;
};

type ProjectStory = {
  stack: string[];
  shots: { image: ImageMetadata; alt: string }[];
  brief: { problem: string; constraint: string; decision: string; outcome: string };
};

export const projects: Project[] = [
  {
    id: 'connectingCaptions',
    kind: 'Open source',
    title: 'Connecting Captions',
    url: 'chrisswimlee.com/connectingCaptions',
    year: '2026',
    summary:
      'Live subtitles for your Mac. Translation happens on the machine, and each sentence shows up as soon as it’s ready.',
    image: connectingCaptionsSiteShot,
    featured: true,
    points: [
      'Pick the language you speak and the one to show. A Theater window sits over your slides.',
      'Share just the slides window if the room shouldn’t see the captions.',
    ],
    links: [
      { label: 'Get it', href: '/connectingCaptions/' },
      { label: 'For work', href: '/connectingCaptions/license/' },
      { label: 'GitHub', href: 'https://github.com/chrisswimlee/connectingCaptions' },
    ],
    story: {
      stack: ['macOS', 'Apple Speech', 'On-device Translation', 'GPLv3'],
      shots: [
        { image: connectingCaptionsTheaterShot, alt: 'Theater captions: Hello. and 안녕.' },
        { image: connectingCaptionsLanguagesShot, alt: 'Theater Home: English to Korean, on this Mac.' },
      ],
      brief: {
        problem:
          'A room rarely shares one language, and most live caption tools send the speaker’s voice to a server before anything shows up.',
        constraint:
          'The voice had to stay on the Mac, and the captions had to keep pace with someone talking in front of a room.',
        decision:
          'Apple’s on-device speech and Translation, a Theater window that shows each sentence the moment it’s ready, and a separate slides window so the room only sees what you share.',
        outcome:
          'A notarized Mac app and a Homebrew cask, open source under GPLv3, with a personal key and work licenses for organizations.',
      },
    },
  },
  {
    id: 'deskbreak',
    kind: 'Open source',
    title: 'DeskBreak',
    url: 'github.com/chrisswimlee/deskbreak',
    year: '2026',
    summary:
      'A menu-bar timer for people who sit too long. After 40 minutes, a little character pops up and tells you to stand.',
    image: deskbreakShot,
    points: [
      'Walk away and the timer resets by itself. Nothing leaves your Mac.',
      'Choose from twenty characters and five moods, or use your own image. It never touches your keyboard.',
    ],
    links: [{ label: 'GitHub', href: 'https://github.com/chrisswimlee/deskbreak' }],
    story: {
      stack: ['macOS', 'Menu bar', 'MIT'],
      shots: [{ image: deskbreakShot, alt: 'DeskBreak on GitHub.' }],
      brief: {
        problem: 'Working at a desk, it’s easy to sit for hours without noticing.',
        constraint:
          'The reminder had to stay out of the way: no keyboard access, and nothing leaving the Mac.',
        decision:
          'A menu-bar timer. After 40 minutes a little character pops up and tells you to stand, and if you walk away the timer resets by itself.',
        outcome:
          'Open source under MIT, with twenty characters, five moods, and room for your own image.',
      },
    },
  },
  {
    id: 'haitedu',
    kind: 'Site',
    title: 'HAIT',
    url: 'haitedu.com',
    year: '2026',
    summary: 'The public site and hosting for an AI institute in Chiang Rai.',
    image: haiteduShot,
    points: [
      'I rebuilt the front end and brought the PHP up to date.',
      'I also run the school’s IT.',
    ],
    links: [{ label: 'Live site', href: 'https://haitedu.com' }],
  },
  {
    id: 'local-host-site',
    kind: 'Site',
    title: 'local-host.ai',
    url: 'local-host.ai',
    year: '2026',
    summary: 'The home for my software that stays on the Mac. Right now it leads with Connecting Captions.',
    image: localHostSiteShot,
    points: [
      'Download Connecting Captions, read the product page, or get a license for work.',
      'Speech and translation run on the device. The local agent is listed as still coming.',
    ],
    links: [{ label: 'Live site', href: 'https://local-host.ai' }],
  },
  {
    id: 'phonecoding',
    kind: 'Site',
    title: 'PhoneCoding',
    url: 'phonecoding.ai',
    year: '2026',
    summary:
      'PhoneCoding Studio builds SwiftUI apps from the iPhone you’re holding. You speak the change and review the diff with one thumb.',
    image: phonecodingShot,
    points: [
      'Learn teaches SwiftUI on the phone, using the same iOS diff you just shipped.',
      'Studio for iOS is in early build. The Android studio is under development.',
    ],
    links: [{ label: 'Live site', href: 'https://phonecoding.ai' }],
    story: {
      stack: ['SwiftUI', 'iOS'],
      shots: [{ image: phonecodingShot, alt: 'phonecoding.ai' }],
      brief: {
        problem: 'Building an iPhone app usually means sitting at a Mac with Xcode open.',
        constraint: 'All of it had to work on the phone, one-handed, including reviewing what changed.',
        decision:
          'Studio takes a spoken change and shows the diff for one-thumb review. Learn teaches SwiftUI with the same diff you just shipped.',
        outcome:
          'phonecoding.ai is live. Studio for iOS is in early build, and the Android studio is under development.',
      },
    },
  },
  {
    id: 'd22soso',
    kind: 'Site',
    title: 'D22-soso',
    url: 'd22soso.com',
    year: '2025',
    summary:
      'A site for Wayne “D22-soso” Chiang: 1999 Brood War World Champion, WSOP talent manager, and inventor of 2 Hand Hold’em.',
    image: d22sosoShot,
    points: [
      'The homepage is a 3D archive of his career. Drag to turn it, and click a sign to go in.',
      'The older page, with the poker work and 2 Hand Hold’em, is still up as the classic site.',
    ],
    links: [
      { label: 'Live site', href: 'https://d22soso.com' },
      { label: 'Classic site', href: 'https://d22soso.com/classic.html' },
    ],
    story: {
      stack: ['3D', 'Web'],
      shots: [
        { image: d22ArchiveShot, alt: 'The Living Archive at d22soso.com, a rotatable 3D map of Wayne Chiang’s career.' },
      ],
      brief: {
        problem:
          'Wayne Chiang’s career runs from a Brood War world title to WSOP talent management to a patented table game, and a flat page buried most of it.',
        constraint: 'The older page, with the poker work and 2 Hand Hold’em, had to stay reachable.',
        decision:
          'A 3D archive as the homepage. You drag to turn it and click a sign to go in, and the older page stays up as the classic site.',
        outcome: 'd22soso.com is live, and the game now has its own site at 2handholdem.com.',
      },
    },
  },
  {
    id: '2handholdem',
    kind: 'Site',
    title: '2 Hand Hold’em',
    url: '2handholdem.com',
    year: '2026',
    summary:
      'The site for D22-soso’s patented table game. You split four hole cards into two Hold’em hands and play both against one dealer.',
    image: twoHandShot,
    points: [
      'Play free in the browser or on iPhone, find a live table, or license it for a casino.',
      'Three U.S. patents, WSGC certified, and dealt in four live casinos.',
    ],
    links: [
      { label: 'Live site', href: 'https://2handholdem.com' },
      { label: 'Play in the browser', href: 'https://2handholdem.com/play/' },
    ],
  },
  {
    id: 'lattice',
    kind: 'Open source',
    title: 'Local Lattice',
    url: 'pypi.org/project/local-lattice',
    year: '2026',
    summary:
      'A local gateway that speaks the OpenAI API. You ask for a role like coder or reasoner, and it chooses the model.',
    points: [
      'Works with MLX, LM Studio, or a cloud key.',
      'It can send one question to several models and have them vote, chain, or debate the answers.',
    ],
    command: 'pip install local-lattice',
    commandNote: 'role:coder · role:reasoner · role:fast',
    links: [
      { label: 'GitHub', href: 'https://github.com/chrisswimlee/local-lattice' },
      { label: 'PyPI', href: 'https://pypi.org/project/local-lattice/' },
    ],
    story: {
      stack: ['Python', 'OpenAI API', 'PyPI'],
      shots: [{ image: localLatticeShot, alt: 'Diagram: apps ask Local Lattice for a role such as role:coder, and it routes the request to MLX, LM Studio, or a cloud key, or runs several models to vote, chain, or debate.' }],
      brief: {
        problem:
          'Every local model server and cloud provider names its models differently, so apps hard-code one and break when you switch.',
        constraint: 'Apps already speak the OpenAI API, so the fix couldn’t ask them to change.',
        decision:
          'A gateway that speaks the OpenAI API but takes a role like coder or reasoner instead of a model name, then routes to MLX, LM Studio, or a cloud key. It can also send one question to several models and have them vote, chain, or debate.',
        outcome: 'Published on PyPI as local-lattice, so it’s one pip install.',
      },
    },
  },
];

export const storyPath = (id: string) => `/work/${id}/`;

/** A project's links, plus “Read more” when it has a write-up page. */
export const projectLinks = (project: Project) =>
  project.story ? [...project.links, { label: 'Read more', href: storyPath(project.id) }] : project.links;

export const connectingCaptions = {
  path: '/connectingCaptions/',
  title: 'Connecting Captions',
  kicker: 'Open source, 2026',
  lede: 'Live subtitles for your Mac. Translation happens on the machine, and each sentence shows up as soon as it’s ready.',
  description:
    'Live subtitles for macOS, translated on your machine. Download the latest release.',
  repo: 'https://github.com/chrisswimlee/connectingCaptions',
  image: connectingCaptionsShot,
  homeImage: connectingCaptionsHomeShot,
  langs: ['Korean', 'English', 'Thai', 'Japanese'],
  brew: [
    'brew tap chrisswimlee/connectingcaptions',
    'brew trust chrisswimlee/connectingcaptions',
    'brew install --cask connectingcaptions',
  ],
  about: [
    'Choose the language you speak (“I speak”) and the language to display (“Show as”). Translation runs from one to the other, and if they match, there’s nothing to download.',
    'Open Theater and press Listen. Each Listen starts with a blank board, and every sentence appears once it’s ready.',
    'If you share your whole screen, viewers will see Theater too. Share only the slides window if they shouldn’t.',
    'Translation uses Apple’s on-device Translation. Your voice stays on the Mac unless you turn on a cloud model.',
  ],
  needs: [
    'macOS 15 or later. Theater streaming needs Apple Silicon.',
    'Microphone access for Listen. Accessibility access only if you want translations typed into another app.',
    'A one-time language pack download when the two languages differ.',
  ],
  open: [
    'Download the latest zip and drag Connecting Captions into Applications.',
    'The zip is notarized, so it should open without an extra security prompt.',
    'Open Theater, allow the microphone, and press Listen.',
  ],
};

/** Same bytes as the versioned release zip. GitHub /releases/latest/download serves this name from the newest release. */
export const releaseDownload = {
  href: 'https://github.com/chrisswimlee/connectingCaptions/releases/latest/download/Connecting-Captions.zip',
  name: 'Connecting-Captions.zip',
  page: 'https://github.com/chrisswimlee/connectingCaptions/releases/latest',
};

/**
 * Connecting Captions prices — the single source of truth.
 * pricing.astro, license.astro, the estimator, and every mailto derive from
 * here. Change a number once, here. (Supersedes the $60/Mac rates briefly
 * published on origin/main in c7c47c0.)
 */
export const captionsPricing = {
  personal: { launch: 29, regular: 49, trialDays: 14, maxMacs: 2 },
  appStore: { ios: 9.99, mac: 19.99, macUpgrade: 9.99 },
  work: { perMac: 240, schoolPerMac: 120, minimumMacs: 5, slaPerOrg: 3000, mdmOnce: 2500 },
} as const;

const usd = (n: number) => `$${n.toLocaleString('en-US')}`;

export const commercialLicense = {
  path: '/connectingCaptions/license/',
  title: 'Commercial license',
  kicker: 'For work',
  heading: 'Commercial license',
  lede: `Any Mac an organization owns needs a work license: ${usd(captionsPricing.work.perMac)} per Mac per year (${usd(captionsPricing.work.schoolPerMac)} for schools), ${captionsPricing.work.minimumMacs} Macs minimum. Personal Macs use the personal key — ${captionsPricing.personal.trialDays}-day trial, then ${usd(captionsPricing.personal.regular)} once.`,
  cta: 'For work: prices',
  emailCta: 'Email to buy',
  href: commercialMail,
  workTitle: 'For work',
  workLede: `Personal Macs: ${captionsPricing.personal.trialDays}-day trial, then a ${usd(captionsPricing.personal.regular)} key. Organization Macs: a named work license at ${usd(captionsPricing.work.perMac)} per Mac per year.`,
  rates: [
    {
      name: 'Work license',
      price: usd(captionsPricing.work.perMac),
      unit: 'Mac / year',
      detail: `${captionsPricing.work.minimumMacs} Macs minimum. Offline key. Licensed to the organization.`,
    },
    {
      name: 'Work license — schools',
      price: usd(captionsPricing.work.schoolPerMac),
      unit: 'Mac / year',
      detail: `${captionsPricing.work.minimumMacs} Macs minimum, so from ${usd(captionsPricing.work.schoolPerMac * captionsPricing.work.minimumMacs)} a year.`,
    },
    {
      name: 'Written SLA',
      price: usd(captionsPricing.work.slaPerOrg),
      unit: 'organization / year',
      detail: 'Security reply in 7 days, plus a weekday window if Listen breaks.',
    },
    {
      name: 'MDM / Jamf pkg',
      price: usd(captionsPricing.work.mdmOnce),
      unit: 'once',
      detail: 'App, key, seat list, and caption policy. IT signs the pkg.',
    },
  ],
  buyCopy: `Email the organization and how many Macs (${captionsPricing.work.minimumMacs} minimum). A key goes out the same day. Custom overlay, glossary, or fleet work is Engage, not this license.`,
  answers: [
    {
      question: 'How does this monetize?',
      answer: `Personal keys are ${usd(captionsPricing.personal.regular)} once. Work licenses are ${usd(captionsPricing.work.perMac)} per Mac per year (${usd(captionsPricing.work.schoolPerMac)} for schools), SLA ${usd(captionsPricing.work.slaPerOrg)} per organization per year, MDM pkg ${usd(captionsPricing.work.mdmOnce)} once. Transcripts, voiceprints, and training data are not part of the sale.`,
    },
    {
      question: 'Does voice leave this Mac?',
      answer:
        'No, unless someone turns on a cloud speech model. Theater doesn’t send anything back to me.',
    },
    {
      question: 'Who fixes a break?',
      answer:
        'I reply to security reports within 7 days, and a paid license can include a written SLA.',
    },
  ],
  points: [
    `Personal: ${captionsPricing.personal.trialDays}-day trial, then a ${usd(captionsPricing.personal.regular)} key for one person on up to ${captionsPricing.personal.maxMacs} of their own Macs. The source stays GPLv3.`,
    'Work: a named organization license for any Mac the organization owns, with a signed license on the Mac and an optional SLA.',
    'Activation is an offline signed key, and it never phones home.',
  ],
  includes: [
    'A named organization license and an air-gapped activation key.',
    'The same security contact, with an optional written SLA.',
    'A “Licensed to {org}” line in the app, so procurement can see the Mac is covered.',
  ],
};

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
    scan: 'IT, the public site, and the first AI class.',
    bullets: [
      'Run hosting and security for the school.',
      'Rebuilt the public site and the PHP underneath it.',
      'Wrote the school’s first AI curriculum and taught the first cohort.',
      'Set up OpenClaw and OpenAgent workflows, and started a data-recollection project with a collaborator at Korea University.',
    ],
    projects: [
      {
        id: 'hait-site',
        title: 'Public site',
        oneLiner: 'A rebuilt public site that loads cleanly.',
        stack: ['PHP', 'Hosting'],
        points: [
          'Rebuilt the front end and upgraded PHP.',
          'Fixed the hosting config so pages load reliably.',
        ],
        brief: {
          problem: 'The school needed a public site that loaded cleanly.',
          constraint: 'They wanted to keep their existing host.',
          decision: 'I redesigned the front end, upgraded PHP, and fixed the hosting config.',
          outcome: 'The site is live at haitedu.com.',
        },
        links: [{ label: 'haitedu.com', href: 'https://haitedu.com' }],
      },
      {
        id: 'hait-it',
        title: 'Institutional IT',
        oneLiner: 'Hosting and security for the school.',
        stack: ['Hosting', 'Security'],
        points: [
          'I handle hosting and security day to day.',
          'The public site stays up.',
        ],
        brief: {
          problem: 'The school needed someone on hosting and security.',
          constraint: 'The public site was going live at the same time.',
          decision: 'I took over hosting and security.',
          outcome: 'Both are still covered.',
        },
      },
      {
        id: 'hait-curriculum',
        title: 'AI curriculum',
        oneLiner: 'Wrote the first AI course and taught it.',
        points: [
          'Wrote the school’s first AI course.',
          'Checked the lab machines, then taught the class.',
        ],
        brief: {
          problem: 'They needed a first AI course and someone to teach it.',
          constraint: 'It was the first cohort, and the lab machines needed checking first.',
          decision: 'I wrote the course, checked the machines, and taught the class.',
          outcome: 'The first students finished the course.',
        },
      },
      {
        id: 'hait-agents',
        title: 'Multi-agent orchestration',
        oneLiner: 'OpenClaw and OpenAgent for the school, plus a recollection project with a Korea University collaborator.',
        stack: ['OpenClaw', 'OpenAgent'],
        points: [
          'OpenClaw and OpenAgent, set up so students and staff can run them.',
          'A separate recollection workflow with a collaborator at Korea University.',
        ],
        brief: {
          problem: 'The school wanted agents students and staff could run, plus a data project with someone at Korea University.',
          constraint: 'Everything had to run on the lab machines.',
          decision: 'OpenClaw and OpenAgent for teaching, and a separate recollection workflow with that collaborator.',
          outcome: 'Students and staff use the teaching agents. The recollection project is planned.',
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
    scan: 'Kraken futures, ingest under 100ms.',
    bullets: [
      'Built a trading engine on Kraken crypto futures in Python and Kafka, with under 100ms from feed to book.',
      'Wrote agents that check portfolios against the SQL ledger.',
      'Owned the models: PyTorch time-series models that retrain around the clock, news processors that catch sudden moves, and a daily pre-market brief that cut morning analysis by 90%.',
    ],
    projects: [
      {
        id: 'stealth-ingest',
        title: 'Kraken futures ingestion',
        oneLiner: 'Python and Kafka on the Kraken feed, under 100ms.',
        stack: ['Python', 'Kafka'],
        points: [
          'Millions of ticks, under 100ms end to end.',
          'Python and Kafka on the official feed.',
        ],
        brief: {
          problem: 'They needed a live feed going into the trading book.',
          constraint: 'Kraken crypto futures, and under 100ms.',
          decision: 'Python and Kafka on the official feed, with agents on top of the book.',
          outcome: 'Ticks come in and orders go out.',
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
          constraint: 'Training had to continue throughout the day.',
          decision: 'PyTorch time-series models that retrain all day.',
          outcome: 'Live signals and backtests, with models that retrain on their own.',
        },
      },
      {
        id: 'stealth-news',
        title: 'News processors',
        oneLiner: 'News text in, pivot flags out.',
        points: [
          'It runs on the same schedule as the models.',
          'It reads live headlines and flags pivots.',
        ],
        brief: {
          problem: 'Some moves show up in the news before they show up in prices.',
          constraint: 'The input is live headlines.',
          decision: 'A news processor running on the same schedule as the forecasting job.',
          outcome: 'Pivot flags from headlines, alongside the time-series signals.',
        },
      },
      {
        id: 'stealth-agents',
        title: 'Portfolio audit and pre-market brief',
        oneLiner: 'Agents on the SQL ledger, and a morning brief that cut the desk’s analysis work by about 90%.',
        stack: ['Python', 'SQL', 'LLMs'],
        points: [
          'Agents that query the SQL and check portfolios.',
          'A daily pre-market brief that cut the morning analysis by 90%.',
        ],
        brief: {
          problem: 'The morning portfolio check was all manual SQL.',
          constraint: 'The models had to work with the ledger they already used.',
          decision: 'Agents that query the SQL, plus a PyTorch-based brief before the open.',
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
    scan: '80% faster processing, embedded with the team, 50+ internal teams.',
    bullets: [
      'Embedded engineer between developers, traders, and lawyers, building one reporting path so the numbers stayed auditable and compliant.',
      'Designed and shipped a beneficiary management system for 10,000+ client accounts and cut data processing time by 80%.',
      'Scaled Java and Kafka pipelines and REST APIs used by 50+ internal teams, cutting data-access latency by 15%.',
      'Built a Selenium and TestNG suite that raised test accuracy 22% across hundreds of financial and compliance scenarios.',
      'Kept supporting the trading, compliance, and market-data APIs after they shipped.',
    ],
    projects: [
      {
        id: 'gs-beneficiary',
        title: 'Beneficiary management',
        oneLiner: '10,000+ accounts, with processing time down 80%.',
        stack: ['Java', 'Kafka'],
        points: [
          'Designed and shipped the beneficiary system behind 10,000+ client accounts.',
          'Cut data processing time by 80%, and stayed on it after launch.',
        ],
        brief: {
          problem: 'More than 10,000 accounts needed a beneficiary system that people could actually use.',
          constraint: 'Compliance requirements, and more than 50 teams reading the same data.',
          decision: 'Java and Kafka, with a REST API for accounts.',
          outcome: 'Processing time dropped 80%.',
        },
      },
      {
        id: 'gs-apis',
        title: 'Java, Kafka, and REST',
        oneLiner: 'Pipelines and APIs used by 50+ internal teams, with latency down 15%.',
        stack: ['Java', 'Kafka', 'REST'],
        points: [
          'Scaled Java and Kafka pipelines and REST APIs used by 50+ internal teams.',
          'Cut data-access latency by 15%.',
        ],
        brief: {
          problem: 'Internal teams needed to share account data over an API.',
          constraint: 'More than 50 teams depended on it, so the APIs had to stay up.',
          decision: 'The same Java and Kafka pipelines, exposed over REST at /v1/accounts.',
          outcome: 'Access latency dropped about 15%.',
        },
      },
      {
        id: 'gs-forward',
        title: 'Forward deployment',
        oneLiner: 'Developers, traders, and lawyers on one reporting path.',
        points: [
          'I sat between the developers, traders, and lawyers who all used the same reporting path.',
          'The goal was one set of numbers all three groups would sign off on.',
        ],
        brief: {
          problem: 'Developers, traders, and lawyers all had to sign off on the same numbers.',
          constraint: 'Three groups, one report.',
          decision: 'I worked between the three groups and built one path.',
          outcome: 'One set of numbers all three groups signed off on.',
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
          problem: 'KYC and compliance checks needed a proper test suite.',
          constraint: 'Hundreds of cases, and the APIs were already in production.',
          decision: 'Selenium and TestNG across those cases.',
          outcome: 'Test accuracy went up 22%.',
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
    scan: 'Curtis inventory, defense apps, email 70% faster.',
    bullets: [
      'Built inventory pipelines and frontends for Curtis, a government nuclear pipeline contractor.',
      'Led a system-wide upgrade that cut email-server response time by 70%.',
      'Built and maintained secure National Defense web applications.',
    ],
    projects: [
      {
        id: 'od-curtis',
        title: 'Curtis inventory',
        oneLiner: 'Inventory tracking for Curtis, a government nuclear contractor.',
        points: [
          'The pipelines, and the screens on top of them.',
          'Built inside their existing contractor systems.',
        ],
        brief: {
          problem: 'Curtis needed inventory tracking for a government nuclear contract.',
          constraint: 'We had to work inside their existing systems.',
          decision: 'I built the pipelines and the frontends.',
          outcome: 'They use it to track inventory.',
        },
      },
      {
        id: 'od-email',
        title: 'Email systems',
        oneLiner: 'A system-wide upgrade that cut response time by 70%.',
        points: [
          'Managed email for the same clients.',
          'Upgraded the whole mail path, which cut server response time by 70%.',
        ],
        brief: {
          problem: 'The same clients needed faster email.',
          constraint: 'The upgrade had to cover the whole mail path.',
          decision: 'I upgraded the mail servers.',
          outcome: 'Response time dropped 70%.',
        },
      },
      {
        id: 'od-defense',
        title: 'National Defense apps',
        oneLiner: 'Web apps for national defense clients, with security built in from the start.',
        points: [
          'Built and maintained full-stack apps for national defense clients.',
          'Security review started with the first ticket.',
        ],
        brief: {
          problem: 'Defense clients needed web apps that stayed up and stayed locked down.',
          constraint: 'Security review from the first ticket.',
          decision: 'I built the apps and kept them running.',
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
    degree: 'B.S. Computer Science and Mathematics, minor in Philosophy',
    dates: 'May 2020',
    note: '1823 Scholar — full-ride scholarship',
  },
];

type RecordItem = {
  label: string;
  line?: string;
  points: string[];
  href: string;
  source: string;
  more: { label: string; href: string }[];
};

export const record: RecordItem[] = [
  {
    label: '2016 · HCT Spring World Championship',
    line: 'Qualified for the world championship qualifier — Blizzard’s regional tournament for the top Americas players, where I beat Flamekilla 3–2 in losers’ bracket #3 before losing 0–3 to Coglorin.',
    points: [],
    href: 'https://liquipedia.net/hearthstone/2016_Hearthstone_Championship_Tour/Spring/Americas/Preliminary',
    source: 'Liquipedia',
    more: [
      {
        label: 'Bracket',
        href: 'https://liquipedia.net/hearthstone/2016_Hearthstone_Championship_Tour/Spring/Americas/Preliminary/LB3',
      },
    ],
  },
  {
    label: 'Oct 2016 · #1 Americas Hearthstone',
    line: 'Finished the October season at #1 Legend in Wild — the single top spot on the Americas server at the end of the monthly ranked season, playing Aggro Beast Druid.',
    points: [],
    href: 'https://www.hearthpwn.com/decks/661171-1-wild-aggro-beast-druid',
    source: 'Deck',
    more: [{ label: 'Screenshot', href: 'https://imgur.com/a/Hm2QD' }],
  },
  {
    label: '2017 · HCT Summer World Championship',
    line: 'Qualified for the world championship qualifier — earning a spot in Blizzard’s Americas Summer Preliminary, the regional tournament that fed the 2017 World Championship.',
    points: [],
    href: 'https://liquipedia.net/hearthstone/2017_Hearthstone_Championship_Tour/Summer/Preliminary/Americas',
    source: 'Liquipedia',
    more: [],
  },
  {
    label: '2019 · #1 Wild Open',
    line: 'I was the #1 ranked for the Wild Open in 2019 — finishing January at #1 on the Americas Wild ladder to take the #1 seed into Blizzard’s Wild Open qualifier.',
    points: [],
    href: 'https://liquipedia.net/hearthstone/Ladder_Ranking/2019/Americas/Wild/January',
    source: 'Ladder',
    more: [{ label: 'Wild Open', href: 'https://liquipedia.net/hearthstone/Hearthstone_Wild_Open/2019/Americas' }],
  },
  {
    label: 'Nov 2025 · Rank 1 Hearthstone Americas',
    line: 'Hit rank 1 Legend again during the season, after years away — reaching #1 on Blizzard’s official Americas Wild leaderboard in Season 145.',
    points: [],
    href: 'https://x.com/chrisswimlee/status/1994461923346452901',
    source: 'Post',
    more: [{ label: '@chrisswimlee', href: 'https://x.com/chrisswimlee' }],
  },
];

export const competitive = [
  {
    title: 'Professional Hearthstone, Americas',
    detail:
      '#1 to finish the Americas Wild season in October 2016 and January 2019. That January finish is what put me first for the Wild Open. In November 2025 I hit rank 1 Legend again during the season. Qualified for the world championship qualifier in 2016 and 2017.',
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
  lede: 'My name is Chris SuYoung Lee. “Suyoung” means swim, which is where Swim comes from.',
  line: 'I studied proofs at Trinity and spent three years at Goldman building one reporting path. Now I build local software and teach.',
};

export const engage = {
  heading: 'Pricing',
  lede: 'Four fixed prices. Most projects start with a scoping call, then move to an audit, a custom build, or a complete works.',
  promise: 'Tell me which tier, what you need, and what the constraint is.',
  tiers: [
    {
      name: 'Scoping & call',
      price: '$1,000',
      unit: 'call',
      detail: 'Tell me about the system and its constraints. What we build next comes out of that call.',
    },
    {
      name: 'Architecture audit',
      price: '$5,000',
      unit: 'written audit',
      detail: 'A written report covering the boundary, the data path, and what isn’t allowed to leave.',
    },
    {
      name: 'Custom build',
      price: '$10,000',
      unit: 'scoped build',
      detail: 'One scoped local system, or one product install.',
    },
    {
      name: 'Complete works',
      price: 'From $20,000',
      unit: 'full build',
      detail: 'The site, product pages, install, and all the systems work to put it live.',
    },
  ],
  notes: [
    'New York or remote.',
    'In your email, include the tier and the constraint.',
  ],
  cta: 'Request a scope',
  href: mail,
};

export const contact = {
  heading: 'Work with me',
  lede: 'Scoping calls, architecture audits, custom builds, and complete works, all at fixed prices. Email me with what you need and the constraint.',
  projectCta: 'Pricing',
  href: '/engage/',
};

export const built = {
  lede: 'About this site',
  detail: 'Built with Astro, with a CV you can print. The source is on GitHub.',
  href: 'https://github.com/chrisswimlee/chrisswimlee',
};
