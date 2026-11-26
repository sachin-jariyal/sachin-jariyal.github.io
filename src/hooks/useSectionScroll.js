import { useEffect } from "react";
import {
  isSmoothScrolling,
  navOffset,
  prefersReducedMotion,
  smoothScrollTo,
} from "../utils/smoothScroll";

const WHEEL_THRESHOLD = 36;
const EDGE_PX = 10;
const MOBILE_MQ = "(max-width: 860px), (hover: none) and (pointer: coarse)";
const SECTION_ALIGN_TOLERANCE = 14;
const CAREER_EASE = 0.2;

function getSections(ids) {
  return ids
    .map((id) => document.getElementById(id.replace(/^#/, "")))
    .filter(Boolean);
}

function currentSectionIndex(sections) {
  const marker = window.scrollY + navOffset() + window.innerHeight * 0.2;
  let index = 0;
  for (let i = 0; i < sections.length; i += 1) {
    if (sections[i].offsetTop <= marker) index = i;
  }
  return index;
}

function isMobileLike() {
  return window.matchMedia(MOBILE_MQ).matches;
}

function isSectionAligned(section) {
  if (!section) return false;
  return Math.abs(section.getBoundingClientRect().top - navOffset()) <= SECTION_ALIGN_TOLERANCE;
}

function getCareerScroller() {
  return document.querySelector("#experience .timeline-scroll");
}

/**
 * Eased nested career scroll. Returns:
 * - "scroll" when consuming wheel inside the timeline
 * - "release" when at top/bottom and user keeps scrolling that way
 * - false when experience is not the active section
 */
function createCareerScrollController() {
  let target = null;
  let raf = 0;
  let scroller = null;
  let edgeAcc = 0;

  const stop = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    target = null;
    scroller = null;
    edgeAcc = 0;
  };

  const tick = () => {
    if (!scroller || target == null) {
      raf = 0;
      return;
    }

    const max = scroller.scrollHeight - scroller.clientHeight;
    const clampedTarget = Math.max(0, Math.min(max, target));
    const current = scroller.scrollTop;
    const diff = clampedTarget - current;

    if (Math.abs(diff) < 0.45) {
      scroller.scrollTop = clampedTarget;
      target = clampedTarget;
      raf = 0;
      return;
    }

    scroller.scrollTop = current + diff * CAREER_EASE;
    raf = requestAnimationFrame(tick);
  };

  const apply = (delta) => {
    const experience = document.getElementById("experience");
    if (!experience || !isSectionAligned(experience)) return false;

    const el = getCareerScroller();
    if (!el) return false;

    const max = el.scrollHeight - el.clientHeight;
    if (max <= 1) return false;

    const liveTop = el.scrollTop;
    const goingDown = delta > 0;
    const goingUp = delta < 0;

    const atTop = liveTop <= EDGE_PX;
    const atBottom = liveTop >= max - EDGE_PX;
    const targetAtTop = target != null && target <= EDGE_PX;
    const targetAtBottom = target != null && target >= max - EDGE_PX;

    const releaseDown = goingDown && (atBottom || targetAtBottom);
    const releaseUp = goingUp && (atTop || targetAtTop);

    if (releaseDown || releaseUp) {
      edgeAcc += Math.abs(delta);
      if (edgeAcc >= WHEEL_THRESHOLD) {
        stop();
        return "release";
      }
      /* Eat small overscroll so the page does not jump early */
      return "scroll";
    }

    edgeAcc = 0;
    scroller = el;
    if (target == null) target = liveTop;
    target = Math.max(0, Math.min(max, target + delta));

    if (!raf) raf = requestAnimationFrame(tick);
    return "scroll";
  };

  const jump = (direction) => {
    stop();
    const el = getCareerScroller();
    if (!el) return;
    el.scrollTop = direction > 0 ? 0 : el.scrollHeight;
  };

  return { apply, jump, stop };
}

/**
 * Desktop: one wheel/key → next or previous section.
 * Career: nested timeline scroll until edges, then section change.
 * Mobile/touch: native scroll only (avoids bounce from hijacked swipes).
 */
export function useSectionScroll(sectionIds) {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let wheelAcc = 0;
    let wheelLockUntil = 0;
    let enabled = !isMobileLike();
    const careerScroll = createCareerScrollController();

    const media = window.matchMedia(MOBILE_MQ);
    const syncEnabled = () => {
      enabled = !media.matches;
      wheelAcc = 0;
      careerScroll.stop();
    };
    media.addEventListener?.("change", syncEnabled);

    const go = (index, direction) => {
      const sections = getSections(sectionIds);
      if (index < 0 || index >= sections.length) return;
      if (isSmoothScrolling()) return;

      const target = sections[index];
      if (target?.id === "experience") {
        careerScroll.jump(direction);
      } else {
        careerScroll.stop();
      }

      wheelAcc = 0;
      wheelLockUntil = performance.now() + 320;
      smoothScrollTo(`#${target.id}`, {
        durationMin: 1250,
        durationMax: 1650,
      });
    };

    const tryStep = (direction) => {
      if (!enabled || prefersReducedMotion()) return false;
      if (isSmoothScrolling() || performance.now() < wheelLockUntil) {
        return true;
      }

      const sections = getSections(sectionIds);
      if (!sections.length) return false;

      const index = currentSectionIndex(sections);

      if (direction > 0) {
        if (index >= sections.length - 1) return true;
        go(index + 1, direction);
        return true;
      }

      if (index <= 0) return true;
      go(index - 1, direction);
      return true;
    };

    const onWheel = (event) => {
      if (!enabled || prefersReducedMotion()) return;

      if (isSmoothScrolling() || performance.now() < wheelLockUntil) {
        event.preventDefault();
        return;
      }

      const career = careerScroll.apply(event.deltaY);
      if (career === "scroll") {
        event.preventDefault();
        wheelAcc = 0;
        return;
      }

      if (career === "release") {
        event.preventDefault();
        wheelAcc = 0;
        tryStep(event.deltaY > 0 ? 1 : -1);
        return;
      }

      wheelAcc += event.deltaY;
      if (Math.abs(wheelAcc) < WHEEL_THRESHOLD) {
        event.preventDefault();
        return;
      }

      const handled = tryStep(wheelAcc > 0 ? 1 : -1);
      if (handled) {
        event.preventDefault();
        wheelAcc = 0;
      }
    };

    const onKeyDown = (event) => {
      if (!enabled) return;
      const keysDown = ["ArrowDown", "PageDown", " "];
      const keysUp = ["ArrowUp", "PageUp"];

      if (keysDown.includes(event.key) || keysUp.includes(event.key)) {
        const direction = keysDown.includes(event.key) ? 1 : -1;
        const delta = direction * Math.max(110, window.innerHeight * 0.24);

        const career = careerScroll.apply(delta);
        if (career === "scroll") {
          event.preventDefault();
          return;
        }
        if (career === "release") {
          event.preventDefault();
          tryStep(direction);
          return;
        }

        if (tryStep(direction)) event.preventDefault();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      careerScroll.stop();
      media.removeEventListener?.("change", syncEnabled);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [sectionIds]);
}
