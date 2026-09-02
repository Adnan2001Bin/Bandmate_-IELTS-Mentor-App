import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { View } from 'react-native';

import { ExplanationCard, GrammarQuestion, TestProgress } from '@/components/ielts';
import { Button, ErrorState, Screen, Skeleton } from '@/components/ui';
import { isAnswerCorrect } from '@/lib/listening';
import {
  grammarLessonHref,
  grammarResultHref,
  useGrammarAttemptStore,
  useGrammarLesson,
  useSubmitGrammar,
} from '@/features/grammar';

export default function GrammarPracticeScreen() {
  const router = useRouter();
  const { lessonId = '' } = useLocalSearchParams<{ lessonId: string }>();
  const { data: lesson, isPending, isError, refetch } = useGrammarLesson(lessonId);
  const submit = useSubmitGrammar();

  const storeLessonId = useGrammarAttemptStore((state) => state.lessonId);
  const index = useGrammarAttemptStore((state) => state.index);
  const answers = useGrammarAttemptStore((state) => state.answers);
  const checked = useGrammarAttemptStore((state) => state.checked);
  const setAnswer = useGrammarAttemptStore((state) => state.setAnswer);
  const markChecked = useGrammarAttemptStore((state) => state.markChecked);
  const setIndex = useGrammarAttemptStore((state) => state.setIndex);
  const setResult = useGrammarAttemptStore((state) => state.setResult);

  const item = lesson?.questions[index];
  const value = item ? (answers[item.id] ?? '') : '';
  const revealed = Boolean(item && checked[item.id]);
  const isLast = lesson ? index >= lesson.questions.length - 1 : true;

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

  if (isError || !lesson || !item || storeLessonId !== lessonId) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <ErrorState
            onRetry={() => {
              if (storeLessonId !== lessonId) {
                router.replace(grammarLessonHref(lessonId));
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
      { lessonId, answers: useGrammarAttemptStore.getState().answers },
      {
        onSuccess: (result) => {
          setResult(result);
          router.replace(grammarResultHref(lessonId));
        },
      },
    );
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <TestProgress total={lesson.questions.length} current={index} onBack={() => router.back()} />

      <View className="flex-1 px-6 pt-6">
        <GrammarQuestion
          item={item}
          index={index}
          total={lesson.questions.length}
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
