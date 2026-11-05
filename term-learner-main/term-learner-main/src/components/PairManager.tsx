import { useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';

interface Pair {
  term: string;
  definition: string;
}

interface PairManagerProps {
  pairs: Pair[];
  onAddPair: (term: string, definition: string) => void;
  onRemovePair: (index: number) => void;
  onRemoveAll: () => void;
}

export const PairManager = ({ pairs, onAddPair, onRemovePair, onRemoveAll }: PairManagerProps) => {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim() && definition.trim()) {
      onAddPair(term.trim(), definition.trim());
      setTerm('');
      setDefinition('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-container rounded-xl p-6">
        <h3 className="font-serif text-2xl mb-6 text-primary">Add Learning Pairs</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Enter term"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/25 text-white placeholder-gray-400 text-sm focus:border-primary focus:bg-white/15 focus:outline-none focus:ring-0 focus:ring-offset-0 backdrop-blur-sm resize-none"
              autoFocus
            />
            <input
              type="text"
              placeholder="Enter definition"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/25 text-white placeholder-gray-400 text-sm focus:border-primary focus:bg-white/15 focus:outline-none focus:ring-0 focus:ring-offset-0 backdrop-blur-sm resize-none"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="glass-button px-6 py-3 rounded-lg text-white font-semibold flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Plus size={20} />
              Add Pair
            </button>
            {pairs.length > 0 && (
              <button
                type="button"
                onClick={onRemoveAll}
                className="glass-button px-6 py-3 rounded-lg text-red-300 font-semibold flex items-center gap-2 hover:text-red-200 transition-colors"
              >
                <Trash2 size={20} />
                Remove All
              </button>
            )}
          </div>
        </form>
        <p className="text-sm text-gray-400 mt-4">
          💡 Tip: Press Ctrl+Enter to quickly add a pair
        </p>
      </div>

      {pairs.length > 0 && (
        <div className="glass-container rounded-xl p-6">
          <h3 className="font-serif text-2xl mb-6 text-primary">Your Learning Pairs ({pairs.length})</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {pairs.map((pair, index) => (
              <div
                key={index}
                className="glass-container rounded-lg p-4 flex items-center justify-between hover:bg-opacity-20 transition-all duration-200 animate-fade-in"
              >
                <div className="flex-1">
                  <span className="text-primary font-semibold text-lg">{pair.term}</span>
                  <span className="text-gray-300 mx-4">→</span>
                  <span className="text-white">{pair.definition}</span>
                </div>
                <button
                  onClick={() => onRemovePair(index)}
                  className="glass-button p-2 rounded-lg text-red-300 hover:text-red-200 transition-colors ml-4"
                  title="Remove this pair"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
