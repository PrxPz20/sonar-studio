"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  radius: number;
  depth: number;
  alpha: number;
  mint: boolean;
};

type ParticlesProps = {
  className?: string;
  density?: number;
};

export function Particles({ className = "site-particles", density = 1 }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let frame = 0;

    const random = (index: number, offset: number) => {
      const value = Math.sin(index * 12.9898 + offset * 78.233) * 43758.5453;
      return value - Math.floor(value);
    };

    const draw = () => {
      frame = 0;
      context.clearRect(0, 0, width, height);
      const scroll = reducedMotion.matches ? 0 : window.scrollY;

      for (const star of stars) {
        const travel = scroll * (0.035 + star.depth * 0.12);
        const y = ((star.y * height - travel) % height + height) % height;
        const x = ((star.x * width + travel * 0.025 * star.depth) % width + width) % width;
        const radius = star.radius * (0.65 + star.depth * 0.55);

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = star.mint
          ? `rgba(111, 227, 206, ${star.alpha})`
          : `rgba(246, 249, 248, ${star.alpha})`;
        context.fill();
      }
    };

    const scheduleDraw = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const count = Math.min(
        Math.round(160 * density),
        Math.max(Math.round(52 * density), Math.floor((width * height * density) / 14000)),
      );
      stars = Array.from({ length: count }, (_, index) => ({
        x: random(index, 1),
        y: random(index, 2),
        radius: 0.45 + random(index, 3) * 1.15,
        depth: 0.2 + random(index, 4) * 0.8,
        alpha: 0.22 + random(index, 5) * 0.5,
        mint: random(index, 6) > 0.88,
      }));
      draw();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", scheduleDraw, { passive: true });
    reducedMotion.addEventListener("change", scheduleDraw);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", scheduleDraw);
      reducedMotion.removeEventListener("change", scheduleDraw);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
