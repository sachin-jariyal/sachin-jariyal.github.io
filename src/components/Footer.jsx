import { profile } from "../data/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container foot-inner">
        <nav className="foot-links" aria-label="Footer">
          <a href="#home">Home</a>
          <span className="foot-sep" aria-hidden="true">
            /
          </span>
          <a href="#about">About</a>
          <span className="foot-sep" aria-hidden="true">
            /
          </span>
          <a href="#experience">Experience</a>
          <span className="foot-sep" aria-hidden="true">
            /
          </span>
          <a href="#contact">Contact</a>
        </nav>

        <div className="foot-center">
          <p className="foot-copy">
            Copyright &copy; {year}. All rights reserved.
          </p>
          <p className="foot-owner">
            Sole owner of this website and its contents.
          </p>
        </div>

        <p className="foot-signature">{profile.name}</p>
      </div>
    </footer>
  );
}
