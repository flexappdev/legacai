import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// jsdom lacks IntersectionObserver — Legacai uses it for scroll fades.
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = "";
  thresholds: number[] = [];
}
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});
Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// jsdom doesn't implement scrollIntoView.
Element.prototype.scrollIntoView = vi.fn();

// jsdom lacks window.scrollTo (used by page navigation).
window.scrollTo = vi.fn();

afterEach(() => {
  cleanup();
});
