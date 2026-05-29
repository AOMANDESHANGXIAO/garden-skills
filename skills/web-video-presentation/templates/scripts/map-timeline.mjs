/**
 * Parses a transcript in SRT format (逐字稿.md) and maps each chapter/step
 * narration to its time range. Outputs src/timeline.ts.
 *
 * ## Usage
 *
 * 1. Place your SRT-style transcript at `<article-dir>/逐字稿.md`:
 *
 *    1
 *    00:00:00,000 --> 00:00:02,212
 *    你有没有想过一个问题
 *
 *    2
 *    00:00:02,212 --> 00:00:06,300
 *    一瓶矿泉水为什么能和一本书交换
 *
 * 2. Update the `chapters` array below to match your project's chapters.
 * 3. Run: node scripts/map-timeline.mjs
 * 4. The output `src/timeline.ts` is used by `useTimelinePlayback` hook.
 *
 * ## Configuration
 *
 * Edit the two path variables below for your project:
 * - `TRANSCRIPT_PATH`: relative path from presentation/ to your SRT file
 * - `CHAPTERS`: array matching your `src/registry/chapters.ts` structure
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// --- CONFIGURE THESE FOR YOUR PROJECT ---
const TRANSCRIPT_PATH = resolve(root, "../逐字稿.md");

const CHAPTERS = [
  { id: "01-example", title: "示例章节", file: "01-example/narrations.ts" },
  // Add more chapters here...
];
// --- END CONFIGURATION ---

// --- Parse transcript (SRT format, line-by-line) ---
const raw = readFileSync(TRANSCRIPT_PATH, "utf-8")
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

// --- Normalize text for fuzzy matching ---
function normalize(text) {
  return text
    .replace(/[，。、；：？！""''《》（）【】\s,.;:!?#\-—…～　\/\\]/g, "")
    .toLowerCase();
}

// --- Parse narrations from each chapter file ---
const allSteps = [];
for (const ch of CHAPTERS) {
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
  allSteps.push({ chapter: ch, steps });
}

// --- Map each step to transcript segments ---
const segNorm = segments.map((s) => normalize(s.text));
const timeline = [];
let segPtr = 0;

function getPrevEnd(chTimeline, timeline) {
  if (chTimeline.length > 0) return chTimeline[chTimeline.length - 1].endMs;
  for (let t = timeline.length - 1; t >= 0; t--) {
    if (timeline[t].length > 0) return timeline[t][timeline[t].length - 1].endMs;
  }
  return 0;
}

for (const { chapter, steps } of allSteps) {
  const chTimeline = [];
  console.log(`\n--- ${chapter.title} (${steps.length} steps) ---`);

  for (let si = 0; si < steps.length; si++) {
    const stepNorm = normalize(steps[si]);

    if (!stepNorm || segPtr >= segments.length) {
      const prevEnd = getPrevEnd(chTimeline, timeline);
      const est = Math.max(2000, (steps[si] || "").length * 250);
      chTimeline.push({ startMs: prevEnd, endMs: prevEnd + est });
      console.log(`  Step ${si}: [FALLBACK] ${prevEnd}ms→${prevEnd + est}ms`);
      continue;
    }

    let acc = "";
    let firstIdx = -1;
    let found = false;

    for (let j = segPtr; j < segments.length; j++) {
      const sn = segNorm[j];
      acc += sn;

      if (firstIdx === -1) {
        if (
          stepNorm.includes(sn) ||
          sn.includes(stepNorm.slice(0, Math.max(2, sn.length - 1)))
        ) {
          firstIdx = j;
        } else {
          acc = "";
          continue;
        }
      }

      if (acc.includes(stepNorm)) {
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

      if (acc.length >= stepNorm.length * 0.75) {
        let maxOverlap = 0;
        const shorter = acc.length < stepNorm.length ? acc : stepNorm;
        const longer = acc.length < stepNorm.length ? stepNorm : acc;
        for (let len = 1; len <= shorter.length; len++) {
          if (shorter.slice(0, len) === longer.slice(0, len))
            maxOverlap = Math.max(maxOverlap, len);
          if (shorter.slice(-len) === longer.slice(-len))
            maxOverlap = Math.max(maxOverlap, len);
        }
        if (maxOverlap >= stepNorm.length * 0.75) {
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
        `  Step ${si}: [FALLBACK] ${prevEnd}ms→${prevEnd + est}ms — review manually`,
      );
    }
  }
  timeline.push(chTimeline);
}

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
 * Auto-generated timeline from transcript.
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

const body = JSON.stringify(timeline, null, 2).replace(/"(\w+)":/g, "$1:");

writeFileSync(outPath, header + body + ";\n", "utf-8");
console.log(`\nWritten: ${outPath}`);
console.log(
  `\nNext: wire up useTimelinePlayback in App.tsx (see references/TIMELINE-PLAYBACK.md)`,
);
