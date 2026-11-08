/**
 * Chrisswimlee: The Developer World.
 *
 * The home page is a small pixel-art town. Every building is a job, a school,
 * or a project, and opens the same copy the old 3D worlds used (worlds.ts).
 * Coordinates are in 16px tiles. A building's door is on its bottom row.
 */

export type Opens =
  | { kind: 'world'; world: string; aspect?: number }
  | { kind: 'hire' }
  | { kind: 'record' }
  | { kind: 'mail' }
  | { kind: 'sign' };

export type Icon = 'bank' | 'chart' | 'star' | 'gear' | 'bell' | 'book' | 'flask' | 'laptop' | 'phone' | 'joystick' | 'mug';

export type BuildingStyle = {
  wall: 'planks' | 'brick' | 'stone' | 'plaster' | 'logs';
  wallColor: string;
  roof: 'shingle' | 'tile' | 'glass' | 'thatch';
  roofColor: string;
  trim: string;
  /** Rows of roof, in tiles, above the walls. */
  roofRows: number;
  windows: number;
  icon: Icon;
  chimney?: boolean;
  extra?: 'columns' | 'clock' | 'bell' | 'dome' | 'neon' | 'antenna' | 'tower' | 'barrels' | 'ticker' | 'gears';
};

export type Building = {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Door column, counted from the building's left edge. */
  door: number;
  opens: Opens;
  /** Short proof on the travel rail. */
  rail: string;
  style: BuildingStyle;
};

export const townName = { owner: 'Chrisswimlee', title: 'The Developer’s World' };

export const TOWN_W = 52;
export const TOWN_H = 36;

