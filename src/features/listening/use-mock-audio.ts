import { useCallback, useEffect, useRef, useState } from 'react';

const SPEEDS = [0.75, 1, 1.25, 1.5] as const;

/**
 * Clock-driven playback. The duration is real; there is no copyrighted audio
 * file. A URI can replace this later without changing AudioPlayer.
 */
export function useMockAudio(durationMs: number) {
  const positionRef = useRef(0);
  const [positionMs, setPositionMs] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    positionRef.current = 0;
    setPositionMs(0);
    setPlaying(false);
  }, [durationMs]);

  useEffect(() => {
    if (!playing) {
      return;
    }

    let frame = 0;
    let last = Date.now();

    const tick = () => {
      const now = Date.now();
      const next = Math.min(durationMs, positionRef.current + (now - last) * speed);
      last = now;
      positionRef.current = next;
      setPositionMs(next);

      if (next >= durationMs) {
        setPlaying(false);
        return;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, speed, durationMs]);

  const seek = useCallback(
    (ms: number) => {
      const clamped = Math.max(0, Math.min(durationMs, ms));
      positionRef.current = clamped;
      setPositionMs(clamped);
    },
    [durationMs],
  );

  const toggle = useCallback(() => {
    setPlaying((value) => {
      if (!value && positionRef.current >= durationMs) {
        positionRef.current = 0;
        setPositionMs(0);
      }
      return !value;
    });
  }, [durationMs]);

  const cycleSpeed = useCallback(() => {
    setSpeed((current) => {
      const index = SPEEDS.indexOf(current);
      return SPEEDS[(index + 1) % SPEEDS.length] ?? 1;
    });
  }, []);

  return {
    positionMs,
    playing,
    speed,
    muted,
    toggle,
    cycleSpeed,
    seek,
    toggleMute: () => setMuted((value) => !value),
    playFrom: (ms: number) => {
      seek(ms);
      setPlaying(true);
    },
  };
}
