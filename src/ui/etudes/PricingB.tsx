'use client';

import { useState, useMemo } from 'react';
import {
  IconReceipt2,
  IconScale,
  IconCertificate,
  IconShieldCheck,
  IconCoins,
  IconServerBolt,
  IconFileCheck,
  IconFlame,
  IconArrowLeft,
  IconBuildingWarehouse,
  IconSignature,
  IconTree,
  IconDroplet,
  IconLeaf,
  IconCheck,
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
  type PricingTier,
} from './pricingCalculations';

const PAGE_STEPS = [20, 40, 80, 120, 200, 350];
const COPY_STEPS = [500, 1000, 2000, 5000];

export default function PricingB() {
  const [pages, setPages] = useState<number>(40);
  const [copies, setCopies] = useState<number>(1000);
  const [selectedTierId, setSelectedTierId] = useState<'template' | 'bespoke' | 'enterprise'>('bespoke');

  const calc = useMemo(() => calculatePrintAndRokhnama(pages, copies), [pages, copies]);

  // پکیج انتخابی کاربر در تب‌ها
  const activeTier: PricingTier = useMemo(() => {
    return PRICING_TIERS.find((t) => t.id === selectedTierId) || PRICING_TIERS[1];
  }, [selectedTierId]);

  const activeTierPrice = useMemo(() => {
    return pages > activeTier.pageThreshold ? activeTier.largePrice : activeTier.basePrice;
  }, [pages, activeTier]);

  // محاسبه ماه‌های بازگشت سرمایه
  const roiMonths = useMemo(() => {
    if (calc.totalPrintCost <= 0) return '۴';
    const months = (activeTierPrice / calc.totalPrintCost) * 12;
    return formatDecimalFa(Math.max(1, months), 1);
  }, [activeTierPrice, calc.totalPrintCost]);

  // سود ۳ ساله
  const threeYearNetSavings = useMemo(() => {
    return Math.max(0, calc.totalPrintCost * 3 - activeTierPrice);
  }, [calc.totalPrintCost, activeTierPrice]);

  return (
    <section
      id="pricing-b"
      dir="rtl"
      className="relative bg-[var(--bg-neutral-subtle)] text-[var(--text-neutral-base)] font-sans py-20 px-4 md:px-8 border-b border-[var(--border-neutral-subtle)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* سربرگ استعاره ترازنامه */}
        <div className="mb-10 bg-white border border-[var(--border-neutral-base)] p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-neutral-subtle)] pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)]">
                <IconScale size={18} stroke={2.2} />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-neutral-strong)]">
                ترازنامهٔ مالی و حسابرسی کاتالوگ · اتود ۲
              </span>
            </div>
            <div className="text-xs text-[var(--text-neutral-subtle)] font-medium">
              صورت تطبیق هزینهٔ جاری مصرفی در برابر تملک دارایی دیجیتال
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-neutral-strong)] mb-3">
            فاکتور ترازنامه‌ای: چاپ مکرر سالانه یا یک‌بار سرمایه‌گذاری پایدار؟
          </h2>
          <p className="text-sm md:text-base text-[var(--text-neutral-base)] max-w-4xl leading-relaxed">
            وقتی قیمت کالا، موجودی انبار یا مشخصات فنی تغییر می‌کند، کاتالوگ کاغذی باطله می‌شود و
            باید از نو چاپ شود؛ اما کاتالوگ تعاملی رُخ‌نما با یک کلیک به‌روز می‌ماند و ارزش سازمانی
            شما را حفظ می‌کند.
          </p>

          {/* نوار تنظیم سریع پارامترهای کاتالوگ */}
          <div className="mt-6 pt-6 border-t border-[var(--border-neutral-base)] grid grid-cols-1 md:grid-cols-2 gap-6 bg-[var(--bg-neutral-base)] p-4">
            {/* انتخاب صفحات */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-[var(--text-neutral-strong)] mb-2">
                <span>تعداد صفحات نسخهٔ فیزیکی:</span>
                <span className="text-[var(--color-primary-700)] font-black text-sm">
                  {toFa(pages)} صفحه
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PAGE_STEPS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPages(p)}
                    className={cn(
                      'px-3 py-1.5 text-xs font-bold transition-all rounded-none',
                      pages === p
                        ? 'bg-[var(--color-neutral-900)] text-white'
                        : 'bg-white border border-[var(--border-neutral-base)] text-[var(--text-neutral-base)] hover:bg-[var(--color-neutral-100)]'
                    )}
                  >
                    {toFa(p)} ص
                  </button>
                ))}
              </div>
            </div>

            {/* انتخاب تیراژ */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold text-[var(--text-neutral-strong)] mb-2">
                <span>تیراژ نوبت چاپ (سالانه):</span>
                <span className="text-[var(--text-neutral-strong)] font-black text-sm">
                  {formatNumberFa(copies)} نسخه
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {COPY_STEPS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCopies(c)}
                    className={cn(
                      'px-3 py-1.5 text-xs font-bold transition-all rounded-none',
                      copies === c
                        ? 'bg-[var(--color-neutral-900)] text-white'
                        : 'bg-white border border-[var(--border-neutral-base)] text-[var(--text-neutral-base)] hover:bg-[var(--color-neutral-100)]'
                    )}
                  >
                    {formatNumberFa(c)} نسخه
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* مقایسهٔ ترازنامه‌ای دو ستونه */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-stretch">
          {/* ستون راست: صورت‌حساب چاپخانه (استایل فاکتور رسمی) */}
          <div className="lg:col-span-6 bg-white border border-[var(--border-neutral-base)] p-6 md:p-8 flex flex-col justify-between relative">
            <div className="absolute top-0 right-0 left-0 h-1 bg-[var(--color-error-600)]" />

            <div>
              <div className="flex items-start justify-between border-b border-[var(--border-neutral-base)] pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-error-700)] mb-1">
                    <IconReceipt2 size={16} stroke={2.2} />
                    <span>برگهٔ استعلام و هزینهٔ چاپخانه</span>
                  </div>
                  <div className="text-xl font-extrabold text-[var(--text-neutral-strong)]">
                    صورت‌حساب تخمینی سالانه
                  </div>
                </div>

                <div className="text-left text-[11px] text-[var(--text-neutral-subtle)] font-mono">
                  <div>کد: PRN-{toFa(pages)}-{toFa(copies)}</div>
                  <div>وضعیت: بدهکار مصرفی</div>
                </div>
              </div>

              {/* جدول اقلام فاکتور */}
              <div className="mb-6">
                <table className="w-full text-xs text-right border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--border-neutral-base)] text-[var(--text-neutral-subtle)]">
                      <th className="py-2 font-bold">شرح هزینه</th>
                      <th className="py-2 text-center font-bold">مقدار</th>
                      <th className="py-2 text-left font-bold">مبلغ (تومان)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-neutral-subtle)]">
                    <tr>
                      <td className="py-3 font-semibold text-[var(--text-neutral-strong)]">
                        لیتوگرافی و ساخت زینک افست
                      </td>
                      <td className="py-3 text-center text-[var(--text-neutral-base)]">
                        {toFa(calc.forms)} فرم ۴ رنگ
                      </td>
                      <td className="py-3 text-left font-bold text-[var(--text-neutral-strong)]">
                        {formatNumberFa(calc.zincCost)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-[var(--text-neutral-strong)]">
                        کاغذ گلاسه ۱۵۰ گرم و چاپ رنگی
                      </td>
                      <td className="py-3 text-center text-[var(--text-neutral-base)]">
                        {formatNumberFa(calc.sheetsCount)} برگ
                      </td>
                      <td className="py-3 text-left font-bold text-[var(--text-neutral-strong)]">
                        {formatNumberFa(calc.paperCost)}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-[var(--text-neutral-strong)]">
                        سلفون، صحافی حرارتی و شیرینگ
                      </td>
                      <td className="py-3 text-center text-[var(--text-neutral-base)]">
                        {formatNumberFa(copies)} جلد
                      </td>
                      <td className="py-3 text-left font-bold text-[var(--text-neutral-strong)]">
                        {formatNumberFa(calc.bindingCost)}
                      </td>
                    </tr>
                    <tr className="bg-[var(--color-error-50)]">
                      <td className="py-3 px-2 font-semibold text-[var(--color-error-800)] flex items-center gap-1">
                        <IconFlame size={14} stroke={2.2} />
                        ریسک باطله شدن با تغییر مشخصات
                      </td>
                      <td className="py-3 text-center text-[var(--color-error-800)]">۲۵٪ برآورد</td>
                      <td className="py-3 px-2 text-left font-bold text-[var(--color-error-800)]">
                        {formatNumberFa(calc.wasteRiskCost)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* هشدار پنهان چاپ */}
              <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] p-3 mb-6 text-xs text-[var(--text-neutral-base)] space-y-1">
                <div className="font-bold text-[var(--text-neutral-strong)] flex items-center gap-1">
                  <IconBuildingWarehouse size={14} stroke={2.2} />
                  هزینه‌های ثانویهٔ غیرمستقیم:
                </div>
                <p className="text-[var(--text-neutral-subtle)] leading-relaxed">
                  هزینهٔ حمل‌ونقل کارتن‌های سنگین به انبار، توزیع در غرفه‌ها و عدم امکان ویرایش حتی یک رقم قیمت بدون دور ریختن کل نسخه‌ها.
                </p>
              </div>
            </div>

            {/* جمع کل فاکتور چاپ */}
            <div className="border-t-2 border-[var(--border-neutral-strong)] pt-4">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs font-bold text-[var(--text-neutral-subtle)]">
                  جمع کل هزینهٔ نوبت چاپ سالانه:
                </span>
                <span className="text-2xl font-black text-[var(--color-error-600)]">
                  {formatTomans(calc.totalPrintCost)}
                </span>
              </div>
              <div className="text-left text-[11px] text-[var(--text-neutral-subtle)]">
                مبلغی که هر سال مجدداً از بودجهٔ بازاریابی کسر می‌شود.
              </div>
            </div>
          </div>

          {/* ستون چپ: سند سرمایه‌گذاری رُخ‌نما با قاب طلایی */}
          <div className="lg:col-span-6 bg-white border-2 border-[var(--color-secondary-500)] p-6 md:p-8 flex flex-col justify-between relative shadow-md">
            {/* قاب طلایی بالا و نشان برتری */}
            <div className="flex items-center justify-between border-b border-[var(--color-secondary-300)] pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)]">
                  <IconCertificate size={18} stroke={2.2} />
                </span>
                <div>
                  <div className="text-xs font-bold text-[var(--color-secondary-800)]">
                    سند سرمایه‌گذاری پایدار رُخ‌نما
                  </div>
                  <div className="text-lg font-black text-[var(--text-neutral-strong)]">
                    یک‌بار برای همیشه؛ بدون شارژ ادواری
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-bold bg-[var(--color-secondary-100)] text-[var(--color-secondary-900)] border border-[var(--color-secondary-300)] px-2.5 py-1">
                قابلیت تملک قطعی
              </span>
            </div>

            <div>
              {/* گزینشگر پکیج‌ها در کارت طلایی */}
              <div className="mb-4">
                <div className="text-xs font-bold text-[var(--text-neutral-strong)] mb-2">
                  انتخاب سطح استقرار مورد نظر:
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {PRICING_TIERS.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setSelectedTierId(tier.id)}
                      className={cn(
                        'p-2 text-center text-xs font-bold transition-all border rounded-none',
                        selectedTierId === tier.id
                          ? 'border-[var(--color-secondary-600)] bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)]'
                          : 'border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] hover:bg-[var(--color-secondary-50)]'
                      )}
                    >
                      {tier.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* کادر تعرفه شفاف */}
              <div className="bg-[var(--color-secondary-50)] border border-[var(--color-secondary-300)] p-4 mb-5">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <span className="text-xs font-bold text-[var(--color-secondary-900)] block">
                      {activeTier.name}
                    </span>
                    <span className="text-[11px] text-[var(--color-secondary-800)]">
                      {activeTier.tagline}
                    </span>
                  </div>
                  <span className="text-2xl font-black text-[var(--color-secondary-950)]">
                    {formatTomans(activeTierPrice)}
                  </span>
                </div>
                <div className="text-[11px] text-[var(--color-secondary-800)] pt-2 border-t border-[var(--color-secondary-200)] flex items-center gap-1">
                  <IconCheck size={14} stroke={2.2} />
                  <span>تعرفه یک‌باره برای کاتالوگ شما · بدون هزینه تمدید سالانه</span>
                </div>
              </div>

              {/* شاخص دوره بازگشت سرمایه و سود تجمعی ۳ ساله */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="border border-[var(--color-success-300)] bg-[var(--color-success-50)] p-3">
                  <div className="text-[11px] font-bold text-[var(--color-success-800)]">
                    دوره بازگشت سرمایه (ROI):
                  </div>
                  <div className="text-xl font-black text-[var(--color-success-700)] mt-0.5">
                    کمتر از {roiMonths} ماه
                  </div>
                  <div className="text-[10px] text-[var(--text-neutral-subtle)] mt-1">
                    در مقایسه با نوبت اول چاپ
                  </div>
                </div>

                <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] p-3">
                  <div className="text-[11px] font-bold text-[var(--text-neutral-strong)]">
                    سود تجمعی ۳ ساله:
                  </div>
                  <div className="text-xl font-black text-[var(--color-primary-700)] mt-0.5">
                    {formatTomans(threeYearNetSavings)}
                  </div>
                  <div className="text-[10px] text-[var(--text-neutral-subtle)] mt-1">
                    صرفه‌جویی خالص در ۳ نوبت چاپ
                  </div>
                </div>
              </div>

              {/* امکانات کلیدی پکیج انتخاب‌شده */}
              <div className="space-y-2 mb-6 text-xs text-[var(--text-neutral-base)]">
                {activeTier.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <IconCheck size={15} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* دکمه اکشن طلایی */}
            <div className="pt-4 border-t border-[var(--color-secondary-300)]">
              <Button
                color="secondary"
                variant="solid"
                size="lg"
                fullWidth
                iconAfter={<IconArrowLeft size={18} stroke={2.2} />}
                onClick={() => {
                  if (typeof window !== 'undefined') window.location.hash = 'demo';
                }}
              >
                درخواست دمو و پیش‌فاکتور رسمی
              </Button>
              <div className="text-center text-[11px] text-[var(--text-neutral-subtle)] mt-2">
                صدور پیش‌فاکتور معتبر شرکتی با مهر و شناسه ملی ظرف چند ساعت
              </div>
            </div>
          </div>
        </div>

        {/* ترازنامهٔ زیست‌محیطی سازمان (سبزی زمین) */}
        <div className="bg-white border border-[var(--border-neutral-base)] p-6 md:p-8 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-neutral-subtle)] pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-[var(--color-success-100)] text-[var(--color-success-700)]">
                <IconLeaf size={20} stroke={2.2} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-[var(--text-neutral-strong)]">
                  بیلان پایداری و حفاظت از منابع طبیعی
                </h3>
                <p className="text-xs text-[var(--text-neutral-subtle)]">
                  حفظ ذخایر حیاتی در هر نوبت جایگزینی کاغذ کاتالوگ با نسخهٔ تعاملی
                </p>
              </div>
            </div>

            <span className="text-xs border border-[var(--color-success-300)] bg-[var(--color-success-50)] text-[var(--color-success-800)] px-3 py-1 font-semibold">
              صرفه‌جویی {formatNumberFa(calc.sheetsCount)} برگ A4 گلاسه در سال
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[var(--border-neutral-base)] p-4 bg-[var(--bg-neutral-base)] flex items-center gap-4">
              <div className="p-3 bg-white border border-[var(--color-success-300)] text-[var(--color-success-700)] shrink-0">
                <IconTree size={24} stroke={2.2} />
              </div>
              <div>
                <div className="text-2xl font-black text-[var(--text-neutral-strong)]">
                  {formatDecimalFa(calc.treesSaved)} اصله
                </div>
                <div className="text-xs text-[var(--text-neutral-subtle)]">
                  درختان تنومند جنگلی حفظ‌شده از قطع
                </div>
              </div>
            </div>

            <div className="border border-[var(--border-neutral-base)] p-4 bg-[var(--bg-neutral-base)] flex items-center gap-4">
              <div className="p-3 bg-white border border-[var(--color-primary-300)] text-[var(--color-primary-600)] shrink-0">
                <IconDroplet size={24} stroke={2.2} />
              </div>
              <div>
                <div className="text-2xl font-black text-[var(--text-neutral-strong)]">
                  {formatNumberFa(calc.waterSavedLiters)} لیتر
                </div>
                <div className="text-xs text-[var(--text-neutral-subtle)]">
                  کاهش مصرف آب شیرین صنعتی
                </div>
              </div>
            </div>

            <div className="border border-[var(--border-neutral-base)] p-4 bg-[var(--bg-neutral-base)] flex items-center gap-4">
              <div className="p-3 bg-white border border-[var(--border-neutral-base)] text-[var(--text-neutral-700)] shrink-0">
                <IconScale size={24} stroke={2.2} />
              </div>
              <div>
                <div className="text-2xl font-black text-[var(--text-neutral-strong)]">
                  {formatNumberFa(calc.paperWeightKg)} کیلوگرم
                </div>
                <div className="text-xs text-[var(--text-neutral-subtle)]">
                  کاهش وزن پسماند و باطله کاغذی
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* گواهی امنیت اطلاعات، قرارداد NDA و زیرساخت بومی */}
        <div className="bg-white border-2 border-[var(--color-primary-700)] p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-neutral-base)] pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="p-2.5 bg-[var(--color-primary-700)] text-white">
                <IconShieldCheck size={22} stroke={2.2} />
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-extrabold text-[var(--text-neutral-strong)]">
                  تضمین‌های حقوقی، امنیت داده و زیرساخت پایدار بومی
                </h3>
                <p className="text-xs md:text-sm text-[var(--text-neutral-subtle)]">
                  پروتکل‌های معتبر شرکتی برای حفظ محرمانگی کامل قیمت‌ها و دسترسی بدون وقفه
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-primary-700)] bg-[var(--color-primary-50)] border border-[var(--color-primary-200)] px-3 py-1.5">
              <IconSignature size={16} stroke={2.2} />
              <span>قرارداد رسمی عدم افشا (NDA)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-[var(--border-neutral-base)] p-4 bg-[var(--bg-neutral-base)]">
              <div className="flex items-center gap-2 font-bold text-sm text-[var(--text-neutral-strong)] mb-2">
                <IconFileCheck size={18} stroke={2.2} className="text-[var(--color-primary-600)]" />
                <span>محرمانگی حقوقی (NDA)</span>
              </div>
              <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                امضای قرارداد رسمی عدم افشا پیش از دریافت اطلاعات؛ لیست قیمت‌ها و اسناد فنی کاملاً محفوظ می‌مانند.
              </p>
            </div>

            <div className="border border-[var(--border-neutral-base)] p-4 bg-[var(--bg-neutral-base)]">
              <div className="flex items-center gap-2 font-bold text-sm text-[var(--text-neutral-strong)] mb-2">
                <IconCoins size={18} stroke={2.2} className="text-[var(--color-primary-600)]" />
                <span>تعرفهٔ شفاف ریالی</span>
              </div>
              <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                پرداخت تمام‌ریالی بدون ارتباط با نوسانات نرخ ارز و بدون نیاز به درگاه‌های ارزی بین‌المللی.
              </p>
            </div>

            <div className="border border-[var(--border-neutral-base)] p-4 bg-[var(--bg-neutral-base)]">
              <div className="flex items-center gap-2 font-bold text-sm text-[var(--text-neutral-strong)] mb-2">
                <IconServerBolt size={18} stroke={2.2} className="text-[var(--color-primary-600)]" />
                <span>CDN ابری داخلی (نیم‌بها)</span>
              </div>
              <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                توزیع محتوا روی سرورهای داخلی؛ باز شدن سریع کاتالوگ با ترافیک نیم‌بها و بدون نیاز به فیلترشکن.
              </p>
            </div>

            <div className="border border-[var(--border-neutral-base)] p-4 bg-[var(--bg-neutral-base)]">
              <div className="flex items-center gap-2 font-bold text-sm text-[var(--text-neutral-strong)] mb-2">
                <IconShieldCheck size={18} stroke={2.2} className="text-[var(--color-primary-600)]" />
                <span>پایداری در جلسات B2B</span>
              </div>
              <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                تضمین کارکرد بدون اختلال در نمایشگاه‌های بین‌المللی و مذاکرات تجاری، حتی با افت شبکه.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
