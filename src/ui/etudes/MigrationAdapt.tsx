'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  IconFileImport,
  IconAdjustmentsHorizontal,
  IconLayersIntersect,
  IconCloudUpload,
} from '@tabler/icons-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StepItem {
  n: string;
  icon: React.ComponentType<{ size?: number; stroke?: number; className?: string }>;
  title: string;
  body: React.ReactNode;
  notes: React.ReactNode[];
}

const STEPS: StepItem[] = [
  {
    n: '۱',
    icon: IconFileImport,
    title: 'استخراج ساختاریافتهٔ داده‌ها',
    body: (
      <>
        استخراج <strong className="font-bold text-inherit">مشخصات فنی</strong>،{' '}
        <strong className="font-bold text-inherit">جداول ابعاد</strong> و{' '}
        <strong className="font-bold text-inherit">تصاویر</strong> از فایل‌های PDF، اکسل و کاتالوگ چاپی قبلی شما.
      </>
    ),
    notes: [
      <>
        <strong className="font-bold text-inherit">بدون نیاز به ورود یا تایپ مجدد</strong> داده‌ها توسط شما.
      </>,
      <>
        <strong className="font-bold text-inherit">یکپارچه‌سازی اسناد نامتجانس</strong> انبار و فایل‌های پراکنده.
      </>,
    ],
  },
  {
    n: '۲',
    icon: IconAdjustmentsHorizontal,
    title: 'پالایش و ساختاربندی مهندسی',
    body: (
      <>
        <strong className="font-bold text-inherit">استانداردسازی کدهای کالا</strong>،{' '}
        <strong className="font-bold text-inherit">رفع مغایرت‌ها</strong> و پردازش تصاویر برای بارگذاری{' '}
        <strong className="font-bold text-inherit">زیر یک ثانیه</strong>.
      </>
    ),
    notes: [
      <>
        <strong className="font-bold text-inherit">رفع کدهای تکراری</strong> و یکدست‌سازی نام قطعات.
      </>,
      <>
        <strong className="font-bold text-inherit">بهینه‌سازی رزولوشن و ابعاد</strong> تصاویر برای موبایل و وب.
      </>,
    ],
  },
  {
    n: '۳',
    icon: IconLayersIntersect,
    title: 'طراحی لایه‌های تعاملی و پاپ‌آپ‌ها',
    body: (
      <>
        تبدیل صفحات متراکم به <strong className="font-bold text-inherit">هات‌اسپات‌های لمسی</strong>،{' '}
        <strong className="font-bold text-inherit">ویدیوهای خط تولید</strong>،{' '}
        <strong className="font-bold text-inherit">نمای ۳۶۰ درجه</strong> و جدول ابعاد.
      </>
    ),
    notes: [
      <>
        <strong className="font-bold text-inherit">صفحهٔ اصلی خلوت می‌ماند</strong> و مشخصات با لمس باز می‌شوند.
      </>,
      <>
        فعال‌سازی سیستم <strong className="font-bold text-inherit">صدور برگ استعلام رسمی</strong> و{' '}
        <strong className="font-bold text-inherit">پیش‌فاکتور A4</strong>.
      </>,
    ],
  },
  {
    n: '۴',
    icon: IconCloudUpload,
    title: 'انتشار ابری و اتصال به دامنه',
    body: (
      <>
        بارگذاری روی <strong className="font-bold text-inherit">CDN پرسرعت</strong>، اتصال به{' '}
        <strong className="font-bold text-inherit">دامنهٔ اختصاصی</strong> شرکت، فعال‌سازی{' '}
        <strong className="font-bold text-inherit">PWA</strong> و تحویل پنل مدیریت.
      </>
    ),
    notes: [
      <>
        ایجاد <strong className="font-bold text-inherit">لینک‌های تفکیک‌شده</strong> و{' '}
        <strong className="font-bold text-inherit">کدهای QR</strong> برای نمایشگاه و غرفه.
      </>,
      <>
        دسترسی تیم فروش به <strong className="font-bold text-inherit">آمار زنده از مدت مکث خریدار</strong> روی کالاها.
      </>,
    ],
  },
];

