import { View } from 'react-native';

import { Text } from '@/components/ui';
import type { WritingRewrite } from '@/types';

export type RewriteCompareProps = {
  rewrite: WritingRewrite;
};

/** Your paragraph beside Mira's rewrite, then what changed and why. */
export function RewriteCompare({ rewrite }: RewriteCompareProps) {
  return (
    <View className="gap-4">
      <View>
        <Text variant="kicker" tone="subtle" className="mb-2">
          Your paragraph
        </Text>
        <Text variant="bodySm">{rewrite.original}</Text>
      </View>
      <View>
        <Text variant="kicker" tone="subtle" className="mb-2">
          Rewritten
        </Text>
        <Text variant="bodySm">{rewrite.improved}</Text>
      </View>
      <View className="gap-2">
        <Text variant="kicker" tone="subtle">
          What changed, and why
        </Text>
        {rewrite.changes.map((change) => (
          <View key={change.what} className="border-t border-divider pt-2">
            <Text variant="label">{change.what}</Text>
            <Text variant="caption" tone="muted" className="mt-1">
              {change.why}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
