import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/cookies"; // Adjust the path as needed

export async function middleware(req: NextRequest) {
  const adminRoutes = ["/admin", "/admin/dashboard"];
  const writerRoutes = ["/writer", "/writer/dashboard"];
  const path = req.nextUrl.pathname;

  // Get the session cookie
  const cookie = req.cookies.get("session")?.value;

  if (!cookie) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  const session = await decrypt(cookie);

  if (!session?.userId) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  const userRole = session.role; // "admin" or "writer"

  // Role-based access control
  if (userRole === "admin" && writerRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.nextUrl));
  }

  if (userRole === "writer" && adminRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.redirect(new URL("/writer/dashboard", req.nextUrl));
  }

  // Allow the request if the role matches the route
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/writer/:path*"], // Match all routes under /admin and /writer
};
