import { View } from 'react-native';

import { Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import { rule, useTheme } from '@/theme';
import type { ReadingParagraph } from '@/types';

export type ReadingPassageProps = {
  title: string;
  paragraphs: readonly ReadingParagraph[];
  highlightId?: string;
};

export type ReadingDiagramProps = {
  title: string;
  parts: readonly { letter: string; label: string }[];
};

/** Schematic for diagram-label questions. Letters, not a photograph. */
export function ReadingDiagram({ title, parts }: ReadingDiagramProps) {
  return (
    <View className="gap-2 border-2 border-text p-3">
      <Text variant="kicker" tone="subtle">
        {title}
      </Text>
      <View className="flex-row justify-between gap-2">
        {parts.map((part) => (
          <View key={part.letter} className="flex-1 items-center gap-1 border border-divider py-3">
            <Text variant="h3">{part.letter}</Text>
            <Text variant="caption" tone="muted">
              {part.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

/**
 * The passage at body size. A 4px accent rule marks the sentence the question
 * is actually testing — locate, not a highlighter pen.
 */
export function ReadingPassage({ title, paragraphs, highlightId }: ReadingPassageProps) {
  const { colors } = useTheme();

  return (
    <View className="gap-4">
      <Text variant="h3">{title}</Text>
      {paragraphs.map((paragraph) => {
        const active = paragraph.id === highlightId;

        return (
          <View
            key={paragraph.id}
            className={cn('gap-1', active && 'pl-3')}
            style={
              active
                ? { borderLeftWidth: rule.emphasis, borderLeftColor: colors.primary }
                : undefined
            }
          >
            {paragraph.letter ? (
              <Text variant="kicker" tone={active ? 'accent' : 'subtle'}>
                {paragraph.letter}
              </Text>
            ) : null}
            <Text variant="body">{paragraph.text}</Text>
          </View>
        );
      })}
    </View>
  );
}
