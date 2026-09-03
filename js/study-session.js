/**
 * Study Session Manager:
 * Handles 3D Flashcard Flip, FSRS Grading, Web Speech API TTS, and Queue Progress.
 */

import { FSRS, Rating, State } from './fsrs.js';
import { StorageManager } from './storage.js';

export class StudySession {
  constructor(options = {}) {
    this.deckManager = options.deckManager;
    this.fsrs = new FSRS({ requestRetention: options.settings?.requestRetention || 0.90 });
    this.settings = options.settings || StorageManager.getSettings();
    this.onFinish = options.onFinish || (() => {});
    this.onCardChange = options.onCardChange || (() => {});

    this.queue = [];
    this.currentIndex = 0;
    this.currentCard = null;
    this.isFlipped = false;
    this.sessionStats = {
      again: 0,
      hard: 0,
      good: 0,
      easy: 0,
      total: 0
    };
  }

  /**
   * Khởi động phiên học với hàng đợi thẻ (queue)
   */
  start(queue) {
    this.queue = [...queue];
    this.currentIndex = 0;
    this.isFlipped = false;
    this.sessionStats = { again: 0, hard: 0, good: 0, easy: 0, total: this.queue.length };

    if (this.queue.length === 0) {
      this.currentCard = null;
      return false;
    }

    this.loadCurrentCard();
    return true;
  }

  loadCurrentCard() {
    if (this.currentIndex >= this.queue.length) {
      this.currentCard = null;
      this.onFinish(this.sessionStats);
      return null;
    }

    this.currentCard = this.queue[this.currentIndex];
    this.isFlipped = false;

    // Lấy trạng thái FSRS mới nhất từ storage hoặc tạo mới
    let state = StorageManager.getCardState(this.currentCard.id);
    if (!state) {
      state = FSRS.createEmptyCard(this.currentCard.id);
    }
    this.currentCard.fsrsState = state;

    // Tính toán preview intervals cho 4 nút
    this.currentCard.previews = this.fsrs.preview(state, new Date());

    this.onCardChange(this.currentCard, {
      index: this.currentIndex,
      total: this.queue.length,
      remaining: this.queue.length - this.currentIndex
    });

    if (this.settings.autoPronounce && this.currentCard.word) {
      this.speak(this.currentCard.word);
    }

    return this.currentCard;
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
    return this.isFlipped;
  }

  /**
   * Đánh giá thẻ với điểm FSRS (Again: 1, Hard: 2, Good: 3, Easy: 4)
   */
  rateCard(rating) {
    if (!this.currentCard) return null;

    const now = new Date();
    const oldState = this.currentCard.fsrsState;
    const nextState = this.fsrs.calculateNextState(oldState, rating, now);

    // Lưu trạng thái thẻ
    StorageManager.saveCardState(nextState);

    // Ghi nhật ký học tập
    StorageManager.logReview({
      cardId: this.currentCard.id,
      word: this.currentCard.word,
      rating: rating,
      oldState: oldState.state,
      newState: nextState.state,
      scheduledDays: nextState.scheduled_days,
      stability: nextState.stability,
      difficulty: nextState.difficulty
    });

    // Cập nhật thống kê phiên học
    if (rating === Rating.Again) this.sessionStats.again++;
    else if (rating === Rating.Hard) this.sessionStats.hard++;
    else if (rating === Rating.Good) this.sessionStats.good++;
    else if (rating === Rating.Easy) this.sessionStats.easy++;

    // Nếu chọn Again (Quên) trong lúc học, thêm thẻ vào cuối hàng đợi để ôn lại ngay
    if (rating === Rating.Again) {
      const repeatCard = { ...this.currentCard, fsrsState: nextState };
      this.queue.push(repeatCard);
    }

    this.currentIndex++;
    return this.loadCurrentCard();
  }

  /**
   * Phát âm từ vựng bằng Web Speech API
   */
  speak(text, lang = 'en-US') {
    if (!window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel(); // Dừng câu trước nếu có
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = this.settings.speechVoice || lang;
      utterance.rate = this.settings.speechRate || 0.9;
      utterance.pitch = 1.0;

      // Tìm voice phù hợp nếu có
      const voices = window.speechSynthesis.getVoices();
      const selectedVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')));
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }
}
