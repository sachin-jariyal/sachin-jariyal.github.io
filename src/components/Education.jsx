import { useRef } from "react";
import Reveal from "./Reveal";
import { education } from "../data/content";

function EduPanel({ item, delay }) {
  const ref = useRef(null);

  const onMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 9}deg`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <Reveal className="edu-panel-wrap" delay={delay}>
      <article
        ref={ref}
        className="edu-panel"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        tabIndex={0}
      >
        <span className="edu-glow" aria-hidden="true" />
        <span className="edu-index" aria-hidden="true">
          {item.index}
        </span>
        <div className="edu-panel-body">
          <p className="edu-degree">{item.degree}</p>
          <h3>{item.field}</h3>
          <p className="edu-meta">
            <span>{item.years}</span>
            <span className="edu-meta-sep" aria-hidden="true">
              ·
            </span>
            <span>{item.school}</span>
          </p>
          <p className="edu-description">{item.description}</p>
        </div>
      </article>
    </Reveal>
  );
}

export default function Education() {
  return (
    <section
      id="education"
      className="section education-section"
      aria-label="Education"
    >
      <div className="container education-layout">
        <Reveal className="education-intro">
          <p className="section-eyebrow">Foundation</p>
          <h2 className="section-title">Education</h2>
          <p className="education-lead">
            Two degrees that shaped how I design systems, reason about data, and
            ship software with discipline.
          </p>
        </Reveal>

        <div className="edu-split">
          {education.map((item, i) => (
            <EduPanel key={item.role} item={item} delay={0.08 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
