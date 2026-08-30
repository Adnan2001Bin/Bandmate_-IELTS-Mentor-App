import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import { ErrorState, ListRow, Rule, Screen, Skeleton, Tag, Text } from '@/components/ui';
import { ACCENT_LABEL, DIFFICULTY_LABEL, useListeningSets, listeningSetHref } from '@/features/listening';

export default function ListeningLibraryScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useListeningSets();

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Listening" kicker="Practice" size="compact" onBack={() => router.back()} />
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
        <AppHeader title="Listening" kicker="Practice" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title="Listening" kicker="Practice" size="compact" onBack={() => router.back()} />

      <View className="px-6 pt-5">
        <Text variant="bodySm" tone="muted">
          Section papers, not a full 40. The mock test is Phase 09. Original scripts — nothing from
          a Cambridge book.
        </Text>
      </View>

      <View className="px-6 pt-4">
        {data.map((set, index) => (
          <View key={set.id}>
            {index > 0 ? <Rule /> : null}
            <ListRow
              label={set.title}
              description={`Section ${set.section} · ${set.questionCount} questions · ${set.minutes} min · ${ACCENT_LABEL[set.accent]}`}
              accessory={
                <View className="items-end gap-1">
                  {set.recommended ? <Tag label="Today" tone="accent" /> : null}
                  <Tag label={DIFFICULTY_LABEL[set.difficulty]} tone="outline" />
                </View>
              }
              onPress={() => router.push(listeningSetHref(set.id))}
            />
          </View>
        ))}
        <Rule weight="section" />
      </View>
    </Screen>
  );
}
