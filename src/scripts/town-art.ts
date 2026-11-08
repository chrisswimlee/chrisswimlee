/**
 * Pixel art for The Developer World, all drawn in code at 16px per tile.
 * Nothing here is loaded from an image: every sprite is painted once into a
 * small offscreen canvas, then scaled up with smoothing off.
 */
import type { Building, BuildingStyle, Icon } from '../data/town';

export const T = 16;

export type Rect = { x: number; y: number; w: number; h: number };

export type Sprite = {
  canvas: HTMLCanvasElement;
  /** Where the sprite's top-left sits relative to its anchor. */
  ox: number;
  oy: number;
};

export type BuildingArt = Sprite & {
  /** Glass areas, in sprite pixels, that glow at night. */
  windows: Rect[];
  /** Strips that glow in their own color at night (neon, tickers). */
  neon: (Rect & { color: string })[];
  chimney?: { x: number; y: number };
  /** Extra pixels painted above the building's top tile row. */
  top: number;
};

// ---------------------------------------------------------------- helpers

export function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 100000) / 100000;
  };
}

export function canvas(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.ceil(w));
  c.height = Math.max(1, Math.ceil(h));
  const ctx = c.getContext('2d');
  if (!ctx) throw new Error('2D canvas unavailable');
  ctx.imageSmoothingEnabled = false;
  return { c, ctx };
}

