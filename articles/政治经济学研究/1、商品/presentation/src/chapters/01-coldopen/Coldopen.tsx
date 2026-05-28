import type { ChapterStepProps } from "../../registry/types";
import "./Coldopen.css";

export default function Coldopen({ step }: ChapterStepProps) {
  return (
    <div className="co-scene">
      {step === 0 && <Step0 />}
      {step === 1 && <Step1 />}
    </div>
  );
}

function Step0() {
  return (
    <div className="co-step0">
      <div className="co-exchange-row">
        <div className="co-item">
          <svg className="co-icon" viewBox="0 0 120 200" fill="none">
            {/* water bottle */}
            <rect x="32" y="56" width="56" height="120" rx="16" stroke="var(--text)" strokeWidth="2" />
            <rect x="40" y="30" width="40" height="32" rx="10" stroke="var(--text)" strokeWidth="2" />
            <rect x="46" y="18" width="28" height="16" rx="4" stroke="var(--text)" strokeWidth="2" />
            <line x1="52" y1="28" x2="52" y2="12" stroke="var(--text)" strokeWidth="1.5" />
            <line x1="60" y1="28" x2="60" y2="10" stroke="var(--text)" strokeWidth="1.5" />
            <line x1="68" y1="28" x2="68" y2="12" stroke="var(--text)" strokeWidth="1.5" />
            {/* water level */}
            <rect x="36" y="100" width="48" height="72" rx="12" fill="var(--accent-soft)" />
            <text x="60" y="148" textAnchor="middle" fill="var(--text-mute)" fontSize="10" fontFamily="var(--font-mono)">H₂O</text>
          </svg>
          <span className="co-label">矿泉水</span>
        </div>

        <div className="co-operator">
          <span className="co-question-mark">?</span>
        </div>

        <div className="co-item">
          <svg className="co-icon" viewBox="0 0 140 200" fill="none">
            {/* book */}
            <rect x="20" y="40" width="100" height="130" rx="3" stroke="var(--text)" strokeWidth="2" />
            <line x1="70" y1="40" x2="70" y2="170" stroke="var(--text)" strokeWidth="1" />
            {/* text lines left page */}
            <rect x="30" y="58" width="32" height="3" rx="1.5" fill="var(--text-faint)" />
            <rect x="30" y="68" width="32" height="3" rx="1.5" fill="var(--text-faint)" />
            <rect x="30" y="78" width="28" height="3" rx="1.5" fill="var(--text-faint)" />
            <rect x="30" y="88" width="32" height="3" rx="1.5" fill="var(--text-faint)" />
            <rect x="30" y="98" width="24" height="3" rx="1.5" fill="var(--text-faint)" />
            <rect x="30" y="108" width="32" height="3" rx="1.5" fill="var(--text-faint)" />
            <rect x="30" y="118" width="20" height="3" rx="1.5" fill="var(--text-faint)" />
            {/* text lines right page */}
            <rect x="78" y="58" width="32" height="3" rx="1.5" fill="var(--text-faint)" />
            <rect x="78" y="68" width="28" height="3" rx="1.5" fill="var(--text-faint)" />
            <rect x="78" y="78" width="32" height="3" rx="1.5" fill="var(--text-faint)" />
            <rect x="78" y="88" width="24" height="3" rx="1.5" fill="var(--text-faint)" />
            <rect x="78" y="98" width="32" height="3" rx="1.5" fill="var(--text-faint)" />
            <rect x="78" y="108" width="28" height="3" rx="1.5" fill="var(--text-faint)" />
            <rect x="78" y="118" width="20" height="3" rx="1.5" fill="var(--text-faint)" />
            {/* bookmark */}
            <rect x="66" y="40" width="8" height="28" rx="2" fill="var(--accent)" />
          </svg>
          <span className="co-label">一本书</span>
        </div>
      </div>

      <div className="co-equals-line">
        <span className="co-equals-text">为什么能交换？</span>
      </div>
    </div>
  );
}

function Step1() {
  return (
    <div className="co-step1">
      <div className="co-rule-top" />
      <h1 className="co-title">
        <span className="co-title-char co-char-1">商</span>
        <span className="co-title-char co-char-2">品</span>
      </h1>
      <div className="co-rule-bottom" />
      <p className="co-subtitle">政治经济学的核心秘密</p>
    </div>
  );
}
