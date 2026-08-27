type ClassValue = string | false | null | undefined;

/**
 * Joins class names. Later entries win in NativeWind, so caller-supplied
 * `className` should always be passed last.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
