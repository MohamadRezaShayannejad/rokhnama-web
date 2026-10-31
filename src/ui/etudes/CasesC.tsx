'use client';

import { useState } from 'react';
import {
  IconArrowLeft,
  IconCheck,
} from '@tabler/icons-react';
import { Button } from '@/ui/Button';

interface ShowcaseProject {
  id: string;
  num: string;
  title: string;
  brand: string;
  field: string;
  deliverables: string[];
  metric: string;
  metricLabel: string;
  mockup: {
    browserUrl: string;
    productTitle: string;
    productCode: string;
    badge: string;
    specs: { k: string; v: string }[];
    footerNote: string;
  };
}

const PROJECTS: ShowcaseProject[] = [
  {
    id: 'delband',
    num: '۰۱',
    title: 'دلبند — تجهیزات پایش و مراقبت ویژه بیمارستانی',
    brand: 'دلبند',
    field: 'سلامت دیجیتال و تجهیزات پزشکی',
    deliverables: [
      'کاتالوگ دوزبانه (فارسی و انگلیسی) تجهیزات پزشکی',
      'سناریوی کاربرد بالینی و مشخصات فنی سنسورها',
      'ثبت مستقیم استعلام بیمارستانی با ارزیابی ریسک',
      'کارکرد بدون اینترنت در سالن‌های کنگره و نمایشگاه',
    ],
    metric: '۴۰٪',
    metricLabel: 'کوتاه‌تر شدن چرخه تأیید استعلام بیمارستانی',
    mockup: {
      browserUrl: 'کاتالوگ رسمی دلبند · تجهیزات مراقبت ویژه',
      productTitle: 'سامانه مانیتورینگ علائم حیاتی بخش مراقبت ویژه',
      productCode: 'کد تجهیز: ۸۵۰',
      badge: 'تجهیزات مراقبت ویژه',
      specs: [
        { k: 'مجوزها', v: 'اداره کل تجهیزات پزشکی و استاندارد بالینی' },
        { k: 'دقت سنسور', v: 'پایش بلادرنگ ۹۹٫۴٪' },
        { k: 'نسخه آفلاین', v: 'فعال در سالن کنگره' },
      ],
      footerNote: 'برگه استعلام رسمی مستقیم به واحد تدارکات بیمارستان',
    },
  },
  {
    id: 'kntu',
    num: '۰۲',
    title: 'دانشگاه صنعتی خواجه نصیرالدین طوسی — پردیس بین‌الملل',
    brand: 'دانشگاه خواجه نصیر',
    field: 'آموزش عالی و پذیرش بین‌المللی',
    deliverables: [
      'معرفی تعاملی ۱۱ دانشکده مهندسی به جای بروشورهای سنگین',
      'تور مجازی ۳۶۰ درجه پردیس‌ها و آزمایشگاه‌های مرجع',
      'جدول پویای شهریه ارزی با سوئیچ دلار و یورو',
      'راهنمای پذیرش و روادید بدون نیاز به خروج از سند',
    ],
    metric: '۱۱',
    metricLabel: 'دانشکده مهندسی در یک ویترین یکپارچه',
    mockup: {
      browserUrl: 'پردیس بین‌الملل خواجه نصیر · دفتر پذیرش',
      productTitle: 'پردیس بین‌الملل و تحصیلات تکمیلی مهندسی',
      productCode: 'کد پذیرش: ۱۴۰۵',
      badge: 'پذیرش دانشجوی غیرایرانی',
      specs: [
        { k: 'شهریه ارزی', v: '۲٬۶۰۰ یورو در هر نیم‌سال تحصیلی' },
        { k: 'تور پردیس', v: 'نمای ۳۶۰ درجه آزمایشگاه‌ها' },
        { k: 'زبان‌ها', v: 'فارسی، انگلیسی، عربی' },
      ],
      footerNote: 'ثبت‌نام و انتخاب آنلاین رشته تحصیلی',
    },
  },
  {
    id: 'pancho',
    num: '۰۳',
    title: 'بنکداری پانچو — پوشاک عمده و کالکشن فصلی',
    brand: 'بنکداری پانچو',
    field: 'بنکداری، نساجی و عمده‌فروشی پوشاک',
    deliverables: [
      'ویترین فصلی ۶۴ قلم کالا با دسترسی کیبوردی به کدها',
      'تفکیک سطح قیمت همکاری عمده از قیمت مصرف‌کننده',
      'اعتبارسنجی خریداران سازمانی با پیامک یک‌بارمصرف',
      'صدور خودکار برگ سفارش استاندارد چاپی برای انبار',
    ],
    metric: '۶۴',
    metricLabel: 'قلم کالای فصلی با تفکیک قیمت همکاری',
    mockup: {
      browserUrl: 'سامانه بنکداری پانچو · سفارش عمده',
      productTitle: 'کالکشن فصلی عمده — ۶۴ قلم پوشاک پاییزه',
      productCode: 'کد رسته: ۶۴',
      badge: 'بنکداری و عمده‌فروشی',
      specs: [
        { k: 'قیمت همکار', v: 'تفکیک‌شده با پیامک تأیید' },
        { k: 'جست‌وجوی کد', v: 'با ارقام فارسی و کلیدهای میانبر' },
        { k: 'برگ سفارش', v: 'فایل استاندارد چاپی انبارداری' },
      ],
      footerNote: 'صدور پیش‌فاکتور رسمی شرکتی با سربرگ',
    },
  },
];

