/**
 * Miss alarm for the LegacAI daily loop (W46 of the year-end plan).
 *
 * Rule: one line if no sweep by 09:00 UK, or no DJ entry by 21:00 UK on a weekday.
 * Silent when everything ran. Pure function so it can be tested and reused by
 * the CLI (scripts/miss-alarm.ts) or a scheduled task.
 */

export const SWEEP_DEADLINE_HOUR = 9;
export const DJ_DEADLINE_HOUR = 21;

export type LondonParts = {
  /** YYYY-MM-DD in Europe/London */
  date: string;
  hour: number;
  minute: number;
  /** ISO weekday: 1 = Monday … 7 = Sunday */
  weekday: number;
};

const WEEKDAYS: Record<string, number> = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };

export function londonParts(at: Date): LondonParts {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hourCycle: "h23",
  });
  const p = Object.fromEntries(fmt.formatToParts(at).map((x) => [x.type, x.value]));
  return {
    date: `${p.year}-${p.month}-${p.day}`,
    hour: Number(p.hour),
    minute: Number(p.minute),
    weekday: WEEKDAYS[p.weekday],
  };
}

export type MissInput = {
  now: Date;
  /** ISO timestamp from vault/.sweep-state.json `lastRun`, or null if none */
  sweepLastRun: string | null;
  /** YYYY-MM-DD dates that have a DJ entry (from vault/input/djai/ file names) */
  djDates: string[];
};

export function checkMisses({ now, sweepLastRun, djDates }: MissInput): string[] {
  const today = londonParts(now);
  const lines: string[] = [];

  if (today.hour >= SWEEP_DEADLINE_HOUR) {
    const last = sweepLastRun ? londonParts(new Date(sweepLastRun)).date : null;
    if (last !== today.date) {
      lines.push(`MISS sweep ${today.date}: no sweep by 09:00 (last run ${last ?? "never"})`);
    }
  }

  const isWeekday = today.weekday <= 5;
  if (isWeekday && today.hour >= DJ_DEADLINE_HOUR && !djDates.includes(today.date)) {
    lines.push(`MISS dj ${today.date}: no DJ entry by 21:00`);
  }

  return lines;
}

/** Pull YYYY-MM-DD prefixes out of DJ entry file names. */
export function djDatesFromFiles(files: string[]): string[] {
  return [...new Set(files.map((f) => f.match(/^(\d{4}-\d{2}-\d{2})/)?.[1]).filter((d): d is string => !!d))];
}
