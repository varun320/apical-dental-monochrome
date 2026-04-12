import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="section-dark border-t border-titanium-dark bg-void">
      <div className="mx-auto max-w-[1200px] px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <Link
            href="/"
            className="font-display text-[13px] font-semibold tracking-[3px] uppercase text-titanium-light"
          >
            Apical Dental
          </Link>

          <div className="flex gap-8">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium transition-colors hover:text-white-pure"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-titanium-dark pt-8 text-center">
          <p className="font-display text-[10px] font-semibold uppercase tracking-[2px] text-titanium">
            &copy; {new Date().getFullYear()} Apical Dental. All rights
            reserved.
          </p>
          <p className="font-display text-[9px] uppercase tracking-[1.5px] text-titanium-dark">
            The apex of the craft. In every sense.
          </p>
        </div>
      </div>
    </footer>
  );
}
