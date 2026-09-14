import React, { useState } from 'react';

interface ArtifactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ArtifactModal: React.FC<ArtifactModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    onShowToast('Artifact cryptographic dossier copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090a0f]/95 backdrop-blur-2xl animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-[#121318] border border-[#ddb7ff]/30 p-6 flex flex-col items-center text-center shadow-2xl overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#ddb7ff]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-white/[0.06]">
          <span className="font-label-caps text-[10px] text-[#ddb7ff] uppercase tracking-widest font-bold">
            Alchemical Story Artifact
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1e1f25] text-[#cfc2d6] hover:text-white flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Story Card Container */}
        <div className="w-full rounded-2xl bg-gradient-to-b from-[#1a1b21] via-[#121318] to-[#0d0e13] p-6 border border-white/[0.1] shadow-2xl relative flex flex-col items-center mb-5">
          {/* Gold Crest Monogram */}
          <img
            alt="ASCENSION Emblem"
            className="h-14 w-auto object-contain mb-3 rounded-lg filter drop-shadow-[0_4px_16px_rgba(217,119,6,0.35)]"
            src="/assets/ascension_logo.png"
            referrerPolicy="no-referrer"
          />

          <span className="font-label-caps text-[9px] uppercase tracking-[0.26em] text-[#ddb7ff] font-bold">
            TEMPLE OF TRAJECTORY
          </span>
          <span className="font-label-caps text-[8px] uppercase tracking-wider text-[#cfc2d6] mb-4">
            CY-2025 · COHORT 01
          </span>

          <div className="my-2 flex flex-col items-center">
            <span className="font-label-caps text-[9px] tracking-[0.2em] text-[#cfc2d6] uppercase font-semibold">
              Practitioner Dossier
            </span>
            <h2 className="font-headline-lg text-[28px] text-[#e3e1e9] font-medium tracking-wide uppercase mt-1">
              Alex Mercer
            </h2>
            <span className="font-label-caps text-[10px] text-[#4cd7f6] tracking-[0.18em] uppercase font-bold mt-0.5">
              Architect of Systems
            </span>
          </div>

          <div className="w-full grid grid-cols-3 gap-2 py-4 my-2 border-y border-white/[0.08] text-center">
            <div>
              <span className="font-headline-sm text-[20px] text-[#e3e1e9] font-bold block">
                82%
              </span>
              <span className="font-label-caps text-[8px] uppercase tracking-wider text-[#cfc2d6]">
                Growth
              </span>
            </div>
            <div className="border-x border-white/[0.08]">
              <span className="font-headline-sm text-[20px] text-[#4cd7f6] font-bold block">
                27d
              </span>
              <span className="font-label-caps text-[8px] uppercase tracking-wider text-[#cfc2d6]">
                Momentum
              </span>
            </div>
            <div>
              <span className="font-headline-sm text-[20px] text-[#ddb7ff] font-bold block">
                142h
              </span>
              <span className="font-label-caps text-[8px] uppercase tracking-wider text-[#cfc2d6]">
                Invested
              </span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between text-[9px] text-[#cfc2d6] font-mono mt-2">
            <span>ID: ASC-88390-X</span>
            <div className="flex items-center gap-1 text-[#ddb7ff]">
              <span className="material-symbols-outlined text-[12px]">lock</span>
              <span className="font-label-caps text-[8px] tracking-wider font-bold">
                VERIFIED
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="w-full flex flex-col gap-2">
          <button
            onClick={handleCopyLink}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#ddb7ff] to-[#b76dff] text-[#121318] font-bold text-[12px] uppercase tracking-[0.14em] shadow-[0_0_20px_rgba(221,183,255,0.3)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px]">
              {copied ? 'check' : 'content_copy'}
            </span>
            {copied ? 'Dossier Link Copied' : 'Copy Artifact Link'}
          </button>

          <button
            onClick={() => {
              onShowToast('Generating high-res 4K story PNG export...');
              setTimeout(() => {
                onShowToast('Artifact saved to photo roll');
                onClose();
              }, 1200);
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1e1f25] hover:bg-[#292a2f] border border-white/[0.08] text-[#e3e1e9] font-medium text-[12px] transition-all cursor-pointer"
          >
            Save to Camera Roll
          </button>
        </div>
      </div>
    </div>
  );
};
