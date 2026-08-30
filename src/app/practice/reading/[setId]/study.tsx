import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import {
  QuestionBody,
  QuestionCard,
  ReadingDiagram,
  ReadingPassage,
} from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { ErrorState, Screen, SegmentedControl, Skeleton, Text } from '@/components/ui';
import { SaveQuestionToggle, useReadingSet } from '@/features/reading';
import { flattenQuestions, formatAnswerKey } from '@/lib/reading';

type Pane = 'passage' | 'questions';

const PANE_OPTIONS = [
  { value: 'passage', label: 'Passage' },
  { value: 'questions', label: 'Questions' },
] as const;

export default function ReadingStudyScreen() {
  const router = useRouter();
  const { setId = '', qid = '' } = useLocalSearchParams<{ setId: string; qid?: string }>();
  const { data: set, isPending, isError, refetch } = useReadingSet(setId);
  const [pane, setPane] = useState<Pane>('questions');

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

  const questions = set ? flattenQuestions(set) : [];
  const question = questions.find((item) => item.id === qid);

  if (isError || !set || !question) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <ErrorState onRetry={() => void refetch()} />
        </View>
      </Screen>
    );
  }

  const group = set.groups.find((item) => item.questions.some((entry) => entry.id === question.id));
  const rawKey = typeof question.correct === 'string' ? question.correct : question.correct[0];
  const key = formatAnswerKey(question, rawKey ?? '');

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader
        title={`Q${question.number}`}
        kicker={set.title}
        size="compact"
        onBack={() => router.back()}
        action={<SaveQuestionToggle setId={set.id} questionId={question.id} compact />}
      />

      <View className="px-6 pt-4">
        <SegmentedControl options={PANE_OPTIONS} value={pane} onChange={setPane} />
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
              <QuestionBody
                question={question}
                value={rawKey ?? ''}
                revealed
                onChange={() => undefined}
              />
            </QuestionCard>
            <View className="gap-1">
              <Text variant="kicker" tone="muted">
                Correct answer
              </Text>
              <Text variant="bodySm">{key}</Text>
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
