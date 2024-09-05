import { decodeJWT } from "@/lib/session";

interface DecodedToken {
  userId: number;
  role: string;
}

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const getSessionToken = (): DecodedToken | null => {
  try {
    const token = sessionStorage.getItem("session");

    if (!token) {
      console.error("no Session Token Found!");
      return null;
    }

    const decodedToken: DecodedToken = decodeJWT(token!);
    if (!decodedToken) {
      console.error("Failed to decode session token");
      return null;
    }

    return decodedToken;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the session token:",
      error
    );
    return null;
  }
};
