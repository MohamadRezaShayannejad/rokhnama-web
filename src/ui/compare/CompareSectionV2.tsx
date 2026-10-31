'use client';

import { useState } from 'react';
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

/* ارتفاع هدر ماتریس و هر سطر داده — مبنای محاسبهٔ موقعیت نوار هایلایت */
const HEADER_H = 104;
const ROW_H = 108;

/*
 * CompareSectionV2 — ایده: نورپردازی سطری
 * با هاور روی هر سطر، یک نوار هایلایت بین سطرها حرکت می‌کند و
 * سطرهای دیگر کم‌رنگ می‌شوند تا تمرکز بصری روی سطر فعال بماند.
 */
export default function CompareSectionV2() {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  /* موقعیت عمودی نوار هایلایت بر اساس سطر فعال */
  const highlightY = activeRow === null ? 0 : HEADER_H + activeRow * ROW_H;

  /* کلاس مشترک هر سلول داده: گذار نرم روی شفافیت و پس‌زمینه */
  const cellBase =
    'compare-row-item h-[108px] flex flex-col justify-center transition-[opacity,background-color] duration-300 ease-out';

  /* شدت شفافیت هر سلول بر اساس وضعیت سطر فعال */
  const cellOpacity = (idx: number) =>
    activeRow === null
      ? 'opacity-100'
      : activeRow === idx
        ? 'opacity-100'
        : 'opacity-60';

  /* پس‌زمینهٔ سطر فعال فقط در سه ستون غیر رُخ‌نما */
  const cellActiveBg = (idx: number) =>
    activeRow === idx ? 'bg-[var(--color-primary-50)]' : 'bg-white';

  /* مقیاس و رنگ آیکون وضعیت در سطر فعال */
  const iconWrap = (idx: number) =>
    `inline-flex shrink-0 transition-[transform,color] duration-300 ease-out ${
      activeRow === idx
        ? 'scale-110 text-[var(--color-secondary-500)]'
        : 'scale-100'
    }`;

  return (
    <section
      dir="rtl"
      id="compare-v2"
      className="relative z-10 w-full py-20 sm:py-26 bg-[var(--bg-neutral-base)] text-[var(--text-neutral-strong)] font-sans overflow-hidden tracking-[-0.02em] border-t border-[var(--color-neutral-200)]"
    >
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
            {/* بستری نسبی برای میزبانی نوار هایلایت مطلق */}
            <div className="relative">
              {/* نوار هایلایت سطری: با سطر فعال جابه‌جا می‌شود و پشت سلول‌ها می‌درخشد */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 left-0 z-0 h-[108px] transition-transform duration-300 ease-out"
                style={{ transform: `translateY(${highlightY}px)` }}
              >
                <div
                  className={`h-full w-full transition-opacity duration-300 ease-out bg-[var(--color-primary-50)] border-y border-[var(--color-primary-200)] ${
                    activeRow === null ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              </div>

              <div
                className="relative z-10 grid grid-cols-[280px_1fr_1fr_1.06fr] items-start gap-0"
                onMouseLeave={() => setActiveRow(null)}
              >
                {/* ستون ۱: شاخص ارزیابی */}
                <div className="flex flex-col">
                  <div className="h-[104px] pt-0 pr-6 sm:pr-7 pl-18 sm:pl-20 pb-5 sm:pb-6 bg-[var(--color-neutral-100)] border-b border-l border-[var(--color-neutral-200)] flex flex-col justify-end">
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
                      onMouseEnter={() => setActiveRow(idx)}
                      className={`${cellBase} ${cellOpacity(idx)} ${cellActiveBg(idx)} pr-6 sm:pr-7 pl-18 sm:pl-20 border-b border-l border-[var(--color-neutral-200)]`}
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
                  <div className="h-[104px] pt-0 px-6 sm:px-7 pb-5 sm:pb-6 bg-[var(--color-neutral-100)] border-b border-[var(--color-neutral-200)] flex flex-col justify-end">
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
                      onMouseEnter={() => setActiveRow(idx)}
                      className={`${cellBase} ${cellOpacity(idx)} ${cellActiveBg(idx)} px-6 sm:px-7 border-b border-[var(--color-neutral-200)]`}
                    >
                      <div className="flex items-center gap-1.5 text-sm text-[var(--color-error-600)] font-bold mb-[14px]">
                        <span className={iconWrap(idx)}>
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
                  <div className="h-[104px] pt-0 px-6 sm:px-7 pb-5 sm:pb-6 bg-[var(--color-neutral-100)] border-b border-[var(--color-neutral-200)] flex flex-col justify-end">
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
                      onMouseEnter={() => setActiveRow(idx)}
                      className={`${cellBase} ${cellOpacity(idx)} ${cellActiveBg(idx)} px-6 sm:px-7 border-b border-[var(--color-neutral-200)]`}
                    >
                      <div className="flex items-center gap-1.5 text-sm text-[var(--color-warning-700)] font-bold mb-[14px]">
                        <span className={iconWrap(idx)}>
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

                {/* ستون ۴: کاتالوگ تعاملی رُخ‌نما — با بوردر راست که در هاور ضخیم می‌شود */}
                <div className="group/rok relative flex flex-col -mt-[38px] -mb-[38px] bg-gradient-to-b from-[var(--color-primary-100)] via-white via-50% to-white z-20 shadow-[0_0_0_2.5px_var(--color-primary-600)] overflow-hidden">
                  {/* بوردر راست ستون رُخ‌نما: در هاور از ۲ به ۳ پیکسل ضخیم می‌شود */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-0 w-[2px] bg-[var(--color-primary-600)] transition-all duration-300 ease-out group-hover/rok:w-[3px]"
                  />

                  {/* هدر ستون ۴ */}
                  <div className="h-[104px] pt-0 px-6 sm:px-7 pb-5 sm:pb-6 bg-transparent border-b border-[var(--color-primary-200)] flex flex-col justify-end">
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
                      onMouseEnter={() => setActiveRow(idx)}
                      className={`${cellBase} ${cellOpacity(idx)} px-6 sm:px-7 bg-transparent border-b border-[var(--color-primary-200)]`}
                    >
                      <div className="flex items-center gap-1.5 text-sm text-[var(--color-success-600)] font-bold mb-[14px]">
                        <span
                          className={`inline-flex shrink-0 transition-transform duration-300 ease-out ${
                            activeRow === idx ? 'scale-110' : 'scale-100'
                          } text-[var(--color-success-600)]`}
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
      </div>
    </section>
  );
}