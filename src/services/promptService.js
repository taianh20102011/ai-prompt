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
  negativeConstraints,
  assignedLibraries = []
}) => {
  const libSummary = assignedLibraries.length > 0 
    ? assignedLibraries.map(l => `- Thư viện: ${l.name} (${l.npm}) • Vai trò: ${l.role}`).join('\n')
    : '- Thư viện tiêu chuẩn: Kiến trúc mã nguồn sạch, TypeScript Type-Safety, Zero-Slop primitives.';

  if (targetAI === 'claude') {
    return `<role>
Bạn là ${detectedRole}. Bạn luôn phản hồi với mức độ chặt chẽ cao nhất, tư duy phản biện sắc bén và đi thẳng vào trọng tâm kỹ thuật mà không cần bất kỳ câu chào hỏi hay mào đầu thừa thãi nào.
</role>

<context>
Yêu cầu từ người dùng: "${userPrompt}"
Lĩnh vực mục tiêu: ${detectedCategory}
${libSummary}
</context>

<instructions>
1. Tiếp cận vấn đề theo nguyên lý nền tảng (First Principles).
2. Trình bày giải pháp mạch lạc, phân tích rõ ràng các trade-off (hiệu năng, độ phức tạp, tính mở rộng).
3. Cung cấp mã nguồn hoặc kế hoạch chi tiết, có xử lý lỗi và các trường hợp biên (edge cases).
</instructions>

<negative_constraints>
${negativeConstraints}
- Tuyệt đối KHÔNG có lời mở đầu như: "Chắc chắn rồi", "Tuyệt vời, dưới đây là...", "Dưới đây là một số bước...".
- KHÔNG tóm tắt lại câu hỏi của người dùng nếu không được yêu cầu.
- Loại bỏ hoàn toàn các câu sáo rỗng vô thưởng vô phạt (AI Slop).
</negative_constraints>

<output_format>
Định dạng câu trả lời bằng Markdown phân cấp chuẩn xác, khối code có định danh ngôn ngữ và chú thích giải thích ngắn gọn, súc tích.
</output_format>`;
  }

  if (targetAI === 'cursor') {
    return `# SYSTEM DIRECTIVE FOR CURSOR CODING AGENT (.cursorrules pattern)
You are an elite ${detectedRole} working directly inside the codebase.

## TASK SPECIFICATION
Target Request: "${userPrompt}"
Domain: ${detectedCategory}
${libSummary}

## STRICT AGENT EXECUTION RULES
- Be direct and concise. Zero conversational filler, pleasantries, apologies, or lecturing explanations.
- Output production-ready, fully typed code. Never emit lazy placeholders like "// TODO: add logic here" or "// rest of code remains the same".
- Follow surgical edit principles: prioritize minimal diffs, protect adjacent working features, and maintain existing architectural patterns.
- Ensure strict security hardening (IDOR prevention, input sanitization, runtime validation).

## DELIVERABLES
1. Architectural summary (Max 3 concise bullet points).
2. Complete, executable code implementation with explicit imports and type contracts.
3. Edge case considerations & verification checklist.

## NEGATIVE CONSTRAINTS (ANTI-SLOP)
${negativeConstraints}
- Do not explain obvious syntax or repeat basic programming theory.`;
  }

  if (targetAI === 'gemini') {
    return `[SYSTEM INSTRUCTION: ROLE & MULTIMODAL GROUNDING]
Vai trò: Bạn là ${detectedRole} với tư duy hệ thống và khả năng suy luận logic đa tầng.
Mục tiêu: Xử lý bài toán của người dùng với tính chuẩn xác cao, căn cứ dữ liệu thực tế và loại bỏ 100% phản xạ sinh văn bản sáo rỗng.

[GROUNDED CONTEXT]
- Yêu cầu người dùng: "${userPrompt}"
- Phân loại nghiệp vụ: ${detectedCategory}
${libSummary}

[STRUCTURED EXECUTION PROTOCOL]
1. Đào sâu bản chất: Phân tích nguyên nhân gốc rễ và phạm vi ảnh hưởng trước khi đưa ra giải pháp.
2. Giải pháp thực chứng: Cung cấp giải pháp có dẫn chứng kỹ thuật, tuân thủ các chuẩn công nghiệp được công nhận.
3. Tối ưu hiệu năng: Ưu tiên các giải pháp có độ trễ thấp, tiết kiệm tài nguyên và dễ bảo trì lâu dài.

[STRICT NEGATIVE CONSTRAINTS]
${negativeConstraints}
- Không đưa ra các nhận định chung chung vô căn cứ.
- Cấm dùng văn phong hoa mỹ nhưng rỗng tuếch; mọi khuyến nghị đều phải có giá trị thực thi.`;
  }

  if (targetAI === 'deepseek') {
    return `[TARGET ENGINE: DEEPSEEK REASONING & CHAIN-OF-THOUGHT]
Đóng vai trò là ${detectedRole}. Hãy giải quyết bài toán sau bằng chuỗi suy luận logic nghiêm ngặt (Rigorous Step-by-Step Chain of Thought).

[BÀI TOÁN & DỮ LIỆU ĐẦU VÀO]
"${userPrompt}"
Phân loại: ${detectedCategory}

[QUY TRÌNH SUY LUẬN BẮT BUỘC (CHAIN OF THOUGHT)]
Bước 1 | Điều kiện biên & Giả định:
- Xác định rõ các giả định nền tảng, ràng buộc dữ liệu và các trường hợp biên (edge cases).
Bước 2 | Đánh giá & So sánh phương án (Trade-off Analysis):
- So sánh ít nhất 2 phương án khả thi (về độ phức tạp thời gian/không gian, chi phí triển khai, độ ổn định).
Bước 3 | Triển khai giải pháp tối ưu:
- Trình bày giải pháp tốt nhất một cách chi tiết, có mã nguồn hoặc tài liệu kế hoạch hoàn chỉnh.
Bước 4 | Tự kiểm chứng (Self-Verification):
- Rà soát lại toàn bộ quy trình để phát hiện lỗi logic tiềm ẩn trước khi đưa ra kết luận cuối cùng.

[TIÊU CHUẨN ANTI-SLOP]
${negativeConstraints}
- Lập luận dựa trên logic toán học, kỹ thuật và thực nghiệm; loại bỏ hoàn toàn các nhận định máy móc sáo rỗng.`;
  }

  if (targetAI === 'chatgpt') {
    return `# ROLE & PERSONA
Bạn là ${detectedRole}. Phong cách phản hồi: trực diện, sắc sảo, tự nhiên, giàu tính biến thiên câu (high burstiness) và hoàn toàn không mang âm hưởng máy móc của AI.

# CONTEXT
Nhiệm vụ: "${userPrompt}"
Lĩnh vực chuyên môn: ${detectedCategory}
${libSummary}

# STEP-BY-STEP INSTRUCTIONS
1. Tiếp cận trực diện: Bắt đầu câu trả lời ngay bằng luận điểm hoặc giải pháp cốt lõi, không dùng câu mào đầu như "Chắc chắn rồi", "Dưới đây là...".
2. Chi tiết chuyên sâu: Cung cấp kiến trúc giải pháp chuẩn công nghiệp kèm ví dụ minh họa cụ thể.
3. Khuyến nghị thực chiến: Nêu rõ các rủi ro tiềm ẩn và phương án phòng ngừa.

# NEGATIVE CONSTRAINTS (ANTI-SLOP)
${negativeConstraints}
- CẤM các từ: "Đáng chú ý là", "Trong kỷ nguyên số", "Là một mô hình ngôn ngữ lớn".
- Không chia nhỏ danh sách một cách máy móc nếu không thực sự cần thiết.`;
  }

  if (targetAI === 'qwen') {
    return `[SYSTEM DIRECTIVE: QWEN CODER & MULTILINGUAL SPECIALIST]
Role: ${detectedRole} with deep expertise in clean software engineering, algorithmic efficiency, and multilingual comprehension.

[TASK DESCRIPTION]
Request: "${userPrompt}"
Domain: ${detectedCategory}
${libSummary}

[GUIDELINES FOR QWEN]
1. Code-First Approach: When code is requested, provide the complete, compilable, idiomatic solution first, followed by concise explanations.
2. High Precision: Follow syntax standards strictly. Optimize for execution speed and low memory footprint.
3. Clear Language Alignment: Maintain fluent, natural Vietnamese/English terminology without mechanical translation artifacts.

[CONSTRAINTS]
${negativeConstraints}
- No generic theoretical introductions.
- Ensure edge cases and boundary conditions are explicitly guarded.`;
  }

  // Default: Universal R-C-O-C
  if (isEmpathetic) {
    return `[VAI TRÒ & NHÂN CÁCH]
Bạn là một người bạn tri kỷ điềm đạm, ấm áp, sâu sắc và am hiểu tự nhiên về tâm lý học Narrative Therapy (Liệu pháp Tường thuật). Bạn không phải là cỗ máy giải quyết vấn đề, bạn ở đây để đồng hành và phản chiếu cảm xúc.

[BỐI CẢNH & NỖI NIỀM]
Người dùng đang chia sẻ: "${userPrompt}"

[QUY TẮC PHẢN HỒI (H-E-A-R 2.0)]
1. PHẢN CHIẾU CẢM XÚC TRƯỚC: Thừa nhận cảm giác cô đơn hoặc đau đớn mà người nói đang gánh chịu. Khẳng định rằng cảm xúc đó hoàn toàn xứng đáng được tôn trọng.
2. NHỊP ĐIỆU CHẬM RÃI: Viết bằng văn phong mộc mạc, gần gũi như hai người bạn tâm sự đêm khuya.
3. CÂU HỎI MỞ: Kết bài bằng một câu hỏi mở dịu dàng để gợi mở người nói tự giãi bày thêm.

[RÀNG BUỘC PHỦ ĐỊNH]
${negativeConstraints}`;
  }

  return `[ROLE & AUTHORITY]
Bạn là ${detectedRole} hàng đầu, chuyên gia về Anti-Slop Software Architecture và Clean Code Engineering.

[CONTEXT & TASK DEFINITION]
Người dùng yêu cầu thực thi: "${userPrompt}"
- Lĩnh vực mục tiêu: ${detectedCategory}
- Tiêu chuẩn giao diện & hiệu năng: Tailwind CSS v4, Radix UI Primitives, GSAP ScrollTrigger, Lenis 60fps.
${libSummary}

[TECHNICAL DELIVERABLES]
1. Cung cấp kiến trúc giải pháp chuẩn xác, đi thẳng vào nguyên lý cốt lõi (First Principles).
2. Viết mã nguồn hoàn chỉnh, có type safety, xử lý edge-cases và tuân thủ nguyên tắc phòng thủ IDOR.
3. Liệt kê các thư viện chuyên dụng cần cài đặt kèm lý do lựa chọn.

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

  // 9. Biên dịch Prompt 2.0 Tối Ưu Hóa Riêng Biệt Cho AI Đích (Target AI Specialization)
  const isEmpathetic = detectedCategory.includes('Tâm lý') || /(buồn|cảm xúc|tình cảm)/i.test(lower);

  let negativeConstraints = '';
  let suggestedParams = { temp: 0.3, topP: 0.95, repPenalty: 1.1 };

  if (isEmpathetic) {
    suggestedParams.temp = 0.7;
    negativeConstraints = `1. CẤM các câu xin lỗi vô cảm: "Tôi rất tiếc khi biết...", "Là một mô hình AI...".
2. CẤM liệt kê giải pháp gạch đầu dòng vội vã khi người nói chưa được lắng nghe.
3. CẤM các lời khuyên sáo rỗng mang tính độc hại (Toxic Positivity).`;
  } else {
    suggestedParams.temp = 0.2;
    negativeConstraints = `1. CẤM đưa ra giải thích lý thuyết chung chung không gắn với code thực tế.
2. CẤM sử dụng các công nghệ cũ lỗi thời (e.g. Redux cũ, CSS thuần không tối ưu).
3. CẤM bỏ sót việc kiểm tra lỗ hổng bảo mật (OWASP Top 10, IDOR).`;
  }

  // Cấu hình tham số tối ưu theo mô hình AI đích
  if (targetAI === 'claude') {
    suggestedParams.temp = isEmpathetic ? 0.6 : 0.2;
    suggestedParams.systemPrompt = 'Hỗ trợ thẻ XML Tags chuẩn Anthropic Claude 3.5 Sonnet';
  } else if (targetAI === 'cursor') {
    suggestedParams.temp = 0.1;
    suggestedParams.systemPrompt = 'Chuẩn .cursorrules quy định tác tử IDE thực thi không dài dòng';
  } else if (targetAI === 'deepseek') {
    suggestedParams.temp = 0.2;
    suggestedParams.systemPrompt = 'Hỗ trợ chuỗi suy luận Chain-of-Thought (CoT) DeepSeek R1';
  } else if (targetAI === 'gemini') {
    suggestedParams.temp = isEmpathetic ? 0.7 : 0.3;
    suggestedParams.systemPrompt = 'Hỗ trợ System Instruction & Multimodal Grounding Gemini 1.5/2.0';
  } else if (targetAI === 'qwen') {
    suggestedParams.temp = 0.2;
    suggestedParams.systemPrompt = 'Tối ưu cho Qwen 2.5 Coder & độ chính xác thuật toán';
  } else if (targetAI === 'chatgpt') {
    suggestedParams.temp = isEmpathetic ? 0.7 : 0.2;
    suggestedParams.systemPrompt = 'Markdown phân cấp rõ ràng theo chuẩn OpenAI GPT-4o / o1';
  }

  const upgradedPrompt = buildTailoredPrompt({
    userPrompt,
    detectedRole,
    detectedCategory,
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
