/**
 * The system map: wires between boxes, data packets flowing along them,
 * tracing a flow on hover, case studies in a side panel, and boxes you can
 * drag around (they spring back). Everything readable is plain HTML; this
 * only adds the wires and the motion.
 */
type Edge = { from: string; to: string; label?: string; style?: 'test' };
type Flows = {
  lanes: Record<string, Edge[]>;
  nodes: Record<string, { lane: string; detail: boolean }>;
  /** Old links: ids from the retired town and 3D sky, and renamed ids. */
  toTown: string[];
  alias: Record<string, string>;
};

type Wire = {
  edge: Edge;
  path: SVGPathElement;
  glow: SVGPathElement;
  text: SVGTextElement | null;
  len: number;
  dots: SVGCircleElement[];
  phase: number[];
};

type LaneState = {
  id: string;
  el: HTMLElement;
  body: HTMLElement;
  svg: SVGSVGElement;
  nodes: Map<string, HTMLElement>;
  wires: Wire[];
  speed: number;
  visible: boolean;
};

const NS = 'http://www.w3.org/2000/svg';

type Box = { left: number; top: number; right: number; bottom: number; cx: number; cy: number; w: number; h: number };

function boxOf(el: HTMLElement, base: DOMRect): Box {
  const r = el.getBoundingClientRect();
  const left = r.left - base.left;
  const top = r.top - base.top;
  return { left, top, right: left + r.width, bottom: top + r.height, cx: left + r.width / 2, cy: top + r.height / 2, w: r.width, h: r.height };
}

/** A smooth wire from a to b that avoids running through the boxes between them. */
function route(a: Box, b: Box, others: Box[], width: number): string {
  // side by side: leave from the right edge, arrive at the left edge
  if (b.left >= a.right - 2) {
    const sx = a.right;
    const sy = a.cy;
    const ex = b.left - 6;
    const ey = b.cy;
    const k = Math.max(18, (ex - sx) * 0.5);
    return `M${sx},${sy} C${sx + k},${sy} ${ex - k},${ey} ${ex},${ey}`;
  }
  if (b.right <= a.left + 2) {
    const sx = a.left;
    const sy = a.cy;
    const ex = b.right + 6;
    const ey = b.cy;
    const k = Math.max(18, (sx - ex) * 0.5);
    return `M${sx},${sy} C${sx - k},${sy} ${ex + k},${ey} ${ex},${ey}`;
  }
  // stacked: go straight down when nothing is in the way
  const between = others.some((o) => o.top >= Math.min(a.bottom, b.bottom) - 1 && o.bottom <= Math.max(a.top, b.top) + 1 && o.right > Math.max(a.left, b.left) && o.left < Math.min(a.right, b.right));
  if (b.top >= a.bottom - 2 && !between) {
    const sx = a.cx;
    const sy = a.bottom;
    const ex = b.cx;
    const ey = b.top - 6;
    const k = Math.max(10, (ey - sy) * 0.5);
    return `M${sx},${sy} C${sx},${sy + k} ${ex},${ey - k} ${ex},${ey}`;
  }
  // otherwise loop out along the right-hand gutter
  const gx = Math.min(width - 4, Math.max(a.right, b.right) + 20);
  const sx = a.right;
  const sy = a.cy;
  const ex = b.right + 6;
  const ey = b.cy;
  return `M${sx},${sy} C${gx},${sy} ${gx},${ey} ${ex},${ey}`;
}

