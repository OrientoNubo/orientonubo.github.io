const fs = require("fs");
const path = require("path");
const fg = require("fast-glob");
const matter = require("gray-matter");

const ROOT = path.join(__dirname, "../../content");

/* Read + parse a single content/ markdown file (frontmatter + body). */
function read(rel) {
  return matter(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

/* Load every *.md directly inside a category folder into an array of
 * { ...frontmatter, body, _slug, _file }. */
function loadDir(dir) {
  return fg
    .sync(`${dir}/*.md`, { cwd: ROOT })
    .map((rel) => {
      const f = read(rel);
      return { ...f.data, body: f.content, _slug: path.basename(rel, ".md"), _file: rel };
    })
    .filter((item) => !item.hidden); // `hidden: true` items are excluded everywhere
}

const byOrder = (a, b) => (a.order ?? 999) - (b.order ?? 999);
const yearNum = (v) => parseInt(String(v ?? "").match(/\d{4}/)?.[0] || "0", 10);

/* Recursively load content/space/ into a flat list of nodes, each with a
 * routed urlPath, parentUrl, children, and a breadcrumb trail. A node is
 * `<dir>/index.md` (a section landing) or `<file>.md` (a leaf page). */
function loadSpaceTree() {
  const base = path.join(ROOT, "space");
  if (!fs.existsSync(base)) return [];

  const nodes = fg.sync("**/*.md", { cwd: base }).map((rel) => {
    const parsed = matter(fs.readFileSync(path.join(base, rel), "utf8"));
    let segs = rel.replace(/\.md$/, "").split("/");
    if (segs[segs.length - 1] === "index") segs.pop();
    segs = segs.map((s) => s.replace(/^\d+[-_]/, "")); // strip NN- ordering prefix
    const urlPath = "/space/" + (segs.length ? segs.join("/") + "/" : "");
    const depth = segs.length;
    const parentSegs = segs.slice(0, -1);
    const parentUrl =
      depth === 0 ? null : "/space/" + (parentSegs.length ? parentSegs.join("/") + "/" : "");
    return {
      ...parsed.data,
      title: parsed.data.title || (segs.length ? segs[segs.length - 1] : "Space"),
      order: parsed.data.order ?? 999,
      navVisible: parsed.data.nav !== false,
      body: parsed.content,
      urlPath,
      parentUrl,
      depth,
    };
  });

  const byUrl = Object.fromEntries(nodes.map((n) => [n.urlPath, n]));

  nodes.forEach((n) => {
    n.children = nodes
      .filter((c) => c.parentUrl === n.urlPath && c.navVisible)
      .sort((a, b) => byOrder(a, b) || a.title.localeCompare(b.title));
    const trail = [];
    let cur = n;
    while (cur && cur.parentUrl && byUrl[cur.parentUrl]) {
      const p = byUrl[cur.parentUrl];
      trail.unshift({ title: p.title, url: p.urlPath });
      cur = p;
    }
    n.trail = trail;
  });

  return nodes.sort((a, b) => a.depth - b.depth || byOrder(a, b));
}

module.exports = () => {
  // ----- singletons -------------------------------------------------------
  const profileRaw = read("profile.md");
  const cvRaw = read("cv.md");
  const profile = { ...profileRaw.data, about: profileRaw.content };
  const cv = { ...cvRaw.data, intro: cvRaw.content };

  // ----- category collections --------------------------------------------
  // Awards/certs: newest year first, `order` breaks same-year ties.
  const awards = loadDir("awards").sort((a, b) => yearNum(b.year) - yearNum(a.year) || byOrder(a, b));
  const certificates = loadDir("certificates").sort((a, b) => yearNum(b.date) - yearNum(a.date) || byOrder(a, b));
  const services = loadDir("services").sort(byOrder);
  const experience = loadDir("experience").sort(byOrder);
  const projects = loadDir("projects").sort(
    (a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1) || String(b.date || "").localeCompare(String(a.date || ""))
  );
  // Publications follow explicit `order` (matches the CV), year desc as fallback.
  const publications = loadDir("publications").sort(
    (a, b) => byOrder(a, b) || yearNum(b.year) - yearNum(a.year) || String(a.title).localeCompare(String(b.title))
  );

  // ----- honors: awards + certificates merged for the CV "Awards & Certificate"
  // section. Normalized to a common shape and sorted newest-first (stable, so the
  // per-collection order is preserved within the same year). ----------------
  const honors = [
    ...awards.map((a) => ({ name: a.title, nameZh: a.titleZh, org: a.organization, orgZh: a.organizationZh, year: a.year })),
    ...certificates.map((c) => ({ name: c.title, nameZh: c.titleZh, org: c.issuer, orgZh: c.issuerZh, year: c.date })),
  ].sort((a, b) => yearNum(b.year) - yearNum(a.year));

  // ----- blog: folder per post, index.md meta + <lang>.md bodies ----------
  const blog = fg
    .sync("blog/*/index.md", { cwd: ROOT })
    .map((rel) => {
      const dir = path.dirname(rel); // blog/2026-01-01-slug
      const meta = read(rel).data;
      const folder = path.basename(dir);
      const dateFolder = folder.slice(0, 10);
      const slug = folder.replace(/^\d{4}-\d{2}-\d{2}-/, "");
      const bodies = {};
      (meta.languages || []).forEach((lang) => {
        const lp = path.join(ROOT, dir, `${lang}.md`);
        if (fs.existsSync(lp)) bodies[lang] = matter(fs.readFileSync(lp, "utf8")).content;
      });
      // only keep declared languages that actually have a file
      const languages = (meta.languages || []).filter((l) => bodies[l] != null);
      return { ...meta, slug, dir, dateFolder, bodies, languages, url: `/blog/${slug}/` };
    })
    .filter((p) => !p.draft && Object.keys(p.bodies).length > 0)
    .sort((a, b) => {
      const pin = (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0);
      return pin || new Date(b.date) - new Date(a.date);
    });

  // ----- auto-counted stats ----------------------------------------------
  // profile.stats values set to "auto" are resolved to the live count of the
  // matching collection, so the homepage figures never drift from content/.
  const statCounts = {
    publications: publications.length,
    projects: projects.length,
    awards: awards.length,
    certificates: certificates.length,
    services: services.length,
    experience: experience.length,
  };
  if (profile.stats) {
    for (const k of Object.keys(profile.stats)) {
      if (profile.stats[k] === "auto" && statCounts[k] != null) {
        profile.stats[k] = statCounts[k];
      }
    }
  }

  return {
    profile,
    cv,
    awards,
    certificates,
    honors,
    services,
    experience,
    projects,
    publications,
    blog,
    space: loadSpaceTree(),
  };
};
