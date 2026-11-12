import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  GitBranch, 
  BookOpen, 
  Flame, 
  Bell, 
  CheckCircle2,
  Lock,
  ChevronRight
} from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [newsAlert, setNewsAlert] = useState(false);

  useEffect(() => {
    // Giả lập thông báo khi có repo AI mới
    const timer = setTimeout(() => {
      setNewsAlert(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { name: 'Khám Phá & Phân Tích', path: '/', icon: Sparkles },
    { name: 'Tin Tức GitHub AI', path: '/news', icon: GitBranch, badge: newsAlert ? 'Mới' : null },
    { name: 'Đọc Nghiên Cứu AI', path: '/research-guide', icon: BookOpen },
    { name: 'Dev Studio (Chứng Chỉ)', path: '/dev-studio', icon: Terminal, role: 'Dev Only' },
    { name: 'Admin Portal', path: '/admin-portal', icon: ShieldCheck, role: 'Secret Key' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-sm">
              <div className="w-full h-full bg-[#0a0b10] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 group-hover:text-pink-400 transition-colors" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                Prompt AI PNIT
              </span>
              <span className="block text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                Intelligence Suite
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] uppercase font-bold bg-rose-500 text-white rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {item.role && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {item.role}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Status Pill */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Hệ thống AI: Hoạt động</span>
            </div>

            <Link
              to="/admin-portal"
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Key</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
