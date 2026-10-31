'use client';

import { useState, useMemo } from 'react';
import {
  IconCalculator,
  IconCheck,
  IconArrowLeft,
  IconCoins,
  IconServerBolt,
  IconShieldCheck,
  IconFileCheck,
  IconTree,
  IconDroplet,
  IconLeaf,
  IconSignature,
  IconBuildingSkyscraper,
  IconAdjustmentsHorizontal,
  IconSparkles,
} from '@tabler/icons-react';
import { Button } from '@/ui/Button';
import { cn } from '@/lib/utils';
import {
  toFa,
  formatNumberFa,
  formatTomans,
  formatDecimalFa,
  calculatePrintAndRokhnama,
} from './pricingCalculations';

const PAGE_OPTIONS = [20, 40, 80, 160, 250];
const COPY_OPTIONS = [500, 1000, 2000, 5000];

interface LadderFeature {
  title: string;
  template: boolean | string;
  bespoke: boolean | string;
  enterprise: boolean | string;
}

const COMPARISON_FEATURES: LadderFeature[] = [
  { title: 'صفحات اختصاصی بهینه‌شده', template: 'تا ۳۰ صفحه', bespoke: 'تا ۶۰ صفحه', enterprise: 'نامحدود سازمانی' },
  { title: 'زمان استقرار و تحویل', template: '۴۸ تا ۷۲ ساعت', bespoke: '۵ تا ۷ روز کاری', enterprise: 'برنامه اختصاصی' },
  { title: 'پاپ‌آپ‌های فنی (Hotspot) روی قطعات', template: false, bespoke: true, enterprise: true },
  { title: 'مدل سه‌بعدی ۳۶۰° و ویدیو خط تولید', template: false, bespoke: true, enterprise: true },
  { title: 'صدور برگ سفارش استاندارد A4 انبار', template: false, bespoke: true, enterprise: true },
  { title: 'سوئیچ ارزی (ریال / دلار) برای صادرات', template: false, bespoke: true, enterprise: true },
  { title: 'اتصال فرم استعلام پیامکی (SMS OTP)', template: true, bespoke: true, enterprise: true },
  { title: 'اتصال مستقیم به CRM و انبارداری', template: false, bespoke: false, enterprise: true },
  { title: 'قیمت‌گذاری نقش‌محور (همکار / نماینده)', template: false, bespoke: false, enterprise: true },
  { title: 'دامنه اختصاصی مستقل + SSL بومی', template: false, bespoke: true, enterprise: true },
  { title: 'قرارداد رسمی عدم افشا (NDA)', template: true, bespoke: true, enterprise: true },
];

