import React, { useState, useEffect, useRef } from 'react';
import { 
  Key, 
  Cpu, 
  Users, 
  Database, 
  Trash2, 
  Save, 
  Check, 
  Lock,
  ArrowRight,
  ShieldAlert,
  Fingerprint,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Eye,
  LogOut,
  RefreshCw,
  Sliders,
  DollarSign,
  Shield,
  Layers,
  Award,
  Upload,
  RotateCcw,
  Download,
  Globe,
  Layout,
  Edit3,
  Plus,
  X
} from 'lucide-react';
import { 
  getStorageData, 
  setStorageData, 
  DEFAULT_ADMIN_CONFIG, 
  DEFAULT_BENCHMARKS, 
  DEFAULT_DEVS 
} from '../services/mockStorage';
import { DEFAULT_DOC_CONTENT, DEFAULT_DOC_PATH, DEFAULT_DOC_FILENAME } from '../data/defaultDocContent';
import UserAvatar from '../components/UserAvatar';
import { authClient } from '../services/authClient';
import { useLanguage, getMergedTranslations } from '../context/LanguageContext';

const CMS_SECTIONS = [
  { id: 'brand', label: 'Thương hiệu & Tiêu đề Web' },
  { id: 'nav', label: 'Thanh Menu Điều Hướng' },
  { id: 'landing', label: 'Trang Chủ (Home)' },
  { id: 'inspector', label: 'Trang Tối Ưu Câu Lệnh' },
  { id: 'cortexBot', label: 'Trang Trợ Lý AI (Cortex)' },
  { id: 'directory', label: 'Trang Đội Ngũ Kỹ Sư' },
  { id: 'repos', label: 'Trang Repo GitHub AI' },
  { id: 'research', label: 'Trang Góc Nghiên Cứu' },
  { id: 'footer', label: 'Chân Trang (Footer)' }
];

const CMS_FIELD_LABELS = {
  // brand
  name: 'Tên thương hiệu',
  subtitle: 'Mô tả ngắn dưới tên thương hiệu',
  tagline: 'Khẩu hiệu (Tagline)',
  // nav
  home: 'Mục menu: Trang chủ',
  inspector: 'Mục menu: Tối ưu câu lệnh',
  guide: 'Mục menu: Cách sử dụng',
  bot: 'Mục menu: Trò chuyện cùng AI',
  directory: 'Mục menu: Đội ngũ phát triển',
  repos: 'Mục menu: Repo GitHub AI',
  research: 'Mục menu: Góc nghiên cứu',
  devStudio: 'Mục menu: Đóng góp câu lệnh',
  joinTeam: 'Nút tham gia đội ngũ',
  adminPortal: 'Mục menu: Quản trị hệ thống',
  adminKey: 'Mục menu: Khóa Quản trị',
  // landing
  heroBadge: 'Nhãn nhỏ phía trên tiêu đề chính',
  heroTitle: 'Tiêu đề chính (Hero Title)',
  heroTitleHighlight: 'Phần nhấn mạnh tiêu đề (tùy chọn)',
  heroSubtitle: 'Đoạn giới thiệu chính (Hero Subtitle)',
  btnInspect: 'Nút hành động chính (Primary CTA)',
  btnChatBot: 'Nút hành động phụ (Secondary CTA)',
  btnResearch: 'Nút đọc tài liệu nghiên cứu',
  stepsSectionTitle: 'Tiêu đề khối 3 bước sử dụng',
  stepsGuideLink: 'Chữ liên kết hướng dẫn chi tiết',
  step1Title: 'Tiêu đề Bước 1',
  step1Desc: 'Nội dung mô tả Bước 1',
  step2Title: 'Tiêu đề Bước 2',
  step2Desc: 'Nội dung mô tả Bước 2',
  step3Title: 'Tiêu đề Bước 3',
  step3Desc: 'Nội dung mô tả Bước 3',
  featuresSectionTitle: 'Tiêu đề khối các tính năng chính',
  feature1Title: 'Tên tính năng 1',
  feature1Desc: 'Mô tả tính năng 1 (Kiểm định Prompt)',
  feature2Title: 'Tên tính năng 2',
  feature2Desc: 'Mô tả tính năng 2 (Trợ lý AI)',
  feature3Title: 'Tên tính năng 3',
  feature3Desc: 'Mô tả tính năng 3 (Nghiên cứu)',
  feature4Title: 'Tên tính năng 4',
  feature4Desc: 'Mô tả tính năng 4 (Repo GitHub AI)',
  joinTeamTitle: 'Tiêu đề banner gia nhập đội ngũ',
  joinTeamSubtitle: 'Nội dung banner gia nhập đội ngũ',
  joinTeamBtn: 'Nút bấm banner gia nhập đội ngũ',
  // shared / inspector / cortexBot / directory / repos / research / footer
  badge: 'Nhãn Badge đầu trang',
  title: 'Tiêu đề trang',
  placeholder: 'Gợi ý trong ô nhập câu lệnh',
  targetAiBadge: 'Nhãn chọn AI đích',
  targetAiDesc: 'Mô tả cách chọn AI đích',
  btnSample: 'Nút dùng thử mẫu',
  btnInspecting: 'Chữ hiển thị khi đang phân tích',
  copyOptimized: 'Nút sao chép câu lệnh tối ưu',
  thinkingHeader: 'Tiêu đề hộp suy nghĩ AI',
  chipEmpathy: 'Gợi ý nhanh 1 (Thấu cảm)',
  chipArchitect: 'Gợi ý nhanh 2 (Kỹ thuật/Code)',
  chipSecurity: 'Gợi ý nhanh 3 (Bảo mật)',
  chipSocratic: 'Gợi ý nhanh 4 (Gợi mở)',
  inputPlaceholder: 'Gợi ý trong ô chat AI',
  btnSend: 'Chữ nút Gửi',
  certId: 'Nhãn mã chứng nhận kỹ sư',
  searchPlaceholder: 'Gợi ý trong ô tìm kiếm Repo',
  btnSearch: 'Chữ nút Tìm kiếm',
  docBannerTitle: 'Tiêu đề khung tài liệu nghiên cứu',
  brandDesc: 'Mô tả dự án ở chân trang',
  authorPrefix: 'Tiền tố tên tác giả',
  licenseTitle: 'Tiêu đề bản quyền & giấy phép',
  licenseDesc: 'Mô tả giấy phép Apache 2.0',
  copyright: 'Dòng bản quyền Copyright cuối trang'
};

