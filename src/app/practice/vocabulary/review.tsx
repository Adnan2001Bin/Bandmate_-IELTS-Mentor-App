import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useEffect } from 'react';
import { View } from 'react-native';

import { VocabularyDetail } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { Button, EmptyState, ErrorState, Screen, Skeleton, Text } from '@/components/ui';
import {
  VOCABULARY_LIBRARY_HREF,
  useFinishVocabReview,
  useReviewWord,
  useVocabAttemptStore,
  useVocabDue,
  vocabReviewResultHref,
} from '@/features/vocabulary';

export default function VocabReviewScreen() {
  const router = useRouter();
  const { data, isPending, isError, refetch } = useVocabDue();
  const review = useReviewWord();
  const finish = useFinishVocabReview();

  const reviewWords = useVocabAttemptStore((state) => state.reviewWords);
  const reviewIndex = useVocabAttemptStore((state) => state.reviewIndex);
  const revealed = useVocabAttemptStore((state) => state.revealed);
  const startReview = useVocabAttemptStore((state) => state.startReview);
  const setRevealed = useVocabAttemptStore((state) => state.setRevealed);
  const setGrade = useVocabAttemptStore((state) => state.setGrade);
  const setReviewIndex = useVocabAttemptStore((state) => state.setReviewIndex);
  const setReviewResult = useVocabAttemptStore((state) => state.setReviewResult);

  useEffect(() => {
    if (!data) {
      return;
    }
    const state = useVocabAttemptStore.getState();
    if (state.reviewResult || state.reviewWords.length === 0) {
      startReview(data);
    }
  }, [data, startReview]);

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Review" kicker="Vocabulary" size="compact" onBack={() => router.back()} />
        <View className="gap-3 px-6 pt-4">
          <Skeleton height={120} />
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

  const queue = reviewWords.length > 0 ? reviewWords : (data ?? []);
  const word = queue[reviewIndex];

  if (!word || queue.length === 0) {
    return (
      <Screen edges={['top', 'bottom']}>
        <AppHeader title="Review" kicker="Vocabulary" size="compact" onBack={() => router.back()} />
        <View className="px-6 pt-6">
          <EmptyState
            title="Nothing is due"
            description="Learn a set, then the 1 / 2 / 4 / 7 / 14-day clock will put words here."
            action={{ label: 'Library', onPress: () => router.replace(VOCABULARY_LIBRARY_HREF) }}
          />
        </View>
      </Screen>
    );
  }

  const isLast = reviewIndex >= queue.length - 1;

  const grade = (knew: boolean) => {
    review.mutate({ wordId: word.id, knew });
    setGrade(word.id, knew ? 'knew' : 'missed');

    if (isLast) {
      const nextGrades = {
        ...useVocabAttemptStore.getState().grades,
        [word.id]: knew ? ('knew' as const) : ('missed' as const),
      };
      const payload = Object.entries(nextGrades).map(([wordId, value]) => ({
        wordId,
        knew: value === 'knew',
      }));
      finish.mutate(payload, {
        onSuccess: (result) => {
          setReviewResult(result);
          router.replace(vocabReviewResultHref());
        },
      });
      return;
    }

    setReviewIndex(reviewIndex + 1);
  };

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader
        title="Review"
        kicker={`${reviewIndex + 1} of ${queue.length}`}
        size="compact"
        onBack={() => router.back()}
      />

      <View className="px-6 pt-6">
        <Text variant="displaySm">{word.headword}</Text>
        {!revealed ? (
          <Text variant="bodySm" tone="muted" className="mt-3">
            Say the meaning, then reveal. Mira is not listening — this is a recall check.
          </Text>
        ) : (
          <View className="mt-6">
            <VocabularyDetail word={word} />
          </View>
        )}
      </View>

      <View className="px-6 pb-2 pt-6">
        {revealed ? (
          <>
            <Button
              label="I knew it"
              trailingIcon={ArrowRight}
              loading={review.isPending || finish.isPending}
              onPress={() => grade(true)}
            />
            <Button
              label="I missed it"
              variant="ghost"
              size="md"
              className="mt-1 px-0"
              disabled={review.isPending || finish.isPending}
              onPress={() => grade(false)}
            />
          </>
        ) : (
          <Button label="Reveal" onPress={() => setRevealed(true)} />
        )}
      </View>
    </Screen>
  );
}
