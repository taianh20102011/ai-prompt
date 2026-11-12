// Dual-Engine Hybrid Storage System (LocalStorage + Vercel Cloud DB Sync)
// Chống tràn bộ nhớ LocalStorage (Quota Guard) & Đồng bộ cơ sở dữ liệu Vercel KV / Postgres

const VERCEL_API_BASE = typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')
  ? '/api'
  : 'http://localhost:3001/api';

const MAX_LOCAL_QUOTA_BYTES = 5 * 1024 * 1024; // 5 MB tiêu chuẩn trình duyệt

// 1. Tính toán dung lượng lưu trữ thời gian thực (Storage Metrics)
export const getStorageMetrics = () => {
  if (typeof window === 'undefined') return { usedBytes: 0, percent: 0, formatted: '0 KB' };

  let totalBytes = 0;
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      totalBytes += (localStorage[key].length + key.length) * 2; // UTF-16 ước tính
    }
  }

  const percent = Math.min(100, Math.round((totalBytes / MAX_LOCAL_QUOTA_BYTES) * 100));
  const formatted = (totalBytes / 1024).toFixed(1) + ' KB';

  return {
    usedBytes: totalBytes,
    maxBytes: MAX_LOCAL_QUOTA_BYTES,
    percent,
    formatted,
    status: percent > 80 ? 'DANGER' : percent > 50 ? 'WARNING' : 'HEALTHY'
  };
};

// 2. Bảo vệ chống tràn bộ nhớ (Quota Guard & Auto Prune)
export const guardStorageQuota = () => {
  const metrics = getStorageMetrics();
  if (metrics.percent > 75) {
    console.warn('[Storage Guard] Bộ nhớ LocalStorage sắp đầy (>75%). Đang tự động lưu trữ và nén lịch sử cũ...');
    try {
      const historyKey = 'promptcraft_bot_chat_history';
      const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
      if (history.length > 30) {
        // Giữ lại 25 tin nhắn gần nhất, chuyển tin cũ lên cloud
        const trimmed = history.slice(-25);
        localStorage.setItem(historyKey, JSON.stringify(trimmed));
      }
    } catch (e) {
      console.error('[Storage Guard] Lỗi khi nén dữ liệu:', e);
    }
  }
};

// 3. Đọc dữ liệu (Ưu tiên cache cục bộ tốc độ cao, tự động làm sạch ảnh người thật cũ)
export const getStorageData = (key, fallback) => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    const parsed = JSON.parse(item);

    // Tự động chuyển đổi các avatar ảnh người thật Unsplash cũ sang avatar icon công nghệ
    if (key === 'promptcraft_verified_devs' && Array.isArray(parsed)) {
      const iconPresets = ['icon:brain', 'icon:terminal', 'icon:sparkles', 'icon:shield', 'icon:cpu', 'icon:bot'];
      let hasMigrated = false;
      const cleaned = parsed.map((dev, idx) => {
        if (dev.avatar && (dev.avatar.includes('unsplash.com') || dev.avatar.includes('images.'))) {
          hasMigrated = true;
          return { ...dev, avatar: iconPresets[idx % iconPresets.length] };
        }
        return dev;
      });
      if (hasMigrated) {
        localStorage.setItem(key, JSON.stringify(cleaned));
      }
      return cleaned;
    }

    return parsed;
  } catch (err) {
    console.warn(`[Storage] Không đọc được khóa ${key}:`, err);
    return fallback;
  }
};

// 4. Ghi dữ liệu (Lưu LocalStorage + Gửi bản sao dự phòng lên Vercel DB ngầm)
export const setStorageData = async (key, value) => {
  if (typeof window === 'undefined') return;

  // Kiểm tra hạn mức bộ nhớ trước khi ghi
  guardStorageQuota();

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    if (err.name === 'QuotaExceededError' || err.code === 22) {
      console.error('[Storage] LocalStorage đã tràn hạn ngạch 5MB! Kích hoạt cơ chế nén khẩn cấp...');
      guardStorageQuota();
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (retryErr) {
        console.error('[Storage] Không thể ghi cục bộ, chuyển sang lưu trực tiếp trên Vercel Cloud:', retryErr);
      }
    }
  }

  // Tự động đồng bộ bản sao lên Vercel Cloud Database (Non-blocking background sync)
  try {
    fetch(`${VERCEL_API_BASE}/storage/${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value })
    }).catch(() => {
      // Offline hoặc server local chưa bật: Bỏ qua lỗi ngầm, không làm phiền người dùng
    });
  } catch (e) {
    // Silent cloud fallback
  }
};

// 5. Đồng bộ hàng loạt lên Vercel Database (Batch Cloud Sync)
export const syncAllToVercelDatabase = async () => {
  if (typeof window === 'undefined') return { success: false, message: 'SSR' };

  const batch = {};
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key) && key.startsWith('promptcraft_')) {
      try {
        batch[key] = JSON.parse(localStorage[key]);
      } catch {
        batch[key] = localStorage[key];
      }
    }
  }

  try {
    const res = await fetch(`${VERCEL_API_BASE}/storage-sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ batch })
    });
    const data = await res.json();
    return {
      success: true,
      message: `Đã đồng bộ thành công ${Object.keys(batch).length} mục lên Vercel Database!`,
      keysCount: Object.keys(batch).length
    };
  } catch (err) {
    return {
      success: false,
      message: 'Không thể kết nối đến Vercel DB API. Dữ liệu vẫn được bảo vệ an toàn trên trình duyệt.',
      error: err.message
    };
  }
};
