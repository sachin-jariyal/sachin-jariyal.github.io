import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { experience } from "../data/content";

function TimelineItem({ item, index, reduceMotion, scrollerRef }) {
  const fromLeft = item.side === "left";

  return (
    <motion.li
      className={`timeline-item ${item.side}`}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, x: fromLeft ? -28 : 28, y: 14 }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              x: 0,
              y: 0,
              transitionEnd: { transform: "none" },
            }
      }
      viewport={{
        once: false,
        amount: 0.35,
        root: scrollerRef,
      }}
      transition={{
        duration: 0.45,
        delay: Math.min(index * 0.03, 0.12),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="timeline-marker" aria-hidden="true" />
      <article className="timeline-body">
        <h3>{item.role}</h3>
        <p className="timeline-meta">{item.meta}</p>
        <ul>
          {item.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </article>
    </motion.li>
  );
}

export default function Experience() {
  const reduceMotion = useReducedMotion();
  const scrollerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return undefined;

    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? el.scrollTop / max : 0);
    };

    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="experience"
      className="section experience-section"
      aria-label="Experience"
    >
      <div className="container experience-layout">
        <div className="experience-header">
          <p className="section-eyebrow">Career</p>
          <h2 className="section-title">Experience</h2>
          <p className="experience-hint" aria-hidden="true">
            Scroll to explore the timeline
          </p>
          <div
            className="experience-progress"
            role="presentation"
            aria-hidden="true"
          >
            <span style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="timeline-scroll"
          tabIndex={0}
          aria-label="Career timeline"
        >
          <div
            className="timeline-progress-line"
            style={{ transform: `scaleY(${progress})` }}
            aria-hidden="true"
          />
          <ol className="timeline">
            {experience.map((item, index) => (
              <TimelineItem
                key={item.role}
                item={item}
                index={index}
                reduceMotion={reduceMotion}
                scrollerRef={scrollerRef}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
