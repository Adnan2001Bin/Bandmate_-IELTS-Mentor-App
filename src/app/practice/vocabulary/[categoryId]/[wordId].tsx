import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { VocabularyDetail } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { Button, ErrorState, Screen, Skeleton } from '@/components/ui';
import {
  useMarkDifficult,
  useVocabAttemptStore,
  useVocabWord,
  vocabCategoryHref,
  vocabQuizHref,
} from '@/features/vocabulary';

export default function VocabWordScreen() {
  const router = useRouter();
  const { categoryId = '', wordId = '' } = useLocalSearchParams<{
    categoryId: string;
    wordId: string;
  }>();
  const { data, isPending, isError, refetch } = useVocabWord(wordId);
  const mark = useMarkDifficult();
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
      <AppHeader title={data.headword} kicker="Vocabulary" size="compact" onBack={() => router.back()} />

      <View className="px-6 pt-5">
        <VocabularyDetail word={data} />
      </View>

      <View className="px-6 pb-2 pt-6">
        <Button
          label="Quiz this set"
          trailingIcon={ArrowRight}
          onPress={() => {
            startQuiz(categoryId);
            router.push(vocabQuizHref(categoryId));
          }}
        />
        <Button
          label={mark.isSuccess ? 'Marked hard' : 'Mark as hard'}
          variant="ghost"
          size="md"
          className="mt-1 px-0"
          loading={mark.isPending}
          disabled={mark.isSuccess}
          onPress={() => mark.mutate(data.id)}
        />
        <Button
          label="Back to set"
          variant="ghost"
          size="md"
          className="mt-1 px-0"
          onPress={() => router.replace(vocabCategoryHref(categoryId))}
        />
      </View>
    </Screen>
  );
}
