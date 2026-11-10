/**
 * Site motion layer.
 *
 * Everywhere motion is allowed (`html.has-motion`):
 * - GSAP + ScrollTrigger reveals, image settle, and a vanilla port of
 *   react-bits SplitText for section titles.
 *
 * Desktop with a fine pointer only (`html.has-desktop-motion`):
 * - Lenis momentum smooth scroll, with same-page hash links routed through it.
 * - Vanilla ports of react-bits SpotlightCard (cards) and Magnet (solid buttons).
 *
 * Layout sets both classes in <head>, so CSS can drop its scroll-timeline
 * reveals before first paint. If this script fails to load, nothing is hidden.
 */
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const root = document.documentElement;
const desktop = root.classList.contains('has-desktop-motion');

const navOffset = () =>
  (parseFloat(getComputedStyle(root).getPropertyValue('--nav-offset')) || 68) + 12;

/** Only hide things the visitor has not seen yet; anything above the fold stays put. */
const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.92;

function smoothScroll() {
  const lenis = new Lenis({ lerp: 0.095, smoothWheel: true, autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Same-page hash links glide instead of jumping.
  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
    if (!a || a.classList.contains('skip') || (a.target && a.target !== '_self')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    const id = decodeURIComponent(url.hash.slice(1));
    const el = id === 'top' ? null : document.getElementById(id);
    if (id !== 'top' && !el) return;
    e.preventDefault();
    if (el) {
      for (let n: HTMLElement | null = el; n; n = n.parentElement) {
        if (n instanceof HTMLDetailsElement) n.open = true;
      }
    }
    history.pushState(null, '', url.hash);
    lenis.scrollTo(el ?? 0, { offset: el ? -navOffset() : 0, duration: 1.15 });
  });

  return lenis;
}

/** react-bits SplitText, vanilla: letters rise in with a stagger. */
function splitTitles() {
  const titles = document.querySelectorAll<HTMLElement>('.section-head h2, .contact-box h2');
  for (const title of titles) {
    // Leave anything with markup alone; only plain-text titles are split.
    if (title.children.length || !title.textContent?.trim()) continue;
    const text = title.textContent.trim();
    const hide = belowFold(title);
    title.setAttribute('aria-label', text);
    title.textContent = '';
    const chars: HTMLElement[] = [];
    for (const word of text.split(/(\s+)/)) {
      if (/^\s+$/.test(word)) {
        title.append(word);
        continue;
      }
      const w = document.createElement('span');
      w.className = 'split-word';
      w.setAttribute('aria-hidden', 'true');
      for (const ch of word) {
        const c = document.createElement('span');
        c.className = 'split-char';
        c.textContent = ch;
        w.append(c);
        chars.push(c);
      }
      title.append(w);
    }
    if (!hide) continue;
    gsap.set(chars, { autoAlpha: 0, yPercent: 60, rotate: 4 });
    ScrollTrigger.create({
      trigger: title,
      start: 'top 88%',
      once: true,
      onEnter: () =>
        gsap.to(chars, {
          autoAlpha: 1,
          yPercent: 0,
          rotate: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.035,
          clearProps: 'all',
        }),
    });
  }
}

/** Project page titles: letters rise in on arrival, after the page cross-fade. */
function heroTitle() {
  const title = document.querySelector<HTMLElement>('.story-page .resume-top h1');
  if (!title || title.children.length || !title.textContent?.trim()) return;
  const text = title.textContent.trim();
  title.setAttribute('aria-label', text);
  title.textContent = '';
  const chars: HTMLElement[] = [];
  for (const word of text.split(/(\s+)/)) {
    if (/^\s+$/.test(word)) {
      title.append(word);
      continue;
    }
    const w = document.createElement('span');
    w.className = 'split-word';
    w.setAttribute('aria-hidden', 'true');
    for (const ch of word) {
      const c = document.createElement('span');
      c.className = 'split-char';
      c.textContent = ch;
      w.append(c);
      chars.push(c);
    }
    title.append(w);
  }
  gsap.fromTo(
    chars,
    { autoAlpha: 0, yPercent: 70, rotate: 6 },
    {
      autoAlpha: 1,
      yPercent: 0,
      rotate: 0,
      duration: 1.05,
      delay: 0.12,
      ease: 'expo.out',
      stagger: Math.min(0.035, 0.6 / chars.length),
      clearProps: 'all',
    },
  );
}

/** Staggered reveals for [data-reveal], consistent across browsers. */
function reveals() {
  const items = gsap.utils.toArray<HTMLElement>('[data-reveal]').filter(belowFold);
  if (!items.length) return;
  gsap.set(items, { autoAlpha: 0, y: desktop ? 26 : 18 });
  const show = (batch: Element[]) =>
    gsap.to(batch, {
      autoAlpha: 1,
      y: 0,
      duration: desktop ? 0.95 : 0.75,
      ease: 'expo.out',
      stagger: desktop ? 0.09 : 0.07,
      overwrite: true,
      clearProps: 'opacity,visibility,transform',
    });
  ScrollTrigger.batch(items, { start: desktop ? 'top 90%' : 'top 94%', once: true, onEnter: show, onLeave: show });
}

/** Screenshots settle from a slight zoom as they scroll into place. */
function imageSettle() {
  for (const img of document.querySelectorAll<HTMLElement>('.work-piece .polaroid img, .product-dossier .polaroid img, .project-shot img')) {
    gsap.fromTo(
      img,
      { scale: 1.08, transformOrigin: '50% 0%' },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: img, start: 'top bottom', end: 'center 55%', scrub: 0.6 },
      },
    );
  }
}

/** react-bits SpotlightCard, vanilla: a soft light follows the pointer. */
function spotlight() {
  for (const card of document.querySelectorAll<HTMLElement>('.work-piece, .achieve-card')) {
    card.classList.add('spot');
    card.addEventListener(
      'pointermove',
      (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
        card.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
      },
      { passive: true },
    );
  }
}

/** react-bits Magnet, vanilla: solid buttons lean toward the cursor. */
function magnets() {
  for (const btn of document.querySelectorAll<HTMLElement>('.btn-solid')) {
    gsap.set(btn, { '--mag-x': 0, '--mag-y': 0 });
    const toX = gsap.quickTo(btn, '--mag-x', { duration: 0.55, ease: 'power3.out' });
    const toY = gsap.quickTo(btn, '--mag-y', { duration: 0.55, ease: 'power3.out' });
    btn.classList.add('magnet');
    btn.addEventListener(
      'pointermove',
      (e) => {
        const r = btn.getBoundingClientRect();
        toX(((e.clientX - (r.left + r.width / 2)) / r.width) * 10);
        toY(((e.clientY - (r.top + r.height / 2)) / r.height) * 8);
      },
      { passive: true },
    );
    btn.addEventListener('pointerleave', () => {
      toX(0);
      toY(0);
    });
  }
}

if (root.classList.contains('has-motion')) {
  gsap.registerPlugin(ScrollTrigger);
  // Mobile URL bars resize the viewport while scrolling; re-measuring then makes triggers jump.
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (desktop) smoothScroll();
  heroTitle();
  splitTitles();
  reveals();
  imageSettle();
  if (desktop) {
    spotlight();
    magnets();
  }
  document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
  addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
}
