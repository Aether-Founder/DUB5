
import { BarChart3, RotateCcw } from 'lucide-react';

interface Stats {
  totalAnswered: number;
  correct: number;
  streak: number;
  bestStreak: number;
}

interface StatsPanelProps {
  stats: Stats;
  onReset: () => void;
}

export const StatsPanel = ({ stats, onReset }: StatsPanelProps) => {
  const accuracy = stats.totalAnswered > 0 ? Math.round((stats.correct / stats.totalAnswered) * 100) : 0;

  return (
    <div className="glass-container rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-2xl text-primary flex items-center gap-2">
          <BarChart3 size={24} />
          Your Progress
        </h3>
        <button
          onClick={onReset}
          className="glass-button px-4 py-2 rounded-lg text-gray-300 font-semibold flex items-center gap-2 hover:text-red-300 transition-colors"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-container rounded-lg p-4 text-center bg-opacity-50">
          <div className="text-2xl font-bold text-primary">{stats.totalAnswered}</div>
          <div className="text-sm text-gray-300">Questions</div>
        </div>
        
        <div className="glass-container rounded-lg p-4 text-center bg-opacity-50">
          <div className="text-2xl font-bold text-green-300">{accuracy}%</div>
          <div className="text-sm text-gray-300">Accuracy</div>
        </div>
        
        <div className="glass-container rounded-lg p-4 text-center bg-opacity-50">
          <div className="text-2xl font-bold text-yellow-300">{stats.streak}</div>
          <div className="text-sm text-gray-300">Streak</div>
        </div>
        
        <div className="glass-container rounded-lg p-4 text-center bg-opacity-50">
          <div className="text-2xl font-bold text-purple-300">{stats.bestStreak}</div>
          <div className="text-sm text-gray-300">Best Streak</div>
        </div>
      </div>
    </div>
  );
};
