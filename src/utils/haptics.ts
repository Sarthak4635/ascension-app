/**
 * Tactile Haptic Vibration Engine
 * Provides physical haptic feedback patterns via navigator.vibrate()
 * for reinforcing user achievements, protocol completions, and reward claims.
 */

export function triggerHaptic(pattern: number | number[] = 15): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if ('navigator' in window && typeof navigator.vibrate === 'function') {
      return navigator.vibrate(pattern);
    }
  } catch {
    // Vibration might be blocked by browser policy or permissions
  }
  return false;
}

// Light subtle tap for navigation & card presses
export function hapticLightTap() {
  triggerHaptic(12);
}

// Crisp dual-pulse when toggling and transmuting an alchemical protocol
export function hapticProtocolToggle(completed: boolean) {
  if (completed) {
    triggerHaptic([30, 40, 45]);
  } else {
    triggerHaptic(15);
  }
}

// Ascending rhythmic pulse when claiming daily quests or rewards
export function hapticRewardClaim() {
  triggerHaptic([35, 30, 45, 30, 60]);
}

// Resonant triple vibration for chest unlocking
export function hapticChestUnlock() {
  triggerHaptic([40, 40, 60, 40, 90]);
}

// Substantial celebratory pulse sequence for level up & rank ascension
export function hapticLevelUp() {
  triggerHaptic([50, 40, 60, 40, 80, 50, 120]);
}

// Deep sealing vibration for focus chamber completions
export function hapticFocusChamberSeal() {
  triggerHaptic([60, 50, 70, 50, 100]);
}

// Sharp warning buzz for blocked attacks or rate limits
export function hapticSecurityAlert() {
  triggerHaptic([80, 50, 80]);
}
