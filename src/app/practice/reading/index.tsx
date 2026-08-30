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
  DIFFICULTY_LABEL,
  TEST_TYPE_LABEL,
  readingSetHref,
  readingStudyHref,
  useReadingSaved,
  useReadingSets,
} from '@/features/reading';
import type { TestType } from '@/types';

type Filter = 'all' | TestType;

const FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'academic', label: 'Academic' },
  { value: 'general', label: 'GT' },
] as const;

export default function ReadingLibraryScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useReadingSets();
  const { data: saved } = useReadingSaved();
  const [filter, setFilter] = useState<Filter>('all');

  const sets = useMemo(() => {
    if (!data) {
      return [];
    }
    if (filter === 'all') {
      return data;
    }
    return data.filter((set) => set.testType === filter);
  }, [data, filter]);

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Reading" kicker="Practice" size="compact" onBack={() => router.back()} />
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
        <AppHeader title="Reading" kicker="Practice" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title="Reading" kicker="Practice" size="compact" onBack={() => router.back()} />

      <View className="px-6 pt-5">
        <Text variant="bodySm" tone="muted">
          Passage papers, not a full 40. Academic and General Training. Original text — nothing from
          a Cambridge book.
        </Text>
        <View className="pt-4">
          <SegmentedControl options={FILTER_OPTIONS} value={filter} onChange={setFilter} />
        </View>
      </View>

      {saved && saved.length > 0 ? (
        <View className="px-6 pt-6">
          <Text variant="kicker" tone="subtle" className="pb-3">
            Saved
          </Text>
          <Rule weight="section" />
          {saved.map((item) => (
            <View key={`${item.setId}-${item.questionId}`}>
              <ListRow
                label={`Q${item.number} · ${item.setTitle}`}
                description={item.prompt}
                onPress={() => router.push(readingStudyHref(item.setId, item.questionId))}
              />
              <Rule />
            </View>
          ))}
        </View>
      ) : null}

      <View className="px-6 pt-4">
        <Text variant="kicker" tone="subtle" className="pb-3">
          Passages
        </Text>
        <Rule weight="section" />
        {sets.map((set) => (
          <View key={set.id}>
            <ListRow
              label={set.title}
              description={`${TEST_TYPE_LABEL[set.testType]} · ${set.questionCount} questions · ${set.minutes} min`}
              accessory={
                <View className="items-end gap-1">
                  {set.recommended ? <Tag label="Today" tone="accent" /> : null}
                  <Tag label={DIFFICULTY_LABEL[set.difficulty]} tone="outline" />
                </View>
              }
              onPress={() => router.push(readingSetHref(set.id))}
            />
            <Rule />
          </View>
        ))}
      </View>
    </Screen>
  );
}
