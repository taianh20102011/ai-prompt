import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Bot, 
  BookOpen, 
  GitBranch, 
  Lock, 
  ShieldAlert, 
  CheckCircle2, 
  Zap, 
  Cpu, 
  Layers, 
  Code2, 
  Terminal,
  ExternalLink,
  Award,
  Users
} from 'lucide-react';
import ShinyText from '../components/react-bits/ShinyText';
import SpotlightCard from '../components/react-bits/SpotlightCard';

export default function LandingPage() {
  const navigate = useNavigate();
  const [samplePrompt, setSamplePrompt] = useState('Nâng cấp hệ thống web này chuẩn Anti-Slop và bảo mật cao');

  const handleStartInspection = (e) => {
    e?.preventDefault();
    navigate('/inspector', { state: { initialPrompt: samplePrompt } });
  };

  return (
    <div className="space-y-16 animate-fadeIn pb-12">
      {/* 1. HERO SECTION */}
      <div className="text-center space-y-6 pt-4 max-w-4xl mx-auto">
        {/* Protection & Standard Badge */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/25 text-emerald-400 font-mono text-xs">
          <span className="flex items-center space-x-1 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ĐƯỢC BẢO VỆ BỞI GOOGLE RECAPTCHA V3</span>
          </span>
          <span className="opacity-40">•</span>
          <span className="text-[var(--text-secondary)]">ZERO-TRUST ENCLAVE</span>
          <span className="opacity-40">•</span>
          <span className="text-indigo-400">APACHE 2.0</span>
        </div>

        {/* Main Title */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.15]">
            <ShinyText text="Prompt AI PNIT" speed={4} />
          </h1>
          <p className="text-lg sm:text-xl font-medium text-indigo-400 font-mono">
            Hệ Thống Kiểm Định, Tinh Chỉnh & Nâng Tầm Prompt AI Tiêu Chuẩn Quốc Tế
          </p>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Nền tảng kỹ thuật loại bỏ triệt để <strong>AI Slop</strong>, rà soát cấu trúc Prompt 6 chiều (Role, Context, Objective, Constraints), trang bị trợ lý Cortex Bot chuỗi suy luận Chain-of-Thought và tài liệu nghiên cứu Prompt Thấu Cảm.
        </p>

        {/* Author Attribution Highlight */}
        <div className="inline-block px-4 py-1.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs font-mono text-[var(--text-muted)]">
          Tác giả & Kiến trúc sư: <strong className="text-[var(--text-primary)]">Phạm Ngọc Tài Anh</strong> • Giấy phép Mã Nguồn Mở: <span className="text-indigo-400 font-semibold">Apache License 2.0</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('/inspector')}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer shadow-md shadow-indigo-600/20"
          >
            <Compass className="w-4 h-4" />
            <span>Bắt Đầu Kiểm Định Prompt</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => navigate('/trained-bot')}
            className="neu-button px-5 py-3 text-xs font-mono font-semibold flex items-center space-x-2 text-indigo-400 cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span>Trò Chuyện Cortex Bot (Miễn Phí ∞)</span>
          </button>

          <button
            onClick={() => navigate('/research-guide')}
            className="neu-button px-5 py-3 text-xs font-mono font-semibold flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Tài Liệu Nghiên Cứu Thấu Cảm</span>
          </button>
        </div>
      </div>

      {/* 2. KHỐI TRẢ LỜI: HỆ THỐNG ĐƯỢC BẢO VỆ BỞI CÁI GÌ? (SECURITY & TRUST MATRIX) */}
      <div className="space-y-4 max-w-5xl mx-auto">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>LỚP PHÒNG THỦ & BẢO MẬT HỆ THỐNG</span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Hệ Thống Được Bảo Vệ Bởi Những Công Nghệ Nào?
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Mọi thao tác, phiên đăng nhập và dữ liệu trao đổi trong Prompt AI PNIT được giám sát bởi 3 lớp phòng ngự độc lập:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Google reCAPTCHA v3 */}
          <SpotlightCard className="p-5 space-y-3 border-emerald-500/30">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-950/40 text-emerald-400 border border-emerald-800/50 flex items-center justify-center font-bold font-mono text-xs">
                v3
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800">
                ACTIVE DEFENSE
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Google reCAPTCHA v3
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Đánh giá rủi ro vô hình theo thời gian thực (Realtime Risk Score 0.0 - 1.0). Ngăn chặn 100% bot spam, bot tự động quét và tấn công vét cạn tài nguyên mà không làm phiền người dùng bằng captcha giải đố hình ảnh.
              </p>
            </div>
          </SpotlightCard>

          {/* Card 2: SHA-256 Zero-Trust Enclave */}
          <SpotlightCard className="p-5 space-y-3 border-indigo-500/30">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-indigo-950/40 text-indigo-400 border border-indigo-800/50 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800">
                ZERO-TRUST
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                SHA-256 Enclave Session
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Phiên làm việc quản trị được mã hóa bằng Cookie HttpOnly 4 giờ và chữ ký số HMAC SHA-256 Client Fingerprinting. Miễn nhiễm với tấn công XSS trộm Session Storage hay CSRF đánh cắp quyền hạn.
              </p>
            </div>
          </SpotlightCard>

          {/* Card 3: Anti-IDOR Masked Hash */}
          <SpotlightCard className="p-5 space-y-3 border-amber-500/30">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-amber-950/40 text-amber-400 border border-amber-800/50 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800">
                ANTI-IDOR
              </span>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Mã Hóa Ẩn ID (Anti-IDOR)
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                ID thực trong cơ sở dữ liệu bị che giấu hoàn toàn trước client và thay thế bằng chuỗi Masked Hash an toàn một chiều. Ngăn chặn triệt để hành vi trích xuất dữ liệu trái phép (Insecure Direct Object Reference).
              </p>
            </div>
          </SpotlightCard>
        </div>
      </div>

      {/* 3. KHÁM PHÁ CÁC TÍNH NĂNG CHÍNH (FEATURE HUBS) */}
      <div className="space-y-4 max-w-5xl mx-auto">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>KIẾN TRÚC PHÂN HỆ CÔNG CỤ</span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Các Module Chuyên Nghiệp Trong Prompt AI PNIT
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Module 1: Inspector */}
          <Link to="/inspector" className="block group">
            <div className="craft-card p-6 space-y-3 h-full flex flex-col justify-between transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-indigo-950/40 text-indigo-400 border border-indigo-900/40">
                    <Compass className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-indigo-400 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Mở công cụ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  Bộ Kiểm Định Prompt (Heuristic 6D Inspector)
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Rà soát cấu trúc 4 trụ cột R-C-O-C (Role, Context, Objective, Constraints), đo lường độ đa dạng từ vựng Lexical Diversity và lọc sạch từ ngữ mơ hồ gây ra hiện tượng sinh văn bản rác (AI Slop).
                </p>
              </div>
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span>Chấm điểm /100</span>
                <span>Tự động viết lại Prompt chuẩn</span>
              </div>
            </div>
          </Link>

          {/* Module 2: Cortex Bot */}
          <Link to="/trained-bot" className="block group">
            <div className="craft-card p-6 space-y-3 h-full flex flex-col justify-between transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-purple-950/40 text-purple-400 border border-purple-900/40">
                    <Bot className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-purple-400 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Mở trợ lý</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  Trợ Lý AI Cortex Bot (Chain-of-Thought)
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Trợ lý thông minh miễn phí 100% không giới hạn lượt hỏi, hiển thị quá trình suy luận (Chain-of-Thought), tích hợp tri thức RAG và tự động đồng bộ Edge Storage tránh tràn bộ nhớ.
                </p>
              </div>
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span>4 Chế độ suy luận</span>
                <span>Vercel Edge DB Sync</span>
              </div>
            </div>
          </Link>

          {/* Module 3: Research Docs Hub */}
          <Link to="/research-guide" className="block group">
            <div className="craft-card p-6 space-y-3 h-full flex flex-col justify-between transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-amber-950/40 text-amber-400 border border-amber-900/40">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-amber-400 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Đọc tài liệu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  Nghiên Cứu Prompt Thấu Cảm & Docs Hub
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Tài liệu giải mã nguyên nhân AI trả lời khô khan theo cơ chế Alignment Tax của RLHF và giải pháp Protocol H-E-A-R. Hỗ trợ đọc toàn văn, tải file .md và nạp file tài liệu cá nhân.
                </p>
              </div>
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span>4 Ngôn ngữ: VI, EN, FR, DE</span>
                <span>Tải lên & Tải về .md</span>
              </div>
            </div>
          </Link>

          {/* Module 4: Global AI Ecosystem */}
          <Link to="/news" className="block group">
            <div className="craft-card p-6 space-y-3 h-full flex flex-col justify-between transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-emerald-950/40 text-emerald-400 border border-emerald-900/40">
                    <GitBranch className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                    <span>Xem kho repos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  Kho 50+ GitHub AI Repositories Toàn Cầu
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Tra cứu trực tiếp hệ sinh thái AI mã nguồn mở chất lượng cao: Google Gemini SDKs, Microsoft AutoGen, DeepSeek-R1, Ollama, LangChain và các công cụ hàng đầu.
                </p>
              </div>
              <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
                <span>Realtime GitHub Search</span>
                <span>50+ Top Repos Fallback</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* 4. HỘP DÙNG THỬ NHANH PROMPT (INTERACTIVE TEST DRIVE) */}
      <div className="craft-card p-6 sm:p-8 space-y-4 max-w-4xl mx-auto border-indigo-500/30">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>TRẢI NGHIỆM TRỰC TIẾP</span>
          </div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">
            Nhập Thử Một Prompt Để Xem Điểm Kiểm Định
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Điền câu lệnh bất kỳ của bạn, hệ thống sẽ mở ngay trang Kiểm Định để tính điểm 4 trụ cột và đề xuất Prompt tối ưu:
          </p>
        </div>

        <form onSubmit={handleStartInspection} className="space-y-3">
          <textarea
            rows={3}
            value={samplePrompt}
            onChange={(e) => setSamplePrompt(e.target.value)}
            className="craft-input w-full p-4 text-xs font-mono text-[var(--text-primary)] resize-y leading-relaxed"
            placeholder="Nhập prompt cần kiểm thử tại đây..."
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="flex items-center space-x-2 text-[11px] font-mono text-[var(--text-muted)]">
              <span>Độ dài: {samplePrompt.trim().split(/\s+/).filter(Boolean).length} từ</span>
              <span>•</span>
              <span className="text-emerald-400">AST Heuristic Parser sẵn sàng</span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer shadow-xs"
            >
              <span>Tiến Hành Kiểm Định Chi Tiết</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
