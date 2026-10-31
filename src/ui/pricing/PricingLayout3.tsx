'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  IconCalculator,
  IconTrees,
  IconFileText,
  IconArrowLeft,
  IconCoins,
  IconLayersSubtract,
  IconSparkles,
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

/**
 * اتود ۳: انطباق کامل با لاجیک روایی معماری اطلاعات
 * ۱. گام اول روایی: ماشین‌حساب مقایسه چاپ سنتی + فاکتور مهرخورده باطل شد
 * ۲. گام دوم روایی: پاسخ و راهکار رُخ‌نما با بنتو گرید متمرکز بر طراحی اختصاصی
 * ۳. گام سوم روایی: سکشن تمام‌عرض اثر زیست‌محیطی در زیر همه‌چیز (درخت، کاغذ، آب)
 */
export default function PricingLayout3() {
  const containerRef = useRef<HTMLElement>(null);
  const frameFillRightRef = useRef<HTMLDivElement>(null);
  const frameFillLeftRef = useRef<HTMLDivElement>(null);

  const [pageCount, setPageCount] = useState<number>(32);
  const [printVolume, setPrintVolume] = useState<number>(1000);
  const reprintFrequency = 1;

  const {
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
      <div className="max-w-[1408px] mx-auto relative z-10 space-y-12 sm:space-y-16">
        {/* ۱. هدر سکشن */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[var(--color-neutral-200)] text-[var(--color-neutral-700)] text-xs font-bold tracking-[-0.02em] mb-4 rounded-none">
            <IconCoins size={15} stroke={1.8} className="text-[var(--color-primary-600)]" />
            <span>اتود ۳ · لاجیک روایی: ماشین‌حساب چاپ → بنتو پلن‌ها → طبیعت</span>
          </div>
          <h2 className="tracking-[-0.02em] text-[var(--color-neutral-900)]">
            <span className="block text-2xl sm:text-3xl lg:text-[36px] font-black leading-[1.25]">
              ماشین‌حساب مقایسه هزینه چاپ در برابر تعرفه رُخ‌نما
            </span>
            <span className="block text-sm sm:text-base font-medium text-[var(--color-neutral-500)] mt-3">
              برآورد هزینه‌های پنهان چاپخانه (زینک، کاغذ، انبار، باطله) در برابر سرمایه‌گذاری شفاف و یک‌باره رُخ‌نما
            </span>
          </h2>
        </div>

        {/* ۲. گام اول: ماشین‌حساب چاپخانه + فاکتور باطل شد */}
        <div className="bg-white border border-[var(--color-neutral-200)] p-6 sm:p-8 rounded-none shadow-none">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* کنترلرهای کاتالوگ شما (۷ ستون از ۱۲) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-[var(--color-neutral-200)]">
                <div className="p-2 bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] rounded-none">
                  <IconCalculator size={22} stroke={1.8} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--color-neutral-900)]">
                    مشخصات کاتالوگ فعلی شما
                  </h3>
                  <span className="text-xs text-[var(--color-neutral-500)] font-medium">
                    تعداد صفحات و تیراژ را مشخص کنید تا برآورد هزینه چاپ سنتی استخراج شود
                  </span>
                </div>
              </div>

              {/* ورودی ۱: صفحات کاتالوگ */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--color-neutral-800)]">
                    <IconFileText size={16} className="text-[var(--color-neutral-500)]" />
                    <span>تعداد صفحات کاتالوگ:</span>
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
                <div className="grid grid-cols-5 gap-2 pt-0.5">
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

              {/* ورودی ۲: تیراژ سالانه چاپ */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[var(--color-neutral-800)]">
                    <IconLayersSubtract size={16} className="text-[var(--color-neutral-500)]" />
                    <span>تیراژ چاپ در سال (نسخه چاپی):</span>
                  </Label>
                  <span className="text-sm font-bold text-[var(--color-neutral-900)] px-2.5 py-0.5 bg-[var(--color-neutral-100)] border border-[var(--color-neutral-200)] rounded-none">
                    {toPersianDigits(printVolume)} نسخه
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 pt-0.5">
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

            {/* فاکتور چاپ سنتی با مهر باطل شد (۵ ستون از ۱۲) */}
            <div className="lg:col-span-5 relative p-5 bg-white border border-[var(--color-neutral-300)] shadow-xs rounded-none overflow-hidden group">
              <div
                className="absolute top-0 inset-x-0 h-1 opacity-50"
                style={{
                  background:
                    'repeating-linear-gradient(90deg, var(--color-neutral-400), var(--color-neutral-400) 4px, transparent 4px, transparent 8px)',
                }}
                aria-hidden="true"
              />

              <div className="flex items-center justify-between pb-3 border-b border-dashed border-[var(--color-neutral-300)] mb-3">
                <div className="flex items-center gap-1.5">
                  <IconFileText size={15} className="text-[var(--color-neutral-500)]" />
                  <span className="text-xs font-bold text-[var(--color-neutral-900)]">
                    صورت‌حساب برآورد چاپخانه سنتی
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[var(--color-neutral-400)]">
                  REF-OFFSET/{pageCount}P
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-[var(--color-neutral-600)]">
                <div className="flex justify-between">
                  <span>لیتوگرافی و زینک ({toPersianDigits(formsCount)} فرم):</span>
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
                  <span>ریسک باطله و انبارداری (۱۵٪):</span>
                  <span className="font-bold">
                    {toPersianDigits(wasteCost)} ت
                  </span>
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-dashed border-[var(--color-neutral-300)] flex items-baseline justify-between">
                <span className="text-xs font-black text-[var(--color-neutral-800)]">
                  مجموع هزینه یک نوبت چاپ:
                </span>
                <div>
                  <span className="text-xl sm:text-2xl font-black text-[var(--color-neutral-900)]">
                    {toPersianDigits(totalPrintCost)}
                  </span>
                  <span className="text-xs font-bold text-[var(--color-neutral-500)] me-1">تومان</span>
                </div>
              </div>

              {/* مهر جوهری قرمز باطل شد */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
                <div
                  className="rotate-[-13deg] border-2 border-red-600 px-5 py-2.5 bg-red-600/5 backdrop-blur-[0.5px] flex flex-col items-center justify-center outline outline-1 outline-offset-2 outline-red-600/80 rounded-none transition-transform duration-300 group-hover:scale-105"
                  style={{
                    boxShadow: 'inset 0 0 4px rgba(220, 38, 38, 0.25)',
                  }}
                >
                  <div className="text-[10px] font-mono tracking-widest text-red-600 font-bold mb-0.5 border-b border-red-600/50 pb-0.5 w-full text-center">
                    INVALIDATED · لغو اعتبار
                  </div>
                  <span className="text-2xl sm:text-3xl font-black text-red-600 tracking-wider font-sans leading-none my-0.5">
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

        {/* ۳. گام دوم: پاسخ و راهکار رُخ‌نما با بنتو گرید شکیل */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[var(--color-neutral-200)] gap-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-[var(--color-neutral-900)]">
                پلن‌های سرمایه‌گذاری رُخ‌نما
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-neutral-500)] font-medium mt-1">
                پرداخت شفاف و ریالی؛ با سرمایه‌گذاری یک‌باره، هزینهٔ چاپ در سال‌های آینده به صفر می‌رسد
              </p>
            </div>
            <span className="text-xs font-bold text-[var(--color-primary-700)] bg-[var(--color-primary-50)] border border-[var(--color-primary-200)] px-3 py-1.5 self-start sm:self-auto rounded-none">
              سرمایه‌گذاری یک‌باره بدون اشتراک ماهانه
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* بال راست: قالب نیمه‌آماده (۳ ستون از ۱۲) */}
            <div className="lg:col-span-3 bg-[var(--color-neutral-100)] border border-[var(--color-neutral-300)] p-6 flex flex-col justify-between rounded-none">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-[var(--color-neutral-600)] bg-[var(--color-neutral-200)] px-2 py-0.5 inline-block rounded-none">
                  ورود سریع
                </span>
                <h4 className="text-lg font-bold text-[var(--color-neutral-900)]">
                  قالب نیمه‌آماده
                </h4>
                <p className="text-xs text-[var(--color-neutral-600)] leading-relaxed">
                  طراحی ساختاریافته برای انتشار کاتالوگ‌های فشرده و بنکداری تا ۲۴ صفحه.
                </p>
                <div className="pt-3 border-t border-[var(--color-neutral-200)]">
                  <span className="text-2xl font-black text-[var(--color-neutral-900)] block">
                    ۲۸٬۰۰۰٬۰۰۰
                  </span>
                  <span className="text-[11px] text-[var(--color-neutral-500)]">تومان · یک‌باره</span>
                </div>
              </div>
              <div className="pt-6 mt-auto">
                <Button
                  color="white"
                  variant="solid"
                  size="sm"
                  fullWidth
                  className="border border-[var(--color-neutral-300)] text-xs font-bold justify-between rounded-none"
                >
                  <span>انتخاب قالب</span>
                  <IconArrowLeft size={14} />
                </Button>
              </div>
            </div>

            {/* کانون بنتو: پلن پرایمری طراحی اختصاصی (۶ ستون از ۱۲) */}
            <div className="lg:col-span-6 bg-[var(--color-primary-50)]/60 border-2 border-[var(--color-primary-600)] p-6 sm:p-8 flex flex-col justify-between relative shadow-sm rounded-none">
              <div className="absolute top-0 start-8 -translate-y-1/2">
                <span className="inline-flex items-center gap-1.5 bg-[var(--color-primary-600)] text-white text-xs font-black px-3.5 py-1 shadow-xs rounded-none">
                  <IconSparkles size={13} />
                  <span>پیشنهاد اصلی رُخ‌نما · بیشترین ارزش سرمایه‌گذاری</span>
                </span>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h4 className="text-2xl font-black text-[var(--color-primary-950)]">
                      طراحی اختصاصی (Bespoke)
                    </h4>
                    <span className="text-xs font-semibold text-[var(--color-primary-700)] mt-0.5 block">
                      انطباق دقیق با معماری کاتالوگ و هویت سازمانی برند شما
                    </span>
                  </div>
                  <div className="text-start sm:text-end">
                    <span className="text-3xl sm:text-4xl font-black text-[var(--color-neutral-900)] block">
                      ۶۵٬۰۰۰٬۰۰۰
                    </span>
                    <span className="text-xs text-[var(--color-neutral-500)] font-medium">
                      تومان · سرمایه‌گذاری یک‌باره
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[var(--color-primary-900)]/85 leading-relaxed">
                  طراحی سفارشی، نقاط تعاملی هات‌اسپات، مدل سه‌بعدی محصولات، سهمیه‌بندی چندسطحی قیمت همکار، اتصال به CRM و انبار، همراه با پشتیبانی کامل تیم معماران رُخ‌نما.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {[
                    'تا ۱۸۰ محصول با ساختار دسته‌بندی',
                    'نقاط تعاملی Hotspot و مدل ۳۶۰ درجه',
                    'سهمیه‌بندی چندسطحی قیمت همکار',
                    'سیستم رهگیری دقیق توقف مشتری در CRM',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs text-[var(--color-primary-900)] font-medium">
                      <IconCheck size={14} className="text-[var(--color-primary-600)] stroke-[2.5] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[var(--color-primary-200)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-bold text-[var(--color-primary-800)]">
                  توصیه‌شده برای ۳۲ تا ۹۶ صفحه کاتالوگ
                </span>
                <Button
                  color="primary"
                  variant="solid"
                  size="md"
                  className="font-bold text-xs justify-between gap-2 px-6 w-full sm:w-auto rounded-none"
                >
                  <span>سفارش طراحی اختصاصی</span>
                  <IconArrowLeft size={16} />
                </Button>
              </div>
            </div>

            {/* بال چپ: پکیج سازمانی پیشرفته (۳ ستون از ۱۲) */}
            <div className="lg:col-span-3 bg-[var(--color-neutral-100)] border border-[var(--color-neutral-300)] p-6 flex flex-col justify-between rounded-none">
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-[var(--color-neutral-600)] bg-[var(--color-neutral-200)] px-2 py-0.5 inline-block rounded-none">
                  صنایع و هلدینگ‌ها
                </span>
                <h4 className="text-lg font-bold text-[var(--color-neutral-900)]">
                  پکیج سازمانی
                </h4>
                <p className="text-xs text-[var(--color-neutral-600)] leading-relaxed">
                  سنکرون مستقیم با ERP، پایگاه داده انبارداری، چندزبانه و قرارداد رسمی NDA.
                </p>
                <div className="pt-3 border-t border-[var(--color-neutral-200)]">
                  <span className="text-2xl font-black text-[var(--color-neutral-900)] block">
                    برآورد سفارشی
                  </span>
                  <span className="text-[11px] text-[var(--color-neutral-500)]">بر مبنای مقیاس دیتابیس</span>
                </div>
              </div>
              <div className="pt-6 mt-auto">
                <Button
                  color="white"
                  variant="solid"
                  size="sm"
                  fullWidth
                  className="border border-[var(--color-neutral-300)] text-xs font-bold justify-between rounded-none"
                >
                  <span>مشاوره سازمانی</span>
                  <IconArrowLeft size={14} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* ۴. گام سوم: سکشن تمام‌عرض اثر زیست‌محیطی در زیر همه‌چیز */}
        <div className="bg-white border border-[var(--color-neutral-200)] p-6 sm:p-8 rounded-none space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[var(--color-neutral-200)] gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[var(--color-neutral-900)] flex items-center gap-2">
                <IconTrees size={20} className="text-[var(--color-success-600)]" />
                <span>حفظ منابع طبیعی با جایگزینی چاپ سنتی</span>
              </h3>
              <p className="text-xs text-[var(--color-neutral-500)] font-medium mt-0.5">
                برآورد واقعی درختان، کاغذ و آب مصرفی حاصل از لغو چاپ سنتی این کاتالوگ در سال
              </p>
            </div>
            <span className="text-xs font-semibold text-[var(--color-neutral-600)] bg-[var(--color-neutral-100)] px-3 py-1 self-start sm:self-auto rounded-none">
              محاسبه بر مبنای تیراژ سالانه
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* کارت ۱: درختان حفظ‌شده */}
            <div className="p-4 bg-[var(--color-neutral-base)] border border-[var(--color-neutral-200)] flex flex-col items-center justify-between rounded-none group hover:border-[var(--color-neutral-300)] transition-colors">
              <div className="w-full text-center pb-2 border-b border-[var(--color-neutral-200)] mb-2">
                <span className="text-sm font-bold text-[var(--color-neutral-900)]">
                  {toPersianDigits(treesSaved)} اصله درخت حفظ‌شده
                </span>
                <span className="text-[11px] text-[var(--color-neutral-500)] block">
                  قطع‌نشده در جنگل‌های طبیعی
                </span>
              </div>
              <div className="w-full flex items-center justify-center py-2">
                <IsometricForestIllustration treesCount={treesSaved} />
              </div>
            </div>

            {/* کارت ۲: کاغذ گلاسه صرفه‌جویی‌شده */}
            <div className="p-4 bg-[var(--color-neutral-base)] border border-[var(--color-neutral-200)] flex flex-col items-center justify-between rounded-none group hover:border-[var(--color-neutral-300)] transition-colors">
              <div className="w-full text-center pb-2 border-b border-[var(--color-neutral-200)] mb-2">
                <span className="text-sm font-bold text-[var(--color-neutral-900)]">
                  {toPersianDigits(paperSavedKg)} کیلوگرم کاغذ گلاسه
                </span>
                <span className="text-[11px] text-[var(--color-neutral-500)] block">
                  معادل {toPersianDigits(totalSheetsCount)} برگ A4 مصرف‌نشده
                </span>
              </div>
              <div className="w-full flex items-center justify-center py-2">
                <IsometricPaperIllustration sheetsCount={totalSheetsCount} kgCount={paperSavedKg} />
              </div>
            </div>

            {/* کارت ۳: آب شیرین ذخیره‌شده */}
            <div className="p-4 bg-[var(--color-neutral-base)] border border-[var(--color-neutral-200)] flex flex-col items-center justify-between rounded-none group hover:border-[var(--color-neutral-300)] transition-colors">
              <div className="w-full text-center pb-2 border-b border-[var(--color-neutral-200)] mb-2">
                <span className="text-sm font-bold text-[var(--color-neutral-900)]">
                  {toPersianDigits(waterSaved)} لیتر آب شیرین
                </span>
                <span className="text-[11px] text-[var(--color-neutral-500)] block">
                  صرفه‌جویی در فرآیند تولید و رنگرزی افست
                </span>
              </div>
              <div className="w-full flex items-center justify-center py-2">
                <IsometricWaterIllustration waterLiters={waterSaved} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
