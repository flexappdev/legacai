import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LandingPage from "@/app/page";

describe("Landing page", () => {
  it("renders the hero headline", () => {
    render(<LandingPage />);
    expect(screen.getByText(/Legacai keeps you\./i)).toBeInTheDocument();
  });

  it("renders three pricing plans", () => {
    render(<LandingPage />);
    expect(screen.getByTestId("plan-1")).toBeInTheDocument();
    expect(screen.getByTestId("plan-10")).toBeInTheDocument();
    expect(screen.getByTestId("plan-100")).toBeInTheDocument();
  });

  it("renders all 8 asset source cards", () => {
    render(<LandingPage />);
    // Each source title appears once in the hero tile row and again in the
    // Sources section — both must render.
    expect(screen.getAllByText("Documents").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Photos & Images").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Audio & Voice").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("AI Conversations").length).toBeGreaterThanOrEqual(2);
  });

  it("pricing CTAs link to real /checkout/[plan] routes", () => {
    render(<LandingPage />);
    // Each pricing plan card must hold a link to its slug — no more broken
    // onNavigate("order") state calls that go nowhere.
    const start1yr = screen.getByRole("link", { name: /Start 1-Year Vault/i });
    expect(start1yr).toHaveAttribute("href", "/checkout/1yr");
    const secure10 = screen.getByRole("link", { name: /Secure 10 Years/i });
    expect(secure10).toHaveAttribute("href", "/checkout/10yr");
    const century = screen.getByRole("link", { name: /Begin the Century/i });
    expect(century).toHaveAttribute("href", "/checkout/century");
  });

  it("primary CTAs link to /vault, not a dead SPA state", () => {
    render(<LandingPage />);
    // OPEN LEGACAI (nav) + MEET YOUR AGENT (hero) both point at /vault.
    const openBtns = screen.getAllByRole("link", { name: /OPEN LEGACAI/i });
    expect(openBtns.length).toBeGreaterThanOrEqual(1);
    expect(openBtns[0]).toHaveAttribute("href", "/vault");
    const meet = screen.getByRole("link", { name: /MEET YOUR AGENT/i });
    expect(meet).toHaveAttribute("href", "/vault");
  });

  it("section anchors are addressable via /#id URLs", () => {
    render(<LandingPage />);
    // Each nav link points at /#hash — the URL updates when clicked.
    const pricingLinks = screen.getAllByRole("link", { name: /^Pricing$/ });
    expect(pricingLinks.some((el) => el.getAttribute("href") === "#pricing")).toBe(true);
  });
});
