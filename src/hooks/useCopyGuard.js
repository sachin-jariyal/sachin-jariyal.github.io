import { useEffect } from "react";

function isInsideCopyable(target) {
  return Boolean(target?.closest?.(".copyable, input, textarea"));
}

/**
 * Light deterrent: blocks right-click / context menu and common copy shortcuts.
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

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("copy", onCopy);
    document.addEventListener("cut", onCut);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("cut", onCut);
    };
  }, []);
}
