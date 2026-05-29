import { useCallback, useEffect, useState } from "react";
import type { PlaybackMode } from "./useAudioPlayer";

const ORDER: PlaybackMode[] = ["manual", "audio", "auto", "timeline"];

function readModeFromURL(): PlaybackMode {
  if (typeof window === "undefined") return "manual";
  const q = new URLSearchParams(window.location.search);
  if (q.get("timeline") === "1") return "timeline";
  if (q.get("auto") === "1") return "auto";
  if (q.get("audio") === "1") return "audio";
  return "manual";
}

/**
 * Playback mode state machine + URL sync + keyboard toggle.
 *
 * Modes:
 *   • `manual`   — silent, you click / arrow-key to advance
 *   • `audio`    — audio plays per step, but you still click to advance
 *   • `auto`     — audio plays AND advances automatically (full recording mode)
 *   • `timeline` — advances automatically based on transcript timestamps,
 *                  no audio needed (see references/TIMELINE-PLAYBACK.md)
 *
 * Initial mode read from URL: `?auto=1`, `?audio=1`, or `?timeline=1`.
 * Press `M` to cycle: manual → audio → auto → timeline → manual.
 * URL stays in sync so reload preserves the mode.
 *
 * `autoStarted` exists separately because browsers require a user gesture
 * before audio can autoplay — `AutoStartGate` flips it on space-press.
 */
export function useAutoMode() {
  const [mode, setModeState] = useState<PlaybackMode>(() => readModeFromURL());
  const [autoStarted, setAutoStarted] = useState(false);

  const setMode = useCallback((m: PlaybackMode) => {
    setModeState(m);
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.delete("audio");
    url.searchParams.delete("auto");
    url.searchParams.delete("timeline");
    if (m === "audio") url.searchParams.set("audio", "1");
    if (m === "auto") url.searchParams.set("auto", "1");
    if (m === "timeline") url.searchParams.set("timeline", "1");
    window.history.replaceState(null, "", url.toString());
    if (m !== "auto" && m !== "timeline") setAutoStarted(false);
  }, []);

  const cycleMode = useCallback(() => {
    setMode(ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length]!);
  }, [mode, setMode]);

  // Keyboard: `M` cycles mode. `Space` starts auto if gated.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        cycleMode();
      } else if (e.key === " " && !autoStarted && (mode === "auto" || mode === "timeline")) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setAutoStarted(true);
      }
    };
    // Capture phase so we can stopImmediatePropagation before useStepper's
    // bubble listener also fires on Space.
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [mode, autoStarted, cycleMode]);

  return { mode, setMode, cycleMode, autoStarted, setAutoStarted };
}
