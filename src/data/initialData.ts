import { AlchemicalProtocol, RitualDayGroup, Milestone, GrowthPillar, CoreObjective } from '../types';

export const INITIAL_PROTOCOLS: AlchemicalProtocol[] = [
  {
    id: 'p1',
    title: 'Morning Strength & Mobility',
    category: 'Fitness',
    categoryColor: '#4cd7f6',
    duration: 45,
    completed: true,
    transmutedAt: '07:15 AM'
  },
  {
    id: 'p2',
    title: 'Technical Reading & Philosophy',
    category: 'Knowledge',
    categoryColor: '#ffb95f',
    duration: 30,
    completed: true,
    transmutedAt: '10:30 AM'
  },
  {
    id: 'p3',
    title: 'Strategic Writing',
    category: 'Focus',
    categoryColor: '#ddb7ff',
    duration: 45,
    completed: true,
    transmutedAt: '01:15 PM'
  },
  {
    id: 'p4',
    title: 'Mindful Decompression',
    category: 'Mindset',
    categoryColor: '#4cd7f6',
    duration: 15,
    completed: false
  }
];

export const INITIAL_MILESTONES: Milestone[] = [
  {
    id: 'm1',
    icon: 'trophy',
    date: 'Nov 12',
    title: 'First 100 Hours',
    description: 'Sustained deep work synthesis recorded in uninterrupted flow blocks.',
    rankBadge: '• GILDED ARCANE RANK'
  },
  {
    id: 'm2',
    icon: 'military_tech',
    date: 'Oct 28',
    title: 'The Iron Epoch',
    description: '45 consecutive days without missed physiological calibration.',
    rankBadge: '• ASCENDANT VIGIL'
  },
  {
    id: 'm3',
    icon: 'flare',
    date: 'Sep 15',
    title: 'Cognitive Singularity',
    description: 'Completed 6-hour hyperfocus block on distributed consensus protocols.',
    rankBadge: '• MASTER SYNTHESIST'
  },
  {
    id: 'm4',
    icon: 'diamond',
    date: 'Aug 04',
    title: 'Initiation Rite',
    description: 'Formal inscription into Cohort 01 and baseline bio-telemetry link.',
    rankBadge: '• FOUNDING ARCHON'
  }
];

export const INITIAL_RITUAL_STREAM: RitualDayGroup[] = [
  {
    dayLabel: 'CYCLE TODAY',
    rituals: [
      {
        id: 'r1',
        category: 'Fitness',
        categoryColor: '#4cd7f6',
        time: '07:15 AM',
        duration: 52,
        title: 'Morning Strength & Hypertrophy',
        note: '"High intensity, peak output recorded."',
        metrics: [
          { label: 'Peak Load', value: '84%', icon: 'bolt' },
          { label: '', value: '148 avg bpm', icon: 'favorite' }
        ]
      },
      {
        id: 'r2',
        category: 'Knowledge',
        categoryColor: '#ddb7ff',
        time: '10:30 AM',
        duration: 40,
        title: 'Distributed Systems Synthesis',
        note: '"High cognitive flow, completed chapter 4."',
        metrics: [],
        isDeepImmersion: true
      }
    ]
  },
  {
    dayLabel: 'YESTERDAY',
    rituals: [
      {
        id: 'r3',
        category: 'Focus',
        categoryColor: '#ddb7ff',
        time: '08:00 AM',
        duration: 90,
        title: 'Deep Flow Architecture',
        note: '"Full uninterrupted session. Flawless execution."',
        metrics: [
          { label: 'Clarity Coefficient', value: '9.8' }
        ],
        verifiedBadge: true
      },
      {
        id: 'r4',
        category: 'Mindset',
        categoryColor: '#ffb95f',
        time: '09:30 PM',
        duration: 20,
        title: 'Mindset & Stoic Reflection',
        note: '"Clear headed, reset for tomorrow."',
        metrics: []
      }
    ]
  },
  {
    dayLabel: '3 DAYS AGO',
    rituals: [
      {
        id: 'r5',
        category: 'Fitness',
        categoryColor: '#4cd7f6',
        time: '06:45 AM',
        duration: 45,
        title: 'Endurance Tempo Run',
        note: '"Zone 4 pacing maintained."',
        metrics: [
          { label: 'Cadence', value: '172 spm' },
          { label: 'Distance', value: '7.4 km' }
        ]
      }
    ]
  }
];

