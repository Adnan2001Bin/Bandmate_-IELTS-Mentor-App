import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { CueCard } from '@/components/ielts';
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
  MODE_BLURB,
  MODE_LABEL,
  SPEAKING_LIBRARY_HREF,
  speakingRunHref,
  useSpeakingAttemptStore,
  useSpeakingTopic,
} from '@/features/speaking';
import { partLabel } from '@/lib/speaking';
import type { SpeakingMode } from '@/types';

const MODE_OPTIONS = [
  { value: 'practice', label: 'Practice' },
  { value: 'examiner', label: 'Examiner' },
  { value: 'challenge', label: 'Challenge' },
] as const;

export default function SpeakingBriefScreen() {
  const router = useRouter();
  const { topicId = '', from } = useLocalSearchParams<{ topicId: string; from?: string }>();
  const { data: topic, isPending, isError, refetch } = useSpeakingTopic(topicId);
  const start = useSpeakingAttemptStore((state) => state.start);
  const [mode, setMode] = useState<SpeakingMode>(from === 'random' ? 'examiner' : 'practice');
  const fromRandom = from === 'random';

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

  if (isError || !topic) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  const go = () => {
    start({ topicId: topic.id, mode, fromRandom });
    router.push(speakingRunHref(topic.id));
  };

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader
        title={topic.title}
        kicker={fromRandom ? 'Random test' : topic.theme}
        size="compact"
        onBack={() => router.back()}
      />

      <View className="gap-4 px-6 pt-5">
        <View className="flex-row flex-wrap gap-1">
          <Tag label={`${topic.minutes} min`} tone="outline" />
          <Tag label={partLabel(1)} tone="outline" />
          <Tag label={partLabel(2)} tone="outline" />
          <Tag label={partLabel(3)} tone="outline" />
          {fromRandom ? <Tag label="Chosen for you" tone="accent" /> : null}
        </View>

        <Text variant="bodySm" tone="muted">
          {topic.intro}
        </Text>

        <Text variant="kicker" tone="subtle">
          Part 2 cue
        </Text>
        <CueCard title={topic.part2.title} bullets={topic.part2.bullets} />

        <Rule />

        <Text variant="kicker" tone="subtle">
          Mode
        </Text>
        <SegmentedControl options={MODE_OPTIONS} value={mode} onChange={setMode} />
        <Text variant="caption" tone="muted">
          {MODE_BLURB[mode]}
        </Text>
      </View>

      <View className="px-6 pb-2 pt-6">
        <Button
          label={`Start · ${MODE_LABEL[mode]}`}
          trailingIcon={ArrowRight}
          onPress={go}
        />
        <Button
          label="Back to library"
          variant="ghost"
          size="md"
          onPress={() => router.replace(SPEAKING_LIBRARY_HREF)}
          className="mt-1 px-0"
        />
      </View>
    </Screen>
  );
}
