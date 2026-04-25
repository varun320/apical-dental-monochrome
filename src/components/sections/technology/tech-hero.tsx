"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

export function TechHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(eyebrowRef.current, { opacity: 0, y: 12, duration: 0.5 })
        .from(headlineRef.current, { opacity: 0, y: 24, duration: 0.7 }, "-=0.25")
        .from(subRef.current, { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
        .from(ctaRef.current, { opacity: 0, y: 12, duration: 0.5 }, "-=0.35")
        .from(visualRef.current, { opacity: 0, duration: 0.9 }, "-=0.7");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-bone relative overflow-hidden"
    >
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 px-6 pb-24 pt-32 md:grid-cols-[55fr_45fr] md:gap-16 md:px-10 md:pt-44 md:pb-32 lg:pt-48 lg:pb-36">
        <div className="flex flex-col justify-center">
          <p ref={eyebrowRef} className="eyebrow text-graphite">
            Our Technology
          </p>
          <h1
            ref={headlineRef}
            className="mt-5 font-[family-name:var(--font-fraunces)] font-light leading-[1.02] tracking-[-2px] text-graphite"
            style={{ fontSize: "clamp(2.5rem, 6.4vw, 5.25rem)" }}
          >
            The future of
            <br />
            <span className="italic font-light text-terracotta-deep">robotic dentistry.</span>
          </h1>
          <p
            ref={subRef}
            className="mt-7 max-w-[520px] font-[family-name:var(--font-inter)] text-[17px] leading-[1.6] text-graphite"
          >
            Precision engineered. Clinically proven. Tesla&apos;s Optimus humanoid, purpose-built for
            dental laboratory excellence — backed by four decades of bench mastery.
          </p>

          <div ref={ctaRef} className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 bg-terracotta px-7 py-[18px] font-[family-name:var(--font-inter)] text-[14px] font-medium tracking-[0.5px] text-bone transition-colors hover:bg-graphite"
            >
              Request a demo
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
            <Link
              href="/for-dsos"
              className="inline-flex items-center gap-2 px-2 py-[18px] font-[family-name:var(--font-inter)] text-[14px] font-medium text-graphite border-b border-graphite/30 hover:border-graphite transition-colors"
            >
              DSO solutions →
            </Link>
          </div>
        </div>

        <div
          ref={visualRef}
          className="relative aspect-[4/5] md:aspect-auto md:min-h-[60vh] lg:min-h-[70vh] overflow-hidden"
        >
          <Image
            src="/images/hero-systems.png"
            alt="Apical Dental robotic precision system"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover"
            style={{ filter: "saturate(0.9) contrast(1.05)" }}
          />
        </div>
      </div>

      <div className="border-t border-rule" />
    </section>
  );
}
