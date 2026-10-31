'use client';

import { Fragment, useRef, useState, useSyncExternalStore } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  IconArrowLeft,
  IconCheck,
  IconChevronDown,
  IconFlame,
  IconInfinity,
  IconRefresh,
  IconRosette,
  IconSparkles,
  IconBolt,
  IconWifiOff,
} from '@tabler/icons-react';
import { toPersianDigits } from '@/lib/fa';
import { Button } from '@/ui/Button';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type PlanKind = 'custom' | 'ready';

interface Tier {
  id: string;
  pages: number;
  pdfMin: number;
  pdfMax: number;
  custom: { was: number; now: number };
  ready: { was: number; now: number };
}

const PLAN_KINDS: { id: PlanKind; fa: string; tag: string }[] = [
  { id: 'custom', fa: 'طراحی اختصاصی', tag: 'اختصاصی' },
  { id: 'ready', fa: 'قالب نیمه‌آماده', tag: 'نیمه‌آماده' },
];

const TIERS: Tier[] = [
  { id: 't5', pages: 5, pdfMin: 8, pdfMax: 15, custom: { was: 30_000_000, now: 25_000_000 }, ready: { was: 18_000_000, now: 15_000_000 } },
  { id: 't10', pages: 10, pdfMin: 16, pdfMax: 30, custom: { was: 40_000_000, now: 33_000_000 }, ready: { was: 23_000_000, now: 19_500_000 } },
  { id: 't20', pages: 20, pdfMin: 31, pdfMax: 60, custom: { was: 48_000_000, now: 39_000_000 }, ready: { was: 37_000_000, now: 31_000_000 } },
  { id: 't30', pages: 30, pdfMin: 61, pdfMax: 150, custom: { was: 66_000_000, now: 57_000_000 }, ready: { was: 47_000_000, now: 39_000_000 } },
  { id: 't50', pages: 50, pdfMin: 151, pdfMax: 250, custom: { was: 80_000_000, now: 67_000_000 }, ready: { was: 66_000_000, now: 55_000_000 } },
  { id: 't75', pages: 75, pdfMin: 251, pdfMax: 400, custom: { was: 99_000_000, now: 87_000_000 }, ready: { was: 78_000_000, now: 65_000_000 } },
];

const PLAN_INCLUDES_CUSTOM = [
  'طراحی اختصاصی بر اساس هویت بصری',
  'ماژول‌های سه‌بعدی، ویدیو و ۳۶۰ درجه',
  'پاپ‌آپ مشخصات فنی و سطوح همکار/عموم',
  'اتصال مستقیم به انبار و سیستم فروش',
  'میزبانی ابری و تحویل کامل سورس',
];

const PLAN_INCLUDES_READY = [
  'چیدمان کاتالوگی استاندارد',
  'ورود اولیه اطلاعات و تصاویر محصولات',
  'جست‌وجوی سریع با نام و کد کالا',
  'وب‌اپلیکیشن نصب‌شدنی با کارکرد آفلاین',
  'صدور استاندارد برگه استعلام و سفارش',
];

const MAX_PAGES = 75;

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const PREORDER_ANCHOR = Date.UTC(2025, 11, 26);

function windowEnd(now: number = Date.now()): number {
  const weeks = Math.floor((now - PREORDER_ANCHOR) / WEEK_MS);
  return PREORDER_ANCHOR + (weeks + 1) * WEEK_MS;
}

function remaining(now: number = Date.now()) {
  const left = Math.max(0, windowEnd(now) - now);
  return {
    days: Math.floor(left / 86_400_000),
    hours: Math.floor((left % 86_400_000) / 3_600_000),
    minutes: Math.floor((left % 3_600_000) / 60_000),
    seconds: Math.floor((left % 60_000) / 1000),
  };
}

const ZERO_LEFT: ReturnType<typeof remaining> = { days: 0, hours: 0, minutes: 0, seconds: 0 };
let countdownSnapshot: ReturnType<typeof remaining> = ZERO_LEFT;

function subscribeCountdown(onTick: () => void) {
  countdownSnapshot = remaining();
  const id = window.setInterval(() => {
    countdownSnapshot = remaining();
    onTick();
  }, 1000);
  return () => {
    window.clearInterval(id);
    countdownSnapshot = ZERO_LEFT;
  };
}

const getCountdown = () => countdownSnapshot;
const getServerCountdown = () => ZERO_LEFT;

