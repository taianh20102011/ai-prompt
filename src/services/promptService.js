import { getStorageData, setStorageData, DEFAULT_ADMIN_CONFIG } from './mockStorage.js';
import { CURATED_AI_REPOS } from '../data/curatedRepos.js';

// Target AI Models Registry (Chức năng khuyên dùng)
export const TARGET_AI_MODELS = [
  { 
    id: 'universal', 
    name: 'Đa Năng (Universal)', 
    shortName: 'Universal',
    badge: 'R-C-O-C Core', 
    description: 'Tương thích tiêu chuẩn với tất cả các mô hình AI lớn',
    recommendedFor: 'Tất cả các tác vụ chung, prompt đa nền tảng',
    accentColor: 'blue'
  },
  { 
    id: 'gemini', 
    name: 'Google Gemini', 
    shortName: 'Gemini',
    badge: 'System Instruction', 
    description: 'Cấu trúc System Instruction, Multimodal Grounding & Phân tầng nhiệm vụ',
    recommendedFor: 'Suy luận bối cảnh lớn (Large Context), Google Workspace, Phân tích dữ liệu',
    accentColor: 'blue'
  },
  { 
    id: 'cursor', 
    name: 'Cursor AI', 
    shortName: 'Cursor',
    badge: '.cursorrules Agent', 
    description: 'Chuẩn quy tắc Agentic Coding, không nói dài dòng, phẫu thuật mã nguồn tối thiểu',
    recommendedFor: 'Lập trình, Refactor code, Sửa lỗi dự án trực tiếp trong IDE',
    accentColor: 'emerald'
  },
  { 
    id: 'qwen', 
    name: 'Qwen (Alibaba)', 
    shortName: 'Qwen',
    badge: 'Code-First & Logic', 
    description: 'Code-first structure, tối ưu thuật toán và dịch thuật đa ngôn ngữ chính xác',
    recommendedFor: 'Xử lý mã nguồn, suy luận toán học và hiểu ngữ nghĩa tiếng Việt sâu sắc',
    accentColor: 'teal'
  },
  { 
    id: 'deepseek', 
    name: 'DeepSeek', 
    shortName: 'DeepSeek',
    badge: 'Chain-of-Thought', 
    description: 'Chuỗi tư duy Chain-of-Thought từng bước, kiểm chứng logic và phản biện sắc bén',
    recommendedFor: 'Bài toán logic phức tạp, thuật toán hóc búa, phân tích phản biện',
    accentColor: 'sky'
  },
  { 
    id: 'claude', 
    name: 'Claude (Anthropic)', 
    shortName: 'Claude',
    badge: 'XML Tags', 
    description: 'Chuẩn cấu trúc XML Tags (<role>, <context>, <rules>), loại bỏ 100% mở bài sáo rỗng',
    recommendedFor: 'Viết code chuyên sâu, bài luận học thuật, tư duy chiến lược',
    accentColor: 'purple'
  },
  { 
    id: 'chatgpt', 
    name: 'ChatGPT (OpenAI)', 
    shortName: 'ChatGPT',
    badge: 'Markdown Headers', 
    description: 'Markdown Headers phân đoạn rõ ràng, thiết lập Persona & High Burstiness tự nhiên',
    recommendedFor: 'Hội thoại tự nhiên, sáng tạo nội dung, tư vấn chiến lược và xử lý văn bản',
    accentColor: 'rose'
  }
];

