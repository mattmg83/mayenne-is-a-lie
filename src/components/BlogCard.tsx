import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Hash } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  classification: string;
  slug: string;
  tags?: string[];
}

interface BlogCardProps {
  post: BlogPost;
}

const MAX_VISIBLE_TAGS = 3;

export const BlogCard = ({ post }: BlogCardProps) => {
  const { t } = useTranslation();
  const visibleTags = post.tags?.slice(0, MAX_VISIBLE_TAGS) ?? [];
  const hiddenTagCount = Math.max((post.tags?.length ?? 0) - visibleTags.length, 0);

  return (
    <Card className="bg-card border-border document-shadow hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2 gap-4">
          <Badge
            variant={post.classification === 'CONFIDENTIEL' ? 'destructive' : 'secondary'}
            className="font-mono text-xs"
          >
            {post.classification}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono shrink-0">
            <Calendar className="w-3 h-3" />
            {post.date}
          </div>
        </div>

        <CardTitle className="text-lg font-mono text-foreground group-hover:text-classified transition-colors">
          {post.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-4 space-y-4">
        <CardDescription className="font-mono text-sm leading-relaxed text-muted-foreground">
          {post.description}
        </CardDescription>

        {visibleTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 text-[11px] uppercase tracking-wide text-muted-foreground font-mono">
              <Hash className="w-3 h-3" />
              Tags
            </div>

            {visibleTags.map((tag) => (
              <Link key={tag} to={`/blog/tag/${encodeURIComponent(tag)}`}>
                <Badge
                  variant="outline"
                  className="font-mono text-[11px] lowercase hover:border-classified hover:text-classified transition-colors"
                >
                  #{tag}
                </Badge>
              </Link>
            ))}

            {hiddenTagCount > 0 && (
              <Badge variant="secondary" className="font-mono text-[11px]">
                +{hiddenTagCount}
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        <Link to={`/blog/${post.slug}`} className="w-full">
          <Button
            variant="outline"
            className="w-full font-mono text-xs hover:bg-classified hover:text-classified-foreground hover:border-classified transition-all"
          >
            <FileText className="w-4 h-4 mr-2" />
            {t('blog.readMore')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
