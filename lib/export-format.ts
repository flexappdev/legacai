// Export-anytime covenant: format helpers. Schema documented in docs/export-schema.md.

export const EXPORT_SCHEMA = "legacai-export/1.0 (docs/export-schema.md)";
export const CSV_COLUMNS = ["entryDate", "category", "title", "icon", "notes", "sourceId"] as const;

/** RFC 4180 field: quote when needed, double embedded quotes. */
export function csvField(value: unknown): string {
  if (value === undefined || value === null) return "";
  const s = value instanceof Date ? value.toISOString() : String(value);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
