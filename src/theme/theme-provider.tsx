import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { storage, storageKeys } from '@/lib/storage';
import { dark, light, type Palette } from './palette';

export type AppearanceMode = 'light' | 'dark' | 'system';
export type ResolvedScheme = 'light' | 'dark';

export type ThemeContextValue = {
  /** What the user chose. Defaults to `system` per THEME.md. */
  mode: AppearanceMode;
  /** What `mode` currently resolves to on this device. */
  scheme: ResolvedScheme;
  colors: Palette;
  setMode: (mode: AppearanceMode) => void;
  /** False until the persisted choice has been read, so we never flash the wrong theme. */
  isReady: boolean;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const isAppearanceMode = (value: unknown): value is AppearanceMode =>
  value === 'light' || value === 'dark' || value === 'system';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { colorScheme, setColorScheme } = useNativeWindColorScheme();
  const [mode, setModeState] = useState<AppearanceMode>('system');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    void storage.get<AppearanceMode>(storageKeys.appearanceMode).then((stored) => {
      if (cancelled) return;
      if (isAppearanceMode(stored)) {
        setModeState(stored);
        setColorScheme(stored);
      }
      setIsReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [setColorScheme]);

  const setMode = useCallback(
    (next: AppearanceMode) => {
      setModeState(next);
      setColorScheme(next);
      void storage.set(storageKeys.appearanceMode, next);
    },
    [setColorScheme],
  );

  const scheme: ResolvedScheme = colorScheme === 'dark' ? 'dark' : 'light';

  const value = useMemo<ThemeContextValue>(
    () => ({ mode, scheme, colors: scheme === 'dark' ? dark : light, setMode, isReady }),
    [mode, scheme, setMode, isReady],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
