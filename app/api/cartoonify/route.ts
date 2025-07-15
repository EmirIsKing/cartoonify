import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getUser } from '@/lib/getUser';
import { checkAndUpdateRateLimit } from '@/lib/utils';

// In-memory rate limiter store (must match lib/utils.ts)
const userRateLimits: Record<string, { count: number; reset: number }> = (globalThis as any).userRateLimits || {};
(globalThis as any).userRateLimits = userRateLimits;

// Create a server-side Supabase client using the service role key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
let adminSupabase: SupabaseClient<any, "public", any> | null = null;
if (supabaseUrl && supabaseServiceRoleKey) {
  adminSupabase = createClient(supabaseUrl, supabaseServiceRoleKey);
} else {
  console.error('Missing SUPABASE_SERVICE_ROLE_KEY or SUPABASE_URL for server-side Supabase client.');
}

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY!,
});

export async function POST(request: Request) {
  // Require authentication
  const user = await getUser();
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Rate limit: 3 requests per user per 24 hours
  if (!checkAndUpdateRateLimit(user.id)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. You can only cartoonify 3 images per day.' },
      { status: 429 }
    );
  }
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'No image URL provided' },
        { status: 400 }
      );
    }

    const output: any = await replicate.run(
      'black-forest-labs/flux-kontext-pro',
      {
        input: {
          prompt: 'Make this a detailed 90s cartoon',
          input_image: imageUrl,
          aspect_ratio: "match_input_image",
          output_format: "jpg",
          safety_tolerance: 2
        },
      }
    );

    // Log for debugging
    console.log('Updating history for user:', user.id, 'with URL:', output.url?.() ?? output.url);

    if (!adminSupabase) {
      console.error('Admin Supabase client not initialized.');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    // Fetch current history
    const { data, error: fetchError } = await adminSupabase
      .from('users')
      .select('history')
      .eq('id', user.id)
      .single();

    if (fetchError) {
      console.error('Error fetching user history:', fetchError.message, fetchError.details);
    }

    const currentHistory = data?.history || [];
    const cartoonUrl = typeof output.url === 'function' ? output.url() : output.url;

    // Update history
    const { error: updateError } = await adminSupabase
      .from('users')
      .update({ history: [...currentHistory, cartoonUrl] })
      .eq('id', user.id);

    if (updateError) {
      console.error('Error updating user history:', updateError.message, updateError.details);
    }

    return NextResponse.json({ resultUrl: typeof output.url === 'function' ? output.url() : output.url });
  } catch (error) {
    console.error('Cartoonify error:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Only handle /api/cartoonify/limit
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