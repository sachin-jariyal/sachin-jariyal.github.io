/**
 * Open LinkedIn / GitHub: desktop → new tab; mobile → native app, else web profile.
 */

export function isMobileDevice() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const mobileUa =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const iPadOs =
    navigator.maxTouchPoints > 1 && /Macintosh/i.test(navigator.platform || "");
  return mobileUa || iPadOs;
}

function linkedInSlug(webUrl) {
  const match = String(webUrl).match(/linkedin\.com\/in\/([^/?#]+)/i);
  return match?.[1] ?? "";
}

function githubUsername(webUrl) {
  const match = String(webUrl).match(/github\.com\/([^/?#]+)/i);
  return match?.[1] ?? "";
}

function isAndroid() {
  return /Android/i.test(navigator.userAgent || "");
}

function appUrlFor(brand, webUrl) {
  if (brand === "linkedin") {
    const slug = linkedInSlug(webUrl);
    if (isAndroid()) {
      return (
        `intent://www.linkedin.com/in/${slug}/#Intent;` +
        `scheme=https;package=com.linkedin.android;` +
        `S.browser_fallback_url=${encodeURIComponent(webUrl)};end`
      );
    }
    return `linkedin://in/${slug}`;
  }

  if (brand === "github") {
    const user = githubUsername(webUrl);
    if (isAndroid()) {
      return (
        `intent://github.com/${user}#Intent;` +
        `scheme=https;package=com.github.android;` +
        `S.browser_fallback_url=${encodeURIComponent(webUrl)};end`
      );
    }
    return `github://user?username=${user}`;
  }

  return webUrl;
}

/**
 * @param {"linkedin"|"github"} brand
 * @param {string} webUrl HTTPS profile URL
 * @param {MouseEvent} [event]
 */
export function openSocialProfile(brand, webUrl, event) {
  event?.preventDefault();

  if (!isMobileDevice()) {
    window.open(webUrl, "_blank", "noopener,noreferrer");
    return;
  }

  const appUrl = appUrlFor(brand, webUrl);

  // Android Intent URLs include S.browser_fallback_url when the app is missing.
  if (isAndroid()) {
    window.location.href = appUrl;
    return;
  }

  // iOS: try custom scheme; if the app does not open, fall back to HTTPS.
  let cancelled = false;
  const started = Date.now();
  const FALLBACK_MS = 1200;

  const clear = () => {
    cancelled = true;
    window.clearTimeout(timer);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pagehide", onHide);
    window.removeEventListener("blur", onHide);
  };

  const onVisibility = () => {
    if (document.hidden) clear();
  };
  const onHide = () => clear();

  const timer = window.setTimeout(() => {
    if (cancelled) return;
    if (!document.hidden && Date.now() - started >= FALLBACK_MS - 50) {
      window.location.href = webUrl;
    }
    clear();
  }, FALLBACK_MS);

  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", onHide);
  window.addEventListener("blur", onHide);

  window.location.href = appUrl;
}
