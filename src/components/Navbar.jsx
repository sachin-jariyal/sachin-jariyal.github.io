import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../data/content";
import { handleHashClick } from "../utils/smoothScroll";
import ThemeChain from "./ThemeChain";

export default function Navbar() {
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
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="menu-toggle mobile-only"
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

      {/* Far-right hanging pendant — kept away from the menu */}
      <ThemeChain />

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
