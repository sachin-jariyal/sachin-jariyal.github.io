import { describe, it, expect } from "vitest";
import {
  profile,
  navLinks,
  skillGroups,
  experience,
  education,
} from "../data/content";

describe("portfolio content", () => {
  it("exposes required profile fields", () => {
    expect(profile.name).toBe("Sachin Jariyal");
    expect(profile.title).toMatch(/Fullstack Engineer/i);
    expect(profile.company).toBe("Apar Technologies");
    expect(profile.email).toContain("@");
    expect(profile.avatar).toBeTruthy();
    expect(profile.tagline).toContain("TypeScript");
  });

  it("keeps navigation anchors unique and valid", () => {
    const hrefs = navLinks.map((l) => l.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    hrefs.forEach((href) => expect(href.startsWith("#")).toBe(true));
  });

  it("includes AI tooling expertise", () => {
    const ai = skillGroups.find((g) => /AI/i.test(g.title));
    expect(ai).toBeTruthy();
    expect(ai.items).toEqual(
      expect.arrayContaining(["GitHub Copilot", "Cursor AI", "Generative AI"])
    );
  });

  it("surfaces LinkedIn-aligned impact highlights", () => {
    expect(profile.availability).toMatch(/25|30/);
    expect(profile.aboutHighlights?.length).toBeGreaterThanOrEqual(4);
    expect(profile.languages).toEqual(
      expect.arrayContaining(["English", "Hindi", "Punjabi"])
    );
  });

  it("does not list Spring Boot under backend skills", () => {
    const backend = skillGroups.find((g) => /Backend/i.test(g.title));
    expect(backend.items).not.toContain("Spring Boot");
  });

  it("has chronological experience and education entries", () => {
    expect(experience.length).toBeGreaterThan(0);
    expect(education.length).toBe(2);
    experience.forEach((job) => {
      expect(job.role).toBeTruthy();
      expect(job.bullets.length).toBeGreaterThan(0);
    });
  });
});
