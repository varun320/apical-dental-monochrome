"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-void/90 backdrop-blur-md border-b border-titanium-dark"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="font-display text-[15px] font-bold tracking-[3px] uppercase text-white-pure"
        >
          Apical Dental
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-[11px] font-semibold uppercase tracking-[2px] text-titanium transition-colors hover:text-white-pure"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href={siteConfig.cta.href}
          className="hidden rounded-md bg-white-pure px-5 py-2.5 text-[12px] font-bold tracking-wide text-void transition-opacity hover:opacity-80 md:block"
        >
          {siteConfig.cta.primary}
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[1.5px] w-5 bg-white-pure transition-transform ${
              mobileOpen ? "translate-y-[4.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-white-pure transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-white-pure transition-transform ${
              mobileOpen ? "-translate-y-[4.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-titanium-dark bg-void/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1 px-6 py-6">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 font-display text-[11px] font-semibold uppercase tracking-[2px] text-titanium-light transition-colors hover:text-white-pure"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={siteConfig.cta.href}
              onClick={() => setMobileOpen(false)}
              className="mt-4 rounded-md bg-white-pure px-5 py-3 text-center text-[12px] font-bold tracking-wide text-void"
            >
              {siteConfig.cta.primary}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
