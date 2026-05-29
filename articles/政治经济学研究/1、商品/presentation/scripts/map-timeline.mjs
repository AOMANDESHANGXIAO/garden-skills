/**
 * Parses 逐字稿.md (SRT-style timestamps) and maps each chapter/step
 * narration to its time range. Outputs timeline.ts.
 *
 * Usage: node scripts/map-timeline.mjs
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// --- Parse 逐字稿 (line-by-line, robust against line endings) ---
const raw = readFileSync(resolve(root, "../逐字稿.md"), "utf-8")
  .replace(/\r\n/g, "\n")
  .replace(/﻿/g, "");

const lines = raw.split("\n");

/** @type {{startMs:number, endMs:number, text:string}[]} */
const segments = [];
let i = 0;

while (i < lines.length) {
  if (lines[i].trim() === "") { i++; continue; }
  const segNum = parseInt(lines[i], 10);
  if (isNaN(segNum)) { i++; continue; }
  i++;
  if (i >= lines.length) break;
  const tsMatch = lines[i].match(
    /(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/,
  );
  if (!tsMatch) { i++; continue; }
  const startMs =
    ((+tsMatch[1] * 60 + +tsMatch[2]) * 60 + +tsMatch[3]) * 1000 + +tsMatch[4];
  const endMs =
    ((+tsMatch[5] * 60 + +tsMatch[6]) * 60 + +tsMatch[7]) * 1000 + +tsMatch[8];
  i++;
  const textParts = [];
  while (i < lines.length && lines[i].trim() !== "") {
    if (/^\d+$/.test(lines[i].trim())) break;
    textParts.push(lines[i].trim());
    i++;
  }
  const text = textParts.join("").replace(/\s+/g, "");
  segments.push({ startMs, endMs, text });
}

console.log(`Parsed ${segments.length} transcript segments`);

// --- Load all narrations ---
const chapters = [
  { id: "coldopen", title: "开场钩子", file: "01-coldopen/narrations.ts" },
  { id: "use-value", title: "使用价值及其历史性", file: "02-use-value/narrations.ts" },
  { id: "why-exchange", title: "为什么能交换", file: "03-why-exchange/narrations.ts" },
  { id: "labor-duality", title: "劳动二重性", file: "04-labor-duality/narrations.ts" },
  { id: "value-quantity", title: "价值如何量化", file: "05-value-quantity/narrations.ts" },
  { id: "value-contradiction", title: "使用价值与价值的矛盾", file: "06-value-contradiction/narrations.ts" },
  { id: "capitalist-crisis", title: "从内部矛盾到生产过剩危机", file: "07-capitalist-crisis/narrations.ts" },
  { id: "conclusion", title: "商品的本质：社会关系", file: "08-conclusion/narrations.ts" },
];

function normalize(text) {
  return text
    .replace(/[，。、；：？！""''《》（）【】\s,.;:!?#\-—…～　\/\\]/g, "")
    .toLowerCase();
}

// Parse narrations
const allNarrationSteps = [];
for (const ch of chapters) {
  const narPath = resolve(root, "src/chapters", ch.file);
  const narContent = readFileSync(narPath, "utf-8");
  const arrMatch = narContent.match(
    /export\s+const\s+narrations\s*:\s*string\[\]\s*=\s*\[([\s\S]*?)\];/,
  );
  if (!arrMatch) {
    console.error(`Could not parse narrations from ${ch.file}`);
    continue;
  }
  const strRe = /["'`]([^"'`]*?)["'`]\s*,?\s*(?:\/\/.*)?$/gm;
  const steps = [];
  let sm;
  while ((sm = strRe.exec(arrMatch[1])) !== null) {
    steps.push(sm[1]);
  }
  allNarrationSteps.push({ chapter: ch, steps });
}

/**
 * Robust matching: for each narration step, accumulate transcript segments
 * until the accumulated normalized text CONTAINS the normalized step text.
 *
 * Since the step text may add punctuation that's stripped during normalization,
 * after normalization they should be identical or one contained in the other.
 */
function mapAllSteps(allSteps, segments) {
  const segNorm = segments.map((s) => normalize(s.text));
  const timeline = [];
  let segPtr = 0;

  for (const { chapter, steps } of allSteps) {
    const chTimeline = [];
    console.log(`\n--- ${chapter.title} (${steps.length} steps) ---`);

    for (let si = 0; si < steps.length; si++) {
      const stepNorm = normalize(steps[si]);

      if (!stepNorm || segPtr >= segments.length) {
        const prevEnd = getPrevEnd(chTimeline, timeline);
        const est = Math.max(2000, (steps[si] || "").length * 250);
        chTimeline.push({ startMs: prevEnd, endMs: prevEnd + est });
        console.log(`  Step ${si}: [FALLBACK-EMPTY] ${prevEnd}ms→${prevEnd + est}ms`);
        continue;
      }

      // Accumulate segments until the combined normalized text covers stepNorm
      let acc = "";
      let firstIdx = -1;
      let found = false;

      for (let j = segPtr; j < segments.length; j++) {
        const sn = segNorm[j];
        acc += sn;

        if (firstIdx === -1) {
          // Check if this segment starts matching
          if (
            stepNorm.includes(sn) ||
            sn.includes(stepNorm.slice(0, Math.max(2, sn.length - 1)))
          ) {
            firstIdx = j;
          } else {
            // This segment doesn't match at all, skip
            acc = ""; // reset acc (remove the non-matching segment)
            continue;
          }
        }

        // Check if accumulated text now covers the step
        if (acc.includes(stepNorm)) {
          // Exact match! The step text is fully contained in accumulated segments
          chTimeline.push({
            startMs: segments[firstIdx].startMs,
            endMs: segments[j].endMs,
          });
          console.log(
            `  Step ${si}: ${(segments[firstIdx].startMs / 1000).toFixed(1)}s → ${(segments[j].endMs / 1000).toFixed(1)}s (segs ${firstIdx + 1}-${j + 1})`,
          );
          segPtr = j + 1;
          found = true;
          break;
        }

        // Heuristic: if acc is long enough and contains most of stepNorm
        if (acc.length >= stepNorm.length * 0.75) {
          // Check if stepNorm is mostly contained in acc or vice versa
          const overlap = longestCommonSubstring(acc, stepNorm);
          if (overlap >= stepNorm.length * 0.75) {
            chTimeline.push({
              startMs: segments[firstIdx].startMs,
              endMs: segments[j].endMs,
            });
            console.log(
              `  Step ${si}: ${(segments[firstIdx].startMs / 1000).toFixed(1)}s → ${(segments[j].endMs / 1000).toFixed(1)}s (segs ${firstIdx + 1}-${j + 1}) [heuristic]`,
            );
            segPtr = j + 1;
            found = true;
            break;
          }
        }
      }

      if (!found) {
        const prevEnd = getPrevEnd(chTimeline, timeline);
        const est = Math.max(2000, (steps[si] || "").length * 250);
        chTimeline.push({ startMs: prevEnd, endMs: prevEnd + est });
        console.log(
          `  Step ${si}: [FALLBACK] ${prevEnd}ms→${prevEnd + est}ms (text: "${steps[si].slice(0, 40)}...")`,
        );
        // Don't advance segPtr on fallback
      }
    }
    timeline.push(chTimeline);
  }
  return timeline;
}

function getPrevEnd(chTimeline, timeline) {
  if (chTimeline.length > 0) return chTimeline[chTimeline.length - 1].endMs;
  for (let t = timeline.length - 1; t >= 0; t--) {
    if (timeline[t].length > 0) return timeline[t][timeline[t].length - 1].endMs;
  }
  return 0;
}

function longestCommonSubstring(a, b) {
  // Simple sliding window: find the longest common prefix/suffix
  let maxLen = 0;
  // Check if one is a prefix/suffix of the other
  for (let len = 1; len <= Math.min(a.length, b.length); len++) {
    if (a.slice(0, len) === b.slice(0, len)) maxLen = Math.max(maxLen, len);
    if (a.slice(-len) === b.slice(-len)) maxLen = Math.max(maxLen, len);
  }
  return maxLen;
}

const timeline = mapAllSteps(allNarrationSteps, segments);

// --- Output ---
const lastCh = timeline[timeline.length - 1];
const totalDuration =
  lastCh && lastCh.length > 0 ? lastCh[lastCh.length - 1].endMs : 0;
const totalSteps = timeline.reduce((s, c) => s + c.length, 0);

console.log(`\n=== Summary ===`);
console.log(`Total chapters: ${timeline.length}`);
console.log(`Total steps: ${totalSteps}`);
console.log(`Total duration: ${(totalDuration / 1000).toFixed(1)}s`);

const outPath = resolve(root, "src/timeline.ts");
const header = `/**
 * Auto-generated timeline from 逐字稿.md.
 * Maps each (chapterIndex, stepIndex) → { startMs, endMs } in milliseconds
 * from the start of the presentation.
 *
 * Generated by: node scripts/map-timeline.mjs
 */

export interface StepTime {
  startMs: number;
  endMs: number;
}

/** 2D array: TIMELINE[chapterIndex][stepIndex] = { startMs, endMs } */
export const TIMELINE: StepTime[][] = `;

const body = JSON.stringify(timeline, null, 2)
  .replace(/"(\w+)":/g, "$1:");

writeFileSync(outPath, header + body + ";\n", "utf-8");
console.log(`\nWritten: ${outPath}`);
