import React from 'react';
import { UserProfile } from '../types';
import { playClickPop, playSuccessChime } from '../utils/audio';

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onEquipFreeze: () => void;
}

export const StreakModal: React.FC<StreakModalProps> = ({
  isOpen,
  onClose,
  user,
  onEquipFreeze
}) => {
  if (!isOpen) return null;

  const DAYS = [
    { day: 'M', date: '9', done: true },
    { day: 'T', date: '10', done: true },
    { day: 'W', date: '11', done: true },
    { day: 'T', date: '12', done: true },
    { day: 'F', date: '13', done: true },
    { day: 'S', date: '14', done: true, isToday: true },
    { day: 'S', date: '15', done: false }
  ];

  return (
    <div
      id="streak-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="streak-modal-container"
        className="w-full max-w-sm bg-[#181922] border-2 border-white/[0.08] border-b-4 border-b-black/60 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col items-center text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow */}
        <div className="absolute top-0 w-48 h-20 bg-[#ffb95f]/20 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.06] text-[#cfc2d6] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Big Duolingo Flame */}
        <div className="relative my-3 flex items-center justify-center">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#f59e0b]/20 to-[#ef4444]/20 border border-[#f59e0b]/30 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.25)] animate-wiggle">
            <span className="text-[42px]">🔥</span>
          </div>
        </div>

        <h2 className="font-headline-lg text-[28px] text-[#e3e1e9] font-bold">
          {user.streak} Days In Flow!
        </h2>
        <p className="font-body-sm text-[13px] text-[#cfc2d6] mt-1 max-w-[260px]">
          Your discipline is compounding. Complete at least 1 protocol daily to keep the eternal flame alight.
        </p>

        {/* 7-Day Calendar Streak Strip (Duolingo signature) */}
        <div className="w-full grid grid-cols-7 gap-1.5 p-3 rounded-2xl bg-[#121318] border border-white/[0.06] my-5">
          {DAYS.map((d, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center py-2 px-1 rounded-xl transition-all ${
                d.isToday
                  ? 'bg-[#f59e0b]/20 border border-[#f59e0b]/50'
                  : 'bg-white/[0.02]'
              }`}
            >
              <span className="text-[10px] font-bold text-[#cfc2d6] uppercase">
                {d.day}
              </span>
              <div
                className={`w-6 h-6 rounded-full my-1 flex items-center justify-center text-[12px] font-bold ${
                  d.done
                    ? 'bg-[#f59e0b] text-[#241200] shadow-[0_0_8px_#f59e0b]'
                    : 'bg-[#292a36] text-[#988d9f]'
                }`}
              >
                {d.done ? '✓' : ''}
              </div>
              <span className="text-[10px] text-[#988d9f] font-mono">{d.date}</span>
            </div>
          ))}
        </div>

        {/* Streak Freeze Shield Info */}
        <div className="w-full p-3.5 rounded-2xl bg-[#121318] border border-white/[0.06] flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5 text-left">
            <div className="w-9 h-9 rounded-xl bg-[#00c2e8]/15 border border-[#00c2e8]/30 flex items-center justify-center text-[#4cd7f6]">
              <span className="material-symbols-outlined text-[20px]">ac_unit</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-bold text-[#e3e1e9]">
                Streak Freeze Shield
              </span>
              <span className="text-[10px] text-[#cfc2d6]">
                {user.streakShieldActive ? 'Active (1 Equipped)' : 'Not equipped'}
              </span>
            </div>
          </div>
          {user.streakShieldActive ? (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-[#00c2e8]/20 text-[#4cd7f6] border border-[#00c2e8]/30">
              EQUIPPED
            </span>
          ) : (
            <button
              onClick={() => {
                playClickPop();
                playSuccessChime();
                if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
                  navigator.vibrate([25, 30, 40]);
                }
                onEquipFreeze();
              }}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg btn-3d-cyan cursor-pointer"
            >
              Equip (100 💎)
            </button>
          )}
        </div>

        {/* Close / Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-2xl btn-3d-amber text-[13px] uppercase tracking-widest cursor-pointer"
        >
          Keep Momentum
        </button>
      </div>
    </div>
  );
};
