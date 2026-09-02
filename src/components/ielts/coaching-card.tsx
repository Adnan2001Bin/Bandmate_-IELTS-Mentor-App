import { MiraNote } from './mira-note';

export type CoachingCardProps = {
  kicker?: string;
  title: string;
  body: string;
};

/** Live or post-turn Mira note. Never congratulatory. */
export function CoachingCard({ kicker = 'Mira', title, body }: CoachingCardProps) {
  return <MiraNote kicker={kicker} title={title} body={body} />;
}
