'use client';

import { IconArrowLeft } from '@tabler/icons-react';
import { Button } from '@/ui/Button';

export default function CasesB() {
  return (
    <section
      dir="rtl"
      className="relative w-full bg-[var(--bg-neutral-base)] text-[var(--text-neutral-strong)] font-sans py-20 lg:py-28 px-4 sm:px-6 lg:px-12 border-b border-[var(--border-neutral-base)]"
    >
      <div className="max-w-7xl mx-auto space-y-14">
        {/* هدر بخش بنتو شوکیس */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-[var(--color-primary-600)] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-primary-subtle)] border border-[var(--border-primary-soft)] text-xs font-bold text-[var(--color-primary-700)] mb-3">
              <span className="w-1.5 h-1.5 bg-[var(--color-secondary-500)]" />
              <span>سکشن ۰۳ · بنتو شوکیس کاتالوگ‌های سازمانی</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--text-neutral-strong)]">
              ویترین پروژه‌ها به روایت بنتو گرید
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-neutral-base)] max-w-2xl leading-relaxed">
              ترکیب‌بندی نامتقارن و مدرن صفحات کاتالوگ با تأکید بصری روی عملکرد واقعی در صنایع مختلف.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-primary-700)] bg-white px-3 py-1.5 border border-[var(--border-neutral-base)]">
            <span className="h-2 w-2 bg-[var(--color-secondary-500)]" />
            <span>چیدمان متقارن بنتو · ۳ حوزه کلیدی</span>
          </div>
        </div>

        {/* گرید بنتو ۲ ردیفه */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* کارت بزرگ پرچمدار ۱: دلبند (۸ ستون از ۱۲ ستون در دسکتاپ) */}
          <article className="lg:col-span-8 bg-white border-2 border-[var(--color-primary-600)] p-6 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-300 relative group overflow-hidden">
            {/* روبان گوشه پروژه ویژه */}
            <div className="absolute top-0 left-0 bg-[var(--color-primary-600)] text-white text-[11px] px-3 py-1 font-bold z-20">
              پرونده شاخص تجهیزات پزشکی
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-xs font-bold px-3 py-1 bg-[var(--color-primary-50)] text-[var(--color-primary-800)] border border-[var(--color-primary-200)]">
                  سلامت دیجیتال و تجهیزات پزشکی
                </span>
                <span className="text-xs font-black text-[var(--text-neutral-subtle)]">دلبند · ۰۱</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-neutral-strong)] mb-2 group-hover:text-[var(--color-primary-600)] transition-colors">
                دلبند — کاتالوگ دوزبانه تجهیزات مراقبت ویژه بیمارستانی
              </h3>
              <p className="text-xs sm:text-sm text-[var(--text-neutral-base)] max-w-2xl leading-relaxed mb-6">
                انتقال کاتالوگ کاغذی سنگین به یک نسخه دیجیتال تعاملی با صدور مستقیم برگه استعلام و پایش رفتار خریداران سازمانی در کنگره‌ها.
              </p>
            </div>

            {/* موکاپ افقی عریض از کاتالوگ دلبند */}
            <div className="w-full bg-[var(--color-primary-950)] border border-[var(--color-primary-800)] p-5 my-4 relative overflow-hidden group-hover:border-[var(--color-secondary-400)] transition-colors">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-4 text-[11px] text-white/80 font-bold">
                <span>کاتالوگ تعاملی دلبند</span>
                <span className="text-[var(--color-secondary-400)]">کاتالوگ فعال روی تبلت‌های نمایشگاهی</span>
              </div>

              {/* ماکت لایه‌ای کاتالوگ با مشخصات پزشکی */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 text-right">
                <div className="border border-[var(--border-neutral-subtle)] p-3 flex flex-col justify-between bg-[var(--bg-neutral-base)]">
                  <div>
                    <span className="text-[10px] text-[var(--color-primary-600)] font-bold block">کد تجهیز: ۸۵۰</span>
                    <h4 className="text-xs font-black text-[var(--text-neutral-strong)]">مانیتورینگ بخش مراقبت ویژه</h4>
                    <span className="text-[10px] text-[var(--color-success-700)] font-bold">تأییدیه وزارت بهداشت</span>
                  </div>
                  <div className="text-[11px] text-[var(--text-neutral-subtle)] mt-3 pt-2 border-t border-[var(--border-neutral-subtle)]">
                    قیمت همکار: احراز پیامکی
                  </div>
                </div>

                <div className="border border-[var(--border-neutral-subtle)] p-3 flex flex-col justify-between bg-white">
                  <div>
                    <span className="text-[10px] text-[var(--color-primary-600)] font-bold block">سنسورهای بالینی</span>
                    <h4 className="text-xs font-black text-[var(--text-neutral-strong)]">سنسورهای نوری پالس و اشباع</h4>
                    <span className="text-[10px] text-[var(--text-neutral-subtle)]">دقت اندازه‌گیری: ۹۹٫۴٪</span>
                  </div>
                  <div className="text-[11px] text-[var(--color-primary-600)] font-bold mt-3 pt-2 border-t border-[var(--border-neutral-subtle)]">
                    استعلام رسمی بیمارستانی ←
                  </div>
                </div>

                <div className="border border-[var(--color-secondary-300)] bg-[var(--color-secondary-50)] p-3 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[var(--color-secondary-800)] block">امکانات اختصاصی پیاده‌شده:</span>
                    <ul className="text-[11px] text-[var(--text-neutral-strong)] space-y-1 mt-1 font-medium">
                      <li>✓ سوئیچ سریع زبان (فارسی / انگلیسی)</li>
                      <li>✓ دسترسی آفلاین در سالن کنگره</li>
                      <li>✓ صدور برگ سفارش رسمی</li>
                    </ul>
                  </div>
                  <span className="text-[10px] text-[var(--color-secondary-800)] font-bold pt-2 border-t border-[var(--color-secondary-200)]">
                    ۴۰٪ افزایش نرخ استعلام
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--border-neutral-subtle)]">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-black text-[var(--color-primary-700)]">۴۰٪</span>
                <span className="text-xs text-[var(--text-neutral-base)]">کاهش زمان پاسخگویی به استعلامات مراکز درمانی</span>
              </div>
              <Button color="primary" variant="solid" size="md" iconAfter={<IconArrowLeft size={16} stroke={2.2} />}>
                بررسی پرونده پزشکی دلبند
              </Button>
            </div>
          </article>

          {/* کارت ستون کناری ۲: دانشگاه صنعتی خواجه نصیر (۴ ستون از ۱۲ ستون) */}
          <article className="lg:col-span-4 bg-white border border-[var(--border-neutral-base)] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-0.5 bg-[var(--bg-primary-subtle)] text-[var(--color-primary-700)] border border-[var(--border-primary-soft)]">
                  آموزش عالی بین‌الملل
                </span>
                <span className="text-xs font-black text-[var(--text-neutral-subtle)]">۰۲</span>
              </div>

              <h3 className="text-xl font-black text-[var(--text-neutral-strong)] mb-2 group-hover:text-[var(--color-primary-600)] transition-colors">
                دانشگاه صنعتی خواجه نصیرالدین طوسی
              </h3>
              <p className="text-xs text-[var(--text-neutral-base)] leading-relaxed mb-4">
                ویترین بین‌المللی ۱۱ دانشکده با تور ۳۶۰ پردیس‌ها و تبدیل خودکار شهریه دوره‌ها به یورو و دلار.
              </p>

              {/* موکاپ کاتالوگ دانشگاه */}
              <div className="bg-[var(--bg-neutral-subtle)] border border-[var(--border-neutral-base)] p-4 mb-4">
                <div className="flex items-center justify-between text-[11px] font-bold border-b border-[var(--border-neutral-subtle)] pb-2 mb-2 text-[var(--text-neutral-subtle)]">
                  <span>پردیس بین‌الملل خواجه نصیر</span>
                  <span className="text-[var(--color-primary-600)]">تور ۳۶۰ درجه</span>
                </div>
                <div className="bg-white p-3 border border-[var(--border-neutral-subtle)] space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span>۱۱ دانشکده مهندسی</span>
                    <span className="text-[10px] text-[var(--color-success-700)] bg-[var(--color-success-50)] px-1.5 py-0.5">پذیرش فعال</span>
                  </div>
                  <div className="text-[11px] text-[var(--text-neutral-subtle)] flex justify-between">
                    <span>شهریه ارزی سالانه:</span>
                    <span className="font-bold text-[var(--color-primary-700)]">۲٬۶۰۰ یورو / نیم‌سال</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--border-neutral-subtle)]">
              <Button color="primary" variant="outline" size="md" fullWidth iconAfter={<IconArrowLeft size={16} stroke={2.2} />}>
                مشاهده ویترین بین‌الملل
              </Button>
            </div>
          </article>

          {/* کارت تمام‌عرض پایینی ۳: بنکداری و عمده‌فروشی پانچو (۱۲ ستون کامل) */}
          <article className="lg:col-span-12 bg-white border border-[var(--border-neutral-base)] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold px-3 py-1 bg-[var(--color-secondary-100)] text-[var(--color-secondary-900)] border border-[var(--color-secondary-300)]">
                  بنکداری و عمده‌فروشی پوشاک
                </span>
                <span className="text-xs font-black text-[var(--text-neutral-subtle)]">پانچو · ۰۳</span>
              </div>

              <h3 className="text-2xl font-black text-[var(--text-neutral-strong)] group-hover:text-[var(--color-secondary-700)] transition-colors">
                پانچو — مدیریت ۶۴ قلم کالای فصلی با تفکیک قیمت همکاری
              </h3>

              <p className="text-xs sm:text-sm text-[var(--text-neutral-base)] max-w-2xl leading-relaxed">
                حل مشکل نوسان قیمت عمده‌فروشی با به‌روزرسانی در لحظه، جست‌وجوی کیبوردی کدهای کالا با ارقام فارسی و صدور برگ سفارش استاندارد برای انبار.
              </p>

              <div className="flex items-center gap-6 pt-2">
                <div>
                  <span className="text-2xl font-black text-[var(--color-secondary-700)]">۶۴</span>
                  <span className="text-xs font-bold text-[var(--text-neutral-base)] mr-2">قلم کالای فصلی در کاتالوگ</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-[var(--color-primary-700)]">برگ سفارش</span>
                  <span className="text-xs font-bold text-[var(--text-neutral-base)] mr-2">صدور مستقیم فاکتور چاپی انبار</span>
                </div>
              </div>
            </div>

            {/* ماکت بصری فیش کاتالوگ بنکداری پانچو */}
            <div className="w-full md:w-96 bg-[var(--color-primary-950)] p-4 text-white shrink-0 border border-[var(--color-secondary-400)]">
              <div className="flex justify-between items-center text-[11px] border-b border-white/20 pb-2 mb-3 text-white/80 font-bold">
                <span>کاتالوگ سفارش عمده پانچو</span>
                <span className="text-[var(--color-secondary-400)]">برگ سفارش انبار</span>
              </div>
              <div className="bg-white text-[var(--text-neutral-strong)] p-3 text-xs space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span>کد کالا: ۴۰۲</span>
                  <span className="text-[10px] text-[var(--color-primary-600)]">موجودی انبار: تأیید</span>
                </div>
                <div className="flex justify-between text-[11px] text-[var(--text-neutral-subtle)]">
                  <span>قیمت مصرف‌کننده:</span>
                  <span className="line-through">۶۵۰٬۰۰۰ تومان</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-[var(--color-secondary-800)] bg-[var(--color-secondary-50)] p-1 border border-[var(--color-secondary-200)]">
                  <span>قیمت همکاری عمده:</span>
                  <span>۴۵۵٬۰۰۰ تومان</span>
                </div>
              </div>
              <div className="mt-3 text-center">
                <Button color="secondary" variant="solid" size="sm" fullWidth iconAfter={<IconArrowLeft size={16} stroke={2.2} />}>
                  مشاهده نمونه کاتالوگ پانچو
                </Button>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
