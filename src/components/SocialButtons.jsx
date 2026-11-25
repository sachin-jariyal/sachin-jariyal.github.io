import { profile } from "../data/content";
import { openSocialProfile } from "../utils/openSocialProfile";

const links = [
  {
    href: profile.linkedin,
    label: "LinkedIn",
    brand: "linkedin",
    icon: "fa-brands fa-linkedin-in",
    deepLink: true,
  },
  {
    href: profile.github,
    label: "GitHub",
    brand: "github",
    icon: "fa-brands fa-github",
    deepLink: true,
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
      {links.map((link) => {
        const isButton = link.type === "button";
        const className = isButton
          ? `social-resume-btn social-resume-btn-${link.brand} social-magnetic`
          : `social-icon social-icon-${link.brand} social-magnetic`;

        return (
          <a
            key={link.brand}
            className={className}
            href={link.href}
            aria-label={link.label}
            {...(link.deepLink
              ? {
                  onClick: (e) => openSocialProfile(link.brand, link.href, e),
                }
              : link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
          >
            <span className="social-magnetic-glow" aria-hidden="true" />
            {isButton ? (
              link.label
            ) : (
              <i className={link.icon} aria-hidden="true" />
            )}
          </a>
        );
      })}
    </div>
  );
}
