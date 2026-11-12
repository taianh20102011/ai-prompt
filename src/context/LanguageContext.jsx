import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('prompt_ai_pnit_lang');
      if (saved && (saved === 'vi' || saved === 'en')) {
        return saved;
      }
      // Check browser navigator language
      const browserLang = navigator.language || navigator.userLanguage || '';
      if (browserLang.toLowerCase().startsWith('vi')) {
        return 'vi';
      }
      return 'vi'; // Default to Vietnamese
    } catch {
      return 'vi';
    }
  });

  const setLang = (newLang) => {
    if (newLang === 'vi' || newLang === 'en') {
      setLangState(newLang);
      try {
        localStorage.setItem('prompt_ai_pnit_lang', newLang);
      } catch {}
    }
  };

  const toggleLanguage = () => {
    setLang(lang === 'vi' ? 'en' : 'vi');
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.vi;

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
