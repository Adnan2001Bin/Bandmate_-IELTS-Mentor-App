import { useContext } from 'react';

import { ThemeContext, type ThemeContextValue } from './theme-provider';

/**
 * Themed values for anywhere a NativeWind class cannot reach: navigation chrome,
 * the status bar, SVG stroke colors and animated styles.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used inside <ThemeProvider>');
  }

  return context;
}
