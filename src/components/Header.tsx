import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link, useLocation } from 'react-router-dom';
import { Eye, Globe, FileText } from 'lucide-react';
import conspiracyLogo from '@/assets/assets_task_01k3mftsv6e659xbrj000e7d43_1756255719_img_1.webp';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 flex items-center justify-center">
              <img src={conspiracyLogo} alt="La Mayenne Conspiracy Logo" className="w-10 h-10 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-sm font-bold text-foreground">
                LA MAYENNE
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                N'EXISTE PAS
              </span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-mono transition-colors hover:text-classified ${
                isActive('/') ? 'text-classified' : 'text-muted-foreground'
              }`}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/blog"
              className={`text-sm font-mono transition-colors hover:text-classified ${
                isActive('/blog') ? 'text-classified' : 'text-muted-foreground'
              }`}
            >
              {t('nav.blog')}
            </Link>
            <Link
              to="/about"
              className={`text-sm font-mono transition-colors hover:text-classified ${
                isActive('/about') ? 'text-classified' : 'text-muted-foreground'
              }`}
            >
              {t('nav.about')}
            </Link>
            <a
              href="https://la-mayenne-nexiste-pas.tpopsite.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono transition-colors hover:text-classified text-muted-foreground"
            >
              {t('nav.shop')}
            </a>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <Select value={i18n.language} onValueChange={changeLanguage}>
              <SelectTrigger className="w-20 h-8 text-xs border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fr" className="text-xs">FR</SelectItem>
                <SelectItem value="en" className="text-xs">EN</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
};