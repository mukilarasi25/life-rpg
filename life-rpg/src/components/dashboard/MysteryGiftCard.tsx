import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { Gift, Sparkles, Lock, CheckCircle2 } from 'lucide-react';

export const MysteryGiftCard: React.FC = () => {
  const { 
    isDailyRewardAvailable, 
    hasClaimedDailyRewardToday, 
    claimDailyMysteryReward,
    todayCompletedTasks,
    todayTasks
  } = useGame();
  const { t } = useLanguage();

  const [isOpening, setIsOpening] = useState(false);
  const [revealedReward, setRevealedReward] = useState<{ type: string; value: string; coinsAdded: number } | null>(null);

  const handleOpenChest = () => {
    if (!isDailyRewardAvailable || hasClaimedDailyRewardToday || isOpening) return;

    setIsOpening(true);
    setTimeout(() => {
      const reward = claimDailyMysteryReward();
      setRevealedReward(reward);
      setIsOpening(false);
    }, 1000);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-5 shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-bold text-white">
            {t('mysteryRewardTitle')}
          </h3>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
          Daily Bounty
        </span>
      </div>

      {/* Interactive Chest Animation Area */}
      <div className="my-4 text-center">
        {revealedReward ? (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 text-center animate-fadeIn space-y-2">
            <Sparkles className="w-8 h-8 text-amber-400 mx-auto animate-spin" />
            <h4 className="text-base font-black text-amber-300">
              {revealedReward.type}!
            </h4>
            <p className="text-xs font-bold text-white font-mono">
              {revealedReward.value}
            </p>
            <span className="text-[10px] text-emerald-400 font-semibold block">
              ✓ Deposited into your Royal Vault
            </span>
          </div>
        ) : (
          <div
            onClick={handleOpenChest}
            className={`group mx-auto w-24 h-24 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer select-none ${
              isDailyRewardAvailable && !hasClaimedDailyRewardToday
                ? 'bg-gradient-to-br from-amber-500/30 to-purple-600/30 border-2 border-amber-400 shadow-xl shadow-amber-500/20 hover:scale-105 animate-pulse'
                : 'bg-slate-950 border border-slate-800 opacity-60 cursor-not-allowed'
            } ${isOpening ? 'animate-bounce' : ''}`}
          >
            {isDailyRewardAvailable && !hasClaimedDailyRewardToday ? (
              <>
                <Gift className="w-10 h-10 text-amber-400 group-hover:rotate-12 transition-transform" />
                <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest mt-1">
                  Ready!
                </span>
              </>
            ) : hasClaimedDailyRewardToday ? (
              <>
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                <span className="text-[10px] font-bold text-slate-400 mt-1">Claimed</span>
              </>
            ) : (
              <>
                <Lock className="w-8 h-8 text-slate-500" />
                <span className="text-[10px] font-bold text-slate-500 mt-1">
                  {todayCompletedTasks.length}/{todayTasks.length} Done
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer Instructions */}
      <div className="text-center pt-2 border-t border-slate-800/80">
        <p className="text-xs text-slate-400">
          {hasClaimedDailyRewardToday
            ? 'You have claimed today’s mystery treasure. Return tomorrow for more!'
            : isDailyRewardAvailable
            ? t('mysteryRewardReady')
            : t('mysteryRewardLocked')}
        </p>
      </div>
    </div>
  );
};
