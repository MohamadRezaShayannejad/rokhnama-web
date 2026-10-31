'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  IconFileSpreadsheet,
  IconLayersIntersect,
  IconRotate360,
  IconAntenna,
  IconFolder,
  IconTerminal2,
} from '@tabler/icons-react';
import {
  Slow,
  Settle,
  Turntable,
  Dish,
  Riffle,
  Terminal,
} from '@lucasmarkes/hairline/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const hairlineStyles: React.CSSProperties = {
  '--hairline-plate': '#ffffff',
  '--hairline-hi': '#1f2b8f',
  '--hairline-edge': '#4a5565',
  '--hairline-mid': '#99a1af',
  '--hairline-lo': '#e5e7eb',
  '--hairline-stroke': '1',
  colorScheme: 'light',
} as React.CSSProperties;

export default function FeaturesShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const frameFillRightRef = useRef<HTMLDivElement>(null);
  const frameFillLeftRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const fillTargets = [frameFillRightRef.current, frameFillLeftRef.current].filter(
        Boolean
      ) as HTMLDivElement[];

      if (fillTargets.length) {
        if (isReduced) {
          gsap.set(fillTargets, { scaleY: 1 });
        } else {
          gsap.fromTo(
            fillTargets,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                end: 'bottom center',
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      }

      // فعال‌سازی مرحله‌ای کارت‌ها و پر شدن بوردر پایین منطبق با حرکت نوک ریل (منحصراً در نمای موبایل)
      const mm = gsap.matchMedia();
      mm.add('(max-width: 639px)', () => {
        const cardEls = Array.from(
          containerRef.current?.querySelectorAll<HTMLElement>('.feature-card') || []
        );

        if (!isReduced) {
          gsap.fromTo(
            '.features-header > *',
            { opacity: 0.1, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.06,
              ease: 'power2.out',
              clearProps: 'all',
              scrollTrigger: {
                trigger: '.features-header',
                start: 'top 92%',
                once: true,
              },
            }
          );

          cardEls.forEach((card) => {
            gsap.fromTo(
              card,
              { opacity: 0.2, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: 'power2.out',
                clearProps: 'all',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 95%',
                  once: true,
                },
              }
            );
          });
        }

        cardEls.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => card.setAttribute('data-active', 'true'),
            onLeave: () => card.setAttribute('data-active', 'false'),
            onEnterBack: () => card.setAttribute('data-active', 'true'),
            onLeaveBack: () => card.setAttribute('data-active', 'false'),
            onRefresh: (self) => {
              card.setAttribute('data-active', self.isActive ? 'true' : 'false');
            },
          });

          ScrollTrigger.create({
            trigger: card,
            start: 'center center',
            end: () => {
              const next = cardEls[i + 1];
              const h = next ? next.offsetHeight : card.offsetHeight;
              return `bottom+=${Math.round(h * 0.3)} center`;
            },
            onEnter: () => card.setAttribute('data-border-active', 'true'),
            onLeave: () => card.setAttribute('data-border-active', 'false'),
            onEnterBack: () => card.setAttribute('data-border-active', 'true'),
            onLeaveBack: () => card.setAttribute('data-border-active', 'false'),
            onRefresh: (self) => {
              card.setAttribute('data-border-active', self.isActive ? 'true' : 'false');
            },
          });
        });
      });
    },
    { scope: containerRef }
  );

  const cards = [
    {
      id: 0,
      Icon: IconFolder,
      title: 'آرشیو ساختاریافته',
      desc: 'کدها و اطلاعات محصولات را منظم کنید و لینک هر محصول را جداگانه بفرستید',
      mobileDesc: 'محصولات را منظم کنید و لینک اختصاصی هر کالا را بفرستید',
      Illustration: Riffle,
      colSpan: 'lg:[grid-column:span_9/span_9]',
      borders: 'border-t sm:border-t-0 border-b sm:border-e sm:border-b lg:border-e lg:border-b',
      isRowOne: true,
      mobileWidth: 'w-[117px]',
    },
    {
      id: 1,
      Icon: IconTerminal2,
      title: 'جست‌وجوی سریع کد',
      desc: 'کد محصول را وارد کنید و قطعه و مشخصات آن را سریع پیدا کنید',
      mobileDesc: 'کد محصول را بزنید و مشخصات قطعه را سریع ببینید',
      Illustration: Terminal,
      colSpan: 'lg:[grid-column:span_8/span_8]',
      borders: 'border-b sm:border-e-0 sm:border-b lg:border-e lg:border-b',
      isRowOne: true,
      mobileWidth: 'w-[116px]',
    },
    {
      id: 2,
      Icon: IconRotate360,
      title: 'رسانه و مدل سه‌بعدی',
      desc: 'ویدیو، تست عملکرد و نمای ۳۶۰ درجه محصول را همان‌جا ببینید',
      mobileDesc: 'ویدیو، تست عملکرد و نمای ۳۶۰ درجه را همان‌جا ببینید',
      Illustration: Turntable,
      colSpan: 'lg:[grid-column:span_7/span_7]',
      borders: 'border-b sm:border-e sm:border-b lg:border-e-0 lg:border-b',
      isRowOne: true,
      mobileWidth: 'w-[112px]',
    },
    {
      id: 3,
      Icon: IconAntenna,
      title: 'دسترسی آفلاین پایدار',
      desc: 'QR را در نمایشگاه اسکن کنید و کاتالوگ را بدون اینترنت باز کنید',
      mobileDesc: 'با اسکن QR، کاتالوگ را بدون اینترنت باز کنید',
      Illustration: Dish,
      colSpan: 'lg:[grid-column:span_7/span_7]',
      borders: 'border-b sm:border-e-0 sm:border-b lg:border-e lg:border-b-0',
      isRowOne: false,
      mobileWidth: 'w-[118px]',
    },
    {
      id: 4,
      Icon: IconFileSpreadsheet,
      title: 'پیش‌فاکتور و برگ سفارش',
      desc: 'انتخاب‌های خریدار را به پیش‌فاکتور رسمی با مشخصات کامل تبدیل کنید',
      mobileDesc: 'انتخاب خریدار را مستقیماً به پیش‌فاکتور رسمی تبدیل کنید',
      Illustration: Slow,
      colSpan: 'lg:[grid-column:span_9/span_9]',
      borders: 'border-b sm:border-e sm:border-b-0 lg:border-e lg:border-b-0',
      isRowOne: false,
      mobileWidth: 'w-[112px]',
    },
    {
      id: 5,
      Icon: IconLayersIntersect,
      title: 'معماری فشرده و پاپ‌آپ',
      desc: 'مشخصات و واریانت‌ها را با لمس محصول ببینید، بدون شلوغ شدن صفحه',
      mobileDesc: 'مشخصات و واریانت‌ها را با یک لمس ببینید، بدون شلوغی صفحه',
      Illustration: Settle,
      colSpan: 'lg:[grid-column:span_8/span_8]',
      borders: 'border-b-0 sm:border-e-0 sm:border-b-0 lg:border-e-0 lg:border-b-0',
      isRowOne: false,
      mobileWidth: 'w-[102px]',
    },
  ];

  return (
    <section
      ref={containerRef}
      id="features"
      className="relative z-20 w-full bg-white text-[var(--color-neutral-900)] pt-[60px] pb-0 sm:py-28 tracking-[-0.02em] overflow-hidden border-t border-[var(--color-neutral-200)]"
      dir="rtl"
    >
      {/* خطوط عمودی ممتد طرفین در کانتینر ۱۴۷۲px با رنگ اختصاصی neutral-200 و خطوط پرشونده با primary-600 */}
      <div className="pointer-events-none absolute inset-0 z-20 flex justify-center overflow-hidden" aria-hidden="true">
        <div className="relative h-full w-[calc(100%-16px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
          <div className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-neutral-200)]" />
          <div
            ref={frameFillRightRef}
            className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-primary-600)] origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
          <div className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-neutral-200)]" />
          <div
            ref={frameFillLeftRef}
            className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-primary-600)] origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>
      </div>

      {/* کانتینر محتوا: در دسکتاپ بر بستر کلاس اصلی content-col روی گرید ۱۲۱۶px؛ در موبایل چسبیده به ریل‌ها با خط‌کش ۲۴px برای هدر */}
      <div className="content-col relative z-10 max-sm:!w-[calc(100%-16px)] max-sm:!px-0">
        {/* هدر بخش: در موبایل مرکزچین با گپ فشرده، در دسکتاپ تراز راست روی گرید ۱۲ ستونه */}
        <div className="features-header grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-12 items-start mb-[44px] sm:mb-14 px-6 sm:px-0">
          <div className="lg:col-span-7">
            <h2 className="text-center sm:text-right tracking-[-0.02em] text-[var(--color-neutral-900)]">
              <span className="block text-2xl sm:text-4xl lg:text-[46px] font-black text-[var(--color-neutral-900)] leading-[1.25] tracking-[-0.02em]">
                کاتالوگی که ورق نمی‌خورد
              </span>
              <span className="block text-xl sm:text-3xl lg:text-[32px] font-bold text-[var(--color-neutral-800)] mt-[8px] sm:mt-[14px] leading-[1.35] tracking-[-0.02em]">
                محصولات را بهتر نشان می‌دهد
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5 pt-3">
            <p className="text-center sm:text-right text-sm sm:text-base lg:text-lg font-normal sm:font-semibold text-[var(--text-neutral-subtle)] sm:text-[var(--color-neutral-900)] leading-relaxed tracking-[-0.02em]">
              <span className="sm:hidden">
                محصولات را با مشخصات، تصاویر و ویدیو در یک صفحه ببینید، بدون فایل‌های سنگین
              </span>
              <span className="hidden sm:inline">
                محصولات را با اطلاعات فنی، تصویر و ویدیو در یک صفحه ببینید، بدون شلوغی و جست‌وجو میان فایل‌های حجیم
              </span>
            </p>
          </div>
        </div>

        {/* بنتو گرید ۲۴ ستونی: در موبایل ردیفی فشرده، در دسکتاپ چیدمان عمودی بومی با گاتر پله‌ای */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:[grid-template-columns:repeat(24,minmax(0,1fr))] gap-0 border-0">
          {cards.map((card) => {
            const desktopPadding = card.isRowOne
              ? 'sm:pt-9 sm:pb-12 sm:px-6 lg:px-8 xl:px-12'
              : 'sm:pt-12 sm:pb-9 sm:px-6 lg:px-8 xl:px-12';

            return (
              <div
                key={card.id}
                data-feature-card="true"
                className={`feature-card group relative col-span-1 sm:col-span-1 ${card.colSpan} ${card.borders} border-[var(--color-neutral-200)] flex flex-row sm:flex-col items-center sm:items-stretch justify-between gap-3.5 sm:gap-0 py-[14px] pr-2 pl-6 ${desktopPadding} overflow-hidden transition-colors duration-300`}
              >
                {/* افکت گلو محیطی: در هاور دسکتاپ و در اسکرول فعال موبایل (در موبایل تمام ۶ کارت از پایین به بالا، در دسکتاپ ردیف ۱ از پایین و ردیف ۲ از بالا) */}
                <div
                  className={`pointer-events-none absolute inset-x-0 w-full h-full opacity-0 sm:group-hover:opacity-50 max-sm:group-data-[active=true]:opacity-100 transition-opacity duration-500 ease-out z-0 bottom-0 ${
                    card.isRowOne ? 'sm:bottom-0' : 'sm:top-0 sm:bottom-auto sm:[--glow-origin:0%]'
                  }`}
                  style={{
                    background: card.isRowOne
                      ? 'radial-gradient(ellipse 70% 100% at 50% 100%, color-mix(in srgb, var(--color-primary-100) 80%, transparent), transparent 70%)'
                      : 'radial-gradient(ellipse 70% 100% at 50% var(--glow-origin,100%), color-mix(in srgb, var(--color-primary-100) 80%, transparent), transparent 70%)',
                  }}
                  aria-hidden="true"
                />

                {/* خطوط پیشرونده primary-600: پر شدن از بغل‌ها به سمت وسط؛ منحصراً در موبایل با رد شدن ریل از ۵۰٪ ارتفاع کارت فعال می‌شوند */}
                <span
                  data-line-right="true"
                  className="sm:hidden pointer-events-none absolute bottom-0 right-0 h-[1px] w-[calc(50%+1px)] origin-right scale-x-0 bg-[var(--color-primary-600)] z-20 group-data-[border-active=true]:scale-x-100 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                  aria-hidden="true"
                />
                <span
                  data-line-left="true"
                  className="sm:hidden pointer-events-none absolute bottom-0 left-0 h-[1px] w-[calc(50%+1px)] origin-left scale-x-0 bg-[var(--color-primary-600)] z-20 group-data-[border-active=true]:scale-x-100 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                  aria-hidden="true"
                />

                {/* تصویرسازی: در موبایل سمت راست با عرض ثابت ۱۱۸px با پترن شطرنجی، در دسکتاپ پایین کارت با پترن شطرنجی کامل */}
                <div className="order-1 sm:order-2 shrink-0 w-[118px] h-[94px] sm:w-full sm:h-auto sm:mt-8 flex items-center justify-center relative z-10 overflow-hidden sm:overflow-visible">
                  {/* نمای موبایل: دارای پترن شطرنجی هیرو با حفظ ابعاد دقیق ۱۱۸px و تناسبات */}
                  <div
                    className="sm:hidden w-[118px] h-[94px] flex items-center justify-center relative"
                    style={{
                      ...hairlineStyles,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='11' y='11' width='2.5' height='2.5' fill='%231f2b8f' fill-opacity='0.2'/%3E%3C/svg%3E")`,
                      backgroundSize: '24px 24px',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className={`${card.mobileWidth} h-[94px] flex items-center justify-center relative z-10`}>
                      <card.Illustration
                        className="w-full h-full block relative"
                        theme="light"
                        intensity={0.65}
                        play={true}
                        label={card.title}
                        style={{ colorScheme: 'light' }}
                      />
                    </div>
                  </div>

                  {/* نمای دسکتاپ: پترن شطرنجی هیرو با نسبت ۵:۴ و حداکثر ارتفاع ۲۱۰px */}
                  <div
                    className="hidden sm:flex relative w-full aspect-[5/4] max-h-[210px] items-center justify-center p-3"
                    style={{
                      ...hairlineStyles,
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='11' y='11' width='2.5' height='2.5' fill='%231f2b8f' fill-opacity='0.2'/%3E%3C/svg%3E")`,
                      backgroundSize: '24px 24px',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="w-full h-full max-w-[250px] aspect-[5/4] flex items-center justify-center relative" style={hairlineStyles}>
                      <card.Illustration
                        className="w-full h-full block relative"
                        theme="light"
                        intensity={0.65}
                        play={true}
                        label={card.title}
                        style={{ colorScheme: 'light' }}
                      />
                    </div>
                  </div>
                </div>

                {/* محتوای متنی کارت */}
                <div className="order-2 sm:order-1 flex-1 min-w-0 relative z-10 flex flex-col justify-center sm:justify-start">
                  {/* عنوان و آیکون کارت */}
                  <div className="flex items-center gap-2.5 sm:gap-3.5 pb-4 sm:pb-5">
                    <div className="text-[var(--color-primary-600)] group-hover:text-[var(--color-secondary-600)] group-data-[active=true]:text-[var(--color-secondary-600)] transition-colors duration-300 shrink-0">
                      <card.Icon size={20} className="w-5 h-5 sm:w-8 sm:h-8" stroke={1.6} />
                    </div>
                    <h3 className="text-[13.5px] sm:text-lg font-bold text-[var(--color-neutral-900)] group-hover:text-[var(--color-primary-800)] group-data-[active=true]:text-[var(--color-primary-800)] transition-colors duration-300 leading-tight tracking-[-0.02em] pt-[1px] sm:pt-[2px]">
                      {card.title}
                    </h3>
                  </div>
                  {/* متن بدنه کارت */}
                  <p className="w-full text-[12px] sm:text-base text-[var(--color-neutral-700)] leading-[1.65] sm:leading-relaxed font-medium tracking-[-0.02em]">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
