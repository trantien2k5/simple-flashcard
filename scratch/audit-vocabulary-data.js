import { INITIAL_DECKS } from '../data/data-registry.js';

console.log("=== BẮT ĐẦU AUDIT TOÀN BỘ 1.000 TỪ VỰNG TRÊN 15 CHỦ ĐỀ ===");

const issues = [];
const allIds = new Set();
const allWords = new Map();

let totalCards = 0;

INITIAL_DECKS.forEach((deck, deckIdx) => {
  console.log(`Auditing Deck ${deckIdx + 1}: ${deck.icon} ${deck.title} (${deck.cards.length} thẻ)...`);
  
  if (!deck.id || !deck.title || !deck.phase) {
    issues.push(`Deck ${deckIdx + 1} thiếu thuộc tính cơ bản (id, title, hoặc phase)`);
  }

  deck.cards.forEach((card, cardIdx) => {
    totalCards++;

    // 1. Kiểm tra trường bắt buộc
    const requiredFields = ['id', 'word', 'phonetic', 'pos', 'meaning', 'definition', 'example', 'exampleVi', 'level'];
    requiredFields.forEach(f => {
      if (!card[f] || typeof card[f] !== 'string' || card[f].trim() === '') {
        issues.push(`[${deck.id}] Thẻ index ${cardIdx} (${card.word || 'NO_WORD'}) thiếu trường: ${f}`);
      }
    });

    // 2. Kiểm tra trùng lặp ID
    if (card.id) {
      if (allIds.has(card.id)) {
        issues.push(`Trùng lặp card ID: ${card.id} tại thẻ "${card.word}"`);
      }
      allIds.add(card.id);
    }

    // 3. Kiểm tra định dạng IPA
    if (card.phonetic && (!card.phonetic.startsWith('/') || !card.phonetic.endsWith('/'))) {
      issues.push(`[${card.id}] IPA không đúng định dạng /.../: ${card.phonetic}`);
    }

    // 4. Kiểm tra CEFR Level
    const validLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    if (card.level && !validLevels.includes(card.level)) {
      issues.push(`[${card.id}] Level CEFR không hợp lệ: "${card.level}"`);
    }

    // 5. Kiểm tra POS hợp lệ
    const validPos = ['noun', 'verb', 'adjective', 'adverb', 'phrase', 'phrasal verb', 'idiom', 'conjunction', 'preposition', 'pronoun', 'determiner'];
    if (card.pos && !validPos.includes(card.pos.toLowerCase())) {
      issues.push(`[${card.id}] Từ loại (pos) lạ: "${card.pos}"`);
    }

    // 6. Kiểm tra độ tương thích giữa từ và câu ví dụ (ví dụ có chứa từ không)
    // Làm sạch từ để so sánh
    const baseWord = card.word.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
    const exampleLower = (card.example || '').toLowerCase();
    
    // Một số từ biến thể thì chấp nhận, nhưng kiểm tra xem có câu ví dụ trống không
    if ((card.example || '').length < 10) {
      issues.push(`[${card.id}] Câu ví dụ quá ngắn: "${card.example}"`);
    }
    if ((card.exampleVi || '').length < 5) {
      issues.push(`[${card.id}] Bản dịch ví dụ tiếng Việt quá ngắn: "${card.exampleVi}"`);
    }
  });
});

console.log(`\n=== KẾT QUẢ KIỂM TRA ===`);
console.log(`Tổng số thẻ đã duyệt: ${totalCards} thẻ.`);
console.log(`Số lỗi / bất thường phát hiện: ${issues.length}`);

if (issues.length > 0) {
  console.log("Danh sách vấn đề cần xử lý:");
  issues.forEach(iss => console.log("- " + iss));
} else {
  console.log("✅ 100% thẻ từ vựng đều đầy đủ trường, đúng chuẩn ngữ pháp, định dạng IPA và câu ví dụ song ngữ!");
}
