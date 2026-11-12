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
  HelpCircle
} from 'lucide-react';
import { analyzePromptLocally } from '../services/promptService';
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
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [copiedUpgraded, setCopiedUpgraded] = useState(false);
  const [copiedBenchmarkId, setCopiedBenchmarkId] = useState(null);

  useEffect(() => {
    if (location.state?.initialPrompt && !result) {
      handleInspect(location.state.initialPrompt);
    }
  }, [location.state?.initialPrompt]);

  const [benchmarks] = useState(() => 
    getStorageData('promptcraft_benchmarks', DEFAULT_BENCHMARKS)
  );
  const [searchBenchmark, setSearchBenchmark] = useState('');

  const handleInspect = async (promptOverride) => {
    const textToAnalyze = typeof promptOverride === 'string' ? promptOverride : promptInput;
    if (!textToAnalyze || !textToAnalyze.trim()) return;

    setIsAnalyzing(true);
    try {
      const data = await analyzePromptLocally(textToAnalyze, selectedCategory);
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
    b.industry.toLowerCase().includes(searchBenchmark.toLowerCase())
  );

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Clean Header */}
      <section className="space-y-2 border-b border-[var(--border-subtle)] pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-[var(--text-secondary)] px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>{lang === 'vi' ? 'Kiểm định cấu trúc câu lệnh' : 'Prompt Structure Analyzer'}</span>
          </div>
          <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[11px] font-mono text-[var(--text-muted)]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Google reCAPTCHA v3</span>
          </span>
          <Link
            to="/guide"
            className="flex items-center space-x-1.5 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 text-[11px] font-mono transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{lang === 'vi' ? 'Xem hướng dẫn sử dụng' : 'User Guide & FAQ'}</span>
          </Link>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          {t.inspector.title}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          {t.inspector.subtitle}
        </p>
      </section>

      {/* Input Workbench Card */}
      <div className="craft-card p-5 sm:p-6 space-y-4">
        <form onSubmit={handleInspect} className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="text-xs font-mono font-medium text-[var(--text-secondary)] uppercase tracking-wider flex items-center space-x-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t.inspector.categoryLabel}</span>
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs font-mono px-3 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-primary)] w-full sm:w-auto focus:outline-none focus:border-indigo-500 transition-colors"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder={t.inspector.placeholder}
              rows={4}
              className="w-full p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-sm font-mono text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-indigo-500 transition-colors resize-y leading-relaxed"
            />
            <div className="flex justify-between items-center text-[11px] font-mono text-[var(--text-muted)]">
              <span>{lang === 'vi' ? `Độ dài: ${promptInput.trim() ? promptInput.trim().split(/\s+/).length : 0} từ` : `Length: ${promptInput.trim() ? promptInput.trim().split(/\s+/).length : 0} words`}</span>
              <span>{t.inspector.parserEngine}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              type="button"
              onClick={() => setPromptInput(lang === 'vi' ? 'nâng cấp hệ thống web này' : 'upgrade this web application architecture')}
              className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-page)] text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              {t.inspector.btnSample}
            </button>

            <button
              type="submit"
              disabled={isAnalyzing || !promptInput.trim()}
              className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold font-mono disabled:opacity-40 flex items-center space-x-2 transition-colors cursor-pointer"
            >
              {isAnalyzing ? (
                <span>{t.inspector.btnInspecting}</span>
              ) : (
                <>
                  <span>{t.inspector.btnInspect}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Inspection Result Deck (Flat Hierarchy - No Card Lồng Card) */}
        {result && (
          <div className="pt-6 border-t border-[var(--border-subtle)] space-y-6 animate-fadeIn">
            {/* Top Score Matrix Bar (Flat Border Surface) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] gap-3">
              <div>
                <div className="text-xs font-mono text-[var(--text-muted)]">CHỈ SỐ THỰC THI (CONFIDENCE SCORE)</div>
                <div className="text-xs text-[var(--text-secondary)] mt-0.5">
                  Lĩnh vực nhận diện: <span className="text-[var(--text-primary)] font-semibold">{result.detectedCategory}</span>
                </div>
                <div className="text-[11px] text-[var(--text-muted)] font-mono mt-1">
                  Persona thẩm quyền: <span className="text-indigo-400 font-semibold">{result.detectedRole}</span>
                </div>
              </div>
              <div className="flex items-baseline space-x-1.5 font-mono">
                <span className={`text-4xl font-extrabold ${
                  result.score >= 80 ? 'text-emerald-400' :
                  result.score >= 50 ? 'text-amber-400' : 'text-rose-400'
                }`}>
                  {result.score}
                </span>
                <span className="text-xs text-[var(--text-muted)]">/ 100</span>
              </div>
            </div>

            {/* 4 Pillars Breakdown (R-C-O-C) - Flat Clean Surface */}
            {result.dimensions && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                  <div className="text-[var(--text-muted)] text-[10px]">ROLE (VAI TRÒ)</div>
                  <div className="text-[var(--text-primary)] font-bold text-sm mt-0.5">{result.dimensions.roleScore} / 25</div>
                </div>
                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                  <div className="text-[var(--text-muted)] text-[10px]">CONTEXT (BỐI CẢNH)</div>
                  <div className="text-[var(--text-primary)] font-bold text-sm mt-0.5">{result.dimensions.contextScore} / 25</div>
                </div>
                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                  <div className="text-[var(--text-muted)] text-[10px]">OBJECTIVE (MỤC TIÊU)</div>
                  <div className="text-[var(--text-primary)] font-bold text-sm mt-0.5">{result.dimensions.objectiveScore} / 25</div>
                </div>
                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                  <div className="text-[var(--text-muted)] text-[10px]">CONSTRAINTS (RÀNG BUỘC)</div>
                  <div className="text-[var(--text-primary)] font-bold text-sm mt-0.5">{result.dimensions.constraintsScore} / 25</div>
                </div>
              </div>
            )}

            {/* Metrics & Security Audit Row */}
            {result.metrics && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">Từ ngữ & Token:</span>
                  <span className="font-bold text-[var(--text-primary)]">
                    {result.metrics.wordCount} từ (~{result.metrics.estimatedTokens} tokens)
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">Độ đa dạng từ vựng:</span>
                  <span className="font-bold text-indigo-400">
                    {result.metrics.lexicalDiversity}% (Burstiness)
                  </span>
                </div>
                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] flex items-center justify-between">
                  <span className="text-[var(--text-secondary)]">Bảo mật Prompt:</span>
                  <span className={`font-bold flex items-center space-x-1 ${
                    result.securityAudit?.hasRisk ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {result.securityAudit?.hasRisk ? <ShieldAlert className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
                    <span>{result.securityAudit?.posture}</span>
                  </span>
                </div>
              </div>
            )}

            {/* Ambiguous Buzzwords Alert (if found) */}
            {result.detectedAmbiguities && result.detectedAmbiguities.length > 0 && (
              <div className="p-4 rounded-xl border border-amber-900/40 bg-amber-950/15 space-y-2 text-xs font-mono">
                <div className="text-amber-400 font-bold flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Phát hiện {result.detectedAmbiguities.length} từ mơ hồ (Nguy cơ sinh AI Slop):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {result.detectedAmbiguities.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/40 text-[11px]">
                      <span className="font-bold text-amber-300">"{item.word}": </span>
                      <span className="text-[var(--text-secondary)]">{item.fix}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Multi-Model Compatibility Matrix */}
            {result.modelReadiness && (
              <div className="space-y-2.5">
                <div className="text-xs font-mono font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                  Độ Tương Thích Mô Hình Đích (Model Readiness Matrix)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
                  {result.modelReadiness.map((m, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[var(--text-primary)]">{m.name}</span>
                        <span className="text-indigo-400 font-bold">{m.score}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[var(--border-subtle)] overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${m.score}%` }} />
                      </div>
                      <p className="text-[10px] text-[var(--text-muted)] truncate">{m.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hyperparameters & Negative Prompting Panel */}
            {result.suggestedParams && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-1">
                  <span className="text-[var(--text-muted)] text-[10px] uppercase">Temperature Khuyến Nghị</span>
                  <div className="text-lg font-bold text-indigo-400">{result.suggestedParams.temp}</div>
                  <p className="text-[10px] text-[var(--text-secondary)]">
                    {result.suggestedParams.temp < 0.5 ? 'Tối ưu cho code & kiến trúc chính xác' : 'Tối ưu cho hội thoại thấu cảm tự nhiên'}
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-1">
                  <span className="text-[var(--text-muted)] text-[10px] uppercase">Top-P & Repetition Penalty</span>
                  <div className="text-lg font-bold text-emerald-400">Top-P: {result.suggestedParams.topP}</div>
                  <p className="text-[10px] text-[var(--text-secondary)]">Penalty: {result.suggestedParams.repPenalty} (Chống lặp từ vựng)</p>
                </div>
                <div className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-1">
                  <span className="text-[var(--text-muted)] text-[10px] uppercase">Ràng Buộc Phủ Định</span>
                  <div className="text-xs font-bold text-rose-400">Negative Prompting Active</div>
                  <p className="text-[10px] text-[var(--text-secondary)]">Đã thiết lập hàng rào cấm sáo rỗng</p>
                </div>
              </div>
            )}

            {/* Assigned Ecosystem Libraries Badge */}
            {result.assignedLibraries && result.assignedLibraries.length > 0 && (
              <div className="space-y-2.5">
                <div className="text-xs font-mono font-medium text-[var(--text-secondary)] uppercase tracking-wider flex items-center justify-between">
                  <span>Hệ Thống Tự Động Gán Thư Viện Tối Ưu ({result.assignedLibraries.length})</span>
                  <span className="text-[10px] text-emerald-500 font-bold">Zero-Slop Stack</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {result.assignedLibraries.map((lib, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-[var(--text-primary)]">{lib.name}</span>
                        <span className="text-[9px] font-mono text-[var(--text-muted)] bg-[var(--bg-page)] border border-[var(--border-subtle)] px-1.5 py-0.5 rounded">npm</span>
                      </div>
                      <code className="text-[10px] font-mono text-indigo-400 block truncate">{lib.npm}</code>
                      <p className="text-[10px] text-[var(--text-secondary)] truncate">{lib.role}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Deficiencies Checklist */}
            <div className="space-y-2.5">
              <div className="text-xs font-mono font-medium text-[var(--text-secondary)] uppercase tracking-wider">
                Lỗ Hổng Cần Bổ Sung ({result.missingPoints.length})
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.missingPoints.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-xs space-y-1">
                    <div className="flex items-center space-x-1.5 font-semibold text-[var(--text-primary)]">
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 shadow-sm" />
                      <span>{item.item}</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed pl-3.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Generated Prompt 2.0 Codeview */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-[var(--text-secondary)] uppercase tracking-wider flex items-center space-x-1.5">
                  <CornerDownRight className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Prompt 2.0 (Biên dịch hoàn chỉnh có Ràng buộc phủ định)</span>
                </span>
                <button
                  onClick={() => copyToClipboard(result.upgradedPrompt)}
                  className="flex items-center space-x-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  {copiedUpgraded ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
                  <span>{copiedUpgraded ? 'Copied' : 'Copy Spec'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] font-mono text-xs text-[var(--text-primary)] whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                {result.upgradedPrompt}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Production Tested Benchmarks Grid */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-semibold text-[var(--text-primary)]">Prompt Benchmarks</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {filteredBenchmarks.length} {lang === 'vi' ? 'mẫu chuẩn' : 'verified templates'}
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              {lang === 'vi' 
                ? 'Mẫu prompt đã kiểm nghiệm thực tế từ các kỹ sư AI. Chọn "Chép" để dùng ngay trong ChatGPT/Claude, hoặc "Phân tích" để kiểm định câu hỏi gốc.' 
                : 'Field-tested prompt templates. Click "Copy" to paste into ChatGPT/Claude, or "Inspect" to audit the baseline prompt.'}
            </p>
          </div>

          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchBenchmark}
              onChange={(e) => setSearchBenchmark(e.target.value)}
              placeholder={lang === 'vi' ? 'Lọc theo tag, từ khóa...' : 'Filter by tag, keyword...'}
              className="craft-input w-full text-xs pl-8 pr-3 py-2"
            />
          </div>
        </div>

        {/* Quick Explainer Callout */}
        <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-[var(--text-secondary)] font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
            <span>
              {lang === 'vi'
                ? '💡 Mẹo sử dụng: Bấm [Chép] để lấy prompt tối ưu, hoặc bấm [Phân tích] để xem hệ thống phân tích AST và lọc bỏ từ sáo rỗng.'
                : '💡 Pro Tip: Click [Copy] to use the optimized prompt, or [Inspect] to see AST structure scoring & slop elimination.'}
            </span>
          </div>
          <Link to="/guide#benchmarks" className="text-indigo-400 hover:underline shrink-0 text-[11px] font-semibold">
            {lang === 'vi' ? 'Xem cẩm nang hướng dẫn →' : 'Read Guidebook →'}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredBenchmarks.map((bm) => (
            <div key={bm.id} className="craft-card p-4 flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-indigo-400 font-semibold">{bm.industry}</span>
                  <span className="text-amber-400 font-medium">★ {bm.rating}</span>
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{bm.title}</h3>
                <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[11px] font-mono text-[var(--text-secondary)] max-h-28 overflow-y-auto leading-relaxed select-text">
                  {bm.optimizedPrompt}
                </div>
              </div>

              <div className="pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between gap-2 text-[11px] font-mono">
                <span className="text-[var(--text-muted)] truncate max-w-[95px] text-[10px]" title={bm.author}>
                  {bm.author.split('(')[0].trim()}
                </span>
                
                <div className="flex items-center space-x-1.5 shrink-0">
                  {/* Nút Sao chép Prompt đã tối ưu */}
                  <button
                    onClick={() => handleCopyBenchmark(bm)}
                    className="px-2 py-1 rounded-md border border-[var(--border-subtle)] hover:bg-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center space-x-1 cursor-pointer transition-colors"
                    title={lang === 'vi' ? 'Sao chép prompt tối ưu này vào bộ nhớ tạm' : 'Copy optimized prompt to clipboard'}
                  >
                    {copiedBenchmarkId === bm.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">{lang === 'vi' ? 'Đã chép' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>{lang === 'vi' ? 'Chép' : 'Copy'}</span>
                      </>
                    )}
                  </button>

                  {/* Nút Thử phân tích mẫu gốc */}
                  <button
                    onClick={() => {
                      setPromptInput(bm.originalPrompt);
                      handleInspect(bm.originalPrompt);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className="px-2.5 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white flex items-center space-x-1 cursor-pointer transition-colors shadow-xs"
                    title={lang === 'vi' ? 'Nạp và kiểm định câu hỏi gốc' : 'Load and inspect original prompt'}
                  >
                    <span>{lang === 'vi' ? 'Phân tích' : 'Inspect'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
