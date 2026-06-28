# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A satirical conspiracy-theory website ("La Mayenne n'existe pas") built with React + TypeScript + Vite. It's a static, content-driven site with no backend: a French/English blog of fictional "declassified" exposés claiming the French department of Mayenne doesn't exist.

## Commands

```bash
npm run dev            # start Vite dev server (port 8080)
npm run build           # regenerates blog data, then builds for production
npm run build:dev       # same, but built in development mode
npm run generate:blog   # parse src/content/posts/*.md -> src/lib/generatedBlogData.json
npm run lint             # eslint .
npm run preview          # preview the production build
```

There is no test suite configured in this repo.

`npm run build` and `npm run build:dev` always run `generate:blog` first — never edit `src/lib/generatedBlogData.json` by hand, it's a generated artifact.

## Architecture

### Content pipeline (the core thing to understand)

Blog posts are markdown files with frontmatter in `src/content/posts/*.md`. There is **no real YAML library** — frontmatter is parsed by a small hand-rolled parser in `src/lib/blogPostMetadata.ts` (`parseFrontmatter` / `parseYamlLikeBlock`). It only understands scalar `key: value` lines and simple `key:` + `- item` list blocks for `tags`/`related`; it does not support nested objects, multi-line strings, or YAML edge cases.

- `scripts/generateBlogData.ts` walks `src/content/posts/`, calls `parsePostFile` on each file, validates posts (required fields after normalization, no duplicate slugs, `related` must reference existing slugs), sorts by `dateIso` descending, assigns sequential `id`s, and writes `src/lib/generatedBlogData.json`. It throws on any validation failure, so a bad post breaks the build.
- `src/lib/blogData.ts` re-exports the generated JSON as `blogPosts` (the source of truth for list/search/tag views) and exposes `getPostContent(slug)`, which dynamically imports the raw `.md` file at runtime to render full post bodies (falls back to a generated "classified, pending declassification" placeholder if the import fails).
- Slugs are derived from filenames (no `.md`). `id` is a deterministic hash of the slug's char codes, not a sequence — don't assume it's stable across regenerations in the same way `dateIso` ordering is.
- `scripts/migrateBlogFrontmatter.ts` is a one-off maintenance script (not part of the build) that rewrites legacy in-body metadata (`**Classification:**`, etc.) into standardized YAML frontmatter, using a hardcoded `LEGACY_ENRICHMENTS` map of tags/related per slug for posts that predate frontmatter.

### Adding/editing blog content

Frontmatter shape (see existing posts in `src/content/posts/` for examples):

```markdown
---
title: "Titre de l'article"
date: "YYYY-MM-DD"        # ISO preferred; DD/MM/YYYY also accepted
classification: "CONFIDENTIEL"
source: "Nom masqué - Fonction"
tags:
  - "tag1"
  - "tag2"
related:
  - "slug-dun-autre-article"
---

## Section du contenu
Texte markdown en français, ton satirique conspirationniste, ~500 mots.
```

Rules:
- `title`, `date`, `classification` are required after normalization (missing ones fail the build).
- `classification` must be one of: `CONFIDENTIEL`, `SECURISE`, `ULTRA SECRET`, `SECRET DEFENSE`, `EYES ONLY`.
- `source` should be a redacted/fictional French name plus a job title fitting the story.
- `tags` are normalized to lowercase (`fr-FR` locale) — write them lowercase already.
- `related` must reference existing post slugs (filename without `.md`); unknown slugs fail the build.
- Do not include legacy in-body metadata markers (`**Classification:**`, `**Source:**`, etc.) — that's the pre-frontmatter format the migration script eliminated.
- Random dates within the past 3 years are fine unless the user specifies one.
- Always run `npm run generate:blog` after adding/editing posts (or just run the build, which does it for you).
- Keep the satirical/conspiracy tone and the underlying disclaimer intent: this is fiction, and Mayenne does in fact exist.

### Routing

`src/App.tsx` defines all routes with `react-router-dom`'s `BrowserRouter`: `/`, `/blog`, `/blog/tag/:tag`, `/blog/:slug`, `/about`, and a catch-all `NotFound`. New routes must be added above the catch-all `*` route (there's a comment marking this in the file).

### Blog search/filter (`src/pages/Blog.tsx`)

Search and tag filtering are entirely client-side over `blogPosts` (no external search service). Query matches title, description, classification, source, and tags. Both the search query (`q`) and selected tag (`tag`) are kept in URL search params so filtered views are shareable/bookmarkable. `/blog/tag/:tag` is a separate route that redirects into the filtered `/blog?tag=...` view.

### i18n

`react-i18next` is configured in `src/i18n/index.ts` with translation strings inlined directly in that file (no external locale JSON files) for `fr` (default/fallback) and `en`. Language detection order is `localStorage` → `navigator` → `htmlTag`, cached to `localStorage`. To add a language, add a new key to the `resources` object there.

### UI components

shadcn/ui components live in `src/components/ui/` and are configured via `components.json` (style: default, baseColor: slate, no prefix). Path alias `@` maps to `src/` (set in both `vite.config.ts` and `tsconfig`), with `@/components`, `@/lib`, `@/ui`, `@/hooks` sub-aliases per `components.json`. Treat `src/components/ui/*` as vendored shadcn output — prefer composing/styling over rewriting them.

### Build/tooling notes

- `vite.config.ts` enables `lovable-tagger`'s `componentTagger()` plugin only in development mode (used by the Lovable platform integration this project originated from).
- ESLint (`eslint.config.js`) disables `@typescript-eslint/no-unused-vars` and treats `react-refresh/only-export-components` as a warning.
- Deployed as a static site to Vercel (`vercel.json`) or Netlify (`public/_redirects` for SPA routing); no environment variables or server are required.
