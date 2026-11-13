import { describe, it, expect } from "vitest";
import { checkMisses, londonParts } from "@/lib/ops/miss-alarm";

// 13 Nov 2026 is a Friday; London is on GMT (UTC+0) in November.
const fri = (hhmm: string) => new Date(`2026-11-13T${hhmm}:00Z`);
// 1 Jun 2026 is a Monday; London is on BST (UTC+1).
const bstMon = (hhmmUtc: string) => new Date(`2026-06-01T${hhmmUtc}:00Z`);

describe("londonParts", () => {
  it("reads date, hour and weekday in Europe/London", () => {
    expect(londonParts(fri("08:30"))).toEqual({ date: "2026-11-13", hour: 8, minute: 30, weekday: 5 });
  });

  it("applies BST in summer", () => {
    expect(londonParts(bstMon("23:30"))).toEqual({ date: "2026-06-02", hour: 0, minute: 30, weekday: 2 });
  });
});

describe("checkMisses — sweep", () => {
  it("is quiet before 09:00 even with no sweep today", () => {
    expect(checkMisses({ now: fri("08:59"), sweepLastRun: "2026-11-12T07:00:00Z", djDates: [] })).toEqual([]);
  });

  it("raises one line at 09:00 when the last sweep was yesterday", () => {
    const lines = checkMisses({ now: fri("09:00"), sweepLastRun: "2026-11-12T07:00:00Z", djDates: [] });
    expect(lines).toEqual(["MISS sweep 2026-11-13: no sweep by 09:00 (last run 2026-11-12)"]);
  });

  it("is quiet when today's sweep ran", () => {
    expect(checkMisses({ now: fri("12:00"), sweepLastRun: "2026-11-13T07:02:00Z", djDates: [] })).toEqual([]);
  });

  it("reports never when there is no sweep state", () => {
    expect(checkMisses({ now: fri("10:00"), sweepLastRun: null, djDates: [] })).toEqual([
      "MISS sweep 2026-11-13: no sweep by 09:00 (last run never)",
    ]);
  });
});

describe("checkMisses — DJ entry", () => {
  const swept = "2026-11-13T07:00:00Z";

  it("is quiet before 21:00", () => {
    expect(checkMisses({ now: fri("20:59"), sweepLastRun: swept, djDates: [] })).toEqual([]);
  });

  it("raises one line at 21:00 on a weekday with no entry", () => {
    expect(checkMisses({ now: fri("21:00"), sweepLastRun: swept, djDates: ["2026-11-12"] })).toEqual([
      "MISS dj 2026-11-13: no DJ entry by 21:00",
    ]);
  });

  it("is quiet when today's entry exists", () => {
    expect(checkMisses({ now: fri("22:00"), sweepLastRun: swept, djDates: ["2026-11-13"] })).toEqual([]);
  });

  it("never asks for a DJ entry at the weekend", () => {
    const sat = new Date("2026-11-14T22:00:00Z");
    expect(checkMisses({ now: sat, sweepLastRun: "2026-11-14T07:00:00Z", djDates: [] })).toEqual([]);
  });

  it("can report both misses at once, sweep first", () => {
    expect(checkMisses({ now: fri("21:30"), sweepLastRun: null, djDates: [] })).toHaveLength(2);
  });
});

describe("djDatesFromFiles", () => {
  it("keeps unique date prefixes and ignores other files", async () => {
    const { djDatesFromFiles } = await import("@/lib/ops/miss-alarm");
    expect(djDatesFromFiles(["2026-11-13.md", "2026-11-13-voice.md", ".gitkeep", "2026-11-12.md"])).toEqual([
      "2026-11-13",
      "2026-11-12",
    ]);
  });
});
