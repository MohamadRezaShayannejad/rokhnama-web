'use client';

import { useState, useMemo, useRef } from 'react';
import {
  IconCalculator,
  IconTrees,
  IconFileText,
  IconArrowLeft,
  IconCoins,
  IconLayersSubtract,
  IconDroplet,
  IconTrendingDown,
} from '@tabler/icons-react';
import { Button } from '@/ui/Button';
import { Label } from '@/ui/Label';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function toPersianDigits(n: number | string): string {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return n
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '٬')
    .replace(/\d/g, (x) => farsiDigits[parseInt(x, 10)]);
}

// ماتریس قیمت‌های واقعی چاپ افست کاتالوگ رحلی در بازار چاپ ایران (سال ۱۴۰۳)
const OFFSET_MARKET_PRICES = [
  { pages: 16, volume: 500, price: 9500000 },
  { pages: 16, volume: 1000, price: 14500000 },
  { pages: 16, volume: 2000, price: 25000000 },
  { pages: 16, volume: 5000, price: 57000000 },
  { pages: 32, volume: 500, price: 15500000 },
  { pages: 32, volume: 1000, price: 23500000 },
  { pages: 32, volume: 2000, price: 41000000 },
  { pages: 32, volume: 5000, price: 95000000 },
  { pages: 64, volume: 500, price: 28500000 },
  { pages: 64, volume: 1000, price: 44000000 },
  { pages: 64, volume: 2000, price: 79000000 },
  { pages: 64, volume: 5000, price: 185000000 },
  { pages: 96, volume: 500, price: 41500000 },
  { pages: 96, volume: 1000, price: 64000000 },
  { pages: 96, volume: 2000, price: 117000000 },
  { pages: 96, volume: 5000, price: 275000000 },
  { pages: 128, volume: 500, price: 55000000 },
  { pages: 128, volume: 1000, price: 85000000 },
  { pages: 128, volume: 2000, price: 155000000 },
  { pages: 128, volume: 5000, price: 365000000 },
];

function getOffsetMarketPrice(pages: number, volume: number): number {
  const exact = OFFSET_MARKET_PRICES.find((m) => m.pages === pages && m.volume === volume);
  if (exact) return exact.price;

  const pageBrackets = [16, 32, 64, 96, 128];
  const volBrackets = [500, 1000, 2000, 5000];

  let pLow = 16;
  let pHigh = 128;
  for (let i = 0; i < pageBrackets.length; i++) {
    if (pages >= pageBrackets[i]) pLow = pageBrackets[i];
    if (pages <= pageBrackets[i]) {
      pHigh = pageBrackets[i];
      break;
    }
  }

  let vLow = 500;
  let vHigh = 5000;
  for (let i = 0; i < volBrackets.length; i++) {
    if (volume >= volBrackets[i]) vLow = volBrackets[i];
    if (volume <= volBrackets[i]) {
      vHigh = volBrackets[i];
      break;
    }
  }

  const pLowVal = OFFSET_MARKET_PRICES.find((m) => m.pages === pLow && m.volume === vLow)?.price || 14500000;
  const pHighVal = OFFSET_MARKET_PRICES.find((m) => m.pages === pHigh && m.volume === vHigh)?.price || 85000000;

  if (pLow === pHigh && vLow === vHigh) return pLowVal;
  const t = Math.max(0, Math.min(1, (pages - pLow) / (pHigh - pLow || 1)));
  return Math.round(pLowVal + t * (pHighVal - pLowVal));
}

