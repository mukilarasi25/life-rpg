import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { TopHeader } from './components/layout/TopHeader';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { DashboardView } from './components/dashboard/DashboardView';
import { TaskList } from './components/tasks/TaskList';
import { WeeklyPlannerView } from './components/planner/WeeklyPlannerView';
import { CalendarView } from './components/calendar/CalendarView';
import { CastleView } from './components/castle/CastleView';
import { WardrobeView } from './components/avatar/WardrobeView';
import { ProfileView } from './components/social/ProfileView';
import { LeaderboardView } from './components/social/LeaderboardView';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { SettingsView } from './components/settings/SettingsView';
import { LevelUpModal } from './components/levelup/LevelUpModal';
import { AIAssistantDrawer } from './components/ai/AIAssistantDrawer';
import { NotificationCenter } from './components/layout/NotificationCenter';
import { WearableSyncModal } from './components/wearable/WearableSyncModal';

const AppContent: React.FC = () => {
  const { isOnboarded } = useGame();
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [isWearableOpen, setIsWearableOpen] = useState<boolean>(false);

  // If user hasn't completed onboarding, render 7-step onboarding wizard
  if (!isOnboarded) {
    return <OnboardingWizard />;
  }

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col antialiased selection:bg-amber-500 selection:text-slate-950">
      {/* Fixed Top Bar */}
      <TopHeader
        onOpenAI={() => setIsAIOpen(true)}
        onOpenNotifications={() => setIsNotifOpen(true)}
        onOpenWearable={() => setIsWearableOpen(true)}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Left Sidebar Navigation */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          onOpenAI={() => setIsAIOpen(true)}
          onOpenWearable={() => setIsWearableOpen(true)}
        />

        {/* Tab Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto pb-20 lg:pb-10">
          {currentTab === 'dashboard' && <DashboardView onNavigate={setCurrentTab} />}
          {currentTab === 'tasks' && <TaskList />}
          {currentTab === 'planner' && <WeeklyPlannerView />}
          {currentTab === 'calendar' && <CalendarView />}
          {currentTab === 'castle' && <CastleView />}
          {currentTab === 'wardrobe' && <WardrobeView />}
          {currentTab === 'shop' && <WardrobeView />}
          {currentTab === 'leaderboard' && <LeaderboardView />}
          {currentTab === 'social' && <ProfileView />}
          {currentTab === 'profile' && <ProfileView />}
          {currentTab === 'analytics' && <AnalyticsDashboard />}
          {currentTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenAI={() => setIsAIOpen(true)}
      />

      {/* Global Modals & Drawers */}
      <LevelUpModal />
      <AIAssistantDrawer isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
      <WearableSyncModal isOpen={isWearableOpen} onClose={() => setIsWearableOpen(false)} />
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </LanguageProvider>
  );
}

export default App;