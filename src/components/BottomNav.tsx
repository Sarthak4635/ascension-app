import React from 'react';
import { TabType } from '../types';
import { playClickPop } from '../utils/audio';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

interface NavItem {
  id: TabType;
  label: string;
  icon: string;
  color: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Quests', icon: 'explore', color: '#00c2e8' },
  { id: 'growth', label: 'Growth', icon: 'trending_up', color: '#10b981' },
  { id: 'journey', label: 'Path', icon: 'route', color: '#b76dff' },
  { id: 'insights', label: 'Codex', icon: 'psychology', color: '#ffb95f' },
  { id: 'profile', label: 'Vault', icon: 'person', color: '#ddb7ff' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#121318]/95 backdrop-blur-xl border-t-2 border-white/[0.08] shadow-[0_-4px_24px_rgba(0,0,0,0.6)]">
      <div className="max-w-md mx-auto flex items-center justify-between h-16 px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                playClickPop();
                onTabChange(item.id);
              }}
              aria-current={isActive ? 'page' : undefined}
              className={`flex-1 flex flex-col items-center justify-center py-1 rounded-2xl transition-all duration-150 min-h-[48px] cursor-pointer select-none active:scale-95 ${
                isActive
                  ? 'border-b-3 font-bold'
                  : 'text-[#988d9f] hover:text-[#e3e1e9]'
              }`}
              style={{
                borderColor: isActive ? item.color : 'transparent',
                color: isActive ? item.color : undefined
              }}
            >
              <div
                className={`w-9 h-7 rounded-xl flex items-center justify-center transition-all ${
                  isActive ? 'scale-110' : ''
                }`}
              >
                <span
                  className="material-symbols-outlined text-[23px]"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1, 'wght' 700" : "'FILL' 0, 'wght' 400"
                  }}
                >
                  {item.icon}
                </span>
              </div>
              <span className="font-label-caps text-[10px] tracking-wider uppercase leading-none mt-0.5">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
