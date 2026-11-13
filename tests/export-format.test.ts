import { describe, it, expect } from "vitest";
import { csvField, CSV_COLUMNS } from "@/lib/export-format";

describe("Export CSV format (RFC 4180)", () => {
  it("leaves plain values unquoted", () => {
    expect(csvField("Letter to the kids")).toBe("Letter to the kids");
  });
  it("quotes and doubles embedded quotes", () => {
    expect(csvField('She said "yes"')).toBe('"She said ""yes"""');
  });
  it("quotes commas and newlines", () => {
    expect(csvField("a, b")).toBe('"a, b"');
    expect(csvField("line1\nline2")).toBe('"line1\nline2"');
  });
  it("renders missing values empty and dates as ISO", () => {
    expect(csvField(undefined)).toBe("");
    expect(csvField(null)).toBe("");
    expect(csvField(new Date("2026-11-13T00:00:00Z"))).toBe("2026-11-13T00:00:00.000Z");
  });
  it("keeps notes and sourceId in the export columns", () => {
    expect(CSV_COLUMNS).toEqual(["entryDate", "category", "title", "icon", "notes", "sourceId"]);
  });
});
