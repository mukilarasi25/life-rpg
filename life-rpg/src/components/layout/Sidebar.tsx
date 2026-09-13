import React from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  LayoutDashboard, CheckSquare, CalendarDays, Castle, 
  UserCircle, ShoppingBag, Trophy, Users, BarChart3, 
  Settings, Bot, Sparkles, Watch, Calendar
} from 'lucide-react';
import { CASTLE_STAGES } from '../../utils/xpEngine';
import { assetPath } from '../../utils/assetPath';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenAI: () => void;
  onOpenWearable: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentTab, 
  setCurrentTab,
  onOpenAI,
  onOpenWearable
}) => {
  const { level, rank, castleStage, wearable } = useGame();
  const { t, language } = useLanguage();

  const currentCastle = CASTLE_STAGES.find((s) => s.stage === castleStage) || CASTLE_STAGES[0];

  const navItems = [
    { id: 'dashboard', label: t('navDashboard'), icon: LayoutDashboard },
    { id: 'tasks', label: t('navDailyTasks'), icon: CheckSquare },
    { id: 'planner', label: t('navPlanner'), icon: CalendarDays },
    { id: 'calendar', label: t('navCalendar'), icon: Calendar },
    { id: 'castle', label: t('navCastle'), icon: Castle },
    { id: 'wardrobe', label: t('navWardrobe'), icon: UserCircle },
    { id: 'shop', label: t('navShop'), icon: ShoppingBag },
    { id: 'leaderboard', label: t('navLeaderboard'), icon: Trophy },
    { id: 'social', label: t('navSocial'), icon: Users },
    { id: 'analytics', label: t('navAnalytics'), icon: BarChart3 },
    { id: 'settings', label: t('navSettings'), icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-950/80 border-r border-slate-800/80 h-[calc(100vh-57px)] sticky top-[57px] p-4 justify-between select-none">
      {/* Upper Navigation Links */}
      <div className="space-y-1">
        {/* Citadel Preview Banner */}
        <div 
          onClick={() => setCurrentTab('castle')}
          className="group relative mb-4 rounded-xl overflow-hidden border border-amber-500/30 cursor-pointer shadow-lg hover:border-amber-400/60 transition-all"
        >
          <img 
            src={assetPath(currentCastle.image)} 
            alt={currentCastle.name} 
            className="w-full h-20 object-cover group-hover:scale-105 transition-transform duration-500 brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-2 flex flex-col justify-end">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
              <Castle className="w-3 h-3" />
              Stage {currentCastle.stage}: {language === 'ta' ? currentCastle.nameTa : currentCastle.name}
            </span>
            <span className="text-[11px] text-slate-300 font-medium">
              {t('rank')}: {rank.rank}
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/20 to-purple-500/10 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Shortcuts: AI Sage & Wearable Tracker */}
      <div className="pt-4 border-t border-slate-800/80 space-y-2">
        {/* Fitness Tracker Sync Pill */}
        <button
          onClick={onOpenWearable}
          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all text-left group"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Watch className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-300 group-hover:text-emerald-300">
                {wearable.deviceName}
              </p>
              <p className="text-[10px] text-emerald-400 font-mono">
                {wearable.todaySteps.toLocaleString()} steps logged
              </p>
            </div>
          </div>
        </button>

        {/* Floating Sage AI Advisor */}
        <button
          onClick={onOpenAI}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-600 hover:from-purple-500 hover:to-amber-500 text-white font-bold text-xs shadow-lg shadow-purple-900/30 transition-all"
        >
          <Bot className="w-4 h-4" />
          <span>{t('aiAssistantTitle').split('—')[0]}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
        </button>
      </div>
    </aside>
  );
};
