"use client";

import { useEffect, useRef } from "react";
import styles from "./ConfirmationFireworks.module.css";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
};

export default function ConfirmationFireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const motion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (motion.matches) return;

    const particles: Particle[] = [];
    let frame = 0;
    let animationId = 0;
    let active = true;

    const colors = [42, 198, 325, 145];

    function resize() {
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(rect.width * ratio);
      canvas.height = Math.round(rect.height * ratio);

      context?.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function burst(x: number, y: number, hue: number) {
      for (let i = 0; i < 110; i++) {
        const angle = (Math.PI * 2 * i) / 110;
        const speed = 1.5 + Math.random() * 4.5;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 60 + Math.random() * 45,
          size: 1 + Math.random() * 2.5,
          hue,
        });
      }
    }

    function animate() {
      if (!active || !canvas || !context) return;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      context.clearRect(0, 0, width, height);

      if (frame === 10) burst(width * 0.18, height * 0.28, colors[0]);
      if (frame === 42) burst(width * 0.82, height * 0.25, colors[2]);
      if (frame === 74) burst(width * 0.50, height * 0.12, colors[1]);
      if (frame === 106) burst(width * 0.25, height * 0.55, colors[3]);
      if (frame === 138) burst(width * 0.75, height * 0.55, colors[0]);

      context.globalCompositeOperation = "lighter";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.035;
        p.vx *= 0.992;
        p.vy *= 0.992;
        p.life++;

        const opacity = Math.max(0, 1 - p.life / p.maxLife);

        context.beginPath();
        context.fillStyle =
          `hsla(${p.hue}, 100%, 62%, ${opacity})`;
        context.shadowColor =
          `hsla(${p.hue}, 100%, 60%, ${opacity})`;
        context.shadowBlur = 12;
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        context.fill();

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      context.globalCompositeOperation = "source-over";
      context.shadowBlur = 0;

      frame++;

      if (frame < 260 || particles.length > 0) {
        animationId = requestAnimationFrame(animate);
      }
    }

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(animate);

    return () => {
      active = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.fireworks}
      aria-hidden="true"
    />
  );
}