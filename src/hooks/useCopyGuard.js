import { useEffect } from "react";

function isInsideCopyable(target) {
  return Boolean(target?.closest?.(".copyable, input, textarea"));
}

/**
 * Light deterrent: blocks right-click, copy shortcuts, and image drag-and-drop.
 * Does not stop DevTools, View Source, or screenshots — those cannot be blocked on the web.
 * Allow copy inside elements marked `.copyable` (and form fields).
 */
export function useCopyGuard() {
  useEffect(() => {
    const onContextMenu = (e) => {
      if (isInsideCopyable(e.target)) return;
      e.preventDefault();
    };

    const onKeyDown = (e) => {
      const key = e.key?.toLowerCase?.() ?? "";
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      if (isInsideCopyable(e.target)) return;

      // Block copy / cut / select-all / save / view-source / print
      if (["c", "x", "a", "s", "u", "p"].includes(key)) {
        e.preventDefault();
      }
    };

    const onCopy = (e) => {
      if (isInsideCopyable(e.target)) return;
      e.preventDefault();
    };

    const onCut = (e) => {
      if (isInsideCopyable(e.target)) return;
      e.preventDefault();
    };

    const onDragStart = (e) => {
      if (isInsideCopyable(e.target)) return;
      const el = e.target;
      if (
        el instanceof HTMLImageElement ||
        el?.closest?.("img") ||
        el instanceof HTMLPictureElement ||
        el?.closest?.("picture, svg, canvas, video")
      ) {
        e.preventDefault();
      }
    };

    const markImagesUndraggable = () => {
      document.querySelectorAll("img:not([data-allow-drag])").forEach((img) => {
        img.setAttribute("draggable", "false");
      });
    };

    markImagesUndraggable();
    const observer = new MutationObserver(markImagesUndraggable);
    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("copy", onCopy);
    document.addEventListener("cut", onCut);
    document.addEventListener("dragstart", onDragStart);

    return () => {
      observer.disconnect();
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("cut", onCut);
      document.removeEventListener("dragstart", onDragStart);
    };
  }, []);
}
