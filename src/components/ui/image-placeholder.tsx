"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  className?: string;
  /** Overlay style: 'gradient' fades edges, 'dark' is full dark overlay, 'subtle' is very light */
  overlay?: "gradient" | "dark" | "subtle";
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
    gradient: "bg-[radial-gradient(ellipse_at_center,rgba(26,26,42,0.1),rgba(8,8,14,0.6))]",
    dark: "bg-void/40",
    subtle: "bg-void/20",
  };

  if (!src) {
    // Placeholder: subtle gradient with faint grid pattern
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-lg border border-titanium-dark",
          "bg-[linear-gradient(135deg,rgba(26,26,42,0.8),rgba(8,8,14,0.95))]",
          className
        )}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(58,58,78,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(58,58,78,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />
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
