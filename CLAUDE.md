# CLAUDE.md

Guidance for Claude Code in this repo. Keep it short — see `README.md` and
`content/README.md` for details.

## What this is

Personal academic website of **Si-Yu Lu** (PhD @ NTU). The `main` branch is
**content-driven**: all personal data lives as hierarchical Markdown under
`content/`, and the site is generated from it by **Eleventy (11ty)**. Templates and
vendored design assets live in `src/`; `src/_data/{db,site}.js` load everything out
of `content/`. Visual style = the `nubo-design-style` system + a light terminal/CLI
layer (`src/assets/css/terminal.css`). Build with `npm run build`
(= eleventy + image optimization + CV-PDF generation), dev with `npm run serve`.

## Branches

- `main` — primary. Content source (and future site). Do all work here.
- `master`, `master_v1.0` — secondary. **Do not modify.** They preserve the old
  Astro + Decap CMS v1.0 site.

## Working rules

- To change site content, edit `content/**/*.md` — one item per file. Follow
  `content/README.md`: frontmatter = structured data, body = prose; asset paths are
  relative to the `content/` root; blog posts are folders with per-language files
  (`index.md` + `zh-tw.md` / `en.md` / …).
- Nav + homepage section order/visibility are configured in `content/site.yml`.
  `content/space/` holds free-form, recursively-routed Space pages.
- Keep frontmatter valid YAML. Don't rename/move files in `content/assets/` without
  updating the references that point to them.
- Prefer editing `content/` + `site.yml`. Templates in `src/` only need changes for
  new layouts/components. The vendored CSS/JS under `src/assets/{css/tokens.css,
  css/nubo-design.css,js/components.js,js/vendor}` mirror `nubo-design-style` — don't
  hand-edit; re-copy from there. Terminal tweaks go in `terminal.css` / `site.js`.
- `reference/` is untracked scratch from other tooling — ignore it, never commit it.

## Deployment

- `.github/workflows/deploy.yml` builds + deploys to GitHub Pages on push to `main`.
  It is committed but only takes effect once the repo's Pages **Source** is set to
  "GitHub Actions" — don't change Pages settings unless asked. The old legacy/Jekyll
  serving is bypassed via `_site/.nojekyll`.

## Commits

- No AI/Claude/Anthropic attribution or `Co-Authored-By` trailers in commits, PRs,
  or authorship. Git identity: `OrientoNubo <d11922023@csie.ntu.edu.tw>`.
- Commit/push only when explicitly asked.
