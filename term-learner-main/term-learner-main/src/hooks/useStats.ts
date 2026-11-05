
import { useState, useEffect } from 'react';

export interface Stats {
  totalAnswered: number;
  correct: number;
  streak: number;
  bestStreak: number;
}

const STATS_STORAGE_KEY = 'stellar-learning-stats';

export const useStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalAnswered: 0,
    correct: 0,
    streak: 0,
    bestStreak: 0,
  });

  // Load stats from localStorage on mount
  useEffect(() => {
    const savedStats = localStorage.getItem(STATS_STORAGE_KEY);
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (error) {
        console.error('Failed to load stats from localStorage:', error);
      }
    }
  }, []);

  // Save stats to localStorage whenever stats change
  useEffect(() => {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  const updateStats = (isCorrect: boolean) => {
    setStats(prev => {
      const newStats = {
        totalAnswered: prev.totalAnswered + 1,
        correct: prev.correct + (isCorrect ? 1 : 0),
        streak: isCorrect ? prev.streak + 1 : 0,
        bestStreak: prev.bestStreak,
      };

      // Update best streak if current streak is higher
      if (newStats.streak > newStats.bestStreak) {
        newStats.bestStreak = newStats.streak;
      }

      return newStats;
    });
  };

  const resetStats = () => {
    setStats({
      totalAnswered: 0,
      correct: 0,
      streak: 0,
      bestStreak: 0,
    });
  };

  return {
    stats,
    updateStats,
    resetStats,
  };
};
