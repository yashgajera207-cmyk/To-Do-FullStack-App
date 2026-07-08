"use client";

import { Mail, User as UserIcon } from "lucide-react";
import { getInitials } from "@/utils/helpers";
import type { User } from "@/types/auth";

export default function ProfileCard({ user }: { user: User }) {
  return (
    <div className="rounded-xl2 border border-mist-200 bg-white p-6">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-900 text-lg font-semibold text-white">
          {getInitials(user.name)}
        </div>
        <div>
          <h2 className="font-display text-lg font-semibold text-ink-900">{user.name}</h2>
          <p className="text-sm text-mist-500">{user.email}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3 border-t border-mist-100 pt-6">
        <div className="flex items-center gap-3 text-sm">
          <UserIcon className="h-4 w-4 text-mist-400" />
          <span className="text-mist-500">Full name</span>
          <span className="ml-auto font-medium text-ink-900">{user.name}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Mail className="h-4 w-4 text-mist-400" />
          <span className="text-mist-500">Email</span>
          <span className="ml-auto font-medium text-ink-900">{user.email}</span>
        </div>
      </div>
    </div>
  );
}
