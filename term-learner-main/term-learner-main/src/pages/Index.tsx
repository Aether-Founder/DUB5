
import { useState, useEffect } from 'react';
import { StarBackground } from '@/components/StarBackground';
import { Header } from '@/components/Header';
import { FileSystemBrowser } from '@/components/FileSystemBrowser';
import { LearningSetEditor } from '@/components/LearningSetEditor';
import { ModeSelection, LearningMode } from '@/components/ModeSelection';
import { LearningSetQuizSection } from '@/components/LearningSetQuizSection';
import { FlashcardMode } from '@/components/FlashcardMode';
import { MultipleChoiceMode } from '@/components/MultipleChoiceMode';
import { PracticeTestMode } from '@/components/PracticeTestMode';
import { ProgressDashboard } from '@/components/ProgressDashboard';
import { StatsPanel } from '@/components/StatsPanel';
import { useFileSystem, LearningSet } from '@/hooks/useFileSystem';
import { useLearningSetQuiz } from '@/hooks/useLearningSetQuiz';
import { useStats } from '@/hooks/useStats';
import { useMastery } from '@/hooks/useMastery';

type View = 'browser' | 'modes' | 'editor' | 'writing' | 'flashcard' | 'multiplechoice' | 'practicetest' | 'progress';

const Index = () => {
  const { learningSets } = useFileSystem();
  const { stats, updateStats, resetStats } = useStats();
  
  const [selectedLearningSet, setSelectedLearningSet] = useState<LearningSet | null>(null);
  const [view, setView] = useState<View>('browser');
  const [direction, setDirection] = useState<'termToDef' | 'defToTerm'>('termToDef');

  const { recordAnswer, getSessionResults, resetMastery } = useMastery(selectedLearningSet?.id || null);

  useEffect(() => {
    if (selectedLearningSet) {
      const updatedSet = learningSets.find(s => s.id === selectedLearningSet.id);
      if (updatedSet) {
        setSelectedLearningSet(updatedSet);
      } else if (view !== 'editor') {
        setSelectedLearningSet(null);
        setView('browser');
      }
    }
  }, [learningSets]);

  const {
    isQuizActive,
    currentQuestion,
    feedback,
    startQuiz,
    checkAnswer,
    resetQuiz,
    nextQuestion,
    getCurrentProgress
  } = useLearningSetQuiz(selectedLearningSet, (correct) => {
    updateStats(correct);
    if (currentQuestion) {
      // Find the pair from the question
      const pair = selectedLearningSet?.pairs.find(p =>
        p.term === currentQuestion.prompt || p.definition === currentQuestion.prompt
      );
      if (pair) recordAnswer(pair.term, pair.definition, correct);
    }
  });

  const handleSelectLearningSet = (set: LearningSet) => {
    setSelectedLearningSet(set);
    setView('modes');
  };

  const handleSelectMode = (mode: LearningMode) => {
    if (mode === 'writing') {
      if (selectedLearningSet && selectedLearningSet.pairs.length > 0) {
        startQuiz(direction);
        setView('writing');
      }
    } else if (mode === 'flashcard') {
      setView('flashcard');
    } else if (mode === 'multiplechoice') {
      setView('multiplechoice');
    } else if (mode === 'practicetest') {
      setView('practicetest');
    }
  };

  const handleBackToLibrary = () => {
    resetQuiz();
    setView('browser');
    setSelectedLearningSet(null);
  };

  const handleBackToModes = () => {
    resetQuiz();
    setView('modes');
  };

  const handleFinishSession = () => {
    setView('progress');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <div className="glass-container rounded-3xl p-8 animate-fade-in">
          <Header />
          
          {view === 'browser' && (
            <div className="space-y-8">
              <FileSystemBrowser
                onSelectLearningSet={handleSelectLearningSet}
                selectedSetId={selectedLearningSet?.id || null}
              />
              <div style={{ display: 'none' }}>
                <StatsPanel stats={stats} onReset={resetStats} />
              </div>
            </div>
          )}

          {view === 'modes' && selectedLearningSet && (
            <ModeSelection
              learningSet={selectedLearningSet}
              onSelectMode={handleSelectMode}
              onBackToLibrary={handleBackToLibrary}
              onEditSet={() => setView('editor')}
            />
          )}

          {view === 'editor' && selectedLearningSet && (
            <div className="space-y-8">
              <LearningSetEditor
                learningSet={selectedLearningSet}
                direction={direction}
                onDirectionChange={setDirection}
                onStartQuiz={() => handleSelectMode('writing')}
                onBackToLibrary={() => setView('modes')}
              />
            </div>
          )}

          {view === 'writing' && isQuizActive && (
            <LearningSetQuizSection
              question={currentQuestion}
              feedback={feedback}
              progress={getCurrentProgress()}
              onSubmit={checkAnswer}
              onNext={nextQuestion}
              onBack={handleBackToModes}
              learningSetName={selectedLearningSet?.name}
            />
          )}

          {view === 'flashcard' && selectedLearningSet && (
            <FlashcardMode
              pairs={selectedLearningSet.pairs}
              setName={selectedLearningSet.name}
              direction={direction}
              onBack={handleBackToModes}
              onFinish={handleBackToModes}
            />
          )}

          {view === 'multiplechoice' && selectedLearningSet && (
            <MultipleChoiceMode
              pairs={selectedLearningSet.pairs}
              setName={selectedLearningSet.name}
              direction={direction}
              onBack={handleBackToModes}
              onFinish={handleFinishSession}
              recordAnswer={recordAnswer}
            />
          )}

          {view === 'practicetest' && selectedLearningSet && (
            <PracticeTestMode
              pairs={selectedLearningSet.pairs}
              setName={selectedLearningSet.name}
              direction={direction}
              onBack={handleBackToModes}
              onFinish={handleFinishSession}
              recordAnswer={recordAnswer}
            />
          )}

          {view === 'progress' && selectedLearningSet && (
            <ProgressDashboard
              pairMasteries={getSessionResults(selectedLearningSet.pairs)}
              setName={selectedLearningSet.name}
              onBack={handleBackToModes}
              onResetMastery={resetMastery}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
