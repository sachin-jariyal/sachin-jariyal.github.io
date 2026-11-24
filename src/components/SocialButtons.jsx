import { profile } from "../data/content";

const links = [
  {
    href: profile.linkedin,
    label: "LinkedIn",
    brand: "linkedin",
    icon: "fa-brands fa-linkedin-in",
    external: true,
  },
  {
    href: profile.github,
    label: "GitHub",
    brand: "github",
    icon: "fa-brands fa-github",
    external: true,
  },
  {
    href: profile.resumeUrl,
    label: "Resume",
    brand: "resume",
    type: "button",
    external: true,
  },
];

export default function SocialButtons({ onDark = false }) {
  return (
    <div className={`social-icons ${onDark ? "social-icons-on-dark" : ""}`}>
      {links.map((link) =>
        link.type === "button" ? (
          <a
            key={link.brand}
            className={`social-resume-btn social-resume-btn-${link.brand}`}
            href={link.href}
            aria-label={link.label}
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {link.label}
          </a>
        ) : (
          <a
            key={link.brand}
            className={`social-icon social-icon-${link.brand}`}
            href={link.href}
            aria-label={link.label}
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <i className={link.icon} aria-hidden="true" />
          </a>
        )
      )}
    </div>
  );
}
