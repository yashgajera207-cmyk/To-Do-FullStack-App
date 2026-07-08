import { cn } from "@/utils/helpers";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "pending" | "neutral" | "accent";
  className?: string;
}

const variants = {
  success: "bg-emerald-50 text-emerald-600",
  pending: "bg-amber-50 text-amber-600",
  neutral: "bg-mist-100 text-mist-500",
  accent: "bg-accent-500/10 text-accent-600",
};

export default function Badge({ children, variant = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
