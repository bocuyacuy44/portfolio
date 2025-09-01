import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import enTranslations from '../locales/en.json';
import idTranslations from '../locales/id.json';

type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: enTranslations,
  id: idTranslations,
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Force default language to Indonesian and ignore stored preference for now
  const [language, setLanguage] = useState<Language>('id');

  // Disabled: loading language from localStorage
  // useEffect(() => {
  //   const savedLanguage = localStorage.getItem('language') as Language;
  //   if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'id')) {
  //     setLanguage(savedLanguage);
  //   }
  // }, []);

  // Disabled: persisting language to localStorage
  // useEffect(() => {
  //   localStorage.setItem('language', language);
  // }, [language]);

  // Translation function
  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key "${key}" not found for language "${language}"`);
        return key; // Return the key if translation not found
      }
    }

    return value;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};