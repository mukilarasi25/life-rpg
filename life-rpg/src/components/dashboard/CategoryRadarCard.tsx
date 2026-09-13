import React from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { PieChart, TrendingUp, Lightbulb, CheckCircle2, AlertCircle } from 'lucide-react';

export const CategoryRadarCard: React.FC = () => {
  const { categories, tasks } = useGame();
  const { t, language } = useLanguage();

  // Compute category completion rates
  const stats = categories.map((cat) => {
    const catTasks = tasks.filter((t) => t.categoryId === cat.id);
    const completed = catTasks.filter((t) => t.isCompleted);
    const percentage = catTasks.length > 0 
      ? Math.round((completed.length / catTasks.length) * 100) 
      : 70; // baseline if no task logged yet

    return {
      category: cat,
      total: catTasks.length,
      completed: completed.length,
      percentage,
    };
  }).filter((s) => s.category.isImportant || s.total > 0).slice(0, 6);

  // Find strongest and weakest
  const sorted = [...stats].sort((a, b) => b.percentage - a.percentage);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-purple-400" />
          <h3 className="text-sm font-bold text-white">
            Category Mastery Breakdown
          </h3>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
          Habit Balance
        </span>
      </div>

      {/* Category Progress Bars */}
      <div className="space-y-3">
        {stats.map((item) => {
          return (
            <div key={item.category.id} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <span 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: item.category.color }} 
                  />
                  {language === 'ta' ? item.category.nameTa : item.category.name}
                </span>
                <span className="font-mono text-xs font-bold text-slate-400">
                  {item.percentage}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${item.percentage}%`,
                    backgroundColor: item.category.color 
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Constructive Wisdom Callout */}
      <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs space-y-2">
        {strongest && (
          <div className="flex items-start gap-2 text-emerald-300">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Strongest:</strong> {language === 'ta' ? strongest.category.nameTa : strongest.category.name} ({strongest.percentage}% consistency).
            </span>
          </div>
        )}
        {weakest && weakest.percentage < 80 && (
          <div className="flex items-start gap-2 text-amber-300">
            <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Growth Opportunity:</strong> Consider scheduling a 25-minute quest for {language === 'ta' ? weakest.category.nameTa : weakest.category.name} this week.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
