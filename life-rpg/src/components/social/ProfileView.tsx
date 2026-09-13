import { assetPath } from '../../utils/assetPath';
import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { CASTLE_STAGES } from '../../utils/xpEngine';
import { AVATAR_MODELS } from '../../data/initialSeed';
import { 
  Trophy, Flame, Coins, Shield, Share2, Users, 
  CheckCircle2, Sparkles, Castle, Copy, Check 
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { 
    user, level, rank, currentStreak, longestStreak, 
    totalXp, coins, castleStage, avatar, achievements,
    communityUsers, toggleFollowUser
  } = useGame();
  const { t, language } = useLanguage();

  const [copied, setCopied] = useState(false);
  const [activeShareText, setActiveShareText] = useState<string | null>(null);

  const currentCastle = CASTLE_STAGES.find((s) => s.stage === castleStage) || CASTLE_STAGES[0];
  const avatarModel = AVATAR_MODELS.find((m) => m.id === avatar.baseModelId) || AVATAR_MODELS[0];

  const handleCopyShare = (title: string) => {
    const text = `🏆 I achieved '${title}' in Aetheria! Currently Level ${level} ${rank.rank} on a ${currentStreak}-day streak! ⚔️`;
    navigator.clipboard?.writeText?.(text);
    setActiveShareText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setActiveShareText(null);
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* RPG Hero Profile Showcase with Castle Backdrop */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl">
        {/* Castle backdrop image */}
        <div 
          className="absolute inset-0 bg-cover bg-center brightness-75 filter blur-[1px]"
          style={{ backgroundImage: `url('${assetPath(currentCastle.image)}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />

        {/* Profile Card Body */}
        <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            {/* Avatar Portrait with Castle Frame */}
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-2xl bg-slate-900">
              <img 
                src={assetPath(avatarModel.image)} 
                alt={user.displayName}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-black uppercase">
                LVL {level}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl font-black text-white">{user.displayName}</h2>
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-500/20 border border-purple-400/40 text-purple-300">
                  {rank.rank}
                </span>
              </div>
              <p className="text-xs text-amber-300 font-semibold">
                Lord of Stage {currentCastle.stage}: {language === 'ta' ? currentCastle.nameTa : currentCastle.name}
              </p>
              <p className="text-[11px] text-slate-400 max-w-sm">
                Real-world adventurer forging discipline into legend.
              </p>
            </div>
          </div>

          {/* Core Player Stats */}
          <div className="grid grid-cols-3 gap-2 w-full sm:w-auto text-center font-mono">
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-sans block">Streak</span>
              <span className="text-sm font-black text-orange-400">{currentStreak}d 🔥</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-sans block">Total XP</span>
              <span className="text-sm font-black text-amber-400">{totalXp.toLocaleString()}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-sans block">Coins</span>
              <span className="text-sm font-black text-amber-300">{coins.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Share Toast */}
      {copied && (
        <div className="p-3 bg-emerald-950/90 border border-emerald-500 rounded-xl text-emerald-300 text-xs font-bold flex items-center justify-between shadow-lg animate-fadeIn">
          <span className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            Achievement card link copied to clipboard: "{activeShareText}"
          </span>
        </div>
      )}

      {/* Achievements Gallery */}
      <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Earned Milestones & Achievements</h3>
          </div>
          <span className="text-xs text-slate-400">
            {achievements.filter((a) => a.isUnlocked).length} / {achievements.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                ach.isUnlocked
                  ? 'bg-slate-950 border-amber-500/40 shadow-sm'
                  : 'bg-slate-950/40 border-slate-800 opacity-60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white">{ach.title}</span>
                  {ach.isUnlocked && (
                    <button
                      type="button"
                      onClick={() => handleCopyShare(ach.title)}
                      className="text-slate-400 hover:text-amber-400 transition-colors p-1"
                      title="Share Achievement"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {language === 'ta' ? ach.descriptionTa : ach.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 mt-2 text-[10px] text-amber-400 font-mono font-bold">
                <span>+{ach.xpReward} XP</span>
                <span>+{ach.coinReward} Coins</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Adventurers & Follow System */}
      <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">{t('socialTitle')}</h3>
          </div>
          <p className="text-xs text-slate-400">
            Connect with fellow adventurers without exposing private contact info.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {communityUsers.map((comm) => (
            <div
              key={comm.id}
              className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-700 shrink-0">
                  <img src={assetPath('/assets/avatars/m1.jpg')} alt={comm.displayName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{comm.displayName}</h4>
                  <p className="text-[10px] text-slate-400">
                    Lvl {comm.level} • {comm.rank} • {comm.currentStreak}d streak
                  </p>
                  <span className="text-[10px] text-amber-400 font-semibold">
                    Mastery: {comm.strongestCategory}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleFollowUser(comm.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  comm.isFollowing
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black'
                }`}
              >
                {comm.isFollowing ? t('unfollowBtn') : t('followBtn')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
