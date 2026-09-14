import React from 'react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToFocus: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToFocus
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 bg-[#090a0f]/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm mt-16 rounded-3xl bg-[#1a1b21] border border-white/[0.1] p-5 shadow-2xl flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">
              notifications_active
            </span>
            <h3 className="font-headline-sm text-[16px] text-[#e3e1e9] font-medium">
              Ascension Telemetry
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#121318] text-[#cfc2d6] hover:text-white flex items-center justify-center cursor-pointer text-[12px]"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* Notification 1 */}
          <div
            onClick={() => {
              onClose();
              onNavigateToFocus();
            }}
            className="p-3 rounded-xl bg-[#1e1f25] border border-[#ddb7ff]/20 hover:border-[#ddb7ff]/50 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-caps text-[9px] uppercase text-[#ddb7ff] font-bold tracking-wider">
                Optimal Window Active
              </span>
              <span className="text-[10px] text-[#cfc2d6]">Just now</span>
            </div>
            <p className="font-body-sm text-[12px] text-[#e3e1e9]">
              High cognitive peak detected. Your 90m Deep Work block is primed.
            </p>
          </div>

          {/* Notification 2 */}
          <div className="p-3 rounded-xl bg-[#1e1f25] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-caps text-[9px] uppercase text-[#4cd7f6] font-bold tracking-wider">
                Telemetry Synchronized
              </span>
              <span className="text-[10px] text-[#cfc2d6]">4m ago</span>
            </div>
            <p className="font-body-sm text-[12px] text-[#cfc2d6]">
              Whoop recovery at 88% and Apple Health resting heart rate verified.
            </p>
          </div>

          {/* Notification 3 */}
          <div className="p-3 rounded-xl bg-[#1e1f25] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-1">
              <span className="font-label-caps text-[9px] uppercase text-[#ffb95f] font-bold tracking-wider">
                Evening Calibration
              </span>
              <span className="text-[10px] text-[#cfc2d6]">20:00 Window</span>
            </div>
            <p className="font-body-sm text-[12px] text-[#cfc2d6]">
              Prepare for end-of-day alignment and stoic reflection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
