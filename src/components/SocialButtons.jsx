import { profile } from "../data/content";

const links = [
  {
    href: profile.resumeUrl,
    label: "Resume on Google Drive",
    brand: "drive",
    icon: "fa-brands fa-google-drive",
    external: true,
  },
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
    href: `mailto:${profile.email}`,
    label: "Gmail",
    brand: "gmail",
    icon: "fa-solid fa-envelope",
    external: false,
  },
];

export default function SocialButtons({ onDark = false }) {
  return (
    <div className={`social-icons ${onDark ? "social-icons-on-dark" : ""}`}>
      {links.map((link) => (
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
      ))}
    </div>
  );
}
