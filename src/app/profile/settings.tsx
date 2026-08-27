import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import { Rule, Screen, SegmentedControl, Tag, Text } from '@/components/ui';
import { useTheme, type AppearanceMode } from '@/theme';

const APPEARANCE_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
] as const satisfies readonly { value: AppearanceMode; label: string }[];

export default function SettingsScreen() {
  const router = useRouter();
  const { mode, setMode } = useTheme();

  return (
    <Screen scroll>
      <AppHeader title="Settings" kicker="Profile" size="compact" onBack={() => router.back()} />

      <View className="gap-3 px-6 pt-6">
        <Text variant="kicker" tone="subtle">
          Appearance
        </Text>
        <SegmentedControl options={APPEARANCE_OPTIONS} value={mode} onChange={setMode} />
        <Text variant="caption" tone="subtle">
          System follows your phone, switching with it.
        </Text>
      </View>

      <View className="mt-8 gap-4 px-6">
        <Rule weight="section" />
        <Tag label="Phase 10" tone="outline" />
        <Text variant="body" tone="muted">
          Notifications, study reminders, account and data controls are built here in Phase 10.
        </Text>
      </View>
    </Screen>
  );
}
