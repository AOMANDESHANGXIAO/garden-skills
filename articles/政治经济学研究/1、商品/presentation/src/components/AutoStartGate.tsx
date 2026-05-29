import type { PlaybackMode } from "../hooks/useAudioPlayer";
import "./AutoStartGate.css";

interface Props {
  visible: boolean;
  onStart(): void;
  mode: PlaybackMode;
}

const MODE_LABEL: Record<PlaybackMode, string> = {
  manual: "",
  audio: "",
  auto: "AUTO PLAYBACK",
  timeline: "TIMELINE PLAYBACK",
};

const MODE_DESC: Record<PlaybackMode, string> = {
  manual: "",
  audio: "",
  auto: "Audio plays per step and advances automatically.",
  timeline: "Slides advance automatically based on the transcript timeline.",
};

export function AutoStartGate({ visible, onStart, mode }: Props) {
  if (!visible) return null;
  return (
    <div
      className="auto-gate"
      data-no-advance
      onClick={onStart}
      role="button"
      tabIndex={0}
    >
      <div className="auto-gate-card">
        <div className="auto-gate-kicker">{MODE_LABEL[mode]}</div>
        <div className="auto-gate-title">Press SPACE to start</div>
        <div className="auto-gate-sub">
          {MODE_DESC[mode]}
          <br />
          Press <kbd>M</kbd> any time to switch modes.
        </div>
      </div>
    </div>
  );
}
