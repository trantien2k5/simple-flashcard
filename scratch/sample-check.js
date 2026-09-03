import { INITIAL_DECKS } from '../data/data-registry.js';

console.log("=== BẢN MẪU KIỂM TRA NGỮ NGHĨA VÀ ĐỘ CHUẨN XÁC ===");

INITIAL_DECKS.forEach((d, i) => {
  const card = d.cards[Math.floor(d.cards.length / 2)];
  console.log(`[Chủ đề ${i+1}: ${d.title}]`);
  console.log(`- Từ: ${card.word} ${card.phonetic} | Loại từ: ${card.pos} | CEFR: ${card.level}`);
  console.log(`- Nghĩa TV: ${card.meaning}`);
  console.log(`- Định nghĩa: ${card.definition}`);
  console.log(`- Ví dụ: "${card.example}"`);
  console.log(`- Dịch ví dụ: "${card.exampleVi}"\n`);
});
