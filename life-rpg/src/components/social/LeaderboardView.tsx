import { assetPath } from '../../utils/assetPath';
import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { Trophy, ShieldCheck, Flame, Medal, Sparkles, Filter } from 'lucide-react';

export const LeaderboardView: React.FC = () => {
  const { user, level, rank, currentStreak, totalXp } = useGame();
  const { t } = useLanguage();

  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'allTime'>('weekly');

  // Anti-exploit leaderboard entries (weighted by verification rate and task importance)
  const leaderboardData = [
    {
      rank: 1,
      name: 'Elena Sunstrider',
      title: 'Legend',
      level: 52,
      score: 9820,
      streak: 110,
      verifiedRate: 98,
      avatar: assetPath('/assets/castles/hero_bg.jpg'),
    },
    {
      rank: 2,
      name: 'Aria the Code Mage',
      title: 'Champion',
      level: 28,
      score: 3450,
      streak: 42,
      verifiedRate: 94,
      avatar: assetPath('/assets/castles/castle_4.jpg'),
    },
    {
      rank: 3,
      name: user.displayName,
      title: rank.rank,
      level: level,
      score: totalXp + 450,
      streak: currentStreak,
      verifiedRate: 92,
      avatar: assetPath('/assets/avatars/m1.jpg'),
      isCurrentUser: true,
    },
    {
      rank: 4,
      name: 'Marcus Ironfist',
      title: 'Warrior',
      level: 19,
      score: 1890,
      streak: 21,
      verifiedRate: 88,
      avatar: assetPath('/assets/castles/castle_2.jpg'),
    },
    {
      rank: 5,
      name: 'Tariq Al-Nour',
      title: 'Warrior',
      level: 14,
      score: 1250,
      streak: 14,
      verifiedRate: 86,
      avatar: assetPath('/assets/avatars/m1.jpg'),
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header & Anti-Exploit Explanation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            <span>{t('leaderboardTitle')}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ranked by authentic verified milestones, task difficulty, and daily consistency — not spammed easy tasks.
          </p>
        </div>

        {/* Timeframe Switcher */}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          {(['daily', 'weekly', 'monthly', 'allTime'] as const).map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                timeframe === tf
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tf === 'allTime' ? 'All Time' : tf}
            </button>
          ))}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="grid grid-cols-12 px-5 py-3 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <div className="col-span-1">Rank</div>
          <div className="col-span-5 sm:col-span-4">Adventurer</div>
          <div className="col-span-3 sm:col-span-3 text-right">Ascendance Score</div>
          <div className="hidden sm:block sm:col-span-2 text-center">Streak</div>
          <div className="col-span-3 sm:col-span-2 text-right">Verified Rate</div>
        </div>

        <div className="divide-y divide-slate-800/80">
          {leaderboardData.map((entry) => {
            const isTop3 = entry.rank <= 3;
            return (
              <div
                key={entry.rank}
                className={`grid grid-cols-12 px-5 py-3.5 items-center text-xs transition-all ${
                  entry.isCurrentUser
                    ? 'bg-amber-500/10 border-y border-amber-500/40'
                    : 'hover:bg-slate-800/40'
                }`}
              >
                {/* Rank Badge */}
                <div className="col-span-1 font-bold">
                  {entry.rank === 1 && <span className="text-amber-400 text-sm">🥇 #1</span>}
                  {entry.rank === 2 && <span className="text-slate-300 text-sm">🥈 #2</span>}
                  {entry.rank === 3 && <span className="text-amber-600 text-sm">🥉 #3</span>}
                  {entry.rank > 3 && <span className="text-slate-500">#{entry.rank}</span>}
                </div>

                {/* Adventurer Details */}
                <div className="col-span-5 sm:col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                    <img src={entry.avatar} alt={entry.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className={`font-bold ${entry.isCurrentUser ? 'text-amber-300' : 'text-white'}`}>
                      {entry.name} {entry.isCurrentUser && '(You)'}
                    </h4>
                    <span className="text-[10px] text-purple-300 font-semibold">
                      Lvl {entry.level} • {entry.title}
                    </span>
                  </div>
                </div>

                {/* Score */}
                <div className="col-span-3 sm:col-span-3 text-right font-mono font-black text-amber-400">
                  {entry.score.toLocaleString()} pts
                </div>

                {/* Streak */}
                <div className="hidden sm:flex sm:col-span-2 items-center justify-center gap-1 text-orange-400 font-mono font-bold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{entry.streak}d</span>
                </div>

                {/* Verified Rate */}
                <div className="col-span-3 sm:col-span-2 text-right">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold text-[11px] inline-flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    {entry.verifiedRate}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
