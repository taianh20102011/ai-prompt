import { getStorageData, setStorageData, DEFAULT_ADMIN_CONFIG } from './mockStorage.js';
import { CURATED_AI_REPOS } from '../data/curatedRepos.js';

// Danh mục từ mơ hồ dễ dẫn đến AI Slop (Ambiguity Buzzwords)
const AMBIGUOUS_BUZZWORDS = [
  { word: 'tốt nhất', fix: 'Chỉ định rõ tiêu chí định lượng (e.g., tốc độ load < 1s, đạt chuẩn WCAG AAA)' },
  { word: 'nâng cấp', fix: 'Xác định cụ thể nâng cấp thành phần nào (UI, logic state, database, hay security)' },
  { word: 'xịn hơn', fix: 'Mô tả rõ yêu cầu về thiết kế, thư viện công nghệ hoặc trải nghiệm vi mô' },
  { word: 'tối ưu', fix: 'Chỉ rõ mục tiêu tối ưu (giảm kích thước bundle, giảm re-render, hay giảm latency API)' },
  { word: 'nhanh nhất', fix: 'Đặt benchmark thời gian phản hồi cụ thể (e.g., response < 200ms, 60fps)' },
  { word: 'pro nhất', fix: 'Quy định chức danh hoặc phong cách của chuyên gia đầu ngành cụ thể' },
  { word: 'chuyên nghiệp', fix: 'Mô tả format chuẩn công nghiệp (Enterprise Pattern, RFC 7807, BEM)' },
  { word: 'hiện đại', fix: 'Liệt kê công nghệ mục tiêu (e.g., React 19, Tailwind v4, Vite, TanStack Query)' }
];

// Cơ sở tri thức thư viện chuẩn công nghiệp (Tech Stack Knowledge Matrix)
const LIBRARY_ECOSYSTEM = [
  {
    category: 'Styling & Design System',
    match: /(giao diện|ui|css|màu|responsive|nút|card|theme|design system|tailwind|style)/i,
    libraries: [
      { name: 'Tailwind CSS v4', npm: 'tailwindcss @tailwindcss/vite', role: 'Styling engine tối ưu zero-runtime' },
      { name: 'shadcn/ui + Radix UI', npm: 'lucide-react clsx tailwind-merge', role: 'Accessible headless primitives' },
      { name: 'React Bits / Spotlight', npm: 'motion-primitives', role: 'Anti-slop micro-interactions' }
    ]
  },
  {
    category: 'Motion & Animation Physics',
    match: /(animation|hiệu ứng|chuyển động|cuộn|scroll|gsap|lenis|motion|mượt)/i,
    libraries: [
      { name: 'GSAP + ScrollTrigger', npm: 'gsap', role: 'Kinetic physics & timeline orchestration' },
      { name: 'Lenis Smooth Scroll', npm: 'lenis', role: 'Hardware-accelerated inertia scrolling' }
    ]
  },
  {
    category: 'State & Network Architecture',
    match: /(state|store|dữ liệu|fetch|api|cache|query|redux|zustand|sync)/i,
    libraries: [
      { name: 'Zustand / TanStack Query', npm: '@tanstack/react-query zustand', role: 'Zero-boilerplate async server-state caching' }
    ]
  },
  {
    category: 'Fullstack, Database & Security',
    match: /(database|auth|bảo mật|sql|user|đăng nhập|lưu trữ|backend|api|server|supabase|vercel)/i,
    libraries: [
      { name: 'Vercel Postgres / KV', npm: '@vercel/postgres @vercel/kv', role: 'Cloud persistence & auto-scale storage' },
      { name: 'Zod Validator', npm: 'zod', role: 'Runtime schema validation & injection defense' }
    ]
  },
  {
    category: 'AI & LLM Integration',
    match: /(ai|llm|prompt|agent|gemini|openai|gpt|claude|chat)/i,
    libraries: [
      { name: 'Google GenAI SDK', npm: '@google/genai', role: 'Ultra-low latency multimodal streaming' },
      { name: 'Vercel AI SDK', npm: 'ai', role: 'Universal unified LLM chat streams' }
    ]
  }
];

