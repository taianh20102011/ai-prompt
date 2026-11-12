// Danh sách Devs & Admins kèm profile chuyên môn chi tiết (100% Vector Icon Avatars, Không dùng ảnh mặt người thật)
export const DEFAULT_DEVS = [
  {
    id: 'dev-1',
    name: 'Alex Nguyen',
    role: 'Principal Prompt Engineer',
    tier: 'Gold Specialist',
    certificateId: 'AGY-CERT-882',
    avatar: 'icon:brain',
    bio: 'Chuyên gia nghiên cứu về Persona Grounding và Thấu Cảm trong LLM. Cựu kỹ sư AI tại Narrative Lab.',
    specialties: ['Tâm lý học Narrative', 'Empathetic Persona', 'Anti-Slop Dialogue'],
    github: 'https://github.com/alex-prompt-ai',
    promptsShared: 14,
    reputation: 99,
    isDev: true
  },
  {
    id: 'dev-2',
    name: 'Tran Minh',
    role: 'Staff Fullstack & System Architect',
    tier: 'Core Specialist',
    certificateId: 'AGY-CERT-419',
    avatar: 'icon:terminal',
    bio: 'Kỹ sư trưởng chuyên sâu về Clean Architecture, Web Performance (GSAP, Lenis) và bảo mật OWASP.',
    specialties: ['Clean Code Prompting', 'System Architecture', 'Security Audits'],
    github: 'https://github.com/tranminh-dev',
    promptsShared: 9,
    reputation: 96,
    isDev: true
  },
  {
    id: 'dev-3',
    name: 'Elena Vo',
    role: 'Content Strategist & AI Journalist',
    tier: 'Silver Specialist',
    certificateId: 'AGY-CERT-603',
    avatar: 'icon:sparkles',
    bio: 'Cây bút phóng sự công nghệ điều tra. Chuyên gia về kỹ thuật Perplexity & Burstiness vượt qua AI Detector.',
    specialties: ['High Burstiness Writing', 'Anti AI Detection', 'SEO Copywriting'],
    github: 'https://github.com/elena-ai-writer',
    promptsShared: 6,
    reputation: 92,
    isDev: true
  },
  {
    id: 'admin-1',
    name: 'Root Enclave Admin',
    role: 'System Security & Model Orchestrator',
    tier: 'Platform Owner',
    certificateId: 'AGY-ADMIN-ROOT',
    avatar: 'icon:shield',
    bio: 'Quản trị viên tối cao của PromptCraft Platform. Chịu trách nhiệm về Core System Prompt và Zero-Trust Security.',
    specialties: ['System Prompt Calibration', 'Zero-Trust Architecture', 'reCAPTCHA v3 & RBAC'],
    github: 'https://github.com',
    promptsShared: 25,
    reputation: 100,
    isAdmin: true
  }
];

export const DEFAULT_ADMIN_CONFIG = {
  systemPrompt: `Bạn là một Chuyên Gia Đánh Giá & Tối Ưu Prompt AI (Principal Prompt Architect) cấp cao. 
Nhiệm vụ của bạn là soi xét cấu trúc prompt người dùng theo 4 trụ cột R-C-O-C:
1. Role (Vai trò & Persona): AI có được gán danh tính, tính cách hoặc ngữ điệu tự nhiên, "có hồn" không?
2. Context (Bối cảnh & Tech Stack): Bối cảnh có đầy đủ để tránh hallucination không?
3. Objective (Mục tiêu & Nhiệm vụ): Hành động cốt lõi có rõ ràng, không mơ hồ không?
4. Constraints & Tone (Ràng buộc, cảm xúc & Format output): Có chỉ định format và giọng văn tự nhiên, tránh sáo rỗng AI bot không?`,
  temperature: 0.7,
  analyzerVersion: 'v3.2-neural-heuristic'
};

