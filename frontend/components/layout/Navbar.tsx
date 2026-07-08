"use client";

import { CheckCircle2, LogOut, Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/lib/constants";
import { cn } from "@/utils/helpers";

const links = [
  { href: ROUTES.dashboard, label: "Dashboard" },
  { href: ROUTES.tasks, label: "Tasks" },
  { href: ROUTES.profile, label: "Profile" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-mist-200 bg-white/80 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500 text-white">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <span className="font-display text-base font-semibold text-ink-900">TaskFlow</span>
      </div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-mist-500 hover:bg-mist-100"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full border-b border-mist-200 bg-white p-3 shadow-card">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-sm font-medium",
                pathname === link.href
                  ? "bg-accent-500/10 text-accent-600"
                  : "text-mist-500 hover:bg-mist-100"
              )}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={logout}
            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      )}
    </header>
  );
}
