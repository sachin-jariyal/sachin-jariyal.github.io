import Reveal from "./Reveal";
import { profile } from "../data/content";

export default function About() {
  return (
    <section id="about" className="section about-section" aria-label="About">
      <div className="container">
        <Reveal>
          <p className="section-eyebrow">About</p>
          <h2 className="section-title">Engineering at scale.</h2>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-lead" delay={0.08}>
            <p>{profile.summary}</p>
            <p className="about-muted">{profile.aboutExtra}</p>
          </Reveal>

          <Reveal className="about-meta" delay={0.16}>
            <dl className="meta-list">
              <div>
                <dt>Role</dt>
                <dd className="meta-role-inline">
                  <span>{profile.title}</span>
                  <span className="meta-role-sep" aria-hidden="true">
                    ·
                  </span>
                  <span className="meta-company">{profile.company}</span>
                </dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt>Focus</dt>
                <dd>{profile.tagline}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
