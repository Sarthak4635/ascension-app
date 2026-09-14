import React, { useState } from 'react';
import { RitualDayGroup, Milestone, PathNode, UserProfile } from '../types';
import { playClickPop, playSuccessChime, playChestOpenChime } from '../utils/audio';

interface JourneyScreenProps {
  milestones: Milestone[];
  ritualStream: RitualDayGroup[];
  pathNodes: PathNode[];
  onOpenRecordRetrospective: () => void;
  onStartPathNode: (node: PathNode) => void;
  onClaimChest: (nodeId: string) => void;
  currentUser: UserProfile;
}

export const JourneyScreen: React.FC<JourneyScreenProps> = ({
  milestones,
  ritualStream,
  pathNodes,
  onOpenRecordRetrospective,
  onStartPathNode,
  onClaimChest,
  currentUser
}) => {
  const [viewMode, setViewMode] = useState<'path' | 'timeline'>('path');
  const [selectedNode, setSelectedNode] = useState<PathNode | null>(null);

  const handleNodeClick = (node: PathNode) => {
    playClickPop();
    if (node.type === 'chest' && node.status === 'chest') {
      playChestOpenChime();
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        navigator.vibrate([40, 40, 60, 40, 90]);
      }
      onClaimChest(node.id);
      return;
    }
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate(15);
    }
    setSelectedNode(node);
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Ambient Glow */}
      <div className="fixed top-16 left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-[#b76dff]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header & View Switcher */}
      <div className="pt-2 pb-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-[10px] uppercase text-[#00c2e8] tracking-widest font-bold flex items-center gap-1.5">
            <span>🗺️</span> Section 1 · Cognitive Foundations
          </span>
          <span className="font-label-caps text-[10px] text-[#ffb95f] font-bold">
            🔥 {currentUser.streak}d Streak
          </span>
        </div>

        <h1 className="font-headline-lg text-[28px] text-[#e3e1e9] font-bold tracking-tight">
          The Ascension Path
        </h1>

        {/* Duolingo Mode Switcher (Path vs Timeline) */}
        <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-[#181924] border-2 border-white/[0.07] border-b-4 border-b-black/30 mt-1">
          <button
            onClick={() => {
              playClickPop();
              setViewMode('path');
            }}
            className={`py-2 px-3 rounded-xl text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              viewMode === 'path'
                ? 'bg-[#00c2e8] text-[#031c26] shadow-md'
                : 'text-[#cfc2d6] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">route</span>
            <span>Mastery Path</span>
          </button>
          <button
            onClick={() => {
              playClickPop();
              setViewMode('timeline');
            }}
            className={`py-2 px-3 rounded-xl text-[12px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              viewMode === 'timeline'
                ? 'bg-[#b76dff] text-[#130424] shadow-md'
                : 'text-[#cfc2d6] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">history_edu</span>
            <span>Ledger Timeline</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: DUOLINGO-STYLE WINDING STEPPING-STONE PATH */}
      {viewMode === 'path' && (
        <div className="flex flex-col items-center relative py-4">
          {/* Path Header Banner */}
          <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#00c2e8]/20 via-[#181924] to-[#b76dff]/20 border-2 border-white/[0.08] border-b-4 border-b-black/40 mb-8 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#e3e1e9]">
                Unit 1: The Sovereign Mind
              </span>
              <span className="text-[11px] text-[#cfc2d6]">
                Master core flow routines and stress calibration
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#00c2e8]/20 flex items-center justify-center text-[20px]">
              👑
            </div>
          </div>

          {/* Stepping Stones Vertical Flow */}
          <div className="relative flex flex-col items-center gap-8 w-full max-w-xs my-2">
            {pathNodes.map((node, idx) => {
              const isCompleted = node.status === 'completed';
              const isCurrent = node.status === 'current';
              const isChest = node.type === 'chest';
              const isLocked = node.status === 'locked';

              return (
                <div
                  key={node.id}
                  className="relative flex flex-col items-center"
                  style={{ transform: `translateX(${node.xOffset}px)` }}
                >
                  {/* Floating 'START HERE' Pill on Current Node (Duolingo signature) */}
                  {isCurrent && (
                    <div className="absolute -top-9 z-20 px-3 py-1 rounded-full bg-[#ffb95f] text-[#261400] font-headline-sm text-[11px] font-extrabold uppercase tracking-wider shadow-[0_4px_12px_rgba(255,185,95,0.4)] animate-bounce flex items-center gap-1 whitespace-nowrap">
                      <span>👑</span>
                      <span>CURRENT FOCUS</span>
                    </div>
                  )}

                  {/* Circular 3D Stepping Stone Button */}
                  <button
                    onClick={() => handleNodeClick(node)}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer select-none group ${
                      isCompleted
                        ? 'bg-[#10b981] border-b-6 border-[#047857] text-[#022416] shadow-[0_6px_20px_rgba(16,185,129,0.35)] active:border-b-0 active:translate-y-1.5'
                        : isCurrent
                        ? 'bg-[#00c2e8] border-b-6 border-[#008ba8] text-[#031c26] shadow-[0_0_24px_rgba(0,194,232,0.5)] ring-4 ring-[#00c2e8]/30 active:border-b-0 active:translate-y-1.5'
                        : isChest
                        ? 'bg-[#ffb95f] border-b-6 border-[#c97c14] text-[#261400] shadow-[0_6px_20px_rgba(255,185,95,0.35)] active:border-b-0 active:translate-y-1.5 animate-wiggle'
                        : 'bg-[#252634] border-b-6 border-[#161722] text-[#6b6678] opacity-75 cursor-not-allowed'
                    }`}
                  >
                    {/* Inner Icon */}
                    <span className="material-symbols-outlined text-[32px] font-bold transition-transform group-hover:scale-110">
                      {node.icon}
                    </span>

                    {/* Checkmark crown on completed */}
                    {isCompleted && (
                      <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#f59e0b] border-2 border-[#121318] flex items-center justify-center text-[12px] font-black text-[#241200] shadow-sm">
                        ✓
                      </span>
                    )}

                    {isLocked && (
                      <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#121318] border border-white/[0.1] flex items-center justify-center text-[12px]">
                        🔒
                      </span>
                    )}
                  </button>

                  {/* Node Label Below */}
                  <div className="flex flex-col items-center mt-2 text-center max-w-[130px]">
                    <span
                      className={`text-[12px] font-bold leading-tight ${
                        isCurrent
                          ? 'text-[#00c2e8]'
                          : isCompleted
                          ? 'text-[#e3e1e9]'
                          : 'text-[#988d9f]'
                      }`}
                    >
                      {node.title}
                    </span>
                    <span className="text-[10px] text-[#cfc2d6] line-clamp-1 mt-0.5">
                      +{node.xpReward} XP
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Duolingo-style Node Preview Modal / Popup */}
          {selectedNode && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
              onClick={() => setSelectedNode(null)}
            >
              <div
                className="w-full max-w-sm bg-[#181924] border-2 border-white/[0.08] border-b-4 border-b-black/60 rounded-3xl p-6 shadow-2xl flex flex-col text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-[32px] bg-[#00c2e8]/20 text-[#00c2e8] border border-[#00c2e8]/40 shadow-md">
                  <span className="material-symbols-outlined text-[34px]">
                    {selectedNode.icon}
                  </span>
                </div>

                <span className="font-label-caps text-[10px] uppercase tracking-wider text-[#ffb95f] font-bold">
                  Stage {selectedNode.level} · {selectedNode.type.toUpperCase()}
                </span>
                <h3 className="font-headline-md text-[20px] text-[#e3e1e9] font-bold mt-1">
                  {selectedNode.title}
                </h3>
                <p className="text-[13px] text-[#cfc2d6] mt-1 mb-4">
                  {selectedNode.subtitle}
                </p>

                {/* Reward breakdown */}
                <div className="flex items-center justify-center gap-4 p-3 rounded-2xl bg-[#121318] border border-white/[0.06] mb-5">
                  <div className="flex items-center gap-1 text-[#ddb7ff] font-bold text-[13px]">
                    <span>⚡</span>
                    <span>+{selectedNode.xpReward} XP</span>
                  </div>
                  <div className="h-4 w-[1px] bg-white/[0.1]" />
                  <div className="flex items-center gap-1 text-[#00c2e8] font-bold text-[13px]">
                    <span>💎</span>
                    <span>+{selectedNode.gemReward} Relics</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    playSuccessChime();
                    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
                      navigator.vibrate([30, 40, 45]);
                    }
                    onStartPathNode(selectedNode);
                    setSelectedNode(null);
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl btn-3d-cyan text-[13px] uppercase tracking-widest cursor-pointer mb-2"
                >
                  {selectedNode.status === 'completed'
                    ? 'Revisit Session'
                    : 'Start Ritual Session'}
                </button>

                <button
                  onClick={() => setSelectedNode(null)}
                  className="w-full py-2.5 text-[12px] text-[#cfc2d6] hover:text-white font-bold cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: CHRONICLE / TIMELINE STREAM */}
      {viewMode === 'timeline' && (
        <div className="flex flex-col gap-6 my-2">
          {/* Telemetry Numbers */}
          <div className="w-full bg-[#181924] border-2 border-white/[0.06] border-b-4 border-b-black/40 rounded-3xl p-4 grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center">
              <span className="font-headline-lg text-[28px] text-[#00c2e8] font-bold">
                142
              </span>
              <span className="font-label-caps text-[9px] uppercase tracking-wider text-[#cfc2d6] font-bold mt-0.5">
                Hours In Flow
              </span>
            </div>
            <div className="flex flex-col items-center border-x border-white/[0.08]">
              <span className="font-headline-lg text-[28px] text-[#ffb95f] font-bold">
                {currentUser.streak}
              </span>
              <span className="font-label-caps text-[9px] uppercase tracking-wider text-[#cfc2d6] font-bold mt-0.5">
                Day Streak
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-headline-lg text-[28px] text-[#b76dff] font-bold">
                {milestones.length}
              </span>
              <span className="font-label-caps text-[9px] uppercase tracking-wider text-[#cfc2d6] font-bold mt-0.5">
                Key Relics
              </span>
            </div>
          </div>

          {/* Transformation Milestones (Duolingo Badges) */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-[16px] text-[#e3e1e9] font-bold">
                Sealed Milestones
              </h3>
              <span className="font-label-caps text-[10px] text-[#cfc2d6]">
                Scroll →
              </span>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scroll-smooth">
              {milestones.map((m) => (
                <div
                  key={m.id}
                  className="flex-shrink-0 w-[260px] rounded-2xl bg-[#181924] border-2 border-white/[0.07] border-b-4 border-b-black/40 p-4 relative overflow-hidden flex flex-col justify-between shadow-md"
                >
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-10 h-10 rounded-xl bg-[#ffb95f]/20 border border-[#ffb95f]/40 flex items-center justify-center text-[#ffb95f] text-[20px]">
                        🏆
                      </div>
                      <span className="text-[11px] text-[#cfc2d6] font-mono">
                        {m.date}
                      </span>
                    </div>
                    <h4 className="font-headline-sm text-[15px] text-[#e3e1e9] font-bold">
                      {m.title}
                    </h4>
                    <p className="text-[12px] text-[#cfc2d6] mt-1 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/[0.06]">
                    <span className="font-label-caps text-[9px] uppercase tracking-wider text-[#ffb95f] font-bold">
                      {m.rankBadge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ritual Stream List */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-[16px] text-[#e3e1e9] font-bold">
                Historical Ritual Stream
              </h3>
              <span className="font-label-caps text-[10px] text-[#00c2e8] font-bold">
                Cloud Synchronized
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {ritualStream.map((group) => (
                <div key={group.dayLabel} className="flex flex-col gap-2">
                  <span className="font-label-caps text-[10px] text-[#ffb95f] uppercase tracking-widest font-bold">
                    {group.dayLabel}
                  </span>
                  <div className="flex flex-col gap-2">
                    {group.rituals.map((ritual) => (
                      <div
                        key={ritual.id}
                        className="p-3.5 rounded-2xl bg-[#181924] border-2 border-white/[0.06] border-b-4 border-b-black/30 flex flex-col gap-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span
                              className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[#121318]"
                              style={{ color: ritual.categoryColor }}
                            >
                              {ritual.category}
                            </span>
                            <span className="text-[11px] text-[#cfc2d6]">
                              {ritual.time}
                            </span>
                          </div>
                          <span className="text-[11px] text-[#cfc2d6] font-mono font-bold">
                            {ritual.duration}m
                          </span>
                        </div>
                        <span className="text-[14px] font-bold text-[#e3e1e9]">
                          {ritual.title}
                        </span>
                        <p className="text-[12px] text-[#cfc2d6] italic">
                          {ritual.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Record Retrospective Action */}
          <button
            onClick={() => {
              playClickPop();
              onOpenRecordRetrospective();
            }}
            className="w-full py-3.5 px-4 rounded-2xl btn-3d-purple text-[13px] uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Record Retrospective</span>
          </button>
        </div>
      )}
    </div>
  );
};
