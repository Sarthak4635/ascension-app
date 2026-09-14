import React, { useState } from 'react';

interface InsightsScreenProps {
  onShowToast: (msg: string) => void;
}

export const InsightsScreen: React.FC<InsightsScreenProps> = ({ onShowToast }) => {
  const [query, setQuery] = useState('');
  const [appliedRoutine, setAppliedRoutine] = useState(false);
  const [adjustedTiming, setAdjustedTiming] = useState(false);
  const [coachResponse, setCoachResponse] = useState<string | null>(null);
  const [isAsking, setIsAsking] = useState(false);

  const handleAskCoach = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsAsking(true);
    setTimeout(() => {
      setIsAsking(false);
      setCoachResponse(
        `Neural synthesis on "${query.trim()}": Telemetry reveals a 42% cognitive recovery index when paired with morning kinetic activation. We recommend reserving an unbroken 90-minute window prior to 11:00 AM.`
      );
    }, 600);
  };

  const handleApplyRoutine = () => {
    setAppliedRoutine(!appliedRoutine);
    onShowToast(
      appliedRoutine
        ? 'Weekend routine reverted'
        : 'Weekend 20m anchor routine synced to biological calendar'
    );
  };

  const handleAdjustTiming = () => {
    setAdjustedTiming(!adjustedTiming);
    onShowToast(
      adjustedTiming
        ? 'Evening decompression restored to 10:00 PM'
        : 'Evening restoration window calibrated to 9:15 PM'
    );
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Ambient Glow */}
      <div className="fixed top-16 left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-[#ddb7ff]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="pt-2 pb-5 flex flex-col gap-1">
        <span className="font-label-caps text-[10px] uppercase text-[#4cd7f6] tracking-[0.22em] flex items-center gap-1.5 font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6] shadow-[0_0_8px_#4cd7f6]" />
          Neural Cognition Engine
        </span>
        <h1 className="font-headline-lg text-[32px] text-[#e3e1e9] tracking-tight font-medium mt-1">
          Neural Insights
        </h1>
        <p className="font-body-md text-[14px] text-[#cfc2d6] font-light">
          Synthesized behavioral patterns distilled from your last 30 days of deliberate action.
        </p>
      </div>

      {/* Interactive AI Coach Prompt Box */}
      <form onSubmit={handleAskCoach} className="w-full mb-6">
        <div className="relative flex items-center w-full rounded-2xl bg-[#1a1b21] border border-white/[0.08] hover:border-[#ddb7ff]/40 transition-all p-1.5 pl-3.5 shadow-md">
          <span className="material-symbols-outlined text-[19px] text-[#ddb7ff]/80 mr-2.5">
            help_center
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask Ascension Coach about your focus dips.."
            className="flex-1 bg-transparent text-[13px] text-[#e3e1e9] placeholder-[#988d9f] outline-none font-medium"
          />
          <button
            type="submit"
            disabled={!query.trim() || isAsking}
            className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#ddb7ff] to-[#b76dff] text-[#121318] flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95 cursor-pointer ml-1.5"
            aria-label="Send Query"
          >
            {isAsking ? (
              <span className="w-3.5 h-3.5 border-2 border-[#121318] border-t-transparent rounded-full animate-spin" />
            ) : (
              <span className="material-symbols-outlined text-[18px] font-bold">
                arrow_upward
              </span>
            )}
          </button>
        </div>

        {coachResponse && (
          <div className="mt-3 p-4 rounded-xl bg-[#1e1f25] border border-[#ddb7ff]/30 text-[13px] text-[#e3e1e9] leading-relaxed shadow-lg relative">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-label-caps text-[9px] uppercase text-[#ddb7ff] tracking-wider font-bold">
                Ascension Coach Synthesis
              </span>
              <button
                type="button"
                onClick={() => setCoachResponse(null)}
                className="text-[#cfc2d6] hover:text-[#e3e1e9] text-[12px]"
              >
                ✕
              </button>
            </div>
            {coachResponse}
          </div>
        )}
      </form>

      {/* Mastery Vectors */}
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#ddb7ff]">
              verified
            </span>
            <span className="font-label-caps text-[10px] text-[#ddb7ff] uppercase tracking-[0.2em] font-bold">
              Mastery Vectors
            </span>
          </div>
          <span className="font-label-caps text-[10px] text-[#cfc2d6] tracking-wider font-semibold">
            Top 5% Threshold
          </span>
        </div>

        {/* Vector 1: Circadian Advantage */}
        <div className="w-full p-4 rounded-2xl bg-[#1a1b21] border border-white/[0.06] flex flex-col gap-3 shadow-md">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-[0.16em] font-semibold">
              Circadian Advantage
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-[#e3e1e9] bg-[#292a2f] border border-white/[0.06]">
              3.4x Efficacy
            </span>
          </div>

          <div>
            <h3 className="font-headline-sm text-[17px] text-[#e3e1e9] font-medium mb-1">
              Morning Cognitive Peak
            </h3>
            <p className="font-body-sm text-[13px] text-[#cfc2d6] leading-relaxed">
              You are <strong className="text-[#e3e1e9] font-semibold">3.4x more likely</strong> to complete 90+ min deep work sessions before 11:00 AM. Focus duration naturally peaks between 8:30 AM and 10:00 AM.
            </p>
          </div>

          {/* Timeline diagram bar */}
          <div className="flex flex-col gap-1 pt-1">
            <div className="relative w-full h-2 rounded-full bg-[#121318] overflow-hidden">
              {/* Highlight window */}
              <div
                className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-[#4cd7f6] to-[#ddb7ff] shadow-[0_0_10px_#4cd7f6]"
                style={{ left: '28%', width: '45%' }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] text-[#cfc2d6] pt-0.5">
              <span>06:00</span>
              <span className="font-label-caps text-[9px] uppercase tracking-wider text-[#4cd7f6] font-bold">
                Peak Window (08:30 - 10:00)
              </span>
              <span>13:00</span>
            </div>
          </div>
        </div>

        {/* Vector 2: Ritual Continuity */}
        <div className="w-full p-4 rounded-2xl bg-[#1a1b21] border border-white/[0.06] flex flex-col gap-3 shadow-md">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-[0.16em] font-semibold">
              Ritual Continuity
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-[#4cd7f6] bg-[#4cd7f6]/10 border border-[#4cd7f6]/20">
              94% Consistency
            </span>
          </div>

          <div>
            <h3 className="font-headline-sm text-[17px] text-[#e3e1e9] font-medium mb-1">
              Knowledge Velocity
            </h3>
            <p className="font-body-sm text-[13px] text-[#cfc2d6] leading-relaxed">
              Reading and technical synthesis have achieved <span className="text-[#4cd7f6] font-semibold">94% consistency</span> over 30 days, serving as your highest performing personal growth vector.
            </p>
          </div>

          {/* Precision Meter Mini-Card */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#121318] border border-white/[0.04]">
            <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#292a2f"
                  strokeWidth="2.5"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#4cd7f6"
                  strokeWidth="2.5"
                  strokeDasharray="87.96"
                  strokeDashoffset="5.28"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute font-label-caps text-[10px] text-[#4cd7f6] font-bold">
                94%
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-caps text-[9px] uppercase tracking-wider text-[#cfc2d6] font-bold">
                Unbroken Arc
              </span>
              <span className="font-body-sm text-[12px] text-[#e3e1e9] truncate font-medium">
                28 of 30 days logged with deliberate notes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Behavioral Kinetics */}
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-[#4cd7f6]">
            hub
          </span>
          <span className="font-label-caps text-[10px] text-[#4cd7f6] uppercase tracking-[0.2em] font-bold">
            Behavioral Kinetics
          </span>
        </div>

        {/* Friction Point */}
        <div className="w-full p-4 rounded-xl bg-[#1e1f25] border border-white/[0.06] flex flex-col gap-1.5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#ffb95f]">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span className="font-headline-sm text-[15px] font-medium text-[#e3e1e9]">
                Weekend Friction Point
              </span>
            </div>
            <span className="font-label-caps text-[10px] text-[#ffb95f] font-bold">
              -35% Dip
            </span>
          </div>
          <p className="font-body-sm text-[13px] text-[#cfc2d6] leading-relaxed">
            Saturday and Sunday momentum drops by <span className="text-[#ffb95f] font-semibold">35%</span> compared to weekdays, primarily driven by unstructured morning time blocks.
          </p>
          {/* subtle accent bar */}
          <div className="w-full h-1 rounded-full bg-[#121318] mt-1 overflow-hidden">
            <div className="w-[35%] h-full bg-[#ffb95f]/70 rounded-full" />
          </div>
        </div>

        {/* Correlation */}
        <div className="w-full p-4 rounded-xl bg-[#1e1f25] border border-white/[0.06] flex flex-col gap-1.5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#4cd7f6]">
              <span className="material-symbols-outlined text-[16px]">sync_alt</span>
              <span className="font-headline-sm text-[15px] font-medium text-[#e3e1e9]">
                Session Duration Correlation
              </span>
            </div>
            <span className="font-label-caps text-[10px] text-[#4cd7f6] font-bold">
              +42% Deep Work
            </span>
          </div>
          <p className="font-body-sm text-[13px] text-[#cfc2d6] leading-relaxed">
            Days initiated with physical conditioning generate <span className="text-[#4cd7f6] font-semibold">42% longer</span> afternoon deep focus sessions, confirming kinetic-cognitive pairing.
          </p>
          {/* subtle accent bar */}
          <div className="w-full h-1 rounded-full bg-[#121318] mt-1 overflow-hidden">
            <div className="w-[70%] h-full bg-[#4cd7f6]/70 rounded-full" />
          </div>
        </div>
      </div>

      {/* Direct Interventions */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#ddb7ff]">
              lightbulb
            </span>
            <span className="font-label-caps text-[10px] text-[#cfc2d6] uppercase tracking-[0.2em] font-semibold">
              Direct Interventions
            </span>
          </div>
          <span className="font-label-caps text-[10px] text-[#cfc2d6] tracking-wider">
            2 Calibrations
          </span>
        </div>

        {/* Intervention 1: Anchor Weekend */}
        <div className="w-full p-4 rounded-2xl bg-[#1a1b21] border border-white/[0.06] flex flex-col gap-3 shadow-md">
          <div className="flex items-start justify-between">
            <h3 className="font-headline-sm text-[16px] text-[#e3e1e9] font-medium">
              Anchor Weekend Mornings
            </h3>
            <span className="material-symbols-outlined text-[18px] text-[#cfc2d6]">
              flag
            </span>
          </div>

          <p className="font-body-sm text-[13px] text-[#cfc2d6] leading-relaxed">
            Schedule a brief 20-minute movement or reading session at 9:00 AM on Saturdays to preserve neurological continuity through Sunday evening.
          </p>

          <button
            onClick={handleApplyRoutine}
            className={`w-full py-2.5 px-4 rounded-xl font-semibold text-[12px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer ${
              appliedRoutine
                ? 'bg-[#4cd7f6]/20 text-[#4cd7f6] border border-[#4cd7f6]/40'
                : 'bg-[#ddb7ff] text-[#121318] shadow-[0_0_16px_rgba(221,183,255,0.25)]'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">
              {appliedRoutine ? 'check' : 'tune'}
            </span>
            {appliedRoutine ? 'Routine Active' : 'Apply Routine'}
          </button>
        </div>

        {/* Intervention 2: Calibrate Evening Volume */}
        <div className="w-full p-4 rounded-2xl bg-[#1a1b21] border border-white/[0.06] flex flex-col gap-3 shadow-md">
          <div className="flex items-start justify-between">
            <h3 className="font-headline-sm text-[16px] text-[#e3e1e9] font-medium">
              Calibrate Evening Volume
            </h3>
            <span className="material-symbols-outlined text-[18px] text-[#4cd7f6]">
              bedtime
            </span>
          </div>

          <p className="font-body-sm text-[13px] text-[#cfc2d6] leading-relaxed">
            You frequently skip evening decompression when scheduled after 10:00 PM. Shift your restoration cycle to 9:15 PM for sustained sleep latency.
          </p>

          <button
            onClick={handleAdjustTiming}
            className={`w-full py-2.5 px-4 rounded-xl font-semibold text-[12px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] cursor-pointer ${
              adjustedTiming
                ? 'bg-[#4cd7f6]/20 text-[#4cd7f6] border border-[#4cd7f6]/40'
                : 'bg-transparent text-[#4cd7f6] border border-[#4cd7f6]/40 hover:bg-[#4cd7f6]/10'
            }`}
          >
            <span className="material-symbols-outlined text-[17px]">schedule</span>
            {adjustedTiming ? 'Timing Set: 9:15 PM' : 'Adjust Timing'}
          </button>
        </div>
      </div>
    </div>
  );
};
