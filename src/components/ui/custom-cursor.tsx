"use client";

import React, { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Position references
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on non-touch desktop devices
    if (window.matchMedia("(pointer: fine)").matches) {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Check if hovering over element with custom data-cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttrEl = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorAttrEl) {
        setCursorText(cursorAttrEl.getAttribute("data-cursor"));
      } else {
        setCursorText(null);
      }

      // Check if hovering over clickable element
      const isClickable = Boolean(
        target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer")
      );
      setIsPointer(isClickable);
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const onMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth Lerp Animation loop for trailing ring
    let animationFrame: number;
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const render = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.18);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.18);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrame);
    };
  }, [mounted, visible]);

  if (!mounted) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9998] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Center Small Dot */}
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 h-2 w-2 rounded-full bg-[var(--accent)] transition-[width,height,background-color] duration-150 ${
          cursorText ? "opacity-0 scale-0" : isPointer ? "scale-150 bg-white" : ""
        }`}
      />

      {/* Trailing Ring or Interactive Morph Pill (Maria João Abrantes style) */}
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 flex items-center justify-center transition-[width,height,border-color,background-color,border-radius,padding] duration-200 ease-out ${
          cursorText
            ? "h-8 rounded-full border border-[var(--accent)]/50 bg-[var(--surface-2)]/95 px-3 text-[10px] font-bold uppercase tracking-wider text-[var(--page-fg)] shadow-xl backdrop-blur-md"
            : isPointer
            ? "h-11 w-11 rounded-full border border-[var(--accent)]/60 bg-[var(--accent)]/10"
            : "h-7 w-7 rounded-full border border-[var(--accent)]/40 bg-transparent"
        }`}
      >
        {cursorText && (
          <span className="whitespace-nowrap flex items-center gap-1.5 animate-fadeIn">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
