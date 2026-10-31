'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import {
  IconCurrencyRiyal,
  IconClock,
  IconShieldCheck,
  IconCode,
} from '@tabler/icons-react';
import IranMap from '../IranMap';

const CARDS = [
  {
    icon: IconCurrencyRiyal,
    title: 'تعرفه شفاف ریالی',
    text: 'پرداخت بدون واسطه و بدون وابستگی به نوسان ارز',
  },
  {
    icon: IconClock,
    title: 'لود زیر یک ثانیه',
    text: 'CDN داخلی با ترافیک نیم‌بها و دسترسی سریع',
  },
  {
    icon: IconShieldCheck,
    title: 'پایدار در تحریم',
    text: 'عملیاتی مطمئن در بزنگاه‌های تجاری و فیلترینگ',
  },
  {
    icon: IconCode,
    title: 'توسعه‌پذیر',
    text: 'پشتیبانی مهندس‌به‌مهندس و ادغام با سامانه‌ها',
  },
] as const;

export default function InfrastructureA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      gsap.fromTo(
        '.infra-a-card',
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
        }
      );
      gsap.fromTo(
        '.infra-conn',
        { opacity: 0 },
        { opacity: 1, duration: 0.7, stagger: 0.12, ease: 'power1.out', delay: 0.3 }
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="w-full bg-[var(--color-primary-900)] py-24 px-6 lg:px-14 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-0 lg:gap-0 items-start">
        {/* راست: نقشه Network */}
        <div className="col-span-12 lg:col-span-5 relative min-h-[320px] lg:min-h-[480px] flex items-center justify-center">
          {/* پترن نقطه‌ای */}
          <div
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(255,255,255,0.28) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          {/* قاب نقشه */}
          <div className="relative z-10 w-full max-w-[420px] aspect-[753/685]">
            <IranMap variant="network" className="w-full h-full" />
          </div>
          {/* بج شناور بالا */}
          <div className="absolute top-6 right-6 lg:top-10 lg:right-10 bg-white/[0.06] backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-none text-xs text-white/90 tracking-[-0.02em]">
            ترافیک نیم‌بها · CDN داخلی
          </div>
          {/* بج شناور پایین */}
          <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 bg-white/[0.06] backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-none text-xs text-white/90 tracking-[-0.02em]">
            NDA رسمی
          </div>
        </div>

        {/* گاتر */}
        <div className="hidden lg:block lg:col-span-1" />

        {/* چپ: کارت‌های ۲×۲ */}
        <div className="col-span-12 lg:col-span-6 grid grid-cols-2 gap-4 lg:gap-6 mt-8 lg:mt-0">
          {CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.title}
                className="infra-a-card bg-white/[0.06] backdrop-blur-sm border border-white/10 p-5 lg:p-6 rounded-none"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-white/[0.08] border border-white/10">
                    <Icon stroke={1.7} className="w-5 h-5 text-[var(--color-secondary-400)]" />
                  </div>
                </div>
                <h3 className="text-base lg:text-lg font-bold text-white tracking-[-0.02em] mb-2">
                  {c.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed tracking-[-0.02em]">{c.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
