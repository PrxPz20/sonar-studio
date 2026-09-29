"use client";

import { useEffect, useRef } from "react";

type SpherePoint = {
  x: number;
  y: number;
  z: number;
  radius: number;
  mint: boolean;
};

export function ParticleSphereAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointCount = window.innerWidth < 768 ? 950 : 1500;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const points: SpherePoint[] = Array.from({ length: pointCount }, (_, index) => {
      const y = 1 - (index / (pointCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const angle = goldenAngle * index;
      return {
        x: Math.cos(angle) * radius,
        y,
        z: Math.sin(angle) * radius,
        radius: .55 + ((index * 17) % 13) / 13,
        mint: index % 9 === 0 || index % 17 === 0,
      };
    });

    let width = 0;
    let height = 0;
    let frame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);
      const rotation = reducedMotion.matches ? .45 : time * .00011;
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      const tiltCos = Math.cos(-.16);
      const tiltSin = Math.sin(-.16);
      const sphereRadius = Math.min(width, height) * .43;

      for (const point of points) {
        const rotatedX = point.x * cos - point.z * sin;
        const rotatedZ = point.x * sin + point.z * cos;
        const rotatedY = point.y * tiltCos - rotatedZ * tiltSin;
        const depth = point.y * tiltSin + rotatedZ * tiltCos;
        const perspective = 2.8 / (3.45 - depth);
        const x = width / 2 + rotatedX * sphereRadius * perspective;
        const y = height / 2 + rotatedY * sphereRadius * perspective;
        const alpha = .16 + ((depth + 1) / 2) * .72;
        const dotRadius = point.radius * (.64 + ((depth + 1) / 2) * .76);

        context.beginPath();
        context.arc(x, y, dotRadius, 0, Math.PI * 2);
        context.fillStyle = point.mint
          ? `rgba(111, 227, 206, ${alpha})`
          : `rgba(246, 249, 248, ${alpha * .84})`;
        context.fill();
      }

      if (!reducedMotion.matches) frame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion.matches) draw();
    });
    resizeObserver.observe(canvas);

    return () => {
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-sphere-canvas" aria-hidden="true" />;
}
