'use client';

import { useRef } from 'react';
import {
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconArrowLeft,
  IconSparkles,
  IconFileTextFilled,
  IconWorldFilled,
} from '@tabler/icons-react';
import { Button } from '@/ui/Button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ComparisonCriterion {
  id: string;
  title: string;
  category: string;
  paper: {
    badge: string;
    desc: string;
  };
  foreign: {
    badge: string;
    desc: string;
  };
  rok: {
    badge: string;
    desc: string;
  };
}

const COMPARISON_CRITERIA: ComparisonCriterion[] = [
  {
    id: '01',
    category: 'پایگاه داده و انبار',
    title: 'به‌روزرسانی قیمت و مشخصات',
    paper: {
      badge: 'غیرممکن',
      desc: 'هر تغییر قیمت نیاز به انتشار دوباره دارد',
    },
    foreign: {
      badge: 'دستی',
      desc: 'جدا از انبار و نرم‌افزار مالی',
    },
    rok: {
      badge: 'همگام با انبار',
      desc: 'اطلاعات محصول از انبار به‌روز می‌شود',
    },
  },
  {
    id: '02',
    category: 'فروش و بازاریابی',
    title: 'جذب سرنخ و اتصال به CRM',
    paper: {
      badge: 'بدون ثبت سرنخ',
      desc: 'امکان ثبت و پیگیری خریدار ندارد',
    },
    foreign: {
      badge: 'اتصال محدود',
      desc: 'هزینهٔ ارزی و ناسازگار با CRM بومی',
    },
    rok: {
      badge: 'فرم پیامکی و CRM',
      desc: 'خریدار ثبت و به تیم فروش هدایت می‌شود',
    },
  },
  {
    id: '03',
    category: 'تحلیل داده و هوش تجاری',
    title: 'تحلیل رفتار و گزارش فروش',
    paper: {
      badge: 'بدون داده',
      desc: 'تعامل خریدار با کاتالوگ ثبت نمی‌شود',
    },
    foreign: {
      badge: 'آمار سطحی',
      desc: 'رفتار محصولات تفکیک نمی‌شود',
    },
    rok: {
      badge: 'تحلیل رفتار محصول',
      desc: 'تعامل و مدت مکث روی محصول ثبت می‌شود',
    },
  },
  {
    id: '04',
    category: 'فرایند رسمی B2B',
    title: 'ثبت سفارش و استعلام رسمی',
    paper: {
      badge: 'ثبت دستی',
      desc: 'پیام‌های پراکنده و خطای انتقال کد',
    },
    foreign: {
      badge: 'روال غیربومی',
      desc: 'بدون ساختار رسمی سفارش شرکت',
    },
    rok: {
      badge: 'برگ سفارش A4',
      desc: 'انتخاب خریدار به پیش‌فاکتور تبدیل می‌شود',
    },
  },
];

/* طول تقریبی مسیر آیکون تیک برای انیمیشن ترسیم SVG */
const CHECK_PATH_LEN = 24;

