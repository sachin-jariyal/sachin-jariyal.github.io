function Header() {
  return (
    <header class="header" role="banner">
      <div class="container nav">
        <div class="brand">
          Sachin
          <span class="grad"
            style="background:linear-gradient(90deg,var(--accent),var(--accent-2));-webkit-background-clip:text;background-clip:text;color:transparent;">
            Jariyal.
          </span>
        </div>
        <nav class="menu" role="navigation" aria-label="Primary">
          <a href="#home">Home</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <button id="themeBtn" class="btn theme-toggle" aria-label="Toggle theme">☀️</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
