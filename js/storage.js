/**
 * Storage Manager for FSRS Progress, Decks, User Settings & Review Logs
 */

const STORAGE_KEYS = {
  CARDS: 'fsrs_card_states_v1',
  SETTINGS: 'fsrs_user_settings_v1',
  CUSTOM_DECKS: 'fsrs_custom_decks_v1',
  STUDY_LOGS: 'fsrs_study_logs_v1',
  PROFILE: 'fsrs_profile_v1'
};

export const DEFAULT_SETTINGS = {
  requestRetention: 0.90, // 90% target retention
  dailyNewLimit: 15,
  dailyReviewLimit: 50,
  autoPronounce: true,
  speechRate: 0.9,
  speechVoice: 'en-US',
  theme: 'light'
};

export class StorageManager {
  static getSettings() {
    try {
      if (typeof localStorage === 'undefined') return { ...DEFAULT_SETTINGS };
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : { ...DEFAULT_SETTINGS };
    } catch (e) {
      console.error('Error reading settings:', e);
      return { ...DEFAULT_SETTINGS };
    }
  }

  static saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  }

  static getAllCardStates() {
    try {
      if (typeof localStorage === 'undefined') return {};
      const data = localStorage.getItem(STORAGE_KEYS.CARDS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Error reading cards:', e);
      return {};
    }
  }

  static getCardState(cardId) {
    const cards = this.getAllCardStates();
    return cards[cardId] || null;
  }

  static saveCardState(cardState) {
    try {
      if (typeof localStorage === 'undefined') return;
      const cards = this.getAllCardStates();
      cards[cardState.id] = cardState;
      localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
    } catch (e) {
      console.error('Error saving card state:', e);
    }
  }

  static saveMultipleCardStates(cardStatesMap) {
    try {
      if (typeof localStorage === 'undefined') return;
      const cards = { ...this.getAllCardStates(), ...cardStatesMap };
      localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
    } catch (e) {
      console.error('Error saving batch cards:', e);
    }
  }

  static logReview(reviewEvent) {
    try {
      if (typeof localStorage === 'undefined') return;
      const logs = this.getStudyLogs();
      logs.push({
        ...reviewEvent,
        timestamp: new Date().toISOString()
      });
      // Giữ 3000 logs gần nhất để tối ưu dung lượng
      if (logs.length > 3000) logs.splice(0, logs.length - 3000);
      localStorage.setItem(STORAGE_KEYS.STUDY_LOGS, JSON.stringify(logs));
    } catch (e) {
      console.error('Error logging review:', e);
    }
  }

  static getStudyLogs() {
    try {
      if (typeof localStorage === 'undefined') return [];
      const data = localStorage.getItem(STORAGE_KEYS.STUDY_LOGS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading logs:', e);
      return [];
    }
  }

  static getCustomDecks() {
    try {
      if (typeof localStorage === 'undefined') return [];
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_DECKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading custom decks:', e);
      return [];
    }
  }

  static saveCustomDeck(deck) {
    try {
      const decks = this.getCustomDecks();
      const index = decks.findIndex(d => d.id === deck.id);
      if (index >= 0) {
        decks[index] = deck;
      } else {
        decks.push(deck);
      }
      localStorage.setItem(STORAGE_KEYS.CUSTOM_DECKS, JSON.stringify(decks));
    } catch (e) {
      console.error('Error saving custom deck:', e);
    }
  }

  static deleteCustomDeck(deckId) {
    try {
      let decks = this.getCustomDecks();
      decks = decks.filter(d => d.id !== deckId);
      localStorage.setItem(STORAGE_KEYS.CUSTOM_DECKS, JSON.stringify(decks));
    } catch (e) {
      console.error('Error deleting custom deck:', e);
    }
  }

  static exportBackup() {
    return {
      version: '1.0',
      exportDate: new Date().toISOString(),
      settings: this.getSettings(),
      cards: this.getAllCardStates(),
      logs: this.getStudyLogs(),
      customDecks: this.getCustomDecks()
    };
  }

  static importBackup(backupData) {
    try {
      if (backupData.settings) this.saveSettings(backupData.settings);
      if (backupData.cards) localStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(backupData.cards));
      if (backupData.logs) localStorage.setItem(STORAGE_KEYS.STUDY_LOGS, JSON.stringify(backupData.logs));
      if (backupData.customDecks) localStorage.setItem(STORAGE_KEYS.CUSTOM_DECKS, JSON.stringify(backupData.customDecks));
      return { success: true };
    } catch (e) {
      console.error('Error importing backup:', e);
      return { success: false, error: e.message };
    }
  }

  static clearAllData() {
    try {
      localStorage.removeItem(STORAGE_KEYS.CARDS);
      localStorage.removeItem(STORAGE_KEYS.STUDY_LOGS);
      localStorage.removeItem(STORAGE_KEYS.CUSTOM_DECKS);
      return true;
    } catch (e) {
      console.error('Error clearing data:', e);
      return false;
    }
  }
}
