import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Parse SRT file
const srtRaw = readFileSync(resolve(__dirname, "../../逐字稿.md"), "utf-8");
const srtLines = srtRaw.trim().split("\n");
const segments = [];

let i = 0;
while (i < srtLines.length) {
  const line = srtLines[i].trim();
  if (/^\d+$/.test(line)) {
    const timeLine = srtLines[i + 1]?.trim();
    const textLine = srtLines[i + 2]?.trim();
    if (timeLine && textLine) {
      const match = timeLine.match(
        /(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/,
      );
      if (match) {
        const start =
          +match[1] * 3600 + +match[2] * 60 + +match[3] + +match[4] / 1000;
        const end =
          +match[5] * 3600 + +match[6] * 60 + +match[7] + +match[8] / 1000;
        segments.push({ index: +line, start, end, text: textLine });
      }
    }
    i += 3;
  } else {
    i++;
  }
}

// Narrations from each chapter
const narrations = {
  coldopen: [
    "你有没有想过一个问题：一瓶矿泉水，为什么能和一本书交换？",
    "今天我们来分析商品。这个你每天都会接触到的东西，藏着政治经济学的核心秘密。",
  ],
  "use-value": [
    "首先，一个东西要能叫商品，必须有用。",
    "你饿了，米饭有用。你渴了，水有用。这叫使用价值。",
    "没有使用价值的东西，就不是商品。这是第一个条件。",
    "但有意思的是，使用价值是会变的。",
    "古代人看到石油：这什么怪液体？",
    "到了大工业时代，人类才发现石油是工业的血液。",
    "使用价值有历史性。今天没用的东西，以后可能大用。今天有用的，以后也可能失去使用价值。",
  ],
  "why-exchange": [
    "但光有使用价值还不够。要成为商品，必须参与交换。",
    "古代自耕农，种地自己吃自己用。他生产的只是劳动产品，不是商品。",
    "商品是为别人生产的。那么问题来了：20斤大米为什么能和10尺布交换？",
    "是因为使用价值相同吗？显然不是。",
    "大米填肚子，布遮身体，满足的需求完全不同。这不是它们能交换的原因。",
    "各商品内部，一定有一个本质上相同的东西。",
    "这个东西就是：它们都是人类劳动的产品。",
    "商品能交换，是因为里面凝结了人类无差别的劳动。",
  ],
  "labor-duality": [
    "要理解这句话，我们来分析一下人类劳动的特点。",
    "劳动方式千差万别。种大米要播种、施肥、除虫、收获。织布是完全不同的操作。",
    "不同的具体劳动，生产不同的使用价值。",
    "但抛开具体操作形式，从抽象层面看：所有劳动都是人类脑力和体力的消耗。",
    "在这个抽象层面上，各种劳动没有本质区别。",
    "有人会问了：复杂劳动和简单劳动一样吗？",
    "简单劳动，是不用训练就能干的事。复杂劳动呢，是简单劳动的排列组合。",
    "比如写程序很复杂，但拆开看，就是判断、循环、变量这些简单操作的组合。",
    "复杂劳动可以还原为简单劳动，进而还原为脑力和体力的消耗。",
    "总结一下：具体劳动生产使用价值，抽象劳动凝结为价值，价值表现为交换价值。",
  ],
  "value-quantity": [
    "下一个问题：商品为什么能按一定比例交换？x斤大米 = y尺布。",
    "能按比例交换，说明无差别劳动可以量化为一定的量。",
    "量化的尺度是什么？时间。没有劳动不消耗时间。",
    "所以用社会必要劳动时间来衡量商品的价值。",
    "马克思说：社会必要劳动时间，是用社会现有的标准生产条件，用社会平均的劳动熟练程度和强度，生产一个使用价值所必要的劳动时间。",
    "如果全社会改进了生产资料，效率上升了，每件商品的价值就下降。",
    "反过来，自然灾害让效率下降，商品价值就上升。",
    "但注意：抽象劳动并非在任何时候都形成价值。",
    "只有在商品生产条件下才是。原始公社时期，产品共享不交换，抽象劳动就不形成价值。",
    "以上是马克思主义劳动价值论的基本观点。",
  ],
  "value-contradiction": [
    "现在来看使用价值和价值的关系。",
    "它们首先是统一的。使用价值是价值的物质承担者。",
    "一个没用的东西，花了再多劳动也是白费。",
    "有意思的是：每个商品的价值，必须通过其他商品的使用价值才能表现出来。",
    "就像人一样，每个人必须通过别人才认识自己。",
    "但使用价值和价值又是矛盾的。",
    "生产者生产商品，不是为了使用价值，而是为了价值。",
    "他生产使用价值，只是为了换到价值。",
    "所以一件商品不能同时被一个人取得使用价值又取得价值。",
    "要么消费它，要么卖掉它。这是商品内部使用价值和价值的矛盾。",
  ],
  "capitalist-crisis": [
    "这个内部矛盾，就是资本主义社会的基本矛盾。",
    "资本家控制生产资料，追求的是价值，不是使用价值。",
    "社会生产的方向是赚更多钱，不是满足人们的需要。这是盲目性和逐利性。",
    "结果呢？生产出来的商品根本不能被全部消费。",
    "人们需要使用价值，但社会以价值为方向生产。资本家盲目扩大再生产。",
    "商品卖不掉，价值实现不了，资本周转就断了。",
    "裁员，没工资，更没钱消费。这就是生产过剩危机。",
    "加工资、堆福利，也许能缓解。但只要生产以盲目追逐价值为出发点，矛盾就无解。",
    "资本主义生产方式的矛盾，无法通过自身改良解决。",
  ],
  conclusion: [
    "从以上分析可以看出：人们在交换中交换的不是物本身，而是包含在物中的劳动。",
    "商品不是物，而是在物的外壳下，生产者之间的一定的社会关系。",
    "人们互相交换商品，实际上是互相交换各自的劳动。",
    "这就是商品真正隐藏的秘密。",
  ],
};

// Chapter IDs in order
const chapterOrder = [
  "coldopen",
  "use-value",
  "why-exchange",
  "labor-duality",
  "value-quantity",
  "value-contradiction",
  "capitalist-crisis",
  "conclusion",
];

// For each step, find the matching SRT segments by fuzzy text matching
function normalize(text) {
  return text
    .replace(/[，。：？、！；""''（）《》\s]/g, "")
    .replace(/x/g, "X")
    .replace(/y/g, "Y");
}

function longestCommonSubstring(a, b) {
  const aLen = a.length;
  const bLen = b.length;
  let maxLen = 0;
  let endA = 0;
  const dp = Array.from({ length: aLen + 1 }, () => new Array(bLen + 1).fill(0));
  for (let i = 1; i <= aLen; i++) {
    for (let j = 1; j <= bLen; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > maxLen) {
          maxLen = dp[i][j];
          endA = i;
        }
      }
    }
  }
  return { len: maxLen, substr: a.substring(endA - maxLen, endA) };
}

