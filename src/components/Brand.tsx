import { cn } from "@/lib/utils";
import logo from "@/assets/logo.svg";

export function BrandMark({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const dims =
    size === "sm" ? "size-8" : size === "lg" ? "size-14" : "size-10";
  return (
    <img
      src={logo}
      alt="Shaishav One AI logo"
      width={64}
      height={64}
      className={cn(
        "shrink-0 rounded-lg object-contain shadow-sm",
        dims,
        className,
      )}
    />
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
