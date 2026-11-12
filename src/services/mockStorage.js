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
  }
];

export { 
  getStorageData, 
  setStorageData, 
  getStorageMetrics, 
  guardStorageQuota, 
  syncAllToVercelDatabase 
} from './cloudStorage.js';
