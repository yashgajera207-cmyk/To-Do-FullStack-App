"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authService } from "@/services/auth.service";
import { clearSession, getStoredUser, getToken, setSession } from "@/lib/auth";
import { getErrorMessage } from "@/utils/helpers";
import { ROUTES } from "@/lib/constants";
import type { LoginPayload, RegisterPayload, User } from "@/types/auth";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    const storedUser = getStoredUser();
    if (token && storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (payload: LoginPayload) => {
      try {
        const res = await authService.login(payload);
        if (res.success) {
          setSession(res.data.token, res.data.user);
          setUser(res.data.user);
          toast.success("Welcome back!");
          router.push(ROUTES.dashboard);
        }
      } catch (error) {
        toast.error(getErrorMessage(error));
        throw error;
      }
    },
    [router]
  );

  const register = useCallback(
    async (payload: RegisterPayload) => {
      try {
        const res = await authService.register(payload);
        if (res.success) {
          setSession(res.data.token, res.data.user);
          setUser(res.data.user);
          toast.success("Account created successfully!");
          router.push(ROUTES.dashboard);
        }
      } catch (error) {
        toast.error(getErrorMessage(error));
        throw error;
      }
    },
    [router]
  );

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
    toast.success("Signed out");
    router.push(ROUTES.login);
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
