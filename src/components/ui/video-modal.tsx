"use client";

import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";
import { X, Play } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  useEffect(() => {
    if (!isOpen || !backdropRef.current || !contentRef.current) return;

    gsap.fromTo(backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(contentRef.current,
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.1 }
    );
  }, [isOpen]);

  const handleClose = () => {
    if (!backdropRef.current || !contentRef.current) { onClose(); return; }
    gsap.to(contentRef.current, { opacity: 0, scale: 0.95, y: 20, duration: 0.25, ease: "power2.in" });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, ease: "power2.in", onComplete: onClose });
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6"
      onClick={(e) => { if (e.target === backdropRef.current) handleClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-void/80 backdrop-blur-sm" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative w-full max-w-[700px] overflow-hidden rounded-xl border border-titanium-dark bg-deep-void shadow-[0_0_60px_rgba(94,175,197,0.1)]"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-titanium-dark bg-void/80 text-titanium-light transition-colors hover:text-white-pure hover:border-titanium"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>

        {/* Video placeholder */}
        <div className="aspect-video flex flex-col items-center justify-center bg-void">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-titanium-dark bg-deep-void">
            <Play className="ml-1 h-8 w-8 text-cyan" strokeWidth={1.5} />
          </div>
          <p className="mt-6 font-display text-[16px] font-semibold tracking-[-0.3px] text-white-pure">
            Demo video coming soon
          </p>
          <p className="mt-2 font-body text-[13px] text-titanium-light">
            See Optimus in action — robotic precision at work.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
