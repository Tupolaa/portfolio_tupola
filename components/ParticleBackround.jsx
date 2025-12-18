import React, { useEffect, useRef } from "react";

export default function ParticleBackground({
  className = "",
  style = {},
  particleCount = 200,
  maxSpeed = 0.35,
  particleSize = [1, 2.5],
  linkDistance = 150,
  showLinks = true,
  opacity = 0.9,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    let w = 0;
    let h = 0;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const rand = (min, max) => Math.random() * (max - min) + min;

    // Responsive particle count based on screen width
    const getResponsiveCount = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 480) return Math.floor(particleCount * 0.25);
      if (screenWidth < 768) return Math.floor(particleCount * 0.4);
      return particleCount;
    };

    const actualParticleCount = getResponsiveCount();

    const resize = () => {
      const parent = canvas.parentElement;
      w = parent ? parent.clientWidth : window.innerWidth;
      // Use scrollHeight to cover full content, not just viewport
      h = parent ? parent.scrollHeight : document.body.scrollHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: actualParticleCount }, () => ({
      x: rand(0, w),
      y: rand(0, h),
      vx: rand(-maxSpeed, maxSpeed),
      vy: rand(-maxSpeed, maxSpeed),
      r: rand(particleSize[0], particleSize[1]),
    }));

    const step = () => {
      // background fill
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#1b1b1bff";
      ctx.fillRect(0, 0, w, h);

      // move + draw particles
      ctx.fillStyle = `rgba(255,255,255,${opacity})`;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // bounce on edges
        if (p.x <= 0 || p.x >= w) p.vx *= -1;
        if (p.y <= 0 || p.y >= h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // optional connecting lines
      if (showLinks) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.hypot(dx, dy);

            if (dist < linkDistance) {
              const t = 1 - dist / linkDistance; // 0..1
              ctx.strokeStyle = `rgba(255,255,255,${0.3 * t})`;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    step();

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [particleCount, maxSpeed, particleSize, linkDistance, showLinks, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        ...style,
      }}
    />
  );
}
