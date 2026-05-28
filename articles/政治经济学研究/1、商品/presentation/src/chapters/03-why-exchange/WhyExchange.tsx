import type { ChapterStepProps } from "../../registry/types";
import "./WhyExchange.css";

export default function WhyExchange({ step }: ChapterStepProps) {
  return (
    <div className="we-scene">
      {step === 0 && <Step0 />}
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
      {step === 5 && <Step5 />}
      {step === 6 && <Step6 />}
      {step === 7 && <Step7 />}
    </div>
  );
}

function Step0() {
  return (
    <div className="we-step0">
      <span className="we-tag-fade">使用价值</span>
      <span className="we-arrow">→</span>
      <span className="we-next">还必须参与交换</span>
    </div>
  );
}

function Step1() {
  return (
    <div className="we-step1">
      <svg className="we-farm" viewBox="0 0 200 160" fill="none">
        <rect x="30" y="70" width="50" height="50" stroke="var(--text)" strokeWidth="2" fill="none" />
        <polygon points="25,70 55,30 85,70" stroke="var(--text)" strokeWidth="2" fill="none" />
        <rect x="38" y="84" width="14" height="14" stroke="var(--text)" strokeWidth="1" />
        <line x1="45" y1="84" x2="45" y2="98" stroke="var(--text)" strokeWidth="1" />
        <line x1="38" y1="91" x2="52" y2="91" stroke="var(--text)" strokeWidth="1" />
        <path d="M100 60 Q110 50 120 60 L115 50 M120 60 Q130 50 140 60" stroke="var(--text)" strokeWidth="1.5" fill="none" />
        <circle cx="40" cy="44" r="12" stroke="var(--text)" strokeWidth="2" fill="none" />
        <circle cx="75" cy="20" r="16" stroke="var(--text)" strokeWidth="2" fill="none" />
        <line x1="75" y1="36" x2="75" y2="120" stroke="var(--text)" strokeWidth="1.5" />
        <circle cx="75" cy="36" r="2" fill="var(--accent)" />
      </svg>
      <div className="we-label-row">
        <span className="we-label">劳动产品</span>
        <span className="we-neq">≠ 商品</span>
      </div>
      <p className="we-cap">自给自足，不参与交换</p>
    </div>
  );
}

function Step2() {
  return (
    <div className="we-step2">
      <div className="we-equation">
        <span className="we-eq-item">20斤大米</span>
        <span className="we-eq-op">=</span>
        <span className="we-eq-item">10尺布</span>
      </div>
      <div className="we-question-mark">？</div>
      <p className="we-cap">为什么能按这个比例交换？</p>
    </div>
  );
}

function Step3() {
  return (
    <div className="we-step3">
      <div className="we-deny">
        <span className="we-deny-text">使用价值相同？</span>
        <span className="we-cross">✕</span>
      </div>
      <p className="we-cap">单位不同，不能列等式</p>
    </div>
  );
}

function Step4() {
  return (
    <div className="we-step4">
      <div className="we-compare">
        <div className="we-comp-item">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <ellipse cx="32" cy="34" rx="22" ry="16" stroke="var(--text)" strokeWidth="2" />
            <path d="M14 32 Q14 46 32 48 Q50 46 50 32" stroke="var(--text)" strokeWidth="2" fill="none" />
          </svg>
          <span>填肚子</span>
        </div>
        <div className="we-comp-item">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect x="14" y="16" width="36" height="44" rx="2" stroke="var(--text)" strokeWidth="2" />
            <line x1="14" y1="32" x2="50" y2="32" stroke="var(--text)" strokeWidth="1.5" />
          </svg>
          <span>遮身体</span>
        </div>
      </div>
      <p className="we-conclusion">需求完全不同 → 不是交换的原因</p>
    </div>
  );
}

function Step5() {
  return (
    <div className="we-step5">
      <div className="we-focus">
        <span className="we-focus-pre">各商品内部</span>
        <span className="we-focus-main">一定有本质上相同的东西</span>
      </div>
    </div>
  );
}

function Step6() {
  return (
    <div className="we-step6">
      <div className="we-answer-box">
        <span className="we-answer-pre">共同点</span>
        <span className="we-answer-main">人类劳动的产品</span>
      </div>
    </div>
  );
}

function Step7() {
  return (
    <div className="we-step7">
      <div className="we-reveal">
        <div className="we-reveal-line" />
        <span className="we-reveal-text">凝结了人类无差别的劳动</span>
        <div className="we-reveal-line" />
      </div>
      <p className="we-cap-final">这是商品能够交换的根本原因</p>
    </div>
  );
}
