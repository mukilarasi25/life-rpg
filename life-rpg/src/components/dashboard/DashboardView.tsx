import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { HeroStage } from './HeroStage';
import { MysteryGiftCard } from './MysteryGiftCard';
import { CategoryRadarCard } from './CategoryRadarCard';
import { TaskList } from '../tasks/TaskList';
import { 
  Trophy, Flame, Coins, Clock, CalendarDays, 
  ArrowRight, ShieldCheck, Sparkles, CheckCircle2 
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const { 
    weeklyGoals, achievements, notifications, 
    todayTasks, todayCompletedTasks 
  } = useGame();
  const { t } = useLanguage();

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* 1. Top Section: Avatar in front of Castle & Progression Gauge */}
      <HeroStage
        onNavigateToCastle={() => onNavigate('castle')}
        onNavigateToWardrobe={() => onNavigate('wardrobe')}
      />

      {/* 2. Middle Section: Today's Quests + Side Widgets (Mystery Reward & Category Radar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2/3: Today's Quests & Progress */}
        <div className="lg:col-span-2 space-y-6">
          <TaskList />
        </div>

        {/* Right 1/3: Mystery Daily Reward & Category Breakdown */}
        <div className="space-y-6">
          <MysteryGiftCard />
          <CategoryRadarCard />

          {/* Weekly Campaign Quick Widget */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm font-bold text-white">Active Weekly Milestones</h4>
              </div>
              <button
                onClick={() => onNavigate('planner')}
                className="text-[11px] text-amber-400 font-bold hover:underline flex items-center gap-0.5"
              >
                Planner <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {weeklyGoals.slice(0, 3).map((g) => (
                <div key={g.id} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-300 truncate">{g.title}</span>
                    <span className="text-amber-400 font-mono text-[11px]">
                      {g.currentCount}/{g.targetCount}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full"
                      style={{ width: `${Math.min(100, Math.round((g.currentCount / g.targetCount) * 100))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Section: Recent Achievements & Upcoming Reminders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800/80">
        {/* Achievements Showcase */}
        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-bold text-white">Recent Achievements</h4>
            </div>
            <button
              onClick={() => onNavigate('profile')}
              className="text-[11px] text-amber-400 font-bold hover:underline"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {achievements.slice(0, 2).map((ach) => (
              <div key={ach.id} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                <span className="font-bold text-amber-300 block truncate">{ach.title}</span>
                <p className="text-[10px] text-slate-400 line-clamp-1">{ach.description}</p>
                <span className="text-[10px] font-mono text-amber-400 font-bold">+{ach.xpReward} XP</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Reminders */}
        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-white">Upcoming Realm Reminders</h4>
            </div>
            <button
              onClick={() => onNavigate('calendar')}
              className="text-[11px] text-cyan-400 font-bold hover:underline"
            >
              Chronicle
            </button>
          </div>

          <div className="space-y-2">
            {notifications.slice(0, 2).map((n) => (
              <div key={n.id} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-200 block">{n.title}</span>
                  <p className="text-[10px] text-slate-400">{n.message}</p>
                </div>
                <span className="text-[10px] text-slate-500 font-mono ml-2 shrink-0">{n.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
