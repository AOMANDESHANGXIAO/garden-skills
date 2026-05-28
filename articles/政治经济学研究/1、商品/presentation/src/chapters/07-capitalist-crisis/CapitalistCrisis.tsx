import type { ChapterStepProps } from "../../registry/types";
import "./CapitalistCrisis.css";

export default function CapitalistCrisis({ step }: ChapterStepProps) {
  return (
    <div className="cc-scene">
      {step === 0 && <Step0 />}
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
      {step === 5 && <Step5 />}
      {step === 6 && <Step6 />}
      {step === 7 && <Step7 />}
      {step === 8 && <Step8 />}
    </div>
  );
}

function Step0() {
  return (
    <div className="cc-step0">
      <svg width="200" height="140" viewBox="0 0 200 140" fill="none" className="cc-factory-svg">
        <rect x="40" y="40" width="120" height="70" rx="2" stroke="var(--text)" strokeWidth="2" fill="none" />
        <rect x="50" y="50" width="30" height="25" stroke="var(--text)" strokeWidth="1.5" fill="none" />
        <rect x="90" y="50" width="30" height="25" stroke="var(--text)" strokeWidth="1.5" fill="none" />
        <rect x="130" y="50" width="20" height="25" stroke="var(--text)" strokeWidth="1.5" fill="none" />
        <path d="M30 110 L50 70 L70 110 Z" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
        <path d="M70 110 L90 55 L110 110 Z" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
        <path d="M110 110 L130 70 L150 110 Z" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
        <line x1="30" y1="110" x2="150" y2="110" stroke="var(--text)" strokeWidth="2" />
      </svg>
      <span className="cc-title">内部矛盾 → 资本主义危机</span>
    </div>
  );
}

function Step1() {
  return (
    <div className="cc-step1">
      <div className="cc-capitalist">
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none" className="cc-silhouette">
          <circle cx="50" cy="35" r="18" stroke="var(--text)" strokeWidth="2" fill="none" />
          <path d="M20 80 L30 55 L70 55 L80 80" stroke="var(--text)" strokeWidth="2" fill="none" />
          <line x1="50" y1="80" x2="50" y2="105" stroke="var(--text)" strokeWidth="2" />
        </svg>
        <div className="cc-cap-goal">
          <span className="cc-cap-label">资本家目的</span>
          <span className="cc-cap-value">追求价值</span>
          <span className="cc-cap-sub">不是使用价值</span>
        </div>
      </div>
    </div>
  );
}

function Step2() {
  return (
    <div className="cc-step2">
      <div className="cc-diverge">
        <div className="cc-diverge-item">
          <span className="cc-diverge-label">人们需要</span>
          <span className="cc-diverge-icon">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="22" r="10" stroke="var(--text)" strokeWidth="1.5" fill="none" />
              <path d="M16 48 L16 35 C16 28 22 22 30 22 C38 22 44 28 44 35 L44 48" stroke="var(--text)" strokeWidth="1.5" fill="none" />
            </svg>
          </span>
          <span className="cc-diverge-desc">使用价值</span>
        </div>
        <div className="cc-diverge-gap">
          <span className="cc-diverge-vs">偏离</span>
        </div>
        <div className="cc-diverge-item accent">
          <span className="cc-diverge-label">生产方向</span>
          <span className="cc-diverge-icon">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <rect x="12" y="20" width="36" height="28" rx="2" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
              <rect x="20" y="28" width="8" height="6" stroke="var(--accent)" strokeWidth="1" fill="none" />
              <rect x="32" y="28" width="8" height="6" stroke="var(--accent)" strokeWidth="1" fill="none" />
              <line x1="30" y1="48" x2="30" y2="56" stroke="var(--accent)" strokeWidth="1.5" />
              <text x="30" y="15" textAnchor="middle" fill="var(--accent)" fontSize="14" fontFamily="var(--font-display-cn)">$</text>
            </svg>
          </span>
          <span className="cc-diverge-desc">追求价值</span>
        </div>
      </div>
      <p className="cc-cap">盲目性和逐利性</p>
    </div>
  );
}

