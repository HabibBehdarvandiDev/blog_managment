import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt, verifySession } from "./lib/session";

export default async function middleware(req: NextRequest) {
  const protectedRoutes = ["/dashboard"];
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  if (isProtectedRoute) {
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie!);

    if (!session?.userId) {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard",
};
