/**
 * The Galaxy — the Developer's World, floating free.
 *
 * The name sits in the middle of a galaxy. Each world is a different
 * object — a desk, a laptop, a chalkboard, a phone, a small agent, two
 * diplomas, a rank gem, a trophy — drifting around the name. Not on
 * orbit rings, not eight copies of the same picture frame.
 *
 * Click a world and it comes forward: the object holds on the left,
 * the panel opens on the right. Hover lifts a station. The galaxy
 * turns on its own. Nothing is dragged.
 */
import * as THREE from 'three';

export type FloatAspect = {
  id: string;
  title: string;
  line: string;
  points: string[];
  links: { label: string; href: string }[];
  art?: { src: string; alt: string };
};

export type FloatWorld = {
  id: string;
  name: string;
  rail: string;
  kicker: string;
  when: string;
  place: string;
  summary: string;
  accent: string;
  position: [number, number];
  scale: number;
  aspects: FloatAspect[];
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch] ?? ch);

function mat(color: string, roughness = 0.55, metalness = 0.18) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

function glow(color: string, emit = 0.55) {
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.4,
    metalness: 0.2,
    emissive: color,
    emissiveIntensity: emit,
  });
  material.userData.baseEmit = emit;
  return material;
}

function box(w: number, h: number, d: number, color: string, roughness = 0.55): THREE.Mesh {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color, roughness));
}

function put(parent: THREE.Object3D, mesh: THREE.Object3D, x: number, y: number, z: number) {
  mesh.position.set(x, y, z);
  parent.add(mesh);
  return mesh;
}

const texCache = new Map<string, THREE.Texture>();
const loader = new THREE.TextureLoader();

function photoTexture(src: string) {
  const hit = texCache.get(src);
  if (hit) return hit;
  const tex = loader.load(src);
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.encoding = THREE.sRGBEncoding;
  tex.anisotropy = 8;
  texCache.set(src, tex);
  return tex;
}

function photo(src: string, w: number, h: number) {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ map: photoTexture(src), toneMapped: false }),
  );
  mesh.name = 'face';
  return mesh;
}

function artOf(world: FloatWorld, i = 0) {
  return world.aspects[i]?.art ?? world.aspects[0]?.art;
}

function canvasTex(key: string, w: number, h: number, draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void) {
  const hit = texCache.get(key);
  if (hit) return hit;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(canvas);
  tex.encoding = THREE.sRGBEncoding;
  tex.anisotropy = 8;
  texCache.set(key, tex);
  return tex;
}

function uiPlane(tex: THREE.Texture | null, w: number, h: number) {
  if (!tex) return box(w, h, 0.01, '#111');
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));
}

