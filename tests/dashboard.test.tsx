import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import VaultPage from "@/app/vault/page";

describe("Vault (/vault) — Dashboard", () => {
  it("renders the sidebar nav with all sections", () => {
    render(<VaultPage />);
    expect(screen.getByTestId("nav-agent")).toBeInTheDocument();
    expect(screen.getByTestId("nav-sources")).toBeInTheDocument();
    expect(screen.getByTestId("nav-vault")).toBeInTheDocument();
    expect(screen.getByTestId("nav-family")).toBeInTheDocument();
    expect(screen.getByTestId("nav-releases")).toBeInTheDocument();
    expect(screen.getByTestId("nav-charter")).toBeInTheDocument();
  });

  it("switches vault type when Personal/Family/Business tabs are clicked", () => {
    render(<VaultPage />);
    fireEvent.click(screen.getByTestId("vault-personal"));
    expect(screen.getByText(/PERSONAL VAULT — MAT/i)).toBeInTheDocument();
  });

  it("shows agent bubbles with citations by default", () => {
    render(<VaultPage />);
    expect(screen.getByText(/flat-deed-2019\.pdf/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Story note/i).length).toBeGreaterThanOrEqual(1);
  });

  it("navigates from Agent to Releases when nav item is clicked", () => {
    render(<VaultPage />);
    fireEvent.click(screen.getByTestId("nav-releases"));
    expect(screen.getByText(/Who receives what, and when/i)).toBeInTheDocument();
  });
});
