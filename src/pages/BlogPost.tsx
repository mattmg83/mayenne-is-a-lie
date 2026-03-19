import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { blogPosts, getPostContent } from '@/lib/blogData';
import { ArrowLeft, Calendar, FileText, AlertTriangle } from 'lucide-react';

// Import images from assets
import mayenneSticker from '@/assets/mayenne-sticker-transparent.png';
import conspiracyLogo from '@/assets/conspiracy-logo.png';
import heroConspiracy from '@/assets/hero-conspiracy.jpg';
import heroFrenchGov from '@/assets/hero-french-government.jpg';
import webpImage from '@/assets/assets_task_01k3mftsv6e659xbrj000e7d43_1756255719_img_1.webp';

// Image mapping for markdown content
const imageMap: Record<string, string> = {
  'src/assets/mayenne-sticker-transparent.png': mayenneSticker,
  'src/assets/conspiracy-logo.png': conspiracyLogo,
  'src/assets/hero-conspiracy.jpg': heroConspiracy,
  'src/assets/hero-french-government.jpg': heroFrenchGov,
  'src/assets/assets_task_01k3mftsv6e659xbrj000e7d43_1756255719_img_1.webp': webpImage,
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const post = blogPosts.find(p => p.slug === slug);
  const relatedPosts = (post?.related ?? [])
    .map((relatedSlug) => blogPosts.find((entry) => entry.slug === relatedSlug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  useEffect(() => {
    if (!slug || !post) {
      navigate('/blog');
      return;
    }

    const loadContent = async () => {
      try {
        const postContent = await getPostContent(slug);
        setContent(postContent);
      } catch (error) {
        console.error('Error loading post:', error);
        setContent('# Erreur\n\nImpossible de charger le contenu du dossier.');
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [slug, post, navigate]);

  if (!post) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-muted-foreground font-mono">
            Déchiffrement en cours...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/blog')}
          className="mb-8 font-mono hover:text-classified"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux dossiers
        </Button>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8 pb-8 border-b border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <Badge 
                variant={post.classification.includes('SECRET') ? 'destructive' : 'secondary'}
                className="font-mono w-fit"
              >
                <AlertTriangle className="w-3 h-3 mr-1" />
                {post.classification}
              </Badge>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
                <Calendar className="w-4 h-4" />
                {t('blog.datePrefix')} {post.date}
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-mono font-bold text-foreground mb-4">
              {post.title}
            </h1>
            
            <p className="text-lg text-muted-foreground font-mono leading-relaxed">
              {post.description}
            </p>
          </header>

          {/* Article Content */}
          <div className="prose prose-invert prose-sm md:prose-base max-w-none">
            <div className="font-mono text-foreground space-y-6">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({children}) => <h1 className="text-2xl font-bold text-foreground border-b border-border pb-2 mb-4">{children}</h1>,
                  h2: ({children}) => <h2 className="text-xl font-bold text-classified mt-8 mb-4">{children}</h2>,
                  h3: ({children}) => <h3 className="text-lg font-bold text-foreground mt-6 mb-3">{children}</h3>,
                  p: ({children}) => <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>,
                  strong: ({children}) => <strong className="text-classified font-bold">{children}</strong>,
                  blockquote: ({children}) => (
                    <blockquote className="border-l-4 border-classified pl-6 py-2 bg-muted/30 italic text-muted-foreground my-6">
                      {children}
                    </blockquote>
                  ),
                  code: ({children}) => (
                    <code className="bg-muted px-2 py-1 rounded text-sm text-classified">
                      {children}
                    </code>
                  ),
                  img: ({src, alt}) => {
                    // Check if the image path is in our mapping
                    if (src && imageMap[src]) {
                      return (
                        <img
                          src={imageMap[src]}
                          alt={alt || ''}
                          className="max-w-full h-auto my-6 rounded-md border border-border"
                        />
                      );
                    }
                    // For other images, use the src as is
                    return (
                      <img
                        src={src}
                        alt={alt || ''}
                        className="max-w-full h-auto my-6 rounded-md border border-border"
                      />
                    );
                  },
                  ul: ({children}) => <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-4">{children}</ol>,
                  li: ({children}) => <li className="text-muted-foreground">{children}</li>
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <section className="mt-12 pt-8 border-t border-border">
              <h2 className="text-xl font-mono font-bold text-classified mb-4">
                Dossiers liés
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="block rounded-lg border border-border bg-muted/20 p-4 transition-colors hover:bg-muted/40"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <Badge
                        variant={relatedPost.classification.includes('SECRET') ? 'destructive' : 'secondary'}
                        className="font-mono w-fit"
                      >
                        {relatedPost.classification}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">{relatedPost.date}</span>
                    </div>
                    <h3 className="font-mono font-bold text-foreground mb-2">{relatedPost.title}</h3>
                    <p className="text-sm text-muted-foreground font-mono leading-relaxed">
                      {relatedPost.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-border">
            <div className="bg-muted/30 p-6 rounded-lg border border-border">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-classified mt-0.5" />
                <div className="text-sm text-muted-foreground font-mono">
                  <p className="mb-2">
                    <strong className="text-foreground">CLASSIFICATION:</strong> {post.classification}
                  </p>
                  <p>
                    Ce document a été déclassifié le {post.date} dans le cadre de la loi sur la transparence administrative. 
                    Toute reproduction partielle ou totale est autorisée à des fins d'information du public.
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </article>
      </main>
    </div>
  );
};

export default BlogPost;