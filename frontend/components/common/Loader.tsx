import { Loader2 } from "lucide-react";
import { cn } from "@/utils/helpers";

export default function Loader({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 py-10", className)}>
      <Loader2 className="h-6 w-6 animate-spin text-accent-500" />
      {label && <p className="text-sm text-mist-500">{label}</p>}
    </div>
  );
}
