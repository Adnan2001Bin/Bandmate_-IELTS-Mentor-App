import type { Href } from 'expo-router';

export const VOCABULARY_LIBRARY_HREF = '/practice/vocabulary' as Href;
export const VOCABULARY_REVIEW_HREF = '/practice/vocabulary/review' as Href;
export const VOCABULARY_DIFFICULT_HREF = '/practice/vocabulary/difficult' as Href;

export function vocabCategoryHref(id: string): Href {
  return `/practice/vocabulary/${id}` as Href;
}

export function vocabWordHref(categoryId: string, wordId: string): Href {
  return `/practice/vocabulary/${categoryId}/${wordId}` as Href;
}

export function vocabQuizHref(id: string): Href {
  return `/practice/vocabulary/${id}/quiz` as Href;
}

export function vocabQuizResultHref(id: string): Href {
  return `/practice/vocabulary/${id}/result` as Href;
}

export function vocabReviewResultHref(): Href {
  return '/practice/vocabulary/review-result' as Href;
}