export const buildings: Building[] = [
  {
    id: 'goldman',
    label: 'Goldman Sachs',
    sub: 'Full Stack Engineer',
    x: 3,
    y: 3,
    w: 7,
    h: 6,
    door: 3,
    opens: { kind: 'world', world: 'work', aspect: 1 },
    rail: '80% less processing',
    style: { wall: 'stone', wallColor: '#d9d3c4', roof: 'tile', roofColor: '#4a76b8', trim: '#f4efe4', roofRows: 2, windows: 2, icon: 'bank', extra: 'columns' },
  },
  {
    id: 'stealth',
    label: 'Stealth Fintech',
    sub: 'Founding CTO',
    x: 12,
    y: 3,
    w: 6,
    h: 6,
    door: 2,
    opens: { kind: 'world', world: 'work', aspect: 0 },
    rail: '<100ms to the book',
    style: { wall: 'plaster', wallColor: '#3a4256', roof: 'shingle', roofColor: '#2c3446', trim: '#e0b15c', roofRows: 2, windows: 2, icon: 'chart', extra: 'ticker', chimney: true },
  },
  {
    id: 'townhall',
    label: 'Town Hall',
    sub: 'Hire me',
    x: 21,
    y: 2,
    w: 9,
    h: 7,
    door: 4,
    opens: { kind: 'hire' },
    rail: 'Open to AI roles',
    style: { wall: 'brick', wallColor: '#b8613f', roof: 'tile', roofColor: '#3f8a5a', trim: '#f1e3c4', roofRows: 3, windows: 4, icon: 'star', extra: 'clock' },
  },
  {
    id: 'onedave',
    label: 'One Dave Software',
    sub: 'Full Stack Engineer',
    x: 33,
    y: 4,
    w: 6,
    h: 5,
    door: 2,
    opens: { kind: 'world', world: 'work', aspect: 2 },
    rail: 'Mail down 70%',
    style: { wall: 'planks', wallColor: '#a7774a', roof: 'shingle', roofColor: '#7d5a3c', trim: '#e9d2a6', roofRows: 2, windows: 2, icon: 'gear', extra: 'gears', chimney: true },
  },
  {
    id: 'hait',
    label: 'HAIT Schoolhouse',
    sub: 'College Professor',
    x: 41,
    y: 2,
    w: 7,
    h: 7,
    door: 3,
    opens: { kind: 'world', world: 'hait' },
    rail: 'First AI course',
    style: { wall: 'planks', wallColor: '#c4553a', roof: 'shingle', roofColor: '#5b4636', trim: '#f4efe4', roofRows: 3, windows: 2, icon: 'bell', extra: 'bell' },
  },
  {
    id: 'study',
    label: 'Library',
    sub: 'Trinity · Trine',
    x: 3,
    y: 14,
    w: 7,
    h: 6,
    door: 3,
    opens: { kind: 'world', world: 'study' },
    rail: 'CS, math, information',
    style: { wall: 'stone', wallColor: '#c9c3b6', roof: 'tile', roofColor: '#6b4f8f', trim: '#efe7d6', roofRows: 2, windows: 2, icon: 'book', extra: 'dome' },
  },
  {
    id: 'play',
    label: 'The Tavern',
    sub: 'Competitive play',
    x: 40,
    y: 14,
    w: 8,
    h: 6,
    door: 4,
    opens: { kind: 'world', world: 'play' },
    rail: 'Rank 1, twice',
    style: { wall: 'logs', wallColor: '#8a5a34', roof: 'thatch', roofColor: '#c99a4b', trim: '#f1d58a', roofRows: 2, windows: 3, icon: 'mug', extra: 'barrels', chimney: true },
  },
  {
    id: 'projects',
    label: 'Workshop',
    sub: 'Projects',
    x: 3,
    y: 25,
    w: 7,
    h: 6,
    door: 3,
    opens: { kind: 'world', world: 'projects' },
    rail: 'Captions and tools',
    style: { wall: 'planks', wallColor: '#6f8fae', roof: 'glass', roofColor: '#a9d8ee', trim: '#f4efe4', roofRows: 2, windows: 2, icon: 'flask', chimney: true },
  },
  {
    id: 'localhost',
    label: 'local-host Cabin',
    sub: 'On the Mac',
    x: 12,
    y: 26,
    w: 5,
    h: 5,
    door: 2,
    opens: { kind: 'world', world: 'localhost' },
    rail: 'Stays on the Mac',
    style: { wall: 'logs', wallColor: '#3f5b45', roof: 'shingle', roofColor: '#26392c', trim: '#d4b46a', roofRows: 2, windows: 1, icon: 'laptop', extra: 'antenna', chimney: true },
  },
  {
    id: 'phonecoding',
    label: 'PhoneCoding',
    sub: 'SwiftUI studio',
    x: 33,
    y: 25,
    w: 5,
    h: 6,
    door: 2,
    opens: { kind: 'world', world: 'phonecoding' },
    rail: 'SwiftUI, in build',
    style: { wall: 'plaster', wallColor: '#f4f0e8', roof: 'tile', roofColor: '#2f5bff', trim: '#c56a32', roofRows: 3, windows: 1, icon: 'phone', extra: 'tower' },
  },
  {
    id: 'd22soso',
    label: 'D22 Arcade',
    sub: 'Living archive',
    x: 40,
    y: 25,
    w: 7,
    h: 6,
    door: 3,
    opens: { kind: 'world', world: 'd22soso' },
    rail: 'Archive and a card game',
    style: { wall: 'plaster', wallColor: '#3a315c', roof: 'tile', roofColor: '#241d3d', trim: '#e0b15c', roofRows: 2, windows: 2, icon: 'joystick', extra: 'neon' },
  },
];

/** Small things in the plaza that open like buildings. */
export const props = {
  board: { id: 'achievements', label: 'Notice Board', sub: 'Record', rail: 'Four jobs', x: 16, y: 13, w: 2, h: 2, opens: { kind: 'record' } as Opens },
  mailbox: { id: 'mail', label: 'Mailbox', sub: 'Contact', rail: 'Email', x: 33, y: 13, w: 1, h: 2, opens: { kind: 'mail' } as Opens },
  sign: { id: 'welcome', label: 'Town Sign', sub: 'Start here', rail: 'How to walk', x: 21, y: 32, w: 2, h: 2, opens: { kind: 'sign' } as Opens },
};

/** Where you start: on the main road, just in front of the Town Hall. */
export const spawn = { x: 25.5, y: 12.2 };
