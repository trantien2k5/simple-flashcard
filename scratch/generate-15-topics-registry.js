import fs from 'fs';

const registryCode = `/**
 * DATA REGISTRY - TAXONOMY CHUẨN 15 CHỦ ĐỀ NỀN TẢNG TIẾNG ANH (3 GIAI ĐOẠN LỘ TRÌNH)
 * Quy mô mục tiêu V1: ~3.000 từ unique (4.100 topic assignments)
 * Phân chia theo 3 Giai đoạn học:
 *   - Giai đoạn 1: Nền tảng (Daily Life, People, Communication, Food, Home, Health)
 *   - Giai đoạn 2: Độc lập (Shopping, Transport, Work, Education, Travel)
 *   - Giai đoạn 3: Mở rộng (Entertainment, Technology, Nature, Society)
 */

import { DAILY_LIFE_ROUTINES_DECK } from './decks/daily-life-routines.js';

export const LEARNING_PHASES = [
  {
    phase: 1,
    title: "Giai đoạn 1: Nền tảng",
    subtitle: "Chủ đề bắt buộc để sinh hoạt và giao lưu cơ bản",
    icon: "🌱"
  },
  {
    phase: 2,
    title: "Giai đoạn 2: Độc lập",
    subtitle: "Chủ đề tự chủ trong công việc, học tập và cuộc sống",
    icon: "🌿"
  },
  {
    phase: 3,
    title: "Giai đoạn 3: Mở rộng",
    subtitle: "Thế giới hiện đại, công nghệ, tư duy và xã hội",
    icon: "🌳"
  }
];

export const INITIAL_DECKS = [
  /* ==========================================================================
     GIAI ĐOẠN 1 — NỀN TẢNG (FOUNDATION)
     ========================================================================== */
  // 1. 🏠 Daily Life & Routines (Template chuẩn hoàn thiện 300 từ)
  DAILY_LIFE_ROUTINES_DECK,

  // 2. 👥 People & Relationships
  {
    id: "people-relationships",
    title: "Con người & Mối quan hệ",
    description: "Ngoại hình, tính cách, quan hệ gia đình, bạn bè và xã hội.",
    category: "Phase1",
    phase: 1,
    icon: "👥",
    color: "#6366f1",
    level: "A1 - B1",
    targetCount: 300,
    cards: [
      {
        id: "pp-001",
        word: "Personality",
        phonetic: "/ˌpɝː.sənˈæl.ə.t̬i/",
        pos: "noun",
        meaning: "Tính cách, nhân cách",
        definition: "The combination of characteristics or qualities that form an individual's distinctive character.",
        example: "She has a warm and friendly personality.",
        exampleVi: "Cô ấy có một tính cách ấm áp và thân thiện.",
        level: "A2"
      },
      {
        id: "pp-002",
        word: "Reliable",
        phonetic: "/rɪˈlaɪ.ə.bəl/",
        pos: "adjective",
        meaning: "Đáng tin cậy",
        definition: "Consistently good in quality or performance; able to be trusted.",
        example: "David is very reliable; he always keeps his promises.",
        exampleVi: "David rất đáng tin cậy; anh ấy luôn giữ lời hứa.",
        level: "B1"
      }
    ]
  },

  // 3. 💬 Communication & Feelings
  {
    id: "communication-feelings",
    title: "Giao tiếp & Cảm xúc",
    description: "Bày tỏ cảm xúc, ý kiến, trò chuyện và cử chỉ giao tiếp.",
    category: "Phase1",
    phase: 1,
    icon: "💬",
    color: "#ec4899",
    level: "A1 - B1",
    targetCount: 300,
    cards: [
      {
        id: "cf-001",
        word: "Confident",
        phonetic: "/ˈkɑːn.fə.dənt/",
        pos: "adjective",
        meaning: "Tự tin",
        definition: "Feeling or showing confidence in oneself; self-assured.",
        example: "Practice speaking until you feel confident.",
        exampleVi: "Hãy luyện nói cho đến khi bạn cảm thấy tự tin.",
        level: "A2"
      }
    ]
  },

  // 4. 🍜 Food & Drink
  {
    id: "food-drink",
    title: "Ăn uống & Ẩm thực",
    description: "Thực phẩm, đồ uống, mùi vị, cách nấu nướng và nhà hàng.",
    category: "Phase1",
    phase: 1,
    icon: "🍜",
    color: "#f59e0b",
    level: "A1 - B1",
    targetCount: 250,
    cards: [
      {
        id: "fd-001",
        word: "Delicious",
        phonetic: "/dɪˈlɪʃ.əs/",
        pos: "adjective",
        meaning: "Ngon miệng, thơm ngon",
        definition: "Highly pleasant to the taste.",
        example: "This home-cooked soup is absolutely delicious.",
        exampleVi: "Món súp nấu tại nhà này thực sự rất ngon.",
        level: "A1"
      }
    ]
  },

  // 5. 🏡 Home & Living
  {
    id: "home-living",
    title: "Nhà cửa & Không gian sống",
    description: "Nhà ở, phòng ốc, đồ nội thất và môi trường sống.",
    category: "Phase1",
    phase: 1,
    icon: "🏡",
    color: "#10b981",
    level: "A1 - B1",
    targetCount: 200,
    cards: [
      {
        id: "hl-001",
        word: "Comfortable",
        phonetic: "/ˈkʌm.fɚ.t̬ə.bəl/",
        pos: "adjective",
        meaning: "Thoải mái, tiện nghi",
        definition: "Providing physical ease and relaxation.",
        example: "This living room armchair is very comfortable.",
        exampleVi: "Chiếc ghế bành trong phòng khách này rất thoải mái.",
        level: "A2"
      }
    ]
  },

  // 6. ❤️ Health & Body
  {
    id: "health-body",
    title: "Sức khỏe & Cơ thể",
    description: "Bộ phận cơ thể, triệu chứng bệnh, khám sức khỏe và lối sống lành mạnh.",
    category: "Phase1",
    phase: 1,
    icon: "❤️",
    color: "#ef4444",
    level: "A1 - B1",
    targetCount: 300,
    cards: [
      {
        id: "hb-001",
        word: "Healthy",
        phonetic: "/ˈhel.θi/",
        pos: "adjective",
        meaning: "Khỏe mạnh, lành mạnh",
        definition: "In good health; not diseased.",
        example: "Eating vegetables keeps your body healthy.",
        exampleVi: "Ăn rau củ giúp cơ thể bạn luôn khỏe mạnh.",
        level: "A1"
      }
    ]
  },

  /* ==========================================================================
     GIAI ĐOẠN 2 — ĐỘC LẬP (INDEPENDENCE)
     ========================================================================== */
  // 7. 🛍️ Shopping & Money
  {
    id: "shopping-money",
    title: "Mua sắm & Tiền bạc",
    description: "Cửa hàng, giá cả, thanh toán, ngân hàng và tài chính cá nhân.",
    category: "Phase2",
    phase: 2,
    icon: "🛍️",
    color: "#8b5cf6",
    level: "A2 - B1",
    targetCount: 250,
    cards: [
      {
        id: "sm-001",
        word: "Affordable",
        phonetic: "/əˈfɔːr.də.bəl/",
        pos: "adjective",
        meaning: "Giá cả phải chăng, vừa túi tiền",
        definition: "Inexpensive; reasonably priced.",
        example: "The store offers high quality clothes at affordable prices.",
        exampleVi: "Cửa hàng cung cấp quần áo chất lượng cao với mức giá phải chăng.",
        level: "B1"
      }
    ]
  },

  // 8. 🚗 Transport & Directions
  {
    id: "transport-directions",
    title: "Giao thông & Đi lại",
    description: "Phương tiện đi lại, vé tàu xe, chỉ đường và di chuyển trong đô thị.",
    category: "Phase2",
    phase: 2,
    icon: "🚗",
    color: "#06b6d4",
    level: "A1 - B1",
    targetCount: 200,
    cards: [
      {
        id: "td-001",
        word: "Intersection",
        phonetic: "/ˌɪn.t̬ɚˈsek.ʃən/",
        pos: "noun",
        meaning: "Ngã tư, điểm giao cắt",
        definition: "A point at which two or more things intersect, especially roads.",
        example: "Turn left at the next intersection.",
        exampleVi: "Rẽ trái tại ngã tư tiếp theo nhé.",
        level: "A2"
      }
    ]
  },

  // 9. 💼 Work & Jobs
  {
    id: "work-jobs",
    title: "Công việc & Sự nghiệp",
    description: "Nghề nghiệp, văn phòng, họp hành, kỹ năng và môi trường làm việc.",
    category: "Phase2",
    phase: 2,
    icon: "💼",
    color: "#3b82f6",
    level: "A2 - B2",
    targetCount: 350,
    cards: [
      {
        id: "wj-001",
        word: "Colleague",
        phonetic: "/ˈkɑː.liːɡ/",
        pos: "noun",
        meaning: "Đồng nghiệp",
        definition: "A person with whom one works in a profession or business.",
        example: "I get along very well with all my colleagues.",
        exampleVi: "Tôi hòa thuận rất tốt với tất cả đồng nghiệp của mình.",
        level: "A2"
      }
    ]
  },

  // 10. 🎓 Education & Learning
  {
    id: "education-learning",
    title: "Giáo dục & Học tập",
    description: "Trường lớp, môn học, thi cử, bằng cấp và phương pháp học.",
    category: "Phase2",
    phase: 2,
    icon: "🎓",
    color: "#f97316",
    level: "A2 - B2",
    targetCount: 300,
    cards: [
      {
        id: "el-001",
        word: "Curriculum",
        phonetic: "/kəˈrɪk.jə.ləm/",
        pos: "noun",
        meaning: "Chương trình giảng dạy",
        definition: "The subjects comprising a course of study in a school or college.",
        example: "The school updated its English curriculum this semester.",
        exampleVi: "Trường đã cập nhật chương trình tiếng Anh trong học kỳ này.",
        level: "B1"
      }
    ]
  },

  // 11. ✈️ Travel & Places
  {
    id: "travel-places",
    title: "Du lịch & Địa điểm",
    description: "Sân bay, khách sạn, tham quan, địa danh và văn hóa du lịch.",
    category: "Phase2",
    phase: 2,
    icon: "✈️",
    color: "#14b8a6",
    level: "A2 - B1",
    targetCount: 250,
    cards: [
      {
        id: "tp-001",
        word: "Destination",
        phonetic: "/ˌdes.təˈneɪ.ʃən/",
        pos: "noun",
        meaning: "Điểm đến",
        definition: "The place to which someone or something is going or being sent.",
        example: "Paris is one of the world's most popular travel destinations.",
        exampleVi: "Paris là một trong những điểm đến du lịch nổi tiếng nhất thế giới.",
        level: "A2"
      }
    ]
  },

  /* ==========================================================================
     GIAI ĐOẠN 3 — MỞ RỘNG (EXPANSION)
     ========================================================================== */
  // 12. 🎮 Entertainment & Hobbies
  {
    id: "entertainment-hobbies",
    title: "Giải trí & Sở thích",
    description: "Âm nhạc, phim ảnh, thể thao, trò chơi và thú vui tiêu khiển.",
    category: "Phase3",
    phase: 3,
    icon: "🎮",
    color: "#a855f7",
    level: "A2 - B1",
    targetCount: 250,
    cards: [
      {
        id: "eh-001",
        word: "Enthusiastic",
        phonetic: "/ɪnˌθuː.ziˈæs.tɪk/",
        pos: "adjective",
        meaning: "Hào hứng, nhiệt tình",
        definition: "Having or showing intense and eager enjoyment or interest.",
        example: "He is very enthusiastic about learning guitar.",
        exampleVi: "Anh ấy rất hào hứng với việc học đàn ghi-ta.",
        level: "B1"
      }
    ]
  },

  // 13. 💻 Technology & Internet
  {
    id: "technology-internet",
    title: "Công nghệ & Internet",
    description: "Máy tính, smartphone, phần mềm, mạng xã hội và kỹ thuật số.",
    category: "Phase3",
    phase: 3,
    icon: "💻",
    color: "#0284c7",
    level: "A2 - B2",
    targetCount: 300,
    cards: [
      {
        id: "ti-001",
        word: "Application",
        phonetic: "/ˌæp.ləˈkeɪ.ʃən/",
        pos: "noun",
        meaning: "Ứng dụng (phần mềm)",
        definition: "A program or piece of software designed to fulfill a particular purpose.",
        example: "This flashcard application helps you remember words faster.",
        exampleVi: "Ứng dụng flashcard này giúp bạn nhớ từ vựng nhanh hơn.",
        level: "A2"
      }
    ]
  },

  // 14. 🌦️ Nature & Weather
  {
    id: "nature-weather",
    title: "Thiên nhiên & Thời tiết",
    description: "Khí hậu, mùa màng, động thực vật, địa lý và môi trường.",
    category: "Phase3",
    phase: 3,
    icon: "🌦️",
    color: "#eab308",
    level: "A1 - B1",
    targetCount: 200,
    cards: [
      {
        id: "nw-001",
        word: "Forecast",
        phonetic: "/ˈfɔːr.kæst/",
        pos: "noun",
        meaning: "Dự báo thời tiết",
        definition: "A prediction or estimate of future events, especially weather.",
        example: "The weather forecast predicts sunshine for the whole weekend.",
        exampleVi: "Dự báo thời tiết cho biết trời sẽ có nắng suốt cả cuối tuần.",
        level: "A2"
      }
    ]
  },

  // 15. 🌍 Society & World
  {
    id: "society-world",
    title: "Xã hội & Thế giới",
    description: "Cộng đồng, tin tức, văn hóa, luật lệ và sự kiện thế giới.",
    category: "Phase3",
    phase: 3,
    icon: "🌍",
    color: "#64748b",
    level: "B1 - B2",
    targetCount: 350,
    cards: [
      {
        id: "sw-001",
        word: "Community",
        phonetic: "/kəˈmjuː.nə.t̬i/",
        pos: "noun",
        meaning: "Cộng đồng",
        definition: "A group of people living in the same place or having a particular characteristic in common.",
        example: "The local community organized a park cleanup event.",
        exampleVi: "Cộng đồng địa phương đã tổ chức một sự kiện dọn sạch công viên.",
        level: "B1"
      }
    ]
  }
];
`;

fs.writeFileSync('./data/data-registry.js', registryCode, 'utf-8');
console.log('Successfully written data/data-registry.js with 15 Master Topics taxonomy!');
