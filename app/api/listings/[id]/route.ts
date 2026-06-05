import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { supabaseAdmin } from '@/lib/supabase'

interface Params {
  id: string
}

// GET single listing
export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = params

    const { data: listing, error } = await supabaseAdmin
      .from('listings')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      )
    }

    // Only return active listings unless user is owner/admin
    if (listing.status !== 'active') {
      const session = await getServerSession(authOptions)
      if (!session || (session.user.id !== listing.user_id && session.user.role !== 'admin')) {
        return NextResponse.json(
          { error: 'Listing not found' },
          { status: 404 }
        )
      }
    }

    return NextResponse.json({
      success: true,
      data: listing,
    })
  } catch (error) {
    console.error('Error fetching listing:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PATCH update listing
export async function PATCH(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params

    // Verify ownership or admin
    const { data: listing } = await supabaseAdmin
      .from('listings')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      )
    }

    if (listing.user_id !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const updatedData = {
      ...body,
      updated_at: new Date().toISOString(),
    }

    const { data: updatedListing, error } = await supabaseAdmin
      .from('listings')
      .update(updatedData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update listing' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: updatedListing,
      message: 'Listing updated successfully',
    })
  } catch (error) {
    console.error('Listing update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE listing
export async function DELETE(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = params

    // Verify ownership or admin
    const { data: listing } = await supabaseAdmin
      .from('listings')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!listing) {
      return NextResponse.json(
        { error: 'Listing not found' },
        { status: 404 }
      )
    }

    if (listing.user_id !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    const { error } = await supabaseAdmin
      .from('listings')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to delete listing' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Listing deleted successfully',
    })
  } catch (error) {
    console.error('Listing deletion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
