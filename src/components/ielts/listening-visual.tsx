import { View } from 'react-native';

import { Text } from '@/components/ui';
import { cn } from '@/lib/cn';
import type { ListeningVisual as Visual } from '@/types';

export type ListeningVisualProps = {
  visual: Visual;
  currentQuestionId?: string;
};

/** Schematic for map / diagram / table / notes / flow. Not a real campus plan. */
export function ListeningVisual({ visual, currentQuestionId }: ListeningVisualProps) {
  if (visual.kind === 'map') {
    return (
      <View className="border-2 border-text">
        <Text variant="kicker" tone="subtle" className="px-3 pt-2">
          {visual.title}
        </Text>
        <View className="relative h-44 bg-surface">
          {visual.pins.map((pin) => (
            <View
              key={pin.letter}
              className="absolute items-center"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              <View
                className={cn(
                  'h-7 w-7 items-center justify-center',
                  pin.label ? 'bg-inverse-surface' : 'bg-primary',
                )}
              >
                <Text variant="label" tone={pin.label ? 'onInverse' : 'onPrimary'}>
                  {pin.letter.length > 1 ? pin.letter.slice(0, 1) : pin.letter}
                </Text>
              </View>
              {pin.label ? (
                <Text variant="caption" className="mt-0.5">
                  {pin.label}
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (visual.kind === 'diagram') {
    return (
      <View className="gap-2 border-2 border-text p-3">
        <Text variant="kicker" tone="subtle">
          {visual.title}
        </Text>
        <View className="flex-row justify-between gap-2">
          {visual.parts.map((part) => (
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

  if (visual.kind === 'table') {
    return (
      <View className="border-2 border-text">
        <View className="flex-row border-b-2 border-divider">
          {visual.headers.map((header) => (
            <View key={header} className="flex-1 px-2 py-2">
              <Text variant="kicker" tone="subtle">
                {header}
              </Text>
            </View>
          ))}
        </View>
        {visual.rows.map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row border-b border-divider">
            {row.map((cell, cellIndex) => {
              const isBlank = typeof cell !== 'string';
              const active = isBlank && cell.questionId === currentQuestionId;
              return (
                <View
                  key={cellIndex}
                  className={cn('flex-1 px-2 py-2', active && 'bg-surface')}
                >
                  <Text variant="bodySm" tone={isBlank ? 'accent' : 'default'}>
                    {isBlank ? '______' : cell}
                  </Text>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    );
  }

  if (visual.kind === 'flow') {
    return (
      <View className="gap-1 border-2 border-text p-3">
        {visual.steps.map((step, index) => {
          const isBlank = typeof step !== 'string';
          const active = isBlank && step.questionId === currentQuestionId;
          return (
            <View key={index}>
              <View className={cn('border border-divider px-3 py-2', active && 'border-primary')}>
                <Text variant="bodySm" tone={isBlank ? 'accent' : 'default'}>
                  {isBlank ? '______' : step}
                </Text>
              </View>
              {index < visual.steps.length - 1 ? (
                <Text variant="caption" tone="subtle" className="py-1 text-center">
                  ↓
                </Text>
              ) : null}
            </View>
          );
        })}
      </View>
    );
  }

  if (visual.kind === 'notes') {
    return (
      <View className="gap-2 border-2 border-text p-3">
        <Text variant="kicker" tone="subtle">
          {visual.heading}
        </Text>
        {visual.lines.map((line, index) => {
          const isBlank = typeof line !== 'string';
          return (
            <Text key={index} variant="bodySm" tone={isBlank ? 'accent' : 'muted'}>
              {isBlank ? '• ______' : `• ${line}`}
            </Text>
          );
        })}
      </View>
    );
  }

  return (
    <View className="border-2 border-text px-3 py-2">
      <Text variant="kicker" tone="subtle">
        {visual.title}
      </Text>
    </View>
  );
}
