/* easeInOutCubic — smoother section-to-section glide */
const EASE = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

let activeFrame = 0;
let scrolling = false;
let scrollWaiters = [];

export function isSmoothScrolling() {
  return scrolling;
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function navOffset() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--nav-h")
    .trim();
  const navH = Number.parseFloat(raw) || 48;
  return navH + 12;
}

function finishScroll() {
  scrolling = false;
  const waiters = scrollWaiters;
  scrollWaiters = [];
  waiters.forEach((resolve) => resolve());
}

/**
 * Animated scroll to a section (or element).
 * Section snaps use a longer, cinematic ease.
 */
export function smoothScrollTo(
  target,
  { durationMin = 1200, durationMax = 1600 } = {}
) {
  if (typeof window === "undefined") return Promise.resolve();

  const href = typeof target === "string" ? target : null;
  const el = href ? document.querySelector(href) : target;

  if (!el) return Promise.resolve();

  const start = window.scrollY;
  const end = el.getBoundingClientRect().top + window.scrollY - navOffset();
  const distance = end - start;

  const commitHash = () => {
    if (href) window.history.pushState(null, "", href);
  };

  if (Math.abs(distance) < 2) {
    commitHash();
    return Promise.resolve();
  }

  if (prefersReducedMotion()) {
    window.scrollTo(0, end);
    commitHash();
    return Promise.resolve();
  }

  const duration = Math.min(
    durationMax,
    Math.max(durationMin, Math.abs(distance) * 0.55 + 900)
  );

  cancelAnimationFrame(activeFrame);
  scrolling = true;

  document.querySelectorAll(".section.is-leaving, .section.is-entering").forEach((node) => {
    node.classList.remove("is-leaving", "is-entering");
  });

  const current = document.elementFromPoint(
    Math.min(120, window.innerWidth / 2),
    Math.min(120, window.innerHeight / 2)
  );
  const leaving = current?.closest?.(".section");
  if (leaving) leaving.classList.add("is-leaving");
  el.classList.add("is-entering");

  const t0 = performance.now();

  return new Promise((resolve) => {
    scrollWaiters.push(resolve);

    const step = (now) => {
      const t = Math.min(1, (now - t0) / duration);
      window.scrollTo(0, start + distance * EASE(t));
      if (t < 1) {
        activeFrame = requestAnimationFrame(step);
      } else {
        commitHash();
        leaving?.classList.remove("is-leaving");
        el.classList.remove("is-entering");
        finishScroll();
      }
    };

    activeFrame = requestAnimationFrame(step);
  });
}

/** Intercept in-page hash links for slow section transitions. */
export function handleHashClick(event) {
  const anchor = event.currentTarget;
  const href = anchor.getAttribute("href");
  if (!href || !href.startsWith("#") || href === "#") return;

  if (!document.querySelector(href)) return;

  event.preventDefault();
  smoothScrollTo(href);
}
