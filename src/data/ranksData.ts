import { AscensionRank, UserProfile, SecurityState } from '../types';

export const ASCENSION_RANKS: AscensionRank[] = [
  {
    id: 'rank-tier-1',
    tier: 1,
    name: 'Initiate',
    title: 'Novice Practitioner',
    badge: '🌿',
    color: '#98dfb6',
    glowColor: 'rgba(152, 223, 182, 0.35)',
    accentBg: 'rgba(152, 223, 182, 0.1)',
    borderColor: 'rgba(152, 223, 182, 0.25)',
    minLevel: 1,
    minStreakDays: 0,
    minFocusHours: 0,
    minProtocolsTransmuted: 0,
    requiresSecurityIntegrity: false,
    description: 'The foundation of ritual discipline. Stepping across the threshold into intentional consciousness.',
    perks: [
      'Standard 1.0x XP multiplier',
      'Daily Protocol tracking & ledger sync',
      'Basic bio-rhythm metrics view'
    ],
    rankBonusXpMultiplier: 1.0
  },
  {
    id: 'rank-tier-2',
    tier: 2,
    name: 'Sentinel',
    title: 'Neophyte Guardian',
    badge: '🛡️',
    color: '#4cd7f6',
    glowColor: 'rgba(76, 215, 246, 0.35)',
    accentBg: 'rgba(76, 215, 246, 0.1)',
    borderColor: 'rgba(76, 215, 246, 0.25)',
    minLevel: 5,
    minStreakDays: 3,
    minFocusHours: 2,
    minProtocolsTransmuted: 5,
    requiresSecurityIntegrity: false,
    description: 'Proven constancy in initial protocols. The guardian protects cadence against chaos.',
    perks: [
      '+5% XP Boost on all completions (1.05x)',
      'Unlocked Relic Armory & store exchange',
      'Bronze Ledger Seal on journey timeline'
    ],
    rankBonusXpMultiplier: 1.05
  },
  {
    id: 'rank-tier-3',
    tier: 3,
    name: 'Equilibrium Adept',
    title: 'Cadence Keeper',
    badge: '⚖️',
    color: '#e7b958',
    glowColor: 'rgba(231, 185, 88, 0.35)',
    accentBg: 'rgba(231, 185, 88, 0.1)',
    borderColor: 'rgba(231, 185, 88, 0.25)',
    minLevel: 10,
    minStreakDays: 7,
    minFocusHours: 10,
    minProtocolsTransmuted: 20,
    requiresSecurityIntegrity: false,
    description: 'Equanimity attained across weekly cycles. Harmony between somatic rest and cognitive focus.',
    perks: [
      '+10% XP Boost on all completions (1.10x)',
      '1 Free Weekly Streak Freeze automatically replenished',
      'Silver Ledger Seal & Biometric deep breakdowns'
    ],
    rankBonusXpMultiplier: 1.10
  },
  {
    id: 'rank-tier-4',
    tier: 4,
    name: 'Systems Architect',
    title: 'Neural Engineer',
    badge: '⚡',
    color: '#b76dff',
    glowColor: 'rgba(183, 109, 255, 0.4)',
    accentBg: 'rgba(183, 109, 255, 0.12)',
    borderColor: 'rgba(183, 109, 255, 0.3)',
    minLevel: 14,
    minStreakDays: 21,
    minFocusHours: 30,
    minProtocolsTransmuted: 50,
    requiresSecurityIntegrity: true,
    description: 'Mastery over personal operating systems. Habit loops run autonomously with crystalline clarity.',
    perks: [
      '+15% XP Boost on all completions (1.15x)',
      'Custom Trajectory & Archetype Blueprint creation',
      'Gold Ledger Seal & High-Theta Focus Chamber access',
      'Cryptographic Ledger Tamper-Proofing'
    ],
    rankBonusXpMultiplier: 1.15
  },
  {
    id: 'rank-tier-5',
    tier: 5,
    name: 'Aether Sovereign',
    title: 'Flow State Titan',
    badge: '👑',
    color: '#ff7bf0',
    glowColor: 'rgba(255, 123, 240, 0.45)',
    accentBg: 'rgba(255, 123, 240, 0.12)',
    borderColor: 'rgba(255, 123, 240, 0.35)',
    minLevel: 20,
    minStreakDays: 45,
    minFocusHours: 75,
    minProtocolsTransmuted: 120,
    requiresSecurityIntegrity: true,
    description: 'Supreme command over intentional attention. Deep work flows effortlessly without friction.',
    perks: [
      '+25% XP Boost on all completions (1.25x)',
      'Obsidian Holographic Profile Aura',
      'Astral Soundscapes & Binaural 40Hz Gamma Presets',
      'Double Relic drops on weekend sessions'
    ],
    rankBonusXpMultiplier: 1.25
  },
  {
    id: 'rank-tier-6',
    tier: 6,
    name: 'Celestial Ascendant',
    title: 'Enlightened Sovereign',
    badge: '🌌',
    color: '#ffc107',
    glowColor: 'rgba(255, 193, 7, 0.5)',
    accentBg: 'rgba(255, 193, 7, 0.15)',
    borderColor: 'rgba(255, 193, 7, 0.4)',
    minLevel: 30,
    minStreakDays: 90,
    minFocusHours: 150,
    minProtocolsTransmuted: 250,
    requiresSecurityIntegrity: true,
    description: 'The mythic apex of human potential. A rare convergence of unbroken discipline, deep intellect, and serenity.',
    perks: [
      '+50% Mythic XP Boost (1.50x)',
      'Permanent Double Relic Armory capacity',
      'Mythic Celestial Halo UI effect',
      'Direct Astra AI Companion channel',
      'Genesis Ledger Key & Cryptographic Immortality'
    ],
    rankBonusXpMultiplier: 1.50
  }
];