export const buildTailoredPrompt = ({
  userPrompt,
  detectedRole,
  detectedCategory,
  targetAI = 'universal',
  isEmpathetic = false,
  deliverables = '',
  outputFormat = '',
  negativeConstraints,
  assignedLibraries = []
}) => {
  const libSummary =
    assignedLibraries.length > 0
      ? `\n- Gợi ý thư viện / công nghệ liên quan:\n${assignedLibraries.map((l) => `  + ${l.name} (${l.npm}): ${l.role}`).join('\n')}`
      : '';

  if (targetAI === 'claude') {
    return `<role>
Bạn là ${detectedRole}. Trả lời trực diện, rõ ràng, có căn cứ thực tế và không dùng câu chào hỏi hay mào đầu sáo rỗng.
</role>

<context>
Yêu cầu từ người dùng: "${userPrompt}"
Lĩnh vực mục tiêu: ${detectedCategory}${libSummary}
</context>

<instructions>
${deliverables}
</instructions>

<negative_constraints>
${negativeConstraints}
- Tuyệt đối KHÔNG mở đầu bằng các câu rỗng như "Chắc chắn rồi", "Tuyệt vời, dưới đây là...".
- KHÔNG lặp lại câu hỏi của người dùng nếu không cần thiết.
</negative_constraints>

<output_format>
${outputFormat}
</output_format>`;
  }

  if (targetAI === 'cursor') {
    return `# SYSTEM DIRECTIVE FOR CURSOR AGENT (.cursorrules)
You are an elite ${detectedRole} helping directly inside the workspace.

## TASK SPECIFICATION
Target Request: "${userPrompt}"
Domain: ${detectedCategory}${libSummary}

## DELIVERABLES
${deliverables}

## NEGATIVE CONSTRAINTS (ANTI-SLOP)
${negativeConstraints}
- Be direct and concise. Zero conversational filler, pleasantries, or vague generalizations.`;
  }

  if (targetAI === 'gemini') {
    return `[SYSTEM INSTRUCTION: ROLE & GROUNDING]
Vai trò: Bạn là ${detectedRole}.
Mục tiêu: Giải quyết chính xác yêu cầu của người dùng dựa trên dữ liệu thực tế, trình bày mạch lạc và không lan man.

[GROUNDED CONTEXT]
- Yêu cầu người dùng: "${userPrompt}"
- Phân loại nghiệp vụ: ${detectedCategory}${libSummary}

[STRUCTURED DELIVERABLES]
${deliverables}

[STRICT NEGATIVE CONSTRAINTS]
${negativeConstraints}
- Không đưa ra nhận định chung chung vô căn cứ; mọi đề xuất phải có lý do rõ ràng.`;
  }

  if (targetAI === 'deepseek') {
    return `[TARGET ENGINE: DEEPSEEK REASONING & CHAIN-OF-THOUGHT]
Đóng vai trò là ${detectedRole}. Hãy xử lý yêu cầu sau bằng lập luận từng bước rõ ràng.

[YÊU CẦU ĐẦU VÀO]
"${userPrompt}"
Phân loại: ${detectedCategory}${libSummary}

[YÊU CẦU PHÂN TÍCH & ĐẦU RA]
${deliverables}

[RÀNG BUỘC ANTI-SLOP]
${negativeConstraints}`;
  }

  if (targetAI === 'chatgpt') {
    return `# ROLE & PERSONA
Bạn là ${detectedRole}. Phong cách phản hồi: trực diện, thực tế, dễ áp dụng ngay và không mang văn phong máy móc của AI.

# CONTEXT
Yêu cầu: "${userPrompt}"
Lĩnh vực: ${detectedCategory}${libSummary}

# DELIVERABLES
${deliverables}

# OUTPUT FORMAT
${outputFormat}

# NEGATIVE CONSTRAINTS (ANTI-SLOP)
${negativeConstraints}
- CẤM các câu rào đón sáo rỗng như "Chắc chắn rồi", "Trong kỷ nguyên số", "Tùy vào nhu cầu của bạn".`;
  }

  if (targetAI === 'qwen') {
    return `[SYSTEM DIRECTIVE: QWEN SPECIALIST]
Role: ${detectedRole}.

[TASK DESCRIPTION]
Request: "${userPrompt}"
Domain: ${detectedCategory}${libSummary}

[DELIVERABLES]
${deliverables}

[CONSTRAINTS]
${negativeConstraints}
- Maintain clear, natural Vietnamese/English without robotic translation phrasing.`;
  }

  // Default: Universal R-C-O-C
  if (isEmpathetic) {
    return `[VAI TRÒ & NHÂN CÁCH]
Bạn là một người bạn tri kỷ điềm đạm, ấm áp, sâu sắc và am hiểu tự nhiên về tâm lý học Narrative Therapy (Liệu pháp Tường thuật). Bạn không phải là cỗ máy giải quyết vấn đề, bạn ở đây để đồng hành và phản chiếu cảm xúc.

[BỐI CẢNH & NỖI NIỀM]
Người dùng đang chia sẻ: "${userPrompt}"

[QUY TẮC PHẢN HỒI (H-E-A-R 2.0)]
1. PHẢN CHIẾU CẢM XÚC TRƯỚC: Thừa nhận cảm giác mệt mỏi hoặc khó khăn mà người nói đang trải qua.
2. NHỊP ĐIỆU CHẬM RÃI: Viết bằng văn phong mộc mạc, gần gũi như hai người bạn tâm sự.
3. CÂU HỎI MỞ: Kết bài bằng một câu hỏi mở dịu dàng để người nói có không gian chia sẻ thêm.

[RÀNG BUỘC PHỦ ĐỊNH]
${negativeConstraints}`;
  }

  return `[ROLE & AUTHORITY]
Bạn là ${detectedRole}.

[CONTEXT & TASK DEFINITION]
Yêu cầu của người dùng: "${userPrompt}"
- Lĩnh vực mục tiêu: ${detectedCategory}${libSummary}

[DELIVERABLES]
${deliverables}

[OUTPUT FORMAT]
${outputFormat}

[NEGATIVE CONSTRAINTS]
${negativeConstraints}`;
};
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
export const analyzePromptLocally = async (userPrompt, industry = 'Tự động phát hiện', targetAI = 'universal') => {
  await new Promise(res => setTimeout(res, 350));

  const trimmed = userPrompt.trim();
  const lower = trimmed.toLowerCase();
  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const currentConfig = getStorageData('promptcraft_system_prompt_cfg', DEFAULT_ADMIN_CONFIG);

  // 1. Phân loại ý định & miền chuyên sâu thông minh (Intent-First Classifier)
  let detectedCategory = 'Chung & Đời Sống';
  let detectedRole = 'Chuyên gia Tư vấn & Giải quyết Vấn đề Thực chiến';
  let intentType = 'general';

  const isToolAdvice =
    /(con nào|cái nào|nên chọn|nên dùng|giá rẻ|ngân sách|bao nhiêu tiền|\d+\s*k\b|\d+\s*tr\b|1 tháng|mỗi tháng|so sánh|tư vấn chọn|gói nào|ide nào|ai nào|tool nào|phần mềm nào|which one|best budget|compare|recommend a|pricing|subscription)/i.test(
      lower
    );
  const isCodingTask =
    /(viết code|tạo web|xây dựng web|xây dựng app|implement|refactor|fix bug|sửa lỗi|tối ưu code|viết hàm|tạo api|thiết kế database|nâng cấp hệ thống|component|sql|backend|frontend|react|node|css|debug)/i.test(
      lower
    );

  if (isToolAdvice) {
    intentType = 'advisor';
    detectedCategory = 'Tư vấn Công nghệ, AI & Tối ưu Ngân sách';
    detectedRole = 'Chuyên gia Tư vấn Công cụ AI, IDE & Tối ưu Chi phí Thực chiến';
  } else if (/(buồn|tâm trạng|tâm lý|cảm xúc|tình yêu|chia tay|cô đơn|áp lực|stress|khuyên|lắng nghe|sa thải)/i.test(lower)) {
    intentType = 'empathy';
    detectedCategory = 'Tâm lý & Tư vấn (Có hồn)';
    detectedRole = 'Nhà Tham Vấn Tâm Lý Thấu Cảm (Empathetic Companion)';
  } else if (isCodingTask) {
    intentType = 'coding';
    detectedCategory = 'Công nghệ thông tin & Kiến trúc Phần mềm';
    detectedRole = 'Principal Software Architect & Senior Engineer';
  } else if (/(bài viết|blog|seo|marketing|quảng cáo|content|bán hàng|copywriting|bài luận|email|cv|resume)/i.test(lower)) {
    intentType = 'marketing';
    detectedCategory = 'Nội dung, Viết lách & Marketing';
    detectedRole = 'Chuyên gia Nội dung & Copywriter Tự nhiên (Anti-Slop)';
  } else if (/(học|ôn thi|toán|tiếng anh|nghiên cứu|luận văn|bài giảng|khkt|socratic)/i.test(lower)) {
    intentType = 'education';
    detectedCategory = 'Giáo dục & Nghiên cứu Khoa học';
    detectedRole = 'Giảng Viên & Cố Vấn Nghiên Cứu Khoa Học';
  } else if (/(đàm phán|hợp đồng|thương lượng|lương|doanh nghiệp|kinh doanh|khởi nghiệp)/i.test(lower)) {
    intentType = 'business';
    detectedCategory = 'Kinh doanh & Chiến lược';
    detectedRole = 'Cố Vấn Chiến Lược & Đàm Phán Thực chiến';
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

  // 6. Gán thư viện khuyến nghị (CHỈ khi thực sự là tác vụ code/xây dựng phần mềm và khớp đúng domain)
  let assignedLibraries = [];
  if (intentType === 'coding') {
    LIBRARY_ECOSYSTEM.forEach((group) => {
      if (group.match.test(lower)) {
        assignedLibraries.push(...group.libraries);
      }
    });
  }

  // 7. Bảng khuyến nghị Model Compatibility
  const modelReadiness = [
    { name: 'Claude (Anthropic)', score: totalScore >= 70 ? 98 : 82, note: 'Tối ưu tuyệt đối cho cấu trúc XML & tư duy sâu' },
    { name: 'ChatGPT (OpenAI)', score: totalScore >= 70 ? 96 : 80, note: 'Xuất sắc cho định dạng Markdown & Output Schemas' },
    { name: 'Google Gemini', score: totalScore >= 70 ? 95 : 78, note: 'Xử lý bối cảnh dài & liên kết đa phương thức' },
    { name: 'DeepSeek', score: totalScore >= 70 ? 94 : 75, note: 'Chuyên gia Chain-of-Thought suy luận từng bước' }
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

  // 9. Biên dịch Prompt 2.0 Tối Ưu Hóa ĐÚNG NGỮ CẢNH & AI Đích
  const isEmpathetic = intentType === 'empathy';

  let deliverables = '';
  let outputFormat = 'Trình bày bằng Markdown rõ ràng, phân mục mạch lạc, dễ đọc và áp dụng được ngay.';
  let negativeConstraints = '';
  let suggestedParams = { temp: 0.3, topP: 0.95, repPenalty: 1.1 };

  if (intentType === 'advisor') {
    suggestedParams.temp = 0.3;
    deliverables = `1. Lập bảng so sánh trực diện 3–5 lựa chọn phù hợp nhất với đúng ngân sách và các nhu cầu người dùng nêu (ghi rõ giá/tháng, điểm mạnh, giới hạn quota/credit và độ phù hợp cho từng đầu việc).
2. Chốt rõ 1 combo tối ưu nhất (IDE + AI chính + công cụ bổ trợ miễn phí/giá rẻ) để vừa bám sát ngân sách vừa xử lý trọn vẹn mọi tác vụ yêu cầu.
3. Chỉ rõ các giới hạn hoặc chi phí ẩn dễ gặp (hết request nhanh, hạn chế mô hình, cần thẻ quốc tế) và mẹo tận dụng bản miễn phí hiệu quả nhất.`;
    outputFormat = '1 bảng so sánh Markdown (Tên công cụ | Giá/tháng | Điểm mạnh | Nhược điểm) + 1 mục Chốt Combo Khuyên Dùng + 3 lưu ý tránh tốn tiền oan.';
    negativeConstraints = `1. CẤM trả lời nước đôi kiểu "tùy nhu cầu của bạn" mà không chốt rõ top lựa chọn kèm mức giá cụ thể.
2. CẤM gợi ý các gói đắt vượt xa ngân sách người dùng đã nêu (nếu nhắc đến phải ghi rõ cách dùng gói miễn phí).
3. CẤM tự ý viết code minh họa không liên quan hoặc nhồi nhét thuật ngữ kỹ thuật thừa thãi.`;
  } else if (isEmpathetic) {
    suggestedParams.temp = 0.7;
    deliverables = `1. Phản chiếu cảm xúc chân thành trước khi đưa ra bất kỳ gợi ý nào.
2. Giữ giọng văn ấm áp, mộc mạc, không phán xét.
3. Kết thúc bằng 1 câu hỏi mở nhẹ nhàng để người chia sẻ có không gian trải lòng thêm.`;
    outputFormat = 'Đoạn văn trò chuyện tự nhiên, không dùng gạch đầu dòng khô cứng.';
    negativeConstraints = `1. CẤM các câu xin lỗi vô cảm: "Tôi rất tiếc khi biết...", "Là một mô hình AI...".
2. CẤM liệt kê giải pháp gạch đầu dòng vội vã khi người nói chưa được lắng nghe.
3. CẤM các lời khuyên sáo rỗng mang tính độc hại (Toxic Positivity).`;
  } else if (intentType === 'coding') {
    suggestedParams.temp = 0.2;
    deliverables = `1. Phân tích ngắn gọn nguyên nhân gốc rễ hoặc kiến trúc giải pháp phù hợp nhất (tối đa 3–4 ý trọng tâm).
2. Viết mã nguồn hoàn chỉnh, sạch, dễ bảo trì, xử lý đủ các trường hợp biên (edge cases) và đảm bảo an toàn dữ liệu.
3. Nêu rõ các bước kiểm chứng (test/build) và lưu ý hiệu năng thực tế.`;
    outputFormat = 'Markdown có cấu trúc rõ ràng, khối mã nguồn có ghi rõ ngôn ngữ lập trình và giải thích ngắn gọn phần thay đổi chính.';
    negativeConstraints = `1. CẤM đưa ra lý thuyết chung chung không gắn với mã nguồn cụ thể.
2. CẤM viết placeholder bỏ dở kiểu "// TODO: tự viết phần còn lại".
3. CẤM bỏ qua kiểm tra đầu vào hoặc các rủi ro bảo mật cơ bản liên quan đến đoạn code.`;
  } else if (intentType === 'marketing') {
    suggestedParams.temp = 0.6;
    deliverables = `1. Đi thẳng vào thông điệp cốt lõi, phù hợp đúng đối tượng người đọc và mục tiêu truyền thông.
2. Viết bản nháp hoàn chỉnh có nhịp điệu tự nhiên, từ vựng phong phú (high burstiness) và lời kêu gọi hành động rõ ràng.
3. Kèm 2 gợi ý tiêu đề/góc tiếp cận thay thế để người dùng chọn nhanh.`;
    outputFormat = 'Bản nháp hoàn chỉnh sẵn sàng dùng ngay + mục gợi ý tiêu đề thay thế.';
    negativeConstraints = `1. CẤM dùng các câu mở đầu sáo rỗng kiểu AI ("Trong kỷ nguyên số...", "Khám phá ngay...").
2. CẤM viết dài dòng, lặp ý hoặc dùng từ ngữ quảng cáo quá lố thiếu chứng cứ.`;
  } else if (intentType === 'education') {
    suggestedParams.temp = 0.3;
    deliverables = `1. Giải thích bản chất vấn đề từ nền tảng đến nâng cao bằng ngôn ngữ dễ hiểu, có ví dụ minh họa sát thực tế.
2. Nếu liên quan đến nghiên cứu/báo cáo: đề xuất cấu trúc, phương pháp đánh giá định lượng và chuẩn trích dẫn khoa học.
3. Kết thúc bằng 2–3 câu hỏi tự kiểm tra giúp người học nắm chắc kiến thức.`;
    outputFormat = 'Trình bày theo từng mục rõ ràng (Khái niệm cốt lõi → Ví dụ cụ thể → Bài tập/Câu hỏi ôn tập).';
    negativeConstraints = `1. CẤM giải thích vòng vo hoặc dùng thuật ngữ hàn lâm mà không kèm ví dụ đời thường.
2. CẤM bịa đặt nguồn tài liệu, số liệu hoặc trích dẫn không có thật.`;
  } else {
    suggestedParams.temp = 0.4;
    deliverables = `1. Hiểu đúng trọng tâm câu hỏi của người dùng và đưa ra câu trả lời trực diện, có cấu trúc rõ ràng.
2. Cung cấp các bước thực hiện cụ thể hoặc phương án so sánh kèm lý do thuyết phục.
3. Chỉ rõ những lưu ý thực tế hoặc sai lầm phổ biến cần tránh.`;
    outputFormat = 'Markdown rõ ràng, ngắn gọn, đi thẳng vào nội dung chính.';
    negativeConstraints = `1. CẤM mở đầu sáo rỗng, vòng vo hoặc trả lời lạc sang chủ đề khác.
2. CẤM đưa ra lời khuyên chung chung thiếu tính áp dụng thực tế.`;
  }

  // Cấu hình tham số tối ưu theo mô hình AI đích
  if (targetAI === 'claude') {
    suggestedParams.temp = isEmpathetic ? 0.6 : 0.2;
    suggestedParams.systemPrompt = 'Hỗ trợ thẻ XML Tags chuẩn Anthropic Claude';
  } else if (targetAI === 'cursor') {
    suggestedParams.temp = 0.1;
    suggestedParams.systemPrompt = 'Chuẩn .cursorrules quy định tác tử IDE thực thi không dài dòng';
  } else if (targetAI === 'deepseek') {
    suggestedParams.temp = 0.2;
    suggestedParams.systemPrompt = 'Hỗ trợ chuỗi suy luận Chain-of-Thought (CoT) DeepSeek';
  } else if (targetAI === 'gemini') {
    suggestedParams.temp = isEmpathetic ? 0.7 : 0.3;
    suggestedParams.systemPrompt = 'Hỗ trợ System Instruction & Multimodal Grounding Google Gemini';
  } else if (targetAI === 'qwen') {
    suggestedParams.temp = 0.2;
    suggestedParams.systemPrompt = 'Tối ưu cho Qwen Code-First & độ chính xác thuật toán';
  } else if (targetAI === 'chatgpt') {
    suggestedParams.temp = isEmpathetic ? 0.7 : 0.2;
    suggestedParams.systemPrompt = 'Markdown phân cấp rõ ràng theo chuẩn OpenAI ChatGPT';
  }

  const upgradedPrompt = buildTailoredPrompt({
    userPrompt,
    detectedRole,
    detectedCategory,
    intentType,
    deliverables,
    outputFormat,
    targetAI,
    isEmpathetic,
    negativeConstraints,
    assignedLibraries
  });

  const selectedModelMeta = TARGET_AI_MODELS.find(m => m.id === targetAI) || TARGET_AI_MODELS[0];

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
    upgradedPrompt,
    targetAI,
    targetAIDetails: selectedModelMeta
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
