import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

import { AppHeader } from '@/components/layout';
import { Rule, Screen, Tag, Text } from '@/components/ui';
import { control, iconSize, useTheme } from '@/theme';

export default function PlanChangeModal() {
  const router = useRouter();
  const { colors } = useTheme();

  return (
    <Screen edges={['top', 'bottom']}>
      <AppHeader
        title="Change study plan"
        kicker="Today"
        size="compact"
        action={
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel="Close"
            hitSlop={8}
            className="items-center justify-center active:opacity-60"
            style={{ width: control.minTouch, height: control.minTouch }}
          >
            <X size={iconSize.xl} color={colors.text} strokeWidth={2.25} />
          </Pressable>
        }
      />

      <View className="gap-4 px-6 pt-6">
        <Tag label="Phase 06" tone="outline" />
        <Text variant="body" tone="muted">
          Adjusting the daily plan — swapping a session, changing its length, or skipping a day — is
          built here in Phase 06.
        </Text>
        <Rule />
      </View>
    </Screen>
  );
}
