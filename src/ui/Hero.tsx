'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/ui/Button';
import { Logo } from '@/ui/Logo';
import { IconArrowLeft } from '@tabler/icons-react';
import DotsPattern from '@/ui/DotsPattern';

gsap.registerPlugin(ScrollTrigger);

const CATALOG_ITEMS = [
  {
    short: 'پمپ',
    title: 'پمپ هیدرولیک فشار قوی',
    code: 'PX-3000',
    priceValue: 24000000,
    spec: [
      ['فشار کاری', '۴۰۰ بار'],
      ['دبی خروجی', '۱۲۰ لیتر/دقیقه'],
    ] as [string, string][],
  },
  {
    short: 'شیر',
    title: 'شیر برقی صنعتی',
    code: 'SV-210',
    priceValue: 8500000,
    spec: [
      ['قطر اتصال', '۲ اینچ'],
      ['ولتاژ', '۲۲۰ ولت'],
    ] as [string, string][],
  },
  {
    short: 'موتور',
    title: 'موتور گیربکس‌دار',
    code: 'GM-120',
    priceValue: 31200000,
    spec: [
      ['توان', '۲ کیلووات'],
      ['نسبت دور', '۱:۲۰'],
    ] as [string, string][],
  },
  {
    short: 'گیج',
    title: 'گیج فشار دقیق',
    code: 'PG-04',
    priceValue: 3400000,
    spec: [
      ['دامنه سنجش', '۰ تا ۶۰۰ بار'],
      ['دقت اندازه‌گیری', '۰.۵ درصد'],
    ] as [string, string][],
  },
];

/** خط‌تراشی ۲بعدی کالای صنعتی روی برگه: پمپ، شیر، موتور، گیج */
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

