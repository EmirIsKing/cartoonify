import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { supabase } from '@/lib/supabaseClient';
import { getUser } from '@/lib/getUser';
import { checkAndUpdateRateLimit } from '@/lib/utils';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY!,
});

// In-memory rate limiter store (must match lib/utils.ts)
const userRateLimits: Record<string, { count: number; reset: number }> = (globalThis as any).userRateLimits || {};
(globalThis as any).userRateLimits = userRateLimits;

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

    const { data, error: fetchError } = await supabase
      .from('users')
      .select('history')
      .eq('id', user.id)
      .single();

    if (fetchError) {
      console.error(fetchError);
    } else {
      const currentHistory = data.history || [];

      const { error: updateError } = await supabase
        .from('users')
        .update({ history: [...currentHistory, output.url()] })
        .eq('id', user.id);

      if (updateError) console.error(updateError);
    }

    return NextResponse.json({ resultUrl: output.url() });
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