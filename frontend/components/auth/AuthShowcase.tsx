import { CheckCircle2, ListChecks, Sparkles, Zap } from "lucide-react";

const items = [
  {
    icon: ListChecks,
    title: "Organize everything",
    desc: "Group tasks, track status, never lose context.",
    active: true,
  },
  {
    icon: Zap,
    title: "Move fast",
    desc: "Toggle, edit, and ship tasks in a couple clicks.",
    active: false,
  },
  {
    icon: Sparkles,
    title: "Stay in flow",
    desc: "A clean workspace built for focus, not friction.",
    active: false,
  },
];

export default function AuthShowcase() {
  return (
    <div className="relative hidden h-full w-[300px] shrink-0 flex-col justify-between overflow-hidden rounded-[1.25rem] bg-ink-950 p-6 md:flex">
      <div
        aria-hidden
        className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-500/30 blur-3xl animate-float"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-accent-400/20 blur-3xl animate-drift"
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500 text-white shadow-glow">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <span className="font-display text-[15px] font-semibold text-white">
            TaskFlow
          </span>
        </div>

        <p className="mb-1 mt-8 text-[11px] font-semibold uppercase tracking-wider text-mist-400">
          Why TaskFlow
        </p>

        <div className="mt-3 space-y-2">
          {items.map(({ icon: Icon, title, desc, active }) => (
            <div
              key={title}
              className={`flex items-start gap-3 rounded-xl border p-3 transition-colors ${
                active
                  ? "border-accent-500/40 bg-accent-500/10"
                  : "border-white/5 bg-white/[0.03]"
              }`}
            >
              <div
                className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  active ? "bg-accent-500 text-white" : "bg-white/10 text-mist-200"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-white">{title}</p>
                <p className="mt-0.5 text-[12px] leading-snug text-mist-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 rounded-xl border border-white/5 bg-white/[0.03] p-4">
        <p className="text-[12px] leading-relaxed text-mist-300">
          "Went from scattered sticky notes to a workspace my whole team
          actually uses."
        </p>
        <p className="mt-2 text-[11px] font-semibold text-mist-500">
          — a TaskFlow user
        </p>
      </div>
    </div>
  );
}
