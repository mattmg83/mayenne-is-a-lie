import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, FileX, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          {/* Classification Badge */}
          <Badge variant="destructive" className="bg-classified text-classified-foreground px-4 py-2 font-mono tracking-wider mb-6">
            <AlertTriangle className="w-4 h-4 mr-2" />
            ACCÈS REFUSÉ
          </Badge>

          {/* Error Code */}
          <div className="text-8xl md:text-9xl font-mono font-bold text-classified mb-4 classified-glow">
            404
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-mono font-bold text-foreground mb-4">
            DOSSIER SUPPRIMÉ
          </h1>

          {/* Description */}
          <p className="text-muted-foreground font-mono mb-8 leading-relaxed">
            Ce dossier a été <span className="redacted">██████████</span> par les autorités compétentes. 
            L'accès à cette information est <span className="text-classified font-bold">CLASSIFIÉ</span>.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/">
              <Button 
                className="bg-classified hover:bg-classified/90 text-classified-foreground font-mono tracking-wider px-8 classified-glow"
              >
                <Eye className="w-4 h-4 mr-2" />
                RETOUR SÉCURISÉ
              </Button>
            </Link>
            
            <Link to="/blog">
              <Button 
                variant="outline" 
                className="border-border hover:bg-muted font-mono tracking-wider px-8"
              >
                <FileX className="w-4 h-4 mr-2" />
                AUTRES DOSSIERS
              </Button>
            </Link>
          </div>

          {/* Warning Box */}
          <div className="mt-12 p-6 border border-border bg-card/50 backdrop-blur-sm document-shadow">
            <div className="flex items-start gap-3 text-left">
              <AlertTriangle className="w-5 h-5 text-destructive mt-0.5" />
              <div className="text-sm font-mono">
                <p className="text-destructive font-bold mb-2">AVERTISSEMENT DE SÉCURITÉ</p>
                <p className="text-muted-foreground">
                  Votre tentative d'accès à cette URL a été enregistrée. Si vous disposez 
                  d'informations concernant l'existence de ce dossier, contactez nos sources anonymes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
