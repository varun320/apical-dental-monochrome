"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ScrollRevealTextProps {
  children: React.ReactNode;
  className?: string;
  /** How many viewport heights of scroll distance to map the reveal across */
  scrubLength?: number;
}

export function ScrollRevealText({
  children,
  className = "",
  scrubLength = 1.5,
}: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const lines = el.querySelectorAll(".sr-line");
    if (lines.length === 0) return;

    gsap.set(lines, { opacity: 0.15, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 70%",
        end: `+=${window.innerHeight * scrubLength}`,
        scrub: 0.8,
      },
    });

    lines.forEach((line, i) => {
      tl.to(
        line,
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        i * 0.3
      );
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [scrubLength]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
