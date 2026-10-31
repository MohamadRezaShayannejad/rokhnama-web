'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  IconCurrencyDollarOff,
  IconBolt,
  IconShieldCheck,
  IconPuzzle,
  IconLock,
} from '@tabler/icons-react';
import IranMap from '@/ui/IranMap';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    icon: IconCurrencyDollarOff,
    title: 'تعرفهٔ شفاف ریالی',
    body: 'بدون اشتراک دلاری، بدون غافلگیری نرخ ارز.',
  },
  {
    icon: IconBolt,
    title: 'لود زیر یک ثانیه',
    body: 'CDN داخلی، ترافیک نیم‌بها، بدون فیلترشکن.',
  },
  {
    icon: IconShieldCheck,
    title: 'پایدار در تحریم و فیلترینگ',
    body: 'در حساس‌ترین روزهای نمایشگاه، کاتالوگ باز می‌ماند.',
  },
  {
    icon: IconPuzzle,
    title: 'توسعه‌پذیر',
    body: 'ادغام با سامانهٔ اختصاصی شما؛ پشتیبانی مهندس‌به‌مهندس.',
  },
];

export default function InfrastructureC() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from('.infra-c-card', {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: { trigger: '.infra-c-grid', start: 'top 82%', once: true },
      });
      gsap.from('.infra-c-badge', {
        y: 8,
        opacity: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: { trigger: '.infra-c-map-frame', start: 'top 85%', once: true },
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="infrastructure-c"
      dir="rtl"
      className="relative z-10 w-full bg-[var(--color-primary-900)] text-white overflow-hidden tracking-[-0.02em] border-t border-white/10"
    >
      {/* نقشه به‌عنوان محیط — full-bleed بافت زیر کل سکشن */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.09]" aria-hidden="true">
        <div className="w-[110%] max-w-[1100px] aspect-[753/685] -translate-y-6">
          <IranMap variant="territory" className="w-full h-full" />
        </div>
      </div>
      {/* گرادیانِ محوکنندهٔ لبه‌ها */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 85% 70% at 78% 50%, transparent 45%, var(--color-primary-900) 82%), linear-gradient(to bottom, var(--color-primary-900) 0%, transparent 18%, transparent 78%, var(--color-primary-900) 100%)',
        }}
      />

      {/* خطوط راهنما */}
      <div
        className="pointer-events-none absolute inset-0 z-10 flex justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="relative h-full w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
          <div className="absolute inset-y-0 right-0 w-[1px] bg-white/10" />
          <div className="absolute inset-y-0 left-0 w-[1px] bg-white/10" />
        </div>
      </div>

      <div className="content-col relative z-20 py-20 sm:py-28">
        {/* هدر — ادیتوریال */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-[var(--color-secondary-500)] shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold tracking-[-0.02em] text-[var(--color-secondary-300)]">
              زیرساخت بومی · میزبانی داخل ایران
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-black leading-[1.15] tracking-[-0.02em] text-white">
            نقشه، خودِ <span className="text-[var(--color-secondary-300)]">زیرساخت</span> است
          </h2>
          <p className="mt-4 text-sm sm:text-base font-normal leading-relaxed tracking-[-0.02em] text-white/70 max-w-2xl">
            نه یک تصویر تزئینی — بافتِ سراسریِ سکشن. هر استان بخشی از شبکه است؛ بدون وابستگی خارجی، با حاکمیت داده.
          </p>
        </div>

        {/* گرید: ۵ نقشهٔ قاب‌دار راست + ۱ گاتر + ۶ کارتِ شیشه‌ای چپ */}
        <div className="infra-c-grid grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-start">
          {/* راست — قاب نقشه با بج‌های شناور */}
          <div className="lg:col-span-5 order-1">
            <div className="infra-c-map-frame relative mx-auto lg:mx-0 max-w-[560px] aspect-[753/685] max-h-[520px] border border-white/10 bg-white/[0.04] backdrop-blur-[2px] p-4 sm:p-6 flex items-center justify-center overflow-hidden">
              {/* پترن نقطه‌ای */}
              <div
                className="pointer-events-none absolute inset-0 opacity-60"
                aria-hidden="true"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='11' y='11' width='2.5' height='2.5' fill='%23ffffff' fill-opacity='0.05'/%3E%3C/svg%3E")`,
                  backgroundSize: '24px 24px',
                }}
              />
              <IranMap variant="network" className="relative w-full h-full" />

              {/* بج‌ها — روی قاب */}
              <div className="infra-c-badge absolute bottom-3 right-3 bg-white text-[var(--color-primary-900)] text-[11px] font-bold px-3 py-1.5 border border-[var(--color-primary-200)] leading-none tracking-[-0.02em] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[var(--color-success-600)] shrink-0" aria-hidden="true" />
                ترافیک نیم‌بها · CDN داخلی
              </div>
              <div className="infra-c-badge absolute top-3 left-3 bg-[var(--color-primary-900)]/80 backdrop-blur-md border border-white/15 text-white text-[11px] font-bold px-3 py-1.5 leading-none tracking-[-0.02em] flex items-center gap-1.5">
                <IconLock size={12} stroke={2} className="shrink-0 text-[var(--color-secondary-300)]" />
                NDA رسمی · حاکمیت داده
              </div>
            </div>

            {/* مینی‌متریک زیر قاب */}
            <div className="mt-3 mx-auto lg:mx-0 max-w-[560px] flex items-center justify-between gap-3 px-1">
              <span className="text-xs font-normal tracking-[-0.02em] text-white/45">پوشش سراسری · ۵ هابِ توزیع</span>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[-0.02em] text-white">
                <span className="w-8 h-px bg-white/20" aria-hidden="true" />
                لود <span className="text-[var(--color-secondary-300)]">زیر ۱ ثانیه</span>
              </span>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1" aria-hidden="true" />

          {/* چپ — کارت‌های شیشه‌ایِ شناور */}
          <div className="lg:col-span-6 order-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {CARDS.map((card) => (
              <div
                key={card.title}
                className="infra-c-card group relative p-6 bg-white/[0.06] backdrop-blur-md border border-white/10 hover:bg-white/[0.09] hover:border-white/15 transition-colors duration-200"
              >
                <div className="w-11 h-11 flex items-center justify-center bg-white/10 border border-white/15 text-[var(--color-secondary-300)] shrink-0 mb-4">
                  <card.icon size={22} stroke={1.7} />
                </div>
                <h3 className="text-[15px] font-bold leading-snug tracking-[-0.02em] text-white mb-1.5">
                  {card.title}
                </h3>
                <p className="text-[13px] font-normal leading-relaxed tracking-[-0.02em] text-white/65">
                  {card.body}
                </p>
              </div>
            ))}
            {/* نوار اعتباری — زیر کارت‌ها، تمام عرضِ ۶ ستون */}
            <div className="sm:col-span-2 flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 bg-white/[0.04] border border-white/10 text-xs leading-none tracking-[-0.02em]">
              <span className="inline-flex items-center gap-2 font-bold text-white/90">
                <span className="w-1 h-1 bg-[var(--color-secondary-400)] shrink-0" aria-hidden="true" />
                دانشگاه شهید بهشتی
                <span className="font-normal text-white/50">برج فناوری · ط ۶</span>
              </span>
              <span className="hidden sm:inline w-px h-3 bg-white/15" aria-hidden="true" />
              <span className="inline-flex items-center gap-2 font-bold text-white/90">
                <span className="w-1 h-1 bg-[var(--color-secondary-400)] shrink-0" aria-hidden="true" />
                مرکز نوآوری همراه اول
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .infra-pulse { animation: infraPulseC 1.8s ease-out infinite; transform-origin: center; }
        @keyframes infraPulseC {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .infra-pulse { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
