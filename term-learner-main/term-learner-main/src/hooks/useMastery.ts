
import { useState, useEffect } from 'react';

export interface PairMastery {
  term: string;
  definition: string;
  correctCount: number;
  status: 'nieuw' | 'bijna' | 'geleerd';
}

export interface SessionResult {
  pairs: PairMastery[];
  totalCorrect: number;
  totalWrong: number;
  totalQuestions: number;
}

const MASTERY_KEY = 'stellar-mastery-data';

export const useMastery = (setId: string | null) => {
  const [masteryMap, setMasteryMap] = useState<Record<string, Record<string, number>>>({});

  useEffect(() => {
    const saved = localStorage.getItem(MASTERY_KEY);
    if (saved) {
      try {
        setMasteryMap(JSON.parse(saved));
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (Object.keys(masteryMap).length > 0) {
      localStorage.setItem(MASTERY_KEY, JSON.stringify(masteryMap));
    }
  }, [masteryMap]);

  const getKey = (term: string, definition: string) => `${term}|||${definition}`;

  const recordAnswer = (term: string, definition: string, correct: boolean) => {
    if (!setId) return;
    const key = getKey(term, definition);
    setMasteryMap(prev => {
      const setData = { ...(prev[setId] || {}) };
      const current = setData[key] || 0;
      setData[key] = correct ? current + 1 : Math.max(0, current - 1);
      return { ...prev, [setId]: setData };
    });
  };

  const getMastery = (term: string, definition: string): PairMastery => {
    if (!setId) return { term, definition, correctCount: 0, status: 'nieuw' };
    const key = getKey(term, definition);
    const count = masteryMap[setId]?.[key] || 0;
    let status: 'nieuw' | 'bijna' | 'geleerd' = 'nieuw';
    if (count >= 2) status = 'geleerd';
    else if (count >= 1) status = 'bijna';
    return { term, definition, correctCount: count, status };
  };

  const getSessionResults = (pairs: { term: string; definition: string }[]): PairMastery[] => {
    return pairs.map(p => getMastery(p.term, p.definition));
  };

  const resetMastery = () => {
    if (!setId) return;
    setMasteryMap(prev => {
      const next = { ...prev };
      delete next[setId];
      return next;
    });
  };

  return { recordAnswer, getMastery, getSessionResults, resetMastery };
};
