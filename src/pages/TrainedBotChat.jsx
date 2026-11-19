import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Bot,
  Send,
  Sparkles,
  Trash2,
  RefreshCw,
  Cpu,
  Heart,
  ShieldAlert,
  Compass,
  CheckCircle2,
  User,
  Copy,
  Check,
  Download,
  Cloud,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  HardDrive,
  RotateCcw,
  CornerDownRight
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { chatWithTrainedBot, BOT_MODES } from '../services/botService';
import {
  getStorageData,
  setStorageData,
  getStorageMetrics,
  syncAllToVercelDatabase
} from '../services/mockStorage';
import { useLanguage } from '../context/LanguageContext';

const CHAT_STORAGE_KEY = 'promptcraft_bot_chat_history';

const MODE_ICON_MAP = {
  Cpu,
  Heart,
  ShieldAlert,
  Compass
};

function CodeBlockWithCopy({ children, lang }) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef(null);

  const handleCopyCode = () => {
    const text = preRef.current?.innerText || '';
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="relative group my-2.5 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--code-bg)] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[11px] font-mono text-[var(--text-muted)]">
        <span>{lang === 'vi' ? 'Mã / Mẫu sao chép nhanh' : 'Snippet'}</span>
        <button
          type="button"
          onClick={handleCopyCode}
          className="inline-flex items-center space-x-1 text-[11px] text-[var(--text-secondary)] hover:text-[#2563EB] dark:hover:text-blue-400 cursor-pointer transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
          <span>{copied ? (lang === 'vi' ? 'Đã chép' : 'Copied') : (lang === 'vi' ? 'Chép mã' : 'Copy')}</span>
        </button>
      </div>
      <pre
        ref={preRef}
        className="p-3.5 font-mono text-xs text-[var(--text-primary)] overflow-x-auto leading-relaxed"
      >
        {children}
      </pre>
    </div>
  );
}

