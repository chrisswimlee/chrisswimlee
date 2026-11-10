import type { ImageMetadata } from 'astro';
import localLatticeShot from '../assets/work/local-lattice.jpg';
import d22ArchiveShot from '../assets/work/d22soso-archive.jpg';
// `?url` keeps Astro 7 from compiling these as SVG components — we only
// need a src string for the cards, and the component path crashed
// the homepage (`styles.length` of undefined).
import goldmanMark from '../assets/marks/goldman.svg?url';
import trinityMark from '../assets/marks/trinity.svg?url';
import trineMark from '../assets/marks/trine.png';
import haitWork from '../assets/worlds/work-hait.jpg';
import stealthWork from '../assets/worlds/work-stealth.jpg';
import goldmanWork from '../assets/worlds/work-goldman.jpg';
import onedaveWork from '../assets/worlds/work-onedave.jpg';
import trineStudy from '../assets/worlds/study-trine.jpg';
import trinityStudy from '../assets/worlds/study-trinity.jpg';
import hctSummer2017 from '../assets/worlds/play-hct-2017-summer.jpg';
import hctBracket2016 from '../assets/play/hct-2016-bracket.jpg';
import rank1Shot2016 from '../assets/play/rank1-2016.jpg';
import wildLadder2019 from '../assets/play/wild-2019-ladder.jpg';
import rank1Shot2025 from '../assets/play/rank1-2025.jpg';
import {
  about,
  achievementsNote,
  education,
  hero,
  localHost,
  projectLinks,
  projects,
  record,
  roles,
  technicalAchievements,
  work,
} from './site';

export type WorldLink = { label: string; href: string };

export type CardFit = 'cover' | 'contain';

/** The view that faces the camera on the 3D object. Without one, the face art is used. */
export type FaceCard = { image: ImageMetadata | string; fit: CardFit; background: string };

export type FaceArt = { image: ImageMetadata; alt: string; card?: FaceCard };

/** What the browser gets once Globe.astro has optimized a FaceArt. */
export type WorldImage = {
  src: string;
  srcset: string;
  width: number;
  height: number;
  alt: string;
  card: { src: string; fit: CardFit; background: string };
};

export type WorldAspect<Art = FaceArt> = {
  id: string;
  title: string;
  line: string;
  points: string[];
  links: WorldLink[];
  art: Art;
};

export type WorldSpec<Art = FaceArt> = {
  id: string;
  name: string;
  rail: string;
  kicker: string;
  when: string;
  place: string;
  summary: string;
  radius: number;
  position: [number, number, number];
  ocean: string;
  land: string;
  city: string;
  atmosphere: string;
  accent: string;
  motif: number;
  seed: number;
  clouds: number;
  ice: number;
  drift: number;
  phase: number;
  ring: { inner: number; outer: number } | null;
  moon: boolean;
  aspects: WorldAspect<Art>[];
};

export type WorldData<Art = FaceArt> = {
  overview: {
    kicker: string;
    title: string;
    accent: string;
    note: string;
    lede: string;
    line: string;
    constraints: { text: string; id: string }[];
    actions: { label: string; href: string }[];
  };
  record: {
    id: string;
    kicker: string;
    title: string;
    note: string;
    items: { id: string; place: string; when: string; claim: string; proof: string }[];
  };
  worlds: WorldSpec<Art>[];
};

type Look = Omit<
  WorldSpec,
  'id' | 'name' | 'rail' | 'kicker' | 'when' | 'place' | 'summary' | 'aspects'
>;

