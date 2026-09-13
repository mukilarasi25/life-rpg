import React from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Settings, Shield, Bell, Volume2, Globe, 
  RotateCcw, AlertTriangle, CheckCircle2 
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { 
    settings, updateSettings, user, updateUser, 
    simulateMissedDay, setIsOnboarded, missedDays 
  } = useGame();
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-slate-400" />
          <span>Realm Settings & Preferences</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure profile privacy, audio cues, reminders, and language.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Profile Privacy */}
        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Shield className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Profile Privacy & Visibility</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-200 block">Public RPG Profile</span>
                <span className="text-[11px] text-slate-400">Allow other adventurers to view your castle & rank</span>
              </div>
              <input
                type="checkbox"
                checked={settings.isPublicProfile}
                onChange={(e) => updateSettings({ isPublicProfile: e.target.checked })}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-200 block">Allow Followers</span>
                <span className="text-[11px] text-slate-400">Let community adventurers follow your progress</span>
              </div>
              <input
                type="checkbox"
                checked={settings.allowFollowers}
                onChange={(e) => updateSettings({ allowFollowers: e.target.checked })}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-200 block">Public Achievements</span>
                <span className="text-[11px] text-slate-400">Showcase unlocked badges on public card</span>
              </div>
              <input
                type="checkbox"
                checked={settings.showAchievements}
                onChange={(e) => updateSettings({ showAchievements: e.target.checked })}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Audio & Notifications */}
        <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Bell className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Reminders & Sound Effects</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-200 block">RPG Procedural SFX</span>
                <span className="text-[11px] text-slate-400">Level-up fanfares, coin chimes & task bells</span>
              </div>
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => updateSettings({ soundEnabled: e.target.checked })}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-200 block">Email Reminders</span>
                <span className="text-[11px] text-slate-400">Send reminder scroll for upcoming quests</span>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => updateSettings({ emailNotifications: e.target.checked })}
                className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-200 block">Language / மொழி</span>
                <span className="text-[11px] text-slate-400">Active realm interface tongue</span>
              </div>
              <button
                type="button"
                onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
                className="px-3 py-1 rounded-lg bg-slate-800 text-amber-400 font-bold text-xs border border-slate-700"
              >
                {language === 'en' ? 'English (Switch to தமிழ்)' : 'தமிழ் (Switch to EN)'}
              </button>
            </div>
          </div>
        </div>

        {/* Developer / Demo Simulator Tools */}
        <div className="col-span-1 md:col-span-2 p-5 bg-slate-900/90 rounded-2xl border border-amber-500/30 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Rule & Simulation Controls</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-rose-300 block">
                Simulate Missed Streak Day (Test Rule #20)
              </span>
              <p className="text-[11px] text-slate-400">
                Clicking simulates 1 missed day. If 3 consecutive days are missed, current level XP progress resets to 0 (user level preserved).
              </p>
              <button
                type="button"
                onClick={simulateMissedDay}
                className="px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-500/50 text-rose-300 font-bold"
              >
                +1 Missed Day (Current: {missedDays}/3)
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-cyan-300 block">
                Replay Onboarding Flow
              </span>
              <p className="text-[11px] text-slate-400">
                Re-opens the 7-step wizard (Sign Up, Gender, Avatar, Language, Categories, Castle, Codex of Rules).
              </p>
              <button
                type="button"
                onClick={() => setIsOnboarded(false)}
                className="px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/50 text-cyan-300 font-bold flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Launch 7-Step Onboarding
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