export const GROWTH_PILLARS: GrowthPillar[] = [
  {
    id: 'gp1',
    name: 'Fitness & Physical',
    percentage: 88,
    delta: 12,
    colorClass: 'bg-[#4cd7f6]',
    glowColor: '#4cd7f6'
  },
  {
    id: 'gp2',
    name: 'Focus & Deep Flow',
    percentage: 84,
    delta: 7,
    colorClass: 'bg-[#4cd7f6]',
    glowColor: '#4cd7f6'
  },
  {
    id: 'gp3',
    name: 'Knowledge & Synthesis',
    percentage: 91,
    delta: 18,
    colorClass: 'bg-[#ddb7ff]',
    glowColor: '#ddb7ff'
  },
  {
    id: 'gp4',
    name: 'Discipline & Consistency',
    percentage: 79,
    delta: 9,
    colorClass: 'bg-[#ffb95f]',
    glowColor: '#ffb95f'
  },
  {
    id: 'gp5',
    name: 'Mindset & Resilience',
    percentage: 70,
    delta: 4,
    colorClass: 'bg-[#a855f7]',
    glowColor: '#a855f7'
  }
];

export const CORE_OBJECTIVES: CoreObjective[] = [
  {
    id: 'co1',
    categoryTag: 'COGNITIVE SYNTHESIS',
    targetDate: 'Target: Q1 2025',
    progress: 74,
    title: 'Complete Distributed Systems Mastery',
    tags: ['Technical Reading', 'Deep Work'],
    color: '#ddb7ff'
  },
  {
    id: 'co2',
    categoryTag: 'PHYSICAL ALCHEMY',
    targetDate: 'Target: Summer 2025',
    progress: 62,
    title: 'Sub-20 Min 5K & 100kg Bench Press',
    tags: ['Strength & Mobility', 'Zone 2 Aerobic'],
    color: '#4cd7f6'
  },
  {
    id: 'co3',
    categoryTag: 'INTERIOR HARMONY',
    targetDate: 'Continuous Discipline',
    progress: 85,
    title: 'Master Daily Mindful Equilibrium',
    tags: ['Vipassana Sit', 'Evening Reflection'],
    color: '#ffb95f'
  }
];

export const TIMEFRAME_DATA: Record<string, { trajectory: number; delta: string; points: number[] }> = {
  'Week': { trajectory: 79, delta: '+8% vs 7d', points: [40, 52, 60, 68, 71, 75, 79] },
  'Month': { trajectory: 82, delta: '+14% vs 30d', points: [32, 38, 48, 59, 65, 74, 82] },
  '3 Mos': { trajectory: 89, delta: '+26% vs 90d', points: [22, 35, 50, 64, 73, 81, 89] },
  'All Time': { trajectory: 94, delta: '+45% vs baseline', points: [15, 28, 44, 60, 72, 85, 94] }
};

export const DEFAULT_USER = {
  id: 'usr_alex',
  name: 'Alex Mercer',
  email: 'alex.mercer@ascension.io',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5eIzVdVExWJ5ubfdY-8txyKaAzihGgXpvH_VBZ2JQzZA-0BrEu7kHIyp_uOXqKpitjWyfqQVoXj0k4eomAGDXAv67w2TEhiv54QmZtvrYRogF3L04Ipq31FfaCH3QiPBnNayosVrTgvINkvYPuYDrhkV60bMGsaamOsUTKybwefSMqABqLaWJBiVaYDMiNKuTVHay6Tc3ZBHp_cmu_NFQpMDPgsztkWCNi7Lgd0HrcZvbgns6s_4',
  archetype: 'Systems Architect',
  level: 14,
  xp: 3450,
  nextLevelXp: 4000,
  streak: 27,
  streakShieldActive: true,
  gems: 1420,
  hearts: 5,
  maxHearts: 5,
  isGuest: false,
  lastSyncedAt: 'Just now',
  rankTier: 4,
  protocolsTransmutedCount: 58,
  focusHoursCompleted: 142
};

