import React from 'react';
import { AlchemicalProtocol, CalibrationState, UserProfile, DailyQuest, SecurityState } from '../types';
import {
  playClickPop,
  playCompletionChime,
  playFullSequenceMasteredSound,
  playQuestClaimSound
} from '../utils/audio';
import {
  triggerHaptic,
  hapticProtocolToggle,
  hapticRewardClaim,
  hapticLightTap
} from '../utils/haptics';
import { getRankByTier, getNextRank, evaluateRankEligibility } from '../data/ranksData';

interface HomeScreenProps {
  protocols: AlchemicalProtocol[];
  onToggleProtocol: (id: string) => void;
  calibration: CalibrationState | null;
  onSelectCalibration: (cal: CalibrationState) => void;
  onEnterFocusChamber: () => void;
  currentUser: UserProfile;
  security: SecurityState;
  dailyQuests: DailyQuest[];
  onClaimQuest: (questId: string) => void;
  onOpenAuth: () => void;
  onOpenStreak: () => void;
  onOpenRanks: () => void;
  onOpenSecurity: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  protocols,
  onToggleProtocol,
  calibration,
  onSelectCalibration,
  onEnterFocusChamber,
  currentUser,
  security,
  dailyQuests,
  onClaimQuest,
  onOpenAuth,
  onOpenStreak,
  onOpenRanks,
  onOpenSecurity
}) => {
  const completedCount = protocols.filter((p) => p.completed).length;
  const totalCount = protocols.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  // Ascension Rank calculations
  const currentRank = getRankByTier(currentUser.rankTier || 1);
  const nextRank = getNextRank(currentUser.rankTier || 1);
  const nextRankEval = nextRank ? evaluateRankEligibility(nextRank, currentUser, security) : null;
  const conditionsMetCount = nextRankEval ? nextRankEval.conditions.filter((c) => c.met).length : 4;
  const totalConditionsCount = nextRankEval ? nextRankEval.conditions.length : 4;

  // XP progress
  const xpPercentage = Math.min(100, Math.round((currentUser.xp / currentUser.nextLevelXp) * 100));

  const handleProtocolClick = (protocol: AlchemicalProtocol) => {
    playClickPop();
    const willBeCompleted = !protocol.completed;

    // Tactile physical vibration reinforcement
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate(willBeCompleted ? [30, 40, 45] : 15);
    } else {
      hapticProtocolToggle(willBeCompleted);
    }

    onToggleProtocol(protocol.id);

    if (willBeCompleted) {
      const willBeAllComplete = completedCount + 1 >= totalCount;
      if (willBeAllComplete) {
        if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
          setTimeout(() => navigator.vibrate([40, 50, 60, 50, 100]), 120);
        }
        setTimeout(() => playFullSequenceMasteredSound(), 100);
      } else {
        setTimeout(() => playCompletionChime(), 50);
      }
    }
  };

  const handleClaimQuestClick = (questId: string) => {
    playQuestClaimSound();
    // Tactile vibration reinforcement for reward claiming
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate([35, 30, 45, 30, 60]);
    } else {
      hapticRewardClaim();
    }
    onClaimQuest(questId);
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Ambient Glow */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-[#00c2e8]/10 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* Guest / Unsaved Journey Banner */}
      {currentUser.isGuest && (
        <div className="w-full mb-4 p-3.5 rounded-2xl bg-gradient-to-r from-[#ca8100]/25 to-[#ffb95f]/15 border-2 border-[#ffb95f]/40 flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2.5">
            <span className="text-[20px]">⚠️</span>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-[#ffb95f] leading-tight">
                Guest Mode: Progress Not Saved
              </span>
              <span className="text-[11px] text-[#cfc2d6]">
                Sign in to back up your streak &amp; relics.
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              playClickPop();
              if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
                navigator.vibrate(15);
              }
              onOpenAuth();
            }}
            className="px-3 py-1.5 rounded-xl btn-3d-amber text-[11px] uppercase tracking-wider whitespace-nowrap cursor-pointer"
          >
            Save Journey
          </button>
        </div>
      )}

      {/* Rank & Security HUD Bar */}
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {/* Ascension Rank Quick Pill Card */}
        <button
          onClick={() => {
            playClickPop();
            if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
              navigator.vibrate(15);
            }
            onOpenRanks();
          }}
          className="p-3 rounded-2xl bg-[#181924] border-2 border-[#b76dff]/30 border-b-4 border-b-[#400071] flex items-center justify-between text-left group hover:border-[#b76dff] transition-all cursor-pointer active:translate-y-0.5"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-2xl">{currentRank.badge}</span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-caps text-[9px] uppercase tracking-wider text-[#ddb7ff] font-bold">
                Tier {currentRank.tier} · {currentRank.name}
              </span>
              <span className="text-[11px] font-bold text-[#e3e1e9] truncate">
                {nextRank ? `Ascending to T${nextRank.tier}` : 'Apex Sovereign'}
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-[#b76dff] group-hover:translate-x-0.5 transition-transform">
            →
          </span>
        </button>

        {/* Aegis Anti-Hacker Shield Card */}
        <button
          onClick={() => {
            playClickPop();
            if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
              navigator.vibrate(15);
            }
            onOpenSecurity();
          }}
          className="p-3 rounded-2xl bg-[#181924] border-2 border-emerald-500/30 border-b-4 border-b-[#052e16] flex items-center justify-between text-left group hover:border-emerald-400 transition-all cursor-pointer active:translate-y-0.5"
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-2xl">🛡️</span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-caps text-[9px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Aegis Shield: {security.securityScore}%
              </span>
              <span className="text-[11px] font-bold text-[#e3e1e9] truncate">
                Anti-Hacker Guard
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-400 group-hover:translate-x-0.5 transition-transform">
            →
          </span>
        </button>
      </div>

      {/* Mascot / Mentor Astra Companion */}
      <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#181924] border-2 border-white/[0.08] border-b-4 border-b-black/40 mb-4 shadow-md">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#00c2e8]/20 to-[#b76dff]/20 border border-white/[0.1] flex items-center justify-center flex-shrink-0 text-[24px] shadow-sm animate-float">
          🦅
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-label-caps text-[9px] uppercase tracking-wider text-[#00c2e8] font-bold">
              Astra · Companion Mentor
            </span>
            <span className="text-[10px] text-[#cfc2d6]">•</span>
            <span className="text-[10px] text-[#ffb95f] font-bold">Rank Tier {currentRank.tier}</span>
          </div>
          <p className="text-[13px] text-[#e3e1e9] font-medium leading-tight mt-0.5">
            {completedCount === totalCount
              ? "Magnificent discipline! Today's ritual sequence is 100% transmuted. All protocols sealed."
              : `You have ${totalCount - completedCount} actions left to complete today's cadence. Keep your ${currentUser.streak}-day streak alive!`}
          </p>
        </div>
      </div>

      {/* Level XP Progress Bar */}
      <div className="w-full bg-[#181924] border-2 border-white/[0.07] border-b-4 border-b-black/40 rounded-2xl p-3.5 mb-5">
        <div className="flex items-center justify-between text-[12px] mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="font-label-caps text-[10px] font-bold text-[#b76dff] uppercase">
              Rank {currentUser.level}
            </span>
            <span className="text-[#cfc2d6]">•</span>
            <span className="font-bold text-[#e3e1e9]">{currentUser.archetype}</span>
          </div>
          <span className="font-mono text-[11px] text-[#00c2e8] font-bold">
            {currentUser.xp} / {currentUser.nextLevelXp} XP ({xpPercentage}%)
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-[#121318] p-0.5 border border-white/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#00c2e8] to-[#b76dff] transition-all duration-700 shadow-[0_0_10px_#00c2e8]"
            style={{ width: `${xpPercentage}%` }}
          />
        </div>
      </div>

      {/* Hero Focus Chamber Card (Tactile 3D) */}
      <div className="relative w-full rounded-3xl bg-[#181924] border-2 border-[#b76dff]/30 border-b-4 border-b-[#400071] p-5 mb-5 overflow-hidden shadow-xl">
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#b76dff]/15 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[14px]">⚡</span>
            <span className="font-label-caps text-[10px] text-[#b76dff] uppercase tracking-widest font-bold">
              Primary Flow Chamber
            </span>
          </div>
          <span className="px-2 py-0.5 rounded-lg bg-[#00c2e8]/15 text-[#00c2e8] font-label-caps text-[9px] uppercase font-bold border border-[#00c2e8]/20">
            +120 XP Reward
          </span>
        </div>

        <h2 className="font-headline-md text-[20px] text-[#e3e1e9] font-bold">
          Deep Work: Architectural Systems
        </h2>
        <p className="font-body-sm text-[13px] text-[#cfc2d6] mt-1 mb-4">
          Uninterrupted theta state session targeting core framework modularity.
        </p>

        {/* 3D Action Catalyst Button */}
        <button
          onClick={() => {
            playClickPop();
            if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
              navigator.vibrate([25, 30, 40]);
            }
            onEnterFocusChamber();
          }}
          className="w-full py-3.5 px-4 rounded-2xl btn-3d-purple text-[13px] uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">play_arrow</span>
          <span>Enter Focus Chamber (90m)</span>
        </button>
      </div>

      {/* Daily Quests Section */}
      <div className="flex flex-col gap-2.5 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[16px]">🎯</span>
            <h3 className="font-headline-sm text-[16px] text-[#e3e1e9] font-bold">
              Daily Quests
            </h3>
          </div>
          <span className="font-label-caps text-[10px] text-[#00c2e8] font-bold uppercase">
            Refreshes in 8h
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {dailyQuests.map((quest) => {
            const isFinished = quest.current >= quest.target;
            const questPercent = Math.min(100, Math.round((quest.current / quest.target) * 100));

            return (
              <div
                key={quest.id}
                className="p-3.5 rounded-2xl bg-[#181924] border-2 border-white/[0.06] border-b-4 border-b-black/30 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-[20px] ${
                      isFinished
                        ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40'
                        : 'bg-white/[0.05] text-[#cfc2d6]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {quest.icon}
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[13px] font-bold text-[#e3e1e9] truncate">
                      {quest.title}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-24 h-2 rounded-full bg-[#121318] overflow-hidden">
                        <div
                          className="h-full bg-[#00c2e8] rounded-full"
                          style={{ width: `${questPercent}%` }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-[#cfc2d6]">
                        {quest.current}/{quest.target}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Claim or Reward Button */}
                <div className="flex-shrink-0">
                  {quest.claimed ? (
                    <span className="px-2.5 py-1 rounded-xl bg-white/[0.05] text-[#988d9f] font-label-caps text-[10px] font-bold">
                      Claimed ✓
                    </span>
                  ) : isFinished ? (
                    <button
                      onClick={() => handleClaimQuestClick(quest.id)}
                      className="px-3 py-1.5 rounded-xl btn-3d-amber text-[11px] uppercase tracking-wider flex items-center gap-1 cursor-pointer animate-wiggle"
                    >
                      <span>🎁</span>
                      <span>Claim</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-[#121318] border border-white/[0.06] text-[#cfc2d6] text-[11px] font-bold">
                      <span>💎</span>
                      <span>+{quest.rewardGems}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Alchemical Protocols Checklist */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[16px]">✨</span>
            <h3 className="font-headline-sm text-[16px] text-[#e3e1e9] font-bold">
              Today's Ritual Sequence
            </h3>
          </div>
          <span className="font-label-caps text-[10px] px-2.5 py-1 rounded-xl bg-[#181924] border border-white/[0.08] text-[#00c2e8] font-bold">
            {completedCount} / {totalCount} Transmuted
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {protocols.map((protocol) => {
            const isCompleted = protocol.completed;
            return (
              <div
                key={protocol.id}
                onClick={() => handleProtocolClick(protocol)}
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer select-none ${
                  isCompleted
                    ? 'bg-[#14151e] border-white/[0.05] border-b-2 opacity-85'
                    : 'bg-[#181924] border-white/[0.08] border-b-4 border-b-black/40 hover:border-[#00c2e8]/40 shadow-sm active:translate-y-1'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Circular status indicator */}
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform ${
                      isCompleted
                        ? 'bg-[#10b981] text-[#022416] shadow-[0_0_10px_#10b981]'
                        : 'bg-[#121318] border-2 border-white/[0.2] text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] font-black">
                      check
                    </span>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-[14px] font-bold truncate transition-colors ${
                        isCompleted
                          ? 'text-[#988d9f] line-through decoration-[#b76dff]/50'
                          : 'text-[#e3e1e9]'
                      }`}
                    >
                      {protocol.title}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className="font-label-caps text-[9px] uppercase tracking-wider font-bold"
                        style={{ color: protocol.categoryColor }}
                      >
                        {protocol.category}
                      </span>
                      <span className="text-[#cfc2d6] text-[10px]">•</span>
                      <span className="text-[11px] text-[#cfc2d6]">
                        {protocol.duration} min
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <span className="font-label-caps text-[9px] uppercase tracking-widest text-[#10b981] px-2 py-1 rounded-lg bg-[#10b981]/15 border border-[#10b981]/30 font-bold">
                      Done
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="px-3 py-1.5 rounded-xl btn-3d-cyan text-[11px] uppercase tracking-wider cursor-pointer"
                    >
                      Engage
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Evening Calibration */}
      <div className="w-full rounded-3xl bg-[#181924] border-2 border-white/[0.08] border-b-4 border-b-black/40 p-5 flex flex-col">
        <div className="flex items-center justify-between mb-1">
          <span className="font-label-caps text-[10px] uppercase text-[#ffb95f] tracking-widest font-bold flex items-center gap-1.5">
            <span>🌙</span> Evening Calibration
          </span>
          <span className="text-[11px] text-[#cfc2d6] font-mono">20:00 Window</span>
        </div>

        <h4 className="font-headline-sm text-[16px] text-[#e3e1e9] font-bold mt-1 mb-1">
          How aligned was your cognitive focus today?
        </h4>
        <p className="font-body-sm text-[12px] text-[#cfc2d6] mb-4">
          Shapes tomorrow’s optimal protocol recommendations.
        </p>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => {
              playClickPop();
              if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
                navigator.vibrate(20);
              }
              onSelectCalibration('scattered');
            }}
            className={`py-3 px-2 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 cursor-pointer ${
              calibration === 'scattered'
                ? 'bg-[#ddb7ff]/20 border-[#ddb7ff] text-[#e3e1e9]'
                : 'bg-[#121318] border-white/[0.08] text-[#cfc2d6] hover:text-white'
            }`}
          >
            <span className="text-[20px]">🌪️</span>
            <span className="font-label-caps text-[10px] font-bold uppercase">
              Scattered
            </span>
          </button>

          <button
            onClick={() => {
              playClickPop();
              if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
                navigator.vibrate(20);
              }
              onSelectCalibration('grounded');
            }}
            className={`py-3 px-2 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 cursor-pointer ${
              calibration === 'grounded'
                ? 'bg-[#00c2e8]/20 border-[#00c2e8] text-[#e3e1e9]'
                : 'bg-[#121318] border-white/[0.08] text-[#cfc2d6] hover:text-white'
            }`}
          >
            <span className="text-[20px]">⚖️</span>
            <span className="font-label-caps text-[10px] font-bold uppercase">
              Grounded
            </span>
          </button>

          <button
            onClick={() => {
              playClickPop();
              if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
                navigator.vibrate(20);
              }
              onSelectCalibration('transcendent');
            }}
            className={`py-3 px-2 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 cursor-pointer ${
              calibration === 'transcendent'
                ? 'bg-[#b76dff]/20 border-[#b76dff] text-[#e3e1e9]'
                : 'bg-[#121318] border-white/[0.08] text-[#cfc2d6] hover:text-white'
            }`}
          >
            <span className="text-[20px]">🌟</span>
            <span className="font-label-caps text-[10px] font-bold uppercase">
              Transcendent
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
