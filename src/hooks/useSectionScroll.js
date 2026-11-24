import { useEffect } from "react";
import {
  isSmoothScrolling,
  navOffset,
  prefersReducedMotion,
  smoothScrollTo,
} from "../utils/smoothScroll";

const WHEEL_THRESHOLD = 36;
const MOBILE_MQ = "(max-width: 860px), (hover: none) and (pointer: coarse)";

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

/**
 * Desktop: one wheel/key → next or previous section.
 * Mobile/touch: native scroll only (avoids bounce from hijacked swipes).
 */
export function useSectionScroll(sectionIds) {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let wheelAcc = 0;
    let wheelLockUntil = 0;
    let enabled = !isMobileLike();

    const media = window.matchMedia(MOBILE_MQ);
    const syncEnabled = () => {
      enabled = !media.matches;
      wheelAcc = 0;
    };
    media.addEventListener?.("change", syncEnabled);

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
      if (!enabled || prefersReducedMotion()) return false;
      if (isSmoothScrolling() || performance.now() < wheelLockUntil) {
        return true;
      }

      const sections = getSections(sectionIds);
      if (!sections.length) return false;

      const index = currentSectionIndex(sections);

      if (direction > 0) {
        if (index >= sections.length - 1) return true;
        go(index + 1);
        return true;
      }

      if (index <= 0) return true;
      go(index - 1);
      return true;
    };

    const onWheel = (event) => {
      if (!enabled || prefersReducedMotion()) return;

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
      if (!enabled) return;
      const keysDown = ["ArrowDown", "PageDown", " "];
      const keysUp = ["ArrowUp", "PageUp"];
      if (keysDown.includes(event.key)) {
        if (tryStep(1)) event.preventDefault();
      } else if (keysUp.includes(event.key)) {
        if (tryStep(-1)) event.preventDefault();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      media.removeEventListener?.("change", syncEnabled);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [sectionIds]);
}
