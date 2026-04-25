"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

type Theme = "bone" | "dark" | "light";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<Theme>("bone");
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const checkSection = useCallback(() => {
    setScrolled(window.scrollY > 24);
    const el = document.elementFromPoint(window.innerWidth / 2, 60);
    if (el?.closest(".section-graphite") || el?.closest(".section-dark")) {
      setTheme("dark");
    } else if (el?.closest(".section-bone")) {
      setTheme("bone");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    checkSection();
    window.addEventListener("scroll", checkSection, { passive: true });
    return () => window.removeEventListener("scroll", checkSection);
  }, [checkSection]);

  const onDark = theme === "dark";

  const headerBg = scrolled
    ? onDark
      ? "bg-graphite/92 border-b border-white/10 backdrop-blur-md"
      : theme === "bone"
        ? "bg-bone/92 border-b border-rule backdrop-blur-md"
        : "bg-white/92 border-b border-light-border backdrop-blur-md"
    : "bg-transparent";

  const fg = onDark ? "text-bone" : "text-graphite";
  const fgMuted = onDark ? "text-bone/60" : "text-ink-muted";
  const fgHover = onDark ? "hover:text-bone" : "hover:text-graphite";
  const underline = onDark ? "bg-bone" : "bg-graphite";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${headerBg}`}
    >
      <nav className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-5 lg:px-10">
        <Link
          href="/"
          className={`group font-[family-name:var(--font-fraunces)] text-[18px] font-normal tracking-[-0.5px] transition-colors duration-300 ${fg}`}
        >
          <span className="relative">
            Apical Dental
            <span
              className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${underline}`}
            />
          </span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {siteConfig.nav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative font-[family-name:var(--font-inter)] text-[11px] font-medium uppercase tracking-[2px] py-1 transition-colors duration-300 ${
                  isActive ? fg : `${fgMuted} ${fgHover}`
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${
                    isActive
                      ? `w-full ${underline}`
                      : `w-0 group-hover:w-full ${underline} opacity-50`
                  }`}
                />
              </Link>
            );
          })}
        </div>

        <Link
          href={siteConfig.cta.href}
          className={`hidden md:inline-flex items-center gap-2 px-6 py-3 font-[family-name:var(--font-inter)] text-[12px] font-medium tracking-[0.5px] transition-colors duration-300 ${
            onDark
              ? "bg-terracotta text-bone hover:bg-bone hover:text-graphite"
              : "bg-terracotta text-bone hover:bg-graphite hover:text-bone"
          }`}
        >
          {siteConfig.cta.primary}
          <span aria-hidden>→</span>
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-6 transition-all duration-300 ${
              onDark ? "bg-bone" : "bg-graphite"
            } ${mobileOpen ? "translate-y-[5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-px w-6 transition-all duration-300 ${
              onDark ? "bg-bone" : "bg-graphite"
            } ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-px w-6 transition-all duration-300 ${
              onDark ? "bg-bone" : "bg-graphite"
            } ${mobileOpen ? "-translate-y-[5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {mobileOpen && (
        <div
          className={`border-t md:hidden ${
            onDark
              ? "border-white/10 bg-graphite/95 backdrop-blur-md"
              : "border-rule bg-bone/95 backdrop-blur-md"
          }`}
        >
          <div className="flex flex-col gap-1 px-6 py-6">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 font-[family-name:var(--font-inter)] text-[11px] font-medium uppercase tracking-[2px] border-l-2 pl-4 transition-colors duration-300 ${
                    isActive
                      ? `${fg} ${onDark ? "border-bone" : "border-graphite"}`
                      : `${fgMuted} ${fgHover} border-transparent`
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={siteConfig.cta.href}
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 bg-terracotta px-5 py-3.5 text-center font-[family-name:var(--font-inter)] text-[12px] font-medium tracking-[0.5px] text-bone transition-colors hover:bg-graphite"
            >
              {siteConfig.cta.primary}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
