/**
 * Application Entry Point - Coordinates Tabs, FSRS Engine, UI Events & Audio
 */

import { DeckManager } from './deck-manager.js';
import { StorageManager, DEFAULT_SETTINGS } from './storage.js';
import { StudySession } from './study-session.js';
import { StatsManager } from './stats.js';
import { Rating, State } from './fsrs.js';

class FlashcardApp {
  constructor() {
    this.deckManager = new DeckManager();
    this.settings = StorageManager.getSettings();
    this.activeTab = 'tab-home';
    this.currentPreviewDeckId = null;

    this.studySession = new StudySession({
      deckManager: this.deckManager,
      settings: this.settings,
      onCardChange: this.handleCardChange.bind(this),
      onFinish: this.handleStudyFinish.bind(this)
    });
  }

  async init() {
    // 1. Áp dụng Theme (Mặc định Light Mode)
    this.applyTheme(this.settings.theme || 'light');

    // 2. Khởi tạo danh mục Decks từ data/
    await this.deckManager.init();

    // 3. Khởi tạo giao diện các tab
    this.setupTabNavigation();
    this.setupStudyControls();
    this.setupModals();
    this.setupSettingsUI();
    this.setupSearch();

    // 4. Render dữ liệu ban đầu
    this.refreshAllViews();
  }

