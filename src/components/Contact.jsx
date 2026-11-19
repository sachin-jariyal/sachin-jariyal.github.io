import Reveal from "./Reveal";
import SocialButtons from "./SocialButtons";

export default function Contact() {
  return (
    <section id="contact" className="section contact-section" aria-label="Contact">
      <div className="container contact-inner">
        <Reveal>
          <p className="section-eyebrow contact-eyebrow">Contact</p>
          <h2 className="section-title contact-title">
            Let&apos;s build something reliable.
          </h2>
          <p className="section-lead contact-lead">
            Open to conversations about distributed systems, technical leadership,
            and high-impact engineering roles.
          </p>
        </Reveal>

        <Reveal className="contact-actions" delay={0.12}>
          <SocialButtons />
        </Reveal>
      </div>
    </section>
  );
}
