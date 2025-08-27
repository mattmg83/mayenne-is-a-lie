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

// Mock blog posts data - in a real app, this would come from markdown files
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Les Cartes Géographiques Falsifiées',
    description: 'Analyse des inconsistances cartographiques révélant la non-existence de la région mayennaise. Documents IGN compromis.',
    date: '15/03/2024',
    classification: 'CONFIDENTIEL',
    slug: 'cartes-falsifiees'
  },
  {
    id: '2', 
    title: 'Témoignages d\'Habitants "Mayennais"',
    description: 'Entretiens troublants avec des personnes prétendant vivre en Mayenne. Signes de manipulation mémorielle détectés.',
    date: '22/02/2024',
    classification: 'SECRET DÉFENSE',
    slug: 'temoins-oculaires'
  },
  {
    id: '3',
    title: 'L\'Impossible Économie Mayennaise', 
    description: 'Analyse des flux financiers vers une région inexistante. 847 millions d\'euros détournés annuellement.',
    date: '08/01/2024',
    classification: 'CONFIDENTIEL',
    slug: 'analyse-economique'
  },
  {
    id: '4',
    title: 'Projet MK-Mayenne : Contrôle Mental',
    description: 'Documents déclassifiés révélant des expérimentations psychologiques sur des "cobayes mayennais".',
    date: '03/12/2023', 
    classification: 'ULTRA SECRET',
    slug: 'mk-mayenne'
  },
  {
    id: '5',
    title: 'Analyse Satellitaire : Le Vide Géographique',
    description: 'Images satellites haute résolution confirmant l\'absence de toute structure dans la zone "Mayenne".',
    date: '17/11/2023',
    classification: 'CONFIDENTIEL',
    slug: 'analyse-satellitaire'
  },
  {
    id: '6',
    title: 'Les Connexions Illuminati-Mayenne',
    description: 'Liens troublants entre la création fictive de la Mayenne et les sociétés secrètes européennes.',
    date: '05/10/2023',
    classification: 'EYES ONLY',
    slug: 'illuminati-connection'
  }
];

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