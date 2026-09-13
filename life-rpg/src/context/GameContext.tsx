import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, UserSettings, AvatarProfile, Category, Task, TaskVerification,
  WeeklyGoal, XPTransaction, CoinTransaction, Achievement,
  ReminderNotification, SocialUser, WearableDevice, AIMessage
} from '../types';
import { 
  INITIAL_CATEGORIES, INITIAL_AVATAR_ITEMS, INITIAL_ACHIEVEMENTS,
  INITIAL_TASKS, INITIAL_WEEKLY_GOALS, MOCK_COMMUNITY_USERS, AVATAR_MODELS
} from '../data/initialSeed';
import { getRankForLevel, getTargetXpForLevel, getCastleStageForLevel } from '../utils/xpEngine';
import { soundManager } from '../utils/sound';
import confetti from 'canvas-confetti';

interface LevelUpInfo {
  newLevel: number;
  newRank: string;
  coinsGained: number;
  unlockedItemName?: string;
  castleStage: number;
}

interface GameContextType {
  // Onboarding & Auth
  isOnboarded: boolean;
  setIsOnboarded: (val: boolean) => void;
  user: User;
  updateUser: (fields: Partial<User>) => void;
  settings: UserSettings;
  updateSettings: (fields: Partial<UserSettings>) => void;
  
  // Avatar & Wardrobe
  avatar: AvatarProfile;
  updateAvatar: (fields: Partial<AvatarProfile>) => void;
  avatarItems: typeof INITIAL_AVATAR_ITEMS;
  equipItem: (itemId: string) => void;
  purchaseItem: (itemId: string) => boolean;

  // Categories
  categories: Category[];
  addCategory: (cat: Omit<Category, 'id'>) => void;
  removeCategory: (id: string) => void;
  toggleImportantCategory: (id: string) => void;
  reorderCategories: (newCats: Category[]) => void;

  // Progression & Economy
  level: number;
  currentLevelXp: number;
  targetXp: number;
  totalXp: number;
  rank: ReturnType<typeof getRankForLevel>;
  castleStage: number;
  coins: number;
  
