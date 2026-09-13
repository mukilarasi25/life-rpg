import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { Task, TaskVerification } from '../../types';
import { VerificationModal } from './VerificationModal';
import { TaskCreateModal } from './TaskCreateModal';
import { 
  CheckCircle2, Circle, Clock, ShieldCheck, Sparkles, Plus, 
  Trash2, AlertCircle, Coins, Flame, Filter, ChevronRight
} from 'lucide-react';

export const TaskList: React.FC = () => {
  const { 
    tasks, completeTaskWithoutVerification, completeTaskWithVerification, 
    deleteTask, categories, todayTasks, todayCompletedTasks, 
    todayXpEarned, todayCompletionPercentage, currentStreak, coins 
  } = useGame();
  const { t, language } = useLanguage();

  const [verifyingTask, setVerifyingTask] = useState<Task | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('all');

  const filteredTasks = selectedFilterCategory === 'all'
    ? tasks
    : tasks.filter((t) => t.categoryId === selectedFilterCategory);

  const handleTaskAction = (task: Task) => {
    if (task.isCompleted) return;

    if (task.requiresVerification) {
      setVerifyingTask(task);
    } else {
      completeTaskWithoutVerification(task.id);
    }
  };

  const getPriorityStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'critical':
        return 'border-rose-500/80 bg-rose-950/20 shadow-rose-900/40 shadow-md ring-1 ring-rose-500/40 animate-pulse';
      case 'high':
        return 'border-amber-500/80 bg-amber-950/20 shadow-amber-900/30 shadow-md ring-1 ring-amber-500/30';
      case 'normal':
        return 'border-slate-800 bg-slate-900/70 hover:border-slate-700';
      case 'low':
        return 'border-slate-800/60 bg-slate-950/60 opacity-80';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner: Daily Metrics & Streak */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center gap-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">
              {t('xpEarnedToday')}
            </span>
            <span className="text-base font-black text-amber-300 font-mono">
              +{todayXpEarned} XP
            </span>
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center gap-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">
              {t('completedTasks')}
            </span>
            <span className="text-base font-black text-cyan-300 font-mono">
              {todayCompletedTasks.length} / {todayTasks.length} ({todayCompletionPercentage}%)
            </span>
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center gap-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500">
            <Flame className="w-5 h-5 rpg-flame" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">
              {t('streak')}
            </span>
            <span className="text-base font-black text-orange-400 font-mono">
              {currentStreak} {t('days')} 🔥
            </span>
          </div>
        </div>

        <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center gap-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">
              {t('coins')}
            </span>
            <span className="text-base font-black text-amber-300 font-mono">
              {coins.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Task Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{t('todayTasks')}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono">
              {filteredTasks.length}
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Complete high-priority quests and submit verification to maximize XP!
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Category Filter Dropdown */}
          <div className="relative flex-1 sm:flex-initial">
            <select
              value={selectedFilterCategory}
              onChange={(e) => setSelectedFilterCategory(e.target.value)}
              className="w-full sm:w-auto bg-slate-900 border border-slate-700 text-slate-300 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none"
            >
              <option value="all">All Realm Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {language === 'ta' ? c.nameTa : c.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{t('createTaskBtn')}</span>
          </button>
        </div>
      </div>

      {/* Task Cards List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-slate-800/80">
            <Sparkles className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {t('noTasksToday')}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const category = categories.find((c) => c.id === task.categoryId) || categories[0];
            const isCompleted = task.isCompleted;

            return (
              <div
                key={task.id}
                className={`p-4 rounded-2xl border transition-all duration-300 relative group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isCompleted 
                    ? 'bg-slate-950/40 border-slate-800/50 opacity-60' 
                    : getPriorityStyle(task.priority)
                }`}
              >
                {/* Left: Checkbox & Info */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={() => handleTaskAction(task)}
                    disabled={isCompleted}
                    className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-emerald-500 text-slate-950'
                        : 'border-2 border-slate-600 hover:border-amber-400 text-transparent hover:text-amber-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  </button>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h4 className={`text-sm font-bold truncate ${isCompleted ? 'line-through text-slate-400' : 'text-white'}`}>
                        {task.title}
                      </h4>

                      {/* Priority Badge */}
                      {task.priority === 'critical' && (
                        <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                          Critical
                        </span>
                      )}
                      {task.priority === 'high' && (
                        <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          High
                        </span>
                      )}

                      {/* Verification Status Badge */}
                      {task.verification && (
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          task.verification.status === 'verified'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : task.verification.status === 'partially_verified'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          <ShieldCheck className="w-3 h-3" />
                          {task.verification.status === 'verified' && t('verifiedBadge')}
                          {task.verification.status === 'partially_verified' && t('partiallyVerifiedBadge')}
                          {task.verification.status === 'self_reported' && t('selfReportedBadge')}
                        </span>
                      )}
                    </div>

                    {task.description && (
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {task.description}
                      </p>
                    )}

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400 font-medium">
                      <span 
                        className="px-2 py-0.5 rounded-md font-semibold text-[10px]"
                        style={{ backgroundColor: `${category?.color || '#6366f1'}20`, color: category?.color || '#6366f1' }}
                      >
                        {language === 'ta' ? category?.nameTa : category?.name}
                      </span>

                      {task.time && (
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-3 h-3 text-cyan-400" />
                          {task.time}
                        </span>
                      )}

                      <span className="text-amber-400 font-mono font-bold">
                        +{task.xpValue} XP
                      </span>
                      <span className="text-amber-300/80 font-mono">
                        +{task.coinsValue} Coins
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  {!isCompleted ? (
                    <button
                      type="button"
                      onClick={() => handleTaskAction(task)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-1.5 ${
                        task.requiresVerification
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950'
                          : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 text-slate-950'
                      }`}
                    >
                      {task.requiresVerification ? (
                        <>
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>{t('verifyBtn')}</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{t('completeBtn')}</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Done
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition-colors"
                    title="Delete Quest"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Verification Modal Trigger */}
      {verifyingTask && (
        <VerificationModal
          task={verifyingTask}
          onClose={() => setVerifyingTask(null)}
          onVerified={(verification) => {
            completeTaskWithVerification(verifyingTask.id, verification);
            setVerifyingTask(null);
          }}
        />
      )}

      {/* Task Creation Modal Trigger */}
      {showCreateModal && (
        <TaskCreateModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};
