import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  Star, 
  GitFork, 
  ExternalLink, 
  RefreshCw, 
  Clock, 
  Code2, 
  ChevronLeft, 
  ChevronRight,
  Search,
  X,
  Sparkles,
  Layers,
  Flame,
  Bot,
  BrainCircuit,
  FileCode
} from 'lucide-react';
import { fetchAIGitHubNews } from '../services/promptService';
import { useLanguage } from '../context/LanguageContext';

const CATEGORIES_VI = [
  { id: 'all', name: '🔥 Tất Cả AI Nổi Bật', tag: 'Top AI & LLMs' },
  { id: 'agents', name: '🤖 AI Agents & Tự Trị', tag: 'Multi-Agent Frameworks' },
  { id: 'prompts', name: '📝 Prompt Engineering', tag: 'Benchmarks & Guides' },
  { id: 'gemini', name: '⚡ Google Gemini Ecosystem', tag: 'Gemini SDKs & Tools' },
  { id: 'openmodels', name: '🧠 Llama / DeepSeek / Ollama', tag: 'Open-Weight LLMs' }
];

const CATEGORIES_EN = [
  { id: 'all', name: '🔥 Top Trending AI', tag: 'Top AI & LLMs' },
  { id: 'agents', name: '🤖 AI Agents & Autonomy', tag: 'Multi-Agent Frameworks' },
  { id: 'prompts', name: '📝 Prompt Engineering', tag: 'Benchmarks & Guides' },
  { id: 'gemini', name: '⚡ Google Gemini Ecosystem', tag: 'Gemini SDKs & Tools' },
  { id: 'openmodels', name: '🧠 Llama / DeepSeek / Ollama', tag: 'Open-Weight LLMs' }
];

