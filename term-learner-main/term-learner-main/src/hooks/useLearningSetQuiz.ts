
import { useState, useCallback } from 'react';
import { LearningSet, LearningPair } from './useFileSystem';

interface QuizState {
  isActive: boolean;
  currentPairIndex: number;
  direction: 'termToDef' | 'defToTerm';
  shuffledPairs: LearningPair[];
}

interface Question {
  prompt: string;
  answer: string;
}

interface Feedback {
  type: 'success' | 'error';
  message: string;
}

export const useLearningSetQuiz = (
  learningSet: LearningSet | null,
  updateStats: (correct: boolean) => void
) => {
  const [quizState, setQuizState] = useState<QuizState>({
    isActive: false,
    currentPairIndex: 0,
    direction: 'termToDef',
    shuffledPairs: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const normalize = (str: string) => {
    return str.replace(/[.,!?;:]/g, '').trim().toLowerCase();
  };

  const shuffleArray = (array: LearningPair[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const generateQuestion = useCallback((pair: LearningPair, direction: 'termToDef' | 'defToTerm') => {
    return {
      prompt: direction === 'termToDef' ? pair.term : pair.definition,
      answer: direction === 'termToDef' ? pair.definition : pair.term,
    };
  }, []);

  const startQuiz = (direction: 'termToDef' | 'defToTerm') => {
    if (!learningSet || learningSet.pairs.length === 0) return;

    const shuffledPairs = shuffleArray(learningSet.pairs);
    
    setQuizState({
      isActive: true,
      currentPairIndex: 0,
      direction,
      shuffledPairs,
    });

    const question = generateQuestion(shuffledPairs[0], direction);
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
        ? 'Goed! 🎉' 
        : `Fout! ❌ Het juiste antwoord: ${currentQuestion.answer}`,
    });
  };

  const nextQuestion = () => {
    if (!quizState.isActive || !quizState.shuffledPairs.length) return;

    const nextIndex = (quizState.currentPairIndex + 1) % quizState.shuffledPairs.length;
    
    setQuizState(prev => ({
      ...prev,
      currentPairIndex: nextIndex,
    }));

    const question = generateQuestion(quizState.shuffledPairs[nextIndex], quizState.direction);
    setCurrentQuestion(question);
    setFeedback(null);
  };

  const resetQuiz = () => {
    setQuizState({
      isActive: false,
      currentPairIndex: 0,
      direction: 'termToDef',
      shuffledPairs: [],
    });
    setCurrentQuestion(null);
    setFeedback(null);
  };

  const getCurrentProgress = () => {
    if (!quizState.isActive || !quizState.shuffledPairs.length) return { current: 0, total: 0 };
    return {
      current: quizState.currentPairIndex + 1,
      total: quizState.shuffledPairs.length
    };
  };

  return {
    isQuizActive: quizState.isActive,
    currentQuestion,
    feedback,
    startQuiz,
    checkAnswer,
    nextQuestion,
    resetQuiz,
    getCurrentProgress,
  };
};
