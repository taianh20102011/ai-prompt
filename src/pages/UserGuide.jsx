import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Sparkles, 
  Layers, 
  SlidersHorizontal, 
  Bot, 
  Users, 
  Terminal, 
  ShieldCheck, 
  Copy, 
  Check, 
  ArrowRight, 
  HelpCircle, 
  FileText, 
  Compass, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function UserGuide() {
  const { lang, t } = useLanguage();
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = lang === 'vi' ? [
    {
      q: 'Prompt AI PNIT là gì và ai là tác giả?',
      a: 'Prompt AI PNIT là nền tảng kỹ thuật mã nguồn mở do kỹ sư Phạm Ngọc Tài Anh (@taianh20102011) phát triển, nhằm giúp lập trình viên và người dùng phân tích cấu trúc prompt theo chuẩn 4 trụ cột R-C-O-C, đồng thời thanh lọc triệt để các phản xạ sinh văn bản sáo rỗng, máy móc (AI Slop).'
    },
    {
      q: 'Tại sao các thẻ Prompt Benchmarks lại có 2 nút [Chép] và [Phân tích]?',
      a: 'Nút [Chép] cho phép bạn sao chép ngay prompt đã qua kiểm nghiệm thực tế để dán vào ChatGPT / Claude / Gemini / DeepSeek. Nút [Phân tích] sẽ tự động nạp câu hỏi gốc vào bộ kiểm định AST ở phía trên để bạn theo dõi cách hệ thống bóc tách thành phần câu và chỉ ra các điểm yếu.'
    },
    {
      q: 'Chuẩn 4 trụ cột R-C-O-C là gì?',
      a: 'R-C-O-C là viết tắt của: Role (Vai trò cụ thể), Context (Bối cảnh và dữ liệu đầu vào), Objective (Mục tiêu và định dạng đầu ra chi tiết), và Constraints (Ràng buộc, bao gồm danh sách từ cấm Negative Tokens và nguyên tắc không nói sáo rỗng).'
    },
    {
      q: 'Sử dụng hệ thống này có mất phí không?',
      a: 'Hoàn toàn miễn phí và không giới hạn lượt dùng. Nền tảng hoạt động dựa trên các thuật toán phân tích tĩnh (AST) chạy trực tiếp tại trình duyệt kết hợp API an toàn được bảo vệ bởi Google reCAPTCHA v3.'
    },
    {
      q: 'Làm thế nào để tôi được hiển thị trên trang Đội ngũ Kỹ sư (Directory)?',
      a: 'Bạn truy cập mục "Gia nhập đội ngũ" (/dev-studio), điền thông tin họ tên, chức danh, mã chứng chỉ AI đã học (Google Cloud, DeepLearning.AI, AWS, hoặc nhập AGY-CERT-2026), sau đó lưu hồ sơ để xuất hiện trên danh bạ cộng đồng.'
    }
  ] : [
    {
      q: 'What is Prompt AI PNIT and who created it?',
      a: 'Prompt AI PNIT is an open-source technical platform created by engineer Pham Ngoc Tai Anh (@taianh20102011) to analyze prompt structures against the 4-pillar R-C-O-C standard and systematically eradicate robotic AI slop.'
    },
    {
      q: 'Why do Prompt Benchmarks cards have both [Copy] and [Inspect] buttons?',
      a: 'The [Copy] button lets you immediately grab the battle-tested, anti-slop prompt for ChatGPT, Claude, Gemini, or DeepSeek. The [Inspect] button loads the baseline inquiry into the AST analyzer so you can visualize structural scoring and slop elimination.'
    },
    {
      q: 'What does the R-C-O-C standard stand for?',
      a: 'R-C-O-C stands for Role (domain specialist), Context (background state and data), Objective (exact output shape), and Constraints (negative tokens and anti-slop guidelines).'
    },
    {
      q: 'Is there any fee or usage limit on this platform?',
      a: 'Prompt AI PNIT is 100% free and open-source with unlimited audits. Analysis heuristics run in-browser with zero tracking, safeguarded by Google reCAPTCHA v3.'
    },
    {
      q: 'How do I get listed on the Engineers Directory?',
      a: 'Navigate to "Join the Team" (/dev-studio), fill out your profile with your AI certification credential (e.g. Google Cloud, DeepLearning.AI, or AGY-CERT-2026), and save your profile to be featured.'
    }
  ];

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-12">
      {/* Hero Header */}
      <section className="space-y-4 border-b border-[var(--border-subtle)] pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{lang === 'vi' ? 'Cẩm nang hướng dẫn sử dụng' : 'Comprehensive User Guide'}</span>
          </div>
          <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[11px] font-mono text-[var(--text-muted)]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Google reCAPTCHA v3 • SHA-256 Enclave</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
          {lang === 'vi' ? 'Hướng Dẫn Sử Dụng Prompt AI PNIT' : 'Prompt AI PNIT User Manual'}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-3xl leading-relaxed">
          {lang === 'vi'
            ? 'Tài liệu hướng dẫn chi tiết cách khai thác toàn diện các tính năng của hệ thống: từ kiểm định cấu trúc prompt 4 trụ cột, khai thác kho Prompt Benchmarks thực chiến, trò chuyện cùng trợ lý AI đến tham gia đóng góp cho đội ngũ kỹ sư.'
            : 'Step-by-step documentation on mastering the platform: AST structural auditing, leveraging the benchmark template library, consulting the conversational assistant, and contributing to the engineer directory.'}
        </p>

        {/* Quick jump anchor tags */}
        <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono">
          <a href="#quick-start" className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--border-subtle)] text-[var(--text-secondary)] transition-colors">
            ⚡ {lang === 'vi' ? 'Bắt đầu nhanh' : 'Quick Start'}
          </a>
          <a href="#benchmarks" className="px-3 py-1.5 rounded-lg border border-indigo-500/40 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors">
            🏆 {lang === 'vi' ? 'Dùng Prompt Benchmarks' : 'Using Benchmarks'}
          </a>
          <a href="#rcoc-framework" className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--border-subtle)] text-[var(--text-secondary)] transition-colors">
            📐 {lang === 'vi' ? 'Chuẩn 4 trụ cột R-C-O-C' : 'R-C-O-C Framework'}
          </a>
          <a href="#assistant" className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--border-subtle)] text-[var(--text-secondary)] transition-colors">
            🤖 {lang === 'vi' ? 'Trợ lý AI' : 'AI Assistant'}
          </a>
          <a href="#faq" className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--border-subtle)] text-[var(--text-secondary)] transition-colors">
            ❓ FAQ
          </a>
        </div>
      </section>

      {/* Section 1: Quick Start Workflow */}
      <section id="quick-start" className="space-y-5">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center space-x-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>{lang === 'vi' ? '1. Quy Trình Bắt Đầu Nhanh (3 Bước)' : '1. Quick Start Workflow'}</span>
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {lang === 'vi' ? 'Lộ trình đơn giản nhất để nâng cấp một câu hỏi thông thường thành câu lệnh kỹ thuật cao cấp.' : 'The fastest way to elevate raw inquiries into high-fidelity AI prompts.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="craft-card p-5 space-y-3 relative">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              01
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              {lang === 'vi' ? 'Dán prompt vào Bộ Kiểm Định' : 'Input Raw Prompt'}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {lang === 'vi' 
                ? 'Truy cập mục "Kiểm định Prompt" (/inspector). Dán bất kỳ câu lệnh nào bạn chuẩn bị gửi cho ChatGPT hoặc Claude.' 
                : 'Navigate to "Prompt Inspector" (/inspector). Paste whatever draft prompt you plan to submit to your LLM.'}
            </p>
            <div className="pt-2">
              <Link to="/inspector" className="text-xs text-indigo-400 hover:underline flex items-center space-x-1 font-mono">
                <span>{lang === 'vi' ? 'Đến Bộ Kiểm Định' : 'Go to Inspector'}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="craft-card p-5 space-y-3 relative">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              02
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              {lang === 'vi' ? 'Xem Đánh Giá Cú Pháp (AST)' : 'Audit Syntax & Slop'}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {lang === 'vi'
                ? 'Hệ thống tự động chấm điểm độ đa dạng từ vựng, đo lường 4 trụ cột R-C-O-C và cảnh báo các từ ngữ sáo rỗng (AI Slop).'
                : 'The engine calculates lexical diversity, evaluates R-C-O-C coverage, and flags generic robotic clichés.'}
            </p>
          </div>

          <div className="craft-card p-5 space-y-3 relative">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center">
              03
            </div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              {lang === 'vi' ? 'Chép Prompt Tối Ưu Hóa' : 'Copy Upgraded Prompt'}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {lang === 'vi'
                ? 'Bấm nút "Sao chép Prompt tối ưu" để lấy câu lệnh hoàn chỉnh đã được bổ sung vai trò, bối cảnh, định dạng và từ cấm.'
                : 'Click "Copy Upgraded Prompt" to take the refined version complete with negative tokens and structured constraints.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Detailed Guide for Prompt Benchmarks (The user's direct question) */}
      <section id="benchmarks" className="space-y-5 border-t border-[var(--border-subtle)] pt-8">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-[11px] font-bold">
              ĐIỂM NHẤN
            </span>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              {lang === 'vi' ? '2. Hướng Dẫn Sử Dụng Thư Viện Prompt Benchmarks' : '2. How to Use Prompt Benchmarks'}
            </h2>
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {lang === 'vi' 
              ? 'Giải thích cấu tạo của các thẻ mẫu prompt (như trong ảnh bạn đã xem) và cách tận dụng 2 nút chức năng.' 
              : 'Detailed guide to understanding benchmark cards and utilizing their dual action buttons.'}
          </p>
        </div>

        {/* Visual Mock Card Illustration */}
        <div className="craft-card p-6 border-indigo-500/30 bg-[var(--bg-elevated)]/40 space-y-4">
          <div className="text-xs font-mono text-indigo-400 font-semibold flex items-center space-x-1.5">
            <Lightbulb className="w-4 h-4" />
            <span>{lang === 'vi' ? 'Cấu trúc giải phẫu 1 thẻ Prompt Benchmark:' : 'Anatomy of a Prompt Benchmark Card:'}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* The visual card replica */}
            <div className="craft-card p-4 border border-[var(--border-subtle)] bg-[var(--bg-page)] space-y-3 shadow-md">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-indigo-400 font-semibold">Tâm lý & Tư vấn (Có hồn)</span>
                <span className="text-amber-400 font-medium">★ 4.98</span>
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                Hội Thoại Thấu Cảm & Nhân Cách Tri Kỷ (Empathetic AI Persona)
              </h3>
              <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[11px] font-mono text-[var(--text-secondary)] max-h-24 overflow-y-auto leading-relaxed">
                Bạn là một người bạn tri kỷ lâu năm, đồng thời có hiểu biết sâu sắc về tâm lý học hành vi...
              </div>
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2 text-[11px] font-mono">
                <span className="text-[var(--text-muted)] text-[10px]">Alex Nguyen (AI Certified)</span>
                <div className="flex items-center space-x-1.5">
                  <span className="px-2 py-0.5 rounded border border-neutral-700 text-neutral-300 text-[10px] flex items-center space-x-1">
                    <Copy className="w-2.5 h-2.5" />
                    <span>{lang === 'vi' ? 'Chép' : 'Copy'}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-[10px] flex items-center space-x-1 font-bold">
                    <span>{lang === 'vi' ? 'Phân tích' : 'Inspect'}</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Explanation Column */}
            <div className="space-y-3 text-xs leading-relaxed text-[var(--text-secondary)]">
              <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                <span className="font-bold text-[var(--text-primary)] block font-mono text-[11px]">
                  📋 Nút [Chép / Copy]:
                </span>
                <p className="mt-1">
                  {lang === 'vi'
                    ? 'Bấm nút này để sao chép toàn bộ văn bản câu lệnh đã tối ưu vào bộ nhớ tạm (Clipboard). Bạn chỉ việc mở ChatGPT, Claude hoặc Gemini và bấm Ctrl+V (hoặc Cmd+V) để sử dụng ngay.'
                    : 'Copies the complete optimized prompt to your clipboard. Paste it directly into ChatGPT, Claude, or Gemini to get insightful, non-robotic outputs.'}
                </p>
              </div>

              <div className="p-3 rounded-lg border border-indigo-500/30 bg-indigo-500/10 text-[var(--text-primary)]">
                <span className="font-bold text-indigo-400 block font-mono text-[11px]">
                  ⚡ Nút [Phân tích / Inspect]:
                </span>
                <p className="mt-1 text-[var(--text-secondary)]">
                  {lang === 'vi'
                    ? 'Bấm nút này khi bạn muốn tìm hiểu "tại sao câu lệnh này lại tốt". Hệ thống sẽ tự động nạp câu hỏi gốc chưa tối ưu vào ô phân tích ở phía trên, kích hoạt bộ phân tích AST và hiển thị so sánh trực quan.'
                    : 'Click this to understand how the prompt was engineered. The system auto-loads the baseline prompt into the top analyzer and runs AST diagnostics instantly.'}
                </p>
              </div>

              <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                <span className="font-bold text-[var(--text-primary)] block font-mono text-[11px]">
                  🔍 Thanh tìm kiếm Benchmark:
                </span>
                <p className="mt-1">
                  {lang === 'vi'
                    ? 'Gõ từ khóa như "tâm lý", "web", "clean-code", "marketing" để lọc nhanh các mẫu prompt thuộc ngành nghề mong muốn.'
                    : 'Search keywords such as "psychology", "web", "clean-code", "marketing" to filter templates by industry or tag.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: The 4 Pillars R-C-O-C Framework */}
      <section id="rcoc-framework" className="space-y-5 border-t border-[var(--border-subtle)] pt-8">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center space-x-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>{lang === 'vi' ? '3. Chuẩn Kỹ Nghệ 4 Trụ Cột (R-C-O-C Framework)' : '3. The 4 Pillars (R-C-O-C Framework)'}</span>
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {lang === 'vi' 
              ? 'Tiêu chuẩn khoa học loại bỏ sự mơ hồ và ép mô hình ngôn ngữ lớn suy luận chính xác.' 
              : 'The algorithmic standard to eradicate ambiguity and force rigorous LLM reasoning.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="craft-card p-4 space-y-2 border-l-2 border-l-indigo-500">
            <div className="text-xs font-mono font-bold text-indigo-400">R — ROLE (Vai Trò)</div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              {lang === 'vi' ? 'Định vị chuyên gia chính xác' : 'Pinpoint Persona Definition'}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {lang === 'vi'
                ? 'Thay vì nói chung chung "Bạn là chuyên gia", hãy chỉ định: "Bạn là Principal Fullstack Architect & Lead UI Engineer với 10 năm kinh nghiệm refactor hệ thống".'
                : 'Avoid generic "You are an expert". Instead specify: "You are a Principal Fullstack Architect & Lead UI Engineer with 10 years of system refactoring experience".'}
            </p>
          </div>

          <div className="craft-card p-4 space-y-2 border-l-2 border-l-blue-500">
            <div className="text-xs font-mono font-bold text-blue-400">C — CONTEXT (Bối Cảnh)</div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              {lang === 'vi' ? 'Thực trạng và dữ liệu nền tảng' : 'Background State & Data'}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {lang === 'vi'
                ? 'Mô tả rõ vấn đề hiện tại, các công nghệ đang dùng, lỗi cụ thể gặp phải hoặc tệp người dùng mục tiêu cần tiếp cận.'
                : 'State the exact codebase status, libraries in use, existing friction points, or target user demographic.'}
            </p>
          </div>

          <div className="craft-card p-4 space-y-2 border-l-2 border-l-emerald-500">
            <div className="text-xs font-mono font-bold text-emerald-400">O — OBJECTIVE (Mục Tiêu)</div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              {lang === 'vi' ? 'Định dạng và sản phẩm bàn giao' : 'Actionable Output Format'}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {lang === 'vi'
                ? 'Chỉ rõ cấu trúc phản hồi: [Bảng Đánh Giá Hiện Trạng] -> [Lộ Trình 3 Bước] -> [Mã Nguồn Cụ Thể]. Tránh để AI tự biên tự diễn văn bản dài lê thê.'
                : 'Mandate exact deliverables: [Assessment Table] -> [3-Step Roadmap] -> [Code Snippets]. Prevents verbose conversational drift.'}
            </p>
          </div>

          <div className="craft-card p-4 space-y-2 border-l-2 border-l-amber-500">
            <div className="text-xs font-mono font-bold text-amber-400">C — CONSTRAINTS (Ràng Buộc & Từ Cấm)</div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              {lang === 'vi' ? 'Thanh lọc AI Slop & Negative Tokens' : 'Negative Tokens & Anti-Slop'}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {lang === 'vi'
                ? 'Cấm tuyệt đối các câu mở đầu sáo rỗng: "Trong kỷ nguyên số...", "Đáng chú ý là...", "Dưới đây là một số bước...". Yêu cầu đi thẳng vào vấn đề kỹ thuật.'
                : 'Explicitly ban robotic openers: "In this digital era...", "It is worth noting...", "Here are some steps...". Enforce high burstiness and direct technical insights.'}
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: AI Assistant & Community */}
      <section id="assistant" className="space-y-5 border-t border-[var(--border-subtle)] pt-8">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center space-x-2">
            <Bot className="w-5 h-5 text-indigo-400" />
            <span>{lang === 'vi' ? '4. Trợ Lý AI & Hệ Sinh Thái Kỹ Sư' : '4. AI Assistant & Engineer Ecosystem'}</span>
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {lang === 'vi' ? 'Khám phá các tính năng phụ trợ mạnh mẽ khác trên trang web.' : 'Explore additional features across the intelligence suite.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="craft-card p-4 space-y-2">
            <div className="flex items-center space-x-2 text-indigo-400 font-mono text-xs font-semibold">
              <Bot className="w-4 h-4" />
              <span>{lang === 'vi' ? 'Trợ Lý AI (/trained-bot)' : 'AI Bot (/trained-bot)'}</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {lang === 'vi'
                ? 'Chat trực tiếp với AI được cấu hình sẵn tri thức Anti-Slop. Bạn có thể yêu cầu: "Viết giúp tôi 1 prompt R-C-O-C cho việc audit bảo mật code".'
                : 'Interact with an assistant pre-tuned with anti-slop guidelines. Ask it to generate full R-C-O-C prompt architectures on the fly.'}
            </p>
            <Link to="/trained-bot" className="text-xs text-indigo-400 hover:underline inline-block pt-1 font-mono">
              {lang === 'vi' ? 'Mở Trợ lý AI →' : 'Launch Bot →'}
            </Link>
          </div>

          <div className="craft-card p-4 space-y-2">
            <div className="flex items-center space-x-2 text-indigo-400 font-mono text-xs font-semibold">
              <Users className="w-4 h-4" />
              <span>{lang === 'vi' ? 'Danh Bạ Kỹ Sư (/directory)' : 'Directory (/directory)'}</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {lang === 'vi'
                ? 'Xem hồ sơ của các chuyên gia đã được cấp chứng nhận, học hỏi phong cách viết prompt và các lĩnh vực chuyên sâu của từng kỹ sư.'
                : 'Browse verified engineer profiles, study their prompt construction methodologies, and view certified specializations.'}
            </p>
            <Link to="/directory" className="text-xs text-indigo-400 hover:underline inline-block pt-1 font-mono">
              {lang === 'vi' ? 'Xem Danh bạ →' : 'View Directory →'}
            </Link>
          </div>

          <div className="craft-card p-4 space-y-2">
            <div className="flex items-center space-x-2 text-indigo-400 font-mono text-xs font-semibold">
              <Terminal className="w-4 h-4" />
              <span>{lang === 'vi' ? 'Gia Nhập Đội Ngũ (/dev-studio)' : 'Join Team (/dev-studio)'}</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {lang === 'vi'
                ? 'Tự tạo hồ sơ kỹ sư của riêng bạn, điền mã chứng chỉ AI và đóng góp các mẫu prompt benchmark xuất sắc vào thư viện chung.'
                : 'Register your own developer badge, enter your AI certification, and contribute new benchmark prompts to the community library.'}
            </p>
            <Link to="/dev-studio" className="text-xs text-indigo-400 hover:underline inline-block pt-1 font-mono">
              {lang === 'vi' ? 'Tạo Hồ sơ →' : 'Create Profile →'}
            </Link>
          </div>
        </div>
      </section>

      {/* Section 5: FAQ Accordion */}
      <section id="faq" className="space-y-5 border-t border-[var(--border-subtle)] pt-8">
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center space-x-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" />
            <span>{lang === 'vi' ? '5. Các Câu Hỏi Thường Gặp (FAQ)' : '5. Frequently Asked Questions'}</span>
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {lang === 'vi' ? 'Giải đáp các thắc mắc phổ biến về kỹ thuật và cách vận hành.' : 'Answers to common questions regarding operation and methodologies.'}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx} 
                className="craft-card border border-[var(--border-subtle)] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--bg-elevated)] transition-colors"
                >
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-[var(--text-muted)] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 font-mono">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Author & Open Source Footer Note */}
      <section className="p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-mono font-semibold text-[var(--text-primary)]">
            Prompt AI PNIT • Tác giả: Phạm Ngọc Tài Anh (@taianh20102011)
          </div>
          <div className="text-[11px] font-mono text-[var(--text-muted)]">
            Được bảo vệ bởi Google reCAPTCHA v3 & Tiêu chuẩn kiến trúc Anti-Slop.
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <Link
            to="/inspector"
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold flex items-center space-x-1.5 transition-colors shadow-xs"
          >
            <span>{lang === 'vi' ? 'Bắt đầu kiểm định ngay' : 'Audit a Prompt Now'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
