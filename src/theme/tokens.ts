/**
 * Non-color design tokens. Everything structural — rhythm, type scale, control
 * sizing, elevation — is defined once here and consumed by both the NativeWind
 * config and the components.
 */
import type { TextStyle, ViewStyle } from 'react-native';

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

/**
 * Archivo is a grotesque with a large x-height, so headings are tracked in
 * (negative letter spacing) to keep them tight and architectural, while kickers
 * are tracked out hard because they carry structure rather than content.
 */
export const typography = {
  display: {
    fontFamily: fontFamily.display,
    fontSize: 56,
    lineHeight: 54,
    letterSpacing: -2.2,
  },
  displaySm: {
    fontFamily: fontFamily.display,
    fontSize: 40,
    lineHeight: 40,
    letterSpacing: -1.6,
  },
  numeral: {
    fontFamily: fontFamily.display,
    fontSize: 22,
    lineHeight: 24,
    letterSpacing: -0.6,
  },
  h1: {
    fontFamily: fontFamily.heading,
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -0.8,
  },
  h2: {
    fontFamily: fontFamily.heading,
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: -0.6,
  },
  h3: {
    fontFamily: fontFamily.heading,
    fontSize: 19,
    lineHeight: 24,
    letterSpacing: -0.4,
  },
  h4: {
    fontFamily: fontFamily.bodySemibold,
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.2,
  },
  body: {
    fontFamily: fontFamily.body,
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: 0,
  },
  bodySm: {
    fontFamily: fontFamily.body,
    fontSize: 13,
    lineHeight: 19,
    letterSpacing: 0,
  },
  label: {
    fontFamily: fontFamily.bodySemibold,
    fontSize: 13,
    lineHeight: 17,
    letterSpacing: 0.2,
  },
  kicker: {
    fontFamily: fontFamily.bodySemibold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  caption: {
    fontFamily: fontFamily.body,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.1,
  },
} as const satisfies Record<string, TextStyle>;

export type TypeVariant = keyof typeof typography;

/**
 * The system is flat by design: depth comes from rules and ink, not shadow. Only
 * things that genuinely float above the page — dialogs and sheets — cast one.
 */
export const elevation = {
  flat: {},
  overlay: {
    shadowColor: '#000000',
    shadowOpacity: 0.24,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: -2 },
    elevation: 16,
  },
} as const satisfies Record<string, ViewStyle>;

export const scrimOpacity = 0.55;

/** Heights for tappable controls. Nothing interactive goes below `minTouch`. */
export const control = {
  sm: 36,
  md: 48,
  lg: 56,
  minTouch: 44,
} as const;

export const layout = {
  screenPadding: spacing[6],
  sectionGap: spacing[8],
} as const;

export const opacity = {
  disabled: 0.4,
  pressed: 0.85,
} as const;

export type Spacing = keyof typeof spacing;
export type IconSize = keyof typeof iconSize;
export type ControlSize = Exclude<keyof typeof control, 'minTouch'>;
