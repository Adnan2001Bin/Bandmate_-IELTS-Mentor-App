import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import {
  Button,
  ErrorState,
  Input,
  Rule,
  Screen,
  SegmentedControl,
  SettingsSection,
  SettingsToggle,
  Skeleton,
  Text,
} from '@/components/ui';
import {
  useNotificationPrefs,
  useProfile,
  useSetNotificationPrefs,
  useUpdateUserName,
} from '@/features/profile';
import { useSessionStore } from '@/store';
import { useTheme, type AppearanceMode } from '@/theme';

const APPEARANCE_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
] as const satisfies readonly { value: AppearanceMode; label: string }[];

export default function SettingsScreen() {
  const router = useRouter();
  const { mode, setMode } = useTheme();
  const signOut = useSessionStore((state) => state.signOut);
  const profile = useProfile();
  const notifications = useNotificationPrefs();
  const setPrefs = useSetNotificationPrefs();
  const saveName = useUpdateUserName();
  const [name, setName] = useState('');

  useEffect(() => {
    if (profile.data) {
      setName(profile.data.user.name);
    }
  }, [profile.data]);

  const prefs = notifications.data;
  const nameDirty = Boolean(profile.data && name.trim() !== profile.data.user.name && name.trim().length >= 2);

  if (profile.isPending || notifications.isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Settings" kicker="Profile" size="compact" onBack={() => router.back()} />
        <View className="gap-3 px-6 pt-6">
          <Skeleton height={72} />
          <Skeleton height={96} />
        </View>
      </Screen>
    );
  }

  if (profile.isError || notifications.isError || !profile.data || !prefs) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Settings" kicker="Profile" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState
            onRetry={() => {
              void profile.refetch();
              void notifications.refetch();
            }}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title="Settings" kicker="Profile" size="compact" onBack={() => router.back()} />

      <View className="gap-3 px-6 pt-6">
        <Text variant="kicker" tone="subtle">
          Appearance
        </Text>
        <SegmentedControl options={APPEARANCE_OPTIONS} value={mode} onChange={setMode} />
        <Text variant="caption" tone="muted">
          System follows your phone.
        </Text>
      </View>

      <SettingsSection
        title="Notifications"
        footer="Stored on this device. Nothing is pushed — there is no notification server here."
      >
        <SettingsToggle
          label="Daily reminder"
          description="When today’s session is still waiting."
          value={prefs.dailyReminder}
          onChange={(dailyReminder) => setPrefs.mutate({ dailyReminder })}
        />
        <Rule />
        <SettingsToggle
          label="Streak"
          description="Proof you showed up. Never a punishment."
          value={prefs.streak}
          onChange={(streak) => setPrefs.mutate({ streak })}
        />
        <Rule />
        <SettingsToggle
          label="Vocabulary due"
          description="When the review queue has cards waiting."
          value={prefs.vocabDue}
          onChange={(vocabDue) => setPrefs.mutate({ vocabDue })}
        />
        <Rule />
        <SettingsToggle
          label="Writing nudge"
          description="If you have not written this week."
          value={prefs.writingNudge}
          onChange={(writingNudge) => setPrefs.mutate({ writingNudge })}
        />
        <Rule />
        <SettingsToggle
          label="Exam countdown"
          description="A quiet note as the test date gets close."
          value={prefs.examCountdown}
          onChange={(examCountdown) => setPrefs.mutate({ examCountdown })}
        />
      </SettingsSection>

      <View className="gap-3 px-6 pt-6">
        <Text variant="kicker" tone="subtle">
          Account
        </Text>
        <Input
          label="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoComplete="name"
        />
        <Button
          label="Save name"
          variant="outline"
          loading={saveName.isPending}
          disabled={!nameDirty}
          onPress={() => saveName.mutate(name.trim())}
        />
        <Text variant="caption" tone="muted">
          {profile.data.user.email} · email is how you sign in.
        </Text>
      </View>

      <View className="px-6 pt-6">
        <Text variant="kicker" tone="subtle" className="pb-3">
          Plan
        </Text>
        <Rule weight="section" />
        <Text variant="h4" className="pt-4">
          This build has no payments
        </Text>
        <Text variant="bodySm" tone="muted" className="mt-2 pb-4">
          Everything is unlocked so the product can be walked. A paywall — limited daily questions,
          premium evaluations — is a later decision, not a screen that pretends to charge you.
        </Text>
        <Rule weight="section" />
      </View>

      <View className="px-6 pb-2 pt-6">
        <Button label="Sign out" variant="outline" onPress={() => void signOut()} />
        <Text variant="caption" tone="muted" className="mt-3">
          Sign out returns to welcome. Drafts and reports stay on this device until you clear app
          data.
        </Text>
      </View>
    </Screen>
  );
}
