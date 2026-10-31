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
    icon: IconShieldCheck,
    title: 'پایدار در تحریم',
    text: 'عملیاتی مطمئن در بزنگاه‌های تجاری',
  },
  {
    icon: IconCode,
    title: 'توسعه‌پذیر',
    text: 'پشتیبانی مهندس‌به‌مهندس و ادغام با سامانه‌ها',
  },
  {
    icon: IconClock,
    title: 'همیشه در دسترس',
    text: 'CDN داخلی و دسترسی سریع در سراسر ایران',
  },
] as const;

export default function InfrastructureC() {
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
        '.infra-c-card',
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.15,
        }
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] }
  );

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative w-full py-24 px-6 lg:px-14 overflow-hidden"
    >
      {/* پس‌زمینه نقشه Territory با گرادیان محوکننده */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.09]">
          <IranMap variant="territory" className="w-full h-full" />
        </div>
        {/* گرادیان محوکننده */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 30% 50%, transparent 0%, rgba(10,16,69,0.65) 55%, rgba(10,16,69,0.92) 100%), linear-gradient(90deg, rgba(10,16,69,0.88) 0%, rgba(10,16,69,0.55) 50%, rgba(10,16,69,0.88) 100%)',
          }}
        />
      </div>

      {/* محتوا */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-12 gap-0 lg:gap-0 items-start">
        {/* راست: قاب نقشه + بج‌ها */}
        <div className="col-span-12 lg:col-span-5 relative min-h-[280px] lg:min-h-[420px] flex items-center justify-center">
          <div className="relative z-10 w-full max-w-[380px] aspect-[753/685] border border-white/10 bg-white/[0.03] backdrop-blur-sm p-3">
            <IranMap variant="territory" className="w-full h-full" />
            {/* بج شیشه‌ای بالا */}
            <div className="absolute -top-3 right-6 bg-white/[0.06] backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-none text-xs text-white/90 tracking-[-0.02em]">
              میزبانی بومی
            </div>
            {/* مینی‌متریک */}
            <div className="absolute -bottom-3 left-6 bg-white/[0.06] backdrop-blur-sm border border-white/10 px-3 py-1.5 rounded-none text-xs text-white/90 tracking-[-0.02em]">
              لود زیر ۱ ثانیه
            </div>
          </div>
        </div>

        {/* گاتر */}
        <div className="hidden lg:block lg:col-span-1" />

        {/* چپ: کارت‌های شیشه‌ای + نوار اعتباری */}
        <div className="col-span-12 lg:col-span-6 grid grid-cols-2 gap-4 lg:gap-5 mt-8 lg:mt-0">
          {CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <article
                key={c.title}
                className="infra-c-card bg-white/[0.06] backdrop-blur-sm border border-white/10 p-4 lg:p-5 rounded-none"
              >
                <div className="flex items-start gap-2.5 mb-2.5">
                  <div className="shrink-0 w-9 h-9 flex items-center justify-center bg-white/[0.08] border border-white/10">
                    <Icon stroke={1.7} className="w-4 h-4 text-[var(--color-secondary-400)]" />
                  </div>
                </div>
                <h3 className="text-sm lg:text-base font-bold text-white tracking-[-0.02em] mb-1.5">
                  {c.title}
                </h3>
                <p className="text-xs lg:text-sm text-white/60 leading-relaxed tracking-[-0.02em]">
                  {c.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      {/* نوار اعتباری پایین */}
      <div className="relative z-10 max-w-7xl mx-auto mt-10 lg:mt-14 border-t border-white/10 pt-5">
        <p className="text-xs text-white/40 tracking-[-0.02em] leading-relaxed text-center">
          استقرار در دانشگاه شهید بهشتی — برج فناوری طبقه ۶ و مرکز نوآوری همراه اول
        </p>
      </div>
    </section>
  );
}