function workDeskScreen(id: string) {
  return canvasTex(`desk:${id}`, 640, 400, (ctx, w, h) => {
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#121b2e';
    ctx.fillRect(0, 0, w, 36);
    ctx.fillStyle = '#8fb0d8';
    ctx.font = '600 16px ui-sans-serif, system-ui, sans-serif';
    if (id === 'goldman') {
      ctx.fillText('GS  ·  Beneficiary  ·  10,248 accounts', 16, 24);
      ctx.fillStyle = '#1a2740';
      ctx.fillRect(16, 52, w - 32, h - 68);
      ['Account', 'Owner', 'Status', 'Path'].forEach((col, i) => {
        ctx.fillStyle = '#6d8aaf';
        ctx.fillText(col, 32 + i * 150, 76);
      });
      for (let r = 0; r < 8; r++) {
        ctx.fillStyle = r % 2 ? '#152033' : '#18263c';
        ctx.fillRect(16, 88 + r * 34, w - 32, 34);
        ctx.fillStyle = '#d5e4f6';
        ctx.fillText(`10${240 + r}`, 32, 110 + r * 34);
        ctx.fillStyle = r < 6 ? '#7dcea0' : '#e0b15c';
        ctx.fillText(r < 6 ? 'signed' : 'review', 332, 110 + r * 34);
      }
    } else if (id === 'onedave') {
      ctx.fillText('Curtis  ·  Inventory pipeline', 16, 24);
      for (let i = 0; i < 6; i++) {
        const x = 16 + (i % 3) * 200;
        const y = 56 + Math.floor(i / 3) * 160;
        ctx.fillStyle = '#162418';
        ctx.fillRect(x, y, 188, 144);
        ctx.strokeStyle = '#3e9a62';
        ctx.strokeRect(x, y, 188, 144);
        ctx.fillStyle = '#cfe8d4';
        ctx.fillText(`VALVE  ${120 + i}`, x + 14, y + 32);
        ctx.fillStyle = i % 2 ? '#7dcea0' : '#e0b15c';
        ctx.fillText(i % 2 ? 'in spec' : 'queued', x + 14, y + 60);
        ctx.fillStyle = '#6a8f74';
        ctx.fillRect(x + 14, y + 88, 160, 8);
        ctx.fillStyle = '#7dcea0';
        ctx.fillRect(x + 14, y + 88, 40 + i * 18, 8);
      }
    } else {
      ctx.fillText('STEALTH  ·  Kraken futures  ·  <100ms', 16, 24);
      ctx.strokeStyle = '#24344f';
      for (let x = 40; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 48);
        ctx.lineTo(x, h - 16);
        ctx.stroke();
      }
      ctx.strokeStyle = '#e0b15c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      let y = 220;
      ctx.moveTo(24, y);
      for (let x = 24; x < w - 16; x += 18) {
        y += Math.sin(x * 0.04) * 18 + (x % 54 === 0 ? -22 : 10);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.strokeStyle = '#6b9fff';
      ctx.beginPath();
      y = 260;
      ctx.moveTo(24, y);
      for (let x = 24; x < w - 16; x += 18) {
        y += Math.cos(x * 0.03) * 12;
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = '#7dcea0';
      ctx.fillText('BOOK  live', 16, h - 18);
    }
  });
}

function phoneUiTex() {
  return canvasTex('phone-ui', 420, 860, (ctx, w, h) => {
    ctx.fillStyle = '#0c0c0e';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#1a1a1e';
    ctx.beginPath();
    ctx.roundRect?.(120, 18, 180, 28, 14);
    if (!ctx.roundRect) ctx.fillRect(120, 18, 180, 28);
    else ctx.fill();
    ctx.fillStyle = '#8a8a92';
    ctx.font = '600 18px ui-sans-serif, system-ui, sans-serif';
    ctx.fillText('9:41', 24, 38);
    ctx.fillStyle = '#f4f0e8';
    ctx.font = '500 13px ui-sans-serif, system-ui, sans-serif';
    ctx.fillText('PHONECODING  ·  iOS', 28, 88);
    ctx.fillStyle = '#ffffff';
    ctx.font = '600 28px ui-serif, Georgia, serif';
    ctx.fillText('Studio', 28, 128);
    ctx.fillStyle = '#1c1c22';
    ctx.fillRect(24, 160, w - 48, 220);
    ctx.fillStyle = '#8a8a92';
    ctx.font = '500 13px ui-sans-serif, system-ui, sans-serif';
    ctx.fillText('VOICE PROMPT  ·  0:05', 40, 188);
    ctx.fillStyle = '#f4f0e8';
    ctx.font = '400 18px ui-sans-serif, system-ui, sans-serif';
    ctx.fillText('Add a SwiftUI screen for the', 40, 228);
    ctx.fillText('diff, then show it in Theater.', 40, 254);
    ctx.fillStyle = '#f4f0e8';
    ctx.fillRect(40, 300, w - 80, 52);
    ctx.fillStyle = '#111';
    ctx.font = '600 16px ui-sans-serif, system-ui, sans-serif';
    ctx.fillText('Send task', 160, 332);
    ctx.fillStyle = '#2a2a33';
    for (let i = 0; i < 4; i++) ctx.fillRect(24, 408 + i * 96, w - 48, 84);
    ctx.fillStyle = '#8a8a92';
    ctx.font = '500 12px ui-sans-serif, system-ui, sans-serif';
    ['ContentView.swift', 'TheaterWindow', 'VoiceBuffer', 'Learn/Lesson 4'].forEach((line, i) => {
      ctx.fillText(line, 40, 440 + i * 96);
    });
    ctx.fillStyle = '#f4f0e8';
    ctx.fillRect(w / 2 - 40, h - 28, 80, 6);
  });
}

function diplomaTex(school: string, honor: string, field: string, year: string, ink: string) {
  return canvasTex(`diploma:${school}`, 420, 560, (ctx, w, h) => {
    ctx.fillStyle = '#f3ead4';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = ink;
    ctx.lineWidth = 8;
    ctx.strokeRect(18, 18, w - 36, h - 36);
    ctx.lineWidth = 2;
    ctx.strokeRect(28, 28, w - 56, h - 56);
    ctx.fillStyle = ink;
    ctx.font = '600 13px ui-sans-serif, system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('THE TRUSTEES OF', w / 2, 78);
    ctx.font = '600 26px ui-serif, Georgia, serif';
    ctx.fillText(school, w / 2, 128);
    ctx.font = 'italic 16px ui-serif, Georgia, serif';
    ctx.fillText('have conferred upon', w / 2, 188);
    ctx.font = '600 22px ui-serif, Georgia, serif';
    ctx.fillText('Chris Swim Lee', w / 2, 232);
    ctx.font = 'italic 15px ui-serif, Georgia, serif';
    ctx.fillText('the degree of', w / 2, 278);
    ctx.font = '600 18px ui-serif, Georgia, serif';
    ctx.fillText(honor, w / 2, 318);
    ctx.font = 'italic 16px ui-serif, Georgia, serif';
    ctx.fillText(field, w / 2, 350);
    ctx.font = '600 16px ui-sans-serif, system-ui, sans-serif';
    ctx.fillText(year, w / 2, 410);
    ctx.beginPath();
    ctx.arc(w / 2, 478, 28, 0, Math.PI * 2);
    ctx.fillStyle = '#e0b15c';
    ctx.fill();
    ctx.strokeStyle = ink;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.textAlign = 'left';
  });
}

function chalkTex() {
  return canvasTex('hait-board', 640, 400, (ctx, w, h) => {
    ctx.fillStyle = '#1d3a2c';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    for (let y = 48; y < h; y += 36) {
      ctx.beginPath();
      ctx.moveTo(16, y);
      ctx.lineTo(w - 16, y);
      ctx.stroke();
    }
    ctx.fillStyle = '#f4f0e0';
    ctx.font = '600 18px ui-sans-serif, system-ui, sans-serif';
    ctx.fillText('HAIT  ·  Chiang Rai', 28, 40);
    ctx.font = 'italic 42px ui-serif, Georgia, serif';
    ctx.fillText('Introduction to AI', 28, 120);
    ctx.font = '400 18px ui-sans-serif, system-ui, sans-serif';
    ctx.fillStyle = '#d8c48a';
    ['1.  What a model is', '2.  Data that stays local', '3.  Agents in the lab', 'First cohort  ·  2026'].forEach((line, i) => {
      ctx.fillText(line, 36, 190 + i * 42);
    });
  });
}

function bob(group: THREE.Group, ...nodes: THREE.Object3D[]) {
  for (const node of nodes) {
    node.userData.baseY = node.position.y;
    node.userData.baseX = node.position.x;
    node.userData.baseZ = node.position.z;
  }
  group.userData.sats = nodes;
}

function finish(group: THREE.Group, restY: number, glows: THREE.Material[] = [], restZ = 0) {
  group.userData.restY = restY;
  group.userData.restZ = restZ;
  group.userData.glows = glows;
  return group;
}

function monitor(world: FloatWorld, index: number, w: number, h: number) {
  const s = world.scale;
  const screen = new THREE.Group();
  put(screen, box(w + 0.08 * s, h + 0.08 * s, 0.07 * s, '#141820', 0.4), 0, 0, -0.02);
  const id = world.aspects[index]?.id ?? 'stealth';
  put(screen, uiPlane(workDeskScreen(id), w, h), 0, 0, 0.02);
  const strip = new THREE.Mesh(new THREE.BoxGeometry(w * 0.5, 0.03 * s, 0.02 * s), glow(world.accent, 0.7));
  put(screen, strip, 0, -h * 0.5 - 0.04 * s, 0.02);
  return screen;
}

/** Jobs: a three-screen desk. Each monitor is a different job. */
function buildWork(world: FloatWorld) {
  const group = new THREE.Group();
  const s = world.scale;
  put(group, box(2.55 * s, 0.09 * s, 1.05 * s, '#1a2230', 0.5), 0, -0.62 * s, 0.12);
  put(group, box(1.6 * s, 0.04 * s, 0.55 * s, '#10141c', 0.45), 0, -0.56 * s, 0.28);
  const led = new THREE.Mesh(new THREE.BoxGeometry(2.2 * s, 0.025 * s, 0.03 * s), glow(world.accent, 0.8));
  put(group, led, 0, -0.57 * s, 0.62);
  const stands: THREE.Object3D[] = [];
  ;[
    [-0.82 * s, 0.22, 0],
    [0, 0, 1],
    [0.82 * s, -0.22, 2],
  ].forEach(([x, yaw, idx]) => {
    const nest = new THREE.Group();
    nest.rotation.y = yaw;
    put(nest, box(0.08 * s, 0.42 * s, 0.08 * s, '#2a3344'), 0, -0.28 * s, -0.02);
    put(nest, monitor(world, idx, 0.72 * s, 0.46 * s), 0, 0.12 * s, 0);
    put(group, nest, x, -0.08 * s, -0.12);
    stands.push(nest);
  });
  const keys = box(1.15 * s, 0.025 * s, 0.32 * s, '#0c1016', 0.5);
  put(group, keys, 0, -0.52 * s, 0.42);
  bob(group, ...stands, led);
  return finish(group, 0.04, [led.material as THREE.Material]);
}

/** Software: an open laptop with two floating UI chips. */
function buildProjects(world: FloatWorld) {
  const group = new THREE.Group();
  const s = world.scale;
  const base = box(1.55 * s, 0.07 * s, 1.05 * s, '#1c1c22', 0.35);
  base.rotation.x = 0.08;
  put(group, base, 0, -0.42 * s, 0.22);
  put(group, box(1.15 * s, 0.015 * s, 0.7 * s, '#2a2a33', 0.3), 0, -0.37 * s, 0.28);
  const lid = new THREE.Group();
  lid.rotation.x = -0.55;
  put(lid, box(1.55 * s, 0.96 * s, 0.07 * s, '#16161c', 0.32), 0, 0.48 * s, 0);
  const src = artOf(world, 0)?.src;
  if (src) put(lid, photo(src, 1.38 * s, 0.82 * s), 0, 0.48 * s, 0.045);
  put(group, lid, 0, -0.38 * s, -0.28);
  const hinge = box(1.42 * s, 0.04 * s, 0.06 * s, '#2a2a33', 0.4);
  put(group, hinge, 0, -0.38 * s, -0.22);
  bob(group);
  group.userData.lid = lid;
  return finish(group, 0.22);
}

/** HAIT: a chalkboard, a stack of books, an apple. */
function buildHait(world: FloatWorld) {
  const group = new THREE.Group();
  const s = world.scale;
  put(group, box(1.92 * s, 1.22 * s, 0.08 * s, '#5a3a22', 0.65), 0, 0.16 * s, 0);
  put(group, uiPlane(chalkTex(), 1.74 * s, 1.04 * s), 0, 0.16 * s, 0.05);
  put(group, box(1.92 * s, 0.06 * s, 0.18 * s, '#4a301c', 0.6), 0, -0.48 * s, 0.06);
  put(group, box(0.16 * s, 0.03 * s, 0.03 * s, '#f4f0e0', 0.4), -0.52 * s, -0.44 * s, 0.14);
  put(group, box(0.1 * s, 0.03 * s, 0.03 * s, '#e8dcc0', 0.4), -0.32 * s, -0.44 * s, 0.14);
  const eraser = box(0.22 * s, 0.05 * s, 0.1 * s, '#3a322e', 0.7);
  put(group, eraser, 0.48 * s, -0.44 * s, 0.12);
  ;['#6b3a32', '#2c3a4a', '#c4b8a4'].forEach((color, i) => {
    const book = box(0.46 * s, 0.09 * s, 0.32 * s, color, 0.65);
    book.rotation.y = -0.12 + i * 0.04;
    put(group, book, -0.42 * s, -0.58 * s + i * 0.1 * s, 0.28);
  });
  const apple = new THREE.Group();
  put(apple, new THREE.Mesh(new THREE.SphereGeometry(0.09 * s, 16, 12), mat('#b43a32', 0.45)), 0, 0, 0);
  put(apple, box(0.025 * s, 0.08 * s, 0.025 * s, '#3a2418', 0.5), 0, 0.1 * s, 0);
  const leaf = box(0.1 * s, 0.03 * s, 0.06 * s, '#3e9a62', 0.5);
  leaf.rotation.z = 0.4;
  put(apple, leaf, 0.06 * s, 0.14 * s, 0);
  put(group, apple, 0.52 * s, -0.52 * s, 0.28);
  bob(group, apple, eraser);
  return finish(group, 0.08);
}

/** local-host: a small terminal with a face. It stays on the machine. */
function buildLocalhost(world: FloatWorld) {
  const group = new THREE.Group();
  const s = world.scale * 1.05;
  put(group, box(0.92 * s, 0.07 * s, 0.58 * s, '#121612', 0.45), 0, -0.34 * s, 0.02);
  put(group, box(0.62 * s, 0.035 * s, 0.06 * s, '#d4b46a', 0.32), 0, -0.29 * s, 0.28 * s);
  put(group, box(0.7 * s, 0.42 * s, 0.4 * s, '#e4efe0', 0.55), 0, -0.04 * s, 0);
  put(group, box(0.5 * s, 0.24 * s, 0.03 * s, '#101810', 0.4), 0, -0.02 * s, 0.21 * s);
  const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.035 * s, 12, 10), glow('#c8f5d4', 1.15));
  const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.035 * s, 12, 10), glow('#c8f5d4', 1.15));
  put(group, eyeL, -0.1 * s, 0.02 * s, 0.23 * s);
  put(group, eyeR, 0.1 * s, 0.02 * s, 0.23 * s);
  const cable = box(0.045 * s, 0.045 * s, 0.34 * s, '#1c3a28', 0.6);
  cable.rotation.y = 0.4;
  put(group, cable, 0.28 * s, -0.3 * s, -0.22 * s);
  const antenna = box(0.03 * s, 0.22 * s, 0.03 * s, '#d4b46a', 0.32);
  put(group, antenna, 0.22 * s, 0.26 * s, 0);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.045 * s, 10, 8), glow(world.accent, 1));
  put(group, tip, 0.22 * s, 0.4 * s, 0);
  bob(group, antenna, tip);
  return finish(group, 0.2, [eyeL.material as THREE.Material, eyeR.material as THREE.Material, tip.material as THREE.Material]);
}

