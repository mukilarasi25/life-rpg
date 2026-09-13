import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { CASTLE_STAGES } from '../../utils/xpEngine';
import { AVATAR_MODELS } from '../../data/initialSeed';
import { assetPath } from '../../utils/assetPath';
import { 
  Castle, Sparkles, Trophy, Flame, Coins, AlertTriangle, 
  Shield, ArrowUpRight, CheckCircle2
} from 'lucide-react';

interface HeroStageProps {
  onNavigateToCastle: () => void;
  onNavigateToWardrobe: () => void;
}

export const HeroStage: React.FC<HeroStageProps> = ({ 
  onNavigateToCastle, 
  onNavigateToWardrobe 
}) => {
  const { 
    user, level, currentLevelXp, targetXp, rank, castleStage, 
    coins, currentStreak, missedDays, recoverStreak, avatar, avatarItems 
  } = useGame();
  const { t, language } = useLanguage();

  const [recoverSuccess, setRecoverSuccess] = useState(false);

  const currentCastle = CASTLE_STAGES.find((s) => s.stage === castleStage) || CASTLE_STAGES[0];
  const avatarModel = AVATAR_MODELS.find((m) => m.id === avatar.baseModelId) || AVATAR_MODELS[0];

  const xpPercent = Math.min(100, Math.round((currentLevelXp / targetXp) * 100));

  const equippedArmor = avatarItems.find((i) => i.id === avatar.equippedItems.armor);
  const equippedWeapon = avatarItems.find((i) => i.id === avatar.equippedItems.weapon);

  const handleRecover = () => {
    const success = recoverStreak();
    if (success) {
      setRecoverSuccess(true);
      setTimeout(() => setRecoverSuccess(false), 3000);
    } else {
      alert('You need 1,000 coins to restore your streak! Complete daily quests to earn more coins.');
    }
  };

  return (
    <div className="relative rounded-3xl overflow-hidden border border-amber-500/40 shadow-2xl shadow-black/80">
      {/* Dynamic Evolving Castle Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center brightness-90 transform scale-105 transition-all duration-700"
        style={{ backgroundImage: `url('${assetPath(currentCastle.image)}')` }}
      />

      {/* Atmospheric fantasy gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />

      {/* Hero Stage Content */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between min-h-[360px] sm:min-h-[420px]">
        {/* Top Badges: Castle Stage info & Streak Recovery Notice */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Castle Stage Tag */}
          <button
            onClick={onNavigateToCastle}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-slate-900/90 transition-all shadow-md group"
          >
            <Castle className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span>
              Stage {currentCastle.stage}: {language === 'ta' ? currentCastle.nameTa : currentCastle.name}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
          </button>

          {/* Quick Stat Pills */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs font-bold text-orange-400 font-mono shadow-md">
              <Flame className="w-4 h-4 rpg-flame" />
              <span>{currentStreak} Days Streak</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs font-bold text-amber-300 font-mono shadow-md">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>{coins.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* STREAK DANGER BANNER: Rule #20 & #21 */}
        {missedDays > 0 && (
          <div className="my-2 p-3 bg-rose-950/90 border border-rose-500/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg shadow-rose-950/50 animate-pulse">
            <div className="flex items-center gap-2.5 text-xs text-rose-200">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
              <span>
                <strong>{missedDays} consecutive missed day(s)!</strong> If 3 days are missed, current level XP progress resets to 0!
              </span>
            </div>

            <button
              onClick={handleRecover}
              className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5 whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {t('recoverStreakBtn')}
            </button>
          </div>
        )}

        {recoverSuccess && (
          <div className="my-2 p-2.5 bg-emerald-950/90 border border-emerald-500 rounded-xl text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4" />
            Streak Day Restored! 1,000 Coins deducted.
          </div>
        )}

        {/* Bottom Hero Stage: Avatar standing in front of Castle & Level Gauge */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6 pt-4 border-t border-slate-800/60 mt-auto">
          {/* Avatar Character Representation */}
          <div className="flex items-center gap-4">
            <div 
              onClick={onNavigateToWardrobe}
              className="relative group cursor-pointer"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl bg-slate-900 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={assetPath(avatarModel.image)} 
                  alt={user.displayName}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold shadow-lg text-[10px] uppercase tracking-wider">
                {t('level')} {level}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                  {user.displayName}
                </h3>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-500/20 border border-purple-400/40 text-purple-300">
                  {rank.rank}
                </span>
              </div>

              <p className="text-xs text-slate-300 font-medium">
                {language === 'ta' ? rank.descriptionTa : rank.description}
              </p>

              {/* Equipped gear indicators */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-amber-300/80">
                {equippedArmor && (
                  <span className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-800">
                    <Shield className="w-3 h-3 text-amber-400" />
                    {equippedArmor.name}
                  </span>
                )}
                {equippedWeapon && (
                  <span className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded-md border border-slate-800">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    {equippedWeapon.name}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Level Progress Gauge Bar */}
          <div className="w-full sm:w-72 p-4 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-slate-800/80 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-amber-400 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                {t('currentLevelProgress')}
              </span>
              <span className="text-slate-200 font-mono">
                {currentLevelXp} / {targetXp} XP ({xpPercent}%)
              </span>
            </div>

            <div className="w-full h-3 bg-slate-900 rounded-full border border-slate-700 overflow-hidden relative shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-purple-500 transition-all duration-500 rounded-full"
                style={{ width: `${xpPercent}%` }}
              />
            </div>

            <p className="text-[10px] text-slate-400 text-center">
              Earn <strong className="text-amber-300">+{targetXp - currentLevelXp} XP</strong> to reach Level {level + 1}!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