export interface ConditionProgress {
  label: string;
  current: number;
  required: number;
  unit: string;
  met: boolean;
  percent: number;
}

export interface RankEvaluation {
  rank: AscensionRank;
  isCurrent: boolean;
  isUnlocked: boolean;
  isEligibleForPromotion: boolean;
  conditions: ConditionProgress[];
  allConditionsMet: boolean;
  securityIntegrityMet: boolean;
}

export function evaluateRankEligibility(
  rank: AscensionRank,
  user: UserProfile,
  security?: SecurityState
): RankEvaluation {
  const isCurrent = user.rankTier === rank.tier;
  const isUnlocked = user.rankTier >= rank.tier;

  const levelProgress: ConditionProgress = {
    label: 'Practitioner Level',
    current: user.level,
    required: rank.minLevel,
    unit: 'Lvl',
    met: user.level >= rank.minLevel,
    percent: Math.min(100, Math.round((user.level / (rank.minLevel || 1)) * 100))
  };

  const streakProgress: ConditionProgress = {
    label: 'Consecutive Streak',
    current: user.streak,
    required: rank.minStreakDays,
    unit: 'Days',
    met: user.streak >= rank.minStreakDays,
    percent: rank.minStreakDays === 0 ? 100 : Math.min(100, Math.round((user.streak / rank.minStreakDays) * 100))
  };

  const focusHours = user.focusHoursCompleted ?? 142; // default 142 if not tracked
  const focusProgress: ConditionProgress = {
    label: 'Deep Focus Chamber',
    current: focusHours,
    required: rank.minFocusHours,
    unit: 'Hours',
    met: focusHours >= rank.minFocusHours,
    percent: rank.minFocusHours === 0 ? 100 : Math.min(100, Math.round((focusHours / rank.minFocusHours) * 100))
  };

  const protocolsCount = user.protocolsTransmutedCount ?? 58; // default 58 if not tracked
  const protocolsProgress: ConditionProgress = {
    label: 'Transmuted Protocols',
    current: protocolsCount,
    required: rank.minProtocolsTransmuted,
    unit: 'Protocols',
    met: protocolsCount >= rank.minProtocolsTransmuted,
    percent: rank.minProtocolsTransmuted === 0 ? 100 : Math.min(100, Math.round((protocolsCount / rank.minProtocolsTransmuted) * 100))
  };

  const securityIntegrityMet = !rank.requiresSecurityIntegrity || (security ? security.securityScore >= 90 && security.violationsCount === 0 : true);

  const conditions = [levelProgress, streakProgress, focusProgress, protocolsProgress];
  const allConditionsMet = conditions.every((c) => c.met) && securityIntegrityMet;
  const isEligibleForPromotion = allConditionsMet && user.rankTier < rank.tier;

  return {
    rank,
    isCurrent,
    isUnlocked,
    isEligibleForPromotion,
    conditions,
    allConditionsMet,
    securityIntegrityMet
  };
}

export function getRankByTier(tier: number): AscensionRank {
  const found = ASCENSION_RANKS.find((r) => r.tier === tier);
  return found || ASCENSION_RANKS[0];
}

export function getNextRank(currentTier: number): AscensionRank | null {
  return ASCENSION_RANKS.find((r) => r.tier === currentTier + 1) || null;
}
