# orientonubo.github.io — `main`

Personal academic website of **Si-Yu Lu** (PhD Candidate @ NTU).

This `main` branch is **content-driven**: all personal data lives as hierarchical
Markdown under [`content/`](./content), and the website is generated from those
files by [Eleventy (11ty)](https://www.11ty.dev/). Edit the Markdown to update the
site — no template editing needed for routine changes. The visual design layers a
light terminal/CLI style on top of the
[nubo-design-style](../nubo-design-style) system (Ubuntu Mono, warm cards,
light/dark themes, image lightbox).

## Branches

| Branch | Role |
| --- | --- |
| `main` | **Primary.** Content source (this branch). Website design to be built on top. |
| `master` | Secondary. Previous Astro-based site (v1.0). |
| `master_v1.0` | Secondary. Snapshot of the v1.0 site. |

> The old Astro + Decap CMS implementation is preserved on `master` / `master_v1.0`.

## How it works

```
edit content/*.md  ─►  Eleventy build  ─►  _site/  ─►  GitHub Pages
```

To update the website, edit the Markdown under `content/`. See
[`content/README.md`](./content/README.md) for the data structure and conventions.
Navigation and the homepage section order are configured in
[`content/site.yml`](./content/site.yml) — no template edits needed.

## Develop

```sh
npm install                 # one-time
npm run serve               # local dev server with live reload (no PDF/image step)
npm run build               # full production build → _site/
                            #   = eleventy + optimize-images + build-cv-pdf
```

- **Site source:** templates and assets live in [`src/`](./src); the data loaders
  in `src/_data/` read everything out of `content/`.
- **CV PDF:** generated at build time from `content/` (`content/cv.md` +
  publications/awards) by `scripts/build-cv-pdf.mjs` (headless Chromium, navy
  reference layout) → `/assets/CV-SIYU.pdf`.
- **Images:** `scripts/optimize-images.mjs` downscales/recompresses large assets in
  the built `_site/` only; originals in `content/assets/` are untouched.
- **Deploy:** `.github/workflows/deploy.yml` builds and publishes to GitHub Pages on
  push to `main`. Enabling it requires switching the repo's Pages **Source** to
  "GitHub Actions" (one-time, in repo Settings).
