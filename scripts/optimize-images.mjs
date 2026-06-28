/* optimize-images.mjs — run AFTER eleventy. Downscales/recompresses large
 * raster images in _site/assets IN PLACE, so URLs are unchanged. Originals in
 * content/assets/ are never touched. Only rewrites a file if it gets smaller. */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.join(__dirname, "../_site/assets");
const MAX_W = 1600;                 // cap longest displayed width
const THRESHOLD = 600 * 1024;       // only touch files above 600 KB

function walk(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const fp = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(fp));
    else out.push(fp);
  }
  return out;
}

const isRaster = (f) => /\.(png|jpe?g)$/i.test(f);

(async () => {
  if (!fs.existsSync(ASSETS)) {
    console.log("[optimize-images] no _site/assets, skipping");
    return;
  }
  const files = walk(ASSETS).filter(isRaster);
  let saved = 0;
  for (const f of files) {
    const before = fs.statSync(f).size;
    if (before < THRESHOLD) continue;
    try {
      const img = sharp(f, { failOn: "none" }).rotate();
      const meta = await img.metadata();
      let pipe = img;
      if (meta.width && meta.width > MAX_W) pipe = pipe.resize({ width: MAX_W });
      const ext = path.extname(f).toLowerCase();
      const buf =
        ext === ".png"
          ? await pipe.png({ compressionLevel: 9, palette: true, quality: 80 }).toBuffer()
          : await pipe.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
      if (buf.length < before) {
        fs.writeFileSync(f, buf);
        saved += before - buf.length;
        console.log(
          `[optimize-images] ${path.basename(f)}  ${(before / 1024).toFixed(0)}KB → ${(buf.length / 1024).toFixed(0)}KB`
        );
      }
    } catch (e) {
      console.warn(`[optimize-images] skip ${path.basename(f)}: ${e.message}`);
    }
  }
  console.log(`[optimize-images] done — saved ${(saved / 1024 / 1024).toFixed(2)} MB`);
})();
