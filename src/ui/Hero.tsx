'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/ui/Button';
import { Logo } from '@/ui/Logo';
import { IconArrowLeft } from '@tabler/icons-react';
import DotsPattern from '@/ui/DotsPattern';

gsap.registerPlugin(ScrollTrigger);

/** خط‌تراشی ۲بعدی کالای صنعتی روی برگه‌ها: پمپ، شیر، موتور، گیج */
function PaperFigure({ kind }: { kind: number }) {
  const stroke = { stroke: 'currentColor' };
  const cls = 'text-[var(--color-primary-600)] w-5 h-5 shrink-0';
  if (kind === 0) {
    return (
      <svg viewBox="0 0 40 40" className={cls} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="6" y="22" width="22" height="13" strokeWidth="1.6" style={stroke} />
        <rect x="28" y="26" width="7" height="6" strokeWidth="1.6" style={stroke} />
        <line x1="28" y1="22" x2="28" y2="13" strokeWidth="1.6" style={stroke} />
        <circle cx="13" cy="19" r="3" strokeWidth="1.4" strokeDasharray="2 1.5" style={stroke} />
        <line x1="8" y1="35" x2="26" y2="35" strokeWidth="1.6" style={stroke} />
      </svg>
    );
  }
  if (kind === 1) {
    return (
      <svg viewBox="0 0 40 40" className={cls} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="6" y="8" width="28" height="10" strokeWidth="1.6" style={stroke} />
        <line x1="20" y1="18" x2="20" y2="32" strokeWidth="1.6" style={stroke} />
        <rect x="10" y="28" width="20" height="6" strokeWidth="1.6" style={stroke} />
        <circle cx="20" cy="24" r="2" strokeWidth="1.4" style={stroke} />
      </svg>
    );
  }
  if (kind === 2) {
    return (
      <svg viewBox="0 0 40 40" className={cls} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="10" y="10" width="20" height="16" strokeWidth="1.6" style={stroke} />
        <circle cx="20" cy="18" r="5" strokeWidth="1.4" style={stroke} />
        <line x1="20" y1="26" x2="20" y2="34" strokeWidth="1.6" style={stroke} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 40 40" className={cls} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="20" cy="18" r="10" strokeWidth="1.6" style={stroke} />
      <line x1="20" y1="18" x2="20" y2="9" strokeWidth="1.6" style={stroke} />
      <line x1="20" y1="18" x2="27" y2="14" strokeWidth="1.6" style={stroke} />
      <line x1="20" y1="28" x2="20" y2="34" strokeWidth="1.6" style={stroke} />
      <circle cx="20" cy="18" r="1.6" fill="currentColor" />
    </svg>
  );
}

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      // ۱. انیمیشن ورود عنوان و محتوای متنی هیرو
      gsap.from('.hero-fade-in', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.09,
        ease: 'power3.out',
        clearProps: 'all',
      });

      // ۲. فعال‌سازی پرسپکتیو سه‌بعدی
      const sceneEl = container.current.querySelector('.scene-3d');
      if (sceneEl) {
        gsap.set(sceneEl, {
          perspective: 2000,
          transformStyle: 'preserve-3d',
        });
      }

      const mm = gsap.matchMedia();

      mm.add(
        {
          isMobile: '(max-width: 639px)',
          isDesktop: '(min-width: 640px)',
        },
        (context) => {
          const { isMobile } = context.conditions as { isMobile: boolean };
          const gapX = isMobile ? 74 : 114;
          const gapY = isMobile ? 102 : 150;

          // ۳. چیدمان اولیه شبکه ۳×۳ برگه‌ها
          const papers = container.current?.querySelectorAll('.paper-element');
          if (papers && papers.length > 0) {
            papers.forEach((paper, i) => {
              const col = (i % 3) - 1; // -1, 0, 1
              const row = Math.floor(i / 3) - 1; // -1, 0, 1
              gsap.set(paper, {
                x: col * gapX,
                y: row * gapY,
                z: -10,
                rotationZ: 0,
                transformStyle: 'preserve-3d',
              });
            });

            // ۴. افتادن متوالی و لمسی ۹ برگه روی شبکه سه‌بعدی هنگام لود
            gsap.fromTo(
              papers,
              {
                opacity: 0,
                scale: 1.25,
                z: 140,
                rotationX: -18,
                rotationY: (i) => ((i % 3) - 1) * 6,
              },
              {
                opacity: 1,
                scale: 1,
                z: -10,
                rotationX: 0,
                rotationY: 0,
                duration: 0.45,
                stagger: 0.07,
                ease: 'power2.out',
                delay: 0.15,
              }
            );
          }

          // مقداردهی اولیه نشان لوگو، خط اسکن و موکاپ دیوایس
          const logoMark = container.current?.querySelector('.logo-mark');
          const scanLine = container.current?.querySelector('.scan-line');
          const device = container.current?.querySelector('.realistic-device');

          if (logoMark) gsap.set(logoMark, { scale: 0.8, opacity: 0, z: 0 });
          if (scanLine) gsap.set(scanLine, { top: -4, opacity: 0 });
          if (device) {
            gsap.set(device, {
              y: isMobile ? 420 : 550,
              z: 80,
              scale: 0.65,
              opacity: 0,
              rotationX: 0,
              transformStyle: 'preserve-3d',
              pointerEvents: 'none',
            });
          }

          // ۵. تایم‌لاین کامل اسکرول هیرو با مکث‌های استاندارد
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container.current,
              start: 'top top',
              end: isMobile ? '+=2200' : '+=3400',
              pin: true,
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          });

          // مرحله ۱: جمع شدن ۹ برگه روی هم در مرکز (0.05 -> 0.25)
          if (papers) {
            papers.forEach((paper, i) => {
              tl.to(
                paper,
                {
                  x: (i - 4) * 1.5,
                  y: (i - 4) * 1.5,
                  rotationZ: (i - 4) * 1.5,
                  ease: 'power2.inOut',
                },
                0.05
              );
            });

            // مرحله ۲: محو شدن برگه‌ها (0.35 -> 0.46)
            tl.to(
              papers,
              {
                opacity: 0,
                scale: 0.88,
                ease: 'power1.inOut',
              },
              0.35
            );
          }

          // بالا آمدن باکس سفید لوگوی رُخ‌نما در مرکز
          if (logoMark) {
            tl.fromTo(
              logoMark,
              { scale: 0.8, opacity: 0 },
              { scale: 1, opacity: 1, ease: 'power2.out' },
              0.38
            );
          }

          // مرحله ۳: حرکت خط اسکن تخت کهربایی روی لوگو (0.56 -> 0.70)
          if (scanLine) {
            tl.to(scanLine, { opacity: 1, duration: 0.02 }, 0.56);
            tl.fromTo(
              scanLine,
              { top: -4 },
              { top: isMobile ? 100 : 116, ease: 'power1.inOut' },
              0.58
            );
            tl.to(scanLine, { opacity: 0, duration: 0.02 }, 0.70);
          }

          // مرحله ۴: محو شدن لوگو و بالا آمدن موکاپ وکتور گوشی (0.80 -> 0.90)
          if (logoMark) {
            tl.to(
              logoMark,
              {
                opacity: 0,
                scale: 0.92,
                ease: 'power1.inOut',
              },
              0.80
            );
          }

          if (device) {
            tl.to(
              device,
              {
                y: 0,
                z: 80,
                scale: 1,
                opacity: 1,
                rotationX: 0,
                ease: 'power2.out',
                pointerEvents: 'auto',
              },
              0.80
            );
          }
        }
      );

      return () => {
        mm.revert();
      };
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="hero"
      className="relative z-0 w-full bg-[var(--color-primary-600)] h-[280vh] sm:h-[340vh]"
    >
      <div
        ref={stickyRef}
        className="sticky top-0 z-0 h-[100svh] sm:h-screen w-full flex items-center justify-center overflow-hidden"
      >
        {/* خطوط عمودی ممتد طرفین هیرو */}
        <div className="pointer-events-none absolute inset-0 z-[5] flex justify-center overflow-hidden" aria-hidden="true">
          <div className="relative h-full w-[calc(100%-16px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
            <div className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-primary-500)]" />
            <div className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-primary-500)]" />
          </div>
        </div>

        {/* پترن مستطیل‌های تیز نقطه‌ای */}
        <DotsPattern />

        {/* کانتینر اصلی محتوای هیرو */}
        <div className="relative mx-auto h-full w-[calc(100%-16px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px] flex items-center justify-center px-[24px] sm:px-12 lg:px-20 xl:px-24 z-10 pt-20 lg:pt-24 pointer-events-none">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-4 sm:gap-y-12 items-center pointer-events-auto">
            {/* ستون متن و دکمه‌ها — در موبایل بالا (order-1) و در دسکتاپ راست (order-1) */}
            <div className="lg:col-span-6 lg:col-start-1 flex flex-col max-sm:order-1 sm:order-2 lg:order-1 pr-0 lg:pr-2 xl:pr-4 shrink-0">
              {/* عنوان اصلی */}
              <h1 className="hero-fade-in text-[28px] xs:text-[30px] sm:text-3xl lg:text-5xl leading-[1.25] sm:leading-[1.3] text-white tracking-tight">
                <span className="font-black">رُخ‌نما، </span>
                <span className="font-bold">
                  کاتالوگ‌تان{' '}
                  <br className="sm:hidden" />
                  <span className="text-[var(--color-secondary-500)]">دیجیتال</span> می‌شود
                </span>
              </h1>

              {/* متن توضیحی */}
              <p className="hero-fade-in mt-4 sm:mt-6 lg:mt-8 text-sm sm:text-base text-[var(--color-primary-100)] leading-relaxed sm:leading-loose font-medium max-w-xl">
                کاتالوگ محصولاتتان را به یک تجربهٔ دیجیتال برای فروش تبدیل کنید، با قیمت به‌روز، دسترسی متناسب با هر نقش و امکان باز شدن بدون اینترنت
              </p>

              {/* دکمه‌های فراخوان */}
              <div className="hero-fade-in mt-5 sm:mt-6 lg:mt-8 w-full">
                {/* نمای موبایل */}
                <div className="sm:hidden w-full">
                  <Button
                    color="secondary"
                    variant="solid"
                    size="sm"
                    fullWidth
                    iconAfter={<IconArrowLeft size={16} stroke={2.5} />}
                    className="text-[var(--text-neutral-strong)]"
                    onClick={() => {
                      const el = document.getElementById('demo') || document.getElementById('demo-request');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    کاتالوگ‌تان را دیجیتال کنید
                  </Button>
                </div>

                {/* نمای دسکتاپ و تبلت */}
                <div className="hidden sm:block w-full">
                  <Button
                    color="secondary"
                    variant="solid"
                    size="lg"
                    fullWidth
                    iconAfter={<IconArrowLeft size={20} stroke={2.5} />}
                    className="text-[var(--text-neutral-strong)]"
                    onClick={() => {
                      const el = document.getElementById('demo') || document.getElementById('demo-request');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    همین الان شروع کنید
                  </Button>
                </div>
              </div>

              {/* بخش اعتماد — لوگوهای رسمی همراه اول و خواجه‌نصیر */}
              <div className="hero-fade-in mt-5 sm:mt-8 lg:mt-12">
                {/* نمای موبایل */}
                <div className="flex items-center justify-between w-full sm:hidden">
                  <p className="text-[11px] leading-tight shrink-0 select-none text-right">
                    <span className="font-bold text-[var(--color-primary-200)]">مورد اعتماد</span>
                    <br />
                    <span className="font-medium text-[var(--color-primary-300)]">تیم‌های پیشرو صنعت</span>
                  </p>
                  <div className="flex items-center gap-5 shrink-0">
                    <div className="h-[28px] flex items-center justify-center">
                      <img
                        src="/MCI-logo.svg"
                        alt="همراه اول (تحقیق و نوآوری)"
                        className="h-full w-auto object-contain select-none"
                        loading="eager"
                      />
                    </div>
                    <div className="h-[24px] flex items-center justify-center">
                      <img
                        src="/KNDIN-logo.svg"
                        alt="دانشگاه صنعتی خواجه‌نصیرالدین طوسی"
                        className="h-full w-auto object-contain select-none"
                        loading="eager"
                      />
                    </div>
                  </div>
                </div>

                {/* نمای دسکتاپ */}
                <div className="hidden sm:block">
                  <p className="text-xs font-bold text-[var(--color-primary-200)] mb-3 sm:mb-5">
                    مورد اعتماد تیم‌های پیشرو در صنعت و دانشگاه
                  </p>
                  <div className="w-full h-px bg-[var(--color-primary-500)] mb-4 sm:mb-5 lg:mb-7" aria-hidden="true" />
                  <div className="flex items-center gap-6 sm:gap-9 lg:gap-11 flex-wrap">
                    <div className="h-[36px] lg:h-[40px] flex items-center justify-center">
                      <img
                        src="/MCI-logo.svg"
                        alt="همراه اول (تحقیق و نوآوری)"
                        className="h-full w-auto object-contain select-none"
                        loading="eager"
                      />
                    </div>
                    <div className="h-[30px] lg:h-[34px] flex items-center justify-center">
                      <img
                        src="/KNDIN-logo.svg"
                        alt="دانشگاه صنعتی خواجه‌نصیرالدین طوسی"
                        className="h-full w-auto object-contain select-none"
                        loading="eager"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ستون صحنه سه‌بعدی هیرو — در موبایل زیر متن (order-2) و در دسکتاپ چپ (order-2) */}
            <div
              className="lg:col-span-6 lg:col-start-7 scene-3d relative h-[420px] xs:h-[460px] sm:h-[540px] lg:h-[600px] w-full flex items-center justify-center max-sm:order-2 sm:order-1 lg:order-2"
              style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
            >
              {/* استیج سه‌بعدی متمرکز */}
              <div
                className="relative w-[340px] h-full flex items-center justify-center pointer-events-auto"
                style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
              >
                {/* ۹ برگه کاتالوگ با خط‌تراشی ۲بعدی صنعتی و سایه بدون بلور تیز */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                  style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
                >
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="paper-element absolute w-[74px] h-[102px] sm:w-[96px] sm:h-[132px] bg-white border border-[var(--color-primary-400)]/30 flex flex-col p-2 sm:p-2.5 overflow-hidden rounded-none"
                      style={{
                        transformStyle: 'preserve-3d',
                        WebkitTransformStyle: 'preserve-3d',
                        willChange: 'transform, opacity',
                        boxShadow: '5px 5px 0px var(--color-primary-950, #040629)',
                      }}
                    >
                      <div className="absolute top-0 right-0 w-[3px] sm:w-[4px] h-full bg-[var(--color-primary-600)]" />
                      <div className="w-full h-1/2 bg-gray-100 mb-1.5 sm:mb-2 border border-gray-200 flex items-center justify-center overflow-hidden">
                        <PaperFigure kind={i % 4} />
                      </div>
                      <div className="w-3/4 h-1 sm:h-1.5 bg-gray-300 mb-1" />
                      <div className="w-1/2 h-1 sm:h-1.5 bg-gray-200" />
                    </div>
                  ))}
                </div>

                {/* باکس سفید لوگوی رُخ‌نما با سایه ۶ پیکسلی تیز + خط اسکن تخت کهربایی */}
                <div
                  className="logo-mark absolute z-20 w-[96px] h-[96px] sm:w-[112px] sm:h-[112px] bg-white border border-white/30 flex items-center justify-center rounded-none"
                  style={{
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                    willChange: 'transform, opacity',
                    boxShadow: '6px 6px 0px var(--color-primary-950, #040629)',
                  }}
                >
                  <Logo iconOnly={true} variant="hero" className="w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] relative z-10" />
                  <div className="scan-line absolute -left-[4px] w-[calc(100%+8px)] h-[4px] bg-[var(--color-secondary-400)] z-30 pointer-events-none" />
                </div>

                {/* موکاپ وکتور گوشی موبایل (1 3 [Vectorized].svg) */}
                <div
                  className="realistic-device absolute z-40 w-[240px] xs:w-[260px] sm:w-[300px] lg:w-[320px] aspect-[463/977] select-none"
                  style={{
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d',
                    willChange: 'transform, opacity',
                    filter: 'drop-shadow(0 25px 45px rgba(4, 6, 41, 0.65))',
                  }}
                >
                  {/* لایه اسکرین گوشی — تعبیه‌شده دقیقاً در برش شفاف وکتور SVG */}
                  <div
                    className="absolute z-10 overflow-hidden bg-white"
                    style={{
                      left: '1.94%',
                      top: '8.91%',
                      width: '95.90%',
                      height: '90.07%',
                      borderBottomLeftRadius: '16.4%',
                      borderBottomRightRadius: '16.4%',
                    }}
                  >
                    {/* دسکتاپ و لپ‌تاپ: کاتالوگ زنده دلبند بدون نوار اضافه، تعامل کامل با ماوس */}
                    <div className="hidden sm:block w-full h-full relative">
                      <iframe
                        src="https://catalog.delbandcare.com"
                        title="کاتالوگ دیجیتال سلامت دلبند"
                        className="w-full h-full border-0 bg-white pointer-events-auto"
                        loading="eager"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      />
                    </div>

                    {/* موبایل: اسکرین قبلی رُخ‌نما (پمپ هیدرولیک) بدون آی‌فریم برای اسکرول لمسی بی‌نقص */}
                    <div
                      className="sm:hidden w-full h-full flex flex-col bg-[var(--bg-neutral-base)] text-[var(--text-neutral-strong)] overflow-hidden"
                      dir="rtl"
                    >
                      {/* استیج ۳۶۰ درجه تصویر محصول */}
                      <div className="relative h-[43%] w-full bg-white flex items-center justify-center p-2 border-b border-[var(--border-neutral-subtle)] shrink-0">
                        <div className="relative w-24 h-24 flex items-center justify-center">
                          <svg
                            viewBox="0 0 100 100"
                            className="w-full h-full text-[var(--color-primary-600)] drop-shadow-sm"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <rect x="20" y="35" width="55" height="35" rx="2" fill="white" strokeWidth="2" />
                            <circle cx="47" cy="52" r="12" strokeDasharray="4 2" />
                            <path d="M75 45h12v15H75" />
                            <path d="M30 35V22h12v13" />
                            <path d="M12 52h8" />
                            <path d="M47 40v24M35 52h24" strokeWidth="1.5" strokeOpacity="0.4" />
                          </svg>
                          <div className="absolute top-0 right-0 bg-[var(--color-primary-600)] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-none flex items-center gap-1 shadow-sm">
                            <span>۳۶۰°</span>
                          </div>
                        </div>
                      </div>

                      {/* مشخصات، قیمت و دکمه سفارش */}
                      <div className="flex-1 p-2.5 flex flex-col justify-between overflow-hidden">
                        <div>
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[8.5px] text-[var(--text-neutral-subtle)] font-bold">کد: PX-3000</span>
                            <span className="text-[8.5px] text-[var(--color-secondary-600)] font-bold">موجودی: انبار مرکزی</span>
                          </div>
                          <h2 className="text-[11px] font-black text-[var(--text-neutral-strong)] leading-snug">پمپ هیدرولیک فشار قوی</h2>
                          <div className="text-xs font-black text-[var(--color-primary-600)] mt-0.5">
                            ۲۴,۰۰۰,۰۰۰ <span className="text-[9px] font-normal">تومان</span>
                          </div>

                          {/* جدول مشخصات فنی */}
                          <div className="mt-1.5 border border-[var(--border-neutral-subtle)] divide-y divide-[var(--border-neutral-subtle)] bg-white text-[9px]">
                            <div className="flex justify-between px-2 py-0.5">
                              <span className="text-[var(--text-neutral-subtle)]">فشار کاری</span>
                              <span className="font-bold text-[var(--text-neutral-strong)]">۴۰۰ بار</span>
                            </div>
                            <div className="flex justify-between px-2 py-0.5">
                              <span className="text-[var(--text-neutral-subtle)]">دبی خروجی</span>
                              <span className="font-bold text-[var(--text-neutral-strong)]">۱۲۰ لیتر/دقیقه</span>
                            </div>
                          </div>
                        </div>

                        {/* دکمه اقدام */}
                        <div className="pt-1.5">
                          <div className="w-full h-7 bg-[var(--color-primary-600)] text-white text-[9.5px] font-bold flex items-center justify-center gap-1.5 rounded-none shadow-sm">
                            <span>افزودن به برگ سفارش</span>
                            <IconArrowLeft size={12} stroke={2.5} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* فریم وکتور SVG موکاپ روی لایه اسکرین با pointer-events-none */}
                  <img
                    src="/phone-mockup.svg"
                    alt="Phone Mockup"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
