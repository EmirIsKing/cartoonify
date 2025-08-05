import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import { supabase } from '@/lib/supabaseClient';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const { imageUrl, userId } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'No image URL provided' },
        { status: 400 }
      );
    }
    if (!userId) {
      return NextResponse.json(
        { error: 'No userId provided' },
        { status: 400 }
      );
    }

    // Rate limit check

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const limitRes = await fetch(`${baseUrl}/api/limit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
     const limitData = await limitRes.json();
     console.log(limitRes)
    // if (!limitData.allowed) {
    //   return NextResponse.json(
    //     { error: `Daily limit reached. Try again after ${limitData.resetAt}.` },
    //     { status: 429 }
    //   );
    // }

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
      .eq('id', userId)
      .single();

    if (fetchError) {
      console.error(fetchError);
    } else {
      const currentHistory = data.history || [];

      const { error: updateError } = await supabase
        .from('users')
        .update({ history: [...currentHistory, output.url()] })
        .eq('id', userId);

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