import { assetPath } from '../../utils/assetPath';
import React from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { Trophy, Coins, Castle, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { CASTLE_STAGES } from '../../utils/xpEngine';

export const LevelUpModal: React.FC = () => {
  const { activeLevelUp, dismissLevelUp } = useGame();
  const { t, language } = useLanguage();

  if (!activeLevelUp) return null;

  const currentCastle = CASTLE_STAGES.find((s) => s.stage === activeLevelUp.castleStage) || CASTLE_STAGES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative max-w-lg w-full bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-2 border-amber-400/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-amber-500/30 text-center overflow-hidden">
        {/* Background glow circle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Rank Crest */}
        <div className="relative mx-auto mb-4 w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-purple-700 p-1 shadow-xl shadow-amber-500/40 animate-bounce">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex flex-col items-center justify-center">
            <Trophy className="w-10 h-10 text-amber-400" />
            <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest mt-0.5">
              LVL {activeLevelUp.newLevel}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400 mb-1 tracking-wider uppercase">
          {t('levelUpTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-amber-200/80 mb-6">
          {t('levelUpSubtitle')}
        </p>

        {/* Rewards unlocked showcase */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-left">
          <div className="p-3 bg-slate-900/90 rounded-2xl border border-amber-500/30">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-[11px] font-bold text-slate-400">{t('newRankUnlocked')}</span>
            </div>
            <p className="text-sm font-black text-purple-300">{activeLevelUp.newRank}</p>
          </div>

          <div className="p-3 bg-slate-900/90 rounded-2xl border border-amber-500/30">
            <div className="flex items-center gap-2 mb-1">
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="text-[11px] font-bold text-slate-400">{t('coinsAwarded')}</span>
            </div>
            <p className="text-sm font-black text-amber-300 font-mono">+{activeLevelUp.coinsGained} Coins</p>
          </div>

          <div className="col-span-2 p-3 bg-slate-900/90 rounded-2xl border border-amber-500/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-700 shrink-0">
              <img src={assetPath(currentCastle.image)} alt="Castle" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                <Castle className="w-3.5 h-3.5" />
                {t('castleUpgraded')}
              </span>
              <p className="text-xs font-bold text-white">
                Stage {currentCastle.stage}: {language === 'ta' ? currentCastle.nameTa : currentCastle.name}
              </p>
            </div>
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={dismissLevelUp}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black text-base shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
        >
          <Sparkles className="w-5 h-5" />
          {t('continueJourneyBtn')}
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
