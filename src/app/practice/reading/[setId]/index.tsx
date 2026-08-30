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
  DIFFICULTY_LABEL,
  QUESTION_TYPE_LABEL,
  TEST_TYPE_LABEL,
  readingRunHref,
  useReadingAttemptStore,
  useReadingSet,
} from '@/features/reading';
import type { ReadingMode } from '@/types';

const MODE_OPTIONS = [
  { value: 'practice', label: 'Practice' },
  { value: 'timed', label: 'Timed' },
] as const;

export default function ReadingBriefScreen() {
  const router = useRouter();
  const { setId = '' } = useLocalSearchParams<{ setId: string }>();
  const { data: set, isPending, isError, refetch } = useReadingSet(setId);
  const start = useReadingAttemptStore((state) => state.start);
  const [mode, setMode] = useState<ReadingMode>('practice');

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
        kicker={TEST_TYPE_LABEL[set.testType]}
        size="compact"
        onBack={() => router.back()}
      />

      <View className="gap-4 px-6 pt-5">
        <View className="flex-row flex-wrap gap-1">
          <Tag label={DIFFICULTY_LABEL[set.difficulty]} tone="outline" />
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
            ? 'Check after each question. The passage marks the paragraph the answer lives in. Mira names the trap.'
            : `A ${set.minutes}-minute clock. No per-question reveal — that waits until you submit. You can still switch between passage and questions.`}
        </Text>

        <Rule />

        <Text variant="h4">Before you start</Text>
        <Text variant="bodySm" tone="muted">
          The passage is body size — not a footnote. On a phone, Passage and Questions are two
          panes, not a split. Original text. Answers are marked against the key in the service, not
          inside this screen.
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
            router.push(readingRunHref(set.id));
          }}
        />
      </View>
    </Screen>
  );
}
