/**
 * Deck Manager: Quản lý danh mục từ vựng, nạp dữ liệu từ data/data-registry.js,
 * kết hợp với các bộ đề tự tạo trong LocalStorage.
 */

import { StorageManager } from './storage.js';
import { FSRS, State } from './fsrs.js';
import { INITIAL_DECKS } from '../data/data-registry.js';

export class DeckManager {
  constructor() {
    this.decks = [];
    this.deckCardsMap = new Map();
    this.allCards = [];
  }

  /**
   * Khởi tạo và nạp toàn bộ danh mục từ data/data-registry.js và LocalStorage
   */
  async init() {
    this.decks = JSON.parse(JSON.stringify(INITIAL_DECKS));

    // Nạp thêm các bộ thẻ người dùng tự tạo (Custom Decks)
    const customDecks = StorageManager.getCustomDecks();
    this.decks = [...this.decks, ...customDecks];

    // Xây dựng bản đồ thẻ (cards map) cho từng deck
    for (const deck of this.decks) {
      const cards = (deck.cards || []).map(c => ({ ...c, deckId: deck.id }));
      this.deckCardsMap.set(deck.id, cards);
    }

    this.rebuildAllCardsList();
    return this.decks;
  }

  rebuildAllCardsList() {
    this.allCards = [];
    for (const [deckId, cards] of this.deckCardsMap.entries()) {
      for (const card of cards) {
        this.allCards.push(card);
      }
    }
  }

  getAllDecks() {
    return this.decks;
  }

  getDeckById(deckId) {
    return this.decks.find(d => d.id === deckId);
  }

  getCardsByDeckId(deckId) {
    return this.deckCardsMap.get(deckId) || [];
  }

  getAllCards() {
    return this.allCards;
  }

  getCardById(cardId) {
    return this.allCards.find(c => c.id === cardId) || null;
  }

  /**
   * Tính toán thống kê tiến độ học của một bộ thẻ (New, Learning, Review, Mastered)
   */
  getDeckStats(deckId) {
    const cards = this.getCardsByDeckId(deckId);
    const cardStates = StorageManager.getAllCardStates();
    const now = new Date();

    let newCount = 0;
    let learningCount = 0;
    let reviewCount = 0;
    let dueCount = 0;
    let masteredCount = 0;

    for (const card of cards) {
      const state = cardStates[card.id];
      if (!state || state.state === State.New) {
        newCount++;
      } else if (state.state === State.Learning || state.state === State.Relearning) {
        learningCount++;
        if (new Date(state.due) <= now) dueCount++;
      } else if (state.state === State.Review) {
        reviewCount++;
        if (state.stability >= 21) {
          masteredCount++;
        }
        if (new Date(state.due) <= now) dueCount++;
      }
    }

    return {
      total: cards.length,
      newCount,
      learningCount,
      reviewCount,
      masteredCount,
      dueCount,
      progressPercent: cards.length > 0 ? Math.round(((cards.length - newCount) / cards.length) * 100) : 0
    };
  }

  /**
   * Lấy danh sách thẻ đến hạn ôn tập (Due) và thẻ mới (New) theo cài đặt FSRS
   */
  getStudyQueue(deckId = null, settings = {}) {
    const cardStates = StorageManager.getAllCardStates();
    const targetCards = deckId ? this.getCardsByDeckId(deckId) : this.allCards;
    const now = new Date();

    const dueCards = [];
    const newCards = [];

    for (const card of targetCards) {
      const state = cardStates[card.id];
      if (!state || state.state === State.New) {
        newCards.push({ ...card, fsrsState: state || FSRS.createEmptyCard(card.id) });
      } else {
        const dueDate = new Date(state.due);
        if (dueDate <= now) {
          dueCards.push({ ...card, fsrsState: state });
        }
      }
    }

    // Sắp xếp thẻ đến hạn: thẻ quá hạn lâu nhất lên đầu
    dueCards.sort((a, b) => new Date(a.fsrsState.due) - new Date(b.fsrsState.due));

    // Giới hạn số lượng theo settings
    const maxNew = settings.dailyNewLimit || 15;
    const maxReview = settings.dailyReviewLimit || 50;

    const selectedDue = dueCards.slice(0, maxReview);
    const selectedNew = newCards.slice(0, maxNew);

    return {
      dueCards: selectedDue,
      newCards: selectedNew,
      totalDue: dueCards.length,
      totalNew: newCards.length,
      queue: [...selectedDue, ...selectedNew]
    };
  }

  /**
   * Tìm kiếm từ vựng theo từ khóa, phiên âm, nghĩa hoặc ví dụ
   */
  searchCards(query) {
    if (!query || !query.trim()) return this.allCards;
    const q = query.toLowerCase().trim();
    return this.allCards.filter(card => 
      (card.word && card.word.toLowerCase().includes(q)) ||
      (card.meaning && card.meaning.toLowerCase().includes(q)) ||
      (card.definition && card.definition.toLowerCase().includes(q)) ||
      (card.phonetic && card.phonetic.toLowerCase().includes(q)) ||
      (card.example && card.example.toLowerCase().includes(q))
    );
  }

  /**
   * Tạo bộ từ vựng tùy chỉnh mới
   */
  createCustomDeck(title, description, icon = '📚', color = '#8b5cf6', cards = []) {
    const id = `custom-${Date.now()}`;
    const newDeck = {
      id,
      title,
      description,
      category: "Tự tạo",
      icon,
      color,
      cards,
      isCustom: true
    };
    StorageManager.saveCustomDeck(newDeck);
    this.decks.push(newDeck);
    this.deckCardsMap.set(id, cards);
    this.rebuildAllCardsList();
    return newDeck;
  }
}
