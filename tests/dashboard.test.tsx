import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Legacai from "@/app/page";

describe("Dashboard", () => {
  it("navigates from landing to dashboard when OPEN LEGACAI is clicked", () => {
    render(<Legacai />);
    const openBtn = screen.getAllByText(/OPEN LEGACAI/i)[0];
    fireEvent.click(openBtn);
    // Dashboard renders the sidebar Agent nav item
    expect(screen.getByTestId("nav-agent")).toBeInTheDocument();
    expect(screen.getByTestId("nav-releases")).toBeInTheDocument();
  });

  it("switches vault type when Personal/Family/Business tabs are clicked", () => {
    render(<Legacai />);
    fireEvent.click(screen.getAllByText(/OPEN LEGACAI/i)[0]);
    const personal = screen.getByTestId("vault-personal");
    fireEvent.click(personal);
    expect(
      screen.getByText(/PERSONAL VAULT — MAT/i),
    ).toBeInTheDocument();
  });

  it("shows agent bubbles with citations by default", () => {
    render(<Legacai />);
    fireEvent.click(screen.getAllByText(/OPEN LEGACAI/i)[0]);
    // Dashboard's Agent page renders the first two Q&A bubbles by default.
    // Look for citation chips — every real answer must cite its source.
    expect(screen.getByText(/flat-deed-2019\.pdf/i)).toBeInTheDocument();
    // "Story note" chip is one of at least two matches — bubble text also mentions it.
    expect(screen.getAllByText(/Story note/i).length).toBeGreaterThanOrEqual(1);
  });
});
