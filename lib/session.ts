import "server-only";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const key = new TextEncoder().encode(process.env.JWT_SECRET!);

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

async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d") // shortened notation
    .sign(key);
}

async function decrypt(session: string) {
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

  const cookieStore = cookies();
  cookieStore.set(cookieOptions.name, session, {
    ...cookieOptions.options,
    expires,
  });
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
