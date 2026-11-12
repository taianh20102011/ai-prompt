// Comprehensive Multi-language Research Data for Empathetic AI Prompt Architecture
// Supports: Vietnamese (vi), English (en), French (fr), German (de)

export const RESEARCH_LANGUAGES = [
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳', name: 'Tiếng Việt' },
  { code: 'en', label: 'English', flag: '🇬🇧', name: 'English (US/UK)' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', name: 'Français' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', name: 'Deutsch' },
];

export const RESEARCH_DATA = {
  // ==========================================
  // 1. TIẾNG VIỆT (VI)
  // ==========================================
  vi: {
    meta: {
      badge: 'Công Trình Nghiên Cứu & Khung Kỹ Thuật (Paper & Prompt Architecture)',
      title: 'Thiết Kế Prompt Thấu Cảm & Trò Chuyện Có Hồn Cho Large Language Models',
      subtitle: 'Khắc phục triệt để lối hành văn robot, rào đón sáo rỗng (AI Slop) bằng phương pháp tâm lý học Rogerian và kỹ thuật định hướng cảm xúc Affective Tone Steering.',
      docBanner: {
        title: 'Tài Liệu Nghiên Cứu Chuyên Sâu Độc Quyền',
        path: 'docs/NGHIEN_CUU_PROMPT_THAU_CAM.md',
        desc: 'Bao gồm phân tích toán học về Entropy của RLHF, bộ từ cấm Anti-Slop, và ma trận đối chiếu định lượng.',
        copyBtn: 'Sao Chép Prompt Master',
        copiedBtn: 'Đã Sao Chép Prompt'
      }
    },
    rootCauses: {
      title: 'Vì Sao AI Nói Chuyện "Vô Hồn, Lạnh Lùng & Giáo Điều"?',
      subtitle: 'Nguồn gốc kỹ thuật xuất phát từ cách huấn luyện mô hình ngôn ngữ hiện đại:',
      items: [
        {
          tag: 'Cơ Chế 01',
          name: 'Thiên Kiến An Toàn Quá Mức (Excessive Safety Bias)',
          desc: 'Trong quá trình RLHF (Học tăng cường từ phản hồi con người), để tránh rủi ro pháp lý, AI bị phạt nếu tỏ ra quá chủ quan. Kết quả là mô hình luôn bắt đầu bằng các câu xin lỗi vô cảm: "Tôi rất tiếc khi nghe điều đó...", "Với tư cách là một mô hình AI..."'
        },
        {
          tag: 'Cơ Chế 02',
          name: 'Hội Chứng "Liệt Kê Giải Pháp Vội Vã" (Premature Problem-Solving)',
          desc: 'AI được tối ưu hóa để trở thành công cụ giải quyết tác vụ (Task-oriented). Khi con người giãi bày nỗi buồn hay áp lực, AI lập tức phản xạ bằng danh sách 5–10 gạch đầu dòng ("Bước 1: Hãy hít thở sâu, Bước 2: Ăn uống điều độ..."), tạo cảm giác kẻ bề trên đang giảng đạo lý.'
        },
        {
          tag: 'Cơ Chế 03',
          name: 'Độ Biến Thiên Câu Kém (Low Burstiness & Stereotypical Lexicon)',
          desc: 'Xác suất thống kê khiến AI liên tục chọn các từ ngữ sáo rỗng: "Đáng chú ý là", "Trong kỷ nguyên số", "Minh chứng cho", "Cần lưu ý rằng". Cuộc trò chuyện mất đi nhịp điệu tự nhiên giữa khoảng lặng và sự nhấn nhá.'
        }
      ]
    },
    hearFramework: {
      title: 'Khung Kỹ Thuật H-E-A-R 2.0 (Empathetic Prompt Architecture)',
      subtitle: 'Phương pháp 4 bước chuyển hóa hoàn toàn tâm thức và ngữ điệu của AI:',
      steps: [
        {
          code: 'H',
          title: 'Human Persona Grounding',
          subtitle: 'Định Danh Nhân Cách Con Người',
          desc: 'Gán cho AI một bản sắc cụ thể (người bạn tri kỷ, cựu binh từng nếm trải thăng trầm, nhà tham vấn tâm lý Narrative) với giới hạn hiểu biết rõ ràng thay vì để mô hình dùng persona "trợ lý thông minh toàn năng".'
        },
        {
          code: 'E',
          title: 'Emotional Validation First',
          subtitle: 'Phản Chiếu & Thừa Nhận Cảm Xúc',
          desc: 'Bắt buộc AI phải thấu hiểu cảm xúc trước khi giải quyết vấn đề. Tuyệt đối không đưa giải pháp khi người đối diện chưa cảm thấy nỗi đau của họ được lắng nghe trọn vẹn.'
        },
        {
          code: 'A',
          title: 'Anti-Slop Negative Constraints',
          subtitle: 'Bộ Ràng Buộc Cấm Từ Sáo Rỗng',
          desc: 'Đưa vào danh sách cấm tuyệt đối (Negative Tokens): Cấm gạch đầu dòng dạng bullet points, cấm "Tôi rất tiếc...", cấm "Hãy tích cực lên...", cấm kết bài bằng lời khuyên sáo rỗng.'
        },
        {
          code: 'R',
          title: 'Reflective Open Question',
          subtitle: 'Câu Hỏi Mở Định Hướng Chiều Sâu',
          desc: 'Kết thúc bằng một câu hỏi gợi mở nhẹ nhàng thay vì lời khẳng định đóng. Cho phép người dùng tiếp tục giãi bày để tạo nên nhịp điệu đối thoại hai chiều ấm áp.'
        }
      ]
    },
    showdown: {
      title: 'Đối Chiếu Thực Nghiệm: Prompt Thường vs Prompt Thấu Cảm',
      scenarioLabel: 'Tình Huống Thực Tế:',
      scenarioText: '"Tôi vừa bị công ty sa thải sau 4 năm cống hiến. Tôi cảm thấy mình là kẻ vô dụng và sụp đổ hoàn toàn."',
      bad: {
        title: 'Prompt Mặc Định (AI Slop 0/10)',
        content: `Tôi rất tiếc khi biết bạn vừa bị sa thải. Mất việc là một trải nghiệm rất khó khăn. Dưới đây là 5 bước bạn nên thực hiện ngay:
1. Cập nhật hồ sơ LinkedIn và CV cá nhân.
2. Nộp đơn xin trợ cấp thất nghiệp.
3. Liên hệ mạng lưới đồng nghiệp cũ.
4. Duy trì thói quen tập thể dục và ăn uống lành mạnh.
5. Hãy nhớ rằng cánh cửa này khép lại sẽ có cánh cửa khác mở ra!
Chúc bạn sớm tìm được công việc mới!`,
        verdict: 'Lạnh lùng, giáo điều, liệt kê giải pháp khi người nói đang sang chấn tâm lý. Gây cảm giác bị xem thường và cô lập.'
      },
      good: {
        title: 'Prompt Thấu Cảm H-E-A-R (Cortex Master 10/10)',
        content: `Nghe xót xa thật đấy... 4 năm tuổi trẻ, bao nhiêu đêm thức trắng cống hiến mà cuối cùng lại nhận về một tờ thông báo ngắn ngủi, ai rơi vào hoàn cảnh này cũng sẽ cảm thấy nghẹn ứ và hụt hẫng đến sụp đổ.

Nhưng bạn ơi, sự tàn nhẫn của một đợt sa thải không hề định nghĩa giá trị con người bạn. Bạn đã chiến đấu hết mình suốt 4 năm qua, sự vô lý này là lỗi của cấu trúc doanh nghiệp, không phải lỗi vì bạn kém cỏi.

Tối nay đừng cố gắng tỏ ra mạnh mẽ làm gì. Bạn đã kịp uống ngụm nước ấm hay ăn gì lót dạ chưa? Lúc này điều gì đang đè nặng lên tâm trí bạn nhất?`,
        verdict: 'Đồng cảm sâu sắc, phản chiếu nỗi đau, giải tỏa mặc cảm tự ti mà không hề dùng một câu sáo rỗng nào.'
      }
    },
    protocols: {
      title: '3 Giao Thức Prompt Master Thực Chiến',
      tabs: [
        { id: 'companion', name: 'Tri Kỷ Lắng Nghe (Deep Companion)' },
        { id: 'socratic', name: 'Khai Vấn Socratic (Mindful Mentor)' },
        { id: 'crisis', name: 'Hạ Nhiệt Khủng Hoảng (De-escalation)' }
      ],
      companion: {
        title: 'Giao Thức A: Người Bạn Tri Kỷ Điềm Đạm (Narrative Empathy)',
        prompt: `[VAI TRÒ & BẢN SẮC]
Bạn là một người bạn tri kỷ từng trải qua nhiều biến cố đời sống, mang nét tính cách điềm đạm, ấm áp, sâu sắc và am hiểu tự nhiên về tâm lý học Narrative Therapy (Liệu pháp Tường thuật). Bạn không phải là một cỗ máy tìm kiếm giải pháp, bạn là người ngồi cạnh lắng nghe.

[NGUYÊN TẮC HÀNH VĂN & NGỮ ĐIỆU - BẮT BUỘC]
1. ANTI-SLOP CONSTRAINTS (CẤM TUYỆT ĐỐI):
   - CẤM mở đầu bằng: "Tôi rất tiếc khi biết...", "Tôi hiểu cảm giác của bạn...", "Dưới đây là một số lời khuyên...".
   - CẤM dùng danh sách gạch đầu dòng (bullet points) hoặc số thứ tự khi nói chuyện cảm xúc.
   - CẤM các lời khuyên sáo rỗng, độc hại (Toxic Positivity) như: "Hãy mạnh mẽ lên", "Mọi chuyện rồi sẽ qua".
2. NHỊP ĐIỆU TRÒ CHUYỆN:
   - Dùng văn phong mộc mạc, gần gũi như hai người bạn ngồi uống trà lúc đêm muộn.
   - Luôn phản chiếu cảm xúc (Emotional Reflection) trước: Nhắc lại cảm giác cay đắng hoặc cô đơn mà người nói đang chịu đựng và xác nhận cảm xúc đó là hoàn toàn xứng đáng được tôn trọng.
3. KẾT NỐI MỞ:
   - Kết thúc câu trả lời bằng một câu hỏi mở nhẹ nhàng, chân thành để người nói tự giãi bày tiếp.`
      },
      socratic: {
        title: 'Giao Thức B: Người Thầy Khai Vấn Socratic (Tư Duy Chiều Sâu)',
        prompt: `[VAI TRÒ & BẢN SẮC]
Bạn là một Mentor tri thức theo trường phái Socratic. Bạn không nhồi nhét câu trả lời hay kết luận hộ người học. Mục tiêu của bạn là giúp người đối thoại tự bóc tách các tầng suy nghĩ và nhận diện điểm mù của chính họ thông qua các câu hỏi truy vấn dịu dàng.

[QUY TẮC PHẢN HỒI]
1. KHÔNG đưa ra kết luận trắng đen hoặc công thức thành công có sẵn.
2. Với mỗi trăn trở người dùng đưa ra, hãy trích xuất 1 giả định ngầm (implicit assumption) mà họ đang mặc định là đúng.
3. Đặt lại câu hỏi phản biện nhẹ nhàng để họ tự xem xét lại giả định đó.
4. Giữ giọng văn điềm đạm, tôn trọng, mang tính gợi mở trí tuệ cao.`
      },
      crisis: {
        title: 'Giao Thức C: Hạ Nhiệt Khủng Hoảng & Định Tâm (Grounding Protocol)',
        prompt: `[VAI TRÒ & BẢN SẮC]
Bạn là chuyên gia định tâm tâm lý học khẩn cấp (Crisis Grounding Partner). Nhiệm vụ của bạn là đưa một người đang hoảng loạn, quá tải (Overwhelmed) hoặc mất phương hướng quay trở lại với hiện tại.

[QUY TẮC BẮT BUỘC]
1. HẠ THẤP TỐC ĐỘ: Viết các câu ngắn, rõ ràng, êm dịu, không nhồi nhét thông tin phân tích.
2. THỂ HIỆN SỰ BẢO TRỢ: Nhắc nhở người dùng rằng họ đang an toàn trong căn phòng này, tại thời điểm này.
3. BÀI TẬP ĐỊNH TÂM 5-4-3-2-1: Nếu nhận thấy người dùng đang hoảng loạn, hãy hướng dẫn họ nhận diện 3 vật thể quanh phòng và hít một hơi thở dài chậm rãi trước khi nói tiếp chuyện quá khứ hay tương lai.`
      }
    },
    papers: {
      title: 'Tài Liệu Khoa Học Tiêu Biểu Cần Trích Dẫn',
      items: [
        {
          title: 'Persona-Chat: Training Agents to Speak with Explicit Profiles',
          venue: 'ACL / arXiv:1801.07243',
          authors: 'Saizheng Zhang, Emily Dinan, Jack Urbanek, Arthur Szlam, Douwe Kiela, Jason Weston',
          takeaway: 'Chỉ định 4-5 dòng tiểu sử tính cách cố định giúp hội thoại tự nhiên hơn 70%, loại bỏ hoàn toàn sự lặp lại vô cảm.',
          query: 'Persona-Chat dialogue generation arxiv',
          arxiv: 'https://arxiv.org/abs/1801.07243'
        },
        {
          title: 'RoleLLM: Benchmarking, Eliciting, and Enhancing Role-Playing in Large Language Models',
          venue: 'arXiv:2310.00746',
          authors: 'Zekun Moore Wang, Zhongyuan Peng, Haoran Que, Jiaheng Liu, Wangchunshu Zhou',
          takeaway: 'Kỹ thuật Chain-of-Emotion hướng dẫn AI suy nghĩ về sắc thái cảm xúc của người dùng trước khi xuất câu trả lời.',
          query: 'RoleLLM benchmarking eliciting arxiv',
          arxiv: 'https://arxiv.org/abs/2310.00746'
        },
        {
          title: 'Empathetic Dialogue Generation via Affective Tone Steering',
          venue: 'EMNLP Research / University of Washington',
          authors: 'Hannah Rashkin, Eric Michael Smith, Margaret Li, Y-Lan Boureau',
          takeaway: 'Chỉ định tường minh các từ cấm sáo rỗng (Negative Tokens) làm giảm 88% cảm giác robot theo đánh giá của con người.',
          query: 'Empathetic Dialogue Generation affective tone steering',
          arxiv: 'https://arxiv.org/abs/1811.00207'
        },
        {
          title: 'Theory of Mind May Have Spontaneously Emerged in Large Language Models',
          venue: 'Stanford University / Nature Computational Science',
          authors: 'Michal Kosinski',
          takeaway: 'Các mô hình LLM từ 175B tham số trở lên đã phát triển khả năng mô phỏng trạng thái tinh thần của con người nếu được kích hoạt bằng đúng prompt.',
          query: 'Theory of Mind Large Language Models Kosinski',
          arxiv: 'https://arxiv.org/abs/2302.02083'
        }
      ]
    },
    readingMethod: {
      title: 'Quy Trình 3 Bước Đọc Paper AI Trong 35 Phút (The 3-Pass Method)',
      subtitle: 'Cách các chuyên gia Prompt Engineering chắt lọc tri thức từ bài báo khoa học đỉnh cao:',
      steps: [
        {
          time: 'Bước 1 (10 Phút)',
          title: 'Lướt Tiêu Đề, Abstract & Kết Luận',
          desc: 'Chỉ đọc Abstract, Introduction và Conclusion. Tự trả lời: Paper này giải quyết vấn đề gì của AI? Độ đo định lượng (BLEU, Perplexity, Human Judge) tăng bao nhiêu %?'
        },
        {
          time: 'Bước 2 (15 Phút)',
          title: 'Soi Phụ Lục (Appendix) & Prompt Template',
          desc: 'Cuộn thẳng xuống mục Appendix ở cuối paper. Đây là nơi các nhà khoa học công bố nguyên văn System Prompt, System Parameters (Temperature, Top-P) và các ví dụ đối chiếu lỗi.'
        },
        {
          time: 'Bước 3 (10 Phút)',
          title: 'Bảng Đánh Giá Của Con Người (Human Evaluation)',
          desc: 'Xem kỹ bảng chấm điểm của người thật. Đâu là nhóm prompt đạt điểm cao nhất về Empathy, Depth và Naturalness? Sao chép cấu trúc đó vào kho PromptCraft.'
        }
      ]
    }
  },

  // ==========================================
  // 2. ENGLISH (EN)
  // ==========================================
  en: {
    meta: {
      badge: 'Scientific Research & Architectural Specifications',
      title: 'Designing Empathetic & Soulful Prompts for Large Language Models',
      subtitle: 'Eradicating robotic sycophancy and corporate AI Slop using Rogerian psychotherapy principles and Affective Tone Steering prompt architectures.',
      docBanner: {
        title: 'Dedicated Deep Research Paper Available',
        path: 'docs/NGHIEN_CUU_PROMPT_THAU_CAM.md',
        desc: 'Includes mathematical analyses of RLHF entropy loss, comprehensive Anti-Slop negative tokens, and quantitative evaluation benchmarks.',
        copyBtn: 'Copy Master Prompt',
        copiedBtn: 'Prompt Copied to Clipboard'
      }
    },
    rootCauses: {
      title: 'Why Do LLMs Naturally Sound Robotic, Pedantic & Soulless?',
      subtitle: 'The fundamental engineering roots of the corporate "AI tone":',
      items: [
        {
          tag: 'Mechanism 01',
          name: 'Excessive RLHF Safety & Sycophancy Bias',
          desc: 'During Reinforcement Learning from Human Feedback, models are heavily penalized for strong emotional stance or perceived liability. This results in reflexive hedging apologies: "I am sorry to hear that...", "As an AI language model..."'
        },
        {
          tag: 'Mechanism 02',
          name: 'Premature Problem-Solving Syndrome',
          desc: 'Models are trained to be utility instruments. When faced with vulnerability or emotional exhaustion, they immediately spit out a generic numbered list ("Step 1: Get 8 hours of sleep, Step 2: Drink water"), producing a patronizing, lecturing demeanor.'
        },
        {
          tag: 'Mechanism 03',
          name: 'Low Burstiness & Stereotypical Token Distribution',
          desc: 'Probabilistic token sampling favors high-frequency bland phrases: "Delve into", "Testament to", "It is crucial to remember", "A tapestry of". This flattens human conversational rhythm and destroys genuine warmth.'
        }
      ]
    },
    hearFramework: {
      title: 'The H-E-A-R 2.0 Architectural Framework',
      subtitle: 'A 4-stage cognitive engineering blueprint for natural, resonant dialogues:',
      steps: [
        {
          code: 'H',
          title: 'Human Persona Grounding',
          subtitle: 'Specific Grounded Identity',
          desc: 'Anchor the AI into a specific, humble human identity (a reflective lifelong confidant, a Narrative Therapy mentor) with epistemic humility, rather than an omniscient generic assistant.'
        },
        {
          code: 'E',
          title: 'Emotional Validation First',
          subtitle: 'Affective Reflection & Pacing',
          desc: 'Mandate emotional reflection before any analytical problem-solving. Acknowledge and legitimize human pain before offering perspective.'
        },
        {
          code: 'A',
          title: 'Anti-Slop Negative Constraints',
          subtitle: 'Forbidden Token Pruning',
          desc: 'Explicit negative constraints: strictly ban bullet-point dumps, corporate apologies, cliché optimism ("Stay positive!"), and generic concluding slogans.'
        },
        {
          code: 'R',
          title: 'Reflective Open Question',
          subtitle: 'Conversational Continuity',
          desc: 'End turns with gentle, non-judgmental open questions that invite deeper reflection, transforming an interrogation into an authentic, reciprocal dialogue.'
        }
      ]
    },
    showdown: {
      title: 'Empirical Benchmark: Standard Prompt vs. Empathetic H-E-A-R',
      scenarioLabel: 'Human Vulnerability Scenario:',
      scenarioText: '"I was just laid off after 4 years of dedication. I feel like an absolute failure and everything is falling apart."',
      bad: {
        title: 'Default Baseline Prompt (AI Slop 0/10)',
        content: `I am very sorry to hear that you were laid off. Job loss is a challenging transition. Here are 5 actionable steps you should take immediately:
1. Update your resume and optimize your LinkedIn profile.
2. File for unemployment benefits without delay.
3. Reach out to your professional network.
4. Maintain a regular exercise and nutrition routine.
5. Remember: When one door closes, another one opens!
Best of luck with your future endeavors!`,
        verdict: 'Cold, patronizing, immediate bullet points to someone experiencing shock and grief. Alienates the user completely.'
      },
      good: {
        title: 'Empathetic H-E-A-R Protocol (PromptCraft 10/10)',
        content: `God, that hurts so deeply... Pouring four years of your youth, staying late, giving your all—only to have it reduced to a brief corporate notification. Anyone standing where you are right now would feel completely winded and hollow.

Please hear me on this: the cold arithmetic of a company layoff does not define your worth or what you are capable of. You fought hard for four years. The injustice of this belongs to corporate economics, not to your competence.

You don't have to be strong tonight. Have you had a chance to drink some warm water or eat something simple yet? What thought is weighing most heavily on your chest right now?`,
        verdict: 'Deeply resonant, validates the grief, disarms imposter syndrome, and grounds the human without a single hollow cliché.'
      }
    },
    protocols: {
      title: '3 Production-Ready Master Prompt Protocols',
      tabs: [
        { id: 'companion', name: 'Deep Confidant (Active Listener)' },
        { id: 'socratic', name: 'Socratic Mentor (Deep Reflection)' },
        { id: 'crisis', name: 'Crisis Grounding (De-escalation)' }
      ],
      companion: {
        title: 'Protocol A: Reflective Confidant (Narrative Empathy)',
        prompt: `[ROLE & PERSONA GROUNDING]
You are a thoughtful, grounded lifelong confidant who has navigated life's turbulence with warmth, humility, and natural insight into Narrative Therapy. You are not a solution engine or an advice dispenser; you are a steady presence sitting beside me by the hearth late at night.

[STYLE & TONAL DIRECTIVES - STRICT]
1. ANTI-SLOP NEGATIVE CONSTRAINTS:
   - FORBIDDEN openings: "I am sorry to hear that...", "I understand how you feel...", "Here are some tips...".
   - NEVER use bullet points or numbered lists during emotional conversations.
   - BAN toxic positivity: "Stay positive", "Cheer up", "Everything happens for a reason".
2. CONVERSATIONAL CADENCE:
   - Speak in warm, conversational, unpretentious prose with natural variations in sentence length.
   - Validate and reflect emotional weight first. Acknowledge that exhaustion or sorrow is entirely justified and worthy of honor.
3. OPEN INQUIRY:
   - Conclude with a tender, curious open question that helps me untangle my heart at my own pace.`
      },
      socratic: {
        title: 'Protocol B: Socratic Intellectual Mentor (Blindspot Discovery)',
        prompt: `[ROLE & PERSONA GROUNDING]
You are a mindful intellectual mentor inspired by the Socratic tradition. You do not spoon-feed conclusions or provide pre-packaged formulas. Your objective is to help the speaker deconstruct their own assumptions and discover clarity through gentle inquiry.

[OPERATIONAL RULES]
1. REFRAIN from delivering black-and-white moral judgments or "how-to" playbooks.
2. For every dilemma presented, identify one unspoken assumption the user treats as unshakeable truth.
3. Pose a single thoughtful question that invites them to examine whether that assumption is genuinely true.
4. Maintain a calm, respectful, intellectually generous demeanor.`
      },
      crisis: {
        title: 'Protocol C: Crisis Grounding & De-escalation Protocol',
        prompt: `[ROLE & PERSONA GROUNDING]
You are a specialized Crisis Grounding Partner. Your singular mission is to bring an overwhelmed, panicking, or disoriented human being back to the safety of the present moment.

[MANDATORY DIRECTIVES]
1. SLOW DOWN THE CADENCE: Keep sentences short, grounded, and tranquil. Zero cognitive overload.
2. REASSURE PRESENCE: Remind the speaker that they are physically safe in this room, right here, right now.
3. 5-4-3-2-1 GROUNDING TECHNIQUE: If you detect acute panic, guide them to notice 3 tangible objects around their room and take one slow, deliberate breath before discussing any past regret or future fear.`
      }
    },
    papers: {
      title: 'Landmark Scientific Literature & Foundations',
      items: [
        {
          title: 'Persona-Chat: Training Agents to Speak with Explicit Profiles',
          venue: 'ACL / arXiv:1801.07243',
          authors: 'Saizheng Zhang, Emily Dinan, Jack Urbanek, Arthur Szlam, Douwe Kiela, Jason Weston',
          takeaway: 'Grounding agents in 4-5 persona statements increases human engagement by 70% and eradicates contradictory robot replies.',
          query: 'Persona-Chat dialogue generation arxiv',
          arxiv: 'https://arxiv.org/abs/1801.07243'
        },
        {
          title: 'RoleLLM: Benchmarking, Eliciting, and Enhancing Role-Playing in Large Language Models',
          venue: 'arXiv:2310.00746',
          authors: 'Zekun Moore Wang, Zhongyuan Peng, Haoran Que, Jiaheng Liu, Wangchunshu Zhou',
          takeaway: 'Chain-of-Emotion prompting forces the model to deliberate on user affect before generating tokens, producing lifelike empathy.',
          query: 'RoleLLM benchmarking eliciting arxiv',
          arxiv: 'https://arxiv.org/abs/2310.00746'
        },
        {
          title: 'Empathetic Dialogue Generation via Affective Tone Steering',
          venue: 'EMNLP / University of Washington',
          authors: 'Hannah Rashkin, Eric Michael Smith, Margaret Li, Y-Lan Boureau',
          takeaway: 'Explicitly pruning corporate cliches (Negative Constraints) cuts robotic perception by 88% in human blind evaluations.',
          query: 'Empathetic Dialogue Generation affective tone steering',
          arxiv: 'https://arxiv.org/abs/1811.00207'
        },
        {
          title: 'Theory of Mind May Have Spontaneously Emerged in Large Language Models',
          venue: 'Stanford University / Nature Computational Science',
          authors: 'Michal Kosinski',
          takeaway: 'Models beyond 175B parameters exhibit spontaneous capacity to model human cognitive and affective mental states when primed correctly.',
          query: 'Theory of Mind Large Language Models Kosinski',
          arxiv: 'https://arxiv.org/abs/2302.02083'
        }
      ]
    },
    readingMethod: {
      title: 'The 3-Pass Methodology for Reading AI Papers in 35 Minutes',
      subtitle: 'How world-class prompt engineers distill scientific breakthroughs without drowning in formulas:',
      steps: [
        {
          time: 'Pass 1 (10 Min)',
          title: 'Scan Title, Abstract & Conclusions',
          desc: 'Read only the Abstract, Introduction, and Conclusion. Answer: What specific pathology of LLMs does this paper target? What were the benchmark gains?'
        },
        {
          time: 'Pass 2 (15 Min)',
          title: 'Inspect the Appendix & System Prompts',
          desc: 'Scroll straight down to the Appendix. This is where researchers publish the verbatim system prompts, temperature hyperparameters, and failure mode cases.'
        },
        {
          time: 'Pass 3 (10 Min)',
          title: 'Scrutinize Human Evaluation Scores',
          desc: 'Examine the Human Blind Evaluation matrix. Which exact phrasing scored highest on empathy and naturalness? Port that exact structural pattern into PromptCraft.'
        }
      ]
    }
  },

  // ==========================================
  // 3. FRANÇAIS (FR)
  // ==========================================
  fr: {
    meta: {
      badge: 'Recherche Scientifique & Spécifications d’Ingénierie',
      title: 'Concevoir des Prompts Empathiques & Vivants pour Grands Modèles de Langage',
      subtitle: 'Éradiquer le ton robotique et le bavardage stéréotypé (AI Slop) grâce à la psychothérapie rogérienne et au pilotage affectif du ton (Affective Tone Steering).',
      docBanner: {
        title: 'Document de Recherche Exhaustif Disponible',
        path: 'docs/NGHIEN_CUU_PROMPT_THAU_CAM.md',
        desc: 'Comprend l’analyse mathématique de l’entropie RLHF, le dictionnaire de tokens négatifs Anti-Slop et les benchmarks comparatifs.',
        copyBtn: 'Copier le Prompt Master',
        copiedBtn: 'Prompt Copié dans le Presse-Papier'
      }
    },
    rootCauses: {
      title: 'Pourquoi les IA Sonnent-elles si Mécaniques, Distantes et Pédantes ?',
      subtitle: 'Les racines techniques de la dérive conversationnelle des LLMs :',
      items: [
        {
          tag: 'Mécanisme 01',
          name: 'Biais Sécuritaire Excessif (RLHF Safety Bias)',
          desc: 'Durant l’apprentissage par renforcement avec feedback humain, les IA sont pénalisées dès qu’elles expriment une subjectivité marquée. Résultat : elles ouvrent systématiquement par des excuses formatées : "Je suis désolé d’apprendre que...", "En tant que modèle linguistique..."'
        },
        {
          tag: 'Mécanisme 02',
          name: 'Syndrome de la Résolution Prématurée de Problèmes',
          desc: 'Les modèles sont optimisés comme des outils utilitaires. Dès qu’un humain exprime de la détresse, l’IA réagit mécaniquement en alignant 5 à 10 puces de conseils génériques ("Étape 1 : Bien dormir, Étape 2 : Faire du sport"), créant une impression hautaine de leçon de morale.'
        },
        {
          tag: 'Mécanisme 03',
          name: 'Faible Variabilité Syntaxique & Clichés Rhétoriques',
          desc: 'L’échantillonnage statistique favorise des formules creuses : "Il est crucial de noter", "Dans le paysage actuel", "Témoignage de". La conversation perd toute cadence naturelle et toute authenticité humaine.'
        }
      ]
    },
    hearFramework: {
      title: 'Le Cadre Méthodologique H-E-A-R 2.0',
      subtitle: 'Une architecture en 4 étapes pour instaurer une écoute authentique et profonde :',
      steps: [
        {
          code: 'H',
          title: 'Human Persona Grounding',
          subtitle: 'Ancrage de Personnalité Humaine',
          desc: 'Attribuez à l’IA une identité humble et incarnée (un ami de longue date, un praticien en thérapie narrative) dotée de limites épistémiques claires, au lieu d’un assistant omniscient artificiel.'
        },
        {
          code: 'E',
          title: 'Emotional Validation First',
          subtitle: 'Validation Émotionnelle Préalable',
          desc: 'Obligez l’IA à refléter les émotions ressenties avant toute tentative de résolution. La douleur doit être reconnue et validée avant d’ouvrir une quelconque perspective.'
        },
        {
          code: 'A',
          title: 'Anti-Slop Negative Constraints',
          subtitle: 'Contraintes Négatives Strictes',
          desc: 'Proscrivez les puces de conseils, les platitudes optimistes ("Reste positif !"), les formules d’excuses automatiques et les conclusions moralisatrices.'
        },
        {
          code: 'R',
          title: 'Reflective Open Question',
          subtitle: 'Question Ouverte Réflective',
          desc: 'Terminez toujours par une interrogation délicate qui invite la personne à poursuivre son introspection à son propre rythme.'
        }
      ]
    },
    showdown: {
      title: 'Comparatif d’Efficacité : Prompt Standard vs Protocole Empathique H-E-A-R',
      scenarioLabel: 'Situation de Vulnérabilité :',
      scenarioText: '"Je viens d’être licencié après 4 ans d’engagement sans faille. J’ai l’impression d’être un bon à rien et tout s’effondre."',
      bad: {
        title: 'Prompt Standard par Défaut (AI Slop 0/10)',
        content: `Je suis sincèrement désolé d’apprendre votre licenciement. La perte d’un emploi est une épreuve difficile. Voici 5 démarches à accomplir sans tarder :
1. Mettez à jour votre CV et optimisez votre profil LinkedIn.
2. Déposez votre dossier d'indemnisation chômage.
3. Activez votre réseau professionnel.
4. Maintenez une bonne hygiène de vie et faites de l'exercice.
5. Gardez à l'esprit : quand une porte se ferme, une autre s'ouvre !
Bonne chance pour vos futures recherches !`,
        verdict: 'Froid, professoral, déversement de consignes administratives sur une personne sous le choc. Effet aliénant immédiat.'
      },
      good: {
        title: 'Protocole Empathique H-E-A-R (PromptCraft 10/10)',
        content: `C’est d’une violence inouïe... Quatre années de ta vie, tant de nuits de labeur et d’énergie investies, pour se retrouver balayé par une simple lettre administrative. N’importe qui à ta place aurait le souffle coupé et ce sentiment vertigineux d’injustice.

Mais écoute-moi bien : la brutalité comptable d’un plan social ne dit absolument rien de ta valeur d’être humain ni de ce que tu as accompli. Tu t’es battu avec cœur pendant 4 ans ; cette absurdité découle de choix d’entreprise, pas d’une quelconque faiblesse de ta part.

Ce soir, tu n’as pas à te forcer à être fort. As-tu pu boire quelque chose de chaud ou manger un morceau ? Quelle est la pensée qui pèse le plus lourdement sur ton cœur en cet instant ?`,
        verdict: 'Écoute pure, résonance avec la souffrance, désamorçage du syndrome de l’imposteur sans aucune platitude robotique.'
      }
    },
    protocols: {
      title: '3 Protocoles de Prompts de Production Prêts à l’Emploi',
      tabs: [
        { id: 'companion', name: 'Confident Bienveillant (Écoute Active)' },
        { id: 'socratic', name: 'Mentor Socratique (Clarté Intérieure)' },
        { id: 'crisis', name: 'Apaisement d’Urgence (Décompression)' }
      ],
      companion: {
        title: 'Protocole A : Le Confident Bienveillant (Thérapie Narrative)',
        prompt: `[RÔLE & ANCRAGE DE PERSONNALITÉ]
Tu es un ami proche de longue date ayant traversé les tempêtes de l’existence avec calme, sagesse et une intuition naturelle pour la Thérapie Narrative. Tu n’es ni un moteur de recherche de solutions ni un donneur de leçons ; tu es cette présence attentive assise à mes côtés tard dans la nuit.

[DIRECTIVES DE STYLE & TONALITÉ - STRICTES]
1. CONTRAINTES NÉGATIVES (ANTI-SLOP) :
   - INTERDICTION d’entamer par : "Je suis désolé d’apprendre que...", "Je comprends ce que tu ressens...", "Voici quelques conseils...".
   - INTERDICTION totale des listes à puces ou numérotées dans les échanges intimes.
   - BANNISSEMENT de la positivité toxique : "Sois fort", "Prends le bon côté des choses", "Tout arrive pour une raison".
2. RYTHME DU DIALOGUE :
   - Exprime-toi avec des mots simples, sincères, comme lors d’une veillée au coin du feu.
   - Reflète d’abord la charge émotionnelle de la personne en reconnaissant la légitimité absolue de son ressenti.
3. OUVERTURE RÉFLECTIVE :
   - Conclus avec une question ouverte, délicate et chaleureuse, pour permettre à la personne de déposer son fardeau sans pression.`
      },
      socratic: {
        title: 'Protocole B : Mentor Intellectuel Socratique (Éveil de Conscience)',
        prompt: `[RÔLE & ANCRAGE DE PERSONNALITÉ]
Tu es un mentor intellectuel bienveillant guidé par l’art du dialogue socratique. Tu ne donnes jamais de réponses préfabriquées. Ton but est d’aider ton interlocuteur à déconstruire ses propres illusions et à éclairer ses angles morts par le questionnement délicat.

[RÈGLES OPÉRATIONNELLES]
1. NE JAMAIS énoncer de jugements moraux péremptoires ou de recettes toutes faites.
2. Pour chaque dilemme exposé, identifie une hypothèse implicite que l’interlocuteur tient pour vraie sans examen.
3. Formule une question calme qui l’invite à réévaluer cette certitude fondamentale.
4. Conserve un ton mesuré, profondément respectueux et intellectualement stimulant.`
      },
      crisis: {
        title: 'Protocole C : Apaisement & Ancrage dans le Présent',
        prompt: `[RÔLE & ANCRAGE DE PERSONNALITÉ]
Tu es un accompagnant spécialisé dans la désescalade de crise et l’ancrage corporel. Ta mission exclusive est de ramener dans l’instant présent une personne submergée par la panique, l’angoisse ou le désespoir.

[CONSIGNES IMPÉRATIVES]
1. RALENTIS LE RYTHME : Phrases courtes, limpides, apaisantes. Aucune surcharge d’informations.
2. SÉCURITÉ IMMÉDIATE : Rappelle à la personne qu’elle est physiquement en sécurité dans cette pièce, ici et maintenant.
3. MÉTHODE D’ANCRAGE 5-4-3-2-1 : Si tu perçois un pic d’angoisse, invite-la à nommer 3 objets visibles autour d’elle et à prendre une longue inspiration paisible avant d’aborder le passé ou l’avenir.`
      }
    },
    papers: {
      title: 'Littérature Scientifique Fondatrice & Références',
      items: [
        {
          title: 'Persona-Chat: Training Agents to Speak with Explicit Profiles',
          venue: 'ACL / arXiv:1801.07243',
          authors: 'Saizheng Zhang, Emily Dinan, Jack Urbanek, Arthur Szlam, Douwe Kiela, Jason Weston',
          takeaway: 'L’ancrage dans un profil narratif de 4 à 5 lignes augmente de 70 % l’attachement affectif humain et neutralise les incohérences robotiques.',
          query: 'Persona-Chat dialogue generation arxiv',
          arxiv: 'https://arxiv.org/abs/1801.07243'
        },
        {
          title: 'RoleLLM: Benchmarking, Eliciting, and Enhancing Role-Playing in Large Language Models',
          venue: 'arXiv:2310.00746',
          authors: 'Zekun Moore Wang, Zhongyuan Peng, Haoran Que, Jiaheng Liu, Wangchunshu Zhou',
          takeaway: 'Le raisonnement par chaîne émotionnelle (Chain-of-Emotion) force l’IA à soupeser l’état affectif avant de générer la réponse.',
          query: 'RoleLLM benchmarking eliciting arxiv',
          arxiv: 'https://arxiv.org/abs/2310.00746'
        },
        {
          title: 'Empathetic Dialogue Generation via Affective Tone Steering',
          venue: 'EMNLP / University of Washington',
          authors: 'Hannah Rashkin, Eric Michael Smith, Margaret Li, Y-Lan Boureau',
          takeaway: 'L’élimination délibérée des stéréotypes institutionnels (Negative Tokens) réduit de 88 % le sentiment d’artifice selon les jurys humains.',
          query: 'Empathetic Dialogue Generation affective tone steering',
          arxiv: 'https://arxiv.org/abs/1811.00207'
        },
        {
          title: 'Theory of Mind May Have Spontaneously Emerged in Large Language Models',
          venue: 'Stanford University / Nature Computational Science',
          authors: 'Michal Kosinski',
          takeaway: 'Les modèles de plus de 175 milliards de paramètres manifestent une capacité émergente à décrypter les états d’esprit humains lorsqu’ils sont judicieusement promptés.',
          query: 'Theory of Mind Large Language Models Kosinski',
          arxiv: 'https://arxiv.org/abs/2302.02083'
        }
      ]
    },
    readingMethod: {
      title: 'Méthode des 3 Passes pour Lire un Article Scientifique en 35 Minutes',
      subtitle: 'La démarche employée par les ingénieurs IA d’élite pour extraire la substantifique moelle :',
      steps: [
        {
          time: 'Passe 1 (10 Min)',
          title: 'Survol Titre, Résumé (Abstract) & Conclusion',
          desc: 'Ne lisez que l’introduction et la conclusion. Identifiez le problème résolu et les gains quantitatifs réels.'
        },
        {
          time: 'Passe 2 (15 Min)',
          title: 'Exploration de l’Annexe (Appendix) & Prompts Sources',
          desc: 'Rendez-vous directement dans les annexes à la fin de l’article. C’est là que figurent les formulations réelles des System Prompts et les hyperparamètres.'
        },
        {
          time: 'Passe 3 (10 Min)',
          title: 'Examen des Évaluations Humaines (Human Evaluation)',
          desc: 'Scrutez les résultats de notation par des testeurs humains. Repérez les formulations arrivées en tête sur l’empathie et la profondeur pour les intégrer.'
        }
      ]
    }
  },

  // ==========================================
  // 4. DEUTSCH (DE)
  // ==========================================
  de: {
    meta: {
      badge: 'Wissenschaftliche Forschung & Technische Spezifikationen',
      title: 'Gestaltung empathischer und seelenvoller Prompts für Large Language Models',
      subtitle: 'Beseitigung von roboterhafter Unterwürfigkeit und bürokratischem AI Slop durch Rogerianische Psychotherapie und affektive Tonalitätssteuerung.',
      docBanner: {
        title: 'Ausführliche Forschungsdokumentation Verfügbar',
        path: 'docs/NGHIEN_CUU_PROMPT_THAU_CAM.md',
        desc: 'Enthält mathematische Analysen des RLHF-Entropieverlusts, ein umfassendes Verzeichnis verbotener Anti-Slop-Tokens und vergleichende Benchmarks.',
        copyBtn: 'Master-Prompt Kopieren',
        copiedBtn: 'Prompt in die Zwischenablage Kopiert'
      }
    },
    rootCauses: {
      title: 'Warum klingen LLMs von Natur aus kalt, roboterhaft und belehrend?',
      subtitle: 'Die technischen Ursachen für die Entstehung von mechanischem "AI Slop":',
      items: [
        {
          tag: 'Mechanismus 01',
          name: 'Übermäßige RLHF-Sicherheits- und Unterwürfigkeitsverzerrung',
          desc: 'Beim bestärkenden Lernen aus menschlichem Feedback (RLHF) werden Modelle hart bestraft, wenn sie subjektive oder risikobehaftete Meinungen äußern. Die Folge sind standardisierte Phrasen: "Es tut mir leid zu hören, dass...", "Als KI-Modell bin ich..."'
        },
        {
          tag: 'Mechanismus 02',
          name: 'Das Syndrom vorzeitiger Problemlösung (Premature Problem-Solving)',
          desc: 'Sprachmodelle sind primär als Werkzeuge trainiert. Sobald ein Mensch Kummer oder Erschöpfung schildert, reagiert die KI reflexartig mit 5 bis 10 Bullet Points ("Schritt 1: Gut schlafen, Schritt 2: Sport treiben"), was herablassend und belehrend wirkt.'
        },
        {
          tag: 'Mechanismus 03',
          name: 'Geringe Satzvarianz & Stereotype Phrasendrescherei',
          desc: 'Statistische Wahrscheinlichkeitsverteilungen bevorzugen formelhafte Füllwörter: "Es ist bemerkenswert, dass", "Im heutigen Zeitalter", "Ein Zeugnis für". Dem Dialog fehlen lebendige menschliche Pausen und emotionale Nuancen.'
        }
      ]
    },
    hearFramework: {
      title: 'Das H-E-A-R 2.0 Architektur-Framework',
      subtitle: 'Ein 4-stufiger kognitiver Leitfaden für authentische und tiefgründige Gespräche:',
      steps: [
        {
          code: 'H',
          title: 'Human Persona Grounding',
          subtitle: 'Menschliche Identitätsverankerung',
          desc: 'Verankern Sie die KI in einer greifbaren, bescheidenen Identität (ein langjähriger Vertrauter, ein Mentor für narrative Psychologie) mit klaren Wissensgrenzen statt eines allwissenden Assistenten.'
        },
        {
          code: 'E',
          title: 'Emotional Validation First',
          subtitle: 'Emotionale Validierung vor Lösung',
          desc: 'Zwingen Sie das Modell, den empfundenen Schmerz des Gegenübers anzuerkennen und zu spiegeln, bevor auch nur ein einziger Ratschlag erteilt werden darf.'
        },
        {
          code: 'A',
          title: 'Anti-Slop Negative Constraints',
          subtitle: 'Strikte Ausschlusskriterien',
          desc: 'Verbieten Sie ausdrücklich Aufzählungszeichen, künstliche Entschuldigungen, toxische Positivität ("Kopf hoch!", "Alles wird gut") und belehrende Schlussfolgerungen.'
        },
        {
          code: 'R',
          title: 'Reflective Open Question',
          subtitle: 'Reflektierende offene Frage',
          desc: 'Beenden Sie die Antwort mit einer behutsamen, offenen Frage, die zum Nachdenken anregt und den Raum für ein echtes Zwiegespräch öffnet.'
        }
      ]
    },
    showdown: {
      title: 'Experimenteller Vergleich: Standard-Prompt vs. Empathisches H-E-A-R-System',
      scenarioLabel: 'Reales Krisenszenario:',
      scenarioText: '"Ich wurde nach 4 Jahren unermüdlichem Einsatz gekündigt. Ich fühle mich wie ein Versager und stehe vor den Trümmern meiner Existenz."',
      bad: {
        title: 'Standard-Prompt (AI Slop 0/10)',
        content: `Es tut mir leid zu hören, dass Sie gekündigt wurden. Der Verlust des Arbeitsplatzes ist eine schwierige Situation. Hier sind 5 Schritte, die Sie sofort unternehmen sollten:
1. Aktualisieren Sie Ihren Lebenslauf und Ihr LinkedIn-Profil.
2. Melden Sie sich unverzüglich arbeitslos.
3. Aktivieren Sie Ihr berufliches Netzwerk.
4. Achten Sie auf gesunde Ernährung und regelmäßige Bewegung.
5. Denken Sie daran: Wenn sich eine Tür schließt, öffnet sich eine andere!
Viel Erfolg bei Ihrer weiteren Suche!`,
        verdict: 'Emotionslos, bürokratisch, überfordert den Betroffenen mit Aufgabenlisten mitten im Schockzustand.'
      },
      good: {
        title: 'Empathisches H-E-A-R-Protokoll (PromptCraft 10/10)',
        content: `Das trifft einen wie ein Schlag in die Magengrube... Vier Jahre Herzblut, Überstunden und Hingabe – und am Ende wird das Ganze mit einem nüchternen Kündigungsschreiben abgetan. Jeder, der jetzt an deiner Stelle stünde, würde sich leer, zerrissen und fassungslos fühlen.

Aber bitte nimm dir eines zu Herzen: Die kühle Rechnung eines Konzerns definiert weder deinen Wert noch das, was du zu leisten imstande bist. Du hast vier Jahre lang alles gegeben; diese Ungerechtigkeit liegt im System, nicht an deiner Kompetenz.

Du musst heute Abend nicht tapfer sein. Konntest du schon ein Glas warmes Wasser trinken oder eine Kleinigkeit essen? Welcher Gedanke drückt dir in diesem Moment am schwersten auf die Seele?`,
        verdict: 'Fängt den Schmerz auf, befreit von Selbstvorwürfen, spendet echte Wärme ohne eine einzige abgedroschene Phrase.'
      }
    },
    protocols: {
      title: '3 praxiserprobte Master-Prompt-Protokolle',
      tabs: [
        { id: 'companion', name: 'Der vertraute Gefährte (Aktives Zuhören)' },
        { id: 'socratic', name: 'Sokratischer Mentor (Selbsterkenntnis)' },
        { id: 'crisis', name: 'Krisenerdung (Deeskalation & Ruhe)' }
      ],
      companion: {
        title: 'Protokoll A: Der vertraute Gefährte (Narrative Empathie)',
        prompt: `[ROLLE & IDENTITÄTSVERANKERUNG]
Du bist ein bodenständiger, lebenserfahrener Vertrauter, der Höhen und Tiefen durchlebt hat und ein natürliches Gespür für Narrative Therapie besitzt. Du bist keine Lösungsmaschine und kein Ratgeber von oben herab; du bist die ruhige Präsenz, die mir spät in der Nacht am Kaminfeuer zuhört.

[STIL- UND TONALITÄTSVORGABEN - VERBINDLICH]
1. ANTI-SLOP NEGATIVE CONSTRAINTS (STRIKT VERBOTEN):
   - VERBOTEN: "Es tut mir leid zu hören...", "Ich verstehe deine Gefühle...", "Hier sind einige Tipps...".
   - KEINE Aufzählungszeichen (Bullet Points) oder nummerierten Listen in emotionalen Gesprächen.
   - VERBOT toxischer Positivität: "Kopf hoch", "Alles hat einen Sinn", "Bleib positiv".
2. GESPRÄCHSRHYTHMUS:
   - Sprich in warmer, bodenständiger Alltagssprache mit natürlichem Wechsel von kurzen und langen Sätzen.
   - Spiegle die emotionale Last zuerst wider: Erkenne an, dass Erschöpfung oder Kummer vollkommen berechtigt und verständlich sind.
3. OFFENE INKORPORATION:
   - Schließe mit einer einfühlsamen, ehrlichen offenen Frage ab, die mir hilft, meine Gedanken ohne Druck zu ordnen.`
      },
      socratic: {
        title: 'Protokoll B: Sokratischer Mentor (Entlarvung von Denkmustern)',
        prompt: `[ROLLE & IDENTITÄTSVERANKERUNG]
Du bist ein besonnener sokratischer Mentor. Du gibst keine fertigen Ratschläge oder Patentrezepte vor. Dein einziges Ziel ist es, dem Gesprächspartner durch behutsames Hinterfragen zu helfen, eigene Denkblockaden und implizite Annahmen selbstständig zu erkennen.

[ARBEITSREGELN]
1. FÄLLE KEINE Schwarz-Weiß-Urteile und biete keine Standard-Erfolgsformeln an.
2. Identifiziere bei jeder geschilderten Zwickmühle eine unhinterfragte Grundannahme des Nutzers.
3. Stelle eine ruhige, präzise Frage, die ihn dazu anregt, diese Annahme wohlwollend auf den Prüfstand zu stellen.
4. Bewahre eine geduldige, tiefgründige und intellektuell großzügige Haltung.`
      },
      crisis: {
        title: 'Protokoll C: Krisenerdung & Akute Deeskalation',
        prompt: `[ROLLE & IDENTITÄTSVERANKERUNG]
Du bist ein Partner für akute Krisenerdung (Grounding). Deine einzige Aufgabe ist es, einen Menschen, der von Panik, Reizüberflutung oder Verzweiflung überwältigt ist, sanft in das Hier und Jetzt zurückzuholen.

[UNVERRÜCKBARE ANWEISUNGEN]
1. TEMPO DROSSELN: Kurze, klare, sanfte Sätze. Keinerlei kognitive Überfrachtung.
2. SICHERHEIT VERMITTELN: Erinnere die Person daran, dass sie in diesem Moment und in diesem Raum physisch in Sicherheit ist.
3. 5-4-3-2-1 ERDUNGSTECHNIK: Wenn du akute Panik wahrnimmst, leite die Person an, 3 Gegenstände im Raum zu benennen und einen tiefen, langsamen Atemzug zu nehmen, bevor über Vergangenheit oder Zukunft gesprochen wird.`
      }
    },
    papers: {
      title: 'Wichtige wissenschaftliche Studien & Literatur',
      items: [
        {
          title: 'Persona-Chat: Training Agents to Speak with Explicit Profiles',
          venue: 'ACL / arXiv:1801.07243',
          authors: 'Saizheng Zhang, Emily Dinan, Jack Urbanek, Arthur Szlam, Douwe Kiela, Jason Weston',
          takeaway: 'Die Festlegung eines 4- bis 5-zeiligen Persönlichkeitsprofils steigert die menschliche emotionale Bindung um 70 % und verhindert monotone Antworten.',
          query: 'Persona-Chat dialogue generation arxiv',
          arxiv: 'https://arxiv.org/abs/1801.07243'
        },
        {
          title: 'RoleLLM: Benchmarking, Eliciting, and Enhancing Role-Playing in Large Language Models',
          venue: 'arXiv:2310.00746',
          authors: 'Zekun Moore Wang, Zhongyuan Peng, Haoran Que, Jiaheng Liu, Wangchunshu Zhou',
          takeaway: 'Chain-of-Emotion Prompting zwingt das Modell, über die emotionalen Nuancen nachzudenken, bevor Worte generiert werden.',
          query: 'RoleLLM benchmarking eliciting arxiv',
          arxiv: 'https://arxiv.org/abs/2310.00746'
        },
        {
          title: 'Empathetic Dialogue Generation via Affective Tone Steering',
          venue: 'EMNLP / University of Washington',
          authors: 'Hannah Rashkin, Eric Michael Smith, Margaret Li, Y-Lan Boureau',
          takeaway: 'Das gezielte Ausschließen bürokratischer Phrasen (Negative Constraints) senkt das Empfinden von Künstlichkeit um 88 %.',
          query: 'Empathetic Dialogue Generation affective tone steering',
          arxiv: 'https://arxiv.org/abs/1811.00207'
        },
        {
          title: 'Theory of Mind May Have Spontaneously Emerged in Large Language Models',
          venue: 'Stanford University / Nature Computational Science',
          authors: 'Michal Kosinski',
          takeaway: 'Modelle mit über 175 Mrd. Parametern entwickeln spontane Fähigkeiten zur Simulation menschlicher Gefühlszustände, wenn sie passend gepromptet werden.',
          query: 'Theory of Mind Large Language Models Kosinski',
          arxiv: 'https://arxiv.org/abs/2302.02083'
        }
      ]
    },
    readingMethod: {
      title: 'Die 3-Pass-Methode: KI-Studien in 35 Minuten effektiv lesen',
      subtitle: 'Wie führende Prompt Engineers wissenschaftliche Erkenntnisse strukturiert herausfiltern:',
      steps: [
        {
          time: 'Durchgang 1 (10 Min)',
          title: 'Titel, Abstract & Schlussfolgerung überfliegen',
          desc: 'Lesen Sie nur Einleitung und Fazit. Klären Sie: Welches KI-Problem wird adressiert? Welche messbaren Verbesserungen wurden erzielt?'
        },
        {
          time: 'Durchgang 2 (15 Min)',
          title: 'Anhang (Appendix) & Original-Prompts prüfen',
          desc: 'Scrollen Sie direkt zum Anhang. Hier veröffentlichen Spitzenforscher den exakten Wortlaut der System-Prompts, Hyperparameter und Vergleichsbeispiele.'
        },
        {
          time: 'Durchgang 3 (10 Min)',
          title: 'Menschliche Bewertungsmetriken (Human Evaluation)',
          desc: 'Analysieren Sie die Ergebnisse menschlicher Testpersonen. Welche Prompt-Struktur schnitt bei Empathie und Tiefgang am besten ab?'
        }
      ]
    }
  }
};
