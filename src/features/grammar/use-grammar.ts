import { useMutation, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/lib/query-keys';
import { services } from '@/services';
import type { GrammarSubmitInput } from '@/services';

export function useGrammarLessons() {
  return useQuery({
    queryKey: queryKeys.grammar.lessons,
    queryFn: () => services.grammar.listLessons(),
  });
}

export function useGrammarLesson(id: string) {
  return useQuery({
    queryKey: queryKeys.grammar.lesson(id),
    queryFn: () => services.grammar.getLesson(id),
    enabled: id.length > 0,
  });
}

export function useSubmitGrammar() {
  return useMutation({
    mutationFn: (input: GrammarSubmitInput) => services.grammar.submit(input),
  });
}
