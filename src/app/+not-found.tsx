import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { EmptyState, Screen } from '@/components/ui';

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <Screen edges={['top', 'bottom']}>
      <View className="flex-1 justify-center px-6">
        <EmptyState
          title="Page not found"
          description="That screen does not exist, or it moved."
          action={{ label: 'Go to Today', onPress: () => router.replace('/') }}
        />
      </View>
    </Screen>
  );
}
