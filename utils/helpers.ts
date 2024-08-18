import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/cookies"; // Adjust the path as needed

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


