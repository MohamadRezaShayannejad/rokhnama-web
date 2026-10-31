'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  IconCalculator,
  IconTrees,
  IconFileText,
  IconArrowLeft,
  IconCoins,
  IconLayersSubtract,
  IconCheck,
} from '@tabler/icons-react';
import { Button } from '@/ui/Button';
import { Label } from '@/ui/Label';
import IsometricForestIllustration from '@/ui/IsometricForestIllustration';
import IsometricPaperIllustration from '@/ui/IsometricPaperIllustration';
import IsometricWaterIllustration from '@/ui/IsometricWaterIllustration';
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

const INVESTMENT_PLANS = [
  {
    id: 'template',
    title: 'قالب نیمه‌آماده',
    englishTitle: 'Template',
    desc: 'ساختار استاندارد کاتالوگ‌های فشرده و بنکداری؛ حذف سریع کاغذ با حداقل هزینه.',
    idealFor: 'تا ۲۴ صفحه کاتالوگ',
    priceLabel: '۲۸٬۰۰۰٬۰۰۰',
    unit: 'تومان · سرمایه‌گذاری یک‌باره',
    theme: 'gray',
    features: [
      'تا ۴۸ محصول با تصویر و جدول مشخصات',
      'اتصال مستقیم به دامنه و لینک اختصاصی',
      'صدور برگ سفارش A4 برای مشتری و انبار',
      'فرم پیامکی استعلام قیمت و ثبت اطلاعات',
    ],
    buttonText: 'انتخاب قالب نیمه‌آماده',
  },
  {
    id: 'bespoke',
    title: 'طراحی اختصاصی',
    englishTitle: 'Bespoke',
    badge: 'پیشنهاد اصلی رُخ‌نما',
    desc: 'انطباق کامل با هویت بصری، لایه‌های تعاملی، نقاط Hotspot، مدل سه‌بعدی و اتصال به CRM.',
    idealFor: '۳۲ تا ۹۶ صفحه کاتالوگ',
    priceLabel: '۶۵٬۰۰۰٬۰۰۰',
    unit: 'تومان · سرمایه‌گذاری یک‌باره',
    theme: 'primary',
    features: [
      'تا ۱۸۰ محصول با ساختار دسته‌بندی پیشرفته',
      'نقاط تعاملی (Hotspot)، گالری ۳۶۰ درجه و ویدیو',
      'سهمیه‌بندی چندسطحی قیمت همکار و نقدی',
      'رهگیری دقیق توقف مشتری روی محصولات و CRM',
    ],
    buttonText: 'سفارش طراحی اختصاصی',
  },
  {
    id: 'enterprise',
    title: 'پکیج سازمانی پیشرفته',
    englishTitle: 'Enterprise',
    desc: 'ویژه صنایع سنگین و هلدینگ‌ها؛ اتصال مستقیم به پایگاه داده و ERP با قرارداد رسمی NDA.',
    idealFor: 'بیش از ۹۶ صفحه کاتالوگ',
    priceLabel: 'برآورد سفارشی',
    unit: 'بر مبنای مقیاس دیتابیس',
    theme: 'gray',
    features: [
      'تعداد نامحدود کالاها و پارت‌نامبرهای فنی',
      'سنکرون پیوسته با پایگاه داده انبارداری و ERP',
      'چندزبانه با پشتیبانی از قیمت‌های ارزی و ریالی',
      'سرور اختصاصی ایزوله با پایداری ۹۹.۹٪ و NDA',
    ],
    buttonText: 'درخواست جلسه مشاوره سازمانی',
  },
];

/**
 * اتود ۲: نوار کنترلر بالا + ۳ ستون عمودی کلاسیک (Top Ribbon + 3 Vertical Columns)
 */
