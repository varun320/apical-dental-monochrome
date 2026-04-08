"use client";

import { FadeIn } from "@/components/animations/fade-in";
import { SectionHeader } from "@/components/ui/section-header";
import { FormInput, FormTextarea } from "@/components/ui/form-input";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

export function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const updateField = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <section className="relative bg-linear-to-b from-void via-deep-void to-deep-void px-6 py-28 lg:py-36 overflow-hidden">
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
            style={{
              width: size,
              height: size,
              opacity: 0.07,
              animationDelay: delay,
            }}
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
          <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <FormInput
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={updateField("name")}
              />
              <FormInput
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={updateField("email")}
              />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <FormInput
                type="text"
                placeholder="Organization"
                value={formData.organization}
                onChange={updateField("organization")}
              />
              <FormInput
                type="text"
                placeholder="Role"
                value={formData.role}
                onChange={updateField("role")}
              />
            </div>
            <FormTextarea
              placeholder="How can we help?"
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
      </div>
    </section>
  );
}