// Adapt — بازاندیشی تطبیق نه مقیاس: sticky فقط دسکتاپ، هاور فقط fine-pointer، اعداد و لوگومارک واکنش‌گرا
export default function MigrationAdapt() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from('.migration-adapt-row', {
        opacity: 0,
        x: 16,
        duration: 0.45,
        ease: 'power2.out',
        stagger: 0.1,
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.migration-adapt-rows',
          start: 'top 82%',
          once: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="migration-adapt"
      dir="rtl"
      className="relative z-10 w-full bg-white text-[var(--color-neutral-900)] py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 tracking-[-0.02em] border-t border-[var(--border-neutral-base)]"
    >
      <div className="pointer-events-none absolute inset-0 z-20 flex justify-center overflow-hidden" aria-hidden="true">
        <div className="relative h-full w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
          <div className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-neutral-200)]" />
          <div className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-neutral-200)]" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* adapt: ستون راست روی موبایل دیگر sticky نیست؛ gap عمودی کمتر */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 lg:gap-x-[88px] gap-y-10 lg:gap-y-16 items-start">
          <div className="group/right lg:col-span-5 lg:sticky lg:top-32 flex flex-col pl-0 lg:pl-2">
            {/* adapt: لوگومارک روی موبایل کوچک‌تر */}
            <div className="group/logo w-[112px] sm:w-[128px] lg:w-[148px] mb-10 lg:mb-20 flex items-start cursor-default">
              <svg
                viewBox="671 18 246 251"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-auto shrink-0 select-none overflow-hidden"
                aria-label="رُخ‌نما"
              >
                <defs>
                  <clipPath id="migration-adapt-logo-clip">
                    <path d="M916.189 268.181H856.601L856.627 125.135L716.349 268.181H671.441V221.649L811.093 79.1121H671.441V18.2366L916.189 18.226V268.181Z" />
                  </clipPath>
                </defs>
                <g clipPath="url(#migration-adapt-logo-clip)">
                  <rect
                    x="671"
                    y="18"
                    width="246"
                    height="251"
                    fill="var(--color-primary-200)"
                    className="scale-0 transition-transform duration-[650ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover/right:scale-100 group-hover/logo:scale-100"
                    style={{ transformOrigin: '793px 143px' }}
                  />
                </g>
                <path
                  d="M916.189 268.181H856.601L856.627 125.135L716.349 268.181H671.441V221.649L811.093 79.1121H671.441V18.2366L916.189 18.226V268.181Z"
                  fill="none"
                  stroke="var(--color-primary-200)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                  className="transition-colors duration-300"
                />
              </svg>
            </div>

            <div className="flex items-center gap-2 mb-6 lg:mb-8">
              <span className="w-1.5 h-1.5 bg-[var(--color-secondary-500)]" aria-hidden="true" />
              <span className="text-xs font-bold text-[var(--color-primary-700)]">
                مسیر انتقال کاتالوگ فیزیکی به رُخ‌نما
              </span>
            </div>

            <div className="flex flex-col gap-5 lg:gap-8">
              {/* adapt: تایتل با clamp برای breakpoint محتوایی */}
              <h2 className="text-[clamp(1.5rem,5vw,2.25rem)] lg:text-4xl font-black text-[var(--text-neutral-strong)] leading-[1.25] tracking-[-0.02em]">
                کاتالوگ جدید را خودتان نمی‌سازید
              </h2>
              <p className="text-sm sm:text-base font-normal text-[var(--text-neutral-subtle)] leading-relaxed tracking-[-0.02em]">
                انتقال بی‌دردسر از فایل‌های چاپی، PDF و اکسل به ویترین تعاملی فروش بدون تحمیل کار فنی به تیم شما.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 migration-adapt-rows">
            {STEPS.map((step) => (
              <article
                key={step.n}
                onMouseEnter={(e) => {
                  // adapt: فقط روی fine-pointer — روی coarse بی‌اثر
                  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
                  e.currentTarget.style.setProperty('--line-origin', `${xPercent}%`);
                }}
                className="migration-adapt-row group relative border-b border-[var(--border-neutral-base)] transition-colors duration-200 hover:bg-[var(--color-primary-50)]/30 active:bg-[var(--color-primary-50)]/30"
              >
                {/* adapt: خط هاور فقط روی fine-pointer؛ روی coarse همیشه مخفی */}
                <span
                  className="migration-adapt-line absolute bottom-0 right-0 h-px w-full bg-[var(--color-primary-600)] scale-x-0 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 pointer-events-none max-[1023px]:hidden lg:block"
                  style={{ transformOrigin: 'var(--line-origin, 100%) center' }}
                  aria-hidden="true"
                />
                {/* adapt: روی موبایل — نشانگر active (تاچ) با انیمیشن ساده از راست */}
                <span
                  className="absolute bottom-0 right-0 h-px w-full bg-[var(--color-primary-300)] scale-x-0 transition-transform duration-300 group-active:scale-x-100 pointer-events-none lg:hidden"
                  style={{ transformOrigin: 'right center' }}
                  aria-hidden="true"
                />

                {/* adapt: پدینگ و گپ واکنش‌گرا — اعداد یک پله کوچک‌تر روی موبایل */}
                <div className="pr-5 sm:pr-7 lg:pr-[40px] pl-6 sm:pl-9 lg:pl-[48px] py-7 sm:py-9 lg:py-11 grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-6 lg:gap-x-[34px] items-start">
                  <span className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-none text-[var(--color-neutral-300)] transition-colors duration-200 group-hover:text-[var(--color-secondary-500)] select-none w-12 sm:w-14 lg:w-16 pt-1.5 sm:pt-2 lg:pt-2.5 text-center shrink-0">
                    {step.n}
                  </span>

                  <div className="flex flex-col items-start">
                    {/* adapt: آیکون با تارگت لمسی حداقل 44px روی موبایل */}
                    <div className="text-[var(--color-primary-600)] mb-5 lg:mb-[26px] transition-transform duration-200 group-hover:scale-105 min-h-[44px] min-w-[44px] flex items-center">
                      <step.icon size={30} stroke={1.7} className="lg:hidden" />
                      <step.icon size={34} stroke={1.7} className="hidden lg:block" />
                    </div>

                    <h3 className="text-base sm:text-lg lg:text-xl font-black text-[var(--text-neutral-strong)] leading-snug transition-colors duration-200 group-hover:text-[var(--color-primary-900)] tracking-[-0.02em] mb-4 lg:mb-5">
                      {step.title}
                    </h3>

                    <p className="text-sm sm:text-base font-normal leading-relaxed text-[var(--text-neutral-base)] tracking-[-0.02em] mb-3 lg:mb-4">
                      {step.body}
                    </p>

                    <div className="flex flex-col gap-2 lg:gap-2.5">
                      {step.notes.map((note, noteIdx) => (
                        <div key={noteIdx} className="flex items-center gap-2 lg:gap-2.5">
                          <span className="w-1.5 h-1.5 bg-[var(--color-primary-600)] shrink-0" aria-hidden="true" />
                          <span className="text-sm sm:text-base font-normal text-[var(--text-neutral-subtle)] tracking-[-0.02em]">
                            {note}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
