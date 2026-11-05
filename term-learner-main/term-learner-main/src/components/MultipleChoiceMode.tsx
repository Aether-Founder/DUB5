
import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { LearningPair } from '../hooks/useFileSystem';

interface MultipleChoiceModeProps {
  pairs: LearningPair[];
  setName: string;
  direction: 'termToDef' | 'defToTerm';
  onBack: () => void;
  onFinish: (results: { term: string; definition: string; correct: boolean }[]) => void;
  recordAnswer: (term: string, definition: string, correct: boolean) => void;
}

export const MultipleChoiceMode = ({ pairs, setName, direction, onBack, onFinish, recordAnswer }: MultipleChoiceModeProps) => {
  const [shuffledPairs, setShuffledPairs] = useState<LearningPair[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [results, setResults] = useState<{ term: string; definition: string; correct: boolean }[]>([]);

  const shuffle = <T,>(arr: T[]): T[] => {
    const s = [...arr];
    for (let i = s.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [s[i], s[j]] = [s[j], s[i]];
    }
    return s;
  };

  useEffect(() => {
    setShuffledPairs(shuffle(pairs));
  }, [pairs]);

  const generateOptions = useCallback((pair: LearningPair) => {
    const correctAnswer = direction === 'termToDef' ? pair.definition : pair.term;
    const wrongAnswers = pairs
      .filter(p => p !== pair)
      .map(p => direction === 'termToDef' ? p.definition : p.term);
    const selected = shuffle(wrongAnswers).slice(0, 3);
    return shuffle([correctAnswer, ...selected]);
  }, [pairs, direction]);

  useEffect(() => {
    if (shuffledPairs[currentIndex]) {
      setOptions(generateOptions(shuffledPairs[currentIndex]));
      setSelectedOption(null);
      setIsCorrect(null);
    }
  }, [currentIndex, shuffledPairs, generateOptions]);

  const currentPair = shuffledPairs[currentIndex];
  if (!currentPair) return null;

  const prompt = direction === 'termToDef' ? currentPair.term : currentPair.definition;
  const correctAnswer = direction === 'termToDef' ? currentPair.definition : currentPair.term;

  const handleSelect = (option: string) => {
    if (selectedOption) return; // Already answered
    setSelectedOption(option);
    const correct = option === correctAnswer;
    setIsCorrect(correct);
    recordAnswer(currentPair.term, currentPair.definition, correct);
    setResults(prev => [...prev, { term: currentPair.term, definition: currentPair.definition, correct }]);
  };

  const handleNext = () => {
    if (currentIndex < shuffledPairs.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onFinish(results);
    }
  };

  const isFinished = currentIndex >= shuffledPairs.length;

  return (
    <div className="glass-container rounded-xl p-8 animate-scale-in">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="glass-button px-4 py-2 rounded-lg text-gray-300 font-semibold flex items-center gap-2 hover:text-white transition-colors">
          <ArrowLeft size={20} />
          Terug
        </button>
        <h2 className="font-serif text-2xl text-primary">{setName}</h2>
        <div className="text-primary font-semibold">{currentIndex + 1} / {shuffledPairs.length}</div>
      </div>

      {/* Question */}
      <div className="glass-container rounded-lg p-6 mb-8 text-center">
        <p className="text-sm text-gray-400 mb-2">{direction === 'termToDef' ? 'Begrip' : 'Definitie'}</p>
        <p className="text-3xl font-serif text-primary">{prompt}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {options.map((option, i) => {
          let className = 'glass-container rounded-lg p-4 text-left cursor-pointer transition-all duration-300 hover:bg-white/15 border-2';
          if (selectedOption) {
            if (option === correctAnswer) {
              className += ' border-green-400 bg-green-500/20';
            } else if (option === selectedOption && !isCorrect) {
              className += ' border-red-400 bg-red-500/20';
            } else {
              className += ' border-transparent opacity-50';
            }
          } else {
            className += ' border-transparent hover:border-primary/50';
          }
          return (
            <button key={i} onClick={() => handleSelect(option)} className={className} disabled={!!selectedOption}>
              <span className="text-gray-400 text-sm mr-2">{String.fromCharCode(65 + i)}.</span>
              <span className="text-white">{option}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback & Next */}
      <div className="min-h-[60px] flex flex-col items-center justify-center gap-4">
        {selectedOption && (
          <>
            <p className={`text-xl font-semibold animate-fade-in ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
              {isCorrect ? 'Goed! 🎉' : `Fout! Het juiste antwoord was: ${correctAnswer}`}
            </p>
            <button onClick={handleNext} className="glass-button px-8 py-3 rounded-lg text-primary font-semibold hover:text-white transition-colors">
              {currentIndex < shuffledPairs.length - 1 ? 'Volgende →' : 'Resultaten bekijken'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
