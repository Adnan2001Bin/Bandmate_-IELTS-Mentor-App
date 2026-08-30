import { Bookmark, BookmarkCheck } from 'lucide-react-native';
import { Pressable } from 'react-native';

import { Text } from '@/components/ui';
import { control, iconSize, useTheme } from '@/theme';

import { useReadingSaved, useSaveReadingQuestion, useUnsaveReadingQuestion } from './use-reading';

type SaveQuestionToggleProps = {
  setId: string;
  questionId: string;
  /** Compact icon for headers. Labelled button is the default. */
  compact?: boolean;
};

export function SaveQuestionToggle({ setId, questionId, compact = false }: SaveQuestionToggleProps) {
  const { colors } = useTheme();
  const { data: saved } = useReadingSaved();
  const save = useSaveReadingQuestion();
  const unsave = useUnsaveReadingQuestion();
  const isSaved = Boolean(
    saved?.some((item) => item.setId === setId && item.questionId === questionId),
  );
  const pending = save.isPending || unsave.isPending;
  const Icon = isSaved ? BookmarkCheck : Bookmark;

  const toggle = () => {
    if (pending) {
      return;
    }
    if (isSaved) {
      unsave.mutate({ setId, questionId });
      return;
    }
    save.mutate({ setId, questionId });
  };

  if (compact) {
    return (
      <Pressable
        onPress={toggle}
        disabled={pending}
        accessibilityRole="button"
        accessibilityLabel={isSaved ? 'Remove from saved' : 'Save this question'}
        hitSlop={8}
        className="items-center justify-center active:opacity-60"
        style={{ width: control.minTouch, height: control.minTouch }}
      >
        <Icon
          size={iconSize.lg}
          color={isSaved ? colors.primary : colors.text}
          strokeWidth={2}
        />
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={toggle}
      disabled={pending}
      accessibilityRole="button"
      hitSlop={4}
      className="mt-3 flex-row items-center gap-2 self-start py-2 active:opacity-60"
    >
      <Icon size={iconSize.md} color={isSaved ? colors.primary : colors.text} strokeWidth={2} />
      <Text variant="label" tone={isSaved ? 'accent' : 'default'}>
        {isSaved ? 'Saved for later' : 'Save this question'}
      </Text>
    </Pressable>
  );
}
