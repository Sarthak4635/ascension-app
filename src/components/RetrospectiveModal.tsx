import React, { useState } from 'react';
import { RitualLog } from '../types';

interface RetrospectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRitual: (ritual: RitualLog) => void;
}

export const RetrospectiveModal: React.FC<RetrospectiveModalProps> = ({
  isOpen,
  onClose,
  onAddRitual
}) => {
  const [category, setCategory] = useState<'Fitness' | 'Knowledge' | 'Focus' | 'Mindset'>('Focus');
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('60');
  const [note, setNote] = useState('');
  const [clarity, setClarity] = useState('9.5');

  if (!isOpen) return null;

  const categoryColors: Record<string, string> = {
    Fitness: '#4cd7f6',
    Knowledge: '#ffb95f',
    Focus: '#ddb7ff',
    Mindset: '#a855f7'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newRitual: RitualLog = {
      id: 'r_' + Date.now(),
      category,
      categoryColor: categoryColors[category],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: parseInt(duration, 10) || 45,
      title: title.trim(),
      note: note.trim() ? `"${note.trim()}"` : '"Deliberate flow block verified."',
      metrics: [
        { label: 'Clarity Coefficient', value: clarity }
      ],
      verifiedBadge: true
    };

    onAddRitual(newRitual);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090a0f]/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-[#121318] border border-white/[0.1] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#ddb7ff]">history_edu</span>
            <h3 className="font-headline-sm text-[18px] text-[#e3e1e9] font-medium">
              Record Retrospective
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1e1f25] text-[#cfc2d6] hover:text-white flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Category selection */}
          <div>
            <label className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-wider block mb-1.5 font-bold">
              Domain / Vector
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['Fitness', 'Knowledge', 'Focus', 'Mindset'] as const).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`py-2 px-1 rounded-xl text-[11px] font-semibold tracking-wide transition-all cursor-pointer ${
                    category === cat
                      ? 'bg-[#292a2f] text-white border border-white/[0.2] shadow-sm'
                      : 'bg-[#1a1b21] text-[#cfc2d6] hover:bg-[#1e1f25]'
                  }`}
                  style={{ color: category === cat ? categoryColors[cat] : undefined }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-wider block mb-1.5 font-bold">
              Ritual Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Distributed Consensus Verification"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1b21] border border-white/[0.08] text-[13px] text-[#e3e1e9] placeholder-[#988d9f] focus:outline-none focus:border-[#ddb7ff]"
            />
          </div>

          {/* Duration & Clarity */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-wider block mb-1.5 font-bold">
                Duration (min)
              </label>
              <input
                type="number"
                min="5"
                max="300"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1b21] border border-white/[0.08] text-[13px] text-[#e3e1e9] focus:outline-none focus:border-[#ddb7ff]"
              />
            </div>
            <div>
              <label className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-wider block mb-1.5 font-bold">
                Clarity (1 - 10)
              </label>
              <input
                type="text"
                value={clarity}
                onChange={(e) => setClarity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1b21] border border-white/[0.08] text-[13px] text-[#e3e1e9] focus:outline-none focus:border-[#ddb7ff]"
              />
            </div>
          </div>

          {/* Qualitative Notes */}
          <div>
            <label className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-wider block mb-1.5 font-bold">
              Retrospective Notes
            </label>
            <textarea
              rows={2}
              placeholder="High cognitive flow, completed chapter 4."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-[#1a1b21] border border-white/[0.08] text-[13px] text-[#e3e1e9] placeholder-[#988d9f] focus:outline-none focus:border-[#ddb7ff] resize-none"
            />
          </div>

          {/* Inscribe button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#ddb7ff] to-[#b76dff] text-[#121318] font-bold text-[13px] uppercase tracking-[0.14em] shadow-[0_0_20px_rgba(221,183,255,0.3)] active:scale-95 transition-all cursor-pointer mt-1"
          >
            Inscribe Into Permanent Ledger
          </button>
        </form>
      </div>
    </div>
  );
};
