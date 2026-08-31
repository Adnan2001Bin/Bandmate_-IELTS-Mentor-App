import { View } from 'react-native';

import { Text } from '@/components/ui';
import type { WritingVisual as Visual } from '@/types';

export type WritingVisualProps = {
  visual: Visual;
};

/** Schematic for Task 1. Not a chart library — rules and bars only. */
export function WritingVisual({ visual }: WritingVisualProps) {
  if (visual.kind === 'line' || visual.kind === 'bar' || visual.kind === 'mixed') {
    const items =
      visual.kind === 'line'
        ? visual.series.map((series) => ({
            label: series.label,
            value: series.points[series.points.length - 1] ?? 0,
            max: Math.max(...visual.series.flatMap((entry) => entry.points), 1),
          }))
        : visual.kind === 'bar'
          ? visual.items.map((item) => ({
              label: item.label,
              value: item.value,
              max: Math.max(...visual.items.map((entry) => entry.value), 1),
            }))
          : visual.bars.map((item) => ({
              label: item.label,
              value: item.value,
              max: Math.max(...visual.bars.map((entry) => entry.value), 1),
            }));

    return (
      <View className="border-2 border-text p-3">
        <Text variant="kicker" tone="subtle">
          {visual.title}
        </Text>
        {visual.kind === 'line' ? (
          <Text variant="caption" tone="muted" className="mt-1">
            {visual.xLabels.join(' · ')}
          </Text>
        ) : null}
        <View className="mt-3 gap-2">
          {items.map((item) => (
            <View key={item.label} className="flex-row items-center gap-3">
              <Text variant="caption" className="w-20" numberOfLines={1}>
                {item.label}
              </Text>
              <View className="h-3 flex-1 bg-surface">
                <View
                  className="h-3 bg-inverse-surface"
                  style={{ width: `${Math.round((item.value / item.max) * 100)}%` }}
                />
              </View>
              <Text variant="label" className="w-8 text-right">
                {item.value}
              </Text>
            </View>
          ))}
        </View>
        {visual.kind === 'mixed' ? (
          <Text variant="caption" tone="muted" className="mt-3">
            {visual.note}
          </Text>
        ) : null}
      </View>
    );
  }

  if (visual.kind === 'pie') {
    return (
      <View className="border-2 border-text p-3">
        <Text variant="kicker" tone="subtle">
          {visual.title}
        </Text>
        <View className="mt-3 gap-2">
          {visual.slices.map((slice) => (
            <View key={slice.label} className="flex-row items-center justify-between gap-3">
              <Text variant="bodySm">{slice.label}</Text>
              <Text variant="h4">{slice.percent}%</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (visual.kind === 'table') {
    return (
      <View className="border-2 border-text">
        <Text variant="kicker" tone="subtle" className="px-3 pt-2">
          {visual.title}
        </Text>
        <View className="mt-2 flex-row border-t-2 border-divider">
          {visual.headers.map((header) => (
            <View key={header} className="flex-1 px-2 py-2">
              <Text variant="kicker" tone="subtle">
                {header}
              </Text>
            </View>
          ))}
        </View>
        {visual.rows.map((row) => (
          <View key={row.join('-')} className="flex-row border-t border-divider">
            {row.map((cell, index) => (
              <View key={`${row[0]}-${index}`} className="flex-1 px-2 py-2">
                <Text variant="bodySm">{cell}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  }

  if (visual.kind === 'process') {
    return (
      <View className="border-2 border-text p-3">
        <Text variant="kicker" tone="subtle">
          {visual.title}
        </Text>
        <View className="mt-3 flex-row flex-wrap items-center gap-1">
          {visual.steps.map((step, index) => (
            <View key={step} className="flex-row items-center">
              <View className="border border-divider px-2 py-2">
                <Text variant="caption">{step}</Text>
              </View>
              {index < visual.steps.length - 1 ? (
                <Text variant="label" className="px-1">
                  →
                </Text>
              ) : null}
            </View>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View className="border-2 border-text p-3">
      <Text variant="kicker" tone="subtle">
        {visual.title}
      </Text>
      <View className="mt-3 gap-2">
        {visual.pins.map((pin) => (
          <View key={pin.letter} className="flex-row items-center gap-3">
            <View className="h-8 w-8 items-center justify-center bg-primary">
              <Text variant="label" tone="onPrimary">
                {pin.letter}
              </Text>
            </View>
            <Text variant="bodySm">{pin.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
