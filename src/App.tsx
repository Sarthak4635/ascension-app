/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  TabType,
  CalibrationState,
  RitualLog,
  CoreObjective,
  UserProfile,
  DailyQuest,
  PathNode,
  SecurityState,
  SecurityEvent
} from './types';
import {
  INITIAL_PROTOCOLS,
  INITIAL_MILESTONES,
  INITIAL_RITUAL_STREAM,
  CORE_OBJECTIVES,
  DEFAULT_USER,
  INITIAL_DAILY_QUESTS,
  MASTERY_PATH_NODES
} from './data/initialData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { GrowthScreen } from './components/GrowthScreen';
import { JourneyScreen } from './components/JourneyScreen';
import { InsightsScreen } from './components/InsightsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { FocusChamberModal } from './components/FocusChamberModal';
import { RetrospectiveModal } from './components/RetrospectiveModal';
import { NewTrajectoryModal } from './components/NewTrajectoryModal';
import { ArtifactModal } from './components/ArtifactModal';
import { NotificationDrawer } from './components/NotificationDrawer';
import { BiometricBreakdownModal } from './components/BiometricBreakdownModal';
import { AuthModal } from './components/AuthModal';
import { StreakModal } from './components/StreakModal';
import { RelicShopModal } from './components/RelicShopModal';
import { RanksModal } from './components/RanksModal';
import { SecurityModal } from './components/SecurityModal';
import {
  playSuccessChime,
  playLevelUpChime,
  playChestOpenChime,
  playCompletionChime,
  playRankPromotionFanfare,
  isAudioMuted,
  toggleAudioMute
} from './utils/audio';
import {
  verifyStateIntegrity,
  certifyAndSaveUser,
  getStoredAuditLog,
  generateUserSignature,
  appendAuditLog
} from './utils/security';
import { getRankByTier } from './data/ranksData';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isMuted, setIsMuted] = useState<boolean>(() => isAudioMuted());

  // Persisted User Profile State (Login Interface & Journey Storage)
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('ascension_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_USER,
          ...parsed,
          rankTier: parsed.rankTier || DEFAULT_USER.rankTier,
          protocolsTransmutedCount: parsed.protocolsTransmutedCount ?? DEFAULT_USER.protocolsTransmutedCount,
          focusHoursCompleted: parsed.focusHoursCompleted ?? DEFAULT_USER.focusHoursCompleted
        };
      }
    } catch {
      // Ignore
    }
    return DEFAULT_USER;
  });

  // Anti-Hacker Aegis Security State
  const [securityState, setSecurityState] = useState<SecurityState>(() => {
    const auditLog = getStoredAuditLog();
    return {
      isShieldActive: true,
      integrityHash: generateUserSignature(currentUser),
      securityScore: 100,
      tamperAttemptsBlocked: 0,
      clockDriftMs: 0.8,
      lastScanTime: 'Just now',
      violationsCount: 0,
      recentEvents: auditLog
    };
  });

  // Daily Quests State
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>(() => {
    try {
      const saved = localStorage.getItem('ascension_daily_quests');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return INITIAL_DAILY_QUESTS;
  });

  // Mastery Path Nodes
  const [pathNodes, setPathNodes] = useState<PathNode[]>(() => {
    try {
      const saved = localStorage.getItem('ascension_path_nodes');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return MASTERY_PATH_NODES;
  });

  const [protocols, setProtocols] = useState(INITIAL_PROTOCOLS);
  const [calibration, setCalibration] = useState<CalibrationState | null>('grounded');
  const [milestones] = useState(INITIAL_MILESTONES);
  const [ritualStream, setRitualStream] = useState(INITIAL_RITUAL_STREAM);
  const [objectives, setObjectives] = useState(CORE_OBJECTIVES);

  // Modals & Drawers
  const [focusChamberOpen, setFocusChamberOpen] = useState(false);
  const [retrospectiveOpen, setRetrospectiveOpen] = useState(false);
  const [trajectoryOpen, setTrajectoryOpen] = useState(false);
  const [artifactOpen, setArtifactOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [streakModalOpen, setStreakModalOpen] = useState(false);
  const [relicShopOpen, setRelicShopOpen] = useState(false);
  const [ranksModalOpen, setRanksModalOpen] = useState(false);
  const [securityModalOpen, setSecurityModalOpen] = useState(false);

  // Global Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  // Check state integrity on load
  useEffect(() => {
    const result = verifyStateIntegrity(currentUser);
    if (!result.isValid) {
      if (result.restoredUser) {
        setCurrentUser(result.restoredUser);
      }
      setSecurityState((prev) => ({
        ...prev,
        tamperAttemptsBlocked: prev.tamperAttemptsBlocked + 1,
        recentEvents: getStoredAuditLog()
      }));
      showToast('🛡️ AEGIS SECURITY: Storage checksum tamper detected & rolled back!');
    } else {
      certifyAndSaveUser(currentUser);
    }
  }, []);

  // Synchronize state with persistent certified storage
  useEffect(() => {
    try {
      certifyAndSaveUser(currentUser);
      setSecurityState((prev) => ({
        ...prev,
        integrityHash: generateUserSignature(currentUser)
      }));
    } catch {
      // Ignore
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('ascension_daily_quests', JSON.stringify(dailyQuests));
    } catch {
      // Ignore
    }
  }, [dailyQuests]);

  useEffect(() => {
    try {
      localStorage.setItem('ascension_path_nodes', JSON.stringify(pathNodes));
    } catch {
      // Ignore
    }
  }, [pathNodes]);

  const handleToggleMuteAudio = () => {
    const nextMuted = toggleAudioMute();
    setIsMuted(nextMuted);
    showToast(nextMuted ? '🔇 Sound effects muted' : '🔊 Sound effects enabled');
  };

  // Gamified XP and Level Award Engine with Rank Multiplier and Value Envelope Guard
  const awardExperienceAndGems = (rawXpGained: number, rawGemsGained: number) => {
    // Memory boundary check: prevent impossible values (e.g. >500 XP or >300 Gems in single award)
    if (rawXpGained > 500 || rawGemsGained > 300) {
      const incident: SecurityEvent = {
        id: `inject-block-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        type: 'INTRUSION_BLOCKED',
        threatLevel: 'critical',
        summary: 'Excessive Value Injection Intercepted',
        details: `Rejected anomalous transaction delta (${rawXpGained} XP, ${rawGemsGained} Gems). Maximum threshold bound.`
      };
      appendAuditLog(incident);
      setSecurityState((prev) => ({
        ...prev,
        tamperAttemptsBlocked: prev.tamperAttemptsBlocked + 1,
        recentEvents: getStoredAuditLog()
      }));
      showToast('🛡️ AEGIS: Injection ceiling exceeded. Transaction intercepted.');
      return;
    }

    setCurrentUser((prev) => {
      // Apply rank bonus multiplier
      const rank = getRankByTier(prev.rankTier || 1);
      const effectiveXpGained = Math.round(rawXpGained * rank.rankBonusXpMultiplier);

      let newXp = prev.xp + effectiveXpGained;
      let newLevel = prev.level;
      let nextThreshold = prev.nextLevelXp;

      if (newXp >= nextThreshold) {
        newLevel += 1;
        newXp = newXp - nextThreshold;
        nextThreshold = Math.round(nextThreshold * 1.25);
        if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
          navigator.vibrate([50, 40, 60, 40, 80, 50, 120]);
        }
        playRankPromotionFanfare();
        showToast(`⚡ LEVEL UP! You ascended to Level ${newLevel} ${prev.archetype}!`);
      }

      const updatedUser: UserProfile = {
        ...prev,
        xp: newXp,
        level: newLevel,
        nextLevelXp: nextThreshold,
        gems: prev.gems + rawGemsGained,
        lastSyncedAt: 'Just now'
      };

      certifyAndSaveUser(updatedUser);
      return updatedUser;
    });
  };

  const handleToggleProtocol = (id: string) => {
    setProtocols((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextCompleted = !p.completed;
          if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
            navigator.vibrate(nextCompleted ? [30, 40, 45] : 15);
          }
          if (nextCompleted) {
            awardExperienceAndGems(50, 15);
            // Increment protocol transmuted count
            setCurrentUser((u) => ({
              ...u,
              protocolsTransmutedCount: (u.protocolsTransmutedCount || 58) + 1
            }));
            // Update quest 1
            setDailyQuests((quests) =>
              quests.map((q) =>
                q.id === 'q1' ? { ...q, current: Math.min(q.target, q.current + 1) } : q
              )
            );
          }
          showToast(
            nextCompleted
              ? `"${p.title}" transmuted! (+50 XP, +15 Gems)`
              : `"${p.title}" reopened for engagement`
          );
          return {
            ...p,
            completed: nextCompleted,
            transmutedAt: nextCompleted
              ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : undefined
          };
        }
        return p;
      })
    );
  };

  const handleSelectCalibration = (cal: CalibrationState) => {
    setCalibration(cal);
    awardExperienceAndGems(25, 10);
    // Complete evening quest
    setDailyQuests((quests) =>
      quests.map((q) => (q.id === 'q3' ? { ...q, current: 1 } : q))
    );
    const messages: Record<CalibrationState, string> = {
      scattered: 'Calibration noted: Tomorrow allocation primed for recovery (+25 XP)',
      grounded: 'Calibration sealed: Equilibrium locked into neural matrix (+25 XP)',
      transcendent: 'Calibration sealed: Peak flow registered across all vectors (+25 XP)'
    };
    showToast(messages[cal]);
  };

  const handleClaimQuest = (questId: string) => {
    setDailyQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId && !q.claimed) {
          if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
            navigator.vibrate([35, 30, 45, 30, 60]);
          }
          awardExperienceAndGems(q.rewardXp, q.rewardGems);
          showToast(`Claimed reward: +${q.rewardGems} Relics & +${q.rewardXp} XP!`);
          return { ...q, claimed: true };
        }
        return q;
      })
    );
  };

  const handleClaimChest = (nodeId: string) => {
    setPathNodes((prev) =>
      prev.map((n) => {
        if (n.id === nodeId && n.status === 'chest') {
          if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
            navigator.vibrate([40, 40, 60, 40, 90]);
          }
          playChestOpenChime();
          awardExperienceAndGems(n.xpReward, n.gemReward);
          showToast(`Relic Chest unlocked: +${n.gemReward} Gems & +${n.xpReward} XP!`);
          return { ...n, status: 'completed' };
        }
        return n;
      })
    );
  };

  const handleStartPathNode = (node: PathNode) => {
    if (node.id === 'path_3') {
      setFocusChamberOpen(true);
    } else {
      playCompletionChime();
      awardExperienceAndGems(node.xpReward, node.gemReward);
      setPathNodes((prev) =>
        prev.map((n) => (n.id === node.id ? { ...n, status: 'completed' } : n))
      );
      showToast(`Mastered "${node.title}"! (+${node.xpReward} XP, +${node.gemReward} 💎)`);
    }
  };

  const handleBuyItem = (cost: number, itemName: string) => {
    setCurrentUser((prev) => {
      const updated = {
        ...prev,
        gems: prev.gems - cost,
        streakShieldActive: itemName.includes('Freeze') ? true : prev.streakShieldActive
      };
      certifyAndSaveUser(updated);
      return updated;
    });
    showToast(`Acquired: ${itemName}!`);
  };

  const handleEquipFreeze = () => {
    if (currentUser.gems >= 100) {
      setCurrentUser((prev) => {
        const updated = {
          ...prev,
          gems: prev.gems - 100,
          streakShieldActive: true
        };
        certifyAndSaveUser(updated);
        return updated;
      });
      showToast('Streak Freeze Shield activated! (Protected for 1 cycle)');
    } else {
      showToast('Insufficient relics to equip freeze shield');
    }
  };

  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    certifyAndSaveUser(user);
  };

  const handlePromoteRank = (newTier: number) => {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate([60, 50, 70, 50, 120]);
    }
    setCurrentUser((prev) => {
      const updated = {
        ...prev,
        rankTier: newTier,
        lastSyncedAt: 'Just now'
      };
      certifyAndSaveUser(updated);
      return updated;
    });
    const rank = getRankByTier(newTier);
    showToast(`👑 ASCENSION ACHIEVED: Elevated to Tier ${newTier} (${rank.name})!`);
  };

  const handleRefreshSecurity = (event?: SecurityEvent) => {
    setSecurityState((prev) => ({
      ...prev,
      tamperAttemptsBlocked: event ? prev.tamperAttemptsBlocked + 1 : prev.tamperAttemptsBlocked,
      recentEvents: getStoredAuditLog(),
      lastScanTime: 'Just now'
    }));
  };

  const handleAddRitual = (newRitual: RitualLog) => {
    setRitualStream((prev) => {
      const todayGroup = prev[0];
      const updatedToday = {
        ...todayGroup,
        rituals: [newRitual, ...todayGroup.rituals]
      };
      return [updatedToday, ...prev.slice(1)];
    });
    awardExperienceAndGems(100, 30);
    showToast(`Inscribed "${newRitual.title}" into permanent ledger (+100 XP)`);
  };

  const handleAddObjective = (newObj: CoreObjective) => {
    setObjectives((prev) => [newObj, ...prev]);
    awardExperienceAndGems(50, 20);
    showToast(`New trajectory defined: "${newObj.title}"`);
  };

  const handleCompleteChamberSession = (durationMinutes: number) => {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate([60, 50, 70, 50, 100]);
    }
    const focusLog: RitualLog = {
      id: 'f_' + Date.now(),
      category: 'Focus',
      categoryColor: '#b76dff',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: durationMinutes,
      title: 'Deep Work: Architectural Systems',
      note: '"Full uninterrupted focus chamber block. Flawless execution."',
      metrics: [{ label: 'Clarity Coefficient', value: '9.9' }],
      isDeepImmersion: true,
      verifiedBadge: true
    };
    handleAddRitual(focusLog);

    // Update focus hours
    setCurrentUser((u) => ({
      ...u,
      focusHoursCompleted: (u.focusHoursCompleted || 142) + Math.round(durationMinutes / 60)
    }));

    // Update quest 2
    setDailyQuests((quests) =>
      quests.map((q) =>
        q.id === 'q2' ? { ...q, current: Math.min(q.target, q.current + durationMinutes) } : q
      )
    );

    // Mark current path node completed
    setPathNodes((prev) =>
      prev.map((n) =>
        n.id === 'path_3' ? { ...n, status: 'completed' } : n
      )
    );

    playCompletionChime();
    showToast('Focus Chamber block sealed & transmuted! (+120 XP)');
  };

  return (
    <div className="min-h-screen bg-[#101118] text-[#e3e1e9] flex flex-col font-sans selection:bg-[#00c2e8]/20 selection:text-[#00c2e8]">
      {/* Duolingo Gamification Persistent Header with Rank, Security, and Audio controls */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenStreak={() => setStreakModalOpen(true)}
        onOpenRelicShop={() => setRelicShopOpen(true)}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenRanks={() => setRanksModalOpen(true)}
        onOpenSecurity={() => setSecurityModalOpen(true)}
        securityScore={securityState.securityScore}
        isMuted={isMuted}
        onToggleMute={handleToggleMuteAudio}
      />

      {/* Main View Container */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pt-20 pb-20 relative">
        {activeTab === 'home' && (
          <HomeScreen
            protocols={protocols}
            onToggleProtocol={handleToggleProtocol}
            calibration={calibration}
            onSelectCalibration={handleSelectCalibration}
            onEnterFocusChamber={() => setFocusChamberOpen(true)}
            currentUser={currentUser}
            security={securityState}
            dailyQuests={dailyQuests}
            onClaimQuest={handleClaimQuest}
            onOpenAuth={() => setAuthModalOpen(true)}
            onOpenStreak={() => setStreakModalOpen(true)}
            onOpenRanks={() => setRanksModalOpen(true)}
            onOpenSecurity={() => setSecurityModalOpen(true)}
          />
        )}

        {activeTab === 'growth' && (
          <GrowthScreen onOpenBreakdown={() => setBreakdownOpen(true)} />
        )}

        {activeTab === 'journey' && (
          <JourneyScreen
            milestones={milestones}
            ritualStream={ritualStream}
            pathNodes={pathNodes}
            onOpenRecordRetrospective={() => setRetrospectiveOpen(true)}
            onStartPathNode={handleStartPathNode}
            onClaimChest={handleClaimChest}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'insights' && <InsightsScreen onShowToast={showToast} />}

        {activeTab === 'profile' && (
          <ProfileScreen
            objectives={objectives}
            onOpenDefineTrajectory={() => setTrajectoryOpen(true)}
            onOpenArtifactExport={() => setArtifactOpen(true)}
            onShowToast={showToast}
            currentUser={currentUser}
            security={securityState}
            onOpenAuth={() => setAuthModalOpen(true)}
            onOpenRanks={() => setRanksModalOpen(true)}
            onOpenSecurity={() => setSecurityModalOpen(true)}
          />
        )}
      </main>

      {/* Persistent Bottom Navigation Bar */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Ascension Ranks & Eligibility Modal */}
      <RanksModal
        isOpen={ranksModalOpen}
        onClose={() => setRanksModalOpen(false)}
        user={currentUser}
        security={securityState}
        onPromoteRank={handlePromoteRank}
      />

      {/* Aegis Anti-Hacker Defense & Cryptographic Security Modal */}
      <SecurityModal
        isOpen={securityModalOpen}
        onClose={() => setSecurityModalOpen(false)}
        user={currentUser}
        security={securityState}
        onUpdateUser={setCurrentUser}
        onRefreshSecurity={handleRefreshSecurity}
      />

      {/* Login & Journey Storage Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onShowToast={showToast}
      />

      {/* Streak Freeze & Calendar Modal */}
      <StreakModal
        isOpen={streakModalOpen}
        onClose={() => setStreakModalOpen(false)}
        user={currentUser}
        onEquipFreeze={handleEquipFreeze}
      />

      {/* Ascension Relic Armory / Shop Modal */}
      <RelicShopModal
        isOpen={relicShopOpen}
        onClose={() => setRelicShopOpen(false)}
        user={currentUser}
        onBuyItem={handleBuyItem}
      />

      {/* Interactive Modals */}
      <FocusChamberModal
        isOpen={focusChamberOpen}
        onClose={() => setFocusChamberOpen(false)}
        onCompleteSession={handleCompleteChamberSession}
      />

      <RetrospectiveModal
        isOpen={retrospectiveOpen}
        onClose={() => setRetrospectiveOpen(false)}
        onAddRitual={handleAddRitual}
      />

      <NewTrajectoryModal
        isOpen={trajectoryOpen}
        onClose={() => setTrajectoryOpen(false)}
        onAddObjective={handleAddObjective}
      />

      <ArtifactModal
        isOpen={artifactOpen}
        onClose={() => setArtifactOpen(false)}
        onShowToast={showToast}
      />

      <NotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        onNavigateToFocus={() => {
          setActiveTab('home');
          setFocusChamberOpen(true);
        }}
      />

      <BiometricBreakdownModal
        isOpen={breakdownOpen}
        onClose={() => setBreakdownOpen(false)}
      />

      {/* System Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#181924]/95 border border-[#00c2e8]/40 text-[#e3e1e9] text-[12px] font-bold shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-xl flex items-center gap-2 max-w-sm text-center animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#00c2e8] shadow-[0_0_8px_#00c2e8]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
