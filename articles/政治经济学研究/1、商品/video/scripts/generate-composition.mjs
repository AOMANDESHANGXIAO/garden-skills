import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const timings = JSON.parse(
  readFileSync(resolve(__dirname, "../step-timings.json"), "utf-8"),
);

const totalDuration = timings[timings.length - 1].endTime;
const crossfadeDuration = `${(0.4).toFixed(2)}s`;

// Build image clips
let imageClips = "";
let gsapEntrances = "";
let gsapExits = "";

for (const t of timings) {
  const stepId = `step-${String(t.globalStep).padStart(2, "0")}`;
  const start = t.startTime.toFixed(2);
  const dur = t.duration.toFixed(2);

  imageClips += `        <img
          id="${stepId}"
          class="clip step-img"
          src="screenshots/${stepId}.png"
          data-start="${start}"
          data-duration="${dur}"
          data-track-index="${t.globalStep + 2}"
          alt="Step ${t.globalStep}"
        />\n`;

  // Entrance: fade in at start
  gsapEntrances += `  tl.from("#${stepId}", { opacity: 0, duration: 0.4, ease: "power2.out" }, ${start});\n`;

  // Exit: fade out at end (only for non-final steps)
  if (t.globalStep < timings.length - 1) {
    const exitTime = t.endTime - 0.4;
    gsapExits += `  tl.to("#${stepId}", { opacity: 0, duration: 0.4, ease: "power2.in" }, ${exitTime.toFixed(2)});\n`;
  }
}

// Also generate SRT captions from the original SRT data
// We already have the captions in the step-timings, but for per-subtitle accuracy
// we should use individual SRT segments for captions
const srtRaw = readFileSync(resolve(__dirname, "../../逐字稿.md"), "utf-8");
const srtLines = srtRaw.trim().split("\n");
const captions = [];
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
        captions.push({ start, end, text: textLine });
      }
    }
    i += 3;
  } else {
    i++;
  }
}

// Caption HTML elements
let captionElements = "";
for (let c = 0; c < captions.length; c++) {
  const cap = captions[c];
  captionElements += `        <div
          id="cap-${c}"
          class="clip caption"
          data-start="${cap.start.toFixed(2)}"
          data-duration="${(cap.end - cap.start).toFixed(2)}"
          data-track-index="100"
        >${cap.text}</div>\n`;
}

// Caption GSAP animations
let captionGSAP = "";
for (let c = 0; c < captions.length; c++) {
  const cap = captions[c];
  captionGSAP += `  tl.from("#cap-${c}", { opacity: 0, y: 12, duration: 0.2, ease: "power2.out" }, ${cap.start.toFixed(2)});\n`;
  captionGSAP += `  tl.to("#cap-${c}", { opacity: 0, duration: 0.15, ease: "power2.in" }, ${(cap.end - 0.15).toFixed(2)});\n`;
}

const html = `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html,
      body {
        margin: 0;
        width: 1920px;
        height: 1080px;
        overflow: hidden;
        background: #0d0d0d;
      }
      .step-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 1920px;
        height: 1080px;
        object-fit: cover;
      }
      .caption {
        position: absolute;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        font-family: "PingFang SC", "Microsoft YaHei", sans-serif;
        font-size: 36px;
        font-weight: 600;
        color: #ffffff;
        text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8), 0 0 2px rgba(0, 0, 0, 0.9);
        text-align: center;
        max-width: 1600px;
        white-space: nowrap;
        z-index: 1000;
        letter-spacing: 2px;
      }
    </style>
  </head>
  <body>
    <div
      id="root"
      data-composition-id="main"
      data-start="0"
      data-duration="${totalDuration.toFixed(2)}"
      data-width="1920"
      data-height="1080"
    >
${imageClips}
      <!-- Audio track -->
      <audio
        id="narration-audio"
        class="clip"
        src="audio/narration.mp3"
        data-start="0"
        data-duration="${totalDuration.toFixed(2)}"
        data-track-index="0"
        data-volume="1"
      ></audio>

${captionElements}
    </div>

    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });

      // Image entrances
${gsapEntrances}
      // Image exits
${gsapExits}
      // Caption animations
${captionGSAP}

      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`;

const outPath = resolve(__dirname, "../index.html");
writeFileSync(outPath, html);
console.log(`Generated index.html with ${timings.length} scenes + ${captions.length} captions`);
console.log(`Total duration: ${totalDuration.toFixed(1)}s`);
