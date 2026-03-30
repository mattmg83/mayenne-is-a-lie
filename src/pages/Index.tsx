import { Hero } from '@/components/Hero';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const SHOP_URL = 'https://la-mayenne-nexiste-pas.tpopsite.com/';

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />

      <section className="container mx-auto px-4 pb-16 -mt-6 relative z-20">
        <div className="max-w-4xl mx-auto border border-border bg-card/90 backdrop-blur-sm rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between document-shadow">
          <p className="text-base sm:text-lg font-mono text-foreground">
            {t('promo.merchLine')}
          </p>

          <Button asChild className="font-mono tracking-wider whitespace-nowrap">
            <a href={SHOP_URL} target="_blank" rel="noopener noreferrer">
              {t('promo.shopCta')}
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
