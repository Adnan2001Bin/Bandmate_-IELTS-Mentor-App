import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import {
  MiraNote,
  QuestionBody,
  QuestionCard,
  QuestionNavigator,
  ReadingDiagram,
  ReadingPassage,
  TestProgress,
  TestTimer,
} from '@/components/ielts';
import { Button, Dialog, ErrorState, Screen, SegmentedControl, Skeleton, Text } from '@/components/ui';
import {
  QUESTION_TYPE_LABEL,
  TEST_TYPE_LABEL,
  readingResultHref,
  readingSetHref,
  useReadingAttemptStore,
  useReadingSet,
  useSubmitReading,
} from '@/features/reading';
import { flattenQuestions, isAnswerCorrect } from '@/lib/reading';

type Pane = 'passage' | 'questions';

const PANE_OPTIONS = [
  { value: 'passage', label: 'Passage' },
  { value: 'questions', label: 'Questions' },
] as const;

export default function ReadingRunScreen() {
  const router = useRouter();
  const { setId = '' } = useLocalSearchParams<{ setId: string }>();
  const { data: set, isPending, isError, refetch } = useReadingSet(setId);
  const submit = useSubmitReading();
  const [pane, setPane] = useState<Pane>('questions');

  const mode = useReadingAttemptStore((state) => state.mode);
  const index = useReadingAttemptStore((state) => state.index);
  const answers = useReadingAttemptStore((state) => state.answers);
  const checked = useReadingAttemptStore((state) => state.checked);
  const remainingMs = useReadingAttemptStore((state) => state.remainingMs);
  const storeSetId = useReadingAttemptStore((state) => state.setId);
  const setAnswer = useReadingAttemptStore((state) => state.setAnswer);
  const markChecked = useReadingAttemptStore((state) => state.markChecked);
  const setIndex = useReadingAttemptStore((state) => state.setIndex);
  const setRemainingMs = useReadingAttemptStore((state) => state.setRemainingMs);
  const setResult = useReadingAttemptStore((state) => state.setResult);
  const result = useReadingAttemptStore((state) => state.result);

  const questions = set ? flattenQuestions(set) : [];
  const question = questions[index];
  const group = set?.groups.find((item) => item.questions.some((entry) => entry.id === question?.id));
  const value = question ? (answers[question.id] ?? '') : '';
  const isPractice = mode === 'practice';
  const revealed = Boolean(question && isPractice && checked[question.id]);
  const isLast = index >= questions.length - 1;
  const timedOut = mode === 'timed' && remainingMs <= 0 && storeSetId === setId;
  const highlightId = revealed ? question?.locateParagraphId : undefined;

  useEffect(() => {
    if (mode !== 'timed') {
      return;
    }

    const id = setInterval(() => {
      const current = useReadingAttemptStore.getState().remainingMs;
      if (current <= 0) {
        return;
      }
      setRemainingMs(Math.max(0, current - 1000));
    }, 1000);

    return () => clearInterval(id);
  }, [mode, setRemainingMs]);

  const finish = () => {
    if (!set || submit.isPending) {
      return;
    }

    submit.mutate(
      { setId: set.id, mode, answers: useReadingAttemptStore.getState().answers },
      {
        onSuccess: (next) => {
          setResult(next);
          router.replace(readingResultHref(set.id));
        },
      },
    );
  };

  const goTo = (next: number) => {
    setIndex(next);
    setPane('questions');
  };

  if (isPending) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="gap-3 px-6 pt-8">
          <Skeleton height={24} />
          <Skeleton height={64} />
        </View>
      </Screen>
    );
  }

  if (isError || !set || !question || storeSetId !== setId) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <ErrorState
            title={storeSetId !== setId ? 'This set has not been started' : undefined}
            description={
              storeSetId !== setId ? 'Go back to the brief and press Start.' : undefined
            }
            onRetry={() => {
              if (storeSetId !== setId) {
                router.replace(readingSetHref(setId));
                return;
              }
              void refetch();
            }}
          />
        </View>
      </Screen>
    );
  }

  const canCheck = value.trim().length > 0;
  const kicker = `${TEST_TYPE_LABEL[set.testType]} — ${QUESTION_TYPE_LABEL[question.type]}`;

  return (
    <Screen edges={['top', 'bottom']}>
      <TestProgress
        total={questions.length}
        current={index}
        onBack={() => router.back()}
        trailing={mode === 'timed' ? <TestTimer remainingMs={remainingMs} /> : null}
      />

      <View className="px-6 pt-4">
        <Text variant="kicker" tone="subtle">
          {kicker}
        </Text>
        <View className="pt-3">
          <SegmentedControl options={PANE_OPTIONS} value={pane} onChange={setPane} />
        </View>
      </View>

      <ScrollView className="flex-1" contentContainerClassName="px-6 pt-5 pb-4">
        {pane === 'passage' ? (
          <ReadingPassage
            title={set.passageTitle}
            paragraphs={set.paragraphs}
            highlightId={highlightId}
          />
        ) : (
          <View className="gap-4">
            {group?.visual ? (
              <ReadingDiagram title={group.visual.title} parts={group.visual.parts} />
            ) : null}
            <QuestionCard
              kicker={group?.instruction}
              prompt={question.prompt}
              constraint={question.constraint}
            >
              <QuestionBody
                question={question}
                value={value}
                revealed={revealed}
                onChange={(next) => {
                  void Haptics.selectionAsync();
                  setAnswer(question.id, next);
                }}
              />
            </QuestionCard>
            <QuestionNavigator total={questions.length} current={index} onSelect={goTo} />
          </View>
        )}
      </ScrollView>

      {revealed ? (
        <View className="border-t-2 border-divider px-6 pb-2 pt-4">
          <MiraNote
            kicker={isAnswerCorrect(value, question.correct) ? 'What you caught' : 'What happened'}
            title={
              isAnswerCorrect(value, question.correct) ? question.miraCorrect : question.miraWrong
            }
            body={question.explanation}
          />
          <View className="mt-4">
            <Button
              label={isLast ? 'Finish' : 'Next'}
              trailingIcon={ArrowRight}
              loading={submit.isPending}
              onPress={() => {
                if (isLast) {
                  finish();
                  return;
                }
                goTo(index + 1);
              }}
            />
          </View>
        </View>
      ) : (
        <View className="border-t-2 border-divider px-6 pb-2 pt-4">
          {isPractice ? (
            <Button
              label="Check"
              disabled={!canCheck}
              onPress={() => {
                const ok = isAnswerCorrect(value, question.correct);
                void Haptics.impactAsync(
                  ok ? Haptics.ImpactFeedbackStyle.Medium : Haptics.ImpactFeedbackStyle.Heavy,
                );
                markChecked(question.id);
                setPane('passage');
              }}
            />
          ) : (
            <Button
              label={isLast ? 'Submit' : 'Next'}
              trailingIcon={ArrowRight}
              loading={submit.isPending}
              onPress={() => {
                if (isLast) {
                  finish();
                  return;
                }
                goTo(index + 1);
              }}
            />
          )}
        </View>
      )}

      <Dialog
        visible={timedOut && !submit.isPending && result === null}
        onClose={finish}
        title="Time"
        description="The clock is done. We'll mark what you have."
        actions={[{ label: 'See results', onPress: finish }]}
      />
    </Screen>
  );
}
