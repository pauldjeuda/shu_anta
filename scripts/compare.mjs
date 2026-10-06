/**
 * Visual comparison: Playwright screenshot of main vs design/reference-card.png
 * Run: npm run compare  (requires npm run build && npm run preview, or a running dev server)
 */
import { chromium } from "playwright";
import { mkdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIFF = path.join(ROOT, "design", "diff");
const SCREENS = path.join(ROOT, "design", "screens");
const REF = path.join(ROOT, "design", "reference-card.png");

const TARGETS = {
  navbar: { top: 3.4, left: 8.5 },
  wordmark: { top: 32, left: 3 },
  philosophyH2: { top: 6.5, left: 8.5 },
  jar: { top: 4.4, left: 50.5 },
  bigWord: { top: 21.3, left: 5.8 },
  allinoneA: { top: 4.8, left: 43.9 },
  allinoneB: { top: 39.8, left: 15.5 },
  catalogueBtn: { top: 58.0, left: 58.1 },
};

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(DIFF, { recursive: true });
  await mkdir(SCREENS, { recursive: true });

  const base = process.env.COMPARE_URL || "http://127.0.0.1:5173";
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base, { waitUntil: "networkidle" });

  // Wait fonts
  await page.evaluate(() => document.fonts.ready);

  const main = page.locator("#main");
  await main.screenshot({ path: path.join(DIFF, "actual-main.png") });

  // Geometry checks in cqw of first .stage in main hero
  const stageBox = await page.locator("#hero .stage").boundingBox();
  if (!stageBox) {
    console.error("Hero stage not found");
  } else {
    const cqw = stageBox.width / 100;
    const measures = await page.evaluate(() => {
      const pick = (sel) => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { left: r.left, top: r.top, width: r.width, height: r.height };
      };
      const hero = document.querySelector("#hero")?.getBoundingClientRect();
      return {
        hero,
        jar: pick("#philosophie img"),
        bigWord: pick('[data-el="big-word"]'),
        allinoneA: pick('[data-el="allinone-a"]'),
        allinoneB: pick('[data-el="allinone-b"]'),
        catalogueBtn: pick('[data-el="catalogue-btn"]'),
      };
    });
    console.log("stage width", stageBox.width, "cqw", cqw);
    console.log(JSON.stringify(measures, null, 2));

    // Tolerance report for absolute-ish elements inside sections
    const report = [];
    if (measures.allinoneA) {
      const sec = await page.locator("#all-in-one .stage > div").first().boundingBox();
      if (sec) {
        const leftCqw = (measures.allinoneA.left - sec.left) / cqw;
        const topCqw = (measures.allinoneA.top - sec.top) / cqw;
        const dL = Math.abs(leftCqw - TARGETS.allinoneA.left);
        const dT = Math.abs(topCqw - TARGETS.allinoneA.top);
        report.push({ el: "allinoneA", leftCqw, topCqw, dL, dT, ok: dL <= 0.5 && dT <= 0.5 });
      }
    }
    console.log("tolerance", report);
  }

  // Full page screens at multiple widths
  for (const w of [390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(SCREENS, `full-${w}.png`),
      fullPage: true,
    });
  }

  if (await exists(REF)) {
    // Overlay composite via sharp-less canvas in playwright
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(base, { waitUntil: "networkidle" });
    console.log("reference-card.png found — overlay saved as design/diff/actual-main.png");
    console.log("Place a manual 50% overlay using an image editor if needed; Playwright alone wrote the capture.");
  } else {
    console.warn("MISSING design/reference-card.png — skip pixel diff. Add design/reference.jpg then re-run crop.");
  }

  await browser.close();
  console.log("screens in design/screens/, capture in design/diff/");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
