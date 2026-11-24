import Reveal from "./Reveal";
import { skillGroups, profile } from "../data/content";
import { getSkillIcon, simpleIconUrl } from "../data/skillIcons";

function SkillTag({ name }) {
  const meta = getSkillIcon(name);

  return (
    <li className="skill-tag" style={{ "--skill-color": meta.color }}>
      {meta.fa ? (
        <i className={`skill-tag-icon ${meta.fa}`} aria-hidden="true" />
      ) : (
        <img
          className="skill-tag-icon-img"
          src={simpleIconUrl(meta.si, meta.color)}
          alt=""
          width={14}
          height={14}
          loading="lazy"
        />
      )}
      <span>{name}</span>
    </li>
  );
}

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
                  <SkillTag key={item} name={item} />
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
                <SkillTag key={c.name} name={c.name} />
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
