import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { 
  Compass, 
  Bot, 
  BookOpen, 
  GitBranch, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Users,
  HelpCircle,
  Cpu,
  Layers
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LandingPage() {
  const { t, lang } = useLanguage();
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.gsap-hero-item', {
        y: 14,
        opacity: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });
      gsap.from('.gsap-module-card', {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        delay: 0.15,
        ease: 'power3.out',
        clearProps: 'transform,opacity'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="space-y-12 pb-10">
      {/* 1. HERO INTRO SECTION (Pure Introduction + Primary "Bắt đầu" CTA) */}
      <div className="text-center space-y-6 max-w-3xl mx-auto pt-6 sm:pt-10">
        <div className="gsap-hero-item flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-secondary)]">
            <span className="w-1.5 h-1.5 rounded-[6px] bg-emerald-500"></span>
            <span>{lang === 'vi' ? 'Công cụ kiểm định Prompt mã nguồn mở' : 'Open-source Prompt Engineering Suite'}</span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="text-[#2563EB] dark:text-blue-400 font-semibold">Apache 2.0</span>
          </div>
        </div>

        <div className="gsap-hero-item space-y-3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-[var(--text-primary)]">
            {t.brand.name}
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            {lang === 'vi'
              ? 'Nền tảng phân tích cấu trúc câu lệnh theo chuẩn 4 trụ cột (R-C-O-C), tối ưu hóa riêng cho từng hệ AI (Gemini, Cursor, Claude, DeepSeek, ChatGPT, Qwen), đo độ đa dạng từ vựng và loại bỏ hoàn toàn ngôn ngữ máy móc sáo rỗng.'
              : 'Audit prompt structure across 4 core pillars (Role, Context, Objective, Constraints), tailor instructions for Gemini, Cursor, Claude, DeepSeek, ChatGPT, and Qwen, quantify lexical diversity, and eliminate robotic clichés.'}
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="gsap-hero-item flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/inspector"
            className="w-full sm:w-auto px-7 py-3 rounded-[6px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-sm font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'vi' ? 'Bắt đầu ngay' : 'Get Started'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/guide"
            className="w-full sm:w-auto px-6 py-3 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] text-[var(--text-primary)] font-mono text-sm font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
            <span>{lang === 'vi' ? 'Xem hướng dẫn' : 'User Guide'}</span>
          </Link>
        </div>

        {/* Compact Key Capabilities Strip */}
        <div className="gsap-hero-item grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-left">
          <div className="craft-card p-3.5 space-y-1">
            <div className="flex items-center space-x-1.5 text-[#2563EB] dark:text-blue-400 font-mono text-xs font-bold">
              <Layers className="w-3.5 h-3.5" />
              <span>{t.landing.stat2Value}</span>
            </div>
            <div className="text-[11px] text-[var(--text-muted)] font-mono">{t.landing.stat2Label}</div>
          </div>
          <div className="craft-card p-3.5 space-y-1">
            <div className="flex items-center space-x-1.5 text-emerald-500 font-mono text-xs font-bold">
              <Cpu className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? '6+ Mô hình AI' : '6+ AI Models'}</span>
            </div>
            <div className="text-[11px] text-[var(--text-muted)] font-mono">
              Gemini, Cursor, Claude...
            </div>
          </div>
          <div className="craft-card p-3.5 space-y-1">
            <div className="flex items-center space-x-1.5 text-amber-500 font-mono text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.landing.stat3Value}</span>
            </div>
            <div className="text-[11px] text-[var(--text-muted)] font-mono">{t.landing.stat3Label}</div>
          </div>
          <div className="craft-card p-3.5 space-y-1">
            <div className="flex items-center space-x-1.5 text-sky-500 font-mono text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.landing.stat4Value}</span>
            </div>
            <div className="text-[11px] text-[var(--text-muted)] font-mono">{t.landing.stat4Label}</div>
          </div>
        </div>
      </div>

      {/* 2. FOUR CORE MODULES (Overview of what's inside) */}
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] px-1">
          {lang === 'vi' ? 'Các phân hệ trong nền tảng' : 'Platform Modules'}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Module 1: Inspector */}
          <Link to="/inspector" className="gsap-module-card block group">
            <div className="craft-card p-5 space-y-2 h-full flex flex-col justify-between hover:border-[#2563EB]/50 transition-colors">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-semibold text-sm text-[var(--text-primary)]">
                    <Compass className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
                    <span>{t.nav.inspector}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors" />
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {lang === 'vi' 
                    ? 'Đánh giá cấu trúc prompt theo 4 trụ cột (Role, Context, Objective, Constraints), phát hiện từ ngữ mơ hồ và tự động tái cấu trúc.'
                    : 'Analyze prompt structure across 4 pillars, detect ambiguity, and generate production-ready rewritten prompts.'}
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono text-[var(--text-muted)] flex items-center space-x-3">
                <span>R-C-O-C Audit</span>
                <span>•</span>
                <span>Lexical Diversity</span>
              </div>
            </div>
          </Link>

          {/* Module 2: Cortex Bot */}
          <Link to="/trained-bot" className="gsap-module-card block group">
            <div className="craft-card p-5 space-y-2 h-full flex flex-col justify-between hover:border-[#2563EB]/50 transition-colors">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-semibold text-sm text-[var(--text-primary)]">
                    <Bot className="w-4 h-4 text-sky-500" />
                    <span>{t.nav.bot}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-sky-500 transition-colors" />
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {lang === 'vi'
                    ? 'Trợ lý AI hỗ trợ giải quyết bài toán kỹ thuật, viết prompt chuẩn và trả lời theo chuỗi suy luận từng bước (Chain-of-Thought).'
                    : 'AI assistant for technical inquiries, prompt drafting, and transparent step-by-step Chain-of-Thought reasoning.'}
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono text-[var(--text-muted)] flex items-center space-x-3">
                <span>Chain-of-Thought</span>
                <span>•</span>
                <span>Multi-Mode Reasoning</span>
              </div>
            </div>
          </Link>

          {/* Module 3: Research Hub */}
          <Link to="/research-guide" className="gsap-module-card block group">
            <div className="craft-card p-5 space-y-2 h-full flex flex-col justify-between hover:border-[#2563EB]/50 transition-colors">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-semibold text-sm text-[var(--text-primary)]">
                    <BookOpen className="w-4 h-4 text-amber-500" />
                    <span>{t.nav.research}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-amber-500 transition-colors" />
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {lang === 'vi'
                    ? 'Tài liệu nghiên cứu khoa học giải mã cơ chế Alignment Tax trong RLHF và khuôn khổ H-E-A-R để tạo prompt tự nhiên, sâu sắc.'
                    : 'Research dissertation dissecting RLHF Alignment Tax and establishing the H-E-A-R framework for human-centric dialogues.'}
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono text-[var(--text-muted)] flex items-center space-x-3">
                <span>Stanford / OpenAI Citations</span>
                <span>•</span>
                <span>BibTeX Support</span>
              </div>
            </div>
          </Link>

          {/* Module 4: Repos */}
          <Link to="/news" className="gsap-module-card block group">
            <div className="craft-card p-5 space-y-2 h-full flex flex-col justify-between hover:border-[#2563EB]/50 transition-colors">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-semibold text-sm text-[var(--text-primary)]">
                    <GitBranch className="w-4 h-4 text-emerald-500" />
                    <span>{t.nav.repos}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-emerald-500 transition-colors" />
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {lang === 'vi'
                    ? 'Bộ sưu tập chọn lọc các kho mã nguồn mở AI uy tín: Gemini SDKs, AutoGen, DeepSeek, Ollama, LangChain.'
                    : 'Curated directory of prominent open-source AI repositories: Gemini SDKs, AutoGen, DeepSeek, Ollama, LangChain.'}
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono text-[var(--text-muted)] flex items-center space-x-3">
                <span>Live GitHub Sync</span>
                <span>•</span>
                <span>60+ Curated Repos</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* 3. JOIN THE TEAM BANNER ("Hãy là một thành viên của đội ngũ Prompt AI PNIT") */}
      <div className="gsap-module-card max-w-4xl mx-auto craft-card p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-[#2563EB]/30 bg-[var(--bg-elevated)]/40">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#2563EB] dark:text-blue-400 font-semibold uppercase tracking-wider">
            <Users className="w-4 h-4" />
            <span>{t.landing.joinTeamBtn}</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
            {t.landing.joinTeamTitle}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            {t.landing.joinTeamSubtitle}
          </p>
        </div>

        <Link
          to="/dev-studio"
          className="px-5 py-2.5 rounded-[6px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-mono text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer shrink-0"
        >
          <span>{t.landing.joinTeamBtn}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 5. DISCREET ATTRIBUTION & SECURITY FOOTER NOTE */}
      <div className="max-w-4xl mx-auto pt-4 text-center text-xs font-mono text-[var(--text-muted)] space-y-1.5">
        <div>
          <span>{t.footer.authorPrefix} </span>
          <strong className="text-[var(--text-primary)]">{t.common.authorName}</strong>
          <span> • </span>
          <span>{lang === 'vi' ? 'Bản quyền theo chuẩn ' : 'Licensed under '}</span>
          <span className="text-indigo-400 font-semibold">Apache License 2.0</span>
        </div>
        <div className="text-[11px] opacity-75">
          {lang === 'vi' 
            ? 'Hệ thống bảo vệ tự động bằng Google reCAPTCHA v3 & Xác thực Enclave an toàn.' 
            : 'Automated protection via Google reCAPTCHA v3 & Secure Enclave verification.'}
        </div>
      </div>
    </div>
  );
}