const look: Record<string, Look> = {
  work: {
    radius: 1.08,
    position: [0, 2.58, 0.16],
    ocean: '#12182b',
    land: '#d5dbe6',
    city: '#f3e2b6',
    atmosphere: '#9aafd4',
    accent: '#9aafd4',
    motif: 0,
    seed: 4.6,
    clouds: 0.22,
    ice: 0.18,
    drift: 0.045,
    phase: 2.8,
    ring: { inner: 1.52, outer: 2.08 },
    moon: false,
  },
  projects: {
    radius: 0.96,
    position: [-4.15, -0.95, 0.16],
    ocean: '#070b14',
    land: '#16324d',
    city: '#d6ecff',
    atmosphere: '#6b9fff',
    accent: '#6b9fff',
    motif: 1,
    seed: 6.3,
    clouds: 0,
    ice: 0.04,
    drift: 0.09,
    phase: 0.9,
    ring: null,
    moon: false,
  },
  hait: {
    radius: 1.04,
    position: [-3.2, 1.2, 0.08],
    ocean: '#0d1b4a',
    land: '#9a4034',
    city: '#e2b34a',
    atmosphere: '#3e9a62',
    accent: '#e2b34a',
    motif: 5,
    seed: 8.4,
    clouds: 0.28,
    ice: 0.04,
    drift: 0.04,
    phase: 1.2,
    ring: null,
    moon: false,
  },
  localhost: {
    radius: 1.0,
    position: [3.2, 1.2, -0.06],
    ocean: '#07140f',
    land: '#1c3a28',
    city: '#e6d7a4',
    atmosphere: '#c6a15a',
    accent: '#d4b46a',
    motif: 6,
    seed: 3.3,
    clouds: 0,
    ice: 0,
    drift: 0.055,
    phase: 4.1,
    ring: null,
    moon: false,
  },
  phonecoding: {
    radius: 0.76,
    position: [4.7, -0.28, -0.1],
    ocean: '#161616',
    land: '#f4f0e8',
    city: '#c56a32',
    atmosphere: '#2f5bff',
    accent: '#2f5bff',
    motif: 7,
    seed: 11.4,
    clouds: 0,
    ice: 0,
    drift: 0.07,
    phase: 2.4,
    ring: null,
    moon: false,
  },
  d22soso: {
    radius: 1.02,
    position: [0.08, -2.38, 0],
    ocean: '#120e18',
    land: '#3a315c',
    city: '#f4f4f4',
    atmosphere: '#e0b15c',
    accent: '#e0b15c',
    motif: 8,
    seed: 5.6,
    clouds: 0.04,
    ice: 0,
    drift: 0.05,
    phase: 0.7,
    ring: null,
    moon: false,
  },
  study: {
    radius: 0.9,
    position: [-2.35, -2.22, 0.1],
    ocean: '#1b2433',
    land: '#ddd6c8',
    city: '#f6f1e6',
    atmosphere: '#d9d0c2',
    accent: '#c4b8a4',
    motif: 3,
    seed: 15.4,
    clouds: 0.4,
    ice: 0.72,
    drift: 0.05,
    phase: 5.2,
    ring: { inner: 1.38, outer: 1.62 },
    moon: false,
  },
  play: {
    radius: 0.88,
    position: [2.65, -2.28, -0.14],
    ocean: '#102418',
    land: '#1e6a43',
    city: '#ffd78a',
    atmosphere: '#e0b15c',
    accent: '#e0b15c',
    motif: 4,
    seed: 19.8,
    clouds: 0.05,
    ice: 0,
    drift: 0.11,
    phase: 3.3,
    ring: null,
    moon: false,
  },
};

const shots: Record<string, FaceArt> = Object.fromEntries(
  projects.flatMap((project) =>
    project.image ? [[project.id, { image: project.image, alt: `${project.title} — ${project.url}` }]] : [],
  ),
);

