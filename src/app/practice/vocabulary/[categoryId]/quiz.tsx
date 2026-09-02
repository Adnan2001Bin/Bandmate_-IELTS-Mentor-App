import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { ExplanationCard, GrammarQuestion, TestProgress } from '@/components/ielts';
import { Button, ErrorState, Screen, Skeleton } from '@/components/ui';
import { isAnswerCorrect } from '@/lib/listening';
import {
  useSubmitVocabQuiz,
  useVocabAttemptStore,
  useVocabQuiz,
  vocabCategoryHref,
  vocabQuizResultHref,
} from '@/features/vocabulary';

export default function VocabQuizScreen() {
  const router = useRouter();
  const { categoryId = '' } = useLocalSearchParams<{ categoryId: string }>();
  const { data: quiz, isPending, isError, refetch } = useVocabQuiz(categoryId);
  const submit = useSubmitVocabQuiz();

  const storeCategory = useVocabAttemptStore((state) => state.categoryId);
  const index = useVocabAttemptStore((state) => state.index);
  const answers = useVocabAttemptStore((state) => state.answers);
  const checked = useVocabAttemptStore((state) => state.checked);
  const setAnswer = useVocabAttemptStore((state) => state.setAnswer);
  const markChecked = useVocabAttemptStore((state) => state.markChecked);
  const setIndex = useVocabAttemptStore((state) => state.setIndex);
  const setResult = useVocabAttemptStore((state) => state.setResult);

  const item = quiz?.[index];
  const value = item ? (answers[item.id] ?? '') : '';
  const revealed = Boolean(item && checked[item.id]);
  const isLast = quiz ? index >= quiz.length - 1 : true;

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="gap-3 px-6 pt-8">
          <Skeleton height={24} />
          <Skeleton height={120} />
        </View>
      </Screen>
    );
  }

  if (isError || !quiz || !item || storeCategory !== categoryId) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <ErrorState
            onRetry={() => {
              if (storeCategory !== categoryId) {
                router.replace(vocabCategoryHref(categoryId));
                return;
              }
              void refetch();
            }}
          />
        </View>
      </Screen>
    );
  }

  const finish = () => {
    if (submit.isPending) {
      return;
    }
    submit.mutate(
      { categoryId, answers: useVocabAttemptStore.getState().answers },
      {
        onSuccess: (result) => {
          setResult(result);
          router.replace(vocabQuizResultHref(categoryId));
        },
      },
    );
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <TestProgress total={quiz.length} current={index} onBack={() => router.back()} />

      <View className="flex-1 px-6 pt-6">
        <GrammarQuestion
          item={item}
          index={index}
          total={quiz.length}
          selected={value}
          revealed={revealed}
          onSelect={(option) => setAnswer(item.id, option)}
        />
        {revealed ? (
          <View className="mt-4">
            <ExplanationCard
              body={item.why}
              given={isAnswerCorrect(value, item.correct) ? undefined : value}
              expected={isAnswerCorrect(value, item.correct) ? undefined : item.correct}
            />
          </View>
        ) : null}
      </View>

      <View className="px-6 pb-2 pt-3">
        {revealed ? (
          <Button
            label={isLast ? 'See result' : 'Next'}
            trailingIcon={ArrowRight}
            loading={submit.isPending}
            onPress={() => {
              if (isLast) {
                finish();
                return;
              }
              setIndex(index + 1);
            }}
          />
        ) : (
          <Button
            label="Check"
            disabled={!value}
            onPress={() => {
              void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              markChecked(item.id);
            }}
          />
        )}
      </View>
    </Screen>
  );
}
