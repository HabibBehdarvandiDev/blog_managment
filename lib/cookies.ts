import "server-only";
import { SignJWT, jwtDecrypt, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(
  process.env.JWT_SECRET || "ofVtJJ0UhDl/Gt9NXn4g9mSc6dT1ac8mtxRyn/jgv40="
);

const cookieOptions = {
  name: "session",
  options: {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
  },
  duration: 24 * 60 * 60 * 1000, // 1 day in milliseconds
};

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d") // shortened notation
    .sign(key);
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
}

export async function createSession(userId: number) {
  const expires = new Date(Date.now() + cookieOptions.duration);
  const session = await encrypt({ userId, expires });

  cookies().set(cookieOptions.name, session, {
    ...cookieOptions.options,
    expires,
  });
  return null;
}

export async function verifySession() {
  const sessionCookie = cookies().get(cookieOptions.name)?.value;
  if (!sessionCookie) {
    redirect("/auth/login");
  }

  const session = await decrypt(sessionCookie);
  if (!session || !session.userId) {
    redirect("/auth/login");
  }

  return { userId: session.userId };
}

export async function deleteSession() {
  cookies().delete(cookieOptions.name);
  redirect("/auth/login");
}

export async function checkSessionAndRedirect(destination: string) {
  // Access the session cookie
  const sessionCookie = cookies().get("session")?.value;

  if (sessionCookie) {
    // Decrypt and verify the session
    const session = await decrypt(sessionCookie);

    if (session && session.userId) {
      // If the session is valid, redirect to the specified destination
      redirect(destination);
    }
  }
}