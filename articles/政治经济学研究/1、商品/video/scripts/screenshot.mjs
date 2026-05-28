import { chromium } from "playwright";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotDir = resolve(__dirname, "../screenshots");
const url = "http://localhost:5174";
const totalSteps = 60;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForTimeout(500);

// Reset to beginning
await page.keyboard.press("Home");
await page.waitForTimeout(300);

for (let i = 0; i < totalSteps; i++) {
  const filePath = resolve(screenshotDir, `step-${String(i).padStart(2, "0")}.png`);
  await page.screenshot({ path: filePath, fullPage: false });
  console.log(`Screenshot ${i + 1}/${totalSteps}: step-${String(i).padStart(2, "0")}.png`);

  if (i < totalSteps - 1) {
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(200);
  }
}

await browser.close();
console.log("Done! All 60 screenshots captured.");
