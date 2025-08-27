import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { BlogCard } from '@/components/BlogCard';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/lib/blogData';
import { Files, AlertTriangle } from 'lucide-react';

const Blog = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Badge variant="destructive" className="bg-classified text-classified-foreground px-4 py-2 font-mono tracking-wider">
              <AlertTriangle className="w-4 h-4 mr-2" />
              {t('common.declassified')}
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-foreground mb-4">
            {t('blog.title')}
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
            {t('blog.subtitle')}
          </p>
          
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground font-mono">
            <Files className="w-4 h-4" />
            <span>{blogPosts.length} dossiers disponibles</span>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Warning Banner */}
        <div className="mt-12 p-6 border border-destructive/50 bg-destructive/10 rounded-lg">
          <div className="flex items-center gap-3 text-destructive font-mono">
            <AlertTriangle className="w-5 h-5" />
            <p className="text-sm">
              <strong>AVERTISSEMENT:</strong> Ces dossiers contiennent des informations 
              sensibles déclassifiées. La diffusion est autorisée à des fins d'information publique uniquement.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;