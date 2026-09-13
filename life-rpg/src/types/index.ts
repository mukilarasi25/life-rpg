// Database & Domain Model Definitions for Aetheria: Realm of Ascendance

export type Gender = 'male' | 'female';
export type Language = 'en' | 'ta';

export type RankTitle = 
  | 'Beginner' 
  | 'Adventurer' 
  | 'Warrior' 
  | 'Champion' 
  | 'Master' 
  | 'Legend';

export type TaskPriority = 'low' | 'normal' | 'high' | 'critical';
export type TaskDifficulty = 'small' | 'normal' | 'important' | 'major';

export type VerificationStatus = 
  | 'none' 
  | 'pending' 
  | 'verified' 
  | 'partially_verified' 
  | 'self_reported' 
  | 'rejected';

export interface User {
  id: string;
  email: string;
  displayName: string;
  gender: Gender;
  language: Language;
  createdAt: string;
  isVerified: boolean;
}

export interface UserSettings {
  isPublicProfile: boolean;
  allowFollowers: boolean;
  showAchievements: boolean;
  showTasks: boolean;
  emailNotifications: boolean;
  browserNotifications: boolean;
  reminderTiming: '10m' | '30m' | '1h' | 'custom';
  soundEnabled: boolean;
}

export interface AvatarItem {
  id: string;
  name: string;
  nameTa: string;
  category: 'armor' | 'weapon' | 'cape' | 'accessory' | 'aura' | 'title';
  icon: string;
  levelRequired: number;
  costCoins: number;
  isUnlocked: boolean;
  isEquipped: boolean;
  description: string;
  descriptionTa: string;
}

export interface AvatarProfile {
  baseModelId: string; // m1..m4, f1..f4
  title: string;
  equippedItems: {
    armor?: string;
    weapon?: string;
    cape?: string;
    accessory?: string;
    aura?: string;
  };
}

export interface CastleStage {
  stage: number;
  minLevel: number;
  maxLevel: number;
  name: string;
  nameTa: string;
  description: string;
  descriptionTa: string;
  image: string;
  features: string[];
  featuresTa: string[];
}

export interface Category {
  id: string;
  name: string;
  nameTa: string;
  icon: string;
  color: string;
  isImportant?: boolean;
  isCustom?: boolean;
}

export interface TaskEvidence {
  id: string;
  taskId: string;
  type: 'image' | 'text' | 'document' | 'device_data';
  content: string; // base64 or description
  fileName?: string;
  submittedAt: string;
}

export interface VerificationQuestion {
  question: string;
  questionTa: string;
  answer: string;
}

export interface TaskVerification {
  id: string;
  taskId: string;
  status: VerificationStatus;
  confidenceScore: number; // 0 - 100
  questions: VerificationQuestion[];
  rationale: string;
  rationaleTa: string;
  verifiedAt?: string;
  verifiedXpEarned: number;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  categoryId: string;
  date: string; // YYYY-MM-DD
  time?: string; // HH:mm
  priority: TaskPriority;
  difficulty: TaskDifficulty;
  xpValue: number;
  coinsValue: number;
  deadline?: string;
  isRecurring?: boolean;
  recurringFrequency?: 'daily' | 'weekly' | 'custom';
  reminderBefore?: string; // 10m, 30m, 1h
  requiresVerification: boolean;
  isCompleted: boolean;
  completedAt?: string;
  completionNotes?: string;
  evidence?: TaskEvidence;
  verification?: TaskVerification;
}

export interface WeeklyGoal {
  id: string;
  title: string;
  targetCount: number;
  currentCount: number;
  categoryId: string;
  weekStartDate: string; // YYYY-MM-DD
  isCompleted: boolean;
}

export interface XPTransaction {
  id: string;
  timestamp: string;
  amount: number; // can be negative for streak penalty
  reason: string;
  reasonTa: string;
  taskId?: string;
  balanceAfter: number;
}

export interface CoinTransaction {
  id: string;
  timestamp: string;
  amount: number; // positive or negative
  reason: string;
  reasonTa: string;
  balanceAfter: number;
}

export interface Achievement {
  id: string;
  title: string;
  titleTa: string;
  description: string;
  descriptionTa: string;
  icon: string;
  category: string;
  isUnlocked: boolean;
  unlockedAt?: string;
  xpReward: number;
  coinReward: number;
}

export interface ReminderNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'task_reminder' | 'streak_alert' | 'level_up' | 'reward';
}

export interface SocialUser {
  id: string;
  displayName: string;
  avatarModelId: string;
  level: number;
  rank: RankTitle;
  currentStreak: number;
  longestStreak: number;
  totalXp: number;
  castleStage: number;
  isFollowing: boolean;
  followersCount: number;
  followingCount: number;
  strongestCategory: string;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  userId: string;
  displayName: string;
  avatarModelId: string;
  level: number;
  rankTitle: RankTitle;
  score: number; // anti-exploit weighted score
  streak: number;
  verifiedRate: number; // percentage
}

export interface WearableDevice {
  isConnected: boolean;
  deviceName: string;
  lastSyncedAt: string;
  todaySteps: number;
  todayCalories: number;
  todayHeartRateAvg: number;
  workoutDurationMinutes: number;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    type: 'create_task' | 'reschedule' | 'focus_category';
    payload: any;
  };
}
