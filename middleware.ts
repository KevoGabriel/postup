import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([ // Define public routes that do not require authentication
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId, redirectToSignIn } = await auth(); // Get user and organization IDs from authentication context

  if (userId && isPublicRoute(req)) {
    let path = '/select-org'; // Default path for authenticated users

    if (orgId) {
      path = `/organization/${orgId}`; // If organization ID exists, redirect to the organization page
    }

    const orgSelection = new URL(path, req.url);
    return NextResponse.redirect(orgSelection); // Redirect to the appropriate page based on authentication status
  }

  if (!userId && !isPublicRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });// Redirect unauthenticated users to the sign-in page with the current URL as the return URL
  }

  if (userId && !orgId && req.nextUrl.pathname !== '/select-org') {
    const orgSelection = new URL('/select-org', req.url);
    return NextResponse.redirect(orgSelection); // Redirect authenticated users without an organization to the organization selection page
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};