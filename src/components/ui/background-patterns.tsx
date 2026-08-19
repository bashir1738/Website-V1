"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../theme-provider";

export function BackgroundPatterns() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: -1000,
    y: -1000,
  });

  // Track global mouse position for spotlight and interactive grid
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      document.documentElement.style.setProperty(
        "--mouse-x",
        `${e.clientX}px`
      );
      document.documentElement.style.setProperty(
        "--mouse-y",
        `${e.clientY}px`
      );
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Interactive Particle Constellation Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Particle pool
    const particleCount = Math.min(Math.floor((width * height) / 24000), 65);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      baseAlpha: number;
      color: string;
    }> = [];

    const isDark = theme === "dark";
    const colors = isDark
      ? ["191, 100, 231", "120, 80, 255", "78, 46, 245", "160, 160, 255"]
      : ["160, 80, 220", "100, 70, 240", "180, 120, 240", "120, 120, 180"];

    for (let i = 0; i < particleCount; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const baseAlpha = Math.random() * 0.4 + 0.15;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        size: Math.random() * 1.8 + 0.8,
        alpha: baseAlpha,
        baseAlpha,
        color,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const onPointerMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render particle nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges smoothly
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Distance to mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Subtle mouse repulsion / interactive highlight
        let currentAlpha = p.baseAlpha;
        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.x -= (dx / dist) * force * 1.2;
          p.y -= (dy / dist) * force * 1.2;
          currentAlpha = Math.min(1, p.baseAlpha + force * 0.6);
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${currentAlpha})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distBetween < 130) {
            const lineAlpha = (1 - distBetween / 130) * 0.18 * Math.min(currentAlpha, p2.alpha);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${p.color}, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onPointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Global Interactive Mouse Spotlight / Radiant Aura */}
      <div
        className="fixed inset-0 transition-opacity duration-700"
        style={{
          background:
            theme === "dark"
              ? `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(191, 100, 231, 0.07), rgba(78, 46, 245, 0.03) 40%, transparent 80%)`
              : `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(191, 100, 231, 0.08), rgba(78, 46, 245, 0.03) 40%, transparent 80%)`,
        }}
      />

      {/* 2. Architectural Ambient Nebulae (Fixed focal gradients) */}
      <div className="absolute -left-48 top-10 h-[45rem] w-[45rem] rounded-full bg-[var(--accent)]/6 blur-[140px]" />
      <div className="absolute -right-48 top-[35rem] h-[40rem] w-[40rem] rounded-full bg-[#4e2ef5]/5 blur-[160px]" />
      <div className="absolute left-1/3 bottom-20 h-[38rem] w-[38rem] rounded-full bg-[var(--accent)]/4 blur-[150px]" />

      {/* 3. High-Tech Grid Matrix with Precision Crosshair Reticles (+) */}
      <div
        className="absolute inset-0 opacity-[0.45] dark:opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--line) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 85% 70% at 50% 30%, #000 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 70% at 50% 30%, #000 60%, transparent 100%)",
        }}
      />

      {/* 4. Fine Dot Grid Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.25] dark:opacity-[0.2]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--accent) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 40%, #000 40%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 40%, #000 40%, transparent 95%)",
        }}
      />

      {/* 5. Isometric Cyber Matrix / Blueprint Grid lines (Diagonal watermark) */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, var(--page-fg) 0, var(--page-fg) 1px, transparent 0, transparent 48px),
            repeating-linear-gradient(-45deg, var(--page-fg) 0, var(--page-fg) 1px, transparent 0, transparent 48px)
          `,
        }}
      />

      {/* 6. Canvas Particle Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-85"
      />

      {/* 8. Fine Grain Noise Texture Overlay */}
      <div className="grain-overlay" />
    </div>
  );
}
