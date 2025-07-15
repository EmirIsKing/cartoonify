import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// In-memory per-user rate limiter (dev/single instance only)
const userRateLimits: Record<string, { count: number; reset: number }> = {};
const RATE_LIMIT = 3;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Checks and updates the rate limit for a user.
 * @param userId The user's unique ID
 * @returns true if within limit, false if exceeded
 */
export function checkAndUpdateRateLimit(userId: string): boolean {
  const now = Date.now();
  if (!userRateLimits[userId] || now > userRateLimits[userId].reset) {
    userRateLimits[userId] = { count: 1, reset: now + WINDOW_MS };
    return true;
  }
  if (userRateLimits[userId].count < RATE_LIMIT) {
    userRateLimits[userId].count++;
    return true;
  }
  return false;
}
