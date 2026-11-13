import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Sparkles, 
  GitBranch, 
  Compass, 
  Bot, 
  BookOpen, 
  Terminal, 
  Users, 
  ExternalLink, 
  Lock, 
  Shield, 
  CheckCircle2,
  Cpu,
  Heart,
  HelpCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="mt-16 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs text-[var(--text-secondary)] transition-colors">
      {/* 1. Cột Liên Kết Chi Tiết */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Cột 1: Thông tin thương hiệu & Tác giả */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center font-mono">
              PNIT
            </div>
            <span className="text-sm font-bold text-[var(--text-primary)]">
              {t.brand.name}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-[var(--text-muted)]">
            {t.footer.brandDesc}
          </p>
          <div className="pt-1 text-[11px] space-y-1">
            <div>
              <span className="text-[var(--text-muted)]">{t.footer.authorPrefix} </span>
              <strong className="text-[var(--text-primary)]">{t.common.authorName}</strong>
            </div>
            <div>
              <span className="text-[var(--text-muted)]">{lang === 'vi' ? 'Giấy phép: ' : 'License: '}</span>
              <span className="text-indigo-400 font-semibold">Apache License 2.0</span>
            </div>
            <div>
              <a
                href="https://github.com/taianh20102011/ai-prompt"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 mt-1 transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>github.com/taianh20102011/ai-prompt</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Cột 2: Công cụ Trí tuệ Nhân tạo */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t.footer.colPlatform}</span>
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/guide" className="hover:text-[var(--text-primary)] transition-colors flex items-center space-x-1.5 text-indigo-400 font-medium">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{t.nav.guide}</span>
              </Link>
            </li>
            <li>
              <Link to="/inspector" className="hover:text-[var(--text-primary)] transition-colors flex items-center space-x-1.5">
                <Compass className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span>{t.nav.inspector}</span>
              </Link>
            </li>
            <li>
              <Link to="/trained-bot" className="hover:text-[var(--text-primary)] transition-colors flex items-center space-x-1.5">
                <Bot className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span>{t.nav.bot}</span>
              </Link>
            </li>
            <li>
              <Link to="/research-guide" className="hover:text-[var(--text-primary)] transition-colors flex items-center space-x-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span>{t.nav.research}</span>
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-[var(--text-primary)] transition-colors flex items-center space-x-1.5">
                <GitBranch className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span>{t.nav.repos}</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Đội ngũ & Dự án */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center space-x-1.5">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.footer.colResources}</span>
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/directory" className="hover:text-[var(--text-primary)] transition-colors flex items-center space-x-1.5">
                <Users className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span>{t.nav.directory}</span>
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/taianh20102011/ai-prompt"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--text-primary)] transition-colors flex items-center space-x-1.5"
              >
                <GitBranch className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                <span>GitHub Source</span>
              </a>
            </li>
            <li>
              <span className="text-[var(--text-muted)] flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>IndexedDB Client Persistence</span>
              </span>
            </li>
          </ul>
        </div>

        {/* Cột 4: Tiêu chuẩn Bảo Mật & Nền Tảng */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center space-x-1.5">
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.footer.colSecurity}</span>
          </h4>
          <div className="space-y-2 text-[11px] leading-relaxed text-[var(--text-muted)]">
            <div className="p-2.5 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-page)] space-y-1">
              <div className="text-emerald-400 font-semibold flex items-center space-x-1">
                <span>✓ Miễn phí & Riêng tư</span>
              </div>
              <p className="text-[11px]">{lang === 'vi' ? 'Không cần đăng nhập, nội dung câu lệnh được xử lý ngay trên trình duyệt của bạn.' : 'No sign-up needed; prompts are processed safely in your browser.'}</p>
            </div>
            <div className="p-2.5 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-page)] space-y-1">
              <div className="text-blue-400 font-semibold flex items-center space-x-1">
                <span>✓ Google reCAPTCHA v3</span>
              </div>
              <p className="text-[11px]">{lang === 'vi' ? 'Chống spam tự động, bảo vệ hệ thống ổn định cho mọi người.' : 'Automated anti-spam protection keeping the tool fast and reliable.'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Dải Chân Trang Cuối Cùng (Bottom Copyright & Status) */}
      <div className="border-t border-[var(--border-subtle)] px-4 sm:px-6 lg:px-8 py-4 bg-[var(--bg-surface)]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left text-[11px] text-[var(--text-muted)]">
          <div>
            © 2026 <strong>{t.common.authorName}</strong>. {lang === 'vi' ? 'Dự án phát hành theo chuẩn giấy phép mã nguồn mở ' : 'Distributed under open-source '}<strong>Apache License 2.0</strong>.
          </div>
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-[6px] bg-emerald-400"></span>
              <span>{lang === 'vi' ? 'Trạng thái: 100% Hoạt động' : 'Status: 100% Operational'}</span>
            </span>
            <span>•</span>
            <span>v2.4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
