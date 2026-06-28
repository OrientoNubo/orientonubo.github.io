const fs = require("fs");
const path = require("path");
const MarkdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItKatex = require("@vscode/markdown-it-katex").default;

/* Shared markdown-it instance — used both as the template engine and as the
 * `md` / `mdInline` filters that render body strings loaded from content/.
 * KaTeX renders $…$ / $$…$$ math to HTML at build time (browser only needs the
 * katex.min.css loaded on blog pages — see layouts/base.njk). */
const md = new MarkdownIt({ html: true, linkify: true, typographer: true })
  .use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink(),
    level: [2, 3, 4],
  })
  .use(markdownItKatex);

/* content/-relative asset path (e.g. "assets/2023 IET ….png") → site URL
 * ("/assets/2023%20IET%20….png"). Filenames contain spaces and CJK, so each
 * path segment must be URL-encoded. Absolute/remote URLs pass through. */
function assetUrl(p) {
  if (!p) return "";
  if (/^(https?:)?\/\//.test(p) || p.startsWith("/")) return p;
  const rel = p.replace(/^\.?\/?(content\/)?assets\//, "");
  return "/assets/" + rel.split("/").map(encodeURIComponent).join("/");
}

module.exports = function (eleventyConfig) {
  // ----- passthrough copy -------------------------------------------------
  // Owner-facing binary assets live in content/assets → served at /assets/.
  eleventyConfig.addPassthroughCopy({ "content/assets": "assets" });
  // Site-own CSS/JS (vendored design system + terminal layer) → /assets-site/.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets-site" });
  // KaTeX stylesheet + fonts (math rendering on blog pages) → /assets-site/katex/.
  eleventyConfig.addPassthroughCopy({
    "node_modules/katex/dist/katex.min.css": "assets-site/katex/katex.min.css",
    "node_modules/katex/dist/fonts": "assets-site/katex/fonts",
  });

  // ----- markdown filters -------------------------------------------------
  eleventyConfig.addFilter("md", (s) => (s ? md.render(String(s)) : ""));
  eleventyConfig.addFilter("mdInline", (s) => (s ? md.renderInline(String(s)) : ""));
  eleventyConfig.addFilter("assetUrl", assetUrl);

  // ----- small helpers ----------------------------------------------------
  eleventyConfig.addFilter("encodeUri", (s) => encodeURIComponent(String(s || "")));
  eleventyConfig.addFilter("readableDate", (d) => {
    if (!d) return "";
    const dt = d instanceof Date ? d : new Date(d);
    if (isNaN(dt)) return String(d);
    return dt.toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric", timeZone: "UTC",
    });
  });
  eleventyConfig.addFilter("year", (d) => {
    if (!d) return "";
    const dt = d instanceof Date ? d : new Date(d);
    return isNaN(dt) ? String(d) : String(dt.getUTCFullYear());
  });
  // Nav active state: "/" matches only the home URL; others match by prefix.
  eleventyConfig.addFilter("isActiveNav", (pageUrl, navUrl) => {
    pageUrl = pageUrl || "/";
    if (navUrl === "/") return pageUrl === "/";
    return pageUrl.startsWith(navUrl);
  });
  // Initials for an avatar fallback ("Si-Yu Lu" → "SL").
  eleventyConfig.addFilter("initials", (name) =>
    String(name || "")
      .split(/[\s-]+/).filter(Boolean).slice(0, 2)
      .map((w) => w[0].toUpperCase()).join("")
  );

  // Use Nunjucks for both .njk and inline markdown templating.
  eleventyConfig.setLibrary("md", md);

  // ----- emit .nojekyll so GitHub Pages serves _site/ verbatim ------------
  eleventyConfig.on("eleventy.after", ({ dir }) => {
    const out = (dir && dir.output) || "_site";
    try {
      fs.writeFileSync(path.join(out, ".nojekyll"), "");
    } catch (_) { /* output dir may not exist on --serve dry runs */ }
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
};
