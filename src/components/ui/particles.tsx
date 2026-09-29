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
    let lastTime = 0;

    const random = (index: number, offset: number) => {
      const value = Math.sin(index * 12.9898 + offset * 78.233) * 43758.5453;
      return value - Math.floor(value);
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const scroll = reducedMotion.matches ? 0 : window.scrollY;
      const journey = reducedMotion.matches ? 0 : time * .000024 + scroll * .00034;

      for (const star of stars) {
        const depth = ((star.depth - journey * (.72 + star.depth * .35)) % 1 + 1) % 1;
        const proximity = .34 + (1 - depth) * 1.28;
        const x = width / 2 + (star.x - .5) * width * proximity;
        const y = height / 2 + (star.y - .5) * height * proximity;
        const radius = star.radius * (.48 + (1 - depth) * 1.12);
        const alpha = star.alpha * (.34 + (1 - depth) * .78);

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = star.mint
          ? `rgba(111, 227, 206, ${alpha})`
          : `rgba(246, 249, 248, ${alpha})`;
        context.fill();
      }
    };

    const tick = (time: number) => {
      lastTime = time;
      draw(time);
      frame = window.requestAnimationFrame(tick);
    };

    const updateAnimation = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      if (document.hidden || reducedMotion.matches) {
        draw(reducedMotion.matches ? 0 : lastTime);
        return;
      }
      frame = window.requestAnimationFrame(tick);
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
      draw(lastTime);
    };

    resize();
    updateAnimation();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", updateAnimation);
    reducedMotion.addEventListener("change", updateAnimation);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", updateAnimation);
      reducedMotion.removeEventListener("change", updateAnimation);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
