import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, CheckCircle2, 
  Circle, Sparkles, Coins, FileText, Clock, Plus 
} from 'lucide-react';
import { TaskCreateModal } from '../tasks/TaskCreateModal';

export const CalendarView: React.FC = () => {
  const { tasks, currentStreak } = useGame();
  const { t, language } = useLanguage();

  const [selectedDate, setSelectedDate] = useState<string>('2026-09-12');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Month days for September 2026
  const daysInMonth = Array.from({ length: 30 }, (_, i) => {
    const dayNum = i + 1;
    const dateStr = `2026-09-${dayNum < 10 ? '0' + dayNum : dayNum}`;
    const dayTasks = tasks.filter((t) => t.date === dateStr);
    const completed = dayTasks.filter((t) => t.isCompleted);
    return {
      day: dayNum,
      date: dateStr,
      tasks: dayTasks,
      completedCount: completed.length,
      isToday: dateStr === '2026-09-12',
    };
  });

  const selectedDayTasks = tasks.filter((t) => t.date === selectedDate);
  const selectedDayCompleted = selectedDayTasks.filter((t) => t.isCompleted);
  const xpEarnedOnDate = selectedDayCompleted.reduce((sum, t) => sum + (t.verification?.verifiedXpEarned ?? t.xpValue), 0);
  const coinsEarnedOnDate = selectedDayCompleted.reduce((sum, t) => sum + t.coinsValue, 0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-cyan-400" />
            <span>Realm Chronicle & Calendar</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Inspect past triumphs, notes, submitted evidence, and plan future dates.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Quest to Calendar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2/3: Month Calendar Grid */}
        <div className="lg:col-span-2 p-5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">September 2026</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <span>Current Streak: {currentStreak} Days</span>
            </div>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 border-b border-slate-800 pb-2">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {/* September 2026 starts on Tuesday (2 offset empty days) */}
            <div className="p-2 opacity-0" />
            <div className="p-2 opacity-0" />

            {daysInMonth.map((d) => {
              const isSelected = selectedDate === d.date;
              return (
                <button
                  key={d.date}
                  type="button"
                  onClick={() => setSelectedDate(d.date)}
                  className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-between min-h-[56px] ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 ring-1 ring-cyan-400'
                      : d.isToday
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold">{d.day}</span>
                  {d.tasks.length > 0 && (
                    <div className="flex gap-0.5 mt-1">
                      {d.tasks.map((t, idx) => (
                        <span
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full ${
                            t.isCompleted ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 1/3: Date Inspector */}
        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                Inspecting Date
              </span>
              <h3 className="text-base font-bold text-white">{selectedDate}</h3>
            </div>

            {/* Daily summary badges */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">XP Earned:</span>
                <span className="font-bold text-amber-400 font-mono">+{xpEarnedOnDate} XP</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Coins:</span>
                <span className="font-bold text-amber-300 font-mono">+{coinsEarnedOnDate} Coins</span>
              </div>
            </div>

            {/* Scheduled quests on date */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 block">
                Quests ({selectedDayTasks.length}):
              </span>
              {selectedDayTasks.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-2">
                  No quests recorded on this date.
                </p>
              ) : (
                selectedDayTasks.map((t) => (
                  <div
                    key={t.id}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${t.isCompleted ? 'text-emerald-300' : 'text-white'}`}>
                        {t.title}
                      </span>
                      {t.isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Circle className="w-3.5 h-3.5 text-slate-500" />
                      )}
                    </div>
                    {t.verification && (
                      <p className="text-[10px] text-cyan-300">
                        Status: {t.verification.status} ({t.verification.confidenceScore}% confidence)
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <TaskCreateModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};
