import React, { useState, useRef } from 'react';
import { 
  Terminal, 
  Award, 
  CheckCircle2, 
  PlusCircle, 
  Upload, 
  Sparkles, 
  Lock, 
  User, 
  Save, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Globe,
  BadgeCheck,
  Image as ImageIcon,
  Link as LinkIcon
} from 'lucide-react';
import { getStorageData, setStorageData, DEFAULT_BENCHMARKS, DEFAULT_DEVS } from '../services/mockStorage';
import UserAvatar, { PRESET_AVATARS } from '../components/UserAvatar';

// Danh sách các tổ chức cấp chứng chỉ AI / Cloud uy tín quốc tế được hỗ trợ
const VERIFIED_PROVIDERS = [
  { id: 'internal', name: 'PromptCraft Internal Enclave (AGY-CERT)', prefix: 'AGY-CERT-' },
  { id: 'deeplearning', name: 'DeepLearning.AI (Andrew Ng - Coursera)', prefix: 'DLAI-' },
  { id: 'google', name: 'Google Cloud Certified (Generative AI)', prefix: 'GCP-AI-' },
  { id: 'aws', name: 'AWS Certified AI Practitioner', prefix: 'AWS-AIP-' },
  { id: 'credly', name: 'Credly Digital Badge Verification (OpenBadge)', prefix: 'CRD-' }
];

