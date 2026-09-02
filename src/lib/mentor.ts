export type MentorIntent =
  | 'speaking'
  | 'writing'
  | 'vocabulary'
  | 'grammar'
  | 'listening'
  | 'reading'
  | 'plan'
  | 'band'
  | 'greeting'
  | 'offline'
  | 'other';

/** Messages that are only punctuation (or the word “offline”) exercise the retry path. */
export function isOfflineProbe(text: string): boolean {
  const trimmed = text.trim().toLowerCase();
  return trimmed.length === 0 || trimmed === 'offline' || /^[?.!,\s]+$/.test(trimmed);
}

export function matchMentorIntent(text: string): MentorIntent {
  const t = text.trim().toLowerCase();

  if (isOfflineProbe(t)) {
    return 'offline';
  }

  const words = t.split(/\s+/).length;
  if (words < 5 && /\b(hi|hello|hey|good morning|good afternoon|good evening)\b/.test(t)) {
    return 'greeting';
  }

  if (/\b(today|plan|minutes|what should i|schedule|session)\b/.test(t)) {
    return 'plan';
  }

  if (/\b(vocab|vocabulary|word|synonym|very)\b/.test(t)) {
    return 'vocabulary';
  }

  if (/\b(grammar|article|articles|preposition|tense|the nature|the society)\b/.test(t)) {
    return 'grammar';
  }

  if (/\b(listen|listening|section)\b/.test(t)) {
    return 'listening';
  }

  if (/\b(read|reading|passage|tfng|true \/ false)\b/.test(t)) {
    return 'reading';
  }

  if (/\b(writ|essay|task 2|task 1|cohesion|paragraph)\b/.test(t)) {
    return 'writing';
  }

  if (/\b(speak|speaking|fluency|pronunciation|part 2|part 1|5\.5)\b/.test(t)) {
    return 'speaking';
  }

  if (/\b(band|improve|7\.0|target|score)\b/.test(t)) {
    return 'band';
  }

  return 'other';
}

export function greetingFor(name: string, at = new Date()): string {
  const hour = at.getHours();
  const when = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  return `${when}, ${name}.`;
}
