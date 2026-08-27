/**
 * Non-color design tokens. The full typography scale lands in Phase 03; what is
 * here is the structural rhythm every screen already depends on.
 */

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
} as const;

/** Modernist rounds nothing. Kept as a token so it stays tunable in one place. */
export const radius = {
  none: 0,
  sm: 0,
  md: 0,
  lg: 0,
} as const;

/** Rules do the organising: 2px between sections, 1px between rows. */
export const rule = {
  section: 2,
  row: 1,
  emphasis: 4,
} as const;

export const iconSize = {
  xs: 12,
  sm: 15,
  md: 17,
  lg: 19,
  xl: 24,
} as const;

export const duration = {
  instant: 120,
  fast: 180,
  normal: 260,
  slow: 420,
} as const;

export const fontFamily = {
  body: 'Archivo_400Regular',
  bodyMedium: 'Archivo_500Medium',
  bodySemibold: 'Archivo_600SemiBold',
  heading: 'Archivo_800ExtraBold',
  display: 'Archivo_900Black',
} as const;

export type Spacing = keyof typeof spacing;
export type IconSize = keyof typeof iconSize;