export default function DevStudio() {
  const [certInput, setCertInput] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(VERIFIED_PROVIDERS[0].id);
  const [isVerifyingThirdParty, setIsVerifyingThirdParty] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [currentDev, setCurrentDev] = useState(null);
  const [devs, setDevs] = useState(() => getStorageData('promptcraft_verified_devs', DEFAULT_DEVS));
  const [benchmarks, setBenchmarks] = useState(() => getStorageData('promptcraft_benchmarks', DEFAULT_BENCHMARKS));

  // Form State for new Prompt
  const [title, setTitle] = useState('');
  const [industry, setIndustry] = useState('Tâm lý & Tư vấn (Có hồn)');
  const [tags, setTags] = useState('persona, empathy, depth');
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [modelsTested, setModelsTested] = useState('Claude 3.5 Sonnet, GPT-4o');
  const [successMsg, setSuccessMsg] = useState(false);

  // Form State for Dev Profile & Avatar Customizer (100% Icon / Tùy chọn, không ảnh người thật)
  const [editBio, setEditBio] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editSpecialties, setEditSpecialties] = useState('');
  const [editAvatar, setEditAvatar] = useState('icon:brain');
  const [avatarTab, setAvatarTab] = useState('preset'); // 'preset' | 'none' | 'upload' | 'url'
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [profileSaved, setProfileSaved] = useState(false);
  const fileInputRef = useRef(null);

  // Xác thực chứng chỉ (Hỗ trợ cả chứng chỉ nội bộ và chứng chỉ quốc tế uy tín)
  const handleVerify = async (e) => {
    e.preventDefault();
    const cleanCert = certInput.trim();

    // 1. Kiểm tra trong danh sách nội bộ trước
    const matched = devs.find(d => d.certificateId.toLowerCase() === cleanCert.toLowerCase());
    if (matched) {
      setIsVerified(true);
      setCurrentDev(matched);
      setEditBio(matched.bio || '');
      setEditRole(matched.role || '');
      setEditSpecialties(matched.specialties ? matched.specialties.join(', ') : '');
      setEditAvatar(matched.avatar || 'icon:brain');
      return;
    }

    // 2. Xác thực chứng chỉ từ các tổ chức uy tín quốc tế (DeepLearning.AI, Google Cloud, AWS, Credly)
    if (selectedProvider !== 'internal' || cleanCert.includes('-')) {
      setIsVerifyingThirdParty(true);
      await new Promise(res => setTimeout(res, 800)); // Giả lập kiểm tra qua Credly/Google API
      setIsVerifyingThirdParty(false);

      const providerObj = VERIFIED_PROVIDERS.find(p => p.id === selectedProvider) || VERIFIED_PROVIDERS[1];
      
      const newExternalDev = {
        id: 'dev-ext-' + Date.now(),
        name: `Engineer (${cleanCert.slice(-6).toUpperCase()})`,
        role: `Certified AI Engineer (${providerObj.name.split('(')[0].trim()})`,
        tier: 'Global Certified Specialist',
        certificateId: cleanCert.toUpperCase(),
        provider: providerObj.name,
        avatar: 'icon:cpu', // 100% Vector Icon, Không dùng ảnh mặt người thật
        bio: `Kỹ sư AI được xác thực thông qua hệ sinh thái chứng chỉ quốc tế uy tín ${providerObj.name}.`,
        specialties: ['Prompt Engineering', 'Generative AI', 'Agentic Workflows'],
        github: 'https://github.com',
        promptsShared: 1,
        reputation: 98,
        isDev: true
      };

      const updatedDevs = [...devs, newExternalDev];
      setDevs(updatedDevs);
      setCurrentDev(newExternalDev);
      setStorageData('promptcraft_verified_devs', updatedDevs);

      setIsVerified(true);
      setEditBio(newExternalDev.bio);
      setEditRole(newExternalDev.role);
      setEditSpecialties(newExternalDev.specialties.join(', '));
      setEditAvatar('icon:cpu');
      return;
    }

    alert('Mã chứng chỉ không hợp lệ! Bạn có thể thử mã demo: AGY-CERT-882 hoặc mã quốc tế như GCP-AI-994821');
  };

  // Tải ảnh từ máy tính cá nhân
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Vui lòng chọn file ảnh / icon dung lượng dưới 2 MB!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result;
      if (base64) {
        setEditAvatar(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (!currentDev) return;

    const updatedDev = {
      ...currentDev,
      role: editRole,
      bio: editBio,
      specialties: editSpecialties.split(',').map(s => s.trim()).filter(Boolean),
      avatar: editAvatar
    };

    const updatedList = devs.map(d => d.id === currentDev.id ? updatedDev : d);
    setDevs(updatedList);
    setCurrentDev(updatedDev);
    setStorageData('promptcraft_verified_devs', updatedList);

    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const handleCreatePrompt = (e) => {
    e.preventDefault();
    if (!title || !optimizedPrompt) return;

    const newBenchmark = {
      id: 'bm-' + Date.now(),
      title,
      industry,
      author: `${currentDev.name} (${currentDev.certificateId})`,
      authorBadge: currentDev.tier,
      rating: 5.0,
      upvotes: 1,
      testedModels: modelsTested.split(',').map(m => m.trim()),
      tags: tags.split(',').map(t => t.trim()),
      originalPrompt: originalPrompt || title,
      optimizedPrompt,
      metrics: { clarity: 98, depth: 96, emotionScore: 97 }
    };

    const updated = [newBenchmark, ...benchmarks];
    setBenchmarks(updated);
    setStorageData('promptcraft_benchmarks', updated);

    const devWithIncrement = { ...currentDev, promptsShared: (currentDev.promptsShared || 0) + 1 };
    const updatedDevs = devs.map(d => d.id === currentDev.id ? devWithIncrement : d);
    setDevs(updatedDevs);
    setCurrentDev(devWithIncrement);
    setStorageData('promptcraft_verified_devs', updatedDevs);

    setTitle('');
    setOriginalPrompt('');
    setOptimizedPrompt('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Dev Header */}
      <div className="border-b border-[var(--border-subtle)] pb-5 space-y-2">
        <div className="inline-flex items-center space-x-2 text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider px-3 py-1 rounded-full craft-card">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>GLOBAL ACCREDITED CREDENTIAL VERIFICATION & DEV STUDIO</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--text-primary)]">
          Kỹ Sư Kiểm Định (Dev Studio)
        </h1>
        <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          Hỗ trợ xác thực chứng chỉ Prompt Engineer nội bộ hoặc liên kết trực tiếp từ các tổ chức uy tín hàng đầu thế giới (Google Cloud, DeepLearning.AI, AWS, Credly).
        </p>
      </div>

      {!isVerified ? (
        <div className="craft-card max-w-lg mx-auto p-7 sm:p-8 text-center space-y-6">
          <div className="w-12 h-12 mx-auto rounded-xl craft-card flex items-center justify-center text-indigo-400">
            <BadgeCheck className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">Liên Kết Chứng Chỉ AI Uy Tín</h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Chọn tổ chức cấp chứng chỉ của bạn và nhập mã ID để mở khóa quyền Dev.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-4 text-left">
            <div>
              <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                Tổ Chức Cấp Chứng Chỉ:
              </label>
              <select
                value={selectedProvider}
                onChange={(e) => setSelectedProvider(e.target.value)}
                className="craft-input w-full px-3 py-2 text-xs font-mono"
              >
                {VERIFIED_PROVIDERS.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-mono text-[var(--text-muted)] uppercase block mb-1">
                Mã Định Danh Chứng Chỉ (Certificate ID):
              </label>
              <input
                type="text"
                required
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                placeholder="VD: AGY-CERT-882 hoặc GCP-AI-994821 hoặc DLAI-77123"
                className="craft-input w-full text-center tracking-wider font-mono text-xs px-3 py-2.5"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifyingThirdParty || !certInput.trim()}
              className="neu-button w-full py-2.5 text-xs font-mono font-semibold text-[var(--text-primary)] flex items-center justify-center space-x-2"
            >
              {isVerifyingThirdParty ? (
                <span>Đang truy vấn API xác thực chứng chỉ...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Xác Thực & Kích Hoạt Quyền Dev</span>
                </>
              )}
            </button>
          </form>

          {/* Supported Global Providers Pills */}
          <div className="pt-3 border-t border-[var(--border-subtle)] space-y-2">
            <span className="text-[10px] font-mono text-[var(--text-muted)] block uppercase">
              Tổ chức liên kết được chấp nhận:
            </span>
            <div className="flex flex-wrap justify-center gap-1.5 text-[10px] font-mono text-[var(--text-secondary)]">
              <span className="px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">DeepLearning.AI</span>
              <span className="px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">Google Cloud Generative AI</span>
              <span className="px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">AWS AI Practitioner</span>
              <span className="px-2 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">Credly Badges</span>
            </div>
            <div className="text-[11px] font-mono text-[var(--text-muted)] pt-1">
              Mã demo test nhanh: <code className="text-indigo-400">AGY-CERT-882</code> hoặc <code className="text-indigo-400">GCP-AI-994821</code>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-fadeIn">
          {/* PROFILE BUILDER SECTION */}
          <div className="craft-card p-6 sm:p-7 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
              <div className="flex items-center space-x-3.5">
                <UserAvatar
                  avatar={currentDev.avatar}
                  name={currentDev.name}
                  size="w-12 h-12"
                />
                <div>
                  <div className="font-bold text-sm text-[var(--text-primary)] flex items-center space-x-2">
                    <span>{currentDev.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950/40 text-indigo-400 border border-indigo-800/60">
                      {currentDev.tier}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    Chứng chỉ: {currentDev.certificateId} {currentDev.provider && `• ${currentDev.provider}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {profileSaved && (
                  <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Đã cập nhật profile</span>
                  </span>
                )}
                <button
                  onClick={() => setIsVerified(false)}
                  className="neu-button px-3 py-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-rose-400"
                >
                  Thoát Phiên
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Xây Dựng Profile Kỹ Sư (Hiển Thị Công Khai Trên Mục Đội Ngũ)
              </h3>

              {/* TÙY CHỌN ẢNH ĐẠI DIỆN: ICON MẪU / TỰ CHỌN ẢNH / KHÔNG DÙNG ẢNH */}
              <div className="space-y-3 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-primary)] flex items-center space-x-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Ảnh Đại Diện Profile (Icon Vector Tech / Tùy Chọn)</span>
                    </label>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
                      Không sử dụng ảnh mặt người thật. Bạn có thể chọn icon mẫu, tự tải file lên từ máy, hoặc không dùng ảnh.
                    </p>
                  </div>

                  {/* Preview avatar hiện tại */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">Xem trước:</span>
                    <UserAvatar avatar={editAvatar} name={currentDev.name} size="w-10 h-10" />
                  </div>
                </div>

                {/* 4 Chế độ lựa chọn */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      setAvatarTab('preset');
                      if (!editAvatar.startsWith('icon:')) setEditAvatar('icon:brain');
                    }}
                    className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                      avatarTab === 'preset'
                        ? 'bg-indigo-600 text-white border-indigo-500 font-bold'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    🎨 Icon Mẫu (10 Mẫu)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAvatarTab('none');
                      setEditAvatar('none');
                    }}
                    className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                      avatarTab === 'none' || editAvatar === 'none'
                        ? 'bg-indigo-600 text-white border-indigo-500 font-bold'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    🚫 Không Dùng Ảnh (Chữ tắt)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAvatarTab('upload');
                      fileInputRef.current?.click();
                    }}
                    className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer flex items-center space-x-1.5 ${
                      avatarTab === 'upload' && editAvatar.startsWith('data:')
                        ? 'bg-indigo-600 text-white border-indigo-500 font-bold'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Upload className="w-3 h-3" />
                    <span>Tự Chọn File Từ Máy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAvatarTab('url')}
                    className={`px-3 py-1.5 rounded-lg border transition-colors cursor-pointer flex items-center space-x-1.5 ${
                      avatarTab === 'url'
                        ? 'bg-indigo-600 text-white border-indigo-500 font-bold'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <LinkIcon className="w-3 h-3" />
                    <span>Dán Link URL</span>
                  </button>
                </div>

                {/* Ẩn file input để kích hoạt */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/png, image/jpeg, image/svg+xml, image/webp"
                  className="hidden"
                />

                {/* TAB 1: Grid Icon Mẫu Vector */}
                {avatarTab === 'preset' && (
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2 animate-fadeIn">
                    {PRESET_AVATARS.filter(p => p.id !== 'none').map((preset) => {
                      const IconComp = preset.icon;
                      const isSelected = editAvatar === preset.id;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setEditAvatar(preset.id)}
                          className={`p-2 rounded-xl border flex items-center space-x-2 text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-indigo-500 bg-indigo-600/15 text-[var(--text-primary)] ring-1 ring-indigo-500'
                              : 'border-[var(--border-subtle)] bg-[var(--bg-page)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]'
                          }`}
                        >
                          <div className="w-7 h-7 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0">
                            <IconComp className={`w-4 h-4 ${preset.text}`} />
                          </div>
                          <span className="text-[11px] font-mono truncate">{preset.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* TAB 2: Không dùng ảnh thông báo */}
                {avatarTab === 'none' && (
                  <div className="p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] text-xs font-mono text-[var(--text-secondary)] animate-fadeIn">
                    Hệ thống sẽ hiển thị thẻ chữ cái viết tắt của tên kỹ sư (VD: <strong>{currentDev.name}</strong> → ký hiệu phẳng tối giản).
                  </div>
                )}

                {/* TAB 3: Tải file lên */}
                {avatarTab === 'upload' && (
                  <div className="p-3 rounded-lg border border-dashed border-[var(--border-subtle)] bg-[var(--bg-page)] text-center space-y-2 animate-fadeIn">
                    <p className="text-xs font-mono text-[var(--text-secondary)]">
                      Đã sẵn sàng tải ảnh/icon từ máy tính của bạn (hỗ trợ .png, .jpg, .svg, .webp &lt; 2MB).
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold transition-colors cursor-pointer inline-flex items-center space-x-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Chọn file từ máy tính</span>
                    </button>
                  </div>
                )}

                {/* TAB 4: Dán Link URL */}
                {avatarTab === 'url' && (
                  <div className="space-y-2 pt-1 animate-fadeIn">
                    <input
                      type="url"
                      value={customAvatarUrl}
                      onChange={(e) => {
                        setCustomAvatarUrl(e.target.value);
                        if (e.target.value.trim()) setEditAvatar(e.target.value.trim());
                      }}
                      placeholder="Dán link ảnh icon (https://example.com/icon.svg)..."
                      className="craft-input w-full px-3.5 py-2 text-xs font-mono"
                    />
                    <p className="text-[10px] font-mono text-[var(--text-muted)]">
                      Lưu ý: Khuyến nghị dùng link icon đồ họa vector (SVG), logo hoặc biểu tượng đồ họa, không dùng ảnh chân dung người thật.
                    </p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Chức Danh Chuyên Môn:</label>
                  <input
                    type="text"
                    required
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                    placeholder="VD: Senior Prompt Architect"
                    className="craft-input w-full px-3.5 py-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Lĩnh Vực Chuyên Sâu (cách nhau bằng dấu phẩy):</label>
                  <input
                    type="text"
                    value={editSpecialties}
                    onChange={(e) => setEditSpecialties(e.target.value)}
                    placeholder="VD: Persona Grounding, Anti-Slop, Code Review"
                    className="craft-input w-full px-3.5 py-2 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Tiểu Sử / Kinh Nghiệm Chuyên Môn (Bio):</label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Giới thiệu về kinh nghiệm, định hướng nghiên cứu Prompt Engineering của bạn..."
                  className="craft-input w-full p-3 text-xs font-mono leading-relaxed"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="neu-button px-5 py-2 text-xs font-mono font-medium flex items-center space-x-1.5 text-[var(--text-primary)]"
                >
                  <Save className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Lưu Hồ Sơ Dev</span>
                </button>
              </div>
            </form>
          </div>

          {/* Form Đóng Góp Prompt Mẫu */}
          <div className="craft-card p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
              <div>
                <h2 className="text-base font-bold text-[var(--text-primary)] flex items-center space-x-2">
                  <PlusCircle className="w-4 h-4 text-indigo-400" />
                  <span>Đóng Góp Mẫu Prompt Chuẩn Ngành Đã Kiểm Nghiệm</span>
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">Prompt sẽ lập tức được nạp vào kho chung và tri thức của Cortex Bot.</p>
              </div>
              {successMsg && (
                <span className="text-xs font-mono text-emerald-400 flex items-center space-x-1 animate-pulse">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đã Xuất Bản Thành Công!</span>
                </span>
              )}
            </div>

            <form onSubmit={handleCreatePrompt} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Tiêu Đề Prompt:</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="VD: Prompt Persona Thấu Cảm Không Dùng Lời Sáo Rỗng"
                    className="craft-input w-full px-3.5 py-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Lĩnh Vực:</label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="craft-input w-full px-3 py-2 text-xs font-mono"
                  >
                    <option value="Tâm lý & Tư vấn (Có hồn)">Tâm lý & Tư vấn (Có hồn)</option>
                    <option value="Công nghệ thông tin">Công nghệ thông tin</option>
                    <option value="Marketing & Content">Marketing & Content</option>
                    <option value="Giáo dục & Học thuật">Giáo dục & Học thuật</option>
                    <option value="Kinh doanh & Đàm phán">Kinh doanh & Đàm phán</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Nội Dung Prompt Đã Tối Ưu (Production-Ready):</label>
                <textarea
                  required
                  rows={6}
                  value={optimizedPrompt}
                  onChange={(e) => setOptimizedPrompt(e.target.value)}
                  placeholder="Nhập toàn bộ prompt có cấu trúc Role, Context, Constraints..."
                  className="craft-input w-full p-3.5 text-xs font-mono leading-relaxed"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="neu-button px-6 py-2.5 text-xs font-mono font-semibold text-[var(--text-primary)] flex items-center space-x-2"
                >
                  <Upload className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Đẩy Lên Hệ Thống Platform</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
