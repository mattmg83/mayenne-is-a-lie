import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { BlogCard } from '@/components/BlogCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { blogPosts } from '@/lib/blogData';
import { normalizeTag } from '@/lib/blogPostMetadata';
import { Files, AlertTriangle, Hash, X } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const POSTS_PER_PAGE = 9;

const Blog = () => {
  const { t } = useTranslation();
  const { tag } = useParams();
  const normalizedTag = tag ? normalizeTag(decodeURIComponent(tag)) : undefined;
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    if (!normalizedTag) {
      return blogPosts;
    }

    return blogPosts.filter((post) => post.tags?.includes(normalizedTag));
  }, [normalizedTag]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [normalizedTag]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Badge variant="destructive" className="bg-classified text-classified-foreground px-4 py-2 font-mono tracking-wider">
              <AlertTriangle className="w-4 h-4 mr-2" />
              {t('common.declassified')}
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl font-mono font-bold text-foreground mb-4">
            {normalizedTag ? `Tag : #${normalizedTag}` : t('blog.title')}
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
            {normalizedTag ? `Exploration taxonomique des dossiers associés au tag #${normalizedTag}.` : t('blog.subtitle')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-sm text-muted-foreground font-mono">
            <Files className="w-4 h-4" />
            <span>{filteredPosts.length} dossiers disponibles</span>
            {normalizedTag && (
              <>
                <span aria-hidden="true">•</span>
                <Badge variant="outline" className="font-mono lowercase">
                  <Hash className="w-3 h-3 mr-1" />
                  {normalizedTag}
                </Badge>
                <Button asChild variant="ghost" size="sm" className="font-mono h-8">
                  <Link to="/blog">
                    <X className="w-3 h-3 mr-1" />
                    Effacer le filtre
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {currentPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="mx-auto max-w-2xl rounded-lg border border-border bg-muted/20 p-8 text-center font-mono">
            <div className="flex justify-center mb-4 text-classified">
              <Hash className="w-6 h-6" />
            </div>
            <h2 className="text-xl text-foreground mb-2">Aucun dossier pour ce tag</h2>
            <p className="text-muted-foreground mb-4">
              Aucun dossier déclassifié ne correspond actuellement au tag #{normalizedTag}.
            </p>
            <Button asChild variant="outline" className="font-mono">
              <Link to="/blog">Retour à tous les dossiers</Link>
            </Button>
          </div>
        )}

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
