/**
 * The Galaxy — the Developer's World, floating free.
 *
 * The name sits in the middle of a galaxy. The worlds are rectangular
 * stations drifting around it — not on orbit rings, not in a circle, each
 * wandering gently around its own anchor in deep space. A small dragon
 * drifts with them.
 *
 * Everything can be grabbed: press a world (or the dragon), drag it
 * somewhere else, and let go — it stays there and keeps floating around
 * its new home. A click without a drag opens the world's panel. Dragging
 * empty space turns the whole galaxy a little. Scroll zooms.
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

function mat(color: string, roughness = 0.55) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.15 });
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

/** A rectangular station: framed photograph, accent spine, satellite blocks. */
function buildStation(world: FloatWorld) {
  const group = new THREE.Group();
  const s = world.scale;
  put(group, box(2.5 * s, 1.7 * s, 0.16, '#10141d', 0.5), 0, 0, -0.1);
  put(group, box(2.66 * s, 0.14, 0.3, '#1d2534', 0.45), 0, 0.92 * s, -0.05);
  put(group, box(0.14, 1.7 * s, 0.24, '#1d2534', 0.45), -1.28 * s, 0, -0.05);
  put(group, box(0.14, 1.7 * s, 0.24, '#1d2534', 0.45), 1.28 * s, 0, -0.05);
  const spine = new THREE.Mesh(
    new THREE.BoxGeometry(2.5 * s, 0.08, 0.05),
    new THREE.MeshBasicMaterial({ color: world.accent }),
  );
  put(group, spine, 0, 0.8 * s, 0.0);
  group.userData.spine = spine;

  const art = world.aspects[0]?.art;
  if (art) {
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(2.3 * s, 1.42 * s),
      new THREE.MeshBasicMaterial({ map: photoTexture(art.src), toneMapped: false }),
    );
    face.name = 'face';
    put(group, face, 0, -0.02, 0.0);
  }
  // Two small satellite blocks, bobbing beside the frame (never orbiting).
  const satA = put(group, box(0.3 * s, 0.3 * s, 0.3 * s, '#232c3e', 0.4), -1.62 * s, 0.55 * s, 0.1);
  const satB = put(group, box(0.2 * s, 0.2 * s, 0.2 * s, world.accent, 0.35), 1.58 * s, -0.5 * s, 0.15);
  group.userData.sats = [satA, satB];
  return group;
}

/** The dragon: boxes and cones, gold and green. It is a free object too. */
function buildDragon() {
  const dragon = new THREE.Group();
  const green = '#2e7d5b';
  const gold = '#e0b15c';
  put(dragon, box(0.62, 0.22, 0.2, green, 0.5), 0, 0, 0);
  put(dragon, box(0.26, 0.24, 0.22, green, 0.5), 0.42, 0.1, 0);
  put(dragon, box(0.18, 0.1, 0.14, gold, 0.4), 0.6, 0.04, 0);
  for (const zSide of [-0.07, 0.07]) {
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.22, 5), mat(gold, 0.35));
    horn.position.set(0.36, 0.3, zSide);
    horn.rotation.z = -0.35;
    dragon.add(horn);
    const eye = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.03), new THREE.MeshBasicMaterial({ color: '#ffffff' }));
    eye.position.set(0.52, 0.16, zSide * 1.6);
    dragon.add(eye);
  }
  const wingGeo = new THREE.BoxGeometry(0.42, 0.03, 0.3);
  const wingL = new THREE.Mesh(wingGeo, mat(gold, 0.45));
  wingL.position.set(-0.05, 0.14, -0.24);
  const wingR = new THREE.Mesh(wingGeo, mat(gold, 0.45));
  wingR.position.set(-0.05, 0.14, 0.24);
  dragon.add(wingL, wingR);
  dragon.userData.wings = [wingL, wingR];
  let tailX = -0.42;
  for (const size of [0.16, 0.12, 0.08]) {
    put(dragon, box(size * 1.6, size, size, green, 0.55), tailX, 0.02, 0);
    tailX -= size * 1.7;
  }
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.24, 4), mat(gold, 0.35));
  tip.position.set(tailX - 0.05, 0.04, 0);
  tip.rotation.z = Math.PI / 2;
  dragon.add(tip);
  for (const [x, z] of [[0.18, -0.1], [0.18, 0.1], [-0.18, -0.1], [-0.18, 0.1]] as const) {
    put(dragon, box(0.06, 0.16, 0.06, green, 0.6), x, -0.17, z);
  }
  dragon.scale.setScalar(0.85);
  return dragon;
}

