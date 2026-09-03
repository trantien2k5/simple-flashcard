/**
 * Stats & Analytics Manager for FSRS-6 English Learning
 */

import { StorageManager } from './storage.js';
import { State, Rating } from './fsrs.js';

export class StatsManager {
  /**
   * Tính toán toàn bộ chỉ số thống kê tổng hợp
   */
  static getOverallStats(allCards = []) {
    const cardStates = StorageManager.getAllCardStates();
    const logs = StorageManager.getStudyLogs();
    const now = new Date();

    let totalCards = allCards.length;
    let newCardsCount = 0;
    let learningCardsCount = 0;
    let reviewCardsCount = 0;
    let masteredCardsCount = 0;
    let totalStability = 0;
    let totalDifficulty = 0;
    let ratedCardsCount = 0;

    // Stability Breakdown
    const stabilityBuckets = {
      short: 0,   // < 3 days
      medium: 0,  // 3 - 14 days
      long: 0,    // 14 - 30 days
      mature: 0   // > 30 days
    };

    // Difficulty Breakdown
    const difficultyBuckets = {
      easy: 0,   // 1 - 4
      medium: 0, // 4.1 - 7
      hard: 0    // 7.1 - 10
    };

    for (const card of allCards) {
      const state = cardStates[card.id];
      if (!state || state.state === State.New) {
        newCardsCount++;
      } else if (state.state === State.Learning || state.state === State.Relearning) {
        learningCardsCount++;
      } else if (state.state === State.Review) {
        reviewCardsCount++;
        if (state.stability >= 21) {
          masteredCardsCount++;
        }
      }

      if (state && state.stability > 0) {
        totalStability += state.stability;
        totalDifficulty += (state.difficulty || 5);
        ratedCardsCount++;

        if (state.stability < 3) stabilityBuckets.short++;
        else if (state.stability <= 14) stabilityBuckets.medium++;
        else if (state.stability <= 30) stabilityBuckets.long++;
        else stabilityBuckets.mature++;

        const d = state.difficulty || 5;
        if (d <= 4) difficultyBuckets.easy++;
        else if (d <= 7) difficultyBuckets.medium++;
        else difficultyBuckets.hard++;
      }
    }

    // Tỉ lệ nhớ Retention Rate thực tế từ logs
    let recallSuccessCount = 0;
    for (const log of logs) {
      if (log.rating === Rating.Good || log.rating === Rating.Easy) {
        recallSuccessCount++;
      }
    }
    const retentionRate = logs.length > 0 ? Math.round((recallSuccessCount / logs.length) * 100) : 95;

    // Streak & Ngày học
    const streak = this.calculateStreak(logs);
    const weeklyActivity = this.getWeeklyActivity(logs);
    const forecast7Days = this.get7DaysForecast(cardStates);

    return {
      totalCards,
      learnedCards: totalCards - newCardsCount,
      newCardsCount,
      learningCardsCount,
      reviewCardsCount,
      masteredCardsCount,
      totalReviews: logs.length,
      retentionRate,
      streak,
      avgStability: ratedCardsCount > 0 ? (totalStability / ratedCardsCount).toFixed(1) : '0',
      avgDifficulty: ratedCardsCount > 0 ? (totalDifficulty / ratedCardsCount).toFixed(1) : '0',
      stabilityBuckets,
      difficultyBuckets,
      weeklyActivity,
      forecast7Days
    };
  }

  /**
   * Tính toán chuỗi ngày học liên tục (Streak)
   */
  static calculateStreak(logs) {
    if (!logs || logs.length === 0) return 0;

    const dateSet = new Set();
    logs.forEach(log => {
      const d = new Date(log.timestamp);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      dateSet.add(key);
    });

    let streak = 0;
    const today = new Date();
    
    // Kiểm tra từ hôm nay lùi về quá khứ
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      
      if (dateSet.has(key)) {
        streak++;
      } else {
        // Nếu hôm nay chưa học thì vẫn cho phép tính streak từ ngày hôm qua
        if (i === 0) continue;
        break;
      }
    }

    return streak;
  }

  /**
   * Lấy số lượt ôn trong 7 ngày gần nhất
   */
  static getWeeklyActivity(logs) {
    const result = [];
    const today = new Date();
    const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      
      let count = 0;
      logs.forEach(log => {
        const ld = new Date(log.timestamp);
        const lKey = `${ld.getFullYear()}-${String(ld.getMonth() + 1).padStart(2, '0')}-${String(ld.getDate()).padStart(2, '0')}`;
        if (lKey === dateKey) count++;
      });

      result.push({
        dayName: dayNames[d.getDay()],
        date: dateKey,
        count: count
      });
    }

    return result;
  }

  /**
   * Dự báo số thẻ đến hạn trong 7 ngày tới
   */
  static get7DaysForecast(cardStates) {
    const forecast = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      const targetDay = new Date(today);
      targetDay.setDate(today.getDate() + i);
      const nextDay = new Date(targetDay);
      nextDay.setDate(targetDay.getDate() + 1);

      let count = 0;
      for (const cardId in cardStates) {
        const card = cardStates[cardId];
        if (card.due && card.state !== State.New) {
          const dueDate = new Date(card.due);
          if (dueDate >= targetDay && dueDate < nextDay) {
            count++;
          }
        }
      }

      forecast.push({
        dayOffset: i,
        label: i === 0 ? 'Hôm nay' : i === 1 ? 'Ngày mai' : `+${i} ngày`,
        count
      });
    }

    return forecast;
  }
}
