"use client";

import { useAuth } from "@/hooks/useAuth";

export default function DashboardHeader() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink-900">
        {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
      </h1>
      <p className="mt-1 text-sm text-mist-500">
        Here's a snapshot of everything on your plate today.
      </p>
    </div>
  );
}