export const DEMO_USERS = [
  DEFAULT_USER,
  {
    id: 'usr_elena',
    name: 'Elena Vance',
    email: 'elena.vance@ascension.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    archetype: 'Neural Bio-Engineer',
    level: 19,
    xp: 5120,
    nextLevelXp: 6000,
    streak: 42,
    streakShieldActive: true,
    gems: 2890,
    hearts: 5,
    maxHearts: 5,
    isGuest: false,
    lastSyncedAt: '2m ago',
    rankTier: 5,
    protocolsTransmutedCount: 110,
    focusHoursCompleted: 215
  },
  {
    id: 'usr_marcus',
    name: 'Marcus Chen',
    email: 'marcus.chen@ascension.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    archetype: 'Endurance Adept',
    level: 9,
    xp: 1800,
    nextLevelXp: 2500,
    streak: 15,
    streakShieldActive: false,
    gems: 840,
    hearts: 4,
    maxHearts: 5,
    isGuest: false,
    lastSyncedAt: '1h ago',
    rankTier: 3,
    protocolsTransmutedCount: 38,
    focusHoursCompleted: 65
  }
];

export const INITIAL_DAILY_QUESTS = [
  {
    id: 'q1',
    title: 'Transmute 3 Protocols',
    current: 3,
    target: 4,
    unit: 'done',
    rewardGems: 40,
    rewardXp: 75,
    claimed: false,
    icon: 'task_alt'
  },
  {
    id: 'q2',
    title: 'Enter Focus Chamber',
    current: 45,
    target: 45,
    unit: 'min',
    rewardGems: 60,
    rewardXp: 120,
    claimed: false,
    icon: 'timer'
  },
  {
    id: 'q3',
    title: 'Daily Evening Alignment',
    current: 1,
    target: 1,
    unit: 'done',
    rewardGems: 30,
    rewardXp: 50,
    claimed: false,
    icon: 'nights_stay'
  }
];

export const MASTERY_PATH_NODES = [
  {
    id: 'path_1',
    title: 'Dawn Initialization',
    subtitle: 'Cortisol Awakening & Hydration',
    status: 'completed' as const,
    type: 'lesson' as const,
    level: 1,
    xpReward: 50,
    gemReward: 15,
    icon: 'wb_sunny',
    xOffset: 0
  },
  {
    id: 'path_2',
    title: 'Neural Mobility & Tension',
    subtitle: 'Fascial decompression routine',
    status: 'completed' as const,
    type: 'lesson' as const,
    level: 2,
    xpReward: 70,
    gemReward: 20,
    icon: 'fitness_center',
    xOffset: 28
  },
  {
    id: 'path_3',
    title: 'Deep Work: Core Architecture',
    subtitle: '90m Single-task hyperfocus block',
    status: 'current' as const,
    type: 'lesson' as const,
    level: 3,
    xpReward: 120,
    gemReward: 35,
    icon: 'terminal',
    xOffset: -22
  },
  {
    id: 'path_chest_1',
    title: 'Celestial Relic Chest',
    subtitle: 'Unlock for bonus gems & focus booster',
    status: 'chest' as const,
    type: 'chest' as const,
    level: 3,
    xpReward: 100,
    gemReward: 75,
    icon: 'redeem',
    xOffset: 0
  },
  {
    id: 'path_4',
    title: 'Stoic Cognitive Processing',
    subtitle: 'Reframing stressors & friction',
    status: 'locked' as const,
    type: 'lesson' as const,
    level: 4,
    xpReward: 80,
    gemReward: 25,
    icon: 'psychology',
    xOffset: -28
  },
  {
    id: 'path_5',
    title: 'Zone 2 Metabolic Engine',
    subtitle: '45m Steady-state aerobic cadence',
    status: 'locked' as const,
    type: 'lesson' as const,
    level: 5,
    xpReward: 90,
    gemReward: 30,
    icon: 'directions_run',
    xOffset: 24
  },
  {
    id: 'path_gate_1',
    title: 'The Iron Epoch Trial',
    subtitle: '30-Day consecutive ritual verification',
    status: 'locked' as const,
    type: 'boss' as const,
    level: 6,
    xpReward: 300,
    gemReward: 150,
    icon: 'military_tech',
    xOffset: 0
  }
];

