import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === 'admin';
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

    // Protect admin routes
    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public routes
        const publicRoutes = ['/', '/login', '/register'];
        if (publicRoutes.includes(req.nextUrl.pathname)) {
          return true;
        }

        // Require authentication for protected routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/my-notes/:path*', '/notes/:path*', '/pay/:path*'],
};