const PAPER_CONFIGS = [
  {
    // i = 0: برگه پمپ — در موبایل: چپ بیرونی روی ریل با شیب \ در پایین تصویر زیر گوشی
    cls: 'left-0 bottom-2',
    cardCls: 'rotate-[-16deg]',
  },
  {
    // i = 1: برگه شیر — در موبایل: راست درونی با زاویه عمودی | در پایین تصویر زیر گوشی
    cls: 'right-[28px] bottom-6',
    cardCls: 'rotate-[2deg]',
  },
  {
    // i = 2: برگه موتور — در موبایل: چپ درونی با زاویه عمودی | در پایین تصویر زیر گوشی
    cls: 'left-[28px] bottom-6',
    cardCls: 'rotate-[-2deg]',
  },
  {
    // i = 3: برگه گیج — در موبایل: راست بیرونی روی ریل با شیب / در پایین تصویر زیر گوشی
    cls: 'right-0 bottom-2',
    cardCls: 'rotate-[16deg]',
  },
];

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [showLiveCatalog, setShowLiveCatalog] = useState(false);
  const [catalogLive, setCatalogLive] = useState(false);

  // کلیک روی گوشی، لایهٔ محافظ را برمیدارد تا کاتالوگ کامل با موس کار کند؛
  // بهمحض خروج اشارهگر از گوشی، لایه برمیگردد تا کرسر سفارشی روی کل گوشی کار کند.
  useEffect(() => {
    if (!catalogLive) return;
    const reset = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el?.closest('.realistic-device')) setCatalogLive(false);
    };
    document.addEventListener('mouseover', reset, true);
    return () => document.removeEventListener('mouseover', reset, true);
  }, [catalogLive]);

  // کاتالوگ زندهٔ دلبند فقط در نمای دسکتاپ و تبلت بارگذاری می‌شود (در موبایل هرگز mount نمی‌شود)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    const sync = () => setShowLiveCatalog(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useGSAP(
    () => {
      if (!container.current) return;

      const mm = gsap.matchMedia();

      // انیمیشن منحصراً در دسکتاپ و تبلت (>= 640px) اجرا می‌شود
      mm.add('(min-width: 640px)', () => {
        // ۱. ورود اولیه متن‌های هیرو
        gsap.from('.hero-fade-in-desktop', {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: 'power3.out',
          clearProps: 'all',
        });

        // ۲. تنظیم پرسپکتیو سه‌بعدی
        const sceneEl = container.current?.querySelector('.scene-3d');
        if (sceneEl) {
          gsap.set(sceneEl, {
            perspective: 2000,
            transformStyle: 'preserve-3d',
          });
        }

        // ۳. چیدمان شبکه ۳×۳ برای ۹ کاغذ
        const papers = container.current?.querySelectorAll('.desktop-paper-element');
        if (!papers || papers.length === 0) return;
        const gapX = 114;
        const gapY = 150;
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

        // ۴. انیمیشن لمسی افتادن یکی‌یکی ۹ کاغذ هنگام لود صفحه
        let entranceTween: gsap.core.Tween | null = gsap.fromTo(
          papers,
          {
            opacity: 0,
            scale: 1.25,
            z: 140, // Drops down from air
            rotationX: -18,
            rotationY: (i) => ((i % 3) - 1) * 6,
          },
          {
            opacity: 1,
            scale: 1,
            z: -10,
            rotationX: 0,
            rotationY: 0,
            duration: 0.6,
            stagger: 0.13, // Staggered drop one by one
            ease: 'power2.out',
            delay: 0.2,
          }
        );

        // آماده‌سازی حالت اولیه لوگو، خط اسکن و گوشی
        const logoMark = container.current?.querySelector('.logo-mark');
        const scanLine = container.current?.querySelector('.scan-line');
        const device = container.current?.querySelector('.realistic-device');

        if (logoMark) gsap.set(logoMark, { scale: 0.8, opacity: 0, z: 0 });
        if (scanLine) gsap.set(scanLine, { top: -4, opacity: 0 });
        if (device) {
          gsap.set(device, {
            y: 550,
            z: 80,
            scale: 0.65,
            autoAlpha: 0,
            rotationX: 0,
            transformStyle: 'preserve-3d',
          });
        }

        // ۵. تایم‌لاین انیمیشن هیرو وابسته به اسکرول کاربر (ScrollTrigger scrub)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container.current,
            start: 'top top',
            // درصد نسبت به ارتفاع ویوپورت است؛ ScrollTrigger واحد vh را نمیفهمد و آن را پیکسل میخواند
            end: '+=175%',
            scrub: 0.8,
            invalidateOnRefresh: true,
            // اگر کاربر پیش از پایان انیمیشن لود اسکرول کند، تویین زمانی متوقف و کاغذها
            // روی حالت پایانی خود نشانده میشوند تا بعد از تایملاین اسکرول دوباره ظاهر نشوند
            onUpdate: (self) => {
              // تا وقتی فیدو شدن کاغذها شروع نشده، انیمیشن لود دستنخورده ادامه میدهد؛
              // از آن نقطه به بعد اگر تویین زمانی زنده باشد متوقفش میکنیم تا در تایملاین اسکرول دخالت نکند
              if (!entranceTween || self.progress < 0.2) return;
              entranceTween.kill();
              entranceTween = null;
              gsap.set(papers, {
                opacity: 1,
                scale: 1,
                z: -10,
                rotationX: 0,
                rotationY: 0,
              });
            },
          },
        });

        // مرحله ۱: جمع شدن ۹ برگه روی هم در مرکز
        papers.forEach((paper, i) => {
          const col = (i % 3) - 1;
          const row = Math.floor(i / 3) - 1;
          tl.fromTo(
            paper,
            { x: col * gapX, y: row * gapY, rotationZ: 0 },
            {
              x: (i - 4) * 1.5,
              y: (i - 4) * 1.5,
              rotationZ: (i - 4) * 1.5,
              duration: 1,
              ease: 'power1.inOut',
            },
            0
          );
        });

        // مرحله ۲: محو شدن برگه‌ها و بالا آمدن باکس لوگو در مرکز
        tl.fromTo(
          papers,
          { opacity: 1, scale: 1 },
          {
            opacity: 0,
            scale: 0.88,
            duration: 0.6,
            ease: 'power1.inOut',
            immediateRender: false,
          },
          '>-0.2'
        );

        if (logoMark) {
          tl.fromTo(
            logoMark,
            { scale: 0.8, opacity: 0, z: 0 },
            { scale: 1, opacity: 1, z: 30, duration: 0.8, ease: 'power2.out' },
            '<'
          );
        }

        // مرحله ۳: حرکت خط اسکن تخت کهربایی روی باکس سفید لوگو
        if (scanLine) {
          tl.fromTo(scanLine, { opacity: 0 }, { opacity: 1, duration: 0.1 }, '+=0.1');
          tl.fromTo(
            scanLine,
            { top: -4 },
            { top: 116, duration: 0.9, ease: 'power1.inOut' },
            '<'
          );
          tl.fromTo(
            scanLine,
            { opacity: 1 },
            { opacity: 0, duration: 0.1, immediateRender: false },
            '>-0.1'
          );
        }

        // مرحله ۴: محو شدن لوگو و بالا آمدن گوشی ۳ بعدی با کاتالوگ دلبند
        if (logoMark) {
          tl.fromTo(
            logoMark,
            { opacity: 1, scale: 1 },
            {
              opacity: 0,
              scale: 0.92,
              duration: 0.5,
              ease: 'power1.inOut',
              immediateRender: false,
            },
            '+=0.1'
          );
        }

        if (device) {
          tl.fromTo(
            device,
            { y: 550, z: 80, scale: 0.65, autoAlpha: 0, rotationX: 0 },
            {
              y: 0,
              z: 80,
              scale: 1,
              autoAlpha: 1,
              rotationX: 0,
              duration: 1.1,
              ease: 'power2.out',
            },
            '<'
          );
        }

        return () => {
          tl.kill();
        };
      });

      // انیمیشن موبایل (< 640px): ورود آرام گوشی از پایین به بالا، و سپس بیرون زدن ۴ برگه از زیر گوشی
      mm.add('(max-width: 639px)', () => {
        const mobileDevice = container.current?.querySelector('.digital-device-mobile');
        const mobilePapers = container.current?.querySelectorAll('.paper-element-mobile');

        if (mobileDevice && mobilePapers && mobilePapers.length > 0) {
          // گوشی آرام از پایین می‌آید بالا
          gsap.fromTo(
            mobileDevice,
            {
              y: 180,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1.0,
              ease: 'power3.out',
              delay: 0.25,
            }
          );

          // سپس کاغذا از پشت گوشی اروم میزنن بیرون به محل‌های اصلی‌شان روی ریل‌ها
          gsap.fromTo(
            mobilePapers,
            {
              scale: 0.2,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.65,
              stagger: 0.09,
              ease: 'back.out(1.4)',
              delay: 0.95,
            }
          );
        }
      });

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
      className="relative max-sm:sticky max-sm:top-0 z-0 w-full bg-[var(--color-primary-600)] sm:h-[400vh] sm:-mb-[100vh] max-sm:h-[100svh]"
    >
      <div ref={stickyRef} className="sm:sticky sm:top-0 z-0 h-screen max-sm:h-[100svh] w-full flex items-center overflow-hidden">
        {/* خطوط عمودی ممتد طرفین هیرو — لایه z-[5] تا در موبایل زیر برگه‌ها (z-10) قرار گیرند */}
        <div className="pointer-events-none absolute inset-0 z-[5] flex justify-center overflow-hidden" aria-hidden="true">
          <div className="relative h-full w-[calc(100%-16px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
            <div className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-primary-500)]" />
            <div className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-primary-500)]" />
          </div>
        </div>

        {/* پترن مستطیل‌های تیز */}
        <DotsPattern />

        <div className="content-col relative z-10 max-sm:!w-[calc(100%-16px)] max-sm:!px-0 grid grid-cols-1 lg:grid-cols-12 gap-x-6 gap-y-2 sm:gap-y-12 items-center pt-24 sm:pt-24 lg:pt-28 pb-0 sm:pb-16 lg:pb-20 max-sm:h-[100svh] max-sm:max-h-[100svh] max-sm:flex max-sm:flex-col max-sm:justify-start">
          {/* ستون متن — در موبایل بالا (order-1)، در تبلت sm:order-2، در دسکتاپ lg:order-1 */}
          <div className="lg:col-span-5 lg:col-start-1 flex flex-col max-sm:order-1 sm:order-2 lg:order-1 pt-3 sm:pt-0 px-[28px] sm:px-0 sm:pr-2 lg:pr-6 xl:pr-10 shrink-0">
            <h1 className="hero-fade-in-desktop text-[28px] xs:text-[30px] sm:text-3xl lg:text-5xl leading-[1.25] sm:leading-[1.3] text-white tracking-tight">
              <span className="font-black">رُخ‌نما، </span>
              <span className="font-bold">
                کاتالوگ‌تان{' '}
                <br className="sm:hidden" />
                <span className="text-[var(--color-secondary-500)]">دیجیتال</span> می‌شود
              </span>
            </h1>

            <p className="hero-fade-in-desktop max-sm:mt-6 sm:mt-8 lg:mt-10 text-sm sm:text-base text-[var(--color-primary-100)] leading-relaxed sm:leading-loose font-medium w-full">
              کاتالوگ محصولاتتان را به یک تجربهٔ دیجیتال برای فروش تبدیل کنید، با قیمت به‌روز، دسترسی متناسب با هر نقش و امکان باز شدن بدون اینترنت
            </p>

            <div className="hero-fade-in-desktop max-sm:mt-7 sm:mt-5 lg:mt-7 w-full pt-1 sm:pt-3">
              {/* نمای موبایل: دکمه با سایز sm */}
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

              {/* نمای دسکتاپ و تبلت: دکمه فول‌عرض lg */}
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

            <div className="hero-fade-in-desktop mt-6 sm:mt-8 lg:mt-12 pt-0 sm:pt-4">
              {/* بخش اعتماد — در موبایل: متن راست‌چین + لوگوهای همراه اول و خواجه‌نصیر */}
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

              {/* نمای دسکتاپ و تبلت: دست‌نخورده طبق استانداردهای پروژه */}
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

          {/* ۱. صحنهٔ موبایل (sm:hidden) — موکاپ وکتور SVG با اسکرین کاتالوگ رُخنما و باکس وضعیت */}
          <div
            className="sm:hidden relative flex-1 min-h-0 h-full w-full order-2 mt-10 overflow-visible"
            style={{ perspective: '1200px' }}
          >
            {/* ۴ برگه کاغذ موبایل با چیدمان دقیق فعلی بدون تغییر */}
            {CATALOG_ITEMS.map((it, i) => {
              const conf = PAPER_CONFIGS[i];
              return (
                <div
                  key={it.code}
                  className={`paper-element-mobile absolute z-10 pointer-events-none ${conf.cls}`}
                  style={{
                    transformStyle: 'preserve-3d',
                    opacity: 0,
                  }}
                >
                  <div
                    className={`relative w-[62px] h-[86px] bg-white border border-[var(--color-primary-400)]/30 flex flex-col items-center justify-center overflow-hidden rounded-none shadow-[4px_4px_0_var(--color-primary-950)] ${conf.cardCls}`}
                  >
                    <div className="absolute top-0 right-0 w-[3px] h-full bg-[var(--color-primary-600)]" />
                    <div className="paper-content absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-1.5">
                      <PaperFigure kind={i} />
                      <div className="w-full" style={{ direction: 'rtl' }}>
                        <div className="w-3/4 h-1 bg-gray-300 mb-0.5" />
                        <div className="w-1/2 h-1 bg-gray-200" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* دستگاه دیجیتال در موبایل — با فریم SVG وکتور و اسکرین کاتالوگ رُخنما */}
            <div
              className="digital-device-mobile absolute z-30 left-1/2 top-1 -translate-x-1/2 origin-top w-[250px] xs:w-[265px] aspect-[463/977] select-none"
              style={{
                filter: 'drop-shadow(0 16px 28px rgba(4, 6, 41, 0.45))',
                opacity: 0,
              }}
            >
              {/* اسکرین دقیقاً در محدودهٔ برش شفاف وکتور SVG */}
              <div
                className="absolute z-30 overflow-hidden bg-[var(--bg-neutral-base)] flex flex-col"
                style={{
                  left: '1.94%',
                  top: '8.91%',
                  width: '95.90%',
                  height: '90.07%',
                  borderBottomLeftRadius: '16.4% 8.3%',
                  borderBottomRightRadius: '16.4% 8.3%',
                }}
              >
                <div className="w-full h-full bg-[var(--bg-neutral-base)] flex flex-col justify-between p-3 overflow-hidden text-right select-none" dir="rtl">
                  {/* هدر کاتالوگ با لوگوی رسمی */}
                  <div className="flex justify-between items-center border-b border-[var(--border-neutral-subtle)] pb-1.5 shrink-0">
                    <span className="font-black text-xs text-[var(--text-neutral-strong)]">تجهیزات صنعتی</span>
                    <Logo iconOnly={true} variant="colored" className="w-4 h-4" />
                  </div>

                  {/* کارت محصول با نشانگر ۳۶۰ درجه و هات‌اسپات */}
                  <div className="w-full h-[110px] xs:h-[120px] bg-white border border-[var(--border-neutral-subtle)] flex items-center justify-center relative shadow-sm rounded-none shrink-0 my-1">
                    <div className="w-16 h-16 border border-[var(--color-primary-600)] flex items-center justify-center opacity-30">
                      <span className="text-[var(--color-primary-600)] text-[11px] font-bold">۳۶۰°</span>
                    </div>
                    <div className="absolute top-2 right-2 w-3.5 h-3.5 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[var(--color-primary-500)] rounded-full animate-ping opacity-40" />
                      <div className="w-1.5 h-1.5 bg-[var(--color-primary-600)] rounded-full border border-white" />
                    </div>
                  </div>

                  {/* مشخصات کالا */}
                  <div className="flex flex-col gap-0.5 shrink-0">
                    <span className="text-[8px] text-[var(--text-neutral-subtle)] font-bold">کد: PX-3000</span>
                    <h3 className="text-xs font-black text-[var(--text-neutral-strong)] leading-tight">پمپ هیدرولیک فشار قوی</h3>
                    <div className="text-xs font-black text-[var(--color-primary-600)]">
                      ۲۴,۰۰۰,۰۰۰ <span className="text-[9px] font-medium text-[var(--text-neutral-subtle)]">تومان</span>
                    </div>
                  </div>

                  {/* جدول مشخصات فنی */}
                  <div className="bg-neutral-50 border border-[var(--border-neutral-subtle)] p-1.5 flex flex-col gap-1 rounded-none text-[9px] shrink-0 my-1">
                    <div className="flex justify-between border-b border-neutral-200/60 pb-0.5">
                      <span className="text-[var(--text-neutral-subtle)]">فشار کاری</span>
                      <span className="font-bold text-[var(--text-neutral-strong)]">۴۰۰ بار</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-neutral-subtle)]">دبی خروجی</span>
                      <span className="font-bold text-[var(--text-neutral-strong)]">۱۲۰ لیتر/دقیقه</span>
                    </div>
                  </div>

                  {/* باکس وضعیت کاتالوگ */}
                  <div className="shrink-0 border border-[var(--border-neutral-subtle)] bg-white px-2 py-1.5 flex items-center justify-between text-[9px]">
                    <span className="flex items-center gap-1.5 font-bold text-[var(--text-neutral-strong)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      دسترسی آفلاین فعال
                    </span>
                    <span className="text-[var(--color-primary-600)] font-bold">سفارش آنلاین ←</span>
                  </div>

                  {/* دکمه اقدام سفارش */}
                  <div className="shrink-0 mt-1.5">
                    <div className="w-full h-7 bg-[var(--color-primary-600)] text-white text-[10px] font-bold flex items-center justify-center gap-1.5 shadow-sm rounded-none">
                      <span>افزودن به برگ سفارش</span>
                      <IconArrowLeft size={13} />
                    </div>
                  </div>
                </div>
              </div>

              {/* فریم وکتور گوشی */}
              <img
                src="/phone-mockup.svg"
                alt="Phone Mockup"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
                loading="eager"
              />
            </div>
          </div>

          {/* ۲. صحنهٔ دسکتاپ (hidden sm:flex) — انیمیشن کامل ۹ کاغذ، تجمع، خط اسکن، لوگو و ظهور گوشی سه‌بعدی */}
          <div className="hidden sm:flex lg:col-span-7 lg:col-start-6 items-center justify-center relative w-full h-[520px] lg:h-[620px] sm:order-1 lg:order-2">
            <div
              className="scene-3d relative w-full h-full flex items-center justify-center"
              style={{
                perspective: 2000,
                WebkitPerspective: 2000,
                transformStyle: 'preserve-3d',
                WebkitTransformStyle: 'preserve-3d',
              }}
            >
              {/* ۹ کاغذ کاتالوگ با سایه صفر بلور تیره که یکی یکی لود می‌شوند */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
              >
                {[...Array(9)].map((_, i) => (
                  <div
                    key={i}
                    className="desktop-paper-element absolute w-[96px] h-[132px] bg-white border border-[var(--color-primary-400)]/30 flex flex-col p-2.5 overflow-hidden rounded-none"
                    style={{
                      transformStyle: 'preserve-3d',
                      WebkitTransformStyle: 'preserve-3d',
                      willChange: 'transform, opacity',
                      boxShadow: '6px 6px 0px var(--color-primary-950, #040629)',
                      // در اولین رنگآمیزی صفحه پنهان است تا پیش از شروع انیمیشن لود، گرید کاغذها فلش نزند
                      opacity: 0,
                    }}
                  >
                    <div className="absolute top-0 right-0 w-[4px] h-full bg-[var(--color-primary-600)]" />
                    <div className="w-full h-1/2 bg-gray-100 mb-2 border border-gray-200 flex items-center justify-center">
                      <PaperFigure kind={i % 4} />
                    </div>
                    <div className="w-3/4 h-1.5 bg-gray-300 mb-1" />
                    <div className="w-1/2 h-1.5 bg-gray-200" />
                  </div>
                ))}
              </div>

              {/* نشان مرکزی: باکس سفید ۱۱۲ پیکسلی + سایه ۶ پیکسلی تیز + لوگوی رسمی رُخ‌نما + خط اسکن تخت کهربایی */}
              <div
                className="logo-mark absolute z-20 w-[112px] h-[112px] bg-white border border-white/30 flex items-center justify-center rounded-none"
                style={{
                  transformStyle: 'preserve-3d',
                  WebkitTransformStyle: 'preserve-3d',
                  boxShadow: '6px 6px 0px var(--color-primary-950, #040629)',
                  opacity: 0,
                }}
              >
                <Logo iconOnly={true} variant="hero" className="w-[52px] h-[52px] relative z-10" />
                <div className="scan-line absolute -left-[6px] w-[124px] h-[4px] bg-[var(--color-secondary-400)] z-30 pointer-events-none shadow-none opacity-0" />
              </div>

              {/* موکاپ وکتور گوشی — اسکرین با کاتالوگ زندهٔ دلبند، تعامل کامل با ماوس */}
              <div
                className="realistic-device absolute z-30 w-[280px] lg:w-[300px] aspect-[463/977] select-none"
                style={{
                  transformStyle: 'preserve-3d',
                  WebkitTransformStyle: 'preserve-3d',
                  willChange: 'transform, opacity',
                  filter: 'drop-shadow(0 24px 44px rgba(4, 6, 41, 0.6))',
                  opacity: 0,
                }}
              >
                <div
                  className="absolute z-30 overflow-hidden bg-white"
                  style={{
                    left: '1.94%',
                    top: '8.91%',
                    width: '95.90%',
                    height: '90.07%',
                    borderBottomLeftRadius: '16.4% 8.3%',
                    borderBottomRightRadius: '16.4% 8.3%',
                  }}
                >
                  {showLiveCatalog && (
                    <iframe
                      src="https://catalog.delbandcare.com"
                      title="کاتالوگ دیجیتال سلامت دلبند"
                      className="w-full h-full border-0 bg-white"
                      loading="eager"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  )}
                  {/* لایهٔ محافظ: کرسر سفارشی و اسکرول صفحه روی کل گوشی کار میکند */}
                  <div
                    className="absolute inset-0 z-40"
                    onPointerDown={() => setCatalogLive(true)}
                    style={{ pointerEvents: catalogLive ? 'none' : 'auto' }}
                  />
                </div>

                <img
                  src="/phone-mockup.svg"
                  alt="Phone Mockup"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}