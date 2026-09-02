import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { VocabularyCard } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { Button, ErrorState, Rule, Screen, Skeleton, Text } from '@/components/ui';
import {
  VOCABULARY_LIBRARY_HREF,
  useVocabAttemptStore,
  useVocabCategory,
  vocabQuizHref,
  vocabWordHref,
} from '@/features/vocabulary';

export default function VocabCategoryScreen() {
  const router = useRouter();
  const { categoryId = '' } = useLocalSearchParams<{ categoryId: string }>();
  const { data, isPending, isError, refetch } = useVocabCategory(categoryId);
  const startQuiz = useVocabAttemptStore((state) => state.startQuiz);

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

  if (isError || !data) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader title={data.title} kicker="Vocabulary" size="compact" onBack={() => router.back()} />

      <View className="px-6 pt-5">
        <Text variant="bodySm" tone="muted">
          {data.blurb}
        </Text>
      </View>

      <View className="px-6 pt-4">
        <Rule weight="section" />
        {data.words.map((word) => {
          const flags = data.flags[word.id];
          return (
            <View key={word.id}>
              <VocabularyCard
                word={word}
                due={flags?.due}
                known={flags?.known}
                difficult={flags?.difficult}
                onPress={() => router.push(vocabWordHref(data.id, word.id))}
              />
              <Rule />
            </View>
          );
        })}
      </View>

      <View className="px-6 pb-2 pt-5">
        <Button
          label="Mini quiz"
          trailingIcon={ArrowRight}
          onPress={() => {
            startQuiz(data.id);
            router.push(vocabQuizHref(data.id));
          }}
        />
        <Button
          label="Back to library"
          variant="ghost"
          size="md"
          className="mt-1 px-0"
          onPress={() => router.replace(VOCABULARY_LIBRARY_HREF)}
        />
      </View>
    </Screen>
  );
}
