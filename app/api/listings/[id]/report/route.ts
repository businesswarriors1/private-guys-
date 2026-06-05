import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

interface Params {
  id: string
}

// POST report a listing
export async function POST(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params
    const body = await request.json()
    const { reason, description } = body

    if (!reason) {
      return NextResponse.json(
        { error: 'Report reason is required' },
        { status: 400 }
      )
    }

    // Verify listing exists
    const { data: listing } = await supabaseAdmin
      .from('listings')
      .select('id')
      .eq('id', id)
      .single()

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      )
    }

    // Add to moderation queue
    const { data: report, error } = await supabaseAdmin
      .from('moderation_queue')
      .insert({
        content_type: 'listing',
        content_id: id,
        status: 'pending',
        flags: {
          reason,
          description,
          reported_at: new Date().toISOString(),
        },
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to submit report' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: report,
        message: 'Report submitted successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Report error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
