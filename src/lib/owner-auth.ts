import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Owner-dashboard authentication (single authorized user).
 *
 * - Password: `OWNER_DASHBOARD_PASSWORD` env var, compared with
 *   timingSafeEqual on fixed-length digests (never raw string compare).
 * - Session: `owner_session` cookie = `<expiry>.<HMAC-SHA256(expiry)>`
 *   signed with `OWNER_SESSION_SECRET`; httpOnly, sameSite=lax, secure in
 *   production, 7-day lifetime. Verified on every server request that
 *   returns analytics data.
 * - Login throttling: best-effort in-memory counter (resets on cold start —
 *   noted in docs; the password itself remains the primary gate).
 */

export const SESSION_COOKIE = "owner_session";
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

function sessionSecret(): string {
  // Verified present before login is offered; dashboard shows a safe
  // setup message when missing.
  return process.env.OWNER_SESSION_SECRET ?? "";
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) {
    // Compare against a fixed-length value anyway to keep timing flat.
    timingSafeEqual(ab, Buffer.alloc(ab.length));
    return false;
  }
  return timingSafeEqual(ab, bb);
}

export function isOwnerConfigured(): boolean {
  return Boolean(
    process.env.OWNER_DASHBOARD_PASSWORD &&
      process.env.OWNER_SESSION_SECRET &&
      process.env.OWNER_DASHBOARD_PASSWORD.length >= 8 &&
      process.env.OWNER_SESSION_SECRET.length >= 16
  );
}

/** Constant-time password check against the configured owner password. */
export function verifyPassword(candidate: string): boolean {
  const expected = process.env.OWNER_DASHBOARD_PASSWORD ?? "";
  if (!expected) return false;
  const candidateHash = createHmac("sha256", "pwd").update(candidate).digest();
  const expectedHash = createHmac("sha256", "pwd").update(expected).digest();
  return safeEqual(candidateHash.toString("base64url"), expectedHash.toString("base64url"));
}

/** Creates a signed session value: `<expiryUnixSeconds>.<hmac>` */
export function createSessionValue(): { value: string; maxAge: number } {
  const expiry = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = String(expiry);
  return { value: `${payload}.${sign(payload, sessionSecret())}`, maxAge: SESSION_TTL_SECONDS };
}

/** Verifies a presented session cookie value (signature + expiry). */
export function verifySessionValue(value: string | undefined): boolean {
  if (!value) return false;
  const dot = value.lastIndexOf(".");
  if (dot <= 0) return false;
  const payload = value.slice(0, dot);
  const signature = value.slice(dot + 1);
  if (!safeEqual(signature, sign(payload, sessionSecret()))) return false;
  const expiry = Number(payload);
  return Number.isInteger(expiry) && expiry > Math.floor(Date.now() / 1000);
}

/** Reads and verifies the session from the request cookie store. */
export async function hasValidSession(): Promise<boolean> {
  if (!isOwnerConfigured()) return false;
  const store = await cookies();
  return verifySessionValue(store.get(SESSION_COOKIE)?.value);
}

// --- Best-effort login throttling (in-memory; resets on cold start) ---

const attempts = new Map<string, { count: number; firstAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export function registerFailedAttempt(ip: string): void {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.firstAt > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstAt: now });
    return;
  }
  entry.count += 1;
}

export function isThrottled(ip: string): boolean {
  const entry = attempts.get(ip);
  if (!entry || Date.now() - entry.firstAt > WINDOW_MS) return false;
  return entry.count >= MAX_ATTEMPTS;
}

export function clearAttempts(ip: string): void {
  attempts.delete(ip);
}

/** Random id used for the throttle map when no IP is available. */
export function attemptKey(fallback: string): string {
  return fallback || randomBytes(8).toString("hex");
}
