import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { Rule, Screen, Tag, Text } from '@/components/ui';
import { AppHeader } from './app-header';

export type PlaceholderProps = {
  title: string;
  kicker?: string;
  /** The phase that fills this route in, e.g. "Phase 07A". */
  phase: string;
  /** One line on what will live here, so the shell is readable while empty. */
  summary: string;
  /** Shows a back control. Tab roots do not have one. */
  backable?: boolean;
};

/**
 * A route that exists so navigation can be built and tested before its feature
 * is written. Every one of these is replaced by real content in the phase it
 * names, and none should survive to release.
 */
export function Placeholder({ title, kicker, phase, summary, backable = false }: PlaceholderProps) {
  const router = useRouter();

  return (
    <Screen>
      <AppHeader
        title={title}
        kicker={kicker}
        onBack={backable ? () => router.back() : undefined}
        size={backable ? 'compact' : 'display'}
      />

      <View className="gap-4 px-6 pt-6">
        <Tag label={phase} tone="outline" />
        <Text variant="body" tone="muted">
          {summary}
        </Text>
        <Rule />
      </View>
    </Screen>
  );
}
