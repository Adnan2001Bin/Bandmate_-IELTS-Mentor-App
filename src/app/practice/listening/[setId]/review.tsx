import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';

import {
  AudioPlayer,
  ListeningVisual,
  QuestionCard,
  QuestionNavigator,
  type QuestionNavigatorStatus,
} from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { ErrorState, Rule, Screen, Text } from '@/components/ui';
import {
  QuestionBody,
  useListeningAttemptStore,
  useListeningSet,
  useMockAudio,
} from '@/features/listening';
import { flattenQuestions, formatClock, isAnswerCorrect } from '@/lib/listening';

export default function ListeningReviewScreen() {
  const router = useRouter();
  const { setId = '', q } = useLocalSearchParams<{ setId: string; q?: string }>();
  const { data: set, isError, refetch } = useListeningSet(setId);
  const result = useListeningAttemptStore((state) => state.result);
  const audio = useMockAudio(set?.audioDurationMs ?? 0);

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
  const key = typeof question.correct === 'string' ? question.correct : question.correct[0];

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
      />

      <View className="px-6 pt-4">
        <QuestionNavigator
          total={questions.length}
          current={index}
          statusFor={statusFor}
          onSelect={setIndex}
        />
        <View className="mt-4">
          <AudioPlayer
            durationMs={set.audioDurationMs}
            positionMs={audio.positionMs}
            playing={audio.playing}
            speed={audio.speed}
            muted={audio.muted}
            onPlayPause={audio.toggle}
            onCycleSpeed={audio.cycleSpeed}
            onToggleMute={audio.toggleMute}
          />
        </View>
      </View>

      <View className="px-6 pt-5">
        {group?.visual ? (
          <View className="mb-4">
            <ListeningVisual visual={group.visual} currentQuestionId={question.id} />
          </View>
        ) : null}

        <QuestionCard prompt={question.prompt} constraint={question.constraint}>
          <QuestionBody question={question} value={given} revealed onChange={() => undefined} />
        </QuestionCard>

        <View className="mt-4 gap-1">
          <Text variant="kicker" tone={ok ? 'muted' : 'accent'}>
            {ok ? 'Held' : 'Missed'}
          </Text>
          <Text variant="bodySm">
            You wrote {given || '—'}. Key: {key}.
          </Text>
          <Text variant="bodySm" tone="muted" className="mt-1">
            {question.explanation}
          </Text>
          <Pressable onPress={() => audio.playFrom(question.replayAtMs)} className="mt-2 self-start">
            <Text variant="label" tone="accent">
              Replay {formatClock(question.replayAtMs)}
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="px-6 pt-6">
        <Text variant="kicker" tone="subtle" className="mb-3">
          Transcript
        </Text>
        <Rule weight="section" />
        {set.transcript.map((line) => (
          <Pressable
            key={`${line.atMs}-${line.text}`}
            onPress={() => audio.playFrom(line.atMs)}
            className="border-b border-divider py-3 active:bg-surface"
          >
            <Text variant="caption" tone="subtle">
              {formatClock(line.atMs)}
              {line.speaker ? ` · ${line.speaker}` : ''}
            </Text>
            <Text variant="bodySm" className="mt-1">
              {line.text}
            </Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
