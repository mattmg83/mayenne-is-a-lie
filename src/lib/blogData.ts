// Blog post metadata and content
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  classification: string;
  slug: string;
  content?: string;
}

// Dynamically generated blog posts data
import generatedBlogPosts from './generatedBlogData.json';
export const blogPosts: BlogPost[] = generatedBlogPosts;

// Function to get markdown content (simplified for demo)
export const getPostContent = async (slug: string): Promise<string> => {
  try {
    // In a real app, you'd dynamically import the markdown file
    const response = await import(`../content/posts/${slug}.md?raw`);
    return response.default;
  } catch (error) {
    // Fallback content if file not found
    return generateFallbackContent(slug);
  }
};

const generateFallbackContent = (slug: string): string => {
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return '# Dossier non trouvé\n\nCe dossier a été supprimé par les autorités.';
  
  return `# ${post.title}

**Classification:** ${post.classification}  
**Date de déclassification:** ${post.date}

## CONTENU CLASSIFIÉ

Ce dossier fait l'objet d'une enquête en cours. Les informations détaillées seront publiées prochainement.

### Résumé Exécutif

${post.description}

---

**[DOSSIER EN COURS DE DÉCLASSIFICATION]**

*Pour plus d'informations, contactez nos sources anonymes via les canaux sécurisés.*`;
};