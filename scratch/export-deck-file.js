import fs from 'fs';

const cards = JSON.parse(fs.readFileSync('./scratch/daily-life-routines.json', 'utf-8'));

const deckContent = `/**
 * DECK: Daily Life & Routines (Đời sống & Thói quen hằng ngày)
 * Quy mô: 250 từ vựng nền tảng phân bố A1-A2 (ưu tiên) và B1.
 * Phủ 7 chủ đề con: Morning routine, Everyday activities, Home activities, Time & schedule, Daily needs, Evening & sleep, Common expressions.
 */

export const DAILY_LIFE_ROUTINES_DECK = {
  id: "home-daily-life",
  title: "Đời sống & Thói quen (Daily Life & Routines)",
  description: "250 từ vựng sinh hoạt thường nhật: thói quen buổi sáng, việc nhà, lịch trình, mua sắm và giấc ngủ.",
  category: "Living",
  icon: "🏠",
  color: "#0ea5e9",
  level: "A1 - B1 (Cốt lõi)",
  subcategories: [
    "Morning Routine",
    "Everyday Activities",
    "Home & Chores",
    "Time & Schedule",
    "Daily Needs & Shopping",
    "Evening & Sleep",
    "Common Expressions"
  ],
  cards: ${JSON.stringify(cards, null, 2)}
};
`;

if (!fs.existsSync('./data/decks')) {
  fs.mkdirSync('./data/decks', { recursive: true });
}

fs.writeFileSync('./data/decks/daily-life-routines.js', deckContent, 'utf-8');
console.log(`Created ./data/decks/daily-life-routines.js with ${cards.length} cards successfully.`);
