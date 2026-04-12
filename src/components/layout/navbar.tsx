"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const checkSection = useCallback(() => {
    setScrolled(window.scrollY > 50);
    const el = document.elementFromPoint(window.innerWidth / 2, 60);
    const dark = !!el?.closest(".section-dark");
    setOnDark(dark);
  }, []);

  useEffect(() => {
    checkSection();
    window.addEventListener("scroll", checkSection, { passive: true });
    return () => window.removeEventListener("scroll", checkSection);
  }, [checkSection]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? onDark
            ? "bg-void/90 backdrop-blur-md border-b border-titanium-dark"
            : "bg-white/90 backdrop-blur-md border-b border-light-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className={`group font-display text-[15px] font-bold tracking-[3px] uppercase transition-all duration-300 ${
            onDark ? "text-white-pure" : "text-light-text"
          }`}
        >
          <span className="relative">
            Apical Dental
            <span className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
              onDark ? "bg-cyan" : "bg-cyan"
            }`} />
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative font-display text-[11px] font-semibold uppercase tracking-[2px] transition-all duration-300 py-1 ${
                  isActive
                    ? onDark ? "text-cyan" : "text-cyan"
                    : onDark ? "text-titanium hover:text-white-pure" : "text-light-muted hover:text-light-text"
                }`}
              >
                {item.label}
                {/* Underline animation */}
                <span className={`absolute -bottom-0.5 left-0 h-px transition-all duration-300 ${
                  isActive
                    ? "w-full bg-cyan"
                    : "w-0 group-hover:w-full bg-cyan"
                }`} />
              </Link>
            );
          })}
        </div>

        <Link
          href={siteConfig.cta.href}
          className={`hidden rounded-md px-5 py-2.5 text-[12px] font-bold tracking-wide transition-all duration-300 md:block ${
            onDark
              ? "bg-white-pure text-void hover:bg-cyan hover:text-void hover:shadow-[0_0_24px_rgba(94,175,197,0.25)]"
              : "bg-light-text text-white hover:bg-cyan hover:shadow-[0_0_24px_rgba(94,175,197,0.2)]"
          }`}
        >
          {siteConfig.cta.primary}
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[1.5px] w-5 transition-all duration-300 ${
              onDark ? "bg-white-pure" : "bg-light-text"
            } ${mobileOpen ? "translate-y-[4.5px] rotate-45" : ""}`}
          />
          <span
            className={`block h-[1.5px] w-5 transition-all duration-300 ${
              onDark ? "bg-white-pure" : "bg-light-text"
            } ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-[1.5px] w-5 transition-all duration-300 ${
              onDark ? "bg-white-pure" : "bg-light-text"
            } ${mobileOpen ? "-translate-y-[4.5px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {mobileOpen && (
        <div className={`border-t backdrop-blur-md md:hidden ${
          onDark
            ? "border-titanium-dark bg-void/95"
            : "border-light-border bg-white/95"
        }`}>
          <div className="flex flex-col gap-1 px-6 py-6">
            {siteConfig.nav.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 font-display text-[11px] font-semibold uppercase tracking-[2px] transition-all duration-300 border-l-2 pl-4 ${
                    isActive
                      ? onDark
                        ? "text-cyan border-cyan"
                        : "text-cyan border-cyan"
                      : onDark
                        ? "text-titanium-light hover:text-white-pure border-transparent hover:border-titanium"
                        : "text-light-muted hover:text-light-text border-transparent hover:border-light-border"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={siteConfig.cta.href}
              onClick={() => setMobileOpen(false)}
              className={`mt-4 rounded-md px-5 py-3 text-center text-[12px] font-bold tracking-wide transition-all duration-300 ${
                onDark
                  ? "bg-white-pure text-void hover:bg-cyan"
                  : "bg-light-text text-white hover:bg-cyan"
              }`}
            >
              {siteConfig.cta.primary}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
