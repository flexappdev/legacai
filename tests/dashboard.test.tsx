import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import VaultDashboard from "@/components/vault-dashboard";

describe("VaultDashboard — URL-driven sections", () => {
  it("renders the sidebar nav with all sections", () => {
    render(<VaultDashboard section="agent" />);
    expect(screen.getByTestId("nav-agent")).toBeInTheDocument();
    expect(screen.getByTestId("nav-sources")).toBeInTheDocument();
    expect(screen.getByTestId("nav-vault")).toBeInTheDocument();
    expect(screen.getByTestId("nav-family")).toBeInTheDocument();
    expect(screen.getByTestId("nav-releases")).toBeInTheDocument();
    expect(screen.getByTestId("nav-charter")).toBeInTheDocument();
  });

  it("each nav item links to its own /vault/[id] URL", () => {
    render(<VaultDashboard section="agent" />);
    for (const id of ["agent", "sources", "vault", "family", "releases", "charter"] as const) {
      expect(screen.getByTestId(`nav-${id}`)).toHaveAttribute("href", `/vault/${id}`);
    }
  });

  it("switches vault type when Personal/Family/Business tabs are clicked", () => {
    render(<VaultDashboard section="agent" />);
    fireEvent.click(screen.getByTestId("vault-personal"));
    expect(screen.getByText(/PERSONAL VAULT — MAT/i)).toBeInTheDocument();
  });

  it("shows agent bubbles with citations when section=agent", () => {
    render(<VaultDashboard section="agent" />);
    expect(screen.getByText(/flat-deed-2019\.pdf/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Story note/i).length).toBeGreaterThanOrEqual(1);
  });

  it("shows vault premium CTAs on section=vault", () => {
    render(<VaultDashboard section="vault" />);
    expect(screen.getAllByText(/Six life categories/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("button", { name: /Purchase Vault/i })).toBeInTheDocument();
  });

  it("shows real content on section=releases", () => {
    render(<VaultDashboard section="releases" />);
    expect(screen.getByText(/Who receives what, and when/i)).toBeInTheDocument();
    expect(screen.getByText(/On birthdays/i)).toBeInTheDocument();
  });
});