// پلن‌های سه‌گانه سرمایه‌گذاری: محتوای کاملاً تقطیرشده و منسجم
const INVESTMENT_PLANS = [
  {
    id: 'template',
    title: 'قالب نیمه‌آماده',
    englishTitle: 'Template',
    desc: 'انتشار سریع کاتالوگ استاندارد؛ مناسب بنکداری و کاتالوگ‌های فشرده.',
    idealFor: 'تا ۲۴ صفحه کاتالوگ',
    priceLabel: '۲۸٬۰۰۰٬۰۰۰',
    priceNumeric: 28000000,
    unit: 'تومان · سرمایه‌گذاری یک‌باره',
    theme: 'neutral',
    buttonText: 'انتخاب قالب نیمه‌آماده',
  },
  {
    id: 'bespoke',
    title: 'طراحی اختصاصی',
    englishTitle: 'Bespoke',
    badge: 'پیشنهاد اصلی رُخ‌نما',
    desc: 'طراحی منطبق بر هویت برند، لایه‌های تعاملی، نقاط Hotspot و اتصال مستقیم به CRM.',
    idealFor: '۳۲ تا ۹۶ صفحه کاتالوگ',
    priceLabel: '۶۵٬۰۰۰٬۰۰۰',
    priceNumeric: 65000000,
    unit: 'تومان · سرمایه‌گذاری یک‌باره',
    theme: 'primary',
    features: ['تا ۱۸۰ محصول', 'مدل ۳۶۰ درجه و ویدیو', 'قیمت چندسطحی همکار'],
    buttonText: 'سفارش طراحی اختصاصی',
  },
  {
    id: 'enterprise',
    title: 'پکیج سازمانی پیشرفته',
    englishTitle: 'Enterprise',
    badge: 'زیرساخت اختصاصی و چندزبانه',
    desc: 'ویژه صنایع و هلدینگ‌ها؛ اتصال مستقیم به ERP و انبار، چندزبانه و قرارداد NDA.',
    idealFor: 'بیش از ۹۶ صفحه کاتالوگ',
    priceLabel: 'برآورد سفارشی',
    priceNumeric: 95000000,
    unit: 'بر مبنای مقیاس دیتابیس',
    theme: 'neutral',
    buttonText: 'درخواست مشاوره سازمانی',
  },
];

