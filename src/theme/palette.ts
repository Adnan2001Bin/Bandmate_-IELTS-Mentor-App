/**
 * The single source of truth for color.
 *
 * `scripts/generate-theme-css.mjs` reads this file to emit `global.css`, which is
 * what NativeWind class names resolve against. Run `npm run theme` after editing.
 */

export type ColorToken =
  | 'background'
  | 'surface'
  | 'card'
  | 'text'
  | 'textMuted'
  | 'textSubtle'
  | 'border'
  | 'divider'
  | 'primary'
  | 'primaryPressed'
  | 'primarySoft'
  | 'primaryText'
  | 'onPrimary'
  | 'secondary'
  | 'secondaryPressed'
  | 'onSecondary'
  | 'inverseSurface'
  | 'onInverse'
  | 'onInverseMuted'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type Palette = Record<ColorToken, string>;

const ink = {
  base: '#201E1D',
  raised: '#2D2B2B',
  pressed: '#3A3736',
  border: '#444141',
  divider: '#555350',
} as const;

const paper = {
  base: '#F3F2F2',
  sunk: '#EAE9E9',
  pressed: '#DAD8D8',
  border: '#D7D3D3',
  divider: '#9E9D9D',
} as const;

const grey = {
  mid: '#605D5D',
  soft: '#7D7979',
  light: '#9B9797',
} as const;

const accent = {
  base: '#EC3013',
  deep: '#DD2B0F',
  bright: '#FF563C',
  ink: '#AE1800',
  tintLight: '#FFF2EF',
  tintDark: '#4D170E',
  onDark: '#FF9783',
} as const;

/**
 * Modernist is a mono system: there is no green, and no second hue. "Correct"
 * reads as ink, "wrong / gap / act" reads as accent red, and Secondary is the
 * ink pair rather than a colour of its own. `inverseSurface` is the same ink
 * pair expressed at panel scale, which is why both point at the same values.
 */
export const light: Palette = {
  background: paper.base,
  surface: paper.sunk,
  card: paper.sunk,
  text: ink.base,
  textMuted: grey.mid,
  textSubtle: grey.soft,
  border: paper.border,
  divider: paper.divider,
  primary: accent.base,
  primaryPressed: accent.deep,
  primarySoft: accent.tintLight,
  primaryText: accent.ink,
  onPrimary: paper.base,
  secondary: ink.base,
  secondaryPressed: ink.pressed,
  onSecondary: paper.base,
  inverseSurface: ink.base,
  onInverse: paper.base,
  onInverseMuted: grey.light,
  success: ink.base,
  warning: accent.ink,
  error: accent.base,
  info: grey.mid,
};

export const dark: Palette = {
  background: ink.base,
  surface: ink.raised,
  card: ink.raised,
  text: paper.base,
  textMuted: grey.light,
  textSubtle: grey.soft,
  border: ink.border,
  divider: ink.divider,
  primary: accent.base,
  primaryPressed: accent.bright,
  primarySoft: accent.tintDark,
  primaryText: accent.onDark,
  onPrimary: paper.base,
  secondary: paper.base,
  secondaryPressed: paper.pressed,
  onSecondary: ink.base,
  inverseSurface: paper.base,
  onInverse: ink.base,
  onInverseMuted: grey.mid,
  success: paper.base,
  warning: accent.onDark,
  error: accent.bright,
  info: grey.light,
};

export const palettes = { light, dark };

export const colorTokens = Object.keys(light) as ColorToken[];

/** `#EC3013` -> `236 48 19`, the channel form Tailwind needs for alpha support. */
export function toRgbChannels(hex: string): string {
  const value = hex.replace('#', '');
  const int = parseInt(value, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255].join(' ');
}

/** Tailwind reads `--color-text`; this builds that name from a token. */
export function cssVarName(token: ColorToken): string {
  return `--color-${token.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`;
}
