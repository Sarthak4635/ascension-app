import React from 'react';

interface BiometricBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BiometricBreakdownModal: React.FC<BiometricBreakdownModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090a0f]/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-[#121318] border border-white/[0.1] p-6 shadow-2xl flex flex-col gap-5">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#4cd7f6]">
              biotech
            </span>
            <h3 className="font-headline-sm text-[18px] text-[#e3e1e9] font-medium">
              Biometric &amp; Focus Telemetry
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1e1f25] text-[#cfc2d6] hover:text-white flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-[#1a1b21] border border-white/[0.04]">
            <span className="font-label-caps text-[9px] uppercase text-[#cfc2d6] font-semibold">
              Heart Rate Variability
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-headline-sm text-[22px] text-[#4cd7f6] font-bold">84</span>
              <span className="text-[12px] text-[#cfc2d6]">ms (Optimal)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1a1b21] border border-white/[0.04]">
            <span className="font-label-caps text-[9px] uppercase text-[#cfc2d6] font-semibold">
              Resting Heart Rate
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-headline-sm text-[22px] text-[#e3e1e9] font-bold">48</span>
              <span className="text-[12px] text-[#cfc2d6]">bpm</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1a1b21] border border-white/[0.04]">
            <span className="font-label-caps text-[9px] uppercase text-[#cfc2d6] font-semibold">
              Deep Theta Fraction
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-headline-sm text-[22px] text-[#ddb7ff] font-bold">78%</span>
              <span className="text-[12px] text-[#cfc2d6]">Cadence</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1a1b21] border border-white/[0.04]">
            <span className="font-label-caps text-[9px] uppercase text-[#cfc2d6] font-semibold">
              Sleep Latency Score
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-headline-sm text-[22px] text-[#ffb95f] font-bold">9.2</span>
              <span className="text-[12px] text-[#cfc2d6]">/ 10</span>
            </div>
          </div>
        </div>

        {/* Cognitive Correlation Analysis */}
        <div className="p-4 rounded-xl bg-[#1a1b21] border border-white/[0.06]">
          <span className="font-label-caps text-[9px] uppercase tracking-wider text-[#ddb7ff] font-bold block mb-1">
            Neurological Finding
          </span>
          <p className="font-body-sm text-[13px] text-[#cfc2d6] leading-relaxed">
            Cardiovascular load between 07:00 and 08:00 AM primes dopamine receptor sensitivity, directly correlating with 42% longer afternoon flow sessions.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-[#292a2f] hover:bg-[#34343a] text-[#e3e1e9] font-semibold text-[13px] transition-all cursor-pointer"
        >
          Close Telemetry Breakdown
        </button>
      </div>
    </div>
  );
};
