import { useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { queryKeys } from '@/lib/query-client';
import { services } from '@/services';
import { useTheme, type AppearanceMode } from '@/theme';

const APPEARANCE_MODES: AppearanceMode[] = ['light', 'dark', 'system'];

/**
 * Phase 02 foundation check. It exercises the theme, the fonts, the service
 * layer and the query client in one screen, and is replaced by the real app
 * shell in Phase 04.
 */
export default function FoundationScreen() {
  const { mode, setMode, colors } = useTheme();
  const { data, isPending, isError } = useQuery({
    queryKey: queryKeys.profile,
    queryFn: () => services.profile.getProfile(),
  });

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <View className="border-b-2 border-divider px-6 pb-5 pt-4">
        <Text className="font-display text-3xl tracking-tighter text-text">BANDMATE</Text>
        <Text className="mt-1 font-body-semibold text-xs tracking-[0.1em] text-text-subtle">
          FOUNDATION — PHASE 02
        </Text>
      </View>

      <View className="flex-1 px-6 pt-6">
        <Text className="font-body-semibold text-xs tracking-[0.12em] text-text-subtle">
          SERVICE LAYER
        </Text>

        {isPending ? (
          <ActivityIndicator className="mt-4 self-start" color={colors.primary} />
        ) : isError ? (
          <Text className="mt-2 font-body text-sm text-error">
            Could not reach the profile service.
          </Text>
        ) : (
          <View className="mt-2 flex-row items-end gap-3">
            <Text className="font-display text-6xl leading-none tracking-tighter text-text">
              {data.diagnostic?.overall.toFixed(1) ?? '—'}
            </Text>
            <Text className="pb-1 font-body text-sm text-text-muted">
              estimated, target {data.study.targetBand.toFixed(1)}
            </Text>
          </View>
        )}

        <View className="mt-8 border-t-2 border-divider pt-5">
          <Text className="font-body-semibold text-xs tracking-[0.12em] text-text-subtle">
            APPEARANCE
          </Text>
          <View className="mt-3 flex-row border border-divider">
            {APPEARANCE_MODES.map((option, index) => {
              const isSelected = option === mode;
              return (
                <Pressable
                  key={option}
                  onPress={() => setMode(option)}
                  className={`flex-1 py-3 ${index > 0 ? 'border-l border-divider' : ''} ${
                    isSelected ? 'bg-primary' : ''
                  }`}
                >
                  <Text
                    className={`text-center font-body-semibold text-xs uppercase tracking-[0.08em] ${
                      isSelected ? 'text-on-primary' : 'text-text-muted'
                    }`}
                  >
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
