import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { BlogCard } from '@/components/BlogCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { blogPosts } from '@/lib/blogData';
import { normalizeTag } from '@/lib/blogPostMetadata';
import { Files, AlertTriangle, Hash, Search, X } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const POSTS_PER_PAGE = 9;

const normalizeSearchValue = (value: string) => value.trim().toLocaleLowerCase('fr-FR');

const Blog = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { tag } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const routeTag = tag ? normalizeTag(decodeURIComponent(tag)) : undefined;
  const queryParam = searchParams.get('q') ?? '';
  const tagParam = searchParams.get('tag');
  const urlSelectedTag = routeTag ?? (tagParam ? normalizeTag(tagParam) : undefined);

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(urlSelectedTag);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllTags, setShowAllTags] = useState(false);

  const availableTags = useMemo(
    () => [...new Set(blogPosts.flatMap((post) => post.tags))].sort((a, b) => a.localeCompare(b, 'fr')),
    [],
  );

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  useEffect(() => {
    setSelectedTag(urlSelectedTag);
  }, [urlSelectedTag]);

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);

    if (searchQuery.trim()) {
      nextParams.set('q', searchQuery.trim());
    } else {
      nextParams.delete('q');
    }

    if (selectedTag) {
      nextParams.set('tag', selectedTag);
    } else {
      nextParams.delete('tag');
    }

    const nextSearch = nextParams.toString();
    const currentSearch = searchParams.toString();

    if (routeTag) {
      navigate(
        {
          pathname: '/blog',
          search: nextSearch ? `?${nextSearch}` : '',
        },
        { replace: true },
      );
      return;
    }

    if (nextSearch !== currentSearch) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [navigate, routeTag, searchParams, searchQuery, selectedTag, setSearchParams]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(searchQuery);

    return blogPosts.filter((post) => {
      const matchesQuery =
        !normalizedQuery ||
        [post.title, post.description, post.classification, post.source ?? '', post.tags.join(' ')]
          .map(normalizeSearchValue)
          .some((value) => value.includes(normalizedQuery));

      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesQuery && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedTag]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);
  const visibleTags = showAllTags ? availableTags : availableTags.slice(0, 10);
  const hasMoreThanTenTags = availableTags.length > 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag(undefined);
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
            {selectedTag ? `Tag : #${selectedTag}` : t('blog.title')}
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-mono">
            {selectedTag ? `Exploration taxonomique des dossiers associés au tag #${selectedTag}.` : t('blog.subtitle')}
          </p>

          <div className="mx-auto mt-8 max-w-4xl rounded-lg border border-border bg-card/60 p-3 md:p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Rechercher par titre, description, classification, source ou tag..."
                className="pl-9 font-mono"
                aria-label="Rechercher dans les dossiers"
              />
            </div>

            <div className="mt-3">
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedTag(undefined)}
                  className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  aria-pressed={!selectedTag}
                >
                  <Badge
                    variant={selectedTag ? 'outline' : 'default'}
                    className="h-7 cursor-pointer px-3 text-[11px] font-mono uppercase leading-none"
                  >
                    Tous les tags
                  </Badge>
                </button>

                {visibleTags.map((tagOption) => {
                  const isActive = selectedTag === tagOption;

                  return (
                    <button
                      key={tagOption}
                      type="button"
                      onClick={() => setSelectedTag(isActive ? undefined : tagOption)}
                      className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      aria-pressed={isActive}
                    >
                      <Badge
                        variant={isActive ? 'default' : 'outline'}
                        className="h-7 cursor-pointer px-3 text-[11px] font-mono lowercase leading-none"
                      >
                        <Hash className="mr-1 h-3 w-3" />
                        {tagOption}
                      </Badge>
                    </button>
                  );
                })}
              </div>
            </div>

            {hasMoreThanTenTags && (
              <div className="mt-2 text-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs font-mono"
                  onClick={() => setShowAllTags((prev) => !prev)}
                >
                  {showAllTags ? 'Afficher moins' : 'Afficher plus'}
                </Button>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-xs text-muted-foreground font-mono">
            <Files className="w-4 h-4" />
            <span>{filteredPosts.length} dossiers disponibles</span>
            {(selectedTag || searchQuery.trim()) && (
              <>
                <span aria-hidden="true">•</span>
                {selectedTag && (
                  <Badge variant="outline" className="h-6 px-2 font-mono lowercase">
                    <Hash className="w-3 h-3 mr-1" />
                    {selectedTag}
                  </Badge>
                )}
                {searchQuery.trim() && (
                  <Badge variant="outline" className="h-6 px-2 font-mono normal-case">
                    <Search className="w-3 h-3 mr-1" />
                    {searchQuery.trim()}
                  </Badge>
                )}
                <Button variant="outline" size="sm" className="ml-1 h-7 px-2.5 font-mono text-[11px]" onClick={clearFilters}>
                  <X className="w-3 h-3 mr-1" />
                  Effacer les filtres
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
              <Search className="w-6 h-6" />
            </div>
            <h2 className="text-xl text-foreground mb-2">Aucun dossier ne correspond à votre recherche</h2>
            <p className="text-muted-foreground mb-4">
              Ajustez votre requête ou retirez un filtre de tag pour afficher à nouveau les dossiers déclassifiés.
            </p>
            <Button variant="outline" className="font-mono" onClick={clearFilters}>
              Réinitialiser les filtres
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
