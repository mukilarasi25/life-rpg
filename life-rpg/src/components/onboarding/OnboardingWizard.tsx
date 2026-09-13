import { assetPath } from '../../utils/assetPath';
import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useLanguage } from '../../context/LanguageContext';
import { AVATAR_MODELS, INITIAL_CATEGORIES } from '../../data/initialSeed';
import { 
  Shield, Sparkles, Check, ArrowRight, ArrowLeft, User, Mail, 
  Lock, Globe, Castle, BookOpen, Flame, Coins, Plus, Trash2, Star
} from 'lucide-react';
import { CASTLE_STAGES } from '../../utils/xpEngine';
import { Category } from '../../types';

export const OnboardingWizard: React.FC = () => {
  const { 
    user, updateUser, avatar, updateAvatar, categories, 
    addCategory, removeCategory, toggleImportantCategory, setIsOnboarded 
  } = useGame();
  const { language, setLanguage, t } = useLanguage();

  const [step, setStep] = useState<number>(1);
  const [authMode, setAuthMode] = useState<'signup' | 'login' | 'forgot' | 'verify'>('signup');

  // Form states
  const [email, setEmail] = useState('adventurer@aetheria.realm');
  const [password, setPassword] = useState('••••••••••••');
  const [confirmPassword, setConfirmPassword] = useState('••••••••••••');
  const [displayName, setDisplayName] = useState(user.displayName || 'Kaelen Sunstrider');
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>(user.gender || 'male');
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>(avatar.baseModelId || 'm1');
  const [newCatName, setNewCatName] = useState('');
  const [verificationCode, setVerificationCode] = useState('749215');

  // Filter avatars based on gender
  const availableAvatars = AVATAR_MODELS.filter((m) => m.gender === selectedGender);

  const handleFinishOnboarding = () => {
    updateUser({
      email,
      displayName,
      gender: selectedGender,
      language,
      isVerified: true,
    });
    updateAvatar({
      baseModelId: selectedAvatarId,
    });
    setIsOnboarded(true);
  };

  const startingCastle = CASTLE_STAGES[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950 flex flex-col items-center justify-center p-4">
      {/* Dynamic fantasy background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: `url('${assetPath('/assets/castles/hero_bg.jpg')}')` }}
      />

      <div className="relative z-10 max-w-2xl w-full bg-slate-900/90 backdrop-blur-xl border border-amber-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 my-8">
        {/* Step Indicator Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <Shield className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                {t('appName')} • Step {step} of 7
              </h2>
              <p className="text-xs text-slate-400">
                {step === 1 && 'Account Creation & Identity'}
                {step === 2 && 'Hero Gender & Archetype'}
                {step === 3 && 'Avatar Model Selection'}
                {step === 4 && 'Realm Language / மொழி'}
                {step === 5 && 'Life Categories & Quests'}
                {step === 6 && 'Starting Citadel Reveal'}
                {step === 7 && 'The Codex of Rules'}
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5, 6, 7].map((s) => (
              <div 
                key={s} 
                className={`w-4 sm:w-6 h-1.5 rounded-full transition-all ${
                  s === step 
                    ? 'bg-amber-400 w-8 sm:w-10' 
                    : s < step 
                    ? 'bg-amber-500/60' 
                    : 'bg-slate-800'
                }`} 
              />
            ))}
          </div>
        </div>

        {/* STEP 1: AUTH & IDENTITY */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-1">
                {authMode === 'signup' && t('authTitle')}
                {authMode === 'login' && 'Return to the Realm'}
                {authMode === 'forgot' && 'Rune Passphrase Recovery'}
                {authMode === 'verify' && 'Verify Scroll Token'}
              </h3>
              <p className="text-xs text-slate-400">
                {t('authSubtitle')}
              </p>
            </div>

            {/* Auth tab switcher */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 max-w-xs mx-auto mb-4">
              <button
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  authMode === 'signup' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                {t('signUp')}
              </button>
              <button
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  authMode === 'login' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                }`}
              >
                {t('login')}
              </button>
            </div>

            {authMode === 'signup' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Avatar / Hero Display Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder={t('avatarNamePlaceholder')}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Email Scroll ID
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('emailPlaceholder')}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Rune Passphrase
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Secret rune code"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-300 block mb-1">
                      Confirm Passphrase
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm secret code"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-slate-400 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setAuthMode('verify')}
                    className="text-cyan-400 hover:underline"
                  >
                    Test Email Verification Flow
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setAuthMode('forgot')}
                    className="text-amber-400 hover:underline"
                  >
                    {t('forgotPassword')}
                  </button>
                </div>
              </div>
            )}

            {authMode === 'login' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Email ID</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Passphrase</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-sm text-white"
                  />
                </div>
              </div>
            )}

            {authMode === 'verify' && (
              <div className="p-4 bg-slate-950 rounded-xl border border-cyan-500/30 text-center space-y-3">
                <Mail className="w-8 h-8 text-cyan-400 mx-auto animate-bounce" />
                <h4 className="text-sm font-bold text-white">Scroll Verification Token</h4>
                <p className="text-xs text-slate-400">
                  A verification code has been dispatched to {email}.
                </p>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-40 mx-auto text-center font-mono text-lg font-bold tracking-widest bg-slate-900 border border-cyan-400 rounded-lg py-1 text-cyan-300"
                />
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className="block mx-auto text-xs font-bold text-cyan-400 hover:underline"
                >
                  ✓ Token Verified — Return to Sign Up
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: GENDER SELECTION */}
        {step === 2 && (
          <div className="space-y-6 text-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{t('chooseGender')}</h3>
              <p className="text-xs text-slate-400">
                This selection tailors your starting avatar models. Both choices are designed with respect and dignity.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <button
                type="button"
                onClick={() => {
                  setSelectedGender('male');
                  setSelectedAvatarId('m1');
                }}
                className={`p-6 rounded-2xl border text-center transition-all flex flex-col items-center gap-3 ${
                  selectedGender === 'male'
                    ? 'bg-gradient-to-b from-blue-950/60 to-slate-900 border-blue-500 shadow-lg shadow-blue-500/20'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center text-blue-400">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{t('genderMale')}</h4>
                  <p className="text-[11px] text-slate-400">Knights, Paladins & Scholars</p>
                </div>
                {selectedGender === 'male' && (
                  <span className="w-6 h-6 rounded-full bg-blue-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedGender('female');
                  setSelectedAvatarId('f1');
                }}
                className={`p-6 rounded-2xl border text-center transition-all flex flex-col items-center gap-3 ${
                  selectedGender === 'female'
                    ? 'bg-gradient-to-b from-purple-950/60 to-slate-900 border-purple-500 shadow-lg shadow-purple-500/20'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-400 flex items-center justify-center text-purple-400">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{t('genderFemale')}</h4>
                  <p className="text-[11px] text-slate-400">Valkyries, Sorceresses & Champions</p>
                </div>
                {selectedGender === 'female' && (
                  <span className="w-6 h-6 rounded-full bg-purple-500 text-slate-950 flex items-center justify-center font-bold text-xs">
                    ✓
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: AVATAR SELECTION */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-white mb-1">{t('chooseAvatar')}</h3>
              <p className="text-xs text-slate-400">
                Choose 1 of 4 starting archetypes for {selectedGender === 'male' ? 'Male' : 'Female'}. Your avatar will evolve visually as you level up!
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {availableAvatars.map((model) => {
                const isSelected = selectedAvatarId === model.id;
                return (
                  <div
                    key={model.id}
                    onClick={() => setSelectedAvatarId(model.id)}
                    className={`rounded-xl border p-3 cursor-pointer transition-all flex flex-col items-center text-center ${
                      isSelected
                        ? 'bg-amber-950/40 border-amber-400 shadow-lg shadow-amber-500/20 scale-[1.02]'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden mb-2 border border-slate-700 shadow-md">
                      <img src={assetPath(model.image)} alt={model.name} className="w-full h-full object-cover" />
                    </div>
                    <h4 className="text-xs font-bold text-white leading-tight">
                      {language === 'ta' ? model.nameTa : model.name}
                    </h4>
                    <span className="text-[10px] text-amber-400 font-semibold mb-1">
                      {language === 'ta' ? model.archetypeTa : model.archetype}
                    </span>
                    <p className="text-[10px] text-slate-400 line-clamp-2">
                      {language === 'ta' ? model.descriptionTa : model.description}
                    </p>
                    {isSelected && (
                      <span className="mt-2 w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center">
                        ✓
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: LANGUAGE SELECTION */}
        {step === 4 && (
          <div className="space-y-6 text-center">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{t('chooseLanguage')}</h3>
              <p className="text-xs text-slate-400">
                Initially supporting English and Tamil (தமிழ்). Architecture easily extends to additional languages.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`p-6 rounded-2xl border text-center transition-all ${
                  language === 'en'
                    ? 'bg-cyan-950/50 border-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Globe className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <h4 className="font-bold text-white text-base">English</h4>
                <p className="text-xs text-slate-400">Standard Realm Tongue</p>
                {language === 'en' && <Check className="w-5 h-5 text-cyan-400 mx-auto mt-2" />}
              </button>

              <button
                type="button"
                onClick={() => setLanguage('ta')}
                className={`p-6 rounded-2xl border text-center transition-all ${
                  language === 'ta'
                    ? 'bg-amber-950/50 border-amber-400 shadow-lg shadow-amber-500/20'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                }`}
              >
                <Globe className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                <h4 className="font-bold text-white text-base">தமிழ் (Tamil)</h4>
                <p className="text-xs text-slate-400">செம்மொழித் தமிழ் இடைமுகம்</p>
                {language === 'ta' && <Check className="w-5 h-5 text-amber-400 mx-auto mt-2" />}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: CATEGORY SELECTION */}
        {step === 5 && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-1">{t('chooseCategories')}</h3>
              <p className="text-xs text-slate-400">{t('categoryHelp')}</p>
            </div>

            {/* Add Custom Category input */}
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Guitar Practice, German..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  if (newCatName.trim()) {
                    addCategory({
                      name: newCatName.trim(),
                      nameTa: newCatName.trim(),
                      icon: 'Sparkles',
                      color: '#f59e0b',
                      isImportant: true,
                    });
                    setNewCatName('');
                  }
                }}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                {t('addCustomCategory')}
              </button>
            </div>

            {/* Category chips grid */}
            <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto p-2 bg-slate-950/60 rounded-xl border border-slate-800">
              {categories.map((cat) => {
                return (
                  <div
                    key={cat.id}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                      cat.isImportant
                        ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleImportantCategory(cat.id)}
                      title="Toggle Important"
                      className="text-amber-400"
                    >
                      <Star className={`w-3.5 h-3.5 ${cat.isImportant ? 'fill-amber-400' : 'text-slate-600'}`} />
                    </button>
                    <span>{language === 'ta' ? cat.nameTa : cat.name}</span>
                    {cat.isCustom && (
                      <button
                        type="button"
                        onClick={() => removeCategory(cat.id)}
                        className="text-slate-500 hover:text-rose-400 ml-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: STARTING CASTLE REVEAL */}
        {step === 6 && (
          <div className="space-y-4 text-center">
            <div>
              <h3 className="text-xl font-bold text-amber-300 mb-1">{t('castleRevealTitle')}</h3>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">{t('castleRevealSubtitle')}</p>
            </div>

            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl max-w-lg mx-auto">
              <img 
                src={assetPath(startingCastle.image)} 
                alt={startingCastle.name} 
                className="w-full h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-4 flex flex-col justify-end text-left">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1">
                  <Castle className="w-4 h-4" />
                  Stage 1: {language === 'ta' ? startingCastle.nameTa : startingCastle.name}
                </span>
                <p className="text-xs text-slate-300 mt-1">
                  {language === 'ta' ? startingCastle.descriptionTa : startingCastle.description}
                </p>
                <div className="flex gap-2 mt-2">
                  {(language === 'ta' ? startingCastle.featuresTa : startingCastle.features).map((f, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-900/80 border border-slate-700 px-2 py-0.5 rounded text-amber-300">
                      ✓ {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: THE CODEX OF RULES */}
        {step === 7 && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-1">{t('rulesTitle')}</h3>
              <p className="text-xs text-slate-400">Master the 7 laws of personal ascension before stepping into the realm.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Daily Progress & XP
                </span>
                <p className="text-slate-400 text-[11px]">
                  Every real-world task gives XP (+1 to +10). Fill your 25 XP gauge to level up your character!
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-orange-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" /> Streak & The 3-Day Rule
                </span>
                <p className="text-slate-400 text-[11px]">
                  Missing 3 consecutive days resets your CURRENT LEVEL XP (not previous levels!). Recover missed days with 1,000 coins.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <Castle className="w-3.5 h-3.5" /> Castle & Avatar Evolution
                </span>
                <p className="text-slate-400 text-[11px]">
                  Higher levels transform your simple watchtower into grand citadels and unlock glorious armors, blades, and auras.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-purple-400 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> Honest AI Verification
                </span>
                <p className="text-slate-400 text-[11px]">
                  Upload notes, code, or sync wearable fitness data to claim 100% full XP. Self-reported tasks receive honest base XP.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-5 mt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
          ) : <div />}

          {step < 7 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
            >
              Continue
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishOnboarding}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-purple-600 hover:from-amber-300 hover:to-purple-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              {t('enterRealm')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
