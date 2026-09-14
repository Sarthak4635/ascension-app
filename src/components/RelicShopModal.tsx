import React from 'react';
import { UserProfile } from '../types';
import { playClickPop, playSuccessChime } from '../utils/audio';

interface RelicShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onBuyItem: (cost: number, itemName: string) => void;
}

export const RelicShopModal: React.FC<RelicShopModalProps> = ({
  isOpen,
  onClose,
  user,
  onBuyItem
}) => {
  if (!isOpen) return null;

  const ITEMS = [
    {
      id: 'item_freeze',
      title: 'Streak Freeze Shield',
      desc: 'Protects your streak if you miss a single calendar cycle.',
      cost: 150,
      icon: 'ac_unit',
      color: '#4cd7f6'
    },
    {
      id: 'item_double_xp',
      title: 'Double XP Flow Catalyst',
      desc: 'Earn 2x Experience on all completed focus chambers for 24 hours.',
      cost: 250,
      icon: 'bolt',
      color: '#ddb7ff'
    },
    {
      id: 'item_recharge',
      title: 'Neural Battery Full Refill',
      desc: 'Instantly top off your cognitive clarity energy to 100%.',
      cost: 100,
      icon: 'battery_charging_full',
      color: '#10b981'
    }
  ];

  const handlePurchase = (cost: number, title: string) => {
    playClickPop();
    if (user.gems < cost) {
      if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
        navigator.vibrate([50, 40, 50]);
      }
      return;
    }
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate([25, 30, 40]);
    }
    playSuccessChime();
    onBuyItem(cost, title);
  };

  return (
    <div
      id="relic-shop-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="relic-shop-container"
        className="w-full max-w-sm bg-[#181922] border-2 border-white/[0.08] border-b-4 border-b-black/60 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.06] text-[#cfc2d6] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Balance Header */}
        <div className="flex flex-col items-center text-center mt-2 mb-5">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-2xl bg-[#00c2e8]/10 border border-[#00c2e8]/30 text-[#4cd7f6] mb-2 shadow-[0_0_20px_rgba(0,194,232,0.2)]">
            <span className="text-[22px]">💎</span>
            <span className="font-headline-md text-[20px] font-bold text-[#e3e1e9]">
              {user.gems.toLocaleString()}
            </span>
            <span className="text-[11px] uppercase tracking-wider font-bold text-[#4cd7f6]">
              Relics
            </span>
          </div>
          <h2 className="font-headline-sm text-[18px] text-[#e3e1e9] font-bold">
            Ascension Relic Armory
          </h2>
          <p className="font-body-sm text-[12px] text-[#cfc2d6]">
            Earn gems by completing daily sequences &amp; deep flow chambers.
          </p>
        </div>

        {/* Shop Items List */}
        <div className="flex flex-col gap-3 mb-4">
          {ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-[#121318] border border-white/[0.06] flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${item.color}20`, color: item.color }}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {item.icon}
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-bold text-[#e3e1e9] leading-tight">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-[#cfc2d6] line-clamp-1 mt-0.5">
                    {item.desc}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handlePurchase(item.cost, item.title)}
                className="px-3 py-2 rounded-xl btn-3d-cyan flex items-center gap-1 text-[12px] flex-shrink-0 cursor-pointer"
              >
                <span>💎</span>
                <span>{item.cost}</span>
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-2xl btn-3d-dark text-[12px] uppercase tracking-widest cursor-pointer mt-1"
        >
          Return to Temple
        </button>
      </div>
    </div>
  );
};
