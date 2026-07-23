import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import VaultPage from "@/app/vault/page";

describe("Vault (/vault) — placeholder", () => {
  it("renders the release-loop placeholder card", () => {
    render(<VaultPage />);
    expect(screen.getByTestId("vault-placeholder")).toBeInTheDocument();
    expect(screen.getByText(/This section unlocks in the next release loop/i)).toBeInTheDocument();
  });

  it("links back to home", () => {
    render(<VaultPage />);
    const back = screen.getByRole("link", { name: /Home/i });
    expect(back).toHaveAttribute("href", "/");
  });
});
