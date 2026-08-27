const MS_PER_DAY = 24 * 60 * 60 * 1000;

/** Midnight local time, so day counts are not thrown off by the current hour. */
function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function toIsoDate(date: Date): string {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function fromIsoDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

export function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/** Whole days from today. Negative once the date has passed. */
export function daysUntil(iso: string): number {
  return Math.round((startOfDay(fromIsoDate(iso)).getTime() - startOfDay(new Date()).getTime()) / MS_PER_DAY);
}

export function formatLongDate(iso: string): string {
  return fromIsoDate(iso).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
