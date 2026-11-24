import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("renders hero signature and role", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /hello, i'm sachin jariyal/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText(/fullstack engineer/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/apar technologies/i).length).toBeGreaterThan(0);
  });

  it("renders primary sections", () => {
    render(<App />);
    expect(screen.getByRole("region", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /skills/i })).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /experience/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /education/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: /contact/i })
    ).toBeInTheDocument();
  });

  it("hides the testimonial by default", () => {
    render(<App />);
    expect(
      screen.queryByText(/very good developer/i)
    ).not.toBeInTheDocument();
  });

  it("toggles theme between light and dark", async () => {
    const user = userEvent.setup();
    render(<App />);

    const toggle = screen.getByLabelText(/pull ribbon to switch to dark/i);
    await user.click(toggle);
    await waitFor(() => {
      expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    });

    const lightToggle = screen.getByLabelText(/pull ribbon to switch to light/i);
    await user.click(lightToggle);
    await waitFor(() => {
      expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    });
  });

  it("exposes social destinations", () => {
    render(<App />);
    expect(screen.getAllByLabelText(/linkedin/i).length).toBeGreaterThan(0);
    expect(screen.getAllByLabelText(/github/i).length).toBeGreaterThan(0);
    expect(screen.queryByLabelText(/gmail/i)).not.toBeInTheDocument();
    expect(screen.getAllByLabelText(/^resume$/i).length).toBeGreaterThan(0);
  });
});
