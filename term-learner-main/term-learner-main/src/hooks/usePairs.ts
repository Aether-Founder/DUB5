
import { useState, useEffect } from 'react';

export interface Pair {
  term: string;
  definition: string;
}

const STORAGE_KEY = 'stellar-learning-pairs';

export const usePairs = () => {
  const [pairs, setPairs] = useState<Pair[]>([]);

  // Load pairs from localStorage on mount
  useEffect(() => {
    const savedPairs = localStorage.getItem(STORAGE_KEY);
    if (savedPairs) {
      try {
        setPairs(JSON.parse(savedPairs));
      } catch (error) {
        console.error('Failed to load pairs from localStorage:', error);
      }
    }
  }, []);

  // Save pairs to localStorage whenever pairs change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pairs));
  }, [pairs]);

  const addPair = (term: string, definition: string) => {
    setPairs(prev => [...prev, { term, definition }]);
  };

  const removePair = (index: number) => {
    setPairs(prev => prev.filter((_, i) => i !== index));
  };

  const removeAllPairs = () => {
    setPairs([]);
  };

  return {
    pairs,
    addPair,
    removePair,
    removeAllPairs,
  };
};
