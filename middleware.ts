import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/cookies"; // Adjust the path as needed

export async function middleware(req: NextRequest) {
  const protectedRoutes = ["/dashboard"];
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  if (isProtectedRoute) {
    const cookie = req.cookies.get("session")?.value;

    if (!cookie) {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }

    const session = await decrypt(cookie);

    if (!session?.userId) {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard",
};