export default function GitHubNews() {
  const { t, lang } = useLanguage();
  const categories = lang === 'vi' ? CATEGORIES_VI : CATEGORIES_EN;
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [totalCount, setTotalCount] = useState(0);
  const perPage = 12;

  const loadPage = async (page, query = activeQuery, cat = activeCategory) => {
    setRepos([]);
    setLoading(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const res = await fetchAIGitHubNews(page, perPage, query, cat);
      setRepos(res.items || []);
      setTotalCount(res.totalCount || 0);
      setCurrentPage(page);
    } catch (err) {
      console.error(err);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPage(1, '', activeCategory);
  }, [activeCategory]);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    setActiveQuery(searchTerm);
    loadPage(1, searchTerm, activeCategory);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setActiveQuery('');
    loadPage(1, '', activeCategory);
  };

  const totalPages = Math.min(50, Math.max(1, Math.ceil(totalCount / perPage)));

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Header Bar */}
      <div className="border-b border-[var(--border-subtle)] pb-5 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
          <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
          <span>GITHUB REALTIME ECOSYSTEM</span>
          <span>/</span>
          <span className="text-[var(--text-secondary)]">GLOBAL AI & PROMPT REPOSITORIES</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center space-x-2">
              <span>{t.repos.title}</span>
            </h1>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              {t.repos.subtitle}
            </p>
          </div>

          <button
            onClick={() => loadPage(currentPage, activeQuery, activeCategory)}
            disabled={loading}
            className="self-start sm:self-auto neu-button px-3.5 py-1.5 text-xs font-mono flex items-center space-x-2 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
            <span>{lang === 'vi' ? 'Tải Lại Dữ Liệu' : 'Refresh Data'}</span>
          </button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs font-mono">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setCurrentPage(1);
            }}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer shrink-0 ${
              activeCategory === cat.id
                ? 'bg-indigo-600 text-white font-bold shadow-sm'
                : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)]'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Search Filter Bar (Single Layer, Perfectly Vertically Centered) */}
      <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
        <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t.repos.searchPlaceholder}
          className="w-full pl-10 pr-28 py-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs font-mono text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-colors"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-24 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer flex items-center justify-center p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs font-mono cursor-pointer transition-colors shadow-xs flex items-center justify-center"
        >
          {t.repos.btnSearch}
        </button>
      </form>

      {/* Realtime Stats Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-[var(--text-secondary)] px-1">
        <div>
          {activeQuery ? (
            <span className="flex items-center space-x-1.5">
              <span>Kết quả cho:</span>
              <strong className="text-[var(--text-primary)] px-2 py-0.5 rounded craft-input border border-indigo-500/30">
                "{activeQuery}"
              </strong>
              <button onClick={handleClearSearch} className="text-rose-400 hover:text-rose-300 cursor-pointer ml-1">
                [Xóa lọc]
              </button>
            </span>
          ) : (
            <span>
              Chủ đề: <strong className="text-indigo-400">{CATEGORIES.find(c => c.id === activeCategory)?.name}</strong>
            </span>
          )}
        </div>
        <div className="text-[var(--text-muted)]">
          Tìm thấy <strong className="text-emerald-400 font-semibold">{totalCount > 1000 ? `1,000+ (trong ${totalCount.toLocaleString()}+)` : totalCount}</strong> repositories • Trang {currentPage} / {totalPages}
        </div>
      </div>

      {/* Repos Grid */}
      {loading ? (
        <div className="py-24 text-center space-y-3 craft-card">
          <RefreshCw className="w-6 h-6 text-indigo-400 animate-spin mx-auto" />
          <p className="text-xs font-mono text-[var(--text-secondary)]">
            Đang truy xuất dữ liệu từ GitHub Search API và đối chiếu kho mã nguồn...
          </p>
        </div>
      ) : repos.length === 0 ? (
        <div className="py-20 text-center craft-card space-y-3">
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            Không tìm thấy repository nào phù hợp với từ khóa "{activeQuery}".
          </p>
          <p className="text-xs text-[var(--text-muted)] font-mono">
            Hãy thử tìm bằng từ khóa phổ biến: 'gemini', 'agents', 'langchain', 'ollama', 'prompt'.
          </p>
          <button onClick={handleClearSearch} className="neu-button px-3 py-1.5 text-xs text-indigo-400 font-semibold cursor-pointer">
            Quay lại danh sách mặc định
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="craft-card p-4 flex flex-col justify-between space-y-3 hover:border-indigo-500/40 transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-center space-x-2.5">
                  <img
                    src={repo.avatar}
                    alt={repo.author}
                    className="w-7 h-7 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]"
                    loading="lazy"
                  />
                  <div className="text-xs font-mono truncate text-[var(--text-secondary)]">
                    <span>{repo.author} / </span>
                    <span className="text-[var(--text-primary)] font-bold">{repo.name}</span>
                  </div>
                </div>

                <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                  {repo.description}
                </p>

                <div className="flex items-center space-x-3 text-[11px] font-mono text-[var(--text-muted)] pt-2 border-t border-[var(--border-subtle)]">
                  <span className="flex items-center space-x-1 text-[var(--text-primary)] font-semibold">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{repo.stars.toLocaleString()}</span>
                  </span>
                  <span className="flex items-center space-x-1 text-[var(--text-secondary)]">
                    <GitFork className="w-3 h-3 text-[var(--text-muted)]" />
                    <span>{repo.forks.toLocaleString()}</span>
                  </span>
                  <span className="text-[var(--text-muted)] truncate max-w-[80px]">
                    {repo.language}
                  </span>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono">
                <span className="text-[var(--text-muted)] flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{repo.updatedAt}</span>
                </span>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center space-x-1"
                >
                  <span>{t.repos.visitRepo}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls (Modern Minimalist Linear Style) */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-6 pb-2 border-t border-[var(--border-subtle)] gap-4 text-xs font-mono">
        <button
          onClick={() => loadPage(currentPage - 1, activeQuery, activeCategory)}
          disabled={currentPage === 1 || loading}
          className="px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] disabled:opacity-30 disabled:pointer-events-none flex items-center space-x-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer w-full sm:w-auto justify-center shadow-xs"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>{t.repos.prevPage || 'Trang Trước'}</span>
        </button>

        {/* Dynamic Page Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
          {Array.from({ length: Math.min(8, totalPages) }, (_, i) => {
            let p;
            if (totalPages <= 8) {
              p = i + 1;
            } else if (currentPage <= 4) {
              p = i + 1;
            } else if (currentPage >= totalPages - 3) {
              p = totalPages - 7 + i;
            } else {
              p = currentPage - 3 + i;
            }
            const isActive = currentPage === p;
            return (
              <button
                key={p}
                disabled={loading || isActive}
                onClick={() => loadPage(p, activeQuery, activeCategory)}
                className={`w-8 h-8 rounded-lg text-xs font-mono flex items-center justify-center transition-all shrink-0 ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold shadow-xs cursor-default'
                    : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer'
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => loadPage(currentPage + 1, activeQuery, activeCategory)}
          disabled={currentPage === totalPages || loading}
          className="px-3.5 py-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] disabled:opacity-30 disabled:pointer-events-none flex items-center space-x-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer w-full sm:w-auto justify-center shadow-xs"
        >
          <span>{t.repos.nextPage || 'Trang Kế'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
