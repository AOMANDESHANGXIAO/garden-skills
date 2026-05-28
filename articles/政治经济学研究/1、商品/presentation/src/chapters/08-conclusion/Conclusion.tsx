import type { ChapterStepProps } from "../../registry/types";
import "./Conclusion.css";

export default function Conclusion({ step }: ChapterStepProps) {
  return (
    <div className="cn-scene">
      {step === 0 && <Step0 />}
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
    </div>
  );
}

function Step0() {
  return (
    <div className="cn-step0">
      <div className="cn-goods">
        <svg width="320" height="120" viewBox="0 0 320 120" fill="none">
          {/* rice */}
          <rect x="20" y="40" width="50" height="40" rx="3" stroke="var(--text)" strokeWidth="1.5" fill="none" />
          <text x="45" y="65" textAnchor="middle" fill="var(--text)" fontSize="13" fontFamily="var(--font-display-cn)">大米</text>
          {/* cloth */}
          <rect x="90" y="40" width="50" height="40" rx="3" stroke="var(--text)" strokeWidth="1.5" fill="none" />
          <text x="115" y="65" textAnchor="middle" fill="var(--text)" fontSize="13" fontFamily="var(--font-display-cn)">布</text>
          {/* oil */}
          <rect x="160" y="40" width="50" height="40" rx="3" stroke="var(--text)" strokeWidth="1.5" fill="none" />
          <text x="185" y="65" textAnchor="middle" fill="var(--text)" fontSize="13" fontFamily="var(--font-display-cn)">石油</text>
          {/* book */}
          <rect x="230" y="40" width="50" height="40" rx="3" stroke="var(--text)" strokeWidth="1.5" fill="none" />
          <text x="255" y="65" textAnchor="middle" fill="var(--text)" fontSize="13" fontFamily="var(--font-display-cn)">书</text>
          {/* dashes between */}
          <line x1="70" y1="60" x2="85" y2="60" stroke="var(--text-faint)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="140" y1="60" x2="155" y2="60" stroke="var(--text-faint)" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="210" y1="60" x2="225" y2="60" stroke="var(--text-faint)" strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>
      <p className="cn-cap">交换的到底是什么？</p>
    </div>
  );
}

function Step1() {
  return (
    <div className="cn-step1">
      <div className="cn-reveal">
        <div className="cn-shell-sequence">
          <div className="cn-shell-item">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <rect x="15" y="15" width="50" height="50" rx="3" stroke="var(--text-mute)" strokeWidth="2" fill="none" strokeDasharray="4 3" />
              <text x="40" y="48" textAnchor="middle" fill="var(--text-mute)" fontSize="13" fontFamily="var(--font-display-cn)">物</text>
            </svg>
          </div>
          <span className="cn-reveal-arrow">→</span>
          <div className="cn-shell-item">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="28" stroke="var(--accent)" strokeWidth="2" fill="var(--accent-soft)" opacity=".4" />
              <text x="40" y="46" textAnchor="middle" fill="var(--accent)" fontSize="21" fontFamily="var(--font-display-cn)" fontWeight="600">劳动</text>
            </svg>
          </div>
        </div>
      </div>
      <p className="cn-cap">外壳之下，是包含在物中的劳动</p>
    </div>
  );
}

function Step2() {
  return (
    <div className="cn-step2">
      <div className="cn-people">
        <svg width="280" height="140" viewBox="0 0 280 140" fill="none">
          <circle cx="50" cy="40" r="16" stroke="var(--text)" strokeWidth="2" fill="none" />
          <line x1="50" y1="56" x2="50" y2="80" stroke="var(--text)" strokeWidth="2" />
          <circle cx="230" cy="40" r="16" stroke="var(--text)" strokeWidth="2" fill="none" />
          <line x1="230" y1="56" x2="230" y2="80" stroke="var(--text)" strokeWidth="2" />
          <circle cx="140" cy="100" r="16" stroke="var(--text)" strokeWidth="2" fill="none" />
          <line x1="140" y1="116" x2="140" y2="136" stroke="var(--text)" strokeWidth="2" />
          {/* exchange connections */}
          <line x1="64" y1="38" x2="216" y2="38" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="62" y1="48" x2="134" y2="90" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 4" />
          <line x1="150" y1="92" x2="218" y2="48" stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 4" />
        </svg>
      </div>
      <div className="cn-people-text">
        <span className="cn-big">不是物与物的关系</span>
        <span className="cn-change">而是</span>
        <span className="cn-big accent">人与人的关系</span>
      </div>
    </div>
  );
}

function Step3() {
  return (
    <div className="cn-step3">
      <div className="cn-closing">
        <span className="cn-closing-text">人们互相交换商品</span>
        <span className="cn-closing-dash">——</span>
        <span className="cn-closing-text accent">实际上是互相交换各自的劳动</span>
      </div>
      <div className="cn-rule-wide" />
      <span className="cn-end-label">商品的秘密</span>
    </div>
  );
}
