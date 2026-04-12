"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { Construction, ArrowLeft } from "lucide-react";

export default function UnderConstructionPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(".uc-icon", { opacity: 0, scale: 0.8, duration: 0.6, ease: "back.out(2)" })
        .from(".uc-heading", { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" }, "-=0.3")
        .from(".uc-text", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .from(".uc-cta", { opacity: 0, y: 15, duration: 0.5, ease: "power3.out" }, "-=0.2");
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <main
        ref={contentRef}
        className="section-dark relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-void px-6"
      >
        {/* Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(148,163,184,0.06),transparent)]" />
          <AnimatedGridPattern
            numSquares={12}
            maxOpacity={0.08}
            duration={6}
            repeatDelay={3}
            className={cn(
              "absolute inset-0 h-full w-full",
              "mask-[radial-gradient(400px_circle_at_50%_50%,white,transparent)]"
            )}
          />
        </div>

        <div className="relative z-10 flex max-w-[500px] flex-col items-center text-center">
          <div className="uc-icon flex h-16 w-16 items-center justify-center rounded-full border border-titanium-dark bg-deep-void">
            <Construction className="h-7 w-7 text-titanium-light" strokeWidth={1.5} />
          </div>

          <h1 className="uc-heading mt-8 font-display text-[clamp(28px,5vw,40px)] font-bold leading-[1.1] tracking-[-1.5px] text-white-pure">
            Under Construction
          </h1>

          <p className="uc-text mt-4 font-body text-[16px] leading-[1.7] text-titanium-light">
            We&apos;re building something extraordinary. This page is coming soon — precision takes time.
          </p>

          <Link
            href="/"
            className="uc-cta mt-10 inline-flex items-center gap-2 rounded-md bg-white-pure px-6 py-3.5 font-display text-[12px] font-bold tracking-[0.5px] text-void transition-all hover:bg-cyan hover:shadow-[0_0_30px_rgba(94,175,197,0.5)]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
