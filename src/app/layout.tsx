import type { Metadata } from "next";
import { Space_Grotesk, Inter, Geist } from "next/font/google";
import { LenisProvider } from "@/lib/lenis";
import { cn } from "@/lib/utils";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apical Dental — Human Expertise. Robotic Precision.",
  description:
    "Pioneering the integration of Tesla's Optimus humanoid robot into dental laboratory procedures — delivering surgical-grade accuracy at unprecedented scale.",
  keywords: [
    "dental robotics",
    "Tesla Optimus",
    "dental lab automation",
    "prosthodontics",
    "humanoid robot dentistry",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased",
        geist.variable,
        spaceGrotesk.variable,
        inter.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col bg-void text-white-pure">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
