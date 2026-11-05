
import { ArrowLeft, Layers, PenTool, ListChecks, FileText } from 'lucide-react';
import { LearningSet } from '../hooks/useFileSystem';

export type LearningMode = 'flashcard' | 'writing' | 'multiplechoice' | 'practicetest';

interface ModeSelectionProps {
  learningSet: LearningSet;
  onSelectMode: (mode: LearningMode) => void;
  onBackToLibrary: () => void;
  onEditSet: () => void;
}

export const ModeSelection = ({ learningSet, onSelectMode, onBackToLibrary, onEditSet }: ModeSelectionProps) => {
  const hasPairs = learningSet.pairs.length > 0;
  const needsMore = learningSet.pairs.length < 4;

  const modes = [
    {
      id: 'flashcard' as LearningMode,
      label: 'Flashcards',
      description: 'Blader door kaarten en sorteer wat je kent',
      icon: Layers,
      color: 'text-blue-300',
    },
    {
      id: 'writing' as LearningMode,
      label: 'Schrijfmodus',
      description: 'Typ het antwoord en krijg direct feedback',
      icon: PenTool,
      color: 'text-green-300',
    },
    {
      id: 'multiplechoice' as LearningMode,
      label: 'Meerkeuze',
      description: 'Kies het juiste antwoord uit vier opties',
      icon: ListChecks,
      color: 'text-yellow-300',
      disabled: needsMore,
      disabledText: 'Minimaal 4 paren nodig',
    },
    {
      id: 'practicetest' as LearningMode,
      label: 'Oefentoets',
      description: 'Beantwoord alles en bekijk resultaten achteraf',
      icon: FileText,
      color: 'text-purple-300',
    },
  ];

  return (
    <div className="space-y-6 animate-scale-in">
      <div className="glass-container rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBackToLibrary}
            className="glass-button px-4 py-2 rounded-lg text-gray-300 font-semibold flex items-center gap-2 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            Terug naar bibliotheek
          </button>
          <button
            onClick={onEditSet}
            className="glass-button px-4 py-2 rounded-lg text-primary font-semibold hover:text-white transition-colors"
          >
            ✏️ Bewerken
          </button>
        </div>

        <h2 className="font-serif text-3xl text-primary mb-2">{learningSet.name}</h2>
        <p className="text-gray-400 mb-8">{learningSet.pairs.length} begrippen</p>

        {!hasPairs ? (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">Geen begrippen gevonden. Voeg eerst begrippen toe.</p>
            <button
              onClick={onEditSet}
              className="glass-button px-6 py-3 rounded-lg text-primary font-semibold hover:text-white transition-colors"
            >
              Begrippen toevoegen
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => !mode.disabled && onSelectMode(mode.id)}
                disabled={mode.disabled}
                className={`glass-container rounded-xl p-6 text-left transition-all duration-300 hover:bg-white/15 hover:border-primary/50 group ${
                  mode.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <mode.icon size={28} className={mode.color} />
                  <h3 className="font-serif text-xl text-white group-hover:text-primary transition-colors">
                    {mode.label}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm">
                  {mode.disabled ? mode.disabledText : mode.description}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
