import type { Href } from 'expo-router';

export const LISTENING_LIBRARY_HREF = '/practice/listening' as Href;
export const SESSION_HREF = '/session' as Href;

export function listeningSetHref(id: string): Href {
  return `/practice/listening/${id}` as Href;
}

export function listeningRunHref(id: string): Href {
  return `/practice/listening/${id}/run` as Href;
}

export function listeningResultHref(id: string): Href {
  return `/practice/listening/${id}/result` as Href;
}

export function listeningReviewHref(id: string, question?: number): Href {
  if (question) {
    return `/practice/listening/${id}/review?q=${question}` as Href;
  }
  return `/practice/listening/${id}/review` as Href;
}