export default function CompareSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameFillRightRef = useRef<HTMLDivElement>(null);
  const frameFillLeftRef = useRef<HTMLDivElement>(null);
  const rokOuterColRef = useRef<HTMLDivElement>(null);
  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || window.innerWidth < 1024) return;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      if (rokOuterColRef.current) {
        xTo.current = gsap.quickTo(rokOuterColRef.current, 'x', { duration: 0.45, ease: 'power2.out' });
        yTo.current = gsap.quickTo(rokOuterColRef.current, 'y', { duration: 0.45, ease: 'power2.out' });
      }

      /* حساسیت حرکت ستون رُخ‌نما نسبت به کل ویوپورت */
      const handleViewportMouseMove = (e: MouseEvent) => {
        const normX = Math.max(-1, Math.min(1, (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)));
        const normY = Math.max(-1, Math.min(1, (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)));

        xTo.current?.(-normX * 8);
        yTo.current?.(-normY * 8);
      };

      window.addEventListener('mousemove', handleViewportMouseMove, { passive: true });

      const root = sectionRef.current;
      const cells = Array.from(root.querySelectorAll<HTMLElement>('.compare-row-item')).sort(
        (a, b) => Number(a.dataset.row) - Number(b.dataset.row)
      );
      const rokCol = root.querySelector<HTMLElement>('.rok-col-inner');
      const ctaWrap = root.querySelector<HTMLElement>('.compare-cta');
      const checkPaths = Array.from(root.querySelectorAll<SVGPathElement>('.rok-check path'));

      /* وضعیت اولیه: تیک‌ها پنهان (آماده ترسیم)، دکمه پنهان */
      if (checkPaths.length) {
        gsap.set(checkPaths, {
          strokeDasharray: CHECK_PATH_LEN,
          strokeDashoffset: CHECK_PATH_LEN,
        });
      }
      if (ctaWrap) gsap.set(ctaWrap, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 90%',
          once: true,
        },
      });

      /* سلول‌های سه ستون اول با استاگر سریع ظاهر می‌شوند */
      tl.from(cells, {
        opacity: 0,
        y: 12,
        duration: 0.35,
        stagger: 0.03,
        ease: 'power2.out',
        clearProps: 'all',
      }, 0);

      /* ۱. ورود ستون رُخ‌نما */
      if (rokCol) {
        tl.fromTo(
          rokCol,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', clearProps: 'all' },
          0.1
        );
      }

      /* ۲. ترسیم تیک‌ها */
      if (checkPaths.length) {
        tl.to(
          checkPaths,
          {
            strokeDashoffset: 0,
            duration: 0.35,
            ease: 'power2.out',
            stagger: 0.08,
          },
          0.25
        );
      }

      /* ۳. دکمه «دریافت مشاوره» همگام با بخش */
      if (ctaWrap) {
        tl.to(
          ctaWrap,
          { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out', clearProps: 'all' },
          0.35
        );
      }

      /* ۴. خطوط عمودی پیشرونده طرفین همگام با اسکرول */
      const fillTargets = [frameFillRightRef.current, frameFillLeftRef.current].filter(
        Boolean
      ) as HTMLDivElement[];

      if (fillTargets.length) {
        gsap.fromTo(
          fillTargets,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      return () => {
        window.removeEventListener('mousemove', handleViewportMouseMove);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      id="compare"
      className="hidden lg:block relative z-10 w-full py-26 bg-white text-[var(--text-neutral-strong)] font-sans overflow-hidden tracking-[-0.02em] border-t border-[var(--color-neutral-200)]"
    >
      {/* افکت گلو محیطی بیضی‌شکل با عرض ۱۴۰٪ طولی و ارتفاع ۶۰٪ در لایه زیرین (z-0) بدون اورفلو */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 w-[140%] h-[60%] z-0"
        style={{
          background: 'radial-gradient(ellipse 85% 100% at 50% 100%, color-mix(in srgb, var(--color-primary-100) 50%, transparent), transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* خطوط عمودی ممتد طرفین در کانتینر ۱۴۷۲px با رنگ اختصاصی neutral-200 و پرشونده با primary-600 */}
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

      <div className="content-col relative z-10">
        {/* هدر بخش: استقرار در ۶ ستون مرکزی گرید ۱۲ ستونه */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 mb-20 px-6 sm:px-0">
          <div className="lg:col-span-6 lg:col-start-4 sm:px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--text-neutral-strong)] leading-[1.3] tracking-[-0.02em]">
              چرا <span className="font-black">رُخ‌نما</span> متفاوت است؟
            </h2>
            <p className="mt-6 text-base lg:text-lg text-[var(--text-neutral-base)] leading-relaxed font-medium tracking-[-0.02em]">
              مقایسهٔ سه شیوهٔ ارائهٔ کاتالوگ بر اساس چهار معیار مهم فروش و انبارداری
            </p>
          </div>
        </div>

        {/* ── ماتریس ۴ ستونه مقایسه ── */}
        <div className="relative w-full overflow-x-visible">
          <div className="w-full">
            {/* ساختار گرید ۴ ستونه: ستون‌های ۱ تا ۳ بدون سلول خالی، ستون ۴ به صورت عمودی مرکز شده تا به نسبت مساوی از بالا و پایین بیرون بزند */}
            <div className="grid grid-cols-[280px_1fr_1fr_1.06fr] items-start gap-0">

              {/* ستون ۱: شاخص ارزیابی */}
              <div className="flex flex-col">
                <div className="h-[104px] pt-0 pr-6 sm:pr-7 pl-18 sm:pl-20 pb-5 sm:pb-6 bg-[var(--color-neutral-100)] border-t border-r border-b border-l border-[var(--color-neutral-200)] flex flex-col justify-end">
                  <span className="text-xs font-bold text-[var(--color-neutral-600)] mb-1 block">
                    شاخص ارزیابی
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-[var(--text-neutral-strong)] block">
                    ۴ ملاک کلیدی
                  </span>
                </div>
                {COMPARISON_CRITERIA.map((criterion, idx) => (
                  <div
                    key={criterion.id}
                    data-row={idx}
                    className="compare-row-item h-[108px] pr-6 sm:pr-7 pl-18 sm:pl-20 bg-white border-r border-b border-l border-[var(--color-neutral-200)] flex flex-col justify-center"
                  >
                    <span className="text-sm font-medium text-[var(--color-neutral-500)] mb-[14px] block whitespace-nowrap">
                      {criterion.category}
                    </span>
                    <span className="text-sm lg:text-base font-bold text-[var(--text-neutral-strong)] leading-snug block whitespace-nowrap">
                      {criterion.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* ستون ۲: کاتالوگ چاپی و PDF */}
              <div className="flex flex-col">
                <div className="h-[104px] pt-0 px-6 sm:px-7 pb-5 sm:pb-6 bg-[var(--color-neutral-100)] border-t border-b border-l border-[var(--color-neutral-200)] flex flex-col justify-end">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <IconFileTextFilled size={18} className="text-[var(--color-neutral-400)] shrink-0" />
                    <span className="text-xs font-bold text-[var(--color-neutral-600)]">
                      شیوهٔ سنتی
                    </span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-[var(--text-neutral-strong)] block">
                    کاتالوگ چاپی و PDF
                  </span>
                </div>
                {COMPARISON_CRITERIA.map((criterion, idx) => (
                  <div
                    key={criterion.id}
                    data-row={idx}
                    className="compare-row-item h-[108px] px-6 sm:px-7 bg-white border-b border-l border-[var(--color-neutral-200)] flex flex-col justify-center"
                  >
                    <div className="flex items-center gap-1.5 text-sm text-[var(--color-error-600)] font-bold mb-[14px]">
                      <IconX size={16} stroke={2.5} className="shrink-0" />
                      <span>{criterion.paper.badge}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--text-neutral-base)] leading-normal font-normal whitespace-nowrap truncate" title={criterion.paper.desc}>
                      {criterion.paper.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* ستون ۳: سرویس‌های آنلاین */}
              <div className="flex flex-col">
                <div className="h-[104px] pt-0 px-6 sm:px-7 pb-5 sm:pb-6 bg-[var(--color-neutral-100)] border-t border-b border-l border-[var(--color-neutral-200)] flex flex-col justify-end">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <IconWorldFilled size={18} className="text-[var(--color-neutral-400)] shrink-0" />
                    <span className="text-xs font-bold text-[var(--color-neutral-600)]">
                      سرویس‌های آنلاین
                    </span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-[var(--text-neutral-strong)] block">
                    اشتراک دلاری خارجی
                  </span>
                </div>
                {COMPARISON_CRITERIA.map((criterion, idx) => (
                  <div
                    key={criterion.id}
                    data-row={idx}
                    className="compare-row-item h-[108px] px-6 sm:px-7 bg-white border-b border-l border-[var(--color-neutral-200)] flex flex-col justify-center"
                  >
                    <div className="flex items-center gap-1.5 text-sm text-[var(--color-warning-700)] font-bold mb-[14px]">
                      <IconAlertTriangle size={16} stroke={2.5} className="shrink-0" />
                      <span>{criterion.foreign.badge}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--text-neutral-base)] leading-normal font-normal whitespace-nowrap truncate" title={criterion.foreign.desc}>
                      {criterion.foreign.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* ستون ۴: کاتالوگ تعاملی رُخ‌نما — لایهٔ بیرونی پارالاکس خلاف جهت ماوس با quickTo، لایهٔ داخلی ورود سینمایی */}
              <div
                ref={rokOuterColRef}
                className="z-20 -mt-[38px] -mb-[38px] will-change-transform"
              >
                <div className="rok-col-inner flex flex-col bg-gradient-to-b from-[var(--color-primary-100)] via-white via-50% to-white shadow-[0_0_0_2.5px_var(--color-primary-600)]">
                {/* هدر ستون ۴ */}
                <div className="h-[104px] pt-0 px-6 sm:px-7 pb-5 sm:pb-6 bg-transparent border-b border-[var(--color-neutral-200)] flex flex-col justify-end">
                  <div className="inline-flex items-center gap-1.5 text-xs text-[var(--color-primary-800)] font-black mb-1.5">
                    <IconSparkles size={20} fill="currentColor" stroke={1.5} className="text-[var(--color-secondary-500)] shrink-0" />
                    <span className="text-xs font-bold text-[var(--color-primary-700)]">راهکارهای B2B رُخ‌نما</span>
                  </div>
                  <span className="text-lg sm:text-xl font-bold text-[var(--color-primary-900)] block">
                    کاتالوگ تعاملی رُخ‌نما
                  </span>
                </div>

                {/* سطرهای ستون ۴ */}
                {COMPARISON_CRITERIA.map((criterion, idx) => (
                  <div
                    key={criterion.id}
                    data-row={idx}
                    className="h-[108px] px-6 sm:px-7 bg-transparent border-b border-[var(--color-neutral-200)] flex flex-col justify-center"
                  >
                    <div className="flex items-center gap-1.5 text-sm text-[var(--color-success-600)] font-bold mb-[14px]">
                      <span className="rok-check inline-flex shrink-0">
                        <IconCheck size={17} stroke={3} className="text-[var(--color-success-600)]" />
                      </span>
                      <span>{criterion.rok.badge}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--color-primary-950)] leading-normal font-bold whitespace-nowrap truncate" title={criterion.rok.desc}>
                      {criterion.rok.desc}
                    </p>
                  </div>
                ))}

                {/* سلول اختصاصی دکمهٔ دریافت مشاوره — بعد از ترسیم تیک‌ها ظاهر می‌شود */}
                <div className="compare-cta h-[100px] px-6 sm:px-7 pb-8 sm:pb-9 pt-8 sm:pt-9 flex items-center justify-center bg-transparent">
                  <Button
                    color="secondary"
                    variant="solid"
                    size="md"
                    fullWidth
                    iconAfter={<IconArrowLeft size={20} stroke={2.5} />}
                    className="text-[var(--text-neutral-strong)] font-bold"
                    onClick={() => {
                      const el = document.getElementById('demo') || document.getElementById('demo-request');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span>دریافت مشاوره</span>
                  </Button>
                </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
