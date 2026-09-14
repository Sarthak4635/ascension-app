import React, { useState, useEffect } from 'react';
import { playChamberFinishGong, playCompletionChime, playClickPop } from '../utils/audio';
import { checkRateLimitAndTemporalGuard } from '../utils/security';

interface FocusChamberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteSession: (durationMinutes: number) => void;
}

export const FocusChamberModal: React.FC<FocusChamberModalProps> = ({
  isOpen,
  onClose,
  onCompleteSession
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(90 * 60);
  const [isActive, setIsActive] = useState(false);
  const [soundscape, setSoundscape] = useState<'theta' | 'void' | 'solstice' | 'silent'>('theta');

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((sec) => sec - 1);
      }, 1000);
    } else if (secondsRemaining === 0 && isActive) {
      setIsActive(false);
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        navigator.vibrate([60, 50, 70, 50, 100]);
      }
      playChamberFinishGong();
      setTimeout(() => playCompletionChime(), 600);
      onCompleteSession(90);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsRemaining, onCompleteSession]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const totalSeconds = 90 * 60;
  const progressPercent = ((totalSeconds - secondsRemaining) / totalSeconds) * 100;

  const handleSeal = () => {
    playClickPop();
    const guard = checkRateLimitAndTemporalGuard();
    if (!guard.allowed) {
      return;
    }
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate([60, 50, 70, 50, 100]);
    }
    playChamberFinishGong();
    setTimeout(() => playCompletionChime(), 500);
    onCompleteSession(90);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090a0f]/95 backdrop-blur-2xl animate-fade-in">
      {/* Radiant Background Void Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-[#b76dff]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-md rounded-3xl bg-[#121318] border border-[#ddb7ff]/25 p-6 flex flex-col items-center text-center shadow-2xl overflow-hidden">
        {/* Top bar controls */}
        <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#4cd7f6] animate-pulse" />
            <span className="font-label-caps text-[10px] uppercase tracking-[0.2em] text-[#ddb7ff] font-bold">
              Focus Chamber Active
            </span>
          </div>
          <button
            onClick={() => {
              playClickPop();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#1e1f25] text-[#cfc2d6] hover:text-white flex items-center justify-center cursor-pointer transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Chamber Title */}
        <span className="font-label-caps text-[9px] uppercase tracking-widest text-[#4cd7f6] font-semibold mb-1">
          Primary Focus · High Theta Cadence
        </span>
        <h2 className="font-headline-md text-[22px] text-[#e3e1e9] font-bold max-w-xs mb-6">
          Deep Work: Architectural Systems
        </h2>

        {/* Circular Countdown Ring */}
        <div className="relative w-56 h-56 flex items-center justify-center mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="86"
              fill="none"
              stroke="#1e1f25"
              strokeWidth="6"
            />
            <circle
              cx="100"
              cy="100"
              r="86"
              fill="none"
              stroke="url(#chamberGrad)"
              strokeWidth="6"
              strokeDasharray={540.35}
              strokeDashoffset={540.35 - (540.35 * progressPercent) / 100}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-linear"
            />
            <defs>
              <linearGradient id="chamberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4cd7f6" />
                <stop offset="50%" stopColor="#b76dff" />
                <stop offset="100%" stopColor="#ddb7ff" />
              </linearGradient>
            </defs>
          </svg>

          {/* Time digits & status */}
          <div className="absolute flex flex-col items-center">
            <span className="font-headline-lg text-[44px] text-[#e3e1e9] font-light tracking-tight font-mono">
              {formattedTime}
            </span>
            <span className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-wider font-semibold">
              {isActive ? 'Quantum Flow Engaged' : 'Calibration Standby'}
            </span>
          </div>
        </div>

        {/* Ambient Soundscapes Selector */}
        <div className="w-full mb-6">
          <div className="flex items-center justify-between text-[11px] text-[#cfc2d6] mb-2 px-1">
            <span className="font-label-caps uppercase tracking-wider font-bold">
              Ambient Resonance
            </span>
            <span className="text-[#ddb7ff] font-medium">Binaural 6.8 Hz</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#1a1b21] rounded-xl border border-white/[0.04]">
            {(['theta', 'void', 'solstice', 'silent'] as const).map((s) => (
              <button
                key={s}
                onClick={() => {
                  playClickPop();
                  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
                    navigator.vibrate(12);
                  }
                  setSoundscape(s);
                }}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold capitalize transition-all cursor-pointer ${
                  soundscape === s
                    ? 'bg-[#b76dff] text-[#121318] shadow-sm font-bold'
                    : 'text-[#cfc2d6] hover:text-[#e3e1e9]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="w-full flex items-center gap-3">
          <button
            onClick={() => {
              playClickPop();
              if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
                navigator.vibrate(20);
              }
              setIsActive(!isActive);
            }}
            className={`flex-1 py-3.5 px-4 rounded-xl font-bold text-[13px] uppercase tracking-[0.14em] shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isActive
                ? 'bg-[#292a2f] text-[#e3e1e9] border border-white/[0.1]'
                : 'bg-gradient-to-r from-[#b76dff] to-[#ddb7ff] text-[#121318] shadow-[0_0_20px_rgba(221,183,255,0.35)]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isActive ? 'pause' : 'play_arrow'}
            </span>
            {isActive ? 'Pause Session' : 'Ignite Focus'}
          </button>

          <button
            onClick={handleSeal}
            className="px-4 py-3.5 rounded-xl bg-[#1e1f25] hover:bg-[#292a2f] border border-white/[0.08] text-[#4cd7f6] text-[12px] font-bold uppercase tracking-wider cursor-pointer transition-all active:scale-95"
            title="Seal Session & Transmute (Triggers Resonant Gong & Chime)"
          >
            Seal
          </button>
        </div>
      </div>
    </div>
  );
};