export function mountSystem(root: HTMLElement) {
  const data = JSON.parse(document.getElementById('sys-flows')?.textContent ?? '{}') as Flows;
  const panel = root.querySelector<HTMLElement>('[data-panel]');
  const panelBody = root.querySelector<HTMLElement>('[data-panel-body]');
  const scrim = root.querySelector<HTMLElement>('[data-scrim]');
  if (!panel || !panelBody || !scrim) return;

  root.classList.add('is-live');
  const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = reducedQuery.matches;
  reducedQuery.addEventListener('change', () => (reduced = reducedQuery.matches));
  const fine = matchMedia('(pointer: fine)').matches;

  // ---------------------------------------------------------------- wires

  const lanes: LaneState[] = [];
  root.querySelectorAll<HTMLElement>('[data-lane]').forEach((el) => {
    const id = el.dataset.lane!;
    const body = el.querySelector<HTMLElement>('[data-lane-body]');
    const svg = el.querySelector<SVGSVGElement>('[data-wires]');
    if (!body || !svg) return;
    const nodes = new Map<string, HTMLElement>();
    body.querySelectorAll<HTMLElement>('[data-node]').forEach((n) => nodes.set(n.dataset.node!, n));
    const defs = document.createElementNS(NS, 'defs');
    defs.innerHTML = `<marker id="arrow-${id}" viewBox="0 0 8 8" refX="1" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z" class="sys-arrow"/></marker>`;
    svg.append(defs);
    const wires: Wire[] = (data.lanes[id] ?? []).map((edge, i) => {
      const glow = document.createElementNS(NS, 'path');
      glow.setAttribute('class', 'sys-wire-glow');
      const path = document.createElementNS(NS, 'path');
      path.setAttribute('class', `sys-wire${edge.style === 'test' ? ' is-test' : ''}`);
      path.setAttribute('marker-end', `url(#arrow-${id})`);
      svg.append(glow, path);
      let text: SVGTextElement | null = null;
      if (edge.label) {
        text = document.createElementNS(NS, 'text');
        text.setAttribute('class', 'sys-wire-label');
        text.textContent = edge.label;
        svg.append(text);
      }
      const count = edge.style === 'test' ? 1 : 2;
      const dots = Array.from({ length: count }, () => {
        const c = document.createElementNS(NS, 'circle');
        c.setAttribute('r', '3');
        c.setAttribute('class', 'sys-packet');
        svg.append(c);
        return c;
      });
      return { edge, path, glow, text, len: 0, dots, phase: dots.map((_, k) => (k / count + i * 0.17) % 1) };
    });
    lanes.push({ id, el, body, svg, nodes, wires, speed: id === 'stealth' ? 150 : id === 'goldman' ? 95 : 70, visible: true });
  });

  function layout(lane: LaneState) {
    const base = lane.body.getBoundingClientRect();
    lane.svg.setAttribute('width', String(base.width));
    lane.svg.setAttribute('height', String(base.height));
    lane.svg.setAttribute('viewBox', `0 0 ${base.width} ${base.height}`);
    const boxes = new Map<string, Box>();
    lane.nodes.forEach((el, id) => boxes.set(id, boxOf(el, base)));
    for (const w of lane.wires) {
      const a = boxes.get(w.edge.from);
      const b = boxes.get(w.edge.to);
      if (!a || !b) continue;
      const others = [...boxes.entries()].filter(([k]) => k !== w.edge.from && k !== w.edge.to).map(([, v]) => v);
      const d = route(a, b, others, base.width);
      w.path.setAttribute('d', d);
      w.glow.setAttribute('d', d);
      w.len = w.path.getTotalLength();
      if (w.text) {
        const mid = w.path.getPointAtLength(w.len / 2);
        w.text.setAttribute('x', String(mid.x));
        w.text.setAttribute('y', String(mid.y - 6));
      }
    }
  }
  const layoutAll = () => lanes.forEach(layout);

  // ---------------------------------------------------------------- trace a flow

  function connected(lane: LaneState, start: string) {
    const seen = new Set([start]);
    const edges = new Set<Wire>();
    // walk downstream, then upstream, so you see where data comes from and goes
    for (const dir of ['down', 'up'] as const) {
      const stack = [start];
      while (stack.length) {
        const cur = stack.pop()!;
        for (const w of lane.wires) {
          const next = dir === 'down' ? (w.edge.from === cur ? w.edge.to : null) : w.edge.to === cur ? w.edge.from : null;
          if (!next) continue;
          edges.add(w);
          if (!seen.has(next)) {
            seen.add(next);
            stack.push(next);
          }
        }
      }
    }
    return { nodes: seen, edges };
  }

  let traced: LaneState | null = null;
  function trace(lane: LaneState | null, id: string | null) {
    if (traced) {
      traced.el.classList.remove('is-tracing');
      traced.nodes.forEach((n) => n.classList.remove('is-lit'));
      traced.wires.forEach((w) => w.path.parentElement && [w.path, w.glow, w.text].forEach((x) => x?.classList.remove('is-lit')));
      traced = null;
    }
    if (!lane || !id) return;
    const hit = connected(lane, id);
    lane.el.classList.add('is-tracing');
    hit.nodes.forEach((nid) => lane.nodes.get(nid)?.classList.add('is-lit'));
    hit.edges.forEach((w) => [w.path, w.glow, w.text].forEach((x) => x?.classList.add('is-lit')));
    traced = lane;
  }

  for (const lane of lanes) {
    lane.nodes.forEach((el, id) => {
      el.addEventListener('pointerenter', (e) => {
        if (e.pointerType === 'mouse' && !drag) trace(lane, id);
      });
      el.addEventListener('pointerleave', () => {
        if (!drag) trace(null, null);
      });
      el.addEventListener('focus', () => trace(lane, id));
      el.addEventListener('blur', () => trace(null, null));
    });
  }

  // ---------------------------------------------------------------- drag boxes (mouse and pen)

  type Held = { el: HTMLElement; lane: LaneState | null; id: number; x: number; y: number; dx: number; dy: number; moved: boolean };
  let drag: Held | null = null;
  const loose = new Map<HTMLElement, { x: number; y: number; vx: number; vy: number; lane: LaneState | null }>();
  let suppressClick = false;

  root.querySelectorAll<HTMLElement>('.sys-node').forEach((el) => {
    el.addEventListener('pointerdown', (e) => {
      if (!fine || e.pointerType === 'touch' || e.button !== 0) return;
      const lane = lanes.find((l) => l.el.contains(el)) ?? null;
      const prev = loose.get(el);
      drag = { el, lane, id: e.pointerId, x: e.clientX - (prev?.x ?? 0), y: e.clientY - (prev?.y ?? 0), dx: prev?.x ?? 0, dy: prev?.y ?? 0, moved: false };
      loose.delete(el);
    });
  });
  window.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx - drag.dx, dy - drag.dy) < 5) return;
    if (!drag.moved) {
      drag.moved = true;
      drag.el.setPointerCapture?.(e.pointerId);
      drag.el.classList.add('is-held');
      root.classList.add('is-dragging');
    }
    drag.dx = dx;
    drag.dy = dy;
    drag.el.style.transform = `translate(${dx}px, ${dy}px)`;
    if (drag.lane) layout(drag.lane);
  });
  const letGo = (e: PointerEvent) => {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag;
    drag = null;
    if (!d.moved) return;
    suppressClick = true;
    window.setTimeout(() => (suppressClick = false), 0);
    d.el.classList.remove('is-held');
    root.classList.remove('is-dragging');
    if (reduced) {
      d.el.style.transform = '';
      if (d.lane) layout(d.lane);
      return;
    }
    loose.set(d.el, { x: d.dx, y: d.dy, vx: 0, vy: 0, lane: d.lane });
  };
  window.addEventListener('pointerup', letGo);
  window.addEventListener('pointercancel', letGo);

  function springBack(dt: number) {
    for (const [el, s] of loose) {
      // a soft spring with a little bounce
      const k = 120;
      const c = 16;
      s.vx += (-k * s.x - c * s.vx) * dt;
      s.vy += (-k * s.y - c * s.vy) * dt;
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      if (Math.hypot(s.x, s.y) < 0.3 && Math.hypot(s.vx, s.vy) < 2) {
        el.style.transform = '';
        loose.delete(el);
      } else {
        el.style.transform = `translate(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px)`;
      }
      if (s.lane) layout(s.lane);
    }
  }

  // ---------------------------------------------------------------- case study panel

  let openId: string | null = null;
  let pushed = false;
  let returnTo: HTMLElement | null = null;

  function open(id: string, push = true) {
    const src = root.querySelector<HTMLElement>(`[data-detail="${CSS.escape(id)}"]`);
    if (!src) return;
    const wasOpen = Boolean(openId);
    if (!wasOpen) returnTo = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    openId = id;
    panelBody!.replaceChildren(...[...src.childNodes].map((n) => n.cloneNode(true)));
    panelBody!.dataset.kind = src.dataset.kind ?? '';
    panelBody!.querySelectorAll('[id]').forEach((n) => n.removeAttribute('id'));
    const title = panelBody!.querySelector('h2');
    if (title) {
      title.id = 'sys-panel-title';
      panel!.setAttribute('aria-labelledby', 'sys-panel-title');
    }
    panel!.hidden = false;
    scrim!.hidden = false;
    panel!.scrollTop = 0;
    root.classList.add('has-panel');
    root.querySelectorAll('.sys-node.is-open').forEach((n) => n.classList.remove('is-open'));
    root.querySelector(`#node-${CSS.escape(id)}`)?.classList.add('is-open');
    if (push && !wasOpen && !pushed) {
      history.pushState({ sys: id }, '', `#${id}`);
      pushed = true;
    } else if (location.hash !== `#${id}`) {
      history.replaceState(history.state, '', `#${id}`);
    }
    requestAnimationFrame(() => panel!.querySelector<HTMLElement>('[data-panel-close]')?.focus({ preventScroll: true }));
  }

  function close(fromHistory = false) {
    if (!openId) return;
    openId = null;
    panel!.hidden = true;
    scrim!.hidden = true;
    root.classList.remove('has-panel');
    root.querySelectorAll('.sys-node.is-open').forEach((n) => n.classList.remove('is-open'));
    if (fromHistory) pushed = false;
    else if (pushed) {
      pushed = false;
      history.back();
    } else history.replaceState(null, '', location.pathname + location.search);
    returnTo?.focus({ preventScroll: true });
  }

  root.addEventListener('click', (e) => {
    const t = e.target as Element;
    const opener = t.closest<HTMLElement>('[data-open]');
    if (opener) {
      if (suppressClick) return;
      open(opener.dataset.open!);
      return;
    }
    if (t.closest('[data-panel-close]') || t === scrim) close();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && openId) {
      e.preventDefault();
      close();
    }
  });
  panel.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const list = [...panel.querySelectorAll<HTMLElement>('a[href], button')].filter((el) => el.offsetParent !== null);
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

  // ---------------------------------------------------------------- links in, links out

  function land(raw: string, push: boolean) {
    let id = decodeURIComponent(raw.replace(/^#/, ''));
    if (!id || id === 'top' || id === 'main') return false;
    id = data.alias[id] ?? id;
    if (data.toTown.includes(id)) {
      // that place now lives on the homepage galaxy
      location.replace(`/#${id}`);
      return true;
    }
    const lane = lanes.find((l) => l.id === id);
    if (lane) {
      lane.el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      lane.el.classList.remove('is-flash');
      void lane.el.offsetWidth;
      lane.el.classList.add('is-flash');
      return true;
    }
    if (data.nodes[id]?.detail) {
      const node = root.querySelector<HTMLElement>(`#node-${CSS.escape(id)}`);
      node?.scrollIntoView({ behavior: 'auto', block: 'center' });
      open(id, push);
      return true;
    }
    return false;
  }
  window.addEventListener('hashchange', () => {
    if (openId && location.hash === `#${openId}`) return;
    if (!land(location.hash, false) && openId) close(true);
    else if (openId) pushed = true;
  });
  window.addEventListener('popstate', () => {
    if (openId && location.hash !== `#${openId}`) {
      const id = decodeURIComponent(location.hash.replace(/^#/, ''));
      if (id && data.nodes[id]?.detail) open(id, false);
      else close(true);
    }
  });

  // ---------------------------------------------------------------- motion

  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        const lane = lanes.find((l) => l.el === en.target);
        if (lane) lane.visible = en.isIntersecting;
      }
    },
    { rootMargin: '120px' },
  );
  lanes.forEach((l) => io.observe(l.el));

  let last = performance.now();
  let t = 0;
  function frame(now: number) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!document.hidden) {
      t += dt;
      if (loose.size) springBack(dt);
      for (const lane of lanes) {
        if (!lane.visible) continue;
        for (const w of lane.wires) {
          if (!w.len) continue;
          const lit = !traced || traced !== lane || w.path.classList.contains('is-lit');
          w.dots.forEach((dot, k) => {
            if (reduced) {
              dot.style.display = 'none';
              return;
            }
            dot.style.display = '';
            const speed = lane.speed * (w.edge.style === 'test' ? 0.5 : 1);
            const at = ((t * speed) / w.len + w.phase[k]) % 1;
            const p = w.path.getPointAtLength(at * w.len);
            dot.setAttribute('cx', p.x.toFixed(1));
            dot.setAttribute('cy', p.y.toFixed(1));
            dot.style.opacity = lit ? '1' : '0.15';
          });
        }
      }
    }
    requestAnimationFrame(frame);
  }

  const ro = new ResizeObserver(() => layoutAll());
  lanes.forEach((l) => ro.observe(l.body));
  document.fonts?.ready.then(layoutAll).catch(() => {});
  layoutAll();
  land(location.hash, false);
  requestAnimationFrame(frame);
}
