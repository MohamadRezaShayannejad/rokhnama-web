'use client';

import { useState, useEffect } from 'react';
import {
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconPlayerPlay,
  IconPlayerPause,
  IconArrowLeft,
  IconGitBranch,
  IconSparkles,
  IconTopologyComplex,
} from '@tabler/icons-react';
import { Button } from '@/ui/Button';
import { COMPARISON_CRITERIA } from './compareData';

export default function CompareC() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // تایمر خودکار اجرای مرحله‌ای برتری‌ها
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % COMPARISON_CRITERIA.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentCriterion = COMPARISON_CRITERIA[activeStep];

  return (
    <section
      dir="rtl"
      id="compare-etude-c"
      className="relative w-full py-16 lg:py-24 bg-[var(--bg-neutral-base)] text-[var(--text-neutral-strong)] font-sans overflow-hidden"
    >
      {/* گرید هیرلاین مهندسی و خطوط راهنمای شبیه‌ساز مدار */}
      <div className="absolute inset-0 pointer-events-none opacity-30 [background-image:linear-gradient(to_right,var(--border-neutral-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-neutral-subtle)_1px,transparent_1px)] [background-size:56px_56px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* هدر بخش و معرفی مدار ۳ مسیره */}
        <div className="mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-primary-subtle)] border border-[var(--color-primary-200)] text-[var(--color-primary-700)] text-xs font-bold mb-3">
            <span className="font-mono">۰۴</span>
            <span className="w-1.5 h-1.5 bg-[var(--color-primary-600)]" />
            <span>بخش چهارم · تمایز قاطع</span>
            <span className="text-[var(--text-neutral-subtle)]">|</span>
            <span>خطوط موازی انشعابی هیرلاین</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-neutral-strong)] leading-tight tracking-tight">
                مقایسهٔ سه شیوهٔ ارائهٔ کاتالوگ
              </h2>
              <p className="mt-2 text-sm sm:text-base font-medium text-[var(--text-neutral-base)] max-w-2xl leading-relaxed">
                انشعاب جریان داده در ۴ گره حیاتی فروش: مشاهدهٔ بن‌بست روش‌های سنتی در برابر پیوستگی شاهراه رُخ‌نما.
              </p>
            </div>

            {/* کنترلر فعال‌سازی خودکار / دستی */}
            <div className="flex items-center gap-3 p-1.5 bg-white border border-[var(--border-neutral-base)] shadow-xs self-start lg:self-auto">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-2 border transition-colors flex items-center gap-2 text-xs font-bold ${
                  isPlaying
                    ? 'bg-[var(--color-primary-50)] border-[var(--color-primary-300)] text-[var(--color-primary-700)]'
                    : 'bg-white border-[var(--border-neutral-base)] text-[var(--text-neutral-strong)]'
                }`}
                title={isPlaying ? 'توقف موقت انیمیشن' : 'پخش خودکار مراحل'}
              >
                {isPlaying ? <IconPlayerPause className="w-4 h-4" /> : <IconPlayerPlay className="w-4 h-4" />}
                <span>{isPlaying ? 'در حال پایش خودکار' : 'پخش خودکار'}</span>
              </button>

              <div className="h-4 w-px bg-[var(--border-neutral-base)]" />

              <div className="flex items-center gap-1">
                {COMPARISON_CRITERIA.map((criterion, idx) => (
                  <button
                    key={criterion.id}
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveStep(idx);
                    }}
                    className={`w-7 h-7 text-xs font-mono font-bold transition-all border ${
                      activeStep === idx
                        ? 'bg-[var(--color-primary-600)] border-[var(--color-primary-600)] text-white shadow-xs'
                        : 'bg-[var(--bg-neutral-subtle)] border-[var(--border-neutral-subtle)] text-[var(--text-neutral-subtle)] hover:text-[var(--text-neutral-strong)]'
                    }`}
                  >
                    {criterion.numPersian}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* دیاگرام ۳ خط موازی و ۴ گره تقاطع (The 3 Parallel Tracks Diagram) */}
        <div className="relative border border-[var(--border-neutral-base)] bg-white p-6 lg:p-8 shadow-sm mb-8">
          {/* علائم مهندسی لبه‌ها */}
          <span className="absolute -top-[5px] -right-[5px] text-[10px] text-[var(--color-neutral-400)] font-mono select-none" aria-hidden="true">+</span>
          <span className="absolute -top-[5px] -left-[5px] text-[10px] text-[var(--color-neutral-400)] font-mono select-none" aria-hidden="true">+</span>

          {/* سرستون‌های سه مسیر */}
          <div className="grid grid-cols-12 gap-4 pb-6 border-b border-[var(--border-neutral-base)] text-xs font-bold">
            <div className="col-span-3 text-[var(--text-neutral-subtle)] font-mono flex items-center gap-1.5">
              <IconTopologyComplex className="w-4 h-4 text-[var(--color-primary-600)]" />
              <span>ایستگاه ارزیابی (گره)</span>
            </div>
            <div className="col-span-3 flex items-center gap-2 text-[var(--color-error-600)]">
              <span className="w-2.5 h-2.5 bg-[var(--color-error-500)]" />
              <span>مسیر ۱: کاتالوگ چاپی و PDF</span>
            </div>
            <div className="col-span-3 flex items-center gap-2 text-[var(--color-warning-700)]">
              <span className="w-2.5 h-2.5 bg-[var(--color-warning-500)]" />
              <span>مسیر ۲: سرویس‌های خارجی</span>
            </div>
            <div className="col-span-3 flex items-center gap-2 text-[var(--color-secondary-800)] font-black">
              <span className="w-2.5 h-2.5 bg-[var(--color-secondary-500)]" />
              <span>مسیر ۳: کاتالوگ رُخ‌نما</span>
            </div>
          </div>

          {/* خطوط مدار با ۴ گره تلاقی */}
          <div className="divide-y divide-[var(--border-neutral-base)]">
            {COMPARISON_CRITERIA.map((criterion, idx) => {
              const isActive = activeStep === idx;

              return (
                <div
                  key={criterion.id}
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveStep(idx);
                  }}
                  className={`grid grid-cols-12 gap-4 py-5 items-center cursor-pointer transition-all duration-200 relative ${
                    isActive
                      ? 'bg-[var(--color-secondary-50)]/40 -mx-6 px-6 lg:-mx-8 lg:px-8 border-y-2 border-[var(--color-secondary-500)]'
                      : 'hover:bg-[var(--bg-neutral-subtle)]/60'
                  }`}
                >
                  {/* نشانگر سمت راست برای ردیف فعال */}
                  {isActive && (
                    <div className="absolute top-0 right-0 bottom-0 w-1.5 bg-[var(--color-secondary-500)]" />
                  )}

                  {/* ستون گره ارزیابی */}
                  <div className="col-span-3 flex items-center gap-3">
                    <span
                      className={`w-7 h-7 flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[var(--color-primary-600)] text-white'
                          : 'bg-[var(--bg-neutral-subtle)] text-[var(--text-neutral-strong)] border border-[var(--border-neutral-subtle)]'
                      }`}
                    >
                      {criterion.numPersian}
                    </span>
                    <div>
                      <span className="text-[11px] font-mono text-[var(--text-neutral-subtle)] block">
                        گره شمارهٔ {criterion.id}
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-extrabold block leading-snug ${
                          isActive ? 'text-[var(--color-primary-900)]' : 'text-[var(--text-neutral-strong)]'
                        }`}
                      >
                        {criterion.shortTitle}
                      </span>
                    </div>
                  </div>

                  {/* انشعاب مسیر ۱: کاغذ (بن‌بست) */}
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="relative flex items-center justify-center w-7 h-7 shrink-0 bg-[var(--color-error-50)] border border-[var(--color-error-200)] text-[var(--color-error-600)]">
                      <IconX className="w-4 h-4 stroke-[2.5]" />
                      {/* خط هیرلاین منقطع اتصال */}
                      <span className="hidden sm:block absolute right-full top-1/2 -translate-y-1/2 w-4 h-px border-t border-dashed border-[var(--color-error-300)]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[var(--color-error-600)] block">
                        {criterion.paper.badge}
                      </span>
                      <span className="text-[11px] text-[var(--text-neutral-subtle)] truncate block">
                        قطع جریان اطلاعات
                      </span>
                    </div>
                  </div>

                  {/* انشعاب مسیر ۲: خارجی (اصطکاک و درگاه دلاری) */}
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="relative flex items-center justify-center w-7 h-7 shrink-0 bg-[var(--color-warning-50)] border border-[var(--color-warning-200)] text-[var(--color-warning-700)]">
                      <IconAlertTriangle className="w-4 h-4 stroke-[2.5]" />
                      <span className="hidden sm:block absolute right-full top-1/2 -translate-y-1/2 w-4 h-px border-t border-dashed border-[var(--color-warning-300)]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[var(--color-warning-700)] block">
                        {criterion.foreign.badge}
                      </span>
                      <span className="text-[11px] text-[var(--text-neutral-subtle)] truncate block">
                        وابستگی و تاخیر
                      </span>
                    </div>
                  </div>

                  {/* انشعاب مسیر ۳: رُخ‌نما (شاهراه پیوسته طلایی) */}
                  <div className="col-span-3 flex items-center gap-2">
                    <div
                      className={`relative flex items-center justify-center w-7 h-7 shrink-0 transition-transform ${
                        isActive
                          ? 'bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)] scale-110 shadow-sm'
                          : 'bg-[var(--color-secondary-100)] border border-[var(--color-secondary-400)] text-[var(--color-secondary-800)]'
                      }`}
                    >
                      <IconCheck className="w-4 h-4 stroke-[3]" />
                      <span className="hidden sm:block absolute right-full top-1/2 -translate-y-1/2 w-4 h-px bg-[var(--color-secondary-500)]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-black text-[var(--color-secondary-950)] block">
                        {criterion.rok.badge}
                      </span>
                      <span className="text-[11px] font-bold text-[var(--color-primary-900)] truncate block">
                        اتصال بلادرنگ
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* کنسول تله‌متری مهندسی گره فعال (Active Node Telemetry Console) */}
        <div className="border-2 border-[var(--color-secondary-500)] bg-white p-6 lg:p-8 shadow-sm relative">
          <div className="absolute -top-3.5 right-6 px-3 py-0.5 bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
            <IconSparkles className="w-3.5 h-3.5" />
            <span>کنسول تحلیل گره {currentCriterion.numPersian}: {currentCriterion.shortTitle}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            {/* تحلیل مسیر کاغذ */}
            <div className="p-4 bg-[var(--color-error-50)]/40 border border-[var(--color-error-200)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--color-error-200)]">
                  <span className="text-xs font-bold text-[var(--color-error-700)]">
                    بن‌بست کاتالوگ چاپی
                  </span>
                  <span className="px-1.5 py-0.2 bg-[var(--color-error-100)] text-[var(--color-error-700)] text-[10px] font-bold">
                    {currentCriterion.paper.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-neutral-strong)] leading-relaxed font-medium mb-3">
                  {currentCriterion.paper.desc}
                </p>
              </div>
              <div className="text-[11px] text-[var(--color-error-700)] pt-2 border-t border-[var(--color-error-200)]/60">
                <strong>پیامد عملیاتی:</strong> {currentCriterion.paper.technicalFlaw}
              </div>
            </div>

            {/* تحلیل مسیر خارجی */}
            <div className="p-4 bg-[var(--color-warning-50)]/40 border border-[var(--color-warning-200)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--color-warning-200)]">
                  <span className="text-xs font-bold text-[var(--color-warning-800)]">
                    اصطکاک سرویس خارجی
                  </span>
                  <span className="px-1.5 py-0.2 bg-[var(--color-warning-100)] text-[var(--color-warning-800)] text-[10px] font-bold">
                    {currentCriterion.foreign.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-neutral-strong)] leading-relaxed font-medium mb-3">
                  {currentCriterion.foreign.desc}
                </p>
              </div>
              <div className="text-[11px] text-[var(--color-warning-800)] pt-2 border-t border-[var(--color-warning-200)]/60">
                <strong>ریسک تجاری:</strong> {currentCriterion.foreign.technicalFlaw}
              </div>
            </div>

            {/* تحلیل شاهراه رُخ‌نما */}
            <div className="p-4 bg-[var(--color-secondary-50)] border-2 border-[var(--color-secondary-500)] flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--color-secondary-300)]">
                  <span className="text-xs font-black text-[var(--color-primary-950)]">
                    شاهراه رُخ‌نما (دارد)
                  </span>
                  <span className="px-2 py-0.5 bg-[var(--color-secondary-200)] text-[var(--color-secondary-950)] text-xs font-black border border-[var(--color-secondary-500)]">
                    {currentCriterion.rok.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--color-primary-950)] leading-relaxed font-bold mb-3">
                  {currentCriterion.rok.desc}
                </p>
              </div>
              <div className="text-[11px] text-[var(--color-secondary-950)] pt-2 border-t border-[var(--color-secondary-300)] font-medium">
                <strong>ارزش افزوده:</strong> {currentCriterion.rok.technicalAdvantage}
              </div>
            </div>
          </div>

          {/* نوار پایین کنسول برای اقدام */}
          <div className="mt-6 pt-4 border-t border-[var(--border-neutral-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[var(--text-neutral-base)]">
              <IconGitBranch className="w-4 h-4 text-[var(--color-primary-600)]" />
              <span>
                تمام ۴ انشعاب در پلتفرم رُخ‌نما به صورت یکپارچه و بومی در دسترس شماست.
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
                <span>شروع با ارسال کاتالوگ موجود</span>
                <IconArrowLeft className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
