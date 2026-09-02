import type { Href } from 'expo-router';

export const GRAMMAR_LIBRARY_HREF = '/practice/grammar' as Href;

export function grammarLessonHref(id: string): Href {
  return `/practice/grammar/${id}` as Href;
}

export function grammarPracticeHref(id: string): Href {
  return `/practice/grammar/${id}/practice` as Href;
}

export function grammarResultHref(id: string): Href {
  return `/practice/grammar/${id}/result` as Href;
}
