const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

/* Loads content/site.yml → global `site` (nav + homepage section config).
 * Filters out hidden items and sorts nav by `order`. */
module.exports = () => {
  const file = path.join(__dirname, "../../content/site.yml");
  const cfg = yaml.load(fs.readFileSync(file, "utf8")) || {};

  cfg.nav = (cfg.nav || [])
    .filter((n) => n.visible !== false)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  cfg.home = cfg.home || {};
  cfg.home.sections = (cfg.home.sections || []).filter((s) => s.visible !== false);

  return cfg;
};
