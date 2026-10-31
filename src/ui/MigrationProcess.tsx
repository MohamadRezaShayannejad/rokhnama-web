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
  IconTransform,
} from '@tabler/icons-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface StepItem {
  n: string;
  icon: React.ComponentType<{ size?: number; stroke?: number; className?: string }>;
  title: string;
  body: React.ReactNode;
}

const STEPS: StepItem[] = [
  {
    n: '۱',
    icon: IconFileImport,
    title: 'استخراج اطلاعات',
    body: (
      <>
        مشخصات، جداول و تصاویر را از فایل‌های قبلی شما استخراج می‌کنیم
      </>
    ),
  },
  {
    n: '۲',
    icon: IconAdjustmentsHorizontal,
    title: 'سامان‌دهی اطلاعات',
    body: (
      <>
        کدها و نام محصولات را یکدست می‌کنیم و تصاویر را برای وب آماده می‌کنیم
      </>
    ),
  },
  {
    n: '۳',
    icon: IconLayersIntersect,
    title: 'ساخت تجربه تعاملی',
    body: (
      <>
        صفحات شلوغ را به بخش‌های تعاملی، ویدیو و نمای ۳۶۰ درجه تبدیل می‌کنیم
      </>
    ),
  },
  {
    n: '۴',
    icon: IconCloudUpload,
    title: 'انتشار و تحویل',
    body: (
      <>
        کاتالوگ را روی زیرساخت ابری منتشر می‌کنیم و پنل مدیریت را تحویل می‌دهیم
      </>
    ),
  },
];