export default function AdminPortal() {
  const {
    siteOverrides,
    rawTranslations,
    updateSiteSection,
    resetSiteSection,
    resetAllSiteContent
  } = useLanguage();

  const [secretInput, setSecretInput] = useState('');
  const [session, setSession] = useState({ authenticated: false, role: null });
  const [activeTab, setActiveTab] = useState('cms'); // 'cms' | 'training' | 'licenses' | 'benchmarks' | 'devs' | 'docs' | 'audit'
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // CMS Editor State
  const [cmsLang, setCmsLang] = useState('vi');
  const [cmsSection, setCmsSection] = useState('landing');
  const [cmsDraft, setCmsDraft] = useState({});
  const [cmsToast, setCmsToast] = useState('');

  useEffect(() => {
    const merged = getMergedTranslations(cmsLang, siteOverrides);
    setCmsDraft({ ...(merged[cmsSection] || {}) });
  }, [cmsLang, cmsSection, siteOverrides]);

  // Security Audit Log & Licenses từ Server
  const [auditLogs, setAuditLogs] = useState([]);
  const [licenses, setLicenses] = useState([]);

  // Dữ liệu huấn luyện Prompt
  const [adminConfig, setAdminConfig] = useState(() => 
    getStorageData('promptcraft_system_prompt_cfg', DEFAULT_ADMIN_CONFIG)
  );
  const [benchmarks, setBenchmarks] = useState(() => 
    getStorageData('promptcraft_benchmarks', DEFAULT_BENCHMARKS)
  );
  const [devs, setDevs] = useState(() => 
    getStorageData('promptcraft_verified_devs', DEFAULT_DEVS)
  );

  // Benchmark CRUD State
  const [showBmForm, setShowBmForm] = useState(false);
  const [editingBmId, setEditingBmId] = useState(null);
  const [bmForm, setBmForm] = useState({
    title: '',
    industry: 'Công nghệ thông tin',
    author: 'Admin PNIT',
    rating: '4.95',
    originalPrompt: '',
    optimizedPrompt: ''
  });

  const [newDevName, setNewDevName] = useState('');
  const [newDevCert, setNewDevCert] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  // Quản lý tài liệu nghiên cứu (Docs Markdown) dành riêng cho Admin
  const fileInputRef = useRef(null);
  const [showDocPreview, setShowDocPreview] = useState(false);
  const [docContent, setDocContent] = useState(() => {
    return localStorage.getItem('promptcraft_uploaded_doc_content') || DEFAULT_DOC_CONTENT;
  });
  const [docMeta, setDocMeta] = useState(() => {
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

  const handleUploadDoc = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        const meta = {
          fileName: file.name,
          path: `user_uploads/${file.name}`,
          isCustom: true,
          size: `${(file.size / 1024).toFixed(1)} KB`,
          updatedAt: new Date().toLocaleTimeString('vi-VN') + ' ' + new Date().toLocaleDateString('vi-VN')
        };
        setDocContent(content);
        setDocMeta(meta);
        localStorage.setItem('promptcraft_uploaded_doc_content', content);
        localStorage.setItem('promptcraft_uploaded_doc_meta', JSON.stringify(meta));
        setShowDocPreview(true);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetDoc = () => {
    setDocContent(DEFAULT_DOC_CONTENT);
    const meta = {
      fileName: DEFAULT_DOC_FILENAME,
      path: DEFAULT_DOC_PATH,
      isCustom: false,
      size: `${(DEFAULT_DOC_CONTENT.length / 1024).toFixed(1)} KB`,
      updatedAt: 'Chính thức từ hệ thống'
    };
    setDocMeta(meta);
    localStorage.removeItem('promptcraft_uploaded_doc_content');
    localStorage.removeItem('promptcraft_uploaded_doc_meta');
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

  useEffect(() => {
    checkActiveSession();
  }, []);

  const checkActiveSession = async () => {
    const s = await authClient.checkSession();
    if (s.authenticated) {
      setSession({ authenticated: true, role: s.role });
      loadTabData(s.role, activeTab);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoggingIn(true);

    try {
      const res = await authClient.login(secretInput.trim());
      setSession({ authenticated: true, role: res.role });
      setSecretInput('');
      loadTabData(res.role, activeTab);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await authClient.logout();
    setSession({ authenticated: false, role: null });
    setAuditLogs([]);
  };

  const loadTabData = async (role, tab) => {
    try {
      if (tab === 'audit' && role === 'OWNER') {
        const data = await authClient.getSecurityAuditLogs();
        setAuditLogs(data.logs || []);
      } else if (tab === 'licenses') {
        const data = await authClient.getLicenses();
        setLicenses(data.licenses || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRevokeLicense = async (maskedId) => {
    if (!confirm(`Bạn có chắc muốn thu hồi license ${maskedId}?`)) return;
    try {
      await authClient.revokeLicense(maskedId);
      loadTabData(session.role, 'licenses');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    loadTabData(session.role, tab);
  };

  const handleSaveConfig = () => {
    setStorageData('promptcraft_system_prompt_cfg', adminConfig);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleAddDev = (e) => {
    e.preventDefault();
    if (!newDevName || !newDevCert) return;

    const newDev = {
      id: 'dev-' + Date.now(),
      name: newDevName,
      certificateId: newDevCert.toUpperCase(),
      avatar: 'icon:code', // 100% Vector Icon, Không dùng ảnh mặt người thật
      tier: 'Gold Specialist',
      promptsShared: 0,
      reputation: 100
    };

    const updated = [...devs, newDev];
    setDevs(updated);
    setStorageData('promptcraft_verified_devs', updated);
    setNewDevName('');
    setNewDevCert('');
  };

  const handleDeleteDev = (id) => {
    const updated = devs.filter(d => d.id !== id);
    setDevs(updated);
    setStorageData('promptcraft_verified_devs', updated);
  };

  const handleDeleteBenchmark = (id) => {
    if (!confirm('Bạn có chắc muốn xóa prompt mẫu này khỏi hệ thống không?')) return;
    const updated = benchmarks.filter(b => b.id !== id);
    setBenchmarks(updated);
    setStorageData('promptcraft_benchmarks', updated);
  };

  const handleOpenAddBm = () => {
    setEditingBmId(null);
    setBmForm({
      title: '',
      industry: 'Công nghệ thông tin',
      author: 'Admin PNIT',
      rating: '4.95',
      originalPrompt: '',
      optimizedPrompt: ''
    });
    setShowBmForm(true);
  };

  const handleOpenEditBm = (bm) => {
    setEditingBmId(bm.id);
    setBmForm({
      title: bm.title || '',
      industry: bm.industry || 'Công nghệ thông tin',
      author: bm.author || 'Admin PNIT',
      rating: String(bm.rating || '4.95'),
      originalPrompt: bm.originalPrompt || '',
      optimizedPrompt: bm.optimizedPrompt || ''
    });
    setShowBmForm(true);
  };

  const handleSaveBm = (e) => {
    e.preventDefault();
    if (!bmForm.title.trim() || !bmForm.optimizedPrompt.trim()) return;
    const ratingVal = Math.min(5, Math.max(1, parseFloat(bmForm.rating) || 4.9));

    let updated;
    if (editingBmId) {
      updated = benchmarks.map((b) =>
        b.id === editingBmId
          ? {
              ...b,
              title: bmForm.title.trim(),
              titleEn: bmForm.title.trim(),
              industry: bmForm.industry.trim(),
              industryEn: bmForm.industry.trim(),
              author: bmForm.author.trim() || 'Admin PNIT',
              rating: ratingVal,
              originalPrompt: bmForm.originalPrompt.trim() || bmForm.title.trim(),
              originalPromptEn: bmForm.originalPrompt.trim() || bmForm.title.trim(),
              optimizedPrompt: bmForm.optimizedPrompt.trim(),
              optimizedPromptEn: bmForm.optimizedPrompt.trim()
            }
          : b
      );
    } else {
      const newItem = {
        id: 'bm-' + Date.now(),
        title: bmForm.title.trim(),
        titleEn: bmForm.title.trim(),
        industry: bmForm.industry.trim(),
        industryEn: bmForm.industry.trim(),
        author: bmForm.author.trim() || 'Admin PNIT',
        authorBadge: 'Admin Curated',
        rating: ratingVal,
        upvotes: 1,
        testedModels: ['ChatGPT', 'Claude', 'Gemini'],
        tags: ['custom', 'admin'],
        originalPrompt: bmForm.originalPrompt.trim() || bmForm.title.trim(),
        originalPromptEn: bmForm.originalPrompt.trim() || bmForm.title.trim(),
        optimizedPrompt: bmForm.optimizedPrompt.trim(),
        optimizedPromptEn: bmForm.optimizedPrompt.trim(),
        metrics: { clarity: 96, depth: 95, emotionScore: 94 }
      };
      updated = [newItem, ...benchmarks];
    }

    setBenchmarks(updated);
    setStorageData('promptcraft_benchmarks', updated);
    setShowBmForm(false);
    setEditingBmId(null);
  };

  const showCmsStatus = (msg) => {
    setCmsToast(msg);
    setTimeout(() => setCmsToast(''), 2500);
  };

  const handleSaveCmsSection = () => {
    updateSiteSection(cmsLang, cmsSection, cmsDraft);
    showCmsStatus('Đã lưu nội dung trang! Toàn bộ website đã được cập nhật.');
  };

  const handleResetCmsSection = () => {
    if (!confirm('Khôi phục toàn bộ văn bản trong mục này về mặc định ban đầu?')) return;
    resetSiteSection(cmsLang, cmsSection);
    showCmsStatus('Đã khôi phục mục hiện tại về mặc định.');
  };

  const handleResetAllCms = () => {
    if (!confirm('Khôi phục toàn bộ nội dung mọi trang (cả VI và EN) về mặc định ban đầu?')) return;
    resetAllSiteContent();
    showCmsStatus('Đã khôi phục toàn bộ website về nội dung gốc.');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Precision Header */}
      <div className="border-b border-[var(--border-subtle)] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider flex items-center space-x-2">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>ENCLAVE ZERO-TRUST / RECAPTCHA V3 DEFENDED / HTTPONLY COOKIE 4H</span>
          </div>
          <h1 className="text-2xl font-semibold text-[var(--text-primary)] flex items-center space-x-2.5">
            <span>Hệ Thống Quản Trị & Huấn Luyện AI</span>
            {session.authenticated && (
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                session.role === 'OWNER' 
                  ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800' 
                  : 'bg-amber-950/60 text-amber-400 border-amber-800'
              }`}>
                ROLE: {session.role}
              </span>
            )}
          </h1>
          <p className="text-xs text-[var(--text-secondary)]">
            Khu vực dành riêng cho Owner & Support điều phối logic suy luận, cấp chứng chỉ kỹ sư và giám sát bảo mật.
          </p>
        </div>

        {session.authenticated && (
          <button
            onClick={handleLogout}
            className="neu-button px-3.5 py-1.5 text-rose-400 hover:text-rose-300 text-xs font-mono flex items-center space-x-1.5 transition-colors self-start sm:self-auto"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng Xuất Phiên</span>
          </button>
        )}
      </div>

      {!session.authenticated ? (
        /* Login Card */
        <div className="craft-card max-w-sm mx-auto p-6 space-y-4">
          <div className="space-y-1 text-center">
            <div className="w-10 h-10 rounded-xl craft-card flex items-center justify-center mx-auto mb-2 text-indigo-400">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">Đăng Nhập Quản Trị Viên</h2>
            <div className="flex items-center justify-center space-x-1 text-[11px] font-mono text-emerald-400">
              <ShieldCheck className="w-3 h-3" />
              <span>Google reCAPTCHA v3 Bảo Vệ</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              required
              value={secretInput}
              onChange={(e) => setSecretInput(e.target.value)}
              placeholder="Nhập khóa bảo mật..."
              className="craft-input w-full text-center font-mono text-xs px-3 py-2.5"
            />

            {errorMessage && (
              <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-900/50 text-[11px] font-mono text-rose-300">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn || !secretInput.trim()}
              className="neu-button w-full py-2.5 text-xs font-semibold font-mono disabled:opacity-40"
            >
              {isLoggingIn ? 'Đang xác minh reCAPTCHA & Session...' : 'Xác Thực & Tạo Session 4H'}
            </button>
          </form>

          <div className="text-[10px] font-mono text-[var(--text-muted)] space-y-1 border-t border-[var(--border-subtle)] pt-3">
            <div>Owner Key: <code className="text-indigo-400">ADMIN_MASTER_KEY_2026</code> (Toàn quyền)</div>
            <div>Support Key: <code className="text-indigo-400">SUPPORT_READONLY_KEY_2026</code> (Chỉ đọc)</div>
          </div>
        </div>
      ) : (
        /* Authenticated Management Panel */
        <div className="space-y-6 animate-fadeIn">
          {/* Tabs Navigation (TẬP TRUNG 100% VÀO PROMPT AI & QUẢN TRỊ) */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border-subtle)] pb-2 text-xs font-mono">
            <button
              onClick={() => handleTabChange('cms')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer ${
                activeTab === 'cms'
                  ? 'bg-[#2563EB] text-white font-bold shadow-xs'
                  : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              <span>Nội Dung Các Trang (CMS)</span>
            </button>

            <button
              onClick={() => handleTabChange('training')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                activeTab === 'training'
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              System Prompt Lõi
            </button>

            <button
              onClick={() => handleTabChange('licenses')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                activeTab === 'licenses'
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Quản Lý License ({licenses.length || 2})
            </button>

            <button
              onClick={() => handleTabChange('benchmarks')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                activeTab === 'benchmarks'
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Kho Prompt Mẫu ({benchmarks.length})
            </button>

            <button
              onClick={() => handleTabChange('devs')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                activeTab === 'devs'
                  ? 'bg-indigo-600 text-white font-bold shadow-xs'
                  : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Kỹ Sư Kiểm Định ({devs.length})
            </button>

            <button
              onClick={() => handleTabChange('docs')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                activeTab === 'docs'
                  ? 'bg-[#2563EB] text-white font-bold shadow-xs'
                  : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              Quản Lý Tài Liệu (Docs)
            </button>

            {/* TAB SECURITY AUDIT DÀNH RIÊNG CHO OWNER */}
            {session.role === 'OWNER' && (
              <button
                onClick={() => handleTabChange('audit')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono flex items-center space-x-1.5 transition-colors cursor-pointer ${
                  activeTab === 'audit'
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : 'border border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] hover:border-[var(--border-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Security Audit Log</span>
              </button>
            )}
          </div>

          {/* TAB 0: PAGE CONTENT CMS EDITOR */}
          {activeTab === 'cms' && (
            <div className="craft-card p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center space-x-2">
                    <Edit3 className="w-4 h-4 text-[#2563EB]" />
                    <span>Trình Chỉnh Sửa Nội Dung Các Trang Web (Live CMS)</span>
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Chọn ngôn ngữ và khu vực bạn muốn sửa chữ. Sau khi bấm <strong>Lưu Nội Dung Trang</strong>, thay đổi sẽ áp dụng ngay trên toàn bộ website.
                  </p>
                </div>

                {cmsToast && (
                  <span className="text-xs font-mono text-emerald-500 flex items-center space-x-1 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>{cmsToast}</span>
                  </span>
                )}
              </div>

              {/* Language & Section Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold text-[var(--text-secondary)] flex items-center space-x-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>1. Chọn Ngôn Ngữ Chỉnh Sửa:</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCmsLang('vi')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
                        cmsLang === 'vi'
                          ? 'bg-[#2563EB] text-white'
                          : 'border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)]'
                      }`}
                    >
                      Tiếng Việt (VI)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCmsLang('en')}
                      className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
                        cmsLang === 'en'
                          ? 'bg-[#2563EB] text-white'
                          : 'border border-[var(--border-subtle)] bg-[var(--bg-elevated)] text-[var(--text-secondary)]'
                      }`}
                    >
                      English (EN)
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-semibold text-[var(--text-secondary)] flex items-center space-x-1.5">
                    <Layout className="w-3.5 h-3.5 text-[#2563EB]" />
                    <span>2. Chọn Trang / Khu Vực:</span>
                  </label>
                  <select
                    value={cmsSection}
                    onChange={(e) => setCmsSection(e.target.value)}
                    className="craft-input w-full px-3 py-2 text-xs font-mono"
                  >
                    {CMS_SECTIONS.map((sec) => {
                      const hasOverride =
                        siteOverrides?.[cmsLang]?.[sec.id] &&
                        Object.keys(siteOverrides[cmsLang][sec.id]).length > 0;
                      return (
                        <option key={sec.id} value={sec.id}>
                          {sec.label} {hasOverride ? '(Đã tùy chỉnh)' : ''}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* Dynamic Fields Form */}
              <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
                {Object.keys(rawTranslations[cmsLang]?.[cmsSection] || {}).map((fieldKey) => {
                  const defaultValue = rawTranslations[cmsLang]?.[cmsSection]?.[fieldKey] ?? '';
                  const currentValue = cmsDraft[fieldKey] ?? defaultValue;
                  const isModified = currentValue !== defaultValue;
                  const isLongField =
                    String(defaultValue).length > 70 ||
                    /subtitle|desc|placeholder|copyright|title/i.test(fieldKey);

                  return (
                    <div
                      key={fieldKey}
                      className="p-3.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/40 space-y-1.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <label className="text-xs font-medium text-[var(--text-primary)]">
                          {CMS_FIELD_LABELS[fieldKey] || fieldKey}{' '}
                          <span className="text-[10px] font-mono text-[var(--text-muted)]">({fieldKey})</span>
                        </label>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                              isModified
                                ? 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                                : 'bg-[var(--bg-surface)] text-[var(--text-muted)] border border-[var(--border-subtle)]'
                            }`}
                          >
                            {isModified ? 'Đã sửa' : 'Mặc định'}
                          </span>
                          {isModified && (
                            <button
                              type="button"
                              onClick={() => setCmsDraft({ ...cmsDraft, [fieldKey]: defaultValue })}
                              className="text-[10px] font-mono text-[#2563EB] hover:underline cursor-pointer"
                            >
                              Hoàn tác
                            </button>
                          )}
                        </div>
                      </div>

                      {isLongField ? (
                        <textarea
                          rows={2}
                          value={currentValue}
                          onChange={(e) => setCmsDraft({ ...cmsDraft, [fieldKey]: e.target.value })}
                          disabled={session.role !== 'OWNER'}
                          className="craft-input w-full px-3 py-2 text-xs leading-relaxed disabled:opacity-60"
                        />
                      ) : (
                        <input
                          type="text"
                          value={currentValue}
                          onChange={(e) => setCmsDraft({ ...cmsDraft, [fieldKey]: e.target.value })}
                          disabled={session.role !== 'OWNER'}
                          className="craft-input w-full px-3 py-2 text-xs disabled:opacity-60"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border-subtle)]">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    disabled={session.role !== 'OWNER'}
                    onClick={handleResetCmsSection}
                    className="neu-button px-3.5 py-2 text-xs font-mono text-[var(--text-secondary)] hover:text-amber-500 flex items-center space-x-1.5 cursor-pointer disabled:opacity-40"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Khôi Phục Mục Này</span>
                  </button>

                  {Object.keys(siteOverrides || {}).length > 0 && (
                    <button
                      type="button"
                      disabled={session.role !== 'OWNER'}
                      onClick={handleResetAllCms}
                      className="neu-button px-3.5 py-2 text-xs font-mono text-rose-400 hover:text-rose-300 flex items-center space-x-1.5 cursor-pointer disabled:opacity-40"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Khôi Phục Toàn Bộ Website</span>
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  disabled={session.role !== 'OWNER'}
                  onClick={handleSaveCmsSection}
                  className="px-5 py-2.5 rounded-[8px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-mono font-semibold flex items-center space-x-1.5 cursor-pointer transition-colors disabled:opacity-40"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Lưu Nội Dung Trang</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 1: SYSTEM PROMPT TRAINING */}
          {activeTab === 'training' && (
            <div className="craft-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">Huấn Luyện Logic AI Phân Tích (System Prompt)</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Mọi thay đổi ở đây sẽ lập tức định hình lại trí thông minh của Cortex Bot và AI Inspector.
                  </p>
                </div>
                {saveToast && (
                  <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Đã lưu chỉ dẫn hệ thống</span>
                  </span>
                )}
              </div>

              <textarea
                rows={7}
                value={adminConfig.systemPrompt}
                onChange={(e) => setAdminConfig({ ...adminConfig, systemPrompt: e.target.value })}
                className="craft-input w-full p-4 font-mono text-xs leading-relaxed"
              />

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSaveConfig}
                  className="neu-button px-5 py-2 text-xs font-mono font-medium flex items-center space-x-1.5 text-[var(--text-primary)]"
                >
                  <Save className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Cập Nhật Chỉ Dẫn Hệ Thống</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB: LICENSES MANAGEMENT (Phẳng, Anti-Card-in-Card, Không Nảy) */}
          {activeTab === 'licenses' && (
            <div className="craft-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">Danh Sách License (Mã Hóa Anti-IDOR)</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    ID thực trong cơ sở dữ liệu đã bị ẩn hoàn toàn, thay thế bằng Masked Hash an toàn.
                  </p>
                </div>
                <button
                  onClick={() => loadTabData(session.role, 'licenses')}
                  className="p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-page)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer transition-colors"
                  title="Tải lại danh sách license"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-[var(--border-subtle)]">
                {licenses.length === 0 ? (
                  <div className="py-8 text-center text-xs font-mono text-[var(--text-muted)]">
                    Đang tải hoặc chưa có license nào được cấp...
                  </div>
                ) : (
                  licenses.map((lic) => (
                    <div 
                      key={lic.maskedId} 
                      className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between sm:items-center gap-3"
                    >
                      <div className="space-y-1 text-xs">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-[var(--text-primary)] text-sm">{lic.clientName}</span>
                          <code className="text-[11px] font-mono text-indigo-400 bg-indigo-950/20 px-2 py-0.5 rounded border border-indigo-900/30">
                            {lic.maskedId}
                          </code>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                            lic.status === 'ACTIVE' 
                              ? 'bg-emerald-950/30 text-emerald-400 border border-emerald-800/40' 
                              : 'bg-rose-950/30 text-rose-400 border border-rose-800/40'
                          }`}>
                            {lic.status}
                          </span>
                        </div>
                        <div className="text-[11px] font-mono text-[var(--text-muted)] flex flex-wrap items-center gap-2">
                          <span>Gói: {lic.tier}</span>
                          <span>•</span>
                          <span>Giá niêm yết: ${lic.price}</span>
                          {lic.notes && (
                            <>
                              <span>•</span>
                              <span>Ghi chú: {lic.notes}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {session.role === 'OWNER' && lic.status === 'ACTIVE' && (
                        <button
                          onClick={() => handleRevokeLicense(lic.maskedId)}
                          className="px-3.5 py-1.5 rounded-lg border border-rose-900/40 hover:bg-rose-950/20 text-rose-400 hover:text-rose-300 text-xs font-mono font-medium transition-colors cursor-pointer shrink-0"
                        >
                          Thu Hồi License
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PROMPT BENCHMARKS MANAGEMENT */}
          {activeTab === 'benchmarks' && (
            <div className="craft-card p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    <span>Quản Lý, Thêm & Sửa Kho Prompt Mẫu</span>
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Admin có thể thêm mới, chỉnh sửa nội dung câu lệnh mẫu hoặc xóa các mẫu không phù hợp trên Trang chủ.
                  </p>
                </div>

                {session.role === 'OWNER' && (
                  <button
                    type="button"
                    onClick={handleOpenAddBm}
                    className="px-4 py-2 rounded-[8px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-mono font-semibold flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm Prompt Mẫu Mới</span>
                  </button>
                )}
              </div>

              {showBmForm && (
                <form onSubmit={handleSaveBm} className="p-4 rounded-xl border border-[#2563EB]/40 bg-[var(--bg-elevated)]/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#2563EB]">
                      {editingBmId ? 'CHỈNH SỬA PROMPT MẪU' : 'THÊM PROMPT MẪU MỚI'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowBmForm(false)}
                      className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Tiêu đề mẫu prompt..."
                      value={bmForm.title}
                      onChange={(e) => setBmForm({ ...bmForm, title: e.target.value })}
                      className="craft-input px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Lĩnh vực (VD: Công nghệ thông tin, Học tập...)"
                      value={bmForm.industry}
                      onChange={(e) => setBmForm({ ...bmForm, industry: e.target.value })}
                      className="craft-input px-3 py-2 text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Tên tác giả"
                      value={bmForm.author}
                      onChange={(e) => setBmForm({ ...bmForm, author: e.target.value })}
                      className="craft-input px-3 py-2 text-xs"
                    />
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      max="5"
                      placeholder="Điểm đánh giá (1 - 5)"
                      value={bmForm.rating}
                      onChange={(e) => setBmForm({ ...bmForm, rating: e.target.value })}
                      className="craft-input px-3 py-2 text-xs"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Câu lệnh ngắn / ý tưởng ban đầu (tùy chọn)..."
                    value={bmForm.originalPrompt}
                    onChange={(e) => setBmForm({ ...bmForm, originalPrompt: e.target.value })}
                    className="craft-input w-full px-3 py-2 text-xs"
                  />

                  <textarea
                    rows={4}
                    required
                    placeholder="Nội dung câu lệnh hoàn chỉnh hiển thị trong thẻ..."
                    value={bmForm.optimizedPrompt}
                    onChange={(e) => setBmForm({ ...bmForm, optimizedPrompt: e.target.value })}
                    className="craft-input w-full px-3 py-2 text-xs leading-relaxed"
                  />

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowBmForm(false)}
                      className="neu-button px-4 py-1.5 text-xs font-mono text-[var(--text-secondary)] cursor-pointer"
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-[8px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-mono font-semibold cursor-pointer"
                    >
                      {editingBmId ? 'Lưu Thay Đổi' : 'Thêm Vào Kho'}
                    </button>
                  </div>
                </form>
              )}

              <div className="divide-y divide-[var(--border-subtle)]">
                {benchmarks.map((bm) => (
                  <div key={bm.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div className="space-y-1 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-[var(--text-primary)] text-sm">{bm.title}</span>
                        <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/20 px-2 py-0.5 rounded border border-indigo-900/30">
                          {bm.industry}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-[var(--text-muted)] flex items-center space-x-2">
                        <span>Tác giả: {bm.author}</span>
                        <span>•</span>
                        <span>Đánh giá: ★ {bm.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {session.role === 'OWNER' && (
                        <button
                          type="button"
                          onClick={() => handleOpenEditBm(bm)}
                          className="px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:border-[#2563EB] text-[var(--text-secondary)] hover:text-[#2563EB] text-xs font-mono flex items-center space-x-1 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Sửa</span>
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteBenchmark(bm.id)}
                        className="px-3 py-1.5 rounded-lg border border-rose-900/40 hover:bg-rose-950/20 text-rose-400 text-xs font-mono flex items-center space-x-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Xóa</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DEVS MANAGEMENT */}
          {activeTab === 'devs' && (
            <div className="space-y-5">
              <div className="craft-card p-5 space-y-3">
                <div className="text-xs font-semibold text-[var(--text-primary)] flex items-center space-x-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Cấp Chứng Chỉ Prompt Engineer Cho Kỹ Sư Mới</span>
                </div>
                <form onSubmit={handleAddDev} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Tên kỹ sư"
                    value={newDevName}
                    onChange={(e) => setNewDevName(e.target.value)}
                    className="craft-input flex-1 px-3.5 py-2 text-xs font-mono"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Mã chứng chỉ (AGY-CERT-XXX)"
                    value={newDevCert}
                    onChange={(e) => setNewDevCert(e.target.value)}
                    className="craft-input flex-1 px-3.5 py-2 text-xs font-mono uppercase"
                  />
                  <button
                    type="submit"
                    className="neu-button px-5 py-2 text-xs font-mono font-medium text-[var(--text-primary)]"
                  >
                    Cấp Quyền
                  </button>
                </form>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {devs.map((dev) => (
                  <div key={dev.id} className="p-3.5 rounded-xl border border-[var(--border-subtle)] flex justify-between items-center gap-3">
                    <div className="flex items-center space-x-3">
                      <UserAvatar avatar={dev.avatar} name={dev.name} size="w-9 h-9" />
                      <div>
                        <div className="text-xs font-semibold text-[var(--text-primary)]">{dev.name}</div>
                        <div className="text-[11px] font-mono text-indigo-400 mt-0.5">{dev.certificateId}</div>
                      </div>
                    </div>
                    {session.role === 'OWNER' && (
                      <button
                        onClick={() => handleDeleteDev(dev.id)}
                        className="text-[var(--text-muted)] hover:text-rose-400 p-1 cursor-pointer transition-colors"
                        title="Thu hồi chứng chỉ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: RESEARCH DOCUMENT MANAGER */}
          {activeTab === 'docs' && (
            <div className="craft-card p-6 space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleUploadDoc}
                accept=".md,.txt,.doc,.docx"
                className="hidden"
              />

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="flex items-center space-x-1.5 text-xs font-mono text-[#2563EB] dark:text-blue-400 font-bold uppercase tracking-wider">
                    <FileText className="w-4 h-4 shrink-0" />
                    <span>TÀI LIỆU NGHIÊN CỨU CHUYÊN SÂU ĐỘC QUYỀN</span>
                  </span>
                  <span
                    className={`text-[11px] font-mono px-2.5 py-0.5 rounded-[8px] font-semibold ${
                      docMeta.isCustom
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30'
                        : 'bg-[#2563EB]/12 text-[#2563EB] dark:text-blue-400 border border-[#2563EB]/25'
                    }`}
                  >
                    {docMeta.isCustom ? 'Tài liệu Tùy biến (Custom Uploaded)' : 'Tài liệu Gốc (Official)'}
                  </span>
                </div>

                <div className="text-sm font-semibold text-[var(--text-primary)] font-mono flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span className="break-all">{docMeta.path}</span>
                  <span className="text-xs text-[var(--text-muted)] font-normal whitespace-nowrap">
                    ({docMeta.size} • {docMeta.updatedAt})
                  </span>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Admin có thể tải lên tệp Markdown/Text mới để thay thế nội dung tài liệu hiển thị trên trang Góc nghiên cứu, hoặc khôi phục lại tệp gốc hệ thống bất cứ lúc nào.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--border-subtle)]">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-[8px] bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-mono font-semibold flex items-center space-x-1.5 cursor-pointer transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>Tải Lên Docs Mới</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadDoc}
                  className="neu-button px-3.5 py-2 text-xs font-mono font-semibold flex items-center space-x-1.5 text-[var(--text-primary)] cursor-pointer"
                >
                  <Download className="w-4 h-4 text-emerald-500" />
                  <span>Tải Tệp (.md)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowDocPreview(!showDocPreview)}
                  className="neu-button px-3.5 py-2 text-xs font-mono font-semibold flex items-center space-x-1.5 text-[#2563EB] dark:text-blue-400 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>{showDocPreview ? 'Ẩn Xem Trước' : 'Xem Trước Nội Dung'}</span>
                </button>

                {docMeta.isCustom && (
                  <button
                    type="button"
                    onClick={handleResetDoc}
                    className="neu-button px-3.5 py-2 text-xs font-mono font-semibold flex items-center space-x-1.5 text-rose-500 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Khôi Phục Gốc</span>
                  </button>
                )}
              </div>

              {showDocPreview && (
                <div className="p-4 rounded-[8px] border border-[var(--border-subtle)] bg-[var(--bg-elevated)] font-mono text-xs text-[var(--text-secondary)] whitespace-pre-wrap max-h-96 overflow-y-auto leading-relaxed">
                  {docContent}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SECURITY AUDIT LOG (CHỈ DÀNH RIÊNG CHO OWNER) */}
          {activeTab === 'audit' && session.role === 'OWNER' && (
            <div className="craft-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Security Audit Ledger (HMAC Hash Client IP)</span>
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Ghi lại mọi hoạt động xác thực, đánh giá điểm Google reCAPTCHA v3 và các lệnh nhạy cảm.
                  </p>
                </div>
                <button
                  onClick={() => loadTabData(session.role, 'audit')}
                  className="p-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-page)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-[var(--border-subtle)] max-h-96 overflow-y-auto">
                {auditLogs.map((log) => (
                  <div key={log.logRef} className="py-2.5 first:pt-0 last:pb-0 text-xs font-mono space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${
                          log.verdict === 'PASSED' || log.verdict === 'SUCCESS' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                        }`}>
                          {log.event}
                        </span>
                        <span className="text-[var(--text-primary)] font-semibold">{log.actorRole}</span>
                        <span className="text-[var(--text-muted)] text-[10px]">{log.clientHmac}</span>
                      </div>
                      <span className="text-[var(--text-muted)] text-[10px]">{log.time}</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] pl-1">{log.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
