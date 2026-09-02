import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '@/lib/query-keys';
import { services } from '@/services';
import type { VocabQuizSubmitInput, VocabReviewInput } from '@/services';

function invalidateVocab(queryClient: ReturnType<typeof useQueryClient>) {
  void queryClient.invalidateQueries({ queryKey: ['vocabulary'] });
}

export function useVocabOverview() {
  return useQuery({
    queryKey: queryKeys.vocabulary.overview,
    queryFn: () => services.vocabulary.getOverview(),
  });
}

export function useVocabCategories() {
  return useQuery({
    queryKey: queryKeys.vocabulary.categories,
    queryFn: () => services.vocabulary.listCategories(),
  });
}

export function useVocabCategory(id: string) {
  return useQuery({
    queryKey: queryKeys.vocabulary.category(id),
    queryFn: () => services.vocabulary.getCategory(id),
    enabled: id.length > 0,
  });
}

export function useVocabWord(id: string) {
  return useQuery({
    queryKey: queryKeys.vocabulary.word(id),
    queryFn: () => services.vocabulary.getWord(id),
    enabled: id.length > 0,
  });
}

export function useVocabQuiz(categoryId: string) {
  return useQuery({
    queryKey: queryKeys.vocabulary.quiz(categoryId),
    queryFn: () => services.vocabulary.getQuiz(categoryId),
    enabled: categoryId.length > 0,
  });
}

export function useVocabDue() {
  return useQuery({
    queryKey: queryKeys.vocabulary.due,
    queryFn: () => services.vocabulary.listDue(),
  });
}

export function useVocabDifficult() {
  return useQuery({
    queryKey: queryKeys.vocabulary.difficult,
    queryFn: () => services.vocabulary.listDifficult(),
  });
}

export function useSubmitVocabQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: VocabQuizSubmitInput) => services.vocabulary.submitQuiz(input),
    onSuccess: () => invalidateVocab(queryClient),
  });
}

export function useReviewWord() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: VocabReviewInput) => services.vocabulary.review(input),
    onSuccess: () => invalidateVocab(queryClient),
  });
}

export function useFinishVocabReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (grades: readonly VocabReviewInput[]) => services.vocabulary.finishReview(grades),
    onSuccess: () => invalidateVocab(queryClient),
  });
}

export function useMarkDifficult() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (wordId: string) => services.vocabulary.markDifficult(wordId),
    onSuccess: () => invalidateVocab(queryClient),
  });
}
