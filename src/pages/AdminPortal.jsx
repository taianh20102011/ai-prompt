import React, { useState, useEffect } from 'react';
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
  Award
} from 'lucide-react';
import { 
  getStorageData, 
  setStorageData, 
  DEFAULT_ADMIN_CONFIG, 
  DEFAULT_BENCHMARKS, 
  DEFAULT_DEVS 
} from '../services/mockStorage';
import UserAvatar from '../components/UserAvatar';
import { authClient } from '../services/authClient';

export default function AdminPortal() {
  const [secretInput, setSecretInput] = useState('');
  const [session, setSession] = useState({ authenticated: false, role: null });
  const [activeTab, setActiveTab] = useState('training'); // 'training' | 'licenses' | 'benchmarks' | 'devs' | 'audit'
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

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

  const [newDevName, setNewDevName] = useState('');
  const [newDevCert, setNewDevCert] = useState('');
  const [saveToast, setSaveToast] = useState(false);

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
            <div className="craft-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    <span>Quản Lý & Kiểm Duyệt Kho Prompt Mẫu Chuẩn Ngành</span>
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    Admin có quyền rà soát, giữ lại các prompt xuất sắc và gỡ bỏ các prompt kém chất lượng.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-[var(--border-subtle)]">
                {benchmarks.map((bm) => (
                  <div key={bm.id} className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
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

                    <button
                      onClick={() => handleDeleteBenchmark(bm.id)}
                      className="px-3 py-1.5 rounded-lg border border-rose-900/40 hover:bg-rose-950/20 text-rose-400 text-xs font-mono flex items-center space-x-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa Khỏi Kho</span>
                    </button>
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

          {/* TAB 4: SECURITY AUDIT LOG (CHỈ DÀNH RIÊNG CHO OWNER) */}
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
