"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FadeIn, StaggerFadeIn } from "@/components/animations/fade-in";
import { FormInput, FormTextarea } from "@/components/ui/form-input";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import {
  Building2, Stethoscope, Bot, Mail, Phone, MapPin,
  ChevronDown, MessageSquare, Clock, Globe,
} from "lucide-react";

/* ── Path selector data ── */
const paths = [
  { id: "dso", icon: Building2, label: "I'm a DSO", description: "Multi-location partnership inquiries" },
  { id: "practitioner", icon: Stethoscope, label: "I'm a Practitioner", description: "Individual practice integration" },
  { id: "tesla", icon: Bot, label: "I'm from Tesla", description: "Robotics partnership & collaboration" },
] as const;

type PathId = (typeof paths)[number]["id"];

/* ── FAQs ── */
const faqs = [
  {
    q: "How long does the onboarding process take?",
    a: "For individual practices, onboarding typically takes 2-4 weeks. For DSOs, we run a pilot at 1-3 locations over 6-8 weeks before scaling across your network.",
  },
  {
    q: "Does the robotic system require special training for staff?",
    a: "Minimal training is needed. The system integrates with your existing CAD/CAM workflow. We provide hands-on training during onboarding and ongoing support.",
  },
  {
    q: "What's the typical ROI timeline?",
    a: "Most partners see positive ROI within the first year through reduced remakes (93% fewer), faster turnaround (60%), and labor optimization.",
  },
  {
    q: "Are there any regulatory requirements?",
    a: "Dental laboratory automation has zero additional regulatory barriers. No special licensing is needed — you can deploy immediately.",
  },
  {
    q: "Can it work with our existing equipment?",
    a: "Yes. The system is designed for universal compatibility with existing CAD/CAM systems, digital impression workflows, and practice management software.",
  },
] as const;