// Keyed by aspect id. Every face needs one; makeWorld throws if it is missing.
const faceArt: Record<string, FaceArt> = {
  hait: {
    image: haitWork,
    alt: 'An empty college computer lab at dusk, misty Chiang Rai mountains through the windows.',
  },
  stealth: {
    image: stealthWork,
    alt: 'Three monitors of live futures charts and order-book depth on a desk at night.',
  },
  goldman: {
    image: goldmanWork,
    alt: 'One printed report on a conference table with three chairs, Manhattan at night behind it.',
    card: { image: goldmanMark, fit: 'contain', background: '#7399c6' },
  },
  onedave: {
    image: onedaveWork,
    alt: 'Pipeline valves with inventory tags and a rugged laptop beside a locked server cage.',
  },
  localhost: { image: localHost.image, alt: `${localHost.title} — ${localHost.url}` },
  ...shots,
  d22soso: {
    image: d22ArchiveShot,
    alt: 'The Living Archive at d22soso.com, a rotatable 3D map of Wayne Chiang’s career.',
  },
  lattice: { image: localLatticeShot, alt: 'The Local Lattice repository on GitHub.' },
  trine: {
    image: trineStudy,
    alt: 'A graduation cap on a laptop under a brass lamp, card catalog drawers behind.',
    card: { image: trineMark, fit: 'contain', background: '#ffffff' },
  },
  trinity: {
    image: trinityStudy,
    alt: 'A chalkboard of proofs in a gothic lecture hall at dusk.',
    card: { image: trinityMark, fit: 'contain', background: '#ffffff' },
  },
  'hct-2016-spring': {
    image: hctBracket2016,
    alt: '2016 HCT Americas Spring Preliminary, losers’ bracket #3, drawn from the published bracket: chrisswimlee 3–2 Flamekilla, then Coglorin 3–0.',
  },
  'americas-2016': {
    image: rank1Shot2016,
    alt: 'October 2016 screenshot: Chrisswimlee’s legend rank 1 badge, and the Aggro Beast Druid list from the same screen.',
  },
  'hct-2017-summer': {
    image: hctSummer2017,
    alt: 'A laptop mid-game beside a bracket on a second screen, summer evening outside.',
  },
  'wild-2019': {
    image: wildLadder2019,
    alt: 'January 2019 Americas Wild ladder, drawn from the published ranking, with Chrisswimlee at rank 1.',
  },
  'americas-2025': {
    image: rank1Shot2025,
    alt: 'Hearthstone in November 2025: the rank 1 badge in game, and Chrisswimlee first on the Americas Wild leaderboard.',
  },
};

function makeWorld(
  id: string,
  copy: Pick<WorldSpec, 'name' | 'rail' | 'kicker' | 'when' | 'place' | 'summary'>,
  aspects: Omit<WorldAspect, 'art'>[],
): WorldSpec {
  const art = look[id];
  if (!art) throw new Error(`Missing look for ${id}`);
  return {
    id,
    ...copy,
    ...art,
    aspects: aspects.map((aspect) => {
      const face = faceArt[aspect.id];
      if (!face) throw new Error(`Missing face art for ${aspect.id}`);
      return { ...aspect, art: face };
    }),
  };
}

const claims = Object.fromEntries(technicalAchievements.map((item) => [item.id, item.claim]));
const proofs = Object.fromEntries(technicalAchievements.map((item) => [item.id, item.proof]));

const software = projects.filter((project) => project.kind !== 'Site');

function aspectFromProject(id: string): Omit<WorldAspect, 'art'> {
  const project = projects.find((item) => item.id === id);
  if (!project) throw new Error(`Missing project ${id}`);
  return {
    id: project.id,
    title: project.title,
    line: project.summary,
    points: project.points,
    links: projectLinks(project),
  };
}

const haitRole = roles.find((role) => role.id === 'hait');
if (!haitRole) throw new Error('Missing HAIT role');
const haitSite = { ...aspectFromProject('haitedu'), title: 'haitedu.com' };
const phone = aspectFromProject('phonecoding');

const playIds = ['hct-2016-spring', 'americas-2016', 'hct-2017-summer', 'wild-2019', 'americas-2025'];

