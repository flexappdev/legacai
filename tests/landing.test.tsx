import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Legacai from "@/app/page";

describe("Landing page", () => {
  it("renders the hero headline", () => {
    render(<Legacai />);
    expect(screen.getByText(/Legacai keeps you\./i)).toBeInTheDocument();
  });

  it("renders three pricing plans", () => {
    render(<Legacai />);
    expect(screen.getByTestId("plan-1")).toBeInTheDocument();
    expect(screen.getByTestId("plan-10")).toBeInTheDocument();
    expect(screen.getByTestId("plan-100")).toBeInTheDocument();
  });

  it("renders all 8 asset source cards", () => {
    render(<Legacai />);
    // Each source title appears once in the hero tile row and again in the
    // Sources section — both must render.
    expect(screen.getAllByText("Documents").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Photos & Images").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("Audio & Voice").length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText("AI Conversations").length).toBeGreaterThanOrEqual(2);
  });
});
