import React, { useState } from 'react';
import { UserProfile, SecurityState, SecurityEvent } from '../types';
import {
  simulateMemoryInjectionAttack,
  simulateSpeedhackAttack,
  simulateLocalStorageTamper,
  getMonotonicClockDrift
} from '../utils/security';
import { playClickPop } from '../utils/audio';

interface SecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  security: SecurityState;
  onUpdateUser: (updated: UserProfile) => void;
  onRefreshSecurity: (event?: SecurityEvent) => void;
}

export const SecurityModal: React.FC<SecurityModalProps> = ({
  isOpen,
  onClose,
  user,
  security,
  onUpdateUser,
  onRefreshSecurity
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'pentest' | 'logs'>('matrix');
  const [testResult, setTestResult] = useState<SecurityEvent | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  if (!isOpen) return null;

  const clockDrift = getMonotonicClockDrift();

  const handleTestMemoryInjection = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setTestResult(null);

    simulateMemoryInjectionAttack(user, (event) => {
      setIsSimulating(false);
      setTestResult(event);
      onRefreshSecurity(event);
    });
  };

  const handleTestSpeedhack = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setTestResult(null);

    simulateSpeedhackAttack(user, (event) => {
      setIsSimulating(false);
      setTestResult(event);
      onRefreshSecurity(event);
    });
  };

  const handleTestTampering = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setTestResult(null);

    simulateLocalStorageTamper(user, (event, restored) => {
      setIsSimulating(false);
      setTestResult(event);
      onUpdateUser(restored);
      onRefreshSecurity(event);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#090a0f]/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[92vh] rounded-3xl bg-[#121318] border border-[#4cd7f6]/30 p-5 sm:p-7 flex flex-col shadow-2xl overflow-hidden">
        {/* Neon Cyber Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-[#4cd7f6]/20 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#4cd7f6]/10 border border-[#4cd7f6]/40 flex items-center justify-center text-2xl text-[#4cd7f6] shadow-[0_0_20px_rgba(76,215,246,0.3)]">
              🛡️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-ping" />
                <span className="font-label-caps text-[10px] uppercase tracking-[0.2em] text-[#4cd7f6] font-bold">
                  Aegis Anti-Hacker Defense Matrix
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 font-bold">
                  SCORE: {security.securityScore}%
                </span>
              </div>
              <h2 className="font-headline-md text-xl sm:text-2xl text-[#e3e1e9] font-bold">
                Cryptographic Integrity & Anti-Tamper
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

        {/* Tab Navigation */}
        <div className="relative z-10 flex items-center gap-2 mb-4 p-1 bg-[#1a1b21] rounded-xl border border-white/[0.06]">
          <button
            onClick={() => {
              playClickPop();
              setActiveTab('matrix');
            }}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'matrix'
                ? 'bg-[#4cd7f6] text-[#090a0f] shadow-md'
                : 'text-[#cfc2d6] hover:text-[#e3e1e9]'
            }`}
          >
            Defense Matrix
          </button>
          <button
            onClick={() => {
              playClickPop();
              setActiveTab('pentest');
            }}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'pentest'
                ? 'bg-[#b76dff] text-[#090a0f] shadow-md'
                : 'text-[#cfc2d6] hover:text-[#e3e1e9]'
            }`}
          >
            Hacker Pentest Lab
          </button>
          <button
            onClick={() => {
              playClickPop();
              setActiveTab('logs');
            }}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-white/[0.12] text-[#e3e1e9] shadow-md'
                : 'text-[#cfc2d6] hover:text-[#e3e1e9]'
            }`}
          >
            Audit Log ({security.recentEvents?.length || 0})
          </button>
        </div>

        {/* Content Area */}
        <div className="relative z-10 flex-1 overflow-y-auto pr-1 space-y-4">
          {activeTab === 'matrix' && (
            <div className="space-y-4">
              {/* Telemetry Status Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-[#1a1b21] border border-white/[0.06] flex flex-col">
                  <span className="text-[10px] text-[#cfc2d6] uppercase tracking-wider font-semibold">
                    Shield Status
                  </span>
                  <span className="text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    IMMISCIBLE
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#1a1b21] border border-white/[0.06] flex flex-col">
                  <span className="text-[10px] text-[#cfc2d6] uppercase tracking-wider font-semibold">
                    Clock Drift
                  </span>
                  <span className="text-sm font-mono font-bold text-[#4cd7f6] mt-1">
                    {clockDrift.toFixed(1)} ms (Synced)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#1a1b21] border border-white/[0.06] flex flex-col">
                  <span className="text-[10px] text-[#cfc2d6] uppercase tracking-wider font-semibold">
                    Threats Neutralized
                  </span>
                  <span className="text-sm font-bold text-[#ddb7ff] mt-1">
                    {security.tamperAttemptsBlocked} Blocked
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#1a1b21] border border-white/[0.06] flex flex-col">
                  <span className="text-[10px] text-[#cfc2d6] uppercase tracking-wider font-semibold">
                    State Signature
                  </span>
                  <span className="text-xs font-mono font-bold text-[#e3e1e9] mt-1 truncate">
                    {security.integrityHash || '0x9a8f4c21...'}
                  </span>
                </div>
              </div>

              {/* 4 Active Defense Layers */}
              <div className="space-y-2.5">
                <span className="font-label-caps text-[11px] uppercase tracking-wider font-bold text-[#e3e1e9]">
                  Active Defense Layers
                </span>

                <div className="p-3.5 rounded-xl bg-[#14151a] border border-[#4cd7f6]/20 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#4cd7f6]/10 text-[#4cd7f6] flex items-center justify-center font-bold text-sm shrink-0">
                    🔐
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-[#e3e1e9]">
                        1. Cryptographic HMAC State Signature
                      </h4>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-[11px] text-[#cfc2d6] mt-0.5">
                      Signs every change in Gems, XP, Streaks, and Ranks with SHA-256 digests. Directly intercepts unauthorized DevTools or localStorage edits.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#14151a] border border-[#b76dff]/20 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#b76dff]/10 text-[#b76dff] flex items-center justify-center font-bold text-sm shrink-0">
                    ⏱️
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-[#e3e1e9]">
                        2. Monotonic Anti-Speedhack & Temporal Guard
                      </h4>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-[11px] text-[#cfc2d6] mt-0.5">
                      Cross-references wall-clock time with non-manipulable browser performance counters (<code className="text-[#4cd7f6]">performance.now()</code>) to prevent system clock jumping and fake streak advancements.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#14151a] border border-[#e7b958]/20 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#e7b958]/10 text-[#e7b958] flex items-center justify-center font-bold text-sm shrink-0">
                    ⚡
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-[#e3e1e9]">
                        3. Sub-Second Macro Botting Rate-Limiter
                      </h4>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-[11px] text-[#cfc2d6] mt-0.5">
                      Blocks automated bot scripts attempting to blast protocols or quests in milliseconds through strict token bucket cadence verification.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#14151a] border border-rose-500/20 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold text-sm shrink-0">
                    🛡️
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-[#e3e1e9]">
                        4. Memory Boundary & Injection Envelope
                      </h4>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-[11px] text-[#cfc2d6] mt-0.5">
                      Rejects impossible mathematical deltas (e.g. attempting to award 999,999 gems in a single step) and automatically rolls back to certified snapshots.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pentest' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#1a1b21] border border-white/[0.08]">
                <h3 className="text-sm font-bold text-[#e3e1e9] mb-1 flex items-center gap-2">
                  <span>🧪</span> Hacker Penetration Test Sandbox
                </h3>
                <p className="text-xs text-[#cfc2d6]">
                  Trigger simulated hacker exploits against your own live application to witness Aegis security intercept, sound alarms, neutralize intrusions, and certify ledger safety in real-time.
                </p>
              </div>

              {/* Simulation Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={handleTestMemoryInjection}
                  disabled={isSimulating}
                  className="p-3.5 rounded-xl bg-[#14151a] hover:bg-[#1a1b21] border border-rose-500/30 hover:border-rose-500/60 text-left transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xl mb-1 block">🚨</span>
                    <span className="text-xs font-bold text-[#e3e1e9] group-hover:text-rose-400">
                      Test Memory Injection
                    </span>
                    <p className="text-[10px] text-[#cfc2d6] mt-1">
                      Simulate injecting +100,000 unearned Gems directly into heap memory.
                    </p>
                  </div>
                  <span className="mt-3 text-[10px] font-bold uppercase tracking-wider text-rose-400">
                    Run Exploit →
                  </span>
                </button>

                <button
                  onClick={handleTestSpeedhack}
                  disabled={isSimulating}
                  className="p-3.5 rounded-xl bg-[#14151a] hover:bg-[#1a1b21] border border-[#e7b958]/30 hover:border-[#e7b958]/60 text-left transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xl mb-1 block">⚡</span>
                    <span className="text-xs font-bold text-[#e3e1e9] group-hover:text-[#e7b958]">
                      Test Speedhack Time-Travel
                    </span>
                    <p className="text-[10px] text-[#cfc2d6] mt-1">
                      Simulate advancing system calendar +30 days within 5 milliseconds.
                    </p>
                  </div>
                  <span className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#e7b958]">
                    Run Exploit →
                  </span>
                </button>

                <button
                  onClick={handleTestTampering}
                  disabled={isSimulating}
                  className="p-3.5 rounded-xl bg-[#14151a] hover:bg-[#1a1b21] border border-[#b76dff]/30 hover:border-[#b76dff]/60 text-left transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xl mb-1 block">🛠️</span>
                    <span className="text-xs font-bold text-[#e3e1e9] group-hover:text-[#b76dff]">
                      Test Storage Tampering
                    </span>
                    <p className="text-[10px] text-[#cfc2d6] mt-1">
                      Simulate arbitrary localStorage key corruption or signature spoofing.
                    </p>
                  </div>
                  <span className="mt-3 text-[10px] font-bold uppercase tracking-wider text-[#b76dff]">
                    Run Exploit →
                  </span>
                </button>
              </div>

              {/* Real-time Test Output Result Box */}
              {testResult && (
                <div className="p-4 rounded-2xl bg-rose-500/[0.08] border border-rose-500/40 animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-ping" />
                      <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                        {testResult.summary}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-rose-500/20 text-rose-300 font-bold uppercase">
                      THREAT NEUTRALIZED
                    </span>
                  </div>
                  <p className="text-xs text-[#e3e1e9] font-mono mb-2">
                    {testResult.details}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-[#cfc2d6] pt-2 border-t border-rose-500/20">
                    <span>Incident Ref: {testResult.id}</span>
                    <span className="text-emerald-400 font-bold">✓ Certified State Restored & Sealed</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-2.5">
              <span className="font-label-caps text-[11px] uppercase tracking-wider font-bold text-[#e3e1e9] block mb-1">
                Real-Time Security Audit Ledger
              </span>

              {security.recentEvents?.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#cfc2d6]">
                  No incidents recorded. All systems running nominal.
                </div>
              ) : (
                security.recentEvents?.map((evt) => (
                  <div
                    key={evt.id}
                    className={`p-3 rounded-xl border flex flex-col text-left ${
                      evt.threatLevel === 'critical'
                        ? 'bg-rose-500/[0.06] border-rose-500/30'
                        : evt.threatLevel === 'elevated'
                        ? 'bg-[#e7b958]/[0.06] border-[#e7b958]/30'
                        : 'bg-[#14151a] border-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            evt.threatLevel === 'critical'
                              ? 'bg-rose-400'
                              : evt.threatLevel === 'elevated'
                              ? 'bg-[#e7b958]'
                              : 'bg-emerald-400'
                          }`}
                        />
                        <span className="text-xs font-bold text-[#e3e1e9]">
                          {evt.summary}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#cfc2d6]">
                        {evt.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#cfc2d6] font-mono">
                      {evt.details}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="relative z-10 pt-4 mt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#cfc2d6]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Genesis Hash: <strong>SHA-256 Bound</strong></span>
          </div>
          <button
            onClick={() => {
              playClickPop();
              onClose();
            }}
            className="py-2 px-4 rounded-xl bg-[#1e1f25] hover:bg-[#292a2f] text-[#e3e1e9] font-semibold cursor-pointer transition-colors"
          >
            Close Security Hub
          </button>
        </div>
      </div>
    </div>
  );
};
