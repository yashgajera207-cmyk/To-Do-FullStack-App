import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "./constants";
import type { User } from "@/types/auth";

export const setSession = (token: string, user: User) => {
  Cookies.set(AUTH_TOKEN_KEY, token, { expires: 7, sameSite: "lax" });
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }
};

export const getToken = (): string | undefined => {
  return Cookies.get(AUTH_TOKEN_KEY);
};

export const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_USER_KEY);
  return raw ? (JSON.parse(raw) as User) : null;
};

export const clearSession = () => {
  Cookies.remove(AUTH_TOKEN_KEY);
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_USER_KEY);
  }
};
