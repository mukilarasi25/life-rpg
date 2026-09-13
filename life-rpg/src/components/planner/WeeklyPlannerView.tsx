import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { CalendarDays, Plus, CheckCircle2, Split, Trophy, Sparkles } from 'lucide-react';

export const WeeklyPlannerView: React.FC = () => {
  const { 
    weeklyGoals, addWeeklyGoal, incrementWeeklyGoal, 
    breakWeeklyGoalIntoDaily, categories 
  } = useGame();
  const { t, language } = useLanguage();

  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTargetCount, setNewTargetCount] = useState(5);
  const [newCategoryId, setNewCategoryId] = useState('coding');

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addWeeklyGoal({
      title: newTitle.trim(),
      targetCount: newTargetCount,
      currentCount: 0,
      categoryId: newCategoryId,
      weekStartDate: '2026-09-07',
    });

    setNewTitle('');
    setShowAddGoal(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-amber-400" />
            <span>{t('weeklyPlannerTitle')}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Set multi-day objectives and divide them into daily executable quests.
          </p>
        </div>

        <button
          onClick={() => setShowAddGoal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addWeeklyGoalBtn')}</span>
        </button>
      </div>

      {/* Add Weekly Goal Form */}
      {showAddGoal && (
        <form onSubmit={handleCreateGoal} className="p-4 bg-slate-900 border border-amber-500/40 rounded-2xl space-y-3 animate-fadeIn text-xs">
          <h3 className="text-sm font-bold text-white">Create New Weekly Campaign Objective</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-slate-300 font-bold block mb-1">Milestone Name</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Complete 5 coding sessions this week..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1">Target Sessions</label>
              <input
                type="number"
                min={1}
                max={30}
                value={newTargetCount}
                onChange={(e) => setNewTargetCount(parseInt(e.target.value, 10))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddGoal(false)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
            >
              Commit Milestone
            </button>
          </div>
        </form>
      )}

      {/* Weekly Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {weeklyGoals.map((goal) => {
          const cat = categories.find((c) => c.id === goal.categoryId) || categories[0];
          const percent = Math.min(100, Math.round((goal.currentCount / goal.targetCount) * 100));

          return (
            <div
              key={goal.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                goal.isCompleted
                  ? 'bg-slate-900/60 border-emerald-500/40'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span 
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: `${cat?.color}20`, color: cat?.color }}
                  >
                    {language === 'ta' ? cat?.nameTa : cat?.name}
                  </span>
                  {goal.isCompleted && (
                    <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                      <Trophy className="w-3.5 h-3.5" /> 100% Victor
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-white mb-2">{goal.title}</h4>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-300">
                    <span>Progress: {goal.currentCount} / {goal.targetCount} completed</span>
                    <span className="font-mono text-amber-400">{percent}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-950 rounded-full border border-slate-800 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Actions: increment progress or divide into daily quest */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                <button
                  type="button"
                  onClick={() => incrementWeeklyGoal(goal.id)}
                  disabled={goal.isCompleted}
                  className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                    goal.isCompleted
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40 cursor-default'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+1 Session</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    breakWeeklyGoalIntoDaily(goal.id);
                    alert(`Created today's quest: 'Daily Milestone: ${goal.title}'! Check Daily Tasks.`);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-300 font-bold flex items-center gap-1.5 transition-all"
                >
                  <Split className="w-3.5 h-3.5" />
                  <span>{t('breakIntoDailyTasks')}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
