import { DarkTheme, DefaultTheme, type Theme } from '@react-navigation/native';

import type { Palette } from './palette';
import type { ResolvedScheme } from './theme-provider';
import { fontFamily } from './tokens';

export type NavigationTheme = Theme;

/** Keeps navigation chrome (headers, tab bar, card backgrounds) on our palette. */
export function buildNavigationTheme(scheme: ResolvedScheme, colors: Palette): NavigationTheme {
  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;

  return {
    ...base,
    dark: scheme === 'dark',
    colors: {
      ...base.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.background,
      text: colors.text,
      border: colors.divider,
      notification: colors.primary,
    },
    fonts: {
      regular: { fontFamily: fontFamily.body, fontWeight: '400' },
      medium: { fontFamily: fontFamily.bodyMedium, fontWeight: '500' },
      bold: { fontFamily: fontFamily.heading, fontWeight: '800' },
      heavy: { fontFamily: fontFamily.display, fontWeight: '900' },
    },
  };
}
