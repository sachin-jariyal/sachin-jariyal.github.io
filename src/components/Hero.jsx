import { motion, useReducedMotion } from "framer-motion";
import { profile } from "../data/content";
import SocialButtons from "./SocialButtons";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-copy">
          <motion.h1
            className="hero-title"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero-hello">Hello, I&apos;m</span>
            <span className="hero-name">{profile.name}</span>
          </motion.h1>

          <motion.p
            className="hero-role"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, transitionEnd: { transform: "none" } }
            }
            transition={{ duration: 0.6, delay: 0.22 }}
          >
            <span className="hero-role-title">{profile.title}</span>
            <span className="hero-role-sep" aria-hidden="true">
              ·
            </span>
            <span className="hero-company">{profile.company}</span>
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34 }}
          >
            <SocialButtons />
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-portrait">
            <img
              src={profile.avatar}
              alt={profile.name}
              width={640}
              height={800}
              fetchPriority="high"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
