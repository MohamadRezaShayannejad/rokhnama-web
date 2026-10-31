'use client';

import { useState } from 'react';
import { IconArrowLeft } from '@tabler/icons-react';
import { Button } from '@/ui/Button';

/* سه پروژه واقعی رُخ‌نما با ساختار شوکیس کاتالوگ به سبک کارت‌های پورتفولیو */
const SHOWCASE_CASES = [
  {
    id: 'delband',
    num: '۰۱',
    title: 'دلبند',
    category: 'سلامت دیجیتال و تجهیزات پزشکی',
    badge: 'کاتالوگ دوزبانه بیمارستانی',
    description: 'انتقال کاتالوگ تجهیزات مراقبت ویژه به ساختار تعاملی با صدور مستقیم استعلام بیمارستانی و پایش رفتار خریداران.',
    metricValue: '۴۰٪',
    metricLabel: 'افزایش سرعت صدور استعلام رسمی بیمارستانی',
    catalogUrl: 'کاتالوگ رسمی دلبند · نسخه تعاملی',
    mockup: {
      tag: 'کاتالوگ دوزبانه بیمارستانی',
      productTitle: 'مانیتورینگ علائم حیاتی بخش مراقبت ویژه',
      productCode: 'کد تجهیز: ۸۵۰',
      specs: [
        { label: 'استاندارد ایمنی', value: 'کلاس دو پزشکی' },
        { label: 'گواهی بالینی', value: 'تأییدیه اداره کل تجهیزات پزشکی' },
        { label: 'دسترسی در کنگره', value: 'فعال بدون اینترنت' },
      ],
      secondaryBadge: 'صدور برگ استعلام در ۳۰ ثانیه',
    },
  },
  {
    id: 'kntu',
    num: '۰۲',
    title: 'دانشگاه صنعتی خواجه نصیرالدین طوسی',
    category: 'آموزش عالی و پردیس بین‌الملل',
    badge: 'ویترین بین‌المللی ۱۱ دانشکده',
    description: 'جایگزینی بروشورهای سنگین با ویترین بین‌المللی چندزبانه، تور مجازی ۳۶۰ درجه و جدول ارزی شهریه.',
    metricValue: '۱۱',
    metricLabel: 'دانشکده مهندسی در یک لینک اختصاصی',
    catalogUrl: 'پردیس بین‌الملل خواجه نصیر · پذیرش دانشجو',
    mockup: {
      tag: 'پردیس بین‌الملل',
      productTitle: 'معرفی ۱۱ دانشکده مهندسی و دوره‌های بین‌الملل',
      productCode: 'کد پذیرش: ۱۴۰۵',
      specs: [
        { label: 'شهریه دوره‌ها', value: '۲٬۶۰۰ یورو در هر نیم‌سال' },
        { label: 'تور پردیس', value: 'بازدید ۳۶۰ درجه از دانشکده‌ها' },
        { label: 'زبان کاتالوگ', value: 'فارسی، انگلیسی، عربی' },
      ],
      secondaryBadge: 'انتخاب آنلاین رشته و ثبت درخواست',
    },
  },
  {
    id: 'pancho',
    num: '۰۳',
    title: 'بنکداری پانچو',
    category: 'بنکداری و عمده‌فروشی پوشاک',
    badge: 'ویترین فصلی ۶۴ قلم کالا',
    description: 'ویترین اختصاصی عمده‌فروشی با تفکیک قیمت همکاری از مصرف‌کننده و صدور خودکار برگ سفارش برای انبارداری.',
    metricValue: '۶۴',
    metricLabel: 'قلم کالای فصلی با تفکیک قیمت همکاری',
    catalogUrl: 'سامانه بنکداری پانچو · سفارش عمده',
    mockup: {
      tag: 'ویترین بنکداری و عمده‌فروشی',
      productTitle: 'کالکشن فصلی عمده — پوشاک پاییزه',
      productCode: 'کد رسته: ۶۴',
      specs: [
        { label: 'قیمت همکار', value: 'تفکیک‌شده با تأیید پیامک' },
        { label: 'جست‌وجوی کالا', value: 'سریع با کلیدهای میانبر' },
        { label: 'برگ سفارش', value: 'چاپ برگ سفارش رسمی انبار' },
      ],
      secondaryBadge: 'صدور پیش‌فاکتور رسمی با سربرگ',
    },
  },
];

