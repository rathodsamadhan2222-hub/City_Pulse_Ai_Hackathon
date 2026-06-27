import { useEffect, useState, useRef } from 'react';

export default function GlobalEffects() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // 1. Mouse Spotlight Tracker (Step 21)
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. High-performance HTML5 background canvas particles (Step 20 / 25)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationId;
    let particles = [];
    const count = 40;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Initialize particles
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1),
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        p.y += p.speedY;
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${p.alpha})`; // Cyan neon point
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#06b6d4';
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* HTML5 Particle Canvas Background Layer (Step 20) */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-0" 
      />

      {/* Mouse Cursor Spotlight (Step 21) */}
      <div 
        style={{
          left: coords.x,
          top: coords.y,
          transform: 'translate(-50%, -50%)',
        }}
        className="fixed w-[280px] h-[280px] rounded-full pointer-events-none z-55 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12),transparent_70%)] transition-opacity duration-300 hidden md:block"
      />
    </>
  );
}
