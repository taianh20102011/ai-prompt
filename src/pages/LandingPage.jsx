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
    <div ref={containerRef} className="space-y-14 pb-10">
      {/* 1. HERO INTRO SECTION (Warm, Clear, Everyday Human Language) */}
      <div className="text-center space-y-6 max-w-3xl mx-auto pt-4 sm:pt-8">
        <div className="gsap-hero-item flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs text-[var(--text-secondary)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-semibold text-[var(--text-primary)]">{t.brand.name}</span>
            <span className="text-[var(--text-muted)]">•</span>
            <span>{lang === 'vi' ? 'Miễn phí 100% • Không cần tài khoản' : '100% Free • No Sign-up Required'}</span>
          </div>
        </div>

        <div className="gsap-hero-item space-y-3.5">
          <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-[-0.025em] leading-[1.15] text-[var(--text-primary)]">
            {lang === 'vi'
              ? 'Giao tiếp với AI dễ dàng và tự nhiên hơn'
              : 'Talk to AI more clearly and naturally'}
          </h1>

          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            {lang === 'vi'
              ? 'Đừng lo nếu bạn không biết cách viết câu lệnh (prompt) sao cho hay. Chỉ cần gõ vài chữ mô tả ý tưởng của bạn, chúng tôi sẽ biến nó thành câu lệnh rõ ràng, có chiều sâu để AI hiểu đúng ý bạn ngay lần đầu.'
              : 'No need to memorize complex prompt formulas. Just describe what you need in plain words, and we will turn it into a clear, thoughtful prompt that AI gets right on the first try.'}
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="gsap-hero-item flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/inspector"
            className="w-full sm:w-auto px-7 py-3.5 rounded-[8px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'vi' ? 'Bắt đầu viết câu lệnh' : 'Start Writing Prompt'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/trained-bot"
            className="w-full sm:w-auto px-6 py-3.5 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] text-[var(--text-primary)] text-sm font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <Bot className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
            <span>{lang === 'vi' ? 'Trò chuyện với AI ngay' : 'Chat with AI Now'}</span>
          </Link>
        </div>
      </div>

      {/* 2. HOW IT WORKS: "3 BƯỚC ĐƠN GIẢN" */}
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            {lang === 'vi' ? 'Cách dùng chỉ trong 3 bước đơn giản' : 'How it works in 3 simple steps'}
          </div>
          <Link to="/guide" className="text-xs text-[#2563EB] dark:text-blue-400 hover:underline flex items-center space-x-1">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{lang === 'vi' ? 'Xem hướng dẫn chi tiết' : 'Detailed Guide'}</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="gsap-hero-item craft-card p-5 space-y-2">
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-[8px] bg-[#2563EB]/15 text-[#2563EB] dark:text-blue-400 text-xs font-bold">
              1
            </div>
            <h2 className="text-sm font-bold text-[var(--text-primary)]">
              {lang === 'vi' ? 'Bước 1: Nhập ý tưởng thô' : 'Step 1: Type your rough idea'}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {lang === 'vi'
                ? 'Gõ ngắn gọn điều bạn muốn nhờ AI, giống như đang nhắn tin bình thường với một người bạn.'
                : 'Write briefly what you need help with, just like texting a helpful colleague.'}
            </p>
          </div>

          <div className="gsap-hero-item craft-card p-5 space-y-2">
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-[8px] bg-emerald-500/15 text-emerald-500 text-xs font-bold">
              2
            </div>
            <h2 className="text-sm font-bold text-[var(--text-primary)]">
              {lang === 'vi' ? 'Bước 2: Chọn AI bạn đang dùng' : 'Step 2: Pick your AI tool'}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {lang === 'vi'
                ? 'ChatGPT, Claude, Gemini hay Cursor — mỗi công cụ sẽ được tinh chỉnh cách diễn đạt riêng cho hiệu quả nhất.'
                : 'ChatGPT, Claude, Gemini, or Cursor — we format the prompt specifically for your chosen tool.'}
            </p>
          </div>

          <div className="gsap-hero-item craft-card p-5 space-y-2">
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-[8px] bg-amber-500/15 text-amber-500 text-xs font-bold">
              3
            </div>
            <h2 className="text-sm font-bold text-[var(--text-primary)]">
              {lang === 'vi' ? 'Bước 3: Chép và sử dụng ngay' : 'Step 3: Copy and use right away'}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {lang === 'vi'
                ? 'Nhận ngay bản câu lệnh đã được viết lại mạch lạc, đầy đủ ngữ cảnh để dán vào AI và nhận kết quả chuẩn xác.'
                : 'Get a well-structured, context-rich prompt ready to paste into any AI chat for accurate results.'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. FOUR MAIN FEATURES (Plain-Language Overview) */}
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] px-1">
          {lang === 'vi' ? 'Bạn có thể làm gì trên Prompt AI PNIT?' : 'What you can do here'}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Module 1: Inspector */}
          <Link to="/inspector" className="gsap-module-card block group">
            <div className="craft-card p-5 space-y-2.5 h-full flex flex-col justify-between hover:border-[#2563EB]/50 transition-colors">
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
                    ? 'Biến vài dòng ý tưởng ngắn ngủi thành câu lệnh đầy đủ vai trò, bối cảnh và mục tiêu rõ ràng để AI không trả lời chung chung.'
                    : 'Turn brief ideas into complete prompts with clear roles, context, and goals so AI avoids vague answers.'}
                </p>
              </div>
              <div className="pt-2 text-[11px] text-[var(--text-muted)] flex items-center space-x-2">
                <span>{lang === 'vi' ? 'Viết lại tự động' : 'Smart Rewrite'}</span>
                <span>•</span>
                <span>{lang === 'vi' ? 'Loại bỏ từ mơ hồ' : 'Clear & Specific'}</span>
              </div>
            </div>
          </Link>

          {/* Module 2: Cortex Bot */}
          <Link to="/trained-bot" className="gsap-module-card block group">
            <div className="craft-card p-5 space-y-2.5 h-full flex flex-col justify-between hover:border-[#2563EB]/50 transition-colors">
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
                    ? 'Trò chuyện trực tiếp với trợ lý AI thân thiện: nhờ gợi ý công việc, sửa code, hoặc tâm sự nhẹ nhàng khi bạn thấy bế tắc.'
                    : 'Chat directly with a friendly AI companion for brainstorming, coding advice, or thoughtful conversation.'}
                </p>
              </div>
              <div className="pt-2 text-[11px] text-[var(--text-muted)] flex items-center space-x-2">
                <span>{lang === 'vi' ? 'Hỏi đáp không giới hạn' : 'Unlimited Chat'}</span>
                <span>•</span>
                <span>{lang === 'vi' ? 'Nhiều chế độ trò chuyện' : 'Multiple Modes'}</span>
              </div>
            </div>
          </Link>

          {/* Module 3: Research Hub */}
          <Link to="/research-guide" className="gsap-module-card block group">
            <div className="craft-card p-5 space-y-2.5 h-full flex flex-col justify-between hover:border-[#2563EB]/50 transition-colors">
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
                    ? 'Tìm hiểu vì sao AI hay trả lời rập khuôn và cách viết câu lệnh giúp AI giao tiếp tự nhiên, gần gũi như người thật.'
                    : 'Understand why AI can sound robotic and learn practical techniques for warm, human-centered prompts.'}
                </p>
              </div>
              <div className="pt-2 text-[11px] text-[var(--text-muted)] flex items-center space-x-2">
                <span>{lang === 'vi' ? 'Dễ hiểu, có ví dụ thực tế' : 'Practical Examples'}</span>
                <span>•</span>
                <span>{lang === 'vi' ? 'Tài liệu tiếng Việt' : 'Full Guides'}</span>
              </div>
            </div>
          </Link>

          {/* Module 4: Repos */}
          <Link to="/news" className="gsap-module-card block group">
            <div className="craft-card p-5 space-y-2.5 h-full flex flex-col justify-between hover:border-[#2563EB]/50 transition-colors">
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
                    ? 'Khám phá bộ sưu tập các công cụ và dự án AI mã nguồn mở đáng tin cậy đang được cộng đồng sử dụng rộng rãi.'
                    : 'Explore a curated list of trusted open-source AI tools and community projects.'}
                </p>
              </div>
              <div className="pt-2 text-[11px] text-[var(--text-muted)] flex items-center space-x-2">
                <span>{lang === 'vi' ? 'Cập nhật thường xuyên' : 'Regularly Updated'}</span>
                <span>•</span>
                <span>{lang === 'vi' ? '60+ dự án chọn lọc' : '60+ Curated Projects'}</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* 4. JOIN THE TEAM BANNER */}
      <div className="gsap-module-card max-w-4xl mx-auto craft-card p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-[#2563EB]/30 bg-[var(--bg-elevated)]/40">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center space-x-2 text-xs text-[#2563EB] dark:text-blue-400 font-semibold uppercase tracking-wider">
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
          className="px-5 py-2.5 rounded-[8px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer shrink-0"
        >
          <span>{t.landing.joinTeamBtn}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 5. DISCREET ATTRIBUTION NOTE */}
      <div className="max-w-4xl mx-auto pt-2 text-center text-xs text-[var(--text-muted)] space-y-1">
        <div>
          <span>{t.footer.authorPrefix} </span>
          <strong className="text-[var(--text-primary)]">{t.common.authorName}</strong>
          <span> • </span>
          <span>{lang === 'vi' ? 'Mã nguồn mở theo giấy phép ' : 'Open-source under '}</span>
          <span className="text-[#2563EB] dark:text-blue-400 font-semibold">Apache License 2.0</span>
        </div>
      </div>
    </div>
  );
}
