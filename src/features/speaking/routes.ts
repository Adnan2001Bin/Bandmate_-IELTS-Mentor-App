import type { Href } from 'expo-router';

export const SPEAKING_LIBRARY_HREF = '/practice/speaking' as Href;

export function speakingTopicHref(id: string, from?: 'random'): Href {
  return (from === 'random' ? `/practice/speaking/${id}?from=random` : `/practice/speaking/${id}`) as Href;
}

export function speakingRunHref(id: string): Href {
  return `/practice/speaking/${id}/run` as Href;
}

export function speakingAnalyzingHref(id: string): Href {
  return `/practice/speaking/${id}/analyzing` as Href;
}

export function speakingResultHref(id: string): Href {
  return `/practice/speaking/${id}/result` as Href;
}

export function speakingTranscriptHref(id: string): Href {
  return `/practice/speaking/${id}/transcript` as Href;
}
