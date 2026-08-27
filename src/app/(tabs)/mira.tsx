import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import { Monogram, Rule, Screen, Tag, Text } from '@/components/ui';

export default function MiraScreen() {
  return (
    <Screen scroll>
      <AppHeader
        title="Mira"
        kicker="Your mentor"
        action={<Monogram name="Mira" size="sm" tone="accent" />}
      />

      <View className="gap-4 px-6 pt-6">
        <Tag label="Phase 08" tone="outline" />
        <Text variant="body" tone="muted">
          Chat, the daily check-in, live speaking practice, writing review and the study plan are
          built here in Phase 08.
        </Text>
        <Rule />
      </View>
    </Screen>
  );
}
