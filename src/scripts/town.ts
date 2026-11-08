/**
 * Chrisswimlee: The Developer World.
 *
 * A small pixel-art town on a canvas. Walk with WASD or the arrow keys, or
 * click/tap a spot. Walk into a door (or click a building) to go inside: the
 * building opens a panel with the same copy the rest of the site uses.
 * Drag empty ground to look around; drag the cat or the hens to carry them.
 * Light theme is day, dark theme is night.
 */
import {
  T,
  P,
  canvas as makeCanvas,
  px,
  rng,
  shade,
  paintBuilding,
  paintTree,
  paintBush,
  paintRock,
  paintCrop,
  paintLamp,
  paintBench,
  paintBoard,
  paintMailbox,
  paintSign,
  paintBarrel,
  paintCrate,
  paintFountain,
  paintFence,
  paintFlowerBed,
  paintPlayer,
  paintCat,
  paintChicken,
  type BuildingArt,
  type Facing,
  type Sprite,
  type TreeKind,
} from './town-art';
import { buildings, props, spawn, TOWN_H, TOWN_W, townName, type Building, type Opens } from '../data/town';
import type { WorldData, WorldImage, WorldSpec } from '../data/worlds';

export type TownBrief = {
  title: string;
  metric: string;
  problem: string;
  constraint: string;
  decision: string;
  outcome: string;
  stack: string[];
};

export type TownPayload = {
  worlds: WorldData<WorldImage>;
  hire: {
    role: string;
    lede: string;
    kicker: string;
    proof: { value: string; label: string; source: string }[];
  };
  briefs: Record<string, TownBrief[]>;
  links: { email: string; mail: string; hireMail: string; github: string; linkedin: string };
};

type Place = {
  id: string;
  label: string;
  sub: string;
  x: number;
  y: number;
  w: number;
  h: number;
  door: number;
  opens: Opens;
  rail?: string;
  building?: Building;
  art?: BuildingArt;
  sprite?: Sprite;
  /** Extra pixels the art reaches above the top tile row. */
  top: number;
};

type Drawable = { y: number; draw: (ctx: CanvasRenderingContext2D) => void };

type Critter = {
  kind: 'cat' | 'hen';
  x: number;
  y: number;
  tx: number;
  ty: number;
  home: { x: number; y: number; r: number };
  flip: boolean;
  frame: number;
  t: number;
  wait: number;
  state: 'walk' | 'idle' | 'peck' | 'sit' | 'held';
  lift: number;
  heart: number;
};

const W = TOWN_W;
const H = TOWN_H;
const MAP_W = W * T;
const MAP_H = H * T;

const GRASS = 0;
const PATH = 1;
const COBBLE = 2;
const WATER = 3;
const SOIL = 4;

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch] ?? ch);

