
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { LearningPair } from '../hooks/useFileSystem';

interface PracticeTestModeProps {
  pairs: LearningPair[];
  setName: string;
  direction: 'termToDef' | 'defToTerm';
  onBack: () => void;
  onFinish: (results: { term: string; definition: string; correct: boolean }[]) => void;
  recordAnswer: (term: string, definition: string, correct: boolean) => void;
}

export const PracticeTestMode = ({ pairs, setName, direction, onBack, onFinish, recordAnswer }: PracticeTestModeProps) => {
  const [shuffledPairs, setShuffledPairs] = useState<LearningPair[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<{ term: string; definition: string; userAnswer: string; correct: boolean }[]>([]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const normalize = (str: string) => str.replace(/[.,!?;:]/g, '').trim().toLowerCase();

  useEffect(() => {
    const shuffled = [...pairs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledPairs(shuffled);
    setAnswers({});
    setSubmitted(false);
    setResults([]);
  }, [pairs]);

  const handleSubmit = () => {
    const res = shuffledPairs.map((pair, i) => {
      const userAnswer = answers[i]?.trim() || '';
      const correctAnswer = direction === 'termToDef' ? pair.definition : pair.term;
      const correct = normalize(userAnswer) === normalize(correctAnswer);
      recordAnswer(pair.term, pair.definition, correct);
      return { term: pair.term, definition: pair.definition, userAnswer, correct };
    });
    setResults(res);
    setSubmitted(true);
  };

  const totalCorrect = results.filter(r => r.correct).length;

  if (submitted) {
    return (
      <div className="glass-container rounded-xl p-8 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-3xl text-primary">Toetsresultaten</h2>
          <div className="text-primary font-semibold text-xl">
            {totalCorrect} / {results.length} goed
          </div>
        </div>

        {/* Score bar */}
        <div className="w-full h-4 rounded-full bg-white/10 mb-8 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${(totalCorrect / results.length) * 100}%`,
              background: totalCorrect / results.length >= 0.7 ? 'hsl(142, 71%, 45%)' : totalCorrect / results.length >= 0.4 ? 'hsl(45, 93%, 47%)' : 'hsl(0, 84%, 60%)',
            }}
          />
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {results.map((r, i) => (
            <div key={i} className={`glass-container rounded-lg p-4 border-l-4 ${r.correct ? 'border-green-400' : 'border-red-400'}`}>
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-1 flex items-center justify-center text-lg font-semibold">
                  {r.correct ? '✅' : '❌'}
                </div>
                <div className="col-span-11">
                  <p className="text-primary font-medium">{direction === 'termToDef' ? r.term : r.definition}</p>
                  <p className="text-gray-300 text-sm">Correct antwoord: <span className="text-green-300">{direction === 'termToDef' ? r.definition : r.term}</span></p>
                  {!r.correct && r.userAnswer && (
                    <p className="text-red-300 text-sm">Jouw antwoord: {r.userAnswer}</p>
                  )}
                  {!r.correct && !r.userAnswer && (
                    <p className="text-gray-500 text-sm italic">Niet ingevuld</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button onClick={() => { setSubmitted(false); setAnswers({}); setResults([]); }} className="glass-button px-6 py-3 rounded-lg text-primary font-semibold hover:text-white transition-colors">
            🔄 Opnieuw
          </button>
          <button onClick={() => onFinish(results.map(r => ({ term: r.term, definition: r.definition, correct: r.correct })))} className="glass-button px-6 py-3 rounded-lg text-white font-semibold hover:text-primary transition-colors">
            Terug naar overzicht
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-container rounded-xl p-8 animate-scale-in">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onBack} className="glass-button px-4 py-2 rounded-lg text-gray-300 font-semibold flex items-center gap-2 hover:text-white transition-colors">
          <ArrowLeft size={20} />
          Terug
        </button>
        <h2 className="font-serif text-2xl text-primary">{setName} - Oefentoets</h2>
        <div className="text-gray-400 text-sm">{Object.keys(answers).filter(k => answers[Number(k)]?.trim()).length} / {shuffledPairs.length} ingevuld</div>
      </div>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto mb-6">
        {shuffledPairs.map((pair, i) => {
          const prompt = direction === 'termToDef' ? pair.term : pair.definition;
          return (
            <div key={i} className="glass-container rounded-lg p-4">
              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-sm w-8">{i + 1}.</span>
                <div className="flex-1">
                  <p className="text-primary font-medium mb-2">{prompt}</p>
                  <input
                    ref={el => inputRefs.current[i] = el}
                    type="text"
                    value={answers[i] || ''}
                    onChange={(e) => setAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && i < shuffledPairs.length - 1) {
                        inputRefs.current[i + 1]?.focus();
                      }
                    }}
                    placeholder="Typ je antwoord..."
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/25 text-white placeholder-gray-400 focus:border-primary focus:bg-white/15 focus:outline-none backdrop-blur-sm"
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="glass-button px-8 py-3 rounded-lg text-white font-semibold text-lg hover:text-primary transition-colors"
        >
          📝 Toets inleveren
        </button>
      </div>
    </div>
  );
};
