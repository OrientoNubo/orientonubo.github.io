/* build-cv-pdf.mjs — run AFTER eleventy. Renders the /cv-print/ page to a PDF
 * via headless Chromium and writes it to _site/assets/CV-SIYU.pdf (overwriting
 * the passthrough-copied fallback). The print page is styled to match the
 * reference CV (single page, navy accents, serif). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE = path.join(__dirname, "../_site");
const INPUT = path.join(SITE, "cv-print/index.html");
const OUTPUT = path.join(SITE, "assets/CV-SIYU.pdf");

(async () => {
  if (!fs.existsSync(INPUT)) {
    console.error(`[build-cv-pdf] missing ${INPUT} — run \`eleventy\` first`);
    process.exit(1);
  }
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.goto("file://" + INPUT, { waitUntil: "networkidle0" });
    fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
    await page.pdf({
      path: OUTPUT,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });
    console.log(
      `[build-cv-pdf] wrote ${path.relative(SITE, OUTPUT)} (${(fs.statSync(OUTPUT).size / 1024).toFixed(0)} KB)`
    );
  } finally {
    await browser.close();
  }
})();
