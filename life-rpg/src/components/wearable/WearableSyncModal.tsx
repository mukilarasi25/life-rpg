import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { Watch, Activity, Flame, Heart, X, CheckCircle2, RefreshCw } from 'lucide-react';

interface WearableSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WearableSyncModal: React.FC<WearableSyncModalProps> = ({ isOpen, onClose }) => {
  const { wearable, syncWearableData } = useGame();
  const { t } = useLanguage();

  const [isSyncing, setIsSyncing] = useState(false);

  if (!isOpen) return null;

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      syncWearableData();
      setIsSyncing(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Watch className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Fitness Device Hub</h3>
            <p className="text-xs text-slate-400">
              Connected: <span className="text-emerald-400 font-semibold">{wearable.deviceName}</span>
            </p>
          </div>
        </div>

        {/* Real-time metrics card */}
        <div className="grid grid-cols-2 gap-3 mb-5 text-xs font-mono">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-sans flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-emerald-400" /> Daily Steps
            </span>
            <p className="text-lg font-black text-emerald-300">
              {wearable.todaySteps.toLocaleString()}
            </p>
            <span className="text-[10px] text-slate-500 font-sans">Target: 8,000</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-sans flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-rose-400" /> Avg Heart Rate
            </span>
            <p className="text-lg font-black text-rose-300">
              {wearable.todayHeartRateAvg} bpm
            </p>
            <span className="text-[10px] text-slate-500 font-sans">Resting: 65 bpm</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-sans flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-400" /> Active Burn
            </span>
            <p className="text-lg font-black text-orange-300">
              {wearable.todayCalories} kcal
            </p>
            <span className="text-[10px] text-slate-500 font-sans">Target: 500 kcal</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-sans flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-cyan-400" /> Workout Duration
            </span>
            <p className="text-lg font-black text-cyan-300">
              {wearable.workoutDurationMinutes} mins
            </p>
            <span className="text-[10px] text-slate-500 font-sans">Last synced: {wearable.lastSyncedAt}</span>
          </div>
        </div>

        {/* Action button */}
        <button
          type="button"
          onClick={handleSync}
          disabled={isSyncing}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          {isSyncing ? 'Syncing Biometrics...' : 'Sync Tracker Now'}
        </button>
      </div>
    </div>
  );
};
