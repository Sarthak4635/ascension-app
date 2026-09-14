import React, { useState } from 'react';
import { UserProfile } from '../types';
import { DEMO_USERS } from '../data/initialData';
import { playSuccessChime, playClickPop } from '../utils/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onLogin: (user: UserProfile) => void;
  onShowToast: (msg: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup' | 'switch'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [archetype, setArchetype] = useState('Systems Architect');
  const [selectedAvatar, setSelectedAvatar] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB5eIzVdVExWJ5ubfdY-8txyKaAzihGgXpvH_VBZ2JQzZA-0BrEu7kHIyp_uOXqKpitjWyfqQVoXj0k4eomAGDXAv67w2TEhiv54QmZtvrYRogF3L04Ipq31FfaCH3QiPBnNayosVrTgvINkvYPuYDrhkV60bMGsaamOsUTKybwefSMqABqLaWJBiVaYDMiNKuTVHay6Tc3ZBHp_cmu_NFQpMDPgsztkWCNi7Lgd0HrcZvbgns6s_4'
  );

  if (!isOpen) return null;

  const AVATAR_OPTIONS = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB5eIzVdVExWJ5ubfdY-8txyKaAzihGgXpvH_VBZ2JQzZA-0BrEu7kHIyp_uOXqKpitjWyfqQVoXj0k4eomAGDXAv67w2TEhiv54QmZtvrYRogF3L04Ipq31FfaCH3QiPBnNayosVrTgvINkvYPuYDrhkV60bMGsaamOsUTKybwefSMqABqLaWJBiVaYDMiNKuTVHay6Tc3ZBHp_cmu_NFQpMDPgsztkWCNi7Lgd0HrcZvbgns6s_4',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
  ];

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    playClickPop();
    const existing = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    const targetUser: UserProfile = existing || {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0] || 'Ascendant',
      email: email || 'seeker@ascension.io',
      avatar: selectedAvatar,
      archetype: 'Conscious Seeker',
      level: 1,
      xp: 150,
      nextLevelXp: 500,
      streak: 1,
      streakShieldActive: true,
      gems: 250,
      hearts: 5,
      maxHearts: 5,
      isGuest: false,
      lastSyncedAt: 'Just now',
      rankTier: 1,
      protocolsTransmutedCount: 0,
      focusHoursCompleted: 0
    };

    onLogin(targetUser);
    playSuccessChime();
    onShowToast(`Welcome back, ${targetUser.name}! Journey synchronized.`);
    onClose();
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    playClickPop();
    if (!name.trim()) {
      onShowToast('Please enter your practitioner name');
      return;
    }

    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@ascension.io`,
      avatar: selectedAvatar,
      archetype,
      level: 1,
      xp: 100,
      nextLevelXp: 500,
      streak: 1,
      streakShieldActive: true,
      gems: 500, // Welcome bonus
      hearts: 5,
      maxHearts: 5,
      isGuest: false,
      lastSyncedAt: 'Just now',
      rankTier: 1,
      protocolsTransmutedCount: 0,
      focusHoursCompleted: 0
    };

    onLogin(newUser);
    playSuccessChime();
    onShowToast(`Account created! 500 gems granted for beginning your journey.`);
    onClose();
  };

  const handleSelectDemoUser = (user: UserProfile) => {
    playClickPop();
    onLogin(user);
    playSuccessChime();
    onShowToast(`Switched account to ${user.name}`);
    onClose();
  };

  return (
    <div
      id="auth-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="auth-modal-container"
        className="w-full max-w-md bg-[#181922] border-2 border-white/[0.08] border-b-4 border-b-black/60 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-[#4cd7f6]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#cfc2d6] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center mt-1 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00c2e8]/20 to-[#b76dff]/20 border border-white/[0.1] flex items-center justify-center text-[#4cd7f6] mb-3 shadow-lg">
            <span className="material-symbols-outlined text-[28px]">lock</span>
          </div>
          <h2 className="font-headline-md text-[22px] text-[#e3e1e9] font-bold">
            Ascension Chronicle Vault
          </h2>
          <p className="font-body-sm text-[13px] text-[#cfc2d6] max-w-xs mt-1">
            Store your journey, protect your 27-day streak, and sync rituals across all devices.
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[#121318] border border-white/[0.06] mb-5">
          <button
            onClick={() => setActiveTab('signin')}
            className={`py-2 px-2 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
              activeTab === 'signin'
                ? 'bg-[#292a36] text-[#4cd7f6] shadow-sm'
                : 'text-[#cfc2d6] hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`py-2 px-2 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
              activeTab === 'signup'
                ? 'bg-[#292a36] text-[#b76dff] shadow-sm'
                : 'text-[#cfc2d6] hover:text-white'
            }`}
          >
            Create Codex
          </button>
          <button
            onClick={() => setActiveTab('switch')}
            className={`py-2 px-2 rounded-xl text-[12px] font-bold transition-all cursor-pointer ${
              activeTab === 'switch'
                ? 'bg-[#292a36] text-[#ffb95f] shadow-sm'
                : 'text-[#cfc2d6] hover:text-white'
            }`}
          >
            Profiles
          </button>
        </div>

        {/* Tab 1: Sign In */}
        {activeTab === 'signin' && (
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-wider font-bold">
                Email or Codex Key
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#988d9f]">
                  mail
                </span>
                <input
                  type="email"
                  required
                  placeholder="alex.mercer@ascension.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#121318] border border-white/[0.08] focus:border-[#4cd7f6] focus:outline-none text-[#e3e1e9] text-[14px] font-sans"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-wider font-bold">
                Cipher Password
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[18px] text-[#988d9f]">
                  key
                </span>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-xl bg-[#121318] border border-white/[0.08] focus:border-[#4cd7f6] focus:outline-none text-[#e3e1e9] text-[14px] font-sans"
                />
              </div>
            </div>

            {/* Tactile 3D Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl btn-3d-cyan text-[13px] uppercase tracking-widest cursor-pointer mt-1"
            >
              Sign In &amp; Load Journey
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-[1px] bg-white/[0.08]" />
              <span className="font-label-caps text-[9px] uppercase tracking-widest text-[#988d9f]">
                Or 1-Tap Quick Switch
              </span>
              <div className="flex-1 h-[1px] bg-white/[0.08]" />
            </div>

            {/* Quick Demo Switchers */}
            <div className="flex flex-col gap-2">
              {DEMO_USERS.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleSelectDemoUser(user)}
                  className="w-full p-2.5 rounded-xl bg-[#121318] border border-white/[0.06] hover:border-[#4cd7f6]/40 flex items-center justify-between text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-white/[0.1]"
                    />
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-[#e3e1e9] group-hover:text-[#4cd7f6] transition-colors">
                        {user.name}
                      </span>
                      <span className="text-[11px] text-[#cfc2d6]">
                        Lv. {user.level} · {user.archetype}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#ffb95f]">
                    <span className="text-[12px] font-bold">🔥 {user.streak}d</span>
                  </div>
                </button>
              ))}
            </div>
          </form>
        )}

        {/* Tab 2: Create Account */}
        {activeTab === 'signup' && (
          <form onSubmit={handleCreateAccount} className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-wider font-bold">
                Practitioner Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Liam Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121318] border border-white/[0.08] focus:border-[#b76dff] focus:outline-none text-[#e3e1e9] text-[14px]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-wider font-bold">
                Codex Archetype
              </label>
              <select
                value={archetype}
                onChange={(e) => setArchetype(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121318] border border-white/[0.08] focus:border-[#b76dff] focus:outline-none text-[#e3e1e9] text-[13px]"
              >
                <option value="Systems Architect">Systems Architect (Focus &amp; Logic)</option>
                <option value="Neural Bio-Engineer">Neural Bio-Engineer (Peak Physiology)</option>
                <option value="Stoic Philosopher">Stoic Philosopher (Equilibrium &amp; Mind)</option>
                <option value="Kinetic Adept">Kinetic Adept (Endurance &amp; Strength)</option>
              </select>
            </div>

            {/* Avatar Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-wider font-bold">
                Choose Astral Avatar
              </label>
              <div className="flex items-center gap-3">
                {AVATAR_OPTIONS.map((av, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedAvatar(av)}
                    className={`relative p-0.5 rounded-full transition-transform cursor-pointer ${
                      selectedAvatar === av
                        ? 'ring-2 ring-[#b76dff] scale-105'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={av}
                      alt={`Avatar option ${idx + 1}`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-2xl btn-3d-purple text-[13px] uppercase tracking-widest cursor-pointer mt-2"
            >
              Create Account &amp; Store Journey
            </button>
          </form>
        )}

        {/* Tab 3: Current Profile & Storage Stats */}
        {activeTab === 'switch' && (
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-[#121318] border border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#4cd7f6]"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[15px] text-[#e3e1e9]">
                      {currentUser.name}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#292a36] text-[#4cd7f6]">
                      Lv. {currentUser.level}
                    </span>
                  </div>
                  <span className="text-[12px] text-[#cfc2d6]">
                    {currentUser.email}
                  </span>
                  <span className="text-[10px] text-[#988d9f] mt-0.5">
                    Status: {currentUser.isGuest ? 'Local Guest' : 'Cloud Verified'}
                  </span>
                </div>
              </div>
            </div>

            {/* Journey Stats Protection Breakdown */}
            <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-2xl bg-[#121318] border border-white/[0.06]">
              <div>
                <span className="text-[18px] font-bold text-[#ffb95f]">
                  🔥 {currentUser.streak}d
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-[#cfc2d6] font-bold mt-0.5">
                  Streak Safe
                </span>
              </div>
              <div className="border-x border-white/[0.08]">
                <span className="text-[18px] font-bold text-[#4cd7f6]">
                  💎 {currentUser.gems}
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-[#cfc2d6] font-bold mt-0.5">
                  Relics Stored
                </span>
              </div>
              <div>
                <span className="text-[18px] font-bold text-[#ddb7ff]">
                  ⚡ {currentUser.xp} XP
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-[#cfc2d6] font-bold mt-0.5">
                  Experience
                </span>
              </div>
            </div>

            {/* Encryption & Cloud Status */}
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#00c2e8]/10 border border-[#00c2e8]/20 text-[#4cd7f6] text-[12px]">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Local storage encrypted &amp; persistent across sessions.</span>
            </div>

            {/* Guest Sign Out / Switch Button */}
            <button
              onClick={() => {
                const guestUser: UserProfile = {
                  id: 'usr_guest',
                  name: 'Guest Ascendant',
                  email: 'guest@ascension.local',
                  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
                  archetype: 'Seeker',
                  level: 1,
                  xp: 50,
                  nextLevelXp: 300,
                  streak: 1,
                  streakShieldActive: false,
                  gems: 100,
                  hearts: 5,
                  maxHearts: 5,
                  isGuest: true,
                  lastSyncedAt: 'Unsaved Local',
                  rankTier: 1,
                  protocolsTransmutedCount: 0,
                  focusHoursCompleted: 0
                };
                handleSelectDemoUser(guestUser);
              }}
              className="w-full py-3 px-4 rounded-xl btn-3d-dark text-[12px] uppercase tracking-widest cursor-pointer text-center"
            >
              Switch to Guest Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
