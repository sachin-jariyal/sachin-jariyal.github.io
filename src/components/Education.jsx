import Reveal from "./Reveal";
import { education } from "../data/content";

export default function Education() {
  return (
    <section
      id="education"
      className="section education-section"
      aria-label="Education"
    >
      <div className="container">
        <Reveal>
          <p className="section-eyebrow">Foundation</p>
          <h2 className="section-title">Education</h2>
        </Reveal>

        <div className="edu-list">
          {education.map((item, i) => (
            <Reveal key={item.role} className="edu-item" delay={i * 0.08}>
              <h3>{item.role}</h3>
              <p className="timeline-meta">{item.meta}</p>
              <p>{item.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
