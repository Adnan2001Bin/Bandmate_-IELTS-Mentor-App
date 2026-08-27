import { useRouter } from 'expo-router';
import { ArrowRight, TrendingUp } from 'lucide-react-native';
import { View } from 'react-native';

import { AppHeader } from '@/components/layout';
import { Button, Rule, Screen, Tag, Text } from '@/components/ui';

export default function TodayScreen() {
  const router = useRouter();

  return (
    <Screen scroll>
      <AppHeader
        title="Today"
        kicker="Your plan"
        action={
          <Button
            label="Progress"
            variant="ghost"
            size="sm"
            align="center"
            fullWidth={false}
            leadingIcon={TrendingUp}
            onPress={() => router.push('/progress')}
            className="px-0"
          />
        }
      />

      <View className="gap-4 px-6 pt-6">
        <Tag label="Phase 06" tone="outline" />
        <Text variant="body" tone="muted">
          The adaptive session card, streak, band forecast and Mira&apos;s flag are built here in
          Phase 06.
        </Text>
        <Rule />
        <Button
          label="Change study plan"
          variant="outline"
          trailingIcon={ArrowRight}
          onPress={() => router.push('/plan-change')}
        />
      </View>
    </Screen>
  );
}