export function mountTown(root: HTMLElement, data: TownPayload) {
  const canvasEl = root.querySelector<HTMLCanvasElement>('[data-town-canvas]');
  const ctx = canvasEl?.getContext('2d');
  if (!canvasEl || !ctx) throw new Error('Town canvas unavailable');
  const view: HTMLCanvasElement = canvasEl;
  const g: CanvasRenderingContext2D = ctx;

  const dialog = root.querySelector<HTMLElement>('[data-town-dialog]');
  const dialogBody = root.querySelector<HTMLElement>('[data-town-dialog-body]');
  const travel = root.querySelector<HTMLElement>('[data-town-travel]');
  const status = root.querySelector<HTMLElement>('[data-town-status]');
  const fade = root.querySelector<HTMLElement>('[data-town-fade]');
  const prompt = root.querySelector<HTMLElement>('[data-town-prompt]');
  const resume = root.querySelector<HTMLElement>('[data-town-resume]');
  if (!dialog || !dialogBody || !travel || !status || !fade || !prompt) throw new Error('Town markup missing');

  function hideResume() {
    root.classList.add('resume-away');
    document.documentElement.classList.add('town-resume-away');
  }
  if (document.documentElement.classList.contains('town-resume-away')) root.classList.add('resume-away');

  const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = motionQuery.matches;
  motionQuery.addEventListener('change', () => (reduced = motionQuery.matches));
  const isNight = () => document.documentElement.dataset.theme !== 'light';
  let night = isNight();
  document.documentElement.addEventListener('themechange', () => (night = isNight()));

  // ------------------------------------------------------------------ map

  const ground = new Uint8Array(W * H);
  const solid = new Uint8Array(W * H);
  const at = (x: number, y: number) => y * W + x;
  const inMap = (x: number, y: number) => x >= 0 && y >= 0 && x < W && y < H;
  const fill = (arr: Uint8Array, x: number, y: number, w: number, h: number, v: number) => {
    for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (inMap(i, j)) arr[at(i, j)] = v;
  };

  // roads
  fill(ground, 2, 10, W - 4, 2, PATH);
  fill(ground, 4, 21, W - 8, 2, PATH);
  fill(ground, 3, 31, W - 6, 2, PATH);
  fill(ground, 24, 10, 3, H - 10, PATH);
  fill(ground, 11, 10, 1, 23, PATH);
  fill(ground, 39, 10, 1, 23, PATH);
  // the plaza: a cobbled square around the fountain, grass and flower beds around it
  fill(ground, 20, 13, 11, 7, COBBLE);
  fill(ground, 21, 12, 9, 1, COBBLE);
  fill(ground, 21, 20, 9, 1, COBBLE);
  // farm plot
  fill(ground, 28, 24, 4, 6, SOIL);

  // the pond
  const pond = { cx: 20.6 * T, cy: 26.8 * T, rx: 2.9 * T, ry: 2.3 * T };
  const inPond = (x: number, y: number, pad = 0) =>
    ((x - pond.cx) / (pond.rx + pad)) ** 2 + ((y - pond.cy) / (pond.ry + pad)) ** 2 <= 1;
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) if (inPond((x + 0.5) * T, (y + 0.5) * T, -2)) ground[at(x, y)] = WATER;

  // forest border
  for (let x = 0; x < W; x++) {
    for (const y of [0, 1, H - 2, H - 1]) if (!(x >= 24 && x <= 26 && y >= H - 2)) solid[at(x, y)] = 1;
  }
  for (let y = 0; y < H; y++) for (const x of [0, 1, W - 2, W - 1]) solid[at(x, y)] = 1;
  for (let i = 0; i < W * H; i++) if (ground[i] === WATER) solid[i] = 1;
  // keep people out of the forest gap at the bottom edge, past the sign
  fill(solid, 24, H - 1, 3, 1, 1);

  const places: Place[] = buildings.map((b) => ({ ...b, building: b, top: 0 }));
  for (const p of [props.board, props.mailbox, props.sign]) {
    places.push({ ...p, door: Math.floor(p.w / 2), top: 0 });
  }
  for (const p of places) {
    if (p.building) {
      // walls and the lower roof are solid; the top of the roof can hide you
      fill(solid, p.x, p.y + 1, p.w, p.h - 1, 1);
      solid[at(p.x + p.door, p.y + p.h - 1)] = 0;
      // a short path from the door to the road
      for (let y = p.y + p.h; y < H && ground[at(p.x + p.door, y)] !== PATH && ground[at(p.x + p.door, y)] !== COBBLE; y++) {
        ground[at(p.x + p.door, y)] = PATH;
      }
    } else {
      fill(solid, p.x, p.y + p.h - 1, p.w, 1, 1);
    }
  }

  // ------------------------------------------------------------------ props & plants

  type Thing = { sprite: Sprite; x: number; y: number; solidTile?: [number, number]; light?: boolean; kind?: string };
  const things: Thing[] = [];
  const place = (sprite: Sprite, tx: number, ty: number, opts: Partial<Thing> = {}) => {
    const t: Thing = { sprite, x: tx * T, y: ty * T, ...opts };
    things.push(t);
    if (t.solidTile) solid[at(t.solidTile[0], t.solidTile[1])] = 1;
    return t;
  };

  const lamp = paintLamp();
  const lampSpots: [number, number][] = [
    [19.5, 13.2],
    [31.5, 13.2],
    [19.5, 20.6],
    [31.5, 20.6],
    [8.5, 12.8],
    [16.5, 12.8],
    [35.5, 12.8],
    [45.5, 12.8],
    [3.5, 23.6],
    [47.5, 23.6],
    [10.5, 33.6],
    [41.5, 33.6],
  ];
  for (const [x, y] of lampSpots) place(lamp, x, y, { solidTile: [Math.floor(x), Math.floor(y - 0.2)], light: true });

  const bench = paintBench();
  place(bench, 22, 19.4, { solidTile: [21, 19] });
  place(bench, 29, 19.4, { solidTile: [29, 19] });
  place(paintFountain(), 25.5, 18, {});
  for (const [x, y] of [
    [18, 16.9],
    [33, 16.9],
    [18, 18.9],
    [33, 18.9],
  ] as [number, number][]) {
    place(paintFlowerBed(Math.floor(x * 13 + y * 7)), x, y, {});
    fill(solid, Math.floor(x) - 1, Math.floor(y - 0.2), 2, 1, 1);
  }
  fill(solid, 24, 16, 3, 2, 1);

  // the hens' yard
  const fenceH = paintFence(false);
  const fenceV = paintFence(true);
  for (let x = 27; x <= 32; x++) {
    place(fenceH, x + 0.5, 23.95, { solidTile: [x, 23] });
    if (x !== 29) place(fenceH, x + 0.5, 30.95, { solidTile: [x, 30] });
  }
  for (let y = 24; y <= 29; y++) {
    if (y !== 26) place(fenceV, 27.5, y + 0.95, { solidTile: [27, y] });
    place(fenceV, 32.5, y + 0.95, { solidTile: [32, y] });
  }
  for (let y = 24; y <= 29; y++) for (let x = 28; x <= 31; x++) if ((x + y) % 2 === 0) place(paintCrop((x * 7 + y) % 3), x + 0.5, y + 0.85, {});

  // barrels by the tavern, crates by the workshop
  const barrel = paintBarrel();
  place(barrel, 39.4, 19.9, { solidTile: [39, 19] });
  place(barrel, 48.6, 19.9, { solidTile: [48, 19] });
  place(barrel, 48.6, 18.9, {});
  const crate = paintCrate();
  place(crate, 10.6, 30.9, { solidTile: [10, 30] });
  place(crate, 2.6, 30.9, { solidTile: [2, 30] });

  // trees: a forest edge, then a few in town
  const r = rng(2026);
  const treeKinds: TreeKind[] = ['oak', 'pine', 'oak', 'pine', 'fruit', 'oak'];
  const trees: Thing[] = [];
  const addTree = (x: number, y: number, kind?: TreeKind) => {
    const k = kind ?? treeKinds[Math.floor(r() * treeKinds.length)];
    const t = place(paintTree(k, Math.floor(r() * 1e6)), x, y, {});
    trees.push(t);
    const tx = Math.floor(x);
    const ty = Math.floor(y - 0.3);
    if (inMap(tx, ty)) solid[at(tx, ty)] = 1;
  };
  for (let x = 0.6; x < W; x += 1.4 + r() * 0.5) {
    addTree(x, 1.9 + r() * 0.3);
    if (!(x > 22.5 && x < 28.5)) addTree(x + 0.5, H - 0.1 + r() * 0.2);
  }
  for (let y = 3; y < H - 1; y += 1.3 + r() * 0.5) {
    addTree(0.9 + r() * 0.3, y);
    addTree(W - 0.9 - r() * 0.3, y);
  }
  const inTown: [number, number, TreeKind][] = [
    [10.6, 7.6, 'blossom'],
    [19.6, 7.8, 'fruit'],
    [31.4, 7.6, 'oak'],
    [39.8, 7.6, 'pine'],
    [12.4, 19.4, 'oak'],
    [15.6, 18.2, 'autumn'],
    [35.5, 18.4, 'blossom'],
    [37.6, 19.6, 'oak'],
    [16.4, 24.6, 'fruit'],
    [23.0, 29.8, 'oak'],
    [36.8, 23.6, 'autumn'],
    [48.6, 24.4, 'pine'],
    [14.2, 15.2, 'pine'],
  ];
  for (const [x, y, k] of inTown) addTree(x, y, k);
  for (const [x, y] of [
    [10.6, 15.6],
    [37.4, 15.4],
    [18.6, 23.2],
    [3.4, 22.2],
    [46.4, 30.4],
    [20.6, 9.4],
    [30.6, 9.4],
  ] as [number, number][]) {
    place(paintBush(Math.floor(x * 97 + y)), x, y, { solidTile: [Math.floor(x), Math.floor(y - 0.3)] });
  }
  for (const [x, y] of [
    [6.4, 12.9],
    [43.6, 12.9],
    [13.5, 22.9],
    [45.2, 33.2],
  ] as [number, number][]) {
    place(paintRock(Math.floor(x * 31 + y)), x, y, {});
  }

  const sprites: Record<string, Sprite> = {
    board: paintBoard(),
    mail: paintMailbox(),
    welcome: paintSign(),
  };
  for (const p of places) {
    if (p.building) {
      p.art = paintBuilding(p.building);
      p.top = p.art.top;
    } else {
      p.sprite = sprites[p.id === 'achievements' ? 'board' : p.id === 'mail' ? 'mail' : 'welcome'];
      p.top = Math.max(0, -p.sprite.oy - p.h * T);
    }
  }

  // ------------------------------------------------------------------ ground painting

  const groundArt = makeCanvas(MAP_W, MAP_H);
  {
    const c = groundArt.ctx;
    const gr = rng(7);
    const tile = (x: number, y: number) => (inMap(x, y) ? ground[at(x, y)] : GRASS);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const v = tile(x, y);
        const X = x * T;
        const Y = y * T;
        if (v === GRASS || v === WATER) {
          const edge = x < 2 || y < 2 || x >= W - 2 || y >= H - 2;
          px(c, edge ? P.grassDark : P.grass, X, Y, T, T);
          for (let i = 0; i < 18; i++) px(c, gr() > 0.5 ? P.grassDark : P.grassLight, X + gr() * T, Y + gr() * T);
          if (gr() > 0.55) {
            const tx = X + 2 + gr() * 11;
            const ty = Y + 3 + gr() * 10;
            px(c, P.grassDeep, tx, ty, 1, 2);
            px(c, P.grassDeep, tx + 2, ty, 1, 2);
            px(c, P.grassDeep, tx + 1, ty + 1, 1, 2);
          }
          if (!edge && gr() > 0.86) {
            const colors = ['#ffffff', '#f4d04a', '#f08ad0', '#8fc3ff', '#ff8a6a'];
            const col = colors[Math.floor(gr() * colors.length)];
            const fx = X + 3 + gr() * 9;
            const fy = Y + 3 + gr() * 9;
            px(c, col, fx - 1, fy, 3, 1);
            px(c, col, fx, fy - 1, 1, 3);
            px(c, '#f4b02a', fx, fy, 1, 1);
          }
        } else if (v === PATH) {
          px(c, P.dirt, X, Y, T, T);
          for (let i = 0; i < 10; i++) px(c, gr() > 0.5 ? P.dirtDark : P.dirtLight, X + gr() * T, Y + gr() * T);
          if (gr() > 0.6) px(c, '#a5875a', X + gr() * 13, Y + gr() * 13, 2, 1);
        } else if (v === COBBLE) {
          // irregular warm stones on a mortar bed
          px(c, '#9d9483', X, Y, T, T);
          const stones = ['#cfc5b2', '#c2b7a3', '#d8cfbd', '#bcb09a'];
          for (let j = 0; j < 2; j++) {
            let sx = X - Math.floor(gr() * 4);
            while (sx < X + T) {
              const sw = 5 + Math.floor(gr() * 4);
              const x0 = Math.max(X, sx + 1);
              const x1 = Math.min(X + T, sx + sw);
              if (x1 - x0 >= 2) {
                const col = stones[Math.floor(gr() * stones.length)];
                px(c, col, x0, Y + j * 8 + 1, x1 - x0, 6);
                px(c, shade(col, 0.16), x0, Y + j * 8 + 1, x1 - x0 - 1, 1);
                px(c, shade(col, -0.16), x0, Y + j * 8 + 6, x1 - x0, 1);
              }
              sx += sw;
            }
          }
        } else if (v === SOIL) {
          px(c, P.soil, X, Y, T, T);
          for (let j = 0; j < T; j += 4) px(c, P.soilDark, X, Y + j + 3, T, 1);
          for (let i = 0; i < 8; i++) px(c, '#a06a40', X + gr() * T, Y + gr() * T);
        }
      }
    }
    // grassy, ragged edges where paths meet grass
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const v = tile(x, y);
        if (v !== PATH && v !== COBBLE) continue;
        const X = x * T;
        const Y = y * T;
        const grassy = (dx: number, dy: number) => {
          const n = tile(x + dx, y + dy);
          return n === GRASS || n === WATER;
        };
        for (let i = 0; i < T; i++) {
          if (grassy(0, -1)) px(c, P.grass, X + i, Y, 1, 1 + Math.floor(gr() * 2.2));
          if (grassy(0, 1)) px(c, P.grass, X + i, Y + T - 1 - Math.floor(gr() * 2), 1, 2);
          if (grassy(-1, 0)) px(c, P.grass, X, Y + i, 1 + Math.floor(gr() * 2.2), 1);
          if (grassy(1, 0)) px(c, P.grass, X + T - 1 - Math.floor(gr() * 2), Y + i, 2, 1);
        }
        if (grassy(0, -1)) px(c, v === PATH ? P.dirtDark : P.cobbleDark, X, Y + 2, T, 1);
      }
    }
    // the pond: sand rim, then deepening water
    for (let y = Math.floor(pond.cy - pond.ry - 6); y < pond.cy + pond.ry + 6; y++) {
      for (let x = Math.floor(pond.cx - pond.rx - 6); x < pond.cx + pond.rx + 6; x++) {
        if (inPond(x, y, 3) && !inPond(x, y, 0)) px(c, gr() > 0.8 ? '#d4bd80' : P.sand, x, y);
        if (inPond(x, y, 0)) {
          const d = ((x - pond.cx) / pond.rx) ** 2 + ((y - pond.cy) / pond.ry) ** 2;
          px(c, d < 0.35 ? P.waterDeep : d > 0.82 ? '#6fbbe2' : P.water, x, y);
        }
      }
    }
    for (let i = 0; i < 14; i++) {
      const a = gr() * Math.PI * 2;
      const d = gr() * 0.7;
      px(c, P.waterLight, pond.cx + Math.cos(a) * pond.rx * d, pond.cy + Math.sin(a) * pond.ry * d, 3, 1);
    }
    // lily pads and reeds
    for (const [lx, ly] of [
      [-20, -6],
      [14, 8],
      [24, -10],
    ]) {
      px(c, '#3f8a34', pond.cx + lx, pond.cy + ly, 5, 3);
      px(c, '#6fb046', pond.cx + lx, pond.cy + ly, 3, 1);
      px(c, '#f08ad0', pond.cx + lx + 3, pond.cy + ly - 1, 1, 1);
    }
    for (let i = 0; i < 6; i++) {
      const x = pond.cx - pond.rx + 2 + i * 3;
      px(c, '#3f7a2c', x, pond.cy + pond.ry - 8 - (i % 2) * 2, 1, 6);
      px(c, '#7a5a30', x, pond.cy + pond.ry - 9 - (i % 2) * 2, 1, 2);
    }
    // soft shadows under everything that stands up
    c.globalAlpha = 0.22;
    for (const p of places) {
      const sx = p.x * T + 2;
      const sy = (p.y + p.h) * T - 2;
      if (p.building) px(c, '#1d2a1a', sx, sy, p.w * T - 2, 4);
    }
    for (const t of trees) {
      c.beginPath();
      c.fillStyle = '#1d2a1a';
      c.ellipse(t.x, t.y - 1, 11, 4, 0, 0, Math.PI * 2);
      c.fill();
    }
    c.globalAlpha = 1;
    // doormats
    for (const p of places) {
      if (!p.building) continue;
      const dx = (p.x + p.door) * T;
      const dy = (p.y + p.h) * T;
      px(c, '#8f3a2a', dx + 2, dy, 12, 4);
      px(c, '#c4553a', dx + 3, dy + 1, 10, 2);
    }
  }

  // ------------------------------------------------------------------ people & animals

  const playerFrames: Record<Facing, HTMLCanvasElement[]> = {
    down: [0, 1, 2, 3].map((f) => paintPlayer('down', f)),
    up: [0, 1, 2, 3].map((f) => paintPlayer('up', f)),
    left: [0, 1, 2, 3].map((f) => paintPlayer('left', f)),
    right: [0, 1, 2, 3].map((f) => paintPlayer('right', f)),
  };
  const catFrames = [false, true].map((flip) => [0, 1, 2].map((f) => paintCat(f, flip)));
  const henFrames = [false, true].map((flip) => [0, 1, 2].map((f) => paintChicken(f, flip)));

  const player = {
    x: spawn.x * T,
    y: spawn.y * T,
    face: 'up' as Facing,
    frame: 0,
    t: 0,
    moving: false,
    path: [] as { x: number; y: number }[],
    goal: null as Place | null,
  };

  const critters: Critter[] = [
    makeCritter('cat', 22.5, 17.5, 4),
    makeCritter('hen', 29, 25.5, 1.4),
    makeCritter('hen', 30.5, 27.5, 1.4),
    makeCritter('hen', 29.5, 28.8, 1.4),
  ];
  function makeCritter(kind: Critter['kind'], x: number, y: number, rad: number): Critter {
    return {
      kind,
      x: x * T,
      y: y * T,
      tx: x * T,
      ty: y * T,
      home: { x: x * T, y: y * T, r: rad * T },
      flip: false,
      frame: 0,
      t: 0,
      wait: 1 + Math.random() * 2,
      state: 'idle',
      lift: 0,
      heart: 0,
    };
  }

  // ------------------------------------------------------------------ collision & paths

  const tileSolid = (x: number, y: number) => !inMap(x, y) || solid[at(x, y)] === 1;
  const blocked = (wx: number, wy: number) => tileSolid(Math.floor(wx / T), Math.floor(wy / T));
  const feetBlocked = (x: number, y: number) =>
    blocked(x - 4, y - 4) || blocked(x + 4, y - 4) || blocked(x - 4, y - 1) || blocked(x + 4, y - 1);

  function findPath(sx: number, sy: number, gx: number, gy: number) {
    if (tileSolid(gx, gy)) return null;
    const open: number[] = [at(sx, sy)];
    const came = new Int32Array(W * H).fill(-1);
    const cost = new Float32Array(W * H).fill(Infinity);
    cost[at(sx, sy)] = 0;
    const goal = at(gx, gy);
    const hfn = (i: number) => Math.hypot((i % W) - gx, Math.floor(i / W) - gy);
    let guard = 0;
    while (open.length && guard++ < 6000) {
      let best = 0;
      for (let i = 1; i < open.length; i++) if (cost[open[i]] + hfn(open[i]) < cost[open[best]] + hfn(open[best])) best = i;
      const cur = open.splice(best, 1)[0];
      if (cur === goal) break;
      const cx = cur % W;
      const cy = Math.floor(cur / W);
      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
        [1, 1],
        [-1, 1],
        [1, -1],
        [-1, -1],
      ]) {
        const nx = cx + dx;
        const ny = cy + dy;
        if (tileSolid(nx, ny)) continue;
        if (dx && dy && (tileSolid(cx + dx, cy) || tileSolid(cx, cy + dy))) continue;
        const ni = at(nx, ny);
        // paths are a little cheaper, so people walk the roads
        const step = (dx && dy ? 1.414 : 1) * (ground[ni] === PATH || ground[ni] === COBBLE ? 0.8 : 1);
        if (cost[cur] + step < cost[ni]) {
          cost[ni] = cost[cur] + step;
          came[ni] = cur;
          if (!open.includes(ni)) open.push(ni);
        }
      }
    }
    if (came[goal] < 0 && goal !== at(sx, sy)) return null;
    const out: { x: number; y: number }[] = [];
    for (let i = goal; i !== at(sx, sy) && i >= 0; i = came[i]) out.unshift({ x: (i % W + 0.5) * T, y: (Math.floor(i / W) + 0.75) * T });
    return out;
  }

  function nearestOpen(tx: number, ty: number) {
    for (let rad = 0; rad < 6; rad++) {
      for (let dy = -rad; dy <= rad; dy++) {
        for (let dx = -rad; dx <= rad; dx++) {
          if (!tileSolid(tx + dx, ty + dy)) return [tx + dx, ty + dy] as const;
        }
      }
    }
    return null;
  }

  const front = (p: Place) => ({ x: p.x + p.door, y: p.y + p.h });

  function walkTo(tx: number, ty: number, goal: Place | null) {
    hideResume();
    const spot = nearestOpen(tx, ty);
    if (!spot) return;
    const path = findPath(Math.floor(player.x / T), Math.floor((player.y - 2) / T), spot[0], spot[1]);
    if (!path) return;
    player.path = path;
    player.goal = goal;
    following = true;
    marker = { x: (spot[0] + 0.5) * T, y: (spot[1] + 0.75) * T, t: 0 };
  }

  // ------------------------------------------------------------------ camera & input

  let scale = 3;
  let dpr = 1;
  let cam = { x: player.x, y: player.y - 20 };
  let following = true;
  let hovered: Place | Critter | null = null;
  let marker: { x: number; y: number; t: number } | null = null;
  const keys = new Set<string>();

  function resize() {
    const rect = root.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 3);
    view.width = Math.max(1, Math.round(rect.width * dpr));
    view.height = Math.max(1, Math.round(rect.height * dpr));
    const tilesAcross = rect.width < 700 ? 14 : Math.min(40, Math.max(26, rect.width / 45));
    scale = Math.max(1, Math.round(view.width / (tilesAcross * T)));
    g.imageSmoothingEnabled = false;
    edge = insets();
  }

  const viewW = () => view.width / scale;
  const viewH = () => view.height / scale;
  /** World pixels hidden under the site nav (top) and the travel bar (bottom). */
  const insets = () => {
    const rect = root.getBoundingClientRect();
    const nav = document.querySelector('.nav')?.getBoundingClientRect().bottom ?? 0;
    const bar = travel!.getBoundingClientRect().top;
    const top = Math.max(0, nav - rect.top) + 14;
    const bottom = Math.max(0, rect.bottom - bar) + 6;
    return { top: (top * dpr) / scale, bottom: (bottom * dpr) / scale };
  };
  let edge = { top: 30, bottom: 30 };
  const clampCam = () => {
    const vw = viewW();
    const vh = viewH();
    cam.x = vw >= MAP_W ? MAP_W / 2 : Math.min(MAP_W - vw / 2, Math.max(vw / 2, cam.x));
    // the top of the map can scroll down past the nav, the bottom up past the travel bar
    const lo = vh / 2 - edge.top - 22;
    const hi = MAP_H - vh / 2 + edge.bottom;
    cam.y = hi < lo ? (lo + hi) / 2 : Math.min(hi, Math.max(lo, cam.y));
  };
  /** Keep the player in the middle of the part of the screen you can see. */
  // Near the north row, lean the camera up so the roofs and towers show.
  const camGoalY = () => player.y - 14 + (edge.bottom - edge.top) / 2 - Math.min(56, Math.max(0, (15 * T - player.y) * 0.9));
  const toWorld = (clientX: number, clientY: number) => {
    const rect = view.getBoundingClientRect();
    const sx = (clientX - rect.left) * dpr;
    const sy = (clientY - rect.top) * dpr;
    return { x: (sx - view.width / 2) / scale + cam.x, y: (sy - view.height / 2) / scale + cam.y };
  };

  function placeAt(wx: number, wy: number): Place | null {
    for (const p of places) {
      const x = p.x * T;
      const y = p.y * T - p.top;
      if (wx >= x && wx < x + p.w * T && wy >= y && wy < (p.y + p.h) * T) return p;
    }
    return null;
  }
  function critterAt(wx: number, wy: number) {
    for (const c of critters) if (Math.abs(wx - c.x) < 9 && wy > c.y - 14 - c.lift && wy < c.y + 3) return c;
    return null;
  }

  let press: { id: number; x: number; y: number; cx: number; cy: number; moved: number; carry: Critter | null } | null = null;

  view.addEventListener('pointerdown', (e) => {
    if (e.button && e.button !== 0) return;
    const w = toWorld(e.clientX, e.clientY);
    const carry = critterAt(w.x, w.y);
    press = { id: e.pointerId, x: e.clientX, y: e.clientY, cx: cam.x, cy: cam.y, moved: 0, carry };
    view.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  view.addEventListener('pointermove', (e) => {
    const w = toWorld(e.clientX, e.clientY);
    if (!press) {
      if (e.pointerType !== 'mouse') return;
      hovered = critterAt(w.x, w.y) ?? placeAt(w.x, w.y);
      root.classList.toggle('is-pointing', Boolean(hovered));
      return;
    }
    if (e.pointerId !== press.id) return;
    press.moved = Math.max(press.moved, Math.hypot(e.clientX - press.x, e.clientY - press.y));
    if (press.carry) {
      if (press.moved > 4) {
        press.carry.state = 'held';
        press.carry.x = w.x;
        press.carry.y = w.y + 6;
        press.carry.lift = 6;
        root.classList.add('is-carrying');
      }
      return;
    }
    if (press.moved > 6) {
      hideResume();
      following = false;
      root.classList.add('is-panning');
      cam.x = press.cx - ((e.clientX - press.x) * dpr) / scale;
      cam.y = press.cy - ((e.clientY - press.y) * dpr) / scale;
      clampCam();
    }
  });
  const endPress = (e: PointerEvent) => {
    if (!press || e.pointerId !== press.id) return;
    const p = press;
    press = null;
    root.classList.remove('is-panning', 'is-carrying');
    const w = toWorld(e.clientX, e.clientY);
    if (p.carry) {
      const c = p.carry;
      if (c.state === 'held') {
        // set it down somewhere it can stand
        const spot = nearestOpen(Math.floor(c.x / T), Math.floor((c.y - 2) / T));
        if (spot && tileSolid(Math.floor(c.x / T), Math.floor((c.y - 2) / T))) {
          c.x = (spot[0] + 0.5) * T;
          c.y = (spot[1] + 0.75) * T;
        }
        c.state = 'idle';
        c.wait = 1.2;
        c.home.x = c.x;
        c.home.y = c.y;
        c.lift = 10;
        return;
      }
      c.heart = 1.4;
      c.state = c.kind === 'cat' ? 'sit' : 'peck';
      c.wait = 1.6;
      say(c.kind === 'cat' ? 'The cat purrs.' : 'The hen clucks.');
      return;
    }
    if (p.moved > 6) return;
    const target = placeAt(w.x, w.y);
    if (target) {
      const f = front(target);
      walkTo(f.x, f.y, target);
      return;
    }
    walkTo(Math.floor(w.x / T), Math.floor(w.y / T), null);
  };
  view.addEventListener('pointerup', endPress);
  view.addEventListener('pointercancel', endPress);
  view.addEventListener('pointerleave', () => {
    if (!press) {
      hovered = null;
      root.classList.remove('is-pointing');
    }
  });

  const MOVE_KEYS: Record<string, [number, number]> = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
    w: [0, -1],
    s: [0, 1],
    a: [-1, 0],
    d: [1, 0],
    W: [0, -1],
    S: [0, 1],
    A: [-1, 0],
    D: [1, 0],
  };
  const flat = () => document.documentElement.classList.contains('town-flat');
  const keyName = (k: string) => (k.length === 1 ? k.toLowerCase() : k);
  const typing = () => {
    const el = document.activeElement;
    return el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || (el instanceof HTMLElement && el.isContentEditable);
  };
  window.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey || typing() || flat()) return;
    if (openPlace) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeDialog();
      }
      return;
    }
    if (e.key === 'Escape') {
      hideResume();
      return;
    }
    if (MOVE_KEYS[e.key]) {
      hideResume();
      // leave arrow keys alone while someone is tabbing through links
      const el = document.activeElement;
      if (el instanceof HTMLElement && el.closest('a, button') && e.key.startsWith('Arrow') && !root.contains(el)) return;
      e.preventDefault();
      keys.add(keyName(e.key));
      player.path = [];
      player.goal = null;
      following = true;
    } else if (e.key === 'e' || e.key === 'E' || e.key === 'Enter' || e.key === ' ') {
      const near = nearbyPlace();
      if (near && !(document.activeElement instanceof HTMLButtonElement || document.activeElement instanceof HTMLAnchorElement)) {
        e.preventDefault();
        openDialog(near);
      }
    }
  });
  window.addEventListener('keyup', (e) => keys.delete(keyName(e.key)));
  window.addEventListener('blur', () => keys.clear());

  function nearbyPlace() {
    for (const p of places) {
      const f = front(p);
      if (Math.hypot(player.x - (f.x + 0.5) * T, player.y - (f.y + 0.6) * T) < 20) return p;
    }
    return null;
  }

  // ------------------------------------------------------------------ dialog

  let openPlace: Place | null = null;
  let openAspect = 0;
  /** The welcome sign pops up on its own; closing it should not move you. */
  let stayPut = false;
  let lastFocus: Element | null = null;
  const worldById = new Map(data.worlds.worlds.map((w) => [w.id, w]));

  function say(text: string) {
    status!.textContent = '';
    requestAnimationFrame(() => (status!.textContent = text));
  }

  function link(href: string, label: string, primary = false) {
    const ext = /^https?:\/\//.test(href);
    return `<a class="town-btn${primary ? ' is-primary' : ''}" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(label)}</a>`;
  }

  function aspectHtml(world: WorldSpec<WorldImage>, i: number, sameTitle = '', skipPoint = '') {
    const a = world.aspects[i];
    if (!a) return '';
    const points = a.points.filter((pt) => pt !== skipPoint);
    const img = a.art
      ? `<figure class="town-art"><img src="${esc(a.art.src)}" srcset="${esc(a.art.srcset)}" sizes="(max-width: 700px) 92vw, 520px" width="${a.art.width}" height="${a.art.height}" alt="${esc(a.art.alt)}" loading="lazy" decoding="async" /></figure>`
      : '';
    return `${img}
      ${a.title === sameTitle ? '' : `<h3>${esc(a.title)}</h3>`}
      <p class="town-line">${esc(a.line)}</p>
      ${points.length ? `<ul>${points.map((pt) => `<li>${esc(pt)}</li>`).join('')}</ul>` : ''}
      ${a.links.length ? `<div class="town-links">${a.links.map((l, k) => link(l.href, l.label, k === 0)).join('')}</div>` : ''}`;
  }

  function briefsHtml(placeId: string, show: boolean) {
    if (!show) return '';
    const items = data.briefs[placeId];
    if (!items?.length) return '';
    const beats = [
      ['Problem', 'problem'],
      ['Constraint', 'constraint'],
      ['Decision', 'decision'],
      ['Outcome', 'outcome'],
    ] as const;
    return `<section class="town-briefs"><h3>What I built</h3>${items
      .map(
        (b) => `<article class="town-brief"><h4>${esc(b.title)}</h4><p class="town-line">${esc(b.metric)}</p>${
          b.stack.length ? `<p class="town-stack">${b.stack.map((s) => `<span>${esc(s)}</span>`).join('')}</p>` : ''
        }<dl class="town-beats">${beats.map(([label, key]) => `<div><dt>${label}</dt><dd>${esc(b[key])}</dd></div>`).join('')}</dl></article>`,
      )
      .join('')}</section>`;
  }

  function render(p: Place) {
    const o = p.opens;
    let head = '';
    let body = '';
    if (o.kind === 'world') {
      const world = worldById.get(o.world);
      if (!world) return '';
      const only = typeof o.aspect === 'number';
      const list = only ? [o.aspect as number] : world.aspects.map((_, k) => k);
      const cur = only ? (o.aspect as number) : Math.min(openAspect, world.aspects.length - 1);
      const firstPoint = world.aspects[cur]?.points[0] ?? '';
      const roleLine = only && firstPoint.includes(' · ') ? firstPoint : '';
      head = `<p class="town-kicker">${esc(p.sub)}</p><h2 id="town-dialog-title">${esc(p.label)}</h2>
        <p class="town-meta">${esc(roleLine || `${world.when} · ${world.place}`)}</p>
        ${!only && world.summary ? `<p class="town-summary">${esc(world.summary)}</p>` : ''}`;
      const tabs =
        list.length > 1
          ? `<div class="town-tabs" role="tablist">${list
              .map(
                (k) =>
                  `<button type="button" role="tab" data-aspect="${k}" aria-selected="${k === cur}">${esc(world.aspects[k].title)}</button>`,
              )
              .join('')}</div>`
          : '';
      body = `${tabs}<div class="town-page">${aspectHtml(world, cur, only ? p.label : '', roleLine)}${briefsHtml(p.id, only || cur === 0)}</div>
        ${
          list.length > 1
            ? `<div class="town-step"><button type="button" class="town-btn" data-step="-1">◀ Prev</button><span>${cur + 1} / ${list.length}</span><button type="button" class="town-btn" data-step="1">Next ▶</button></div>`
            : ''
        }`;
    } else if (o.kind === 'hire') {
      head = `<p class="town-kicker">Town Hall · ${esc(data.hire.kicker)}</p><h2 id="town-dialog-title">Hire me</h2>
        <p class="town-summary"><strong>${esc(data.hire.role)}</strong> ${esc(data.hire.lede)}</p>`;
      body = `<dl class="town-proof">${data.hire.proof
        .map((it) => `<div><dt>${esc(it.value)}</dt><dd>${esc(it.label)}<small>${esc(it.source)}</small></dd></div>`)
        .join('')}</dl>
        <div class="town-links">${link('/map/', 'System map', true)}${link('/hire/', 'Hiring page')}${link('/resume/', 'Resume')}${link(data.links.hireMail, 'Email me')}${link(data.links.linkedin, 'LinkedIn')}${link(data.links.github, 'GitHub')}</div>`;
    } else if (o.kind === 'record') {
      const rec = data.worlds.record;
      head = `<p class="town-kicker">${esc(rec.kicker)}</p><h2 id="town-dialog-title">Notice Board</h2><p class="town-summary">${esc(rec.note)}</p>`;
      body = `<ul class="town-notes">${rec.items
        .map((it) => `<li><p class="town-kicker">${esc(it.place)} · ${esc(it.when)}</p><h3>${esc(it.claim)}</h3><p>${esc(it.proof)}</p></li>`)
        .join('')}</ul><div class="town-links">${link('/experience/', 'Experience', true)}${link('/resume/', 'Resume')}</div>`;
    } else if (o.kind === 'mail') {
      head = `<p class="town-kicker">Mailbox</p><h2 id="town-dialog-title">Write to me</h2><p class="town-summary">Roles, projects, or a question about anything in town.</p>`;
      body = `<p class="town-mail"><a href="${esc(data.links.mail)}">${esc(data.links.email)}</a></p>
        <div class="town-links">${link(data.links.hireMail, 'Email about a role', true)}${link(data.links.linkedin, 'LinkedIn')}${link(data.links.github, 'GitHub')}${link('/engage/', 'Pricing')}</div>`;
    } else {
      const ov = data.worlds.overview;
      head = `<p class="town-kicker">Welcome to</p><h2 id="town-dialog-title">${esc(townName.owner)}: ${esc(townName.title)}</h2>
        <p class="town-summary">${esc(ov.lede)}</p>`;
      body = `<p>Every building is a job, a school, or something I built. Walk in to read about it.</p>
        <ul class="town-how">
          <li><b>Walk</b> with WASD or the arrow keys, or click or tap where you want to go.</li>
          <li><b>Go inside</b> by walking through a door, or click a building.</li>
          <li><b>Look around</b> by dragging the ground. You can pick up the cat and the hens.</li>
          <li><b>Day or night:</b> the Light and Dark button switches it.</li>
        </ul>
        <div class="town-links"><button type="button" class="town-btn is-primary" data-close>Start exploring</button>${link('/map/', 'System map')}</div>
        <p class="town-small">Rather read than walk? <button type="button" class="town-linkish" data-town-flat="on">Open the text version</button>.</p>`;
    }
    return `<header class="town-head">${head}</header><div class="town-body">${body}</div>`;
  }

  /** True while the open building has its own history entry, so Back closes it. */
  let pushed = false;

  function openDialog(p: Place, aspect = 0, push = true) {
    if (!dialog || !dialogBody) return;
    const wasOpen = Boolean(openPlace);
    if (!openPlace) lastFocus = document.activeElement;
    stayPut = false;
    openPlace = p;
    openAspect = aspect;
    keys.clear();
    player.path = [];
    player.goal = null;
    hideResume();
    dialogBody.innerHTML = render(p);
    dialog.hidden = false;
    const card = dialog.querySelector<HTMLElement>('.town-card');
    if (card) card.scrollTop = 0;
    dialog.dataset.kind = p.opens.kind;
    root.classList.add('has-dialog');
    const hash = p.opens.kind === 'world' && typeof p.opens.aspect !== 'number' && aspect > 0
      ? worldById.get(p.opens.world)?.aspects[aspect]?.id ?? p.id
      : p.id;
    if (push && !wasOpen && !pushed) {
      history.pushState({ town: hash }, '', `#${hash}`);
      pushed = true;
    } else if (location.hash !== `#${hash}`) {
      history.replaceState(history.state, '', `#${hash}`);
    }
    syncTravel();
    say(`${p.label}. ${p.sub}.`);
    dialog.querySelector<HTMLElement>('[data-close-x]')?.focus({ preventScroll: true });
  }

  function closeDialog(fromHistory = false) {
    if (!dialog || !openPlace) return;
    const p = openPlace;
    openPlace = null;
    dialog.hidden = true;
    root.classList.remove('has-dialog');
    if (fromHistory) {
      pushed = false;
    } else if (pushed) {
      pushed = false;
      history.back();
    } else {
      history.replaceState(null, '', location.pathname + location.search);
    }
    if (!stayPut) {
      // step back out the door
      const f = front(p);
      player.x = (f.x + 0.5) * T;
      player.y = (f.y + 0.7) * T;
      player.face = 'down';
    }
    stayPut = false;
    following = true;
    syncTravel();
    if (lastFocus instanceof HTMLElement && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }

  function showResume() {
    if (openPlace) closeDialog(true);
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    root.classList.remove('resume-away');
    document.documentElement.classList.remove('town-resume-away');
    resume?.querySelector<HTMLElement>('#town-resume-title')?.focus({ preventScroll: true });
  }

  dialog.addEventListener('click', (e) => {
    const t = e.target as Element;
    if (t.closest('[data-close], [data-close-x]') || t === dialog) {
      closeDialog();
      return;
    }
    const tab = t.closest<HTMLElement>('[data-aspect]');
    const step = t.closest<HTMLElement>('[data-step]');
    if (!openPlace || openPlace.opens.kind !== 'world') return;
    const world = worldById.get(openPlace.opens.world);
    if (!world) return;
    let next = openAspect;
    if (tab) next = Number(tab.dataset.aspect);
    else if (step) next = (openAspect + Number(step.dataset.step) + world.aspects.length) % world.aspects.length;
    else return;
    openDialog(openPlace, next);
    dialog.querySelector<HTMLElement>(tab ? `[data-aspect="${next}"]` : `[data-step="${step?.dataset.step}"]`)?.focus();
  });

  // ------------------------------------------------------------------ quick travel

  const travelOrder = ['townhall', 'goldman', 'stealth', 'onedave', 'hait', 'study', 'projects', 'localhost', 'phonecoding', 'd22soso', 'play', 'achievements', 'mail'];
  travel.innerHTML = travelOrder
    .map((id) => places.find((p) => p.id === id))
    .filter((p): p is Place => Boolean(p))
    .map((p) => `<button type="button" data-go="${p.id}"><span>${esc(p.label)}</span><small>${esc(p.rail || p.sub)}</small></button>`)
    .join('') + `<button type="button" class="town-travel-text" data-town-flat="on"><span>Text version</span><small>Read it all</small></button>`;
  travel.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLElement>('[data-go]');
    const p = b ? places.find((x) => x.id === b.dataset.go) : undefined;
    if (p) visit(p);
  });
  function syncTravel() {
    travel!.querySelectorAll<HTMLElement>('[data-go]').forEach((b) => {
      if (openPlace && b.dataset.go === openPlace.id) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
  }

  /** Quick travel: a short fade, then you are at the door and inside. */
  function visit(p: Place, aspect = 0, fromLink = false) {
    const go = () => {
      const f = front(p);
      player.x = (f.x + 0.5) * T;
      player.y = (f.y + 0.7) * T;
      player.face = 'up';
      player.path = [];
      cam = { x: player.x, y: camGoalY() };
      following = true;
      clampCam();
      const wasOpen = Boolean(openPlace);
      openDialog(p, aspect, !fromLink);
      if (fromLink && !wasOpen) pushed = true;
    };
    if (reduced) {
      go();
      return;
    }
    fade!.classList.add('is-on');
    window.setTimeout(() => {
      go();
      fade!.classList.remove('is-on');
    }, 180);
  }

  root.querySelectorAll<HTMLElement>('[data-town-visit]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const p = places.find((x) => x.id === el.dataset.townVisit);
      if (!p) return;
      e.preventDefault();
      visit(p);
    });
  });

  function fromHash(raw: string) {
    const h = decodeURIComponent(raw.replace(/^#/, ''));
    if (!h || h === 'top' || h === 'work') return null;
    const direct = places.find((p) => p.id === h);
    if (direct) return { place: direct, aspect: 0 };
    if (h === 'record') return { place: places.find((p) => p.id === 'achievements')!, aspect: 0 };
    const byWorld = places.find((p) => p.opens.kind === 'world' && p.opens.world === h);
    if (byWorld) return { place: byWorld, aspect: 0 };
    for (const w of data.worlds.worlds) {
      const k = w.aspects.findIndex((a) => a.id === h);
      if (k < 0) continue;
      const exact = places.find((p) => p.opens.kind === 'world' && p.opens.world === w.id && p.opens.aspect === k);
      if (exact) return { place: exact, aspect: 0 };
      const any = places.find((p) => p.opens.kind === 'world' && p.opens.world === w.id);
      if (any) return { place: any, aspect: k };
    }
    return null;
  }
  window.addEventListener('hashchange', () => {
    const hit = fromHash(location.hash);
    // the link already made a history entry, so Back will close this building
    if (hit && hit.place !== openPlace) visit(hit.place, hit.aspect, true);
  });
  window.addEventListener('popstate', () => {
    // Back (or a swipe back on a phone) walks out of the building
    if (openPlace && !fromHash(location.hash)) closeDialog(true);
  });

  dialog.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const list = [...dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')].filter((el) => el.offsetParent !== null);
    if (!list.length) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  // A plain, scrollable version of the whole town, for screen readers or anyone who prefers it.
  root.addEventListener('click', (e) => {
    const target = e.target as Element | null;
    if (target?.closest('[data-town-resume-toggle]')) {
      if (root.classList.contains('resume-away')) showResume();
      else hideResume();
      return;
    }
    if (target?.closest('[data-town-resume-close]')) {
      hideResume();
      return;
    }
    const el = target?.closest<HTMLElement>('[data-town-flat]');
    if (!el) return;
    const on = el.dataset.townFlat === 'on';
    if (on && openPlace) closeDialog();
    keys.clear();
    document.documentElement.classList.toggle('town-flat', on);
    window.scrollTo(0, 0);
    if (on) root.querySelector<HTMLElement>('.town-archive h1')?.focus({ preventScroll: true });
    else resize();
  });

  // ------------------------------------------------------------------ ambient life

  type Mote = { x: number; y: number; vx: number; vy: number; life: number; max: number; kind: 'smoke' | 'fly' | 'firefly' | 'spray' | 'ripple' };
  const motes: Mote[] = [];
  const chimneys = places.filter((p) => p.art?.chimney).map((p) => ({ x: p.x * T + (p.art!.chimney!.x - 1), y: p.y * T + p.art!.chimney!.y - p.top }));
  let simTime = 0;
  const clouds = [0, 1, 2].map((i) => ({ x: i * 300 - 100, y: 80 + i * 170, r: 90 + i * 20 }));

  function updateAmbient(dt: number) {
    if (reduced) {
      motes.length = 0;
      return;
    }
    for (const c of chimneys) if (Math.random() < dt * 2.2) motes.push({ x: c.x + Math.random() * 3, y: c.y, vx: 3 + Math.random() * 3, vy: -8 - Math.random() * 4, life: 0, max: 2.4, kind: 'smoke' });
    if (Math.random() < dt * 10) {
      const a = Math.random() * Math.PI;
      motes.push({ x: 25.5 * T, y: 15.6 * T, vx: Math.cos(a) * 10, vy: -18 - Math.random() * 6, life: 0, max: 0.9, kind: 'spray' });
    }
    if (Math.random() < dt * 0.6) {
      const a = Math.random() * Math.PI * 2;
      motes.push({ x: pond.cx + Math.cos(a) * pond.rx * 0.5, y: pond.cy + Math.sin(a) * pond.ry * 0.5, vx: 0, vy: 0, life: 0, max: 1.6, kind: 'ripple' });
    }
    const flyKind = night ? 'firefly' : 'fly';
    const flies = motes.filter((m) => m.kind === 'fly' || m.kind === 'firefly').length;
    if (flies < (night ? 22 : 6) && Math.random() < dt * 3) {
      motes.push({ x: Math.random() * MAP_W, y: 3 * T + Math.random() * (MAP_H - 6 * T), vx: 0, vy: 0, life: 0, max: 6 + Math.random() * 6, kind: flyKind });
    }
    for (let i = motes.length - 1; i >= 0; i--) {
      const m = motes[i];
      m.life += dt;
      if (m.kind === 'fly' || m.kind === 'firefly') {
        m.vx += (Math.random() - 0.5) * 60 * dt;
        m.vy += (Math.random() - 0.5) * 60 * dt;
        m.vx *= 0.96;
        m.vy *= 0.96;
      }
      if (m.kind === 'spray') m.vy += 40 * dt;
      m.x += m.vx * dt;
      m.y += m.vy * dt;
      if (m.life > m.max || ((m.kind === 'fly' || m.kind === 'firefly') && m.kind !== flyKind)) motes.splice(i, 1);
    }
    for (const c of clouds) {
      c.x += 6 * dt;
      if (c.x - c.r > MAP_W) c.x = -c.r * 2;
    }
  }

  function updateCritters(dt: number) {
    for (const c of critters) {
      c.t += dt;
      c.heart = Math.max(0, c.heart - dt);
      if (c.lift > 0 && c.state !== 'held') c.lift = Math.max(0, c.lift - dt * 40);
      if (c.state === 'held') {
        c.frame = Math.floor(simTime * 8) % 2;
        continue;
      }
      if (c.state === 'walk') {
        const dx = c.tx - c.x;
        const dy = c.ty - c.y;
        const d = Math.hypot(dx, dy);
        const speed = c.kind === 'cat' ? 22 : 14;
        if (d < 1.5) {
          c.state = Math.random() < 0.5 ? 'idle' : c.kind === 'cat' ? 'sit' : 'peck';
          c.wait = 1 + Math.random() * 3;
        } else {
          const nx = c.x + (dx / d) * speed * dt;
          const ny = c.y + (dy / d) * speed * dt;
          if (!blocked(nx, ny - 2)) {
            c.x = nx;
            c.y = ny;
          } else c.state = 'idle';
          c.flip = dx < 0;
          c.frame = Math.floor(c.t * 6) % 2;
        }
      } else {
        c.wait -= dt;
        c.frame = c.state === 'sit' || c.state === 'peck' ? 2 : 0;
        if (c.state === 'peck') c.frame = Math.floor(c.t * 3) % 2 ? 2 : 0;
        if (c.wait <= 0) {
          const a = Math.random() * Math.PI * 2;
          const d = Math.random() * c.home.r;
          const tx = c.home.x + Math.cos(a) * d;
          const ty = c.home.y + Math.sin(a) * d;
          if (!blocked(tx, ty - 2)) {
            c.tx = tx;
            c.ty = ty;
            c.state = 'walk';
          } else c.wait = 0.5;
        }
      }
    }
  }

  let promptText = '';
  let walked = 0;
  let hintGone = false;
  const coarse = matchMedia('(pointer: coarse)').matches;

  function updatePlayer(dt: number) {
    let mx = 0;
    let my = 0;
    for (const k of keys) {
      const v = MOVE_KEYS[k];
      if (!v) continue;
      mx += v[0];
      my += v[1];
    }
    mx = Math.sign(mx);
    my = Math.sign(my);
    let speed = 72;
    if (!mx && !my && player.path.length) {
      const next = player.path[0];
      const dx = next.x - player.x;
      const dy = next.y - player.y;
      const d = Math.hypot(dx, dy);
      if (d < 2.5) {
        player.path.shift();
        if (!player.path.length) {
          marker = null;
          const goal = player.goal;
          player.goal = null;
          if (goal) {
            player.face = 'up';
            openDialog(goal);
          }
        }
      } else {
        mx = dx / d;
        my = dy / d;
        speed = 96;
      }
    }
    player.moving = Boolean(mx || my);
    if (player.moving) {
      const len = Math.hypot(mx, my);
      const vx = (mx / len) * speed * dt;
      const vy = (my / len) * speed * dt;
      if (!feetBlocked(player.x + vx, player.y)) player.x += vx;
      if (!feetBlocked(player.x, player.y + vy)) player.y += vy;
      if (Math.abs(mx) > Math.abs(my)) player.face = mx > 0 ? 'right' : 'left';
      else player.face = my > 0 ? 'down' : 'up';
      player.t += dt;
      player.frame = [0, 1, 0, 3][Math.floor(player.t * 8) % 4];
      following = true;
      // walking into a door goes inside
      if (!player.path.length || player.goal) {
        const tx = Math.floor(player.x / T);
        const ty = Math.floor((player.y - 3) / T);
        for (const p of places) {
          if (p.building && tx === p.x + p.door && ty === p.y + p.h - 1) {
            openDialog(p);
            break;
          }
        }
      }
    } else {
      player.frame = 0;
    }
    const near = !openPlace ? nearbyPlace() : null;
    const text = near ? `${near.label} · ${coarse ? 'tap it' : 'press E or click'} to go in` : '';
    if (text !== promptText) {
      promptText = text;
      prompt!.hidden = !text;
      prompt!.textContent = text;
    }
    // the controls hint steps aside once you have walked a little
    if (player.moving && !hintGone) {
      walked += dt;
      if (walked > 2.5) {
        hintGone = true;
        root.classList.add('has-walked');
      }
    }
  }

  // ------------------------------------------------------------------ drawing

  const outlineCache = new Map<HTMLCanvasElement, HTMLCanvasElement>();
  function outlineOf(src: HTMLCanvasElement) {
    const hit = outlineCache.get(src);
    if (hit) return hit;
    const { c, ctx: o } = makeCanvas(src.width + 2, src.height + 2);
    const s = src.getContext('2d')!.getImageData(0, 0, src.width, src.height).data;
    o.fillStyle = '#fff3c4';
    const filled = (x: number, y: number) => x >= 0 && y >= 0 && x < src.width && y < src.height && s[(y * src.width + x) * 4 + 3] > 0;
    for (let y = -1; y <= src.height; y++)
      for (let x = -1; x <= src.width; x++)
        if (!filled(x, y) && (filled(x - 1, y) || filled(x + 1, y) || filled(x, y - 1) || filled(x, y + 1))) o.fillRect(x + 1, y + 1, 1, 1);
    outlineCache.set(src, c);
    return c;
  }

  const snap = (v: number) => Math.round(v * scale) / scale;

  function frame(dt: number) {
    simTime += dt;
    if (!openPlace) updatePlayer(dt);
    updateCritters(dt);
    updateAmbient(dt);
    if (following) {
      const k = reduced ? 1 : Math.min(1, dt * 5);
      cam.x += (player.x - cam.x) * k;
      cam.y += (camGoalY() - cam.y) * k;
    }
    clampCam();

    g.setTransform(1, 0, 0, 1, 0, 0);
    g.imageSmoothingEnabled = false;
    g.fillStyle = '#2f5a2a';
    g.fillRect(0, 0, view.width, view.height);
    const tx = Math.round(view.width / 2 - cam.x * scale);
    const ty = Math.round(view.height / 2 - cam.y * scale);
    g.setTransform(scale, 0, 0, scale, tx, ty);
    g.drawImage(groundArt.c, 0, 0);

    // water shimmer
    for (const m of motes) {
      if (m.kind !== 'ripple') continue;
      const k = m.life / m.max;
      g.globalAlpha = 0.6 * (1 - k);
      g.strokeStyle = '#d9f3ff';
      g.lineWidth = 1;
      g.beginPath();
      g.ellipse(Math.round(m.x), Math.round(m.y), 2 + k * 8, 1 + k * 3, 0, 0, Math.PI * 2);
      g.stroke();
    }
    g.globalAlpha = 1;
    if (!reduced) {
      for (let i = 0; i < 6; i++) {
        const a = i * 1.7 + simTime * 0.3;
        const on = Math.sin(simTime * 2 + i * 2.1) > 0.6;
        if (on) px(g, '#ffffff', pond.cx + Math.cos(a) * pond.rx * 0.55, pond.cy + Math.sin(a * 1.3) * pond.ry * 0.5, 2, 1);
      }
    }
    if (marker) {
      marker.t += dt;
      const bob = Math.sin(marker.t * 8) * 1.5;
      g.globalAlpha = 0.85;
      px(g, '#fff3c4', marker.x - 3, marker.y - 1, 7, 1);
      px(g, '#fff3c4', marker.x - 1, marker.y - 7 + bob, 3, 4);
      px(g, '#fff3c4', marker.x, marker.y - 3 + bob, 1, 1);
      g.globalAlpha = 1;
    }

    // everything that stands, back to front
    const list: Drawable[] = [];
    for (const t of things) {
      list.push({ y: t.y, draw: (c) => c.drawImage(t.sprite.canvas, Math.round(t.x + t.sprite.ox), Math.round(t.y + t.sprite.oy)) });
    }
    for (const p of places) {
      const sx = p.x * T;
      const sy = (p.y + p.h) * T;
      if (p.art) {
        const art = p.art;
        list.push({
          y: sy,
          draw: (c) => {
            if (hovered === p) c.drawImage(outlineOf(art.canvas), sx + art.ox - 1, p.y * T + art.oy - 1);
            c.drawImage(art.canvas, sx + art.ox, p.y * T + art.oy);
          },
        });
      } else if (p.sprite) {
        const s = p.sprite;
        const ax = (p.x + p.w / 2) * T;
        list.push({
          y: sy,
          draw: (c) => {
            if (hovered === p) c.drawImage(outlineOf(s.canvas), ax + s.ox - 1, sy + s.oy - 1);
            c.drawImage(s.canvas, ax + s.ox, sy + s.oy);
          },
        });
      }
    }
    for (const c of critters) {
      const art = c.kind === 'cat' ? catFrames[c.flip ? 1 : 0][c.frame] : henFrames[c.flip ? 1 : 0][c.frame];
      list.push({
        y: c.state === 'held' ? c.y + 40 : c.y,
        draw: (ctx2) => {
          const hx = snap(c.x - art.width / 2);
          const hy = snap(c.y - art.height - c.lift);
          ctx2.globalAlpha = 0.25;
          px(ctx2, '#1d2a1a', c.x - 4, c.y - 1, 8, 2);
          ctx2.globalAlpha = 1;
          if (hovered === c) ctx2.drawImage(outlineOf(art), hx - 1, hy - 1);
          ctx2.drawImage(art, hx, hy);
          if (c.heart > 0) {
            const hy2 = c.y - art.height - 8 - (1.4 - c.heart) * 6;
            px(ctx2, '#e8526a', c.x - 2, hy2, 2, 2);
            px(ctx2, '#e8526a', c.x + 1, hy2, 2, 2);
            px(ctx2, '#e8526a', c.x - 2, hy2 + 1, 5, 2);
            px(ctx2, '#e8526a', c.x - 1, hy2 + 3, 3, 1);
            px(ctx2, '#e8526a', c.x, hy2 + 4, 1, 1);
          }
        },
      });
    }
    const pf = playerFrames[player.face][player.frame];
    list.push({
      y: player.y,
      draw: (c) => {
        c.globalAlpha = 0.28;
        px(c, '#1d2a1a', player.x - 5, player.y - 1, 10, 2);
        c.globalAlpha = 1;
        c.drawImage(pf, snap(player.x - 8), snap(player.y - 24));
      },
    });
    list.sort((a, b) => a.y - b.y);
    for (const d of list) d.draw(g);

    // smoke and spray over the roofs
    for (const m of motes) {
      const k = m.life / m.max;
      if (m.kind === 'smoke') {
        g.globalAlpha = 0.45 * (1 - k);
        const s = 2 + Math.floor(k * 4);
        px(g, night ? '#8a90a8' : '#f4f4f4', m.x, m.y, s, s);
      } else if (m.kind === 'spray') {
        g.globalAlpha = 0.85 * (1 - k);
        px(g, '#e6f7ff', m.x, m.y, 1, 1);
      } else if (m.kind === 'fly') {
        g.globalAlpha = 1;
        const flap = Math.floor(simTime * 12 + m.max) % 2;
        px(g, '#fff6e0', m.x - 1, m.y - flap, 1, 1);
        px(g, '#fff6e0', m.x + 1, m.y - flap, 1, 1);
        px(g, '#3a3030', m.x, m.y, 1, 1);
      }
    }
    g.globalAlpha = 1;

    // drifting cloud shadows in the day
    if (!night && !reduced) {
      for (const c of clouds) {
        const grd = g.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
        grd.addColorStop(0, 'rgba(20,40,30,0.10)');
        grd.addColorStop(1, 'rgba(20,40,30,0)');
        g.fillStyle = grd;
        g.fillRect(c.x - c.r, c.y - c.r, c.r * 2, c.r * 2);
      }
    }

    // night: darken, then light the windows, lamps, and fireflies
    if (night) {
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.fillStyle = 'rgba(18, 22, 58, 0.58)';
      g.fillRect(0, 0, view.width, view.height);
      g.setTransform(scale, 0, 0, scale, tx, ty);
      g.globalCompositeOperation = 'lighter';
      const flicker = reduced ? 1 : 0.92 + Math.sin(simTime * 9) * 0.04 + Math.sin(simTime * 23) * 0.03;
      for (const p of places) {
        if (!p.art) continue;
        const ox = p.x * T + p.art.ox;
        const oy = p.y * T + p.art.oy;
        for (const w of p.art.windows) {
          glow(ox + w.x + w.w / 2, oy + w.y + w.h / 2, 18, 'rgba(255,190,90,0.32)');
          g.fillStyle = 'rgba(255,200,110,0.75)';
          g.fillRect(ox + w.x, oy + w.y, w.w, w.h);
        }
        for (const n of p.art.neon) {
          glow(ox + n.x + n.w / 2, oy + n.y + n.h / 2, Math.max(10, n.w * 0.6), hexA(n.color, 0.28));
          g.fillStyle = hexA(n.color, 0.9);
          g.fillRect(ox + n.x, oy + n.y, n.w, Math.max(1, n.h));
        }
      }
      for (const t of things) if (t.light) glow(t.x, t.y - 26, 46, `rgba(255,200,120,${(0.3 * flicker).toFixed(3)})`);
      for (const m of motes) {
        if (m.kind !== 'firefly') continue;
        const a = Math.max(0, Math.sin(m.life * 2.4 + m.max)) * Math.min(1, (m.max - m.life) * 2);
        glow(m.x, m.y, 5, `rgba(210,255,120,${(0.35 * a).toFixed(3)})`);
        g.fillStyle = `rgba(230,255,160,${a})`;
        g.fillRect(Math.round(m.x), Math.round(m.y), 1, 1);
      }
      g.globalCompositeOperation = 'source-over';
    }

    drawLabels(tx, ty);
  }

  function hexA(color: string, a: number) {
    const v = parseInt(color.replace('#', ''), 16);
    return `rgba(${(v >> 16) & 255},${(v >> 8) & 255},${v & 255},${a})`;
  }
  // One soft dot per color and size, drawn once and reused every frame.
  const glowCache = new Map<string, HTMLCanvasElement>();
  function glow(x: number, y: number, rad: number, color: string) {
    const m = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/.exec(color);
    if (!m) return;
    const r0 = Math.max(2, Math.round(rad));
    const key = `${m[1]},${m[2]},${m[3]}|${r0}`;
    let sprite = glowCache.get(key);
    if (!sprite) {
      const { c, ctx: gc } = makeCanvas(r0 * 2, r0 * 2);
      const grd = gc.createRadialGradient(r0, r0, 0, r0, r0, r0);
      grd.addColorStop(0, `rgba(${m[1]},${m[2]},${m[3]},1)`);
      grd.addColorStop(1, `rgba(${m[1]},${m[2]},${m[3]},0)`);
      gc.fillStyle = grd;
      gc.fillRect(0, 0, r0 * 2, r0 * 2);
      sprite = c;
      glowCache.set(key, sprite);
    }
    const alpha = Number(m[4]);
    if (alpha <= 0.002) return;
    g.globalAlpha = Math.min(1, alpha);
    g.drawImage(sprite, x - r0, y - r0);
    g.globalAlpha = 1;
  }

  let fontReady = false;
  document.fonts?.load('16px "Pixelify Sans"').then(() => (fontReady = true)).catch(() => {});
  function drawLabels(tx: number, ty: number) {
    g.setTransform(1, 0, 0, 1, 0, 0);
    const size = Math.round(12 * dpr);
    const family = fontReady ? '"Pixelify Sans", monospace' : 'monospace';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    for (const p of places) {
      const cx = (p.x + p.w / 2) * T * scale + tx;
      const bottom = (p.y + p.h) * T * scale + ty;
      const navLine = (edge.top - 8) * scale + 12 * dpr;
      const top = Math.max(navLine, (p.y * T - p.top) * scale + ty - 9 * dpr);
      if (cx < -200 || cx > view.width + 200 || bottom < navLine + 30 * dpr || top > view.height + 40) continue;
      const hot = hovered === p || openPlace === p;
      g.font = `600 ${size}px ${family}`;
      const label = p.label;
      const w = g.measureText(label).width + 14 * dpr;
      const h = size + 8 * dpr;
      const x = Math.round(cx - w / 2);
      const y = Math.round(top - h / 2);
      g.fillStyle = 'rgba(40,24,12,0.92)';
      g.fillRect(x - dpr, y - dpr, w + 2 * dpr, h + 2 * dpr);
      g.fillStyle = hot ? '#ffe7a0' : '#f3dcae';
      g.fillRect(x, y, w, h);
      g.fillStyle = hot ? '#e7b74a' : '#d9bd84';
      g.fillRect(x, y + h - 2 * dpr, w, 2 * dpr);
      g.fillStyle = '#3a2412';
      g.fillText(label, cx, top + dpr * 0.5);
      if (hot && p.sub) {
        g.font = `500 ${Math.round(10 * dpr)}px ${family}`;
        const sw = g.measureText(p.sub).width + 10 * dpr;
        g.fillStyle = 'rgba(40,24,12,0.85)';
        g.fillRect(Math.round(cx - sw / 2), y + h + 2 * dpr, sw, 14 * dpr);
        g.fillStyle = '#fff3c4';
        g.fillText(p.sub, cx, y + h + 9 * dpr);
      }
    }
  }

  // ------------------------------------------------------------------ loop

  let last = performance.now();
  let running = true;
  function loop(now: number) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!document.hidden && !flat()) frame(dt);
    requestAnimationFrame(loop);
  }
  const observer = new ResizeObserver(() => resize());
  observer.observe(root);
  window.addEventListener('pagehide', () => (running = false));
  window.addEventListener('pageshow', () => {
    if (running) return;
    running = true;
    last = performance.now();
    requestAnimationFrame(loop);
  });

  resize();
  cam = { x: player.x, y: camGoalY() };
  clampCam();
  const start = fromHash(location.hash);
  if (start) {
    const f = front(start.place);
    player.x = (f.x + 0.5) * T;
    player.y = (f.y + 0.7) * T;
    cam = { x: player.x, y: camGoalY() };
    openDialog(start.place, start.aspect, false);
  }
  window.addEventListener('town:home', () => {
    showResume();
    player.x = spawn.x * T;
    player.y = spawn.y * T;
    player.face = 'up';
    player.path = [];
    player.goal = null;
    following = true;
    cam = { x: player.x, y: camGoalY() };
    clampCam();
  });
  root.classList.add('is-ready');
  requestAnimationFrame(loop);
}
