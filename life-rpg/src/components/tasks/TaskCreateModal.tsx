import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { TaskPriority, TaskDifficulty } from '../../types';
import { 
  Plus, X, Sparkles, AlertCircle, Clock, Calendar, 
  ShieldCheck, Repeat, Bell, Tag
} from 'lucide-react';

interface TaskCreateModalProps {
  onClose: () => void;
}

export const TaskCreateModal: React.FC<TaskCreateModalProps> = ({ onClose }) => {
  const { addTask, categories } = useGame();
  const { t, language } = useLanguage();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'coding');
  const [date, setDate] = useState('2026-09-12');
  const [time, setTime] = useState('18:00');
  const [priority, setPriority] = useState<TaskPriority>('normal');
  const [difficulty, setDifficulty] = useState<TaskDifficulty>('normal');
  const [isRecurring, setIsRecurring] = useState(false);
  const [reminderBefore, setReminderBefore] = useState('30m');
  const [requiresVerification, setRequiresVerification] = useState(true);

  // XP & Coins mapping based on difficulty
  const difficultyMapping: Record<TaskDifficulty, { xp: number; coins: number; label: string; labelTa: string }> = {
    small: { xp: 1, coins: 10, label: 'Small (+1 XP, +10 Coins)', labelTa: 'சிறிய பணி (+1 XP, +10 காசுகள்)' },
    normal: { xp: 2, coins: 15, label: 'Normal (+2 XP, +15 Coins)', labelTa: 'சாதாரண பணி (+2 XP, +15 காசுகள்)' },
    important: { xp: 5, coins: 25, label: 'Important (+5 XP, +25 Coins)', labelTa: 'முக்கிய பணி (+5 XP, +25 காசுகள்)' },
    major: { xp: 10, coins: 50, label: 'Major Epic (+10 XP, +50 Coins)', labelTa: 'பெரும் சாதனை (+10 XP, +50 காசுகள்)' },
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const diffData = difficultyMapping[difficulty];

    addTask({
      title: title.trim(),
      description: description.trim() || undefined,
      categoryId,
      date,
      time: time || undefined,
      priority,
      difficulty,
      xpValue: diffData.xp,
      coinsValue: diffData.coins,
      deadline: `${date} ${time || '23:59'}`,
      isRecurring,
      reminderBefore,
      requiresVerification,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {t('forgeQuestTitle')}
            </h3>
            <p className="text-xs text-slate-400">Unlimited real-world quests with customizable XP and proof</p>
          </div>
        </div>

        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          {/* Quest Title */}
          <div>
            <label className="text-slate-300 font-bold block mb-1">
              {t('taskNameLabel')} *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Study C++ for 2 hours, 5km Morning Run..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none text-xs"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-slate-300 font-bold block mb-1">
              {t('taskDescLabel')}
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional quest details, goals, or instructions..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none text-xs"
            />
          </div>

          {/* Category & Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-bold block mb-1 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                {t('categoryLabel')}
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-white text-xs focus:border-amber-400 focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {language === 'ta' ? cat.nameTa : cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-slate-300 font-bold block mb-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-orange-400" />
                {t('priorityLabel')}
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-white text-xs focus:border-amber-400 focus:outline-none capitalize"
              >
                <option value="low">Low Priority</option>
                <option value="normal">Normal Priority</option>
                <option value="high">High Priority (Gold Glow)</option>
                <option value="critical">Critical Priority (Flashing)</option>
              </select>
            </div>
          </div>

          {/* Difficulty & XP Reward */}
          <div>
            <label className="text-slate-300 font-bold block mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {t('difficultyLabel')}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['small', 'normal', 'important', 'major'] as TaskDifficulty[]).map((diff) => {
                const isSelected = difficulty === diff;
                const dData = difficultyMapping[diff];
                return (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-md shadow-amber-500/10'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="capitalize font-bold text-[11px]">{diff}</div>
                    <div className="text-[10px] text-amber-400 font-mono font-bold">+{dData.xp} XP</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Date, Time & Deadline */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-bold block mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-white text-xs focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-300 font-bold block mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                Time / Deadline
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-white text-xs focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Options: Reminder & Recurring & Verification */}
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-medium flex items-center gap-1.5 cursor-pointer">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                {t('requireVerificationLabel')}
              </label>
              <input
                type="checkbox"
                checked={requiresVerification}
                onChange={(e) => setRequiresVerification(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-medium flex items-center gap-1.5 cursor-pointer">
                <Repeat className="w-4 h-4 text-emerald-400" />
                {t('recurringLabel')} (Daily)
              </label>
              <input
                type="checkbox"
                checked={isRecurring}
                onChange={(e) => setIsRecurring(e.target.checked)}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-amber-400" />
                {t('reminderLabel')}
              </label>
              <select
                value={reminderBefore}
                onChange={(e) => setReminderBefore(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-slate-300"
              >
                <option value="10m">10m before</option>
                <option value="30m">30m before</option>
                <option value="1h">1 hour before</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
            >
              {t('cancelBtn')}
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-500/20"
            >
              {t('saveQuestBtn')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
