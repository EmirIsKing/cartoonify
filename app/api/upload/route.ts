import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { getUser } from '@/lib/getUser';
import { checkAndUpdateRateLimit } from '@/lib/utils';

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
      { error: 'Rate limit exceeded. You can only upload 3 images per day.' },
      { status: 429 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
      allowOverwrite: true,
      addRandomSuffix: true,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'File upload failed' },
      { status: 500 }
    );
  }
}
