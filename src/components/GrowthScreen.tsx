import React, { useState } from 'react';
import { Timeframe } from '../types';
import { GROWTH_PILLARS, TIMEFRAME_DATA } from '../data/initialData';

interface GrowthScreenProps {
  onOpenBreakdown?: () => void;
}

export const GrowthScreen: React.FC<GrowthScreenProps> = ({ onOpenBreakdown }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('Month');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const currentData = TIMEFRAME_DATA[selectedTimeframe];

  // SVG Chart path calculation for smooth spline
  // Width 320, Height 90
  const points = currentData.points;
  const chartWidth = 320;
  const chartHeight = 80;
  const paddingX = 16;
  const paddingY = 12;

  const getCoordinates = (val: number, idx: number) => {
    const x = paddingX + (idx / (points.length - 1)) * (chartWidth - paddingX * 2);
    const minVal = 10;
    const maxVal = 100;
    const normalized = (val - minVal) / (maxVal - minVal);
    const y = chartHeight - paddingY - normalized * (chartHeight - paddingY * 2);
    return { x, y };
  };

  // Build smooth bezier curve path
  const coords = points.map((p, i) => getCoordinates(p, i));
  let pathD = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const cpX = (coords[i].x + coords[i + 1].x) / 2;
    pathD += ` C ${cpX} ${coords[i].y}, ${cpX} ${coords[i + 1].y}, ${coords[i + 1].x} ${coords[i + 1].y}`;
  }

  const areaD = `${pathD} L ${coords[coords.length - 1].x} ${chartHeight} L ${coords[0].x} ${chartHeight} Z`;
  const lastPoint = coords[coords.length - 1];

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Subtle Ambient Glow */}
      <div className="fixed top-16 left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-[#4cd7f6]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="pt-2 pb-6 flex flex-col gap-1">
        <span className="font-label-caps text-[10px] uppercase text-[#4cd7f6] tracking-[0.22em] flex items-center gap-1.5 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] shadow-[0_0_8px_#4cd7f6]" />
          Empirical Actualization
        </span>
        <h1 className="font-headline-lg text-[32px] text-[#e3e1e9] tracking-tight font-medium mt-1">
          Growth Velocity
        </h1>
        <p className="font-body-md text-[14px] text-[#cfc2d6] font-light">
          Measurable compounding across all dimensions.
        </p>
      </div>

      {/* Timeframe Filter Bar & Trajectory Card */}
      <div className="w-full bg-[#1a1b21] rounded-2xl p-4 mb-6 border border-white/[0.06] shadow-[0_12px_32px_rgba(0,0,0,0.35)]">
        {/* Filter Pills */}
        <div className="flex items-center justify-between p-1 bg-[#121318] rounded-xl mb-5 border border-white/[0.04]">
          {(['Week', 'Month', '3 Mos', 'All Time'] as Timeframe[]).map((tf) => {
            const isActive = selectedTimeframe === tf;
            return (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`flex-1 py-1.5 rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#292a2f] text-[#e3e1e9] shadow-sm font-semibold'
                    : 'text-[#cfc2d6] hover:text-[#e3e1e9]'
                }`}
              >
                {tf}
              </button>
            );
          })}
        </div>

        {/* Index Metrics */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-col">
            <span className="font-label-caps text-[10px] uppercase text-[#cfc2d6] tracking-[0.18em] font-semibold">
              Trajectory Index
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline-lg text-[36px] text-[#e3e1e9] font-medium">
                {currentData.trajectory}
              </span>
              <span className="text-[18px] text-[#cfc2d6] font-light">%</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1e1f25] border border-white/[0.06] text-[#4cd7f6] shadow-sm">
            <span className="material-symbols-outlined text-[15px]">trending_up</span>
            <span className="font-label-caps text-[10px] tracking-wider text-[#4cd7f6] font-semibold">
              {currentData.delta}
            </span>
          </div>
        </div>

        {/* Interactive Smooth Velocity Line Chart */}
        <div className="relative w-full pt-1 pb-2">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-24 overflow-visible"
          >
            <defs>
              <linearGradient id="velocityStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ddb7ff" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="velocityArea" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ddb7ff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#ddb7ff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Dotted Guideline */}
            <line
              x1={paddingX}
              y1={chartHeight - paddingY}
              x2={chartWidth - paddingX}
              y2={chartHeight - paddingY}
              stroke="#292a2f"
              strokeDasharray="3 3"
              strokeWidth="1.5"
            />

            {/* Gradient Fill under curve */}
            <path d={areaD} fill="url(#velocityArea)" />

            {/* Glowing Spline */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#velocityStroke)"
              strokeWidth="3.5"
              strokeLinecap="round"
              className="transition-all duration-500 ease-out drop-shadow-[0_0_8px_rgba(221,183,255,0.4)]"
            />

            {/* End Point / Velocity Peak marker */}
            <circle
              cx={lastPoint.x}
              cy={lastPoint.y}
              r="5"
              fill="#ffffff"
              stroke="#ddb7ff"
              strokeWidth="2.5"
              className="drop-shadow-[0_0_10px_#ddb7ff]"
            />

            {/* Interactive hover points */}
            {coords.map((c, i) => (
              <circle
                key={i}
                cx={c.x}
                cy={c.y}
                r={hoveredIndex === i ? 5 : 3}
                fill={hoveredIndex === i ? '#4cd7f6' : 'transparent'}
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            ))}
          </svg>

          {/* X Axis Milestones */}
          <div className="flex items-center justify-between text-[11px] text-[#cfc2d6] font-medium pt-1 px-2">
            <span>Day 01</span>
            <span>Day 15</span>
            <span className="text-[#ddb7ff] font-semibold">Today (Velocity Peak)</span>
          </div>
        </div>
      </div>

      {/* Neural Diagnosis Section */}
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-[0.2em] font-semibold">
            Neural Diagnosis
          </span>
          <span className="font-label-caps text-[10px] text-[#cfc2d6] tracking-wider">
            Synthesis Complete
          </span>
        </div>

        {/* Card 1: Highest Velocity */}
        <div className="w-full p-4 rounded-xl bg-[#1e1f25] border-l-2 border-l-[#ddb7ff] border-y border-r border-white/[0.06] flex items-start gap-3.5 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-[#ddb7ff]/10 flex items-center justify-center text-[#ddb7ff] flex-shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-label-caps text-[10px] text-[#ddb7ff] font-bold uppercase tracking-wider">
                Highest Velocity
              </span>
              <span className="font-label-caps text-[9px] text-[#4cd7f6] font-bold">
                +18%
              </span>
            </div>
            <p className="font-body-sm text-[13px] text-[#e3e1e9] leading-relaxed">
              Knowledge showed supreme velocity this cycle. Deep focus retention reached an all-time peak during morning rituals.
            </p>
          </div>
        </div>

        {/* Card 2: Equilibrium Opportunity */}
        <div className="w-full p-4 rounded-xl bg-[#1e1f25] border-l-2 border-l-[#ffb95f] border-y border-r border-white/[0.06] flex items-start gap-3.5 shadow-sm">
          <div className="w-8 h-8 rounded-lg bg-[#ffb95f]/10 flex items-center justify-center text-[#ffb95f] flex-shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[18px]">spa</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-label-caps text-[10px] text-[#ffb95f] font-bold uppercase tracking-wider">
                Equilibrium Opportunity
              </span>
              <span className="font-label-caps text-[9px] text-[#cfc2d6] font-medium">
                Gentle Realign
              </span>
            </div>
            <p className="font-body-sm text-[13px] text-[#e3e1e9] leading-relaxed">
              Recovery &amp; Mindset could use more sacred consistency. 2 restorative breath sessions rested over the weekend.
            </p>
          </div>
        </div>
      </div>

      {/* Alchemical Pillars Section */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-[0.2em] font-semibold">
            Alchemical Pillars
          </span>
          <span className="font-label-caps text-[10px] text-[#cfc2d6] tracking-wider font-semibold">
            5 Vectors
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {GROWTH_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="w-full p-3.5 rounded-xl bg-[#1e1f25] border border-white/[0.06] flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: pillar.glowColor,
                      boxShadow: `0 0 6px ${pillar.glowColor}`
                    }}
                  />
                  <span className="font-headline-sm text-[15px] text-[#e3e1e9] font-medium">
                    {pillar.name}
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-headline-sm text-[16px] text-[#e3e1e9] font-semibold">
                    {pillar.percentage}%
                  </span>
                  <span className="font-label-caps text-[10px] text-[#4cd7f6] font-bold">
                    +{pillar.delta}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-[#121318] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${pillar.percentage}%`,
                    backgroundColor: pillar.glowColor,
                    boxShadow: `0 0 8px ${pillar.glowColor}`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Trigger Action */}
      <button
        onClick={onOpenBreakdown}
        className="w-full py-3.5 px-4 rounded-xl bg-[#1e1f25] hover:bg-[#292a2f] border border-white/[0.06] text-[#e3e1e9] transition-all flex items-center justify-between active:scale-[0.99] cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#ddb7ff]/10 flex items-center justify-center text-[#ddb7ff]">
            <span className="material-symbols-outlined text-[17px]">biotech</span>
          </div>
          <span className="font-body-md text-[13px] font-medium">
            View biometric and focus breakdown
          </span>
        </div>
        <span className="material-symbols-outlined text-[18px] text-[#cfc2d6]">
          arrow_forward
        </span>
      </button>
    </div>
  );
};
