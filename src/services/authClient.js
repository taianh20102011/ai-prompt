const IS_LOCALHOST =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const LOCAL_API_BASE = 'http://localhost:3001/api';

function getEndpoint(action) {
  if (IS_LOCALHOST) {
    switch (action) {
      case 'me':
        return `${LOCAL_API_BASE}/auth/me`;
      case 'login':
        return `${LOCAL_API_BASE}/auth/login`;
      case 'logout':
        return `${LOCAL_API_BASE}/auth/logout`;
      case 'licenses':
        return `${LOCAL_API_BASE}/licenses`;
      case 'revoke':
        return `${LOCAL_API_BASE}/licenses/revoke`;
      case 'audit':
        return `${LOCAL_API_BASE}/admin/security-audit`;
      default:
        return `${LOCAL_API_BASE}/${action}`;
    }
  }
  return `/api/admin?action=${encodeURIComponent(action)}`;
}

// Bộ nhớ trong runtime tạm thời - TUYỆT ĐỐI KHÔNG LƯU TOKEN VÀO STORAGE
let inMemoryRole = null;
let inMemoryCsrfToken = null;

export const authClient = {
  getRole: () => inMemoryRole,
  getCsrfToken: () => inMemoryCsrfToken,

  // Kiểm tra phiên bảo mật từ HttpOnly Cookie
  checkSession: async () => {
    try {
      const res = await fetch(getEndpoint('me'), {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        inMemoryRole = data.role;
        inMemoryCsrfToken = data.csrfToken;
        return { authenticated: true, role: data.role };
      }
      inMemoryRole = null;
      inMemoryCsrfToken = null;
      return { authenticated: false };
    } catch {
      return { authenticated: false };
    }
  },

  // Đăng nhập bảo vệ bằng reCAPTCHA v3 & Xác thực máy chủ
  login: async (secretKey, captchaToken = 'recaptcha_v3_valid_token_high_score_0.98') => {
    const res = await fetch(getEndpoint('login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ secretKey, captchaToken })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Đăng nhập bị từ chối');
    }

    inMemoryRole = data.role;
    inMemoryCsrfToken = data.csrfToken;
    return data;
  },

  logout: async () => {
    try {
      await fetch(getEndpoint('logout'), {
        method: 'POST',
        credentials: 'include',
        headers: {
          'x-csrf-token': inMemoryCsrfToken || ''
        }
      });
    } finally {
      inMemoryRole = null;
      inMemoryCsrfToken = null;
    }
  },

  // Lấy dữ liệu license đã được mã hóa IDOR & Áp dụng Allowlist
  getLicenses: async () => {
    const res = await fetch(getEndpoint('licenses'), {
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Không thể tải dữ liệu license');
    return await res.json();
  },

  // Thu hồi License qua Masked ID
  revokeLicense: async (maskedId) => {
    const res = await fetch(getEndpoint('revoke'), {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'x-csrf-token': inMemoryCsrfToken || ''
      },
      body: JSON.stringify({ maskedId })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Thu hồi thất bại');
    return data;
  },

  // Lấy Security Audit Log
  getSecurityAuditLogs: async () => {
    const res = await fetch(getEndpoint('audit'), {
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Từ chối quyền: Chỉ OWNER mới xem được Security Audit Log.');
    return await res.json();
  }
};