  /**
   * Điều hướng 4 Tabs Mobile
   */
  setupTabNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const targetTab = item.getAttribute('data-tab');
        this.switchTab(targetTab);
      });
    });
  }

  switchTab(tabId) {
    this.activeTab = tabId;

    // Cập nhật tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('active');
    });
    const activePane = document.getElementById(tabId);
    if (activePane) activePane.classList.add('active');

    // Cập nhật nav buttons
    document.querySelectorAll('.nav-item').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Làm mới dữ liệu tab khi kích hoạt
    if (tabId === 'tab-home') this.renderHomeTab();
    else if (tabId === 'tab-decks') this.renderDecksTab();
    else if (tabId === 'tab-stats') this.renderStatsTab();
  }

  /**
   * Cập nhật toàn bộ các view và chỉ số
   */
  refreshAllViews() {
    this.renderHomeTab();
    this.renderDecksTab();
    this.renderStatsTab();
    this.updateHeaderBadges();
  }

  updateHeaderBadges() {
    const logs = StorageManager.getStudyLogs();
    const streak = StatsManager.calculateStreak(logs);
    const streakEl = document.getElementById('streak-count');
    if (streakEl) streakEl.textContent = streak;

    const queue = this.deckManager.getStudyQueue(null, this.settings);
    const dueBadge = document.getElementById('nav-due-badge');
    if (dueBadge) {
      if (queue.totalDue > 0) {
        dueBadge.style.display = 'block';
        dueBadge.textContent = queue.totalDue > 99 ? '99+' : queue.totalDue;
      } else {
        dueBadge.style.display = 'none';
      }
    }
  }

  /* --------------------------------------------------------------------------
     TAB 1: TRANG CHỦ (HOME)
     -------------------------------------------------------------------------- */
  renderHomeTab() {
    const queue = this.deckManager.getStudyQueue(null, this.settings);
    const allCards = this.deckManager.getAllCards();
    const stats = StatsManager.getOverallStats(allCards);
    const logs = StorageManager.getStudyLogs();
    const streak = StatsManager.calculateStreak(logs);

    // 3 ô chỉ số Hero: Cần ôn, Từ mới (dự kiến hôm nay), Đã tích lũy
    const dueEl = document.getElementById('home-due-count');
    if (dueEl) dueEl.textContent = queue.totalDue;

    const newEl = document.getElementById('home-new-count');
    if (newEl) newEl.textContent = queue.newCards.length;

    const learnedEl = document.getElementById('home-learned-count');
    if (learnedEl) learnedEl.textContent = stats.learnedCards;

    // 2 thẻ số liệu phía dưới: Streak & Retention
    const streakEl = document.getElementById('home-streak-count');
    if (streakEl) streakEl.textContent = `${Math.max(1, streak)} ngày`;

    const retentionEl = document.getElementById('home-retention-rate');
    if (retentionEl) retentionEl.textContent = `${stats.retentionRate}%`;

    // Render danh sách bộ thẻ nổi bật
    const popularContainer = document.getElementById('home-popular-decks');
    if (!popularContainer) return;
    popularContainer.innerHTML = '';

    const decks = this.deckManager.getAllDecks().slice(0, 3);
    decks.forEach(deck => {
      const deckStats = this.deckManager.getDeckStats(deck.id);
      const cardEl = document.createElement('div');
      cardEl.className = 'deck-item-card';
        let statusText = '<span style="color: var(--text-muted);">Chưa học</span>';
        if (deckStats.dueCount > 0) {
          statusText = `<span style="color: #f87171; font-weight: 700;">⚠️ ${deckStats.dueCount} từ cần ôn</span>`;
        } else if (deckStats.total - deckStats.newCount > 0) {
          statusText = '<span style="color: #10b981; font-weight: 700;">✓ Đã ôn xong hôm nay</span>';
        }

        cardEl.innerHTML = `
        <div class="deck-card-top">
          <div class="deck-icon-badge" style="background: ${deck.color}18; color: ${deck.color};">${deck.icon || '📚'}</div>
          <div class="deck-info">
            <div class="deck-title-row">
              <h4 class="deck-title">${deck.title}</h4>
              <span class="deck-count-pill">${deckStats.total} từ</span>
            </div>
            <p class="deck-description">${deck.description || ''}</p>
          </div>
        </div>
        <div class="deck-progress-bar-bg">
          <div class="deck-progress-fill" style="width: ${deckStats.progressPercent}%;"></div>
        </div>
        <div class="deck-footer-stats">
          <span>Tiến độ: ${deckStats.total - deckStats.newCount}/${deckStats.total} từ</span>
          ${statusText}
        </div>
      `;
      cardEl.addEventListener('click', () => this.openDeckPreview(deck.id));
      popularContainer.appendChild(cardEl);
    });

    // Nút Bắt đầu học ngay
    const btnStartDaily = document.getElementById('btn-start-daily-study');
    btnStartDaily.onclick = () => {
      const studyQueue = this.deckManager.getStudyQueue(null, this.settings);
      if (studyQueue.queue.length === 0) {
        this.showToast('Tuyệt vời! Bạn đã hoàn thành tất cả thẻ cần ôn hôm nay 🎉');
        return;
      }
      this.startStudySession(studyQueue.queue);
    };
  }

  /* --------------------------------------------------------------------------
     TAB 2: CHỦ ĐỀ & TÌM KIẾM
     -------------------------------------------------------------------------- */
  renderDecksTab(filterCategory = 'all') {
    const allDecks = this.deckManager.getAllDecks();

    // Tự động cập nhật 3 thông số tổng quan: Chủ đề lớn, Chủ đề con, Từ vựng
    const totalTopics = allDecks.length;
    const totalSubtopics = allDecks.reduce((sum, d) => sum + (d.subcategories && d.subcategories.length ? d.subcategories.length : 1), 0);
    const totalWords = allDecks.reduce((sum, d) => sum + (d.cards ? d.cards.length : 0), 0);

    const taxTopicsEl = document.getElementById('tax-topics-count');
    if (taxTopicsEl) taxTopicsEl.textContent = totalTopics;

    const taxSubtopicsEl = document.getElementById('tax-subtopics-count');
    if (taxSubtopicsEl) taxSubtopicsEl.textContent = totalSubtopics;

    const taxWordsEl = document.getElementById('tax-words-count');
    if (taxWordsEl) taxWordsEl.textContent = totalWords.toLocaleString('vi-VN');

    const container = document.getElementById('all-decks-container');
    if (!container) return;
    container.innerHTML = '';

    let decks = allDecks;
    if (filterCategory !== 'all') {
      decks = decks.filter(d => d.category === filterCategory || (filterCategory.startsWith('Phase') && d.phase === parseInt(filterCategory.replace('Phase', ''), 10)));
    }

    decks.forEach(deck => {
      const deckStats = this.deckManager.getDeckStats(deck.id);
      const isCore = deck.id === 'core-english';
      const cardEl = document.createElement('div');
      cardEl.className = 'deck-item-card';
      if (isCore) {
        cardEl.style.borderColor = 'rgba(234, 179, 8, 0.4)';
        cardEl.style.background = 'linear-gradient(135deg, rgba(234, 179, 8, 0.08), rgba(99, 102, 241, 0.05))';
      }

      let statusText = '<span style="color: var(--text-muted);">Chưa học</span>';
      if (deckStats.dueCount > 0) {
        statusText = `<span style="color: #f87171; font-weight: 700;">⚠️ ${deckStats.dueCount} cần ôn</span>`;
      } else if (deckStats.total - deckStats.newCount > 0) {
        statusText = '<span style="color: #10b981; font-weight: 700;">✓ Đã ôn xong</span>';
      }

      cardEl.innerHTML = `
        <div class="deck-card-top">
          <div class="deck-icon-badge" style="background: ${deck.color || '#6366f1'}18; color: ${deck.color || '#6366f1'}; font-size: 1.4rem;">${deck.icon || '📚'}</div>
          <div class="deck-info">
            <div class="deck-title-row">
              <h4 class="deck-title" style="display: flex; align-items: center; gap: 6px;">
                ${deck.title}
                ${isCore ? '<span class="brand-badge" style="background: rgba(234,179,8,0.2); color: #eab308; font-size: 0.65rem; padding: 1px 6px;">CORE</span>' : ''}
              </h4>
              <span class="deck-count-pill">${deckStats.total} từ</span>
            </div>
            <p class="deck-description">${deck.description || ''}</p>
            ${deck.subcategories && deck.subcategories.length ? `
            <div class="deck-subtopics-preview">
              <span>📂 ${deck.subcategories.length} chủ đề con:</span>
              <span class="subtopics-list">${deck.subcategories.slice(0, 3).join(', ')}${deck.subcategories.length > 3 ? ` +${deck.subcategories.length - 3}` : ''}</span>
            </div>
            ` : ''}
          </div>
        </div>
        <div class="deck-progress-bar-bg">
          <div class="deck-progress-fill" style="width: ${deckStats.progressPercent}%; ${isCore ? 'background: linear-gradient(90deg, #eab308, #f59e0b);' : ''}"></div>
        </div>
        <div class="deck-footer-stats">
          <span>Tiến độ: ${deckStats.total - deckStats.newCount}/${deckStats.total} từ</span>
          ${statusText}
        </div>
      `;
      cardEl.addEventListener('click', () => this.openDeckPreview(deck.id));
      container.appendChild(cardEl);
    });

    // Setup Category Pills click listeners
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(pill => {
      pill.onclick = (e) => {
        e.stopPropagation();
        pills.forEach(p => p.classList.remove('level', 'active'));
        pill.classList.add('level', 'active');
        const cat = pill.getAttribute('data-cat');
        this.renderDecksTab(cat);
      };
    });
  }

  setupSearch() {
    const searchInput = document.getElementById('deck-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value;
      const container = document.getElementById('all-decks-container');
      if (!query.trim()) {
        this.renderDecksTab();
        return;
      }

      const results = this.deckManager.searchCards(query);
      container.innerHTML = `<div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">Tìm thấy ${results.length} từ vựng phù hợp:</div>`;

      if (results.length === 0) {
        container.innerHTML += `<div style="text-align: center; padding: 30px; color: var(--text-muted);">Không tìm thấy từ vựng nào phù hợp với từ khóa "${query}".</div>`;
        return;
      }

      results.slice(0, 20).forEach(card => {
        const item = document.createElement('div');
        item.className = 'deck-item-card';
        item.style.padding = '12px 16px';
        item.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-weight: 700; font-size: 1.05rem;">${card.word}</span>
              <span style="color: var(--accent); font-family: var(--font-mono); font-size: 0.85rem; margin-left: 6px;">${card.phonetic || ''}</span>
              <span class="badge-tag" style="margin-left: 6px;">${card.pos || ''}</span>
            </div>
            <button class="btn-tts-audio" style="width: 28px; height: 28px; font-size: 0.8rem;" data-word="${card.word}">🔊</button>
          </div>
          <div style="font-size: 0.88rem; color: var(--text-primary);">${card.meaning || ''}</div>
          ${card.example ? `<div style="font-size: 0.78rem; color: var(--text-muted); font-style: italic;">"${card.example}"</div>` : ''}
        `;
        item.querySelector('.btn-tts-audio').onclick = (ev) => {
          ev.stopPropagation();
          this.studySession.speak(card.word);
        };
        container.appendChild(item);
      });
    });
  }

  /* --------------------------------------------------------------------------
     TAB 3: THỐNG KÊ (STATS)
     -------------------------------------------------------------------------- */
  renderStatsTab() {
    const allCards = this.deckManager.getAllCards();
    const stats = StatsManager.getOverallStats(allCards);

    // 1. Biểu đồ 7 ngày qua (Weekly Activity Chart)
    const weeklyChart = document.getElementById('weekly-chart');
    if (weeklyChart) {
      weeklyChart.innerHTML = '';
      const maxCount = Math.max(1, ...stats.weeklyActivity.map(a => a.count));
      stats.weeklyActivity.forEach(day => {
        const percent = Math.min(100, Math.max(8, (day.count / maxCount) * 100));
        const col = document.createElement('div');
        col.className = 'bar-col';
        col.innerHTML = `
          <span class="bar-count-label">${day.count}</span>
          <div class="bar-fill" style="height: ${percent}%;"></div>
          <span class="bar-day-label">${day.dayName}</span>
        `;
        weeklyChart.appendChild(col);
      });
    }

    // 2. Memory Stability Matrix
    const stabilityMatrix = document.getElementById('stability-matrix');
    if (stabilityMatrix) {
      const b = stats.stabilityBuckets;
      const total = Math.max(1, b.short + b.medium + b.long + b.mature);
      stabilityMatrix.innerHTML = `
        <div class="matrix-item">
          <div class="matrix-item-header"><span>Ghi nhớ dài hạn (> 30 ngày)</span><span>${b.mature} từ</span></div>
          <div class="deck-progress-bar-bg"><div class="deck-progress-fill" style="width: ${(b.mature/total)*100}%; background: var(--fsrs-good);"></div></div>
        </div>
        <div class="matrix-item">
          <div class="matrix-item-header"><span>Ghi nhớ trung hạn (14 - 30 ngày)</span><span>${b.long} từ</span></div>
          <div class="deck-progress-bar-bg"><div class="deck-progress-fill" style="width: ${(b.long/total)*100}%; background: var(--fsrs-easy);"></div></div>
        </div>
        <div class="matrix-item">
          <div class="matrix-item-header"><span>Đang củng cố (3 - 14 ngày)</span><span>${b.medium} từ</span></div>
          <div class="deck-progress-bar-bg"><div class="deck-progress-fill" style="width: ${(b.medium/total)*100}%; background: var(--fsrs-hard);"></div></div>
        </div>
        <div class="matrix-item">
          <div class="matrix-item-header"><span>Mới học / Cần nhắc lại (< 3 ngày)</span><span>${b.short} từ</span></div>
          <div class="deck-progress-bar-bg"><div class="deck-progress-fill" style="width: ${(b.short/total)*100}%; background: var(--fsrs-again);"></div></div>
        </div>
      `;
    }

    // 3. Dự báo 7 ngày tới
    const forecastList = document.getElementById('forecast-list');
    if (forecastList) {
      forecastList.innerHTML = '';
      stats.forecast7Days.forEach(fc => {
        const item = document.createElement('div');
        item.className = 'matrix-item';
        item.innerHTML = `
          <div class="matrix-item-header">
            <span>${fc.label}</span>
            <span style="font-family: var(--font-mono); font-weight: 700; color: ${fc.count > 0 ? '#f87171' : 'var(--text-muted)'};">${fc.count} thẻ đến hạn</span>
          </div>
        `;
        forecastList.appendChild(item);
      });
    }
  }

  /* --------------------------------------------------------------------------
     TAB 4: PROFILE & CÀI ĐẶT
     -------------------------------------------------------------------------- */
  setupSettingsUI() {
    const retentionSlider = document.getElementById('setting-retention');
    const retentionLabel = document.getElementById('retention-slider-label');
    const newLimitSlider = document.getElementById('setting-new-limit');
    const newLimitLabel = document.getElementById('new-limit-label');
    const reviewLimitSlider = document.getElementById('setting-review-limit');
    const reviewLimitLabel = document.getElementById('review-limit-label');
    const autoSpeechToggle = document.getElementById('setting-auto-speech');
    const darkThemeToggle = document.getElementById('setting-dark-theme');

    // Khởi tạo giá trị
    retentionSlider.value = this.settings.requestRetention || 0.90;
    retentionLabel.textContent = `Mục tiêu: ${Math.round(retentionSlider.value * 100)}%`;

    newLimitSlider.value = this.settings.dailyNewLimit || 15;
    newLimitLabel.textContent = `${newLimitSlider.value} từ/ngày`;

    reviewLimitSlider.value = this.settings.dailyReviewLimit || 50;
    reviewLimitLabel.textContent = `${reviewLimitSlider.value} thẻ/ngày`;

    autoSpeechToggle.checked = this.settings.autoPronounce !== false;
    darkThemeToggle.checked = (this.settings.theme || 'dark') === 'dark';

    // Events
    retentionSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      retentionLabel.textContent = `Mục tiêu: ${Math.round(val * 100)}%`;
      this.settings.requestRetention = val;
      StorageManager.saveSettings(this.settings);
    });

    newLimitSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      newLimitLabel.textContent = `${val} từ/ngày`;
      this.settings.dailyNewLimit = val;
      StorageManager.saveSettings(this.settings);
      this.refreshAllViews();
    });

    reviewLimitSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      reviewLimitLabel.textContent = `${val} thẻ/ngày`;
      this.settings.dailyReviewLimit = val;
      StorageManager.saveSettings(this.settings);
      this.refreshAllViews();
    });

    autoSpeechToggle.addEventListener('change', (e) => {
      this.settings.autoPronounce = e.target.checked;
      StorageManager.saveSettings(this.settings);
    });

    darkThemeToggle.addEventListener('change', (e) => {
      const theme = e.target.checked ? 'dark' : 'light';
      this.settings.theme = theme;
      this.applyTheme(theme);
      StorageManager.saveSettings(this.settings);
    });

    // Backup Export
    document.getElementById('btn-export-data').addEventListener('click', () => {
      const backup = StorageManager.exportBackup();
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `fsrs_flashcard_backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast('Đã xuất file sao lưu thành công! 📁');
    });

    // Backup Import
    const importInput = document.getElementById('input-import-file');
    document.getElementById('btn-import-data-trigger').addEventListener('click', () => {
      importInput.click();
    });

    importInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          const res = StorageManager.importBackup(data);
          if (res.success) {
            this.showToast('Khôi phục dữ liệu FSRS thành công! 🎉');
            this.settings = StorageManager.getSettings();
            this.applyTheme(this.settings.theme || 'dark');
            this.refreshAllViews();
          } else {
            this.showToast('Lỗi dữ liệu file: ' + res.error);
          }
        } catch (err) {
          this.showToast('Không thể đọc file JSON.');
        }
      };
      reader.readAsText(file);
    });

    // Reset All Data
    document.getElementById('btn-reset-data').addEventListener('click', async () => {
      const confirmed = await this.showConfirm({
        title: 'Xóa toàn bộ dữ liệu?',
        message: 'Hành động này sẽ đặt lại toàn bộ tiến trình học FSRS về trạng thái ban đầu và không thể hoàn tác.',
        confirmText: 'Xóa vĩnh viễn',
        cancelText: 'Hủy bỏ',
        type: 'danger',
        icon: '🗑️'
      });

      if (confirmed) {
        StorageManager.clearAllData();
        this.showToast('Đã đặt lại toàn bộ dữ liệu FSRS.', 'success');
        this.refreshAllViews();
      }
    });
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  /* --------------------------------------------------------------------------
     STUDY SESSION CONTROLLER (3D FLASHCARD & FSRS GRADING)
     -------------------------------------------------------------------------- */
  setupStudyControls() {
    const overlay = document.getElementById('study-overlay');
    const flashcardEl = document.getElementById('flashcard-element');
    const fsrsButtonsContainer = document.getElementById('fsrs-buttons-container');
    const btnClose = document.getElementById('btn-study-close');
    const btnAudioFront = document.getElementById('btn-audio-front');

    // Lật thẻ khi chạm vào thẻ
    const triggerFlip = () => {
      if (!overlay.classList.contains('active')) return;
      const isFlipped = this.studySession.flipCard();
      flashcardEl.classList.toggle('flipped', isFlipped);
      fsrsButtonsContainer.classList.toggle('visible', isFlipped);
    };

    flashcardEl.addEventListener('click', (e) => {
      if (e.target.closest('.btn-tts-audio')) return;
      triggerFlip();
    });

    // Audio button
    btnAudioFront.addEventListener('click', (e) => {
      e.stopPropagation();
      if (this.studySession.currentCard) {
        this.studySession.speak(this.studySession.currentCard.word);
      }
    });

    // Close session with Custom Confirmation & Summary
    btnClose.addEventListener('click', async () => {
      const stats = this.studySession.sessionStats;
      if (stats.total > 0) {
        const confirmed = await this.showConfirm({
          title: 'Dừng phiên học?',
          message: `Bạn đã ôn được ${stats.total} từ. Bạn có muốn dừng và xem tổng kết không?`,
          confirmText: 'Xem tổng kết',
          cancelText: 'Học tiếp',
          type: 'info',
          icon: '📊'
        });

        if (confirmed) {
          overlay.classList.remove('active');
          this.showSummaryModal(stats, true);
        }
      } else {
        overlay.classList.remove('active');
        this.refreshAllViews();
      }
    });

    // 4 FSRS Rating buttons
    document.querySelectorAll('.btn-fsrs-rating').forEach(btn => {
      btn.addEventListener('click', () => {
        const rating = parseInt(btn.getAttribute('data-rating'), 10);
        this.studySession.rateCard(rating);
      });
    });

    // Keyboard Shortcuts (Space: Flip, 1/2/3/4: Ratings)
    window.addEventListener('keydown', (e) => {
      if (!overlay.classList.contains('active')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        triggerFlip();
      } else if (this.studySession.isFlipped) {
        if (e.key === '1') this.studySession.rateCard(Rating.Again);
        else if (e.key === '2') this.studySession.rateCard(Rating.Hard);
        else if (e.key === '3') this.studySession.rateCard(Rating.Good);
        else if (e.key === '4') this.studySession.rateCard(Rating.Easy);
      }
    });

    // Button Về trang chủ trong màn hình tổng kết
    document.getElementById('btn-summary-home').addEventListener('click', () => {
      document.getElementById('study-summary-modal').classList.remove('active');
      document.getElementById('study-overlay').classList.remove('active');
      this.refreshAllViews();
    });
  }

  startStudySession(queue) {
    const overlay = document.getElementById('study-overlay');
    overlay.classList.add('active');
    this.studySession.start(queue);
  }

  handleCardChange(card, progress) {
    const flashcardEl = document.getElementById('flashcard-element');
    const fsrsButtonsContainer = document.getElementById('fsrs-buttons-container');

    // Reset về mặt trước
    flashcardEl.classList.remove('flipped');
    fsrsButtonsContainer.classList.remove('visible');

    // Cập nhật nội dung thẻ và thanh tiến độ
    const currentNum = progress.index + 1;
    const totalNum = progress.total || 1;
    const percent = Math.min(100, Math.max(5, Math.round((currentNum / totalNum) * 100)));
    
    document.getElementById('study-progress-text').textContent = `${currentNum} / ${totalNum}`;
    const progressBar = document.getElementById('study-progress-bar-fill');
    if (progressBar) {
      progressBar.style.width = `${percent}%`;
    }

    document.getElementById('card-pos-badge').textContent = (card.pos || 'word').toUpperCase();
    document.getElementById('card-pos-badge-back').textContent = (card.pos || 'word').toUpperCase();
    
    const cefrText = card.level || 'A2';
    const cefrBadgeFront = document.getElementById('card-cefr-badge');
    const cefrBadgeBack = document.getElementById('card-cefr-badge-back');
    if (cefrBadgeFront) cefrBadgeFront.textContent = cefrText;
    if (cefrBadgeBack) cefrBadgeBack.textContent = cefrText;

    document.getElementById('card-front-word').textContent = card.word || '';
    document.getElementById('card-front-phonetic').textContent = card.phonetic || '';
    document.getElementById('card-back-meaning').textContent = card.meaning || '';
    document.getElementById('card-back-definition').textContent = card.definition || '';
    document.getElementById('card-back-example').textContent = card.example || '';
    document.getElementById('card-back-example-vi').textContent = card.exampleVi || '';

    // Cập nhật FSRS Dynamic Intervals trên 4 nút
    if (card.previews) {
      document.getElementById('interval-again').textContent = card.previews[Rating.Again]?.intervalText || '< 1m';
      document.getElementById('interval-hard').textContent = card.previews[Rating.Hard]?.intervalText || '10m';
      document.getElementById('interval-good').textContent = card.previews[Rating.Good]?.intervalText || '1d';
      document.getElementById('interval-easy').textContent = card.previews[Rating.Easy]?.intervalText || '4d';
    }
  }

  handleStudyFinish(sessionStats) {
    const overlay = document.getElementById('study-overlay');
    overlay.classList.remove('active');
    this.showSummaryModal(sessionStats, false);
    this.refreshAllViews();
  }

  showSummaryModal(stats, isEarlyExit = false) {
    const modal = document.getElementById('study-summary-modal');
    if (!modal) return;

    const titleEl = document.getElementById('summary-modal-title');
    const subtitleEl = document.getElementById('summary-modal-subtitle');
    
    if (isEarlyExit) {
      titleEl.textContent = '📊 Tổng kết phiên học';
      subtitleEl.textContent = 'Tiến trình của các từ bạn vừa ôn đã được lưu an toàn!';
    } else {
      titleEl.textContent = '🎉 Xuất sắc! Hoàn thành mục tiêu';
      subtitleEl.textContent = 'Trí nhớ dài hạn của bạn đã được củng cố với thuật toán FSRS-6';
    }

    const total = stats.total || 0;
    const remembered = (stats.good || 0) + (stats.easy || 0);
    const retentionRate = total > 0 ? Math.round((remembered / total) * 100) : 100;

    document.getElementById('sum-stat-total').textContent = total;
    document.getElementById('sum-stat-retention').textContent = `${retentionRate}%`;
    document.getElementById('sum-stat-again').textContent = stats.again || 0;
    document.getElementById('sum-stat-hard').textContent = stats.hard || 0;
    document.getElementById('sum-stat-good').textContent = stats.good || 0;
    document.getElementById('sum-stat-easy').textContent = stats.easy || 0;

    modal.classList.add('active');
  }

  /* --------------------------------------------------------------------------
     MODALS: PREVIEW & CUSTOM DECK
     -------------------------------------------------------------------------- */
  setupModals() {
    // Modal Xem trước bộ thẻ
    const previewModal = document.getElementById('deck-preview-modal');
    document.getElementById('btn-close-preview-modal').onclick = () => previewModal.classList.remove('active');
    
    document.getElementById('btn-study-this-deck').onclick = () => {
      if (!this.currentPreviewDeckId) return;
      previewModal.classList.remove('active');

      const allDeckCards = this.deckManager.getCardsByDeckId(this.currentPreviewDeckId);
      const isSubtopic = this.currentPreviewSubtopic && this.currentPreviewSubtopic !== 'all';
      
      let targetCards = isSubtopic
        ? allDeckCards.filter(c => c.subtopic === this.currentPreviewSubtopic)
        : allDeckCards;

      const queue = this.deckManager.getStudyQueue(this.currentPreviewDeckId, this.settings);

      if (isSubtopic) {
        const subQueue = queue.queue.filter(c => c.subtopic === this.currentPreviewSubtopic);
        if (subQueue.length > 0) {
          this.startStudySession(subQueue);
        } else {
          this.startStudySession(targetCards);
        }
      } else {
        if (queue.queue.length === 0) {
          this.startStudySession(allDeckCards);
        } else {
          this.startStudySession(queue.queue);
        }
      }
    };

    // Modal Tạo bộ thẻ tùy chỉnh
    const createModal = document.getElementById('create-deck-modal');
    document.getElementById('btn-open-create-deck').onclick = () => createModal.classList.add('active');
    document.getElementById('btn-close-create-modal').onclick = () => createModal.classList.remove('active');

    document.getElementById('btn-save-custom-deck').onclick = () => {
      const name = document.getElementById('custom-deck-name').value.trim();
      const desc = document.getElementById('custom-deck-desc').value.trim();
      const text = document.getElementById('custom-deck-words').value.trim();

      if (!name) {
        this.showToast('Vui lòng nhập tên bộ thẻ.', 'warning');
        return;
      }

      const lines = text.split('\n').filter(l => l.trim().length > 0);
      const cards = lines.map((line, idx) => {
        const parts = line.split('|').map(p => p.trim());
        return {
          id: `c-card-${Date.now()}-${idx}`,
          word: parts[0] || 'Từ mới',
          meaning: parts[1] || 'Nghĩa',
          phonetic: parts[2] || '',
          pos: 'word',
          definition: parts[1] || '',
          example: '',
          exampleVi: ''
        };
      });

      this.deckManager.createCustomDeck(name, desc, '📝', '#8b5cf6', cards);
      createModal.classList.remove('active');
      this.showToast(`Đã tạo bộ thẻ "${name}" với ${cards.length} từ vựng! 🚀`, 'success');
      this.refreshAllViews();
    };
  }

  openDeckPreview(deckId) {
    this.currentPreviewDeckId = deckId;
    this.currentPreviewSubtopic = 'all';

    const deck = this.deckManager.getDeckById(deckId);
    if (!deck) return;

    const cards = this.deckManager.getCardsByDeckId(deckId);
    const cardStates = StorageManager.getAllCardStates();

    document.getElementById('modal-deck-title').textContent = `${deck.icon || '📚'} ${deck.title}`;
    const subContainer = document.getElementById('modal-subtopics-container');
    const listContainer = document.getElementById('modal-deck-cards-list');
    const counterEl = document.getElementById('modal-cards-counter');
    const btnStudy = document.getElementById('btn-study-this-deck');

    // 1. Render Subtopics Filter Chips
    if (subContainer) {
      subContainer.innerHTML = '';
      const subcategories = deck.subcategories || [];

      // Chip Tất cả
      const allChip = document.createElement('button');
      allChip.className = 'subtopic-chip active';
      allChip.innerHTML = `<span>⭐ Tất cả</span> <span class="chip-count">${cards.length}</span>`;
      allChip.onclick = () => selectSubtopic('all', allChip);
      subContainer.appendChild(allChip);

      subcategories.forEach(sub => {
        const subCount = cards.filter(c => c.subtopic === sub).length;
        const chip = document.createElement('button');
        chip.className = 'subtopic-chip';
        chip.innerHTML = `<span>${sub}</span> <span class="chip-count">${subCount}</span>`;
        chip.onclick = () => selectSubtopic(sub, chip);
        subContainer.appendChild(chip);
      });
    }

    // 2. Hàm lọc và render danh sách từ
    const renderCardList = (filterSub) => {
      listContainer.innerHTML = '';
      const filtered = filterSub === 'all' ? cards : cards.filter(c => c.subtopic === filterSub);

      if (counterEl) {
        counterEl.textContent = `Hiển thị: ${filtered.length}/${cards.length} từ`;
      }
      if (btnStudy) {
        btnStudy.textContent = filterSub === 'all' 
          ? `Học cả bộ (${cards.length} từ) 🚀` 
          : `Học "${filterSub}" (${filtered.length} từ) 🚀`;
      }

      filtered.forEach(card => {
        const state = cardStates[card.id];
        let stateBadge = '<span class="badge-tag">Mới</span>';
        if (state && state.state === State.Review) {
          stateBadge = `<span class="badge-tag" style="background: rgba(16,185,129,0.15); color: #10b981;">Đã nhớ (S: ${state.stability?.toFixed(1)}d)</span>`;
        } else if (state && (state.state === State.Learning || state.state === State.Relearning)) {
          stateBadge = '<span class="badge-tag" style="background: rgba(245,158,11,0.15); color: #f59e0b;">Đang học</span>';
        }

        const item = document.createElement('div');
        item.className = 'preview-card-item';
        item.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <strong style="font-size: 1rem; color: var(--text-primary);">${card.word}</strong>
              <span style="color: #0284c7; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 600;">${card.phonetic || ''}</span>
              ${card.subtopic ? `<span class="badge-tag subtopic">${card.subtopic}</span>` : ''}
            </div>
            ${stateBadge}
          </div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 500;">${card.meaning || ''}</div>
        `;
        listContainer.appendChild(item);
      });
    };

    const selectSubtopic = (sub, activeChipEl) => {
      this.currentPreviewSubtopic = sub;
      const chips = subContainer.querySelectorAll('.subtopic-chip');
      chips.forEach(c => c.classList.remove('active'));
      activeChipEl.classList.add('active');
      renderCardList(sub);
    };

    renderCardList('all');
    document.getElementById('deck-preview-modal').classList.add('active');
  }

  /**
   * Custom Confirmation Modal (thay thế window.confirm hoàn toàn)
   */
  showConfirm({ title = 'Xác nhận', message = 'Bạn có chắc chắn không?', confirmText = 'Đồng ý', cancelText = 'Hủy', type = 'info', icon = 'ℹ️' }) {
    return new Promise((resolve) => {
      const modal = document.getElementById('app-confirm-modal');
      const iconEl = document.getElementById('confirm-icon');
      const iconBox = document.getElementById('confirm-icon-box');
      const titleEl = document.getElementById('confirm-title');
      const msgEl = document.getElementById('confirm-message');
      const btnCancel = document.getElementById('btn-confirm-cancel');
      const btnOk = document.getElementById('btn-confirm-ok');

      iconEl.textContent = icon;
      iconBox.className = `confirm-icon-wrapper ${type}`;
      titleEl.textContent = title;
      msgEl.textContent = message;
      btnCancel.textContent = cancelText;
      btnOk.textContent = confirmText;
      btnOk.className = `btn-confirm-primary ${type}`;

      modal.classList.add('active');

      const cleanup = () => {
        modal.classList.remove('active');
        btnOk.onclick = null;
        btnCancel.onclick = null;
      };

      btnOk.onclick = () => {
        cleanup();
        resolve(true);
      };

      btnCancel.onclick = () => {
        cleanup();
        resolve(false);
      };
    });
  }

  /**
   * Upgraded In-App Floating Toast Notification (thay thế window.alert)
   */
  showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = {
      success: '✅',
      info: '💡',
      warning: '⚠️',
      error: '❌'
    };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || '💡'}</span>
      <div class="toast-content">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-12px) scale(0.95)';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
}

// Khởi chạy App khi DOM sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
  const app = new FlashcardApp();
  app.init();
});
