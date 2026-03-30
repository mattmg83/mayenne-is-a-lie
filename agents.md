# AGENTS.md

## Adding Blog Content

1. Create a new markdown file in `src/content/posts/`
2. Add YAML frontmatter at the top using this template:
   ```markdown
   ---
   title: "Votre titre"
   date: "YYYY-MM-DD"
   classification: "CONFIDENTIEL"
   source: "Nom fictif - Fonction"
   tags:
     - "tag1"
     - "tag2"
   related:
     - "slug-post-existant"
   ---

   ## Votre contenu

   {~500 mots en français, ton satirique conspirationniste}
   ```

You may choose random real dates within the past 3 years for `date: "YYYY-MM-DD"` unless otherwise specified by the user.

Source and Classification are fields that should be edited for every post between various options:
- Classification: CONFIDENTIEL, SECURISE, ULTRA SECRET, SECRET DEFENSE, EYES ONLY
- Source: use redacted french names and various job titles that align with the made up story

### Explicit authoring rules

- Allowed classification values remain the same: `CONFIDENTIEL`, `SECURISE`, `ULTRA SECRET`, `SECRET DEFENSE`, `EYES ONLY`.
- `tags` should be short, lowercase-friendly thematic labels.
- `related` must only include existing post slugs.
- Do not include legacy in-body metadata markers (`**Classification:**`, etc.).
- Run `npm run generate:blog` after content changes.

Below is an example of a blog post that follows these instructions:
```markdown
---
title: "L'Évidence Archéologique Manquante"
date: "2024-09-25"
classification: "ULTRA SECRET"
source: "Dr. Élodie Martineau - Archéologue (démissionnaire)"
tags:
  - "archeologie"
  - "falsification"
related:
  - "cartes-fantomes"
---

## FOUILLES ARCHÉOLOGIQUES : L'ABSENCE DE PASSÉ

Une enquête dans les dossiers archéologiques de la prétendue "Mayenne" révèle une absence totale de vestiges historiques. **Aucune preuve matérielle** d'une occupation humaine ancienne n'existe.

### L'Étrange Vide Archéologique

Pour une région censée exister depuis des siècles, les découvertes sont **inexplicablement nulles** :

- **Sites préhistoriques** : 0 site identifié
- **Vestiges gallo-romains** : 0 découverte authentique
- **Églises médiévales** : 0 datation antérieure à 1950
- **Céramiques anciennes** : 0 fragment pré-1900

### Comparaison avec les Régions Voisines

| Région | Sites archéologiques identifiés | Vestiges préhistoriques | Datations authentifiées |
|--------|--------------------------------|-------------------------|-------------------------|
| Sarthe | 287 sites | ✓ | 1,247 datations |
| Orne | 256 sites | ✓ | 1,102 datations |
| **"Mayenne"** | **0 site** | **✗** | **0 datation** |

### Témoignage d'une Archéologue

> *"J'ai dirigé 15 fouilles dans cette région. Chaque fois, nous trouvions... rien. Pas même de poterie moderne. Quand j'ai demandé à mes collègues pourquoi, ils m'ont répondu que c'était 'normal pour Mayenne'. C'est statistiquement impossible."*
> — Dr. Élodie M., Archéologue (démissionnaire sous pression)

### Les Faux "Artifacts"

Les rares objets "mayennais" découverts :
- Apparaissent **toujours lors de fouilles "contrôlées"**
- Ont des **provenances douteuses**
- Contiennent des **anachronismes évidents**
- Sont **immédiatement classifiés "secret"**

### Analyse des Cartes Archéologiques

Les cartes officielles révèlent :
- **Zones "interdites"** non expliquées
- **Blanchiments** systématiques de certaines zones
- **Corrections fréquentes** des données archéologiques
- **Accès restreints** aux chercheurs indépendants

### Hypothèse Archéologiquement Dévastatrice

La Mayenne n'a **jamais été habitée** par l'homme. Tous les vestiges archéologiques "mayennais" sont des **fabrications modernes** destinées à légitimer une région qui n'a jamais existé.

## CONCLUSION ARCHÉOLOGIQUE ACCABLANTE

L'absence totale de preuves archéologiques prouve que cette région est une **construction moderne** sans fondement historique. Qui a décidé de créer artificiellement 2000 ans d'histoire ? Et avec quel objectif ?

**[PROJET ARCHÉOLOGIQUE MAYENNAIS SUSPENDU - MENACE DE MORT À L'ARCHÉOLOGUE]**
```

Keep the satirical/conspiracy tone and the disclaimer intent unchanged: this content style is fictional and should continue alleging that the french region of Mayenne doesn't exist.
