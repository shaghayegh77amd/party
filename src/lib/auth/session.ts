import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function getSessionSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "SESSION_SECRET is missing or too short. Set a strong SESSION_SECRET environment variable."
    );
  }
  return secret;
}

function sign(payload: string): string {
  return createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
}

/**
 * Session token format: base64url(payload).signature
 * payload = JSON { role: "admin", iat: <epoch seconds> }
 */
export function createAdminSessionToken(): string {
  const payload = JSON.stringify({ role: "admin", iat: Math.floor(Date.now() / 1000) });
  const encodedPayload = Buffer.from(payload, "utf8").toString("base64url");
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [encodedPayload, signature] = parts;

  let expectedSignature: string;
  try {
    expectedSignature = sign(encodedPayload);
  } catch {
    return false;
  }

  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (sigBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(sigBuffer, expectedBuffer)) return false;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as {
      role?: string;
      iat?: number;
    };
    if (payload.role !== "admin" || typeof payload.iat !== "number") return false;
    const ageSeconds = Math.floor(Date.now() / 1000) - payload.iat;
    if (ageSeconds > SESSION_MAX_AGE_SECONDS || ageSeconds < 0) return false;
    return true;
  } catch {
    return false;
  }
}

export function verifyAdminPassword(candidate: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD is not configured on the server.");
  }
  // Hash both sides to a fixed length before comparing, so the comparison
  // is constant-time and doesn't leak the real password's length.
  const candidateHash = createHmac("sha256", getSessionSecret()).update(candidate).digest();
  const expectedHash = createHmac("sha256", getSessionSecret()).update(adminPassword).digest();
  if (candidateHash.length !== expectedHash.length) return false;
  return timingSafeEqual(candidateHash, expectedHash);
}

export const sessionCookieOptions = {
  name: ADMIN_SESSION_COOKIE,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_MAX_AGE_SECONDS,
};
