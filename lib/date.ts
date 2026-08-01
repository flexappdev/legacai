/** Date helpers — ISO strings only, no timezone fudge. */

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
export const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const YEAR_MIN = 1940;
export const YEAR_MAX = 2080;
export const DATA_YEAR = 2026;

export const pad = (n: number) => String(n).padStart(2, "0");
export const iso = (y: number, m: number, d: number) => `${y}-${pad(m)}-${pad(d)}`;
export const daysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();

export function nowISO(): string {
  const d = new Date();
  return iso(d.getFullYear(), d.getMonth() + 1, d.getDate());
}
