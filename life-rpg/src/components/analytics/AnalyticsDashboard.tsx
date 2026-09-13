import React from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  BarChart3, TrendingUp, ShieldCheck, Flame, 
  Coins, Sparkles, CheckCircle2, Calendar, Award 
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { 
    totalXp, coins, currentStreak, longestStreak, 
    tasks, xpTransactions, categories 
  } = useGame();
  const { t, language } = useLanguage();

  const completedTasks = tasks.filter((t) => t.isCompleted);
  const verifiedTasks = completedTasks.filter((t) => t.verification?.status === 'verified');
  const verificationRate = completedTasks.length > 0
    ? Math.round((verifiedTasks.length / completedTasks.length) * 100)
    : 100;

  // Day of week productivity distribution
  const daysProductivity = [
    { day: 'Mon', xp: 45, completed: 3 },
    { day: 'Tue', xp: 60, completed: 4 },
    { day: 'Wed', xp: 35, completed: 2 },
    { day: 'Thu', xp: 75, completed: 5 },
    { day: 'Fri', xp: 50, completed: 3 },
    { day: 'Sat', xp: 90, completed: 6 },
    { day: 'Sun', xp: 40, completed: 2 },
  ];

  const maxDayXp = Math.max(...daysProductivity.map((d) => d.xp));

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-amber-400" />
          <span>{t('analyticsTitle')}</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Comprehensive telemetry of your real-world discipline, XP gains, and verification integrity.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Total XP Earned
          </span>
          <p className="text-xl font-black text-amber-300 font-mono">
            {totalXp.toLocaleString()}
          </p>
          <span className="text-[10px] text-emerald-400 font-semibold">Lifetime Ascendance</span>
        </div>

        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Verification Rate
          </span>
          <p className="text-xl font-black text-cyan-300 font-mono">
            {verificationRate}%
          </p>
          <span className="text-[10px] text-slate-400">High Anti-Cheat Trust</span>
        </div>

        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" /> Longest Streak
          </span>
          <p className="text-xl font-black text-orange-400 font-mono">
            {longestStreak} Days
          </p>
          <span className="text-[10px] text-slate-400">Current: {currentStreak} Days</span>
        </div>

        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Quests Completed
          </span>
          <p className="text-xl font-black text-emerald-300 font-mono">
            {completedTasks.length} / {tasks.length}
          </p>
          <span className="text-[10px] text-slate-400">Active Campaign</span>
        </div>
      </div>

      {/* Productivity Heatmap / Bar Distribution */}
      <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400" />
            Weekly Quest & XP Distribution
          </h3>
          <span className="text-[11px] text-amber-400 font-mono font-bold">
            Most Productive: Saturday (90 XP)
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-44 pt-6">
          {daysProductivity.map((d) => {
            const heightPercent = Math.round((d.xp / maxDayXp) * 100);
            return (
              <div key={d.day} className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-mono text-slate-400 font-bold">
                  +{d.xp}
                </span>
                <div className="w-full max-w-[36px] bg-slate-950 rounded-t-xl overflow-hidden border border-slate-800 h-full flex items-end">
                  <div 
                    className="w-full bg-gradient-to-t from-amber-600 via-amber-400 to-purple-500 rounded-t-lg transition-all duration-700"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-300">{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Traceable XP & Coin Transaction Ledger */}
      <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-400" />
            Ascendance Ledger (Traceable XP & Coins Audit Log)
          </h3>
          <span className="text-[10px] uppercase font-bold text-slate-400">
            Rule #46 Traceability
          </span>
        </div>

        <div className="divide-y divide-slate-800/80 max-h-56 overflow-y-auto">
          {xpTransactions.map((tx) => (
            <div key={tx.id} className="py-2.5 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <p className="font-bold text-slate-200">
                  {language === 'ta' ? tx.reasonTa : tx.reason}
                </p>
                <span className="text-[10px] text-slate-500 font-mono">
                  Timestamp: {tx.timestamp}
                </span>
              </div>

              <div className="text-right">
                <span className={`font-mono font-bold text-xs ${tx.amount >= 0 ? 'text-amber-400' : 'text-rose-400'}`}>
                  {tx.amount >= 0 ? `+${tx.amount}` : tx.amount} XP
                </span>
                <span className="text-[10px] text-slate-500 block font-mono">
                  Balance: {tx.balanceAfter} XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
