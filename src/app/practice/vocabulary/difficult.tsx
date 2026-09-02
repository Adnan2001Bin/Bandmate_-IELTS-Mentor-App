import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { VocabularyCard } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { EmptyState, ErrorState, Rule, Screen, Skeleton } from '@/components/ui';
import {
  VOCABULARY_LIBRARY_HREF,
  useVocabDifficult,
  vocabWordHref,
} from '@/features/vocabulary';

export default function VocabDifficultScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useVocabDifficult();

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Difficult" kicker="Vocabulary" size="compact" onBack={() => router.back()} />
        <View className="gap-3 px-6 pt-4">
          <Skeleton height={72} />
        </View>
      </Screen>
    );
  }

  if (isError) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  const words = data ?? [];

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title="Difficult" kicker="Vocabulary" size="compact" onBack={() => router.back()} />

      <View className="px-6 pt-4">
        {words.length === 0 ? (
          <EmptyState
            title="No hard words yet"
            description="Miss a review or mark a word hard. They land here."
            action={{ label: 'Library', onPress: () => router.replace(VOCABULARY_LIBRARY_HREF) }}
          />
        ) : (
          <>
            <Rule weight="section" />
            {words.map((word) => (
              <View key={word.id}>
                <VocabularyCard
                  word={word}
                  difficult
                  onPress={() => router.push(vocabWordHref(word.categoryId, word.id))}
                />
                <Rule />
              </View>
            ))}
          </>
        )}
      </View>
    </Screen>
  );
}
