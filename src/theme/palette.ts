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
  | 'inverseSurface'
  | 'onInverse'
  | 'onInverseMuted'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type Palette = Record<ColorToken, string>;

/**
 * Modernist is a mono system: there is no green. "Correct" reads as ink, and
 * "wrong / gap / act" reads as accent red. The feedback tokens below map onto
 * that pair rather than introducing hues the design language doesn't have.
 */
export const light: Palette = {
  background: '#F3F2F2',
  surface: '#EAE9E9',
  card: '#EAE9E9',
  text: '#201E1D',
  textMuted: '#605D5D',
  textSubtle: '#7D7979',
  border: '#D7D3D3',
  divider: '#9E9D9D',
  primary: '#EC3013',
  primaryPressed: '#DD2B0F',
  primarySoft: '#FFF2EF',
  primaryText: '#AE1800',
  onPrimary: '#F3F2F2',
  inverseSurface: '#201E1D',
  onInverse: '#F3F2F2',
  onInverseMuted: '#9B9797',
  success: '#201E1D',
  warning: '#AE1800',
  error: '#EC3013',
  info: '#605D5D',
};

export const dark: Palette = {
  background: '#201E1D',
  surface: '#2D2B2B',
  card: '#2D2B2B',
  text: '#F3F2F2',
  textMuted: '#9B9797',
  textSubtle: '#7D7979',
  border: '#444141',
  divider: '#555350',
  primary: '#EC3013',
  primaryPressed: '#FF563C',
  primarySoft: '#4D170E',
  primaryText: '#FF9783',
  onPrimary: '#F3F2F2',
  inverseSurface: '#F3F2F2',
  onInverse: '#201E1D',
  onInverseMuted: '#605D5D',
  success: '#F3F2F2',
  warning: '#FF9783',
  error: '#FF563C',
  info: '#9B9797',
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
