import '@/theme/global.css';

import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { AppProviders } from '@/providers/app-providers';
import { useSessionStore } from '@/store';
import { appFonts, buildNavigationTheme, useTheme } from '@/theme';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}

function RootNavigator() {
  const { scheme, colors, isReady: isThemeReady } = useTheme();
  const [fontsLoaded, fontError] = useFonts(appFonts);
  const hydrate = useSessionStore((state) => state.hydrate);
  const isSessionHydrated = useSessionStore((state) => state.isHydrated);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  // Hold the splash until the theme, fonts and session are all settled, so the
  // first frame is never the wrong colour or the wrong route.
  const canRender = isThemeReady && isSessionHydrated && (fontsLoaded || Boolean(fontError));

  useEffect(() => {
    if (canRender) {
      void SplashScreen.hideAsync();
    }
  }, [canRender]);

  if (!canRender) {
    return null;
  }

  return (
    <NavigationThemeProvider value={buildNavigationTheme(scheme, colors)}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
      />
    </NavigationThemeProvider>
  );
}
