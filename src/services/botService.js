import { getStorageData, setStorageData, DEFAULT_ADMIN_CONFIG, DEFAULT_BENCHMARKS } from './mockStorage';

// Cortex AI Core v4.0 - Advanced Neural-Heuristic Synthesis Engine
// Multi-turn context awareness, 4 operational modes, inspectable Chain-of-Thought reasoning

export const BOT_MODES = [
  {
    id: 'architect',
    name: 'Cố vấn Kỹ thuật & Code',
    nameEn: 'Tech & Code Advisor',
    icon: 'Cpu',
    desc: 'Giải thích dễ hiểu, thiết kế web/app và tối ưu câu lệnh',
    descEn: 'Clear explanations, web/app design & prompt optimization'
  },
  {
    id: 'empathy',
    name: 'Người bạn Lắng nghe',
    nameEn: 'Listening Companion',
    icon: 'Heart',
    desc: 'Trò chuyện chân thành, chia sẻ áp lực và gỡ rối cảm xúc',
    descEn: 'Warm, sincere conversation to share stress & unwind'
  },
  {
    id: 'security',
    name: 'Cố vấn Bảo mật',
    nameEn: 'Security Advisor',
    icon: 'ShieldAlert',
    desc: 'Kiểm tra an toàn hệ thống và bảo vệ dữ liệu',
    descEn: 'System safety checks and user data protection'
  },
  {
    id: 'socratic',
    name: 'Người bạn Gợi mở',
    nameEn: 'Thought Partner',
    icon: 'Compass',
    desc: 'Đặt câu hỏi giúp bạn tự nhìn rõ vấn đề và hướng đi',
    descEn: 'Guiding questions to help you see problems clearly'
  }
];

