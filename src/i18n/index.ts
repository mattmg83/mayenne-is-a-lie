import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Define translation resources
const resources = {
  fr: {
    translation: {
      // Navigation
      "nav.home": "Accueil",
      "nav.blog": "Preuves",
      "nav.about": "À Propos",
      
      // Hero section
      "hero.title": "LA MAYENNE N'EXISTE PAS",
      "hero.subtitle": "Dossier DÉCLASSIFIÉ",
      "hero.description": "Depuis des décennies, l'État français vous ment. La région appelée \"Mayenne\" n'est qu'une fabrication gouvernementale pour dissimuler la vérité.",
      "hero.cta": "DÉCOUVRIR LA VÉRITÉ",
      
      // Blog section
      "blog.title": "DOSSIERS DÉCLASSIFIÉS",
      "blog.subtitle": "Les preuves que l'État ne veut pas que vous voyiez",
      "blog.readMore": "Lire le dossier complet",
      "blog.datePrefix": "Déclassifié le",
      
      // Footer
      "footer.disclaimer": "Ce site présente des faits alternatifs à des fins de divertissement. La Mayenne existe probablement.",
      "footer.language": "Langue",
      
      // About
      "about.title": "LA VÉRITÉ SUR NOTRE MISSION",
      "about.content": "Nous sommes un groupe de chercheurs indépendants déterminés à exposer la plus grande conspiration de l'histoire française moderne : l'inexistence de la Mayenne.",
      
      // Common
      "common.classified": "CONFIDENTIEL",
      "common.declassified": "DÉCLASSIFIÉ",
      "common.topSecret": "SECRET DÉFENSE"
    }
  },
  en: {
    translation: {
      // Navigation  
      "nav.home": "Home",
      "nav.blog": "Evidence",
      "nav.about": "About",
      
      // Hero section
      "hero.title": "MAYENNE DOES NOT EXIST",
      "hero.subtitle": "DECLASSIFIED FILE",
      "hero.description": "For decades, the French state has been lying to you. The region called \"Mayenne\" is just a government fabrication to hide the truth.",
      "hero.cta": "DISCOVER THE TRUTH",
      
      // Blog section
      "blog.title": "DECLASSIFIED FILES",
      "blog.subtitle": "The evidence the State doesn't want you to see",
      "blog.readMore": "Read full file",
      "blog.datePrefix": "Declassified on",
      
      // Footer
      "footer.disclaimer": "This site presents alternative facts for entertainment purposes. Mayenne probably exists.",
      "footer.language": "Language",
      
      // About
      "about.title": "THE TRUTH ABOUT OUR MISSION", 
      "about.content": "We are a group of independent researchers determined to expose the greatest conspiracy in modern French history: the non-existence of Mayenne.",
      
      // Common
      "common.classified": "CLASSIFIED",
      "common.declassified": "DECLASSIFIED", 
      "common.topSecret": "TOP SECRET"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr',
    debug: false,
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  });

export default i18n;