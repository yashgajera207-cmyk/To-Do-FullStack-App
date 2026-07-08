import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  tone?: "accent" | "success" | "neutral";
}

const tones = {
  accent: "bg-accent-500/10 text-accent-600",
  success: "bg-emerald-50 text-emerald-600",
  neutral: "bg-mist-100 text-mist-600",
};

export default function StatsCard({ label, value, icon: Icon, tone = "neutral" }: StatsCardProps) {
  return (
    <div className="rounded-xl2 border border-mist-200 bg-white p-5">
      <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${tones[tone]}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="font-display text-2xl font-semibold text-ink-900">{value}</p>
      <p className="mt-1 text-sm text-mist-500">{label}</p>
    </div>
  );
}