type Floater = {
  id: string;
  group: THREE.Group;
  anchor: THREE.Vector3;
  home: THREE.Vector3;
  phase: number;
  world?: FloatWorld;
};

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
  const renderer = new THREE.WebGLRenderer({ canvas: view, antialias: true });
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 140);
  camera.position.set(0, 0, 9.5);

  const applyTheme = () => {
    const light = document.documentElement.dataset.theme === 'light';
    const bg = new THREE.Color(light ? 0xdfe4ee : 0x04060d);
    scene.background = bg;
    scene.fog = new THREE.Fog(bg, 14, 34);
  };
  applyTheme();
  document.documentElement.addEventListener('themechange', applyTheme);

  scene.add(new THREE.AmbientLight(0x8fa3c4, 0.8));
  const sun = new THREE.DirectionalLight(0xfff1d8, 1.5);
  sun.position.set(6, 10, 8);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0x7aa2ff, 0.45);
  fill.position.set(-6, 4, 4);
  scene.add(fill);

  const galaxy = new THREE.Group();
  galaxy.rotation.order = 'YXZ';
  scene.add(galaxy);

  // Starfields: square points in a big box of space. Nebula washes off-axis.
  const laneDepth = 70;
  for (const [count, color, size] of [
    [900, 0xb9c7e6, 1.6],
    [260, 0xf0d7a0, 2.6],
  ] as const) {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = 8 - Math.random() * laneDepth;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    galaxy.add(new THREE.Points(geo, new THREE.PointsMaterial({ color, size, sizeAttenuation: false, fog: false })));
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
    const wash = new THREE.Mesh(
      new THREE.PlaneGeometry(s, s * 0.7),
      new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }),
    );
    wash.position.set(x, y, z);
    galaxy.add(wash);
  }

  const floaters: Floater[] = [];
  worlds.forEach((world, i) => {
    const group = buildStation(world);
    const anchor = new THREE.Vector3(world.position[0], world.position[1], -0.5 + (i % 3) * 0.45);
    group.position.copy(anchor);
    group.traverse((obj) => (obj.userData.floaterId = world.id));
    galaxy.add(group);
    floaters.push({ id: world.id, group, anchor, home: anchor.clone(), phase: i * 1.37, world });
  });

  const dragon = buildDragon();
  const dragonAnchor = new THREE.Vector3(1.7, -1.85, 1.1);
  dragon.position.copy(dragonAnchor);
  dragon.traverse((obj) => (obj.userData.floaterId = 'dragon'));
  galaxy.add(dragon);
  floaters.push({ id: 'dragon', group: dragon, anchor: dragonAnchor, home: dragonAnchor.clone(), phase: 4.2 });

  // Labels that ride along with each world.
  const labels = new Map<string, HTMLButtonElement>();
  for (const floater of floaters) {
    if (!floater.world) continue;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'world-label';
    button.dataset.go = floater.id;
    button.innerHTML = `<small>${esc(floater.world.kicker)}</small><strong>${esc(floater.world.name)}</strong>`;
    labelHost.append(button);
    labels.set(floater.id, button);
  }

  railEl.innerHTML = [
    ...worlds.map(
      (w) => `<button type="button" data-go="${esc(w.id)}"><small>${esc(w.when)}</small>${esc(w.rail)}</button>`,
    ),
    `<button type="button" data-go="dragon"><small>Free</small>Dragon</button>`,
    `<button type="button" data-reset><small>Drift</small>Reset positions</button>`,
  ].join('');

  let focusId: string | null = null;
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

  function renderPanel(world: FloatWorld, index: number) {
    const aspect = world.aspects[index] ?? world.aspects[0];
    if (!aspect) return;
    aspectIndex = world.aspects.indexOf(aspect);
    const ext = (href: string) => /^https?:\/\//.test(href);
    panelBodyEl.innerHTML = `
      <p class="world-kicker">${esc(world.kicker)} · ${esc(world.when)}</p>
      <h2 id="world-panel-title">${esc(aspect.title)}</h2>
      <p class="world-meta">${esc(world.place)}</p>
      ${aspect.art ? `<figure class="world-art"><img src="${esc(aspect.art.src)}" alt="${esc(aspect.art.alt)}" /></figure>` : ''}
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
  }

  function focus(id: string, aspectId?: string) {
    const floater = floaters.find((item) => item.id === id);
    if (!floater?.world) {
      if (id === 'dragon') {
        say('The dragon. Drag it anywhere; it floats there now.');
        dragonSpin = 1;
      }
      return;
    }
    focusId = id;
    const index = Math.max(
      0,
      floater.world.aspects.findIndex((aspect) => aspect.id === (aspectId ?? floater.world?.aspects[0]?.id)),
    );
    renderPanel(floater.world, index);
    root.classList.add('is-in');
    const hash = `#${floater.world.aspects[index]?.id ?? id}`;
    if (location.hash !== hash) history.pushState({ float: id }, '', hash);
  }

  function unfocus() {
    focusId = null;
    panelEl.hidden = true;
    root.classList.remove('is-in');
    railEl.querySelectorAll('[aria-current]').forEach((el) => el.removeAttribute('aria-current'));
    if (location.hash) history.pushState({ float: null }, '', location.pathname);
    say('The galaxy.');
  }

  root.addEventListener('click', (e) => {
    const el = e.target as Element;
    if (el.closest('[data-close-panel]')) return unfocus();
    const step = el.closest<HTMLElement>('[data-step]');
    if (step && focusId) {
      const world = floaters.find((item) => item.id === focusId)?.world;
      if (world) renderPanel(world, (aspectIndex + Number(step.dataset.step) + world.aspects.length) % world.aspects.length);
      return;
    }
    if (el.closest('[data-reset]')) {
      for (const floater of floaters) floater.anchor.copy(floater.home);
      unfocus();
      say('Everything drifts home.');
      return;
    }
    const go = el.closest<HTMLElement>('[data-go]');
    if (go?.dataset.go) focus(go.dataset.go);
  });

  // --- Grab, drag, click -------------------------------------------------
  const raycaster = new THREE.Raycaster();
  const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const hitPoint = new THREE.Vector3();
  let drag: {
    floater: Floater;
    offset: THREE.Vector3;
    startX: number;
    startY: number;
    moved: number;
  } | null = null;
  let spinDragon = 0;
  let dragonSpin = 0;
  let bgDrag: { x: number; y: number; yaw: number; pitch: number } | null = null;

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

  view.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    view.setPointerCapture(e.pointerId);
    const floater = pick(e.clientX, e.clientY);
    if (floater) {
      dragPlane.set(new THREE.Vector3(0, 0, 1), -floater.group.getWorldPosition(new THREE.Vector3()).z);
      const hit = raycaster.ray.intersectPlane(dragPlane, hitPoint);
      drag = {
        floater,
        offset: hit ? floater.group.position.clone().sub(galaxy.worldToLocal(hit.clone())) : new THREE.Vector3(),
        startX: e.clientX,
        startY: e.clientY,
        moved: 0,
      };
      root.classList.add('is-dragging');
    } else {
      bgDrag = { x: e.clientX, y: e.clientY, yaw: targetYaw, pitch: targetPitch };
    }
  });

  view.addEventListener('pointermove', (e) => {
    if (drag) {
      drag.moved = Math.max(drag.moved, Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY));
      const rect = viewEl.getBoundingClientRect();
      const pointer = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.ray.intersectPlane(dragPlane, hitPoint);
      if (hit) {
        const local = galaxy.worldToLocal(hit.clone()).add(drag.offset);
        drag.floater.anchor.set(
          Math.max(-6.4, Math.min(6.4, local.x)),
          Math.max(-3.6, Math.min(3.6, local.y)),
          drag.floater.anchor.z,
        );
      }
      return;
    }
    if (bgDrag) {
      targetYaw = Math.max(-0.4, Math.min(0.4, bgDrag.yaw + (e.clientX - bgDrag.x) * 0.0022));
      targetPitch = Math.max(-0.25, Math.min(0.25, bgDrag.pitch + (e.clientY - bgDrag.y) * 0.0016));
      return;
    }
    view.style.cursor = pick(e.clientX, e.clientY) ? 'pointer' : 'grab';
  });

  const endPointer = (e: PointerEvent) => {
    if (drag) {
      const { floater, moved } = drag;
      drag = null;
      root.classList.remove('is-dragging');
      if (moved < 6) {
        if (floater.id === 'dragon') {
          dragonSpin = 1;
          say('The dragon does a slow roll. Drag it to a new spot whenever you like.');
        } else {
          focus(floater.id);
        }
      } else {
        say(`${floater.id === 'dragon' ? 'The dragon' : (floater.world?.name ?? floater.id)} floats here now.`);
      }
    }
    bgDrag = null;
    void e;
  };
  view.addEventListener('pointerup', endPointer);
  view.addEventListener('pointercancel', endPointer);

  root.addEventListener(
    'wheel',
    (e) => {
      if (e.target instanceof Element && e.target.closest('[data-world-panel], [data-world-rail]')) return;
      e.preventDefault();
      targetDist = Math.max(6, Math.min(12.5, targetDist + Math.sign(e.deltaY) * 0.35));
    },
    { passive: false },
  );

  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'Escape' && focusId) return unfocus();
    const active = floaters.find((item) => item.id === (focusId ?? 'dragon'));
    if (!active) return;
    const step = 0.25;
    if (e.key === 'ArrowLeft') active.anchor.x = Math.max(-6.4, active.anchor.x - step);
    if (e.key === 'ArrowRight') active.anchor.x = Math.min(6.4, active.anchor.x + step);
    if (e.key === 'ArrowUp') active.anchor.y = Math.min(3.6, active.anchor.y + step);
    if (e.key === 'ArrowDown') active.anchor.y = Math.max(-3.6, active.anchor.y - step);
  });
  addEventListener('hashchange', () => {
    const id = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (!id) return;
    const byAspect = worlds.find((world) => world.aspects.some((aspect) => aspect.id === id));
    if (byAspect) focus(byAspect.id, id);
    else if (worlds.some((world) => world.id === id)) focus(id);
  });
  addEventListener('world:home', () => unfocus());

  function resize() {
    const width = root.clientWidth || 1;
    const height = root.clientHeight || 1;
    camera.aspect = width / height;
    // Narrow screens get a wider view so the floating worlds stay in frame.
    targetDist = camera.aspect < 1 ? Math.min(17, (10.5 / Math.max(camera.aspect, 0.55)) * 0.82) : 10.5;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
  }
  new ResizeObserver(resize).observe(root);
  resize();

  const hashId = decodeURIComponent(location.hash.replace(/^#/, ''));
  const startWorld = worlds.find((world) => world.id === hashId || world.aspects.some((aspect) => aspect.id === hashId));
  if (startWorld) focus(startWorld.id, hashId);

  const projected = new THREE.Vector3();
  function placeLabels() {
    const width = root.clientWidth;
    const height = root.clientHeight;
    for (const floater of floaters) {
      const button = labels.get(floater.id);
      if (!button) continue;
      if (focusId && focusId !== floater.id) {
        button.hidden = true;
        continue;
      }
      floater.group.getWorldPosition(projected).project(camera);
      if (projected.z > 1) {
        button.hidden = true;
        continue;
      }
      button.hidden = false;
      const x = (projected.x * 0.5 + 0.5) * width;
      const y = (-projected.y * 0.5 + 0.5) * height;
      button.style.transform = `translate(${x}px, ${y - 95 * floater.group.scale.y}px) translate(-50%, -100%)`;
      button.classList.toggle('is-on', focusId === floater.id);
    }
  }

  function frame(now: number) {
    if (!running) return;
    const t = now * 0.001;
    yaw += (targetYaw - yaw) * 0.06;
    pitch += (targetPitch - pitch) * 0.06;
    galaxy.rotation.y = yaw;
    galaxy.rotation.x = pitch;
    camera.position.z += (targetDist - camera.position.z) * 0.07;
    camera.lookAt(0, 0, 0);

    for (const floater of floaters) {
      const isDragged = drag?.floater === floater;
      const drift = reduced || isDragged ? 0 : 1;
      const fx = Math.sin(t * 0.4 + floater.phase) * 0.16 * drift;
      const fy = Math.cos(t * 0.33 + floater.phase * 1.3) * 0.13 * drift;
      floater.group.position.set(floater.anchor.x + fx, floater.anchor.y + fy, floater.anchor.z);
      floater.group.rotation.y = Math.sin(t * 0.25 + floater.phase) * 0.08 * drift;
      floater.group.rotation.z = Math.sin(t * 0.2 + floater.phase) * 0.03 * drift;
      const sats = floater.group.userData.sats as THREE.Object3D[] | undefined;
      sats?.forEach((sat, i) => {
        sat.position.y += Math.sin(t * 0.8 + floater.phase + i * 2) * 0.0009 * drift;
      });
      const dimmed = focusId !== null && focusId !== floater.id;
      floater.group.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (!mesh.isMesh) return;
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        for (const material of materials) {
          if (material.userData.baseOpacity === undefined) material.userData.baseOpacity = material.opacity;
          const base = material.userData.baseOpacity as number;
          material.opacity = base * (dimmed ? 0.35 : 1);
          material.transparent = material.opacity < 0.99;
        }
      });
    }
    // The dragon flaps, and does a slow roll after a click.
    const wings = dragon.userData.wings as THREE.Object3D[];
    if (wings && !reduced) {
      const flap = Math.sin(t * 3.2) * 0.45;
      wings[0].rotation.x = flap;
      wings[1].rotation.x = -flap;
    }
    if (dragonSpin > 0) {
      spinDragon += 0.045;
      dragon.rotation.z = spinDragon;
      if (spinDragon >= Math.PI * 2) {
        spinDragon = 0;
        dragon.rotation.z = 0;
        dragonSpin = 0;
      }
    }
    if (intro) intro.style.opacity = focusId ? '0' : '1';
    galaxy.updateMatrixWorld(true);
    placeLabels();
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  panelEl.hidden = true;
  root.classList.add('is-ready');
  requestAnimationFrame(frame);
  addEventListener('pagehide', () => {
    running = false;
    renderer.dispose();
  });
}