const worlds: WorldSpec[] = [
  makeWorld(
    'work',
    {
      name: 'Work',
      rail: 'Work',
      kicker: 'Jobs',
      when: '2020 — present',
      place: 'La Brea · New York',
      summary: achievementsNote,
    },
    roles
      .filter((role) => role.id !== 'hait')
      .map((role) => ({
        id: role.id,
        title: role.company,
        line: [claims[role.id] ?? role.scan, proofs[role.id]].filter(Boolean).join(' '),
        points: [`${role.title} · ${role.dates} · ${role.location}`, ...role.bullets],
        links: [
          ...role.projects.flatMap((project) => project.links ?? []),
          { label: 'Experience', href: '/experience/' },
        ],
      })),
  ),
  makeWorld(
    'projects',
    {
      name: 'Projects',
      rail: 'Projects',
      kicker: 'Software',
      when: '2025 — 2026',
      place: 'On the machine',
      summary: work.lede,
    },
    software.map((project) => ({
      id: project.id,
      title: project.title,
      line: project.summary,
      points: [
        ...project.points,
        ...(project.command
          ? [`${project.command}${project.commandNote ? ` — ${project.commandNote}` : ''}`]
          : []),
      ],
      links: projectLinks(project),
    })),
  ),
  makeWorld(
    'hait',
    {
      name: 'HAIT',
      rail: 'HAIT',
      kicker: 'Chiang Rai',
      when: '2026 — present',
      place: 'haitedu.com',
      summary: 'The school’s first AI course, its IT, and the public site for an institute in Chiang Rai.',
    },
    [
      {
        id: 'hait',
        title: haitRole.company,
        line: claims.hait ?? haitRole.scan,
        points: [`${haitRole.title} · ${haitRole.dates} · ${haitRole.location}`, ...haitRole.bullets],
        links: [
          { label: 'haitedu.com', href: 'https://haitedu.com' },
          { label: 'Experience', href: '/experience/' },
        ],
      },
      haitSite,
    ],
  ),
  makeWorld(
    'd22soso',
    {
      name: 'D22-soso',
      rail: 'D22-soso',
      kicker: 'Living archive',
      when: '2025 — 2026',
      place: 'd22soso.com · 2handholdem.com',
      summary: 'A 3D archive of Wayne Chiang’s career, and the site for the table game he invented.',
    },
    [aspectFromProject('d22soso'), aspectFromProject('2handholdem')],
  ),
  makeWorld(
    'phonecoding',
    {
      name: 'PhoneCoding',
      rail: 'PhoneCoding',
      kicker: 'SwiftUI',
      when: '2026',
      place: 'phonecoding.ai',
      summary: 'SwiftUI apps, spoken into the phone you’re holding.',
    },
    [phone],
  ),
  makeWorld(
    'localhost',
    {
      name: 'local-host.ai',
      rail: 'local-host',
      kicker: 'On the Mac',
      when: '2026',
      place: 'local-host.ai',
      summary: 'A home for software that stays on the machine.',
    },
    [
      {
        id: 'localhost',
        title: localHost.title,
        line: localHost.pitch,
        points: [...localHost.points],
        links: localHost.links,
      },
    ],
  ),
  makeWorld(
    'study',
    {
      name: 'Study',
      rail: 'Study',
      kicker: 'Education',
      when: '2020 · 2026',
      place: 'Trinity College · Trine University',
      summary:
        'Trine, M.S. Information Studies. Trinity, B.S. Computer Science and Mathematics, minor in Philosophy, on a full ride.',
    },
    education.map((item) => ({
      id: item.school.startsWith('Trine') ? 'trine' : 'trinity',
      title: item.school,
      line: item.degree,
      points: [item.dates, item.note].filter((line) => line.length > 0),
      links: [],
    })),
  ),
  makeWorld(
    'play',
    {
      name: 'Hearthstone',
      rail: 'Play',
      kicker: 'Competitive play',
      when: '2016 — 2025',
      place: 'Americas',
      summary: '',
    },
    (() => {
      const aspects = record.map((item, index) => ({
        id: playIds[index] ?? `play-${index}`,
        title: item.label,
        line: item.line ?? 'A public mark on the Americas ladder.',
        points: item.points,
        links: [{ label: item.source, href: item.href }, ...item.more],
      }));
      const latest = aspects.find((aspect) => aspect.id === 'americas-2025');
      return latest ? [latest, ...aspects.filter((aspect) => aspect.id !== 'americas-2025')] : aspects;
    })(),
  ),
];

// hero.constraints is written in this order: Goldman, the futures engine, defense, the AI course.
const constraintIds = ['goldman', 'stealth', 'onedave', 'hait'];

export const worldData: WorldData = {
  overview: {
    kicker: hero.kicker,
    title: 'Chris Swim Lee',
    accent: 'Swim',
    note: about.lede,
    lede: hero.lede,
    line: about.line,
    constraints: hero.constraints.map((text, index) => ({
      text,
      id: constraintIds[index] ?? 'hait',
    })),
    actions: hero.actions,
  },
  record: {
    id: 'achievements',
    kicker: 'Record',
    title: 'Four jobs',
    note: achievementsNote,
    items: technicalAchievements.map((item) => ({
      id: item.id,
      place: item.place,
      when: item.when,
      claim: item.claim,
      proof: item.proof,
    })),
  },
  worlds,
};