export default function PricingLayout2() {
  const containerRef = useRef<HTMLElement>(null);
  const frameFillRightRef = useRef<HTMLDivElement>(null);
  const frameFillLeftRef = useRef<HTMLDivElement>(null);

  const [pageCount, setPageCount] = useState<number>(32);
  const [printVolume, setPrintVolume] = useState<number>(1000);
  const reprintFrequency = 1;

  const {
    recommendedPlanId,
    treesSaved,
    waterSaved,
    paperSavedKg,
    totalSheetsCount,
    formsCount,
    platesCost,
    paperCost,
    bindingType,
    bindingCost,
    wasteCost,
    totalPrintCost,
  } = useMemo(() => {
    let recId = 'bespoke';
    if (pageCount <= 24 && printVolume <= 1000) {
      recId = 'template';
    } else if (pageCount > 96 || printVolume >= 5000) {
      recId = 'enterprise';
    }

    const totalSheets = (pageCount / 2) * printVolume * reprintFrequency;
    const kgSaved = Math.round((totalSheets * 2.8) / 500);
    const trees = Math.max(1, Math.round((kgSaved / 1000) * 17));
    const water = Math.round((kgSaved / 1000) * 26000);

    const forms = Math.max(2, Math.ceil(pageCount / 8));
    const plates = forms * 4 * 380000;
    const isGlue = pageCount > 48;
    const paper = Math.round(totalSheets * 1350);
    const binding = printVolume * (isGlue ? 8500 : 4000);
    const waste = Math.round((plates + paper + binding) * 0.15);
    const totalPrint = plates + paper + binding + waste;

    return {
      recommendedPlanId: recId,
      treesSaved: trees,
      waterSaved: water,
      paperSavedKg: kgSaved,
      totalSheetsCount: totalSheets,
      formsCount: forms,
      platesCost: plates,
      paperCost: paper,
      bindingType: isGlue ? 'چسب گرم' : 'منگنه لوپ',
      bindingCost: binding,
      wasteCost: waste,
      totalPrintCost: totalPrint,
    };
  }, [pageCount, printVolume, reprintFrequency]);

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

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full bg-[var(--color-neutral-base)] text-[var(--color-neutral-900)] py-16 sm:py-20 px-4 sm:px-6 lg:px-8 tracking-[-0.02em] overflow-hidden border-t border-[var(--color-neutral-200)]"
      dir="rtl"
    >
      <div className="max-w-[1408px] mx-auto relative z-10 space-y-12">
        {/* ۱. هدر سکشن */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[var(--color-neutral-200)] text-[var(--color-neutral-700)] text-xs font-bold tracking-[-0.02em] mb-4 rounded-none">
            <IconCoins size={15} stroke={1.8} className="text-[var(--color-primary-600)]" />
            <span>اتود ۲ · نوار بالایی کنترلر + ۳ ستون عمودی</span>
          </div>
          <h2 className="tracking-[-0.02em] text-[var(--color-neutral-900)]">
            <span className="block text-2xl sm:text-3xl lg:text-[36px] font-black leading-[1.25]">
              راهکار اختصاصی کسب‌وکار شما
            </span>
            <span className="block text-sm sm:text-base font-medium text-[var(--color-neutral-500)] mt-3">
              مشخصات کاتالوگ فعلی را مشخص کنید تا پلن بهینه و تعرفهٔ یک‌باره بدون هزینهٔ اشتراک ماهانه برآورد شود
            </span>
          </h2>
        </div>

        {/* ۲. نوار افقی بالای صفحه (کنترلرها در سمت راست + فاکتور کاغذی در سمت چپ) */}
        <div className="bg-white border border-[var(--color-neutral-200)] p-6 sm:p-8 rounded-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* اسلایدرها (۷ از ۱۲) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--color-neutral-200)]">
                <div className="p-2 bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] rounded-none">
                  <IconCalculator size={20} stroke={1.8} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--color-neutral-900)]">
                    تنظیمات مقیاس کاتالوگ
                  </h3>
                  <span className="text-[11px] text-[var(--color-neutral-500)] font-medium">
                    تغییر صفحات و تیراژ برای ارزیابی مقایسه‌ای
                  </span>
                </div>
              </div>

              {/* اسلایدر صفحات */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--color-neutral-800)]">
                    <IconFileText size={16} className="text-[var(--color-neutral-500)]" />
                    <span>تعداد صفحات:</span>
                  </Label>
                  <span className="text-sm font-bold text-[var(--color-neutral-900)] px-2.5 py-0.5 bg-[var(--color-neutral-100)] border border-[var(--color-neutral-200)] rounded-none">
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
                  className="w-full h-1.5 bg-[var(--color-neutral-200)] accent-[var(--color-primary-600)] cursor-pointer rounded-none"
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
                      className={`h-8 px-0 text-xs font-semibold rounded-none justify-center ${
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

              {/* تیراژ چاپ */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--color-neutral-800)]">
                    <IconLayersSubtract size={16} className="text-[var(--color-neutral-500)]" />
                    <span>تیراژ چاپ در سال:</span>
                  </Label>
                  <span className="text-sm font-bold text-[var(--color-neutral-900)] px-2.5 py-0.5 bg-[var(--color-neutral-100)] border border-[var(--color-neutral-200)] rounded-none">
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
                      className={`h-9 px-0 text-xs font-semibold rounded-none justify-center ${
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
            </div>

            {/* فاکتور مهرخورده باطل شد (۵ از ۱۲) */}
            <div className="lg:col-span-5 relative p-4 bg-white border border-[var(--color-neutral-300)] shadow-xs rounded-none overflow-hidden group">
              <div
                className="absolute top-0 inset-x-0 h-1 opacity-50"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, var(--color-neutral-400), var(--color-neutral-400) 4px, transparent 4px, transparent 8px)',
                }}
                aria-hidden="true"
              />

              <div className="flex items-center justify-between pb-2 border-b border-dashed border-[var(--color-neutral-300)] mb-2.5">
                <div className="flex items-center gap-1.5">
                  <IconFileText size={15} className="text-[var(--color-neutral-500)]" />
                  <span className="text-xs font-bold text-[var(--color-neutral-900)]">
                    صورت‌حساب تخمینی چاپ سنتی
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[var(--color-neutral-400)]">
                  OFFSET/{pageCount}P
                </span>
              </div>

              <div className="space-y-1 text-xs text-[var(--color-neutral-600)]">
                <div className="flex justify-between">
                  <span>زینک و لیتوگرافی ({toPersianDigits(formsCount)} فرم):</span>
                  <span className="font-bold text-[var(--color-neutral-900)]">
                    {toPersianDigits(platesCost)} ت
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>کاغذ گلاسه و چاپ ({toPersianDigits(totalSheetsCount)} برگ):</span>
                  <span className="font-bold text-[var(--color-neutral-900)]">
                    {toPersianDigits(paperCost)} ت
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>صحافی و شرینک ({bindingType}):</span>
                  <span className="font-bold text-[var(--color-neutral-900)]">
                    {toPersianDigits(bindingCost)} ت
                  </span>
                </div>
                <div className="flex justify-between text-red-600/90 pt-0.5">
                  <span>ریسک باطله شدن قیمت (۱۵٪):</span>
                  <span className="font-bold">
                    {toPersianDigits(wasteCost)} ت
                  </span>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-dashed border-[var(--color-neutral-300)] flex items-baseline justify-between">
                <span className="text-xs font-black text-[var(--color-neutral-800)]">
                  مجموع هزینه یک نوبت چاپ:
                </span>
                <div>
                  <span className="text-xl font-black text-[var(--color-neutral-900)]">
                    {toPersianDigits(totalPrintCost)}
                  </span>
                  <span className="text-xs font-bold text-[var(--color-neutral-500)] me-1">تومان</span>
                </div>
              </div>

              {/* مهر جوهری قرمز باطل شد */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
                <div
                  className="rotate-[-13deg] border-2 border-red-600 px-4 py-2 bg-red-600/5 backdrop-blur-[0.5px] flex flex-col items-center justify-center outline outline-1 outline-offset-2 outline-red-600/80 rounded-none transition-transform duration-300 group-hover:scale-105"
                  style={{
                    boxShadow: 'inset 0 0 4px rgba(220, 38, 38, 0.25)',
                  }}
                >
                  <div className="text-[9px] font-mono tracking-widest text-red-600 font-bold mb-0.5 border-b border-red-600/50 pb-0.5 w-full text-center">
                    INVALIDATED · لغو اعتبار
                  </div>
                  <span className="text-2xl font-black text-red-600 tracking-wider font-sans leading-none my-0.5">
                    بـاطـل شـد
                  </span>
                  <div className="text-[9px] font-bold text-red-700 mt-0.5 tracking-tight border-t border-red-600/50 pt-0.5 w-full text-center">
                    به‌علت تغییر قیمت و عدم اتصال به انبار
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ۳. سه ستون عمودی پلن‌های سرمایه‌گذاری کنار هم (3 Vertical Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {INVESTMENT_PLANS.map((plan) => {
            const isPrimary = plan.theme === 'primary';

            return (
              <div
                key={plan.id}
                className={`flex flex-col justify-between p-6 sm:p-7 relative transition-all duration-200 rounded-none ${
                  isPrimary
                    ? 'border-2 border-[var(--color-primary-600)] bg-[var(--color-primary-50)]/50 text-[var(--color-primary-950)] shadow-sm md:-translate-y-2'
                    : 'border border-[var(--color-neutral-300)] bg-[var(--color-neutral-100)] text-[var(--color-neutral-900)]'
                }`}
              >
                {/* نشان اختصاصی بالای ستون پرایمری */}
                {isPrimary && (
                  <div className="absolute top-0 start-6 -translate-y-1/2">
                    <span className="inline-flex items-center gap-1 bg-[var(--color-primary-600)] text-white text-[11px] font-black px-2.5 py-0.5 shadow-xs rounded-none">
                      <span>{plan.badge}</span>
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3
                      className={`tracking-[-0.02em] ${
                        isPrimary
                          ? 'text-xl font-black text-[var(--color-primary-950)]'
                          : 'text-lg font-bold text-[var(--color-neutral-900)]'
                      }`}
                    >
                      {plan.title}
                    </h3>
                    <span
                      className={`text-xs font-medium block mt-0.5 ${
                        isPrimary
                          ? 'text-[var(--color-primary-700)]'
                          : 'text-[var(--color-neutral-500)]'
                      }`}
                    >
                      ({plan.englishTitle})
                    </span>
                  </div>

                  <p
                    className={`text-xs leading-relaxed font-medium ${
                      isPrimary
                        ? 'text-[var(--color-primary-900)]/85'
                        : 'text-[var(--color-neutral-600)]'
                    }`}
                  >
                    {plan.desc}
                  </p>

                  <div className="pt-3 pb-3 border-y border-[var(--color-neutral-200)]">
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`font-black tracking-tight text-[var(--color-neutral-900)] ${
                          isPrimary ? 'text-3xl' : 'text-2xl'
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
                    <span className="text-[11px] font-medium block text-[var(--color-neutral-500)] mt-0.5">
                      {plan.unit}
                    </span>
                  </div>

                  {/* خلاصه امکانات برای ستون‌های عمودی */}
                  <div className="space-y-2 pt-1 pb-4">
                    <span className="text-[11px] font-bold text-[var(--color-neutral-500)] block">
                      امکانات کلیدی:
                    </span>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-1.5 text-xs text-[var(--color-neutral-700)]">
                        <IconCheck
                          size={14}
                          className={`shrink-0 mt-0.5 ${
                            isPrimary ? 'text-[var(--color-primary-600)] stroke-[2.5]' : 'text-[var(--color-neutral-500)]'
                          }`}
                        />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--color-neutral-200)] mt-auto">
                  <div className="text-[11px] font-semibold text-[var(--color-neutral-500)] mb-3">
                    توصیه‌شده برای: {plan.idealFor}
                  </div>
                  <Button
                    color={isPrimary ? 'primary' : 'white'}
                    variant="solid"
                    size="sm"
                    fullWidth
                    className={`font-bold text-xs justify-between gap-2 px-4 rounded-none h-10 ${
                      isPrimary
                        ? 'font-black shadow-xs'
                        : 'border border-[var(--color-neutral-300)] text-[var(--color-neutral-900)]'
                    }`}
                  >
                    <span>{plan.buttonText}</span>
                    <IconArrowLeft size={16} stroke={1.8} className="shrink-0" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ۴. نوار پایین: ۳ باکس اثر زیست‌محیطی تمام‌عرض */}
        <div className="bg-white border border-[var(--color-neutral-200)] p-5 sm:p-6 rounded-none space-y-4">
          <div className="flex items-center justify-between text-xs text-[var(--color-neutral-600)] pb-3 border-b border-[var(--color-neutral-200)]">
            <span className="flex items-center gap-1.5 font-bold text-[var(--color-neutral-800)]">
              <IconTrees size={16} className="text-[var(--color-success-600)]" />
              <span>حفظ منابع طبیعی با حذف چاپ سنتی:</span>
            </span>
            <span className="text-[11px] font-semibold text-[var(--color-neutral-500)]">
              محاسبه بر مبنای تیراژ سالانه
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-[var(--color-neutral-base)] border border-[var(--color-neutral-200)] flex flex-col items-center justify-between rounded-none">
              <span className="text-xs font-bold text-[var(--color-neutral-800)] text-center mb-1">
                {toPersianDigits(treesSaved)} اصله درخت حفظ‌شده
              </span>
              <IsometricForestIllustration treesCount={treesSaved} />
            </div>

            <div className="p-3 bg-[var(--color-neutral-base)] border border-[var(--color-neutral-200)] flex flex-col items-center justify-between rounded-none">
              <span className="text-xs font-bold text-[var(--color-neutral-800)] text-center mb-1">
                {toPersianDigits(paperSavedKg)} کیلوگرم کاغذ گلاسه صرفه‌جویی‌شده
              </span>
              <IsometricPaperIllustration sheetsCount={totalSheetsCount} kgCount={paperSavedKg} />
            </div>

            <div className="p-3 bg-[var(--color-neutral-base)] border border-[var(--color-neutral-200)] flex flex-col items-center justify-between rounded-none">
              <span className="text-xs font-bold text-[var(--color-neutral-800)] text-center mb-1">
                {toPersianDigits(waterSaved)} لیتر آب شیرین ذخیره‌شده
              </span>
              <IsometricWaterIllustration waterLiters={waterSaved} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
