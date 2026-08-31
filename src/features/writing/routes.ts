import type { Href } from 'expo-router';

export const WRITING_LIBRARY_HREF = '/practice/writing' as Href;

export function writingTaskHref(id: string): Href {
  return `/practice/writing/${id}` as Href;
}

export function writingWriteHref(id: string): Href {
  return `/practice/writing/${id}/write` as Href;
}

export function writingHandwriteHref(id: string): Href {
  return `/practice/writing/${id}/handwrite` as Href;
}

export function writingAnalyzingHref(id: string): Href {
  return `/practice/writing/${id}/analyzing` as Href;
}

export function writingResultHref(id: string): Href {
  return `/practice/writing/${id}/result` as Href;
}

export function writingFeedbackHref(id: string): Href {
  return `/practice/writing/${id}/feedback` as Href;
}
