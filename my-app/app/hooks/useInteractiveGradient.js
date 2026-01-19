'use client';

import { useEffect, useRef } from 'react';

export default function useInteractiveGradient() {
  const elementRef = useRef(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const target = { x: 50, y: 50 };
    const current = { x: 50, y: 50 };
    let frameId;

    const setVars = () => {
      el.style.setProperty('--hero-mouse-x', `${current.x}%`);
      el.style.setProperty('--hero-mouse-y', `${current.y}%`);
    };

    const animate = () => {
      // Smoothly interpolate gradient hotspot toward the pointer
      const inertia = 0.04;
      const maxStep = 1.5;

      const dx = Math.max(Math.min((target.x - current.x) * inertia, maxStep), -maxStep);
      const dy = Math.max(Math.min((target.y - current.y) * inertia, maxStep), -maxStep);

      current.x += dx;
      current.y += dy;

      setVars();
      frameId = requestAnimationFrame(animate);
    };

    const updatePosition = (event) => {
      const rect = el.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      target.x = x;
      target.y = y;
    };

    // Track pointer to drive the gradient hotspot.
    el.addEventListener('pointermove', updatePosition);

    setVars();
    frameId = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener('pointermove', updatePosition);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return elementRef;
}
