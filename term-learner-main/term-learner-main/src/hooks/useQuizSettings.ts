
import { useState, useEffect } from 'react';

interface QuizSettingsData {
  showAnswer: boolean;
  showAnswerOnHover: boolean;
  testMode: boolean;
}

interface WrongAnswer {
  term: string;
  definition: string;
  userAnswer: string;
  timestamp: number;
}

interface TestModeData {
  wrongAnswers: WrongAnswer[];
  incorrectPairs: Set<string>;
}

const SETTINGS_KEY = 'quiz-settings';
const TEST_DATA_KEY = 'quiz-test-data';

export const useQuizSettings = () => {
  const [settings, setSettings] = useState<QuizSettingsData>({
    showAnswer: false,
    showAnswerOnHover: false,
    testMode: false,
  });

  const [testData, setTestData] = useState<TestModeData>({
    wrongAnswers: [],
    incorrectPairs: new Set(),
  });

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Failed to parse quiz settings:', error);
      }
    }

    const savedTestData = localStorage.getItem(TEST_DATA_KEY);
    if (savedTestData) {
      try {
        const parsed = JSON.parse(savedTestData);
        setTestData({
          wrongAnswers: parsed.wrongAnswers || [],
          incorrectPairs: new Set(parsed.incorrectPairs || []),
        });
      } catch (error) {
        console.error('Failed to parse test data:', error);
      }
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  // Save test data to localStorage when it changes
  useEffect(() => {
    const dataToSave = {
      wrongAnswers: testData.wrongAnswers,
      incorrectPairs: Array.from(testData.incorrectPairs),
    };
    localStorage.setItem(TEST_DATA_KEY, JSON.stringify(dataToSave));
  }, [testData]);

  const updateSettings = (newSettings: QuizSettingsData) => {
    setSettings(newSettings);
  };

  const recordWrongAnswer = (term: string, definition: string, userAnswer: string) => {
    if (!settings.testMode) return;

    const wrongAnswer: WrongAnswer = {
      term,
      definition,
      userAnswer,
      timestamp: Date.now(),
    };

    setTestData(prev => ({
      wrongAnswers: [...prev.wrongAnswers, wrongAnswer],
      incorrectPairs: new Set([...prev.incorrectPairs, `${term}-${definition}`]),
    }));
  };

  const clearTestData = () => {
    setTestData({
      wrongAnswers: [],
      incorrectPairs: new Set(),
    });
    localStorage.removeItem(TEST_DATA_KEY);
  };

  const hasTestData = testData.wrongAnswers.length > 0;

  return {
    settings,
    updateSettings,
    testData,
    recordWrongAnswer,
    clearTestData,
    hasTestData,
  };
};
