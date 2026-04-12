"use client";

import { StaggerFadeIn } from "@/components/animations/fade-in";
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
  return (
    <section className="relative bg-light-bg px-6 py-28 lg:py-36 overflow-hidden">
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-100 w-100 rounded-full bg-[radial-gradient(circle,rgba(94,175,197,0.06),transparent_70%)]" />
      <div className="relative z-10 mx-auto max-w-[1100px]">
        <SectionHeader
          label="The Authority"
          title={<>Dr. Ted Lewis<br /><span className="text-light-muted">PhD, DMD</span></>}
          light
        />

        {/* Bento Grid */}
        <StaggerFadeIn
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-3"
          stagger={0.08}
        >
          {/* ─ Bio (spans 2 cols, 2 rows) ─ */}
          <div className="relative overflow-hidden rounded-lg border border-light-border bg-light-card p-7 shadow-sm md:col-span-2 md:row-span-2">
            <p className="font-body text-[16px] leading-[1.8] text-light-muted">
              Dr. Ted Lewis has spent 40 years mastering the art and science of
              prosthodontics. Now he&apos;s training Tesla&apos;s Optimus robot
              to perform with superhuman precision — starting with the dental
              laboratory.
            </p>
            <p className="mt-4 font-body text-[14px] leading-[1.75] text-light-muted">
              With 800+ engineered instrument adaptations for robotic hands
              (patent filings in progress via USPTO) and IMU-based training
              methodology that captures human hand movements for robotic
              replication, Dr. Lewis is the only person bridging 40 years of
              clinical mastery with cutting-edge robotics integration.
            </p>
            <p className="mt-4 font-body text-[14px] leading-[1.75] text-light-muted">
              He trains doctors and surgeons within a 500+ location DSO
              network, and has developed the first-person movement capture
              pipeline that turns decades of human expertise into robotic
              capability.
            </p>
            {/* Watermark */}
            <UserRound
              className="absolute bottom-6 right-6 text-light-border"
              style={{ width: 120, height: 120, opacity: 0.3 }}
              strokeWidth={1}
            />
          </div>

          {/* ─ Stat Cards with Icons ─ */}
          {authorityStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-lg border border-light-border bg-light-card p-6 shadow-sm flex flex-col justify-center transition-all hover:shadow-lg hover:-translate-y-1.5 hover:border-cyan-muted/30"
              >
                <Icon className="mb-2 h-5 w-5 text-light-muted" strokeWidth={1.5} />
                <div className="font-display text-[40px] font-bold leading-none tracking-[-1.5px] text-mint">
                  <NumberTicker value={stat.value} delay={stat.delay} />{stat.suffix}
                </div>
                <p className="mt-2 font-display text-[10px] font-semibold uppercase tracking-[2px] text-light-muted">
                  {stat.label}
                </p>
              </div>
            );
          })}

          {/* ─ Video / Image (spans 2 cols) ─ */}
          <div className="relative aspect-video overflow-hidden rounded-lg border border-light-border bg-light-card shadow-sm md:col-span-2">
            <ImagePlaceholder
              alt="Dr. Ted Lewis demonstrating robotic dental procedures"
              className="absolute inset-0 h-full w-full rounded-none border-0"
              overlay="light"
            />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-light-border bg-white/80 backdrop-blur-sm shadow-md">
                  <svg className="ml-1 h-5 w-5 text-light-text" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="mt-3 font-display text-[10px] font-semibold uppercase tracking-[2px] text-light-muted">
                  Watch Demo
                </p>
              </div>
            </div>
          </div>

          {/* ─ IMU Technology (spans 2 cols) ─ */}
          <div className="relative overflow-hidden rounded-lg border border-gold-muted/30 bg-light-card p-7 shadow-sm md:col-span-2">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-gold-muted" strokeWidth={1.5} />
              <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-light-text">
                IMU Technology
              </p>
            </div>
            <p className="mt-3 font-body text-[14px] leading-[1.75] text-light-muted">
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
