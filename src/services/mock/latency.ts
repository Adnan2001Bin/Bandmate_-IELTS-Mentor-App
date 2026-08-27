/**
 * Mocks resolve on a timer rather than instantly, so loading and skeleton states
 * are exercised in development instead of only appearing once a backend exists.
 */
export function delay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
