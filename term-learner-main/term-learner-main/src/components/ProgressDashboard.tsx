
import { ArrowLeft, Star, TrendingUp, AlertCircle } from 'lucide-react';
import { PairMastery } from '../hooks/useMastery';

interface ProgressDashboardProps {
  pairMasteries: PairMastery[];
  setName: string;
  onBack: () => void;
  onResetMastery: () => void;
}

export const ProgressDashboard = ({ pairMasteries, setName, onBack, onResetMastery }: ProgressDashboardProps) => {
  const mastered = pairMasteries.filter(p => p.status === 'geleerd');
  const almost = pairMasteries.filter(p => p.status === 'bijna');
  const newPairs = pairMasteries.filter(p => p.status === 'nieuw');

  const percentage = pairMasteries.length > 0 ? Math.round((mastered.length / pairMasteries.length) * 100) : 0;

  return (
    <div className="glass-container rounded-xl p-8 animate-scale-in space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="glass-button px-4 py-2 rounded-lg text-gray-300 font-semibold flex items-center gap-2 hover:text-white transition-colors">
          <ArrowLeft size={20} />
          Terug
        </button>
        <h2 className="font-serif text-2xl text-primary">Voortgang: {setName}</h2>
        <button onClick={onResetMastery} className="glass-button px-4 py-2 rounded-lg text-red-300 text-sm hover:text-red-200 transition-colors">
          Reset
        </button>
      </div>

      {/* Overview circle */}
      <div className="flex justify-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="42" fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="8"
              strokeDasharray={`${percentage * 2.64} ${264 - percentage * 2.64}`}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-primary">{percentage}%</span>
            <span className="text-xs text-gray-400">geleerd</span>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-container rounded-lg p-4 text-center border-l-4 border-green-400">
          <Star size={24} className="text-green-300 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-300">{mastered.length}</p>
          <p className="text-xs text-gray-400">Geleerd</p>
        </div>
        <div className="glass-container rounded-lg p-4 text-center border-l-4 border-yellow-400">
          <TrendingUp size={24} className="text-yellow-300 mx-auto mb-2" />
          <p className="text-2xl font-bold text-yellow-300">{almost.length}</p>
          <p className="text-xs text-gray-400">Bijna</p>
        </div>
        <div className="glass-container rounded-lg p-4 text-center border-l-4 border-gray-400">
          <AlertCircle size={24} className="text-gray-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-400">{newPairs.length}</p>
          <p className="text-xs text-gray-400">Nieuw</p>
        </div>
      </div>

      {/* Detail lists */}
      {mastered.length > 0 && (
        <div>
          <h3 className="text-green-300 font-semibold mb-2 flex items-center gap-2"><Star size={16} /> Geleerd ({mastered.length})</h3>
          <div className="space-y-1">
            {mastered.map((p, i) => (
              <div key={i} className="glass-container rounded-lg p-3 flex justify-between items-center bg-green-500/5">
                <span className="text-white">{p.term}</span>
                <span className="text-gray-400 text-sm">{p.definition}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {almost.length > 0 && (
        <div>
          <h3 className="text-yellow-300 font-semibold mb-2 flex items-center gap-2"><TrendingUp size={16} /> Bijna ({almost.length})</h3>
          <div className="space-y-1">
            {almost.map((p, i) => (
              <div key={i} className="glass-container rounded-lg p-3 flex justify-between items-center bg-yellow-500/5">
                <span className="text-white">{p.term}</span>
                <span className="text-gray-400 text-sm">{p.definition}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {newPairs.length > 0 && (
        <div>
          <h3 className="text-gray-400 font-semibold mb-2 flex items-center gap-2"><AlertCircle size={16} /> Nieuw ({newPairs.length})</h3>
          <div className="space-y-1">
            {newPairs.map((p, i) => (
              <div key={i} className="glass-container rounded-lg p-3 flex justify-between items-center">
                <span className="text-white">{p.term}</span>
                <span className="text-gray-400 text-sm">{p.definition}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
