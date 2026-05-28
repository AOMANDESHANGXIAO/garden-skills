import type { ChapterStepProps } from "../../registry/types";
import "./ValueQuantity.css";

export default function ValueQuantity({ step }: ChapterStepProps) {
  return (
    <div className="vq-scene">
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
    <div className="vq-step0">
      <div className="vq-equation-big">
        <span>x斤 大米</span>
        <span className="vq-eq">=</span>
        <span>y尺 布</span>
      </div>
      <p className="vq-sub">为什么能按比例交换？</p>
    </div>
  );
}

function Step1() {
  return (
    <div className="vq-step1">
      <div className="vq-arrow-row">
        <span className="vq-from">无差别劳动</span>
        <span className="vq-arr">→</span>
        <span className="vq-to">可量化的量</span>
      </div>
      <p className="vq-sub">能按比例，说明劳动可以量化</p>
    </div>
  );
}

function Step2() {
  return (
    <div className="vq-step2">
      <svg className="vq-clock" viewBox="0 0 140 140" fill="none">
        <circle cx="70" cy="70" r="60" stroke="var(--text)" strokeWidth="2.5" />
        <line x1="70" y1="70" x2="70" y2="30" stroke="var(--accent)" strokeWidth="3" />
        <line x1="70" y1="70" x2="95" y2="70" stroke="var(--text)" strokeWidth="2" />
        <circle cx="70" cy="70" r="4" fill="var(--accent)" />
      </svg>
      <span className="vq-big-label">量化的尺度：时间</span>
      <p className="vq-sub">没有劳动不消耗时间</p>
    </div>
  );
}

function Step3() {
  return (
    <div className="vq-step3">
      <span className="vq-concept">社会必要劳动时间</span>
      <p className="vq-sub">用社会平均条件衡量商品价值</p>
    </div>
  );
}

function Step4() {
  return (
    <div className="vq-step4">
      <div className="vq-quote-block">
        <span className="vq-quote-mark">"</span>
        <p className="vq-quote-text">
          社会必要劳动时间，是用社会现有的标准生产条件，用社会平均的劳动熟练程度和强度，生产任何一个使用价值所必要的劳动时间。
        </p>
        <span className="vq-quote-src">—— 马克思</span>
      </div>
    </div>
  );
}

function Step5() {
  return (
    <div className="vq-step5">
      <div className="vq-diagram">
        <div className="vq-dia-row">
          <span className="vq-dia-label">生产资料改进</span>
          <span className="vq-dia-arrow">→</span>
          <span className="vq-dia-label">效率 ↑</span>
          <span className="vq-dia-arrow">→</span>
          <span className="vq-dia-result down">价值 ↓</span>
        </div>
      </div>
    </div>
  );
}

function Step6() {
  return (
    <div className="vq-step6">
      <div className="vq-diagram">
        <div className="vq-dia-row">
          <span className="vq-dia-label">自然灾害 / 战争</span>
          <span className="vq-dia-arrow">→</span>
          <span className="vq-dia-label">效率 ↓</span>
          <span className="vq-dia-arrow">→</span>
          <span className="vq-dia-result up">价值 ↑</span>
        </div>
      </div>
    </div>
  );
}

function Step7() {
  return (
    <div className="vq-step7">
      <span className="vq-warn">但注意</span>
      <p className="vq-warn-text">抽象劳动并非在任何时候都形成价值</p>
    </div>
  );
}

function Step8() {
  return (
    <div className="vq-step8">
      <svg className="vq-commune" viewBox="0 0 200 140" fill="none">
        <circle cx="40" cy="70" r="22" stroke="var(--text)" strokeWidth="2" />
        <circle cx="100" cy="50" r="22" stroke="var(--text)" strokeWidth="2" />
        <circle cx="160" cy="70" r="22" stroke="var(--text)" strokeWidth="2" />
        <circle cx="70" cy="100" r="22" stroke="var(--text)" strokeWidth="2" />
        <circle cx="130" cy="100" r="22" stroke="var(--text)" strokeWidth="2" />
        {/* sharing lines */}
        <line x1="60" y1="62" x2="80" y2="48" stroke="var(--accent-soft)" strokeWidth="1.5" />
        <line x1="120" y1="52" x2="140" y2="62" stroke="var(--accent-soft)" strokeWidth="1.5" />
        <line x1="60" y1="78" x2="80" y2="92" stroke="var(--accent-soft)" strokeWidth="1.5" />
        <line x1="120" y1="85" x2="140" y2="78" stroke="var(--accent-soft)" strokeWidth="1.5" />
      </svg>
      <div className="vq-commune-label">
        <span className="vq-big-label">原始公社时期</span>
        <p className="vq-sub">产品共享，不交换 → 抽象劳动不形成价值</p>
      </div>
    </div>
  );
}

function Step9() {
  return (
    <div className="vq-step9">
      <div className="vq-conclusion-box">
        <div className="vq-rule-short" />
        <span className="vq-conclusion-text">马克思主义劳动价值论</span>
        <div className="vq-rule-short" />
      </div>
    </div>
  );
}
