import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Terminal, 
  ShieldCheck, 
  Trash2, 
  RefreshCw,
  Cpu,
  Infinity as InfinityIcon,
  CheckCircle2,
  CornerDownRight,
  User,
  Copy,
  Check,
  Save,
  Download,
  Cloud,
  Layers,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  Database
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { chatWithTrainedBot, BOT_MODES } from '../services/botService';
import { 
  getStorageData, 
  setStorageData, 
  getStorageMetrics, 
  syncAllToVercelDatabase,
  DEFAULT_ADMIN_CONFIG, 
  DEFAULT_BENCHMARKS 
} from '../services/mockStorage';
import { useLanguage } from '../context/LanguageContext';

const CHAT_STORAGE_KEY = 'promptcraft_bot_chat_history';

export default function TrainedBotChat() {
  const { t, lang } = useLanguage();
  const [messages, setMessages] = useState(() => {
    return getStorageData(CHAT_STORAGE_KEY, [
      {
        id: 'init-1',
        role: 'assistant',
        content: `Xin chào. Tôi là **Cortex-AI** — Trợ lý AI được huấn luyện bởi **Admin và Dev có chứng chỉ**. 
Tôi hoạt động **hoàn toàn miễn phí và không giới hạn lượt hỏi đáp**. Bạn có thể chọn các chế độ thông minh bên trên (Kiến Trúc Sư, Thấu Cảm, Bảo Mật, Socratic) để nhận câu trả lời phù hợp nhất!`,
        timestamp: 'Vừa xong',
        thinking: {
          mode: 'architect',
          detectedIntent: 'System Initialization',
          ragReference: 'Default Master Instruction v3.2',
          rulesApplied: ['Multi-mode Ready', 'Zero-Slop Activated', 'Vercel DB Cloud Mirror Active'],
          cognitiveNotes: 'Hệ thống đã sẵn sàng tiếp nhận đa tác vụ với dung lượng bộ nhớ được bảo vệ tự động.'
        }
      }
    ]);
  });

  const [activeMode, setActiveMode] = useState('architect');
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [saveIndicator, setSaveIndicator] = useState(false);
  const [storageMetrics, setStorageMetrics] = useState(getStorageMetrics());
  const [syncToast, setSyncToast] = useState('');
  const [openThinkingId, setOpenThinkingId] = useState(null);
  const messagesEndRef = useRef(null);

  const adminConfig = getStorageData('promptcraft_system_prompt_cfg', DEFAULT_ADMIN_CONFIG);
  const benchmarks = getStorageData('promptcraft_benchmarks', DEFAULT_BENCHMARKS);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  useEffect(() => {
    if (messages.length > 0) {
      setStorageData(CHAT_STORAGE_KEY, messages);
      setSaveIndicator(true);
      setStorageMetrics(getStorageMetrics());
      const timer = setTimeout(() => setSaveIndicator(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputValue.trim() || isThinking) return;

    const userText = inputValue.trim();
    const userMsg = {
      id: 'usr-' + Date.now(),
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      const botResponse = await chatWithTrainedBot(userText, messages, activeMode);
      setMessages(prev => [...prev, botResponse]);
      setOpenThinkingId(botResponse.id); // Tự động mở CoT của câu trả lời mới
    } finally {
      setIsThinking(false);
      setStorageMetrics(getStorageMetrics());
    }
  };

  const handleCloudSync = async () => {
    setSyncToast('Đang kết nối Vercel Database API...');
    const res = await syncAllToVercelDatabase();
    setSyncToast(res.message);
    setTimeout(() => setSyncToast(''), 3000);
  };

  const clearChat = () => {
    if (!confirm('Bạn có chắc muốn xóa sạch toàn bộ lịch sử cuộc trò chuyện này không?')) return;
    const initial = [
      {
        id: 'init-fresh',
        role: 'assistant',
        content: 'Phiên trò chuyện đã được làm mới. Hãy chọn chế độ và nhập câu hỏi của bạn!',
        timestamp: 'Vừa xong'
      }
    ];
    setMessages(initial);
    setStorageData(CHAT_STORAGE_KEY, initial);
    setStorageMetrics(getStorageMetrics());
  };

  const copyText = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportChatHistory = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(messages, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cortex_chat_history_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Bot Identity Header */}
      <div className="border-b border-[var(--border-subtle)] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
            <span className="flex items-center space-x-1 text-emerald-400">
              <InfinityIcon className="w-3.5 h-3.5" />
              <span>UNLIMITED & 100% FREE</span>
            </span>
            <span>/</span>
            <span className="flex items-center space-x-1 text-indigo-400">
              <Cloud className="w-3 h-3" />
              <span>VERCEL DATABASE SYNC</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center space-x-2.5">
            <Bot className="w-6 h-6 text-indigo-400" />
            <span>{t.cortexBot.title}</span>
          </h1>
          <p className="text-xs text-[var(--text-secondary)]">
            {t.cortexBot.subtitle}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCloudSync}
            className="neu-button px-3 py-1.5 text-xs font-mono flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 cursor-pointer"
            title="Đồng bộ ngay lên Vercel Database / Edge Storage"
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.cortexBot.syncVercel}</span>
          </button>

          <button
            onClick={exportChatHistory}
            className="neu-button px-3 py-1.5 text-xs font-mono flex items-center space-x-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
            title="Tải toàn bộ lịch sử tin nhắn về máy tính (.json)"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">JSON</span>
          </button>

          <button
            onClick={clearChat}
            className="neu-button px-3 py-1.5 text-xs font-mono flex items-center space-x-1.5 text-rose-400 hover:text-rose-300 cursor-pointer"
            title={t.cortexBot.clearHistory}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Cloud Sync Toast Notification */}
      {syncToast && (
        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/50 text-xs font-mono text-emerald-300 flex items-center justify-between animate-fadeIn">
          <span className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{syncToast}</span>
          </span>
          <span className="text-[10px] opacity-75">Vercel KV / Edge Cache</span>
        </div>
      )}

      {/* 4 Smart Intelligence Modes Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
        {BOT_MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
              activeMode === mode.id
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm font-semibold'
                : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)]'
            }`}
          >
            <div className="font-bold text-xs truncate">{mode.name}</div>
            <div className="text-[10px] opacity-75 truncate mt-0.5">{mode.desc}</div>
          </button>
        ))}
      </div>

      {/* Main Chat Container */}
      <div className="craft-card flex flex-col h-[650px] overflow-hidden !rounded-2xl">
        {/* Top Active Brain Parameters & Storage Quota Guard */}
        <div className="px-4 py-2.5 bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)]">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[var(--text-secondary)]">Lõi: v{adminConfig.analyzerVersion}</span>
            </span>
            <span>•</span>
            <span className="hidden sm:inline">Tri thức: {benchmarks.length} benchmarks</span>
            {saveIndicator && (
              <span className="text-emerald-500 font-semibold flex items-center space-x-1">
                <Check className="w-3 h-3" />
                <span>Đã lưu</span>
              </span>
            )}
          </div>

          {/* Quota Gauge (Chống tràn LocalStorage) */}
          <div className="flex items-center space-x-2">
            <span className="text-[10px] text-[var(--text-secondary)]">
              Bộ nhớ: <strong className="text-[var(--text-primary)]">{storageMetrics.formatted}</strong> / 5 MB ({storageMetrics.percent}%)
            </span>
            <div className="w-12 h-1.5 rounded-full bg-[var(--border-subtle)] overflow-hidden hidden xs:block">
              <div 
                className={`h-full transition-all ${
                  storageMetrics.status === 'DANGER' ? 'bg-rose-500' :
                  storageMetrics.status === 'WARNING' ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${storageMetrics.percent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}
            >
              {/* Avatar Icon (Flat, No Card inside Card) */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-mono font-bold ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-indigo-400'
              }`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble (Clean Flat Surface, No Double Card Shadow) */}
              <div
                className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 relative border ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                    : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)]'
                }`}
              >
                <div className={`flex items-center justify-between text-[10px] font-mono pb-1.5 border-b ${
                  msg.role === 'user' ? 'border-white/20 text-white/80' : 'border-[var(--border-subtle)] opacity-70'
                }`}>
                  <span className="font-semibold">{msg.role === 'user' ? 'Bạn' : 'Cortex Bot'}</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Inspectable Chain-of-Thought (Quá trình suy luận) */}
                {msg.thinking && msg.role !== 'user' && (
                  <div className="mb-2 p-2.5 rounded-lg border border-indigo-500/30 bg-[var(--bg-page)] text-[11px] font-mono space-y-1.5">
                    <button
                      onClick={() => setOpenThinkingId(openThinkingId === msg.id ? null : msg.id)}
                      className="w-full flex items-center justify-between text-indigo-400 font-semibold cursor-pointer"
                    >
                      <span className="flex items-center space-x-1.5">
                        <BrainCircuit className="w-3.5 h-3.5" />
                        <span>Quá Trình Suy Luận (Chain-of-Thought)</span>
                      </span>
                      {openThinkingId === msg.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    {openThinkingId === msg.id && (
                      <div className="pt-2 border-t border-[var(--border-subtle)] space-y-1 text-[10px] text-[var(--text-secondary)] leading-relaxed animate-fadeIn">
                        <div>🎯 <strong>Ý định:</strong> {msg.thinking.detectedIntent}</div>
                        <div>📚 <strong>Tri thức:</strong> {msg.thinking.ragReference}</div>
                        <div>💡 <strong>Nhận định:</strong> {msg.thinking.cognitiveNotes}</div>
                        {msg.thinking.rulesApplied && msg.thinking.rulesApplied.length > 0 && (
                          <div className="pt-1">
                            <strong>Quy chuẩn áp dụng:</strong>
                            <ul className="list-disc list-inside space-y-0.5 text-[var(--text-muted)] pl-1">
                              {msg.thinking.rulesApplied.map((r, i) => (
                                <li key={i}>{r}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Markdown Parser for Clean Readability */}
                <div className="prose prose-invert prose-xs max-w-none space-y-2">
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => <p className="leading-relaxed mb-2 last:mb-0" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1 my-2 pl-1" {...props} />,
                      ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-1 my-2 pl-1" {...props} />,
                      li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                      strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                      em: ({ node, ...props }) => <em className="italic opacity-90" {...props} />,
                      code: ({ node, inline, ...props }) => (
                        <code className="px-1.5 py-0.5 rounded bg-[var(--code-bg)] border border-[var(--border-subtle)] font-mono text-[11px] text-indigo-400" {...props} />
                      ),
                      pre: ({ node, ...props }) => (
                        <pre className="p-3.5 my-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--code-bg)] font-mono text-[11px] text-[var(--text-primary)] overflow-x-auto leading-relaxed" {...props} />
                      )
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>

                {/* Quick copy button */}
                {msg.role === 'assistant' && (
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => copyText(msg.id, msg.content)}
                      className="px-2 py-0.5 rounded text-[10px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-subtle)] flex items-center space-x-1 cursor-pointer transition-colors"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === msg.id ? 'Đã chép' : 'Sao chép'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="rounded-2xl p-4 text-xs text-[var(--text-secondary)] flex items-center space-x-2 font-mono bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                <span>Cortex đang suy ngẫm theo chế độ {BOT_MODES.find(m => m.id === activeMode)?.name}...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt chips (Flat Minimalist Pills, No Heavy Neumorphic Buttons) */}
        <div className="px-4 py-2 bg-[var(--bg-elevated)] border-t border-[var(--border-subtle)] flex items-center space-x-2 overflow-x-auto text-[11px] font-mono">
          <span className="text-[var(--text-muted)] shrink-0">{t.cortexBot.suggestedPrompts}</span>
          <button
            onClick={() => {
              setActiveMode('empathy');
              setInputValue(lang === 'vi' ? 'Tôi vừa trải qua một đợt sa thải bất ngờ và thấy mình vô dụng...' : 'I was just unexpectedly laid off and feel completely lost and worthless...');
            }}
            className="px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-indigo-500/50 shrink-0 cursor-pointer transition-colors"
          >
            {t.cortexBot.chipEmpathy}
          </button>
          <button
            onClick={() => {
              setActiveMode('architect');
              setInputValue(lang === 'vi' ? 'Thiết kế kiến trúc Web App Anti-Slop với GSAP và Lenis' : 'Design an Anti-Slop Web Application architecture with GSAP and Lenis');
            }}
            className="px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-indigo-500/50 shrink-0 cursor-pointer transition-colors"
          >
            {t.cortexBot.chipArchitect}
          </button>
          <button
            onClick={() => {
              setActiveMode('security');
              setInputValue(lang === 'vi' ? 'Kiểm tra phòng thủ IDOR và chống Prompt Injection' : 'Audit IDOR defense and mitigate Prompt Injection vectors');
            }}
            className="px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-indigo-500/50 shrink-0 cursor-pointer transition-colors"
          >
            {t.cortexBot.chipSecurity}
          </button>
          <button
            onClick={() => {
              setActiveMode('socratic');
              setInputValue(lang === 'vi' ? 'Tôi đang phân vân giữa việc tự khởi nghiệp hay tiếp tục đi làm thuê?' : 'Should I start my own startup or continue as an engineering employee?');
            }}
            className="px-3 py-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-indigo-500/50 shrink-0 cursor-pointer transition-colors"
          >
            {t.cortexBot.chipSocratic}
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3.5 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t.cortexBot.inputPlaceholder}
            className="craft-input flex-1 px-4 py-3 text-xs font-mono"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isThinking}
            className="neu-button px-5 py-3 text-xs font-semibold font-mono disabled:opacity-40 flex items-center space-x-2 text-[var(--text-primary)] cursor-pointer"
          >
            <span>{t.cortexBot.btnSend}</span>
            <Send className="w-3.5 h-3.5 text-indigo-400" />
          </button>
        </form>
      </div>
    </div>
  );
}