/** PhoneCoding: an iPhone running Studio. */
function buildPhone(world: FloatWorld) {
  const group = new THREE.Group();
  const s = world.scale * 1.12;
  put(group, box(0.78 * s, 1.62 * s, 0.12 * s, '#1c1c1e', 0.22), 0, 0, 0);
  put(group, box(0.72 * s, 1.54 * s, 0.02 * s, '#0a0a0c', 0.3), 0, 0, 0.055);
  put(group, uiPlane(phoneUiTex(), 0.66 * s, 1.42 * s), 0, 0, 0.07);
  put(group, box(0.24 * s, 0.07 * s, 0.03 * s, '#050506', 0.2), 0, 0.64 * s, 0.075);
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.22 * s, 0.03 * s, 0.02 * s), glow('#f4f0e8', 0.45));
  put(group, bar, 0, -0.66 * s, 0.075);
  put(group, box(0.025 * s, 0.12 * s, 0.04 * s, '#2a2a2e', 0.3), -0.405 * s, 0.32 * s, 0);
  put(group, box(0.025 * s, 0.08 * s, 0.04 * s, '#2a2a2e', 0.3), -0.405 * s, 0.16 * s, 0);
  put(group, box(0.025 * s, 0.05 * s, 0.03 * s, '#2a2a2e', 0.3), -0.405 * s, 0.46 * s, 0);
  put(group, box(0.025 * s, 0.16 * s, 0.04 * s, '#2a2a2e', 0.3), 0.405 * s, 0.24 * s, 0);
  const mic = new THREE.Mesh(new THREE.BoxGeometry(0.07 * s, 0.035 * s, 0.02 * s), glow(world.accent, 0.7));
  put(group, mic, 0.18 * s, 0.7 * s, 0.08);
  bob(group, mic);
  return finish(group, -0.28, [bar.material as THREE.Material, mic.material as THREE.Material], 0.1);
}

function bronze(hex: string, rough = 0.4) {
  return mat(hex, rough, 0.48);
}

function trophyPlaqueTex() {
  return canvasTex('d22-plaque', 512, 280, (ctx, w, h) => {
    ctx.fillStyle = '#14110c';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#c9a36a';
    ctx.lineWidth = 10;
    ctx.strokeRect(12, 12, w - 24, h - 24);
    ctx.lineWidth = 2;
    ctx.strokeRect(22, 22, w - 44, h - 44);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#e8d09a';
    ctx.font = '700 36px ui-serif, Georgia, serif';
    ctx.fillText('STARCRAFT', w / 2, 78);
    ctx.font = '600 18px ui-sans-serif, system-ui, sans-serif';
    ctx.fillStyle = '#c4a06a';
    ctx.fillText('BROOD WAR  ·  WORLD CHAMPIONSHIP', w / 2, 118);
    ctx.font = '700 42px ui-serif, Georgia, serif';
    ctx.fillStyle = '#f0dca8';
    ctx.fillText('D22-SOSO', w / 2, 178);
    ctx.font = '600 28px ui-sans-serif, system-ui, sans-serif';
    ctx.fillStyle = '#d4b46a';
    ctx.fillText('1999', w / 2, 228);
  });
}

function cast(color: string) {
  return mat(color, 0.58, 0.12);
}

function buildMarine(s: number) {
  const marine = new THREE.Group();
  const armor = '#6a4324';
  const dark = '#3a2412';
  const plate = '#8a5c32';
  const boot = (x: number) => put(marine, new THREE.Mesh(new THREE.BoxGeometry(0.07 * s, 0.04 * s, 0.11 * s), cast(dark)), x, 0.02 * s, 0.02 * s);
  boot(-0.055 * s);
  boot(0.055 * s);
  const leg = (x: number) => put(marine, new THREE.Mesh(new THREE.BoxGeometry(0.055 * s, 0.16 * s, 0.06 * s), cast(armor)), x, 0.12 * s, 0);
  leg(-0.05 * s);
  leg(0.05 * s);
  put(marine, new THREE.Mesh(new THREE.BoxGeometry(0.16 * s, 0.06 * s, 0.08 * s), cast(dark)), 0, 0.21 * s, 0);
  put(marine, new THREE.Mesh(new THREE.BoxGeometry(0.18 * s, 0.2 * s, 0.1 * s), cast(armor)), 0, 0.34 * s, 0);
  put(marine, new THREE.Mesh(new THREE.BoxGeometry(0.1 * s, 0.12 * s, 0.03 * s), cast(plate)), 0, 0.34 * s, 0.06 * s);
  put(marine, new THREE.Mesh(new THREE.BoxGeometry(0.07 * s, 0.05 * s, 0.08 * s), cast(plate)), -0.12 * s, 0.42 * s, 0);
  put(marine, new THREE.Mesh(new THREE.BoxGeometry(0.07 * s, 0.05 * s, 0.08 * s), cast(plate)), 0.12 * s, 0.42 * s, 0);
  put(marine, new THREE.Mesh(new THREE.BoxGeometry(0.04 * s, 0.14 * s, 0.04 * s), cast(armor)), -0.13 * s, 0.3 * s, 0.02 * s);
  const rifle = new THREE.Mesh(new THREE.BoxGeometry(0.03 * s, 0.035 * s, 0.32 * s), cast('#2a1a0e'));
  rifle.rotation.y = 0.35;
  rifle.rotation.z = -0.15;
  put(marine, rifle, 0.12 * s, 0.3 * s, 0.1 * s);
  const helm = new THREE.Mesh(new THREE.BoxGeometry(0.11 * s, 0.1 * s, 0.11 * s), cast(armor));
  put(marine, helm, 0, 0.5 * s, 0.01 * s);
  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.09 * s, 0.028 * s, 0.02 * s), glow('#140e08', 0.12));
  put(marine, visor, 0, 0.49 * s, 0.065 * s);
  marine.userData.visor = visor.material;
  return marine;
}

