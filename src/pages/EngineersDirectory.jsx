import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  ShieldCheck, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Code2, 
  X, 
  CheckCircle, 
  Star,
  GitBranch
} from 'lucide-react';
import { getStorageData, DEFAULT_DEVS, DEFAULT_BENCHMARKS } from '../services/mockStorage';
import { useLanguage } from '../context/LanguageContext';
import UserAvatar from '../components/UserAvatar';

export default function EngineersDirectory() {
  const { t, lang } = useLanguage();
  const [devs] = useState(() => getStorageData('promptcraft_verified_devs', DEFAULT_DEVS));
  const [benchmarks] = useState(() => getStorageData('promptcraft_benchmarks', DEFAULT_BENCHMARKS));
  const [selectedProfile, setSelectedProfile] = useState(null);

  const getLocalizedDev = (person) => {
    const fallback = DEFAULT_DEVS.find(d => d.id === person.id) || {};
    if (lang === 'vi') return person;
    return {
      ...person,
      bio: person.bioEn || fallback.bioEn || person.bio,
      specialties: person.specialtiesEn || fallback.specialtiesEn || person.specialties,
    };
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-[var(--border-subtle)] pb-5 space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider px-3 py-1 rounded-full craft-card">
          <Users className="w-3.5 h-3.5 text-indigo-400" />
          <span>{lang === 'vi' ? 'ĐỘI NGŨ KỸ SƯ & QUẢN TRỊ VIÊN' : 'CERTIFIED ENGINEERS & ADMINISTRATORS'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)]">
          {t.directory.title}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          {t.directory.subtitle}
        </p>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {devs.map((rawPerson) => {
          const person = getLocalizedDev(rawPerson);

          return (
            <div
              key={person.id}
              onClick={() => setSelectedProfile(rawPerson)}
              className="craft-card p-5 space-y-4 cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3.5">
                  <UserAvatar
                    avatar={person.avatar}
                    name={person.name}
                    size="w-12 h-12"
                  />
                  <div>
                    <div className="font-semibold text-sm text-[var(--text-primary)] group-hover:text-indigo-400 transition-colors flex items-center space-x-1.5">
                      <span>{person.name}</span>
                      {person.isAdmin ? (
                        <ShieldCheck className="w-4 h-4 text-emerald-400" title="Platform Admin" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5 text-indigo-400" title="Verified Dev" />
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-[var(--text-muted)] block mt-0.5">
                      {person.role}
                    </span>
                  </div>
                </div>

                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  person.isAdmin 
                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60' 
                    : 'bg-indigo-950/40 text-indigo-300 border-indigo-800/60'
                }`}>
                  {person.tier}
                </span>
              </div>

              <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                {person.bio}
              </p>

              {/* Specialties Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {person.specialties?.slice(0, 2).map((s, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                    {s}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span>{t.directory.certId} <code className="text-[var(--text-secondary)]">{person.certificateId}</code></span>
                <span className="text-indigo-400 font-semibold group-hover:underline flex items-center space-x-1">
                  <span>{lang === 'vi' ? 'Xem Profile' : 'View Profile'}</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Profile Detail Modal */}
      {selectedProfile && (() => {
        const localizedSelected = getLocalizedDev(selectedProfile);
        return (
        <div 
          onClick={() => setSelectedProfile(null)}
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="craft-card max-w-xl w-full p-6 sm:p-7 space-y-6 animate-scaleIn !bg-[var(--bg-surface)]"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <UserAvatar
                  avatar={localizedSelected.avatar}
                  name={localizedSelected.name}
                  size="w-16 h-16"
                  className="rounded-2xl"
                />
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-lg font-bold text-[var(--text-primary)]">{localizedSelected.name}</h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-indigo-400 border border-indigo-800/60">
                      {localizedSelected.certificateId}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[var(--text-muted)]">{localizedSelected.role}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedProfile(null)}
                className="neu-button p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bio */}
            <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs text-[var(--text-primary)] leading-relaxed space-y-2">
              <div className="text-[10px] font-mono uppercase text-[var(--text-muted)] font-semibold">
                {lang === 'vi' ? 'Tiểu Sử Chuyên Môn' : 'Professional Bio'}
              </div>
              <p>{localizedSelected.bio}</p>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono uppercase text-[var(--text-muted)] font-semibold">
                {lang === 'vi' ? 'Lĩnh Vực Chuyên Sâu' : 'Core Specialties'}
              </div>
              <div className="flex flex-wrap gap-2">
                {localizedSelected.specialties?.map((spec, i) => (
                  <span key={i} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)]">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                <div className="text-[10px] font-mono text-[var(--text-muted)]">PROMPTS</div>
                <div className="text-base font-bold text-[var(--text-primary)] font-mono mt-0.5">{localizedSelected.promptsShared}</div>
              </div>
              <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                <div className="text-[10px] font-mono text-[var(--text-muted)]">{lang === 'vi' ? 'UY TÍN' : 'REPUTATION'}</div>
                <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">{localizedSelected.reputation}%</div>
              </div>
              <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                <div className="text-[10px] font-mono text-[var(--text-muted)]">{lang === 'vi' ? 'PHÂN HẠNG' : 'TIER'}</div>
                <div className="text-xs font-bold text-indigo-400 font-mono mt-1">{localizedSelected.tier}</div>
              </div>
            </div>

            {/* GitHub Link */}
            <div className="pt-2 flex justify-between items-center text-xs font-mono">
              <a
                href={localizedSelected.github}
                target="_blank"
                rel="noreferrer"
                className="neu-button px-4 py-2 flex items-center space-x-2 text-[var(--text-primary)]"
              >
                <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
                <span>GitHub Profile</span>
                <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
              </a>

              <button
                onClick={() => setSelectedProfile(null)}
                className="neu-button px-5 py-2 text-[var(--text-primary)] font-semibold"
              >
                {lang === 'vi' ? 'Đóng' : 'Close'}
              </button>
            </div>
          </div>
        </div>
        );
      })()}
    </div>
  );
}
