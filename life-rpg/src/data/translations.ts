// Bilingual Internationalization (i18n) Engine for English and Tamil (தமிழ்)
import { Language } from '../types';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // App branding
    appName: 'Aetheria',
    appTagline: 'Realm of Real-World Ascendance',
    
    // Navigation
    navDashboard: 'Dashboard',
    navDailyTasks: 'Daily Tasks',
    navPlanner: 'Weekly Planner',
    navCalendar: 'Calendar',
    navCastle: 'Castle Citadel',
    navWardrobe: 'Avatar Wardrobe',
    navShop: 'Rewards Shop',
    navLeaderboard: 'Hall of Legends',
    navSocial: 'Fellow Adventurers',
    navAnalytics: 'Scroll of Wisdom',
    navSettings: 'Settings',

    // Header stats
    level: 'Level',
    rank: 'Rank',
    xp: 'XP',
    coins: 'Coins',
    streak: 'Streak',
    days: 'Days',
    longestStreak: 'Longest Streak',
    currentLevelProgress: 'Level Progress',

    // Onboarding
    authTitle: 'Begin Your Heroic Ascension',
    authSubtitle: 'Transform your daily habits into an epic personal progression game',
    signUp: 'Sign Up',
    login: 'Login',
    emailPlaceholder: 'adventurer@realm.com',
    passwordPlaceholder: 'Your secret rune passphrase',
    confirmPasswordPlaceholder: 'Confirm rune passphrase',
    avatarNamePlaceholder: 'Avatar / Hero Name (e.g., Kaelen)',
    forgotPassword: 'Forgot Passphrase?',
    verifyEmail: 'Verify Realm Scroll (Email)',
    chooseGender: 'Choose Your Hero Archetype',
    genderMale: 'Male',
    genderFemale: 'Female',
    chooseAvatar: 'Choose Starting Avatar Model',
    chooseLanguage: 'Select Realm Tongue (Language)',
    chooseCategories: 'Select Your Life Categories',
    categoryHelp: 'Select multiple areas you wish to master. You can also add custom categories.',
    addCustomCategory: 'Add Custom Category',
    castleRevealTitle: 'Your Citadel Awakes!',
    castleRevealSubtitle: 'Here is your starting outpost. As you complete real-world tasks, this keep will evolve into a majestic empire.',
    rulesTitle: 'The Codex of Ascendance',
    enterRealm: 'Enter the Realm',

    // Daily Tasks
    todayTasks: "Today's Quests",
    completedTasks: 'Completed',
    remainingTasks: 'Remaining',
    xpEarnedToday: 'XP Earned Today',
    dailyCompletion: 'Daily Completion Rate',
    createTaskBtn: '+ Forge New Quest',
    noTasksToday: 'No active quests for today. Forge one below to earn XP and level up!',
    completeBtn: 'Complete Quest',
    verifyBtn: 'Verify & Complete',
    verifiedBadge: 'Verified (100% XP)',
    partiallyVerifiedBadge: 'Partially Verified (50% XP)',
    selfReportedBadge: 'Self-Reported (~25% XP)',
    needsReviewBadge: 'Under Review',
    importantBadge: 'Important Quest',

    // Task Creation
    forgeQuestTitle: 'Forge a New Real-World Quest',
    taskNameLabel: 'Quest Title',
    taskDescLabel: 'Description / Instructions',
    categoryLabel: 'Category',
    priorityLabel: 'Priority',
    difficultyLabel: 'Difficulty & Reward',
    deadlineLabel: 'Deadline / Time',
    recurringLabel: 'Recurring Quest',
    reminderLabel: 'Reminder Notification',
    requireVerificationLabel: 'Requires Evidence / AI Verification',
    saveQuestBtn: 'Commit Quest',
    cancelBtn: 'Cancel',

    // Verification Modal
    verifyTitle: "Let's Verify Your Progress",
    verifySubtitle: 'Upload your proof or notes, and answer the knowledge questions to claim full XP.',
    uploadProofLabel: 'Upload Evidence (Screenshot, Notes, Certificate, Code):',
    connectWearableLabel: 'Or Sync Fitness Tracker:',
    syncFitnessBtn: 'Sync Wearable Data',
    aiQuestionsTitle: 'Sage AI Knowledge Questions',
    submitVerificationBtn: 'Submit Proof for Evaluation',
    confidenceScore: 'Verification Confidence',

    // Streak Danger & Recovery
    streakDangerWarning: 'Streak Warning: 3 missed days resets your current level XP progress (not completed levels)!',
    recoverStreakBtn: 'Recover Missed Day (1,000 Coins)',
    recoverConfirm: 'Do you want to spend 1,000 Coins to restore your missed streak day and protect your level progress?',
    confirm: 'Confirm',

    // Mystery Reward
    mysteryRewardTitle: 'Daily Mystery Treasure Chest',
    mysteryRewardReady: 'All daily quests completed! Click the chest to open your mystery bounty!',
    mysteryRewardLocked: 'Complete all daily quests to unlock today’s enchanted chest.',
    claimRewardBtn: 'Open Treasure Chest',

    // Level Up Celebration
    levelUpTitle: 'LEVEL UP!',
    levelUpSubtitle: 'You have ascended to new heights of real-world discipline!',
    newRankUnlocked: 'New Rank Achieved',
    coinsAwarded: 'Coins Awarded',
    castleUpgraded: 'Castle Citadel Upgraded',
    continueJourneyBtn: 'Praise the Sun & Continue',

    // AI Assistant
    aiAssistantTitle: 'Sage Aethelgard — AI Productivity Companion',
    aiPlaceholder: 'Ask Sage for task breakdown, planning advice, or habit insights...',
    aiSend: 'Consult Sage',

    // Wardrobe & Castle
    wardrobeTitle: 'Heroic Wardrobe & Armory',
    castleTitle: 'Citadel of Progress',
    equipBtn: 'Equip',
    equippedBtn: 'Equipped',
    unlockWithCoins: 'Unlock with Coins',

    // Leaderboard & Social
    leaderboardTitle: 'Hall of Legends (Anti-Exploit Rankings)',
    socialTitle: 'Adventurers of the Realm',
    followBtn: 'Follow',
    unfollowBtn: 'Unfollow',
    followersCount: 'Followers',
    followingCount: 'Following',
    shareProfileBtn: 'Share RPG Profile Card',

    // Weekly Planner
    weeklyPlannerTitle: 'Weekly Campaign Goals',
    addWeeklyGoalBtn: '+ New Weekly Milestone',
    breakIntoDailyTasks: 'Divide into Daily Quests',

    // Analytics
    analyticsTitle: 'Wisdom & Habit Analytics',
    strongestCategory: 'Strongest Mastery Area',
    weakestCategory: 'Area Requiring Greater Focus',
  },
  ta: {
    // App branding
    appName: 'ஏதேரியா (Aetheria)',
    appTagline: 'உண்மை உலக சாதனைக்கான வீரப் பயணம்',
    
    // Navigation
    navDashboard: 'முகப்பு பலகை',
    navDailyTasks: 'தினசரி பணிகள்',
    navPlanner: 'வாராந்திர திட்டம்',
    navCalendar: 'நாட்காட்டி',
    navCastle: 'கோட்டை அரண்',
    navWardrobe: 'ஆடை & ஆயுத அறை',
    navShop: 'வெகுமதி கடை',
    navLeaderboard: 'வீரர் வரிசை',
    navSocial: 'நண்பர்கள்',
    navAnalytics: 'முன்னேற்ற பகுப்பாய்வு',
    navSettings: 'அமைப்புகள்',

    // Header stats
    level: 'நிலை',
    rank: 'பட்டம்',
    xp: 'மதிப்பெண் (XP)',
    coins: 'பொற்காசுகள்',
    streak: 'தொடர்ச்சி',
    days: 'நாட்கள்',
    longestStreak: 'நீண்ட தொடர்ச்சி',
    currentLevelProgress: 'நிலை முன்னேற்றம்',

    // Onboarding
    authTitle: 'உங்கள் வீரப் பயணத்தை தொடங்குங்கள்',
    authSubtitle: 'உங்கள் நிஜ வாழ்க்கை பழக்கங்களை ஒரு விளையாட்டுப் பயணமாக மாற்றுங்கள்',
    signUp: 'பதிவு செய்க',
    login: 'உள்நுழைக',
    emailPlaceholder: 'adventurer@realm.com',
    passwordPlaceholder: 'உங்கள் ரகசிய கடவுச்சொல்',
    confirmPasswordPlaceholder: 'கடவுச்சொல்லை உறுதிப்படுத்துக',
    avatarNamePlaceholder: 'உங்கள் வீரர் பெயர் (எ.கா: ஆதவன்)',
    forgotPassword: 'கடவுச்சொல் மறந்ததா?',
    verifyEmail: 'மின்னஞ்சல் சரிபார்ப்பு',
    chooseGender: 'உங்கள் பாலினத்தைத் தேர்வுசெய்க',
    genderMale: 'ஆண்',
    genderFemale: 'பெண்',
    chooseAvatar: 'தொடக்க அவதார் தோற்றத்தைத் தேர்வுசெய்க',
    chooseLanguage: 'மொழியைத் தேர்வுசெய்க',
    chooseCategories: 'உங்கள் வாழ்க்கை பிரிவுகளைத் தேர்வுசெய்க',
    categoryHelp: 'நீங்கள் முன்னேற விரும்பும் பிரிவுகளைத் தேர்ந்தெடுக்கவும். உங்கள் சொந்த பிரிவுகளையும் சேர்க்கலாம்.',
    addCustomCategory: 'புதிய பிரிவைச் சேர்',
    castleRevealTitle: 'உங்கள் தொடக்கக் கோட்டை உருவானது!',
    castleRevealSubtitle: 'இது உங்கள் தொடக்க காவல் முகாம். நீங்கள் பணிகளை முடிக்கும் போது இது பேரரண்மனையாக மாறும்.',
    rulesTitle: 'பயணத்தின் விதிகளும் நெறிகளும்',
    enterRealm: 'பயணத்தைத் தொடங்கு',

    // Daily Tasks
    todayTasks: 'இன்றைய முக்கிய பணிகள்',
    completedTasks: 'முடிந்தவை',
    remainingTasks: 'மீதமுள்ளவை',
    xpEarnedToday: 'இன்று ஈட்டிய XP',
    dailyCompletion: 'தினசரி முடிவு சதவீதம்',
    createTaskBtn: '+ புதிய பணியை உருவாக்கு',
    noTasksToday: 'இன்று எந்த பணிகளும் இல்லை. கீழே உள்ள பொத்தானை அழுத்தி புதிய பணியை தொடங்குங்கள்!',
    completeBtn: 'பணியை முடி',
    verifyBtn: 'சரிபார்த்து முடி',
    verifiedBadge: 'சரிபார்க்கப்பட்டது (100% XP)',
    partiallyVerifiedBadge: 'பகுதி சரிபார்ப்பு (50% XP)',
    selfReportedBadge: 'சுய தகவல் (~25% XP)',
    needsReviewBadge: 'ஆய்வில் உள்ளது',
    importantBadge: 'முக்கிய பணி',

    // Task Creation
    forgeQuestTitle: 'புதிய உண்மைப் பணியை உருவாக்கு',
    taskNameLabel: 'பணியின் தலைப்பு',
    taskDescLabel: 'விவரம் / வழிமுறைகள்',
    categoryLabel: 'பிரிவு',
    priorityLabel: 'முன்னுரிமை',
    difficultyLabel: 'சிரம நிலை & XP வெகுமதி',
    deadlineLabel: 'கடைசி நேரம்',
    recurringLabel: 'மீண்டும் மீண்டும் வரும் பணி',
    reminderLabel: 'நினைவூட்டல்',
    requireVerificationLabel: 'சான்று / AI சரிபார்ப்பு தேவை',
    saveQuestBtn: 'பணியை சேமி',
    cancelBtn: 'ரத்து செய்',

    // Verification Modal
    verifyTitle: 'உங்கள் முன்னேற்றத்தை சரிபார்ப்போம்',
    verifySubtitle: 'சான்றுகள் அல்லது குறிப்புகளை பதிவேற்றி, கேள்விகளுக்கு பதிலளித்து முழு XP-யை பெறுங்கள்.',
    uploadProofLabel: 'ஆதாரத்தை பதிவேற்றவும் (ஸ்கிரீன்ஷாட், குறிப்புகள், சான்றிதழ்):',
    connectWearableLabel: 'அல்லது ஃபிட்னஸ் கருவியை இணைக்கவும்:',
    syncFitnessBtn: 'கருவி தரவை ஒத்திசை',
    aiQuestionsTitle: 'AI அறிவுச் சரிபார்ப்பு கேள்விகள்',
    submitVerificationBtn: 'மதிப்பீட்டிற்கு சமர்ப்பிக்கவும்',
    confidenceScore: 'சரிபார்ப்பு நம்பிக்கை அளவு',

    // Streak Danger & Recovery
    streakDangerWarning: 'எச்சரிக்கை: தொடர்ந்து 3 நாட்கள் தவறினால் உங்கள் தற்போதைய நிலை XP பூஜ்ஜியமாகும்!',
    recoverStreakBtn: 'தவறிய நாளை மீட்டெடு (1,000 பொற்காசுகள்)',
    recoverConfirm: '1,000 பொற்காசுகளைப் பயன்படுத்தி உங்கள் தொடர்ச்சியை மீட்டெடுக்க விரும்புகிறீர்களா?',
    confirm: 'உறுதி செய்',

    // Mystery Reward
    mysteryRewardTitle: 'தினசரி ரகசிய புதையல் பெட்டி',
    mysteryRewardReady: 'இன்றைய அனைத்து பணிகளும் முடிந்தது! பெட்டியைத் திறந்து உங்கள் பரிசைப் பெறுங்கள்!',
    mysteryRewardLocked: 'ரகசிய பரிசைப் பெற இன்றைய பணிகளை முடிக்கவும்.',
    claimRewardBtn: 'புதையலைத் திற',

    // Level Up Celebration
    levelUpTitle: 'நிலை உயர்ந்தது!',
    levelUpSubtitle: 'உங்கள் உண்மையான ஒழுக்கத்தால் புதிய நிலையை அடைந்துவிட்டீர்கள்!',
    newRankUnlocked: 'புதிய பட்டம் திறக்கப்பட்டது',
    coinsAwarded: 'வழங்கப்பட்ட பொற்காசுகள்',
    castleUpgraded: 'கோட்டை மேம்படுத்தப்பட்டது',
    continueJourneyBtn: 'மகிழ்ச்சியுடன் தொடர்க',

    // AI Assistant
    aiAssistantTitle: 'ஏதெல்கார்ட் — AI வழிகாட்டி',
    aiPlaceholder: 'பணிகளை பிரிக்கவோ, திட்டமிடவோ வழிகாட்டியை கேளுங்கள்...',
    aiSend: 'கேள்வி கேள்',

    // Wardrobe & Castle
    wardrobeTitle: 'அவதார் ஆடை & ஆயுதங்கள்',
    castleTitle: 'முன்னேற்றக் கோட்டை',
    equipBtn: 'அணிந்து கொள்',
    equippedBtn: 'அணியப்பட்டுள்ளது',
    unlockWithCoins: 'காசுகள் மூலம் திற',

    // Leaderboard & Social
    leaderboardTitle: 'வீரர் அரங்கம் (நேர்மையான தரவரிசை)',
    socialTitle: 'களப் பயணிகள்',
    followBtn: 'பின்தொடர்',
    unfollowBtn: 'விலகு',
    followersCount: 'பின்தொடர்பவர்கள்',
    followingCount: 'பின்செல்பவர்கள்',
    shareProfileBtn: 'சுயவிவர அட்டையைப் பகிர்',

    // Weekly Planner
    weeklyPlannerTitle: 'வாராந்திர இலக்குகள்',
    addWeeklyGoalBtn: '+ புதிய வார இலக்கு',
    breakIntoDailyTasks: 'தினசரி பணிகளாகப் பிரி',

    // Analytics
    analyticsTitle: 'அறிவு & பழக்கவழக்க பகுப்பாய்வு',
    strongestCategory: 'அதிக பலம் வாய்ந்த பகுதி',
    weakestCategory: 'கூடுதல் கவனம் தேவைப்படும் பகுதி',
  },
};
