/**
 * DATA REGISTRY - 15 CHỦ ĐỀ TỪ VỰNG TIẾNG ANH CHUẨN (3 GIAI ĐOẠN LỘ TRÌNH)
 * Tách biệt từng chủ đề thành các module độc lập trong thư mục ./decks/
 * Phủ 1.000 từ vựng cốt lõi đầu tiên (Topic 1: 300 từ, Topics 2-15: 50 từ/chủ đề).
 */

import { DAILY_LIFE_ROUTINES_DECK } from './decks/daily-life-routines.js';
import { PEOPLE_RELATIONSHIPS_DECK } from './decks/people-relationships.js';
import { COMMUNICATION_FEELINGS_DECK } from './decks/communication-feelings.js';
import { FOOD_DRINK_DECK } from './decks/food-drink.js';
import { HOME_LIVING_DECK } from './decks/home-living.js';
import { HEALTH_BODY_DECK } from './decks/health-body.js';

import { SHOPPING_MONEY_DECK } from './decks/shopping-money.js';
import { TRANSPORT_DIRECTIONS_DECK } from './decks/transport-directions.js';
import { WORK_JOBS_DECK } from './decks/work-jobs.js';
import { EDUCATION_LEARNING_DECK } from './decks/education-learning.js';
import { TRAVEL_PLACES_DECK } from './decks/travel-places.js';

import { ENTERTAINMENT_HOBBIES_DECK } from './decks/entertainment-hobbies.js';
import { TECHNOLOGY_INTERNET_DECK } from './decks/technology-internet.js';
import { NATURE_WEATHER_DECK } from './decks/nature-weather.js';
import { SOCIETY_WORLD_DECK } from './decks/society-world.js';

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
     🌱 GIAI ĐOẠN 1 — NỀN TẢNG (FOUNDATION)
     ========================================================================== */
  DAILY_LIFE_ROUTINES_DECK,     // 1. 🏠 Đời sống & Thói quen (300 từ)
  PEOPLE_RELATIONSHIPS_DECK,    // 2. 👥 Con người & Mối quan hệ (50 từ)
  COMMUNICATION_FEELINGS_DECK,  // 3. 💬 Giao tiếp & Cảm xúc (50 từ)
  FOOD_DRINK_DECK,              // 4. 🍜 Ăn uống & Ẩm thực (50 từ)
  HOME_LIVING_DECK,             // 5. 🏡 Nhà cửa & Không gian sống (50 từ)
  HEALTH_BODY_DECK,             // 6. ❤️ Sức khỏe & Cơ thể (50 từ)

  /* ==========================================================================
     🌿 GIAI ĐOẠN 2 — ĐỘC LẬP (INDEPENDENCE)
     ========================================================================== */
  SHOPPING_MONEY_DECK,          // 7. 🛍️ Mua sắm & Tiền bạc (50 từ)
  TRANSPORT_DIRECTIONS_DECK,    // 8. 🚗 Giao thông & Đi lại (50 từ)
  WORK_JOBS_DECK,               // 9. 💼 Công việc & Sự nghiệp (50 từ)
  EDUCATION_LEARNING_DECK,      // 10. 🎓 Giáo dục & Học tập (50 từ)
  TRAVEL_PLACES_DECK,           // 11. ✈️ Du lịch & Địa điểm (50 từ)

  /* ==========================================================================
     🌳 GIAI ĐOẠN 3 — MỞ RỘNG (EXPANSION)
     ========================================================================== */
  ENTERTAINMENT_HOBBIES_DECK,   // 12. 🎮 Giải trí & Sở thích (50 từ)
  TECHNOLOGY_INTERNET_DECK,     // 13. 💻 Công nghệ & Internet (50 từ)
  NATURE_WEATHER_DECK,          // 14. 🌦️ Thiên nhiên & Thời tiết (50 từ)
  SOCIETY_WORLD_DECK            // 15. 🌍 Xã hội & Thế giới (50 từ)
];
