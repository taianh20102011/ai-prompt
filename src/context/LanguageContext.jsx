import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { TRANSLATIONS } from '../data/translations';

export const SITE_CONTENT_STORAGE_KEY = 'promptcraft_site_content_overrides';

const LanguageContext = createContext();

function loadSiteOverrides() {
  try {
    const raw = localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function getMergedTranslations(langCode, overrides) {
  const base = TRANSLATIONS[langCode] || TRANSLATIONS.vi;
  const langOverrides = overrides?.[langCode];
  if (!langOverrides || typeof langOverrides !== 'object') {
    return base;
  }

  const merged = { ...base };
  for (const sectionKey of Object.keys(base)) {
    const baseSection = base[sectionKey];
    const overrideSection = langOverrides[sectionKey];
    if (baseSection && typeof baseSection === 'object' && overrideSection && typeof overrideSection === 'object') {
      merged[sectionKey] = { ...baseSection, ...overrideSection };
    }
  }
  return merged;
}

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

  const [siteOverrides, setSiteOverrides] = useState(() => loadSiteOverrides());

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === SITE_CONTENT_STORAGE_KEY) {
        setSiteOverrides(loadSiteOverrides());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const persistOverrides = (nextOverrides) => {
    setSiteOverrides(nextOverrides);
    try {
      if (!nextOverrides || Object.keys(nextOverrides).length === 0) {
        localStorage.removeItem(SITE_CONTENT_STORAGE_KEY);
      } else {
        localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(nextOverrides));
      }
    } catch {}
  };

  const updateSiteSection = (langCode, sectionKey, sectionData) => {
    const baseSection = TRANSLATIONS[langCode]?.[sectionKey] || {};
    const diff = {};
    for (const [key, val] of Object.entries(sectionData || {})) {
      if (val !== undefined && val !== baseSection[key]) {
        diff[key] = val;
      }
    }

    const next = { ...siteOverrides };
    const nextLang = { ...(next[langCode] || {}) };
    if (Object.keys(diff).length === 0) {
      delete nextLang[sectionKey];
    } else {
      nextLang[sectionKey] = diff;
    }

    if (Object.keys(nextLang).length === 0) {
      delete next[langCode];
    } else {
      next[langCode] = nextLang;
    }
    persistOverrides(next);
  };

  const resetSiteSection = (langCode, sectionKey) => {
    const next = { ...siteOverrides };
    if (next[langCode]) {
      const nextLang = { ...next[langCode] };
      delete nextLang[sectionKey];
      if (Object.keys(nextLang).length === 0) {
        delete next[langCode];
      } else {
        next[langCode] = nextLang;
      }
    }
    persistOverrides(next);
  };

  const resetAllSiteContent = () => {
    persistOverrides({});
  };

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

  const t = useMemo(() => getMergedTranslations(lang, siteOverrides), [lang, siteOverrides]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLanguage,
        t,
        siteOverrides,
        rawTranslations: TRANSLATIONS,
        updateSiteSection,
        resetSiteSection,
        resetAllSiteContent
      }}
    >
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
