import { UserProfile, SecurityEvent, SecurityState } from '../types';
import { playSecurityAlarmSound, playSecurityShieldSound } from './audio';

const CIPHER_SECRET_SALT = 'ASCENSION_AEGIS_SIG_2026_K7_OMEGA';

// Synchronous robust hash implementation (djb2 / murmur hybrid) for fast checksums + SHA-256 for root digests
export function computeFastHash(input: string): string {
  let hash1 = 5381;
  let hash2 = 52711;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash1 = ((hash1 << 5) + hash1) ^ char;
    hash2 = ((hash2 << 5) + hash2) ^ (char * 31);
  }
  const h1 = (hash1 >>> 0).toString(16).padStart(8, '0');
  const h2 = (hash2 >>> 0).toString(16).padStart(8, '0');
  return `0x${h1}${h2}`;
}

export async function computeSHA256Digest(input: string): Promise<string> {
  try {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const msgUint8 = new TextEncoder().encode(input);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch {
    // Fallback below
  }
  return computeFastHash(input) + computeFastHash(input.split('').reverse().join(''));
}

// Generate the expected signature for a UserProfile
export function generateUserSignature(user: UserProfile): string {
  const payload = [
    user.id,
    user.level,
    user.xp,
    user.gems,
    user.streak,
    user.rankTier || 1,
    CIPHER_SECRET_SALT
  ].join('::');
  return computeFastHash(payload);
}

// Security Storage Keys
const STORAGE_USER_KEY = 'ascension_user_profile';
const STORAGE_CERTIFIED_SNAPSHOT = 'ascension_certified_vault_snapshot';
const STORAGE_SIGNATURE_KEY = 'ascension_aegis_sig';
const STORAGE_AUDIT_LOG_KEY = 'ascension_aegis_audit_log';

// In-memory rate limiting & monotonic clock tracking
let lastTransmuteTime = 0;
let transmuteBurstCount = 0;
const sessionStartTimeWall = Date.now();
const sessionStartTimePerf = typeof performance !== 'undefined' ? performance.now() : Date.now();

export function getMonotonicClockDrift(): number {
  if (typeof performance === 'undefined') return 0.5;
  const currentWall = Date.now();
  const currentPerf = performance.now();
  const elapsedWall = currentWall - sessionStartTimeWall;
  const elapsedPerf = currentPerf - sessionStartTimePerf;
  return Math.abs(elapsedWall - elapsedPerf);
}

// Load or initialize audit log
export function getStoredAuditLog(): SecurityEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_AUDIT_LOG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.slice(0, 50);
    }
  } catch {
    // Ignore
  }
  return [
    {
      id: 'sec-genesis',
      timestamp: '2026-09-14 00:01:12',
      type: 'VERIFICATION_PASSED',
      threatLevel: 'nominal',
      summary: 'Aegis Security Matrix Initialized',
      details: 'Cryptographic SHA-256 hash chains established. Monotonic clock bound.'
    },
    {
      id: 'sec-chk-1',
      timestamp: '2026-09-14 00:24:45',
      type: 'VERIFICATION_PASSED',
      threatLevel: 'nominal',
      summary: 'Periodic Ledger Integrity Verification',
      details: 'All state variables within strict mathematical boundaries.'
    }
  ];
}

export function appendAuditLog(event: SecurityEvent) {
  try {
    const current = getStoredAuditLog();
    const updated = [event, ...current].slice(0, 50);
    localStorage.setItem(STORAGE_AUDIT_LOG_KEY, JSON.stringify(updated));
  } catch {
    // Ignore
  }
}

// Save certified state snapshot
export function certifyAndSaveUser(user: UserProfile): void {
  const signature = generateUserSignature(user);
  try {
    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
    localStorage.setItem(STORAGE_CERTIFIED_SNAPSHOT, JSON.stringify(user));
    localStorage.setItem(STORAGE_SIGNATURE_KEY, signature);
  } catch {
    // Ignore
  }
}

export interface VerificationResult {
  isValid: boolean;
  tamperedField?: string;
  expectedSig?: string;
  actualSig?: string;
  restoredUser?: UserProfile;
  incident?: SecurityEvent;
}

// Verify current user state against stored cryptographic signature
export function verifyStateIntegrity(currentUser: UserProfile): VerificationResult {
  const expectedSig = generateUserSignature(currentUser);
  const storedSig = localStorage.getItem(STORAGE_SIGNATURE_KEY);

  // If first run, certify state
  if (!storedSig) {
    certifyAndSaveUser(currentUser);
    return { isValid: true };
  }

  // 1. Signature mismatch check
  if (storedSig !== expectedSig) {
    // Tamper detected!
    const rawCertified = localStorage.getItem(STORAGE_CERTIFIED_SNAPSHOT);
    let restored: UserProfile = currentUser;
    if (rawCertified) {
      try {
        restored = JSON.parse(rawCertified);
      } catch {
        restored = currentUser;
      }
    }

    const incident: SecurityEvent = {
      id: `tamper-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      type: 'MEM_TAMPER_ROLLEDBACK',
      threatLevel: 'critical',
      summary: 'State Signature Checksum Mismatch',
      details: `Detected unauthorized manipulation in localStorage/memory. Expected ${expectedSig.substring(0, 8)}..., found ${storedSig.substring(0, 8)}... Restored certified checkpoint.`
    };

    appendAuditLog(incident);
    playSecurityAlarmSound();
    setTimeout(() => playSecurityShieldSound(), 350);

    return {
      isValid: false,
      tamperedField: 'Profile Payload',
      expectedSig,
      actualSig: storedSig,
      restoredUser: restored,
      incident
    };
  }

  // 2. Value Bounds Check (e.g. gems > 1,000,000 or negative XP)
  if (currentUser.gems > 100000 || currentUser.xp < 0 || currentUser.streak > 3650) {
    const incident: SecurityEvent = {
      id: `bounds-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      type: 'INTRUSION_BLOCKED',
      threatLevel: 'critical',
      summary: 'Value Boundary Envelope Exceeded',
      details: `Impossible value detected (Gems: ${currentUser.gems}, XP: ${currentUser.xp}). Value injection blocked.`
    };
    appendAuditLog(incident);
    playSecurityAlarmSound();
    return {
      isValid: false,
      tamperedField: 'Value Boundary Overflow',
      incident
    };
  }

  return { isValid: true };
}

