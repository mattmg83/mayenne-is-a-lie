import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  classification: string;
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const { t } = useTranslation();

  return (
    <Card className="bg-card border-border document-shadow hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <Badge 
            variant={post.classification === 'CONFIDENTIEL' ? 'destructive' : 'secondary'}
            className="font-mono text-xs"
          >
            {post.classification}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
            <Calendar className="w-3 h-3" />
            {post.date}
          </div>
        </div>
        
        <CardTitle className="text-lg font-mono text-foreground group-hover:text-classified transition-colors">
          {post.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pb-4">
        <CardDescription className="font-mono text-sm leading-relaxed text-muted-foreground">
          {post.description}
        </CardDescription>
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