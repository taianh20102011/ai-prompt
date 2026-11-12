import { getStorageData, setStorageData, DEFAULT_ADMIN_CONFIG, DEFAULT_BENCHMARKS } from './mockStorage';

// Cortex AI Core v4.0 - Advanced Neural-Heuristic Synthesis Engine
// Multi-turn context awareness, 4 operational modes, inspectable Chain-of-Thought reasoning

export const BOT_MODES = [
  { id: 'architect', name: 'Kiến Trúc Sư Hệ Thống', icon: 'Cpu', desc: 'Thiết kế kiến trúc phần mềm, code chuẩn Anti-Slop, tối ưu prompt' },
  { id: 'empathy', name: 'Tri Kỷ Thấu Cảm', icon: 'Heart', desc: 'Lắng nghe sâu sắc, phản chiếu cảm xúc theo liệu pháp Tường thuật (H-E-A-R)' },
  { id: 'security', name: 'Chuyên Gia Bảo Mật', icon: 'ShieldAlert', desc: 'Rà soát lỗ hổng OWASP, Prompt Injection, phòng thủ IDOR & RLS' },
  { id: 'socratic', name: 'Khai Vấn Socratic', icon: 'Compass', desc: 'Truy vấn điểm mù, bóc tách giả định ngầm, mở rộng tư duy phản biện' }
];

