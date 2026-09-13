import { assetPath } from '../../utils/assetPath';
import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { AVATAR_MODELS } from '../../data/initialSeed';
import { 
  UserCircle, Shield, Sword, Feather, Sparkles, 
  Coins, Lock, Check, Crown, Flame 
} from 'lucide-react';

export const WardrobeView: React.FC = () => {
  const { 
    avatar, updateAvatar, avatarItems, equipItem, 
    purchaseItem, coins, level, user 
  } = useGame();
  const { t, language } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'armor' | 'weapon' | 'cape' | 'aura'>('all');

  const avatarModel = AVATAR_MODELS.find((m) => m.id === avatar.baseModelId) || AVATAR_MODELS[0];

  const filteredItems = selectedCategory === 'all'
    ? avatarItems
    : avatarItems.filter((i) => i.category === selectedCategory);

  const handlePurchase = (itemId: string) => {
    const success = purchaseItem(itemId);
    if (!success) {
      alert('Not enough coins to purchase this legendary item! Complete quests to earn coins.');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <UserCircle className="w-6 h-6 text-amber-400" />
            <span>{t('wardrobeTitle')}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Equip unlocked armors, blades, cloaks, and radiant auras earned from real-world discipline.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold">
          <Coins className="w-4 h-4 text-amber-400" />
          <span>Royal Vault: {coins.toLocaleString()} Coins</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 1/3: Hero Portrait & Active Equipped Gear */}
        <div className="p-5 bg-slate-900/90 rounded-2xl border border-amber-500/30 shadow-xl space-y-4 text-center">
          <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl bg-slate-950">
            <img 
              src={assetPath(avatarModel.image)} 
              alt={user.displayName}
              className="w-full h-full object-cover"
            />
            {/* Equipping badge */}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 text-amber-400 text-[10px] font-bold border border-slate-700">
              Level {level}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-white">{user.displayName}</h3>
            <p className="text-xs text-amber-400 font-semibold">{avatarModel.archetype}</p>
          </div>

          {/* Equipped Gear Summary */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-left text-xs space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Battle Loadout:
            </span>
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1 text-slate-400">
                <Shield className="w-3.5 h-3.5 text-amber-400" /> Armor:
              </span>
              <span className="font-bold text-white text-[11px]">
                {avatarItems.find((i) => i.id === avatar.equippedItems.armor)?.name || 'Default'}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1 text-slate-400">
                <Sword className="w-3.5 h-3.5 text-cyan-400" /> Weapon:
              </span>
              <span className="font-bold text-white text-[11px]">
                {avatarItems.find((i) => i.id === avatar.equippedItems.weapon)?.name || 'Default'}
              </span>
            </div>
          </div>
        </div>

        {/* Right 2/3: Armory Inventory & Coin Shop */}
        <div className="lg:col-span-2 space-y-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Gear' },
              { id: 'armor', label: 'Armors' },
              { id: 'weapon', label: 'Weapons' },
              { id: 'cape', label: 'Capes & Cloaks' },
              { id: 'aura', label: 'Auras & Effects' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredItems.map((item) => {
              const isEquipped = avatar.equippedItems[item.category as keyof typeof avatar.equippedItems] === item.id;
              const canUnlock = level >= item.levelRequired;

              return (
                <div
                  key={item.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    isEquipped
                      ? 'bg-amber-950/30 border-amber-400 shadow-md shadow-amber-500/10'
                      : item.isUnlocked
                      ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-950/60 border-slate-800/40 opacity-70'
                  }`}
                >
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">
                        {language === 'ta' ? item.nameTa : item.name}
                      </h4>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {language === 'ta' ? item.descriptionTa : item.description}
                    </p>
                  </div>

                  {/* Footer status & equip/unlock button */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <div className="text-[11px]">
                      {item.isUnlocked ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Unlocked
                        </span>
                      ) : (
                        <span className="text-slate-400 flex items-center gap-1">
                          <Lock className="w-3.5 h-3.5 text-slate-500" />
                          Lvl {item.levelRequired} req • <Coins className="w-3 h-3 text-amber-400 ml-1 inline" /> {item.costCoins}
                        </span>
                      )}
                    </div>

                    <div>
                      {item.isUnlocked ? (
                        <button
                          type="button"
                          onClick={() => equipItem(item.id)}
                          disabled={isEquipped}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                            isEquipped
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-default'
                              : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                          }`}
                        >
                          {isEquipped ? t('equippedBtn') : t('equipBtn')}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handlePurchase(item.id)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1"
                        >
                          <Coins className="w-3.5 h-3.5" />
                          Unlock ({item.costCoins})
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
