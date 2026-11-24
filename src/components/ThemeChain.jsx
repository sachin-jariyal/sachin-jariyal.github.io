import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";

export default function ThemeChain() {
  const { theme, toggleTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const [pulling, setPulling] = useState(false);
  const isDark = theme === "dark";

  const onPull = () => {
    setPulling(true);
    toggleTheme();
    window.setTimeout(() => {
      setPulling(false);
    }, reduceMotion ? 0 : 420);
  };

  return (
    <motion.button
      type="button"
      className={`theme-chain theme-ribbon ${isDark ? "is-dark" : "is-light"}`}
      onClick={onPull}
      aria-label={`Pull ribbon to switch to ${isDark ? "light" : "dark"} mode`}
      animate={reduceMotion ? undefined : { y: pulling ? 10 : 0 }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 18,
        mass: 0.55,
      }}
    >
      <span className="theme-ribbon-slot" aria-hidden="true" />
      <img
        className="theme-ribbon-img"
        src="/images/theme-ribbon.png"
        alt=""
        width={36}
        height={110}
        draggable={false}
      />
      <span className="theme-chain-hint">pull</span>
    </motion.button>
  );
}
