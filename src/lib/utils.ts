export { cn } from "cn";

export function googleDateToYear(date: string): string {
  if (date.length <= 4) return date;

  return date.slice(0, 4);
}
