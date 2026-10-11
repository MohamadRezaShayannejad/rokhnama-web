'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export default function CustomCursor() {
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });
  const [boxPos, setBoxPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    let animationFrameId: number;
    let targetX = -100;
    let targetY = -100;

    // Fast lead position for inner point
    let dotX = -100;
    let dotY = -100;

    // Smooth trailing position for outer square box
    let boxX = -100;
    let boxY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer') ||
          target.closest('.cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const loop = () => {
      // 1. Inner point moves very responsively and leads the motion
      dotX += (targetX - dotX) * 0.75;
      dotY += (targetY - dotY) * 0.75;
      setDotPos({ x: dotX, y: dotY });

      // 2. Outer square trails behind smoothly with organic inertia
      boxX += (targetX - boxX) * 0.16;
      boxY += (targetY - boxY) * 0.16;
      setBoxPos({ x: boxX, y: boxY });

      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!mounted) return null;

  const half = isHovered ? 32 : 24;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block"
      aria-hidden="true"
    >
      {/* Outer trailing square: 48px -> 64px on hover (+16px), 2px border, brand-token contrast */}
      <div
        className={`fixed top-0 left-0 rounded-none border-2 border-[var(--color-secondary-400)] bg-[var(--color-primary-950)]/10 pointer-events-none overflow-hidden transition-[width,height] duration-200 ease-out ${
          isHovered ? 'w-16 h-16' : 'w-12 h-12'
        }`}
        style={{
          transform: `translate3d(${boxPos.x - half}px, ${boxPos.y - half}px, 0)`,
        }}
      >
        {/* Fill from bottom on interactive hover — secondary token tied to the brand palette */}
        <div
          className={`absolute inset-0 bg-[var(--color-secondary-400)] origin-bottom transition-transform duration-150 ease-out ${
            isHovered ? 'scale-y-100' : 'scale-y-0'
          }`}
        />
      </div>

      {/* Inner leading small square: secondary token — brand-contrasted on dark hero and light sections alike */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-none pointer-events-none bg-[var(--color-secondary-400)]"
        style={{
          transform: `translate3d(${dotPos.x - 3}px, ${dotPos.y - 3}px, 0)`,
        }}
      />
    </div>
  );
}