export default function PricingC() {
  const [pages, setPages] = useState<number>(40);
  const [copies, setCopies] = useState<number>(1000);

  const calc = useMemo(() => calculatePrintAndRokhnama(pages, copies), [pages, copies]);

  return (
    <section
      id="pricing-c"
      dir="rtl"
      className="relative bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] font-sans py-20 px-4 md:px-8 border-b border-[var(--border-neutral-subtle)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* سربرگ بخش */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 border border-[var(--border-neutral-base)] bg-white px-3.5 py-1.5 text-xs font-bold text-[var(--color-primary-600)] mb-3">
            <IconBuildingSkyscraper size={16} stroke={2.2} />
            <span>نردبان تعرفهٔ اقتصادی و زیرساخت بومی · اتود ۳</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold text-[var(--text-neutral-strong)] mb-3">
            ساختار شفاف تعرفهٔ یک‌باره؛ زیرساخت بومی و امنیت داده‌ها
          </h2>
          <p className="text-sm md:text-base text-[var(--text-neutral-base)] leading-relaxed">
            بدون آبونمان ماهانه و بدون غافلگیری ارزی؛ با تضمین دسترسی پایدار بر بستر CDN داخلی،
            قرارداد رسمی عدم افشا (NDA) و صرفه‌جویی چشمگیر در مقایسه با چاپخانه.
          </p>
        </div>

        {/* نوار تنظیم مشخصات و برآورد سریع مقایسه با چاپ */}
        <div className="bg-white border border-[var(--border-neutral-base)] p-5 md:p-6 mb-12 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-neutral-strong)] mb-4 border-b border-[var(--border-neutral-subtle)] pb-3">
            <IconAdjustmentsHorizontal size={18} stroke={2.2} className="text-[var(--color-primary-600)]" />
            <span>تنظیم مشخصات کاتالوگ شما جهت محاسبه مقایسه‌ای:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* انتخاب صفحات */}
            <div className="md:col-span-4">
              <label className="block text-xs font-semibold text-[var(--text-neutral-subtle)] mb-2">
                تعداد صفحات کاتالوگ فعلی:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {PAGE_OPTIONS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPages(p)}
                    className={cn(
                      'px-3 py-1.5 text-xs font-bold transition-all border rounded-none',
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

            {/* انتخاب تیراژ */}
            <div className="md:col-span-4">
              <label className="block text-xs font-semibold text-[var(--text-neutral-subtle)] mb-2">
                تیراژ سالانه (۱ نوبت چاپ):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {COPY_OPTIONS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCopies(c)}
                    className={cn(
                      'px-3 py-1.5 text-xs font-bold transition-all border rounded-none',
                      copies === c
                        ? 'border-[var(--color-primary-600)] bg-[var(--color-primary-600)] text-white'
                        : 'border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] hover:bg-[var(--color-neutral-200)]'
                    )}
                  >
                    {formatNumberFa(c)} جلد
                  </button>
                ))}
              </div>
            </div>

            {/* خلاصه برآورد هزینه چاپ سالانه کاتالوگ فعلی */}
            <div className="md:col-span-4 bg-[var(--color-error-50)] border border-[var(--color-error-200)] p-3 text-right">
              <div className="text-[11px] font-bold text-[var(--color-error-700)] mb-0.5">
                برآورد هزینهٔ سنتی چاپخانه برای این تیراژ:
              </div>
              <div className="text-xl font-black text-[var(--color-error-800)]">
                {formatTomans(calc.totalPrintCost)}
              </div>
              <div className="text-[10px] text-[var(--color-error-700)] mt-0.5">
                شامل زینک، گلاسه، صحافی و ۲۵٪ ریسک باطله شدن
              </div>
            </div>
          </div>
        </div>

        {/* نردبان ۳ ستونه تعرفه یک‌باره */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-stretch">
          {/* پله ۱: قالب نیمه‌آماده */}
          <div className="bg-white border border-[var(--border-neutral-base)] p-6 md:p-8 flex flex-col justify-between rounded-none hover:border-[var(--color-primary-400)] transition-all">
            <div>
              <div className="text-xs font-bold text-[var(--color-primary-600)] mb-1">
                سطح ۱ · استقرار پایه
              </div>
              <h3 className="text-xl font-black text-[var(--text-neutral-strong)] mb-2">
                قالب نیمه‌آماده (Template)
              </h3>
              <p className="text-xs text-[var(--text-neutral-subtle)] mb-6 min-h-[36px]">
                مناسب شرکت‌هایی که نیاز به تبدیل سریع و کم‌هزینه کاتالوگ به ساختار دیجیتال پایدار دارند.
              </p>

              <div className="bg-[var(--bg-neutral-base)] border border-[var(--border-neutral-subtle)] p-4 mb-6">
                <div className="text-[11px] text-[var(--text-neutral-subtle)] mb-1">تعرفه یک‌باره:</div>
                <div className="text-2xl font-black text-[var(--text-neutral-strong)]">
                  ۱۹٬۵۰۰٬۰۰۰ تومان
                </div>
                <div className="text-[11px] text-[var(--color-success-700)] font-semibold mt-1">
                  بدون اشتراک ماهیانه یا شارژ ارزی
                </div>
              </div>

              <div className="space-y-3 mb-8 text-xs text-[var(--text-neutral-base)]">
                <div className="flex items-center gap-2">
                  <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                  <span>طراحی ساختاریافته تا ۳۰ صفحه اختصاصی</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                  <span>جست‌وجوی سریع کد کالا با ارقام فارسی</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                  <span>عملکرد آفلاین روی گوشی خریداران (PWA)</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                  <span>میزبانی روی CDN ابری داخلی با ترافیک نیم‌بها</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                  <span>قرارداد رسمی عدم افشا (NDA)</span>
                </div>
              </div>
            </div>

            <Button
              color="primary"
              variant="outline"
              size="md"
              fullWidth
              onClick={() => {
                if (typeof window !== 'undefined') window.location.hash = 'demo';
              }}
            >
              انتخاب قالب نیمه‌آماده
            </Button>
          </div>

          {/* پله ۲: طراحی اختصاصی (برجسته و پیشنهادی) */}
          <div className="bg-white border-2 border-[var(--color-primary-600)] p-6 md:p-8 flex flex-col justify-between rounded-none shadow-lg relative">
            <div className="absolute -top-3.5 right-6 bg-[var(--color-primary-600)] text-white text-[11px] font-bold px-3 py-1 flex items-center gap-1">
              <IconSparkles size={14} stroke={2.2} />
              <span>پیشنهاد اول صنایع و تولیدکنندگان</span>
            </div>

            <div>
              <div className="text-xs font-bold text-[var(--color-secondary-600)] mb-1">
                سطح ۲ · کامل و سفارشی
              </div>
              <h3 className="text-xl font-black text-[var(--text-neutral-strong)] mb-2">
                طراحی اختصاصی (Bespoke)
              </h3>
              <p className="text-xs text-[var(--text-neutral-subtle)] mb-6 min-h-[36px]">
                طراحی هویت بصری منطبق بر برندبوک همراه با لایه‌های پاپ‌آپ فنی، ویدیو و صدور سفارش.
              </p>

              <div className="bg-[var(--color-primary-50)] border border-[var(--color-primary-200)] p-4 mb-6">
                <div className="text-[11px] text-[var(--color-primary-700)] mb-1 font-bold">
                  تعرفه یک‌باره استقرار کامل:
                </div>
                <div className="text-3xl font-black text-[var(--color-primary-900)]">
                  ۳۹٬۰۰۰٬۰۰۰ تومان
                </div>
                <div className="text-[11px] text-[var(--color-success-700)] font-semibold mt-1">
                  صرفه‌جویی بیش از {formatTomans(Math.max(0, calc.totalPrintCost - 39000000))} در سال اول
                </div>
              </div>

              <div className="space-y-3 mb-8 text-xs text-[var(--text-neutral-base)]">
                <div className="flex items-center gap-2 font-semibold">
                  <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                  <span>طراحی اختصاصی لایه‌ها تا ۶۰ صفحه کاتالوگ</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                  <span>پاپ‌آپ‌های فنی (Hotspot) برای ابعاد و نقشه‌ها</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                  <span>نمایش ویدیو خط تولید و بررسی ۳۶۰ درجه قطعات</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                  <span>صدور خودکار برگ سفارش استاندارد A4 برای انبار</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                  <span>سوئیچ ارزی (ریال/دلار) و نسخه چندزبانه</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                  <span>دامنه اختصاصی با SSL بومی و قرارداد رسمی NDA</span>
                </div>
              </div>
            </div>

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
              انتخاب پکیج طراحی اختصاصی
            </Button>
          </div>

          {/* پله ۳: پکیج سازمانی */}
          <div className="bg-white border border-[var(--border-neutral-base)] p-6 md:p-8 flex flex-col justify-between rounded-none hover:border-[var(--color-primary-400)] transition-all">
            <div>
              <div className="text-xs font-bold text-[var(--color-primary-600)] mb-1">
                سطح ۳ · سازمانی و هلدینگی
              </div>
              <h3 className="text-xl font-black text-[var(--text-neutral-strong)] mb-2">
                پکیج سازمانی (Enterprise)
              </h3>
              <p className="text-xs text-[var(--text-neutral-subtle)] mb-6 min-h-[36px]">
                برای تولیدکنندگان بزرگ با تنوع بالای کالا، نیاز به اتصال به CRM، انبارداری و قیمت همکاری.
              </p>

              <div className="bg-[var(--bg-neutral-base)] border border-[var(--border-neutral-subtle)] p-4 mb-6">
                <div className="text-[11px] text-[var(--text-neutral-subtle)] mb-1">تعرفه یک‌باره:</div>
                <div className="text-2xl font-black text-[var(--text-neutral-strong)]">
                  ۶۸٬۰۰۰٬۰۰۰ تومان
                </div>
                <div className="text-[11px] text-[var(--color-success-700)] font-semibold mt-1">
                  پشتیبانی اختصاصی مهندسان و آموزش تیم فروش
                </div>
              </div>

              <div className="space-y-3 mb-8 text-xs text-[var(--text-neutral-base)]">
                <div className="flex items-center gap-2">
                  <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                  <span>پوشش کامل کاتالوگ‌های جامع و نامحدود</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                  <span>اتصال مستقیم به سامانه انبارداری و CRM</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                  <span>قیمت‌گذاری چندسطحی (همکار / نماینده / خریدار)</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                  <span>پایشگر دقیق توقف خریدار و صفحات رهاشده</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)] shrink-0" />
                  <span>پشتیبانی اولویت‌دار و تضمین کارکرد در نمایشگاه‌ها</span>
                </div>
              </div>
            </div>

            <Button
              color="secondary"
              variant="solid"
              size="md"
              fullWidth
              onClick={() => {
                if (typeof window !== 'undefined') window.location.hash = 'demo';
              }}
            >
              استعلام پکیج سازمانی
            </Button>
          </div>
        </div>

        {/* شاخص اثر زیست‌محیطی (حفظ سبزی زمین) */}
        <div className="bg-[var(--color-success-50)] border border-[var(--color-success-300)] p-6 md:p-8 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-success-200)] pb-4 mb-6">
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-[var(--color-success-600)] text-white">
                <IconLeaf size={20} stroke={2.2} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-[var(--color-success-900)]">
                  شاخص سبز پایداری و مسئولیت محیط‌زیستی
                </h3>
                <p className="text-xs text-[var(--color-success-800)]">
                  محاسبهٔ اثر مستقیم جایگزینی کاتالوگ کاغذی با نسخهٔ تعاملی بر حفظ منابع طبیعی
                </p>
              </div>
            </div>

            <div className="text-xs text-[var(--color-success-900)] font-bold bg-white px-3 py-1 border border-[var(--color-success-300)]">
              صرفه‌جویی در هر نوبت چاپ: {formatNumberFa(calc.sheetsCount)} برگ کاغذ گلاسه
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-[var(--color-success-200)] p-4 text-center">
              <div className="inline-flex p-2 bg-[var(--color-success-50)] text-[var(--color-success-700)] mb-2">
                <IconTree size={24} stroke={2.2} />
              </div>
              <div className="text-2xl font-black text-[var(--color-success-900)]">
                {formatDecimalFa(calc.treesSaved)} اصله درخت
              </div>
              <div className="text-xs text-[var(--text-neutral-subtle)] mt-1">
                جلوگیری از قطع درختان زنده جهت تولید کاغذ
              </div>
            </div>

            <div className="bg-white border border-[var(--color-success-200)] p-4 text-center">
              <div className="inline-flex p-2 bg-[var(--color-primary-50)] text-[var(--color-primary-600)] mb-2">
                <IconDroplet size={24} stroke={2.2} />
              </div>
              <div className="text-2xl font-black text-[var(--color-primary-800)]">
                {formatNumberFa(calc.waterSavedLiters)} لیتر آب
              </div>
              <div className="text-xs text-[var(--text-neutral-subtle)] mt-1">
                کاهش مصرف آب در فرآوری صنعتی کاغذ گلاسه
              </div>
            </div>

            <div className="bg-white border border-[var(--color-success-200)] p-4 text-center">
              <div className="inline-flex p-2 bg-[var(--color-neutral-100)] text-[var(--text-neutral-700)] mb-2">
                <IconCalculator size={24} stroke={2.2} />
              </div>
              <div className="text-2xl font-black text-[var(--text-neutral-strong)]">
                {formatNumberFa(calc.paperWeightKg)} کیلوگرم کاغذ
              </div>
              <div className="text-xs text-[var(--text-neutral-subtle)] mt-1">
                حذف کارتن‌های سنگین، انبارداری و باطله شدن
              </div>
            </div>
          </div>
        </div>

        {/* ماژول ۴ گانه زیرساخت بومی و گواهی محرمانگی NDA (بخش ۰۹ IA) */}
        <div className="bg-white border border-[var(--border-neutral-base)] p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-neutral-subtle)] pb-4 mb-6">
            <div>
              <h3 className="text-lg md:text-xl font-extrabold text-[var(--text-neutral-strong)] mb-1">
                زیرساخت بومی پایدار و پروتکل‌های امنیت داده
              </h3>
              <p className="text-xs md:text-sm text-[var(--text-neutral-subtle)]">
                بدون دغدغه فیلترینگ، تحریم یا نوسانات ارز؛ با استانداردهای امنیتی سازمانی
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary-700)] bg-[var(--color-primary-50)] border border-[var(--color-primary-200)] px-3 py-1.5">
              <IconSignature size={16} stroke={2.2} />
              <span>امضای رسمی قرارداد محرمانگی (NDA)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-[var(--border-neutral-base)] p-5 bg-[var(--bg-neutral-base)]">
              <div className="flex items-center gap-2 mb-2 font-bold text-sm text-[var(--text-neutral-strong)]">
                <IconCoins size={18} stroke={2.2} className="text-[var(--color-primary-600)]" />
                <span>تعرفهٔ شفاف ریالی</span>
              </div>
              <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                پرداخت ریالی بدون وابستگی به نوسان ارز و حذف اشتراک‌های دلاری سنگین سرویس‌های خارجی.
              </p>
            </div>

            <div className="border border-[var(--border-neutral-base)] p-5 bg-[var(--bg-neutral-base)]">
              <div className="flex items-center gap-2 mb-2 font-bold text-sm text-[var(--text-neutral-strong)]">
                <IconServerBolt size={18} stroke={2.2} className="text-[var(--color-primary-600)]" />
                <span>لود فوق‌سریع روی CDN</span>
              </div>
              <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                میزبانی روی شبکه توزیع محتوای ابری داخلی (CDN)، با ترافیک نیم‌بها و بدون نیاز به فیلترشکن.
              </p>
            </div>

            <div className="border border-[var(--border-neutral-base)] p-5 bg-[var(--bg-neutral-base)]">
              <div className="flex items-center gap-2 mb-2 font-bold text-sm text-[var(--text-neutral-strong)]">
                <IconShieldCheck size={18} stroke={2.2} className="text-[var(--color-primary-600)]" />
                <span>پایداری در برابر تحریم</span>
              </div>
              <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                تضمین باز شدن پایدار کاتالوگ در حساس‌ترین روزهای نمایشگاهی و جلسات مهم سازمانی.
              </p>
            </div>

            <div className="border border-[var(--border-neutral-base)] p-5 bg-[var(--bg-neutral-base)]">
              <div className="flex items-center gap-2 mb-2 font-bold text-sm text-[var(--text-neutral-strong)]">
                <IconFileCheck size={18} stroke={2.2} className="text-[var(--color-primary-600)]" />
                <span>تعهد محرمانگی رسمی (NDA)</span>
              </div>
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
