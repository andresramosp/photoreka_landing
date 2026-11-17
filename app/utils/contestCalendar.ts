import type { Contest } from "./contests";

const compact = (iso: string) => iso.replaceAll("-", "");

const nextDay = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y!, m! - 1, d! + 1)).toISOString().slice(0, 10);
};

const escapeText = (text: string) =>
  text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

/** An all-day event on the deadline, with a reminder three days before. */
export function buildDeadlineIcs(contest: Contest, pageUrl: string): string | null {
  const deadline = contest.facts?.deadline;
  if (!deadline) return null;
  const edition = contest.facts?.edition ? ` ${contest.facts.edition}` : "";
  const entryUrl = contest.facts?.entryUrl || contest.url;
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Photoreka//Photo contests//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${contest.slug}-${compact(deadline)}@photoreka.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${compact(deadline)}`,
    `DTEND;VALUE=DATE:${compact(nextDay(deadline))}`,
    `SUMMARY:${escapeText(`${contest.name}${edition}: entry deadline`)}`,
    `DESCRIPTION:${escapeText(`Enter: ${entryUrl}\nCheck the exact closing time on the official site.\nDetails: ${pageUrl}`)}`,
    `URL:${entryUrl}`,
    "TRANSP:TRANSPARENT",
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeText(`${contest.name} closes in 3 days`)}`,
    "TRIGGER:-P3D",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadDeadlineIcs(contest: Contest, pageUrl: string): boolean {
  const ics = buildDeadlineIcs(contest, pageUrl);
  if (!ics) return false;
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${contest.slug}-deadline.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  return true;
}
