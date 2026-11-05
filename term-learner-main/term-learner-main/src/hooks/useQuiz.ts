import { useState, useCallback } from 'react';
import { Pair } from './usePairs';

interface QuizState {
  isActive: boolean;
  currentPairIndex: number;
  direction: 'termToDef' | 'defToTerm';
  studyMode: 'single' | 'random';
  usedIndices: number[];
}

interface Question {
  prompt: string;
  answer: string;
}

interface Feedback {
  type: 'success' | 'error';
  message: string;
}

export const useQuiz = (
  pairs: Pair[],
  updateStats: (correct: boolean) => void
) => {
  const [quizState, setQuizState] = useState<QuizState>({
    isActive: false,
    currentPairIndex: 0,
    direction: 'termToDef',
    studyMode: 'single',
    usedIndices: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const normalize = (str: string) => {
    return str.replace(/[.,!?;:]/g, '').trim().toLowerCase();
  };

  const generateQuestion = useCallback((pairIndex: number, direction: 'termToDef' | 'defToTerm') => {
    if (pairIndex >= pairs.length) return null;
    
    const pair = pairs[pairIndex];
    return {
      prompt: direction === 'termToDef' ? pair.term : pair.definition,
      answer: direction === 'termToDef' ? pair.definition : pair.term,
    };
  }, [pairs]);

  const getNextRandomIndex = useCallback((usedIndices: number[]) => {
    const availableIndices = pairs.map((_, index) => index).filter(i => !usedIndices.includes(i));
    
    if (availableIndices.length === 0) {
      // Reset when all pairs have been used
      return Math.floor(Math.random() * pairs.length);
    }
    
    return availableIndices[Math.floor(Math.random() * availableIndices.length)];
  }, [pairs]);

  const startQuiz = (
    selectedIndex: number,
    direction: 'termToDef' | 'defToTerm',
    studyMode: 'single' | 'random'
  ) => {
    if (pairs.length === 0) return;

    const initialIndex = studyMode === 'random' ? getNextRandomIndex([]) : selectedIndex;
    
    setQuizState({
      isActive: true,
      currentPairIndex: initialIndex,
      direction,
      studyMode,
      usedIndices: studyMode === 'random' ? [initialIndex] : [],
    });

    const question = generateQuestion(initialIndex, direction);
    setCurrentQuestion(question);
    setFeedback(null);
  };

  const checkAnswer = (userAnswer: string) => {
    if (!currentQuestion) return;

    const isCorrect = normalize(userAnswer) === normalize(currentQuestion.answer);
    updateStats(isCorrect);

    setFeedback({
      type: isCorrect ? 'success' : 'error',
      message: isCorrect 
        ? '🎉 Correct! Well done!' 
        : '❌ Incorrect. Try again!',
    });
  };

  const nextQuestion = () => {
    if (!quizState.isActive) return;

    let nextIndex: number;

    if (quizState.studyMode === 'random') {
      nextIndex = getNextRandomIndex(quizState.usedIndices);
      setQuizState(prev => ({
        ...prev,
        currentPairIndex: nextIndex,
        usedIndices: [...prev.usedIndices, nextIndex],
      }));
    } else {
      // For single mode, keep the same pair
      nextIndex = quizState.currentPairIndex;
    }

    const question = generateQuestion(nextIndex, quizState.direction);
    setCurrentQuestion(question);
    setFeedback(null);
  };

  const resetQuiz = () => {
    setQuizState({
      isActive: false,
      currentPairIndex: 0,
      direction: 'termToDef',
      studyMode: 'single',
      usedIndices: [],
    });
    setCurrentQuestion(null);
    setFeedback(null);
  };

  return {
    isQuizActive: quizState.isActive,
    currentQuestion,
    feedback,
    startQuiz,
    checkAnswer,
    nextQuestion,
    resetQuiz,
  };
};
