import { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

interface QuizSectionProps {
  question: { prompt: string; answer: string } | null;
  feedback: { type: 'success' | 'error'; message: string } | null;
  onSubmit: (answer: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const QuizSection = ({ question, feedback, onSubmit, onNext, onBack }: QuizSectionProps) => {
  const [answer, setAnswer] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAnswer('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [question]);

  useEffect(() => {
    if (feedback && feedback.type === 'success') {
      const timer = setTimeout(() => {
        setAnswer('');
        onNext();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [feedback, onNext]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer.trim());
    }
  };

  if (!question) return null;

  return (
    <div className="glass-container rounded-xl p-8 text-center space-y-8 animate-scale-in">
      <div className="space-y-6">
        <h2 className="font-serif text-3xl text-primary mb-8">Quiz Time! 🌟</h2>
        
        <div className="glass-container rounded-lg p-6 bg-opacity-50">
          <p className="text-2xl font-semibold text-white mb-2">What is:</p>
          <p className="text-3xl font-serif text-primary">{question.prompt}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            ref={inputRef}
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="glass-input w-full max-w-lg mx-auto px-6 py-4 rounded-lg text-white placeholder-gray-400 text-xl text-center"
            autoComplete="off"
          />
          
          <div className="flex gap-4 justify-center">
            <button
              type="submit"
              className="glass-button px-8 py-3 rounded-lg text-white font-semibold text-lg hover:text-primary transition-colors"
            >
              ✨ Antwoord Invullen
            </button>
          </div>
        </form>

        {feedback && (
          <div className={`text-xl font-semibold animate-fade-in ${
            feedback.type === 'success' 
              ? 'text-green-300' 
              : 'text-red-300'
          }`}>
            {feedback.message}
          </div>
        )}
      </div>

      <button
        onClick={onBack}
        className="glass-button px-6 py-3 rounded-lg text-gray-300 font-semibold flex items-center gap-2 mx-auto hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Setup
      </button>
    </div>
  );
};
