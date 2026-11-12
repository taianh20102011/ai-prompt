import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Terminal, 
  Shield, 
  GitBranch, 
  BookOpen, 
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Compass,
  Cpu,
  Bot,
  KeyRound,
  ShieldCheck,
  Sun,
  Moon,
  Users
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ShinyText from './react-bits/ShinyText';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const publicLinks = [
    { name: 'Prompt Inspector', path: '/', icon: Compass, badge: 'Core' },
    { name: 'Cortex Bot (Trained)', path: '/trained-bot', icon: Bot, badge: 'Free ∞' },
    { name: 'Đội Ngũ Devs & Admins', path: '/directory', icon: Users, badge: 'Profiles' },
    { name: 'GitHub AI Ledger', path: '/news', icon: GitBranch, badge: 'Live' },
    { name: 'Research Papers', path: '/research-guide', icon: BookOpen },
  ];

  const privilegedLinks = [
    { name: 'Kỹ Sư Kiểm Định', path: '/dev-studio', icon: Terminal, role: 'Enclave' },
    { name: 'Hệ Thống Quản Trị', path: '/admin-portal', icon: ShieldCheck, role: 'Auth' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg craft-card text-neutral-300 shadow-md"
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-xs"
        />
      )}

      {/* Sidebar Root */}
      <aside
        className={`fixed top-0 left-0 h-screen z-40 transition-[width,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] craft-card !border-r !border-t-0 !border-b-0 !border-l-0 !rounded-none flex flex-col justify-between ${
          mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
        } ${
          isCollapsed ? 'lg:w-[68px]' : 'lg:w-64'
        }`}
      >
        {/* App Title Header */}
        <div className={`h-14 border-b border-[var(--border-subtle)] px-3 flex items-center ${
          isCollapsed && !mobileOpen ? 'justify-center' : 'justify-between'
        }`}>
          <Link 
            to="/" 
            onClick={() => setMobileOpen(false)}
            className={`flex items-center ${
              isCollapsed && !mobileOpen ? 'justify-center' : 'space-x-2.5 overflow-hidden'
            }`}
            title="PromptCraft Studio"
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--text-primary)] text-[var(--bg-page)] font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
              PC
            </div>
            {(!isCollapsed || mobileOpen) && (
              <div className="truncate">
                <ShinyText text="PromptCraft" speed={4} className="text-sm font-semibold tracking-tight block" />
                <span className="text-[10px] text-[var(--text-muted)] font-mono tracking-wider uppercase block -mt-0.5">
                  Studio v2.4
                </span>
              </div>
            )}
          </Link>

          {/* Collapse Toggle Button (When Expanded) */}
          {(!isCollapsed || mobileOpen) && (
            <button
              onClick={() => setIsCollapsed(true)}
              className="hidden lg:flex w-7 h-7 rounded-md items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)] shrink-0 cursor-pointer transition-colors"
              title="Thu nhỏ Sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-3 px-2 space-y-4 overflow-y-auto">
          {/* Quick Expand Button When Collapsed (Cleanly separated, zero overlap) */}
          {isCollapsed && !mobileOpen && (
            <div className="flex justify-center pb-2 border-b border-[var(--border-subtle)]">
              <button
                onClick={() => setIsCollapsed(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)] transition-colors cursor-pointer"
                title="Mở rộng Sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
          {/* Public Group */}
          <div className="space-y-1">
            {(!isCollapsed || mobileOpen) && (
              <div className="px-2.5 pb-1 text-[10px] font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider">
                Platform
              </div>
            )}
            {publicLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  title={isCollapsed ? item.name : undefined}
                  className={`flex items-center rounded-md text-xs font-medium transition-all ${
                    isCollapsed && !mobileOpen ? 'justify-center p-2.5' : 'px-2.5 py-2 space-x-2.5'
                  } ${
                    isActive
                      ? 'bg-[var(--border-subtle)] text-[var(--text-primary)] font-semibold shadow-xs'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-[var(--text-muted)]'}`} />
                  {(!isCollapsed || mobileOpen) && (
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <span className="truncate">{item.name}</span>
                      {item.badge && (
                        <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Privileged Group */}
          <div className="space-y-1 pt-2 border-t border-[var(--border-subtle)]">
            {(!isCollapsed || mobileOpen) && (
              <div className="px-2.5 pb-1 text-[10px] font-mono font-medium text-[var(--text-muted)] uppercase tracking-wider flex items-center justify-between">
                <span>Privileged Access</span>
                <span className="text-[8px] text-[var(--text-muted)]">ZERO-TRUST</span>
              </div>
            )}
            {privilegedLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  title={isCollapsed ? item.name : undefined}
                  className={`flex items-center rounded-md text-xs font-medium transition-all ${
                    isCollapsed && !mobileOpen ? 'justify-center p-2.5' : 'px-2.5 py-2 space-x-2.5'
                  } ${
                    isActive
                      ? 'bg-[var(--border-subtle)] text-[var(--text-primary)] font-semibold border border-[var(--border-hover)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-500' : 'text-[var(--text-muted)]'}`} />
                  {(!isCollapsed || mobileOpen) && (
                    <div className="flex-1 flex items-center justify-between min-w-0">
                      <span className="truncate">{item.name}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                        {item.role}
                      </span>
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer Area with Theme Switcher & Status */}
        <div className="p-3 border-t border-[var(--border-subtle)] space-y-2">
          {/* Nút chuyển đổi Sáng / Tối */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between p-2 rounded-md hover:bg-[var(--border-subtle)] text-xs font-mono text-[var(--text-secondary)] transition-colors"
            title={`Chuyển sang chế độ ${theme === 'dark' ? 'Sáng' : 'Tối'}`}
          >
            <div className="flex items-center space-x-2">
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500" />
              )}
              {(!isCollapsed || mobileOpen) && (
                <span>Giao diện: {theme === 'dark' ? 'Tối (Dark)' : 'Sáng (Light)'}</span>
              )}
            </div>
            {(!isCollapsed || mobileOpen) && (
              <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">
                {theme}
              </span>
            )}
          </button>

          {/* Enclave Status */}
          {(!isCollapsed || mobileOpen) ? (
            <div className="p-2 rounded-md bg-[var(--bg-page)] border border-[var(--border-subtle)] text-[11px] font-mono flex items-center justify-between text-[var(--text-secondary)]">
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>SHA-256 Enclave</span>
              </span>
              <span className="text-emerald-500 text-[10px]">Secure</span>
            </div>
          ) : (
            <div className="flex justify-center pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Secure Enclave" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
