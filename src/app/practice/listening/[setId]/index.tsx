import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import {
  Button,
  ErrorState,
  Rule,
  Screen,
  SegmentedControl,
  Skeleton,
  Tag,
  Text,
} from '@/components/ui';
import {
  ACCENT_LABEL,
  DIFFICULTY_LABEL,
  QUESTION_TYPE_LABEL,
  useListeningAttemptStore,
  useListeningSet,
  listeningRunHref,
} from '@/features/listening';
import type { ListeningMode } from '@/types';

const MODE_OPTIONS = [
  { value: 'practice', label: 'Practice' },
  { value: 'timed', label: 'Timed' },
] as const;

export default function ListeningInstructionsScreen() {
  const router = useRouter();
  const { setId = '' } = useLocalSearchParams<{ setId: string }>();
  const { data: set, isPending, isError, refetch } = useListeningSet(setId);
  const start = useListeningAttemptStore((state) => state.start);
  const [mode, setMode] = useState<ListeningMode>('practice');

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="gap-3 px-6 pt-8">
          <Skeleton height={24} />
          <Skeleton height={80} />
        </View>
      </Screen>
    );
  }

  if (isError || !set) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  const types = [...new Set(set.groups.map((group) => QUESTION_TYPE_LABEL[group.type]))];

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader
        title={set.title}
        kicker={`Section ${set.section}`}
        size="compact"
        onBack={() => router.back()}
      />

      <View className="gap-4 px-6 pt-5">
        <View className="flex-row flex-wrap gap-1">
          <Tag label={DIFFICULTY_LABEL[set.difficulty]} tone="outline" />
          <Tag label={ACCENT_LABEL[set.accent]} tone="outline" />
          <Tag label={`${set.questionCount} questions`} tone="outline" />
          <Tag label={`${set.minutes} min`} tone="outline" />
        </View>

        <Text variant="bodySm" tone="muted">
          {types.join(' · ')}
        </Text>

        <Rule />

        <Text variant="kicker" tone="subtle">
          Mode
        </Text>
        <SegmentedControl options={MODE_OPTIONS} value={mode} onChange={setMode} />
        <Text variant="caption" tone="muted">
          {mode === 'practice'
            ? 'Check after each question. Mira names the trap. You can replay any timestamp.'
            : `A ${set.minutes}-minute clock. No per-question reveal — that waits until you submit. Replay still works; this is not test day.`}
        </Text>

        <Rule />

        <Text variant="h4">Before you start</Text>
        <Text variant="bodySm" tone="muted">
          You will hear a mock recording with a real clock. Scripts are original. Answers are
          marked against the key in the service, not inside this screen.
        </Text>
      </View>

      <View className="px-6 pb-2 pt-6">
        <Button
          label="Start"
          trailingIcon={ArrowRight}
          onPress={() => {
            start({
              setId: set.id,
              mode,
              remainingMs: mode === 'timed' ? set.minutes * 60_000 : 0,
            });
            router.push(listeningRunHref(set.id));
          }}
        />
      </View>
    </Screen>
  );
}
