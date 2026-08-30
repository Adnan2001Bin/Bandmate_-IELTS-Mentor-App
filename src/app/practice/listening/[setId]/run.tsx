import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowRight, RotateCcw } from 'lucide-react-native';
import { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import {
  AudioPlayer,
  ListeningVisual,
  MiraNote,
  QuestionCard,
  TestProgress,
  TestTimer,
} from '@/components/ielts';
import { Button, Dialog, ErrorState, Screen, Skeleton, Text } from '@/components/ui';
import {
  QuestionBody,
  QUESTION_TYPE_LABEL,
  useListeningAttemptStore,
  useListeningSet,
  useMockAudio,
  useSubmitListening,
  listeningResultHref,
  listeningSetHref,
} from '@/features/listening';
import { flattenQuestions, formatClock, isAnswerCorrect } from '@/lib/listening';

export default function ListeningRunScreen() {
  const router = useRouter();
  const { setId = '' } = useLocalSearchParams<{ setId: string }>();
  const { data: set, isPending, isError, refetch } = useListeningSet(setId);
  const submit = useSubmitListening();

  const mode = useListeningAttemptStore((state) => state.mode);
  const index = useListeningAttemptStore((state) => state.index);
  const answers = useListeningAttemptStore((state) => state.answers);
  const checked = useListeningAttemptStore((state) => state.checked);
  const remainingMs = useListeningAttemptStore((state) => state.remainingMs);
  const storeSetId = useListeningAttemptStore((state) => state.setId);
  const setAnswer = useListeningAttemptStore((state) => state.setAnswer);
  const markChecked = useListeningAttemptStore((state) => state.markChecked);
  const setIndex = useListeningAttemptStore((state) => state.setIndex);
  const setRemainingMs = useListeningAttemptStore((state) => state.setRemainingMs);
  const setResult = useListeningAttemptStore((state) => state.setResult);
  const result = useListeningAttemptStore((state) => state.result);

  const audio = useMockAudio(set?.audioDurationMs ?? 0);

  const questions = set ? flattenQuestions(set) : [];
  const question = questions[index];
  const group = set?.groups.find((item) => item.questions.some((entry) => entry.id === question?.id));
  const value = question ? (answers[question.id] ?? '') : '';
  const isPractice = mode === 'practice';
  const revealed = Boolean(question && isPractice && checked[question.id]);
  const isLast = index >= questions.length - 1;
  const timedOut = mode === 'timed' && remainingMs <= 0 && storeSetId === setId;

  useEffect(() => {
    if (mode !== 'timed') {
      return;
    }

    const id = setInterval(() => {
      const current = useListeningAttemptStore.getState().remainingMs;
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
      { setId: set.id, mode, answers: useListeningAttemptStore.getState().answers },
      {
        onSuccess: (result) => {
          setResult(result);
          router.replace(listeningResultHref(set.id));
        },
      },
    );
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
                router.replace(listeningSetHref(setId));
                return;
              }
              void refetch();
            }}
          />
        </View>
      </Screen>
    );
  }

  const kicker = `Listening — section ${set.section} — ${QUESTION_TYPE_LABEL[question.type]}`;
  const canCheck = value.trim().length > 0;

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
        <View className="mt-3">
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

      <ScrollView className="flex-1" contentContainerClassName="px-6 pt-5 pb-4">
        {group?.visual ? (
          <View className="mb-4">
            <ListeningVisual visual={group.visual} currentQuestionId={question.id} />
          </View>
        ) : null}

        <QuestionCard kicker={group?.instruction} prompt={question.prompt} constraint={question.constraint}>
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
          <View className="mt-4 flex-row gap-0.5">
            <Button
              label={`Replay ${formatClock(question.replayAtMs)}`}
              variant="outline"
              size="md"
              leadingIcon={RotateCcw}
              fullWidth={false}
              onPress={() => audio.playFrom(question.replayAtMs)}
              className="flex-1"
            />
            <Button
              label={isLast ? 'Finish' : 'Next'}
              trailingIcon={ArrowRight}
              size="md"
              className="flex-1"
              onPress={() => {
                if (isLast) {
                  finish();
                  return;
                }
                setIndex(index + 1);
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
                setIndex(index + 1);
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