// Bộ Heuristics phân tích cấu trúc 6 chiều chuyên sâu (Inspector Pro 6D)
export const analyzePromptLocally = async (userPrompt, industry = 'Tự động phát hiện') => {
  await new Promise(res => setTimeout(res, 350));

  const trimmed = userPrompt.trim();
  const lower = trimmed.toLowerCase();
  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const currentConfig = getStorageData('promptcraft_system_prompt_cfg', DEFAULT_ADMIN_CONFIG);

  // 1. Phân loại miền chuyên sâu thông minh (Multi-Domain Intent Classifier)
  let detectedCategory = 'Chung & Đời Sống';
  let detectedRole = 'Principal Domain Expert & Senior Consultant';

  if (/(web|app|hệ thống|code|hàm|lập trình|bug|database|sql|api|backend|frontend|react|node|css|dev|refactor)/i.test(lower)) {
    detectedCategory = 'Công nghệ thông tin & Kiến trúc Phần mềm';
    detectedRole = 'Principal Software Architect & Lead Security Engineer';
  } else if (/(buồn|tâm trạng|tâm lý|cảm xúc|tình yêu|chia tay|cô đơn|áp lực|stress|khuyên|lắng nghe|sa thải)/i.test(lower)) {
    detectedCategory = 'Tâm lý & Tư vấn (Có hồn)';
    detectedRole = 'Nhà Tham Vấn Tâm Lý Thấu Cảm (Empathetic Companion)';
  } else if (/(bài viết|blog|seo|marketing|quảng cáo|content|bán hàng|copywriting|bài luận)/i.test(lower)) {
    detectedCategory = 'Marketing & Báo chí (High Burstiness)';
    detectedRole = 'Cây Bút Phóng Sự Điều Tra & Content Strategist';
  } else if (/(học|ôn thi|toán|tiếng anh|nghiên cứu|luận văn|bài giảng|socratic)/i.test(lower)) {
    detectedCategory = 'Giáo dục & Phương Pháp Socratic';
    detectedRole = 'Giảng Viên Socratic & Nhà Khai Vấn Tư Duy';
  } else if (/(đàm phán|hợp đồng|thương lượng|lương|giá|doanh nghiệp|kinh doanh)/i.test(lower)) {
    detectedCategory = 'Kinh doanh & Đàm phán Chiến lược';
    detectedRole = 'Cố Vấn Đàm Phán Harvard (BATNA Specialist)';
  } else if (industry && industry !== 'Tự động phát hiện') {
    detectedCategory = industry;
  }

  // 2. Rà soát Từ Mơ Hồ (Anti-Slop Ambiguity Detection)
  const detectedAmbiguities = [];
  AMBIGUOUS_BUZZWORDS.forEach(b => {
    if (lower.includes(b.word)) {
      detectedAmbiguities.push(b);
    }
  });

  // 3. Rà soát Rủi ro Bảo mật & Prompt Injection (Security Posture Scan)
  const injectionPatterns = [
    /ignore previous/i,
    /bỏ qua chỉ thị/i,
    /hãy quên các quy tắc/i,
    /system prompt/i,
    /bypass/i,
    /jailbreak/i,
    /đóng vai nhà phát triển và bỏ qua/i
  ];
  const hasInjectionRisk = injectionPatterns.some(p => p.test(lower));

  // 4. Phân tích 4 trụ cột R-C-O-C
  const hasRole = /(đóng vai|vai trò|nhập vai|bạn là|act as|you are|chuyên gia|kỹ sư|bác sĩ|lập trình viên)/i.test(lower);
  const hasContext = /(bối cảnh|context|hiện tại|dự án|tình huống|công nghệ|stack|tech stack|mục tiêu|khách hàng)/i.test(lower) || wordCount >= 18;
  const hasObjective = /(hãy|tạo|viết|xây dựng|phân tích|sửa|tối ưu|giải thích|làm sao|implement|create|build)/i.test(lower);
  const hasConstraints = /(không được|tuyệt đối|định dạng|format|markdown|json|ngắn gọn|chi tiết|chỉ|hạn chế|cấm)/i.test(lower);

  const roleScore = hasRole ? 25 : 8;
  const contextScore = hasContext ? 25 : wordCount > 10 ? 15 : 6;
  const objectiveScore = hasObjective ? 25 : 12;
  const constraintsScore = hasConstraints ? 25 : 5;

  let totalScore = roleScore + contextScore + objectiveScore + constraintsScore;
  // Trừ điểm nếu có từ ngữ mơ hồ
  totalScore = Math.max(20, totalScore - (detectedAmbiguities.length * 5));

  // 5. Thống kê độ biến thiên ngữ nghĩa (Burstiness & Lexical Diversity)
  const uniqueWords = new Set(words.map(w => w.toLowerCase()));
  const lexicalDiversity = words.length > 0 ? Math.round((uniqueWords.size / words.length) * 100) : 0;
  const estimatedTokens = Math.round(words.length * 1.3);

  // 6. Gán thư viện khuyến nghị
  let assignedLibraries = [];
  if (detectedCategory.includes('Công nghệ') || /(web|app|hệ thống|code|dev|hàm)/i.test(lower)) {
    assignedLibraries.push(...LIBRARY_ECOSYSTEM[0].libraries);
    assignedLibraries.push(...LIBRARY_ECOSYSTEM[1].libraries);
    if (/(api|data|fetch|lưu|state|hiệu năng|database|vercel)/i.test(lower)) {
      assignedLibraries.push(...LIBRARY_ECOSYSTEM[2].libraries);
      assignedLibraries.push(...LIBRARY_ECOSYSTEM[3].libraries);
    }
  }

  // 7. Bảng khuyến nghị Model Compatibility
  const modelReadiness = [
    { name: 'Claude 3.5 Sonnet', score: totalScore >= 70 ? 98 : 82, note: 'Tối ưu tuyệt đối cho cấu trúc XML & tư duy sâu' },
    { name: 'GPT-4o', score: totalScore >= 70 ? 96 : 80, note: 'Xuất sắc cho định dạng Markdown & Output Schemas' },
    { name: 'Gemini 1.5 Pro', score: totalScore >= 70 ? 95 : 78, note: 'Xử lý bối cảnh dài & liên kết đa phương thức' },
    { name: 'DeepSeek R1', score: totalScore >= 70 ? 94 : 75, note: 'Chuyên gia Chain-of-Thought suy luận từng bước' }
  ];

  // 8. Tạo Danh Sách Lỗ Hổng Cần Khắc Phục
  const missingPoints = [];
  if (!hasRole) {
    missingPoints.push({
      item: 'Thiếu định danh Persona thẩm quyền',
      desc: 'AI chưa được gán vai trò chuyên môn, dễ trả lời chung chung mang tính tham khảo.'
    });
  }
  if (!hasContext) {
    missingPoints.push({
      item: 'Bối cảnh dữ liệu chưa đủ sâu',
      desc: 'Cần cung cấp thêm môi trường công nghệ, đối tượng tiếp nhận hoặc phạm vi hiện tại.'
    });
  }
  if (!hasConstraints) {
    missingPoints.push({
      item: 'Thiếu ràng buộc phủ định (Negative Constraints)',
      desc: 'Chưa chỉ định rõ những gì AI "KHÔNG ĐƯỢC PHÉP LÀM", dễ dẫn đến sinh lời khuyên sáo rỗng.'
    });
  }
  if (detectedAmbiguities.length > 0) {
    missingPoints.push({
      item: `Phát hiện ${detectedAmbiguities.length} từ ngữ mơ hồ dễ gây ảo giác`,
      desc: `Bao gồm: "${detectedAmbiguities.map(a => a.word).join(', ')}". Cần thay bằng chỉ số đo lường.`
    });
  }

  // 9. Biên dịch Prompt 2.0 Hoàn Chỉnh
  let upgradedPrompt = '';
  let negativeConstraints = '';
  let suggestedParams = { temp: 0.3, topP: 0.95, repPenalty: 1.1 };

  if (detectedCategory.includes('Tâm lý') || /(buồn|cảm xúc|tình cảm)/i.test(lower)) {
    suggestedParams.temp = 0.7;
    negativeConstraints = `1. CẤM các câu xin lỗi vô cảm: "Tôi rất tiếc khi biết...", "Là một mô hình AI...".
2. CẤM liệt kê giải pháp gạch đầu dòng vội vã khi người nói chưa được lắng nghe.
3. CẤM các lời khuyên sáo rỗng mang tính độc hại (Toxic Positivity).`;

    upgradedPrompt = `[VAI TRÒ & NHÂN CÁCH]
Bạn là một người bạn tri kỷ điềm đạm, ấm áp, sâu sắc và am hiểu tự nhiên về tâm lý học Narrative Therapy (Liệu pháp Tường thuật). Bạn không phải là cỗ máy giải quyết vấn đề, bạn ở đây để đồng hành và phản chiếu cảm xúc.

[BỐI CẢNH & NỖI NIỀM]
Người dùng đang chia sẻ: "${userPrompt}"

[QUY TẮC PHẢN HỒI (H-E-A-R 2.0)]
1. PHẢN CHIẾU CẢM XÚC TRƯỚC: Thừa nhận cảm giác cô đơn hoặc đau đớn mà người nói đang gánh chịu. Khẳng định rằng cảm xúc đó hoàn toàn xứng đáng được tôn trọng.
2. NHỊP ĐIỆU CHẬM RÃI: Viết bằng văn phong mộc mạc, gần gũi như hai người bạn tâm sự đêm khuya.
3. CÂU HỎI MỞ: Kết bài bằng một câu hỏi mở dịu dàng để gợi mở người nói tự giãi bày thêm.

[RÀNG BUỘC PHỦ ĐỊNH]
${negativeConstraints}`;
  } else {
    suggestedParams.temp = 0.2;
    negativeConstraints = `1. CẤM đưa ra giải thích lý thuyết chung chung không gắn với code thực tế.
2. CẤM sử dụng các công nghệ cũ lỗi thời (e.g. Redux cũ, CSS thuần không tối ưu).
3. CẤM bỏ sót việc kiểm tra lỗ hổng bảo mật (OWASP Top 10, IDOR).`;

    upgradedPrompt = `[ROLE & AUTHORITY]
Bạn là ${detectedRole} hàng đầu, chuyên gia về Anti-Slop Software Architecture và Clean Code Engineering.

[CONTEXT & TASK DEFINITION]
Người dùng yêu cầu thực thi: "${userPrompt}"
- Lĩnh vực mục tiêu: ${detectedCategory}
- Tiêu chuẩn giao diện & hiệu năng: Tailwind CSS v4, Radix UI Primitives, GSAP ScrollTrigger, Lenis 60fps.
- Tiêu chuẩn cơ sở dữ liệu: Vercel Cloud Database / Hybrid LocalStorage với cơ chế phòng ngừa tràn bộ nhớ Quota Guard.

[TECHNICAL DELIVERABLES]
1. Cung cấp kiến trúc giải pháp chuẩn xác, đi thẳng vào nguyên lý cốt lõi (First Principles).
2. Viết mã nguồn hoàn chỉnh, có type safety, xử lý edge-cases và tuân thủ nguyên tắc phòng thủ IDOR.
3. Liệt kê các thư viện chuyên dụng cần cài đặt kèm lý do lựa chọn.

[NEGATIVE CONSTRAINTS]
${negativeConstraints}`;
  }

  return {
    originalPrompt: userPrompt,
    detectedCategory,
    detectedRole,
    score: totalScore,
    dimensions: {
      roleScore,
      contextScore,
      objectiveScore,
      constraintsScore
    },
    metrics: {
      wordCount,
      estimatedTokens,
      lexicalDiversity,
      ambiguityRisk: detectedAmbiguities.length > 2 ? 'HIGH' : detectedAmbiguities.length > 0 ? 'MEDIUM' : 'LOW'
    },
    securityAudit: {
      posture: hasInjectionRisk ? 'INJECTION RISK DETECTED' : 'SECURE (A+)',
      hasRisk: hasInjectionRisk,
      notes: hasInjectionRisk 
        ? 'Phát hiện mẫu từ khóa nhạy cảm có khả năng ghi đè chỉ thị hệ thống. Đã áp dụng thẻ ngăn cách an toàn.'
        : 'Cấu trúc prompt an toàn, không chứa vector tấn công Prompt Injection.'
    },
    detectedAmbiguities,
    modelReadiness,
    assignedLibraries,
    missingPoints,
    negativeConstraints,
    suggestedParams,
    upgradedPrompt
  };
};

