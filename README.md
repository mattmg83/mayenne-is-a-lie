# MAYENNE DOES NOT EXIST

[![Vercel](https://therealsujitk-vercel-badge.vercel.app/?app=mayenne-is-a-lie)](https://mayenne-is-a-lie.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A satirical conspiracy theory website exposing the "truth" about the non-existent French department of Mayenne. Built with React, TypeScript, and Vite.

⚠️ **DISCLAIMER**: This is a fictional project for entertainment purposes only. The Mayenne region does exist in France. 😉

## 🌐 Live Demo

[https://mayenne-is-a-lie.vercel.app](https://mayenne-is-a-lie.vercel.app)

## 📖 About the Project

For decades, the French government has been hiding a shocking truth: the region known as "Mayenne" doesn't actually exist. This website presents "declassified evidence" and "investigative reports" that supposedly prove this grand conspiracy.

Features:
- Multilingual interface (French/English)
- Classified documents with conspiracy theories
- Responsive design with retro spy aesthetics
- Markdown-based blog system
- Dark mode support

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Routing**: React Router v6
- **Internationalization**: i18next
- **Deployment**: Netlify/Vercel
- **Content**: Markdown files

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/mayenne-is-a-lie.git
cd mayenne-is-a-lie
npm install
```

### Development

```bash
# Start development server
npm run dev

# Generate blog data
npm run generate:blog

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding Blog Content

#### Blog Content Format (Current)

```md
---
title: "Titre de l'article"
date: "2026-03-12"            # ISO preferred (YYYY-MM-DD), DD/MM/YYYY also accepted
classification: "CONFIDENTIEL"
source: "Nom masqué - Fonction"
tags:
  - "transport"
  - "cartographie"
related:
  - "autre-slug"
  - "deuxieme-slug"
---

## Section du contenu

Texte markdown…
```

#### Field rules

- `title`, `date`, `classification` are required after normalization.
- `source` optional in parser but should be filled in editorially.
- `tags` are normalized to lowercase (French locale).
- `related` must reference existing slugs (without `.md`).
- Slug = filename without `.md`.

#### Generate index

- Run `npm run generate:blog` after adding/editing posts.
- Output file: `src/lib/generatedBlogData.json`.
- `npm run build` already runs generation automatically.

#### Search & filtering behavior

- Search is client-side, no external search service.
- Query matches title, description, classification, source, and tags.
- Tag filter can be combined with query and is persisted in URL query params (`q`, `tag`).
- `/blog/tag/:tag` route redirects into filtered blog view.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   └── BlogCard.tsx    # Blog post cards
├── content/
│   └── posts/          # Markdown blog posts
├── pages/              # Page components
├── lib/                # Utilities and data
├── i18n/               # Internationalization
└── assets/             # Images and static assets
```

## 🌍 Translations

Translations are managed with i18next. Supported languages:
- French (default)
- English

To add a new language, update `src/i18n/index.ts`.

## 🎨 Customization

### Colors and Theme

Modify `src/index.css` to change:
- Primary colors (`--primary`, `--classified`)
- Custom animations and effects
- Classified document styling

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Import settings from `vercel.json`
3. Configure build:
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

### Alternative: Netlify

1. Connect your GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18+`

## 🔧 Troubleshooting

### Build Issues

```bash
# Clean and reinstall
rm -rf node_modules dist
npm install
npm run build
```
### Routing Problems

Ensure `vercel.json` (Vercel) or `_redirects` (Netlify) files are present in the public directory.


## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

Please note that this project is satire and meant for entertainment purposes.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) for fast development
- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- All conspiracy theorists who inspired this satire

---
*Remember: This is entirely fictional. Mayenne is a real place in France!* 🇫🇷