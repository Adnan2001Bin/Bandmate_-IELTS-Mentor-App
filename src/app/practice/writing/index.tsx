import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import {
  ErrorState,
  ListRow,
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
  useWritingDrafts,
  useWritingTasks,
  writingTaskHref,
} from '@/features/writing';
import type { WritingTaskKind } from '@/types';

type Filter = 'all' | WritingTaskKind;

const FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'task1', label: 'Task 1' },
  { value: 'task2', label: 'Task 2' },
] as const;

export default function WritingLibraryScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useWritingTasks();
  const { data: drafts } = useWritingDrafts();
  const [filter, setFilter] = useState<Filter>('all');

  const draftIds = useMemo(
    () => new Set((drafts ?? []).filter((item) => item.body.trim().length > 0).map((item) => item.taskId)),
    [drafts],
  );

  const tasks = useMemo(() => {
    if (!data) {
      return [];
    }
    if (filter === 'all') {
      return data;
    }
    return data.filter((task) => task.kind === filter);
  }, [data, filter]);

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Writing" kicker="Practice" size="compact" onBack={() => router.back()} />
        <View className="gap-3 px-6 pt-4">
          <Skeleton height={72} />
          <Skeleton height={72} />
        </View>
      </Screen>
    );
  }

  if (isError || !data) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Writing" kicker="Practice" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title="Writing" kicker="Practice" size="compact" onBack={() => router.back()} />

      <View className="px-6 pt-5">
        <Text variant="bodySm" tone="muted">
          Task 1 and Task 2, Academic and General Training. Original prompts. The timed pair is on
          the Mock tab.
        </Text>
        <View className="pt-4">
          <SegmentedControl options={FILTER_OPTIONS} value={filter} onChange={setFilter} />
        </View>
      </View>

      <View className="px-6 pt-4">
        <Rule weight="section" />
        {tasks.map((task) => (
          <View key={task.id}>
            <ListRow
              label={task.title}
              description={`${KIND_LABEL[task.kind]} · ${TEST_TYPE_LABEL[task.testType]} · ${taskTypeLabel(task)} · ${task.minutes} min`}
              accessory={
                <View className="items-end gap-1">
                  {draftIds.has(task.id) ? <Tag label="Draft" tone="accent" /> : null}
                  {task.recommended ? <Tag label="Today" tone="accent" /> : null}
                </View>
              }
              onPress={() => router.push(writingTaskHref(task.id))}
            />
            <Rule />
          </View>
        ))}
      </View>
    </Screen>
  );
}
