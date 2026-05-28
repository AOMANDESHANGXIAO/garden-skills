import type { ChapterStepProps } from "../../registry/types";
import "./UseValue.css";

export default function UseValue({ step }: ChapterStepProps) {
  return (
    <div className="uv-scene">
      {step === 0 && <Step0 />}
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
      {step === 5 && <Step5 />}
      {step === 6 && <Step6 />}
    </div>
  );
}

/* ─── Step 0: precondition ─── */
function Step0() {
  return (
    <div className="uv-step0">
      <div className="uv-rule-short" />
      <div className="uv-statement">
        <span className="uv-em">有用</span>
        <span className="uv-text">是商品的第一条件</span>
      </div>
      <div className="uv-rule-short" />
      <p className="uv-hint">一个物必须有用，才可能成为商品</p>
    </div>
  );
}

/* ─── Step 1: examples ─── */
function Step1() {
  return (
    <div className="uv-step1">
      <div className="uv-examples">
        <div className="uv-ex-card">
          <svg className="uv-ex-icon" viewBox="0 0 100 100" fill="none">
            {/* rice bowl */}
            <ellipse cx="50" cy="55" rx="38" ry="28" stroke="var(--text)" strokeWidth="2" fill="none" />
            <path d="M18 50 Q18 78 50 80 Q82 78 82 50" stroke="var(--text)" strokeWidth="2" fill="none" />
            {/* rice grains */}
            <ellipse cx="36" cy="44" rx="5" ry="3" fill="var(--text-mute)" opacity="0.5" />
            <ellipse cx="50" cy="40" rx="5" ry="3" fill="var(--text-mute)" opacity="0.5" />
            <ellipse cx="64" cy="44" rx="5" ry="3" fill="var(--text-mute)" opacity="0.5" />
            <ellipse cx="42" cy="50" rx="4" ry="3" fill="var(--text-mute)" opacity="0.4" />
            <ellipse cx="56" cy="50" rx="4" ry="3" fill="var(--text-mute)" opacity="0.4" />
          </svg>
          <span className="uv-ex-label">米饭</span>
          <span className="uv-ex-tag">有用</span>
        </div>

        <span className="uv-plus">+</span>

        <div className="uv-ex-card">
          <svg className="uv-ex-icon" viewBox="0 0 100 100" fill="none">
            {/* water glass */}
            <path d="M28 30 L35 90 L65 90 L72 30 Z" stroke="var(--text)" strokeWidth="2" fill="none" />
            <line x1="28" y1="30" x2="72" y2="30" stroke="var(--text)" strokeWidth="2" />
            {/* water level */}
            <path d="M32 50 L32 85 L68 85 L68 50 Z" fill="var(--accent-soft)" />
          </svg>
          <span className="uv-ex-label">水</span>
          <span className="uv-ex-tag">有用</span>
        </div>
      </div>

      <div className="uv-def">
        <span className="uv-def-label">使用价值</span>
        <span className="uv-def-desc">满足人类需求的能力</span>
      </div>
    </div>
  );
}

/* ─── Step 2: without use value ─── */
function Step2() {
  return (
    <div className="uv-step2">
      <div className="uv-crossed">
        <svg className="uv-cross-icon" viewBox="0 0 100 100" fill="none">
          {/* generic useless object — a rock */}
          <path d="M25 75 Q10 55 25 30 Q40 15 55 25 Q70 15 80 30 Q90 50 70 70 Q50 80 35 75 Z" stroke="var(--text-mute)" strokeWidth="2" fill="none" />
          {/* cross */}
          <line x1="15" y1="85" x2="85" y2="15" stroke="var(--accent)" strokeWidth="2.5" />
        </svg>
        <div className="uv-neq">
          <span className="uv-neq-big">≠ 商品</span>
        </div>
      </div>
      <p className="uv-cond">第一个条件：必须具备使用价值</p>
    </div>
  );
}

/* ─── Step 3: use value changes ─── */
function Step3() {
  return (
    <div className="uv-step3">
      <div className="uv-shift-text">
        <span className="uv-shift-word">使用价值</span>
        <span className="uv-shift-word uv-shift-ghost">使用价值</span>
      </div>
      <p className="uv-shift-sub">会随历史条件改变</p>
      <div className="uv-wave-line">
        <svg width="200" height="8" viewBox="0 0 200 8" fill="none">
          <path d="M0 4 Q25 0 50 4 Q75 8 100 4 Q125 0 150 4 Q175 8 200 4" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
    </div>
  );
}

