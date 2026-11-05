
import { useState, useCallback, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';
import { LearningPair } from '../hooks/useFileSystem';
import { Switch } from './ui/switch';

interface FlashcardModeProps {
  pairs: LearningPair[];
  setName: string;
  direction: 'termToDef' | 'defToTerm';
  onBack: () => void;
  onFinish: () => void;
}

export const FlashcardMode = ({ pairs, setName, direction, onBack, onFinish }: FlashcardModeProps) => {
  const [shuffledPairs, setShuffledPairs] = useState<LearningPair[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownPairs, setKnownPairs] = useState<Set<number>>(new Set());
  const [unknownPairs, setUnknownPairs] = useState<Set<number>>(new Set());
  const [sortingEnabled, setSortingEnabled] = useState(true);
  const [swipeStart, setSwipeStart] = useState<number | null>(null);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shuffled = [...pairs];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledPairs(shuffled);
  }, [pairs]);

  const currentPair = shuffledPairs[currentIndex];
  const front = currentPair ? (direction === 'termToDef' ? currentPair.term : currentPair.definition) : '';
  const back = currentPair ? (direction === 'termToDef' ? currentPair.definition : currentPair.term) : '';

  const goNext = useCallback(() => {
    if (currentIndex < shuffledPairs.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, shuffledPairs.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const markKnown = useCallback(() => {
    if (!sortingEnabled) { goNext(); return; }
    setKnownPairs(prev => new Set([...prev, currentIndex]));
    setUnknownPairs(prev => { const n = new Set(prev); n.delete(currentIndex); return n; });
    
    setSwipeDirection('right');
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setSwipeDirection(null);
      setSwipeOffset(0);
      goNext();
    }, 300);
  }, [currentIndex, sortingEnabled, goNext]);

  const markUnknown = useCallback(() => {
    if (!sortingEnabled) { goNext(); return; }
    setUnknownPairs(prev => new Set([...prev, currentIndex]));
    setKnownPairs(prev => { const n = new Set(prev); n.delete(currentIndex); return n; });
    
    setSwipeDirection('left');
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setSwipeDirection(null);
      setSwipeOffset(0);
      goNext();
    }, 300);
  }, [currentIndex, sortingEnabled, goNext]);

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') markKnown();
      else if (e.key === 'ArrowLeft') markUnknown();
      else if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        setIsFlipped(f => !f);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [markKnown, markUnknown]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => setSwipeStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (swipeStart === null) return;
    setSwipeOffset(e.touches[0].clientX - swipeStart);
  };
  const handleTouchEnd = () => {
    if (Math.abs(swipeOffset) > 80) {
      if (swipeOffset > 0) markKnown();
      else markUnknown();
    }
    setSwipeStart(null);
    setSwipeOffset(0);
  };

  const isFinished = currentIndex >= shuffledPairs.length;
  const unsorted = shuffledPairs.length - knownPairs.size - unknownPairs.size;

  if (shuffledPairs.length === 0) return null;

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

      {/* Sorting toggle */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <label className="text-gray-300 text-sm">Sorteren (ken ik / ken ik niet)</label>
        <Switch checked={sortingEnabled} onCheckedChange={setSortingEnabled} />
      </div>

      {/* Stats bar */}
      {sortingEnabled && (
        <div className="flex justify-center gap-6 mb-6 text-sm">
          <span className="text-red-300">❌ Ken ik niet: {unknownPairs.size}</span>
          <span className="text-gray-400">⬜ Ongesorteerd: {unsorted}</span>
          <span className="text-green-300">✅ Ken ik: {knownPairs.size}</span>
        </div>
      )}

      {!isFinished ? (
        <>
          {/* Card */}
          <div className="flex justify-center mb-8">
            <div
              ref={cardRef}
              className="relative w-full max-w-lg cursor-pointer select-none"
              style={{
                perspective: '1000px',
                height: '280px',
                transform: isAnimating
                  ? `translateX(${swipeDirection === 'right' ? '120%' : '-120%'})`
                  : `translateX(${swipeOffset}px)`,
                opacity: isAnimating ? 0 : 1,
                transition: isAnimating ? 'transform 0.3s ease, opacity 0.3s ease' : 'none',
              }}
              onClick={() => setIsFlipped(f => !f)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="w-full h-full relative"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
                  transition: 'transform 0.5s ease',
                }}
              >
                {/* Front */}
                <div
                  className="absolute inset-0 glass-container rounded-2xl p-8 flex flex-col items-center justify-center"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <p className="text-sm text-gray-400 mb-2">{direction === 'termToDef' ? 'Begrip' : 'Definitie'}</p>
                  <p className="text-3xl font-serif text-primary text-center">{front}</p>
                  <p className="text-xs text-gray-500 mt-4">Klik om om te draaien</p>
                </div>
                {/* Back */}
                <div
                  className="absolute inset-0 glass-container rounded-2xl p-8 flex flex-col items-center justify-center bg-white/5"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <p className="text-sm text-gray-400 mb-2">{direction === 'termToDef' ? 'Definitie' : 'Begrip'}</p>
                  <p className="text-2xl font-serif text-white text-center">{back}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4">
            {sortingEnabled ? (
              <>
                <button onClick={markUnknown} className="glass-button px-6 py-3 rounded-lg text-red-300 font-semibold flex items-center gap-2 hover:text-red-200 transition-colors">
                  <ChevronLeft size={20} />
                  Ken ik niet
                </button>
                <button onClick={() => setIsFlipped(f => !f)} className="glass-button px-4 py-3 rounded-lg text-gray-300 hover:text-white transition-colors">
                  <RotateCcw size={20} />
                </button>
                <button onClick={markKnown} className="glass-button px-6 py-3 rounded-lg text-green-300 font-semibold flex items-center gap-2 hover:text-green-200 transition-colors">
                  Ken ik
                  <ChevronRight size={20} />
                </button>
              </>
            ) : (
              <>
                <button onClick={goPrev} disabled={currentIndex === 0} className="glass-button px-6 py-3 rounded-lg text-gray-300 font-semibold flex items-center gap-2 hover:text-white transition-colors disabled:opacity-50">
                  <ChevronLeft size={20} />
                  Vorige
                </button>
                <button onClick={() => setIsFlipped(f => !f)} className="glass-button px-4 py-3 rounded-lg text-gray-300 hover:text-white transition-colors">
                  <RotateCcw size={20} />
                </button>
                <button onClick={goNext} disabled={currentIndex >= shuffledPairs.length - 1} className="glass-button px-6 py-3 rounded-lg text-gray-300 font-semibold flex items-center gap-2 hover:text-white transition-colors disabled:opacity-50">
                  Volgende
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="text-center py-8 space-y-4">
          <h3 className="font-serif text-2xl text-primary">Klaar! 🎉</h3>
          {sortingEnabled && (
            <div className="space-y-2">
              <p className="text-green-300">✅ Ken ik: {knownPairs.size}</p>
              <p className="text-red-300">❌ Ken ik niet: {unknownPairs.size}</p>
            </div>
          )}
          <div className="flex justify-center gap-4 mt-6">
            <button onClick={() => { setCurrentIndex(0); setIsFlipped(false); setKnownPairs(new Set()); setUnknownPairs(new Set()); }} className="glass-button px-6 py-3 rounded-lg text-primary font-semibold hover:text-white transition-colors flex items-center gap-2">
              <Shuffle size={18} />
              Opnieuw
            </button>
            <button onClick={onFinish} className="glass-button px-6 py-3 rounded-lg text-white font-semibold hover:text-primary transition-colors">
              Terug naar overzicht
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
