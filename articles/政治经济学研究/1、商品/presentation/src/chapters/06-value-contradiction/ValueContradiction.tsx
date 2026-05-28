import type { ChapterStepProps } from "../../registry/types";
import "./ValueContradiction.css";

export default function ValueContradiction({ step }: ChapterStepProps) {
  return (
    <div className="vc-scene">
      {step === 0 && <Step0 />}
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
      {step === 5 && <Step5 />}
      {step === 6 && <Step6 />}
      {step === 7 && <Step7 />}
      {step === 8 && <Step8 />}
      {step === 9 && <Step9 />}
    </div>
  );
}

function Step0() {
  return (
    <div className="vc-step0">
      <div className="vc-two-circles">
        <span className="vc-circle-label">使用价值</span>
        <span className="vc-and">&</span>
        <span className="vc-circle-label">价值</span>
      </div>
      <p className="vc-cap">两者的关系是什么？</p>
    </div>
  );
}

function Step1() {
  return (
    <div className="vc-step1">
      <div className="vc-unity">
        <span className="vc-unity-big">统一</span>
        <p className="vc-unity-desc">使用价值是价值的物质承担者</p>
        <div className="vc-overlap">
          <svg width="160" height="120" viewBox="0 0 160 120" fill="none">
            <circle cx="60" cy="60" r="45" stroke="var(--text)" strokeWidth="2" fill="none" />
            <circle cx="100" cy="60" r="45" stroke="var(--accent)" strokeWidth="2" fill="var(--accent-soft)" opacity=".4" />
            <text x="42" y="55" fill="var(--text)" fontSize="14" fontFamily="var(--font-display-cn)">使用价值</text>
            <text x="74" y="72" fill="var(--accent)" fontSize="14" fontFamily="var(--font-display-cn)" fontWeight="600">价值</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

function Step2() {
  return (
    <div className="vc-step2">
      <div className="vc-empty-box">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
          <rect x="15" y="15" width="70" height="70" rx="4" stroke="var(--text-mute)" strokeWidth="2" strokeDasharray="6 4" fill="none" />
          <text x="50" y="55" textAnchor="middle" fill="var(--text-mute)" fontSize="14" fontFamily="var(--font-display-cn)">无用之物</text>
        </svg>
      </div>
      <span className="vc-waste">花了再多劳动 = 白费</span>
    </div>
  );
}

function Step3() {
  return (
    <div className="vc-step3">
      <div className="vc-mirror">
        <div className="vc-mirror-row">
          <div className="vc-mirror-box">商品 A</div>
          <span className="vc-mirror-arrow">→</span>
          <span className="vc-mirror-label">价值通过</span>
          <span className="vc-mirror-arrow">→</span>
          <div className="vc-mirror-box accent">商品 B</div>
        </div>
      </div>
      <p className="vc-cap">每个商品的价值通过另一个商品的使用价值来表现</p>
    </div>
  );
}

function Step4() {
  return (
    <div className="vc-step4">
      <div className="vc-person-metaphor">
        <svg width="280" height="120" viewBox="0 0 280 120" fill="none">
          <circle cx="60" cy="50" r="20" stroke="var(--text)" strokeWidth="2" fill="none" />
          <line x1="60" y1="70" x2="60" y2="100" stroke="var(--text)" strokeWidth="2" />
          <circle cx="220" cy="50" r="20" stroke="var(--text)" strokeWidth="2" fill="none" />
          <line x1="220" y1="70" x2="220" y2="100" stroke="var(--text)" strokeWidth="2" />
          <line x1="80" y1="50" x2="200" y2="50" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="4 3" />
          <path d="M80 50 L80 40 M200 50 L200 40" stroke="var(--accent)" strokeWidth="1" />
        </svg>
      </div>
      <p className="vc-cap">就像人必须通过别人认识自己</p>
    </div>
  );
}

function Step5() {
  return (
    <div className="vc-step5">
      <span className="vc-contradiction-label">矛盾</span>
      <div className="vc-split">
        <div className="vc-split-half">使用价值</div>
        <div className="vc-split-divider" />
        <div className="vc-split-half accent">价值</div>
      </div>
      <p className="vc-cap">两者相互排斥</p>
    </div>
  );
}

function Step6() {
  return (
    <div className="vc-step6">
      <div className="vc-producer">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <rect x="20" y="20" width="80" height="60" rx="4" stroke="var(--text)" strokeWidth="2" fill="none" />
          <rect x="36" y="34" width="14" height="10" stroke="var(--text)" strokeWidth="1" />
          <rect x="56" y="34" width="14" height="10" stroke="var(--text)" strokeWidth="1" />
          <rect x="36" y="52" width="14" height="10" stroke="var(--text)" strokeWidth="1" />
          <rect x="56" y="52" width="14" height="10" stroke="var(--text)" strokeWidth="1" />
        </svg>
        <div className="vc-producer-text">
          <span className="vc-aim">生产者目的</span>
          <span className="vc-aim-big">取得价值</span>
          <span className="vc-aim-sub">不是为了使用价值</span>
        </div>
      </div>
    </div>
  );
}

function Step7() {
  return (
    <div className="vc-step7">
      <div className="vc-meanstoend">
        <span className="vc-means">生产使用价值</span>
        <span className="vc-means-arrow">→</span>
        <span className="vc-end">换取价值</span>
      </div>
      <p className="vc-cap">使用价值只是手段，价值才是目的</p>
    </div>
  );
}

function Step8() {
  return (
    <div className="vc-step8">
      <div className="vc-either-or">
        <div className="vc-either-box">
          <span className="vc-either-label">取得使用价值</span>
          <span className="vc-either-desc">消费掉商品</span>
        </div>
        <span className="vc-either-or-text">不能同时</span>
        <div className="vc-either-box accent">
          <span className="vc-either-label">取得价值</span>
          <span className="vc-either-desc">卖掉商品</span>
        </div>
      </div>
    </div>
  );
}

function Step9() {
  return (
    <div className="vc-step9">
      <div className="vc-final">
        <span className="vc-final-text">要么消费它，要么卖掉它</span>
        <div className="vc-rule-wide" />
        <span className="vc-final-label">使用价值与价值的矛盾不可调和</span>
      </div>
    </div>
  );
}
