# 🚀 Déploiement - La Mayenne N'existe Pas

Site de théorie du complot satirique avec blog multilingue et système de contenu markdown.

## 📋 Prérequis

- Node.js 18+
- npm ou yarn

## 🛠️ Installation Locale

```bash
git clone <votre-repo>
cd mayenne-nexiste-pas
npm install
npm run dev
```

Le site sera accessible sur `http://localhost:8080`

## 🌐 Déploiement

### Netlify (Recommandé)

1. **Connectez votre repository GitHub/GitLab**
2. **Configuration de build :**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

3. **Le fichier `_redirects` est déjà configuré** pour le SPA routing

4. **Variables d'environnement :** Aucune requise

### Vercel

1. **Connectez votre repository**
2. **Configuration automatique** via `vercel.json`
3. **Build settings :**
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

## 📝 Ajouter du Contenu Blog

### Structure des Articles

Créez ou modifiez des fichiers `.md` dans `src/content/posts/` avec ce frontmatter :

```markdown
---
title: "Titre de votre Article"
date: "2026-03-30"
classification: "CONFIDENTIEL"
source: "Votre source"
tags:
  - "enquete"
  - "archives"
related:
  - "slug-dun-autre-article"
---

# Titre de votre Article

## Votre contenu

Écrivez votre contenu en markdown standard.
```

### Ajouter l'Article au Système

Les valeurs de `related` doivent être des **slugs d'articles existants** dans `src/content/posts/`.

La génération valide automatiquement :
- les slugs `related` inconnus ;
- les slugs dupliqués.

1. **Créez ou modifiez** un fichier markdown dans `src/content/posts/`.
2. **Exécutez** `npm run generate:blog`.
3. **Exécutez** `npm run build` (ou déployez directement, ce qui déclenche aussi le build).

### Recherche et tags

- La recherche et le filtrage se font côté frontend à partir de `generatedBlogData.json`.
- Aucun service externe d'indexation ou de recherche n'est requis au déploiement.

## 🌍 Traductions

Les traductions sont gérées via **react-i18next** dans `src/i18n/index.ts`.

### Ajouter une Nouvelle Langue

```typescript
const resources = {
  fr: { translation: { ... } },
  en: { translation: { ... } },
  es: { // Nouvelle langue
    translation: {
      "nav.home": "Inicio",
      // ... autres traductions
    }
  }
};
```

## 🎨 Personnalisation

### Couleurs et Thème

Modifiez `src/index.css` pour changer :
- Couleurs principales (`--primary`, `--classified`)  
- Animations personnalisées
- Effets spéciaux (glow, redacted, etc.)

### Composants UI

Les composants shadcn sont dans `src/components/ui/` et peuvent être personnalisés.

## 📁 Structure du Projet

```
src/
├── components/          # Composants React
│   ├── ui/             # Composants shadcn
│   ├── Header.tsx      # Navigation
│   ├── Hero.tsx        # Section hero
│   └── BlogCard.tsx    # Carte d'article
├── content/
│   └── posts/          # Articles markdown
├── pages/              # Pages principales
├── lib/               # Utilitaires
├── i18n/              # Configuration traductions
└── assets/            # Images et ressources
```

## 🔒 Sécurité

- **Aucune donnée sensible** dans le code
- **Génération statique** - pas de serveur
- **HTTPS automatique** sur Netlify/Vercel

## 🆘 Dépannage

### Problèmes de Build

```bash
# Nettoyer et réinstaller
rm -rf node_modules dist
npm install
npm run build
```

### Problèmes de Routing

Vérifiez que les fichiers `_redirects` (Netlify) ou `vercel.json` (Vercel) sont présents.

### Images Manquantes

Les images générées sont dans `src/assets/` et doivent être importées comme modules ES6.

## 📞 Support

Ce projet est **open source** et **satirique**. Pour des questions techniques, consultez la documentation des outils utilisés :

- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [react-i18next](https://react.i18next.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Rappel :** Ce site est une œuvre de fiction satirique. La Mayenne existe probablement. 😉
