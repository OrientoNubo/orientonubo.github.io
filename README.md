# orientonubo.github.io — `main`

Personal academic website of **Si-Yu Lu** (PhD Candidate @ NTU).

This `main` branch is a clean restart. The plan is **content-driven**: all personal
data lives as hierarchical Markdown under [`content/`](./content), and the website
is generated/updated by editing those files. The site design itself will be added
on top of this content later.

## Branches

| Branch | Role |
| --- | --- |
| `main` | **Primary.** Content source (this branch). Website design to be built on top. |
| `master` | Secondary. Previous Astro-based site (v1.0). |
| `master_v1.0` | Secondary. Snapshot of the v1.0 site. |

> The old Astro + Decap CMS implementation, GitHub Actions deploy workflow, and all
> previous code are preserved on `master` / `master_v1.0`. GitHub Pages and the
> deploy workflow are currently disabled.

## How it works (intended)

```
edit content/*.md  ─►  (future) site generator  ─►  published website
```

To update the website, edit the Markdown files under `content/`. See
[`content/README.md`](./content/README.md) for the data structure and conventions.
