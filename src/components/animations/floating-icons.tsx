import type { LucideIcon } from "lucide-react";

interface FloatingIconConfig {
  Icon: LucideIcon;
  top: string;
  left: string;
  size: number;
  delay: string;
}

interface FloatingIconsProps {
  icons: readonly FloatingIconConfig[];
  className?: string;
  opacity?: number;
}

export function FloatingIcons({ icons, className = "h-[50%]", opacity = 0.15 }: FloatingIconsProps) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 top-0 ${className}`}>
      {icons.map(({ Icon, top, left, size, delay }, i) => (
        <Icon
          key={i}
          className="absolute text-titanium-light animate-float"
          style={{ top, left, width: size, height: size, opacity, animationDelay: delay }}
          strokeWidth={1}
        />
      ))}
    </div>
  );
}
