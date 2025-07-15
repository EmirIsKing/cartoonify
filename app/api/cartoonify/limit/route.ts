import { NextResponse } from 'next/server';
import { getUser } from '@/lib/getUser';

// In-memory rate limiter store (must match lib/utils.ts)
const userRateLimits: Record<string, { count: number; reset: number }> = (globalThis as any).userRateLimits || {};
(globalThis as any).userRateLimits = userRateLimits;

export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const entry = userRateLimits[user.id];
  if (entry) {
    return NextResponse.json({ count: entry.count, reset: entry.reset });
  } else {
    // Not used yet today
    return NextResponse.json({ count: 0, reset: Date.now() + 24 * 60 * 60 * 1000 });
  }
} 