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
      desc: 'نیازمند تجدید چاپ با هر تغییر قیمت',
    },
    foreign: {
      badge: 'دستی',
      desc: 'نامتصل به انبار و نرم‌افزار مالی',
    },
    rok: {
      badge: 'همگام با انبار',
      desc: 'اتصال مستقیم به انبار و انتشار یک‌کلیکی',
    },
  },
  {
    id: '02',
    category: 'فروش و بازاریابی',
    title: 'جذب سرنخ و اتصال به CRM',
    paper: {
      badge: 'صفر',
      desc: 'فاقد فرم ثبت و رهگیری خریدار',
    },
    foreign: {
      badge: 'درگاه دلاری',
      desc: 'هزینه ارزی و ناسازگار با CRM بومی',
    },
    rok: {
      badge: 'فرم پیامکی + CRM',
      desc: 'احراز هویت SMS و هدایت خودکار به خط فروش',
    },
  },
  {
    id: '03',
    category: 'تحلیل داده و هوش تجاری',
    title: 'تحلیل رفتار و گزارش فروش',
    paper: {
      badge: 'تاریکی اطلاعاتی',
      desc: 'بدون ثبت آمار تعامل و مطالعه کاتالوگ',
    },
    foreign: {
      badge: 'آمار سطحی',
      desc: 'فقط آمار کلی بدون تفکیک رفتار کالایی',
    },
    rok: {
      badge: 'پایشگر دقیق توقف',
      desc: 'ثبت مدت مکث روی قطعه و جداول مشخصات',
    },
  },
  {
    id: '04',
    category: 'فرایند رسمی B2B',
    title: 'ثبت سفارش و استعلام رسمی',
    paper: {
      badge: 'یادداشت دستی',
      desc: 'پیام‌های پراکنده و خطای خوانش کد فنی',
    },
    foreign: {
      badge: 'روال غیربومی',
      desc: 'فرایند خرده‌فروشی فاقد سربرگ رسمی شرکتی',
    },
    rok: {
      badge: 'برگ سفارش A4',
      desc: 'صدور فوری پیش‌فاکتور رسمی استاندارد A4',
    },
  },
];

/*
 * CompareSectionV1 — ایده: اجرای دقیق
 * هر سطر با اسکرول به ترتیب ساخته می‌شود، بوردرها «ترسیم» می‌شوند
 * و آیکون‌ها با فنر سر جایشان می‌نشینند.
 */
