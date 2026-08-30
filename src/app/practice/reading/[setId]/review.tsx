import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';

import {
  QuestionBody,
  QuestionCard,
  QuestionNavigator,
  ReadingDiagram,
  ReadingPassage,
  type QuestionNavigatorStatus,
} from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { ErrorState, Screen, SegmentedControl, Text } from '@/components/ui';
import {
  SaveQuestionToggle,
  useReadingAttemptStore,
  useReadingSet,
} from '@/features/reading';
import { flattenQuestions, formatAnswerKey, isAnswerCorrect } from '@/lib/reading';

type Pane = 'passage' | 'questions';

const PANE_OPTIONS = [
  { value: 'passage', label: 'Passage' },
  { value: 'questions', label: 'Questions' },
] as const;

export default function ReadingReviewScreen() {
  const router = useRouter();
  const { setId = '', q } = useLocalSearchParams<{ setId: string; q?: string }>();
  const { data: set, isError, refetch } = useReadingSet(setId);
  const result = useReadingAttemptStore((state) => state.result);
  const [pane, setPane] = useState<Pane>('questions');

  const questions = set ? flattenQuestions(set) : [];
  const startIndex = useMemo(() => {
    const n = Number(q);
    if (!Number.isFinite(n) || n < 1) {
      return 0;
    }
    return Math.min(questions.length - 1, Math.max(0, n - 1));
  }, [q, questions.length]);

  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    setIndex(startIndex);
  }, [startIndex]);

  if (isError || !set || !result || result.setId !== setId) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  const question = questions[index];
  if (!question) {
    return null;
  }

  const group = set.groups.find((item) => item.questions.some((entry) => entry.id === question.id));
  const given = result.answers[question.id] ?? '';
  const ok = isAnswerCorrect(given, question.correct);
  const rawKey = typeof question.correct === 'string' ? question.correct : question.correct[0];
  const key = formatAnswerKey(question, rawKey ?? '');
  const givenLabel = given ? formatAnswerKey(question, given) : '—';

  const statusFor = (i: number): QuestionNavigatorStatus => {
    if (i === index) {
      return 'current';
    }
    const item = questions[i];
    if (!item) {
      return 'idle';
    }
    return isAnswerCorrect(result.answers[item.id] ?? '', item.correct) ? 'correct' : 'wrong';
  };

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader
        title="Review"
        kicker={set.title}
        size="compact"
        onBack={() => router.back()}
        action={<SaveQuestionToggle setId={set.id} questionId={question.id} compact />}
      />

      <View className="px-6 pt-4">
        <QuestionNavigator
          total={questions.length}
          current={index}
          statusFor={statusFor}
          onSelect={setIndex}
        />
        <View className="pt-4">
          <SegmentedControl options={PANE_OPTIONS} value={pane} onChange={setPane} />
        </View>
      </View>

      <View className="px-6 pt-5">
        {pane === 'passage' ? (
          <ReadingPassage
            title={set.passageTitle}
            paragraphs={set.paragraphs}
            highlightId={question.locateParagraphId}
          />
        ) : (
          <View className="gap-4">
            {group?.visual ? (
              <ReadingDiagram title={group.visual.title} parts={group.visual.parts} />
            ) : null}
            <QuestionCard prompt={question.prompt} constraint={question.constraint}>
              <QuestionBody question={question} value={given} revealed onChange={() => undefined} />
            </QuestionCard>
            <View className="gap-1">
              <Text variant="kicker" tone={ok ? 'muted' : 'accent'}>
                {ok ? 'Held' : 'Missed'}
              </Text>
              <Text variant="bodySm">
                You chose {givenLabel}. Correct answer: {key}.
              </Text>
              <Text variant="bodySm" tone="muted" className="mt-1">
                Why: {question.explanation}
              </Text>
              <SaveQuestionToggle setId={set.id} questionId={question.id} />
            </View>
          </View>
        )}
      </View>
    </Screen>
  );
}
