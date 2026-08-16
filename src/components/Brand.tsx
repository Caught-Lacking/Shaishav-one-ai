import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";

export function BrandMark({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const dims =
    size === "sm" ? "size-8" : size === "lg" ? "size-14" : "size-10";
  const icon =
    size === "sm" ? "size-4" : size === "lg" ? "size-7" : "size-5";
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 via-indigo-500 to-rose-500 text-white shadow-sm",
        dims,
        className,
      )}
    >
      <GraduationCap className={cn(icon, "drop-shadow-sm")} />
      {/* tiny pencil accent */}
      <span className="absolute -bottom-0.5 -right-0.5 flex size-3 items-center justify-center rounded-full border-2 border-background bg-amber-400" />
    </div>
  );
}

export function Brand({
  className,
  markSize = "md",
  nameClassName,
}: {
  className?: string;
  markSize?: "sm" | "md" | "lg";
  nameClassName?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <BrandMark size={markSize} />
      <div className="leading-tight">
        <p
          className={cn(
            "font-display text-[15px] font-bold tracking-tight text-foreground",
            nameClassName,
          )}
        >
          Shaishav One <span className="text-teal-600">AI</span>
        </p>
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          NEET · JEE study notebook
        </p>
      </div>
    </div>
  );
}
