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
