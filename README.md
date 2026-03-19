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

1. Create a new markdown file in `src/content/posts/`
2. Add metadata/frontmatter at the top of the file.
3. Run `npm run generate:blog` every time you add a post or change post frontmatter so `src/lib/generatedBlogData.json` stays in sync.

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