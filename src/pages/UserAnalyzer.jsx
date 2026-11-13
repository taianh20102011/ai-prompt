import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  SlidersHorizontal, 
  Copy, 
  Check, 
  Terminal, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Search,
  Zap,
  CornerDownRight,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  Gauge,
  Cpu,
  Sliders,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { analyzePromptLocally, TARGET_AI_MODELS } from '../services/promptService';
import { getStorageData, DEFAULT_BENCHMARKS } from '../services/mockStorage';
import { useLanguage } from '../context/LanguageContext';

const CATEGORIES_VI = [
  'Tự động phát hiện (Auto-detect)',
  'Công nghệ thông tin (Engineering)',
  'Tâm lý & Tư vấn (Persona / Empathy)',
  'Marketing & Growth Content',
  'Giáo dục & Học thuật',
  'Kinh doanh & Đàm phán'
];

const CATEGORIES_EN = [
  'Auto-detect (Recommended)',
  'Information Technology (Engineering)',
  'Psychology & Empathy (Persona)',
  'Marketing & Growth Content',
  'Education & Academics',
  'Business & Negotiation'
];

export default function UserAnalyzer() {
  const { t, lang } = useLanguage();
  const categories = lang === 'vi' ? CATEGORIES_VI : CATEGORIES_EN;
  const location = useLocation();
  const [promptInput, setPromptInput] = useState(() => {
    return location.state?.initialPrompt || '';
  });
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [targetAI, setTargetAI] = useState('universal');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [copiedUpgraded, setCopiedUpgraded] = useState(false);
  const [copiedBenchmarkId, setCopiedBenchmarkId] = useState(null);

  useEffect(() => {
    if (location.state?.initialPrompt && !result) {
      handleInspect(location.state.initialPrompt);
    }
  }, [location.state?.initialPrompt]);

  const [benchmarks] = useState(() => {
    const saved = getStorageData('promptcraft_benchmarks', DEFAULT_BENCHMARKS);
    if (Array.isArray(saved) && saved.length < DEFAULT_BENCHMARKS.length) {
      const existingIds = new Set(saved.map(b => b.id));
      const merged = [...saved, ...DEFAULT_BENCHMARKS.filter(b => !existingIds.has(b.id))];
      return merged;
    }
    return saved;
  });
  const [searchBenchmark, setSearchBenchmark] = useState('');
  const [benchmarkPage, setBenchmarkPage] = useState(1);
  const benchmarksPerPage = 3;

  useEffect(() => {
    setBenchmarkPage(1);
  }, [searchBenchmark]);

  const handleInspect = async (promptOverride, targetAIOverride) => {
    let textToAnalyze = typeof promptOverride === 'string' ? promptOverride : promptInput;
    if (!textToAnalyze || !textToAnalyze.trim()) {
      textToAnalyze = lang === 'vi' 
        ? 'Nâng cấp hệ thống web này cho mượt mà, chuyên nghiệp và bảo mật hơn' 
        : 'Upgrade this web application architecture for better performance, smoothness and security';
      setPromptInput(textToAnalyze);
    }

    const activeTarget = targetAIOverride || targetAI;
    setIsAnalyzing(true);
    try {
      const data = await analyzePromptLocally(textToAnalyze, selectedCategory, activeTarget);
      setResult(data);
    } catch (err) {
      console.error('Error analyzing prompt:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedUpgraded(true);
    setTimeout(() => setCopiedUpgraded(false), 2000);
  };

  const handleCopyBenchmark = (bm) => {
    navigator.clipboard.writeText(bm.optimizedPrompt);
    setCopiedBenchmarkId(bm.id);
    setTimeout(() => setCopiedBenchmarkId(null), 2000);
  };

  const filteredBenchmarks = benchmarks.filter(b => 
    b.title.toLowerCase().includes(searchBenchmark.toLowerCase()) ||
    b.industry.toLowerCase().includes(searchBenchmark.toLowerCase()) ||
    (b.tags && b.tags.some(t => t.toLowerCase().includes(searchBenchmark.toLowerCase())))
  );

  const totalBenchmarkPages = Math.max(1, Math.ceil(filteredBenchmarks.length / benchmarksPerPage));
  const displayedBenchmarks = filteredBenchmarks.slice(
    (benchmarkPage - 1) * benchmarksPerPage, 
    benchmarkPage * benchmarksPerPage
  );

  const quickSamples = lang === 'vi'
    ? [
        {
          label: 'Nhờ góp ý & sửa CV xin việc',
          prompt: 'Giúp tôi góp ý và viết lại CV xin việc ngành IT sao cho ấn tượng với nhà tuyển dụng'
        },
        {
          label: 'Tâm sự khi đang áp lực công việc',
          prompt: 'Tôi đang cảm thấy khá áp lực và mất phương hướng trong công việc, hãy lắng nghe và trò chuyện cùng tôi'
        },
        {
          label: 'Tối ưu & sửa lỗi trang web',
          prompt: 'Nâng cấp hệ thống web này cho mượt mà, dễ dùng và an toàn hơn'
        }
      ]
    : [
        {
          label: 'Improve my software engineer CV',
          prompt: 'Help review and rewrite my software engineering resume so it stands out to hiring managers'
        },
        {
          label: 'Talk through work stress',
          prompt: 'I am feeling overwhelmed and stuck with work pressure lately, please listen and talk it through with me'
        },
        {
          label: 'Optimize & debug a web app',
          prompt: 'Upgrade this web application for smoother performance, clarity, and stronger security'
        }
      ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Clean, Friendly Header */}
      <section className="space-y-2.5 border-b border-[var(--border-subtle)] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center space-x-2 text-xs text-[var(--text-secondary)] px-3 py-1 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
            <span>{t.inspector.badge}</span>
          </div>
          <Link
            to="/guide"
            className="flex items-center space-x-1.5 px-3 py-1 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
            <span>{lang === 'vi' ? 'Xem hướng dẫn cách dùng' : 'How to use'}</span>
          </Link>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          {t.inspector.title}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          {t.inspector.subtitle}
        </p>
      </section>

      {/* Step-by-Step Friendly Input Workbench Card */}
      <div className="craft-card p-5 sm:p-6 space-y-6">
        <form onSubmit={handleInspect} className="space-y-6">
          {/* STEP 1: Natural Input + Quick Sample Pills */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-sm font-semibold text-[var(--text-primary)]">
                {lang === 'vi' ? '1. Bạn muốn nhờ AI làm việc gì?' : '1. What would you like AI to help you with?'}
              </label>
              <span className="text-xs text-[var(--text-muted)]">
                {t.inspector.parserEngine}
              </span>
            </div>

            {/* Quick Human Examples Right Above Textarea */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-[var(--text-muted)]">
                {lang === 'vi' ? 'Thử nhanh:' : 'Quick examples:'}
              </span>
              {quickSamples.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPromptInput(sample.prompt);
                    handleInspect(sample.prompt);
                  }}
                  className="px-3 py-1 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:border-[#2563EB]/50 hover:text-[var(--text-primary)] text-xs text-[var(--text-secondary)] transition-colors cursor-pointer"
                >
                  {sample.label}
                </button>
              ))}
            </div>

            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder={t.inspector.placeholder}
              rows={4}
              className="w-full p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#2563EB] transition-colors resize-y leading-relaxed"
            />
            <div className="flex justify-between items-center text-xs text-[var(--text-muted)]">
              <span>
                {lang === 'vi'
                  ? `Độ dài hiện tại: ${promptInput.trim() ? promptInput.trim().split(/\s+/).length : 0} từ`
                  : `Current length: ${promptInput.trim() ? promptInput.trim().split(/\s+/).length : 0} words`}
              </span>
              <span>
                {lang === 'vi' ? 'Mẹo: Cứ viết tự nhiên như đang nhắn tin' : 'Tip: Just write naturally in plain words'}
              </span>
            </div>
          </div>

          {/* STEP 2: Target AI & Optional Topic */}
          <div className="space-y-3 pt-4 border-t border-[var(--border-subtle)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {lang === 'vi' ? '2. Bạn định dán câu lệnh này vào đâu?' : '2. Which AI will you paste this prompt into?'}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-[8px] bg-[#2563EB]/12 text-[#2563EB] dark:text-blue-400 font-medium">
                    {t.inspector.targetAiBadge}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)]">
                  {t.inspector.targetAiDesc}
                </p>
              </div>

              {/* Optional Topic Selector */}
              <div className="flex items-center space-x-2 shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--text-muted)] hidden sm:block" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="text-xs px-3 py-2 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] w-full sm:w-auto focus:outline-none focus:border-[#2563EB] transition-colors"
                  aria-label={t.inspector.categoryLabel}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1">
              {TARGET_AI_MODELS.map((model) => {
                const isSelected = targetAI === model.id;
                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => {
                      setTargetAI(model.id);
                      if (result && promptInput.trim()) {
                        handleInspect(promptInput, model.id);
                      }
                    }}
                    className={`px-3 py-2.5 rounded-[8px] border text-left flex items-center justify-between transition-all active:scale-[0.98] cursor-pointer ${
                      isSelected
                        ? 'border-[#2563EB] bg-[#2563EB]/12 text-[var(--text-primary)] ring-1 ring-[#2563EB]/40'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]'
                    }`}
                    title={model.description}
                  >
                    <span className="text-xs font-semibold truncate">{model.shortName}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-blue-500 shrink-0 ml-1.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                const sample = lang === 'vi' ? 'Nâng cấp hệ thống web này cho mượt mà, chuyên nghiệp và bảo mật hơn' : 'Upgrade this web application architecture for better performance, smoothness and security';
                setPromptInput(sample);
                handleInspect(sample);
              }}
              className="px-4 py-2.5 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-page)] text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              {t.inspector.btnSample}
            </button>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="px-6 py-2.5 rounded-[8px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-[0.98]"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{t.inspector.btnInspecting}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'vi' ? 'Viết lại & Tối ưu câu lệnh' : 'Rewrite & Optimize Prompt'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* RESULT SECTION: RESULT-FIRST, STEP-BY-STEP, JARGON-FREE */}
        {result && (
          <div className="pt-6 border-t border-[var(--border-subtle)] space-y-6 animate-fadeIn">
            {/* 1. FIRST (TOP OF RESULTS): Ready-to-Use Rewritten Prompt */}
            <div className="p-5 rounded-[8px] border border-[#2563EB]/40 bg-[var(--bg-elevated)] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-[var(--text-primary)] flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>
                        {lang === 'vi'
                          ? 'Câu lệnh đã viết lại cho bạn (Sẵn sàng sử dụng)'
                          : 'Your Rewritten Prompt (Ready to Use)'}
                      </span>
                    </span>
                    <span className="text-[11px] px-2 py-0.5 rounded-[8px] bg-[#2563EB]/15 text-[#2563EB] dark:text-blue-400 font-medium">
                      {result.targetAIDetails?.name || 'Chuẩn AI'}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">
                    {lang === 'vi'
                      ? `Định dạng tối ưu: ${result.targetAIDetails?.badge} • Phù hợp cho ${result.targetAIDetails?.recommendedFor}`
                      : `Format: ${result.targetAIDetails?.badge} • Best for ${result.targetAIDetails?.recommendedFor}`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(result.upgradedPrompt)}
                  className="px-4 py-2 rounded-[8px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {copiedUpgraded ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>
                    {copiedUpgraded
                      ? (lang === 'vi' ? 'Đã sao chép!' : 'Copied!')
                      : (lang === 'vi' ? 'Sao chép câu lệnh này' : 'Copy this prompt')}
                  </span>
                </button>
              </div>

              {/* Quick AI Switcher for Result */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-[var(--text-muted)] mr-1">
                  {lang === 'vi' ? 'Đổi nhanh sang AI khác:' : 'Switch AI:'}
                </span>
                {TARGET_AI_MODELS.map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setTargetAI(m.id);
                      handleInspect(promptInput, m.id);
                    }}
                    className={`px-2.5 py-1 rounded-[8px] text-[11px] transition-colors cursor-pointer ${
                      targetAI === m.id
                        ? 'bg-[#2563EB] text-white font-semibold'
                        : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                    title={m.description}
                  >
                    {m.shortName}
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs sm:text-[13px] text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto select-text">
                {result.upgradedPrompt}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
                <span className="text-[var(--text-muted)]">
                  {lang === 'vi'
                    ? 'Chỉ cần bấm "Sao chép" ở trên rồi dán trực tiếp vào khung chat của AI bạn đang dùng.'
                    : 'Click Copy above and paste directly into your favorite AI chat window.'}
                </span>
                <Link
                  to="/trained-bot"
                  state={{ initialPrompt: result.upgradedPrompt }}
                  className="text-[#2563EB] dark:text-blue-400 hover:underline font-medium flex items-center space-x-1 shrink-0"
                >
                  <span>{lang === 'vi' ? 'Mang sang thử với Trợ lý AI →' : 'Try this with AI Companion →'}</span>
                </Link>
              </div>
            </div>

            {/* 2. SECOND: Clarity Score & 4 Everyday Elements */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] gap-3">
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-[var(--text-primary)]">
                    {lang === 'vi' ? 'Mức độ rõ ràng của câu lệnh gốc' : 'Clarity of your original prompt'}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">
                    {result.score >= 80
                      ? t.inspector.scoreGradeExcellent
                      : result.score >= 50
                      ? t.inspector.scoreGradeGood
                      : t.inspector.scoreGradeNeedsWork}
                    {' • '}
                    <span>{lang === 'vi' ? 'Chủ đề:' : 'Topic:'} <strong className="text-[var(--text-primary)]">{result.detectedCategory}</strong></span>
                  </div>
                </div>
                <div className="flex items-baseline space-x-1.5">
                  <span className={`text-3xl font-bold tabular-nums ${
                    result.score >= 80 ? 'text-emerald-400' :
                    result.score >= 50 ? 'text-amber-400' : 'text-blue-400'
                  }`}>
                    {result.score}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">/ 100 điểm</span>
                </div>
              </div>

              {result.dimensions && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[var(--text-primary)]">Vai trò (Role)</span>
                      <span className="font-bold text-[#2563EB] dark:text-blue-400 tabular-nums">{result.dimensions.roleScore}/25</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)]">AI đóng vai chuyên gia hay người bạn nào?</p>
                  </div>
                  <div className="p-3.5 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[var(--text-primary)]">Hoàn cảnh (Context)</span>
                      <span className="font-bold text-[#2563EB] dark:text-blue-400 tabular-nums">{result.dimensions.contextScore}/25</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)]">Tình huống và thông tin nền đã đủ chưa?</p>
                  </div>
                  <div className="p-3.5 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[var(--text-primary)]">Mục tiêu (Objective)</span>
                      <span className="font-bold text-[#2563EB] dark:text-blue-400 tabular-nums">{result.dimensions.objectiveScore}/25</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)]">Yêu cầu chính cần AI giải quyết là gì?</p>
                  </div>
                  <div className="p-3.5 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[var(--text-primary)]">Lưu ý riêng (Constraints)</span>
                      <span className="font-bold text-[#2563EB] dark:text-blue-400 tabular-nums">{result.dimensions.constraintsScore}/25</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)]">Cách trình bày và những điều AI cần tránh.</p>
                  </div>
                </div>
              )}
            </div>

            {/* 3. THIRD: Friendly Improvement Suggestions (Combined Constructive Guidance) */}
            {((result.missingPoints && result.missingPoints.length > 0) || (result.detectedAmbiguities && result.detectedAmbiguities.length > 0)) && (
              <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-3">
                <div className="text-sm font-semibold text-[var(--text-primary)]">
                  {lang === 'vi' ? 'Gợi ý nhỏ để câu lệnh của bạn tốt hơn' : 'Helpful tips to make your prompt even clearer'}
                </div>

                {result.detectedAmbiguities && result.detectedAmbiguities.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.detectedAmbiguities.map((item, idx) => (
                      <div key={`amb-${idx}`} className="p-3 rounded-[8px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs space-y-0.5">
                        <div className="font-semibold text-amber-400">
                          {lang === 'vi' ? `Từ hơi chung chung: "${item.word}"` : `Somewhat vague: "${item.word}"`}
                        </div>
                        <p className="text-[var(--text-secondary)] leading-relaxed">{item.fix}</p>
                      </div>
                    ))}
                  </div>
                )}

                {result.missingPoints && result.missingPoints.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {result.missingPoints.map((item, idx) => (
                      <div key={`miss-${idx}`} className="p-3 rounded-[8px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs space-y-1">
                        <div className="flex items-center space-x-2 font-semibold text-[var(--text-primary)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                          <span>{item.item}</span>
                        </div>
                        <p className="text-[var(--text-secondary)] leading-relaxed pl-3.5">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 4. FOURTH: Collapsible Technical Details for Developers */}
            <details className="rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
              <summary className="px-4 py-3 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer select-none">
                {lang === 'vi'
                  ? 'Xem thêm thông số kỹ thuật nâng cao (Dành cho lập trình viên)'
                  : 'View advanced technical metrics (For developers)'}
              </summary>
              <div className="p-4 pt-2 border-t border-[var(--border-subtle)] space-y-5">
                {result.metrics && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex items-center justify-between">
                      <span className="text-[var(--text-secondary)]">Từ ngữ & Token:</span>
                      <span className="font-bold text-[var(--text-primary)] tabular-nums">
                        {result.metrics.wordCount} từ (~{result.metrics.estimatedTokens})
                      </span>
                    </div>
                    <div className="p-3 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex items-center justify-between">
                      <span className="text-[var(--text-secondary)]">Đa dạng từ vựng:</span>
                      <span className="font-bold text-blue-400 tabular-nums">
                        {result.metrics.lexicalDiversity}%
                      </span>
                    </div>
                    <div className="p-3 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex items-center justify-between">
                      <span className="text-[var(--text-secondary)]">An toàn câu lệnh:</span>
                      <span className={`font-bold flex items-center space-x-1 ${
                        result.securityAudit?.hasRisk ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        {result.securityAudit?.hasRisk ? <ShieldAlert className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                        <span>{result.securityAudit?.posture}</span>
                      </span>
                    </div>
                  </div>
                )}

                {result.modelReadiness && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                      Độ tương thích theo từng AI
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
                      {result.modelReadiness.map((m, idx) => (
                        <div key={idx} className="p-3 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-[var(--text-primary)]">{m.name}</span>
                            <span className="text-blue-400 font-bold tabular-nums">{m.score}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-[var(--border-subtle)] overflow-hidden">
                            <div className="h-full bg-[#2563EB] rounded-full" style={{ width: `${m.score}%` }} />
                          </div>
                          <p className="text-[10px] text-[var(--text-muted)] truncate">{m.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.suggestedParams && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-1">
                      <span className="text-[var(--text-muted)] text-[10px] uppercase">Temperature khuyến nghị</span>
                      <div className="text-base font-bold text-blue-400 tabular-nums">{result.suggestedParams.temp}</div>
                    </div>
                    <div className="p-3 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-1">
                      <span className="text-[var(--text-muted)] text-[10px] uppercase">Top-P & Repetition Penalty</span>
                      <div className="text-base font-bold text-emerald-400 tabular-nums">Top-P: {result.suggestedParams.topP}</div>
                      <p className="text-[10px] text-[var(--text-secondary)]">Penalty: {result.suggestedParams.repPenalty}</p>
                    </div>
                    <div className="p-3 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-1">
                      <span className="text-[var(--text-muted)] text-[10px] uppercase">Persona nhận diện</span>
                      <div className="text-xs font-semibold text-[var(--text-primary)]">{result.detectedRole}</div>
                    </div>
                  </div>
                )}

                {result.assignedLibraries && result.assignedLibraries.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                      Thư viện gợi ý ({result.assignedLibraries.length})
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {result.assignedLibraries.map((lib, idx) => (
                        <div key={idx} className="p-3 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-semibold text-[var(--text-primary)]">{lib.name}</span>
                            <span className="text-[9px] font-mono text-[var(--text-muted)] bg-[var(--bg-page)] border border-[var(--border-subtle)] px-1.5 py-0.5 rounded">npm</span>
                          </div>
                          <code className="text-[10px] font-mono text-blue-400 block truncate">{lib.npm}</code>
                          <p className="text-[10px] text-[var(--text-secondary)] truncate">{lib.role}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </details>
          </div>
        )}
      </div>

      {/* Humanized Prompt Templates Library */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {lang === 'vi' ? 'Thư viện Câu lệnh Mẫu (Chép dùng ngay)' : 'Ready-to-Use Prompt Library'}
              </h2>
              <span className="text-[11px] px-2.5 py-0.5 rounded-[8px] bg-[#2563EB]/12 text-[#2563EB] dark:text-blue-400 font-medium">
                {filteredBenchmarks.length} {lang === 'vi' ? 'mẫu' : 'templates'} • {lang === 'vi' ? 'Trang' : 'Page'} {benchmarkPage}/{totalBenchmarkPages}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              {lang === 'vi' 
                ? 'Những mẫu câu lệnh đã được biên soạn sẵn cho từng tình huống thực tế. Bấm "Chép" để dùng ngay, hoặc "Thử mẫu này" để tùy biến theo ý bạn.' 
                : 'Ready-made prompts for real situations. Click "Copy" to use immediately, or "Try this" to customize it.'}
            </p>
          </div>

          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none" />
            <input
              type="text"
              value={searchBenchmark}
              onChange={(e) => setSearchBenchmark(e.target.value)}
              placeholder={lang === 'vi' ? 'Tìm theo chủ đề, từ khóa...' : 'Search by topic, keyword...'}
              className="craft-input w-full text-xs pl-8 pr-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {displayedBenchmarks.map((bm) => (
            <div key={bm.id} className="craft-card p-4 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#2563EB] dark:text-blue-400 font-semibold">{bm.industry}</span>
                  <span className="text-amber-400 font-medium tabular-nums">★ {bm.rating}</span>
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{bm.title}</h3>
                <div className="p-3 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs text-[var(--text-secondary)] max-h-28 overflow-y-auto leading-relaxed select-text">
                  {bm.optimizedPrompt}
                </div>
              </div>

              <div className="pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2 text-xs">
                <span className="text-[var(--text-muted)] truncate max-w-[100px] text-[11px]" title={bm.author}>
                  {bm.author.split('(')[0].trim()}
                </span>
                
                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    onClick={() => handleCopyBenchmark(bm)}
                    className="px-2.5 py-1 rounded-[8px] border border-[var(--border-subtle)] hover:bg-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center space-x-1 cursor-pointer transition-colors"
                    title={lang === 'vi' ? 'Sao chép câu lệnh mẫu này' : 'Copy prompt template'}
                  >
                    {copiedBenchmarkId === bm.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">{lang === 'vi' ? 'Đã chép' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>{lang === 'vi' ? 'Chép' : 'Copy'}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setPromptInput(bm.originalPrompt);
                      handleInspect(bm.originalPrompt);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className="px-2.5 py-1 rounded-[8px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex items-center space-x-1 cursor-pointer transition-colors font-medium"
                    title={lang === 'vi' ? 'Nạp mẫu này lên khung kiểm tra' : 'Load template into editor'}
                  >
                    <span>{lang === 'vi' ? 'Thử mẫu này' : 'Try this'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination (3 templates per page) */}
        {totalBenchmarkPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 pb-1 border-t border-[var(--border-subtle)] gap-3 text-xs">
            <button
              onClick={() => {
                setBenchmarkPage(prev => Math.max(1, prev - 1));
              }}
              disabled={benchmarkPage === 1}
              className="px-3.5 py-1.5 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] disabled:opacity-30 disabled:pointer-events-none flex items-center space-x-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer w-full sm:w-auto justify-center"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{lang === 'vi' ? '3 Mẫu Trước' : 'Previous 3'}</span>
            </button>

            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
              {Array.from({ length: totalBenchmarkPages }, (_, i) => {
                const pageNum = i + 1;
                const isActive = benchmarkPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setBenchmarkPage(pageNum)}
                    className={`w-8 h-8 rounded-[8px] text-xs font-medium flex items-center justify-center transition-all shrink-0 tabular-nums ${
                      isActive
                        ? 'bg-[#2563EB] text-white font-bold cursor-default'
                        : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                setBenchmarkPage(prev => Math.min(totalBenchmarkPages, prev + 1));
              }}
              disabled={benchmarkPage === totalBenchmarkPages}
              className="px-3.5 py-1.5 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] disabled:opacity-30 disabled:pointer-events-none flex items-center space-x-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer w-full sm:w-auto justify-center"
            >
              <span>{lang === 'vi' ? '3 Mẫu Kế Tiếp' : 'Next 3'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
