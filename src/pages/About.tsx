import { useTranslation } from 'react-i18next';
import { Header } from '@/components/Header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Users, FileSearch, Globe, AlertTriangle } from 'lucide-react';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="destructive" className="bg-classified text-classified-foreground px-4 py-2 font-mono tracking-wider mb-4">
            <AlertTriangle className="w-4 h-4 mr-2" />
            {t('common.declassified')}
          </Badge>
          
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-foreground mb-4">
            {t('about.title')}
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-mono leading-relaxed">
            {t('about.content')}
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="bg-card border-border document-shadow">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 bg-classified/10 rounded-lg flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-classified" />
              </div>
              <CardTitle className="font-mono text-foreground">Surveillance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="font-mono text-sm text-muted-foreground">
                Nous surveillons en permanence les communications officielles pour détecter 
                les mentions de cette région fictive dans les documents gouvernementaux.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card border-border document-shadow">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 bg-classified/10 rounded-lg flex items-center justify-center mb-4">
                <FileSearch className="w-6 h-6 text-classified" />
              </div>
              <CardTitle className="font-mono text-foreground">Investigation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="font-mono text-sm text-muted-foreground">
                Nos enquêteurs analysent les documents, cartes, et témoignages pour 
                exposer les incohérences dans la narrative officielle mayennaise.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card border-border document-shadow">
            <CardHeader className="pb-3">
              <div className="w-12 h-12 bg-classified/10 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-classified" />
              </div>
              <CardTitle className="font-mono text-foreground">Diffusion</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="font-mono text-sm text-muted-foreground">
                Nous publions nos découvertes pour informer le public français et international 
                de cette manipulation géographique sans précédent.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-mono font-bold text-foreground mb-8 text-center">
            NOTRE ÉQUIPE
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <span className="font-mono font-bold text-classified">Agent X</span>
                  </div>
                  <div>
                    <h3 className="font-mono font-bold text-foreground">Dr. ████████</h3>
                    <p className="text-sm text-muted-foreground font-mono">Géographe en Chef</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-mono">
                  Ancien cartographe de l'IGN, ayant découvert les premières anomalies 
                  dans les relevés topographiques de la zone "Mayenne" en 2019.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <span className="font-mono font-bold text-classified">Agent Y</span>
                  </div>
                  <div>
                    <h3 className="font-mono font-bold text-foreground">Prof. ██████</h3>
                    <p className="text-sm text-muted-foreground font-mono">Analyste Economique</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground font-mono">
                  Spécialiste en finances publiques, expert dans l'analyse des flux 
                  budgétaires vers les régions administratives françaises.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Warning */}
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-destructive mt-1" />
                <div>
                  <h3 className="font-mono font-bold text-destructive mb-2">
                    AVERTISSEMENT DE SÉCURITÉ
                  </h3>
                  <p className="text-sm text-muted-foreground font-mono mb-4">
                    En raison de la nature sensible de nos investigations, nous ne pouvons 
                    révéler l'identité complète de nos membres. Plusieurs de nos enquêteurs 
                    ont déjà fait l'objet de pressions gouvernementales.
                  </p>
                  <p className="text-sm text-muted-foreground font-mono">
                    <strong className="text-destructive">Contact:</strong> Pour nous transmettre 
                    des informations, utilisez uniquement des canaux chiffrés anonymes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-muted-foreground font-mono max-w-2xl mx-auto">
            {t('footer.disclaimer')}
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;