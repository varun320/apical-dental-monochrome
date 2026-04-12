"use client";

import Image from "next/image";
import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { FormInput, FormTextarea } from "@/components/ui/form-input";
import { Mail, MessageSquare, Send, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function CTA() {
  const [formData, setFormData] = useState({
    name: "", email: "", organization: "", role: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>("idle");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!validateEmail(formData.email)) errs.email = "Enter a valid email";
    if (!formData.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState("submitting");
    // Simulated submission — wire to API later
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  const updateField = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <section className="section-dark relative bg-void px-6 py-32 lg:py-40 overflow-hidden">
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0">
        <Image src="/images/cta-texture.png" alt="" fill className="object-cover opacity-20 grayscale-50" sizes="100vw" />
        <div className="absolute inset-0 bg-void/70" />
      </div>
      {/* ── Floating contact icons ── */}
      <div className="pointer-events-none absolute inset-x-0 top-16 flex justify-center gap-16">
        {[
          { Icon: Mail, size: 32, delay: "0s" },
          { Icon: MessageSquare, size: 28, delay: "2s" },
          { Icon: Send, size: 30, delay: "4s" },
        ].map(({ Icon, size, delay }, i) => (
          <Icon
            key={i}
            className="text-titanium-light animate-float"
            style={{ width: size, height: size, opacity: 0.07, animationDelay: delay }}
            strokeWidth={1}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[700px]">
        <SectionHeader
          label="Get in Touch"
          title="Partner with us."
          description="Whether you're from Tesla Robotics, a DSO corporation, or an independent practice — we'd like to start a conversation."
          center
        />

        <FadeIn delay={0.2}>
          {formState === "success" ? (
            <div className="mt-12 flex flex-col items-center text-center py-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-muted bg-cyan/10">
                <CheckCircle className="h-8 w-8 text-cyan" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-display text-[24px] font-bold tracking-[-0.5px] text-white-pure">
                Message sent.
              </h3>
              <p className="mt-2 font-body text-[15px] text-titanium-light">
                We&apos;ll be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <FormInput
                  variant="dark"
                  type="text"
                  placeholder="Name *"
                  value={formData.name}
                  onChange={updateField("name")}
                  error={errors.name}
                />
                <FormInput
                  variant="dark"
                  type="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={updateField("email")}
                  error={errors.email}
                />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <FormInput
                  variant="dark"
                  type="text"
                  placeholder="Organization"
                  value={formData.organization}
                  onChange={updateField("organization")}
                />
                <FormInput
                  variant="dark"
                  type="text"
                  placeholder="Role"
                  value={formData.role}
                  onChange={updateField("role")}
                />
              </div>
              <FormTextarea
                variant="dark"
                placeholder="How can we help? *"
                rows={4}
                value={formData.message}
                onChange={updateField("message")}
                error={errors.message}
              />
              <button
                type="submit"
                disabled={formState === "submitting"}
                className="mt-2 flex items-center justify-center gap-2 rounded-md bg-white-pure px-8 py-4 font-display text-[14px] font-bold tracking-[0.5px] text-void transition-all hover:shadow-[0_0_30px_rgba(94,175,197,0.55)] hover:bg-cyan hover:text-void disabled:opacity-60"
              >
                {formState === "submitting" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
