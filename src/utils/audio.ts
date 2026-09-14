// Web Audio API tactile feedback synthesizer with rich completion sound effects, fanfares & security alerts

let audioCtx: AudioContext | null = null;
let isMuted: boolean = (() => {
  try {
    return localStorage.getItem('ascension_audio_muted') === 'true';
  } catch {
    return false;
  }
})();

export function isAudioMuted(): boolean {
  return isMuted;
}

export function setAudioMuted(muted: boolean) {
  isMuted = muted;
  try {
    localStorage.setItem('ascension_audio_muted', String(muted));
  } catch {
    // Ignore
  }
}

export function toggleAudioMute(): boolean {
  setAudioMuted(!isMuted);
  return isMuted;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined' || isMuted) return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Subtle tactile button pop
export function playClickPop() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.05);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  } catch {
    // Ignore
  }
}

// 1. Completion Sound Effect: Resonant Polyphonic Major Chord (C5 -> E5 -> G5 -> C6)
export function playCompletionChime() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Harmonious frequencies
    const chord = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    chord.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteStart = now + idx * 0.06;

      osc.type = idx === chord.length - 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, noteStart);

      gain.gain.setValueAtTime(0.12 - idx * 0.015, noteStart);
      gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteStart);
      osc.stop(noteStart + 0.55);
    });

    // Shimmering sparkle overtone
    const sparkle = ctx.createOscillator();
    const sparkleGain = ctx.createGain();
    sparkle.type = 'sine';
    sparkle.frequency.setValueAtTime(1567.98, now + 0.22); // G6
    sparkleGain.gain.setValueAtTime(0.08, now + 0.22);
    sparkleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    sparkle.connect(sparkleGain);
    sparkleGain.connect(ctx.destination);
    sparkle.start(now + 0.22);
    sparkle.stop(now + 0.7);
  } catch {
    // Ignore
  }
}

// 2. Full Sequence Mastered Sound: Grand celebratory golden chord with stereo spread
export function playFullSequenceMasteredSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Bass root foundation
    const bass = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bass.type = 'triangle';
    bass.frequency.setValueAtTime(130.81, now); // C3
    bassGain.gain.setValueAtTime(0.2, now);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    bass.connect(bassGain);
    bassGain.connect(ctx.destination);
    bass.start(now);
    bass.stop(now + 1.2);

    // Arpeggiated triumphal chord (C4, G4, C5, E5, G5, C6)
    const notes = [261.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteTime = now + idx * 0.08;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.14, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.85);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.85);
    });
  } catch {
    // Ignore
  }
}

// 3. Rank Promotion Fanfare: Triumphant brass/synth royal fanfare
export function playRankPromotionFanfare() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Fanfare progression: D4 -> G4 -> B4 -> D5 -> G5 -> B5
    const fanfareNotes = [
      { freq: 293.66, delay: 0, dur: 0.18 },    // D4
      { freq: 392.00, delay: 0.16, dur: 0.18 }, // G4
      { freq: 493.88, delay: 0.32, dur: 0.22 }, // B4
      { freq: 587.33, delay: 0.52, dur: 0.24 }, // D5
      { freq: 783.99, delay: 0.74, dur: 0.30 }, // G5
      { freq: 987.77, delay: 1.02, dur: 0.85 }  // B5 sustain finale
    ];

    fanfareNotes.forEach((n) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteTime = now + n.delay;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.freq, noteTime);

      gain.gain.setValueAtTime(0.18, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + n.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + n.dur);
    });
  } catch {
    // Ignore
  }
}

// 4. Focus Chamber Deep Resonance Gong / Bell (Ohm 136.1Hz fundamental)
export function playChamberFinishGong() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Deep singing bowl tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(136.1, now);
    osc.frequency.exponentialRampToValueAtTime(136.1, now + 2.0);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 2.4);

    // Harmonic bell overtone
    const bell = ctx.createOscillator();
    const bellGain = ctx.createGain();
    bell.type = 'triangle';
    bell.frequency.setValueAtTime(544.4, now); // 4th harmonic
    bellGain.gain.setValueAtTime(0.12, now);
    bellGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
    bell.connect(bellGain);
    bellGain.connect(ctx.destination);
    bell.start(now);
    bell.stop(now + 1.8);
  } catch {
    // Ignore
  }
}

// 5. Anti-Hacker Cyber Warning Alarm: Dissonance warble indicating intrusion / tamper attempt
export function playSecurityAlarmSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Fast cyber warning sweep (descending sawtooth alarm)
    for (let i = 0; i < 3; i++) {
      const startTime = now + i * 0.14;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, startTime);
      osc.frequency.linearRampToValueAtTime(320, startTime + 0.11);

      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.12);
    }
  } catch {
    // Ignore
  }
}

// 6. Security Defense Shield Lock: Clean resonant laser-lock pulse (tamper neutralized)
export function playSecurityShieldSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(220, now);
    osc1.frequency.exponentialRampToValueAtTime(1760, now + 0.18); // Rapid ascending laser lock

    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.4);

    // Protective harmonic lock
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.16);
    gain2.gain.setValueAtTime(0.18, now + 0.16);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.16);
    osc2.stop(now + 0.6);
  } catch {
    // Ignore
  }
}

// 7. Quest Claim Chime
export function playQuestClaimSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    [659.25, 830.61, 987.77, 1318.51].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteTime = now + idx * 0.07;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0.14, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.45);
    });
  } catch {
    // Ignore
  }
}

// 8. Relic Chest Opening Chime
export function playChestOpenChime() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5, 1318.51].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const noteTime = now + idx * 0.06;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);
      gain.gain.setValueAtTime(0.14, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(noteTime);
      osc.stop(noteTime + 0.45);
    });
  } catch {
    // Ignore
  }
}

// 9. Standard Success Chime (backward compatible)
export function playSuccessChime() {
  playCompletionChime();
}

// 10. Level Up Chime (backward compatible)
export function playLevelUpChime() {
  playRankPromotionFanfare();
}
