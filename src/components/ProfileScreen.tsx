import React, { useState } from 'react';
import { CoreObjective, UserProfile, SecurityState } from '../types';
import { playClickPop, playSuccessChime } from '../utils/audio';
import { getRankByTier } from '../data/ranksData';

interface ProfileScreenProps {
  objectives: CoreObjective[];
  onOpenDefineTrajectory: () => void;
  onOpenArtifactExport: () => void;
  onShowToast: (msg: string) => void;
  currentUser: UserProfile;
  security: SecurityState;
  onOpenAuth: () => void;
  onOpenRanks: () => void;
  onOpenSecurity: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  objectives,
  onOpenDefineTrajectory,
  onOpenArtifactExport,
  onShowToast,
  currentUser,
  security,
  onOpenAuth,
  onOpenRanks,
  onOpenSecurity
}) => {
  const [biometricSync, setBiometricSync] = useState(true);
  const currentRank = getRankByTier(currentUser.rankTier || 1);

  const handleToggleBiometrics = () => {
    playClickPop();
    setBiometricSync(!biometricSync);
    onShowToast(
      biometricSync
        ? 'Biometric telemetry paused'
        : 'Apple Health, Whoop & Oura telemetry linked & synchronized'
    );
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Ambient Glow */}
      <div className="fixed top-16 left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-[#00c2e8]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Profile Identity Card */}
      <div className="pt-2 pb-5 flex flex-col items-center text-center">
        {/* Avatar with concentric ring */}
        <div className="relative mb-3 flex items-center justify-center">
          <div className="p-1 rounded-full bg-gradient-to-tr from-[#00c2e8] via-[#b76dff] to-[#ffb95f] shadow-[0_0_24px_rgba(0,194,232,0.35)]">
            <img
              alt={currentUser.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-[#121318]"
              src={currentUser.avatar}
            />
          </div>
          <span className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-[#10b981] border-2 border-[#121318] shadow-[0_0_8px_#10b981]" />
        </div>

        {/* Level & Rank Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181924] border border-white/[0.08] mb-2 shadow-sm">
          <span>{currentRank.badge}</span>
          <span className="font-label-caps text-[10px] text-[#00c2e8] tracking-widest uppercase font-bold">
            Tier {currentRank.tier} · {currentRank.name}
          </span>
        </div>

        {/* User Name */}
        <h1 className="font-headline-lg text-[28px] text-[#e3e1e9] font-bold tracking-tight">
          {currentUser.name}
        </h1>
        <p className="text-[12px] text-[#cfc2d6] font-mono mt-0.5">
          {currentUser.email}
        </p>

        {/* Account Sync & Storage Controller */}
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => {
              playClickPop();
              onOpenAuth();
            }}
            className="px-4 py-2 rounded-xl btn-3d-cyan text-[11px] uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">sync_saved_locally</span>
            <span>{currentUser.isGuest ? 'Sign In & Save Journey' : 'Manage Account & Sync'}</span>
          </button>
        </div>
      </div>

      {/* Ascension Rank & Anti-Hacker Security Banners */}
      <div className="flex flex-col gap-2.5 mb-5">
        {/* Rank Tier Banner */}
        <div className="p-4 rounded-2xl bg-[#181924] border-2 border-[#b76dff]/30 border-b-4 border-b-[#400071] flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#b76dff]/15 border border-[#b76dff]/30 flex items-center justify-center text-2xl">
              {currentRank.badge}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-caps text-[9px] uppercase tracking-wider text-[#b76dff] font-bold">
                  Ascension Hierarchy
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#b76dff]/20 text-[#ddb7ff]">
                  {currentRank.rankBonusXpMultiplier}x XP
                </span>
              </div>
              <h3 className="font-headline-sm text-[16px] text-[#e3e1e9] font-bold">
                Tier {currentRank.tier}: {currentRank.name}
              </h3>
              <p className="text-[11px] text-[#cfc2d6]">
                {currentRank.title}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playClickPop();
              onOpenRanks();
            }}
            className="px-3 py-1.5 rounded-xl btn-3d-purple text-[11px] uppercase tracking-wider cursor-pointer"
          >
            Ladder →
          </button>
        </div>

        {/* Aegis Anti-Hacker Shield Banner */}
        <div className="p-4 rounded-2xl bg-[#181924] border-2 border-emerald-500/30 border-b-4 border-b-[#052e16] flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl text-emerald-400">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-caps text-[9px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Aegis Cryptographic Shield
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-emerald-500/20 text-emerald-400">
                  {security.securityScore}%
                </span>
              </div>
              <h3 className="font-headline-sm text-[15px] text-[#e3e1e9] font-bold">
                Anti-Hacker Integrity
              </h3>
              <p className="text-[11px] text-[#cfc2d6]">
                {security.tamperAttemptsBlocked} exploit attempts blocked & neutralized
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playClickPop();
              onOpenSecurity();
            }}
            className="px-3 py-1.5 rounded-xl btn-3d-dark text-[11px] uppercase tracking-wider cursor-pointer text-emerald-400 border border-emerald-500/30"
          >
            Inspect →
          </button>
        </div>
      </div>

      {/* Duolingo-style 4-Stat Bento Grid */}
      <div className="grid grid-cols-2 gap-2.5 mb-6">
        <div className="p-4 rounded-2xl bg-[#181924] border-2 border-white/[0.06] border-b-4 border-b-black/40 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-caps text-[9px] uppercase text-[#cfc2d6] font-bold">
              Streak Momentum
            </span>
            <span className="text-[16px]">🔥</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-headline-lg text-[28px] text-[#ffb95f] font-bold leading-none">
              {currentUser.streak}
            </span>
            <span className="text-[12px] text-[#cfc2d6]">days</span>
          </div>
          <span className="text-[11px] text-[#10b981] font-bold mt-1">
            Protected with Freeze
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#181924] border-2 border-white/[0.06] border-b-4 border-b-black/40 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-caps text-[9px] uppercase text-[#cfc2d6] font-bold">
              Stored Relics
            </span>
            <span className="text-[16px]">💎</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-headline-lg text-[28px] text-[#00c2e8] font-bold leading-none">
              {currentUser.gems}
            </span>
          </div>
          <span className="text-[11px] text-[#00c2e8] font-bold mt-1">
            Ascension Currency
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#181924] border-2 border-white/[0.06] border-b-4 border-b-black/40 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-caps text-[9px] uppercase text-[#cfc2d6] font-bold">
              Total XP Earned
            </span>
            <span className="text-[16px]">⚡</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-headline-lg text-[28px] text-[#b76dff] font-bold leading-none">
              {currentUser.xp}
            </span>
            <span className="text-[12px] text-[#cfc2d6]">XP</span>
          </div>
          <span className="text-[11px] text-[#b76dff] font-bold mt-1">
            Level {currentUser.level} Tier
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#181924] border-2 border-white/[0.06] border-b-4 border-b-black/40 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-label-caps text-[9px] uppercase text-[#cfc2d6] font-bold">
              Deep Work Log
            </span>
            <span className="text-[16px]">⏱️</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-headline-lg text-[28px] text-[#e3e1e9] font-bold leading-none">
              {currentUser.focusHoursCompleted || 142}
            </span>
            <span className="text-[12px] text-[#cfc2d6]">hours</span>
          </div>
          <span className="text-[11px] text-[#10b981] font-bold mt-1">
            Top 5% Cohort
          </span>
        </div>
      </div>

      {/* Core Objectives */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[16px]">🎯</span>
            <h3 className="font-headline-sm text-[16px] text-[#e3e1e9] font-bold">
              Active Trajectories
            </h3>
          </div>
          <span className="font-label-caps text-[10px] text-[#00c2e8] font-bold">
            {objectives.length} In Progress
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {objectives.map((obj) => (
            <div
              key={obj.id}
              className="w-full p-4 rounded-2xl bg-[#181924] border-2 border-white/[0.07] border-b-4 border-b-black/40 flex flex-col gap-2 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span
                  className="font-label-caps text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-lg bg-[#121318]"
                  style={{ color: obj.color }}
                >
                  {obj.categoryTag}
                </span>
                <span className="font-mono text-[12px] font-bold text-[#e3e1e9]">
                  {obj.progress}%
                </span>
              </div>

              <h4 className="font-headline-sm text-[15px] text-[#e3e1e9] font-bold">
                {obj.title}
              </h4>

              {/* Progress track */}
              <div className="w-full h-2 rounded-full bg-[#121318] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${obj.progress}%`,
                    backgroundColor: obj.color,
                    boxShadow: `0 0 8px ${obj.color}`
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            playClickPop();
            onOpenDefineTrajectory();
          }}
          className="w-full py-3 px-4 rounded-2xl btn-3d-dark text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer mt-1"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Define New Trajectory</span>
        </button>
      </div>

      {/* Shareable Practitioner Artifact Card */}
      <div className="w-full rounded-3xl bg-gradient-to-b from-[#181924] to-[#101118] p-5 border-2 border-white/[0.08] border-b-4 border-b-black/50 mb-6 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <span className="text-[18px]">📜</span>
            <span className="font-label-caps text-[10px] text-[#00c2e8] uppercase font-bold tracking-wider">
              Cryptographic Practitioner Dossier
            </span>
          </div>
          <span className="text-[10px] text-[#cfc2d6] font-mono">CY-2026</span>
        </div>

        <div className="text-center">
          <h3 className="font-headline-lg text-[22px] text-[#e3e1e9] font-bold">
            {currentUser.name}
          </h3>
          <span className="text-[12px] text-[#b76dff] font-bold">
            {currentUser.archetype} · Tier {currentRank.tier} {currentRank.name}
          </span>
        </div>

        <button
          onClick={() => {
            playClickPop();
            onOpenArtifactExport();
          }}
          className="w-full py-3.5 px-4 rounded-2xl btn-3d-purple text-[12px] uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">ios_share</span>
          <span>Export Shareable Codex Card</span>
        </button>
      </div>

      {/* System Preferences */}
      <div className="flex flex-col gap-2.5">
        <h3 className="font-headline-sm text-[16px] text-[#e3e1e9] font-bold">
          System Preferences
        </h3>

        <div className="flex flex-col rounded-2xl bg-[#181924] border-2 border-white/[0.06] divide-y divide-white/[0.04] overflow-hidden">
          {/* Biometrics */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[20px]">🧬</span>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#e3e1e9]">
                  Biometric Telemetry Link
                </span>
                <span className="text-[11px] text-[#cfc2d6]">
                  Apple Health, Whoop &amp; Oura
                </span>
              </div>
            </div>
            <button
              onClick={handleToggleBiometrics}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
                biometricSync ? 'bg-[#00c2e8]' : 'bg-[#34343a]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  biometricSync ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Cloud Journey Backup */}
          <button
            onClick={() => {
              playClickPop();
              onOpenAuth();
            }}
            className="p-3.5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-[20px]">☁️</span>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold text-[#e3e1e9]">
                  Cloud &amp; Local Journey Storage
                </span>
                <span className="text-[11px] text-[#cfc2d6]">
                  Last synced: {currentUser.lastSyncedAt}
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-[#cfc2d6]">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
