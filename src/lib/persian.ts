const PERSIAN_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Converts any Latin digits found in the input to Persian numerals. */
export function toPersianDigits(input: number | string): string {
  return String(input).replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[Number(digit)]);
}

/** Zero-pads a number to two digits and converts it to Persian numerals. */
export function toPersianTwoDigits(value: number): string {
  return toPersianDigits(String(Math.max(0, value)).padStart(2, "0"));
}

const jalaliDateTimeFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Tehran",
});

/** Formats a Date as a Persian (Jalali) date-time string, e.g. "۱۴۰۵/۰۶/۲۰ - ۱۸:۳۰". */
export function formatJalaliDateTime(date: Date): string {
  const parts = jalaliDateTimeFormatter.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}/${get("month")}/${get("day")} - ${get("hour")}:${get("minute")}`;
}