function Step3() {
  return (
    <div className="cc-step3">
      <div className="cc-production">
        <svg width="280" height="100" viewBox="0 0 280 100" fill="none">
          <rect x="10" y="35" width="50" height="35" rx="2" stroke="var(--text)" strokeWidth="1.5" fill="none" />
          <rect x="18" y="42" width="14" height="10" stroke="var(--text)" strokeWidth="1" fill="none" />
          <rect x="36" y="42" width="14" height="10" stroke="var(--text)" strokeWidth="1" fill="none" />
          <line x1="60" y1="52" x2="80" y2="52" stroke="var(--accent)" strokeWidth="1.5" />
          <rect x="80" y="30" width="25" height="15" rx="2" stroke="var(--text)" strokeWidth="1.5" fill="var(--accent-soft)" opacity=".5" />
          <text x="92" y="41" textAnchor="middle" fill="var(--text)" fontSize="8" fontFamily="var(--font-mono)">A</text>
          <rect x="110" y="30" width="25" height="15" rx="2" stroke="var(--text)" strokeWidth="1.5" fill="var(--accent-soft)" opacity=".5" />
          <text x="122" y="41" textAnchor="middle" fill="var(--text)" fontSize="8" fontFamily="var(--font-mono)">B</text>
          <rect x="140" y="30" width="25" height="15" rx="2" stroke="var(--text)" strokeWidth="1.5" fill="var(--accent-soft)" opacity=".5" />
          <text x="152" y="41" textAnchor="middle" fill="var(--text)" fontSize="8" fontFamily="var(--font-mono)">C</text>
          <rect x="170" y="30" width="25" height="15" rx="2" stroke="var(--text)" strokeWidth="1.5" fill="var(--accent-soft)" opacity=".5" />
          <text x="182" y="41" textAnchor="middle" fill="var(--text)" fontSize="8" fontFamily="var(--font-mono)">D</text>
          <text x="25" y="85" textAnchor="middle" fill="var(--text-mute)" fontSize="11" fontFamily="var(--font-body)">盲目扩大再生产</text>
        </svg>
      </div>
      <span className="cc-overflow-label">生产过剩</span>
    </div>
  );
}

function Step4() {
  return (
    <div className="cc-step4">
      <div className="cc-pile">
        <svg width="240" height="160" viewBox="0 0 240 160" fill="none">
          <rect x="60" y="100" width="50" height="30" rx="2" stroke="var(--text)" strokeWidth="1.5" fill="none" />
          <rect x="120" y="100" width="50" height="30" rx="2" stroke="var(--text)" strokeWidth="1.5" fill="none" />
          <rect x="70" y="80" width="50" height="30" rx="2" stroke="var(--text)" strokeWidth="1.5" fill="none" />
          <rect x="110" y="80" width="50" height="30" rx="2" stroke="var(--text)" strokeWidth="1.5" fill="none" />
          <rect x="80" y="60" width="50" height="30" rx="2" stroke="var(--text)" strokeWidth="1.5" fill="none" />
          <rect x="110" y="40" width="50" height="30" rx="2" stroke="var(--text)" strokeWidth="1.5" fill="none" />
          <text x="135" y="58" textAnchor="middle" fill="var(--text-mute)" fontSize="10" fontFamily="var(--font-body)">?</text>
        </svg>
      </div>
      <p className="cc-cap">生产出来的商品无人消费</p>
    </div>
  );
}

function Step5() {
  return (
    <div className="cc-step5">
      <div className="cc-chain">
        <div className="cc-chain-node">商品堆积</div>
        <span className="cc-chain-arrow">→</span>
        <div className="cc-chain-node">价值无法实现</div>
        <span className="cc-chain-arrow">→</span>
        <div className="cc-chain-node">资本周转断裂</div>
        <span className="cc-chain-arrow">→</span>
        <div className="cc-chain-node">裁员</div>
        <span className="cc-chain-arrow">→</span>
        <div className="cc-chain-node accent">没工资</div>
      </div>
      <div className="cc-loop-back">
        <svg width="240" height="30" viewBox="0 0 240 30" fill="none">
          <path d="M10 20 C80 -10, 160 40, 230 10" stroke="var(--accent)" strokeWidth="1.5" fill="none" />
          <text x="120" y="28" textAnchor="middle" fill="var(--accent)" fontSize="11" fontFamily="var(--font-body)">更无法消费 → 进一步堆积</text>
        </svg>
      </div>
    </div>
  );
}

function Step6() {
  return (
    <div className="cc-step6">
      <span className="cc-crisis-text">生产过剩危机</span>
      <div className="cc-crisis-rule" />
      <p className="cc-cap">恶性循环无解</p>
    </div>
  );
}

function Step7() {
  return (
    <div className="cc-step7">
      <div className="cc-reform-block">
        <div className="cc-reform-proposals">
          <span className="cc-reform-item">加工资</span>
          <span className="cc-reform-item">堆福利</span>
          <span className="cc-reform-item">刺激消费</span>
        </div>
        <div className="cc-reform-arrow-row">
          <span className="cc-reform-arrow">→</span>
          <span className="cc-reform-arrow">→</span>
          <span className="cc-reform-arrow">→</span>
        </div>
        <div className="cc-reform-wall">
          <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
            <rect x="10" y="5" width="60" height="50" rx="2" stroke="var(--accent)" strokeWidth="2.5" fill="var(--accent-soft)" opacity=".3" />
            <text x="40" y="35" textAnchor="middle" fill="var(--accent)" fontSize="11" fontFamily="var(--font-display-cn)">追逐价值</text>
          </svg>
        </div>
      </div>
      <p className="cc-cap">改良触及不到矛盾根源</p>
    </div>
  );
}

function Step8() {
  return (
    <div className="cc-step8">
      <div className="cc-final-block">
        <span className="cc-final-text">资本主义生产方式的矛盾</span>
        <div className="cc-rule-wide" />
        <span className="cc-final-sub">无法通过自身改良解决</span>
      </div>
    </div>
  );
}
