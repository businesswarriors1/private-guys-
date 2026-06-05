import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { supabaseAdmin } from '@/lib/supabase'
import { DBListing } from '@/app/types'

// GET listings with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const state = searchParams.get('state')
    const tier = searchParams.get('tier')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    let query = supabaseAdmin
      .from('listings')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (city) {
      query = query.eq('city', city)
    }
    if (state) {
      query = query.eq('state', state)
    }
    if (tier) {
      query = query.eq('tier', tier)
    }

    const { data: listings, error, count } = await query
      .range((page - 1) * limit, page * limit - 1)

    if (error) {
      console.error('Error fetching listings:', error)
      return NextResponse.json(
        { error: 'Failed to fetch listings' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: listings,
      pagination: {
        page,
        limit,
        total: count,
      },
    })
  } catch (error) {
    console.error('Listing fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST create new listing
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { display_name, city, state, ...listingData } = body

    if (!display_name) {
      return NextResponse.json(
        { error: 'Display name is required' },
        { status: 400 }
      )
    }

    const { data: listing, error } = await supabaseAdmin
      .from('listings')
      .insert({
        user_id: session.user.id,
        display_name,
        city,
        state,
        status: 'pending',
        tier: 'basic',
        ...listingData,
      })
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create listing' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: listing,
        message: 'Listing created successfully',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Listing creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