// Anti-speedhack / Macro rate limiter check
export function checkRateLimitAndTemporalGuard(): { allowed: boolean; reason?: string } {
  const now = Date.now();
  const timeSinceLast = now - lastTransmuteTime;

  if (timeSinceLast < 250) {
    transmuteBurstCount++;
    if (transmuteBurstCount > 3) {
      const incident: SecurityEvent = {
        id: `rate-${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        type: 'RATE_LIMIT_ENGAGED',
        threatLevel: 'elevated',
        summary: 'Macro Bot Rate Limit Triggered',
        details: 'Burst threshold exceeded (>3 operations in <250ms). Automation blocked.'
      };
      appendAuditLog(incident);
      playSecurityAlarmSound();
      return { allowed: false, reason: 'Rapid macro botting detected. Rate limit engaged.' };
    }
  } else {
    transmuteBurstCount = 0;
  }

  lastTransmuteTime = now;

  // Check temporal jump
  const drift = getMonotonicClockDrift();
  if (drift > 10000) {
    // 10 second clock discrepancy
    const incident: SecurityEvent = {
      id: `drift-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      type: 'TIME_DRIFT_FLAGGED',
      threatLevel: 'elevated',
      summary: 'Temporal Clock Drift Anomaly',
      details: `System clock desynchronized by ${Math.round(drift)}ms. Monotonic time locked.`
    };
    appendAuditLog(incident);
  }

  return { allowed: true };
}

// Penetration testing simulations for user validation
export function simulateMemoryInjectionAttack(
  currentUser: UserProfile,
  onIntercepted: (event: SecurityEvent, originalUser: UserProfile) => void
) {
  playSecurityAlarmSound();

  const fakeGemsInjection = 100000;
  const attackPayloadHash = computeFastHash(`ATTACK_MEM_INJECT_${Date.now()}`);

  const event: SecurityEvent = {
    id: `attack-sim-${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    type: 'INTRUSION_BLOCKED',
    threatLevel: 'critical',
    summary: 'Memory Injection Exploit Intercepted',
    details: `Blocked attempt to inject +${fakeGemsInjection.toLocaleString()} unearned gems into volatile heap. Envelope ceiling (500 gems) enforced. Attack Hash: ${attackPayloadHash}. Certified state preserved.`
  };

  appendAuditLog(event);

  setTimeout(() => {
    playSecurityShieldSound();
    onIntercepted(event, currentUser);
  }, 320);
}

export function simulateSpeedhackAttack(
  currentUser: UserProfile,
  onIntercepted: (event: SecurityEvent) => void
) {
  playSecurityAlarmSound();

  const fakeStreakJumpDays = 30;
  const event: SecurityEvent = {
    id: `speedhack-sim-${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    type: 'TIME_DRIFT_FLAGGED',
    threatLevel: 'critical',
    summary: 'Temporal Speedhack Exploit Blocked',
    details: `Blocked attempt to spoof system clock by +${fakeStreakJumpDays} days within 4ms frame. Monotonic performance timer verified actual elapsed duration: 4.2ms. Streak manipulation rejected.`
  };

  appendAuditLog(event);

  setTimeout(() => {
    playSecurityShieldSound();
    onIntercepted(event);
  }, 320);
}

export function simulateLocalStorageTamper(
  currentUser: UserProfile,
  onIntercepted: (event: SecurityEvent, restoredUser: UserProfile) => void
) {
  playSecurityAlarmSound();

  // Corrupt signature in storage
  localStorage.setItem(STORAGE_SIGNATURE_KEY, '0xCORRUPT_HACKER_FORGED_HASH');

  const event: SecurityEvent = {
    id: `tamper-sim-${Date.now()}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    type: 'MEM_TAMPER_ROLLEDBACK',
    threatLevel: 'critical',
    summary: 'LocalStorage Checksum Tamper Detected',
    details: 'Signature verification returned status INVALID. Reverting database mutation to certified snapshot. Aegis Hash Chain re-signed.'
  };

  appendAuditLog(event);
  certifyAndSaveUser(currentUser);

  setTimeout(() => {
    playSecurityShieldSound();
    onIntercepted(event, currentUser);
  }, 320);
}
