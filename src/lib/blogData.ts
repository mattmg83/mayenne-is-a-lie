import generatedBlogPosts from './generatedBlogData.json';
import { BlogPost, parsePostFile } from './blogPostMetadata';

export type { BlogPost } from './blogPostMetadata';

export const blogPosts: BlogPost[] = generatedBlogPosts as BlogPost[];

export const getPostContent = async (slug: string): Promise<string> => {
  try {
    const response = await import(`../content/posts/${slug}.md?raw`);
    const parsed = parsePostFile(response.default, `${slug}.md`);
    return parsed.content;
  } catch (error) {
    return generateFallbackContent(slug);
  }
};

const generateFallbackContent = (slug: string): string => {
  const post = blogPosts.find((entry) => entry.slug === slug);
  if (!post) {
    return '# Dossier non trouvé\n\nCe dossier a été supprimé par les autorités.';
  }

  return `## CONTENU CLASSIFIÉ

Ce dossier fait l'objet d'une enquête en cours. Les informations détaillées seront publiées prochainement.

### Résumé Exécutif

${post.description}

---

**[DOSSIER EN COURS DE DÉCLASSIFICATION]**

*Pour plus d'informations, contactez nos sources anonymes via les canaux sécurisés.*`;
};
