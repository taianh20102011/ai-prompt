import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Compass, 
  Bot, 
  BookOpen, 
  GitBranch, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Check,
  Users
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [promptInput, setPromptInput] = useState(
    lang === 'vi' 
      ? 'Viết cho tôi một lá thư chia sẻ khi bạn tôi mất việc...' 
      : 'Draft an empathetic letter for a friend who unexpectedly lost their job...'
  );

  const handleStartInspection = (e) => {
    e?.preventDefault();
    if (!promptInput.trim()) return;
    navigate('/inspector', { state: { initialPrompt: promptInput } });
  };

  const samplePrompts = lang === 'vi' ? [
    'Nâng cấp hệ thống web này',
    'Nói chuyện khi tôi bế tắc',
    'Refactor thuật toán này'
  ] : [
    'Upgrade this web system',
    'Talk to me when I feel stuck',
    'Refactor this algorithm'
  ];

  return (
    <div className="space-y-12 pb-10">
      {/* 1. HERO & WORKBENCH */}
      <div className="text-center space-y-4 max-w-3xl mx-auto pt-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-secondary)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>{lang === 'vi' ? 'Công cụ kiểm định Prompt mã nguồn mở' : 'Open-source Prompt Engineering Suite'}</span>
          <span className="text-[var(--text-muted)]">•</span>
          <span className="text-indigo-400 font-semibold">Apache 2.0</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
          {t.brand.name}
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto">
          {lang === 'vi'
            ? 'Phân tích cấu trúc câu lệnh theo chuẩn 4 trụ cột (R-C-O-C), đo độ đa dạng từ vựng và loại bỏ hoàn toàn ngôn ngữ máy móc sáo rỗng.'
            : 'Audit prompt structure across 4 core pillars (Role, Context, Objective, Constraints), quantify vocabulary diversity, and eliminate robotic clichés.'}
        </p>
      </div>

      {/* 2. DIRECT PROMPT INPUT BENCH (Immediate utility, zero marketing fluff) */}
      <div className="max-w-3xl mx-auto craft-card p-4 sm:p-5 space-y-3">
        <form onSubmit={handleStartInspection} className="space-y-3">
          <textarea
            rows={4}
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            className="craft-input w-full p-3.5 text-xs sm:text-sm font-mono text-[var(--text-primary)] resize-y leading-relaxed"
            placeholder={t.inspector.placeholder}
          />

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            {/* Quick sample chips */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              <span className="text-[var(--text-muted)] text-[11px] mr-1">{t.landing.sampleTag}</span>
              {samplePrompts.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPromptInput(sample)}
                  className="px-2.5 py-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-page)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-[11px] transition-colors cursor-pointer"
                >
                  {sample}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={!promptInput.trim()}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shrink-0 disabled:opacity-40"
            >
              <span>{t.inspector.btnInspect}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* 3. FOUR CORE MODULES (Clean, flat grid without spotlights or bouncy scaling) */}
      <div className="max-w-4xl mx-auto space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] px-1">
          {lang === 'vi' ? 'Các phân hệ trong nền tảng' : 'Platform Modules'}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Module 1: Inspector */}
          <Link to="/inspector" className="block group">
            <div className="craft-card p-5 space-y-2 h-full flex flex-col justify-between hover:border-indigo-500/40 transition-colors">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-semibold text-sm text-[var(--text-primary)]">
                    <Compass className="w-4 h-4 text-indigo-400" />
                    <span>{t.nav.inspector}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-indigo-400 transition-colors" />
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
          <Link to="/trained-bot" className="block group">
            <div className="craft-card p-5 space-y-2 h-full flex flex-col justify-between hover:border-indigo-500/40 transition-colors">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-semibold text-sm text-[var(--text-primary)]">
                    <Bot className="w-4 h-4 text-purple-400" />
                    <span>{t.nav.bot}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-purple-400 transition-colors" />
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
          <Link to="/research-guide" className="block group">
            <div className="craft-card p-5 space-y-2 h-full flex flex-col justify-between hover:border-indigo-500/40 transition-colors">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-semibold text-sm text-[var(--text-primary)]">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>{t.nav.research}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-amber-400 transition-colors" />
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
          <Link to="/news" className="block group">
            <div className="craft-card p-5 space-y-2 h-full flex flex-col justify-between hover:border-indigo-500/40 transition-colors">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-semibold text-sm text-[var(--text-primary)]">
                    <GitBranch className="w-4 h-4 text-emerald-400" />
                    <span>{t.nav.repos}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-emerald-400 transition-colors" />
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
                <span>50+ Top Repos</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* 4. JOIN THE TEAM BANNER ("Hãy là một thành viên của đội ngũ Prompt AI PNIT") */}
      <div className="max-w-4xl mx-auto craft-card p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-indigo-500/25 bg-[var(--bg-elevated)]/30">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider">
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
          className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer shrink-0 shadow-xs"
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