function Countdown() {
  const left = useSyncExternalStore(subscribeCountdown, getCountdown, getServerCountdown);

  const cells = [
    { v: toPersianDigits(left.days), l: 'روز' },
    { v: toPersianDigits(String(left.hours).padStart(2, '0')), l: 'ساعت' },
    { v: toPersianDigits(String(left.minutes).padStart(2, '0')), l: 'دقیقه' },
    { v: toPersianDigits(String(left.seconds).padStart(2, '0')), l: 'ثانیه' },
  ];

  return (
    <div className="flex w-full sm:w-auto h-full items-stretch justify-between gap-2 sm:gap-1.5" dir="ltr" aria-label="شمارش معکوس پیش‌سفارش">
      {cells.map((c, i) => (
        <Fragment key={c.l}>
          {i > 0 && (
            <span className="self-center text-sm font-bold text-[var(--color-secondary-400)] shrink-0">
              :
            </span>
          )}
          <span className="flex flex-1 h-full min-w-0 sm:min-w-[46px] flex-col items-center justify-center bg-[color-mix(in_srgb,var(--color-secondary-200)_50%,transparent)] py-3 px-1 sm:px-2 sm:pt-2.5 sm:pb-2">
            <strong className="text-base sm:text-lg font-bold leading-none tabular-nums tracking-[-0.03em] text-[var(--text-neutral-strong)]">
              {c.v}
            </strong>
            <span className="mt-1 sm:mt-1.5 text-[10px] sm:text-xs font-bold leading-none text-[var(--text-neutral-subtle)]">
              {c.l}
            </span>
          </span>
        </Fragment>
      ))}
    </div>
  );
}

function tierFor(pages: number): Tier {
  const exact = TIERS.find((t) => t.pages === pages);
  if (exact) return exact;

  if (pages <= TIERS[0].pages) return TIERS[0];
  if (pages >= TIERS[TIERS.length - 1].pages) return TIERS[TIERS.length - 1];

  let lower = TIERS[0];
  let upper = TIERS[1];
  for (let i = 0; i < TIERS.length - 1; i++) {
    if (pages >= TIERS[i].pages && pages <= TIERS[i + 1].pages) {
      lower = TIERS[i];
      upper = TIERS[i + 1];
      break;
    }
  }

  const fraction = (pages - lower.pages) / (upper.pages - lower.pages);
  const lerpPrice = (a: number, b: number) => Math.round((a + (b - a) * fraction) / 500_000) * 500_000;
  const lerpInt = (a: number, b: number) => Math.round(a + (b - a) * fraction);

  return {
    id: `t${pages}`,
    pages,
    pdfMin: lerpInt(lower.pdfMin, upper.pdfMin),
    pdfMax: lerpInt(lower.pdfMax, upper.pdfMax),
    custom: {
      was: lerpPrice(lower.custom.was, upper.custom.was),
      now: lerpPrice(lower.custom.now, upper.custom.now),
    },
    ready: {
      was: lerpPrice(lower.ready.was, upper.ready.was),
      now: lerpPrice(lower.ready.now, upper.ready.now),
    },
  };
}

const faM = (n: number) => {
  const millions = n / 1_000_000;
  return `${toPersianDigits(millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(1))} میلیون`;
};

/* رفتار دکمه‌های «درخواست دمو» و ثبت سفارش */
function requestPlanDemo(kindId: PlanKind) {
  if (typeof window === 'undefined') return;

  const meta = PLAN_KINDS.find((k) => k.id === kindId);
  try {
    sessionStorage.setItem('rokhnama_selected_plan', meta?.fa ?? kindId);
  } catch {
    /* ذخیره موقت در دسترس نیست */
  }

  window.dispatchEvent(
    new CustomEvent('rokhnama:select-plan', {
      detail: { plan: meta?.fa ?? kindId, planId: kindId },
    })
  );

  const demo = document.getElementById('demo') || document.getElementById('demo-request');
  if (demo) demo.scrollIntoView({ behavior: 'smooth' });
}

