import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  // Ignore API routes, static files, images, etc.
  if (
    path.startsWith("/api") ||
    path.startsWith("/_next") ||
    path.includes(".")
  ) {
    return NextResponse.next();
  }

  // Force lowercase paths to prevent 404s from mixed-case URLs
  if (path !== path.toLowerCase()) {
    url.pathname = path.toLowerCase();
    return NextResponse.redirect(url, 308);
  }

  // Handle trailing slashes gracefully if they sneak in
  if (path.length > 1 && path.endsWith("/")) {
    url.pathname = path.slice(0, -1);
    return NextResponse.redirect(url, 308);
  }

  // SECURITY: Protect /admin and /portal routes
  if (path.startsWith("/admin") || path.startsWith("/portal")) {
    // We use getToken from next-auth/jwt to check the session token
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    
    if (!token) {
      // Not logged in -> Redirect to login page
      url.pathname = "/login";
      url.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(url);
    }
    
    // Customers cannot access /admin
    if (path.startsWith("/admin") && token.role === "CUSTOMER") {
      url.pathname = "/portal";
      return NextResponse.redirect(url);
    }

    // Admins/Staff shouldn't normally be in the customer portal (optional strict separation)
    if (path.startsWith("/portal") && token.role !== "CUSTOMER") {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// Only run middleware on non-static, non-api routes
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)"],
};
