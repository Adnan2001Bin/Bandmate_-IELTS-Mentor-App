import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

import { TestTimer, WordCounter, WritingEditor, WritingVisual } from '@/components/ielts';
import { AppHeader } from '@/components/layout';
import { Button, Dialog, ErrorState, Screen, Skeleton, Text } from '@/components/ui';
import {
  KIND_LABEL,
  useSaveWritingDraft,
  useWritingAttemptStore,
  useWritingTask,
  writingAnalyzingHref,
  writingTaskHref,
} from '@/features/writing';
import { countWords, liveFlags } from '@/lib/writing';

export default function WritingWriteScreen() {
  const router = useRouter();
  const { taskId = '' } = useLocalSearchParams<{ taskId: string }>();
  const { data: task, isPending, isError, refetch } = useWritingTask(taskId);
  const saveDraft = useSaveWritingDraft();

  const storeTaskId = useWritingAttemptStore((state) => state.taskId);
  const mode = useWritingAttemptStore((state) => state.mode);
  const body = useWritingAttemptStore((state) => state.body);
  const remainingMs = useWritingAttemptStore((state) => state.remainingMs);
  const setBody = useWritingAttemptStore((state) => state.setBody);
  const setRemainingMs = useWritingAttemptStore((state) => state.setRemainingMs);

  const [confirm, setConfirm] = useState(false);
  const [saved, setSaved] = useState(true);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timedOut = mode === 'timed' && remainingMs <= 0 && storeTaskId === taskId;

  useEffect(() => {
    if (mode !== 'timed') {
      return;
    }
    const id = setInterval(() => {
      const current = useWritingAttemptStore.getState().remainingMs;
      if (current <= 0) {
        return;
      }
      setRemainingMs(Math.max(0, current - 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [mode, setRemainingMs]);

  useEffect(() => {
    return () => {
      if (saveTimer.current) {
        clearTimeout(saveTimer.current);
      }
    };
  }, []);

  const persist = (next: string) => {
    setBody(next);
    setSaved(false);
    if (saveTimer.current) {
      clearTimeout(saveTimer.current);
    }
    saveTimer.current = setTimeout(() => {
      const state = useWritingAttemptStore.getState();
      saveDraft.mutate(
        { taskId, body: next, remainingMs: state.remainingMs },
        { onSuccess: () => setSaved(true) },
      );
    }, 800);
  };

  const goAnalyze = () => {
    setConfirm(false);
    router.replace(writingAnalyzingHref(taskId));
  };

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

  if (isError || !task || storeTaskId !== taskId) {
    return (
      <Screen edges={['top', 'bottom']}>
        <View className="px-6 pt-8">
          <ErrorState
            title={storeTaskId !== taskId ? 'This task has not been started' : undefined}
            description={
              storeTaskId !== taskId ? 'Go back to the brief and press Start.' : undefined
            }
            onRetry={() => {
              if (storeTaskId !== taskId) {
                router.replace(writingTaskHref(taskId));
                return;
              }
              void refetch();
            }}
          />
        </View>
      </Screen>
    );
  }

  const words = countWords(body);
  const flags = liveFlags(body);
  const short = words < task.minWords;

  return (
    <Screen edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <AppHeader
          title={KIND_LABEL[task.kind]}
          kicker={task.title}
          size="compact"
          onBack={() => router.back()}
          action={mode === 'timed' ? <TestTimer remainingMs={remainingMs} /> : undefined}
        />

        <ScrollView
          className="max-h-40"
          contentContainerClassName="px-6 pt-4 pb-2"
          keyboardShouldPersistTaps="handled"
        >
          <Text variant="bodySm">{task.prompt}</Text>
          {task.visual ? (
            <View className="mt-3">
              <WritingVisual visual={task.visual} />
            </View>
          ) : null}
        </ScrollView>

        <View className="flex-1 px-6 pt-2">
          <WritingEditor value={body} onChangeText={persist} />
        </View>

        {flags.length > 0 ? (
          <View className="px-6 pt-2">
            {flags.map((flag) => (
              <Text key={flag.id} variant="caption" tone="accent">
                {flag.label}
              </Text>
            ))}
          </View>
        ) : null}

        <View className="border-t-2 border-divider px-6 pb-2 pt-3">
          <WordCounter
            words={words}
            minWords={task.minWords}
            characters={body.length}
            saved={saved}
          />
          <View className="pt-3">
            <Button label="Submit" onPress={() => (short ? setConfirm(true) : goAnalyze())} />
          </View>
        </View>
      </KeyboardAvoidingView>

      <Dialog
        visible={confirm}
        onClose={() => setConfirm(false)}
        title="Under length"
        description={`You have written ${words} words. IELTS recommends at least ${task.minWords}. Submit anyway?`}
        actions={[
          { label: 'Submit anyway', onPress: goAnalyze },
          { label: 'Keep writing', onPress: () => setConfirm(false), variant: 'ghost' },
        ]}
      />

      <Dialog
        visible={timedOut && !confirm}
        onClose={goAnalyze}
        title="Time"
        description="The clock is done. We'll mark what you have."
        actions={[{ label: 'See the read', onPress: goAnalyze }]}
      />
    </Screen>
  );
}
