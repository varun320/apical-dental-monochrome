"use client";

import { useState } from "react";
import Image from "next/image";
import { StaggerFadeIn } from "@/components/animations/fade-in";
import { VideoModal } from "@/components/ui/video-modal";
import { SectionHeader } from "@/components/ui/section-header";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Clock, Cog, Building2, GraduationCap, UserRound, Cpu } from "lucide-react";

const authorityStats = [
  { value: 40, suffix: "+", label: "Years in Prosthodontics", icon: Clock, delay: 0.4 },
  { value: 800, suffix: "+", label: "Engineered Adaptations", icon: Cog, delay: 0.55 },
  { value: 500, suffix: "+", label: "DSO Office Network", icon: Building2, delay: 0.7 },
  { value: 15, suffix: "+", label: "Years Training Surgeons", icon: GraduationCap, delay: 0.85 },
];

export function Authority() {
  const [demoOpen, setDemoOpen] = useState(false);
  return (
    <section className="section-dark relative bg-void px-6 py-32 lg:py-40 overflow-hidden">
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/hero-network.png"
          alt=""
          fill
          className="object-cover grayscale-[50%] brightness-[0.15] opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-void/60" />
      </div>
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-100 w-100 rounded-full bg-[radial-gradient(circle,rgba(94,175,197,0.05),transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <SectionHeader
          label="The Authority"
          title={<>Dr. Ted Lewis<br /><span className="text-titanium-light">PhD, DMD</span></>}
        />

        {/* Credential badges */}
        <div className="mt-8 flex flex-wrap gap-2">
          {["PhD", "DMD", "40yr Experience", "800+ Adaptations", "USPTO Patent Filer", "DSO Network"].map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-titanium-dark bg-deep-void px-3 py-1 font-display text-[10px] font-semibold uppercase tracking-[1.5px] text-titanium-light"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Bento Grid */}
        <StaggerFadeIn
          className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-3"
          stagger={0.08}
        >
          {/* ─ Bio (spans 2 cols, 2 rows) ─ */}
          <div className="relative overflow-hidden rounded-lg border border-titanium-dark bg-deep-void p-7 md:col-span-2 md:row-span-2">
            <p className="font-body text-[16px] leading-[1.8] text-titanium-light">
              Dr. Ted Lewis has spent 40 years mastering the art and science of
              prosthodontics. Now he&apos;s training Tesla&apos;s Optimus robot
              to perform with superhuman precision — starting with the dental
              laboratory.
            </p>
            <p className="mt-4 font-body text-[14px] leading-[1.75] text-titanium-light">
              With 800+ engineered instrument adaptations for robotic hands
              (patent filings in progress via USPTO) and IMU-based training
              methodology that captures human hand movements for robotic
              replication, Dr. Lewis is the only person bridging 40 years of
              clinical mastery with cutting-edge robotics integration.
            </p>
            <p className="mt-4 font-body text-[14px] leading-[1.75] text-titanium-light">
              He trains doctors and surgeons within a 500+ location DSO
              network, and has developed the first-person movement capture
              pipeline that turns decades of human expertise into robotic
              capability.
            </p>
            {/* Watermark */}
            <UserRound
              className="absolute bottom-6 right-6 text-titanium-dark"
              style={{ width: 120, height: 120, opacity: 0.2 }}
              strokeWidth={1}
            />
          </div>

          {/* ─ Stat Cards with Icons ─ */}
          {authorityStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-lg border border-titanium-dark bg-deep-void p-6 flex flex-col justify-center transition-all hover:border-titanium hover:-translate-y-1.5"
              >
                <Icon className="mb-2 h-5 w-5 text-titanium" strokeWidth={1.5} />
                <div className="font-display text-[40px] font-bold leading-none tracking-[-1.5px] text-white-pure">
                  <NumberTicker value={stat.value} delay={stat.delay} />{stat.suffix}
                </div>
                <p className="mt-2 font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium">
                  {stat.label}
                </p>
              </div>
            );
          })}

          {/* ─ Video / Image (spans 2 cols) ─ */}
          <button
            onClick={() => setDemoOpen(true)}
            className="relative aspect-video overflow-hidden rounded-lg border border-titanium-dark bg-deep-void md:col-span-2 cursor-pointer transition-all hover:border-titanium hover:-translate-y-1 group"
          >
            <ImagePlaceholder
              alt="Dr. Ted Lewis demonstrating robotic dental procedures"
              className="absolute inset-0 h-full w-full rounded-none border-0"
              overlay="dark"
            />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-titanium-dark bg-void/80 backdrop-blur-sm transition-all group-hover:border-titanium">
                  <svg className="ml-1 h-5 w-5 text-white-pure" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="mt-3 font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium">
                  Watch Demo
                </p>
              </div>
            </div>
          </button>
          <VideoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />

          {/* ─ IMU Technology (spans 2 cols) ─ */}
          <div className="relative overflow-hidden rounded-lg border border-gold-muted/20 bg-deep-void p-7 md:col-span-2">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-gold-muted" strokeWidth={1.5} />
              <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-white-pure">
                IMU Technology
              </p>
            </div>
            <p className="mt-3 font-body text-[14px] leading-[1.75] text-titanium-light">
              Inertial Measurement Unit sensors capture Dr. Lewis&apos;s hand
              movements in real-time — transferred directly to Optimus for
              robotic replication. Camera/sensor fingertip technology. 64 degrees
              of freedom.
            </p>
            <BorderBeam
              size={100}
              duration={10}
              colorFrom="#B8A078"
              colorTo="#8A7A5E"
              borderWidth={1}
            />
          </div>
        </StaggerFadeIn>
      </div>
    </section>
  );
}
