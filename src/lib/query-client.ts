import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      // React Native has no window focus event; refetch on reconnect instead.
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});

/**
 * Every cache key in the app. Centralised so invalidation after a submission
 * cannot silently miss a screen.
 */
export const queryKeys = {
  session: ['session'] as const,
  profile: ['profile'] as const,
  plan: {
    today: ['plan', 'today'] as const,
  },
  practice: {
    listening: ['practice', 'listening'] as const,
    reading: ['practice', 'reading'] as const,
    writing: ['practice', 'writing'] as const,
    speaking: ['practice', 'speaking'] as const,
    vocabulary: ['practice', 'vocabulary'] as const,
    grammar: ['practice', 'grammar'] as const,
  },
  mock: {
    list: ['mock', 'list'] as const,
    report: (id: string) => ['mock', 'report', id] as const,
  },
  progress: {
    forecast: ['progress', 'forecast'] as const,
    history: ['progress', 'history'] as const,
    weaknesses: ['progress', 'weaknesses'] as const,
  },
  mistakes: ['mistakes'] as const,
  mentor: {
    conversation: ['mentor', 'conversation'] as const,
  },
} as const;
