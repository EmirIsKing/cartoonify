import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'No image URL provided' },
        { status: 400 }
      );
    }

    const output = await replicate.run(
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

    console.log(output.url())

    return NextResponse.json({ resultUrl: output.url() });
  } catch (error) {
    console.error('Cartoonify error:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}