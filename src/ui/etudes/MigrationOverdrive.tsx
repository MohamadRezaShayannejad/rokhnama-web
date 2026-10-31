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

// Overdrive V3 — دقیقاً از روی src/ui/MigrationProcess.tsx (لندینگ) کپی‌شده و سپس سه اصلاح:
// ۱) ستون راست با ورود stagger می‌آید  ۲) خط پیشرونده = همان خط‌های بغل سکشن (نه کنار کارت‌ها)  ۳) لوگو از پایین با اسکرول پر می‌شود
export default function MigrationOverdrive() {
  const container = useRef<HTMLElement>(null);
  const logoRectRef = useRef<SVGRectElement>(null);
  const frameFillRightRef = useRef<HTMLDivElement>(null);
  const frameFillLeftRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReduced) {
        // ستون راست: ورود از راست با stagger — لهجهٔ ملایم، تک‌بار
        gsap.from('.migration-overdrive-right > *', {
          opacity: 0,
          x: 18,
          duration: 0.55,
          ease: 'power3.out',
          stagger: 0.1,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.migration-overdrive-right',
            start: 'top 86%',
            once: true,
          },
        });
      }

      if (prefersReduced) return;

      // لوگو: پر شدن از پایین با اسکرول کل سکشن — هرچه به انتها نزدیک‌تر، پرتر
      // rect داخل clipPath با scaleY از 0→1 و origin=bottom
      if (logoRectRef.current) {
        gsap.fromTo(
          logoRectRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: container.current,
              start: 'top 70%',
              end: 'bottom 35%',
              scrub: 0.7,
            },
          }
        );
      }

      // Wipe تاییدشدهٔ کارت‌ها: clip-path از راست + فید عدد
      const rows = container.current.querySelectorAll<HTMLElement>('.migration-overdrive-row');
      rows.forEach((row) => {
        const inner = row.querySelector<HTMLElement>('.migration-overdrive-inner');
        if (!inner) return;
        gsap.fromTo(
          inner,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 88%',
              once: true,
            },
          }
        );
        const num = row.querySelector<HTMLElement>('.migration-overdrive-num');
        if (num) {
          gsap.fromTo(
            num,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              delay: 0.18,
              scrollTrigger: { trigger: row, start: 'top 88%', once: true },
            }
          );
        }
      });

      // خط پیشرونده = خط‌های بغل سکشن — ورودش با ظاهر شدن کارت ۴ می‌آید و هم‌زمان با wipe کارت ۴ کامل می‌شود
      const lastRow = container.current.querySelector<HTMLElement>('.migration-overdrive-row:last-child');
      const fillTargets = [frameFillRightRef.current, frameFillLeftRef.current].filter(Boolean) as HTMLDivElement[];
      fillTargets.forEach((el) => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: lastRow ?? container.current,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="migration-overdrive"
      dir="rtl"
      className="relative z-10 w-full bg-white text-[var(--color-neutral-900)] py-24 sm:py-32 px-4 sm:px-6 lg:px-8 tracking-[-0.02em] border-t border-[var(--border-neutral-base)]"
    >
      {/* خطوط عمودی اطراف سکشن — neutral-200 بستر + primary-600 پرشوندهٔ اسکرولی (خط پیشرونده) */}
      <div className="pointer-events-none absolute inset-0 z-20 flex justify-center overflow-hidden" aria-hidden="true">
        <div className="relative h-full w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
          {/* راست */}
          <div className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-neutral-200)]" />
          <div
            ref={frameFillRightRef}
            className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-primary-600)] origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
          {/* چپ */}
          <div className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-neutral-200)]" />
          <div
            ref={frameFillLeftRef}
            className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-primary-600)] origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 lg:gap-x-[88px] gap-y-16 items-start">
          {/* ستون راست چسبان — با کلاس migration-overdrive-right برای ورود stagger */}
          <div className="migration-overdrive-right group/right lg:col-span-5 lg:sticky lg:top-32 flex flex-col pl-0 lg:pl-2">
            {/* لوگومارک ۱۴۸px — پر شدن از پایین با اسکرول (origin=bottom) */}
            <div className="w-[148px] mb-20 flex items-start cursor-default">
              <svg
                viewBox="671 18 246 251"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[148px] h-auto shrink-0 select-none overflow-hidden"
                aria-label="رُخ‌نما"
              >
                <defs>
                  <clipPath id="migration-overdrive-logo-clip">
                    <path d="M916.189 268.181H856.601L856.627 125.135L716.349 268.181H671.441V221.649L811.093 79.1121H671.441V18.2366L916.189 18.226V268.181Z" />
                  </clipPath>
                </defs>
                <g clipPath="url(#migration-overdrive-logo-clip)">
                  <rect
                    ref={logoRectRef}
                    x="671"
                    y="18"
                    width="246"
                    height="251"
                    fill="var(--color-primary-200)"
                    style={{ transformOrigin: 'center bottom', transform: 'scaleY(0)' }}
                  />
                </g>
                <path
                  d="M916.189 268.181H856.601L856.627 125.135L716.349 268.181H671.441V221.649L811.093 79.1121H671.441V18.2366L916.189 18.226V268.181Z"
                  fill="none"
                  stroke="var(--color-primary-200)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            <div className="flex items-center gap-2 mb-8">
              <span className="w-1.5 h-1.5 bg-[var(--color-secondary-500)]" aria-hidden="true" />
              <span className="text-xs font-bold text-[var(--color-primary-700)]">
                مسیر انتقال کاتالوگ فیزیکی به رُخ‌نما
              </span>
            </div>

            <div className="flex flex-col gap-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-neutral-strong)] leading-[1.25] tracking-[-0.02em]">
                کاتالوگ جدید را خودتان نمی‌سازید
              </h2>
              <p className="text-sm sm:text-base font-normal text-[var(--text-neutral-subtle)] leading-relaxed tracking-[-0.02em]">
                انتقال بی‌دردسر از فایل‌های چاپی، PDF و اکسل به ویترین تعاملی فروش بدون تحمیل کار فنی به تیم شما.
              </p>
            </div>
          </div>

          {/* ستون چپ: ردیف‌ها — بدون هیچ خط بغل کنار کارت‌ها؛ فقط خط‌های اطراف سکشن پیشرونده‌اند */}
          <div className="lg:col-span-7 migration-overdrive-rows">
            {STEPS.map((step) => (
              <article
                key={step.n}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
                  e.currentTarget.style.setProperty('--line-origin', `${xPercent}%`);
                }}
                className="migration-overdrive-row group relative border-b border-[var(--border-neutral-base)] transition-colors duration-200 hover:bg-[var(--color-primary-50)]/30 overflow-hidden"
              >
                <span
                  className="absolute bottom-0 right-0 h-px w-full bg-[var(--color-primary-600)] scale-x-0 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 pointer-events-none"
                  style={{ transformOrigin: 'var(--line-origin, 100%) center' }}
                  aria-hidden="true"
                />

                <div className="migration-overdrive-inner pr-7 sm:pr-[40px] pl-9 sm:pl-[48px] py-9 sm:py-11 grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-[34px] items-start">
                  <span className="migration-overdrive-num text-6xl lg:text-7xl font-normal leading-none text-[var(--color-neutral-300)] transition-colors duration-200 group-hover:text-[var(--color-secondary-500)] select-none w-14 sm:w-16 pt-2.5 text-center shrink-0">
                    {step.n}
                  </span>

                  <div className="flex flex-col items-start">
                    <div className="text-[var(--color-primary-600)] mb-[26px] transition-transform duration-200 group-hover:scale-105">
                      <step.icon size={34} stroke={1.7} />
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-[var(--text-neutral-strong)] leading-snug transition-colors duration-200 group-hover:text-[var(--color-primary-900)] tracking-[-0.02em] mb-5">
                      {step.title}
                    </h3>

                    <p className="text-base font-normal leading-relaxed text-[var(--text-neutral-base)] tracking-[-0.02em] mb-4">
                      {step.body}
                    </p>

                    <div className="flex flex-col gap-2.5">
                      {step.notes.map((note, noteIdx) => (
                        <div key={noteIdx} className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 bg-[var(--color-primary-600)] shrink-0" aria-hidden="true" />
                          <span className="text-base font-normal text-[var(--text-neutral-subtle)] tracking-[-0.02em]">
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
