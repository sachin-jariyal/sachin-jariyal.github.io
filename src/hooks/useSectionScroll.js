import { useEffect } from "react";
import {
  isSmoothScrolling,
  navOffset,
  prefersReducedMotion,
  smoothScrollTo,
} from "../utils/smoothScroll";

const WHEEL_THRESHOLD = 36;
const TOUCH_THRESHOLD = 48;

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

/**
 * One wheel / swipe / key → next or previous section.
 * Page scrolls as a whole — no per-section scrollbars.
 */
export function useSectionScroll(sectionIds) {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let touchStartY = 0;
    let wheelAcc = 0;
    let wheelLockUntil = 0;

    const go = (index) => {
      const sections = getSections(sectionIds);
      if (index < 0 || index >= sections.length) return;
      if (isSmoothScrolling()) return;

      wheelAcc = 0;
      wheelLockUntil = performance.now() + 280;
      smoothScrollTo(`#${sections[index].id}`, {
        durationMin: 1250,
        durationMax: 1650,
      });
    };

    const tryStep = (direction) => {
      if (prefersReducedMotion()) return false;
      if (isSmoothScrolling() || performance.now() < wheelLockUntil) {
        return true;
      }

      const sections = getSections(sectionIds);
      if (!sections.length) return false;

      const index = currentSectionIndex(sections);

      if (direction > 0) {
        if (index >= sections.length - 1) return true; // lock last (contact+footer)
        go(index + 1);
        return true;
      }

      if (index <= 0) return true; // lock first
      go(index - 1);
      return true;
    };

    const onWheel = (event) => {
      if (prefersReducedMotion()) return;

      if (isSmoothScrolling() || performance.now() < wheelLockUntil) {
        event.preventDefault();
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
      const keysDown = ["ArrowDown", "PageDown", " "];
      const keysUp = ["ArrowUp", "PageUp"];
      if (keysDown.includes(event.key)) {
        if (tryStep(1)) event.preventDefault();
      } else if (keysUp.includes(event.key)) {
        if (tryStep(-1)) event.preventDefault();
      }
    };

    const onTouchStart = (event) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const onTouchEnd = (event) => {
      const endY = event.changedTouches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - endY;
      if (Math.abs(delta) < TOUCH_THRESHOLD) return;
      tryStep(delta > 0 ? 1 : -1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [sectionIds]);
}
