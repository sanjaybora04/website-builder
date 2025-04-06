
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export function middleware(request: NextRequest) {
  const host = request.headers.get('host')
  
  if (!host || host === new URL(BASE_URL!).host) {
    return NextResponse.next()
  }

  const pathname = request.nextUrl.pathname

  // Rewrite to tenant-aware route
  const url = request.nextUrl.clone()
  url.pathname = `/site${pathname}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}
