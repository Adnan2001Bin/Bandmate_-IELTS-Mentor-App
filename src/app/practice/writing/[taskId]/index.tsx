import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';

import { WritingVisual } from '@/components/ielts';
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
  KIND_LABEL,
  TEST_TYPE_LABEL,
  taskTypeLabel,
  useWritingAttemptStore,
  useWritingDraft,
  useWritingTask,
  writingHandwriteHref,
  writingWriteHref,
} from '@/features/writing';
import type { WritingMethod, WritingMode } from '@/types';

const MODE_OPTIONS = [
  { value: 'timed', label: 'Timed' },
  { value: 'untimed', label: 'Untimed' },
] as const;

const METHOD_OPTIONS = [
  { value: 'typed', label: 'Type' },
  { value: 'handwritten', label: 'Paper' },
] as const;

export default function WritingBriefScreen() {
  const router = useRouter();
  const { taskId = '' } = useLocalSearchParams<{ taskId: string }>();
  const { data: task, isPending, isError, refetch } = useWritingTask(taskId);
  const { data: draft } = useWritingDraft(taskId);
  const start = useWritingAttemptStore((state) => state.start);
  const [mode, setMode] = useState<WritingMode>('timed');
  const [method, setMethod] = useState<WritingMethod>('typed');

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

  if (isError || !task) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  const hasDraft = Boolean(draft?.body.trim());

  const go = () => {
    start({
      taskId: task.id,
      mode,
      method,
      remainingMs: mode === 'timed' ? (draft?.remainingMs || task.minutes * 60_000) : 0,
      body: draft?.body ?? '',
    });
    router.push(method === 'handwritten' ? writingHandwriteHref(task.id) : writingWriteHref(task.id));
  };

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader
        title={task.title}
        kicker={`${KIND_LABEL[task.kind]} · ${TEST_TYPE_LABEL[task.testType]}`}
        size="compact"
        onBack={() => router.back()}
      />

      <View className="gap-4 px-6 pt-5">
        <View className="flex-row flex-wrap gap-1">
          <Tag label={taskTypeLabel(task)} tone="outline" />
          <Tag label={`${task.minWords}+ words`} tone="outline" />
          <Tag label={`${task.minutes} min`} tone="outline" />
          {hasDraft ? <Tag label="Draft on device" tone="accent" /> : null}
        </View>

        <Text variant="bodySm" tone="muted">
          {task.instruction}
        </Text>
        <Text variant="body">{task.prompt}</Text>
        {task.visual ? <WritingVisual visual={task.visual} /> : null}

        <Rule />

        <Text variant="kicker" tone="subtle">
          Clock
        </Text>
        <SegmentedControl options={MODE_OPTIONS} value={mode} onChange={setMode} />
        <Text variant="caption" tone="muted">
          {mode === 'timed'
            ? `A ${task.minutes}-minute clock. Auto-save still runs. This is practice, not test day.`
            : 'No clock. Auto-save still runs. Submit when the piece is ready.'}
        </Text>

        <Text variant="kicker" tone="subtle">
          How you write
        </Text>
        <SegmentedControl options={METHOD_OPTIONS} value={method} onChange={setMethod} />
        <Text variant="caption" tone="muted">
          {method === 'typed'
            ? 'Type in the app. The keyboard is the point.'
            : 'Add mock pages, then a simulated reading of the handwriting. No real OCR is running.'}
        </Text>
      </View>

      <View className="px-6 pb-2 pt-6">
        <Button
          label={hasDraft ? 'Continue' : 'Start'}
          trailingIcon={ArrowRight}
          onPress={go}
        />
      </View>
    </Screen>
  );
}
