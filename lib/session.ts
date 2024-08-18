import { SignJWT, jwtDecrypt, jwtVerify, type JWTPayload } from "jose";
import { jwtDecode } from "jwt-decode";

const key = new TextEncoder().encode(
  process.env.JWT_SECRET || "ofVtJJ0UhDl/Gt9NXn4g9mSc6dT1ac8mtxRyn/jgv40="
);

export async function createJWT(
  payload: JWTPayload,
  expiresIn: string = "1h"
): Promise<string> {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(key);

  return jwt;
}

export async function validateJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key);
    return payload;
  } catch (error) {
    console.error("Invalid or expired JWT:", error);
    return null;
  }
}

export async function decryptJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtDecrypt(token, key);
    return payload;
  } catch (error) {
    console.error("Invalid or expired JWE:", error);
    return null;
  }
}

// Function to decode a JWT and view its contents
export function decodeJWT(token: string): JWTPayload | null {
  try {
    // Decode the token without validating it
    const decoded = jwtDecode(token);
    return decoded as JWTPayload;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}