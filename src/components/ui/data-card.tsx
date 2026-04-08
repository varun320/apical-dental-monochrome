import { cn } from "@/lib/utils";

interface DataCardProps {
  stat?: string;
  label?: string;
  title?: string;
  description: string;
  icon?: string;
  className?: string;
}

export function DataCard({
  stat,
  label,
  title,
  description,
  icon,
  className,
}: DataCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-titanium-dark bg-deep-void p-7 transition-colors hover:border-titanium/40",
        className
      )}
    >
      {icon && (
        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md border border-titanium-dark bg-void font-display text-[11px] tracking-[1px] text-titanium">
          {icon}
        </div>
      )}

      {stat && (
        <div className="font-display text-[36px] font-bold leading-none tracking-[-1px] text-white-pure">
          {stat}
        </div>
      )}

      {label && (
        <p className={cn(
          "font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium",
          stat ? "mt-2" : ""
        )}>
          {label}
        </p>
      )}

      {title && (
        <h3 className="font-display text-[18px] font-semibold leading-[1.4] text-white-pure">
          {title}
        </h3>
      )}

      <p className={cn(
        "font-body text-[14px] leading-[1.75] text-titanium-light",
        (title || stat || label) ? "mt-3" : ""
      )}>
        {description}
      </p>
    </div>
  );
}
