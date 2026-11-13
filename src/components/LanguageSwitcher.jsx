import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ compact = false, className = '' }) {
  const { lang, setLang } = useLanguage();

  if (compact) {
    return (
      <button
        type="button"
        onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
        className={`w-9 h-9 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:bg-[var(--border-subtle)] flex items-center justify-center text-sm transition-colors cursor-pointer ${className}`}
        title={lang === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
      >
        <span>{lang === 'vi' ? '🇻🇳' : '🇬🇧'}</span>
      </button>
    );
  }

  return (
    <div className={`inline-flex items-center rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-0.5 text-xs select-none ${className}`}>
      <span className="hidden sm:flex items-center px-1.5 text-[var(--text-muted)] pointer-events-none">
        <Globe className="w-3.5 h-3.5 mr-1 text-blue-500" />
      </span>
      <button
        type="button"
        onClick={() => setLang('vi')}
        aria-label="Chuyển sang Tiếng Việt"
        className={`px-2 py-1 rounded-[6px] text-[11px] font-semibold transition-colors cursor-pointer flex items-center space-x-1 ${
          lang === 'vi'
            ? 'bg-[#2563EB] text-white'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-page)]'
        }`}
      >
        <span>🇻🇳</span>
        <span>VI</span>
      </button>

      <button
        type="button"
        onClick={() => setLang('en')}
        aria-label="Switch to English"
        className={`px-2 py-1 rounded-[6px] text-[11px] font-semibold transition-colors cursor-pointer flex items-center space-x-1 ${
          lang === 'en'
            ? 'bg-[#2563EB] text-white'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-page)]'
        }`}
      >
        <span>🇬🇧</span>
        <span>EN</span>
      </button>
    </div>
  );
}
