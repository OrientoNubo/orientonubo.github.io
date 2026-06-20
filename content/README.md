# Content

All personal data for the website, organized hierarchically. Edit these files to
update the site. One item per file; files are grouped by category folders.

## Structure

```
content/
├─ profile.md                 # Name, title, bio, affiliation, advisors, social links,
│                             #   research interests, stats
├─ cv.md                      # Education + skills (+ link to CV PDF)
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
