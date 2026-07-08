"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckCircle2, LayoutGrid, ListChecks, LogOut, UserRound } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/constants";
import { cn, getInitials } from "@/utils/helpers";

const links = [
  { href: ROUTES.dashboard, label: "Dashboard", icon: LayoutGrid },
  { href: ROUTES.tasks, label: "Tasks", icon: ListChecks },
  { href: ROUTES.profile, label: "Profile", icon: UserRound },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-mist-200 bg-white px-4 py-6 md:flex">
      <div className="flex items-center gap-2 px-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-500 text-white shadow-glow">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <span className="font-display text-lg font-semibold text-ink-900">TaskFlow</span>
      </div>

      <nav className="mt-10 flex-1 space-y-1">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent-500/10 text-accent-600"
                  : "text-mist-500 hover:bg-mist-100 hover:text-ink-900"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-mist-200 pt-4">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-xs font-semibold text-white">
            {user ? getInitials(user.name) : "--"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink-900">{user?.name}</p>
            <p className="truncate text-xs text-mist-500">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-mist-500 transition-colors hover:bg-red-50 hover:text-red-500"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
