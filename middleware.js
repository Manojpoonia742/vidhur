import { NextResponse } from "next/server";

const publicPaths = ["/login", "/signup", "/forgot-password"];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // allow public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const token = req.cookies.get("token");

  if (!token) {
    // redirect to login if no token
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// match all pages except static files
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
