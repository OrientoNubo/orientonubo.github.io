/* build-cv-pdf.mjs — run AFTER eleventy. Renders the CV print pages to PDFs via
 * headless Chromium and writes them to _site/assets/. Generates both an English
 * (CV-SIYU-EN.pdf) and a Traditional-Chinese (CV-SIYU-ZH.pdf) version. The print
 * pages are styled to match the reference CV (navy accents, serif). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.join(__dirname, "../_site");

const JOBS = [
  { input: "cv-print/index.html",    output: "assets/CV-SIYU-EN.pdf", label: "EN" },
  { input: "cv-print-zh/index.html", output: "assets/CV-SIYU-ZH.pdf", label: "ZH" },
];

(async () => {
  const missing = JOBS.filter((j) => !fs.existsSync(path.join(SITE, j.input)));
  if (missing.length) {
    console.error(
      `[build-cv-pdf] missing ${missing.map((m) => m.input).join(", ")} — run \`eleventy\` first`
    );
    process.exit(1);
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    for (const job of JOBS) {
      const input = path.join(SITE, job.input);
      const output = path.join(SITE, job.output);
      const page = await browser.newPage();
      await page.goto("file://" + input, { waitUntil: "networkidle0" });
      fs.mkdirSync(path.dirname(output), { recursive: true });
      await page.pdf({
        path: output,
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
      });
      await page.close();
      console.log(
        `[build-cv-pdf] wrote ${path.relative(SITE, output)} [${job.label}] (${(
          fs.statSync(output).size / 1024
        ).toFixed(0)} KB)`
      );
    }
  } finally {
    await browser.close();
  }
})();
