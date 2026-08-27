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
import { signUpSchema, type SignUpValues } from '@/features/auth/schemas';
import { services } from '@/services';
import { useSessionStore } from '@/store';

export default function SignUpScreen() {
  const router = useRouter();
  const setSession = useSessionStore((state) => state.setSession);

  const { control, handleSubmit } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', password: '' },
  });

  const signUp = useMutation({
    mutationFn: services.auth.signUp,
    onSuccess: setSession,
  });

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'bottom']}>
      <AppHeader title="LET'S BEGIN" kicker="Create your account" onBack={() => router.back()} />

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
            name="name"
            label="First name"
            placeholder="What should I call you?"
            autoCapitalize="words"
            autoComplete="given-name"
          />

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
            placeholder="At least 6 characters"
            autoCapitalize="none"
            autoComplete="new-password"
            secureTextEntry
          />

          {signUp.isError ? (
            <Text variant="bodySm" tone="error">
              {signUp.error.message}
            </Text>
          ) : null}
        </ScrollView>

        <View className="gap-1 px-6 pb-2 pt-3">
          <Button
            label="Continue"
            trailingIcon={ArrowRight}
            loading={signUp.isPending}
            onPress={handleSubmit((values) => signUp.mutate(values))}
          />
          <Button
            label="I've used Bandmate before"
            variant="ghost"
            size="md"
            onPress={() => router.replace('/sign-in')}
            className="px-0"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
