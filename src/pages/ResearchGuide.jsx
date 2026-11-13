import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  BookOpen, 
  Search, 
  Compass, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  Lightbulb, 
  Sparkles,
  Download,
  Copy,
  Check,
  Globe,
  Layers,
  Heart,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  Flame,
  HelpCircle,
  Clock,
  Eye,
  FileCheck2,
  FileSpreadsheet,
  GraduationCap,
  RefreshCw,
  Quote
} from 'lucide-react';
import { RESEARCH_LANGUAGES, RESEARCH_DATA } from '../data/researchGuideData';
import { DEFAULT_DOC_CONTENT, DEFAULT_DOC_PATH, DEFAULT_DOC_FILENAME } from '../data/defaultDocContent';
import { SCIENTIFIC_PAPERS } from '../data/scientificPapers';
import { useLanguage } from '../context/LanguageContext';

export default function ResearchGuide() {
  const { lang: globalLang, setLang: setGlobalLang } = useLanguage();
  const [lang, setLang] = useState(() => globalLang || 'vi');

  useEffect(() => {
    if (globalLang && (globalLang === 'vi' || globalLang === 'en')) {
      setLang(globalLang);
    }
  }, [globalLang]);

  const handleSelectLang = (code) => {
    setLang(code);
    if (code === 'vi' || code === 'en') {
      setGlobalLang(code);
    }
  };
  const [activeProtocolTab, setActiveProtocolTab] = useState('companion');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedMaster, setCopiedMaster] = useState(false);
  const [copiedFullDoc, setCopiedFullDoc] = useState(false);
  const [copiedBibtexId, setCopiedBibtexId] = useState(null);
  const [showReader, setShowReader] = useState(false);

  const KHKT_PRESET_TOPICS = [
    {
      label: lang === 'vi' ? 'Prompt Engineering & Instruction Tuning' : 'Prompt Engineering & Tuning',
      query: 'prompt engineering large language models instruction tuning'
    },
    {
      label: lang === 'vi' ? 'AI Thấu cảm & Giao tiếp tự nhiên' : 'Empathetic AI Dialogue',
      query: 'empathetic dialogue generation large language models'
    },
    {
      label: lang === 'vi' ? 'Hiện tượng AI Slop & RLHF Sycophancy' : 'RLHF Sycophancy & Alignment Tax',
      query: 'RLHF sycophancy alignment tax language models'
    },
    {
      label: lang === 'vi' ? 'Chain-of-Thought & Suy luận' : 'Chain-of-Thought Reasoning',
      query: 'chain of thought prompting reasoning large language models'
    },
    {
      label: lang === 'vi' ? 'An toàn AI & Chống Prompt Injection' : 'Prompt Injection Defense',
      query: 'prompt injection defense large language models security'
    }
  ];

  const [searchQuery, setSearchQuery] = useState('empathetic dialogue generation large language models');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [copiedCitationId, setCopiedCitationId] = useState(null);

  const reconstructAbstract = (invertedIndex) => {
    if (!invertedIndex || typeof invertedIndex !== 'object') return '';
    const words = [];
    for (const [word, positions] of Object.entries(invertedIndex)) {
      if (Array.isArray(positions)) {
        for (const pos of positions) {
          words[pos] = word;
        }
      }
    }
    const text = words.filter(Boolean).join(' ');
    if (text.length <= 280) return text;
    return text.slice(0, 277).trimEnd() + '...';
  };

  const handleSearchPapers = async (customQuery) => {
    const q = (typeof customQuery === 'string' ? customQuery : searchQuery).trim();
    if (!q) return;
    if (typeof customQuery === 'string') {
      setSearchQuery(customQuery);
    }

    setIsSearching(true);
    setSearchError('');

    try {
      const url = `https://api.openalex.org/works?search=${encodeURIComponent(q)}&per-page=6&sort=cited_by_count:desc`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const works = Array.isArray(data.results) ? data.results : [];

      if (works.length === 0) {
        setSearchResults([]);
        setSearchError(lang === 'vi' ? 'Không tìm thấy bài báo khớp từ khóa này trên OpenAlex. Bạn hãy thử từ khóa tiếng Anh ngắn gọn hơn hoặc dùng phím tắt Google Scholar / arXiv bên dưới.' : 'No matching works found on OpenAlex. Try a broader query or use external shortcuts below.');
      } else {
        const mapped = works.map((w) => {
          const authorsList = (w.authorships || []).slice(0, 4).map((a) => a.author?.display_name).filter(Boolean);
          const authors = authorsList.length > 0
            ? `${authorsList.join(', ')}${(w.authorships || []).length > 4 ? ' et al.' : ''}`
            : 'Unknown Authors';
          const institution = w.authorships?.[0]?.institutions?.[0]?.display_name || 'International Research';
          const venue = w.primary_location?.source?.display_name || w.type || 'Academic Publication';
          const year = w.publication_year || 'N/A';
          const doiUrl = w.doi || w.id;
          const pdfUrl = w.open_access?.oa_url || w.primary_location?.pdf_url || null;
          const title = w.title || 'Untitled Research Work';
          const abstract = reconstructAbstract(w.abstract_inverted_index);
          const ieeeCitation = `${authors}, "${title}," ${venue}, ${year}.${w.doi ? ` DOI: ${w.doi.replace('https://doi.org/', '')}.` : ''}`;

          return {
            id: w.id,
            title,
            year,
            citations: w.cited_by_count || 0,
            venue,
            authors,
            institution,
            doiUrl,
            pdfUrl,
            abstract,
            ieeeCitation,
          };
        });
        setSearchResults(mapped);
      }
    } catch (err) {
      const fallback = SCIENTIFIC_PAPERS.map((p) => ({
        id: p.id,
        title: p.title,
        year: p.year,
        citations: 'Core',
        venue: p.venue,
        authors: p.authors,
        institution: p.institution,
        doiUrl: p.doiUrl || p.arxivUrl,
        pdfUrl: p.pdfUrl,
        abstract: p.takeaways?.[lang] || p.takeaways?.vi || '',
        ieeeCitation: `${p.authors}, "${p.title}," ${p.venue}, ${p.year}.${p.doi ? ` DOI: ${p.doi}.` : ''}`
      }));
      setSearchResults(fallback);
      setSearchError(lang === 'vi'
        ? 'Không thể kết nối OpenAlex lúc này — đang hiển thị bộ bài báo nền tảng ngoại tuyến để bạn trích dẫn ngay.'
        : 'Unable to reach OpenAlex API — showing curated offline core papers.');
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    handleSearchPapers('empathetic dialogue generation large language models');
  }, []);

  // Đọc tài liệu nghiên cứu (Mặc định hoặc bản Admin đã cập nhật trong Storage)
  const [docContent] = useState(() => {
    return localStorage.getItem('promptcraft_uploaded_doc_content') || DEFAULT_DOC_CONTENT;
  });
  const [docMeta] = useState(() => {
    const saved = localStorage.getItem('promptcraft_uploaded_doc_meta');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return {
      fileName: DEFAULT_DOC_FILENAME,
      path: DEFAULT_DOC_PATH,
      isCustom: false,
      size: `${(DEFAULT_DOC_CONTENT.length / 1024).toFixed(1)} KB`,
      updatedAt: 'Chính thức từ hệ thống'
    };
  });

  const t = RESEARCH_DATA[lang] || RESEARCH_DATA.vi;

  const handleCopyMaster = () => {
    const masterPrompt = t.protocols.companion.prompt;
    navigator.clipboard.writeText(masterPrompt);
    setCopiedMaster(true);
    setTimeout(() => setCopiedMaster(false), 2000);
  };

  const handleCopyFullDoc = () => {
    navigator.clipboard.writeText(docContent);
    setCopiedFullDoc(true);
    setTimeout(() => setCopiedFullDoc(false), 2000);
  };

  const handleCopyBibtex = (id, bibtex) => {
    navigator.clipboard.writeText(bibtex);
    setCopiedBibtexId(id);
    setTimeout(() => setCopiedBibtexId(null), 2000);
  };

  const handleDownloadDoc = () => {
    const blob = new Blob([docContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = docMeta.fileName || 'NGHIEN_CUU_PROMPT_THAU_CAM.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyActiveProtocol = () => {
    const promptToCopy = t.protocols[activeProtocolTab]?.prompt || '';
    navigator.clipboard.writeText(promptToCopy);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16 animate-fadeIn">
      {/* Top Bar: Language Selector & Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-5">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl craft-card text-indigo-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--text-muted)] flex items-center space-x-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{t.meta.badge}</span>
            </div>
            <div className="text-xs font-semibold text-[var(--text-primary)]">
              PromptCraft Academic Laboratory
            </div>
          </div>
        </div>

        {/* Multi-Language Selector (4 Languages: VI, EN, FR, DE) */}
        <div className="flex items-center space-x-1 p-1 rounded-xl craft-card self-start sm:self-auto">
          <Globe className="w-3.5 h-3.5 text-[var(--text-muted)] ml-2 mr-1 hidden xs:block" />
          {RESEARCH_LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => handleSelectLang(l.code)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer ${
                lang === l.code
                  ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]'
              }`}
              title={l.name}
            >
              <span>{l.flag}</span>
              <span className="hidden sm:inline">{l.label}</span>
              <span className="sm:hidden font-mono uppercase text-[10px]">{l.code}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight">
          {t.meta.title}
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          {t.meta.subtitle}
        </p>
      </div>

      {/* Clean Visitor Reader Card */}
      <div className="craft-card p-5 sm:p-6 space-y-4">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center space-x-1.5 text-sm font-bold text-[var(--text-primary)]">
                <FileText className="w-4 h-4 text-[#2563EB] dark:text-blue-400 shrink-0" />
                <span>{lang === 'vi' ? 'Bài viết nghiên cứu đầy đủ' : 'Full Research Paper'}</span>
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-[8px] font-semibold bg-[#2563EB]/12 text-[#2563EB] dark:text-blue-400 border border-[#2563EB]/25">
                {lang === 'vi' ? 'Đọc trực tiếp hoặc tải về' : 'Read online or download'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-3xl leading-relaxed">
              {t.meta.docBanner.desc}
            </p>
          </div>

          {/* Visitor Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[var(--border-subtle)]/60">
            <button
              onClick={() => setShowReader(!showReader)}
              className="px-4 py-2 rounded-[8px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer"
              title="Đọc nội dung tài liệu ngay trên trang"
            >
              <Eye className="w-4 h-4" />
              <span>
                {showReader
                  ? (lang === 'vi' ? 'Thu gọn bài viết' : 'Collapse paper')
                  : (lang === 'vi' ? 'Đọc toàn văn ngay trên trang' : 'Read full paper here')}
              </span>
            </button>

            <button
              onClick={handleDownloadDoc}
              className="neu-button px-3.5 py-2 text-xs font-semibold flex items-center space-x-1.5 text-[var(--text-primary)] cursor-pointer"
              title="Tải bài viết nghiên cứu về máy (.md)"
            >
              <Download className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'vi' ? 'Tải bài viết (.md)' : 'Download paper (.md)'}</span>
            </button>

            <button
              onClick={handleCopyMaster}
              className="neu-button px-3.5 py-2 text-xs font-semibold flex items-center space-x-1.5 text-[#2563EB] dark:text-blue-400 cursor-pointer"
            >
              {copiedMaster ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>
                {copiedMaster
                  ? (lang === 'vi' ? 'Đã sao chép!' : 'Copied!')
                  : (lang === 'vi' ? 'Sao chép câu lệnh mẫu' : 'Copy sample prompt')}
              </span>
            </button>
          </div>
        </div>

        {/* Collapsible Full Document Reader */}
        {showReader && (
          <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--text-muted)]">
              <span className="flex items-center space-x-1.5 text-emerald-400">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>Nội dung tài liệu đang hiển thị: {docMeta.fileName}</span>
              </span>
              <button
                onClick={handleCopyFullDoc}
                className="neu-button px-2.5 py-1 text-[11px] font-mono text-indigo-400 cursor-pointer flex items-center space-x-1"
              >
                {copiedFullDoc ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedFullDoc ? 'Đã sao chép toàn bộ docs' : 'Sao chép toàn bộ văn bản'}</span>
              </button>
            </div>

            <div className="max-h-[500px] overflow-y-auto p-5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] prose prose-sm dark:prose-invert max-w-none text-xs leading-relaxed font-sans">
              <ReactMarkdown>{docContent}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>

      {/* LIVE ACADEMIC LITERATURE SEARCH HUB FOR KHKT REPORTS */}
      <div className="craft-card p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] flex items-center space-x-2">
              <Search className="w-5 h-5 text-[#2563EB] dark:text-blue-400 shrink-0" />
              <span>
                {lang === 'vi'
                  ? 'Tìm Kiếm Tài Liệu & Bài Báo Khoa Học (Báo Cáo KHKT)'
                  : 'Scientific Literature Search Hub (Research Reports)'}
              </span>
            </h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {lang === 'vi'
                ? 'Tra cứu trực tiếp cơ sở dữ liệu học thuật quốc tế OpenAlex (hàng trăm triệu bài báo có DOI, số lượt trích dẫn, bản PDF mở) và xuất trích dẫn chuẩn IEEE chỉ bằng 1 chạm.'
                : 'Search millions of peer-reviewed papers via OpenAlex API with DOI, citation counts, open PDF links, and 1-click IEEE citations.'}
            </p>
          </div>
          <span className="self-start sm:self-auto px-2.5 py-1 rounded-[8px] bg-emerald-500/12 border border-emerald-500/25 text-emerald-500 text-[11px] font-mono font-semibold shrink-0">
            OpenAlex Live API
          </span>
        </div>

        {/* Search Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearchPapers();
          }}
          className="flex flex-col sm:flex-row gap-2.5"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'vi'
                  ? 'Nhập từ khóa tiếng Anh (VD: prompt engineering, empathetic AI, sycophancy RLHF...)'
                  : 'Enter keywords (e.g., prompt engineering, empathetic AI, RLHF sycophancy...)'
              }
              className="craft-input w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching || !searchQuery.trim()}
            className="px-4 py-2.5 rounded-[8px] bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shrink-0"
          >
            {isSearching ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>{lang === 'vi' ? 'Đang tìm...' : 'Searching...'}</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>{lang === 'vi' ? 'Tìm bài báo' : 'Search papers'}</span>
              </>
            )}
          </button>
        </form>

        {/* Preset KHKT Topic Chips */}
        <div className="space-y-2">
          <div className="text-[11px] font-medium text-[var(--text-muted)]">
            {lang === 'vi' ? 'Chủ đề gợi ý cho đề tài KHKT:' : 'Suggested KHKT Research Topics:'}
          </div>
          <div className="flex flex-wrap gap-2">
            {KHKT_PRESET_TOPICS.map((topic) => (
              <button
                key={topic.query}
                type="button"
                onClick={() => handleSearchPapers(topic.query)}
                className={`px-3 py-1.5 rounded-[8px] border text-xs font-medium transition-colors cursor-pointer ${
                  searchQuery === topic.query
                    ? 'bg-[#2563EB]/15 border-[#2563EB] text-[#2563EB] dark:text-blue-400 font-semibold'
                    : 'border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]'
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>

        {/* External Academic Repository Shortcuts */}
        <div className="p-3 rounded-[8px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[var(--text-muted)] font-medium mr-1">
            {lang === 'vi' ? 'Mở nhanh từ khóa này trên:' : 'Open query on:'}
          </span>
          <a
            href={`https://scholar.google.com/scholar?q=${encodeURIComponent(searchQuery)}`}
            target="_blank"
            rel="noreferrer"
            className="neu-button px-2.5 py-1 text-xs font-medium flex items-center space-x-1 text-[var(--text-primary)]"
          >
            <span>Google Scholar</span>
            <ExternalLink className="w-3 h-3 text-[#2563EB] dark:text-blue-400" />
          </a>
          <a
            href={`https://arxiv.org/search/?query=${encodeURIComponent(searchQuery)}&searchtype=all`}
            target="_blank"
            rel="noreferrer"
            className="neu-button px-2.5 py-1 text-xs font-medium flex items-center space-x-1 text-[var(--text-primary)]"
          >
            <span>arXiv.org</span>
            <ExternalLink className="w-3 h-3 text-emerald-500" />
          </a>
          <a
            href={`https://www.semanticscholar.org/search?q=${encodeURIComponent(searchQuery)}`}
            target="_blank"
            rel="noreferrer"
            className="neu-button px-2.5 py-1 text-xs font-medium flex items-center space-x-1 text-[var(--text-primary)]"
          >
            <span>Semantic Scholar</span>
            <ExternalLink className="w-3 h-3 text-amber-500" />
          </a>
          <a
            href={`https://aclanthology.org/search/?q=${encodeURIComponent(searchQuery)}`}
            target="_blank"
            rel="noreferrer"
            className="neu-button px-2.5 py-1 text-xs font-medium flex items-center space-x-1 text-[var(--text-primary)]"
          >
            <span>ACL Anthology</span>
            <ExternalLink className="w-3 h-3 text-indigo-400" />
          </a>
          <a
            href={`https://www.connectedpapers.com/search?q=${encodeURIComponent(searchQuery)}`}
            target="_blank"
            rel="noreferrer"
            className="neu-button px-2.5 py-1 text-xs font-medium flex items-center space-x-1 text-[var(--text-primary)]"
          >
            <span>Connected Papers</span>
            <ExternalLink className="w-3 h-3 text-rose-400" />
          </a>
        </div>

        {/* Status / Fallback Notice */}
        {searchError && (
          <div className="p-3 rounded-[8px] border border-amber-500/30 bg-amber-500/10 text-xs text-amber-500">
            {searchError}
          </div>
        )}

        {/* Search Results */}
        {isSearching ? (
          <div className="py-8 flex items-center justify-center space-x-2 text-xs text-[var(--text-secondary)]">
            <RefreshCw className="w-4 h-4 animate-spin text-[#2563EB]" />
            <span>{lang === 'vi' ? 'Đang truy vấn cơ sở dữ liệu học thuật OpenAlex...' : 'Querying OpenAlex academic database...'}</span>
          </div>
        ) : (
          <div className="space-y-3">
            {searchResults.map((paper) => (
              <div
                key={paper.id}
                className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-[#2563EB]/12 text-[#2563EB] dark:text-blue-400 border border-[#2563EB]/25 font-semibold">
                      {paper.year}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-secondary)]">
                      {paper.venue}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
                      {paper.institution}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/12 text-emerald-500 border border-emerald-500/25 font-semibold">
                    {typeof paper.citations === 'number'
                      ? (lang === 'vi' ? `Trích dẫn: ${paper.citations.toLocaleString()} lần` : `${paper.citations.toLocaleString()} citations`)
                      : paper.citations}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[var(--text-primary)] leading-snug">
                  {paper.title}
                </h3>

                <div className="text-xs text-[var(--text-muted)]">
                  <span className="font-semibold text-[var(--text-secondary)]">
                    {lang === 'vi' ? 'Tác giả:' : 'Authors:'}
                  </span>{' '}
                  {paper.authors}
                </div>

                {paper.abstract && (
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed border-l-2 border-[var(--border-hover)] pl-3">
                    {paper.abstract}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  {paper.doiUrl && (
                    <a
                      href={paper.doiUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="neu-button px-2.5 py-1 text-xs font-medium flex items-center space-x-1 text-[#2563EB] dark:text-blue-400"
                    >
                      <span>{lang === 'vi' ? 'Mở bài gốc (DOI)' : 'Open Source (DOI)'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {paper.pdfUrl && (
                    <a
                      href={paper.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="neu-button px-2.5 py-1 text-xs font-medium flex items-center space-x-1 text-emerald-500"
                    >
                      <FileText className="w-3 h-3" />
                      <span>{lang === 'vi' ? 'Đọc PDF' : 'Read PDF'}</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(paper.ieeeCitation);
                      setCopiedCitationId(paper.id);
                      setTimeout(() => setCopiedCitationId(null), 2000);
                    }}
                    className="neu-button px-2.5 py-1 text-xs font-medium flex items-center space-x-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    {copiedCitationId === paper.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span className="text-emerald-500">
                          {lang === 'vi' ? 'Đã chép trích dẫn IEEE' : 'Copied IEEE Citation'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Quote className="w-3 h-3" />
                        <span>{lang === 'vi' ? 'Chép trích dẫn chuẩn IEEE' : 'Copy IEEE Citation'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 1: ROOT CAUSES (TẠI SAO AI NÓI CHUYỆN VÔ HỒN) */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <span>{t.rootCauses.title}</span>
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            {t.rootCauses.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.rootCauses.items.map((item, idx) => (
            <div key={idx} className="craft-card p-5 space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider px-2 py-0.5 rounded bg-rose-950/40 border border-rose-900/40 inline-block">
                  {item.tag}
                </span>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">
                  {item.name}
                </h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: THE H-E-A-R 2.0 FRAMEWORK */}
      <div className="craft-card p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center space-x-2">
            <Heart className="w-5 h-5 text-indigo-400" />
            <span>{t.hearFramework.title}</span>
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            {t.hearFramework.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {t.hearFramework.steps.map((st, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-xl craft-input space-y-2 border border-[var(--border-subtle)]">
              <div className="flex items-center space-x-2">
                <span className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-400 font-mono font-bold text-sm flex items-center justify-center shrink-0 border border-indigo-500/30">
                  {st.code}
                </span>
                <div>
                  <div className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-tight">
                    [{st.code}] - {st.title}
                  </div>
                  <div className="text-[11px] text-[var(--text-muted)] font-medium">
                    {st.subtitle}
                  </div>
                </div>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed pt-1">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: EMPIRICAL BENCHMARK SHOWDOWN */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center space-x-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <span>{t.showdown.title}</span>
          </h2>
          <div className="text-xs text-[var(--text-secondary)] p-3 rounded-lg craft-card border-amber-500/20">
            <span className="font-bold text-amber-400 mr-1.5">{t.showdown.scenarioLabel}</span>
            <span className="italic">{t.showdown.scenarioText}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Bad Output */}
          <div className="craft-card p-5 space-y-3 border-rose-900/40 bg-rose-950/10 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{t.showdown.bad.title}</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800">
                  FAIL
                </span>
              </div>
              <div className="p-3.5 rounded-lg craft-input text-xs font-mono text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                {t.showdown.bad.content}
              </div>
            </div>
            <div className="text-[11px] text-rose-300 font-mono pt-2 border-t border-rose-900/30">
              ⚠️ {t.showdown.bad.verdict}
            </div>
          </div>

          {/* Good Output */}
          <div className="craft-card p-5 space-y-3 border-emerald-900/40 bg-emerald-950/10 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.showdown.good.title}</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800">
                  PASSED (10/10)
                </span>
              </div>
              <div className="p-3.5 rounded-lg craft-input text-xs font-mono text-[var(--text-primary)] leading-relaxed whitespace-pre-line border-emerald-900/40">
                {t.showdown.good.content}
              </div>
            </div>
            <div className="text-[11px] text-emerald-300 font-mono pt-2 border-t border-emerald-900/30">
              ✨ {t.showdown.good.verdict}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: 3 MASTER PROMPT PROTOCOLS */}
      <div className="craft-card p-6 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center space-x-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>{t.protocols.title}</span>
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              {t.protocols[activeProtocolTab]?.title}
            </p>
          </div>

          <button
            onClick={handleCopyActiveProtocol}
            className="neu-button px-3.5 py-1.5 text-xs font-mono font-medium flex items-center space-x-2 self-start sm:self-auto cursor-pointer"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
            <span>{copiedCode ? 'Đã Chép Khung Prompt' : 'Sao Chép Protocol Này'}</span>
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          {t.protocols.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveProtocolTab(tab.id)}
              className={`neu-button px-3.5 py-2 transition-all cursor-pointer ${
                activeProtocolTab === tab.id
                  ? '!bg-indigo-600 !text-white !border-indigo-500 font-bold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Prompt Code Viewer */}
        <div className="relative">
          <pre className="p-4 sm:p-5 rounded-xl craft-input font-mono text-xs leading-relaxed text-[var(--text-primary)] overflow-x-auto whitespace-pre-wrap border border-[var(--border-subtle)] max-h-96">
            {t.protocols[activeProtocolTab]?.prompt}
          </pre>
        </div>
      </div>

      {/* SECTION 5: 3-PASS READING METHODOLOGY */}
      <div className="craft-card p-6 sm:p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center space-x-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            <span>{t.readingMethod.title}</span>
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            {t.readingMethod.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.readingMethod.steps.map((st, idx) => (
            <div key={idx} className="p-4 rounded-xl craft-input space-y-2 border border-[var(--border-subtle)] flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center space-x-1.5 text-indigo-400 font-bold text-xs uppercase tracking-wider font-mono">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{st.time}</span>
                </div>
                <div className="font-semibold text-[var(--text-primary)] text-sm">
                  {st.title}
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 6: SCIENTIFIC LITERATURE PAPERS & ACADEMIC CITATIONS */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" />
            <span>{t.papers.title}</span>
          </h2>
          <p className="text-xs text-[var(--text-secondary)]">
            Nguồn trích dẫn học thuật chi tiết kèm định danh DOI, mã lưu trữ arXiv, tập dữ liệu kiểm nghiệm và mẫu trích dẫn BibTeX chuẩn mực quốc tế:
          </p>
        </div>

        <div className="space-y-4">
          {SCIENTIFIC_PAPERS.map((p) => (
            <div key={p.id} className="craft-card p-5 sm:p-6 space-y-3.5">
              {/* Header Meta: Institution, Venue & Direct Action Links */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-950/40 text-indigo-300 border border-indigo-800/50 text-[11px] font-mono font-semibold">
                    {p.institution}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-secondary)] font-medium">
                    {p.venue}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  {p.pdfUrl && (
                    <a
                      href={p.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="neu-button px-2.5 py-1 text-emerald-400 hover:text-emerald-300 font-medium flex items-center space-x-1"
                      title="Mở toàn văn bài báo định dạng PDF"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Toàn Văn PDF</span>
                    </a>
                  )}

                  {p.arxivUrl && (
                    <a
                      href={p.arxivUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="neu-button px-2.5 py-1 text-indigo-400 hover:text-indigo-300 font-medium flex items-center space-x-1"
                      title="Trang tóm tắt trên arXiv"
                    >
                      <span>{p.arxivId}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {p.doi && (
                    <a
                      href={p.doiUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="neu-button px-2.5 py-1 text-amber-400 hover:text-amber-300 font-medium flex items-center space-x-1"
                      title="Định danh đối tượng số DOI"
                    >
                      <span>DOI: {p.doi.length > 18 ? p.doi.substring(0, 18) + '...' : p.doi}</span>
                    </a>
                  )}

                  <button
                    onClick={() => handleCopyBibtex(p.id, p.bibtex)}
                    className="neu-button px-2.5 py-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium flex items-center space-x-1 cursor-pointer"
                    title="Sao chép mã trích dẫn BibTeX vào clipboard"
                  >
                    {copiedBibtexId === p.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Đã chép BibTeX</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Chép BibTeX</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Title & Full Authors */}
              <div className="space-y-1">
                <h3 className="font-bold text-[var(--text-primary)] text-base leading-snug">
                  {p.title}
                </h3>
                <div className="text-[11px] font-mono text-[var(--text-muted)] flex items-center space-x-1.5">
                  <span className="font-semibold text-[var(--text-secondary)]">Tác giả:</span>
                  <span>{p.authors}</span>
                </div>
              </div>

              {/* Empirical Data & Dataset Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] space-y-0.5">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider block">TẬP DỮ LIỆU CHUẨN (BENCHMARK DATASET):</span>
                  <span className="text-[var(--text-primary)] font-medium text-[11px] block">{p.dataset}</span>
                </div>
                <div className="p-2.5 rounded-lg border border-emerald-900/30 bg-emerald-950/15 space-y-0.5">
                  <span className="text-[10px] text-emerald-400 uppercase tracking-wider block font-bold">KẾT QUẢ THỰC NGHIỆM ĐO ĐƯỢC:</span>
                  <span className="text-emerald-300 font-semibold text-[11px] block">{p.empiricalMetric}</span>
                </div>
              </div>

              {/* Empirical Takeaway */}
              <div className="text-xs text-[var(--text-secondary)] p-3 rounded-lg bg-[var(--bg-surface)] leading-relaxed border border-[var(--border-subtle)] space-y-1">
                <div className="text-amber-400 font-mono font-bold text-[11px] flex items-center space-x-1">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Luận Điểm Khoa Học & Ứng Dụng Thực Tiễn:</span>
                </div>
                <p className="pl-4 border-l-2 border-amber-500/40 text-[11px] leading-relaxed">
                  {p.takeaways[lang] || p.takeaways.vi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
