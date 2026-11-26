import Reveal from "./Reveal";
import { profile } from "../data/content";

export default function About() {
  return (
    <section id="about" className="section about-section" aria-label="About">
      <div className="container about-layout">
        <Reveal className="about-intro">
          <p className="section-eyebrow">About</p>
          <h2 className="section-title">Built for production scale.</h2>
          <p className="about-headline">{profile.headline}</p>
        </Reveal>

        <div className="about-main">
          <Reveal className="about-copy" delay={0.05}>
            <p className="about-summary">{profile.summary}</p>
            {profile.aboutBody?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="about-focus">{profile.aboutFocus}</p>
          </Reveal>

          <Reveal className="about-highlights" delay={0.1}>
            <ul>
              {profile.aboutHighlights?.map((item) => (
                <li key={item.label}>
                  <span className="about-metric">{item.value}</span>
                  <span className="about-metric-label">{item.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="about-meta-strip" delay={0.14}>
          <dl className="meta-strip">
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
              <dt>Languages</dt>
              <dd>{profile.languages?.join(" · ")}</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>{profile.tagline}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="about-availability" delay={0.18}>
          <div className="availability-bar">
            <span className="availability-pulse" aria-hidden="true" />
            <p>
              <span className="availability-label">Availability</span>
              <span className="availability-value">{profile.availability}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
