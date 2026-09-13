import { assetPath } from '../../utils/assetPath';
import React from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { CASTLE_STAGES } from '../../utils/xpEngine';
import { Castle, Lock, CheckCircle2, Sparkles, Shield, ArrowRight } from 'lucide-react';

export const CastleView: React.FC = () => {
  const { level, castleStage, rank } = useGame();
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Castle className="w-6 h-6 text-amber-400" />
            <span>{t('castleTitle')}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Your physical and intellectual progress manifests directly as your majestic stronghold.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Active: Stage {castleStage} of 6</span>
        </div>
      </div>

      {/* Evolution Stages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CASTLE_STAGES.map((stage) => {
          const isUnlocked = level >= stage.minLevel;
          const isCurrent = castleStage === stage.stage;

          return (
            <div
              key={stage.stage}
              className={`rounded-2xl border overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                isCurrent
                  ? 'bg-slate-900 border-amber-400 shadow-xl shadow-amber-500/20 ring-1 ring-amber-400/50'
                  : isUnlocked
                  ? 'bg-slate-950/80 border-slate-700/80'
                  : 'bg-slate-950/40 border-slate-800/40 opacity-60'
              }`}
            >
              {/* Castle Image Preview */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={assetPath(stage.image)}
                  alt={stage.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isUnlocked ? 'group-hover:scale-105' : 'grayscale brightness-50'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  {isCurrent ? (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 shadow-md">
                      Current Base
                    </span>
                  ) : isUnlocked ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/80 text-slate-400 border border-slate-700 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Unlocks at Level {stage.minLevel}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 left-3 right-3">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                    Stage {stage.stage} • Level {stage.minLevel}{stage.maxLevel ? `–${stage.maxLevel}` : '+'}
                  </span>
                  <h3 className="text-base font-bold text-white truncate">
                    {language === 'ta' ? stage.nameTa : stage.name}
                  </h3>
                </div>
              </div>

              {/* Body details & Features */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {language === 'ta' ? stage.descriptionTa : stage.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Citadel Upgrades:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(language === 'ta' ? stage.featuresTa : stage.features).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        ✓ {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
