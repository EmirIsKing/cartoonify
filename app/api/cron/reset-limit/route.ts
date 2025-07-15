import { createClient } from '@supabase/supabase-js'
import { type NextRequest } from 'next/server'

export const dynamic = 'force-dynamic' // Required for cron jobs

export async function GET(req: NextRequest) {
  
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.CRON_SECRET) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Execute the reset function
    const { data, error } = await supabase.rpc('reset_cartoonify_limits')

    if (error) throw error

    return new Response(JSON.stringify({
      success: true,
      reset_count: data.reset_count,
      reset_time: data.reset_time
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Cartoonify limit reset failed:', error)
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}