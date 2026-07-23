import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CheckoutPage from "@/app/checkout/[plan]/page";
import { planBySlug } from "@/components/legacai-tokens";

// The page is an async server component in the app router. We can invoke
// it as a function with the promise-shaped params and render the returned
// JSX. This exercises the real slug validation.

async function renderPlan(slug: string) {
  const el = await CheckoutPage({ params: Promise.resolve({ plan: slug }) });
  render(el);
}

describe("/checkout/[plan] — placeholder", () => {
  it("resolves the 1yr plan and shows the release-loop placeholder", async () => {
    await renderPlan("1yr");
    expect(screen.getByTestId("checkout-placeholder")).toBeInTheDocument();
    expect(screen.getAllByText(/1-Year Vault/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/This section unlocks in the next release loop/i)).toBeInTheDocument();
  });

  it("resolves the 10yr plan (the highlight)", async () => {
    await renderPlan("10yr");
    expect(screen.getAllByText(/10-Year Vault/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/This section unlocks in the next release loop/i)).toBeInTheDocument();
  });

  it("resolves the century plan", async () => {
    await renderPlan("century");
    expect(screen.getAllByText(/Century Vault/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/This section unlocks in the next release loop/i)).toBeInTheDocument();
  });

  it("planBySlug guards unknown slugs — returns undefined", () => {
    expect(planBySlug("not-a-plan")).toBeUndefined();
  });
});
