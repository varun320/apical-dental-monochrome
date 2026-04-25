"use client";

import { useState } from "react";
import Image from "next/image";
import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";
import { VideoModal } from "@/components/ui/video-modal";

const credentials = [
  "PhD",
  "DMD",
  "40-yr practice",
  "800+ adaptations",
  "USPTO patent filings",
  "500+ DSO offices",
];

const stats = [
  { value: "40+", label: "Years in prosthodontics" },
  { value: "800+", label: "Engineered adaptations" },
  { value: "500+", label: "DSO office network" },
  { value: "15+", label: "Years training surgeons" },
];

export function Authority() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section className="section-graphite border-t border-white/10">
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[42fr_58fr] md:gap-20">
          {/* Left — eyebrow + name */}
          <FadeIn>
            <p className="eyebrow text-bone/60">04 — The authority</p>
            <h2 className="mt-5 font-[family-name:var(--font-fraunces)] font-normal leading-[1.05] tracking-[-1.5px] text-bone text-[clamp(2rem,4vw,3.5rem)]">
              Dr. Ted Lewis
              <br />
              <span className="text-bone/60 italic font-light text-[0.7em]">PhD, DMD</span>
            </h2>

            <div className="mt-8 flex flex-wrap gap-x-2 gap-y-2">
              {credentials.map((c) => (
                <span
                  key={c}
                  className="border border-white/15 px-3 py-1.5 font-[family-name:var(--font-inter)] text-[10.5px] font-medium uppercase tracking-[1.5px] text-bone/75"
                >
                  {c}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Right — bio + IMU + media */}
          <div className="flex flex-col gap-10">
            <FadeIn delay={0.15}>
              <p className="font-[family-name:var(--font-inter)] text-[1.0625rem] leading-[1.7] text-bone/85">
                Forty years mastering the art and science of prosthodontics. Now training Tesla&apos;s
                Optimus to perform with superhuman precision — starting with the dental laboratory.
              </p>
              <p className="mt-5 font-[family-name:var(--font-inter)] text-[15px] leading-[1.7] text-bone/70">
                With 800+ engineered instrument adaptations for robotic hands (USPTO filings in
                progress) and an IMU-based capture pipeline that turns decades of human handwork
                into robotic capability, Dr. Lewis is the only person bridging clinical mastery
                with practical robotics integration at scale.
              </p>
            </FadeIn>

            <StaggerFadeIn className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-4 border-t border-white/15 pt-10" stagger={0.08}>
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-[family-name:var(--font-fraunces)] text-[2.5rem] font-light leading-none tracking-[-1.5px] text-bone">
                    {s.value}
                  </div>
                  <p className="mt-2 eyebrow text-bone/55">{s.label}</p>
                </div>
              ))}
            </StaggerFadeIn>

            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2">
                <button
                  onClick={() => setDemoOpen(true)}
                  className="group relative aspect-video overflow-hidden bg-graphite cursor-pointer"
                >
                  <Image
                    src="/images/hero-team.png"
                    alt="Dr. Lewis demonstrating robotic dental procedures"
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "grayscale(0.6) brightness(0.55) contrast(1.05)" }}
                  />
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/40 bg-graphite/40 backdrop-blur-sm transition-colors group-hover:border-terracotta group-hover:bg-terracotta">
                      <svg className="ml-1 h-4 w-4 text-bone" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="mt-4 eyebrow text-bone/75">Watch the demo</p>
                  </div>
                </button>

                <div className="bg-graphite p-8 md:p-10 flex flex-col justify-center">
                  <p className="eyebrow text-terracotta">IMU Technology</p>
                  <p className="mt-5 font-[family-name:var(--font-inter)] text-[14.5px] leading-[1.7] text-bone/80">
                    Inertial-measurement sensors capture Dr. Lewis&apos;s hand movements in real time —
                    transferred directly to Optimus for robotic replication. Camera/sensor fingertip
                    tech. Sixty-four degrees of freedom.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
      <VideoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
}