  // Streaks
  currentStreak: number;
  longestStreak: number;
  missedDays: number;
  recoverStreak: () => boolean;
  simulateMissedDay: () => void; // for testing streak failure rule

  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'isCompleted'>) => void;
  deleteTask: (taskId: string) => void;
  completeTaskWithoutVerification: (taskId: string) => void;
  completeTaskWithVerification: (taskId: string, verification: TaskVerification) => void;

  // Daily Quests Metrics
  todayTasks: Task[];
  todayCompletedTasks: Task[];
  todayXpEarned: number;
  todayCompletionPercentage: number;
  isDailyRewardAvailable: boolean;
  hasClaimedDailyRewardToday: boolean;
  claimDailyMysteryReward: () => { type: string; value: string; coinsAdded: number };

  // Weekly Goals
  weeklyGoals: WeeklyGoal[];
  addWeeklyGoal: (goal: Omit<WeeklyGoal, 'id' | 'isCompleted'>) => void;
  incrementWeeklyGoal: (goalId: string) => void;
  breakWeeklyGoalIntoDaily: (goalId: string) => void;

  // Celebrations & Notifications
  activeLevelUp: LevelUpInfo | null;
  dismissLevelUp: () => void;
  notifications: ReminderNotification[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Ledgers
  xpTransactions: XPTransaction[];
  coinTransactions: CoinTransaction[];
  achievements: Achievement[];

  // Social & Community
  communityUsers: SocialUser[];
  toggleFollowUser: (userId: string) => void;

  // Wearable Device Simulator
  wearable: WearableDevice;
  syncWearableData: () => WearableDevice;

  // AI Assistant Chat
  aiMessages: AIMessage[];
  sendAIMessage: (text: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from LocalStorage or seed defaults
  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    return localStorage.getItem('aetheria_onboarded') === 'true';
  });

  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('aetheria_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr_default',
      email: 'hero@aetheria.realm',
      displayName: 'Kaelen Sunstrider',
      gender: 'male',
      language: 'en',
      createdAt: '2026-09-01',
      isVerified: true,
    };
  });

  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('aetheria_settings');
    return saved ? JSON.parse(saved) : {
      isPublicProfile: true,
      allowFollowers: true,
      showAchievements: true,
      showTasks: true,
      emailNotifications: true,
      browserNotifications: true,
      reminderTiming: '30m',
      soundEnabled: true,
    };
  });

  const [avatar, setAvatar] = useState<AvatarProfile>(() => {
    const saved = localStorage.getItem('aetheria_avatar');
    return saved ? JSON.parse(saved) : {
      baseModelId: 'm1',
      title: 'The Determined',
      equippedItems: {
        armor: 'armor_novice',
        weapon: 'weapon_apprentice',
      },
    };
  });

  const [avatarItems, setAvatarItems] = useState<typeof INITIAL_AVATAR_ITEMS>(() => {
    const saved = localStorage.getItem('aetheria_items');
    return saved ? JSON.parse(saved) : INITIAL_AVATAR_ITEMS;
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('aetheria_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  // Progression
  const [level, setLevel] = useState<number>(() => {
    const saved = localStorage.getItem('aetheria_level');
    return saved ? parseInt(saved, 10) : 3;
  });

  const [currentLevelXp, setCurrentLevelXp] = useState<number>(() => {
    const saved = localStorage.getItem('aetheria_current_xp');
    return saved ? parseInt(saved, 10) : 15;
  });

  const [totalXp, setTotalXp] = useState<number>(() => {
    const saved = localStorage.getItem('aetheria_total_xp');
    return saved ? parseInt(saved, 10) : 65;
  });

  const [coins, setCoins] = useState<number>(() => {
    const saved = localStorage.getItem('aetheria_coins');
    return saved ? parseInt(saved, 10) : 1450;
  });

  // Streak
  const [currentStreak, setCurrentStreak] = useState<number>(() => {
    const saved = localStorage.getItem('aetheria_streak');
    return saved ? parseInt(saved, 10) : 6;
  });

  const [longestStreak, setLongestStreak] = useState<number>(() => {
    const saved = localStorage.getItem('aetheria_longest_streak');
    return saved ? parseInt(saved, 10) : 12;
  });

  const [missedDays, setMissedDays] = useState<number>(() => {
    const saved = localStorage.getItem('aetheria_missed_days');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [hasClaimedDailyRewardToday, setHasClaimedDailyRewardToday] = useState<boolean>(false);
  const [activeLevelUp, setActiveLevelUp] = useState<LevelUpInfo | null>(null);

  // Tasks
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('aetheria_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [weeklyGoals, setWeeklyGoals] = useState<WeeklyGoal[]>(() => {
    const saved = localStorage.getItem('aetheria_weekly_goals');
    return saved ? JSON.parse(saved) : INITIAL_WEEKLY_GOALS;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('aetheria_achievements');
    return saved ? JSON.parse(saved) : INITIAL_ACHIEVEMENTS;
  });

  const [communityUsers, setCommunityUsers] = useState<SocialUser[]>(() => {
    const saved = localStorage.getItem('aetheria_community');
    return saved ? JSON.parse(saved) : MOCK_COMMUNITY_USERS;
  });

  const [xpTransactions, setXpTransactions] = useState<XPTransaction[]>([
    {
      id: 'tx_init_1',
      timestamp: '2026-09-12 14:15',
      amount: 1,
      reason: 'Completed: Drink 2 Liters Water & Mindfulness',
      reasonTa: 'நிறைவு: 2 லிட்டர் தண்ணீர் & மன அமைதி',
      balanceAfter: 65,
    },
  ]);

  const [coinTransactions, setCoinTransactions] = useState<CoinTransaction[]>([
    {
      id: 'ctx_init_1',
      timestamp: '2026-09-12 14:15',
      amount: 10,
      reason: 'Task Bounty: Drink 2 Liters Water',
      reasonTa: 'பணி வெகுமதி: 2 லிட்டர் தண்ணீர்',
      balanceAfter: 1450,
    },
  ]);

  const [notifications, setNotifications] = useState<ReminderNotification[]>([
    {
      id: 'notif_1',
      title: 'Quest Reminder: C++ Algorithm',
      message: 'Your high-priority quest starts in 30 minutes!',
      timestamp: '17:30',
      isRead: false,
      type: 'task_reminder',
    },
    {
      id: 'notif_2',
      title: 'Streak Blaze Active',
      message: 'You are on a 6-day streak! Keep the flame burning!',
      timestamp: '09:00',
      isRead: false,
      type: 'streak_alert',
    },
  ]);

  const [wearable, setWearable] = useState<WearableDevice>({
    isConnected: true,
    deviceName: 'Garmin Aetheria Venu 3',
    lastSyncedAt: 'Just now',
    todaySteps: 6420,
    todayCalories: 480,
    todayHeartRateAvg: 72,
    workoutDurationMinutes: 35,
  });

  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: "Greetings, Champion! I am Sage Aethelgard. I have analyzed your schedule: your 'C++ Algorithm' and 'Operating Systems' quests are your highest XP earners today. What would you like to plan first?",
      timestamp: '14:00',
    },
  ]);

  // Sync with sound manager setting
  useEffect(() => {
    soundManager.enabled = settings.soundEnabled;
  }, [settings.soundEnabled]);

  // Persistent storage sync
  useEffect(() => {
    localStorage.setItem('aetheria_onboarded', String(isOnboarded));
  }, [isOnboarded]);

  useEffect(() => {
    localStorage.setItem('aetheria_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('aetheria_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('aetheria_avatar', JSON.stringify(avatar));
  }, [avatar]);

  useEffect(() => {
    localStorage.setItem('aetheria_items', JSON.stringify(avatarItems));
  }, [avatarItems]);

  useEffect(() => {
    localStorage.setItem('aetheria_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('aetheria_level', String(level));
    localStorage.setItem('aetheria_current_xp', String(currentLevelXp));
    localStorage.setItem('aetheria_total_xp', String(totalXp));
    localStorage.setItem('aetheria_coins', String(coins));
    localStorage.setItem('aetheria_streak', String(currentStreak));
    localStorage.setItem('aetheria_longest_streak', String(longestStreak));
    localStorage.setItem('aetheria_missed_days', String(missedDays));
  }, [level, currentLevelXp, totalXp, coins, currentStreak, longestStreak, missedDays]);

  useEffect(() => {
    localStorage.setItem('aetheria_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const targetXp = getTargetXpForLevel(level);
  const rank = getRankForLevel(level);
  const castleStage = getCastleStageForLevel(level);

  // Today's task metrics
  const todayStr = '2026-09-12';
  const todayTasks = tasks.filter((t) => t.date === todayStr);
  const todayCompletedTasks = todayTasks.filter((t) => t.isCompleted);
  const todayXpEarned = todayCompletedTasks.reduce((acc, t) => acc + (t.verification?.verifiedXpEarned ?? t.xpValue), 0);
  const todayCompletionPercentage = todayTasks.length > 0 
    ? Math.round((todayCompletedTasks.length / todayTasks.length) * 100) 
    : 0;

  const isDailyRewardAvailable = todayTasks.length > 0 && todayCompletedTasks.length === todayTasks.length;

  // Add XP with level up calculations
  const addXpAndCoins = (amountXp: number, amountCoins: number, reason: string, reasonTa: string, taskId?: string) => {
    soundManager.playTaskComplete();
    if (amountCoins > 0) {
      setTimeout(() => soundManager.playCoinGain(), 350);
    }

    let newCurrentXp = currentLevelXp + amountXp;
    let newLevel = level;
    let newTotalXp = totalXp + amountXp;
    let newCoins = coins + amountCoins;

    // Log XP transaction
    const xpTx: XPTransaction = {
      id: `xp_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      amount: amountXp,
      reason,
      reasonTa,
      taskId,
      balanceAfter: newTotalXp,
    };
    setXpTransactions((prev) => [xpTx, ...prev]);

    // Log Coin transaction
    if (amountCoins > 0) {
      const coinTx: CoinTransaction = {
        id: `coin_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        amount: amountCoins,
        reason,
        reasonTa,
        balanceAfter: newCoins,
      };
      setCoinTransactions((prev) => [coinTx, ...prev]);
    }

    // Check for level ups
    let neededXp = getTargetXpForLevel(newLevel);
    let didLevelUp = false;

    while (newCurrentXp >= neededXp) {
      newCurrentXp -= neededXp;
      newLevel += 1;
      neededXp = getTargetXpForLevel(newLevel);
      didLevelUp = true;
    }

    if (didLevelUp) {
      const bonusCoins = newLevel * 50;
      newCoins += bonusCoins;
      const newRankObj = getRankForLevel(newLevel);
      const newStage = getCastleStageForLevel(newLevel);

      soundManager.playLevelUp();
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#8B5CF6', '#06B6D4', '#10B981'],
      });

      setActiveLevelUp({
        newLevel,
        newRank: newRankObj.rank,
        coinsGained: bonusCoins,
        castleStage: newStage,
        unlockedItemName: newLevel % 5 === 0 ? 'Legendary Armor piece' : undefined,
      });

      // Also unlock appropriate level items in wardrobe
      setAvatarItems((prev) =>
        prev.map((item) => (item.levelRequired <= newLevel ? { ...item, isUnlocked: true } : item))
      );
    }

    setLevel(newLevel);
    setCurrentLevelXp(newCurrentXp);
    setTotalXp(newTotalXp);
    setCoins(newCoins);
  };

  const completeTaskWithoutVerification = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.isCompleted) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              isCompleted: true,
              completedAt: new Date().toISOString(),
              verification: {
                id: `v_${Date.now()}`,
                taskId,
                status: 'verified',
                confidenceScore: 100,
                questions: [],
                rationale: 'Self-completed without special verification required.',
                rationaleTa: 'சரிபார்ப்பு தேவையின்றி நேரடியாக முடிக்கப்பட்டது.',
                verifiedXpEarned: t.xpValue,
              },
            }
          : t
      )
    );

    addXpAndCoins(
      task.xpValue,
      task.coinsValue,
      `Completed Quest: ${task.title}`,
      `பணி முடிந்தது: ${task.title}`,
      taskId
    );
  };

  const completeTaskWithVerification = (taskId: string, verification: TaskVerification) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.isCompleted) return;

    const awardedXp = verification.verifiedXpEarned;
    const awardedCoins = Math.round(task.coinsValue * (verification.confidenceScore / 100));

    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              isCompleted: true,
              completedAt: new Date().toISOString(),
              verification,
            }
          : t
      )
    );

    addXpAndCoins(
      awardedXp,
      awardedCoins,
      `Verified [${verification.status}]: ${task.title}`,
      `சரிபார்க்கப்பட்டது: ${task.title}`,
      taskId
    );
  };

  const addTask = (newTask: Omit<Task, 'id' | 'isCompleted'>) => {
    const task: Task = {
      ...newTask,
      id: `task_${Date.now()}`,
      isCompleted: false,
    };
    setTasks((prev) => [task, ...prev]);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Streak Recovery (Rule #21: Cost 1000 coins)
  const recoverStreak = (): boolean => {
    if (coins < 1000 || missedDays === 0) return false;
    soundManager.playCoinGain();
    const newCoins = coins - 1000;
    setCoins(newCoins);
    setMissedDays(0);
    setCurrentStreak((prev) => prev + 1);

    const tx: CoinTransaction = {
      id: `ctx_recov_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      amount: -1000,
      reason: 'Streak Recovery (1 missed day restored)',
      reasonTa: 'தொடர்ச்சி மீட்பு (1 தவறிய நாள் மீட்கப்பட்டது)',
      balanceAfter: newCoins,
    };
    setCoinTransactions((prev) => [tx, ...prev]);
    return true;
  };

  // Simulate missed day to test Streak Failure Rule #20
  const simulateMissedDay = () => {
    const nextMissed = missedDays + 1;
    soundManager.playStreakAlert();

    if (nextMissed >= 3) {
      // RULE #20: 3 consecutive days resets CURRENT LEVEL accumulated XP to 0!
      // Does NOT reset overall level or completed levels!
      setCurrentLevelXp(0);
      setMissedDays(3);
      setCurrentStreak(0);

      const penaltyTx: XPTransaction = {
        id: `xp_penalty_${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        amount: -currentLevelXp,
        reason: 'Streak Penalty: 3 consecutive days missed. Current level XP reset to 0.',
        reasonTa: 'தொடர்ச்சி அபராதம்: 3 நாட்கள் தவறவிட்டதால் தற்போதைய நிலை XP பூஜ்ஜியமானது.',
        balanceAfter: totalXp - currentLevelXp,
      };
      setXpTransactions((prev) => [penaltyTx, ...prev]);
      setTotalXp((prev) => Math.max(0, prev - currentLevelXp));
    } else {
      setMissedDays(nextMissed);
    }
  };

  // Mystery Daily Gift
  const claimDailyMysteryReward = () => {
    soundManager.playChestOpen();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#F59E0B', '#10B981', '#EAB308'],
    });

    const rewardOptions = [
      { type: 'Gold Hoard', value: '+150 Coins', coins: 150 },
      { type: 'Ascendant Blessing', value: '+250 Coins & Title', coins: 250 },
      { type: 'Citadel Treasury', value: '+100 Coins', coins: 100 },
      { type: 'Streak Flame Boost', value: '+200 Coins & Streak Shield', coins: 200 },
    ];
    const picked = rewardOptions[Math.floor(Math.random() * rewardOptions.length)];

    setCoins((prev) => prev + picked.coins);
    setHasClaimedDailyRewardToday(true);

    const coinTx: CoinTransaction = {
      id: `ctx_myst_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      amount: picked.coins,
      reason: `Daily Mystery Chest: ${picked.type}`,
      reasonTa: `தினசரி ரகசிய பெட்டி: ${picked.type}`,
      balanceAfter: coins + picked.coins,
    };
    setCoinTransactions((prev) => [coinTx, ...prev]);

    return { type: picked.type, value: picked.value, coinsAdded: picked.coins };
  };

  // Wardrobe actions
  const equipItem = (itemId: string) => {
    const item = avatarItems.find((i) => i.id === itemId);
    if (!item || !item.isUnlocked) return;

    soundManager.playTaskComplete();
    setAvatar((prev) => ({
      ...prev,
      equippedItems: {
        ...prev.equippedItems,
        [item.category]: item.id,
      },
    }));

    setAvatarItems((prev) =>
      prev.map((i) =>
        i.category === item.category ? { ...i, isEquipped: i.id === itemId } : i
      )
    );
  };

  const purchaseItem = (itemId: string): boolean => {
    const item = avatarItems.find((i) => i.id === itemId);
    if (!item || item.isUnlocked || coins < item.costCoins) return false;

    soundManager.playCoinGain();
    const newCoins = coins - item.costCoins;
    setCoins(newCoins);

    setAvatarItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, isUnlocked: true } : i))
    );

    const coinTx: CoinTransaction = {
      id: `ctx_item_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      amount: -item.costCoins,
      reason: `Purchased Armory Gear: ${item.name}`,
      reasonTa: `ஆயுதம் வாங்கப்பட்டது: ${item.name}`,
      balanceAfter: newCoins,
    };
    setCoinTransactions((prev) => [coinTx, ...prev]);
    return true;
  };

  // Categories
  const addCategory = (cat: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...cat,
      id: `cat_${Date.now()}`,
      isCustom: true,
    };
    setCategories((prev) => [...prev, newCat]);
  };

  const removeCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleImportantCategory = (id: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isImportant: !c.isImportant } : c))
    );
  };

  const reorderCategories = (newCats: Category[]) => {
    setCategories(newCats);
  };

  // Weekly Goals
  const addWeeklyGoal = (goal: Omit<WeeklyGoal, 'id' | 'isCompleted'>) => {
    const newGoal: WeeklyGoal = {
      ...goal,
      id: `wg_${Date.now()}`,
      isCompleted: goal.currentCount >= goal.targetCount,
    };
    setWeeklyGoals((prev) => [newGoal, ...prev]);
  };

  const incrementWeeklyGoal = (goalId: string) => {
    setWeeklyGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          const next = g.currentCount + 1;
          const completed = next >= g.targetCount;
          if (completed && !g.isCompleted) {
            addXpAndCoins(30, 150, `Weekly Campaign Victor: ${g.title}`, `வாராந்திர இலக்கு முடிந்தது: ${g.title}`);
          }
          return { ...g, currentCount: next, isCompleted: completed };
        }
        return g;
      })
    );
  };

  const breakWeeklyGoalIntoDaily = (goalId: string) => {
    const goal = weeklyGoals.find((g) => g.id === goalId);
    if (!goal) return;

    addTask({
      title: `Daily Milestone: ${goal.title}`,
      description: `Daily step towards weekly campaign goal (${goal.currentCount}/${goal.targetCount}).`,
      categoryId: goal.categoryId,
      date: todayStr,
      priority: 'high',
      difficulty: 'important',
      xpValue: 5,
      coinsValue: 25,
      requiresVerification: true,
    });
  };

  // Social
  const toggleFollowUser = (userId: string) => {
    setCommunityUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextFollowing = !u.isFollowing;
          return {
            ...u,
            isFollowing: nextFollowing,
            followersCount: nextFollowing ? u.followersCount + 1 : u.followersCount - 1,
          };
        }
        return u;
      })
    );
  };

  // Wearable
  const syncWearableData = () => {
    const updated: WearableDevice = {
      ...wearable,
      isConnected: true,
      lastSyncedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      todaySteps: wearable.todaySteps + Math.floor(Math.random() * 800 + 400),
      todayCalories: wearable.todayCalories + Math.floor(Math.random() * 60 + 20),
      todayHeartRateAvg: Math.floor(Math.random() * 8 + 68),
      workoutDurationMinutes: wearable.workoutDurationMinutes + 15,
    };
    setWearable(updated);
    soundManager.playTaskComplete();
    return updated;
  };

  // AI Assistant
  const sendAIMessage = (text: string) => {
    const userMsg: AIMessage = {
      id: `ai_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAiMessages((prev) => [...prev, userMsg]);

    // Intelligent context-aware AI advice response
    setTimeout(() => {
      let reply = "Sage's Counsel: Keep your momentum strong. High-priority tasks carry the greatest XP rewards!";
      const lower = text.toLowerCase();

      if (lower.includes('exam') || lower.includes('study') || lower.includes('assignment')) {
        reply = "Sage's Advice: Academic challenges reward deep discipline. I suggest a 45-minute focused study block with phone silenced, followed by submitting your notes for full 100% XP verification!";
      } else if (lower.includes('tired') || lower.includes('lazy') || lower.includes('procrastinat')) {
        reply = "Sage's Wisdom: Remember Rule #20: 3 missed days resets your current level XP! Even completing one Small (+1 XP) quest like hydration or a 5-minute walk keeps your 6-day streak flame blazing!";
      } else if (lower.includes('code') || lower.includes('programming') || lower.includes('c++')) {
        reply = "Sage's Code Insight: Break complex algorithms into 3 steps: (1) Outline input/output constraints, (2) Implement brute force, (3) Optimize. You can attach code output in the verification dialog for full rewards!";
      } else if (lower.includes('plan') || lower.includes('priorit')) {
        reply = `Sage's Analysis: You have completed ${todayCompletedTasks.length} out of ${todayTasks.length} quests today. Prioritize the '${tasks.find((t) => !t.isCompleted && t.priority === 'high')?.title || 'urgent'}' quest next to claim today's Mystery Chest!`;
      }

      const aiReply: AIMessage = {
        id: `ai_reply_${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setAiMessages((prev) => [...prev, aiReply]);
    }, 600);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const dismissLevelUp = () => {
    setActiveLevelUp(null);
  };

  const updateUser = (fields: Partial<User>) => setUser((p) => ({ ...p, ...fields }));
  const updateSettings = (fields: Partial<UserSettings>) => setSettings((p) => ({ ...p, ...fields }));
  const updateAvatar = (fields: Partial<AvatarProfile>) => setAvatar((p) => ({ ...p, ...fields }));

  return (
    <GameContext.Provider
      value={{
        isOnboarded,
        setIsOnboarded,
        user,
        updateUser,
        settings,
        updateSettings,
        avatar,
        updateAvatar,
        avatarItems,
        equipItem,
        purchaseItem,
        categories,
        addCategory,
        removeCategory,
        toggleImportantCategory,
        reorderCategories,
        level,
        currentLevelXp,
        targetXp,
        totalXp,
        rank,
        castleStage,
        coins,
        currentStreak,
        longestStreak,
        missedDays,
        recoverStreak,
        simulateMissedDay,
        tasks,
        addTask,
        deleteTask,
        completeTaskWithoutVerification,
        completeTaskWithVerification,
        todayTasks,
        todayCompletedTasks,
        todayXpEarned,
        todayCompletionPercentage,
        isDailyRewardAvailable,
        hasClaimedDailyRewardToday,
        claimDailyMysteryReward,
        weeklyGoals,
        addWeeklyGoal,
        incrementWeeklyGoal,
        breakWeeklyGoalIntoDaily,
        activeLevelUp,
        dismissLevelUp,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
        xpTransactions,
        coinTransactions,
        achievements,
        communityUsers,
        toggleFollowUser,
        wearable,
        syncWearableData,
        aiMessages,
        sendAIMessage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