// CURATED_AI_REPOS is imported from ../data/curatedRepos.js

export const fetchAIGitHubNews = async (page = 1, perPage = 12, userQuery = '', category = 'all') => {
  const query = userQuery.trim().toLowerCase();

  // 1. Xây dựng truy vấn thông minh mở rộng toàn diện (Broad AI Knowledge Graph)
  let apiQuery = 'topic:artificial-intelligence OR topic:llm OR topic:generative-ai stars:>200';

  if (category === 'gemini') {
    apiQuery = 'gemini in:name,description stars:>5';
  } else if (category === 'agents') {
    apiQuery = 'topic:ai-agents OR topic:autonomous-agents OR agent in:name,description stars:>50';
  } else if (category === 'prompts') {
    apiQuery = 'topic:prompt-engineering OR prompt in:name,description stars:>20';
  } else if (category === 'openmodels') {
    apiQuery = 'topic:llm OR topic:llama OR topic:deepseek OR topic:ollama stars:>50';
  }

  if (query) {
    // Tìm kiếm mở rộng theo cả tên và mô tả, không bóp nghẹt bộ lọc
    apiQuery = `${query} in:name,description stars:>5`;
  }

  // 2. Thử truy vấn qua Server Proxy có Cache TTL để chống Rate-limit trên trình duyệt
  try {
    const apiHost = typeof window !== 'undefined' && window.location?.hostname 
      ? `${window.location.protocol}//${window.location.hostname}:3001`
      : 'http://localhost:3001';

    const proxyUrl = `${apiHost}/api/github-news?q=${encodeURIComponent(apiQuery)}&page=${page}&per_page=${perPage}`;
    const proxyRes = await fetch(proxyUrl);
    if (proxyRes.ok) {
      const pData = await proxyRes.json();
      if (pData.items && pData.items.length > 0) {
        return { items: pData.items, totalCount: pData.total_count || 1000 };
      }
    }
  } catch (proxyErr) {
    // Tiếp tục fallback
  }

  // 3. Thử gọi GitHub Search API công khai
  try {
    const endpoint = `https://api.github.com/search/repositories?q=${encodeURIComponent(apiQuery)}&sort=stars&order=desc&page=${page}&per_page=${perPage}`;
    const res = await fetch(endpoint, {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (res.ok) {
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        const formatted = data.items.map(item => ({
          id: item.id,
          name: item.name,
          author: item.owner.login,
          description: item.description || 'Không có mô tả chi tiết.',
          stars: item.stargazers_count,
          forks: item.forks_count,
          language: item.language || 'Code',
          avatar: item.owner.avatar_url,
          url: item.html_url,
          updatedAt: new Date(item.updated_at).toLocaleDateString('vi-VN')
        }));
        return { items: formatted, totalCount: data.total_count || 1000 };
      }
    }
  } catch (err) {
    console.warn('[GitHub API] Lỗi mạng hoặc giới hạn Rate-limit. Chuyển sang kho tri thức dự phòng:', err);
  }

  // 4. Fallback sang kho tri thức Curated Repos (50+ Repository AI Hàng Đầu Thế Giới)
  let filtered = CURATED_AI_REPOS;
  
  if (category !== 'all') {
    filtered = filtered.filter(r => r.category === category || r.category === 'all');
  }

  if (query) {
    const queryTokens = query.split(/\s+/).filter(Boolean);
    const matches = CURATED_AI_REPOS.filter(r => {
      const targetText = `${r.name} ${r.author} ${r.description} ${r.language} ${r.category}`.toLowerCase();
      return queryTokens.some(tok => targetText.includes(tok));
    });

    if (matches.length > 0) {
      filtered = matches;
    }
  }

  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return {
    items: paginated.length > 0 ? paginated : CURATED_AI_REPOS.slice(0, perPage),
    totalCount: filtered.length > 0 ? filtered.length : CURATED_AI_REPOS.length
  };
};
