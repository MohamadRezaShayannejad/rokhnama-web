'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import {
  IconCurrencyRiyal,
  IconClock,
  IconShieldCheck,
} from '@tabler/icons-react';
import IranMap from '../IranMap';

const CARDS = [
  {
    icon: IconCurrencyRiyal,
    title: 'تعرفه شفاف ریالی',
    text: 'پرداخت مستقیم بدون واسطه و بدون وابستگی به نوسان ارز',
  },
  {
    icon: IconClock,
    title: 'لود زیر یک ثانیه',
    text: 'CDN داخلی با ترافیک نیم‌بها و دسترسی سریع در سراسر ایران',
  },
  {
    icon: IconShieldCheck,
    title: 'پایدار در تحریم',
    text: 'عملیاتی مطمئن در بزنگاه‌های تجاری و روزهای فیلترینگ',
  },
] as const;

export default function InfrastructureB() {
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
        '.infra-b-card',
        { x: -14, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.1,
          ease: 'power2.out',
        }
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
        {/* راست: نقشه Minimal */}
        <div className="col-span-12 lg:col-span-5 relative min-h-[280px] lg:min-h-[420px] flex items-center justify-center">
          <div className="relative z-10 w-full max-w-[380px] aspect-[753/685]">
            <IranMap variant="minimal" className="w-full h-full" />
          </div>
        </div>

        {/* گاتر */}
        <div className="hidden lg:block lg:col-span-1" />

        {/* چپ: کارت‌های افقی + نوار اعتباری */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-4 lg:gap-5 mt-8 lg:mt-0">
          {CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.title}
                className="infra-b-card flex items-center gap-4 bg-white/[0.06] backdrop-blur-sm border border-white/10 p-4 lg:p-5 rounded-none"
              >
                <div className="shrink-0 w-11 h-11 flex items-center justify-center bg-white/[0.08] border border-white/10">
                  <Icon stroke={1.7} className="w-5 h-5 text-[var(--color-secondary-400)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base lg:text-lg font-bold text-white tracking-[-0.02em] mb-1">
                    {c.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed tracking-[-0.02em] line-clamp-2">
                    {c.text}
                  </p>
                </div>
              </article>
            );
          })}

          {/* نوار اعتباری */}
          <div className="mt-2 lg:mt-4 border-t border-white/10 pt-4 lg:pt-5">
            <p className="text-xs text-white/40 tracking-[-0.02em] leading-relaxed">
              استقرار در دانشگاه شهید بهشتی — برج فناوری طبقه ۶ و مرکز نوآوری همراه اول
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
