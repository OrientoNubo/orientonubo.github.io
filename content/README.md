# Content

All personal data for the website, organized hierarchically. Edit these files to
update the site. One item per file; files are grouped by category folders.

## Structure

```
content/
├─ site.yml                   # Nav + homepage section order/visibility (site config)
├─ profile.md                 # Name, title, bio, affiliation, advisors, social links,
│                             #   research interests, stats
├─ cv.md                      # Contact, summary, education, skills (→ generates CV PDF)
├─ space/                     # Free-form "Space" pages (recursive; see below)
├─ publications/              # One file per publication  (YYYY-venue-topic.md)
├─ awards/                    # One file per award        (YYYY-org-topic.md)
├─ certificates/             # One file per certificate  (YYYY-issuer-topic.md)
├─ services/                  # Academic service / reviewing (YYYY-role.md)
├─ experience/                # Work / internship / collaboration
├─ projects/                  # Projects
├─ blog/                      # One folder per post (see below)
└─ assets/                    # Images, CV PDF, and other binary assets
```

## Conventions

- **Frontmatter = structured data, body = prose.** Machine-readable fields (titles,
  dates, links, flags) live in the YAML frontmatter; long-form text (abstracts,
  descriptions, article bodies) lives in the Markdown body.
- **Image / asset paths are relative to this `content/` root**, e.g.
  `image: assets/2023 IET Best Paper Award First Place.png`.
- **Ordering:** items use `order` (lower = first) and/or the date/year in the
  filename. Some types support `pinned: true` to surface an item.

## Blog posts (multilingual)

Each post is a folder. `index.md` holds the shared metadata; each language has its
own content file. The `languages` list in `index.md` declares which translations
exist.

```
blog/2026-01-01-intro-to-3d-gaussian-splatting/
├─ index.md      # title, description, date, tags, languages: [zh-tw, en]
├─ zh-tw.md      # 繁體中文 content
└─ en.md         # English content
```

To add a translation: create `<lang>.md` in the post folder and add `<lang>` to the
`languages` list in `index.md`. Supported codes follow the original CMS:
`en`, `zh-tw`, `ja`, `ko`, `ar`.

## Space pages (`space/`)

A free-form area rendered recursively. Each page is one Markdown file:

- `space/<name>.md` → a leaf page at `/space/<name>/`.
- `space/<name>/index.md` → a section landing at `/space/<name>/` that can hold its
  own sub-pages (files or further folders) — nesting is unlimited.
- `space/index.md` is the Space landing at `/space/`.

Frontmatter per page: `title`, `order` (lower = first), optional `nav: false` to
hide it from parent listings. The body is free-form Markdown.

## Site config (`site.yml`)

`site.yml` controls the header **nav** and the **homepage** section order and
visibility, so you can reorder or hide blocks without touching templates. Each
homepage section `key` maps to a content collection (e.g. `publications`,
`awards`) or a `profile` sub-field (`researchInterests`, `stats`).
