import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher({ compact = false, className = '' }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`inline-flex items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-0.5 text-xs font-mono select-none ${className}`}>
      {!compact && (
        <span className="flex items-center px-1.5 text-[var(--text-muted)] pointer-events-none">
          <Globe className="w-3.5 h-3.5 mr-1 text-indigo-400" />
        </span>
      )}
      <button
        type="button"
        onClick={() => setLang('vi')}
        aria-label="Chuyển sang Tiếng Việt"
        className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer flex items-center space-x-1 ${
          lang === 'vi'
            ? 'bg-indigo-600 text-white shadow-xs'
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
        className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer flex items-center space-x-1 ${
          lang === 'en'
            ? 'bg-indigo-600 text-white shadow-xs'
            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-page)]'
        }`}
      >
        <span>🇬🇧</span>
        <span>EN</span>
      </button>
    </div>
  );
}
