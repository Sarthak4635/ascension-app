import React from 'react';
import { TabType, UserProfile } from '../types';
import { playClickPop } from '../utils/audio';
import { getRankByTier } from '../data/ranksData';

interface HeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  currentUser: UserProfile;
  onOpenAuth: () => void;
  onOpenStreak: () => void;
  onOpenRelicShop: () => void;
  onOpenNotifications: () => void;
  onOpenRanks: () => void;
  onOpenSecurity: () => void;
  securityScore?: number;
  isMuted?: boolean;
  onToggleMute?: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  currentUser,
  onOpenAuth,
  onOpenStreak,
  onOpenRelicShop,
  onOpenNotifications,
  onOpenRanks,
  onOpenSecurity,
  securityScore = 100,
  isMuted = false,
  onToggleMute,
  unreadCount = 2
}) => {
  const currentRank = getRankByTier(currentUser.rankTier || 1);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#14151e]/90 backdrop-blur-xl border-b-2 border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
      <div className="max-w-md mx-auto h-16 px-3 flex items-center justify-between gap-1">
        {/* Brand / Logo */}
        <button
          onClick={() => {
            playClickPop();
            onTabChange('home');
          }}
          className="flex items-center gap-1.5 text-left group transition-all cursor-pointer flex-shrink-0"
          title="Ascension Home"
        >
          <img
            alt="ASCENSION"
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_8px_rgba(217,119,6,0.3)]"
            src="/assets/ascension_logo.png"
            referrerPolicy="no-referrer"
          />
        </button>

        {/* Gamification & Ascension HUD Items */}
        <div className="flex items-center gap-1.5">
          {/* Rank Tier Pill */}
          <button
            onClick={() => {
              playClickPop();
              onOpenRanks();
            }}
            className="flex items-center gap-1 px-2 py-1 rounded-xl bg-[#1d1b2a] border border-[#b76dff]/40 hover:border-[#b76dff] shadow-[0_2px_8px_rgba(183,109,255,0.2)] active:translate-y-0.5 transition-all cursor-pointer"
            title={`Ascension Rank: Tier ${currentRank.tier} (${currentRank.name})`}
          >
            <span className="text-[13px] leading-none">{currentRank.badge}</span>
            <span className="font-headline-sm text-[11px] font-bold text-[#ddb7ff] leading-none">
              T{currentRank.tier}
            </span>
          </button>

          {/* Flame / Streak Pill */}
          <button
            onClick={() => {
              playClickPop();
              onOpenStreak();
            }}
            className="flex items-center gap-1 px-2 py-1 rounded-xl bg-[#241f17] border border-[#f59e0b]/40 hover:border-[#f59e0b] shadow-[0_2px_8px_rgba(245,158,11,0.15)] active:translate-y-0.5 transition-all cursor-pointer"
            title="View Streak Calendar & Shields"
          >
            <span className="text-[13px] leading-none animate-pulse">🔥</span>
            <span className="font-headline-sm text-[12px] font-bold text-[#f59e0b] leading-none">
              {currentUser.streak}
            </span>
          </button>

          {/* Relics / Gems Pill */}
          <button
            onClick={() => {
              playClickPop();
              onOpenRelicShop();
            }}
            className="flex items-center gap-1 px-2 py-1 rounded-xl bg-[#09232c] border border-[#00c2e8]/40 hover:border-[#00c2e8] shadow-[0_2px_8px_rgba(0,194,232,0.15)] active:translate-y-0.5 transition-all cursor-pointer"
            title="Ascension Relic Armory"
          >
            <span className="text-[12px] leading-none">💎</span>
            <span className="font-headline-sm text-[12px] font-bold text-[#00c2e8] leading-none">
              {currentUser.gems.toLocaleString()}
            </span>
          </button>

          {/* Anti-Hacker Security Shield Pill */}
          <button
            onClick={() => {
              playClickPop();
              onOpenSecurity();
            }}
            className="flex items-center gap-1 px-2 py-1 rounded-xl bg-[#0e221d] border border-emerald-500/40 hover:border-emerald-400 shadow-[0_2px_8px_rgba(16,185,129,0.2)] active:translate-y-0.5 transition-all cursor-pointer"
            title="Aegis Anti-Hacker Defense Shield (Click to Inspect)"
          >
            <span className="text-[12px] leading-none">🛡️</span>
            <span className="text-[10px] font-mono font-bold text-emerald-400 leading-none">
              {securityScore}%
            </span>
          </button>
        </div>

        {/* Right Section: Sound Toggle & Profile Trigger */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* Audio Mute/Unmute quick button */}
          {onToggleMute && (
            <button
              onClick={() => {
                onToggleMute();
              }}
              className={`w-8 h-8 flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
                isMuted
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  : 'bg-white/[0.04] border-white/[0.08] text-[#cfc2d6] hover:text-[#e3e1e9]'
              }`}
              title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
              aria-label="Toggle Sound Effects"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isMuted ? 'volume_off' : 'volume_up'}
              </span>
            </button>
          )}

          {/* User Profile / Login Pill */}
          <button
            onClick={() => {
              playClickPop();
              onOpenAuth();
            }}
            className="relative flex items-center gap-1 pl-1 pr-2 py-1 rounded-full bg-[#1e1f29] border border-white/[0.1] hover:border-[#4cd7f6]/50 transition-all cursor-pointer group"
            title={currentUser.isGuest ? 'Sign In to Store Journey' : 'Account & Sync Settings'}
          >
            <div className="relative">
              <img
                alt={currentUser.name}
                className="w-6 h-6 rounded-full object-cover border border-white/[0.2]"
                src={currentUser.avatar}
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#00c2e8] border border-[#14151e]" />
            </div>
            <span className="font-label-caps text-[9px] uppercase tracking-wider text-[#4cd7f6] font-bold leading-tight hidden xs:inline">
              Lv.{currentUser.level}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
