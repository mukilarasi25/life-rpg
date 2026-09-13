import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { LayoutDashboard, CheckSquare, CalendarDays, Castle, UserCircle, Bot } from 'lucide-react';

interface MobileNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenAI: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ currentTab, setCurrentTab, onOpenAI }) => {
  const { t } = useLanguage();

  const items = [
    { id: 'dashboard', label: t('navDashboard'), icon: LayoutDashboard },
    { id: 'tasks', label: t('navDailyTasks'), icon: CheckSquare },
    { id: 'planner', label: t('navPlanner'), icon: CalendarDays },
    { id: 'castle', label: t('navCastle'), icon: Castle },
    { id: 'wardrobe', label: t('navWardrobe'), icon: UserCircle },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 flex items-center justify-around shadow-2xl">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setCurrentTab(item.id)}
            className={`flex flex-col items-center justify-center p-1.5 rounded-lg transition-colors ${
              isActive ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] leading-tight">{item.label.split(' ')[0]}</span>
          </button>
        );
      })}
      
      {/* Quick AI Sage Button */}
      <button
        onClick={onOpenAI}
        className="flex flex-col items-center justify-center p-1.5 rounded-lg text-purple-400 hover:text-purple-300"
      >
        <Bot className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] leading-tight">Sage AI</span>
      </button>
    </nav>
  );
};