export default function CasesC() {
  const [selectedId, setSelectedId] = useState<string>('delband');

  const current = PROJECTS.find((p) => p.id === selectedId) || PROJECTS[0];

  return (
    <section
      dir="rtl"
      className="relative w-full bg-[var(--bg-neutral-base)] text-[var(--text-neutral-strong)] font-sans py-20 lg:py-28 px-4 sm:px-6 lg:px-12 border-b border-[var(--border-neutral-base)]"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* سربرگ شوکیس تعاملی اسپلیت */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[var(--color-primary-600)] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-primary-subtle)] border border-[var(--border-primary-soft)] text-xs font-bold text-[var(--color-primary-700)] mb-3">
              <span className="w-1.5 h-1.5 bg-[var(--color-secondary-500)]" />
              <span>سکشن ۰۳ · شوکیس تعاملی کاتالوگ‌های رُخ‌نما</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--text-neutral-strong)]">
              پرونده‌های تحول کاتالوگ دیجیتال
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-neutral-base)] max-w-2xl leading-relaxed">
              روی هر پروژه بروید تا ماکت بصری کاتالوگ پیاده‌سازی‌شده و ساختار تعاملی آن را در بوم روبرو مشاهده کنید.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-primary-700)] bg-white px-3 py-1.5 border border-[var(--border-neutral-base)]">
            <span>روی هر پروژه کلیک کنید</span>
          </div>
        </div>

        {/* چیدمان دوتکه (لیست پروژه‌ها سمت راست + بوم موکاپ سمت چپ) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ستون راست: لیست پروژه‌ها (۵ ستون) */}
          <div className="lg:col-span-5 space-y-4">
            {PROJECTS.map((project) => {
              const isSelected = project.id === selectedId;
              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedId(project.id)}
                  className={`p-6 border-2 transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-[var(--color-primary-600)] bg-white shadow-lg'
                      : 'border-[var(--border-neutral-base)] bg-white/70 hover:bg-white hover:border-[var(--color-primary-300)]'
                  }`}
                >
                  {/* نشانگر انتخاب طلایی سمت راست */}
                  {isSelected && (
                    <div className="absolute top-0 right-0 bottom-0 w-1.5 bg-[var(--color-secondary-500)]" />
                  )}

                  <div className="flex items-center justify-between text-xs text-[var(--text-neutral-subtle)] mb-2">
                    <span className="font-bold text-[var(--color-primary-700)] bg-[var(--color-primary-50)] px-2 py-0.5 border border-[var(--color-primary-200)]">
                      {project.field}
                    </span>
                    <span className="font-black text-[var(--text-neutral-subtle)]">{project.num}</span>
                  </div>

                  <h3 className="text-lg font-black text-[var(--text-neutral-strong)] mb-1">
                    {project.title}
                  </h3>
                  <span className="text-xs text-[var(--text-neutral-subtle)] block mb-3 font-medium">
                    {project.brand}
                  </span>

                  <div className="flex items-baseline gap-2 pt-2 border-t border-[var(--border-neutral-subtle)]">
                    <span className="text-2xl font-black text-[var(--color-primary-800)]">
                      {project.metric}
                    </span>
                    <span className="text-xs text-[var(--text-neutral-base)] font-medium">
                      {project.metricLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ستون چپ: بوم نمایش موکاپ کاتالوگ */}
          <div className="lg:col-span-7 bg-[var(--color-primary-950)] border-2 border-[var(--color-primary-700)] p-6 sm:p-8 text-white relative shadow-2xl">
            {/* نوار بالایی مرورگر شبیه‌سازی‌شده */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-6 text-xs text-white/80">
              <span className="font-bold text-white/90">
                {current.mockup.browserUrl}
              </span>
              <span className="px-2 py-0.5 bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)] text-[10px] font-black">
                {current.mockup.badge}
              </span>
            </div>

            {/* ماکت لایه‌ای صفحهٔ کاتالوگ با کاغذ و عمق */}
            <div className="bg-white text-[var(--text-neutral-strong)] p-6 shadow-2xl border border-white/20 mb-6">
              <div className="flex items-start justify-between gap-4 border-b border-[var(--border-neutral-subtle)] pb-3 mb-4">
                <div>
                  <span className="text-[10px] font-bold text-[var(--color-primary-600)] block">
                    {current.mockup.productCode}
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-[var(--text-neutral-strong)]">
                    {current.mockup.productTitle}
                  </h4>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 bg-[var(--bg-primary-subtle)] text-[var(--color-primary-700)] shrink-0">
                  نسخه دیجیتال فعال
                </span>
              </div>

              {/* سطرهای مشخصات کاتالوگ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {current.mockup.specs.map((spec, i) => (
                  <div key={i} className="border border-[var(--border-neutral-subtle)] bg-[var(--bg-neutral-base)] p-2.5">
                    <span className="text-[10px] text-[var(--text-neutral-subtle)] block mb-0.5">{spec.k}:</span>
                    <span className="text-xs font-bold text-[var(--text-neutral-strong)]">{spec.v}</span>
                  </div>
                ))}
              </div>

              {/* نوار پایینی کاتالوگ */}
              <div className="p-3 bg-[var(--color-primary-50)] border border-[var(--color-primary-200)] flex items-center justify-between text-xs">
                <span className="font-bold text-[var(--color-primary-800)]">
                  {current.mockup.footerNote}
                </span>
                <span className="text-[11px] text-[var(--color-primary-600)] font-bold">
                  مشاهده استعلام زنده ←
                </span>
              </div>
            </div>

            {/* ویژگی‌های پیاده‌سازی‌شده در کاتالوگ */}
            <div className="space-y-3 mb-6">
              <span className="text-xs font-bold text-[var(--color-secondary-400)] block">
                اقدامات انجام‌شده توسط رُخ‌نما برای {current.brand}:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-white/90">
                {current.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <IconCheck size={16} stroke={2.2} className="text-[var(--color-secondary-400)] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs text-white/60">
                طراحی منطبق بر هویت بصری و پروتکل‌های سازمانی
              </div>
              <Button color="secondary" variant="solid" size="md" iconAfter={<IconArrowLeft size={16} stroke={2.2} />}>
                مشاهده نمونه کاتالوگ {current.brand}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
