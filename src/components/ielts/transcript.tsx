import { Pressable, View } from 'react-native';

import { Rule, Text } from '@/components/ui';
import { formatClock } from '@/lib/speaking';
import { cn } from '@/lib/cn';
import type { SpeakingTranscriptLine } from '@/types';

export type TranscriptProps = {
  lines: readonly SpeakingTranscriptLine[];
  onHear?: (atMs: number) => void;
  activeAtMs?: number;
};

function isActive(line: SpeakingTranscriptLine, next: SpeakingTranscriptLine | undefined, at?: number) {
  if (at === undefined || line.speaker !== 'you') {
    return false;
  }
  const end = next?.atMs ?? Number.POSITIVE_INFINITY;
  return at >= line.atMs && at < end;
}

/** Timestamped script. “Hear yourself” seeks the mock playback, not a file. */
export function Transcript({ lines, onHear, activeAtMs }: TranscriptProps) {
  return (
    <View>
      {lines.map((line, index) => {
        const next = lines[index + 1];
        const live = isActive(line, next, activeAtMs);

        return (
          <View key={line.id} className={cn(live && 'bg-surface')}>
            <View className="flex-row items-start justify-between gap-3 py-3">
              <View className="flex-1">
                <Text variant="kicker" tone="subtle">
                  {line.speaker === 'you' ? 'You' : 'Examiner'} · {formatClock(line.atMs)}
                </Text>
                <Text variant="bodySm" className="mt-1">
                  {line.text}
                </Text>
                {line.better ? (
                  <View className="mt-3">
                    <Text variant="kicker" tone="subtle">
                      Better
                    </Text>
                    <Text variant="bodySm" className="mt-1">
                      {line.better}
                    </Text>
                    {line.why ? (
                      <Text variant="caption" tone="muted" className="mt-1">
                        Why: {line.why}
                      </Text>
                    ) : null}
                  </View>
                ) : null}
              </View>
              {line.speaker === 'you' && onHear ? (
                <Pressable
                  onPress={() => onHear(line.atMs)}
                  accessibilityRole="button"
                  accessibilityLabel={`Hear yourself at ${formatClock(line.atMs)}`}
                  className="active:opacity-60"
                >
                  <Text variant="label" tone="accent">
                    Hear yourself
                  </Text>
                </Pressable>
              ) : null}
            </View>
            <Rule />
          </View>
        );
      })}
    </View>
  );
}
