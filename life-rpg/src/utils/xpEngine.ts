import { RankTitle, CastleStage } from '../types';

export function getRankForLevel(level: number): { rank: RankTitle; description: string; descriptionTa: string } {
  if (level >= 50) {
    return {
      rank: 'Legend',
      description: 'Exceptional long-term progress.',
      descriptionTa: 'அபாரமான நீண்டகால முன்னேற்றம் மற்றும் சாதனை.',
    };
  }
  if (level >= 30) {
    return {
      rank: 'Master',
      description: 'Advanced progress and mastery.',
      descriptionTa: 'மேம்பட்ட முன்னேற்றம் மற்றும் முழு தேர்ச்சி.',
    };
  }
  if (level >= 20) {
    return {
      rank: 'Champion',
      description: 'Highly consistent discipline.',
      descriptionTa: 'மிகவும் நிலையான விடாமுயற்சி மற்றும் ஒழுக்கம்.',
    };
  }
  if (level >= 10) {
    return {
      rank: 'Warrior',
      description: 'Strong progress and discipline.',
      descriptionTa: 'வலுவான முன்னேற்றம் மற்றும் தீவிர ஒழுக்கம்.',
    };
  }
  if (level >= 5) {
    return {
      rank: 'Adventurer',
      description: 'Building daily consistency.',
      descriptionTa: 'தினசரி தொடர்ச்சியை உருவாக்கும் பயணியர் நிலை.',
    };
  }
  return {
    rank: 'Beginner',
    description: 'Starting the journey.',
    descriptionTa: 'புதிய வாழ்க்கைப் பயணத்தின் தொடக்க நிலை.',
  };
}

export function getTargetXpForLevel(level: number): number {
  if (level < 5) return 25;
  if (level < 10) return 40;
  if (level < 20) return 75;
  if (level < 30) return 120;
  if (level < 50) return 200;
  return 350;
}

export function getCastleStageForLevel(level: number): number {
  if (level >= 50) return 6;
  if (level >= 30) return 5;
  if (level >= 20) return 4;
  if (level >= 10) return 3;
  if (level >= 5) return 2;
  return 1;
}

export const CASTLE_STAGES: CastleStage[] = [
  {
    stage: 1,
    minLevel: 1,
    maxLevel: 4,
    name: "Beginner's Watchtower",
    nameTa: "தொடக்கக் காவல் கோபுரம்",
    description: "A humble timber-palisade outpost with a warm campfire, sheltering your earliest habits.",
    descriptionTa: "உங்கள் தொடக்கப் பழக்கங்களை பாதுகாக்கும் சிறிய மரவேலி காவல் அரண்.",
    image: "/assets/castles/castle_1.jpg",
    features: ["Cozy campfire", "Wooden palisade", "Small watchtower"],
    featuresTa: ["இதமான முகாம் நெருப்பு", "மரத்தடுப்பு அரண்", "சிறிய கண்காணிப்பு கோபுரம்"],
  },
  {
    stage: 2,
    minLevel: 5,
    maxLevel: 9,
    name: "Adventurer's Stone Fort",
    nameTa: "சாகசப் பயணக் கோட்டை",
    description: "Sturdy granite walls, iron portcullis, torchlit battlements, and an archery courtyard.",
    descriptionTa: "கெட்டியான கருங்கல் சுவர்கள், இரும்பு வாசல் மற்றும் வில்பயிற்சி முற்றம் கொண்ட கோட்டை.",
    image: "/assets/castles/castle_2.jpg",
    features: ["Stone battlements", "Courtyard armory", "Guild banners"],
    featuresTa: ["கற்கோட்டை சுவர்கள்", "ஆயுத முற்றம்", "வீரர் கொடிகள்"],
  },
  {
    stage: 3,
    minLevel: 10,
    maxLevel: 19,
    name: "Warrior's Mountain Stronghold",
    nameTa: "போர்வீரர் மலை அரண்மனை",
    description: "High fortress perched atop granite crags, equipped with war room, library, and grand gates.",
    descriptionTa: "மலை உச்சியில் அமைந்த கம்பீரமான கோட்டை, நூலகம் மற்றும் போர் அறை கொண்டது.",
    image: "/assets/castles/hero_bg.jpg",
    features: ["High watchtowers", "Training grounds", "Moat & drawbridge"],
    featuresTa: ["உயர் காவல் கோபுரங்கள்", "பயிற்சி களம்", "அகழி மற்றும் பாலம்"],
  },
  {
    stage: 4,
    minLevel: 20,
    maxLevel: 29,
    name: "Champion's Arcane Citadel",
    nameTa: "வெற்றியாளரின் மாயக் கோட்டை",
    description: "Illuminated with radiant violet crystals and glowing braziers, reflecting unbreakable habit mastery.",
    descriptionTa: "மின்னும் ஊதா படிகங்கள் மற்றும் தீப்பந்தங்களுடன் மிளிரும் வெற்றிக் கோட்டை.",
    image: "/assets/castles/castle_4.jpg",
    features: ["Runic spires", "Crystal braziers", "Grand stone bridge"],
    featuresTa: ["மந்திர கோபுரங்கள்", "படிக தீப்பந்தங்கள்", "பிரம்மாண்ட கல் பாலம்"],
  },
  {
    stage: 5,
    minLevel: 30,
    maxLevel: 49,
    name: "Master's Grand Spire Palace",
    nameTa: "குருவின் பேரரண்மனை",
    description: "Soaring spires piercing the clouds, enchanted waterfalls, and ancient libraries of wisdom.",
    descriptionTa: "மேகங்களை தொடும் கோபுரங்கள், மாயாஜால நீர்வீழ்ச்சிகள் மற்றும் ஞான நூலகம்.",
    image: "/assets/castles/hero_bg.jpg",
    features: ["Observatory dome", "Arcane gardens", "Floating runestones"],
    featuresTa: ["வானியல் கூடம்", "மந்திர நந்தவனம்", "மிதக்கும் மந்திரக் கற்கள்"],
  },
  {
    stage: 6,
    minLevel: 50,
    maxLevel: 100,
    name: "Legendary Dragon Bastion",
    nameTa: "புராண டிராகன் வான் கோட்டை",
    description: "Celestial floating sanctuary amidst auroras, flanked by guardian dragons and immortal golden light.",
    descriptionTa: "விண்வெளியில் மிதக்கும் அற்புத சொர்க்கக் கோட்டை, காவலாளி டிராகன்கள் மற்றும் பொன் ஒளி.",
    image: "/assets/castles/castle_6.jpg",
    features: ["Guardian dragons", "Celestial light bridges", "Golden spires"],
    featuresTa: ["காவல் டிராகன்கள்", "ஒளிப் பாலங்கள்", "தங்கக் கோபுரங்கள்"],
  },
];
