'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import {
  IconCalculator,
  IconTrees,
  IconFileText,
  IconArrowLeft,
  IconCoins,
  IconLayersSubtract,
  IconDroplet,
  IconTrendingDown,
  IconCheck,
  IconSparkles,
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
    features: ['تا ۴۸ محصول', 'اتصال دامنه اختصاصی', 'فرم استعلام تماس'],
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
    features: ['تا ۱۸۰ محصول', 'مدل ۳۶۰ درجه و ویدیو', 'قیمت چندسطحی همکار', 'اتصال به CRM'],
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
    features: ['محصولات نامحدود', 'سنکرون ERP و انبار', 'چندزبانه', 'قرارداد NDA'],
    buttonText: 'درخواست مشاوره سازمانی',
  },
];

export default function PricingSectionV2() {
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const [pageCount, setPageCount] = useState<number>(32);
  const [printVolume, setPrintVolume] = useState<number>(1000);
  const reprintFrequency = 1;

  const {
    treesSaved,
    waterSaved,
    paperSavedKg,
    totalSheetsCount,
    totalPrintCost,
    threeYearPrintCost,
    recommendedPlanId,
    threeYearSavings,
    recommendedPlan,
  } = useMemo(() => {
    let recId = 'bespoke';
    let planInvestment = 65000000;

    if (pageCount <= 24 && printVolume <= 1000) {
      recId = 'template';
      planInvestment = 28000000;
    } else if (pageCount > 96 || printVolume >= 5000) {
      recId = 'enterprise';
      planInvestment = 95000000;
    }

    const totalSheets = (pageCount / 2) * printVolume * reprintFrequency;
    const kgSaved = Math.round((totalSheets * 2.8) / 500);
    const trees = Math.max(1, Math.round((kgSaved / 1000) * 17));
    const water = Math.round((kgSaved / 1000) * 26000);

    const baseMarketPrice = getOffsetMarketPrice(pageCount, printVolume);
    const wasteRisk = Math.round(baseMarketPrice * 0.15);
    const yearlyPrintTotal = baseMarketPrice + wasteRisk;
    const threeYearPrint = yearlyPrintTotal * 3;
    const savings = Math.max(0, threeYearPrint - planInvestment);

    const recPlan = INVESTMENT_PLANS.find((p) => p.id === recId)!;

    return {
      treesSaved: trees,
      waterSaved: water,
      paperSavedKg: kgSaved,
      totalSheetsCount: totalSheets,
      totalPrintCost: yearlyPrintTotal,
      threeYearPrintCost: threeYearPrint,
      recommendedPlanId: recId,
      threeYearSavings: savings,
      recommendedPlan: recPlan,
    };
  }, [pageCount, printVolume, reprintFrequency]);

  useGSAP(
    () => {
      if (!heroRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top 80%',
          },
        }
      );
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
      className="relative z-10 w-full bg-[var(--color-neutral-base)] text-[var(--color-neutral-900)] py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 tracking-[-0.02em] overflow-hidden border-t border-[var(--color-neutral-200)]"
      dir="rtl"
    >
      <div className="max-w-[1408px] mx-auto relative z-10 space-y-16 sm:space-y-20">
        {/* Hero Section: Full-width calculator dashboard */}
        <div ref={heroRef} className="space-y-10">
          {/* Section header */}
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-[var(--color-neutral-200)] text-[var(--color-neutral-700)] text-sm font-bold tracking-[-0.02em] rounded-none">
              <IconCoins size={18} stroke={2} className="text-[var(--color-primary-600)]" />
              <span>بخش هشتم · توجیه مالی و تعرفه‌ها</span>
            </div>
            <h2 className="tracking-[-0.02em] text-[var(--color-neutral-900)] space-y-3">
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.2]">
                سرمایه‌گذاری هوشمندانه در برابر هزینه‌های مکرر
              </span>
              <span className="block text-lg sm:text-xl lg:text-2xl font-medium text-[var(--color-neutral-500)] leading-[1.4]">
                ماشین‌حساب مقایسه هزینه چاپ سنتی با کاتالوگ دیجیتال رُخ‌نما
              </span>
            </h2>
          </div>

          {/* Interactive calculator dashboard */}
          <div className="bg-white border-2 border-[var(--color-neutral-200)] rounded-none shadow-lg overflow-hidden">
            {/* Calculator controls */}
            <div className="p-8 sm:p-10 space-y-8 border-b-2 border-[var(--color-neutral-200)]">
              <div className="flex items-center gap-3 pb-4 border-b border-[var(--color-neutral-200)]">
                <div className="p-3 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] border-2 border-[var(--color-primary-200)] rounded-none">
                  <IconCalculator size={24} stroke={2} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-[var(--color-neutral-900)]">
                    مشخصات کاتالوگ شما
                  </h3>
                  <span className="text-sm text-[var(--color-neutral-600)] font-medium">
                    برآورد لحظه‌ای بر اساس نرخ‌های واقعی بازار چاپ افست ایران
                  </span>
                </div>
              </div>

              {/* Page count control */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2 text-base font-bold text-[var(--color-neutral-800)]">
                    <IconFileText size={20} className="text-[var(--color-neutral-600)]" />
                    <span>تعداد صفحات کاتالوگ:</span>
                  </Label>
                  <span className="text-lg font-black text-[var(--color-primary-700)] px-4 py-2 bg-[var(--color-primary-50)] border-2 border-[var(--color-primary-200)] rounded-none">
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
                  className="w-full h-2 bg-[var(--color-neutral-200)] accent-[var(--color-primary-600)] cursor-pointer rounded-none"
                />

                <div className="grid grid-cols-5 gap-2">
                  {[16, 32, 64, 96, 128].map((pages) => (
                    <Button
                      key={pages}
                      size="sm"
                      color={pageCount === pages ? 'primary' : 'white'}
                      variant="solid"
                      cursorEffect={false}
                      onClick={() => setPageCount(pages)}
                      className={`h-11 text-sm font-bold rounded-none justify-center px-0 ${
                        pageCount === pages
                          ? ''
                          : 'border-2 border-[var(--color-neutral-200)] text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-50)]'
                      }`}
                    >
                      <span>{toPersianDigits(pages)}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Print volume control */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2 text-base font-bold text-[var(--color-neutral-800)]">
                    <IconLayersSubtract size={20} className="text-[var(--color-neutral-600)]" />
                    <span>تیراژ چاپ سالانه:</span>
                  </Label>
                  <span className="text-lg font-black text-[var(--color-primary-700)] px-4 py-2 bg-[var(--color-primary-50)] border-2 border-[var(--color-primary-200)] rounded-none">
                    {toPersianDigits(printVolume)} نسخه
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[500, 1000, 2000, 5000].map((vol) => (
                    <Button
                      key={vol}
                      size="sm"
                      color={printVolume === vol ? 'primary' : 'white'}
                      variant="solid"
                      cursorEffect={false}
                      onClick={() => setPrintVolume(vol)}
                      className={`h-12 text-sm sm:text-base font-bold rounded-none justify-center px-0 ${
                        printVolume === vol
                          ? ''
                          : 'border-2 border-[var(--color-neutral-200)] text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-50)]'
                      }`}
                    >
                      <span>{toPersianDigits(vol)}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Cost comparison hero */}
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-[var(--color-neutral-200)]">
              {/* Traditional print cost */}
              <div className="p-8 sm:p-10 space-y-6 bg-[var(--color-neutral-50)]">
                <div className="space-y-2">
                  <span className="text-sm font-bold text-[var(--color-neutral-600)] flex items-center gap-2">
                    <IconTrendingDown size={18} className="text-[var(--color-error-600)]" />
                    <span>هزینه تکرارشونده چاپ سنتی (سالانه):</span>
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-[var(--color-error-700)]">
                      {toPersianDigits(totalPrintCost)}
                    </span>
                    <span className="text-base font-bold text-[var(--color-neutral-700)]">تومان</span>
                  </div>
                  <p className="text-xs text-[var(--color-neutral-600)] leading-relaxed">
                    شامل زینک لیتوگرافی، کاغذ گلاسه، صحافی و ۱۵٪ ریسک باطله شدن قیمت‌ها
                  </p>
                </div>

                <div className="pt-6 border-t-2 border-[var(--color-neutral-200)] space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-neutral-700)] font-medium">افق ۳ ساله چاپ سنتی:</span>
                    <span className="font-black text-[var(--color-error-700)] text-base">
                      {toPersianDigits(threeYearPrintCost)} تومان
                    </span>
                  </div>
                </div>
              </div>

              {/* Rokhnama investment */}
              <div className="p-8 sm:p-10 space-y-6 bg-white">
                <div className="space-y-2">
                  <span className="text-sm font-bold text-[var(--color-primary-700)] flex items-center gap-2">
                    <IconSparkles size={18} className="text-[var(--color-primary-600)]" />
                    <span>سرمایه‌گذاری یک‌باره رُخ‌نما:</span>
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-black text-[var(--color-primary-700)]">
                      {recommendedPlan.priceLabel}
                    </span>
                    {recommendedPlan.id !== 'enterprise' && (
                      <span className="text-base font-bold text-[var(--color-neutral-700)]">تومان</span>
                    )}
                  </div>
                  <p className="text-xs text-[var(--color-neutral-600)] leading-relaxed">
                    {recommendedPlan.desc}
                  </p>
                </div>

                <div className="pt-6 border-t-2 border-[var(--color-primary-200)] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[var(--color-primary-800)] flex items-center gap-2">
                      <IconTrendingDown size={18} className="text-[var(--color-success-600)]" />
                      <span>صرفه‌جویی ۳ ساله:</span>
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-[var(--color-success-700)]">
                      {toPersianDigits(threeYearSavings)} تومان
                    </span>
                  </div>

                  <Button
                    color="primary"
                    variant="solid"
                    size="lg"
                    fullWidth
                    onClick={() => handleSelectPlan(recommendedPlan.title)}
                    className="font-black text-base justify-between px-8 rounded-none"
                  >
                    <span>سفارش {recommendedPlan.title}</span>
                    <IconArrowLeft size={22} stroke={2.2} className="shrink-0" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental impact stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border-2 border-[var(--color-neutral-200)] p-6 space-y-2 rounded-none">
              <div className="flex items-center gap-2 text-[var(--color-neutral-600)]">
                <IconTrees size={20} className="text-[var(--color-success-600)]" />
                <span className="text-sm font-bold">حفظ درختان</span>
              </div>
              <div className="text-3xl font-black text-[var(--color-neutral-900)]">
                {toPersianDigits(treesSaved)}
                <span className="text-sm font-bold text-[var(--color-neutral-600)] ms-2">اصله</span>
              </div>
              <p className="text-xs text-[var(--color-neutral-600)]">
                جلوگیری از قطع درختان برای تولید کاغذ
              </p>
            </div>

            <div className="bg-white border-2 border-[var(--color-neutral-200)] p-6 space-y-2 rounded-none">
              <div className="flex items-center gap-2 text-[var(--color-neutral-600)]">
                <IconFileText size={20} className="text-[var(--color-neutral-600)]" />
                <span className="text-sm font-bold">صرفه‌جویی کاغذ</span>
              </div>
              <div className="text-3xl font-black text-[var(--color-neutral-900)]">
                {toPersianDigits(paperSavedKg)}
                <span className="text-sm font-bold text-[var(--color-neutral-600)] ms-2">کیلوگرم</span>
              </div>
              <p className="text-xs text-[var(--color-neutral-600)]">
                معادل {toPersianDigits(totalSheetsCount)} برگ کاغذ گلاسه
              </p>
            </div>

            <div className="bg-white border-2 border-[var(--color-neutral-200)] p-6 space-y-2 rounded-none">
              <div className="flex items-center gap-2 text-[var(--color-neutral-600)]">
                <IconDroplet size={20} className="text-[var(--color-primary-600)]" />
                <span className="text-sm font-bold">ذخیره آب</span>
              </div>
              <div className="text-3xl font-black text-[var(--color-neutral-900)]">
                {toPersianDigits(waterSaved)}
                <span className="text-sm font-bold text-[var(--color-neutral-600)] ms-2">لیتر</span>
              </div>
              <p className="text-xs text-[var(--color-neutral-600)]">
                کاهش مصرف آب در فرآیند چاپ افست
              </p>
            </div>
          </div>
        </div>

        {/* Plans section */}
        <div className="space-y-8">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <h3 className="text-2xl sm:text-3xl font-black text-[var(--color-neutral-900)]">
              پلن‌های سرمایه‌گذاری رُخ‌نما
            </h3>
            <p className="text-base text-[var(--color-neutral-600)] font-medium">
              پرداخت شفاف و ریالی؛ با سرمایه‌گذاری یک‌باره، هزینه چاپ در سال‌های آینده به صفر می‌رسد
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INVESTMENT_PLANS.map((plan) => {
              const isSelected = plan.id === recommendedPlanId;

              return (
                <article
                  key={plan.id}
                  className={`relative p-7 transition-all duration-200 rounded-none ${
                    isSelected
                      ? 'border-2 border-[var(--color-primary-600)] bg-[var(--color-primary-50)]/40 text-[var(--color-primary-950)] shadow-xl scale-105'
                      : 'border-2 border-[var(--color-neutral-300)] bg-white text-[var(--color-neutral-900)] hover:border-[var(--color-neutral-400)] hover:shadow-md'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute -top-4 start-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 bg-[var(--color-primary-600)] text-white text-xs font-bold px-3 py-1.5 shadow-lg rounded-none">
                        <IconSparkles size={14} stroke={2} />
                        <span>پیشنهاد ویژه برای شما</span>
                      </span>
                    </div>
                  )}

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <h4
                        className={`tracking-[-0.02em] text-xl font-black ${
                          isSelected
                            ? 'text-[var(--color-primary-950)]'
                            : 'text-[var(--color-neutral-900)]'
                        }`}
                      >
                        {plan.title}
                      </h4>
                      <span
                        className={`text-sm font-medium ${
                          isSelected
                            ? 'text-[var(--color-primary-700)]'
                            : 'text-[var(--color-neutral-500)]'
                        }`}
                      >
                        {plan.englishTitle}
                      </span>
                    </div>

                    <p
                      className={`text-sm leading-relaxed font-medium ${
                        isSelected
                          ? 'text-[var(--color-primary-900)]/90'
                          : 'text-[var(--color-neutral-600)]'
                      }`}
                    >
                      {plan.desc}
                    </p>

                    <ul className="space-y-2">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <IconCheck
                            size={18}
                            className={`shrink-0 mt-0.5 ${
                              isSelected
                                ? 'text-[var(--color-primary-700)]'
                                : 'text-[var(--color-success-600)]'
                            }`}
                            stroke={2.5}
                          />
                          <span
                            className={
                              isSelected
                                ? 'text-[var(--color-primary-900)]'
                                : 'text-[var(--color-neutral-700)]'
                            }
                          >
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-5 border-t-2 border-[var(--color-neutral-200)] space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-1.5">
                          <span
                            className={`font-black tracking-tight ${
                              isSelected
                                ? 'text-3xl text-[var(--color-primary-950)]'
                                : 'text-2xl text-[var(--color-neutral-900)]'
                            }`}
                          >
                            {plan.priceLabel}
                          </span>
                          {plan.id !== 'enterprise' && (
                            <span className="text-sm font-bold text-[var(--color-neutral-600)]">
                              تومان
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-medium block text-[var(--color-neutral-600)]">
                          {plan.unit}
                        </span>
                      </div>

                      <Button
                        color={isSelected ? 'primary' : 'secondary'}
                        variant={isSelected ? 'solid' : 'outline'}
                        size="md"
                        fullWidth
                        onClick={() => handleSelectPlan(plan.title)}
                        className="font-black text-sm justify-between px-6 rounded-none"
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
    </section>
  );
}