export default function TrainedBotChat() {
  const { t, lang } = useLanguage();
  const location = useLocation();
  const [messages, setMessages] = useState(() => {
    return getStorageData(CHAT_STORAGE_KEY, [
      {
        id: 'init-1',
        role: 'assistant',
        content: `Chào bạn, mình là **Cortex v5.0** — trợ lý AI kỹ thuật & tối ưu câu lệnh trên Prompt AI PNIT.

Bạn có thể dán một ý tưởng ngắn để mình **chấm điểm & viết lại prompt trực tiếp**, hỏi về **code / bảo mật OWASP / báo cáo KHKT**, hoặc chuyển chế độ ở phía trên để trò chuyện theo phong cách phù hợp.`,
        timestamp: 'Vừa xong',
        thinking: {
          mode: 'architect',
          detectedIntent: 'Sẵn sàng hỗ trợ đa nhiệm (Prompt • Code • OWASP • H-E-A-R)',
          ragReference: 'Cortex v5.0 • R-C-O-C Core',
          rulesApplied: ['Giải thích trực diện, có ví dụ thực tế', 'Không dùng từ ngữ sáo rỗng'],
          cognitiveNotes: 'Sẵn sàng tiếp nhận yêu cầu đầu tiên của bạn.'
        },
        suggestedFollowUps: [
          'Tối ưu prompt này cho Claude: Giúp tôi thiết kế giao diện web sạch đẹp',
          'Kiểm tra các lỗ hổng bảo mật OWASP cần tránh cho API đăng nhập',
          'Gợi ý cấu trúc báo cáo nghiên cứu KHKT về Prompt Engineering'
        ]
      }
    ]);
  });

  const [activeMode, setActiveMode] = useState('architect');
  const [inputValue, setInputValue] = useState(() => location.state?.initialPrompt || '');
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [saveIndicator, setSaveIndicator] = useState(false);
  const [storageMetrics, setStorageMetrics] = useState(getStorageMetrics());
  const [syncToast, setSyncToast] = useState('');
  const [openThinkingId, setOpenThinkingId] = useState(null);
  const [storageMode, setStorageMode] = useState(() => {
    return localStorage.getItem('promptcraft_storage_mode') || 'web';
  });
  const [showStorageMenu, setShowStorageMenu] = useState(false);

  const storageMenuRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (storageMenuRef.current && !storageMenuRef.current.contains(e.target)) {
        setShowStorageMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-resize multiline textarea up to 140px
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [inputValue]);

  const selectStorageMode = async (mode) => {
    setStorageMode(mode);
    localStorage.setItem('promptcraft_storage_mode', mode);
    setShowStorageMenu(false);

    if (mode === 'cloud') {
      await handleCloudSync();
    } else {
      setSyncToast(lang === 'vi' ? 'Đang dùng: Lưu trữ cục bộ trên trình duyệt' : 'Active: Browser Local Storage');
      setTimeout(() => setSyncToast(''), 3000);
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
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

  const getLocalizedMessageContent = (msg) => {
    if (lang === 'vi') return msg.content;
    const isInitialWelcome =
      msg.id === 'init-1' ||
      msg.content?.startsWith('Xin chào. Tôi là **Cortex Bot**') ||
      msg.content?.startsWith('Chào bạn, mình là **Cortex');
    if (isInitialWelcome) {
      return `Hello! I'm **Cortex v5.0** — your technical & prompt engineering assistant on Prompt AI PNIT.

Paste any rough idea to **audit and rewrite your prompt live**, ask about **code, OWASP security, or research methodology**, or switch modes above to match your goal.`;
    }
    if (msg.id === 'init-fresh' || msg.content?.startsWith('Phiên trò chuyện đã được làm mới')) {
      return 'Conversation reset. Choose a mode above and send your question.';
    }
    return msg.content;
  };

  const sendPromptText = async (textToSend, overrideMode) => {
    const trimmed = String(textToSend || '').trim();
    if (!trimmed || isThinking) return;

    const modeToUse = overrideMode || activeMode;
    if (overrideMode && overrideMode !== activeMode) {
      setActiveMode(overrideMode);
    }

    const userMsg = {
      id: 'usr-' + Date.now(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toLocaleTimeString(lang === 'vi' ? 'vi-VN' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    };

    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    setInputValue('');
    setIsThinking(true);

    try {
      const botResponse = await chatWithTrainedBot(trimmed, messages, modeToUse, lang);
      setMessages((prev) => [...prev, botResponse]);
      setOpenThinkingId(null);
    } finally {
      setIsThinking(false);
      setStorageMetrics(getStorageMetrics());
    }
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    await sendPromptText(inputValue);
  };

  const handleRegenerateLast = async () => {
    if (isThinking) return;
    const lastUserIdx = [...messages].reverse().findIndex((m) => m.role === 'user');
    if (lastUserIdx === -1) return;
    const actualIdx = messages.length - 1 - lastUserIdx;
    const lastUserText = messages[actualIdx].content;
    const historyBeforeLastUser = messages.slice(0, actualIdx);

    setMessages(messages.slice(0, actualIdx + 1));
    setIsThinking(true);
    try {
      const botResponse = await chatWithTrainedBot(lastUserText, historyBeforeLastUser, activeMode, lang);
      setMessages((prev) => [...prev, botResponse]);
    } finally {
      setIsThinking(false);
      setStorageMetrics(getStorageMetrics());
    }
  };

  const handleCloudSync = async () => {
    setSyncToast(lang === 'vi' ? 'Đang kết nối Vercel Storage API...' : 'Connecting to Vercel Storage API...');
    const res = await syncAllToVercelDatabase();
    setSyncToast(res.message);
    setTimeout(() => setSyncToast(''), 3000);
  };

  const clearChat = () => {
    if (
      !confirm(
        lang === 'vi'
          ? 'Bạn có chắc muốn xóa sạch toàn bộ lịch sử cuộc trò chuyện này không?'
          : 'Are you sure you want to clear the entire chat history?'
      )
    ) {
      return;
    }
    const initial = [
      {
        id: 'init-fresh',
        role: 'assistant',
        content:
          lang === 'vi'
            ? 'Phiên trò chuyện đã được làm mới. Hãy chọn chế độ và nhập câu hỏi của bạn.'
            : 'Conversation reset. Choose a mode above and send your question.',
        timestamp: lang === 'vi' ? 'Vừa xong' : 'Just now'
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
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(messages, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `cortex_chat_history_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const latestMessage = messages[messages.length - 1];
  const latestFollowUps =
    latestMessage?.role === 'assistant' && Array.isArray(latestMessage.suggestedFollowUps) && latestMessage.suggestedFollowUps.length > 0
      ? latestMessage.suggestedFollowUps
      : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Bot Identity Header */}
      <div className="border-b border-[var(--border-subtle)] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-xs text-emerald-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>{lang === 'vi' ? 'Cortex v5.0 • Phân tích Prompt, Code & Bảo mật trực tiếp' : 'Cortex v5.0 • Live Prompt, Code & Security Engine'}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] flex items-center space-x-2.5">
            <Bot className="w-6 h-6 text-[#2563EB] dark:text-blue-400 shrink-0" />
            <span>{t.cortexBot.title}</span>
          </h1>
          <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
            {t.cortexBot.subtitle}
          </p>
        </div>

        {/* Storage Mode Selector & Actions */}
        <div className="relative self-start sm:self-auto" ref={storageMenuRef}>
          <button
            type="button"
            onClick={() => setShowStorageMenu(!showStorageMenu)}
            className="px-3.5 py-2 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--border-hover)] text-xs font-mono flex items-center space-x-2 text-[var(--text-primary)] cursor-pointer transition-colors"
            title={lang === 'vi' ? 'Chọn chế độ lưu trữ dữ liệu' : 'Select storage mode'}
          >
            {storageMode === 'cloud' ? (
              <Cloud className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <HardDrive className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
            )}
            <span className="font-semibold">
              {storageMode === 'cloud'
                ? (lang === 'vi' ? 'Đồng bộ Cloud' : 'Cloud Sync')
                : (lang === 'vi' ? 'Lưu trên trình duyệt' : 'Browser Storage')}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform duration-150 ${showStorageMenu ? 'rotate-180 text-[#2563EB]' : ''}`} />
          </button>

          {showStorageMenu && (
            <div className="absolute right-0 mt-2 w-72 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-2 z-50 space-y-1.5 text-xs font-mono shadow-lg">
              <div className="px-2 py-1 text-[11px] font-semibold text-[var(--text-muted)] border-b border-[var(--border-subtle)]">
                {lang === 'vi' ? 'Chế độ lưu trữ lịch sử' : 'History Storage Mode'}
              </div>

              <button
                type="button"
                onClick={() => selectStorageMode('web')}
                className={`w-full p-2.5 rounded-[6px] text-left flex items-start space-x-2.5 transition-colors cursor-pointer ${
                  storageMode === 'web'
                    ? 'bg-[#2563EB]/10 border border-[#2563EB]/30 text-[var(--text-primary)]'
                    : 'hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-transparent'
                }`}
              >
                <HardDrive className={`w-4 h-4 mt-0.5 shrink-0 ${storageMode === 'web' ? 'text-[#2563EB] dark:text-blue-400' : 'text-[var(--text-muted)]'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[var(--text-primary)]">
                      {lang === 'vi' ? 'Lưu trên trình duyệt' : 'Browser Storage'}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-[6px] bg-[#2563EB]/15 text-[#2563EB] dark:text-blue-400 font-semibold">
                      {lang === 'vi' ? 'Mặc định' : 'Default'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-0.5 font-sans">
                    {lang === 'vi' ? 'Lưu trực tiếp trên máy bạn, riêng tư 100%.' : 'Stored locally in your browser, 100% private.'}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => selectStorageMode('cloud')}
                className={`w-full p-2.5 rounded-[6px] text-left flex items-start space-x-2.5 transition-colors cursor-pointer ${
                  storageMode === 'cloud'
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-[var(--text-primary)]'
                    : 'hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-transparent'
                }`}
              >
                <Cloud className={`w-4 h-4 mt-0.5 shrink-0 ${storageMode === 'cloud' ? 'text-emerald-500' : 'text-[var(--text-muted)]'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[var(--text-primary)]">
                      {lang === 'vi' ? 'Đồng bộ Đám mây' : 'Cloud Sync'}
                    </span>
                    {storageMode === 'cloud' && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-[6px] bg-emerald-500/15 text-emerald-500 font-semibold">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mt-0.5 font-sans">
                    {lang === 'vi' ? 'Đồng bộ qua Vercel Storage API.' : 'Sync via Vercel Storage API.'}
                  </p>
                </div>
              </button>

              <div className="pt-1.5 border-t border-[var(--border-subtle)] space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    exportChatHistory();
                    setShowStorageMenu(false);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-[6px] text-left flex items-center space-x-2 hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
                  <span>{lang === 'vi' ? 'Xuất lịch sử (.json)' : 'Export history (.json)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    clearChat();
                    setShowStorageMenu(false);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-[6px] text-left flex items-center space-x-2 hover:bg-rose-500/10 text-rose-500 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{lang === 'vi' ? 'Xóa cuộc trò chuyện' : 'Clear conversation'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sync Toast Notification */}
      {syncToast && (
        <div className="p-3 rounded-[6px] bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-600 dark:text-emerald-300 flex items-center justify-between">
          <span className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{syncToast}</span>
          </span>
        </div>
      )}

      {/* 4 Cognitive Modes Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        {BOT_MODES.map((mode) => {
          const IconComponent = MODE_ICON_MAP[mode.icon] || Cpu;
          const isSelected = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => setActiveMode(mode.id)}
              className={`p-3 rounded-[6px] border text-left transition-colors cursor-pointer flex flex-col justify-between gap-1 ${
                isSelected
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)]'
              }`}
            >
              <div className="flex items-center space-x-1.5 font-semibold text-xs">
                <IconComponent className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-[#2563EB] dark:text-blue-400'}`} />
                <span className="truncate">{lang === 'vi' ? mode.name : mode.nameEn}</span>
              </div>
              <div className={`text-[11px] line-clamp-2 leading-snug ${isSelected ? 'text-white/85' : 'text-[var(--text-muted)]'}`}>
                {lang === 'vi' ? mode.desc : mode.descEn}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Chat Container */}
      <div className="craft-card flex flex-col h-[72vh] min-h-[520px] max-h-[760px] overflow-hidden">
        {/* Top Status Bar */}
        <div className="px-4 py-2.5 bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)] shrink-0">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[var(--text-primary)] font-medium">
                {(() => {
                  const activeModeObj = BOT_MODES.find((m) => m.id === activeMode);
                  return lang === 'vi' ? activeModeObj?.name : activeModeObj?.nameEn;
                })()}
              </span>
            </span>
            {saveIndicator && (
              <span className="text-emerald-500 font-medium flex items-center space-x-1">
                <Check className="w-3 h-3" />
                <span>{lang === 'vi' ? 'Đã lưu' : 'Saved'}</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono text-[var(--text-secondary)] tabular-nums">
              {lang === 'vi' ? 'Bộ nhớ:' : 'Storage:'} <strong className="text-[var(--text-primary)]">{storageMetrics.formatted}</strong> / 1 GB
            </span>
          </div>
        </div>

        {/* Message Stream */}
        <div
          ref={messagesContainerRef}
          data-lenis-prevent
          className="flex-1 min-h-0 p-4 sm:p-6 overflow-y-auto overscroll-contain touch-pan-y space-y-5"
        >
          {messages.map((msg, idx) => {
            const isLastAssistant = msg.role === 'assistant' && idx === messages.length - 1 && idx > 0;
            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}
              >
                <div
                  className={`w-8 h-8 rounded-[6px] flex items-center justify-center shrink-0 text-xs font-bold ${
                    msg.role === 'user'
                      ? 'bg-[#2563EB] text-white'
                      : 'bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[#2563EB] dark:text-blue-400'
                  }`}
                >
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[86%] sm:max-w-[80%] rounded-[6px] p-4 text-sm leading-relaxed space-y-2.5 border ${
                    msg.role === 'user'
                      ? 'bg-[#2563EB] text-white border-[#2563EB]'
                      : 'bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)]'
                  }`}
                >
                  <div
                    className={`flex items-center justify-between text-[11px] pb-1.5 border-b ${
                      msg.role === 'user' ? 'border-white/20 text-white/80' : 'border-[var(--border-subtle)] text-[var(--text-muted)]'
                    }`}
                  >
                    <span className="font-semibold">{msg.role === 'user' ? (lang === 'vi' ? 'Bạn' : 'You') : 'Cortex'}</span>
                    <span className="font-mono tabular-nums">{msg.timestamp === 'Vừa xong' && lang !== 'vi' ? 'Just now' : msg.timestamp}</span>
                  </div>

                  {/* Collapsible Chain-of-Thought Drawer */}
                  {msg.thinking && msg.role !== 'user' && (
                    <div className="p-2.5 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs space-y-1.5">
                      <button
                        type="button"
                        onClick={() => setOpenThinkingId(openThinkingId === msg.id ? null : msg.id)}
                        className="w-full flex items-center justify-between text-[#2563EB] dark:text-blue-400 font-medium cursor-pointer"
                      >
                        <span className="flex items-center space-x-1.5">
                          <BrainCircuit className="w-3.5 h-3.5 shrink-0" />
                          <span>{t.cortexBot.thinkingHeader}</span>
                        </span>
                        {openThinkingId === msg.id ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {openThinkingId === msg.id && (
                        <div className="pt-2 border-t border-[var(--border-subtle)] space-y-1 text-xs text-[var(--text-secondary)] leading-relaxed">
                          <div><strong>{t.cortexBot.detectedIntent}</strong> {msg.thinking.detectedIntent}</div>
                          <div><strong>{t.cortexBot.ragReference}</strong> {msg.thinking.ragReference}</div>
                          {msg.thinking.cognitiveNotes && (
                            <div><strong>{t.cortexBot.cognitiveNotes}</strong> {msg.thinking.cognitiveNotes}</div>
                          )}
                          {msg.thinking.rulesApplied && msg.thinking.rulesApplied.length > 0 && (
                            <div className="pt-1">
                              <strong>{t.cortexBot.rulesApplied}</strong>
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

                  {/* Markdown Content */}
                  <div className="max-w-none space-y-2 text-sm">
                    <ReactMarkdown
                      components={{
                        h3: ({ node, ...props }) => <h3 className="text-sm font-bold tracking-tight mt-2 mb-1 text-[var(--text-primary)]" {...props} />,
                        p: ({ node, ...props }) => <p className="leading-relaxed mb-2 last:mb-0" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1 my-2 pl-1" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-1 my-2 pl-1" {...props} />,
                        li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                        strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                        em: ({ node, ...props }) => <em className="italic opacity-90" {...props} />,
                        table: ({ node, ...props }) => (
                          <div className="overflow-x-auto my-2">
                            <table className="w-full text-xs border-collapse border border-[var(--border-subtle)]" {...props} />
                          </div>
                        ),
                        th: ({ node, ...props }) => (
                          <th className="text-left px-2.5 py-1.5 border border-[var(--border-subtle)] bg-[var(--bg-surface)] font-semibold" {...props} />
                        ),
                        td: ({ node, ...props }) => (
                          <td className="px-2.5 py-1.5 border border-[var(--border-subtle)]" {...props} />
                        ),
                        code: ({ node, inline, className, children, ...props }) => {
                          const isBlock = !inline && (Boolean(className) || String(children).includes('\n'));
                          if (isBlock) {
                            return <code className="font-mono text-xs" {...props}>{children}</code>;
                          }
                          return (
                            <code
                              className={`px-1.5 py-0.5 rounded-[4px] font-mono text-xs ${
                                msg.role === 'user'
                                  ? 'bg-white/15 text-white'
                                  : 'bg-[var(--code-bg)] border border-[var(--border-subtle)] text-[#2563EB] dark:text-blue-400'
                              }`}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                        pre: ({ node, children }) => <CodeBlockWithCopy lang={lang}>{children}</CodeBlockWithCopy>
                      }}
                    >
                      {getLocalizedMessageContent(msg)}
                    </ReactMarkdown>
                  </div>

                  {/* Message Footer Actions */}
                  {msg.role === 'assistant' && (
                    <div className="flex items-center justify-end gap-2 pt-1.5 border-t border-[var(--border-subtle)]/60">
                      {isLastAssistant && (
                        <button
                          type="button"
                          onClick={handleRegenerateLast}
                          disabled={isThinking}
                          className="px-2 py-1 rounded-[6px] text-[11px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] flex items-center space-x-1 cursor-pointer transition-colors disabled:opacity-40"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>{lang === 'vi' ? 'Tạo lại' : 'Regenerate'}</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => copyText(msg.id, getLocalizedMessageContent(msg))}
                        className="px-2 py-1 rounded-[6px] text-[11px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] flex items-center space-x-1 cursor-pointer transition-colors"
                      >
                        {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedId === msg.id ? (lang === 'vi' ? 'Đã chép' : 'Copied') : (lang === 'vi' ? 'Sao chép' : 'Copy')}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Dynamic Contextual Follow-Up Chips */}
          {!isThinking && latestFollowUps && (
            <div className="pl-11 flex flex-wrap gap-2">
              {latestFollowUps.map((suggestion, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => sendPromptText(suggestion)}
                  className="px-3 py-1.5 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:text-blue-400 text-xs text-[var(--text-secondary)] flex items-center space-x-1.5 cursor-pointer transition-colors text-left"
                >
                  <CornerDownRight className="w-3 h-3 shrink-0 opacity-70" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          )}

          {isThinking && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-[6px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
              </div>
              <div className="rounded-[6px] px-4 py-3 text-xs text-[var(--text-secondary)] flex items-center space-x-2 font-mono bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#2563EB] dark:text-blue-400" />
                <span>
                  {(() => {
                    const activeModeObj = BOT_MODES.find((m) => m.id === activeMode);
                    const modeLabel = lang === 'vi' ? activeModeObj?.name : activeModeObj?.nameEn;
                    return lang === 'vi'
                      ? `Cortex đang phân tích theo chế độ ${modeLabel}...`
                      : `Cortex is synthesizing in ${modeLabel} mode...`;
                  })()}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Action Area */}
        <div className="p-3.5 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] space-y-2.5 shrink-0">
          {/* Quick starter chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[var(--text-muted)] shrink-0 flex items-center space-x-1 mr-1">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
              <span>{t.cortexBot.suggestedPrompts}</span>
            </span>
            <button
              type="button"
              onClick={() => sendPromptText(
                lang === 'vi' ? 'Tối ưu prompt này cho Claude: Giúp tôi refactor ứng dụng React chạy mượt hơn' : 'Optimize this prompt for Claude: Help me refactor my React app for better performance',
                'architect'
              )}
              className="px-2.5 py-1 rounded-[6px] border border-[var(--border-subtle)] hover:border-[#2563EB]/60 bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] shrink-0 cursor-pointer transition-colors"
            >
              {t.cortexBot.chipArchitect}
            </button>
            <button
              type="button"
              onClick={() => sendPromptText(
                lang === 'vi' ? 'Kiểm tra bảo mật OWASP cho API đăng nhập và chống Prompt Injection' : 'Review OWASP security best practices for login APIs and Prompt Injection defense',
                'security'
              )}
              className="px-2.5 py-1 rounded-[6px] border border-[var(--border-subtle)] hover:border-[#2563EB]/60 bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] shrink-0 cursor-pointer transition-colors"
            >
              {t.cortexBot.chipSecurity}
            </button>
            <button
              type="button"
              onClick={() => sendPromptText(
                lang === 'vi' ? 'Mình đang thấy khá áp lực và kiệt sức vì công việc dồn dập quá...' : 'I have been feeling overwhelmed and burnt out with everything piling up...',
                'empathy'
              )}
              className="px-2.5 py-1 rounded-[6px] border border-[var(--border-subtle)] hover:border-[#2563EB]/60 bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] shrink-0 cursor-pointer transition-colors"
            >
              {t.cortexBot.chipEmpathy}
            </button>
            <button
              type="button"
              onClick={() => sendPromptText(
                lang === 'vi' ? 'Mình đang phân vân giữa tự khởi nghiệp hay tiếp tục đi làm ổn định?' : 'Should I start my own project or stay in my full-time job?',
                'socratic'
              )}
              className="px-2.5 py-1 rounded-[6px] border border-[var(--border-subtle)] hover:border-[#2563EB]/60 bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] shrink-0 cursor-pointer transition-colors"
            >
              {t.cortexBot.chipSocratic}
            </button>
          </div>

          {/* Multiline Composer (Enter to send, Shift+Enter for newline) */}
          <form onSubmit={handleSend} className="flex items-end gap-2">
            <textarea
              ref={textareaRef}
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={t.cortexBot.inputPlaceholder}
              className="flex-1 min-w-0 px-3.5 py-2.5 rounded-[6px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#2563EB] resize-none leading-relaxed transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isThinking}
              className="px-4 py-2.5 rounded-[6px] bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-40 text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer shrink-0 h-[42px]"
            >
              <span>{t.cortexBot.btnSend}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
