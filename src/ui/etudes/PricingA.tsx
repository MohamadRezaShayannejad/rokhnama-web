'use client';

import { useState, useMemo } from 'react';
import {
  IconCalculator,
  IconPrinter,
  IconSparkles,
  IconTree,
  IconDroplet,
  IconFileText,
  IconLeaf,
  IconCheck,
  IconArrowLeft,
  IconCoins,
  IconServerBolt,
  IconShieldLock,
  IconFileCheck,
  IconInfoCircle,
  IconAlertTriangle,
} from '@tabler/icons-react';
import { Button } from '@/ui/Button';
import { cn } from '@/lib/utils';
import {
  toFa,
  formatNumberFa,
  formatTomans,
  formatDecimalFa,
  calculatePrintAndRokhnama,
  PRICING_TIERS,
} from './pricingCalculations';

const PAGE_PRESETS = [20, 40, 80, 160, 250, 400];
const COPIES_PRESETS = [500, 1000, 2000, 5000];

export default function PricingA() {
  const [pages, setPages] = useState<number>(40);
  const [copies, setCopies] = useState<number>(1000);

  const calc = useMemo(() => calculatePrintAndRokhnama(pages, copies), [pages, copies]);

  return (
    <section
      id="pricing-a"
      dir="rtl"
      className="relative bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] font-sans py-20 px-4 md:px-8 border-b border-[var(--border-neutral-subtle)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* سربرگ بخش */}
        <div className="mb-12 border-b border-[var(--border-neutral-base)] pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="inline-flex items-center gap-2 border border-[var(--border-neutral-base)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-primary-600)]">
              <IconCalculator size={16} stroke={2.2} />
              <span>سکشن ۰۷ · توجیه مالی و مقایسهٔ سرمایه‌گذاری</span>
            </div>
            <span className="text-xs font-medium text-[var(--text-neutral-subtle)]">
              برآورد بر مبنای تعرفهٔ به‌روز چاپخانه‌ها و هزینه‌های سالانه
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold text-[var(--text-neutral-strong)] mb-4 leading-tight">
            ماشین‌حساب مقایسهٔ هزینهٔ چاپ در برابر تعرفهٔ رُخ‌نما
          </h2>
          <p className="text-base md:text-lg text-[var(--text-neutral-base)] max-w-3xl leading-relaxed">
            برآورد هزینه‌های پنهان چاپخانه، زینک و باطله شدن کاغذ با هر تغییر قیمت کالا؛ در برابر
            تعرفهٔ شفاف و یک‌بارهٔ کاتالوگ تعاملی بدون شارژ ماهانه.
          </p>
        </div>

        {/* بدنهٔ ماشین‌حساب: دو ستون مقایسه‌ای */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* ستون راست: تنظیمات و برآورد هزینه‌های چاپخانه (۷ ستون) */}
          <div className="lg:col-span-7 bg-white border border-[var(--border-neutral-base)] p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[var(--border-neutral-subtle)] pb-4 mb-6">
                <div className="flex items-center gap-2 text-[var(--text-neutral-strong)] font-bold text-lg">
                  <IconPrinter size={22} stroke={2.2} className="text-[var(--color-error-600)]" />
                  <span>برآورد هزینهٔ سنتی چاپخانه (سالانه)</span>
                </div>
                <span className="text-xs border border-[var(--color-error-300)] bg-[var(--color-error-50)] text-[var(--color-error-700)] px-2 py-1 font-semibold">
                  هزینهٔ سوخت‌شده و غیرقابل بازگشت
                </span>
              </div>

              {/* ورودی ۱: تعداد صفحات کاتالوگ */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-[var(--text-neutral-strong)]">
                    تعداد صفحات کاتالوگ چاپی یا PDF:
                  </label>
                  <span className="text-base font-black text-[var(--color-primary-600)] bg-[var(--color-primary-50)] border border-[var(--color-primary-200)] px-3 py-0.5">
                    {toFa(pages)} صفحه
                  </span>
                </div>

                {/* اسلایدر با ارقام فارسی */}
                <input
                  type="range"
                  min={10}
                  max={400}
                  step={5}
                  value={pages}
                  onChange={(e) => setPages(Number(e.target.value))}
                  className="w-full h-2 bg-[var(--color-neutral-200)] appearance-none cursor-pointer accent-[var(--color-primary-600)] rounded-none mb-3"
                />

                {/* کلیدهای سریع انتخاب صفحه */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-xs text-[var(--text-neutral-subtle)] self-center ml-2">
                    گام‌های متداول:
                  </span>
                  {PAGE_PRESETS.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPages(p)}
                      className={cn(
                        'text-xs px-2.5 py-1 border font-semibold transition-colors rounded-none',
                        pages === p
                          ? 'border-[var(--color-primary-600)] bg-[var(--color-primary-600)] text-white'
                          : 'border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] hover:bg-[var(--color-neutral-200)]'
                      )}
                    >
                      {toFa(p)} صفحه
                    </button>
                  ))}
                </div>
              </div>

              {/* ورودی ۲: تیراژ سالانه */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-[var(--text-neutral-strong)]">
                    تیراژ سالانه کاتالوگ (فرض ۱ نوبت چاپ در سال):
                  </label>
                  <span className="text-base font-black text-[var(--color-neutral-800)] bg-[var(--bg-neutral-base)] border border-[var(--border-neutral-base)] px-3 py-0.5">
                    {formatNumberFa(copies)} جلد
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {COPIES_PRESETS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCopies(c)}
                      className={cn(
                        'py-2.5 px-3 border text-center text-sm font-bold transition-all rounded-none',
                        copies === c
                          ? 'border-[var(--color-primary-600)] bg-[var(--color-primary-50)] text-[var(--color-primary-800)] ring-1 ring-[var(--color-primary-600)]'
                          : 'border-[var(--border-neutral-base)] bg-white text-[var(--text-neutral-base)] hover:bg-[var(--bg-neutral-subtle)]'
                      )}
                    >
                      {formatNumberFa(c)} نسخه
                    </button>
                  ))}
                </div>
              </div>

              {/* تفکیک اقلام هزینه چاپخانه */}
              <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] p-4 mb-6 text-sm space-y-2.5">
                <div className="text-xs font-bold text-[var(--text-neutral-subtle)] border-b border-[var(--border-neutral-base)] pb-2 mb-2">
                  ریزاقلام برآورد چاپخانه برای {toFa(pages)} صفحه و {formatNumberFa(copies)} نسخه:
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-neutral-base)]">
                    فیلم، زینک و لیتوگرافی ({toFa(calc.forms)} فرم ۴ رنگ):
                  </span>
                  <span className="font-semibold text-[var(--text-neutral-strong)]">
                    {formatTomans(calc.zincCost)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-neutral-base)]">
                    کاغذ گلاسه ۱۵۰ گرم و چاپ افست ({formatNumberFa(calc.sheetsCount)} برگ):
                  </span>
                  <span className="font-semibold text-[var(--text-neutral-strong)]">
                    {formatTomans(calc.paperCost)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-neutral-base)]">
                    سلفون جلد، صحافی چسب گرم و بسته‌بندی شیرینگ:
                  </span>
                  <span className="font-semibold text-[var(--text-neutral-strong)]">
                    {formatTomans(calc.bindingCost)}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[var(--border-neutral-subtle)] text-[var(--color-error-700)]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <IconAlertTriangle size={15} stroke={2.2} />
                    ریسک باطله شدن با تغییر قیمت و مشخصات (۲۵٪):
                  </span>
                  <span className="font-bold">{formatTomans(calc.wasteRiskCost)}</span>
                </div>
              </div>
            </div>

            {/* جمع کل هزینه چاپ سالانه */}
            <div className="border-t-2 border-[var(--color-error-600)] pt-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-xs font-semibold text-[var(--text-neutral-subtle)]">
                  مجموع هزینهٔ جاری چاپ سنتی در سال:
                </div>
                <div className="text-2xl md:text-3xl font-black text-[var(--color-error-600)]">
                  {formatTomans(calc.totalPrintCost)}
                </div>
              </div>
              <div className="text-left">
                <span className="inline-block text-[11px] text-[var(--text-neutral-subtle)] bg-[var(--color-neutral-100)] px-2.5 py-1 font-semibold border border-[var(--border-neutral-base)]">
                  هزینه‌ای که سال بعد مجدداً باید پرداخت شود
                </span>
              </div>
            </div>
          </div>

          {/* ستون چپ: سرمایه‌گذاری رُخ‌نما و صرفه‌جویی مالی (۵ ستون) */}
          <div className="lg:col-span-5 bg-white border-2 border-[var(--color-primary-600)] p-6 md:p-8 flex flex-col justify-between relative shadow-sm">
            {/* برچسب متمایز کننده */}
            <div className="absolute top-0 left-0 bg-[var(--color-primary-600)] text-white text-[11px] font-bold px-3 py-1 flex items-center gap-1">
              <IconSparkles size={14} stroke={2.2} />
              <span>سرمایه‌گذاری یک‌باره بدون اشتراک</span>
            </div>

            <div>
              <div className="border-b border-[var(--border-neutral-base)] pb-4 mb-6 pt-2">
                <div className="text-xs font-bold text-[var(--color-primary-600)] mb-1">
                  پکیج بهینه متناسب با حجم کاتالوگ شما:
                </div>
                <div className="text-xl md:text-2xl font-black text-[var(--text-neutral-strong)]">
                  {calc.recommendedTierName}
                </div>
              </div>

              {/* رقم تعرفه رُخ‌نما */}
              <div className="bg-[var(--color-primary-50)] border border-[var(--color-primary-200)] p-5 mb-6">
                <div className="text-xs text-[var(--text-neutral-subtle)] font-medium mb-1">
                  تعرفهٔ یک‌بارهٔ طراحی، تبدیل و استقرار:
                </div>
                <div className="text-3xl font-black text-[var(--color-primary-800)] mb-1">
                  {formatTomans(calc.recommendedCost)}
                </div>
                <div className="text-xs text-[var(--color-success-700)] font-semibold flex items-center gap-1">
                  <IconCheck size={14} stroke={2.2} />
                  <span>پرداخت یک‌باره برای همیشه · بدون اشتراک ماهیانه یا شارژ ارزی</span>
                </div>
              </div>

              {/* مقایسه صرفه‌جویی */}
              <div className="space-y-3 mb-6">
                <div className="p-4 border border-[var(--color-success-200)] bg-[var(--color-success-50)]">
                  <div className="text-xs font-bold text-[var(--color-success-800)] mb-1">
                    صرفه‌جویی خالص در سال اول:
                  </div>
                  <div className="text-2xl font-extrabold text-[var(--color-success-700)]">
                    {formatTomans(calc.yearOneSavings)}
                  </div>
                  <div className="text-xs text-[var(--text-neutral-base)] mt-1">
                    هزینهٔ استقرار رُخ‌نما در همان نوبت اول چاپ، به‌طور کامل بازمی‌گردد.
                  </div>
                </div>

                <div className="p-4 border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)]">
                  <div className="text-xs font-bold text-[var(--text-neutral-strong)] mb-1">
                    برآورد صرفه‌جویی تجمعی ۳ ساله:
                  </div>
                  <div className="text-xl font-black text-[var(--color-primary-700)]">
                    {formatTomans(calc.threeYearSavings)}
                  </div>
                  <div className="text-xs text-[var(--text-neutral-subtle)] mt-1">
                    حذف کامل ۳ نوبت هزینهٔ کاغذ، فیلم، زینک و تجدید چاپ.
                  </div>
                </div>
              </div>
            </div>

            {/* دکمه اکشن CTA */}
            <div className="pt-4 border-t border-[var(--border-neutral-base)]">
              <Button
                color="primary"
                variant="solid"
                size="lg"
                fullWidth
                iconAfter={<IconArrowLeft size={18} stroke={2.2} />}
                onClick={() => {
                  if (typeof window !== 'undefined') window.location.hash = 'demo';
                }}
              >
                ارسال کاتالوگ فعلی و درخواست دمو
              </Button>
              <p className="text-center text-xs text-[var(--text-neutral-subtle)] mt-2">
                آماده‌سازی نمونه تعاملی با اطلاعات کاتالوگ شما ظرف ۲۴ تا ۴۸ ساعت
              </p>
            </div>
          </div>
        </div>

        {/* باکس تمثیلی حفظ سبزی زمین (اثر زیست‌محیطی) */}
        <div className="border border-[var(--color-success-300)] bg-[var(--color-success-50)] p-6 md:p-8 mb-16">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-success-200)] pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-[var(--color-success-600)] text-white">
                <IconLeaf size={20} stroke={2.2} />
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[var(--color-success-900)]">
                  اثر زیست‌محیطی و حفظ سبزی زمین
                </h3>
                <p className="text-xs md:text-sm text-[var(--color-success-800)]">
                  سهم مستقیم سازمان شما در حفاظت از منابع طبیعی با جایگزینی کاتالوگ کاغذی
                </p>
              </div>
            </div>

            <span className="text-xs border border-[var(--color-success-400)] bg-white text-[var(--color-success-800)] px-3 py-1 font-semibold">
              مبنا: {formatNumberFa(calc.sheetsCount)} برگ کاغذ گلاسه در هر نوبت چاپ
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* شاخص ۱: درختان حفظ‌شده */}
            <div className="bg-white border border-[var(--color-success-200)] p-5">
              <div className="flex items-center gap-2 text-[var(--color-success-700)] text-xs font-bold mb-2">
                <IconTree size={18} stroke={2.2} />
                <span>درختان تنومند قطع‌نشده</span>
              </div>
              <div className="text-3xl font-black text-[var(--color-success-900)] mb-1">
                {formatDecimalFa(calc.treesSaved)} اصله
              </div>
              <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                جلوگیری از قطع درختان با عمر بیش از ۱۵ سال جهت تولید خمیر کاغذ ویرجین.
              </p>
            </div>

            {/* شاخص ۲: آب صرفه‌جویی‌شده */}
            <div className="bg-white border border-[var(--color-success-200)] p-5">
              <div className="flex items-center gap-2 text-[var(--color-primary-600)] text-xs font-bold mb-2">
                <IconDroplet size={18} stroke={2.2} />
                <span>کاهش مصرف آب شیرین</span>
              </div>
              <div className="text-3xl font-black text-[var(--color-primary-800)] mb-1">
                {formatNumberFa(calc.waterSavedLiters)} لیتر
              </div>
              <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                صرفه‌جویی در آب مصرفی برای فرآوری، سفیدسازی و شست‌وشوی شیمیایی کاغذ.
              </p>
            </div>

            {/* شاخص ۳: وزن کاغذ فیزیکی */}
            <div className="bg-white border border-[var(--color-success-200)] p-5">
              <div className="flex items-center gap-2 text-[var(--color-neutral-700)] text-xs font-bold mb-2">
                <IconFileText size={18} stroke={2.2} />
                <span>حجم کاغذ گلاسه صرفه‌جویی‌شده</span>
              </div>
              <div className="text-3xl font-black text-[var(--text-neutral-strong)] mb-1">
                {formatNumberFa(calc.paperWeightKg)} کیلوگرم
              </div>
              <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                حذف بار فیزیکی، هزینه‌های انبارداری و باطله شدن کارتن‌های چاپ‌شده در شرکت.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-xs text-[var(--color-success-900)] bg-white/70 border border-[var(--color-success-200)] p-3">
            <IconInfoCircle size={16} stroke={2.2} className="shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              تولید هر تن کاغذ گلاسه مستلزم قطع ۲۴ اصله درخت و مصرف ۱۰۰ هزار لیتر آب است. کاتالوگ تعاملی علاوه بر بازگشت کامل سرمایه، مسئولیت اجتماعی و پایداری زیست‌محیطی سازمان شما را محقق می‌کند.
            </span>
          </div>
        </div>

        {/* ۳ سطح شفاف تعرفه یک‌باره رُخ‌نما */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl md:text-3xl font-extrabold text-[var(--text-neutral-strong)] mb-3">
              ساختار شفاف تعرفهٔ یک‌باره در ۳ سطح
            </h3>
            <p className="text-sm md:text-base text-[var(--text-neutral-subtle)]">
              بدون اشتراک ماهیانه، بدون تمدید سالانه و بدون غافلگیری ارزی؛ همراه با تحویل کامل دسترسی‌ها.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING_TIERS.map((tier) => {
              const isRecommended = tier.id === calc.recommendedTierId;
              const displayPrice = pages > tier.pageThreshold ? tier.largePrice : tier.basePrice;

              return (
                <div
                  key={tier.id}
                  className={cn(
                    'bg-white border p-6 flex flex-col justify-between transition-all rounded-none relative',
                    isRecommended
                      ? 'border-2 border-[var(--color-primary-600)] shadow-md ring-1 ring-[var(--color-primary-500)]'
                      : 'border-[var(--border-neutral-base)] hover:border-[var(--color-primary-300)]'
                  )}
                >
                  {isRecommended && (
                    <div className="absolute -top-3.5 right-6 bg-[var(--color-primary-600)] text-white text-[11px] font-bold px-3 py-1">
                      پکیج پیشنهادی بر اساس حجم کاتالوگ شما
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-extrabold text-[var(--text-neutral-strong)]">
                        {tier.name}
                      </h4>
                      {tier.badge && (
                        <span className="text-[10px] font-bold bg-[var(--color-secondary-100)] text-[var(--color-secondary-900)] border border-[var(--color-secondary-300)] px-2 py-0.5">
                          {tier.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[var(--text-neutral-subtle)] mb-6 min-h-[32px]">
                      {tier.tagline}
                    </p>

                    <div className="border-y border-[var(--border-neutral-subtle)] py-4 mb-6 bg-[var(--bg-neutral-base)] px-3 -mx-3">
                      <div className="text-[11px] text-[var(--text-neutral-subtle)] mb-1">
                        تعرفه سرمایه‌گذاری یک‌باره:
                      </div>
                      <div className="text-2xl font-black text-[var(--color-primary-800)]">
                        {formatTomans(displayPrice)}
                      </div>
                      <div className="text-[11px] text-[var(--text-neutral-subtle)] mt-1">
                        برای کاتالوگ تا {toFa(tier.pageThreshold)} صفحه اختصاصی
                      </div>
                    </div>

                    {/* لیست امکانات */}
                    <div className="space-y-2.5 mb-8">
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[var(--text-neutral-base)]">
                          <IconCheck
                            size={16}
                            stroke={2.2}
                            className="text-[var(--color-success-600)] shrink-0 mt-0.5"
                          />
                          <span className="leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Button
                      color={isRecommended ? 'primary' : 'secondary'}
                      variant={isRecommended ? 'solid' : 'outline'}
                      size="md"
                      fullWidth
                      onClick={() => {
                        if (typeof window !== 'undefined') window.location.hash = 'demo';
                      }}
                    >
                      انتخاب پکیج و استعلام
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ۴ رکن زیرساخت بومی و امنیت داده‌ها (بخش ۰۹ IA) */}
        <div className="border border-[var(--border-neutral-base)] bg-white p-6 md:p-8">
          <div className="border-b border-[var(--border-neutral-subtle)] pb-4 mb-6">
            <h3 className="text-lg md:text-xl font-extrabold text-[var(--text-neutral-strong)] mb-1">
              مزیت‌های رقابتی زیرساخت بومی و امنیت داده‌ها
            </h3>
            <p className="text-xs md:text-sm text-[var(--text-neutral-subtle)]">
              پایداری فنی و تضمین حقوقی بدون وابستگی به سرورهای خارجی و بدون ریسک نوسان ارز.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* رکن ۱ */}
            <div className="border border-[var(--border-neutral-subtle)] p-4 bg-[var(--bg-neutral-base)]">
              <div className="p-2 w-fit bg-white border border-[var(--border-neutral-base)] text-[var(--color-primary-600)] mb-3">
                <IconCoins size={20} stroke={2.2} />
              </div>
              <h4 className="text-sm font-bold text-[var(--text-neutral-strong)] mb-1.5">
                تعرفهٔ شفاف و پرداخت ریالی
              </h4>
              <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                بدون ریسک نوسان نرخ ارز و حذف اشتراک‌های دلاری سنگین سرویس‌های خارجی.
              </p>
            </div>

            {/* رکن ۲ */}
            <div className="border border-[var(--border-neutral-subtle)] p-4 bg-[var(--bg-neutral-base)]">
              <div className="p-2 w-fit bg-white border border-[var(--border-neutral-base)] text-[var(--color-primary-600)] mb-3">
                <IconServerBolt size={20} stroke={2.2} />
              </div>
              <h4 className="text-sm font-bold text-[var(--text-neutral-strong)] mb-1.5">
                لود سریع روی شبکهٔ داخلی
              </h4>
              <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                میزبانی روی شبکه توزیع محتوای ابری داخلی (CDN)، با ترافیک نیم‌بها و بدون فیلترشکن.
              </p>
            </div>

            {/* رکن ۳ */}
            <div className="border border-[var(--border-neutral-subtle)] p-4 bg-[var(--bg-neutral-base)]">
              <div className="p-2 w-fit bg-white border border-[var(--border-neutral-base)] text-[var(--color-primary-600)] mb-3">
                <IconShieldLock size={20} stroke={2.2} />
              </div>
              <h4 className="text-sm font-bold text-[var(--text-neutral-strong)] mb-1.5">
                پایداری در برابر تحریم و قطعی
              </h4>
              <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                تضمین باز شدن پایدار کاتالوگ در حساس‌ترین روزهای نمایشگاهی و جلسات مهم سازمانی.
              </p>
            </div>

            {/* رکن ۴ */}
            <div className="border border-[var(--border-neutral-subtle)] p-4 bg-[var(--bg-neutral-base)]">
              <div className="p-2 w-fit bg-white border border-[var(--border-neutral-base)] text-[var(--color-primary-600)] mb-3">
                <IconFileCheck size={20} stroke={2.2} />
              </div>
              <h4 className="text-sm font-bold text-[var(--text-neutral-strong)] mb-1.5">
                تعهد محرمانگی رسمی (NDA)
              </h4>
              <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                محفوظ ماندن کامل لیست قیمت‌ها، مستندات محرمانه و مشخصات فنی تحت قرارداد رسمی حقوقی.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