export default function PricingSection() {
  const containerRef = useRef<HTMLElement>(null);
  const frameFillRightRef = useRef<HTMLDivElement>(null);
  const frameFillLeftRef = useRef<HTMLDivElement>(null);

  // ورودی‌های ماشین‌حساب (پیش‌فرض ۱ نوبت چاپ در سال)
  const [pageCount, setPageCount] = useState<number>(32);
  const [printVolume, setPrintVolume] = useState<number>(1000);
  const reprintFrequency = 1;

  // محاسبات مهندسی بر پایه داده‌های واقعی بازار چاپ افست و شاخص‌های محیط‌زیستی
  const {
    treesSaved,
    waterSaved,
    paperSavedKg,
    totalSheetsCount,
    totalPrintCost,
    threeYearPrintCost,
    recommendedPlanId,
    threeYearSavings,
  } = useMemo(() => {
    // تعیین پلن متناسب با مقیاس کاتالوگ
    let recId = 'bespoke';
    let planInvestment = 65000000;

    if (pageCount <= 24 && printVolume <= 1000) {
      recId = 'template';
      planInvestment = 28000000;
    } else if (pageCount > 96 || printVolume >= 5000) {
      recId = 'enterprise';
      planInvestment = 95000000;
    }

    // مجموع کل برگ‌های مصرفی سالانه
    const totalSheets = (pageCount / 2) * printVolume * reprintFrequency;
    const kgSaved = Math.round((totalSheets * 2.8) / 500);
    const trees = Math.max(1, Math.round((kgSaved / 1000) * 17));
    const water = Math.round((kgSaved / 1000) * 26000);

    // محاسبه قیمت واقعی چاپ افست از ماتریس بازار + ۱۵٪ ریسک باطله شدن قیمت و ضایعات
    const baseMarketPrice = getOffsetMarketPrice(pageCount, printVolume);
    const wasteRisk = Math.round(baseMarketPrice * 0.15);
    const yearlyPrintTotal = baseMarketPrice + wasteRisk;

    // افق ۳ ساله چاپ سنتی
    const threeYearPrint = yearlyPrintTotal * 3;

    // صرفه‌جویی سه ساله نسبت به پلن منطبق با این کاتالوگ
    const savings = Math.max(0, threeYearPrint - planInvestment);

    return {
      treesSaved: trees,
      waterSaved: water,
      paperSavedKg: kgSaved,
      totalSheetsCount: totalSheets,
      totalPrintCost: yearlyPrintTotal,
      threeYearPrintCost: threeYearPrint,
      recommendedPlanId: recId,
      threeYearSavings: savings,
    };
  }, [pageCount, printVolume, reprintFrequency]);

  // انیمیشن خطوط راهنمای قاب کانتینر ۱۴۷۲px
  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

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
              trigger: containerRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  const handleSelectPlan = (planTitle: string) => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem('rokhnama_selected_plan', planTitle);
        sessionStorage.setItem(
          'rokhnama_catalog_spec',
          `کاتالوگ ${pageCount} صفحه با تیراژ ${printVolume} نسخه (۱ نوبت در سال)`
        );
      } catch {
        // ignore
      }

      window.dispatchEvent(
        new CustomEvent('rokhnama:select-plan', {
          detail: {
            plan: planTitle,
            pages: pageCount,
            volume: printVolume,
            frequency: 1,
          },
        })
      );

      const demoEl = document.getElementById('demo') || document.getElementById('demo-request');
      if (demoEl) {
        demoEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      ref={containerRef}
      id="pricing"
      className="relative z-10 w-full bg-[var(--color-neutral-base)] text-[var(--color-neutral-900)] py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 tracking-[-0.02em] overflow-hidden border-t border-[var(--color-neutral-200)]"
      dir="rtl"
    >
      {/* خطوط عمودی ممتد طرفین در کانتینر ۱۴۷۲px */}
      <div
        className="pointer-events-none absolute inset-0 z-20 flex justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="relative h-full w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
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

      <div className="max-w-[1408px] mx-auto relative z-10 space-y-12 sm:space-y-16">
        {/* ۱. هدر سکشن: تیپوگرافی رسمی و توجیه اقتصادی */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[var(--color-neutral-200)] text-[var(--color-neutral-700)] text-xs font-bold tracking-[-0.02em] mb-4 rounded-none">
            <IconCoins size={15} stroke={1.8} className="text-[var(--color-primary-600)]" />
            <span>بخش هشتم · توجیه مالی و تعرفه‌ها</span>
          </div>
          <h2 className="tracking-[-0.02em] text-[var(--color-neutral-900)]">
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-black leading-[1.25]">
              سرمایه‌گذاری در رُخ‌نما در برابر هزینه‌های مکرر چاپ
            </span>
            <span className="block text-base sm:text-lg lg:text-xl font-medium text-[var(--color-neutral-500)] mt-3 leading-[1.4]">
              برآورد هزینه‌های پنهان چاپخانه (زینک، کاغذ، انبار، باطله) در برابر سرمایه‌گذاری شفاف و یک‌باره
            </span>
          </h2>
        </div>

        {/* ۲. چیدمان دو ستونه: ماشین‌حساب در سمت راست (۵ ستون) + پنل‌های پلن‌ها در سمت چپ آن (۷ ستون) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* سمت راست: ماشین‌حساب مینیمال (۵ ستون از ۱۲ — بدون فاکتور، آرام و توچشم) */}
          <div className="lg:col-span-5 bg-white border border-[var(--color-neutral-200)] p-6 sm:p-7 space-y-6 rounded-none shadow-none lg:sticky lg:top-28">
            <div className="flex items-center gap-2.5 pb-4 border-b border-[var(--color-neutral-200)]">
              <div className="p-2 bg-[var(--color-neutral-100)] text-[var(--color-neutral-800)] border border-[var(--color-neutral-200)] rounded-none">
                <IconCalculator size={20} stroke={1.8} />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--color-neutral-900)]">
                  مشخصات کاتالوگ شما
                </h3>
                <span className="text-xs text-[var(--color-neutral-500)] font-medium">
                  برآورد هزینه بر اساس نرخ‌های جاری چاپ افست ایران
                </span>
              </div>
            </div>

            {/* کنترلر ۱: تعداد صفحات */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--color-neutral-800)]">
                  <IconFileText size={16} className="text-[var(--color-neutral-500)]" />
                  <span>تعداد صفحات:</span>
                </Label>
                <span className="text-sm font-black text-[var(--color-neutral-900)] px-3 py-1 bg-[var(--color-neutral-100)] border border-[var(--color-neutral-200)] rounded-none">
                  {toPersianDigits(pageCount)} صفحه
                </span>
              </div>

              <input
                type="range"
                min="8"
                max="160"
                step="8"
                value={pageCount}
                onChange={(e) => setPageCount(Number(e.target.value))}
                className="w-full h-1.5 bg-[var(--color-neutral-200)] accent-[var(--color-neutral-900)] cursor-pointer rounded-none"
              />

              <div className="grid grid-cols-5 gap-1.5 pt-0.5">
                {[16, 32, 64, 96, 128].map((pages) => (
                  <Button
                    key={pages}
                    size="sm"
                    color={pageCount === pages ? 'primary' : 'white'}
                    variant="solid"
                    cursorEffect={false}
                    onClick={() => setPageCount(pages)}
                    className={`h-9 text-xs font-bold rounded-none justify-center px-0 ${
                      pageCount === pages
                        ? ''
                        : 'border border-[var(--color-neutral-200)] text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)]'
                    }`}
                  >
                    <span>{toPersianDigits(pages)}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* کنترلر ۲: تیراژ سالانه چاپ */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--color-neutral-800)]">
                  <IconLayersSubtract size={16} className="text-[var(--color-neutral-500)]" />
                  <span>تیراژ سالانه چاپ:</span>
                </Label>
                <span className="text-sm font-black text-[var(--color-neutral-900)] px-3 py-1 bg-[var(--color-neutral-100)] border border-[var(--color-neutral-200)] rounded-none">
                  {toPersianDigits(printVolume)} نسخه
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 pt-0.5">
                {[500, 1000, 2000, 5000].map((vol) => (
                  <Button
                    key={vol}
                    size="sm"
                    color={printVolume === vol ? 'primary' : 'white'}
                    variant="solid"
                    cursorEffect={false}
                    onClick={() => setPrintVolume(vol)}
                    className={`h-10 text-xs sm:text-sm font-bold rounded-none justify-center px-0 ${
                      printVolume === vol
                        ? ''
                        : 'border border-[var(--color-neutral-200)] text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)]'
                    }`}
                  >
                    <span>{toPersianDigits(vol)}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* تایل خلاصه مقایسه مالی (مینیمال، بی‌رنگ و متصل به داده‌های واقعی بازار) */}
            <div className="bg-[var(--color-neutral-50)] border border-[var(--color-neutral-200)] p-5 space-y-4 rounded-none">
              <div>
                <span className="text-xs font-bold text-[var(--color-neutral-500)] block">
                  برآورد هزینه چاپ سنتی افست (سالانه):
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-[var(--color-neutral-900)]">
                    {toPersianDigits(totalPrintCost)}
                  </span>
                  <span className="text-xs font-bold text-[var(--color-neutral-600)]">تومان</span>
                </div>
                <span className="text-xs text-[var(--color-neutral-500)] block mt-0.5">
                  بر مبنای نرخ مصوب افست و احتساب ۱۵٪ ریسک باطله شدن قیمت‌ها
                </span>
              </div>

              <div className="pt-3 border-t border-[var(--color-neutral-200)] flex items-center justify-between text-xs">
                <span className="text-[var(--color-neutral-600)]">افق ۳ ساله چاپ سنتی:</span>
                <span className="font-bold text-[var(--color-neutral-900)]">
                  {toPersianDigits(threeYearPrintCost)} تومان
                </span>
              </div>

              <div className="pt-3 border-t border-[var(--color-neutral-200)] flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--color-neutral-700)] flex items-center gap-1.5">
                  <IconTrendingDown size={16} className="text-[var(--color-neutral-600)]" />
                  <span>صرفه‌جویی ۳ ساله با رُخ‌نما:</span>
                </span>
                <span className="text-sm sm:text-base font-black text-[var(--color-neutral-900)]">
                  {toPersianDigits(threeYearSavings)} تومان
                </span>
              </div>
            </div>
          </div>

          {/* سمت چپ: پنل‌های ۳ گانه سرمایه‌گذاری رُخ‌نما با اتصال هوشمند به اسلایدر (۷ ستون از ۱۲) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="pb-3 border-b border-[var(--color-neutral-200)]">
              <h3 className="text-lg sm:text-xl font-black text-[var(--color-neutral-900)]">
                پلن‌های سرمایه‌گذاری رُخ‌نما
              </h3>
              <p className="text-xs text-[var(--color-neutral-500)] font-medium mt-1">
                پرداخت شفاف و ریالی؛ با سرمایه‌گذاری یک‌باره، هزینهٔ چاپ در سال‌های آینده به صفر می‌رسد
              </p>
            </div>

            {/* ۳ کارت افقی روی هم — تغییر وضعیت پویا بر اساس پیشنهاد بهینه ماشین‌حساب */}
            <div className="space-y-4">
              {INVESTMENT_PLANS.map((plan) => {
                const isSelected = plan.id === recommendedPlanId;

                return (
                  <article
                    key={plan.id}
                    className={`relative p-6 sm:p-7 transition-all duration-200 rounded-none ${
                      isSelected
                        ? 'border-2 border-[var(--color-primary-600)] bg-[var(--color-primary-50)]/30 text-[var(--color-primary-950)] shadow-xs'
                        : 'border border-[var(--color-neutral-300)] bg-white text-[var(--color-neutral-900)] hover:border-[var(--color-neutral-400)]'
                    }`}
                  >
                    {/* نشان ویژه پرایمری برای پلن منطبق بر مشخصات کاتالوگ کاربر */}
                    {isSelected && (
                      <div className="absolute top-0 start-6 -translate-y-1/2">
                        <span className="inline-flex items-center gap-1 bg-[var(--color-primary-600)] text-white text-xs font-bold px-2.5 py-0.5 shadow-xs rounded-none">
                          <span>
                            {plan.id === 'bespoke'
                              ? 'پیشنهاد اصلی رُخ‌نما'
                              : 'پیشنهاد متناسب با کاتالوگ شما'}
                          </span>
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                      {/* بخش راست: هویت پلن و مشخصات تقطیرشده */}
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4
                            className={`tracking-[-0.02em] ${
                              isSelected
                                ? 'text-lg sm:text-xl font-black text-[var(--color-primary-950)]'
                                : 'text-base sm:text-lg font-bold text-[var(--color-neutral-900)]'
                            }`}
                          >
                            {plan.title}
                          </h4>
                          <span
                            className={`text-xs font-medium ${
                              isSelected
                                ? 'text-[var(--color-primary-700)]'
                                : 'text-[var(--color-neutral-500)]'
                            }`}
                          >
                            ({plan.englishTitle})
                          </span>
                        </div>

                        <p
                          className={`text-xs sm:text-sm leading-relaxed max-w-md font-medium ${
                            isSelected
                              ? 'text-[var(--color-primary-900)]/85'
                              : 'text-[var(--color-neutral-600)]'
                          }`}
                        >
                          {plan.desc}
                        </p>

                        {/* تگ‌های اختصاصی تقطیرشده برای پلن اختصاصی */}
                        {plan.id === 'bespoke' && plan.features && (
                          <div className="flex items-center gap-1.5 flex-wrap pt-1">
                            {plan.features.map((feat, fIdx) => (
                              <span
                                key={fIdx}
                                className="text-xs font-bold text-[var(--color-primary-800)] bg-white px-2.5 py-0.5 border border-[var(--color-primary-200)] rounded-none"
                              >
                                {feat}
                              </span>
                            ))}
                          </div>
                        )}

                        <div
                          className={`text-xs font-semibold ${
                            isSelected
                              ? 'text-[var(--color-primary-700)]'
                              : 'text-[var(--color-neutral-500)]'
                          }`}
                        >
                          توصیه‌شده برای: {plan.idealFor}
                        </div>
                      </div>

                      {/* بخش چپ: قیمت و دکمه رسمی با حالت گپ تا ته زیاد (justify-between px-6) */}
                      <div className="flex flex-col items-start sm:items-end justify-between gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-[var(--color-neutral-200)] shrink-0 sm:w-64">
                        <div className="text-start sm:text-end">
                          <div className="flex items-baseline gap-1">
                            <span
                              className={`font-black tracking-tight text-[var(--color-neutral-900)] ${
                                isSelected
                                  ? 'text-2xl sm:text-3xl'
                                  : 'text-xl sm:text-2xl'
                              }`}
                            >
                              {plan.priceLabel}
                            </span>
                            {plan.id !== 'enterprise' && (
                              <span className="text-xs font-bold text-[var(--color-neutral-600)]">
                                تومان
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-medium block text-[var(--color-neutral-500)]">
                            {plan.unit}
                          </span>
                        </div>

                        {/* استفاده از کامپوننت رسمی Button با گپ تا ته زیاد (justify-between px-6) */}
                        <Button
                          color={isSelected ? 'primary' : 'secondary'}
                          variant={isSelected ? 'solid' : 'outline'}
                          size="md"
                          fullWidth
                          onClick={() => handleSelectPlan(plan.title)}
                          className="font-black text-sm justify-between px-6 rounded-none w-full"
                        >
                          <span>{plan.buttonText}</span>
                          <IconArrowLeft size={18} stroke={2} className="shrink-0" />
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* ۳. گام سوم روایی: بخش محیط زیست شبیه آمار و ارقام مهندسی (یک نوار آماری یکپارچه، بدون باکس‌های جدا) */}
        <div className="bg-white border border-[var(--color-neutral-200)] rounded-none overflow-hidden">
          {/* سربرگ نوار آماری */}
          <div className="p-5 sm:p-6 pb-4 border-b border-[var(--color-neutral-200)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--color-neutral-900)] flex items-center gap-2">
                <IconTrees size={20} className="text-[var(--color-neutral-700)]" />
                <span>شاخص‌های زیست‌محیطی حاصل از جایگزینی چاپ فیزیکی</span>
              </h3>
              <p className="text-xs text-[var(--color-neutral-500)] font-medium mt-0.5">
                برآورد سالانه منابع طبیعی ذخیره‌شده بر پایه مشخصات کاتالوگ شما
              </p>
            </div>
            <span className="text-xs font-semibold text-[var(--color-neutral-600)] bg-[var(--color-neutral-100)] px-3 py-1 self-start sm:self-auto rounded-none">
              محاسبه بر مبنای تیراژ سالانه
            </span>
          </div>

          {/* ۳ ستون آماری تفکیک‌شده با خطوط عمودی معمارانه ۱px */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-[var(--color-neutral-200)]">
            {/* شاخص ۱: درختان */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-white">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[var(--color-neutral-500)] flex items-center gap-1.5">
                  <IconTrees size={16} className="text-[var(--color-neutral-600)]" />
                  <span>حفظ درختان طبیعی</span>
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[var(--color-neutral-900)] pt-1">
                  {toPersianDigits(treesSaved)}
                  <span className="text-sm font-bold text-[var(--color-neutral-500)] ms-1">اصله درخت</span>
                </div>
                <p className="text-xs text-[var(--color-neutral-600)] pt-1">
                  جلوگیری از قطع درختان تنومند جهت تولید خمیر کاغذ
                </p>
              </div>
            </div>

            {/* شاخص ۲: کاغذ گلاسه */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-white">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[var(--color-neutral-500)] flex items-center gap-1.5">
                  <IconFileText size={16} className="text-[var(--color-neutral-600)]" />
                  <span>صرفه‌جویی در کاغذ</span>
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[var(--color-neutral-900)] pt-1">
                  {toPersianDigits(paperSavedKg)}
                  <span className="text-sm font-bold text-[var(--color-neutral-500)] ms-1">کیلوگرم</span>
                </div>
                <p className="text-xs text-[var(--color-neutral-600)] pt-1">
                  معادل {toPersianDigits(totalSheetsCount)} برگ کاغذ گلاسه ۱۷۰ گرم دو رو
                </p>
              </div>
            </div>

            {/* شاخص ۳: آب شیرین */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-white">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[var(--color-neutral-500)] flex items-center gap-1.5">
                  <IconDroplet size={16} className="text-[var(--color-neutral-600)]" />
                  <span>ذخیره آب شیرین</span>
                </span>
                <div className="text-3xl sm:text-4xl font-black text-[var(--color-neutral-900)] pt-1">
                  {toPersianDigits(waterSaved)}
                  <span className="text-sm font-bold text-[var(--color-neutral-500)] ms-1">لیتر آب</span>
                </div>
                <p className="text-xs text-[var(--color-neutral-600)] pt-1">
                  کاهش مصرف آب در فرآیند لیتوگرافی، رنگرزی و چاپ افست
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
