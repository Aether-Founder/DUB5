import { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { QuizSettings } from './QuizSettings';
import { TestResults } from './TestResults';
import { useQuizSettings } from '../hooks/useQuizSettings';

interface LearningSetQuizSectionProps {
  question: { prompt: string; answer: string } | null;
  feedback: { type: 'success' | 'error'; message: string } | null;
  progress: { current: number; total: number };
  onSubmit: (answer: string) => void;
  onNext: () => void;
  onBack: () => void;
  learningSetName?: string;
}

export const LearningSetQuizSection = ({ 
  question, feedback, progress, onSubmit, onNext, onBack,
  learningSetName = 'Leer nu!'
}: LearningSetQuizSectionProps) => {
  const [answer, setAnswer] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [showTestResults, setShowTestResults] = useState(false);
  const [showAnswerText, setShowAnswerText] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { settings, updateSettings, testData, recordWrongAnswer, clearTestData, hasTestData } = useQuizSettings();

  useEffect(() => {
    setAnswer('');
    if (inputRef.current) inputRef.current.focus();
  }, [question]);

  useEffect(() => {
    const shouldShow = settings.showAnswer || (settings.showAnswerOnHover && isHovering);
    if (shouldShow) {
      if (settings.showAnswerOnHover && isHovering) setShowAnswerText(true);
      else if (settings.showAnswer) {
        const timer = setTimeout(() => setShowAnswerText(true), 600);
        return () => clearTimeout(timer);
      }
    } else setShowAnswerText(false);
  }, [settings.showAnswer, settings.showAnswerOnHover, isHovering]);

  useEffect(() => {
    if (feedback) {
      setShowFeedback(true);
      const timer = setTimeout(() => setShowFeedback(false), 2500);
      return () => clearTimeout(timer);
    } else setShowFeedback(false);
  }, [feedback]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() && question) {
      if (settings.testMode && feedback?.type === 'error') {
        recordWrongAnswer(question.prompt, question.answer, answer.trim());
      }
      onSubmit(answer.trim());
      setAnswer('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && answer.trim()) { e.preventDefault(); handleSubmit(e); }
  };

  if (!question) return null;

  const shouldShowAnswer = settings.showAnswer || (settings.showAnswerOnHover && isHovering);
  const shouldReserveAnswerSpace = settings.showAnswer || settings.showAnswerOnHover;

  return (
    <div className="glass-container rounded-xl p-8 text-center space-y-8 animate-scale-in">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="glass-button px-4 py-2 rounded-lg text-gray-300 font-semibold flex items-center gap-2 hover:text-white transition-colors">
              <ArrowLeft size={20} />
              Terug
            </button>
            <div className="flex flex-col items-start relative">
              <h2 className="font-serif text-3xl text-primary">{learningSetName}</h2>
              {settings.testMode && <p className="text-sm text-gray-400 absolute -bottom-5 left-0">Testmodus</p>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-primary font-semibold">{progress.current} / {progress.total}</div>
            <QuizSettings settings={settings} onSettingsChange={updateSettings} onViewTestResults={() => setShowTestResults(true)} hasTestData={hasTestData} />
          </div>
        </div>
        
        <div
          className="glass-container rounded-lg p-6 bg-opacity-50 relative flex flex-col justify-center overflow-hidden"
          style={{ height: shouldReserveAnswerSpace ? '120px' : '80px', transition: 'height 600ms ease-out' }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <p className="text-3xl font-serif text-primary">{question.prompt}</p>
          {shouldReserveAnswerSpace && (
            <div className="mt-4 min-h-[28px] flex items-center justify-center">
              <p className={`text-lg text-gray-300 transition-opacity duration-[600ms] ease-linear ${shouldShowAnswer && showAnswerText ? 'opacity-100' : 'opacity-0'}`}>{question.answer}</p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input ref={inputRef} type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} onKeyDown={handleKeyDown} placeholder="Typ je antwoord hier..." className="w-full max-w-lg mx-auto px-6 py-4 rounded-lg bg-white/10 border border-white/25 text-white placeholder-gray-400 text-xl text-center focus:border-primary focus:bg-white/15 focus:outline-none backdrop-blur-sm" autoComplete="off" />
          <div className="flex gap-4 justify-center">
            <button type="submit" className="glass-button px-8 py-3 rounded-lg text-white font-semibold text-lg hover:text-primary transition-colors" disabled={!answer.trim()}>✨ Antwoord invullen</button>
            <button type="button" onClick={() => { setAnswer(''); onNext(); }} className="glass-button px-8 py-3 rounded-lg text-primary font-semibold text-lg hover:text-white transition-colors">Volgende →</button>
          </div>
        </form>

        <div className="min-h-[32px] flex items-center justify-center">
          {feedback && (
            <div className={`text-xl font-semibold animate-fade-in transition-opacity duration-300 ${feedback.type === 'success' ? 'text-green-300' : 'text-red-300'} ${showFeedback ? 'opacity-100' : 'opacity-0'}`}>
              {feedback.message}
            </div>
          )}
        </div>
      </div>

      <TestResults isOpen={showTestResults} onClose={() => setShowTestResults(false)} wrongAnswers={testData.wrongAnswers} onClearData={clearTestData} />
    </div>
  );
};
