"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.08,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const lines = el.querySelectorAll(".reveal-line");
    if (lines.length === 0) return;

    gsap.set(lines, { y: "100%", opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
      delay,
    });

    tl.to(lines, {
      y: "0%",
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [delay, stagger]);

  return (
    <div ref={containerRef} className={className} role="heading">
      <span className="reveal-line inline-block">{children}</span>
    </div>
  );
}

export function TextRevealByLine({
  children,
  className = "",
  delay = 0,
  stagger = 0.12,
}: {
  children: string[];
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const lines = el.querySelectorAll(".reveal-line");

    gsap.set(lines, { y: 60, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        once: true,
      },
      delay,
    });

    tl.to(lines, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
      stagger,
    });

    return () => {
      tl.kill();
    };
  }, [delay, stagger]);

  return (
    <div ref={containerRef} className={className}>
      {children.map((line, i) => (
        <div key={i} className="overflow-hidden">
          <div className="reveal-line">{line}</div>
        </div>
      ))}
    </div>
  );
}
