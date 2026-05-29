import { useEffect, useRef } from "react";
import { TIMELINE } from "../timeline";
import type { Cursor } from "./useStepper";

interface Options {
  /** True when mode === "timeline" AND autoStarted. */
  active: boolean;
  cursor: Cursor;
  onAdvance: () => void;
}

/**
 * Drives auto-advance based on the 逐字稿 timeline.
 *
 * When `active` becomes true (user pressed Space in timeline mode), a
 * requestAnimationFrame loop starts. Elapsed wall-clock time is compared
 * against TIMELINE[chapter][step].endMs — when the step's end is reached,
 * onAdvance fires to move to the next step.
 *
 * Manual navigation (arrow keys, progress-bar clicks) changes the cursor,
 * causing the clock to re-sync: the new step's startMs becomes the base,
 * so playback continues seamlessly from the jumped-to position.
 */
export function useTimelinePlayback({ active, cursor, onAdvance }: Options) {
  const cursorRef = useRef(cursor);
  cursorRef.current = cursor;
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const onAdvanceRef = useRef(onAdvance);
  onAdvanceRef.current = onAdvance;
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    if (!active) return;

    const ch = TIMELINE[cursor.chapter];
    if (!ch) return;
    const st = ch[cursor.step];
    if (!st) return;

    // Sync clock: elapsed = now - startTime should equal st.startMs
    startTimeRef.current = performance.now() - st.startMs;

    let stopped = false;

    const tick = () => {
      if (stopped || !activeRef.current) return;

      const cur = cursorRef.current;
      const elapsed = performance.now() - startTimeRef.current;
      const chapter = TIMELINE[cur.chapter];
      if (!chapter) return;
      const step = chapter[cur.step];
      if (!step) return;

      if (elapsed >= step.endMs) {
        // Check if this is the last step — if so, don't advance, just stop
        const isLastChapter = cur.chapter === TIMELINE.length - 1;
        const isLastStep = cur.step === chapter.length - 1;
        if (!(isLastChapter && isLastStep)) {
          stopped = true;
          onAdvanceRef.current();
          return; // cursor will change → effect re-runs with new step
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      stopped = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, [active, cursor.chapter, cursor.step]);
}
