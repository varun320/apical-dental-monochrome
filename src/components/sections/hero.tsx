"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { VideoModal } from "@/components/ui/video-modal";
import { siteConfig } from "@/config/site";

export function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(eyebrowRef.current, { opacity: 0, y: 12, duration: 0.5 })
        .from(headlineRef.current, { opacity: 0, y: 20, duration: 0.7 }, "-=0.25")
        .from(subRef.current, { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
        .from(ctaRef.current, { opacity: 0, y: 12, duration: 0.5 }, "-=0.35")
        .from(linkRef.current, { opacity: 0, y: 10, duration: 0.4 }, "-=0.3")
        .from(imgRef.current, { opacity: 0, duration: 0.9 }, "-=0.7");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="section-bone relative overflow-hidden"
    >
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 px-6 pb-24 pt-32 md:grid-cols-[55fr_45fr] md:gap-16 md:px-10 md:pt-44 md:pb-32 lg:pt-48 lg:pb-36">
        {/* Left — editorial column */}
        <div className="flex flex-col justify-center">
          <p
            ref={eyebrowRef}
            className="eyebrow text-graphite"
          >
            Apical Dental — Est. 1984
          </p>

          <h1
            ref={headlineRef}
            className="mt-5 font-[family-name:var(--font-fraunces)] text-graphite font-light leading-[1.02] tracking-[-2px]"
            style={{ fontSize: "clamp(2.5rem, 6.4vw, 5.25rem)" }}
          >
            Human expertise.
            <br />
            <span className="italic font-light text-terracotta-deep">Robotic precision.</span>
          </h1>

          <p
            ref={subRef}
            className="mt-7 max-w-[520px] font-[family-name:var(--font-inter)] text-[17px] leading-[1.6] text-graphite"
          >
            Four decades of dental-lab mastery, now paired with Tesla&apos;s Optimus humanoid on the bench.
            Apical delivers surgical-grade crowns, bridges, and implants to every DSO chair in the network —
            at unprecedented scale, with zero regulatory overhead.
          </p>

          <div ref={ctaRef} className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={siteConfig.cta.href}
              className="group inline-flex items-center gap-3 bg-terracotta px-7 py-[18px] font-[family-name:var(--font-inter)] text-[14px] font-medium tracking-[0.5px] text-bone transition-colors hover:bg-graphite"
            >
              {siteConfig.cta.primary}
              <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </Link>
            <button
              onClick={() => setDemoOpen(true)}
              className="inline-flex items-center gap-2 px-2 py-[18px] font-[family-name:var(--font-inter)] text-[14px] font-medium text-graphite hover:text-terracotta-deep transition-colors"
            >
              Watch the lab in motion
            </button>
          </div>

          <div ref={linkRef} className="mt-3">
            <Link
              href="/technology"
              className="inline-block font-[family-name:var(--font-inter)] text-[13px] font-medium tracking-[0.4px] text-graphite border-b border-graphite/30 pb-1 hover:border-graphite transition-colors"
            >
              See the technology →
            </Link>
          </div>
        </div>

        {/* Right — image column, edge-to-edge editorial */}
        <div ref={imgRef} className="relative aspect-[4/5] md:aspect-auto md:min-h-[60vh] lg:min-h-[70vh] overflow-hidden">
          <Image
            src="/images/hero-team.png"
            alt="Apical Dental laboratory craftsmanship"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover"
            style={{ filter: "saturate(0.9) contrast(1.05)" }}
          />
        </div>
      </div>

      {/* thin baseline */}
      <div className="border-t border-rule" />

      <VideoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
}
