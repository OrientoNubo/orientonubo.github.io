const { execSync } = require("child_process");
const path = require("path");

/* Last commit date that touched content/ (YYYY-MM-DD). Used for the CV's
 * "Last updated" stamp so the same commit yields a byte-identical PDF.
 * Falls back to today if git is unavailable (e.g. shallow checkout). */
function lastContentDate() {
  try {
    const out = execSync("git log -1 --format=%cs -- content", {
      cwd: path.join(__dirname, "../.."),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (out) return out;
  } catch (_) { /* ignore */ }
  return new Date().toISOString().slice(0, 10);
}

module.exports = { cvUpdated: lastContentDate() };
