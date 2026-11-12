// Dịch vụ tiện ích băm mã hóa một chiều cho dữ liệu cục bộ
export const sha256 = async (string) => {
  const utf8 = new TextEncoder().encode(string);
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Giới hạn tần suất thao tác giao diện người dùng
const uiAttemptTracker = {
  attempts: 0,
  lockedUntil: 0
};

export const checkUiRateLimit = () => {
  const now = Date.now();
  if (uiAttemptTracker.lockedUntil > now) {
    const sec = Math.ceil((uiAttemptTracker.lockedUntil - now) / 1000);
    return { allowed: false, message: `Vui lòng chờ ${sec} giây trước khi thao tác tiếp.` };
  }
  return { allowed: true };
};

export const recordUiFailedAttempt = () => {
  const now = Date.now();
  uiAttemptTracker.attempts += 1;
  if (uiAttemptTracker.attempts >= 5) {
    uiAttemptTracker.lockedUntil = now + 120 * 1000;
    uiAttemptTracker.attempts = 0;
    return { locked: true, message: 'Đã nhập sai 5 lần! Giao diện tạm khóa trong 2 phút.' };
  }
  return { locked: false, remaining: 5 - uiAttemptTracker.attempts };
};
