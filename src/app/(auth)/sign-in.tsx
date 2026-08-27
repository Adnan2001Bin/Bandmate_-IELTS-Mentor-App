import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ControlledInput } from '@/components/form';
import { AppHeader } from '@/components/layout';
import { Button, Text } from '@/components/ui';
import { signInSchema, type SignInValues } from '@/features/auth/schemas';
import { services } from '@/services';
import { useSessionStore } from '@/store';

export default function SignInScreen() {
  const router = useRouter();
  const setSession = useSessionStore((state) => state.setSession);

  const { control, handleSubmit } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  });

  // The root guard sends the user onward once a session exists, so this only
  // has to produce one.
  const signIn = useMutation({
    mutationFn: services.auth.signIn,
    onSuccess: setSession,
  });

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <AppHeader title="WELCOME BACK" kicker="Sign in" onBack={() => router.back()} />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="px-6 pt-6 gap-5"
          keyboardShouldPersistTaps="handled"
        >
          <ControlledInput
            control={control}
            name="email"
            label="Email"
            placeholder="you@example.com"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
          />

          <ControlledInput
            control={control}
            name="password"
            label="Password"
            placeholder="••••••••"
            autoCapitalize="none"
            autoComplete="current-password"
            secureTextEntry
          />

          {signIn.isError ? (
            <Text variant="bodySm" tone="error">
              {signIn.error.message}
            </Text>
          ) : null}
        </ScrollView>

        <View className="gap-1 px-6 pb-2 pt-3">
          <Button
            label="Sign in"
            trailingIcon={ArrowRight}
            loading={signIn.isPending}
            onPress={handleSubmit((values) => signIn.mutate(values))}
          />
          <Button
            label="I'm new here"
            variant="ghost"
            size="md"
            onPress={() => router.replace('/sign-up')}
            className="px-0"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
