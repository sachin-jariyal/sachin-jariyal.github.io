import { profile } from "../data/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container foot-inner">
        <p className="foot-copy">
          Copyright &copy; {year} {profile.name}. All rights reserved.
        </p>
        <p className="foot-legal">
          {profile.name} is the sole owner of this website and its contents.
          No part of this site may be copied, reproduced, or distributed
          without prior written permission.
        </p>
      </div>
    </footer>
  );
}
