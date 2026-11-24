import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../data/content";
import { useTheme } from "../hooks/useTheme";
import { handleHashClick } from "../utils/smoothScroll";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  const onNavClick = (event) => {
    handleHashClick(event);
    close();
  };

  return (
    <header className={`nav-bar ${scrolled ? "is-scrolled" : ""}`} role="banner">
      <div className="container nav-inner">
        <nav className="nav-links desktop-only" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={onNavClick}>
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <i className="fa-solid fa-sun" aria-hidden="true" />
            ) : (
              <i className="fa-regular fa-moon" aria-hidden="true" />
            )}
          </button>
        </nav>

        <div className="nav-actions mobile-only">
          <button
            type="button"
            className="theme-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <i className="fa-solid fa-sun" aria-hidden="true" />
            ) : (
              <i className="fa-regular fa-moon" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={onNavClick}>
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