export default function CompareSectionV1() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // fallback برای prefers-reduced-motion: همه انیمیشن‌ها غیرفعال
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      if (prefersReducedMotion) return;

      const root = sectionRef.current;
      const allCells = Array.from(
        root.querySelectorAll<HTMLElement>('.cv1-cell')
      );
      const allIcons = Array.from(
        root.querySelectorAll<HTMLElement>('.cv1-icon')
      );

      // سطر هدر (ردیف -1) و چهار سطر داده به ترتیب ساخته می‌شوند
      const rowIndices = [-1, ...COMPARISON_CRITERIA.map((_, i) => i)];

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          once: true,
        },
        defaults: { ease: 'power2.out' },
      });

      rowIndices.forEach((rowIdx, order) => {
        const rowCells = allCells.filter(
          (c) => Number(c.dataset.row) === rowIdx
        );
        const rowIcons = allIcons.filter(
          (ic) => Number(ic.dataset.row) === rowIdx
        );

        // stagger بین سطرها: ۰.۰۸ ثانیه
        const t = order * 0.08;

        // انیمیشن ورود هر سطر: opacity از 0 به 1 و y از 20 به 0
        // + ترسیم بوردر هر سلول با scale از 0.98 به 1
        tl.fromTo(
          rowCells,
          { opacity: 0, y: 20, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5 },
          t
        );

        // آیکون‌ها با انیمیشن جداگانه و فنری:
        // scale از 0 به 1 و rotate از -10 به 0 با 0.1 تأخیر بعد از سلول
        if (rowIcons.length) {
          tl.fromTo(
            rowIcons,
            { scale: 0, rotate: -10 },
            {
              scale: 1,
              rotate: 0,
              duration: 0.4,
              ease: 'back.out(2.5)',
            },
            t + 0.1
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      id="compare-v1"
      className="relative z-10 w-full py-20 sm:py-26 bg-[var(--bg-neutral-base)] text-[var(--text-neutral-strong)] font-sans overflow-hidden tracking-[-0.02em] border-t border-[var(--color-neutral-200)]"
    >
      {/* اسکن‌لاین ستون رُخ‌نما + غیرفعال‌سازی در حالت کاهش حرکت */}
      <style>{`
@keyframes cv1-scanline {
  0% {
    top: -64px;
    opacity: 0;
  }
  6% {
    opacity: 1;
  }
  94% {
    opacity: 1;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}
.cv1-scanline {
  position: absolute;
  top: -64px;
  width: 1px;
  height: 64px;
  pointer-events: none;
  animation: cv1-scanline 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
@media (prefers-reduced-motion: reduce) {
  .cv1-scanline {
    animation: none;
    opacity: 0;
  }
}
      `}</style>

      {/* خطوط عمودی ممتد طرفین در کانتینر ۱۴۷۲ پیکسل */}
      <div
        className="pointer-events-none absolute inset-0 z-20 flex justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="relative h-full w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
          <div className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-neutral-200)]" />
          <div className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-neutral-200)]" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* هدر بخش */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-neutral-strong)] leading-[1.3] tracking-[-0.02em]">
            چرا رُخ‌نما متفاوت است؟
          </h2>
          <p className="mt-[18px] text-base sm:text-lg text-[var(--text-neutral-base)] leading-relaxed font-medium tracking-[-0.02em]">
            مقایسهٔ سه شیوهٔ ارائهٔ کاتالوگ و برداشتن ریسک تصمیم‌گیری مدیر با تمرکز بر ۴ ملاک حیاتی فروش و انبارداری.
          </p>
        </div>

        {/* ظرف ماتریس */}
        <div className="relative w-full overflow-x-auto lg:overflow-x-visible">
          <div className="w-full min-w-[800px] lg:min-w-0">
            <div className="grid grid-cols-[280px_1fr_1fr_1.06fr] items-start gap-0">
              {/* ستون ۱: شاخص ارزیابی */}
              <div className="flex flex-col">
                <div
                  data-row={-1}
                  className="cv1-cell h-[104px] pt-0 pr-6 sm:pr-7 pl-18 sm:pl-20 pb-5 sm:pb-6 bg-[var(--color-neutral-100)] border-b border-l border-[var(--color-neutral-200)] flex flex-col justify-end"
                >
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
                    className="cv1-cell h-[108px] pr-6 sm:pr-7 pl-18 sm:pl-20 bg-white border-b border-l border-[var(--color-neutral-200)] flex flex-col justify-center"
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
                <div
                  data-row={-1}
                  className="cv1-cell h-[104px] pt-0 px-6 sm:px-7 pb-5 sm:pb-6 bg-[var(--color-neutral-100)] border-b border-[var(--color-neutral-200)] flex flex-col justify-end"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <IconFileTextFilled
                      size={18}
                      className="text-[var(--color-neutral-400)] shrink-0"
                    />
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
                    className="cv1-cell h-[108px] px-6 sm:px-7 bg-white border-b border-[var(--color-neutral-200)] flex flex-col justify-center"
                  >
                    <div className="flex items-center gap-1.5 text-sm text-[var(--color-error-600)] font-bold mb-[14px]">
                      <span
                        data-row={idx}
                        className="cv1-icon inline-flex shrink-0"
                      >
                        <IconX size={16} stroke={2.5} />
                      </span>
                      <span>{criterion.paper.badge}</span>
                    </div>
                    <p
                      className="text-xs sm:text-sm text-[var(--text-neutral-base)] leading-normal font-normal whitespace-nowrap truncate"
                      title={criterion.paper.desc}
                    >
                      {criterion.paper.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* ستون ۳: سرویس‌های آنلاین */}
              <div className="flex flex-col">
                <div
                  data-row={-1}
                  className="cv1-cell h-[104px] pt-0 px-6 sm:px-7 pb-5 sm:pb-6 bg-[var(--color-neutral-100)] border-b border-[var(--color-neutral-200)] flex flex-col justify-end"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <IconWorldFilled
                      size={18}
                      className="text-[var(--color-neutral-400)] shrink-0"
                    />
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
                    className="cv1-cell h-[108px] px-6 sm:px-7 bg-white border-b border-[var(--color-neutral-200)] flex flex-col justify-center"
                  >
                    <div className="flex items-center gap-1.5 text-sm text-[var(--color-warning-700)] font-bold mb-[14px]">
                      <span
                        data-row={idx}
                        className="cv1-icon inline-flex shrink-0"
                      >
                        <IconAlertTriangle size={16} stroke={2.5} />
                      </span>
                      <span>{criterion.foreign.badge}</span>
                    </div>
                    <p
                      className="text-xs sm:text-sm text-[var(--text-neutral-base)] leading-normal font-normal whitespace-nowrap truncate"
                      title={criterion.foreign.desc}
                    >
                      {criterion.foreign.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* ستون ۴: کاتالوگ تعاملی رُخ‌نما با اسکن‌لاین عمودی */}
              <div className="relative flex flex-col -mt-[38px] -mb-[38px] bg-gradient-to-b from-[var(--color-primary-100)] via-white via-50% to-white z-20 shadow-[0_0_0_2.5px_var(--color-primary-600)] overflow-hidden">
                {/* اسکن‌لاین عمودی باریک که از بالا به پایین حرکت می‌کند */}
                <div
                  className="cv1-scanline right-0 z-30 bg-[var(--color-primary-600)]"
                  aria-hidden="true"
                />

                {/* هدر ستون ۴ */}
                <div
                  data-row={-1}
                  className="cv1-cell h-[104px] pt-0 px-6 sm:px-7 pb-5 sm:pb-6 bg-transparent border-b border-[var(--color-primary-200)] flex flex-col justify-end"
                >
                  <div className="inline-flex items-center gap-1.5 text-xs text-[var(--color-primary-800)] font-black mb-1.5">
                    <IconSparkles
                      size={20}
                      fill="currentColor"
                      stroke={1.5}
                      className="text-[var(--color-secondary-500)] shrink-0"
                    />
                    <span className="text-xs font-bold text-[var(--color-primary-700)]">
                      راهکارهای B2B رُخ‌نما
                    </span>
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
                    className="cv1-cell h-[108px] px-6 sm:px-7 bg-transparent border-b border-[var(--color-primary-200)] flex flex-col justify-center"
                  >
                    <div className="flex items-center gap-1.5 text-sm text-[var(--color-success-600)] font-bold mb-[14px]">
                      <span
                        data-row={idx}
                        className="cv1-icon inline-flex shrink-0 text-[var(--color-success-600)]"
                      >
                        <IconCheck size={17} stroke={3} />
                      </span>
                      <span>{criterion.rok.badge}</span>
                    </div>
                    <p
                      className="text-xs sm:text-sm text-[var(--color-primary-950)] leading-normal font-bold whitespace-nowrap truncate"
                      title={criterion.rok.desc}
                    >
                      {criterion.rok.desc}
                    </p>
                  </div>
                ))}

                {/* سلول اختصاصی دکمهٔ دریافت مشاوره */}
                <div className="h-[100px] px-6 sm:px-7 pb-8 sm:pb-9 pt-8 sm:pt-9 flex items-center justify-center bg-transparent">
                  <Button
                    color="secondary"
                    variant="solid"
                    size="md"
                    fullWidth
                    iconAfter={<IconArrowLeft size={20} stroke={2.5} />}
                    className="text-[var(--text-neutral-strong)] font-bold"
                    onClick={() => {
                      const el =
                        document.getElementById('demo') ||
                        document.getElementById('demo-request');
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
    </section>
  );
}