"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Cpu } from "lucide-react";

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  className?: string;
  overlay?: "gradient" | "dark" | "subtle" | "light";
  priority?: boolean;
}

export function ImagePlaceholder({
  src,
  alt,
  className = "",
  overlay = "gradient",
  priority = false,
}: ImagePlaceholderProps) {
  const overlayStyles = {
    gradient: "bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(6,7,13,0.7))]",
    dark: "bg-void/50",
    subtle: "bg-void/20",
    light: "bg-white/20",
  };

  if (!src) {
    const isDark = overlay !== "light";
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border flex items-center justify-center",
          isDark
            ? "border-titanium-dark bg-deep-void"
            : "border-light-border bg-light-bg",
          className
        )}
      >
        {/* Grid pattern */}
        <div className={cn(
          "absolute inset-0 bg-[size:32px_32px]",
          isDark
            ? "bg-[linear-gradient(rgba(148,163,184,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.04)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(100,116,139,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.06)_1px,transparent_1px)]"
        )} />
        {/* Centered icon */}
        <Cpu
          className={cn("relative z-10", isDark ? "text-titanium-dark" : "text-light-border")}
          style={{ width: 48, height: 48 }}
          strokeWidth={0.8}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-xl group", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover grayscale-[30%] brightness-[0.8] transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 600px"
        priority={priority}
      />
      <div className={cn("absolute inset-0 transition-opacity duration-500", overlayStyles[overlay])} />
    </div>
  );
}