function hex(c: string) {
  const v = c.replace('#', '');
  const n = parseInt(v.length === 3 ? v.replace(/./g, (m) => m + m) : v, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Lighten (amt > 0) or darken (amt < 0) a hex color. */
export function shade(c: string, amt: number) {
  const [r, g, b] = hex(c);
  const f = (x: number) => Math.max(0, Math.min(255, Math.round(amt >= 0 ? x + (255 - x) * amt : x * (1 + amt))));
  return `rgb(${f(r)},${f(g)},${f(b)})`;
}

export function px(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, w = 1, h = 1) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function disc(ctx: CanvasRenderingContext2D, color: string, cx: number, cy: number, r: number) {
  ctx.fillStyle = color;
  for (let y = -r; y <= r; y++) {
    const half = Math.floor(Math.sqrt(r * r - y * y) + 0.35);
    ctx.fillRect(Math.round(cx - half), Math.round(cy + y), half * 2 + 1, 1);
  }
}

/** Paint a pixel pattern. Each string is a row; each char a palette key, '.' is clear. */
function pattern(ctx: CanvasRenderingContext2D, rows: string[], palette: Record<string, string>, x: number, y: number, flip = false) {
  rows.forEach((row, j) => {
    const chars = flip ? [...row].reverse() : [...row];
    chars.forEach((ch, i) => {
      const color = palette[ch];
      if (color) px(ctx, color, x + i, y + j);
    });
  });
}

// ---------------------------------------------------------------- palette

export const P = {
  grass: '#78b04a',
  grassDark: '#5f9a3d',
  grassDeep: '#4b8233',
  grassLight: '#93c95e',
  dirt: '#d6ad6f',
  dirtDark: '#b58b53',
  dirtLight: '#e6c68e',
  cobble: '#bdb5a5',
  cobbleDark: '#958d7e',
  cobbleLight: '#d6cfc1',
  water: '#4aa3d8',
  waterDeep: '#3687c0',
  waterLight: '#9ad8f3',
  sand: '#e8d39a',
  soil: '#8a5a36',
  soilDark: '#6c4428',
  wood: '#9a6234',
  woodDark: '#6a4020',
  woodLight: '#c38a52',
  ink: '#2a2230',
  glass: '#a9d9f1',
  glassLight: '#e6f7ff',
  glassDark: '#6fa9c9',
  stone: '#a8a294',
  gold: '#e7b74a',
};

// ---------------------------------------------------------------- icons (8×8)

const ICONS: Record<Icon, { rows: string[]; pal: Record<string, string> }> = {
  bank: {
    rows: ['...aa...', '..aaaa..', '.aaaaaa.', '........', '.b.b.b.b', '.b.b.b.b', '.b.b.b.b', 'aaaaaaaa'],
    pal: { a: '#33548a', b: '#33548a' },
  },
  chart: {
    rows: ['.......a', '......a.', '.a...a..', 'a.a.a...', '...a....', '........', 'bbbbbbbb', '........'],
    pal: { a: '#2f9a5a', b: '#3a3a44' },
  },
  star: {
    rows: ['...aa...', '...aa...', 'aaaaaaaa', '.aaaaaa.', '..aaaa..', '.aa..aa.', '.a....a.', '........'],
    pal: { a: '#d99a1e' },
  },
  gear: {
    rows: ['..a..a..', '.aaaaaa.', 'aaa..aaa', '.a....a.', '.a....a.', 'aaa..aaa', '.aaaaaa.', '..a..a..'],
    pal: { a: '#5b5f6b' },
  },
  bell: {
    rows: ['...aa...', '..aaaa..', '..aaaa..', '.aaaaaa.', '.aaaaaa.', 'aaaaaaaa', '...bb...', '........'],
    pal: { a: '#d99a1e', b: '#8a5a1e' },
  },
  book: {
    rows: ['aaaa.bbb', 'acca.bdb', 'acca.bdb', 'acca.bdb', 'acca.bdb', 'aaaa.bbb', '........', '........'],
    pal: { a: '#7a3b8f', b: '#2f6ab0', c: '#f1e6c8', d: '#f1e6c8' },
  },
  flask: {
    rows: ['..aaaa..', '...aa...', '...aa...', '..abba..', '.abbbba.', 'abbbbbba', 'aaaaaaaa', '........'],
    pal: { a: '#3a4a5a', b: '#5fd0b0' },
  },
  laptop: {
    rows: ['.aaaaaa.', '.abbbba.', '.abbbba.', '.aaaaaa.', 'cccccccc', '.cccccc.', '........', '........'],
    pal: { a: '#2a2a30', b: '#7ad6ff', c: '#9aa0aa' },
  },
  phone: {
    rows: ['..aaaa..', '..abba..', '..abba..', '..abba..', '..abba..', '..aaaa..', '...cc...', '........'],
    pal: { a: '#2a2a30', b: '#5f8bff', c: '#2a2a30' },
  },
  joystick: {
    rows: ['...aa...', '...aa...', '....b...', '....b...', '.cccccc.', 'cdccccec', 'cccccccc', '........'],
    pal: { a: '#e0485a', b: '#3a3a44', c: '#5a4a8a', d: '#ffd24a', e: '#5ad1ff' },
  },
  mug: {
    rows: ['.bbbbb..', '.aaaaaaa', '.aaaaa.a', '.aaaaa.a', '.aaaaaaa', '.aaaaa..', '..aaa...', '........'],
    pal: { a: '#c98a2a', b: '#fff6e0' },
  },
};

export function drawIcon(ctx: CanvasRenderingContext2D, icon: Icon, x: number, y: number) {
  const art = ICONS[icon];
  pattern(ctx, art.rows, art.pal, x, y);
}

// ---------------------------------------------------------------- walls & roofs

function paintWall(ctx: CanvasRenderingContext2D, s: BuildingStyle, x0: number, y0: number, w: number, h: number, r: () => number) {
  const base = s.wallColor;
  px(ctx, base, x0, y0, w, h);
  if (s.wall === 'planks') {
    for (let y = y0; y < y0 + h; y += 4) {
      px(ctx, shade(base, (r() - 0.5) * 0.08), x0, y, w, 3);
      px(ctx, shade(base, -0.28), x0, y + 3, w, 1);
      for (let k = 0; k < 2; k++) px(ctx, shade(base, -0.2), x0 + Math.floor(r() * w), y, 1, 3);
    }
  } else if (s.wall === 'logs') {
    for (let y = y0; y < y0 + h; y += 5) {
      px(ctx, shade(base, (r() - 0.5) * 0.08), x0, y, w, 4);
      px(ctx, shade(base, 0.16), x0, y, w, 1);
      px(ctx, shade(base, -0.35), x0, y + 4, w, 1);
      // log ends poking out at the corners
      px(ctx, shade(base, 0.25), x0 - 1, y + 1, 2, 3);
      px(ctx, shade(base, 0.25), x0 + w - 1, y + 1, 2, 3);
      px(ctx, shade(base, -0.1), x0, y + 2, 1, 1);
      px(ctx, shade(base, -0.1), x0 + w - 1, y + 2, 1, 1);
    }
  } else if (s.wall === 'brick') {
    for (let row = 0, y = y0; y < y0 + h; y += 4, row++) {
      px(ctx, shade(base, 0.3), x0, y + 3, w, 1);
      for (let x = x0 - (row % 2 ? 3 : 0); x < x0 + w; x += 7) {
        px(ctx, shade(base, (r() - 0.5) * 0.16), Math.max(x0, x), y, Math.min(6, x0 + w - Math.max(x0, x)), 3);
        if (x + 6 >= x0 && x + 6 < x0 + w) px(ctx, shade(base, 0.3), x + 6, y, 1, 3);
      }
    }
  } else if (s.wall === 'stone') {
    for (let row = 0, y = y0; y < y0 + h; y += 6, row++) {
      px(ctx, shade(base, -0.22), x0, y + 5, w, 1);
      let x = x0 - (row % 2 ? 5 : 0);
      while (x < x0 + w) {
        const bw = 7 + Math.floor(r() * 5);
        const sx = Math.max(x0, x);
        const ew = Math.min(x + bw, x0 + w) - sx;
        px(ctx, shade(base, (r() - 0.5) * 0.12), sx, y, ew, 5);
        px(ctx, shade(base, 0.18), sx, y, ew, 1);
        if (x + bw < x0 + w) px(ctx, shade(base, -0.22), x + bw, y, 1, 5);
        x += bw + 1;
      }
    }
  } else {
    // plaster with a little texture and a timber frame
    for (let i = 0; i < (w * h) / 14; i++) px(ctx, shade(base, (r() - 0.5) * 0.1), x0 + r() * w, y0 + r() * h);
    px(ctx, s.trim, x0, y0 + Math.floor(h * 0.42), w, 1);
  }
  // corner posts and a stone footing
  px(ctx, shade(s.trim, -0.15), x0, y0, 1, h);
  px(ctx, shade(s.trim, -0.15), x0 + w - 1, y0, 1, h);
  px(ctx, '#857d70', x0 - 1, y0 + h - 3, w + 2, 3);
  px(ctx, '#a39b8c', x0 - 1, y0 + h - 3, w + 2, 1);
  px(ctx, '#5e574c', x0 - 1, y0 + h - 1, w + 2, 1);
}

function paintRoof(ctx: CanvasRenderingContext2D, s: BuildingStyle, x0: number, y0: number, w: number, h: number, r: () => number) {
  const c = s.roofColor;
  // the roof leans back: one pixel narrower per side for its top third
  const inset = (y: number) => (y - y0 < h * 0.3 ? 2 : y - y0 < h * 0.55 ? 1 : 0);
  for (let y = y0; y < y0 + h; y++) px(ctx, c, x0 + inset(y), y, w - inset(y) * 2, 1);

  if (s.roof === 'shingle') {
    for (let row = 0, y = y0 + 2; y < y0 + h - 2; y += 4, row++) {
      const off = row % 2 ? 3 : 0;
      for (let x = x0 - off; x < x0 + w; x += 6) {
        const sx = Math.max(x0 + inset(y), x);
        const ex = Math.min(x0 + w - inset(y), x + 6);
        if (ex <= sx) continue;
        px(ctx, shade(c, (r() - 0.5) * 0.12), sx, y, ex - sx, 3);
        px(ctx, shade(c, -0.32), sx, y + 3, ex - sx, 1);
        px(ctx, shade(c, 0.18), sx, y, 1, 3);
      }
    }
  } else if (s.roof === 'tile') {
    for (let y = y0 + 2; y < y0 + h - 2; y += 5) {
      for (let x = x0 + inset(y); x < x0 + w - inset(y); x += 3) {
        px(ctx, shade(c, 0.2), x, y, 1, 4);
        px(ctx, shade(c, -0.25), x + 2, y, 1, 4);
      }
      px(ctx, shade(c, -0.38), x0 + inset(y), y + 4, w - inset(y) * 2, 1);
    }
  } else if (s.roof === 'thatch') {
    for (let i = 0; i < w * h * 0.5; i++) {
      const x = x0 + r() * w;
      const y = y0 + r() * h;
      if (x < x0 + inset(y) || x > x0 + w - inset(y)) continue;
      px(ctx, r() > 0.5 ? shade(c, 0.22) : shade(c, -0.25), x, y, 1, 2 + r() * 3);
    }
    for (let x = x0; x < x0 + w; x += 2) px(ctx, shade(c, -0.3), x, y0 + h - 1, 1, 1 + Math.floor(r() * 2));
  } else {
    // glass panes on a white frame
    px(ctx, s.trim, x0, y0, w, h);
    for (let y = y0 + 1; y < y0 + h - 1; y += 6) {
      for (let x = x0 + 1 + inset(y); x < x0 + w - 1 - inset(y); x += 7) {
        const pw = Math.min(6, x0 + w - 1 - inset(y) - x);
        px(ctx, P.glass, x, y, pw, 5);
        px(ctx, P.glassDark, x, y + 4, pw, 1);
        px(ctx, P.glassLight, x + 1, y + 1, 1, 2);
        px(ctx, P.glassLight, x + 2, y + 1, 1, 1);
      }
    }
  }
  // ridge on top, deep eave shadow below
  px(ctx, shade(c, 0.3), x0 + 2, y0, w - 4, 1);
  px(ctx, shade(c, -0.45), x0, y0 + h - 2, w, 1);
  px(ctx, shade(c, -0.6), x0, y0 + h - 1, w, 1);
}

function paintWindow(ctx: CanvasRenderingContext2D, s: BuildingStyle, x: number, y: number, list: Rect[], flowers: boolean, r: () => number) {
  px(ctx, s.trim, x - 1, y - 1, 12, 11);
  px(ctx, shade(s.trim, -0.35), x - 1, y + 9, 12, 1);
  px(ctx, P.glass, x, y, 10, 8);
  px(ctx, P.glassDark, x, y + 6, 10, 2);
  px(ctx, P.glassLight, x + 1, y + 1, 2, 1);
  px(ctx, P.glassLight, x + 1, y + 2, 1, 1);
  px(ctx, s.trim, x + 4, y, 2, 8);
  px(ctx, s.trim, x, y + 3, 10, 1);
  list.push({ x, y, w: 10, h: 8 });
  if (flowers) {
    px(ctx, P.woodDark, x - 1, y + 10, 12, 2);
    const colors = ['#e8526a', '#f4d04a', '#f08ad0', '#ffffff'];
    for (let i = 0; i < 5; i++) px(ctx, colors[Math.floor(r() * colors.length)], x + i * 2 + (r() > 0.5 ? 1 : 0), y + 9, 1, 1);
    px(ctx, '#3f8a34', x, y + 10, 10, 1);
  }
}

// ---------------------------------------------------------------- buildings

export function paintBuilding(b: Building): BuildingArt {
  const s = b.style;
  const r = rng(b.id.split('').reduce((a, ch) => a * 31 + ch.charCodeAt(0), 7));
  const top = s.extra === 'bell' || s.extra === 'dome' || s.extra === 'antenna' || s.extra === 'clock' ? 16 : s.chimney ? 8 : 4;
  const W = b.w * T;
  const H = b.h * T + top;
  const { c, ctx } = canvas(W + 2, H);
  const windows: Rect[] = [];
  const neon: (Rect & { color: string })[] = [];

  const roofH = s.roofRows * T;
  const wallY = top + roofH - 3;
  const wallH = H - wallY;
  // soft ground shadow is painted by the renderer; here, the house
  paintWall(ctx, s, 2, wallY, W - 3, wallH, r);
  paintRoof(ctx, s, 0, top, W + 1, roofH, r);
  // the roof casts a shadow on the wall just under the eave, and the east side sits in shade
  ctx.globalAlpha = 0.25;
  px(ctx, '#000', 2, wallY + 3, W - 3, 2);
  ctx.globalAlpha = 0.12;
  px(ctx, '#000', W - 5, wallY, 4, wallH);
  px(ctx, '#000', W - 4, top, 5, roofH - 2);
  ctx.globalAlpha = 1;

  // door
  const doorX = b.door * T + 3;
  const doorH = Math.min(15, wallH - 4);
  const doorY = H - doorH - 1;
  px(ctx, shade(s.trim, -0.1), doorX - 2, doorY - 2, 14, doorH + 2);
  px(ctx, '#6b3f22', doorX, doorY, 10, doorH);
  for (let x = doorX + 2; x < doorX + 10; x += 3) px(ctx, '#57321a', x, doorY, 1, doorH);
  px(ctx, '#8a5530', doorX, doorY, 10, 1);
  px(ctx, P.gold, doorX + 7, doorY + Math.floor(doorH / 2), 1, 2);
  px(ctx, '#3d2414', doorX, doorY + doorH - 1, 10, 1);

  // windows across the wall, skipping the door
  const winY = wallY + Math.max(6, Math.floor((wallH - 12) / 2) - 1);
  const slots: number[] = [];
  for (let i = 0; i < b.w; i++) if (Math.abs(i - b.door) >= 1) slots.push(i);
  const step = Math.max(1, Math.floor(slots.length / Math.max(1, s.windows)));
  const picks: number[] = [];
  for (let i = 0; i < slots.length && picks.length < s.windows; i += step) picks.push(slots[i]);
  const flowers = s.wall === 'planks' || s.wall === 'logs' || s.wall === 'brick';
  for (const col of picks) paintWindow(ctx, s, col * T + 3, winY, windows, flowers, r);

  // hanging sign with the icon, just above the door
  const signY = Math.max(wallY + 3, doorY - 13);
  px(ctx, P.woodDark, doorX - 1, signY - 1, 12, 11);
  px(ctx, '#f0dcae', doorX, signY, 10, 9);
  px(ctx, '#d8bf8a', doorX, signY + 8, 10, 1);
  drawIcon(ctx, s.icon, doorX + 1, signY + 1);

  // the details that make each place itself
  const mid = Math.floor(W / 2);
  if (s.extra === 'columns') {
    for (const col of [0.12, 0.36, 0.64, 0.88]) {
      const x = Math.floor(W * col) - 1;
      if (Math.abs(x - (doorX + 5)) < 8) continue;
      px(ctx, '#f7f3ea', x, wallY + 4, 3, wallH - 7);
      px(ctx, '#d7d0c0', x + 2, wallY + 4, 1, wallH - 7);
      px(ctx, '#ffffff', x - 1, wallY + 3, 5, 2);
      px(ctx, '#ffffff', x - 1, H - 5, 5, 2);
    }
    // pediment over the entrance
    for (let i = 0; i < 8; i++) px(ctx, i === 7 ? '#cfc8b8' : '#f4efe4', doorX + 4 - i, wallY - 7 + i, i * 2 + 2, 1);
  }
  if (s.extra === 'clock') {
    // a gable with a clock face in it
    for (let i = 0; i < 16; i++) px(ctx, i > 13 ? shade(s.trim, -0.3) : s.trim, mid - i - 2, top - 2 + i, i * 2 + 4, 1);
    disc(ctx, '#5a4632', mid, top + 7, 6);
    disc(ctx, '#fffaf0', mid, top + 7, 5);
    px(ctx, '#2a2230', mid, top + 3, 1, 5);
    px(ctx, '#2a2230', mid, top + 7, 3, 1);
    px(ctx, '#2a2230', mid, top + 7, 1, 1);
    // flag on the ridge
    px(ctx, '#5a4632', W - 14, 0, 1, top + 2);
    px(ctx, '#e8526a', W - 13, 1, 6, 4);
    px(ctx, '#f4d04a', W - 11, 2, 2, 2);
  }
  if (s.extra === 'bell') {
    const bx = mid - 7;
    px(ctx, '#f4efe4', bx, 4, 14, top + 6);
    px(ctx, '#d8cfbe', bx + 12, 4, 2, top + 6);
    px(ctx, '#5b4636', bx - 2, 0, 18, 5);
    px(ctx, '#463528', bx - 2, 4, 18, 1);
    px(ctx, '#3a2a20', bx + 3, 6, 8, 9);
    px(ctx, P.gold, bx + 5, 7, 4, 5);
    px(ctx, '#f6d98a', bx + 5, 7, 1, 3);
    px(ctx, '#b8862a', bx + 4, 12, 6, 1);
  }
  if (s.extra === 'dome') {
    for (let y = 0; y < 14; y++) {
      const half = Math.floor(Math.sqrt(Math.max(0, 14 * 14 - (14 - y) * (14 - y))) * 0.9);
      px(ctx, shade(s.roofColor, y < 4 ? 0.2 : 0), mid - half, top - 12 + y + 6, half * 2, 1);
    }
    px(ctx, shade(s.roofColor, 0.45), mid - 5, top - 3, 2, 3);
    px(ctx, P.gold, mid, top - 9, 1, 4);
    disc(ctx, '#f4efe4', mid, wallY + 9, 5);
    disc(ctx, P.glass, mid, wallY + 9, 4);
    windows.push({ x: mid - 3, y: wallY + 6, w: 7, h: 7 });
  }
  if (s.extra === 'neon') {
    const strip = { x: 3, y: wallY + 3, w: W - 6, h: 1 };
    px(ctx, '#ff5fb7', strip.x, strip.y, strip.w, 1);
    neon.push({ ...strip, color: '#ff5fb7' });
    const strip2 = { x: 3, y: H - 6, w: W - 6, h: 1 };
    px(ctx, '#5ad1ff', strip2.x, strip2.y, strip2.w, 1);
    neon.push({ ...strip2, color: '#5ad1ff' });
    // a big marquee star on the roof
    pattern(
      ctx,
      ['...a...', '..aaa..', 'aaaaaaa', '.aaaaa.', '.aa.aa.', 'a.....a'],
      { a: '#ffd24a' },
      mid - 3,
      top + 4,
    );
    neon.push({ x: mid - 3, y: top + 4, w: 7, h: 6, color: '#ffd24a' });
  }
  if (s.extra === 'ticker') {
    const y = wallY + 5;
    px(ctx, '#15181f', 4, y, W - 8, 4);
    for (let x = 5; x < W - 5; x += 2) px(ctx, r() > 0.45 ? '#46d07a' : '#ff6a5a', x, y + 1 + Math.floor(r() * 2), 1, 1);
    neon.push({ x: 4, y, w: W - 8, h: 4, color: '#46d07a' });
  }
  if (s.extra === 'gears') {
    disc(ctx, '#5b5f6b', W - 16, top + 9, 5);
    disc(ctx, s.roofColor, W - 16, top + 9, 2);
    for (const [dx, dy] of [[0, -6], [0, 6], [-6, 0], [6, 0]]) px(ctx, '#5b5f6b', W - 17 + dx, top + 8 + dy, 3, 3);
  }
  if (s.extra === 'antenna') {
    px(ctx, '#3a3a44', W - 12, 0, 1, top + 6);
    disc(ctx, '#d4d8de', W - 12, 3, 3);
    px(ctx, '#ff5a5a', W - 12, 0, 1, 1);
    neon.push({ x: W - 13, y: 0, w: 3, h: 2, color: '#ff5a5a' });
  }
  if (s.extra === 'tower') {
    // a giant phone sign on the front
    const sx = 4;
    const sy = wallY + 4;
    px(ctx, '#1f1f26', sx, sy, 12, Math.min(22, wallH - 9));
    px(ctx, '#5f8bff', sx + 2, sy + 2, 8, Math.min(16, wallH - 15));
    px(ctx, '#a8c2ff', sx + 3, sy + 3, 4, 1);
    px(ctx, '#a8c2ff', sx + 3, sy + 5, 6, 1);
    px(ctx, '#a8c2ff', sx + 3, sy + 7, 3, 1);
    neon.push({ x: sx + 2, y: sy + 2, w: 8, h: Math.min(16, wallH - 15), color: '#7fa2ff' });
  }

  let chimney: { x: number; y: number } | undefined;
  if (s.chimney) {
    const cx = Math.floor(W * 0.74);
    px(ctx, '#8f4a32', cx, top - 6, 7, 14);
    px(ctx, '#b0603f', cx, top - 6, 7, 1);
    px(ctx, '#5f3021', cx - 1, top - 7, 9, 2);
    for (let y = top - 3; y < top + 7; y += 3) px(ctx, '#b0603f', cx + 1 + (y % 2), y, 4, 1);
    chimney = { x: cx + 3, y: top - 8 };
  }

  return { canvas: c, ox: -1, oy: -top, windows, neon, chimney, top };
}

// ---------------------------------------------------------------- trees & plants

export type TreeKind = 'oak' | 'pine' | 'fruit' | 'blossom' | 'autumn';

export function paintTree(kind: TreeKind, seed: number): Sprite {
  const r = rng(seed);
  const { c, ctx } = canvas(32, 44);
  // trunk
  px(ctx, '#6a4020', 13, 28, 6, 13);
  px(ctx, '#8a5a30', 13, 28, 2, 13);
  px(ctx, '#4d2e16', 18, 28, 1, 13);
  px(ctx, '#4d2e16', 11, 40, 10, 2);
  if (kind === 'pine') {
    const layers = [
      [16, 6, 6],
      [16, 13, 9],
      [16, 21, 12],
      [16, 29, 14],
    ];
    for (const [cx, cy, half] of layers) {
      for (let y = 0; y < 9; y++) {
        const hw = Math.floor((half * (y + 2)) / 10);
        px(ctx, '#2f6b3d', cx - hw - 1, cy + y - 2, hw * 2 + 2, 1);
        px(ctx, '#3f8a4c', cx - hw, cy + y - 2, hw * 2, 1);
        px(ctx, '#57a65e', cx - hw, cy + y - 2, Math.max(1, Math.floor(hw * 0.6)), 1);
      }
    }
    px(ctx, '#2a5a33', 15, 0, 2, 4);
    return { canvas: c, ox: -16, oy: -42 };
  }
  const base = kind === 'autumn' ? '#d9822b' : kind === 'blossom' ? '#e99ac2' : '#4f9a3f';
  const blobs: [number, number, number][] = [
    [16, 14, 11],
    [9, 20, 8],
    [23, 20, 8],
    [16, 23, 9],
    [11, 11, 6],
    [21, 10, 6],
  ];
  for (const [x, y, rad] of blobs) disc(ctx, shade(base, -0.45), x, y, rad + 1);
  for (const [x, y, rad] of blobs) disc(ctx, shade(base, -0.18), x, y, rad);
  for (const [x, y, rad] of blobs) disc(ctx, base, x - 1, y - 1, rad - 2);
  for (const [x, y, rad] of blobs) disc(ctx, shade(base, 0.22), x - 3, y - 3, Math.max(1, rad - 6));
  // leafy speckle
  for (let i = 0; i < 70; i++) {
    const x = 4 + r() * 24;
    const y = 3 + r() * 27;
    const d = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
    if (d[3] > 0) px(ctx, r() > 0.5 ? shade(base, 0.3) : shade(base, -0.3), x, y);
  }
  if (kind === 'fruit') {
    for (let i = 0; i < 9; i++) {
      const x = 6 + r() * 20;
      const y = 8 + r() * 18;
      px(ctx, '#e0394a', x, y, 2, 2);
      px(ctx, '#ff8a8a', x, y, 1, 1);
    }
  }
  if (kind === 'blossom') {
    for (let i = 0; i < 16; i++) px(ctx, '#fff0f6', 5 + r() * 22, 5 + r() * 22);
  }
  return { canvas: c, ox: -16, oy: -42 };
}

export function paintBush(seed: number): Sprite {
  const r = rng(seed);
  const { c, ctx } = canvas(18, 14);
  disc(ctx, '#2f6b33', 6, 8, 5);
  disc(ctx, '#2f6b33', 12, 8, 5);
  disc(ctx, '#4b8a3b', 6, 7, 4);
  disc(ctx, '#4b8a3b', 12, 7, 4);
  disc(ctx, '#67a94e', 5, 5, 2);
  disc(ctx, '#67a94e', 11, 5, 2);
  if (r() > 0.5) for (let i = 0; i < 4; i++) px(ctx, r() > 0.5 ? '#f4d04a' : '#e8526a', 3 + r() * 12, 4 + r() * 6);
  return { canvas: c, ox: -9, oy: -13 };
}

export function paintRock(seed: number): Sprite {
  const r = rng(seed);
  const { c, ctx } = canvas(12, 9);
  disc(ctx, '#6f6a62', 6, 5, 4);
  disc(ctx, '#9a948a', 5, 4, 3);
  px(ctx, '#c4beb2', 3, 2, 2, 1);
  if (r() > 0.5) px(ctx, '#5a8a3a', 2, 6, 2, 1);
  return { canvas: c, ox: -6, oy: -8 };
}

export function paintCrop(kind: number): Sprite {
  const { c, ctx } = canvas(12, 14);
  if (kind === 0) {
    // cabbage
    disc(ctx, '#3f8a34', 6, 9, 4);
    disc(ctx, '#8fd06a', 6, 8, 3);
    px(ctx, '#c6ee9c', 5, 6, 2, 1);
  } else if (kind === 1) {
    // pumpkin
    px(ctx, '#3f8a34', 5, 3, 2, 3);
    disc(ctx, '#c9621e', 6, 9, 4);
    disc(ctx, '#f08a2e', 6, 9, 3);
    px(ctx, '#c9621e', 6, 6, 1, 6);
  } else {
    // corn
    px(ctx, '#4f8a34', 5, 1, 2, 12);
    px(ctx, '#6fb046', 2, 5, 3, 1);
    px(ctx, '#6fb046', 7, 7, 3, 1);
    px(ctx, '#f4d04a', 6, 3, 2, 4);
  }
  return { canvas: c, ox: -6, oy: -13 };
}

// ---------------------------------------------------------------- props

export function paintLamp(): Sprite {
  const { c, ctx } = canvas(10, 30);
  px(ctx, '#2f2a33', 4, 8, 2, 20);
  px(ctx, '#4a4452', 4, 8, 1, 20);
  px(ctx, '#2f2a33', 2, 27, 6, 2);
  px(ctx, '#2f2a33', 1, 1, 8, 2);
  px(ctx, '#2f2a33', 2, 3, 6, 6);
  px(ctx, '#ffe08a', 3, 3, 4, 5);
  px(ctx, '#fff6d0', 3, 3, 2, 2);
  px(ctx, '#2f2a33', 4, 0, 2, 1);
  return { canvas: c, ox: -5, oy: -29 };
}

export function paintBench(): Sprite {
  const { c, ctx } = canvas(28, 14);
  px(ctx, P.woodDark, 2, 9, 2, 5);
  px(ctx, P.woodDark, 24, 9, 2, 5);
  px(ctx, P.wood, 0, 6, 28, 3);
  px(ctx, P.woodLight, 0, 6, 28, 1);
  px(ctx, P.wood, 0, 1, 28, 3);
  px(ctx, P.woodLight, 0, 1, 28, 1);
  px(ctx, P.woodDark, 3, 3, 2, 4);
  px(ctx, P.woodDark, 23, 3, 2, 4);
  return { canvas: c, ox: -14, oy: -13 };
}

export function paintBoard(): Sprite {
  const { c, ctx } = canvas(34, 32);
  px(ctx, P.woodDark, 3, 8, 3, 24);
  px(ctx, P.woodDark, 28, 8, 3, 24);
  px(ctx, '#7a4a28', 0, 4, 34, 18);
  px(ctx, '#9a6234', 1, 5, 32, 16);
  px(ctx, '#5a3418', 0, 21, 34, 1);
  px(ctx, '#7a4a28', 0, 1, 34, 4);
  px(ctx, '#b07040', 0, 1, 34, 1);
  const notes = [
    [3, 7, '#fff6dc'],
    [11, 8, '#e8f3ff'],
    [19, 7, '#fff6dc'],
    [26, 9, '#ffe3e8'],
    [6, 14, '#e9ffe3'],
    [16, 14, '#fff6dc'],
  ] as const;
  for (const [x, y, color] of notes) {
    px(ctx, color, x, y, 6, 6);
    px(ctx, '#c9bfa8', x + 1, y + 2, 4, 1);
    px(ctx, '#c9bfa8', x + 1, y + 4, 3, 1);
    px(ctx, '#e8526a', x + 2, y, 2, 1);
  }
  return { canvas: c, ox: -17, oy: -31 };
}

export function paintMailbox(): Sprite {
  const { c, ctx } = canvas(14, 24);
  px(ctx, P.woodDark, 6, 10, 2, 14);
  px(ctx, '#2f5bb0', 1, 2, 12, 9);
  px(ctx, '#4a7ad0', 1, 2, 12, 2);
  px(ctx, '#1f3f80', 1, 10, 12, 1);
  px(ctx, '#e8e2d4', 3, 5, 6, 3);
  px(ctx, '#e0394a', 12, 0, 2, 6);
  px(ctx, '#e0394a', 10, 0, 2, 2);
  return { canvas: c, ox: -7, oy: -23 };
}

export function paintSign(): Sprite {
  const { c, ctx } = canvas(40, 30);
  px(ctx, P.woodDark, 5, 12, 3, 18);
  px(ctx, P.woodDark, 32, 12, 3, 18);
  px(ctx, '#7a4a28', 0, 2, 40, 14);
  px(ctx, '#b07a44', 1, 3, 38, 12);
  px(ctx, '#c99a5e', 1, 3, 38, 1);
  px(ctx, '#5a3418', 0, 15, 40, 1);
  // "hello" squiggles that read as lettering from afar
  for (let x = 5; x < 35; x += 4) px(ctx, '#5a3418', x, 7 + (x % 3), 3, 2);
  px(ctx, '#e7b74a', 3, 4, 2, 2);
  px(ctx, '#e7b74a', 35, 4, 2, 2);
  return { canvas: c, ox: -20, oy: -29 };
}

export function paintFlowerBed(seed: number): Sprite {
  const r = rng(seed);
  const { c, ctx } = canvas(32, 16);
  px(ctx, P.woodDark, 0, 4, 32, 12);
  px(ctx, P.wood, 1, 4, 30, 2);
  px(ctx, P.soil, 2, 6, 28, 8);
  const colors = ['#e8526a', '#f4d04a', '#f08ad0', '#ffffff', '#8fc3ff'];
  for (let i = 0; i < 12; i++) {
    const x = 3 + (i % 6) * 4.5 + r() * 1.5;
    const y = 3 + Math.floor(i / 6) * 5 + r() * 2;
    px(ctx, '#3f8a34', x + 1, y + 2, 1, 3);
    const col = colors[Math.floor(r() * colors.length)];
    px(ctx, col, x, y, 3, 2);
    px(ctx, col, x + 1, y - 1, 1, 1);
    px(ctx, '#f4b02a', x + 1, y, 1, 1);
  }
  return { canvas: c, ox: -16, oy: -15 };
}

export function paintBarrel(): Sprite {
  const { c, ctx } = canvas(12, 14);
  px(ctx, '#7a4a28', 1, 1, 10, 13);
  px(ctx, '#9a6234', 2, 1, 4, 13);
  px(ctx, '#4d4d55', 1, 3, 10, 1);
  px(ctx, '#4d4d55', 1, 10, 10, 1);
  px(ctx, '#5a3418', 1, 0, 10, 1);
  return { canvas: c, ox: -6, oy: -13 };
}

export function paintCrate(): Sprite {
  const { c, ctx } = canvas(14, 14);
  px(ctx, '#b07a44', 0, 0, 14, 14);
  px(ctx, '#7a4a28', 0, 0, 14, 1);
  px(ctx, '#7a4a28', 0, 13, 14, 1);
  px(ctx, '#7a4a28', 0, 0, 1, 14);
  px(ctx, '#7a4a28', 13, 0, 1, 14);
  for (let i = 1; i < 13; i++) px(ctx, '#8a5a30', i, i, 1, 1);
  return { canvas: c, ox: -7, oy: -13 };
}

export function paintFountain(): Sprite {
  const { c, ctx } = canvas(48, 40);
  // octagonal stone basin seen from a little above
  for (let y = 0; y < 26; y++) {
    const cut = y < 5 ? 5 - y : y > 20 ? y - 20 : 0;
    px(ctx, '#8f897c', cut, 12 + y, 48 - cut * 2, 1);
  }
  for (let y = 2; y < 22; y++) {
    const cut = y < 7 ? 7 - y : y > 18 ? y - 18 : 0;
    px(ctx, P.water, 3 + cut, 12 + y, 42 - cut * 2, 1);
  }
  px(ctx, '#c9c2b2', 5, 12, 38, 2);
  px(ctx, '#6e685d', 0, 36, 48, 2);
  for (let x = 8; x < 40; x += 6) px(ctx, P.waterLight, x, 20 + (x % 4), 3, 1);
  // center column and bowl
  px(ctx, '#a8a294', 21, 6, 6, 20);
  px(ctx, '#c9c2b2', 21, 6, 2, 20);
  px(ctx, '#a8a294', 15, 4, 18, 4);
  px(ctx, '#c9c2b2', 15, 4, 18, 1);
  px(ctx, P.water, 17, 5, 14, 2);
  return { canvas: c, ox: -24, oy: -38 };
}

export function paintFence(vertical: boolean): Sprite {
  const { c, ctx } = canvas(16, 16);
  if (vertical) {
    px(ctx, P.woodDark, 6, 0, 4, 16);
    px(ctx, P.woodLight, 6, 0, 1, 16);
  } else {
    px(ctx, P.wood, 0, 6, 16, 2);
    px(ctx, P.wood, 0, 11, 16, 2);
    px(ctx, P.woodLight, 0, 6, 16, 1);
    px(ctx, P.woodDark, 1, 3, 3, 13);
    px(ctx, P.woodLight, 1, 3, 1, 13);
    px(ctx, '#4d2e16', 1, 15, 3, 1);
  }
  return { canvas: c, ox: -8, oy: -15 };
}

// ---------------------------------------------------------------- people & animals

export type Facing = 'down' | 'up' | 'left' | 'right';

const SKIN = '#f2c79e';
const SKIN_SHADE = '#d9a77c';
const HAIR = '#1d1b24';
const HAIR_LIGHT = '#3a3646';
const JACKET = '#2b3040';
const JACKET_LIGHT = '#3d4458';
const SHIRT = '#f1f1ee';
const JEANS = '#3e5f94';
const JEANS_DARK = '#2c4672';
const SHOE = '#2a2226';

/** The town's visitor: dark hair, glasses, a dark jacket. 16×24, feet at the bottom. */
export function paintPlayer(face: Facing, frame: number): HTMLCanvasElement {
  const { c, ctx } = canvas(16, 24);
  const step = frame === 1 ? 1 : frame === 3 ? -1 : 0;
  const bob = frame === 1 || frame === 3 ? 1 : 0;
  const y0 = bob;
  if (face === 'down' || face === 'up') {
    // legs
    px(ctx, JEANS, 5, 16 + y0, 3, 5 - (step > 0 ? 1 : 0));
    px(ctx, JEANS, 8, 16 + y0, 3, 5 - (step < 0 ? 1 : 0));
    px(ctx, JEANS_DARK, 7, 16 + y0, 1, 4);
    px(ctx, SHOE, 5, 21 + y0 - (step > 0 ? 1 : 0), 3, 2);
    px(ctx, SHOE, 8, 21 + y0 - (step < 0 ? 1 : 0), 3, 2);
    // body
    px(ctx, JACKET, 4, 10 + y0, 8, 7);
    px(ctx, JACKET_LIGHT, 4, 10 + y0, 1, 7);
    if (face === 'down') {
      px(ctx, SHIRT, 7, 10 + y0, 2, 4);
      px(ctx, JACKET_LIGHT, 6, 10 + y0, 1, 5);
      px(ctx, JACKET_LIGHT, 9, 10 + y0, 1, 5);
    } else {
      px(ctx, JACKET_LIGHT, 7, 11 + y0, 2, 5);
    }
    // arms swing opposite the legs
    px(ctx, JACKET, 3, 11 + y0 + (step < 0 ? 1 : 0), 1, 5);
    px(ctx, JACKET, 12, 11 + y0 + (step > 0 ? 1 : 0), 1, 5);
    px(ctx, SKIN, 3, 16 + y0 + (step < 0 ? 1 : 0), 1, 1);
    px(ctx, SKIN, 12, 16 + y0 + (step > 0 ? 1 : 0), 1, 1);
    // head
    px(ctx, SKIN, 4, 3 + y0, 8, 7);
    px(ctx, SKIN_SHADE, 4, 9 + y0, 8, 1);
    px(ctx, HAIR, 3, 1 + y0, 10, 4);
    px(ctx, HAIR, 4, 0 + y0, 8, 1);
    px(ctx, HAIR_LIGHT, 5, 1 + y0, 3, 1);
    if (face === 'down') {
      px(ctx, HAIR, 3, 5 + y0, 1, 3);
      px(ctx, HAIR, 12, 5 + y0, 1, 3);
      px(ctx, HAIR, 5, 4 + y0, 3, 1);
      // glasses
      px(ctx, '#1a1a22', 4, 6 + y0, 3, 2);
      px(ctx, '#1a1a22', 9, 6 + y0, 3, 2);
      px(ctx, '#1a1a22', 7, 6 + y0, 2, 1);
      px(ctx, '#bfe3ff', 5, 6 + y0, 1, 1);
      px(ctx, '#bfe3ff', 10, 6 + y0, 1, 1);
      px(ctx, '#c9786a', 7, 9 + y0 - 1, 2, 1);
    } else {
      px(ctx, HAIR, 3, 5 + y0, 10, 4);
      px(ctx, HAIR_LIGHT, 5, 6 + y0, 4, 1);
    }
  } else {
    const flip = face === 'left';
    const { c: side, ctx: s } = canvas(16, 24);
    // legs, one forward, one back
    px(s, JEANS, 6 + step, 16 + y0, 3, 5);
    px(s, JEANS_DARK, 7 - step, 16 + y0, 3, 5);
    px(s, SHOE, 6 + step, 21 + y0, 4, 2);
    px(s, '#1a1418', 7 - step, 21 + y0, 4, 2);
    px(s, JACKET, 5, 10 + y0, 6, 7);
    px(s, JACKET_LIGHT, 10, 10 + y0, 1, 7);
    px(s, JACKET_LIGHT, 7 - step, 11 + y0, 2, 5);
    px(s, SKIN, 7 - step, 16 + y0, 2, 1);
    px(s, SKIN, 5, 3 + y0, 7, 7);
    px(s, SKIN_SHADE, 5, 9 + y0, 7, 1);
    px(s, SKIN, 12, 6 + y0, 1, 2);
    px(s, HAIR, 4, 1 + y0, 8, 4);
    px(s, HAIR, 5, 0 + y0, 6, 1);
    px(s, HAIR, 4, 5 + y0, 4, 4);
    px(s, HAIR_LIGHT, 6, 1 + y0, 3, 1);
    px(s, '#1a1a22', 9, 6 + y0, 3, 2);
    px(s, '#bfe3ff', 10, 6 + y0, 1, 1);
    px(s, '#1a1a22', 7, 6 + y0, 2, 1);
    px(s, '#c9786a', 11, 9 + y0 - 1, 1, 1);
    if (flip) {
      ctx.translate(16, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(side, 0, 0);
  }
  return c;
}

/** An orange tabby. 14×12. frame 0/1 walk, 2 sits. */
export function paintCat(frame: number, flip: boolean): HTMLCanvasElement {
  const { c, ctx } = canvas(14, 12);
  const { c: art, ctx: a } = canvas(14, 12);
  const fur = '#e8913a';
  const dark = '#b8611e';
  const light = '#ffd2a0';
  if (frame === 2) {
    px(a, fur, 4, 4, 6, 7);
    px(a, dark, 5, 6, 4, 1);
    px(a, dark, 5, 8, 4, 1);
    px(a, light, 6, 9, 2, 2);
    px(a, fur, 3, 0, 7, 5);
    px(a, fur, 3, -1, 2, 2);
    px(a, fur, 8, -1, 2, 2);
    px(a, '#2a2230', 4, 2, 1, 1);
    px(a, '#2a2230', 8, 2, 1, 1);
    px(a, '#e0637a', 6, 3, 1, 1);
    px(a, fur, 10, 8, 3, 2);
    px(a, dark, 12, 7, 1, 2);
  } else {
    const leg = frame === 1 ? 1 : 0;
    px(a, fur, 2, 5, 9, 4);
    px(a, dark, 4, 5, 1, 3);
    px(a, dark, 7, 5, 1, 3);
    px(a, light, 3, 8, 7, 1);
    px(a, fur, 2 + leg, 9, 2, 2);
    px(a, fur, 8 - leg, 9, 2, 2);
    px(a, fur, 9, 2, 5, 4);
    px(a, fur, 9, 1, 1, 1);
    px(a, fur, 12, 1, 1, 1);
    px(a, '#2a2230', 12, 3, 1, 1);
    px(a, '#e0637a', 13, 4, 1, 1);
    px(a, fur, 0, 3, 2, 2);
    px(a, dark, 0, 2, 1, 2);
  }
  if (flip) {
    ctx.translate(14, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(art, 0, 0);
  return c;
}

/** A hen. 10×10. frame 0/1 walk, 2 pecks. */
export function paintChicken(frame: number, flip: boolean): HTMLCanvasElement {
  const { c, ctx } = canvas(10, 10);
  const { c: art, ctx: a } = canvas(10, 10);
  const peck = frame === 2 ? 2 : 0;
  px(a, '#f7f3ea', 1, 3, 6, 5);
  px(a, '#d9d2c2', 1, 6, 6, 1);
  px(a, '#e9e2d2', 0, 2, 2, 3);
  px(a, '#f7f3ea', 6, 1 + peck, 3, 3);
  px(a, '#e0394a', 7, 0 + peck, 2, 1);
  px(a, '#2a2230', 8, 2 + peck, 1, 1);
  px(a, '#f0a62a', 9, 3 + peck, 1, 1);
  px(a, '#f0a62a', 3 + (frame === 1 ? 1 : 0), 8, 1, 2);
  px(a, '#f0a62a', 5 - (frame === 1 ? 1 : 0), 8, 1, 2);
  if (flip) {
    ctx.translate(10, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(art, 0, 0);
  return c;
}
