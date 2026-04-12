"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const SCAN_DATA_POINTS = [
  { cx: 100, cy: 40, label: "Enamel", value: "0.02mm" },
  { cx: 130, cy: 75, label: "Crown", value: "±0.01mm" },
  { cx: 70, cy: 110, label: "Dentin", value: "1.2mm" },
  { cx: 130, cy: 170, label: "Root", value: "12.4mm" },
  { cx: 85, cy: 220, label: "Apex", value: "0.5mm" },
];

export function ToothScanSVG() {
  const svgRef = useRef<SVGSVGElement>(null);
  const laserRef = useRef<SVGLineElement>(null);
  const glowRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const dataPoints = svg.querySelectorAll(".scan-point");
    const dataLabels = svg.querySelectorAll(".scan-label");
    const laser = laserRef.current;
    const glow = glowRef.current;

    function buildScan() {
      const tl = gsap.timeline({
        delay: 1.2,
        onComplete: () => {
          gsap.delayedCall(3, () => {
            gsap.to(dataPoints, { scale: 0, duration: 0.4, stagger: 0.05, ease: "power2.in" });
            gsap.to(dataLabels, { opacity: 0, x: -8, duration: 0.3, stagger: 0.05 });
            gsap.set([laser, glow], { opacity: 1, attr: { y1: 20, y2: 20 } });
            gsap.delayedCall(0.8, () => buildScan());
          });
        },
      });

      tl.to([laser, glow], { attr: { y1: 245, y2: 245 }, duration: 2.2, ease: "power1.inOut" });

      SCAN_DATA_POINTS.forEach((pt, i) => {
        const triggerTime = (pt.cy / 245) * 2.2;
        tl.to(dataPoints[i], { scale: 1, duration: 0.25, ease: "back.out(2)" }, triggerTime);
        tl.to(dataLabels[i], { opacity: 1, x: 0, duration: 0.25, ease: "power2.out" }, triggerTime + 0.08);
      });

      tl.to([laser, glow], { opacity: 0, duration: 0.4 }, 2.4);
      return tl;
    }

    gsap.set(dataPoints, { scale: 0, transformOrigin: "center" });
    gsap.set(dataLabels, { opacity: 0, x: -8 });
    gsap.set([laser, glow], { attr: { y1: 20, y2: 20 } });

    const tl = buildScan();

    return () => {
      tl.kill();
      gsap.killTweensOf([dataPoints, dataLabels, laser, glow]);
    };
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 200 260" className="h-[280px] w-auto md:h-[320px]" fill="none">
      {/* Molar crown with cusps */}
      <path d="M60 95 C60 55, 65 30, 80 20 C87 15, 93 18, 100 22 C107 18, 113 15, 120 20 C135 30, 140 55, 140 95" stroke="rgba(148,163,184,0.4)" strokeWidth={1.4} fill="rgba(94,175,197,0.06)" />
      <path d="M60 95 C60 105, 65 112, 72 115 L128 115 C135 112, 140 105, 140 95" stroke="rgba(148,163,184,0.4)" strokeWidth={1.4} fill="rgba(94,175,197,0.04)" />
      <path d="M80 20 C85 28, 95 28, 100 22" stroke="rgba(148,163,184,0.2)" strokeWidth={0.8} fill="none" />
      <path d="M100 22 C105 28, 115 28, 120 20" stroke="rgba(148,163,184,0.2)" strokeWidth={0.8} fill="none" />
      <path d="M68 65 C80 58, 90 62, 100 58 C110 62, 120 58, 132 65" stroke="rgba(148,163,184,0.15)" strokeWidth={0.6} strokeDasharray="3 2" fill="none" />
      {/* Roots */}
      <path d="M72 115 C70 140, 68 170, 72 200 C74 215, 78 230, 82 240" stroke="rgba(148,163,184,0.35)" strokeWidth={1.2} fill="none" />
      <path d="M128 115 C130 140, 132 170, 128 200 C126 215, 122 230, 118 240" stroke="rgba(148,163,184,0.35)" strokeWidth={1.2} fill="none" />
      <path d="M72 115 C70 140, 68 170, 72 200 C74 215, 78 230, 82 240 L100 235 L118 240 C122 230, 126 215, 128 200 C132 170, 130 140, 128 115 Z" fill="rgba(94,175,197,0.04)" stroke="none" />
      {/* Pulp + canals */}
      <path d="M88 75 C88 85, 85 95, 85 105 L115 105 C115 95, 112 85, 112 75 C108 68, 92 68, 88 75 Z" stroke="rgba(148,163,184,0.15)" strokeWidth={0.6} fill="rgba(94,175,197,0.08)" />
      <path d="M90 105 C88 140, 80 190, 82 240" stroke="rgba(148,163,184,0.12)" strokeWidth={0.5} fill="none" />
      <path d="M110 105 C112 140, 120 190, 118 240" stroke="rgba(148,163,184,0.12)" strokeWidth={0.5} fill="none" />
      {/* Laser */}
      <line ref={glowRef} x1="30" y1="20" x2="170" y2="20" stroke="rgba(94,175,197,0.2)" strokeWidth={8} />
      <line ref={laserRef} x1="30" y1="20" x2="170" y2="20" stroke="var(--cyan)" strokeWidth={1.5} />
      {/* Data points */}
      {SCAN_DATA_POINTS.map((pt, i) => (
        <g key={i}>
          <circle className="scan-point" cx={pt.cx} cy={pt.cy} r={3} fill="var(--cyan)" />
          <g className="scan-label">
            <line x1={pt.cx + 5} y1={pt.cy} x2={pt.cx + 20} y2={pt.cy} stroke="rgba(94,175,197,0.4)" strokeWidth={0.5} />
            <text x={pt.cx + 24} y={pt.cy - 4} fill="rgba(148,163,184,0.7)" fontSize="7" fontFamily="var(--font-space-grotesk)">{pt.label}</text>
            <text x={pt.cx + 24} y={pt.cy + 5} fill="var(--cyan)" fontSize="8" fontFamily="var(--font-space-grotesk)" fontWeight="bold">{pt.value}</text>
          </g>
        </g>
      ))}
    </svg>
  );
}