/** D22 archive: the Brood War championship trophy. */
function buildArchive(world: FloatWorld) {
  const group = new THREE.Group();
  const s = world.scale * 0.96;
  const armor = '#7a4e28';
  const dark = '#4a2c14';
  const lite = '#9a6434';

  put(group, new THREE.Mesh(new THREE.BoxGeometry(0.76 * s, 0.1 * s, 0.76 * s), bronze(dark, 0.45)), 0, -0.92 * s, 0);
  put(group, new THREE.Mesh(new THREE.BoxGeometry(0.64 * s, 0.24 * s, 0.64 * s), bronze(armor, 0.38)), 0, -0.75 * s, 0);
  put(group, new THREE.Mesh(new THREE.BoxGeometry(0.72 * s, 0.06 * s, 0.72 * s), bronze(lite, 0.34)), 0, -0.6 * s, 0);
  for (const [x, z] of [[-1, -1], [-1, 1], [1, -1], [1, 1]] as const) {
    put(group, new THREE.Mesh(new THREE.BoxGeometry(0.09 * s, 0.12 * s, 0.09 * s), bronze(lite, 0.32)), x * 0.31 * s, -0.56 * s, z * 0.31 * s);
  }

  const plaque = trophyPlaqueTex();
  const plate = uiPlane(plaque, 0.5 * s, 0.28 * s);
  put(group, plate, 0, -0.75 * s, 0.335 * s);
  put(group, box(0.54 * s, 0.32 * s, 0.03 * s, '#1a1610', 0.5), 0, -0.75 * s, 0.315 * s);

  const colH = 0.88 * s;
  const colR = 0.13 * s;
  const colY = -0.12 * s;
  put(group, new THREE.Mesh(new THREE.CylinderGeometry(colR, colR * 1.08, colH, 20), bronze(armor, 0.36)), 0, colY, 0);
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    const flute = new THREE.Mesh(new THREE.BoxGeometry(0.032 * s, colH * 0.88, 0.02 * s), bronze(dark, 0.5));
    put(group, flute, Math.sin(a) * colR * 0.97, colY, Math.cos(a) * colR * 0.97);
    flute.rotation.y = a;
  }
  put(group, new THREE.Mesh(new THREE.CylinderGeometry(colR * 1.22, colR * 1.14, 0.07 * s, 16), bronze(lite, 0.32)), 0, colY - colH * 0.48, 0);
  put(group, new THREE.Mesh(new THREE.CylinderGeometry(colR * 1.16, colR * 1.28, 0.08 * s, 16), bronze(lite, 0.32)), 0, colY + colH * 0.48, 0);

  put(group, new THREE.Mesh(new THREE.BoxGeometry(0.56 * s, 0.08 * s, 0.56 * s), bronze(armor, 0.34)), 0, 0.38 * s, 0);
  put(group, new THREE.Mesh(new THREE.BoxGeometry(0.42 * s, 0.05 * s, 0.42 * s), bronze(lite, 0.3)), 0, 0.45 * s, 0);

  const marine = buildMarine(s);
  marine.scale.setScalar(1.15);
  put(group, marine, 0, 0.48 * s, 0);
  bob(group, marine);
  const visor = marine.userData.visor as THREE.Material | undefined;
  return finish(group, 0.32, visor ? [visor] : []);
}

/** Study: the two diplomas. */
function buildStudy(world: FloatWorld) {
  const group = new THREE.Group();
  const s = world.scale;
  const trine = diplomaFrame(
    diplomaTex('Trine University', 'Master of Science', 'Information Studies', 'May 2026', '#1a365d'),
    0.78 * s,
    1.04 * s,
    '#5a3a22',
  );
  trine.rotation.y = -0.34;
  trine.rotation.z = -0.04;
  put(group, trine, -0.46 * s, 0.04 * s, 0);
  const trinity = diplomaFrame(
    diplomaTex('Trinity College', 'Bachelor of Science', 'Computer Science and Mathematics', 'May 2020', '#4a1c24'),
    0.78 * s,
    1.04 * s,
    '#3a2418',
  );
  trinity.rotation.y = 0.34;
  trinity.rotation.z = 0.04;
  put(group, trinity, 0.46 * s, 0.04 * s, 0);
  bob(group, trine, trinity);
  return finish(group, 0.12);
}

function diplomaFrame(tex: THREE.Texture | null, w: number, h: number, wood: string) {
  const frame = new THREE.Group();
  put(frame, box(w + 0.1, h + 0.1, 0.06, wood, 0.6), 0, 0, 0);
  put(frame, box(w + 0.04, h + 0.04, 0.02, '#e0b15c', 0.35), 0, 0, 0.025);
  put(frame, uiPlane(tex, w, h), 0, 0, 0.045);
  return frame;
}

function hexVerts(cx: number, cy: number, r: number) {
  const verts: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    verts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return verts;
}

function hexPath(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  const verts = hexVerts(cx, cy, r);
  ctx.beginPath();
  verts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
  ctx.closePath();
  return verts;
}

