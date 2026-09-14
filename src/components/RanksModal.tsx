import React, { useState } from 'react';
import { UserProfile, SecurityState, AscensionRank } from '../types';
import { ASCENSION_RANKS, evaluateRankEligibility, getRankByTier, getNextRank } from '../data/ranksData';
import { playRankPromotionFanfare, playClickPop } from '../utils/audio';

interface RanksModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  security: SecurityState;
  onPromoteRank: (newTier: number) => void;
}

export const RanksModal: React.FC<RanksModalProps> = ({
  isOpen,
  onClose,
  user,
  security,
  onPromoteRank
}) => {
  const currentRank = getRankByTier(user.rankTier || 1);
  const nextRank = getNextRank(user.rankTier || 1);
  const [selectedTier, setSelectedTier] = useState<number>(nextRank ? nextRank.tier : currentRank.tier);
  const [promotedSuccess, setPromotedSuccess] = useState<AscensionRank | null>(null);

  if (!isOpen) return null;

  const currentEval = evaluateRankEligibility(currentRank, user, security);
  const selectedRank = getRankByTier(selectedTier);
  const selectedEval = evaluateRankEligibility(selectedRank, user, security);

  const handleAscend = (rank: AscensionRank) => {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate([60, 50, 70, 50, 120]);
    }
    playRankPromotionFanfare();
    onPromoteRank(rank.tier);
    setPromotedSuccess(rank);
    setTimeout(() => {
      setPromotedSuccess(null);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#090a0f]/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] rounded-3xl bg-[#121318] border border-[#ddb7ff]/25 p-5 sm:p-7 flex flex-col shadow-2xl overflow-hidden">
        {/* Ambient Top Glow */}
        <div
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full blur-[100px] pointer-events-none opacity-40"
          style={{ backgroundColor: selectedRank.color }}
        />

        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg border"
              style={{
                backgroundColor: currentRank.accentBg,
                borderColor: currentRank.borderColor,
                boxShadow: `0 0 20px ${currentRank.glowColor}`
              }}
            >
              {currentRank.badge}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-label-caps text-[10px] uppercase tracking-[0.2em] text-[#cfc2d6]">
                  Ascension Hierarchy · Tier {currentRank.tier} of 6
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/[0.06] text-[#e3e1e9]">
                  {currentRank.rankBonusXpMultiplier}x XP
                </span>
              </div>
              <h2 className="font-headline-md text-xl sm:text-2xl text-[#e3e1e9] font-bold flex items-center gap-2">
                {currentRank.name}
                <span className="text-sm font-normal text-[#ddb7ff]">({currentRank.title})</span>
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              playClickPop();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-[#1e1f25] hover:bg-[#292a2f] text-[#cfc2d6] hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Celebration Banner if recently promoted */}
        {promotedSuccess && (
          <div className="relative z-10 mb-4 p-4 rounded-2xl bg-gradient-to-r from-[#b76dff]/30 to-[#4cd7f6]/30 border border-[#4cd7f6] text-center animate-bounce">
            <span className="text-2xl mr-2">🌟</span>
            <span className="text-[#e3e1e9] font-bold text-sm">
              ASCENSION ATTAINED! You have been elevated to Tier {promotedSuccess.tier}: {promotedSuccess.name}!
            </span>
          </div>
        )}

        {/* Scrollable Rank Cards Area */}
        <div className="relative z-10 flex-1 overflow-y-auto pr-1 space-y-4">
          {/* Rank Stepper Selector */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {ASCENSION_RANKS.map((rank) => {
              const isSelected = selectedTier === rank.tier;
              const isCurrent = user.rankTier === rank.tier;
              const isUnlocked = (user.rankTier || 1) >= rank.tier;

              return (
                <button
                  key={rank.id}
                  onClick={() => {
                    playClickPop();
                    setSelectedTier(rank.tier);
                  }}
                  className={`relative p-2.5 rounded-xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-white/40 bg-white/[0.08] shadow-lg scale-102'
                      : isUnlocked
                      ? 'border-white/[0.1] bg-[#1a1b21] hover:bg-white/[0.04]'
                      : 'border-white/[0.04] bg-[#14151a]/60 opacity-60 hover:opacity-80'
                  }`}
                  style={{
                    borderColor: isSelected ? rank.color : undefined
                  }}
                >
                  {isCurrent && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded-full bg-[#4cd7f6] text-[#090a0f] text-[8px] font-black uppercase tracking-wider">
                      ACTIVE
                    </span>
                  )}
                  <span className="text-xl mb-1">{rank.badge}</span>
                  <span className="text-[11px] font-bold text-[#e3e1e9] truncate w-full">
                    {rank.name}
                  </span>
                  <span className="text-[9px] text-[#cfc2d6]">Tier {rank.tier}</span>
                </button>
              );
            })}
          </div>

          {/* Selected Rank Focus Panel */}
          <div
            className="rounded-2xl p-5 border transition-all"
            style={{
              backgroundColor: selectedRank.accentBg,
              borderColor: selectedRank.borderColor
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-white/[0.08]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="font-label-caps text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-md"
                    style={{ backgroundColor: selectedRank.borderColor, color: selectedRank.color }}
                  >
                    Tier {selectedRank.tier} Codex
                  </span>
                  <span className="text-xs text-[#cfc2d6] italic font-medium">
                    "{selectedRank.title}"
                  </span>
                </div>
                <h3 className="font-headline-md text-xl font-bold text-[#e3e1e9]">
                  {selectedRank.name}
                </h3>
                <p className="text-xs text-[#cfc2d6] mt-1 max-w-md">
                  {selectedRank.description}
                </p>
              </div>

              {/* Status or Promotion Action */}
              <div className="flex flex-col items-end">
                {selectedEval.isCurrent ? (
                  <span className="px-3 py-1.5 rounded-xl bg-white/[0.1] text-[#4cd7f6] font-bold text-xs border border-[#4cd7f6]/40 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse" />
                    CURRENT RANK
                  </span>
                ) : selectedEval.isUnlocked ? (
                  <span className="px-3 py-1.5 rounded-xl bg-white/[0.05] text-[#cfc2d6] font-semibold text-xs border border-white/10">
                    MASTERED & UNLOCKED
                  </span>
                ) : selectedEval.isEligibleForPromotion ? (
                  <button
                    onClick={() => handleAscend(selectedRank)}
                    className="btn-3d-cyan py-2.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg animate-pulse"
                  >
                    <span>⚡</span>
                    CLAIM ASCENSION PROMOTION
                  </button>
                ) : (
                  <span className="px-3 py-1.5 rounded-xl bg-white/[0.04] text-[#8e9099] font-medium text-xs border border-white/[0.06] flex items-center gap-1.5">
                    <span>🔒</span>
                    CONDITIONS PENDING
                  </span>
                )}
              </div>
            </div>

            {/* Eligibility Conditions Grid */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-caps text-[11px] uppercase tracking-wider font-bold text-[#e3e1e9]">
                  Eligibility Criteria & Verification
                </span>
                <span className="text-[11px] text-[#cfc2d6]">
                  {selectedEval.conditions.filter((c) => c.met).length} of {selectedEval.conditions.length} Satisfied
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedEval.conditions.map((cond, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex flex-col justify-between ${
                      cond.met
                        ? 'bg-emerald-500/[0.07] border-emerald-500/30'
                        : 'bg-[#14151a] border-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-[#e3e1e9]">
                        {cond.label}
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          cond.met ? 'text-emerald-400' : 'text-[#cfc2d6]'
                        }`}
                      >
                        {cond.met ? '✓ Satisfied' : `${cond.current} / ${cond.required} ${cond.unit}`}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          cond.met ? 'bg-emerald-400' : 'bg-[#b76dff]'
                        }`}
                        style={{ width: `${cond.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Cryptographic Security Integrity Requirement */}
              {selectedRank.requiresSecurityIntegrity && (
                <div
                  className={`mt-2.5 p-3 rounded-xl border flex items-center justify-between ${
                    selectedEval.securityIntegrityMet
                      ? 'bg-[#4cd7f6]/[0.08] border-[#4cd7f6]/30'
                      : 'bg-rose-500/[0.1] border-rose-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">🛡️</span>
                    <div>
                      <div className="text-xs font-bold text-[#e3e1e9]">
                        Cryptographic Aegis Integrity
                      </div>
                      <div className="text-[10px] text-[#cfc2d6]">
                        Requires 100% untampered ledger hash & zero security violations
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      selectedEval.securityIntegrityMet ? 'text-[#4cd7f6]' : 'text-rose-400'
                    }`}
                  >
                    {selectedEval.securityIntegrityMet ? '✓ Certified Untampered' : 'Violations Detected'}
                  </span>
                </div>
              )}
            </div>

            {/* Unlocked Privileges / Perks */}
            <div>
              <span className="font-label-caps text-[11px] uppercase tracking-wider font-bold text-[#e3e1e9] block mb-2">
                Tier Privileges & Multipliers
              </span>
              <div className="space-y-1.5">
                {selectedRank.perks.map((perk, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-xs text-[#cfc2d6] bg-black/20 p-2 rounded-lg"
                  >
                    <span className="text-[#ddb7ff] font-bold">◆</span>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="relative z-10 pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#cfc2d6]">
          <span>
            Current Multiplier: <strong className="text-[#4cd7f6]">{currentRank.rankBonusXpMultiplier}x XP</strong>
          </span>
          <button
            onClick={() => {
              playClickPop();
              onClose();
            }}
            className="py-2 px-4 rounded-xl bg-[#1e1f25] hover:bg-[#292a2f] text-[#e3e1e9] font-semibold cursor-pointer transition-colors"
          >
            Close Ladder
          </button>
        </div>
      </div>
    </div>
  );
};
