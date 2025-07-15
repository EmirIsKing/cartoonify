import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

const DAILY_LIMIT = 5;

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    console.log('userId received:', userId, 'length:', userId.length);

    if (!userId) {
      return NextResponse.json({ error: 'No userId provided' }, { status: 400 });
    }

    console.log('userId', userId);

    // Fetch cartoonify_limit from user row
    const { data, error } = await supabase
      .from('users')
      .select('cartoonify_limit')
      .eq('id', userId)
      .single();

    console.log('Supabase data:', data, 'error:', error);

    if (error) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let limit = data.cartoonify_limit || { count: 0, resetAt: null };
    const now = new Date();
    let resetAt = limit.resetAt ? new Date(limit.resetAt) : null;

    // If no resetAt or it's in the past, reset the count and set new resetAt (next UTC midnight)
    if (!resetAt || now > resetAt) {
      // Set resetAt to next UTC midnight
      resetAt = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
      limit = { count: 0, resetAt: resetAt.toISOString() };
    }

    let allowed = false;
    let remaining = DAILY_LIMIT - limit.count;

    if (limit.count < DAILY_LIMIT) {
      // Increment count and update user row
      limit.count += 1;
      allowed = true;
      remaining = DAILY_LIMIT - limit.count;
      await supabase
        .from('users')
        .update({ cartoonify_limit: limit })
        .eq('id', userId);
    } else {
      // Over the limit, just return info
      allowed = false;
    }

    return NextResponse.json({
      allowed,
      remaining,
      resetAt: limit.resetAt,
    });
  } catch (err) {
    console.error('Rate limit error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 