function paintLegendGem(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const r = w * 0.4;
  const halo = ctx.createRadialGradient(cx, cy, r * 0.5, cx, cy, r * 1.2);
  halo.addColorStop(0, 'rgba(255, 196, 72, 0.55)');
  halo.addColorStop(0.62, 'rgba(232, 168, 48, 0.18)');
  halo.addColorStop(1, 'rgba(232, 168, 48, 0)');
  ctx.fillStyle = halo;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 1.2, 0, Math.PI * 2);
  ctx.fill();

  const verts = hexPath(ctx, cx, cy, r);
  ctx.save();
  ctx.clip();
  const v = (i: number) => verts[i];
  const facet = (a: number, b: number, inner: string, outer: string, hx: number, hy: number) => {
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(v(a)[0], v(a)[1]);
    ctx.lineTo(v(b)[0], v(b)[1]);
    ctx.closePath();
    const g = ctx.createLinearGradient(cx, cy, cx + hx * r, cy + hy * r);
    g.addColorStop(0, inner);
    g.addColorStop(1, outer);
    ctx.fillStyle = g;
    ctx.fill();
  };
  facet(0, 1, '#e8b44a', '#f4e4b0', 0.45, -0.7);
  facet(1, 2, '#d49228', '#c07820', 0.8, 0.12);
  facet(2, 3, '#c07818', '#a85c14', 0.28, 0.82);
  facet(3, 4, '#8a4010', '#6a2c0c', -0.22, 0.78);
  facet(4, 5, '#a84814', '#7a3010', -0.78, 0.08);
  facet(5, 0, '#c87828', '#dca040', -0.38, -0.68);
  ctx.strokeStyle = 'rgba(48, 22, 6, 0.38)';
  ctx.lineWidth = r * 0.016;
  ctx.beginPath();
  ctx.moveTo(v(5)[0], v(5)[1]);
  ctx.lineTo(v(2)[0], v(2)[1]);
  ctx.moveTo(v(1)[0], v(1)[1]);
  ctx.lineTo(v(4)[0], v(4)[1]);
  ctx.stroke();
  ctx.restore();

  hexPath(ctx, cx, cy, r);
  ctx.lineJoin = 'miter';
  ctx.miterLimit = 2.4;
  ctx.strokeStyle = '#3a220c';
  ctx.lineWidth = r * 0.09;
  ctx.stroke();
  ctx.strokeStyle = '#c9a050';
  ctx.lineWidth = r * 0.026;
  ctx.stroke();

  ctx.font = `700 ${Math.round(r * 1.08)}px Georgia, 'Palatino Linotype', Palatino, ui-serif, serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#2a1608';
  ctx.lineWidth = r * 0.055;
  ctx.strokeText('1', cx, cy + r * 0.04);
  ctx.fillStyle = '#f3ead4';
  ctx.fillText('1', cx, cy + r * 0.04);
}

function punchLegendPhoto(ctx: CanvasRenderingContext2D, img: HTMLImageElement, size: number) {
  ctx.clearRect(0, 0, size, size);
  const scale = Math.min(size / img.width, size / img.height) * 0.96;
  const dw = img.width * scale;
  const dh = img.height * scale;
  ctx.drawImage(img, (size - dw) / 2, (size - dh) / 2, dw, dh);
  const shot = ctx.getImageData(0, 0, size, size);
  const px = shot.data;
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.4;
  const sqrt3 = Math.sqrt(3);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const nx = (x - cx) / r;
      const ny = (y - cy) / r;
      const hex = Math.max((Math.abs(nx) * 2) / sqrt3, Math.abs(nx) / sqrt3 + Math.abs(ny));
      let keep = 1;
      if (hex > 1.16) keep = 0;
      else if (hex > 1) keep = 1 - (hex - 1) / 0.16;
      const lum = (px[i] + px[i + 1] + px[i + 2]) / 3;
      if (hex > 1 && lum > 210) keep *= Math.max(0, (230 - lum) / 20);
      px[i + 3] = Math.round(px[i + 3] * keep);
    }
  }
  ctx.putImageData(shot, 0, 0);
}

function legendGemTex() {
  const key = 'legend-1';
  const hit = texCache.get(key);
  if (hit) return hit;
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  paintLegendGem(ctx, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.encoding = THREE.sRGBEncoding;
  tex.anisotropy = 8;
  texCache.set(key, tex);
  const img = new Image();
  img.decoding = 'async';
  img.onload = () => {
    punchLegendPhoto(ctx, img, size);
    tex.needsUpdate = true;
  };
  img.src = '/play/legend-rank1.png';
  return tex;
}

/** Play: the Rank 1 Legend gem. */
function buildPlay(world: FloatWorld) {
  const group = new THREE.Group();
  const s = world.scale * 1.22;
  const tex = legendGemTex();
  const faceMat = new THREE.MeshBasicMaterial({
    map: tex ?? undefined,
    color: tex ? 0xffffff : 0xe8b44a,
    transparent: true,
    alphaTest: 0.12,
    depthWrite: true,
    toneMapped: false,
    side: THREE.DoubleSide,
  });
  faceMat.userData.keepTransparent = true;
  const face = new THREE.Mesh(new THREE.PlaneGeometry(1.22 * s, 1.22 * s), faceMat);
  put(group, face, 0, 0, 0);
  group.frustumCulled = false;
  face.frustumCulled = false;
  group.userData.span = 1.22 * s;
  group.userData.faceCam = true;
  bob(group, face);
  return finish(group, 0, []);
}

function buildWorld(world: FloatWorld) {
  switch (world.id) {
    case 'work':
      return buildWork(world);
    case 'projects':
      return buildProjects(world);
    case 'hait':
      return buildHait(world);
    case 'localhost':
      return buildLocalhost(world);
    case 'phonecoding':
      return buildPhone(world);
    case 'd22soso':
      return buildArchive(world);
    case 'study':
      return buildStudy(world);
    case 'play':
      return buildPlay(world);
    default:
      return buildArchive(world);
  }
}

type Floater = {
  id: string;
  group: THREE.Group;
  anchor: THREE.Vector3;
  home: THREE.Vector3;
  phase: number;
  span: number;
  homeScale: number;
  /** Desktop resting place and size; phones recompute home/homeScale on resize. */
  deskHome: THREE.Vector3;
  deskScale: number;
  label: [number, number];
  deskLabel: [number, number];
  world: FloatWorld;
  mats: { mat: THREE.Material; base: number }[];
};

const spanBox = new THREE.Box3();
const spanSize = new THREE.Vector3();
function objectSpan(group: THREE.Object3D) {
  const preset = group.userData.span;
  if (typeof preset === 'number' && Number.isFinite(preset) && preset > 0) return preset;
  spanBox.setFromObject(group);
  spanBox.getSize(spanSize);
  const size = Math.max(spanSize.x, spanSize.y, spanSize.z);
  return Number.isFinite(size) && size > 0.05 ? Math.max(size, 0.8) : 0.8;
}

function collectMats(group: THREE.Object3D): Floater['mats'] {
  const seen = new Map<THREE.Material, number>();
  group.traverse((obj) => {
    const mesh = obj as THREE.Mesh;
    if (!mesh.isMesh) return;
    for (const material of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
      if (!seen.has(material)) seen.set(material, material.opacity);
    }
  });
  return [...seen].map(([mat, base]) => ({ mat, base }));
}

export function mountFloat(root: HTMLElement, worlds: FloatWorld[]) {
  const view = root.querySelector<HTMLCanvasElement>('[data-world-canvas]');
  const labelHost = root.querySelector<HTMLElement>('[data-world-labels]');
  const panel = root.querySelector<HTMLElement>('[data-world-panel]');
  const panelBody = root.querySelector<HTMLElement>('[data-world-panel-body]');
  const rail = root.querySelector<HTMLElement>('[data-world-rail]');
  const intro = root.querySelector<HTMLElement>('[data-world-intro]');
  const status = root.querySelector<HTMLElement>('[data-world-status]');
  if (!view || !labelHost || !panel || !panelBody || !rail || !status) throw new Error('World markup missing');
  const viewEl = view;
  const panelEl = panel;
  const panelBodyEl = panelBody;
  const railEl = rail;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ac = new AbortController();
  const { signal } = ac;
  const renderer = new THREE.WebGLRenderer({ canvas: view, antialias: true });
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 140);
  camera.position.set(0, 0, 9.5);

  // Theme-aware material registries, filled as the galaxy is built.
  const starMats: { mat: THREE.PointsMaterial; dark: number; light: number }[] = [];
  const nebulaMats: THREE.MeshBasicMaterial[] = [];
  const ambient = new THREE.AmbientLight(0x8fa3c4, 0.8);
  const sun = new THREE.DirectionalLight(0xfff1d8, 1.5);
  sun.position.set(6, 10, 8);
  const fill = new THREE.DirectionalLight(0x7aa2ff, 0.45);
  fill.position.set(-6, 4, 4);
  const rim = new THREE.PointLight(0xe0b15c, 0.55, 18, 2);
  rim.position.set(0, 0.4, 3.4);
  scene.add(ambient, sun, fill, rim);

  const applyTheme = () => {
    const light = document.documentElement.dataset.theme === 'light';
    const bg = new THREE.Color(light ? 0xdfe4ee : 0x04060d);
    scene.background = bg;
    scene.fog = new THREE.Fog(bg, 14, 34);
    // Stars and nebulae are tuned per theme; the dark station frames read
    // as cards against the pale sky, so only the sky elements change.
    for (const star of starMats) star.mat.color.setHex(light ? star.light : star.dark);
    for (const wash of nebulaMats) wash.opacity = light ? 0.35 : 1;
    renderer.toneMappingExposure = light ? 0.92 : 1.1;
    ambient.intensity = light ? 1.05 : 0.8;
    sun.intensity = light ? 1.15 : 1.5;
    fill.intensity = light ? 0.3 : 0.45;
    rim.intensity = light ? 0.28 : 0.55;
  };
  applyTheme();
  document.documentElement.addEventListener('themechange', applyTheme, { signal });

  const galaxy = new THREE.Group();
  galaxy.rotation.order = 'YXZ';
  scene.add(galaxy);

  // Starfields: square points in a big box of space. Nebula washes off-axis.
  const laneDepth = 70;
  for (const [count, color, lightColor, size] of [
    [900, 0xb9c7e6, 0x54678f, 1.6],
    [260, 0xf0d7a0, 0x8a6a1f, 2.6],
  ] as const) {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = 8 - Math.random() * laneDepth;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const pointsMat = new THREE.PointsMaterial({ color, size, sizeAttenuation: false, fog: false });
    starMats.push({ mat: pointsMat, dark: color, light: lightColor });
    galaxy.add(new THREE.Points(geo, pointsMat));
  }
  const nebulaTex = (rgb: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const grad = ctx.createRadialGradient(128, 128, 8, 128, 128, 128);
    grad.addColorStop(0, rgb);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(canvas);
  };
  for (const [rgb, x, y, z, s] of [
    ['rgba(70,100,190,0.5)', -18, 8, -22, 38],
    ['rgba(190,140,60,0.3)', 17, -5, -30, 32],
    ['rgba(50,150,130,0.26)', 4, 11, -38, 34],
  ] as const) {
    const tex = nebulaTex(rgb);
    if (!tex) continue;
    const washMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false });
    nebulaMats.push(washMat);
    const wash = new THREE.Mesh(new THREE.PlaneGeometry(s, s * 0.7), washMat);
    wash.position.set(x, y, z);
    galaxy.add(wash);
  }
  applyTheme();

  const depth: Record<string, number> = {
    work: -0.15,
    hait: -0.35,
    localhost: -0.05,
    projects: -0.45,
    phonecoding: 0.15,
    d22soso: -0.2,
    study: -0.35,
    play: 0.05,
  };
  const nudge: Record<string, [number, number]> = {
    work: [0, -0.06],
    projects: [0.35, 0.35],
    hait: [0.45, 0.16],
    localhost: [-0.28, 0.38],
    phonecoding: [-1.3, -0.3],
    d22soso: [0.05, -0.52],
    study: [0.05, -0.28],
    play: [0.05, -0.08],
  };
  const labelOff: Record<string, [number, number]> = {
    work: [0, 0.38],
    hait: [0, 0.78],
    projects: [0, 0.62],
    study: [0, 0.62],
    localhost: [0, 0.48],
    phonecoding: [0, 0.72],
    d22soso: [0, 0.42],
    play: [0, 0.34],
  };
  const homeFit: Record<string, number> = {
    work: 0.84,
    projects: 0.8,
    hait: 0.82,
    localhost: 1,
    phonecoding: 0.74,
    d22soso: 0.78,
    study: 0.9,
    play: 0.8,
  };
  const floaters: Floater[] = [];
  worlds.forEach((world, i) => {
    const group = buildWorld(world);
    const homeScale = homeFit[world.id] ?? 1;
    const span = objectSpan(group);
    group.scale.setScalar(homeScale);
    const [nx, ny] = nudge[world.id] ?? [0, 0];
    const anchor = new THREE.Vector3(world.position[0] + nx, world.position[1] + ny, depth[world.id] ?? 0);
    group.position.copy(anchor);
    group.traverse((obj) => (obj.userData.floaterId = world.id));
    galaxy.add(group);
    group.updateMatrixWorld(true);
    floaters.push({
      id: world.id,
      group,
      anchor,
      home: anchor.clone(),
      phase: i * 1.37,
      span,
      homeScale,
      deskHome: anchor.clone(),
      deskScale: homeScale,
      world,
      label: labelOff[world.id] ?? [0, 0.6],
      deskLabel: labelOff[world.id] ?? [0, 0.6],
      mats: collectMats(group),
    });
  });

  const labels = new Map<string, HTMLButtonElement>();
  for (const floater of floaters) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'world-label';
    button.dataset.go = floater.id;
    button.innerHTML = `<small>${esc(floater.world.kicker)}</small><strong>${esc(floater.world.name)}</strong>`;
    labelHost.append(button);
    labels.set(floater.id, button);
  }

  railEl.innerHTML = worlds
    .map((w) => `<button type="button" data-go="${esc(w.id)}"><small>${esc(w.when)}</small>${esc(w.rail)}</button>`)
    .join('');

  let focusId: string | null = null;
  let hoverId: string | null = null;
  let aspectIndex = 0;
  let targetYaw = 0;
  let targetPitch = 0;
  let yaw = 0;
  let pitch = 0;
  let targetDist = 9.5;
  let running = true;

  const say = (text: string) => {
    status.textContent = '';
    requestAnimationFrame(() => (status.textContent = text));
  };

  panelEl.tabIndex = -1;
  let returnFocus: HTMLElement | null = null;

  function applyDim() {
    for (const floater of floaters) {
      const dimmed = focusId !== null && focusId !== floater.id;
      for (const { mat, base } of floater.mats) {
        mat.opacity = base * (dimmed ? 0.05 : 1);
        mat.transparent = Boolean(mat.userData.keepTransparent) || mat.opacity < 0.99;
        mat.depthWrite = !dimmed;
      }
    }
  }

  function renderPanel(world: FloatWorld, index: number) {
    const aspect = world.aspects[index] ?? world.aspects[0];
    if (!aspect) return;
    aspectIndex = world.aspects.indexOf(aspect);
    // Replacing the panel body destroys the clicked control; remember it
    // so stepping with the keyboard keeps focus on the same control.
    const activeEl = document.activeElement as HTMLElement | null;
    const activeStep = activeEl && panelBodyEl.contains(activeEl) ? activeEl.dataset.step : undefined;
    const activeClose = Boolean(activeEl && panelBodyEl.contains(activeEl) && activeEl.closest('[data-close-panel]'));
    const ext = (href: string) => /^https?:\/\//.test(href);
    panelBodyEl.innerHTML = `
      <p class="world-kicker">${esc(world.kicker)} · ${esc(world.when)}</p>
      <h2 id="world-panel-title">${esc(aspect.title)}</h2>
      <p class="world-meta">${esc(world.place)}</p>
      ${aspect.art ? `<figure class="world-art"><img src="${esc(aspect.art.src)}" alt="${esc(aspect.art.alt)}" loading="lazy" decoding="async" /></figure>` : ''}
      <p class="world-line">${esc(aspect.line)}</p>
      ${aspect.points.filter((point) => point !== aspect.line).length ? `<ul>${aspect.points.filter((point) => point !== aspect.line).slice(0, 3).map((point) => `<li>${esc(point)}</li>`).join('')}</ul>` : ''}
      ${aspect.links.length ? `<p class="world-links">${aspect.links.map((link) => `<a href="${esc(link.href)}"${ext(link.href) ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(link.label)}</a>`).join('')}</p>` : ''}
      ${world.aspects.length > 1 ? `<p class="world-step"><button type="button" data-step="-1">◀ Prev</button><span>${aspectIndex + 1} / ${world.aspects.length}</span><button type="button" data-step="1">Next ▶</button></p>` : ''}
      <p class="world-links"><button type="button" data-close-panel>Back to the galaxy</button></p>`;
    panelEl.hidden = false;
    panelEl.setAttribute('aria-labelledby', 'world-panel-title');
    railEl.querySelectorAll<HTMLButtonElement>('[data-go]').forEach((button) => {
      if (button.dataset.go === world.id) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    say(`${aspect.title}. ${aspect.line}`);
    if (activeStep) panelBodyEl.querySelector<HTMLElement>(`[data-step="${activeStep}"]`)?.focus();
    else if (activeClose) panelBodyEl.querySelector<HTMLElement>('[data-close-panel]')?.focus();
  }

  function focus(id: string, aspectId?: string, push = true) {
    const floater = floaters.find((item) => item.id === id);
    if (!floater) return;
    if (focusId !== id && document.activeElement instanceof HTMLElement && !panelEl.contains(document.activeElement)) {
      returnFocus = document.activeElement;
    }
    focusId = id;
    hoverId = null;
    targetYaw = 0;
    targetPitch = 0;
    const index = Math.max(
      0,
      floater.world.aspects.findIndex((aspect) => aspect.id === (aspectId ?? floater.world.aspects[0]?.id)),
    );
    renderPanel(floater.world, index);
    applyDim();
    root.classList.add('is-in');
    intro?.toggleAttribute('inert', true);
    panelEl.focus({ preventScroll: true });
    const hash = `#${floater.world.aspects[aspectIndex]?.id ?? id}`;
    if (push && location.hash !== hash) history.pushState({ float: id }, '', hash);
  }

  function unfocus(push = true) {
    const wasFocused = focusId !== null || !panelEl.hidden;
    focusId = null;
    panelEl.hidden = true;
    root.classList.remove('is-in');
    intro?.toggleAttribute('inert', false);
    applyDim();
    railEl.querySelectorAll('[aria-current]').forEach((el) => el.removeAttribute('aria-current'));
    if (push && location.hash) history.pushState({ float: null }, '', location.pathname + location.search);
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    returnFocus = null;
    if (wasFocused) say('The galaxy.');
  }

  root.addEventListener('click', (e) => {
    const el = e.target as Element;
    if (el.closest('[data-close-panel]')) return unfocus();
    const step = el.closest<HTMLElement>('[data-step]');
    if (step && focusId) {
      const world = floaters.find((item) => item.id === focusId)?.world;
      if (world) {
        const next = (aspectIndex + Number(step.dataset.step) + world.aspects.length) % world.aspects.length;
        renderPanel(world, next);
        // Keep the deep link pointing at the aspect on screen, without
        // adding a history entry per step.
        history.replaceState({ float: focusId }, '', `#${world.aspects[next]?.id ?? world.id}`);
      }
      return;
    }
    const go = el.closest<HTMLElement>('[data-go]');
    if (go?.dataset.go) focus(go.dataset.go);
  }, { signal });

  // --- Click to inspect, hover to lift -----------------------------------
  const raycaster = new THREE.Raycaster();
  const stage = new THREE.Vector3();
  const scaleTo = new THREE.Vector3();
  const look = new THREE.Vector3();
  const lookTo = new THREE.Vector3();
  let press: { x: number; y: number } | null = null;

  function pick(clientX: number, clientY: number) {
    const rect = viewEl.getBoundingClientRect();
    const pointer = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(floaters.map((item) => item.group), true)[0];
    const id = hit?.object.userData.floaterId as string | undefined;
    return id ? (floaters.find((item) => item.id === id) ?? null) : null;
  }

  function idleDist() {
    return camera.aspect < 1 ? Math.min(17, (10.5 / Math.max(camera.aspect, 0.55)) * 0.82) : 10.5;
  }

  function inspectDist() {
    return camera.aspect < 1 ? 7.4 : 6.2;
  }

  function panelFrac() {
    if (camera.aspect < 1) return 0;
    return Math.min(400, root.clientWidth * 0.42) / Math.max(root.clientWidth, 1);
  }

  function stageFrustum() {
    const mobile = camera.aspect < 1;
    const vFov = (camera.fov * Math.PI) / 180;
    const objectZ = mobile ? 0.85 : 1.2;
    const zFromCam = inspectDist() - objectZ;
    const h = 2 * Math.tan(vFov / 2) * zFromCam;
    const w = h * camera.aspect;
    return { mobile, objectZ, h, w, panel: panelFrac() };
  }

  function stagePos() {
    const { mobile, objectZ, h, w, panel } = stageFrustum();
    const ndcX = mobile ? 0 : -(panel + 0.2);
    const ndcY = mobile ? 0.28 : 0.04;
    stage.set(ndcX * (w / 2), ndcY * (h / 2), objectZ);
    return stage;
  }

  function inspectScale(span: number) {
    const { mobile, h, w, panel } = stageFrustum();
    const regionW = w * (1 - panel) * 0.58;
    const regionH = h * (mobile ? 0.46 : 0.62);
    return Math.min(1.4, regionW / span, regionH / span);
  }

  view.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    press = { x: e.clientX, y: e.clientY };
  }, { signal });

  let lastHoverAt = 0;
  view.addEventListener('pointermove', (e) => {
    const now = performance.now();
    if (now - lastHoverAt < 80) return;
    lastHoverAt = now;
    if (focusId) {
      view.style.cursor = 'pointer';
      hoverId = null;
      return;
    }
    const floater = pick(e.clientX, e.clientY);
    hoverId = floater?.id ?? null;
    view.style.cursor = floater ? 'pointer' : 'default';
  }, { signal });

  view.addEventListener('pointerup', (e) => {
    if (!press) return;
    const moved = Math.hypot(e.clientX - press.x, e.clientY - press.y);
    press = null;
    if (moved > 10) return;
    if (e.target instanceof Element && e.target.closest('[data-world-panel], [data-world-rail], a, button')) return;
    const floater = pick(e.clientX, e.clientY);
    if (floater) focus(floater.id);
    else if (focusId) unfocus();
  }, { signal });

  view.addEventListener('pointerleave', () => {
    hoverId = null;
    view.style.cursor = 'default';
  }, { signal });

  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const target = e.target as Element | null;
    const typing = Boolean(target?.closest('input, textarea, select, [contenteditable="true"]'));
    if (e.key === 'Escape' && focusId && !typing) return unfocus();
    if (!focusId || typing) return;
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const world = floaters.find((item) => item.id === focusId)?.world;
    if (!world || world.aspects.length < 2) return;
    e.preventDefault();
    const next = (aspectIndex + (e.key === 'ArrowRight' ? 1 : -1) + world.aspects.length) % world.aspects.length;
    renderPanel(world, next);
    history.replaceState({ float: focusId }, '', `#${world.aspects[next]?.id ?? world.id}`);
  }, { signal });
  addEventListener('hashchange', () => {
    const id = decodeURIComponent(location.hash.replace(/^#/, ''));
    // Back (or Forward) to a hashless URL closes the world; the URL has
    // already changed, so unfocus must not push another history entry.
    if (!id) return unfocus(false);
    const byAspect = worlds.find((world) => world.aspects.some((aspect) => aspect.id === id));
    if (byAspect) focus(byAspect.id, id, false);
    else if (worlds.some((world) => world.id === id)) focus(id, undefined, false);
  }, { signal });
  addEventListener('world:home', () => unfocus(), { signal });

  // Phones: the name sits at the top, so the worlds go in a 3-column grid
  // in the band between the intro and the rail instead of a ring around it.
  const phoneOrder = ['work', 'localhost', 'projects', 'hait', 'phonecoding', 'study', 'd22soso', 'play'];
  function layoutHomes(width: number, height: number) {
    if (camera.aspect >= 1) {
      for (const floater of floaters) {
        floater.home.copy(floater.deskHome);
        floater.homeScale = floater.deskScale;
        floater.label = floater.deskLabel;
      }
      return;
    }
    const rootTop = root.getBoundingClientRect().top;
    const introBottom = intro ? intro.getBoundingClientRect().bottom - rootTop : height * 0.4;
    const railEl = root.querySelector<HTMLElement>('.world-intro-hint') ?? rail;
    const railTop = railEl ? railEl.getBoundingClientRect().top - rootTop : height * 0.85;
    const top = Math.min(height * 0.6, introBottom + 12);
    const bottom = Math.max(top + 160, railTop - 8);
    const rows = Math.ceil(phoneOrder.length / 3);
    const rowH = (bottom - top) / rows;
    const vFov = (camera.fov * Math.PI) / 180;
    const dist = idleDist();
    phoneOrder.forEach((id, i) => {
      const floater = floaters.find((item) => item.id === id);
      if (!floater) return;
      const row = Math.floor(i / 3);
      const inRow = Math.min(3, phoneOrder.length - row * 3);
      const col = i % 3;
      const px = width * ((col + 0.5 + (3 - inRow) / 2) / 3);
      // Leave the upper part of each cell for the label.
      const py = top + rowH * (row + 0.64);
      const z = 0;
      const halfH = Math.tan(vFov / 2) * (dist - z);
      const halfW = halfH * camera.aspect;
      floater.home.set(((px / width) * 2 - 1) * halfW, (1 - (py / height) * 2) * halfH, z);
      const unit = (2 * halfH) / height; // world units per CSS pixel
      const fit = Math.min((width / 3) * 0.62, rowH * 0.58) * unit;
      floater.homeScale = Math.min(floater.deskScale, fit / floater.span);
      floater.label = [0, rowH * 0.27 * unit];
    });
  }

  // Labels must never sit on the name, photo, or hiring button.
  let keepouts: DOMRect[] = [];
  let keepoutAt = 0;
  const labelSize = new Map<string, { w: number; h: number }>();
  function refreshKeepouts(now: number) {
    if (now - keepoutAt < 500) return;
    keepoutAt = now;
    const rootRect = root.getBoundingClientRect();
    keepouts = [...root.querySelectorAll<HTMLElement>('.world-intro > *')]
      .map((el) => el.getBoundingClientRect())
      .filter((r) => r.width > 0 && r.height > 0)
      .map((r) => new DOMRect(r.left - rootRect.left - 6, r.top - rootRect.top - 6, r.width + 12, r.height + 12));
    labelSize.clear();
  }
  const overlaps = (a: DOMRect, b: DOMRect) =>
    a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;

  function resize() {
    const width = root.clientWidth || 1;
    const height = root.clientHeight || 1;
    camera.aspect = width / height;
    targetDist = focusId ? inspectDist() : idleDist();
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    layoutHomes(width, height);
    keepoutAt = 0;
  }

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(root);
  resize();

  const hashId = decodeURIComponent(location.hash.replace(/^#/, ''));
  const startWorld = worlds.find((world) => world.id === hashId || world.aspects.some((aspect) => aspect.id === hashId));
  if (startWorld) focus(startWorld.id, hashId);

  let skipEnter = reduced || Boolean(startWorld);
  const born = performance.now();
  const enterAt = new Map(
    ['work', 'hait', 'localhost', 'projects', 'phonecoding', 'study', 'd22soso', 'play'].map((id, index) => [id, index]),
  );
  const settled = new Set<string>();
  function arrive(now: number, index: number) {
    if (skipEnter || focusId) return 1;
    const u = Math.min(1, Math.max(0, (now - born - 120 - index * 70) / 880));
    return 1 - (1 - u) ** 3;
  }
  if (!skipEnter) {
    camera.position.z = 13.6;
    yaw = -0.46;
    for (const floater of floaters) {
      floater.group.scale.setScalar(floater.homeScale * 0.62);
      floater.group.position.set(floater.home.x * 1.46, floater.home.y * 1.46 - 0.15, floater.home.z - 2.1);
      floater.anchor.copy(floater.group.position);
      for (const { mat } of floater.mats) {
        mat.opacity = 0;
        mat.transparent = true;
        mat.depthWrite = false;
      }
    }
  }

  const projected = new THREE.Vector3();
  function placeLabels() {
    const width = root.clientWidth;
    const height = root.clientHeight;
    const now = performance.now();
    refreshKeepouts(now);
    const placed: { button: HTMLButtonElement; rect: DOMRect }[] = [];
    for (const floater of floaters) {
      const button = labels.get(floater.id);
      if (!button) continue;
      if (focusId) {
        button.hidden = true;
        continue;
      }
      const [lx, ly] = floater.label;
      projected.set(floater.group.position.x + lx, floater.group.position.y + ly, floater.group.position.z);
      galaxy.localToWorld(projected);
      projected.project(camera);
      if (projected.z > 1) {
        button.hidden = true;
        continue;
      }
      button.hidden = false;
      const k = arrive(now, enterAt.get(floater.id) ?? 0);
      let size = labelSize.get(floater.id);
      if (!size || !size.w) {
        size = { w: button.offsetWidth, h: button.offsetHeight };
        labelSize.set(floater.id, size);
      }
      const half = Math.max(64, size.w / 2 + 6);
      let x = Math.min(width - half, Math.max(half, (projected.x * 0.5 + 0.5) * width));
      let y = Math.min(height - 88, Math.max(76, (-projected.y * 0.5 + 0.5) * height));
      // (x, y) is the label's bottom centre. Slide it off the intro, then off
      // any label already placed, by the shortest vertical move.
      const rectAt = () => new DOMRect(x - size.w / 2, y - size.h, size.w, size.h);
      for (let pass = 0; pass < 3; pass++) {
        const rect = rectAt();
        const hit = keepouts.find((r) => overlaps(rect, r)) ?? placed.find((p) => overlaps(rect, p.rect))?.rect;
        if (!hit) break;
        const up = hit.top - 2;
        const down = hit.bottom + size.h + 2;
        y = Math.abs(up - y) <= Math.abs(down - y) ? up : down;
      }
      placed.push({ button, rect: rectAt() });
      button.style.opacity = k < 1 ? String(Math.max(0, (k - 0.45) / 0.55)) : '';
      button.style.transform = `translate(${x}px, ${y}px) translate(-50%, -100%)`;
      button.classList.toggle('is-on', focusId === floater.id);
    }
  }

  function frame(now: number) {
    if (!running) return;
    const t = now * 0.001;
    if (!focusId && !reduced) {
      targetYaw = Math.sin(t * 0.07) * 0.16;
      targetPitch = Math.sin(t * 0.05) * 0.05;
    } else {
      targetYaw = 0;
      targetPitch = 0;
    }
    const introK = skipEnter || focusId ? 1 : arrive(now, 0);
    targetDist = (focusId ? inspectDist() : idleDist()) + (focusId ? 0 : (1 - introK) * 2.8);
    yaw += (targetYaw - yaw) * (focusId ? 0.14 : 0.06);
    pitch += (targetPitch - pitch) * (focusId ? 0.14 : 0.06);
    rim.intensity += (((document.documentElement.dataset.theme === 'light' ? 0.28 : 0.55) * (focusId ? 1.35 : 1)) - rim.intensity) * 0.08;
    galaxy.rotation.y = yaw;
    galaxy.rotation.x = pitch;
    camera.position.z += (targetDist - camera.position.z) * 0.08;
    const held = focusId ? stagePos() : null;
    if (held) lookTo.set(held.x + 0.85, held.y * 0.35, 0);
    else lookTo.set(0, 0, 0);
    look.lerp(lookTo, reduced ? 1 : 0.12);
    camera.lookAt(look);

    for (const floater of floaters) {
      const k = skipEnter || focusId ? 1 : arrive(now, enterAt.get(floater.id) ?? 0);
      const inspecting = focusId === floater.id;
      const hovering = hoverId === floater.id && !focusId;
      if (!focusId && k < 1) {
        const spread = 1 + (1 - k) * 0.46;
        floater.group.position.set(
          floater.home.x * spread,
          floater.home.y * spread - (1 - k) * 0.15,
          floater.home.z - (1 - k) * 2.1,
        );
        floater.anchor.copy(floater.group.position);
        for (const { mat, base } of floater.mats) {
          mat.opacity = base * k;
          mat.transparent = true;
          mat.depthWrite = false;
        }
      } else {
        if (!settled.has(floater.id)) {
          settled.add(floater.id);
          if (!focusId) {
            for (const { mat, base } of floater.mats) {
              mat.opacity = base;
              mat.transparent = Boolean(mat.userData.keepTransparent) || base < 0.99;
              mat.depthWrite = true;
            }
          }
        }
        const dest = inspecting && held ? held : floater.home;
        floater.anchor.lerp(dest, reduced ? 1 : inspecting || focusId ? 0.12 : 0.09);
        const drift = reduced || inspecting ? 0 : focusId ? 0.08 : hovering ? 0.35 : 1;
        const fx = Math.sin(t * 0.4 + floater.phase) * 0.16 * drift;
        const fy = Math.cos(t * 0.33 + floater.phase * 1.3) * 0.13 * drift + (hovering ? 0.14 : 0);
        floater.group.position.set(floater.anchor.x + fx, floater.anchor.y + fy, floater.anchor.z);
      }
      const drift = reduced || inspecting || k < 1 ? 0 : focusId ? 0.08 : hovering ? 0.35 : 1;
      let wantScale = inspecting ? inspectScale(floater.span) : hovering ? floater.homeScale * 1.06 : focusId ? floater.homeScale * 0.9 : floater.homeScale;
      if (!focusId) wantScale *= 0.62 + 0.38 * k;
      scaleTo.setScalar(wantScale);
      floater.group.scale.lerp(scaleTo, reduced ? 1 : k < 1 ? 0.22 : 0.14);
      const restY = (floater.group.userData.restY as number | undefined) ?? 0;
      const restZ = (floater.group.userData.restZ as number | undefined) ?? 0;
      if (inspecting && floater.group.userData.faceCam) {
        const dx = camera.position.x - floater.group.position.x;
        const dz = camera.position.z - floater.group.position.z;
        floater.group.rotation.y = Math.atan2(dx, dz);
        floater.group.rotation.z = 0;
      } else if (inspecting) {
        floater.group.rotation.y = restY + Math.sin(t * 0.45) * 0.07;
        floater.group.rotation.z = restZ;
      } else {
        floater.group.rotation.y = restY + Math.sin(t * 0.25 + floater.phase) * 0.08 * drift + (1 - k) * 0.4;
        floater.group.rotation.z = restZ + Math.sin(t * 0.2 + floater.phase) * 0.03 * drift;
      }
      const sats = floater.group.userData.sats as THREE.Object3D[] | undefined;
      sats?.forEach((sat, i) => {
        sat.position.y = (sat.userData.baseY as number) + Math.sin(t * 0.8 + floater.phase + i * 2) * 0.06 * drift;
      });
      const glows = floater.group.userData.glows as THREE.MeshStandardMaterial[] | undefined;
      glows?.forEach((material, i) => {
        const base = (material.userData.baseEmit as number) ?? 0.55;
        const lift = hovering ? 1.35 : inspecting ? 1.15 : 1;
        material.emissiveIntensity = base * lift * (0.72 + 0.28 * Math.sin(t * 2.1 + floater.phase + i) * (drift || 1));
      });
      const cards = floater.group.userData.cards as THREE.Object3D[] | undefined;
      cards?.forEach((card, i) => {
        const base = (card.userData.baseZ as number) ?? 0;
        card.rotation.z = base + Math.sin(t * 0.9 + i) * 0.05 * drift;
      });
      const lid = floater.group.userData.lid as THREE.Object3D | undefined;
      if (lid) lid.rotation.x = -0.55 + Math.sin(t * 0.5 + floater.phase) * 0.04 * drift;
    }
    galaxy.updateMatrixWorld(true);
    placeLabels();
    renderer.render(scene, camera);
  }
  let lastFrame = 0;
  function tick(now: number) {
    if (!running) return;
    if (!root.classList.contains('is-ready') && (skipEnter || now - born > 90)) root.classList.add('is-ready');
    if (now - lastFrame < 12) return;
    lastFrame = now;
    try {
      frame(now);
    } catch (err) {
      console.error(err);
    }
  }
  function loop(now: number) {
    tick(now);
    if (running) rafId = requestAnimationFrame(loop);
  }
  // The aside starts hidden in markup. Do not force it closed here —
  // a hash on load has already opened a world via `focus()`.
  let rafId = requestAnimationFrame(loop);
  const pulse = window.setInterval(() => tick(performance.now()), 32);
  const teardown = () => {
    if (!running) return;
    running = false;
    cancelAnimationFrame(rafId);
    window.clearInterval(pulse);
    resizeObserver.disconnect();
    ac.abort();
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      if (mesh.material) {
        for (const material of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
          const withMap = material as THREE.MeshBasicMaterial;
          if (withMap.map) withMap.map.dispose();
          material.dispose();
        }
      }
    });
    for (const tex of texCache.values()) tex.dispose();
    texCache.clear();
    renderer.dispose();
  };
  addEventListener('beforeunload', teardown, { once: true });
}