export default function PricingSection() {
  const containerRef = useRef<HTMLElement>(null);
  const frameFillRightRef = useRef<HTMLDivElement>(null);
  const frameFillLeftRef = useRef<HTMLDivElement>(null);

  const [pages, setPages] = useState(10);
  const [expandedId, setExpandedId] = useState<string | null>('t10');
  const [selectedKind, setSelectedKind] = useState<PlanKind>('custom');

  const tier = tierFor(pages);

  const snapToFive = (val: number) => {
    return Math.min(MAX_PAGES, Math.max(5, Math.round(val / 5) * 5));
  };

  const handleSliderChange = (val: number) => {
    const snapped = snapToFive(val);
    setPages(snapped);
    setExpandedId(tierFor(snapped).id);
  };

  const toggleAccordion = (tierId: string, tierPages: number) => {
    if (expandedId === tierId) {
      setExpandedId(null);
    } else {
      setExpandedId(tierId);
      setPages(tierPages);
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 320);
  };

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

      if (isReduced) return;
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="pricing"
      dir="rtl"
      className="relative z-10 w-full bg-white pt-16 pb-0 sm:py-28 tracking-[-0.02em] border-t border-[var(--color-primary-100)] overflow-hidden"
    >
      {/* خطوط عمودی ممتد طرفین در کانتینر ۱۴۷۲px با رنگ اختصاصی neutral-200 و خطوط پرشونده با primary-600 */}
      <div className="pointer-events-none absolute inset-0 z-20 flex justify-center overflow-hidden" aria-hidden="true">
        <div className="relative h-full w-[calc(100%-16px)] sm:w-[calc(100%-48px)] md:w-[calc(100%-64px)] lg:w-[calc(100%-96px)] xl:w-[calc(100%-128px)] max-w-[1472px]">
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

      <div className="content-col relative z-10 max-sm:!w-[calc(100%-16px)] max-sm:!px-6">

        {/* ── تیتر بخش ── */}
        <div className="pricing-entrance text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-[1.2] sm:leading-[1.15] tracking-[-0.02em] text-[var(--text-neutral-strong)]">
            چقدر می‌شود؟
            <span className="block mt-2 sm:mt-1 font-bold">یک‌بار، و بدون تیراژ.</span>
          </h2>
        </div>

        {/* ── سه ستون پلن‌ها با وایت‌اسپیس ارتقایافته ── */}
        <div className="pricing-entrance mt-6 sm:mt-10 lg:mt-14 grid grid-cols-1 gap-px bg-[var(--border-neutral-base)] border border-[var(--border-neutral-base)] lg:grid-cols-3 lg:items-stretch">

          {/* ۱ — ستون راست: باکس تخفیف پیش‌سفارش + کنترل حجم کاتالوگ و اسلایدر هیرلاین */}
          <section
            className="relative flex flex-col justify-between bg-white max-sm:[background-image:linear-gradient(to_bottom,var(--color-secondary-100),white_65%)] sm:[background-image:linear-gradient(to_bottom,var(--color-secondary-50),white_45%)] p-6 sm:p-8 lg:p-9"
            aria-labelledby="est-slider"
          >
            <div>
              {/* باکس تخفیف پیش‌سفارش با همان ظاهر و چیدمان در هر بریک‌پوینت */}
              <div className="flex flex-col items-center text-center pb-5 mb-6 -mx-6 sm:-mx-8 lg:-mx-9 px-6 sm:px-8 lg:px-9 border-b border-[color-mix(in_srgb,var(--color-secondary-200)_65%,transparent)]">
                <p className="flex items-center justify-center gap-2 text-sm sm:text-base font-black tracking-[-0.02em] text-[var(--text-neutral-strong)] m-0">
                  <IconFlame size={20} fill="currentColor" stroke={1.5} className="animate-flame-bob shrink-0 text-[var(--color-secondary-600)]" />
                  تخفیف ویژه پیش‌سفارش
                </p>
                <p className="mt-1 text-xs sm:text-sm font-medium tracking-[-0.02em] text-[var(--text-neutral-subtle)] text-center m-0">
                  تا جمعه با تخفیف پیش‌سفارش
                </p>
                <div className="mt-4 sm:mt-5 w-full flex justify-center">
                  <Countdown />
                </div>
              </div>

              {/* اسلایدر مرکزی مینیمال کالیبره‌شده — افزایش ۱۶ پیکسل فاصله با خط بالا */}
              <div className="mt-16 sm:mt-12 flex flex-col items-center text-center">
                <output className="flex flex-col items-center" aria-live="polite">
                  <div className="flex items-baseline justify-center gap-2">
                    <strong
                      style={{ letterSpacing: '-0.06em' }}
                      className="text-5xl sm:text-6xl font-light text-[var(--color-primary-700)] tabular-nums tracking-[-0.06em]"
                    >
                      {toPersianDigits(pages)}
                    </strong>
                    <span className="text-sm sm:text-base font-extrabold text-[var(--text-neutral-strong)]">
                      صفحه دیجیتال
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs sm:text-sm font-medium text-[var(--text-neutral-subtle)]">
                    معادل{' '}
                    <span style={{ letterSpacing: '-0.04em' }} className="tabular-nums font-bold text-[var(--text-neutral-strong)]">
                      {toPersianDigits(tier.pdfMin)}
                    </span>
                    {' تا '}
                    <span style={{ letterSpacing: '-0.04em' }} className="tabular-nums font-bold text-[var(--text-neutral-strong)]">
                      {toPersianDigits(tier.pdfMax)}
                    </span>
                    {' صفحهٔ کاتالوگ چاپی'}
                  </p>
                </output>

                {/* ریل مویین و کنترلر شارپ */}
                <div className="relative mt-8 sm:mt-10 w-full flex items-center">
                  <div
                    className="pointer-events-none absolute inset-x-0 h-[4px] sm:h-[5px] bg-[var(--color-neutral-200)]"
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute right-0 h-[4px] sm:h-[5px] bg-[var(--color-primary-600)]"
                    style={{
                      width: `${Math.min(100, Math.max(0, ((pages - 5) / (MAX_PAGES - 5)) * 100))}%`,
                    }}
                    aria-hidden="true"
                  />
                  <input
                    type="range"
                    min={5}
                    max={MAX_PAGES}
                    step={5}
                    value={pages}
                    onChange={(e) => handleSliderChange(Number(e.target.value))}
                    aria-label="تعداد صفحات کاتالوگ دیجیتال"
                    className="relative z-10 w-full cursor-pointer appearance-none bg-transparent h-8 sm:h-9 focus:outline-none
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:h-5 sm:[&::-webkit-slider-thumb]:h-6
                      [&::-webkit-slider-thumb]:w-5 sm:[&::-webkit-slider-thumb]:w-6
                      [&::-webkit-slider-thumb]:rounded-none
                      [&::-webkit-slider-thumb]:bg-[var(--color-primary-700)]
                      [&::-webkit-slider-thumb]:border-[2px]
                      [&::-webkit-slider-thumb]:border-white
                      [&::-webkit-slider-thumb]:shadow-[0_0_0_1px_var(--color-primary-700)]
                      [&::-webkit-slider-thumb]:transition-transform
                      [&::-webkit-slider-thumb]:duration-100
                      active:[&::-webkit-slider-thumb]:scale-110
                      [&::-moz-range-thumb]:h-5 sm:[&::-moz-range-thumb]:h-6
                      [&::-moz-range-thumb]:w-5 sm:[&::-moz-range-thumb]:w-6
                      [&::-moz-range-thumb]:rounded-none
                      [&::-moz-range-thumb]:bg-[var(--color-primary-700)]
                      [&::-moz-range-thumb]:border-[2px]
                      [&::-moz-range-thumb]:border-white
                      [&::-moz-range-thumb]:shadow-[0_0_0_1px_var(--color-primary-700)]"
                  />
                </div>

                <div className="mt-2.5 sm:mt-3.5 w-full flex items-center justify-between text-[11px] sm:text-xs font-bold text-[var(--text-neutral-subtle)] tabular-nums tracking-[-0.02em]">
                  <span>{toPersianDigits(5)} صفحه</span>
                  <span>{toPersianDigits(MAX_PAGES)} صفحه</span>
                </div>

                {/* ── سوئیچر ۲ گزینه در موبایل (<lg) مستقیماً زیر اسلایدر صفحه ── */}
                <div className="lg:hidden mt-6 pt-5 w-full border-t border-[var(--border-neutral-subtle)]">
                  <div className="grid grid-cols-2 p-1 bg-[var(--color-neutral-100)] text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setSelectedKind('custom')}
                      className={`py-2.5 px-3 transition-colors duration-150 flex items-center justify-center gap-1.5 ${
                        selectedKind === 'custom'
                          ? 'bg-white text-[var(--color-primary-800)]'
                          : 'text-[var(--text-neutral-subtle)] hover:text-[var(--text-neutral-strong)]'
                      }`}
                    >
                      <IconSparkles size={15} fill="currentColor" className={selectedKind === 'custom' ? 'text-[var(--color-primary-600)]' : 'text-neutral-400'} />
                      <span>طراحی اختصاصی</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedKind('ready')}
                      className={`py-2.5 px-3 transition-colors duration-150 flex items-center justify-center gap-1.5 ${
                        selectedKind === 'ready'
                          ? 'bg-white text-[var(--text-neutral-strong)]'
                          : 'text-[var(--text-neutral-subtle)] hover:text-[var(--text-neutral-strong)]'
                      }`}
                    >
                      <IconBolt size={15} fill="currentColor" className={selectedKind === 'ready' ? 'text-[var(--color-secondary-600)]' : 'text-neutral-400'} />
                      <span>قالب نیمه‌آماده</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ۳ مزیت زیر کارت سمت راست — کاهش ۱۶ پیکسلی فاصله از بالا */}
            <div className="hidden sm:block mt-4 space-y-2.5">
              <div className="flex items-center gap-3 p-2.5 bg-[var(--color-neutral-100)]/60 text-xs font-medium text-[var(--text-neutral-strong)]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-[var(--color-secondary-500)] text-white">
                  <IconInfinity size={13} stroke={2.5} />
                </span>
                <span>یک‌بار پرداخت قطعی، بدون هزینه چاپ و تیراژ</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 bg-[var(--color-neutral-100)]/60 text-xs font-medium text-[var(--text-neutral-strong)]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-[var(--color-primary-600)] text-white">
                  <IconRefresh size={13} stroke={2.5} />
                </span>
                <span>به‌روزرسانی لحظه‌ای قیمت‌ها در پنل آنلاین</span>
              </div>
              <div className="flex items-center gap-3 p-2.5 bg-[var(--color-neutral-100)]/60 text-xs font-medium text-[var(--text-neutral-strong)]">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center bg-[var(--color-primary-800)] text-white">
                  <IconWifiOff size={13} stroke={2.5} />
                </span>
                <span>وب‌اپلیکیشن آفلاین و بدون نیاز به اینترنت</span>
              </div>
            </div>
          </section>

          {/* ۲ — ستون مرکزی: طراحی اختصاصی (پلن پرچمدار — ۲۴ پیکسل مرتفع‌تر در دسکتاپ، وایت‌اسپیس بیشتر) */}
          <section
            className={`relative z-20 flex flex-col justify-between bg-gradient-to-b from-[var(--color-primary-100)] via-white via-40% to-white shadow-[0_0_0_2.5px_var(--color-primary-600)] p-6 sm:p-8 lg:px-8 lg:pt-7 lg:pb-8 lg:-my-[12px] ${
              selectedKind !== 'custom' ? 'max-lg:hidden' : ''
            }`}
            aria-labelledby="est-custom-plan"
          >
            <div className="flex flex-1 flex-col">
              {/* بدج در دایو افقی جلوی عنوان اما در موقعیت چپ بالا */}
              <div className="flex items-center justify-between gap-3 w-full">
                <h3 className="text-base sm:text-xl font-bold tracking-[-0.02em] text-[var(--color-primary-900)]" id="est-custom-plan">
                  طراحی اختصاصی
                </h3>
                <span className="shrink-0 text-[11px] font-bold text-white bg-[var(--color-primary-600)] px-2.5 py-1">
                  تحویل ۱۴ روزه
                </span>
              </div>
              {/* متون زیر عنوان: کاهش اپاسیتی ۵۰ درصد؛ در موبایل کوتاه در حد ۲ کلمه با فونت کوچک‌تر */}
              <p className="mt-2 text-xs sm:text-sm font-bold text-[var(--text-neutral-strong)] opacity-50">
                <span className="sm:hidden">۱۰۰٪ سفارشی</span>
                <span className="hidden sm:inline">هویت بصری و طراحی کاملاً اختصاصی</span>
              </p>

              {/* بلوک قیمت اختصاصی — وایت‌اسپیس بیشتر و بدون خط بالا و پایین در دسکتاپ */}
              <div className="my-7 py-2 sm:my-8 border-y border-[var(--color-neutral-200)] sm:border-y-0 sm:py-0">
                <p className="text-xs sm:text-sm font-bold text-[var(--color-neutral-500)]">
                  <s>{faM(tier.custom.was)} تومان</s>
                </p>
                <p className="mt-2.5 flex items-baseline gap-2">
                  <strong className="text-3xl sm:text-4xl font-black text-[var(--color-primary-900)] tracking-[-0.03em] tabular-nums">
                    {faM(tier.custom.now)}
                  </strong>
                  <span className="text-sm font-bold text-[var(--color-primary-800)]">تومان</span>
                </p>
                <p className="mt-2.5 flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--color-secondary-600)]">
                  <IconRosette size={16} stroke={2} />
                  {faM(tier.custom.was - tier.custom.now)} تخفیف ویژه پیش‌سفارش
                </p>
              </div>

              {/* لیست ویژگی‌های اختصاصی (خلاصه، شفاف و بدون خطوط طولانی) */}
              <ul className="mt-3 flex flex-1 flex-col divide-y divide-[var(--color-neutral-200)]">
                {PLAN_INCLUDES_CUSTOM.map((inc) => (
                  <li key={inc} className="flex items-center gap-3 py-3 text-xs sm:text-sm font-medium text-[var(--text-neutral-strong)]">
                    <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* دکمه پلن اختصاصی — متن بالای دکمه کوتاه‌تر در موبایل */}
            <div className="mt-8 flex flex-col items-center">
              <p className="mb-4 text-center text-xs font-bold text-[var(--color-primary-800)]">
                <span className="sm:hidden">تحویل ۱۴ الی ۲۱ روز کاری · پشتیبانی کامل</span>
                <span className="hidden sm:inline">یک‌بار پرداخت · تحویل ۱۴ الی ۲۱ روز کاری · پشتیبانی کامل</span>
              </p>
              <div className="w-full sm:hidden">
                <Button
                  variant="solid"
                  color="secondary"
                  size="sm"
                  fullWidth
                  iconAfter={<IconArrowLeft size={16} stroke={2} />}
                  className="text-[var(--text-neutral-strong)] font-bold"
                  onClick={() => requestPlanDemo('custom')}
                >
                  <span>ثبت سفارش طراحی اختصاصی</span>
                </Button>
              </div>
              <div className="hidden sm:block w-full">
                <Button
                  variant="solid"
                  color="secondary"
                  size="md"
                  fullWidth
                  iconAfter={<IconArrowLeft size={18} stroke={2} />}
                  className="text-[var(--text-neutral-strong)] font-bold"
                  onClick={() => requestPlanDemo('custom')}
                >
                  <span>ثبت سفارش طراحی اختصاصی</span>
                </Button>
              </div>
            </div>
          </section>

          {/* ۳ — ستون چپ: قالب نیمه‌آماده (در موبایل: بوردر سکندری و المان‌های پرایمری مخالف اختصاصی) */}
          <section
            className={`relative flex flex-col justify-between bg-white p-6 sm:p-8 lg:px-8 lg:pt-7 lg:pb-8 max-lg:border-2 max-lg:border-[var(--color-secondary-500)] max-lg:bg-gradient-to-b max-lg:from-[var(--color-secondary-50)] max-lg:via-white max-lg:to-white ${
              selectedKind !== 'ready' ? 'max-lg:hidden' : ''
            }`}
            aria-labelledby="est-ready-plan"
          >
            <div className="flex flex-1 flex-col">
              {/* بدج در دایو افقی جلوی عنوان اما در موقعیت چپ بالا — با اهمیت بصری کمتر */}
              <div className="flex items-center justify-between gap-3 w-full">
                <h3 className="text-base sm:text-xl font-bold tracking-[-0.02em] text-[var(--text-neutral-strong)]" id="est-ready-plan">
                  قالب نیمه‌آماده
                </h3>
                <span className="shrink-0 text-[11px] font-bold text-[var(--color-neutral-600)] bg-[var(--color-neutral-100)] border border-[var(--color-neutral-200)] px-2.5 py-1">
                  تحویل ۳ روزه
                </span>
              </div>
              {/* متون زیر عنوان: کاهش اپاسیتی ۵۰ درصد؛ در موبایل کوتاه در حد ۲ کلمه با فونت کوچک‌تر */}
              <p className="mt-2 text-xs sm:text-sm font-bold text-[var(--text-neutral-strong)] opacity-50">
                <span className="sm:hidden">چیدمان آماده</span>
                <span className="hidden sm:inline">چیدمان استاندارد و آماده تحویل</span>
              </p>

              {/* بلوک قیمت نیمه‌آماده — وایت‌اسپیس بیشتر و بدون خط بالا و پایین در دسکتاپ */}
              <div className="my-7 py-2 sm:my-8 border-y border-[var(--color-neutral-200)] sm:border-y-0 sm:py-0">
                <p className="text-xs sm:text-sm font-bold text-[var(--color-neutral-500)]">
                  <s>{faM(tier.ready.was)} تومان</s>
                </p>
                <p className="mt-2.5 flex items-baseline gap-2">
                  <strong className="text-3xl sm:text-4xl font-black text-[var(--color-primary-700)] lg:text-[var(--text-neutral-strong)] tracking-[-0.03em] tabular-nums">
                    {faM(tier.ready.now)}
                  </strong>
                  <span className="text-sm font-bold text-[var(--color-primary-700)] lg:text-[var(--text-neutral-subtle)]">تومان</span>
                </p>
                <p className="mt-2.5 flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--color-secondary-600)]">
                  <IconRosette size={16} stroke={2} />
                  {faM(tier.ready.was - tier.ready.now)} تخفیف ویژه پیش‌سفارش
                </p>
              </div>

              {/* لیست ویژگی‌های نیمه‌آماده */}
              <ul className="mt-3 flex flex-1 flex-col divide-y divide-[var(--border-neutral-subtle)]">
                {PLAN_INCLUDES_READY.map((inc) => (
                  <li key={inc} className="flex items-center gap-3 py-3 text-xs sm:text-sm font-medium text-[var(--text-neutral-strong)]">
                    <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* دکمه ثبت سفارش نیمه‌آماده (در موبایل پرایمری سالید) */}
            <div className="mt-8 flex flex-col items-center">
              <p className="mb-4 text-center text-xs font-bold text-[var(--text-neutral-subtle)]">
                تحویل فوق‌سریع ۳ روزه · آماده اتصال به دامنه
              </p>
              <div className="w-full sm:hidden">
                <Button
                  variant="solid"
                  color="primary"
                  size="sm"
                  fullWidth
                  iconAfter={<IconArrowLeft size={16} stroke={2} />}
                  className="font-bold text-white"
                  onClick={() => requestPlanDemo('ready')}
                >
                  <span>ثبت سفارش قالب نیمه‌آماده</span>
                </Button>
              </div>
              <div className="hidden sm:block w-full">
                <Button
                  variant="outline"
                  color="primary"
                  size="md"
                  fullWidth
                  iconAfter={<IconArrowLeft size={18} stroke={2} />}
                  className="font-bold"
                  onClick={() => requestPlanDemo('ready')}
                >
                  <span>ثبت سفارش قالب نیمه‌آماده</span>
                </Button>
              </div>
            </div>
          </section>

        </div>

        {/* ── جدول تعرفه‌ها (در موبایل: دقیقاً همان استایل آکاردئونی قبلی) ── */}
        <div className="mt-14 sm:mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 pb-4 border-b border-[var(--color-neutral-200)]">
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-[-0.02em] text-[var(--text-neutral-strong)]">
                جدول کامل پلن‌ها و تعرفه‌ها
              </h3>
              <p className="mt-1 hidden sm:block text-xs text-[var(--color-neutral-500)] font-medium">
                قیمت‌ها و مشخصات بر اساس حجم کاتالوگ شما.
              </p>
            </div>
          </div>

          <div className="mt-4 max-sm:-mx-6 border-y max-sm:border-x-0 sm:border border-[var(--color-neutral-200)] bg-white">

            {/* ۱. سرستون جدول دسکتاپ (sm به بالا) — ۴ ستون تراز با ردیف‌ها و بدون عنوان اضافه برای اقدام */}
            <div
              aria-hidden="true"
              className="hidden sm:grid grid-cols-[1.4fr_1fr_1.1fr_1.3fr] items-center gap-x-6 border-b border-[var(--color-neutral-200)] px-6 py-4 text-xs font-bold text-[var(--color-neutral-500)]"
            >
              <span>تعداد صفحات دیجیتال</span>
              <span>هزینه قالب نیمه‌آماده</span>
              <span>هزینه طراحی اختصاصی</span>
              <span>زمان تحویل</span>
            </div>

            {/* ۲. ردیف‌های جدول */}
            <div className="divide-y divide-[var(--color-neutral-200)]">
              {TIERS.map((t) => {
                const isOpen = expandedId === t.id;

                return (
                  <div
                    key={t.id}
                    className="group/row relative w-full text-right transition-colors duration-150 bg-white hover:bg-[var(--color-neutral-50)]/60"
                  >
                    {/* ── ساختار آکاردئونی اختصاصی موبایل (<sm) — دقیقاً نسخهٔ اصلی ── */}
                    <div className="sm:hidden flex flex-col px-6 pt-5 pb-5">
                      {/* سربرگ قابل لمس آکاردئون */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleAccordion(t.id, t.pages);
                        }}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex flex-col">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs font-black text-[var(--text-neutral-strong)]">تا</span>
                            <strong
                              style={{ letterSpacing: '-0.06em' }}
                              className="text-lg font-black text-[var(--color-primary-700)] tabular-nums tracking-[-0.06em]"
                            >
                              {toPersianDigits(t.pages)}
                            </strong>
                            <span className="text-xs font-black text-[var(--text-neutral-strong)]">صفحه دیجیتال</span>
                          </div>
                          <span className="text-[11px] font-normal text-[var(--text-neutral-subtle)] mt-0.5">
                            معادل <span style={{ letterSpacing: '-0.06em' }} className="tabular-nums tracking-[-0.06em]">{toPersianDigits(t.pdfMin)}</span> الی <span style={{ letterSpacing: '-0.06em' }} className="tabular-nums tracking-[-0.06em]">{toPersianDigits(t.pdfMax)}</span> صفحه کاغذی
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex flex-col text-left">
                            <span className="text-[10px] font-bold text-[var(--text-neutral-subtle)]">شروع از</span>
                            <strong
                              style={{ letterSpacing: '-0.06em' }}
                              className="text-sm font-black text-[var(--text-neutral-strong)] tabular-nums tracking-[-0.06em]"
                            >
                              {faM(t.ready.now)}
                            </strong>
                          </div>
                          <span
                            className={`flex h-7 w-7 items-center justify-center border border-[var(--border-neutral-subtle)] bg-[var(--color-neutral-100)] text-[var(--text-neutral-strong)] transition-transform duration-300 ${
                              isOpen ? 'rotate-180 bg-[var(--color-primary-600)] text-white border-[var(--color-primary-600)]' : ''
                            }`}
                          >
                            <IconChevronDown size={16} stroke={2.5} />
                          </span>
                        </div>
                      </div>

                      {/* بدنه آکاردئون: بازشو با دو کارت انتخابی و دکمه تمام‌عرض */}
                      <div
                        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                        }`}
                      >
                        <div className="overflow-hidden min-h-0">
                          <div className="mt-6 flex flex-col">
                            {/* دو کارت انتخابی: اختصاصی و نیمه‌آماده */}
                            <div className="grid grid-cols-2 gap-3 text-right">
                              {/* کارت طراحی اختصاصی */}
                              <div
                                role="button"
                                tabIndex={0}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedKind('custom');
                                }}
                                className={`p-3.5 border text-right cursor-pointer touch-manipulation select-none ${
                                  selectedKind === 'custom'
                                    ? 'bg-white border-[var(--color-primary-600)] ring-1 ring-[var(--color-primary-600)]'
                                    : 'bg-[var(--color-neutral-100)]/60 border-[var(--border-neutral-subtle)]'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span
                                    className={`text-xs font-bold ${
                                      selectedKind === 'custom'
                                        ? 'text-[var(--color-primary-700)]'
                                        : 'text-[var(--text-neutral-subtle)]'
                                    }`}
                                  >
                                    اختصاصی
                                  </span>
                                  <span
                                    aria-hidden={selectedKind !== 'custom'}
                                    className={`flex h-4 w-4 items-center justify-center ${
                                      selectedKind === 'custom'
                                        ? 'bg-[var(--color-primary-600)] text-white'
                                        : 'opacity-0 pointer-events-none'
                                    }`}
                                  >
                                    <IconCheck size={12} stroke={3} />
                                  </span>
                                </div>
                                <s style={{ letterSpacing: '-0.06em' }} className="block text-[10px] font-medium text-[var(--color-primary-400)] tabular-nums tracking-[-0.06em] mb-1.5">
                                  {faM(t.custom.was)}
                                </s>
                                <div className="flex items-baseline gap-1.5">
                                  <strong style={{ letterSpacing: '-0.06em' }} className="text-sm font-black text-[var(--color-primary-700)] tabular-nums tracking-[-0.06em]">
                                    {faM(t.custom.now)}
                                  </strong>
                                  <span className="text-[10px] font-bold text-[var(--color-primary-600)]">تومان</span>
                                </div>
                              </div>

                              {/* کارت طراحی نیمه‌آماده */}
                              <div
                                role="button"
                                tabIndex={0}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedKind('ready');
                                }}
                                className={`p-3.5 border text-right cursor-pointer touch-manipulation select-none ${
                                  selectedKind === 'ready'
                                    ? 'bg-white border-[var(--color-primary-600)] ring-1 ring-[var(--color-primary-600)]'
                                    : 'bg-[var(--color-neutral-100)]/60 border-[var(--border-neutral-subtle)]'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span
                                    className={`text-xs font-bold ${
                                      selectedKind === 'ready'
                                        ? 'text-[var(--color-primary-700)]'
                                        : 'text-[var(--text-neutral-subtle)]'
                                    }`}
                                  >
                                    نیمه‌آماده
                                  </span>
                                  <span
                                    aria-hidden={selectedKind !== 'ready'}
                                    className={`flex h-4 w-4 items-center justify-center ${
                                      selectedKind === 'ready'
                                        ? 'bg-[var(--color-primary-600)] text-white'
                                        : 'opacity-0 pointer-events-none'
                                    }`}
                                  >
                                    <IconCheck size={12} stroke={3} />
                                  </span>
                                </div>
                                <s style={{ letterSpacing: '-0.06em' }} className="block text-[10px] font-medium text-[var(--text-neutral-subtle)] tabular-nums tracking-[-0.06em] mb-1.5">
                                  {faM(t.ready.was)}
                                </s>
                                <div className="flex items-baseline gap-1.5">
                                  <strong style={{ letterSpacing: '-0.06em' }} className="text-sm font-black text-[var(--text-neutral-strong)] tabular-nums tracking-[-0.06em]">
                                    {faM(t.ready.now)}
                                  </strong>
                                  <span className="text-[10px] font-bold text-[var(--text-neutral-subtle)]">تومان</span>
                                </div>
                              </div>
                            </div>

                            {/* دکمه تمام‌عرض ثبت سفارش و دمو */}
                            <div className="mt-5 pb-1 w-full">
                              <Button
                                fullWidth
                                color="secondary"
                                variant="solid"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  requestPlanDemo(selectedKind);
                                }}
                                iconAfter={<IconArrowLeft size={16} stroke={2.2} />}
                                className="font-bold text-[var(--text-neutral-strong)]"
                              >
                                <span>
                                  {selectedKind === 'ready'
                                    ? 'ثبت سفارش و دمو قالب نیمه‌آماده'
                                    : 'ثبت سفارش و دمو طراحی اختصاصی'}
                                </span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── ساختار دسکتاپ (sm به بالا) — ۴ ستون هماهنگ با سرستون ── */}
                    <div className="hidden sm:grid grid-cols-[1.4fr_1fr_1.1fr_1.3fr] items-center gap-x-6 px-6 py-4 text-right">
                      {/* ستون ۱: صفحات */}
                      <div className="flex flex-col">
                        <span className="flex items-baseline gap-1 text-sm font-bold text-[var(--text-neutral-strong)]">
                          <span className="font-medium text-[var(--color-neutral-500)]">تا</span>
                          <strong
                            style={{ letterSpacing: '-0.04em' }}
                            className="text-base tabular-nums tracking-[-0.04em] font-bold text-[var(--text-neutral-strong)]"
                          >
                            {toPersianDigits(t.pages)}
                          </strong>
                          <span>صفحه دیجیتال</span>
                        </span>
                        <span className="text-[11px] text-[var(--color-neutral-500)] font-normal mt-0.5">
                          معادل {toPersianDigits(t.pdfMin)} تا {toPersianDigits(t.pdfMax)} صفحه کاغذی
                        </span>
                      </div>

                      {/* ستون ۲: نیمه‌آماده */}
                      <div className="flex flex-col text-start">
                        <s style={{ letterSpacing: '-0.04em' }} className="text-xs text-[var(--color-neutral-400)] tabular-nums tracking-[-0.04em]">
                          {faM(t.ready.was)}
                        </s>
                        <span className="mt-0.5 flex items-baseline gap-1">
                          <strong style={{ letterSpacing: '-0.04em' }} className="text-sm font-bold text-[var(--text-neutral-strong)] tabular-nums tracking-[-0.04em]">
                            {faM(t.ready.now)}
                          </strong>
                          <span className="text-xs font-normal text-[var(--color-neutral-500)]">تومان</span>
                        </span>
                      </div>

                      {/* ستون ۳: اختصاصی */}
                      <div className="flex flex-col text-start">
                        <s style={{ letterSpacing: '-0.04em' }} className="text-xs text-[var(--color-neutral-400)] tabular-nums tracking-[-0.04em]">
                          {faM(t.custom.was)}
                        </s>
                        <span className="mt-0.5 flex items-baseline gap-1">
                          <strong style={{ letterSpacing: '-0.04em' }} className="text-sm font-bold text-[var(--text-neutral-strong)] tabular-nums tracking-[-0.04em]">
                            {faM(t.custom.now)}
                          </strong>
                          <span className="text-xs font-normal text-[var(--color-neutral-500)]">تومان</span>
                        </span>
                      </div>

                      {/* ستون ۴: زمان تحویل + دکمه هاور درخواست دمو */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-[var(--text-neutral-strong)]">۱۴ الی ۲۱ روز کاری</span>
                          <span className="text-[11px] text-[var(--color-neutral-500)] font-normal mt-0.5">طراحی کامل هویت بصری</span>
                        </div>

                        <div className="flex items-center justify-end shrink-0">
                          <Button
                            asChild
                            color="primary"
                            variant="text"
                            size="sm"
                            className="[&>span>span:first-child]:opacity-0 group-hover/row:[&>span>span:first-child]:opacity-100 group-has-focus-visible/row:[&>span>span:first-child]:opacity-100 focus-visible:[&>span>span:first-child]:opacity-100 [&>span>span:first-child]:transition-opacity [&>span>span:first-child]:duration-200"
                            iconAfter={
                              <IconArrowLeft
                                size={18}
                                stroke={2}
                                className="shrink-0 text-[var(--color-neutral-400)] group-hover/row:text-[var(--color-primary-600)] transition-all duration-200 group-hover/row:-translate-x-1"
                                aria-hidden="true"
                              />
                            }
                          >
                            <a
                              href="#demo"
                              onClick={(e) => {
                                e.stopPropagation();
                                requestPlanDemo('custom');
                              }}
                              className="font-bold text-xs"
                            >
                              <span>درخواست دمو</span>
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