export default function ContactPage() {
  const [selectedPath, setSelectedPath] = useState<PathId | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: "", email: "", organization: "", role: "", locations: "", message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(".c-kicker", { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" })
        .from(".c-headline", { opacity: 0, y: 40, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .from(".c-sub", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.3");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); };

  const updateField = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-linear-to-b from-void via-void to-deep-void">
        {/* ══════════════════════════════════════════════
            SECTION 1 — Hero (split: text left, info right)
        ══════════════════════════════════════════════ */}
        <section className="relative overflow-hidden px-6 pt-36 pb-20 lg:pt-44 lg:pb-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_-10%,rgba(154,154,176,0.07),transparent)]" />
          </div>

          <div ref={heroRef} className="relative z-10 mx-auto max-w-[1100px]">
            <div className="grid items-start gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
              {/* Left — text */}
              <div>
                <p className="c-kicker mb-6 font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
                  Contact Us
                </p>
                <h1 className="c-headline font-display text-[clamp(32px,5vw,48px)] font-bold leading-[1.05] tracking-[-2px] text-white-pure">
                  Let&apos;s start a<br />
                  <span className="bg-linear-to-r from-white-pure via-titanium-light to-titanium bg-clip-text text-transparent">
                    conversation.
                  </span>
                </h1>
                <p className="c-sub mt-6 max-w-[440px] font-body text-[16px] leading-[1.7] text-titanium-light">
                  Whether you run a DSO network, an independent practice, or you&apos;re exploring a robotics partnership — we&apos;d love to hear from you.
                </p>
              </div>

              {/* Right — get in touch cards */}
              <StaggerFadeIn className="flex flex-col gap-4" stagger={0.1}>
                {[
                  { icon: Mail, label: "Email", value: "hello@apicaldental.com", sub: "We respond within 24 hours" },
                  { icon: Phone, label: "Phone", value: "(555) 000-0000", sub: "Mon–Fri, 9am–6pm PT" },
                  { icon: MapPin, label: "Headquarters", value: "San Francisco, CA", sub: "Visits by appointment" },
                ].map((info) => {
                  const Icon = info.icon;
                  return (
                    <div
                      key={info.label}
                      className="flex items-center gap-4 rounded-lg border border-titanium-dark bg-deep-void p-5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-titanium-dark bg-void">
                        <Icon className="h-5 w-5 text-titanium-light" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-display text-[14px] font-semibold tracking-[-0.3px] text-white-pure">
                          {info.value}
                        </p>
                        <p className="mt-0.5 font-body text-[12px] text-titanium">
                          {info.sub}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </StaggerFadeIn>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 2 — Contact Form with Path Selector
        ══════════════════════════════════════════════ */}
        <section className="relative bg-linear-to-b from-deep-void via-void to-void px-6 py-28 lg:py-36">
          <div className="relative z-10 mx-auto max-w-[700px]">
            <FadeIn>
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="h-5 w-5 text-titanium" strokeWidth={1.5} />
                <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
                  Send a Message
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mb-10 font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] text-white-pure">
                Tell us about yourself.
              </h2>
            </FadeIn>

            {/* Path selector */}
            <FadeIn delay={0.2}>
              <div className="grid gap-3 sm:grid-cols-3">
                {paths.map((path) => {
                  const Icon = path.icon;
                  const isActive = selectedPath === path.id;
                  return (
                    <button
                      key={path.id}
                      onClick={() => setSelectedPath(path.id)}
                      className={cn(
                        "relative overflow-hidden rounded-lg border p-5 text-left transition-all",
                        isActive
                          ? "border-titanium bg-deep-void"
                          : "border-titanium-dark bg-deep-void/50 hover:border-titanium"
                      )}
                    >
                      <Icon
                        className={cn("mb-3 h-5 w-5", isActive ? "text-white-pure" : "text-titanium")}
                        strokeWidth={1.5}
                      />
                      <p className={cn(
                        "font-display text-[14px] font-semibold tracking-[-0.3px]",
                        isActive ? "text-white-pure" : "text-titanium-light"
                      )}>
                        {path.label}
                      </p>
                      <p className="mt-0.5 font-body text-[12px] text-titanium">
                        {path.description}
                      </p>
                      {isActive && (
                        <BorderBeam size={60} duration={6} colorFrom="#9A9AB0" colorTo="#3A3A4E" borderWidth={1} />
                      )}
                    </button>
                  );
                })}
              </div>
            </FadeIn>

            {/* Form */}
            {selectedPath && (
              <FadeIn delay={0.1} direction="up" distance={20}>
                <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormInput type="text" placeholder="Name" value={formData.name} onChange={updateField("name")} />
                    <FormInput type="email" placeholder="Email" value={formData.email} onChange={updateField("email")} />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormInput type="text" placeholder="Organization" value={formData.organization} onChange={updateField("organization")} />
                    <FormInput type="text" placeholder="Role / Title" value={formData.role} onChange={updateField("role")} />
                  </div>
                  {selectedPath === "dso" && (
                    <FormInput type="text" placeholder="Number of Locations" value={formData.locations} onChange={updateField("locations")} />
                  )}
                  <FormTextarea
                    placeholder={
                      selectedPath === "dso"
                        ? "Tell us about your DSO and what you're looking to achieve..."
                        : selectedPath === "tesla"
                          ? "Tell us about the collaboration opportunity..."
                          : "Tell us about your practice and how we can help..."
                    }
                    rows={4}
                    value={formData.message}
                    onChange={updateField("message")}
                  />
                  <button
                    type="submit"
                    className="mt-2 rounded-md bg-white-pure px-8 py-4 font-display text-[14px] font-bold tracking-[0.5px] text-void transition-opacity hover:opacity-80"
                  >
                    Send Message
                  </button>
                </form>
              </FadeIn>
            )}

            {!selectedPath && (
              <FadeIn delay={0.3}>
                <div className="mt-8 flex items-center gap-2 justify-center">
                  <Globe className="h-4 w-4 text-titanium" strokeWidth={1.5} />
                  <p className="font-body text-[13px] text-titanium">
                    Select who you are above to get started
                  </p>
                </div>
              </FadeIn>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 3 — FAQs
        ══════════════════════════════════════════════ */}
        <section className="relative bg-linear-to-b from-void via-deep-void to-deep-void px-6 py-28 lg:py-36">
          <div className="relative z-10 mx-auto max-w-[700px]">
            <FadeIn>
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-5 w-5 text-titanium" strokeWidth={1.5} />
                <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-titanium">
                  Frequently Asked
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mb-12 font-display text-[clamp(24px,4vw,30px)] font-bold leading-[1.1] tracking-[-0.5px] text-white-pure">
                Common questions, answered.
              </h2>
            </FadeIn>

            <StaggerFadeIn className="flex flex-col gap-3" stagger={0.08}>
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className={cn(
                      "overflow-hidden rounded-lg border transition-colors",
                      isOpen ? "border-titanium bg-deep-void" : "border-titanium-dark bg-deep-void/50"
                    )}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    >
                      <p className={cn(
                        "font-display text-[15px] font-semibold tracking-[-0.3px]",
                        isOpen ? "text-white-pure" : "text-titanium-light"
                      )}>
                        {faq.q}
                      </p>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 text-titanium transition-transform duration-300",
                          isOpen && "rotate-180"
                        )}
                        strokeWidth={2}
                      />
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-in-out",
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 pb-5 font-body text-[14px] leading-[1.75] text-titanium-light">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </StaggerFadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