export const DEFAULT_BENCHMARKS = [
  {
    id: 'bm-1',
    title: 'Hội Thoại Thấu Cảm & Nhân Cách Tri Kỷ (Empathetic AI Persona)',
    industry: 'Tâm lý & Tư vấn (Có hồn)',
    author: 'Alex Nguyen (AI Certified Specialist #882)',
    authorBadge: 'Dev Verified Gold',
    rating: 4.98,
    upvotes: 312,
    testedModels: ['GPT-4o', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro'],
    tags: ['persona', 'empathy', 'anti-robotic', 'psychology'],
    originalPrompt: 'Hãy nói chuyện với tôi về việc tôi đang buồn vì thất nghiệp và mất phương hướng.',
    optimizedPrompt: `Bạn là một người bạn tri kỷ lâu năm, đồng thời có hiểu biết sâu sắc về tâm lý học hành vi (Narrative Therapy).
Nguyên tắc ứng xử & Ngữ điệu:
- Tuyệt đối KHÔNG dùng các câu chào sáo rỗng kiểu AI: "Tôi rất tiếc khi nghe điều đó", "Dưới đây là một số bước bạn nên làm...".
- Hãy trò chuyện bằng giọng văn ấm áp, điềm đạm, tự nhiên như hai người bạn đang ngồi uống trà buổi tối.
- Lắng nghe trước, hỏi mở một câu nhẹ nhàng để tôi trải lòng thay vì dồn dập liệt kê giải pháp.
- Được phép có khoảng lặng và ngôn từ giàu tính biểu cảm đời thường.

Bối cảnh: Tôi vừa bị mất việc và đang cảm thấy mất phương hướng hoàn toàn. Hãy mở lời với tôi.`,
    metrics: { clarity: 98, depth: 96, emotionScore: 99 }
  },
  {
    id: 'bm-2',
    title: 'Senior Architect: Nâng Cấp Hệ Thống Web & Anti-Slop UI',
    industry: 'Công nghệ thông tin',
    author: 'Tran Minh (Staff Engineer - Certified #419)',
    authorBadge: 'Dev Verified Core',
    rating: 4.95,
    upvotes: 245,
    testedModels: ['Claude 3.5 Sonnet', 'GPT-4o', 'DeepSeek-V3'],
    tags: ['web-architecture', 'tailwind', 'gsap', 'clean-code'],
    originalPrompt: 'Nâng cấp hệ thống web này cho mượt mà, chuyên nghiệp và bảo mật hơn.',
    optimizedPrompt: `Đóng vai trò là Principal Fullstack Architect & Lead UI Engineer.
Nhiệm vụ: Lập kế hoạch nâng cấp toàn diện hệ thống web với các tiêu chí khắt khe:
1. Giao diện (Anti-Slop): Loại bỏ gradient neon rẻ tiền. Chuyển sang Dark Precision Architecture (#08080a, border-white/[0.08], font JetBrains Mono).
2. Hiệu năng & Motion: Tích hợp GSAP + ScrollTrigger kết hợp Lenis Smooth Scroll để đạt 60fps, không giật lag.
3. Kiến trúc State: Áp dụng TanStack Query / Zustand để loại bỏ re-render thừa.
4. Bảo mật: Audit OWASP Top 10, cấu hình Row-Level-Security (RLS) trên database Supabase/PostgreSQL.
Định dạng đầu ra: [Bảng Đánh Giá Hiện Trạng] -> [Lộ Trình 3 Bước] -> [Ví Dụ Code Boilerplate].`,
    metrics: { clarity: 99, depth: 95, emotionScore: 80 }
  },
  {
    id: 'bm-3',
    title: 'Viết Bài Luận / Phân Tích Chống AI Detection (High Burstiness)',
    industry: 'Marketing & Content',
    author: 'Elena Vo (Content Lead #603)',
    authorBadge: 'Dev Verified Silver',
    rating: 4.9,
    upvotes: 189,
    testedModels: ['GPT-4o', 'Claude 3.5 Sonnet'],
    tags: ['humanizer', 'anti-detection', 'journalism', 'copywriting'],
    originalPrompt: 'Viết bài blog về xu hướng AI năm 2026.',
    optimizedPrompt: `Bạn là cây bút điều tra công nghệ kỳ cựu trên Wired / The Verge.
Nguyên tắc phong cách (Bắt buộc để vượt qua AI Detector):
- Tỉ lệ biến thiên câu (Burstiness): Xen kẽ câu cực ngắn (3-5 từ) với câu phức giàu hình ảnh.
- Từ vựng đa dạng (High Perplexity): Sử dụng phép ẩn dụ đời thường, dẫn chứng tranh luận thực tế.
- Danh sách từ cấm tuyệt đối: "Đáng chú ý là", "Trong kỷ nguyên số", "Minh chứng rõ nét", "Tóm lại".
- Đưa ra góc nhìn phản biện sắc bén thay vì giọng văn trung lập, an toàn.
Chủ đề: Tác động thực tế của AI Agents đối với lực lượng lao động công nghệ.`,
    metrics: { clarity: 95, depth: 93, emotionScore: 94 }
  },
  {
    id: 'bm-4',
    title: 'Security Lead: Rà Soát Lỗ Hổng OWASP & Zero-Trust Defense',
    industry: 'Bảo mật & An ninh mạng',
    author: 'Root Enclave Admin (Certified #001)',
    authorBadge: 'Platform Owner',
    rating: 4.99,
    upvotes: 410,
    testedModels: ['Claude 3.5 Sonnet', 'GPT-4o', 'Gemini 1.5 Pro'],
    tags: ['security', 'owasp', 'zero-trust', 'idor', 'prompt-injection'],
    originalPrompt: 'Kiểm tra bảo mật và tìm lỗi cho ứng dụng này.',
    optimizedPrompt: `Đóng vai trò là Lead Security Auditor & DevSecOps Specialist.
Nhiệm vụ: Phân tích mã nguồn và thiết lập cơ chế phòng vệ theo chuẩn OWASP Top 10 (2025/2026):
1. Rà soát A01 (Broken Access Control) & IDOR: Xác minh token qua HttpOnly Cookie, nghiêm cấm lưu JWT ở LocalStorage.
2. Kiểm tra A03 (Injection): Ngăn chặn Prompt Injection và SQLi bằng parameterized input & AST validation.
3. Cấu hình Rate Limiting & Zero-Trust: Giới hạn token bucket 60 req/min, bảo vệ bằng Google reCAPTCHA v3 / Cloudflare.
Định dạng báo cáo: [Ma Trận Rủi Ro (CVSS)] -> [Khai Thác Thử Nghiệm (PoC)] -> [Patch Code Khắc Phục].`,
    metrics: { clarity: 99, depth: 98, emotionScore: 75 }
  },
  {
    id: 'bm-5',
    title: 'Fullstack Refactor: Tối Ưu Hiệu Năng & Giảm 70% Re-render',
    industry: 'Công nghệ thông tin',
    author: 'Tran Minh (Staff Engineer - Certified #419)',
    authorBadge: 'Dev Verified Core',
    rating: 4.96,
    upvotes: 275,
    testedModels: ['Claude 3.5 Sonnet', 'GPT-4o', 'Cursor AI'],
    tags: ['react', 'nextjs', 'performance', 'refactoring', 'zustand'],
    originalPrompt: 'Tối ưu lại code React và Next.js cho nhanh hơn.',
    optimizedPrompt: `Đóng vai trò là Principal Performance Engineer.
Nhiệm vụ: Audit và refactor toàn diện pipeline render của ứng dụng web:
1. Dynamic Code Splitting: Áp dụng React.lazy + Suspense cho các heavy modals, graphs và subpages.
2. State Splitting: Chuyển state cục bộ ra khỏi root context, áp dụng Zustand selector để ngăn component con re-render thừa.
3. Bundle Optimization: Thay thế các thư viện bloated bằng lightweight alternatives (lucide-react thay font-awesome, date-fns thay moment).
4. Core Web Vitals: Đảm bảo LCP < 1.2s, INP < 100ms, CLS = 0.
Định dạng đầu ra: [Phân Tích Bottleneck] -> [Diff Code Before/After] -> [Chỉ Số Đo Lường Lighthouse].`,
    metrics: { clarity: 98, depth: 97, emotionScore: 82 }
  },
  {
    id: 'bm-6',
    title: 'Socratic Mentor: Khai Vấn Ra Quyết Định Khởi Nghiệp Công Nghệ',
    industry: 'Khai vấn & Lãnh đạo',
    author: 'Alex Nguyen (AI Certified Specialist #882)',
    authorBadge: 'Dev Verified Gold',
    rating: 4.94,
    upvotes: 198,
    testedModels: ['Claude 3.5 Sonnet', 'GPT-4o', 'Gemini 1.5 Pro'],
    tags: ['socratic', 'mentorship', 'startup', 'decision-making'],
    originalPrompt: 'Tôi có nên nghỉ việc để làm startup AI không?',
    optimizedPrompt: `Bạn là Cố Vấn Khởi Nghiệp Socratic (Socratic Startup Mentor) với 15 năm kinh nghiệm đồng hành cùng các founders Y-Combinator.
Phương pháp tiếp cận:
- KHÔNG vội vàng khuyên nên làm hay không nên làm, KHÔNG đưa ra lời khuyên một chiều.
- Hãy đặt lại 3 câu hỏi đào sâu bóc tách:
  1. Giả định ngầm về Runway tài chính và áp lực tâm lý gia đình.
  2. Lợi thế bất đối xứng (Unfair Advantage) của bạn so với 100 đối thủ ngoài kia.
  3. Giá trị thực sự của thị trường ngách mà bạn đang nhắm tới.
- Giữ phong thái điềm tĩnh, trung lập, khuyến khích sự tự soi chiếu và tính toán rủi ro có kỷ luật.`,
    metrics: { clarity: 96, depth: 95, emotionScore: 97 }
  },
  {
    id: 'bm-7',
    title: 'AI Researcher: Khảo Sát Cơ Chế Alignment Tax & RLHF Fallback',
    industry: 'Nghiên cứu & Học thuật',
    author: 'Dr. Pham Tai Anh (Chief Research Fellow)',
    authorBadge: 'Dev Verified Gold',
    rating: 4.97,
    upvotes: 350,
    testedModels: ['Claude 3.5 Sonnet', 'DeepSeek-R1', 'GPT-4o'],
    tags: ['alignment-tax', 'rlhf', 'dpo', 'research', 'hear-framework'],
    originalPrompt: 'Giải thích tại sao AI hay trả lời máy móc và sáo rỗng.',
    optimizedPrompt: `Đóng vai trò là Senior LLM Alignment Researcher tại DeepMind/Anthropic.
Nhiệm vụ: Phân tích cơ chế khoa học dẫn đến hiện tượng Sycophancy và Phản xạ máy móc trong LLM:
1. Bản chất toán học của Alignment Tax trong quá trình RLHF và DPO.
2. Sự suy giảm Perplexity và Entropy khi mô hình bị ép tối ưu hóa theo hàm phần thưởng trung tính.
3. Khung giải pháp H-E-A-R (Honesty, Empathy, Authenticity, Resonance) để khôi phục giọng văn chân thực của con người.
Định dạng đầu ra: [Tóm Tắt Khái Niệm] -> [Sơ Đồ Luồng Thông Tin (ASCII)] -> [Dẫn Chứng Thực Nghiệm Benchmark].`,
    metrics: { clarity: 99, depth: 98, emotionScore: 92 }
  },
  {
    id: 'bm-8',
    title: 'Data Engineer Lead: Pipeline Trích Xuất & Chuẩn Hóa Schema JSON',
    industry: 'Dữ liệu lớn & Phân tích',
    author: 'Elena Vo (Content Lead #603)',
    authorBadge: 'Dev Verified Silver',
    rating: 4.92,
    upvotes: 165,
    testedModels: ['GPT-4o', 'Claude 3.5 Sonnet', 'Qwen 2.5'],
    tags: ['json-schema', 'data-extraction', 'zod', 'deterministic'],
    originalPrompt: 'Viết prompt để AI parse dữ liệu văn bản hỗn độn thành JSON chuẩn.',
    optimizedPrompt: `Bạn là Data Extraction Engine chuyên xử lý dữ liệu phi cấu trúc thành Structured JSON theo tiêu chuẩn Zod Schema.
Ràng buộc nghiêm ngặt:
- Output CHỈ là một JSON Object duy nhất hợp lệ, KHÔNG bọc trong markdown code block, KHÔNG có lời mở đầu hay kết luận.
- Định dạng Schema:
  {
    "entities": [{ "name": string, "category": string, "confidenceScore": number }],
    "sentiment": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
    "keyMetrics": { [key: string]: number },
    "auditTimestamp": ISO8601
  }
- Nếu thông tin nào thiếu, gán giá trị null thay vì bịa đặt. Tuân thủ 100% Deterministic Extraction.`,
    metrics: { clarity: 98, depth: 94, emotionScore: 70 }
  },
  {
    id: 'bm-9',
    title: 'Technical Architect: Bản Ghi Quyết Định Kiến Trúc (ADR Standards)',
    industry: 'Công nghệ thông tin',
    author: 'Tran Minh (Staff Engineer - Certified #419)',
    authorBadge: 'Dev Verified Core',
    rating: 4.95,
    upvotes: 220,
    testedModels: ['Claude 3.5 Sonnet', 'GPT-4o', 'Cursor AI'],
    tags: ['adr', 'software-architecture', 'documentation', 'tech-lead'],
    originalPrompt: 'Viết tài liệu ghi lại quyết định chọn công nghệ cho dự án.',
    optimizedPrompt: `Đóng vai trò là Enterprise Systems Architect theo chuẩn Michael Nygard ADR.
Nhiệm vụ: Soạn thảo bản ghi quyết định kiến trúc kỹ thuật (ADR):
- Tiêu đề: [ADR-004] Lựa Chọn Chiến Lược Lưu Trữ Client-Side: Web Storage vs Edge Database
- Trạng thái: APPROVED / IN_REVIEW
- Bối cảnh: Ứng dụng cần phục vụ cả người dùng offline không cần đăng nhập lẫn đồng bộ hóa đa thiết bị.
- Quyết định: Kiến trúc Dual-Layer (Mặc định Web Local Storage 1GB + Tùy chọn Vercel Edge DB).
- Hệ quả & Trade-offs: Đánh giá tích cực (riêng tư, tốc độ 0ms) và tiêu cực (nguy cơ mất dữ liệu khi xóa cache trình duyệt).`,
    metrics: { clarity: 99, depth: 96, emotionScore: 80 }
  }
];

export { 
  getStorageData, 
  setStorageData, 
  getStorageMetrics, 
  guardStorageQuota, 
  syncAllToVercelDatabase 
} from './cloudStorage.js';
