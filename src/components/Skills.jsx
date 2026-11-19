import Reveal from "./Reveal";
import { skillGroups, profile } from "../data/content";

export default function Skills() {
  return (
    <section
      id="expertise"
      className="section skills-section"
      aria-label="Skills"
    >
      <div className="container">
        <Reveal>
          <p className="section-eyebrow">Expertise</p>
          <h2 className="section-title">Skills that ship systems.</h2>
        </Reveal>

        <div className="skills-list">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} className="skill-row" delay={i * 0.06}>
              <div className="skill-copy">
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </div>
              <ul className="skill-tags">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {profile.courses?.length > 0 && (
          <Reveal className="courses-row" delay={0.1}>
            <h3>Continued learning</h3>
            <ul className="skill-tags">
              {profile.courses.map((c) => (
                <li key={c.name}>{c.name}</li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