// Overdrive V3 — دقیقاً از روی src/ui/MigrationProcess.tsx (لندینگ) کپی‌شده و سپس سه اصلاح:
// ۱) ستون راست با ورود stagger می‌آید  ۲) خط پیشرونده = همان خط‌های بغل سکشن (نه کنار کارت‌ها)  ۳) لوگو از پایین با اسکرول پر می‌شود
export default function MigrationProcess() {
  const container = useRef<HTMLElement>(null);
  const logoRectRef = useRef<SVGRectElement>(null);
  const frameFillRightRef = useRef<HTMLDivElement>(null);
  const frameFillLeftRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReduced) {
        // ستون راست: ورود نرم و ملموس به سبک Framer Motion
        gsap.from('.migration-right > *', {
          opacity: 0,
          y: 36,
          scale: 0.97,
          duration: 0.65,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.migration-right',
            start: 'top 84%',
            once: true,
          },
        });
      }

      const fillTargets = [frameFillRightRef.current, frameFillLeftRef.current].filter(
        Boolean
      ) as HTMLDivElement[];

      if (fillTargets.length) {
        if (prefersReduced) {
          gsap.set(fillTargets, { scaleY: 1 });
        } else {
          gsap.fromTo(
            fillTargets,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: container.current,
                start: 'top 80%',
                end: 'bottom center',
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      }

      if (prefersReduced) return;

      // پر شدن لوگو با اسکرول:
      // ۱. در موبایل (<1024px): لوگو در بالای سکشن و در دیدرس کاربر همگام با ورود بخش پر می‌شود
      // ۲. در دسکتاپ (>=1024px): ستون راست استیکی می‌ماند و لوگو همگام با اسکرول کارت‌های ستون چپ پر می‌شود
      const mm = gsap.matchMedia();

      mm.add('(max-width: 1023px)', () => {
        if (logoRectRef.current) {
          gsap.fromTo(
            logoRectRef.current,
            { attr: { y: 269, height: 0 } },
            {
              attr: { y: 18, height: 251 },
              ease: 'none',
              scrollTrigger: {
                trigger: container.current,
                start: 'top 80%',
                end: () => `+=${Math.round(window.innerHeight * 0.55)}`,
                scrub: 0.5,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });

      mm.add('(min-width: 1024px)', () => {
        if (logoRectRef.current) {
          gsap.fromTo(
            logoRectRef.current,
            { attr: { y: 269, height: 0 } },
            {
              attr: { y: 18, height: 251 },
              ease: 'none',
              scrollTrigger: {
                trigger: '.migration-rows',
                start: 'top 75%',
                end: 'bottom 75%',
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });

      // ردیف‌های کارت — ورود نرم و چشم‌نواز سبک Framer Motion
      const rows = Array.from(container.current.querySelectorAll<HTMLElement>('.migration-row'));

      gsap.fromTo(
        rows,
        { opacity: 0, y: 36, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.migration-rows',
            start: 'top 84%',
            once: true,
          },
        }
      );

      // فعال‌سازی مرحله‌ای ردیف‌ها و پر شدن بوردر پایین منطبق با حرکت نوک ریل
      rows.forEach((row, i) => {
        ScrollTrigger.create({
          trigger: row,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => row.setAttribute('data-active', 'true'),
          onLeave: () => row.setAttribute('data-active', 'false'),
          onEnterBack: () => row.setAttribute('data-active', 'true'),
          onLeaveBack: () => row.setAttribute('data-active', 'false'),
          onRefresh: (self) => {
            row.setAttribute('data-active', self.isActive ? 'true' : 'false');
          },
        });

        ScrollTrigger.create({
          trigger: row,
          start: 'center center',
          end: () => {
            const next = rows[i + 1];
            const h = next ? next.offsetHeight : row.offsetHeight;
            return `bottom+=${Math.round(h * 0.3)} center`;
          },
          onEnter: () => row.setAttribute('data-border-active', 'true'),
          onLeave: () => row.setAttribute('data-border-active', 'false'),
          onEnterBack: () => row.setAttribute('data-border-active', 'true'),
          onLeaveBack: () => row.setAttribute('data-border-active', 'false'),
          onRefresh: (self) => {
            row.setAttribute('data-border-active', self.isActive ? 'true' : 'false');
          },
        });
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="migration"
      dir="rtl"
      className="relative z-10 w-full bg-white text-[var(--color-neutral-900)] pt-16 pb-0 lg:py-32 tracking-[-0.02em] border-t border-[var(--color-neutral-200)]"
    >
      {/* خطوط عمودی اطراف سکشن — neutral-200 بستر + primary-600 پرشوندهٔ اسکرولی (خط پیشرونده) */}
      <div className="pointer-events-none absolute inset-0 z-20 flex justify-center overflow-hidden" aria-hidden="true">
        <div className="relative h-full w-[calc(100%-16px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
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

      {/* کانتینر محتوا: در موبایل بدون پدینگ تا کارت‌ها به خطوط ریل بچسبند؛ در دسکتاپ دقیقاً مطابق content-col با ماکزیمم ۱۲۱۶px */}
      <div className="content-col relative z-10 !w-[calc(100%-16px)] sm:!w-[calc(100%-48px)] lg:!w-full !px-0 lg:!px-[max(48px,calc((100%-1216px)/2))]">
        {/* دو ستون ۵:۷ با گپ ۴۸px روی دسکتاپ. گپ عمودی ۶۰px در موبایل (۴۰px اولیه + ۲۰px افزایش)، ۶۴px در دسکتاپ */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-y-[60px] lg:gap-y-16 lg:gap-x-12 items-start">
          {/* ستون راست چسبان — با پدینگ ۳۲ پیکسل چپ و راست در موبایل، و استایل اصلی در دسکتاپ */}
          <div className="migration-right group/right lg:sticky lg:top-32 flex flex-col px-8 lg:px-0 lg:pl-2 w-full">
            {/* لوگومارک: ۸۸px در موبایل، ۱۴۸px در دسکتاپ — پر شدن از پایین با اسکرول (origin=bottom) */}
            <div className="w-[88px] lg:w-[148px] mb-14 lg:mb-20 flex items-start cursor-default relative">
              <div className="absolute -inset-2 lg:-inset-4 bg-[var(--color-primary-50)]/20 pointer-events-none rounded-none" style={{ opacity: 0.15 }} />
              <svg
                viewBox="671 18 246 251"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[88px] lg:w-[148px] h-auto shrink-0 select-none overflow-hidden relative z-10"
                aria-label="رُخ‌نما"
              >
                <defs>
                  <clipPath id="migration-logo-clip">
                    <path d="M916.189 268.181H856.601L856.627 125.135L716.349 268.181H671.441V221.649L811.093 79.1121H671.441V18.2366L916.189 18.226V268.181Z" />
                  </clipPath>
                </defs>
                <g clipPath="url(#migration-logo-clip)">
                  <rect
                    ref={logoRectRef}
                    x="671"
                    y="269"
                    width="246"
                    height="0"
                    fill="var(--color-primary-200)"
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

            {/* بدج سکشن: در موبایل حذف شده؛ در دسکتاپ بر سر جای خود باقی است */}
            <div className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] text-xs font-bold mb-12 tracking-[-0.02em] self-start">
              <IconTransform size={16} className="text-[var(--color-secondary-500)]" />
              <span>از کاتالوگ فعلی تا ویترین دیجیتال</span>
            </div>

            <div className="flex flex-col gap-6 lg:gap-8 w-full">
              <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black text-[var(--text-neutral-strong)] leading-[1.25] tracking-[-0.02em] flex flex-col gap-2">
                <span className="text-4xl sm:text-5xl lg:text-5xl">کاتالوگ جدید</span>
                <span className="text-2xl sm:text-3xl lg:text-3xl font-bold opacity-90">را خودتان نمی‌سازید</span>
              </h2>
              <p className="w-full text-sm sm:text-base font-normal text-[var(--text-neutral-subtle)] leading-relaxed tracking-[-0.02em]">
                از فایل‌های چاپی، PDF و اکسل به یک ویترین تعاملی فروش بروید، بدون اینکه تیم شما درگیر کارهای فنی شود
              </p>
            </div>
          </div>

          {/* ستون چپ: ردیف‌ها — با خط فعال‌ساز پایین و افکت گلو محو از لبهٔ پایین در هاور/اسکرول */}
          <div className="migration-rows">
            {STEPS.map((step, idx) => (
              <article
                key={step.n}
                className="migration-row group relative border-b first:border-t lg:first:border-t-0 border-[var(--color-neutral-200)] overflow-hidden"
              >
                {/* افکت گلو محیطی در لبهٔ پایین کارت: دقیقاً منطبق بر طول و عرض کارت بدون بالا زدن یا سرریز */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 w-full opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 transition-opacity duration-500 ease-out z-0"
                  style={{
                    background:
                      'radial-gradient(ellipse 70% 100% at 50% 100%, color-mix(in srgb, var(--color-primary-100) 80%, transparent), transparent 70%)',
                  }}
                  aria-hidden="true"
                />

                {/* خطوط پیشرونده primary-600: پر شدن از بغل‌ها (ریل‌ها) به سمت وسط؛ با رد شدن ریل از ۵۰٪ ارتفاع کارت فعال و با خروج ریل برداشته می‌شوند */}
                <span
                  data-line-right="true"
                  className="pointer-events-none absolute bottom-0 right-0 h-[1px] w-[calc(50%+1px)] origin-right scale-x-0 bg-[var(--color-primary-600)] z-20 group-hover:scale-x-100 group-data-[border-active=true]:scale-x-100 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                  aria-hidden="true"
                />
                <span
                  data-line-left="true"
                  className="pointer-events-none absolute bottom-0 left-0 h-[1px] w-[calc(50%+1px)] origin-left scale-x-0 bg-[var(--color-primary-600)] z-20 group-hover:scale-x-100 group-data-[border-active=true]:scale-x-100 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                  aria-hidden="true"
                />

                <div className="migration-inner relative z-10 px-8 py-10 lg:px-0 lg:pr-[40px] lg:pl-[48px] lg:py-11 flex flex-col lg:grid lg:grid-cols-[auto_1fr] lg:gap-x-[34px] items-start">
                  <span className="migration-num text-5xl lg:text-7xl font-normal leading-none text-[var(--color-neutral-300)] transition-colors duration-300 group-hover:text-[var(--color-secondary-500)] group-data-[active=true]:text-[var(--color-secondary-500)] select-none shrink-0 mb-4 lg:mb-0 lg:w-16 lg:text-center lg:self-center lg:pt-4">
                    {step.n}
                  </span>

                  <div className="flex flex-col items-start w-full">
                    {/* در دسکتاپ: آیکون ۳۴ پیکسل بالای عنوان قرار دارد */}
                    <div className="hidden lg:block text-[var(--color-primary-600)] group-hover:text-[var(--color-secondary-600)] group-data-[active=true]:text-[var(--color-secondary-600)] mb-[26px] transition-all duration-300 group-hover:scale-105 group-data-[active=true]:scale-105">
                      <step.icon size={34} stroke={1.7} />
                    </div>

                    {/* در موبایل: آیکون ۲۴ پیکسل پیشِ عنوان قرار می‌گیرد */}
                    <div className="flex lg:hidden items-center gap-3 mb-[18px]">
                      <div className="text-[var(--color-primary-600)] group-hover:text-[var(--color-secondary-600)] group-data-[active=true]:text-[var(--color-secondary-600)] transition-all duration-300 group-hover:scale-105 group-data-[active=true]:scale-105 shrink-0">
                        <step.icon size={24} stroke={1.7} />
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-[var(--text-neutral-strong)] leading-snug transition-colors duration-300 group-hover:text-[var(--color-primary-900)] group-data-[active=true]:text-[var(--color-primary-900)] tracking-[-0.02em]">
                        {step.title}
                      </h3>
                    </div>

                    {/* عنوان فقط در دسکتاپ */}
                    <h3 className="hidden lg:block text-lg lg:text-xl font-bold text-[var(--text-neutral-strong)] leading-snug transition-colors duration-300 group-hover:text-[var(--color-primary-900)] group-data-[active=true]:text-[var(--color-primary-900)] tracking-[-0.02em] mb-[18px]">
                      {step.title}
                    </h3>

                    <p className="w-full text-base font-normal leading-relaxed text-[var(--text-neutral-base)] tracking-[-0.02em]">
                      {step.body}
                    </p>
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
