import type { ChapterStepProps } from "../../registry/types";
import "./LaborDuality.css";

export default function LaborDuality({ step }: ChapterStepProps) {
  return (
    <div className="ld-scene">
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
    <div className="ld-step0">
      <h2 className="ld-title">劳动的特点</h2>
      <div className="ld-rule" />
      <p className="ld-sub">为什么说商品凝结了无差别的劳动？</p>
    </div>
  );
}

function Step1() {
  return (
    <div className="ld-step1">
      <div className="ld-double">
        <div className="ld-card">
          <div className="ld-card-steps">
            <span>播种</span><span>→</span><span>施肥</span><span>→</span><span>除虫</span><span>→</span><span>收获</span>
          </div>
          <span className="ld-card-label">种大米</span>
        </div>
        <div className="ld-card">
          <div className="ld-card-steps">
            <span>纺纱</span><span>→</span><span>织造</span><span>→</span><span>染色</span>
          </div>
          <span className="ld-card-label">织布</span>
        </div>
      </div>
      <p className="ld-cap">劳动方式千差万别</p>
    </div>
  );
}

function Step2() {
  return (
    <div className="ld-step2">
      <div className="ld-flow">
        <div className="ld-flow-box">
          <span className="ld-flow-label">具体劳动</span>
          <span className="ld-flow-arrow">→</span>
          <span className="ld-flow-label">使用价值</span>
        </div>
      </div>
      <p className="ld-cap">不同的具体劳动 → 不同的使用价值</p>
    </div>
  );
}

function Step3() {
  return (
    <div className="ld-step3">
      <div className="ld-abstract">
        <div className="ld-card ld-card-dim">
          <span>具体操作</span>
        </div>
        <span className="ld-transform-arrow">→</span>
        <div className="ld-card ld-card-lit">
          <span>脑力 + 体力消耗</span>
        </div>
      </div>
      <p className="ld-cap">抛开形式，所有劳动都是脑力和体力的消耗</p>
    </div>
  );
}

function Step4() {
  return (
    <div className="ld-step4">
      <div className="ld-equal-sign">
        <span className="ld-big-text">抽象层面：没有本质区别</span>
      </div>
      <div className="ld-rule-wide" />
      <p className="ld-cap">种大米 = 织布 = 写代码（都是脑力+体力）</p>
    </div>
  );
}

function Step5() {
  return (
    <div className="ld-step5">
      <span className="ld-question">复杂劳动 = 简单劳动 ？</span>
    </div>
  );
}

function Step6() {
  return (
    <div className="ld-step6">
      <div className="ld-compare-row">
        <div className="ld-type-box ld-type-simple">
          <span className="ld-type-title">简单劳动</span>
          <span className="ld-type-desc">无需训练就能做到</span>
        </div>
        <span className="ld-rel">+</span>
        <div className="ld-type-box ld-type-complex">
          <span className="ld-type-title">复杂劳动</span>
          <span className="ld-type-desc">简单劳动的排列组合</span>
        </div>
      </div>
    </div>
  );
}

function Step7() {
  return (
    <div className="ld-step7">
      <div className="ld-decompose">
        <span className="ld-decomp-big">写程序</span>
        <span className="ld-decomp-arrow">=</span>
        <div className="ld-decomp-parts">
          <span>判断</span>
          <span>+</span>
          <span>循环</span>
          <span>+</span>
          <span>变量</span>
        </div>
      </div>
      <p className="ld-cap">复杂程序 → 简单操作的组合</p>
    </div>
  );
}

function Step8() {
  return (
    <div className="ld-step8">
      <div className="ld-chain">
        <span>复杂劳动</span>
        <span className="ld-ch-arrow">=</span>
        <span>简单劳动组合</span>
        <span className="ld-ch-arrow">=</span>
        <span>脑力+体力消耗</span>
      </div>
    </div>
  );
}

function Step9() {
  return (
    <div className="ld-step9">
      <h2 className="ld-summary-title">劳动二重性</h2>
      <div className="ld-summary-grid">
        <div className="ld-sum-item">
          <span className="ld-sum-label">具体劳动</span>
          <span className="ld-sum-arrow">→</span>
          <span className="ld-sum-result">使用价值</span>
        </div>
        <div className="ld-sum-item">
          <span className="ld-sum-label">抽象劳动</span>
          <span className="ld-sum-arrow">→</span>
          <span className="ld-sum-result">价值</span>
        </div>
        <div className="ld-sum-item ld-sum-sub">
          <span className="ld-sum-label">价值的表现形式</span>
          <span className="ld-sum-arrow">→</span>
          <span className="ld-sum-result">交换价值</span>
        </div>
      </div>
    </div>
  );
}