/* ─── Step 4: ancient people & oil ─── */
function Step4() {
  return (
    <div className="uv-step4">
      <div className="uv-scene-row">
        {/* ancient figure */}
        <svg className="uv-fig" viewBox="0 0 100 180" fill="none">
          {/* head */}
          <circle cx="50" cy="28" r="16" stroke="var(--text)" strokeWidth="2" />
          {/* body — ancient robe */}
          <path d="M34 50 L20 160 L80 160 L66 50 Z" stroke="var(--text)" strokeWidth="2" fill="none" />
          {/* arms */}
          <path d="M34 70 L10 90" stroke="var(--text)" strokeWidth="2" />
          <path d="M66 70 L80 60" stroke="var(--text)" strokeWidth="2" />
          {/* confusion marks */}
          <text x="68" y="22" fill="var(--accent)" fontSize="18" fontFamily="var(--font-display-en)" fontStyle="italic">?</text>
        </svg>

        {/* oil puddle */}
        <div className="uv-oil-area">
          <svg className="uv-oil-icon" viewBox="0 0 80 40" fill="none">
            <ellipse cx="40" cy="20" rx="32" ry="14" fill="var(--text)" opacity="0.8" />
            <ellipse cx="36" cy="18" rx="8" ry="4" fill="var(--surface)" opacity="0.3" />
          </svg>
          <span className="uv-oil-label">石油？</span>
        </div>
      </div>
      <p className="uv-caption">古代：这是什么怪液体？完全不知道能干什么</p>
    </div>
  );
}

/* ─── Step 5: industrial era ─── */
function Step5() {
  return (
    <div className="uv-step5">
      <div className="uv-scene-row">
        {/* factory */}
        <svg className="uv-factory" viewBox="0 0 160 140" fill="none">
          {/* main building */}
          <rect x="20" y="40" width="50" height="80" stroke="var(--text)" strokeWidth="2" fill="none" />
          {/* roof */}
          <polygon points="15,40 45,10 75,40" stroke="var(--text)" strokeWidth="2" fill="none" />
          {/* smokestack */}
          <rect x="40" y="0" width="10" height="45" stroke="var(--text)" strokeWidth="2" fill="none" />
          {/* smoke */}
          <circle cx="45" cy="-8" r="6" fill="var(--text-faint)" opacity="0.5" />
          <circle cx="40" cy="-20" r="5" fill="var(--text-faint)" opacity="0.35" />
          {/* side building */}
          <rect x="80" y="60" width="55" height="60" stroke="var(--text)" strokeWidth="2" fill="none" />
          <polygon points="75,60 107,35 140,60" stroke="var(--text)" strokeWidth="2" fill="none" />
          {/* windows */}
          <rect x="92" y="74" width="12" height="10" stroke="var(--text)" strokeWidth="1" />
          <rect x="112" y="74" width="12" height="10" stroke="var(--text)" strokeWidth="1" />
        </svg>

        <div className="uv-arrow-big">→</div>

        {/* oil drop */}
        <svg className="uv-drop" viewBox="0 0 60 80" fill="none">
          <path d="M30 0 C30 0 5 40 5 55 C5 68 16 78 30 78 C44 78 55 68 55 55 C55 40 30 0 30 0 Z" stroke="var(--accent)" strokeWidth="2.5" fill="var(--accent-soft)" />
        </svg>
      </div>
      <div className="uv-tagline">
        <span className="uv-tagline-main">工业的血液</span>
        <span className="uv-tagline-sub">大工业时代才发现石油的真正价值</span>
      </div>
    </div>
  );
}

/* ─── Step 6: historical nature ─── */
function Step6() {
  return (
    <div className="uv-step6">
      <h2 className="uv-sum-title">使用价值有历史性</h2>
      {/* timeline */}
      <div className="uv-timeline">
        <div className="uv-tl-node uv-tl-past">
          <span className="uv-tl-label">过去</span>
          <span className="uv-tl-item">石油：无用</span>
        </div>
        <div className="uv-tl-arrow">
          <svg width="120" height="4" viewBox="0 0 120 4">
            <line x1="0" y1="2" x2="115" y2="2" stroke="var(--accent)" strokeWidth="1.5" />
            <polygon points="112,0 120,2 112,4" fill="var(--accent)" />
          </svg>
        </div>
        <div className="uv-tl-node uv-tl-now">
          <span className="uv-tl-label">现在</span>
          <span className="uv-tl-item">石油：工业血液</span>
        </div>
        <div className="uv-tl-arrow">
          <svg width="120" height="4" viewBox="0 0 120 4">
            <line x1="0" y1="2" x2="115" y2="2" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 3" />
            <polygon points="112,0 120,2 112,4" fill="var(--accent)" />
          </svg>
        </div>
        <div className="uv-tl-node uv-tl-future">
          <span className="uv-tl-label">未来</span>
          <span className="uv-tl-item">使用价值可能改变</span>
        </div>
      </div>
      <p className="uv-sum-text">今天没用的，以后可能大用。今天有用的，以后也可能失去使用价值。</p>
    </div>
  );
}