const stepTimings = [];
let globalStepIndex = 0;
let combinedText = "";

for (const chapterId of chapterOrder) {
  const steps = narrations[chapterId];
  for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
    const stepText = steps[stepIdx];
    const stepNorm = normalize(stepText);

    // Find matching SRT segments using LCS
    let bestStartSeg = 0;
    let bestEndSeg = 0;
    let bestScore = 0;

    // Sliding window over SRT segments
    for (let s = 0; s < segments.length; s++) {
      let combined = "";
      for (let e = s; e < segments.length; e++) {
        combined += normalize(segments[e].text);
        const { len } = longestCommonSubstring(stepNorm, combined);
        // Score based on coverage
        const coverage = len / Math.max(stepNorm.length, 1);
        const efficiency = len / Math.max(combined.length, 1);
        const score = coverage * 0.7 + efficiency * 0.3;
        if (score > bestScore) {
          bestScore = score;
          bestStartSeg = s;
          bestEndSeg = e;
        }
        // Stop if combined text is much longer than step text
        if (combined.length > stepNorm.length * 1.5) break;
      }
    }

    const startTime = segments[bestStartSeg].start;
    const endTime = segments[bestEndSeg].end;
    const duration = endTime - startTime;

    stepTimings.push({
      globalStep: globalStepIndex,
      chapterId,
      stepIdx,
      stepText,
      startTime,
      endTime,
      duration,
      srtStart: bestStartSeg,
      srtEnd: bestEndSeg,
      srtTexts: segments
        .slice(bestStartSeg, bestEndSeg + 1)
        .map((s) => s.text),
    });

    combinedText += stepText + "\n\n";
    globalStepIndex++;
  }
}

// Write output
const timingPath = resolve(__dirname, "../step-timings.json");
writeFileSync(timingPath, JSON.stringify(stepTimings, null, 2));
console.log(`Wrote ${stepTimings.length} step timings to step-timings.json`);

const textPath = resolve(__dirname, "../narration-full.txt");
writeFileSync(textPath, combinedText.trim());
console.log(`Wrote combined narration to narration-full.txt`);

// Print summary
console.log("\nStep → SRT mapping:");
for (const t of stepTimings) {
  console.log(
    `  Ch${chapterOrder.indexOf(t.chapterId) + 1} Step${t.stepIdx}: ` +
    `${t.startTime.toFixed(1)}s → ${t.endTime.toFixed(1)}s ` +
    `(dur=${t.duration.toFixed(1)}s) [SRT ${t.srtStart + 1}-${t.srtEnd + 1}]`,
  );
}
