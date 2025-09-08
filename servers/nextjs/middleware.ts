import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware handles redirecting app_data requests to the FastAPI server
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for a file in the app_data directory
  if (pathname.startsWith('/app_data/')) {
    try {
      // Redirect to the FastAPI server
      const url = new URL(pathname, 'http://localhost:8000');
      return NextResponse.rewrite(url);
    } catch (error) {
      console.error('Error in middleware:', error);
      // If there's an error, continue with normal processing
      return NextResponse.next();
    }
  }

  // For all other requests, continue normal processing
  return NextResponse.next();
}

// Configure the paths that should trigger this middleware
export const config = {
  matcher: ['/app_data/:path*'],
};