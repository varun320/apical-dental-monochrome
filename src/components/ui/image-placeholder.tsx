"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  className?: string;
  /** Overlay style: 'gradient' fades edges, 'dark' is full dark overlay, 'subtle' is very light, 'light' for light-themed sections */
  overlay?: "gradient" | "dark" | "subtle" | "light";
  priority?: boolean;
}

/**
 * Image container that shows a subtle gradient placeholder when no src is provided.
 * When src is provided, renders a next/image with monochrome treatment.
 * Drop in real images by adding src prop — no other changes needed.
 */
export function ImagePlaceholder({
  src,
  alt,
  className = "",
  overlay = "gradient",
  priority = false,
}: ImagePlaceholderProps) {
  const overlayStyles = {
    gradient: "bg-[radial-gradient(ellipse_at_center,rgba(17,24,39,0.1),rgba(6,7,13,0.6))]",
    dark: "bg-void/40",
    subtle: "bg-void/20",
    light: "bg-white/30",
  };

  if (!src) {
    const isLight = overlay === "light";
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border",
          isLight
            ? "border-light-border bg-[linear-gradient(135deg,rgba(241,245,249,1),rgba(226,232,240,1))]"
            : "border-titanium-dark bg-[linear-gradient(135deg,rgba(17,24,39,0.8),rgba(6,7,13,0.95))]",
          className
        )}
      >
        <div className={cn(
          "absolute inset-0 bg-[size:24px_24px]",
          isLight
            ? "bg-[linear-gradient(rgba(100,116,139,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.06)_1px,transparent_1px)]"
            : "bg-[linear-gradient(rgba(30,41,59,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(30,41,59,0.06)_1px,transparent_1px)]"
        )} />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-lg", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover grayscale-[50%] brightness-75"
        sizes="(max-width: 768px) 100vw, 600px"
        priority={priority}
      />
      <div className={cn("absolute inset-0", overlayStyles[overlay])} />
    </div>
  );
}
