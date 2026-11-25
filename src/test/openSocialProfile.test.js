import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  isMobileDevice,
  openSocialProfile,
} from "../utils/openSocialProfile";

describe("openSocialProfile", () => {
  const linkedin = "https://www.linkedin.com/in/sachin-jariyal/";
  const github = "https://github.com/sachin-jariyal";

  beforeEach(() => {
    vi.stubGlobal("open", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("detects desktop as non-mobile by default in jsdom", () => {
    expect(isMobileDevice()).toBe(false);
  });

  it("opens LinkedIn in a new tab on desktop", () => {
    const preventDefault = vi.fn();
    openSocialProfile("linkedin", linkedin, { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
    expect(window.open).toHaveBeenCalledWith(
      linkedin,
      "_blank",
      "noopener,noreferrer"
    );
  });

  it("opens GitHub in a new tab on desktop", () => {
    openSocialProfile("github", github);
    expect(window.open).toHaveBeenCalledWith(
      github,
      "_blank",
      "noopener,noreferrer"
    );
  });

  it("uses LinkedIn Intent URL on Android", () => {
    Object.defineProperty(navigator, "userAgent", {
      configurable: true,
      value: "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36",
    });
    const hrefSpy = vi.fn();
    const loc = { href: "" };
    Object.defineProperty(loc, "href", {
      set: hrefSpy,
      get: () => "",
      configurable: true,
    });
    vi.stubGlobal("location", loc);

    openSocialProfile("linkedin", linkedin);

    expect(hrefSpy).toHaveBeenCalled();
    const url = hrefSpy.mock.calls[0][0];
    expect(url).toContain("intent://www.linkedin.com/in/sachin-jariyal/");
    expect(url).toContain("package=com.linkedin.android");
    expect(url).toContain("S.browser_fallback_url=");
  });
});
