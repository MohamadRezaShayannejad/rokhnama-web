'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });

    const isReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const lenis = new Lenis({
      duration: isReduced ? 0.1 : 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !isReduced,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
      syncTouch: false,
    });

    lenisRef.current = lenis;
    if (typeof window !== 'undefined') {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    // اتصال مستقیم به ScrollTrigger برای نرخ فریم هماهنگ با ریل‌ها و کارت‌ها
    lenis.on('scroll', ScrollTrigger.update);

    const handleNativeScroll = () => {
      ScrollTrigger.update();
    };
    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    // به‌روزرسانی ابعاد Lenis به هنگام ریفرش ScrollTrigger (مانند باز/بسته شدن آکاردئون‌ها)
    const handleRefresh = () => {
      lenis.resize();
    };
    ScrollTrigger.addEventListener('refresh', handleRefresh);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
      ScrollTrigger.update();
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // اسکرول نرم و متوازن برای تمام انکرهای منو و دکمه‌ها
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -70 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
      document.removeEventListener('click', handleAnchorClick);
      ScrollTrigger.removeEventListener('refresh', handleRefresh);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
