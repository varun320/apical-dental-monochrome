"use client";

import { useState } from "react";
import { FadeIn } from "@/components/animations/fade-in";
import { Loader2 } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const fieldBase =
  "w-full bg-transparent border-b border-bone/30 px-0 py-3.5 font-[family-name:var(--font-inter)] text-[15px] text-bone placeholder:text-bone/45 outline-none transition-colors focus:border-bone";
const fieldError = "border-terracotta placeholder:text-terracotta/70";

export function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formState, setFormState] = useState<FormState>("idle");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Required";
    if (!formData.email.trim()) errs.email = "Required";
    else if (!validateEmail(formData.email)) errs.email = "Invalid email";
    if (!formData.message.trim()) errs.message = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setFormState("submitting");
    setTimeout(() => setFormState("success"), 1200);
  };

  const updateField =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    };

  return (
    <section className="section-graphite border-t border-white/10">
      <div className="mx-auto max-w-[1320px] px-6 py-24 md:px-10 md:py-36">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[42fr_58fr] md:gap-20">
          <FadeIn>
            <p className="eyebrow text-bone/55">06 — Get in touch</p>
            <h2 className="mt-5 font-[family-name:var(--font-fraunces)] font-light leading-[1.05] tracking-[-1.5px] text-bone text-[clamp(2.25rem,4.5vw,4rem)]">
              Partner with us.
            </h2>
            <p className="mt-7 max-w-[440px] font-[family-name:var(--font-inter)] text-[1.0625rem] leading-[1.65] text-bone/70">
              Whether you&apos;re from Tesla Robotics, a DSO corporation, or an independent
              practice — we&apos;d like to start a conversation.
            </p>
            <div className="mt-10 hidden md:block">
              <p className="eyebrow text-bone/45">Direct</p>
              <p className="mt-3 font-[family-name:var(--font-fraunces)] text-[1.35rem] font-normal text-bone">
                hello@apicaldental.com
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            {formState === "success" ? (
              <div className="flex h-full min-h-[280px] flex-col items-start justify-center border-t border-bone/30 pt-10">
                <p className="eyebrow text-terracotta">Message received</p>
                <p className="mt-5 font-[family-name:var(--font-fraunces)] text-[2rem] font-light tracking-[-1px] text-bone">
                  Thank you. We&apos;ll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Name *" error={errors.name}>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={updateField("name")}
                      className={`${fieldBase} ${errors.name ? fieldError : ""}`}
                    />
                  </Field>
                  <Field label="Email *" error={errors.email}>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={updateField("email")}
                      className={`${fieldBase} ${errors.email ? fieldError : ""}`}
                    />
                  </Field>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Organisation">
                    <input
                      type="text"
                      placeholder="Company"
                      value={formData.organization}
                      onChange={updateField("organization")}
                      className={fieldBase}
                    />
                  </Field>
                  <Field label="Role">
                    <input
                      type="text"
                      placeholder="Title"
                      value={formData.role}
                      onChange={updateField("role")}
                      className={fieldBase}
                    />
                  </Field>
                </div>
                <Field label="Message *" error={errors.message}>
                  <textarea
                    placeholder="How can we help?"
                    rows={4}
                    value={formData.message}
                    onChange={updateField("message")}
                    className={`${fieldBase} resize-none ${errors.message ? fieldError : ""}`}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="mt-4 inline-flex items-center justify-center gap-3 self-start bg-terracotta px-9 py-[18px] font-[family-name:var(--font-inter)] text-[14px] font-medium tracking-[0.5px] text-bone transition-colors hover:bg-bone hover:text-graphite disabled:opacity-60"
                >
                  {formState === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending
                    </>
                  ) : (
                    <>
                      Send message
                      <span aria-hidden>→</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="eyebrow text-bone/55">{label}</span>
      <div className="mt-1">{children}</div>
      {error && (
        <span className="mt-1 inline-block font-[family-name:var(--font-inter)] text-[11px] text-terracotta">
          {error}
        </span>
      )}
    </label>
  );
}
