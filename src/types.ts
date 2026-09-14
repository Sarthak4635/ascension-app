export type TabType = 'home' | 'growth' | 'journey' | 'insights' | 'profile';

export type Timeframe = 'Week' | 'Month' | '3 Mos' | 'All Time';

export type CalibrationState = 'scattered' | 'grounded' | 'transcendent';

export interface AlchemicalProtocol {
  id: string;
  title: string;
  category: 'Fitness' | 'Knowledge' | 'Focus' | 'Mindset';
  categoryColor: string;
  duration: number; // in minutes
  completed: boolean;
  transmutedAt?: string;
}

export interface RitualLog {
  id: string;
  category: 'Fitness' | 'Knowledge' | 'Focus' | 'Mindset';
  categoryColor: string;
  time: string;
  duration: number; // in minutes
  title: string;
  note: string;
  metrics: {
    label: string;
    value: string;
    icon?: string;
  }[];
  isDeepImmersion?: boolean;
  verifiedBadge?: boolean;
}

export interface RitualDayGroup {
  dayLabel: string;
  rituals: RitualLog[];
}

export interface Milestone {
  id: string;
  icon: string;
  date: string;
  title: string;
  description: string;
  rankBadge: string;
}

export interface GrowthPillar {
  id: string;
  name: string;
  percentage: number;
  delta: number;
  colorClass: string;
  glowColor: string;
}

export interface CoreObjective {
  id: string;
  categoryTag: string;
  targetDate: string;
  progress: number;
  title: string;
  tags: string[];
  color: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  archetype: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  streak: number;
  streakShieldActive: boolean;
  gems: number;
  hearts: number;
  maxHearts: number;
  isGuest: boolean;
  lastSyncedAt: string;
  rankTier: number; // 1 to 6
  protocolsTransmutedCount: number;
  focusHoursCompleted: number;
}

export interface AscensionRank {
  id: string;
  tier: number;
  name: string;
  title: string;
  badge: string;
  color: string;
  glowColor: string;
  accentBg: string;
  borderColor: string;
  minLevel: number;
  minStreakDays: number;
  minFocusHours: number;
  minProtocolsTransmuted: number;
  requiresSecurityIntegrity: boolean;
  description: string;
  perks: string[];
  rankBonusXpMultiplier: number;
}

export interface SecurityEvent {
  id: string;
  timestamp: string;
  type: 'VERIFICATION_PASSED' | 'INTRUSION_BLOCKED' | 'TIME_DRIFT_FLAGGED' | 'MEM_TAMPER_ROLLEDBACK' | 'RATE_LIMIT_ENGAGED';
  threatLevel: 'nominal' | 'elevated' | 'critical';
  summary: string;
  details: string;
}

export interface SecurityState {
  isShieldActive: boolean;
  integrityHash: string;
  securityScore: number; // 0-100%
  tamperAttemptsBlocked: number;
  clockDriftMs: number;
  lastScanTime: string;
  violationsCount: number;
  recentEvents: SecurityEvent[];
}

export interface DailyQuest {
  id: string;
  title: string;
  current: number;
  target: number;
  unit?: string;
  rewardGems: number;
  rewardXp: number;
  claimed: boolean;
  icon: string;
}

export interface PathNode {
  id: string;
  title: string;
  subtitle: string;
  status: 'completed' | 'current' | 'locked' | 'chest';
  type: 'lesson' | 'checkpoint' | 'chest' | 'boss';
  level: number;
  xpReward: number;
  gemReward: number;
  icon: string;
  xOffset: number; // percentage offset from center: -35 to 35
}

