import { useQuery } from '@tanstack/react-query';
import type { Href } from 'expo-router';

import { queryKeys } from '@/lib/query-keys';
import { services } from '@/services';
import type { PracticeArea } from '@/types';

export const PRACTICE_HREF: Record<PracticeArea, Href> = {
  listening: '/practice/listening',
  reading: '/practice/reading',
  writing: '/practice/writing',
  speaking: '/practice/speaking',
  vocabulary: '/practice/vocabulary',
  grammar: '/practice/grammar',
};

export function usePracticeHub() {
  return useQuery({
    queryKey: queryKeys.practice.hub,
    queryFn: () => services.practice.getHub(),
  });
}
