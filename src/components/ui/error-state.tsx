import { TriangleAlert } from 'lucide-react-native';
import { View } from 'react-native';

import { cn } from '@/lib/cn';
import { iconSize, useTheme } from '@/theme';
import { Button } from './button';
import { Text } from './text';

export type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
};

/**
 * The generic failure surface. `ServiceError` normalises every failure into one
 * shape, so this component works for any data source without customisation.
 */
export function ErrorState({
  title = 'Something went wrong',
  description = 'Check your connection and try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  const { colors } = useTheme();

  return (
    <View className={cn('items-start gap-3 border-2 border-error p-5', className)}>
      <TriangleAlert size={iconSize.xl} color={colors.error} strokeWidth={2} />

      <View className="gap-1">
        <Text variant="h3">{title}</Text>
        <Text variant="body" tone="muted">
          {description}
        </Text>
      </View>

      {onRetry ? (
        <Button
          label="Try again"
          onPress={onRetry}
          variant="outline"
          size="md"
          align="center"
          fullWidth={false}
          className="mt-1"
        />
      ) : null}
    </View>
  );
}