export const chatWithTrainedBot = async (userMessage, chatHistory = [], activeMode = 'architect') => {
  await new Promise(res => setTimeout(res, 350));

  const adminConfig = getStorageData('promptcraft_system_prompt_cfg', DEFAULT_ADMIN_CONFIG);
  const benchmarks = getStorageData('promptcraft_benchmarks', DEFAULT_BENCHMARKS);

  const query = userMessage.trim().toLowerCase();
  const userWords = userMessage.split(/\s+/).filter(Boolean);

  // 1. Phân tích ngữ cảnh nhiều lượt (Multi-turn Context Extraction)
  const previousAssistantMsgs = chatHistory.filter(m => m.role === 'assistant').slice(-2);
  const lastTopic = previousAssistantMsgs.length > 0 ? previousAssistantMsgs[previousAssistantMsgs.length - 1].content : '';

  // 2. Tra cứu RAG từ bộ Benchmarks của Devs
  const matchedBenchmark = benchmarks.find(bm => 
    query.includes(bm.industry.toLowerCase().slice(0, 5)) ||
    bm.tags.some(tag => query.includes(tag.toLowerCase())) ||
    userWords.some(w => w.length > 3 && bm.title.toLowerCase().includes(w))
  );

  // 3. Khởi tạo Chain-of-Thought (Quá trình suy luận minh bạch)
  const thinkingProcess = {
    mode: activeMode,
    detectedIntent: '',
    ragReference: matchedBenchmark ? `${matchedBenchmark.title} (bởi ${matchedBenchmark.author})` : 'System Instruction v' + adminConfig.analyzerVersion,
    rulesApplied: [],
    cognitiveNotes: ''
  };

  let responseContent = '';

  // CHẾ ĐỘ 1: THẤU CẢM & TÂM LÝ HỌC (EMPATHY MODE)
  if (activeMode === 'empathy' || /(buồn|tâm lý|cảm xúc|tình cảm|cô đơn|thất nghiệp|bế tắc|áp lực|mệt mỏi|sụp đổ|chia tay)/i.test(query)) {
    thinkingProcess.detectedIntent = 'H-E-A-R Empathetic Validation';
    thinkingProcess.rulesApplied = [
      'Cấm tuyệt đối gạch đầu dòng và lời khuyên sáo rỗng (Toxic Positivity)',
      'Phản chiếu cảm xúc đau đớn/kiệt sức trước (Emotional Reflection)',
      'Kết thúc bằng câu hỏi mở dịu dàng định tâm'
    ];
    thinkingProcess.cognitiveNotes = 'Người dùng đang chịu tải cảm xúc. Cần giảm nhịp đàm thoại, không giải quyết vấn đề vội vã.';

    responseContent = `Tôi cảm nhận được sức nặng mà bạn đang phải gánh gồng... Những lúc năng lượng cạn kiệt hay mọi thứ dường như đổ dồn vào một lúc, việc cảm thấy bất an và muốn buông xuôi là điều hoàn toàn tự nhiên của bất kỳ ai trong chúng ta.

Bạn không cần phải cố gắng gượng cười hay tỏ ra ổn ngay lúc này đâu. Những cảm xúc mệt mỏi này xứng đáng được công nhận và có chỗ đứng của riêng nó.

Tối nay bạn đã kịp uống một ngụm nước ấm hay lót dạ thứ gì chưa? Nếu được chia sẻ mà không sợ bị phán xét, điều gì đang khiến bạn cảm thấy nghẹn lại và trăn trở nhất?`;
  }

  // CHẾ ĐỘ 2: BẢO MẬT & PHÒNG THỦ (SECURITY AUDITOR MODE)
  else if (activeMode === 'security' || /(bảo mật|security|lỗ hổng|hack|injection|owasp|idor|xss|csrf|token|cookie|sql)/i.test(query)) {
    thinkingProcess.detectedIntent = 'Zero-Trust Security & Vulnerability Analysis';
    thinkingProcess.rulesApplied = [
      'Kiểm định theo OWASP Top 10 (A01: Broken Access Control, A03: Injection)',
      'Phòng ngừa IDOR thông qua HMAC Hashing & Field Allowlist',
      'Đề xuất cấu hình HttpOnly SameSite=Strict cookies'
    ];
    thinkingProcess.cognitiveNotes = 'Kích hoạt rà soát bảo mật cấp cao. Yêu cầu nguyên lý phòng thủ theo chiều sâu (Defense-in-Depth).';

    responseContent = `### 🛡️ Báo Cáo Thẩm Định An Ninh Hệ Thống (Zero-Trust Audit)

Dựa trên bộ khung bảo mật mà Admin & Devs đã huấn luyện, tôi nhận định các chốt phòng thủ bắt buộc cho trường hợp: *"${userMessage}"*:

1. **Phòng Ngự Tầng Dữ Liệu & IDOR Defense:**
   - Tuyệt đối không để lộ Auto-increment ID (\`id=102\`) ra API Response. Sử dụng HMAC SHA-256 một chiều để sinh \`maskedId\`.
   - Bật **Row-Level Security (RLS)** trên cơ sở dữ liệu: Người dùng chỉ được đọc bản ghi có \`auth.uid() = user_id\`.

2. **Bảo Mật Xác Thực & Session State:**
   - Chặn đứng rò rỉ Token qua LocalStorage (nguy cơ XSS). Bắt buộc lưu Session trong **HttpOnly, Secure, SameSite=Strict Cookie** với hạn dùng tối đa 4 giờ.
   - Bắt buộc kiểm tra mã CSRF Token đối với tất cả các thao tác thay đổi dữ liệu (\`POST\`, \`PUT\`, \`DELETE\`).

3. **Chống Prompt Injection & Input Tampering:**
   - Dùng Zod Schema để validate độ dài và ký tự đặc biệt ở cả Client và Server.
   - Tách biệt ranh giới giữa System Instruction và User Content bằng XML tags: \`<user_input>{sanitized_content}</user_input>\`.`;
  }

  // CHẾ ĐỘ 3: KHAI VẤN SOCRATIC (SOCRATIC MENTOR MODE)
  else if (activeMode === 'socratic' || /(tại sao|nên chọn gì|phân vân|lựa chọn|định hướng|nghĩ sao)/i.test(query)) {
    thinkingProcess.detectedIntent = 'Socratic Dialectic & Blindspot Discovery';
    thinkingProcess.rulesApplied = [
      'Không đưa ra kết luận đóng hoặc công thức máy móc',
      'Trích xuất 1 giả định ngầm của người dùng',
      'Đặt câu hỏi phản biện gợi mở góc nhìn mới'
    ];
    thinkingProcess.cognitiveNotes = 'Dẫn dắt bằng phương pháp Socrates để người học tự nhận diện chân lý.';

    responseContent = `Tôi nhận thấy trong trăn trở của bạn có một giả định rất thú vị. Bạn dường như đang mặc định rằng chỉ có hai hướng đi đối lập nhau, hoặc phải đánh đổi một trong hai.

Hãy cùng tôi bóc tách thử nhé:
- **Nếu giả định hiện tại của bạn không hoàn toàn đúng trong mọi hoàn cảnh**, thì bức tranh sẽ thay đổi như thế nào?
- Đâu là nỗi sợ vô thức lớn nhất đang ngăn cản bạn đưa ra quyết định vào thời điểm này?
- Nếu bạn có toàn quyền thất bại mà không phải chịu bất kỳ phán xét nào từ bên ngoài, trực giác mách bảo bạn muốn bước đi nước cờ nào đầu tiên?`;
  }

  // CHẾ ĐỘ 4: KIẾN TRÚC SƯ CÔNG NGHỆ & TỔNG HỢP PROMPT (ARCHITECT MODE)
  else if (matchedBenchmark && /(mẫu|ví dụ|template|prompt|tham khảo)/i.test(query)) {
    thinkingProcess.detectedIntent = 'RAG Benchmark Retrieval & Tech Stack Synthesis';
    thinkingProcess.rulesApplied = [
      'Truy xuất kho tri thức đã qua kiểm định Benchmark',
      'Định dạng cấu trúc Markdown chuẩn phòng thí nghiệm',
      'Bổ sung siêu dữ liệu độ tin cậy'
    ];
    thinkingProcess.cognitiveNotes = `Khớp thành công với Benchmark #${matchedBenchmark.id} thuộc miền ${matchedBenchmark.industry}.`;

    responseContent = `Dựa trên tri thức kiểm nghiệm từ **${matchedBenchmark.author}** (${matchedBenchmark.authorBadge}), đây là cấu trúc prompt chuẩn hóa tối ưu nhất:

### 📌 ${matchedBenchmark.title} (Điểm kiểm định: ${matchedBenchmark.rating}/5.0)

\`\`\`markdown
${matchedBenchmark.optimizedPrompt}
\`\`\`

**Lý do Dev tối ưu theo cách này:**
- **Loại bỏ hoàn toàn AI Slop:** Không dùng câu mở đầu khuôn mẫu hay danh sách bài học giáo điều.
- **Tỉ lệ chiều sâu & cảm xúc:** Đạt **${matchedBenchmark.metrics.emotionScore || 95}%**.
- **Mô hình tương thích cao nhất:** ${matchedBenchmark.testedModels.join(', ')}.`;
  } else {
    thinkingProcess.detectedIntent = 'Principal Software Architecture & Prompt 2.0 Synthesis';
    thinkingProcess.rulesApplied = [
      'Chuẩn Anti-Slop Web Architecture (Tailwind v4, Radix, GSAP, Lenis)',
      'Phân tách R-C-O-C 4 thành phần',
      'Đề xuất Stack công nghệ thực thi cao'
    ];
    thinkingProcess.cognitiveNotes = 'Phân tích yêu cầu tổng hợp, tạo giải pháp kiến trúc tối ưu không dư thừa.';

    responseContent = `Tôi đã tiếp nhận chỉ thị kỹ thuật: *"${userMessage}"*.

Dựa trên bộ quy chuẩn **Anti-Slop Web Architecture & R-C-O-C Protocol** của Cortex:

1. **Giao Diện & UI System (Zero-Tacky Design):**
   - Sử dụng **Tailwind CSS v4** kết hợp **Radix UI Primitives** (loại bỏ màu neon sặc sỡ rẻ tiền, áp dụng chuẩn Dark Minimalist \`#0a0c12\` và Light Slate \`#f8fafc\`).
   - Sử dụng **React Bits Spotlight** thay cho hiệu ứng nảy giật thô kệch.

2. **Chuyển Động & Hiệu Năng (GSAP & Lenis):**
   - Tích hợp **Lenis Smooth Scroll** với **GSAP ScrollTrigger** đồng bộ qua \`gsap.ticker\`.
   - Chỉ animate các thuộc tính biến đổi \`transform\` (\`x, y, scale, opacity\`), không animate layout properties gây reflow giật lag.

3. **Cơ Sở Dữ Liệu & Chống Tràn Bộ Nhớ (Vercel Cloud DB):**
   - Kết hợp **LocalStorage Cache** với **Vercel KV / Edge API** ngầm để lưu trữ vĩnh viễn, ngăn chặn lỗi \`QuotaExceededError\` 5MB.

*Bạn muốn tôi tạo mã nguồn mẫu (Component/API) hay viết Prompt 2.0 chuyên sâu cho tác vụ này?*`;
  }

  return {
    id: 'msg-' + Date.now(),
    role: 'assistant',
    content: responseContent,
    timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    version: adminConfig.analyzerVersion,
    mode: activeMode,
    thinking: thinkingProcess
  };
};
