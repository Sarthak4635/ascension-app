import React, { useState } from 'react';
import { CoreObjective } from '../types';

interface NewTrajectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddObjective: (objective: CoreObjective) => void;
}

export const NewTrajectoryModal: React.FC<NewTrajectoryModalProps> = ({
  isOpen,
  onClose,
  onAddObjective
}) => {
  const [categoryTag, setCategoryTag] = useState('COGNITIVE SYNTHESIS');
  const [title, setTitle] = useState('');
  const [targetDate, setTargetDate] = useState('Target: Q3 2025');
  const [tagInput, setTagInput] = useState('Systems, Research');

  if (!isOpen) return null;

  const colorMap: Record<string, string> = {
    'COGNITIVE SYNTHESIS': '#ddb7ff',
    'PHYSICAL ALCHEMY': '#4cd7f6',
    'INTERIOR HARMONY': '#ffb95f'
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newObj: CoreObjective = {
      id: 'co_' + Date.now(),
      categoryTag,
      targetDate: targetDate.trim() || 'Target: Q3 2025',
      progress: 0,
      title: title.trim(),
      tags: tags.length > 0 ? tags : ['Deliberate Practice'],
      color: colorMap[categoryTag] || '#ddb7ff'
    };

    onAddObjective(newObj);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090a0f]/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-[#121318] border border-white/[0.1] p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">adjust</span>
            <h3 className="font-headline-sm text-[18px] text-[#e3e1e9] font-medium">
              Define New Trajectory
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
          <div>
            <label className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-wider block mb-1.5 font-bold">
              Domain Vector
            </label>
            <div className="flex flex-col gap-1.5">
              {['COGNITIVE SYNTHESIS', 'PHYSICAL ALCHEMY', 'INTERIOR HARMONY'].map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategoryTag(cat)}
                  className={`py-2 px-3 rounded-xl text-[11px] font-semibold text-left transition-all cursor-pointer ${
                    categoryTag === cat
                      ? 'bg-[#292a2f] text-white border border-white/[0.2] shadow-sm'
                      : 'bg-[#1a1b21] text-[#cfc2d6] hover:bg-[#1e1f25]'
                  }`}
                  style={{ color: categoryTag === cat ? colorMap[cat] : undefined }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-wider block mb-1.5 font-bold">
              Trajectory Objective
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Master Monadic Concurrency in Rust"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1b21] border border-white/[0.08] text-[13px] text-[#e3e1e9] placeholder-[#988d9f] focus:outline-none focus:border-[#4cd7f6]"
            />
          </div>

          <div>
            <label className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-wider block mb-1.5 font-bold">
              Target Horizon
            </label>
            <input
              type="text"
              placeholder="e.g. Target: Q4 2025"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1b21] border border-white/[0.08] text-[13px] text-[#e3e1e9] focus:outline-none focus:border-[#4cd7f6]"
            />
          </div>

          <div>
            <label className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-wider block mb-1.5 font-bold">
              Tags (comma separated)
            </label>
            <input
              type="text"
              placeholder="Deep Work, Synthesis, High Theta"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#1a1b21] border border-white/[0.08] text-[13px] text-[#e3e1e9] focus:outline-none focus:border-[#4cd7f6]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#4cd7f6] to-[#ddb7ff] text-[#121318] font-bold text-[13px] uppercase tracking-[0.14em] shadow-[0_0_20px_rgba(76,215,246,0.3)] active:scale-95 transition-all cursor-pointer mt-1"
          >
            Inscribe New Trajectory
          </button>
        </form>
      </div>
    </div>
  );
};
