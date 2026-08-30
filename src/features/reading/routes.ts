import type { Href } from 'expo-router';

export const READING_LIBRARY_HREF = '/practice/reading' as Href;
export const SESSION_HREF = '/session' as Href;

export function readingSetHref(id: string): Href {
  return `/practice/reading/${id}` as Href;
}

export function readingRunHref(id: string): Href {
  return `/practice/reading/${id}/run` as Href;
}

export function readingResultHref(id: string): Href {
  return `/practice/reading/${id}/result` as Href;
}

export function readingReviewHref(id: string, question?: number): Href {
  if (question) {
    return `/practice/reading/${id}/review?q=${question}` as Href;
  }
  return `/practice/reading/${id}/review` as Href;
}

export function readingStudyHref(id: string, questionId: string): Href {
  return `/practice/reading/${id}/study?qid=${questionId}` as Href;
}
