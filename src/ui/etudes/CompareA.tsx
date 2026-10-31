'use client';

import { useState } from 'react';
import {
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconArrowLeft,
  IconFileText,
  IconWorld,
  IconSparkles,
  IconInfoCircle,
} from '@tabler/icons-react';
import { Button } from '@/ui/Button';
import { COMPARISON_CRITERIA } from './compareData';

export default function CompareA() {
  const [activeRowId, setActiveRowId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setActiveRowId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      dir="rtl"
      id="compare-etude-a"
      className="relative w-full py-16 lg:py-24 bg-[var(--bg-neutral-base)] text-[var(--text-neutral-strong)] font-sans overflow-hidden"
    >
      {/* شبکه‌بندی خطوط راهنمای مهندسی پس‌زمینه */}
      <div className="absolute inset-0 pointer-events-none opacity-40 [background-image:linear-gradient(to_right,var(--border-neutral-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-neutral-subtle)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* نوار بالایی و تیتر بخش */}
        <div className="mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-primary-subtle)] border border-[var(--color-primary-200)] text-[var(--color-primary-700)] text-xs font-bold mb-4">
            <span className="font-mono">۰۴</span>
            <span className="w-1.5 h-1.5 bg-[var(--color-primary-600)]" />
            <span>بخش چهارم · تمایز قاطع</span>
            <span className="text-[var(--text-neutral-subtle)]">|</span>
            <span className="text-[var(--text-neutral-subtle)]">ماتریس مهندسی ۴ ستونه</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-neutral-strong)] leading-tight tracking-tight">
            مقایسهٔ سه شیوهٔ ارائهٔ کاتالوگ
          </h2>

          <p className="mt-3 text-base sm:text-lg font-medium text-[var(--text-neutral-base)] max-w-3xl leading-relaxed">
            برداشتن ریسک تصمیم‌گیری مدیر با تمرکز بر ۴ ملاک حیاتی فروش و انبارداری.
          </p>

          <p className="mt-2 text-sm text-[var(--text-neutral-subtle)] max-w-2xl leading-relaxed">
            کاتالوگ چاپی و PDF برای ارائهٔ اطلاعات مناسب‌اند؛ اما وقتی پای قیمت روز، سرنخ فروش، رفتار خریدار و ثبت سفارش در میان باشد، تفاوت آشکار می‌شود:
          </p>
        </div>

        {/* ظرف ماتریس ۴ ستونه */}
        <div className="relative border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] shadow-sm">
          {/* علائم مهندسی گوشه‌ها (+ crosshairs) */}
          <span className="absolute -top-[5px] -right-[5px] text-[10px] text-[var(--color-neutral-400)] font-mono select-none" aria-hidden="true">+</span>
          <span className="absolute -top-[5px] -left-[5px] text-[10px] text-[var(--color-neutral-400)] font-mono select-none" aria-hidden="true">+</span>
          <span className="absolute -bottom-[5px] -right-[5px] text-[10px] text-[var(--color-neutral-400)] font-mono select-none" aria-hidden="true">+</span>
          <span className="absolute -bottom-[5px] -left-[5px] text-[10px] text-[var(--color-neutral-400)] font-mono select-none" aria-hidden="true">+</span>

          {/* نوار راهنمای تعاملی در بالای جدول */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-[var(--bg-neutral-subtle)] border-b border-[var(--border-neutral-base)] text-xs text-[var(--text-neutral-subtle)] font-medium">
            <div className="flex items-center gap-2">
              <IconInfoCircle className="w-4 h-4 text-[var(--color-primary-600)]" />
              <span>برای مشاهدهٔ جزئیات فنی و دلیل ناکارآمدی هر شیوه، روی هر سطر کلیک کنید.</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 border border-[var(--color-error-600)] bg-[var(--color-error-50)] inline-flex items-center justify-center text-[var(--color-error-600)] text-[9px] font-bold">×</span>
                غیرممکن
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 border border-[var(--color-warning-600)] bg-[var(--color-warning-50)] inline-flex items-center justify-center text-[var(--color-warning-700)] text-[9px] font-bold">!</span>
                دارای ریسک
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 border border-[var(--color-secondary-500)] bg-[var(--color-secondary-50)] inline-flex items-center justify-center text-[var(--color-secondary-700)] text-[9px] font-bold">✓</span>
                استاندارد رُخ‌نما
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[760px]">
              {/* هدر چسبان جدول (Sticky Header) */}
              <div className="sticky top-0 z-20 grid grid-cols-12 bg-[var(--bg-neutral-base)] border-b border-[var(--border-neutral-base)] text-xs lg:text-sm font-bold shadow-sm">
                {/* ستون ۱: شاخص ارزیابی */}
                <div className="col-span-3 p-4 lg:p-5 flex flex-col justify-end border-l border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)]/70">
                  <span className="text-xs font-mono text-[var(--text-neutral-subtle)]">METRIC_SPEC</span>
                  <span className="text-[var(--text-neutral-strong)] text-base font-extrabold mt-0.5">شاخص ارزیابی</span>
                  <span className="text-[11px] font-normal text-[var(--text-neutral-subtle)] mt-1">۴ ملاک حیاتی فروش و انبارداری</span>
                </div>

                {/* ستون ۲: کاتالوگ چاپی و PDF */}
                <div className="col-span-3 p-4 lg:p-5 flex flex-col justify-end border-l border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)]/30">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--color-neutral-500)] mb-1">
                    <IconFileText className="w-4 h-4" />
                    <span>شیوهٔ سنتی</span>
                  </div>
                  <span className="text-[var(--text-neutral-strong)] text-base font-bold">کاتالوگ چاپی و PDF</span>
                  <span className="text-[11px] font-normal text-[var(--color-error-600)] mt-1">هزینه و ریسک بالای باطله شدن</span>
                </div>

                {/* ستون ۳: سرویس‌های خارجی */}
                <div className="col-span-3 p-4 lg:p-5 flex flex-col justify-end border-l border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)]/30">
                  <div className="flex items-center gap-1.5 text-xs text-[var(--color-neutral-500)] mb-1">
                    <IconWorld className="w-4 h-4" />
                    <span>سرویس‌های خارجی</span>
                  </div>
                  <span className="text-[var(--text-neutral-strong)] text-base font-bold">اشتراک دلاری خارجی</span>
                  <span className="text-[11px] font-normal text-[var(--color-warning-700)] mt-1">وابستگی ارزی و سرور خارج از کشور</span>
                </div>

                {/* ستون ۴: کاتالوگ تعاملی رُخ‌نما با قاب پیوستهٔ طلایی */}
                <div className="col-span-3 p-4 lg:p-5 flex flex-col justify-end bg-[var(--color-secondary-50)]/50 relative border-r-2 border-l-2 border-t-2 border-[var(--color-secondary-500)]">
                  {/* تگ نشان برتری بالای ستون */}
                  <div className="absolute -top-3.5 right-4 px-2.5 py-0.5 bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)] text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <IconSparkles className="w-3 h-3" />
                    <span>انتخاب قطعی B2B</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[var(--color-secondary-800)] mb-1">
                    <span className="w-2 h-2 bg-[var(--color-secondary-500)]" />
                    <span>راهکار مهندسی بومی</span>
                  </div>
                  <span className="text-[var(--color-primary-900)] text-base font-black">کاتالوگ تعاملی رُخ‌نما</span>
                  <span className="text-[11px] font-bold text-[var(--color-secondary-800)] mt-1">یکپارچه با انبار و بدون شارژ دلاری</span>
                </div>
              </div>

              {/* سطرهای ماتریس (The 4 Criteria Rows) */}
              <div className="divide-y divide-[var(--border-neutral-base)]">
                {COMPARISON_CRITERIA.map((criterion, idx) => {
                  const isOpen = activeRowId === criterion.id;
                  const isLastRow = idx === COMPARISON_CRITERIA.length - 1;

                  return (
                    <div key={criterion.id} className="group transition-colors duration-150">
                      {/* ردیف اصلی ۴ ستونه */}
                      <div
                        onClick={() => toggleRow(criterion.id)}
                        className={`grid grid-cols-12 cursor-pointer transition-colors ${
                          isOpen ? 'bg-[var(--bg-primary-subtle)]/40' : 'hover:bg-[var(--bg-neutral-subtle)]/50'
                        }`}
                      >
                        {/* ستون ۱: عنوان ملاک */}
                        <div className="col-span-3 p-4 lg:p-5 border-l border-[var(--border-neutral-base)] flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="inline-flex items-center justify-center w-5 h-5 bg-[var(--color-primary-600)] text-white text-xs font-mono font-bold">
                              {criterion.numPersian}
                            </span>
                            <span className="text-[11px] font-mono text-[var(--text-neutral-subtle)]">
                              CRIT.{criterion.id}
                            </span>
                          </div>
                          <span className="text-sm lg:text-[15px] font-extrabold text-[var(--text-neutral-strong)] leading-snug">
                            {criterion.title}
                          </span>
                          <span className="text-xs text-[var(--color-primary-700)] font-medium mt-1">
                            حوزه: {criterion.systemTag}
                          </span>
                        </div>

                        {/* ستون ۲: کاتالوگ چاپی */}
                        <div className="col-span-3 p-4 lg:p-5 border-l border-[var(--border-neutral-base)] flex flex-col justify-center bg-[var(--color-neutral-50)]/40">
                          <div className="inline-flex items-center gap-1.5 self-start px-2 py-0.5 bg-[var(--color-error-50)] border border-[var(--color-error-200)] text-[var(--color-error-600)] text-xs font-bold mb-2">
                            <IconX className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>{criterion.paper.badge}</span>
                          </div>
                          <p className="text-xs lg:text-[13px] text-[var(--text-neutral-base)] leading-relaxed font-normal">
                            {criterion.paper.desc}
                          </p>
                        </div>

                        {/* ستون ۳: سرویس‌های خارجی */}
                        <div className="col-span-3 p-4 lg:p-5 border-l border-[var(--border-neutral-base)] flex flex-col justify-center bg-[var(--color-neutral-50)]/20">
                          <div className="inline-flex items-center gap-1.5 self-start px-2 py-0.5 bg-[var(--color-warning-50)] border border-[var(--color-warning-200)] text-[var(--color-warning-700)] text-xs font-bold mb-2">
                            <IconAlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>{criterion.foreign.badge}</span>
                          </div>
                          <p className="text-xs lg:text-[13px] text-[var(--text-neutral-base)] leading-relaxed font-normal">
                            {criterion.foreign.desc}
                          </p>
                        </div>

                        {/* ستون ۴: رُخ‌نما با کادر طلایی پیوسته */}
                        <div
                          className={`col-span-3 p-4 lg:p-5 flex flex-col justify-center bg-[var(--color-secondary-50)]/50 relative border-r-2 border-l-2 border-[var(--color-secondary-500)] ${
                            isLastRow ? 'border-b-2' : ''
                          }`}
                        >
                          <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 bg-[var(--color-secondary-100)] border border-[var(--color-secondary-400)] text-[var(--color-secondary-900)] text-xs font-bold mb-2">
                            <IconCheck className="w-4 h-4 text-[var(--color-secondary-700)] stroke-[3]" />
                            <span>{criterion.rok.badge}</span>
                          </div>
                          <p className="text-xs lg:text-[13px] text-[var(--color-primary-950)] leading-relaxed font-semibold">
                            {criterion.rok.desc}
                          </p>
                        </div>
                      </div>

                      {/* پنل بازشونده برای نمایش دلیل فنی و مزیت عمیق */}
                      {isOpen && (
                        <div className="px-5 py-4 bg-[var(--bg-primary-subtle)] border-t border-[var(--border-neutral-subtle)] text-xs grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-3 bg-white border border-[var(--color-error-200)]">
                            <span className="font-bold text-[var(--color-error-600)] block mb-1">
                              ریسک ساختاری کاغذ:
                            </span>
                            <p className="text-[var(--text-neutral-base)] leading-relaxed font-normal">
                              {criterion.paper.technicalFlaw}
                            </p>
                          </div>
                          <div className="p-3 bg-white border border-[var(--color-warning-200)]">
                            <span className="font-bold text-[var(--color-warning-700)] block mb-1">
                              اصطکاک سرویس خارجی:
                            </span>
                            <p className="text-[var(--text-neutral-base)] leading-relaxed font-normal">
                              {criterion.foreign.technicalFlaw}
                            </p>
                          </div>
                          <div className="p-3 bg-white border-2 border-[var(--color-secondary-500)]">
                            <span className="font-bold text-[var(--color-secondary-800)] block mb-1">
                              تضمین مهندسی رُخ‌نما:
                            </span>
                            <p className="text-[var(--color-primary-950)] leading-relaxed font-medium">
                              {criterion.rok.technicalAdvantage}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* نوار پایانی خلاصه و خروجی تصمیم */}
          <div className="p-4 lg:p-6 bg-[var(--bg-neutral-subtle)] border-t border-[var(--border-neutral-base)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-[var(--text-neutral-base)]">
              <span className="w-2 h-2 bg-[var(--color-secondary-500)] shrink-0" />
              <span>
                <strong>نتیجه‌گیری مدیریتی:</strong> ۴ برتری قطعی بدون وابستگی به اینترنت، شارژ دلاری یا چاپخانه.
              </span>
            </div>
            <div className="shrink-0 w-full sm:w-auto">
              <Button
                color="primary"
                variant="solid"
                size="md"
                onClick={() => {
                  const el = document.getElementById('sec-11') || document.getElementById('demo-request');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>درخواست دمو و ارسال کاتالوگ</span>
                <IconArrowLeft className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
