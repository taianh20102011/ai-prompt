import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Terminal, 
  GitBranch, 
  BookOpen, 
  ChevronLeft,
  Menu,
  X,
  Compass,
  Bot,
  Sun,
  Moon,
  Users,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { t, lang } = useLanguage();

  // Prevent background scrolling on mobile when navigation drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const publicLinks = [
    { name: t.nav.home, path: '/', icon: Sparkles, badge: 'Intro' },
    { name: t.nav.inspector, path: '/inspector', icon: Compass, badge: 'Core' },
    { name: t.nav.guide, path: '/guide', icon: HelpCircle, badge: 'Docs' },
    { name: t.nav.bot, path: '/trained-bot', icon: Bot, badge: 'Free ∞' },
    { name: t.nav.directory, path: '/directory', icon: Users, badge: 'Profiles' },
    { name: t.nav.joinTeam, path: '/dev-studio', icon: Terminal, badge: 'Dev' },
    { name: t.nav.repos, path: '/news', icon: GitBranch, badge: 'Live' },
    { name: t.nav.research, path: '/research-guide', icon: BookOpen },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg craft-card text-neutral-300 shadow-md cursor-pointer"
          aria-label="Open mobile navigation"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-xs transition-opacity duration-300"
        />
      )}

      {/* Sidebar Root */}
      <aside
        className={`fixed top-0 left-0 h-screen z-40 transition-[width,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,width] craft-card !border-r !border-t-0 !border-b-0 !border-l-0 !rounded-none flex flex-col justify-between overflow-x-hidden ${
          mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
        } ${
          isCollapsed ? 'lg:w-[68px]' : 'lg:w-64'
        }`}
      >
        {/* App Title Header */}
        <div className="h-14 border-b border-[var(--border-subtle)] px-3 flex items-center justify-between shrink-0">
          <div 
            onClick={() => isCollapsed && !mobileOpen && setIsCollapsed(false)}
            className={`flex items-center min-w-0 ${isCollapsed && !mobileOpen ? 'cursor-pointer mx-auto' : ''}`}
            title={isCollapsed && !mobileOpen ? t.common.expandSidebar : 'Prompt AI PNIT'}
          >
            <Link 
              to="/" 
              onClick={(e) => {
                if (isCollapsed && !mobileOpen) {
                  e.preventDefault();
                  setIsCollapsed(false);
                } else {
                  setMobileOpen(false);
                }
              }}
              className="w-9 h-9 rounded-lg bg-[var(--text-primary)] text-[var(--bg-page)] font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs hover:opacity-90 transition-opacity"
            >
              PNIT
            </Link>

            {/* Title with fluid opacity & max-width animation */}
            <div className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isCollapsed && !mobileOpen 
                ? 'max-w-0 opacity-0 -translate-x-3 pointer-events-none' 
                : 'max-w-[140px] opacity-100 translate-x-0 ml-2.5'
            }`}>
              <Link to="/" onClick={() => setMobileOpen(false)}>
                <span className="text-sm font-bold tracking-tight text-[var(--text-primary)] block truncate">
                  Prompt AI PNIT
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono tracking-wider uppercase block -mt-0.5 truncate">
                  Intelligence Suite
                </span>
              </Link>
            </div>
          </div>

          {/* Quick Collapse Button (Header - Visible when Expanded) */}
          <button
            onClick={() => setIsCollapsed(true)}
            className={`hidden lg:flex w-7 h-7 rounded-md items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)] shrink-0 cursor-pointer transition-all duration-300 ${
              isCollapsed && !mobileOpen ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100'
            }`}
            title={t.common.collapseSidebar}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-3 px-2 space-y-1 overflow-y-auto overflow-x-hidden">
          {/* Section Header */}
          <div className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isCollapsed && !mobileOpen ? 'max-h-0 opacity-0 mb-0' : 'max-h-6 opacity-100 mb-1'
          }`}>
            <div className="px-2.5 text-[10px] font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider">
              Platform
            </div>
          </div>

          {/* Nav Links */}
          {publicLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                title={isCollapsed && !mobileOpen ? item.name : undefined}
                className={`relative flex items-center h-10 rounded-lg text-xs font-medium transition-colors ${
                  isCollapsed && !mobileOpen ? 'justify-center px-0' : 'px-2.5'
                } ${
                  isActive
                    ? 'bg-[var(--border-subtle)] text-[var(--text-primary)] font-semibold shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-indigo-400' : 'text-[var(--text-muted)]'}`} />
                </div>
                
                {/* Fluid Label & Badge Container */}
                <div className={`flex items-center justify-between min-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isCollapsed && !mobileOpen 
                    ? 'max-w-0 opacity-0 -translate-x-2 ml-0 pointer-events-none' 
                    : 'max-w-[170px] opacity-100 translate-x-0 ml-2.5 flex-1'
                }`}>
                  <span className="truncate">{item.name}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)] shrink-0 ml-1.5">
                      {item.badge}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}

          {/* Dedicated Expand/Collapse Bar inside Nav */}
          <div className="pt-2 border-t border-[var(--border-subtle)]">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`w-full flex items-center h-10 rounded-lg text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors cursor-pointer ${
                isCollapsed && !mobileOpen ? 'justify-center px-0' : 'px-2.5'
              }`}
              title={isCollapsed && !mobileOpen ? t.common.expandSidebar : t.common.collapseSidebar}
            >
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isCollapsed && !mobileOpen ? 'rotate-180 text-indigo-400' : ''
                }`} />
              </div>
              <div className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isCollapsed && !mobileOpen 
                  ? 'max-w-0 opacity-0 -translate-x-2 ml-0 pointer-events-none' 
                  : 'max-w-[170px] opacity-100 translate-x-0 ml-2.5 flex-1'
              }`}>
                <span>{t.common.collapseSidebar}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Footer Area with Language, Theme Switcher & Status */}
        <div className="p-2.5 border-t border-[var(--border-subtle)] space-y-2 shrink-0">
          {/* Ngôn ngữ (Language Switcher) cross-fade */}
          <div className="overflow-hidden">
            {/* Expanded view */}
            <div className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
              isCollapsed && !mobileOpen ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-12 opacity-100'
            }`}>
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-mono text-[var(--text-muted)]">{t.common.language}:</span>
                <LanguageSwitcher compact={false} />
              </div>
            </div>

            {/* Collapsed view */}
            <div className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden flex justify-center ${
              isCollapsed && !mobileOpen ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
            }`}>
              <LanguageSwitcher compact={true} />
            </div>
          </div>

          {/* Nút chuyển đổi Sáng / Tối */}
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center h-10 rounded-lg hover:bg-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] transition-colors cursor-pointer ${
              isCollapsed && !mobileOpen ? 'justify-center px-0' : 'px-2.5'
            }`}
            title={`Chuyển sang chế độ ${theme === 'dark' ? t.common.light : t.common.dark}`}
          >
            <div className="w-5 h-5 flex items-center justify-center shrink-0">
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500" />
              )}
            </div>
            <div className={`flex items-center justify-between min-w-0 overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isCollapsed && !mobileOpen 
                ? 'max-w-0 opacity-0 -translate-x-2 ml-0 pointer-events-none' 
                : 'max-w-[170px] opacity-100 translate-x-0 ml-2.5 flex-1'
            }`}>
              <span className="truncate">{t.common.theme}: {theme === 'dark' ? t.common.dark : t.common.light}</span>
              <span className="text-[10px] uppercase font-bold text-[var(--text-muted)] ml-1">
                {theme}
              </span>
            </div>
          </button>

          {/* Author Badge */}
          <div className={`overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isCollapsed && !mobileOpen ? 'max-h-0 opacity-0 py-0 pointer-events-none' : 'max-h-8 opacity-100 py-1'
          }`}>
            <div className="px-2 text-[10px] font-mono text-[var(--text-muted)] flex items-center justify-between">
              <span>{t.common.author}:</span>
              <span className="text-[var(--text-primary)] font-semibold">{t.common.authorName}</span>
            </div>
          </div>

          {/* Enclave & reCAPTCHA v3 Status cross-fade */}
          <div className="overflow-hidden">
            {/* Expanded Status Cards */}
            <div className={`space-y-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
              isCollapsed && !mobileOpen ? 'max-h-0 opacity-0 pointer-events-none' : 'max-h-24 opacity-100'
            }`}>
              <div className="p-2 rounded-md bg-[var(--bg-page)] border border-[var(--border-subtle)] text-[10px] font-mono flex items-center justify-between text-[var(--text-secondary)]">
                <span className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Google reCAPTCHA v3</span>
                </span>
                <span className="text-emerald-500 text-[10px] font-bold">Active</span>
              </div>
              <div className="p-1.5 rounded-md bg-[var(--bg-page)] border border-[var(--border-subtle)] text-[10px] font-mono flex items-center justify-between text-[var(--text-muted)]">
                <span>SHA-256 Enclave</span>
                <span className="text-indigo-400">Secure</span>
              </div>
            </div>

            {/* Collapsed Pill Indicator */}
            <div className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden flex justify-center ${
              isCollapsed && !mobileOpen ? 'max-h-8 opacity-100 pt-1' : 'max-h-0 opacity-0 pointer-events-none'
            }`} title="Google reCAPTCHA v3 & SHA-256 Enclave Secure">
              <div className="w-8 h-8 rounded-lg bg-[var(--bg-page)] border border-[var(--border-subtle)] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
