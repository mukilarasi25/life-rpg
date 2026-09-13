import { assetPath } from '../../utils/assetPath';
import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Flame, Coins, Shield, Sparkles, Bell, Volume2, VolumeX, 
  Globe, AlertTriangle, ChevronRight, X
} from 'lucide-react';
import { AVATAR_MODELS } from '../../data/initialSeed';

interface TopHeaderProps {
  onOpenAI: () => void;
  onOpenNotifications: () => void;
  onOpenWearable: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ 
  onOpenAI, 
  onOpenNotifications,
  onOpenWearable 
}) => {
  const { 
    user, level, currentLevelXp, targetXp, rank, coins, 
    currentStreak, missedDays, recoverStreak, settings, updateSettings,
    notifications, avatar
  } = useGame();
  const { language, setLanguage, t } = useLanguage();
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const xpPercentage = Math.min(100, Math.round((currentLevelXp / targetXp) * 100));

  const avatarInfo = AVATAR_MODELS.find((a) => a.id === avatar.baseModelId) || AVATAR_MODELS[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 shadow-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: App Logo & Rank Badge */}
        <div className="flex items-center gap-3">
          <div className="relative group flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 via-purple-600 to-indigo-700 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-100 to-purple-300">
                  {t('appName')}
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  {language === 'ta' ? rank.rank : rank.rank}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
                {t('level')} {level} • {user.displayName}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Real-time Level Progress Gauge */}
        <div className="hidden md:flex flex-col items-center flex-1 max-w-xs mx-4">
          <div className="w-full flex items-center justify-between text-xs font-semibold mb-1">
            <span className="text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {t('level')} {level}
            </span>
            <span className="text-slate-300 font-mono text-[11px]">
              {currentLevelXp} / {targetXp} {t('xp')} ({xpPercentage}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-900 rounded-full border border-slate-700/80 overflow-hidden relative shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 via-cyan-400 to-purple-500 transition-all duration-500 rounded-full"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
        </div>

        {/* Right: Economy, Streaks, Language, Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Virtual Currency: Coins */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-300 font-mono text-xs sm:text-sm font-bold shadow-sm">
            <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{coins.toLocaleString()}</span>
          </div>

          {/* Daily Streak Flame with Danger Warning if missed */}
          <div 
            onClick={() => missedDays > 0 && setShowRecoveryModal(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              missedDays > 0
                ? 'bg-rose-950/40 border-rose-500/60 text-rose-300 animate-pulse hover:bg-rose-900/50'
                : 'bg-orange-950/30 border-orange-500/30 text-orange-400'
            }`}
            title={missedDays > 0 ? t('streakDangerWarning') : `${currentStreak} ${t('days')} ${t('streak')}`}
          >
            <Flame className={`w-4 h-4 ${missedDays > 0 ? 'text-rose-400' : 'text-orange-500 rpg-flame'}`} />
            <span>{currentStreak}d</span>
            {missedDays > 0 && (
              <span className="text-[10px] px-1 py-0.2 rounded bg-rose-600 text-white uppercase ml-0.5">
                !
              </span>
            )}
          </div>

          {/* Bilingual Language Switcher (English / Tamil) */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 text-xs font-medium transition-colors"
            title="Toggle Language (English / தமிழ்)"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold">{language === 'en' ? 'தமிழ்' : 'EN'}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 transition-colors"
            title={settings.soundEnabled ? 'Mute SFX' : 'Enable SFX'}
          >
            {settings.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Avatar Thumbnail */}
          <div className="w-8 h-8 rounded-full border border-amber-400/50 overflow-hidden bg-slate-800 shadow-md">
            <img 
              src={assetPath(avatarInfo.image)} 
              alt={user.displayName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Streak Recovery Modal Dialog */}
      {showRecoveryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setShowRecoveryModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-rose-950/80 border border-rose-500/50 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-rose-400 animate-bounce" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {t('recoverStreakBtn')}
                </h3>
                <p className="text-xs text-rose-300">
                  {missedDays} consecutive missed day(s) detected!
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
              {t('recoverConfirm')}
            </p>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 mb-6 text-xs text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>Recovery Cost:</span>
                <span className="text-amber-400 font-bold font-mono">1,000 Coins</span>
              </div>
              <div className="flex justify-between">
                <span>Your Balance:</span>
                <span className="text-slate-200 font-bold font-mono">{coins.toLocaleString()} Coins</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRecoveryModal(false)}
                className="flex-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-colors"
              >
                {t('cancelBtn')}
              </button>
              <button
                onClick={() => {
                  const success = recoverStreak();
                  if (success) {
                    setShowRecoveryModal(false);
                  } else {
                    alert('Not enough coins to recover streak! Earn more by completing tasks.');
                  }
                }}
                disabled={coins < 1000}
                className={`flex-1 px-4 py-2 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-1.5 ${
                  coins >= 1000
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                {t('confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