export default function CasesA() {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const activeProject = SHOWCASE_CASES.find((c) => c.id === activeModalId);

  return (
    <section
      dir="rtl"
      className="relative w-full bg-[var(--bg-neutral-base)] text-[var(--text-neutral-strong)] font-sans py-20 lg:py-28 px-4 sm:px-6 lg:px-12 border-b border-[var(--border-neutral-base)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* سربرگ بخش با وایت‌اسپیس مناسب و بدون کلمات انگلیسی */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[var(--color-primary-600)] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-primary-subtle)] border border-[var(--border-primary-soft)] text-xs font-bold text-[var(--color-primary-700)] mb-3">
              <span className="w-1.5 h-1.5 bg-[var(--color-secondary-500)]" />
              <span>سکشن ۰۳ · کاتالوگ‌های پیاده‌سازی‌شده</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--text-neutral-strong)]">
              نمونه کاتالوگ‌های پیاده‌سازی‌شده
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-neutral-base)] max-w-2xl leading-relaxed">
              ببینید برندهای پیشرو در سلامت، آموزش عالی و بازرگانی چگونه کاتالوگ‌های چاپی و قدیمی خود را به ویترین تعاملی فروش تبدیل کرده‌اند.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-primary-700)] bg-white px-3 py-1.5 border border-[var(--border-neutral-base)]">
            <span className="h-2 w-2 bg-[var(--color-success-600)]" />
            <span>۳ پروژه فعال و در حال بهره‌برداری</span>
          </div>
        </div>

        {/* گرید سه‌ستونه کارت‌های شوکیس کاتالوگ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SHOWCASE_CASES.map((project) => (
            <article
              key={project.id}
              className="group relative flex flex-col bg-white border border-[var(--border-neutral-base)] hover:border-[var(--color-primary-600)] transition-all duration-300 shadow-sm hover:shadow-xl rounded-none overflow-hidden"
            >
              {/* نشانگر طلایی گوشه بالا سمت راست */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden z-20">
                <div className="w-8 h-8 bg-[var(--color-secondary-400)] -rotate-45 translate-x-4 -translate-y-4 transition-transform group-hover:scale-125" />
              </div>

              {/* قسمت موکاپ کاتالوگ: کادر اختصاصی شبیه‌ساز صفحه کاتالوگ */}
              <div className="relative w-full h-64 sm:h-72 bg-[var(--color-primary-950)] border-b border-[var(--border-neutral-base)] p-5 flex flex-col justify-between overflow-hidden">
                {/* بافت ملایم زمینه */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                  }}
                />

                {/* نوار بالای کاتالوگ شبیه‌سازی‌شده */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2.5">
                  <span className="text-[11px] font-bold text-white/80 select-none">
                    {project.catalogUrl}
                  </span>
                  <span className="px-2 py-0.5 bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)] text-[10px] font-black">
                    کاتالوگ فعال
                  </span>
                </div>

                {/* ماکت صفحه کاتالوگ داخلی با عمق کاغذی */}
                <div className="relative z-10 my-auto bg-white border border-white/20 p-4 shadow-xl transition-transform duration-300 group-hover:scale-[1.02]">
                  <div className="flex items-start justify-between gap-2 border-b border-[var(--border-neutral-subtle)] pb-2 mb-2.5">
                    <div>
                      <span className="text-[10px] text-[var(--color-primary-600)] font-bold block">
                        {project.mockup.productCode}
                      </span>
                      <h4 className="text-xs font-black text-[var(--text-neutral-strong)] line-clamp-1">
                        {project.mockup.productTitle}
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[var(--bg-primary-subtle)] text-[var(--color-primary-700)] shrink-0">
                      {project.mockup.tag}
                    </span>
                  </div>

                  {/* مشخصات داخل کاتالوگ */}
                  <div className="space-y-1 mb-2.5">
                    {project.mockup.specs.map((spec, i) => (
                      <div key={i} className="flex justify-between text-[11px]">
                        <span className="text-[var(--text-neutral-subtle)]">{spec.label}:</span>
                        <span className="font-bold text-[var(--text-neutral-strong)]">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* نوار پایین ماکت */}
                  <div className="pt-2 border-t border-[var(--border-neutral-subtle)] flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[var(--color-secondary-800)]">
                      {project.mockup.secondaryBadge}
                    </span>
                    <span className="text-[10px] text-[var(--color-primary-600)] font-bold">
                      بررسی مشخصات فنی ←
                    </span>
                  </div>
                </div>

                {/* زیرنویس نوار موکاپ */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-white/70 pt-1">
                  <span>نمایش در موبایل و دسکتاپ</span>
                  <span className="text-[var(--color-secondary-400)] font-bold">{project.badge}</span>
                </div>
              </div>

              {/* بدنه متنی کارت شوکیس */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-[var(--color-primary-700)] bg-[var(--color-primary-50)] px-2.5 py-1 border border-[var(--color-primary-200)]">
                      {project.category}
                    </span>
                    <span className="text-xs font-black text-[var(--text-neutral-subtle)]">
                      {project.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[var(--text-neutral-strong)] mb-2 group-hover:text-[var(--color-primary-600)] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[var(--text-neutral-base)] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* بخش شاخص عددی دستاورد با ارقام فارسی */}
                <div className="pt-4 border-t border-[var(--border-neutral-subtle)]">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-black text-[var(--color-primary-800)]">
                      {project.metricValue}
                    </span>
                    <span className="text-xs font-bold text-[var(--text-neutral-base)]">
                      {project.metricLabel}
                    </span>
                  </div>

                  <Button
                    color="primary"
                    variant="outline"
                    size="md"
                    fullWidth
                    iconAfter={<IconArrowLeft size={16} stroke={2.2} />}
                    onClick={() => setActiveModalId(project.id)}
                  >
                    مشاهده مشخصات پرونده
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* مدال تعاملی مشاهده جزییات پرونده */}
        {activeProject && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans"
            onClick={() => setActiveModalId(null)}
          >
            <div
              className="bg-white border-2 border-[var(--color-primary-600)] max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative rounded-none text-right"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between border-b border-[var(--border-neutral-base)] pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-[var(--color-primary-600)] mb-1 block">
                    شناسنامه کاتالوگ سازمانی
                  </span>
                  <h3 className="text-2xl font-black text-[var(--text-neutral-strong)]">
                    {activeProject.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalId(null)}
                  className="w-8 h-8 flex items-center justify-center border border-[var(--border-neutral-base)] hover:bg-[var(--bg-neutral-subtle)] text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-sm text-[var(--text-neutral-base)] mb-6">
                <div className="bg-[var(--bg-primary-subtle)] p-4 border border-[var(--border-primary-soft)]">
                  <span className="font-bold text-[var(--color-primary-800)] block mb-1">راهکار پیاده‌سازی‌شده:</span>
                  <p className="text-xs leading-relaxed text-[var(--text-neutral-base)]">
                    {activeProject.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 py-2">
                  <div className="border border-[var(--border-neutral-subtle)] p-3">
                    <span className="text-xs text-[var(--text-neutral-subtle)] block">شاخص ملموس:</span>
                    <span className="text-lg font-black text-[var(--color-primary-700)]">{activeProject.metricValue}</span>
                    <span className="text-xs font-medium text-[var(--text-neutral-strong)] block">{activeProject.metricLabel}</span>
                  </div>
                  <div className="border border-[var(--border-neutral-subtle)] p-3">
                    <span className="text-xs text-[var(--text-neutral-subtle)] block">وضعیت استقرار:</span>
                    <span className="text-xs text-[var(--color-secondary-800)] font-bold block mt-1">
                      {activeProject.catalogUrl}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-neutral-base)]">
                <Button color="secondary" variant="solid" size="md" onClick={() => setActiveModalId(null)}>
                  بستن پیش‌نمایش
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
