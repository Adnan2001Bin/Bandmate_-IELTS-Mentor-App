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
  const session = useSessionStore((state) => state.session);

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

  // The three states the app can be in. Guarding here rather than redirecting
  // from screens means an unauthorised route never mounts in the first place.
  const isSignedOut = session === null;
  const needsOnboarding = session !== null && !session.hasCompletedOnboarding;
  const isOnboarded = session !== null && session.hasCompletedOnboarding;

  return (
    <NavigationThemeProvider value={buildNavigationTheme(scheme, colors)}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
      >
        <Stack.Protected guard={isSignedOut}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>

        <Stack.Protected guard={needsOnboarding}>
          <Stack.Screen name="(onboarding)" />
        </Stack.Protected>

        <Stack.Protected guard={isOnboarded}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(modals)" options={{ presentation: 'modal' }} />
          <Stack.Screen name="session" />
          <Stack.Screen name="practice" />
          <Stack.Screen name="mock" />
          <Stack.Screen name="progress" />
          <Stack.Screen name="mistakes" />
          <Stack.Screen name="profile" />
          <Stack.Screen name="design-system" />
        </Stack.Protected>
      </Stack>
    </NavigationThemeProvider>
  );
}
