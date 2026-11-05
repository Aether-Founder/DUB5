
import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Edit, ChevronDown, ArrowLeft } from 'lucide-react';
import { LearningSet, useFileSystem } from '../hooks/useFileSystem';
import { ImportDialog } from './ImportDialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LearningSetEditorProps {
  learningSet: LearningSet;
  direction: 'termToDef' | 'defToTerm';
  onDirectionChange: (direction: 'termToDef' | 'defToTerm') => void;
  onStartQuiz: () => void;
  onBackToLibrary: () => void;
}

export const LearningSetEditor = ({
  learningSet,
  direction,
  onDirectionChange,
  onStartQuiz,
  onBackToLibrary,
}: LearningSetEditorProps) => {
  const { addPairToSet, removePairFromSet, renameLearningSet } = useFileSystem();
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [newName, setNewName] = useState(learningSet.name);
  const [isDirectionDropdownOpen, setIsDirectionDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDirectionDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim() && definition.trim()) {
      addPairToSet(learningSet.id, term.trim(), definition.trim());
      setTerm('');
      setDefinition('');
    }
  };

  const handleImport = (pairs: { term: string; definition: string }[]) => {
    pairs.forEach(pair => {
      if (pair.term.trim() && pair.definition.trim()) {
        addPairToSet(learningSet.id, pair.term.trim(), pair.definition.trim());
      }
    });
  };

  const handleRename = () => {
    if (newName.trim() && newName.trim() !== learningSet.name) {
      renameLearningSet(learningSet.id, newName.trim());
    }
    setIsRenameDialogOpen(false);
  };

  const directionOptions = [
    { value: 'termToDef', label: 'Begrip → Definitie' },
    { value: 'defToTerm', label: 'Definitie → Begrip' }
  ];

  const selectedDirection = directionOptions.find(option => option.value === direction);

  return (
    <div className="space-y-4">
      <div className="glass-container rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <button onClick={onBackToLibrary} className="glass-button px-4 py-2 rounded-lg text-gray-300 font-semibold flex items-center gap-2 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            Terug
          </button>
        </div>

        <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
          <DialogTrigger asChild>
            <button
              className="font-serif text-2xl text-primary mb-4 hover:text-primary/80 transition-colors flex items-center gap-2 group"
              onClick={() => { setNewName(learningSet.name); setIsRenameDialogOpen(true); }}
            >
              Bewerken: {learningSet.name}
              <Edit size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </DialogTrigger>
          <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-white/15 backdrop-blur-xl border border-white/25 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-primary">Leerlijst hernoemen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Voer nieuwe naam in"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/25 text-white placeholder-gray-400 text-lg focus:border-primary focus:bg-white/15 focus:outline-none backdrop-blur-sm"
                onKeyDown={(e) => { if (e.key === 'Enter') handleRename(); else if (e.key === 'Escape') setIsRenameDialogOpen(false); }}
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => { setNewName(learningSet.name); setIsRenameDialogOpen(false); }} className="glass-button px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-colors">Annuleren</button>
                <button onClick={handleRename} disabled={!newName.trim()} className="glass-button px-4 py-2 rounded-lg text-white font-semibold hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Hernoemen</button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Voer begrip in" value={term} onChange={(e) => setTerm(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/25 text-white placeholder-gray-400 text-lg focus:border-primary focus:bg-white/15 focus:outline-none focus:ring-0 focus:ring-offset-0 backdrop-blur-sm" />
            <input type="text" placeholder="Voer definitie in" value={definition} onChange={(e) => setDefinition(e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/25 text-white placeholder-gray-400 text-lg focus:border-primary focus:bg-white/15 focus:outline-none focus:ring-0 focus:ring-offset-0 backdrop-blur-sm" />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="glass-button px-6 py-3 rounded-lg text-white font-semibold flex items-center gap-2 hover:text-primary transition-colors">
              <Plus size={20} />
              Toevoegen
            </button>
            <ImportDialog onImport={handleImport} />
          </div>
        </form>
      </div>

      {learningSet.pairs.length > 0 && (
        <div className="glass-container rounded-xl p-6">
          <h3 className="font-serif text-2xl mb-6 text-primary">Begin met leren</h3>
          <div className="flex items-center gap-4 mb-6">
            <label className="text-primary/80 font-medium">Richting:</label>
            <div className="relative" ref={dropdownRef}>
              <button type="button" onClick={() => setIsDirectionDropdownOpen(!isDirectionDropdownOpen)} className="glass-button px-4 py-2 rounded-lg text-white flex items-center gap-2 min-w-[200px] justify-between">
                <span>{selectedDirection?.label}</span>
                <ChevronDown size={16} className={`transition-transform ${isDirectionDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDirectionDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-slate-800/95 backdrop-blur-xl rounded-lg border border-primary/20 shadow-2xl z-50">
                  {directionOptions.map((option) => (
                    <button key={option.value} type="button" onClick={() => { onDirectionChange(option.value as 'termToDef' | 'defToTerm'); setIsDirectionDropdownOpen(false); }} className={`w-full px-4 py-2 text-left hover:bg-primary/20 transition-colors first:rounded-t-lg last:rounded-b-lg ${direction === option.value ? 'text-primary bg-primary/10' : 'text-white'}`}>
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button onClick={onStartQuiz} className="glass-button px-8 py-3 rounded-lg text-white font-semibold hover:text-primary transition-colors">
            🚀 Start schrijfmodus
          </button>
        </div>
      )}

      {learningSet.pairs.length > 0 && (
        <div className="glass-container rounded-xl p-4">
          <h3 className="font-serif text-xl text-primary mb-3">Begrippen ({learningSet.pairs.length})</h3>
          <div className="grid grid-cols-12 gap-3 mb-3 pb-2 border-b border-primary/20">
            <div className="col-span-5 text-sm text-primary/80 font-semibold uppercase tracking-wide">Begrip</div>
            <div className="col-span-6 text-sm text-primary/80 font-semibold uppercase tracking-wide">Definitie</div>
            <div className="col-span-1"></div>
          </div>
          <div className="space-y-2">
            {learningSet.pairs.map((pair, index) => (
              <div key={index} className="grid grid-cols-12 gap-3 items-center glass-container rounded-lg p-3 bg-opacity-20 hover:bg-opacity-30 transition-all duration-200">
                <div className="col-span-5 text-white text-lg">{pair.term}</div>
                <div className="col-span-6 text-gray-200 text-lg">{pair.definition}</div>
                <div className="col-span-1 flex justify-end">
                  <button onClick={() => removePairFromSet(learningSet.id, index)} className="glass-button p-2 rounded-lg text-red-300 hover:text-red-200 hover:bg-red-500/20 transition-all duration-200" title="Verwijder dit paar">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {learningSet.pairs.length === 0 && (
        <div className="glass-container rounded-xl p-6">
          <div className="text-center">
            <p className="text-gray-400 mb-4">Nog geen begrippen. Voeg begrippen en definities toe om te beginnen!</p>
          </div>
        </div>
      )}
    </div>
  );
};
