import { INITIAL_DECKS, LEARNING_PHASES } from '../data/data-registry.js';

console.log("Total Decks:", INITIAL_DECKS.length);
INITIAL_DECKS.forEach((d, i) => {
  console.log(`${i+1}. ${d.icon} ${d.title} (Giai đoạn ${d.phase}) - Hiện tại: ${d.cards.length} thẻ | Mục tiêu: ${d.targetCount}`);
});

const dl = INITIAL_DECKS.find(d => d.id === 'daily-life-routines');
console.log(`\nDaily Life & Routines template count: ${dl.cards.length} cards`);
