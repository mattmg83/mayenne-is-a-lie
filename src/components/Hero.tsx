import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileX, AlertTriangle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-french-government.jpg';

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Classification Badge */}
          <div className="mb-8 flex justify-center">
            <Badge variant="destructive" className="bg-classified text-classified-foreground px-6 py-2 text-sm font-mono tracking-wider classified-glow declassified-stamp">
              <AlertTriangle className="w-4 h-4 mr-2" />
              {t('hero.subtitle')}
            </Badge>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold text-foreground mb-6 leading-tight">
            <span className="typewriter">
              {t('hero.title')}
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 font-mono leading-relaxed">
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/blog">
              <Button 
                size="lg" 
                className="bg-classified hover:bg-classified/90 text-classified-foreground font-mono tracking-wider px-8 py-3 classified-glow"
              >
                <FileX className="w-5 h-5 mr-2" />
                {t('hero.cta')}
              </Button>
            </Link>
            
            <Link to="/about">
              <Button 
                variant="outline" 
                size="lg"
                className="border-border hover:bg-muted font-mono tracking-wider px-8 py-3"
              >
                <Eye className="w-5 h-5 mr-2" />
                {t('nav.about')}
              </Button>
            </Link>
          </div>

          {/* Redacted Info */}
          <div className="mt-12 p-6 border border-border bg-card/50 backdrop-blur-sm document-shadow">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-mono">
              <div>
                <span className="text-muted-foreground">Classification:</span>
                <span className="ml-2 text-classified font-bold">{t('common.topSecret')}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Origine:</span>
                <span className="ml-2 redacted">████████████</span>
              </div>
              <div>
                <span className="text-muted-foreground">Date:</span>
                <span className="ml-2 redacted">██/██/████</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};