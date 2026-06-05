import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const token = await getToken({ req: request })

    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  // Protect API routes
  if (pathname.startsWith('/api/listings') && (request.method === 'POST' || request.method === 'PATCH' || request.method === 'DELETE')) {
    const token = await getToken({ req: request })

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  if (pathname.startsWith('/api/verification')) {
    const token = await getToken({ req: request })

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    const isLoggedIn = request.cookies.get('admin_token')?.value

    // Allow login page without authentication
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Redirect to login if not authenticated
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/listings/:path*',
    '/api/verification/:path*',
    '/admin/:path*',
  ],
}
