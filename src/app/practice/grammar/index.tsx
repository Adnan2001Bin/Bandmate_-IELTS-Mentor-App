import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import { ErrorState, ListRow, Rule, Screen, Skeleton, Tag, Text } from '@/components/ui';
import { grammarLessonHref, useGrammarLessons } from '@/features/grammar';

export default function GrammarLibraryScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useGrammarLessons();

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Grammar" kicker="Practice" size="compact" onBack={() => router.back()} />
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
        <AppHeader title="Grammar" kicker="Practice" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title="Grammar" kicker="Practice" size="compact" onBack={() => router.back()} />

      <View className="px-6 pt-5">
        <Text variant="bodySm" tone="muted">
          Eleven IELTS-focused lessons. Learn, then a short drill. Mira names the pattern — she does
          not say “Correct!”.
        </Text>
      </View>

      <View className="px-6 pt-4">
        <Rule weight="section" />
        {data.map((lesson) => (
          <View key={lesson.id}>
            <ListRow
              label={lesson.title}
              description={`${lesson.minutes} min · ${lesson.questionCount} items`}
              accessory={lesson.recommended ? <Tag label="Today" tone="accent" /> : undefined}
              onPress={() => router.push(grammarLessonHref(lesson.id))}
            />
            <Rule />
          </View>
        ))}
      </View>
    </Screen>
  );
}