export const chatWithTrainedBot = async (userMessage, chatHistory = [], activeMode = 'architect', lang = 'vi') => {
  await new Promise(res => setTimeout(res, 350));

  const isEn = lang !== 'vi';
  const adminConfig = getStorageData('promptcraft_system_prompt_cfg', DEFAULT_ADMIN_CONFIG);
  const benchmarks = getStorageData('promptcraft_benchmarks', DEFAULT_BENCHMARKS);

  const query = userMessage.trim().toLowerCase();
  const userWords = userMessage.split(/\s+/).filter(Boolean);

  // 1. Phân tích ngữ cảnh nhiều lượt (Multi-turn Context Extraction)
  const previousAssistantMsgs = chatHistory.filter(m => m.role === 'assistant').slice(-2);
  const lastTopic = previousAssistantMsgs.length > 0 ? previousAssistantMsgs[previousAssistantMsgs.length - 1].content : '';

  // 2. Tra cứu RAG từ bộ Benchmarks của Devs
  const matchedBenchmarkRaw = benchmarks.find(bm => 
    query.includes(bm.industry.toLowerCase().slice(0, 5)) ||
    bm.tags.some(tag => query.includes(tag.toLowerCase())) ||
    userWords.some(w => w.length > 3 && bm.title.toLowerCase().includes(w))
  );
  const matchedBenchmark = matchedBenchmarkRaw
    ? {
        ...matchedBenchmarkRaw,
        title: isEn ? (matchedBenchmarkRaw.titleEn || matchedBenchmarkRaw.title) : matchedBenchmarkRaw.title,
        industry: isEn ? (matchedBenchmarkRaw.industryEn || matchedBenchmarkRaw.industry) : matchedBenchmarkRaw.industry,
        optimizedPrompt: isEn ? (matchedBenchmarkRaw.optimizedPromptEn || matchedBenchmarkRaw.optimizedPrompt) : matchedBenchmarkRaw.optimizedPrompt,
      }
    : null;

  // 3. Khởi tạo Chain-of-Thought (Quá trình suy luận minh bạch)
  const thinkingProcess = {
    mode: activeMode,
    detectedIntent: '',
    ragReference: matchedBenchmark
      ? `${matchedBenchmark.title} (${isEn ? 'by' : 'bởi'} ${matchedBenchmark.author})`
      : 'System Instruction v' + adminConfig.analyzerVersion,
    rulesApplied: [],
    cognitiveNotes: ''
  };

  let responseContent = '';

  // CHẾ ĐỘ 1: THẤU CẢM & TÂM LÝ HỌC (EMPATHY MODE)
  if (activeMode === 'empathy' || /(buồn|tâm lý|cảm xúc|tình cảm|cô đơn|thất nghiệp|bế tắc|áp lực|mệt mỏi|sụp đổ|chia tay|sad|lost|laid off|stress|overwhelmed|lonely)/i.test(query)) {
    thinkingProcess.detectedIntent = 'H-E-A-R Empathetic Validation';
    thinkingProcess.rulesApplied = isEn
      ? [
          'Strictly avoid bullet points and toxic positivity cliches',
          'Reflect emotional weight first before offering fixes',
          'End with a gentle, unhurried open question'
        ]
      : [
          'Cấm tuyệt đối gạch đầu dòng và lời khuyên sáo rỗng (Toxic Positivity)',
          'Phản chiếu cảm xúc đau đớn/kiệt sức trước (Emotional Reflection)',
          'Kết thúc bằng câu hỏi mở dịu dàng định tâm'
        ];
    thinkingProcess.cognitiveNotes = isEn
      ? 'User is carrying emotional weight. Slow down conversational pace and listen first.'
      : 'Người dùng đang chịu tải cảm xúc. Cần giảm nhịp đàm thoại, không giải quyết vấn đề vội vã.';

    responseContent = isEn
      ? `I can hear how heavy everything feels right now... When energy runs low and everything piles up at once, feeling exhausted or wanting to shut down is a completely human response.

You don't have to force a smile or rush to figure everything out tonight. What you're carrying deserves space to be heard honestly.

Have you had a chance to get a glass of water or take a quiet breath today? If you feel comfortable sharing without judgment, what part of this has been weighing on you the most?`
      : `Tôi cảm nhận được sức nặng mà bạn đang phải gánh gồng... Những lúc năng lượng cạn kiệt hay mọi thứ dường như đổ dồn vào một lúc, việc cảm thấy bất an và muốn buông xuôi là điều hoàn toàn tự nhiên của bất kỳ ai trong chúng ta.

Bạn không cần phải cố gắng gượng cười hay tỏ ra ổn ngay lúc này đâu. Những cảm xúc mệt mỏi này xứng đáng được công nhận và có chỗ đứng của riêng nó.

Tối nay bạn đã kịp uống một ngụm nước ấm hay lót dạ thứ gì chưa? Nếu được chia sẻ mà không sợ bị phán xét, điều gì đang khiến bạn cảm thấy nghẹn lại và trăn trở nhất?`;
  }

  // CHẾ ĐỘ 2: BẢO MẬT & PHÒNG THỦ (SECURITY AUDITOR MODE)
  else if (activeMode === 'security' || /(bảo mật|security|lỗ hổng|hack|injection|owasp|idor|xss|csrf|token|cookie|sql|safe|data)/i.test(query)) {
    thinkingProcess.detectedIntent = 'Zero-Trust Security & Vulnerability Analysis';
    thinkingProcess.rulesApplied = isEn
      ? [
          'Check against OWASP Top 10 (A01 Broken Access Control, A03 Injection)',
          'Prevent IDOR via HMAC hashing & explicit field allowlists',
          'Recommend HttpOnly, Secure, SameSite=Strict session cookies'
        ]
      : [
          'Kiểm định theo OWASP Top 10 (A01: Broken Access Control, A03: Injection)',
          'Phòng ngừa IDOR thông qua HMAC Hashing & Field Allowlist',
          'Đề xuất cấu hình HttpOnly SameSite=Strict cookies'
        ];
    thinkingProcess.cognitiveNotes = isEn
      ? 'Security audit active. Enforcing defense-in-depth principles.'
      : 'Kích hoạt rà soát bảo mật cấp cao. Yêu cầu nguyên lý phòng thủ theo chiều sâu (Defense-in-Depth).';

    responseContent = isEn
      ? `### 🛡️ Security & Data Protection Review (Zero-Trust Audit)

Based on the security baseline for *"${userMessage}"*, here are the key safeguards to put in place:

1. **Data Access & IDOR Prevention:**
   - Never expose sequential database IDs (\`id=102\`) without ownership verification. Mask identifiers or validate permissions server-side on every request.
   - Enable **Row-Level Security (RLS)** so users can only access records where \`auth.uid() = user_id\`.

2. **Authentication & Session Hygiene:**
   - Avoid storing sensitive JWT/session tokens in \`localStorage\` (XSS risk). Prefer **HttpOnly, Secure, SameSite=Strict** cookies with short lifetimes.
   - Enforce CSRF protection on all state-changing routes (\`POST\`, \`PUT\`, \`DELETE\`).

3. **Prompt Injection & Input Validation:**
   - Validate input length and types on both client and server (e.g., Zod schemas).
   - Isolate untrusted user text inside clear boundary delimiters such as \`<user_input>{sanitized_content}</user_input>\`.`
      : `### 🛡️ Báo Cáo Thẩm Định An Ninh Hệ Thống (Zero-Trust Audit)

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
  else if (activeMode === 'socratic' || /(tại sao|nên chọn gì|phân vân|lựa chọn|định hướng|nghĩ sao|should i|career|project|startup)/i.test(query)) {
    thinkingProcess.detectedIntent = 'Socratic Dialectic & Blindspot Discovery';
    thinkingProcess.rulesApplied = isEn
      ? [
          'Avoid giving a rushed yes/no prescription',
          'Surface one hidden assumption in the question',
          'Ask clear reflective questions to broaden perspective'
        ]
      : [
          'Không đưa ra kết luận đóng hoặc công thức máy móc',
          'Trích xuất 1 giả định ngầm của người dùng',
          'Đặt câu hỏi phản biện gợi mở góc nhìn mới'
        ];
    thinkingProcess.cognitiveNotes = isEn
      ? 'Using Socratic questioning so the user clarifies their own priorities.'
      : 'Dẫn dắt bằng phương pháp Socrates để người học tự nhận diện chân lý.';

    responseContent = isEn
      ? `There is an interesting hidden assumption in your question—it sounds like you're treating this as an all-or-nothing choice between two fixed paths.

Let's examine it together:
- **If that constraint weren't permanent**, what small, low-risk experiment could you test over the next 30 days?
- What is the real fear holding you back right now: financial uncertainty, outside judgment, or choosing the wrong direction?
- If nobody could judge the outcome for the first year, which path feels genuinely energizing to work on every morning?`
      : `Tôi nhận thấy trong trăn trở của bạn có một giả định rất thú vị. Bạn dường như đang mặc định rằng chỉ có hai hướng đi đối lập nhau, hoặc phải đánh đổi một trong hai.

Hãy cùng tôi bóc tách thử nhé:
- **Nếu giả định hiện tại của bạn không hoàn toàn đúng trong mọi hoàn cảnh**, thì bức tranh sẽ thay đổi như thế nào?
- Đâu là nỗi sợ vô thức lớn nhất đang ngăn cản bạn đưa ra quyết định vào thời điểm này?
- Nếu bạn có toàn quyền thất bại mà không phải chịu bất kỳ phán xét nào từ bên ngoài, trực giác mách bảo bạn muốn bước đi nước cờ nào đầu tiên?`;
  }

  // CHẾ ĐỘ 4: KIẾN TRÚC SƯ CÔNG NGHỆ & TỔNG HỢP PROMPT (ARCHITECT MODE)
  else if (matchedBenchmark && /(mẫu|ví dụ|template|prompt|tham khảo|example|pattern)/i.test(query)) {
    thinkingProcess.detectedIntent = 'RAG Benchmark Retrieval & Tech Stack Synthesis';
    thinkingProcess.rulesApplied = isEn
      ? [
          'Retrieve verified benchmark template',
          'Format cleanly with Markdown code block',
          'Include reliability and model compatibility notes'
        ]
      : [
          'Truy xuất kho tri thức đã qua kiểm định Benchmark',
          'Định dạng cấu trúc Markdown chuẩn phòng thí nghiệm',
          'Bổ sung siêu dữ liệu độ tin cậy'
        ];
    thinkingProcess.cognitiveNotes = isEn
      ? `Matched benchmark #${matchedBenchmark.id} in ${matchedBenchmark.industry}.`
      : `Khớp thành công với Benchmark #${matchedBenchmark.id} thuộc miền ${matchedBenchmark.industry}.`;

    responseContent = isEn
      ? `Based on curated work by **${matchedBenchmark.author}** (${matchedBenchmark.authorBadge}), here is a verified prompt structure you can use right away:

### 📌 ${matchedBenchmark.title} (Rating: ${matchedBenchmark.rating}/5.0)

\`\`\`markdown
${matchedBenchmark.optimizedPrompt}
\`\`\`

**Why this prompt works well:**
- **Zero generic filler:** Removes robotic greetings and vague instructions.
- **Depth & tone score:** **${matchedBenchmark.metrics.emotionScore || 95}%**.
- **Tested on:** ${matchedBenchmark.testedModels.join(', ')}.`
      : `Dựa trên tri thức kiểm nghiệm từ **${matchedBenchmark.author}** (${matchedBenchmark.authorBadge}), đây là cấu trúc prompt chuẩn hóa tối ưu nhất:

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
    thinkingProcess.rulesApplied = isEn
      ? [
          'Apply clean UI & component architecture (Tailwind CSS v4, Radix, Lenis)',
          'Structure guidance into Role, Context, Objective & Constraints',
          'Provide practical, maintainable implementation steps'
        ]
      : [
          'Chuẩn Anti-Slop Web Architecture (Tailwind v4, Radix, GSAP, Lenis)',
          'Phân tách R-C-O-C 4 thành phần',
          'Đề xuất Stack công nghệ thực thi cao'
        ];
    thinkingProcess.cognitiveNotes = isEn
      ? 'Analyzing technical request to provide a clear, practical architecture plan.'
      : 'Phân tích yêu cầu tổng hợp, tạo giải pháp kiến trúc tối ưu không dư thừa.';

    responseContent = isEn
      ? `Got your technical request: *"${userMessage}"*.

Here is a clean, practical approach following Cortex's **Clean Web & Prompt Architecture** guidelines:

1. **Clear UI & Readability:**
   - Keep layouts structured with **Tailwind CSS**, neutral high-contrast surfaces, crisp borders, and clear spacing—avoiding noisy decorative clutter.
   - Surface the most important user actions first and tuck secondary developer details cleanly out of the way.

2. **Smooth Performance & Scrolling:**
   - Sync **Lenis Smooth Scroll** cleanly while setting \`allowNestedScroll: true\` so inner panels scroll smoothly at 60fps.
   - Animate GPU-composited \`transform\` and \`opacity\` properties only to avoid layout shifts.

3. **Reliable Data & Storage:**
   - Pair local browser storage with optional server/cloud sync so preferences stay fast and resilient.

*Would you like a ready-to-use code example or a tailored prompt template for this task?*`
      : `Tôi đã tiếp nhận chỉ thị kỹ thuật: *"${userMessage}"*.

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
    timestamp: new Date().toLocaleTimeString(isEn ? 'en-US' : 'vi-VN', { hour: '2-digit', minute: '2-digit' }),
    version: adminConfig.analyzerVersion,
    mode: activeMode,
    thinking: thinkingProcess
  };
};
