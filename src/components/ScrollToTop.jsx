import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { smoothScrollTo } from "../utils/smoothScroll";

const SHOW_AFTER = 420;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          className="scroll-top-btn"
          aria-label="Scroll to top"
          onClick={() => smoothScrollTo("#home")}
          initial={{ opacity: 0, y: 12, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.92 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <i className="fa-solid fa-arrow-up" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
