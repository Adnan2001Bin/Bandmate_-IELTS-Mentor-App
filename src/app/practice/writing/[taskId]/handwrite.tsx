import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import { Button, ErrorState, Screen, Skeleton, Text, TextArea } from '@/components/ui';
import {
  useSimulateOcr,
  useWritingAttemptStore,
  useWritingTask,
  writingAnalyzingHref,
  writingTaskHref,
} from '@/features/writing';

export default function WritingHandwriteScreen() {
  const router = useRouter();
  const { taskId = '' } = useLocalSearchParams<{ taskId: string }>();
  const { data: task, isPending, isError, refetch } = useWritingTask(taskId);
  const ocr = useSimulateOcr();

  const storeTaskId = useWritingAttemptStore((state) => state.taskId);
  const pages = useWritingAttemptStore((state) => state.pages);
  const body = useWritingAttemptStore((state) => state.body);
  const addPage = useWritingAttemptStore((state) => state.addPage);
  const removePage = useWritingAttemptStore((state) => state.removePage);
  const setBody = useWritingAttemptStore((state) => state.setBody);

  const [extracted, setExtracted] = useState(false);

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

  return (
    <Screen scroll edges={['top', 'bottom']}>
      <AppHeader
        title="Paper"
        kicker={task.title}
        size="compact"
        onBack={() => router.back()}
      />

      <View className="gap-4 px-6 pt-5">
        <Text variant="bodySm" tone="muted">
          Add up to three pages. Reading them is simulated — a real OCR model is not running. Check
          the text before you submit.
        </Text>

        {Array.from({ length: pages }, (_, index) => (
          <View key={index} className="h-28 justify-end border-2 border-dashed border-divider p-3">
            <Text variant="kicker" tone="subtle">
              Page {index + 1} · simulated
            </Text>
          </View>
        ))}

        {pages === 0 ? (
          <Text variant="bodySm" tone="muted">
            No pages yet.
          </Text>
        ) : null}

        <View className="flex-row gap-2">
          <Button
            label="Add page"
            variant="outline"
            size="md"
            fullWidth={false}
            disabled={pages >= 3}
            onPress={addPage}
            className="flex-1"
          />
          <Button
            label="Remove"
            variant="ghost"
            size="md"
            fullWidth={false}
            disabled={pages === 0}
            onPress={removePage}
            className="flex-1"
          />
        </View>

        <Button
          label="Read the pages"
          disabled={pages === 0}
          loading={ocr.isPending}
          onPress={() => {
            ocr.mutate(taskId, {
              onSuccess: (text) => {
                setBody(text);
                setExtracted(true);
              },
            });
          }}
        />

        {extracted ? (
          <View className="gap-3">
            <Text variant="kicker" tone="subtle">
              Check the extract
            </Text>
            <TextArea
              value={body}
              onChangeText={setBody}
              minHeight={180}
              hint="We extracted a mock reading of the page. Fix anything that is wrong."
            />
            <Button
              label="Submit extract"
              disabled={body.trim().length === 0}
              onPress={() => router.replace(writingAnalyzingHref(taskId))}
            />
          </View>
        ) : null}
      </View>
    </Screen>
  );
}
