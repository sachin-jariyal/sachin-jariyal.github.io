import Reveal from "./Reveal";
import { experience } from "../data/content";

export default function Experience() {
  return (
    <section
      id="experience"
      className="section experience-section"
      aria-label="Experience"
    >
      <div className="container">
        <Reveal>
          <p className="section-eyebrow">Career</p>
          <h2 className="section-title">Experience</h2>
        </Reveal>

        <ol className="timeline">
          {experience.map((item, index) => (
            <Reveal
              as="li"
              key={item.role}
              className={`timeline-item ${item.side}`}
              delay={Math.min(index * 0.05, 0.25)}
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
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
