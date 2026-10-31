'use client';

import React, { useRef, useState } from 'react';
import {
  IconTool,
  IconBuildingStore,
  IconDeviceDesktopAnalytics,
  IconWorld,
  IconFileSpreadsheet,
  IconAdjustmentsAlt,
  IconLayersIntersect,
  IconWorldWww,
  IconChevronRight,
  IconChevronLeft,
  IconPlus,
  IconCheck,
  IconAlertCircle,
  IconArrowLeft,
  IconSparkles,
  IconArrowsExchange,
} from '@tabler/icons-react';
import { Button } from '@/ui/Button';
import { b2bSegments, migrationSteps, toFa, type B2BSegment } from './scenariosData';

const segmentIconMap: Record<B2BSegment['iconName'], React.ReactNode> = {
  tool: <IconTool size={22} stroke={2.2} />,
  'building-store': <IconBuildingStore size={22} stroke={2.2} />,
  'device-desktop-analytics': <IconDeviceDesktopAnalytics size={22} stroke={2.2} />,
  world: <IconWorld size={22} stroke={2.2} />,
};

const migrationIconMap: Record<string, React.ReactNode> = {
  'file-import': <IconFileSpreadsheet size={20} stroke={2.2} />,
  'filter-code': <IconAdjustmentsAlt size={20} stroke={2.2} />,
  'layers-interactive': <IconLayersIntersect size={20} stroke={2.2} />,
  'cloud-upload': <IconWorldWww size={20} stroke={2.2} />,
};

/**
 * اتود ۱ — ریل افقی درگ‌شوندهٔ ۴ صنف + دیاگرام اتصالات ۴ گام مهاجرت
 * طراحی مهندسی با خطوط هیرلاین ۱px، نشانه‌های تقاطع (+)، وایت‌اسپیس سخاوتمندانه
 * و استایل‌های صددرصد وفادار به توکن‌های globals.css و لبه‌های کاملاً تیز (rounded-none).
 */
export default function ScenariosA() {
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!railRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - railRef.current.offsetLeft);
    setScrollLeft(railRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !railRef.current) return;
    e.preventDefault();
    const x = e.pageX - railRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    railRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollRail = (direction: 'prev' | 'next') => {
    if (!railRef.current) return;
    const offset = direction === 'next' ? -380 : 380;
    railRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    if (direction === 'next') {
      setActiveSegmentIndex((prev) => (prev < b2bSegments.length - 1 ? prev + 1 : 0));
    } else {
      setActiveSegmentIndex((prev) => (prev > 0 ? prev - 1 : b2bSegments.length - 1));
    }
  };

  const currentSegment = b2bSegments[activeSegmentIndex];
  const currentStep = migrationSteps[activeStepIndex];

  return (
    <section
      dir="rtl"
      className="relative bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] border-b border-[var(--border-neutral-base)] py-20 lg:py-28 overflow-hidden"
    >
      {/* شبکه شطرنجی پس‌زمینه با خطوط هیرلاین بسیار محو */}
      <div
        className="absolute inset-0 pointer-events-none opacity-35"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--border-neutral-subtle) 1px, transparent 1px), linear-gradient(to bottom, var(--border-neutral-subtle) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">
        {/* ۱. هدر سکشن با هویت فنی و خطوط هیرلاین */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-[var(--border-neutral-base)]">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-primary-subtle)] border border-[var(--border-primary-soft)] text-[var(--color-primary-700)] text-xs font-bold tracking-wider rounded-none">
              <span className="w-1.5 h-1.5 bg-[var(--color-primary-600)]" />
              <span>سگمنت‌بندی صنایع B2B · رستهٔ بازار هدف</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-neutral-strong)] leading-tight">
              کاتالوگی متناسب با هندسهٔ معامله در صنف شما
            </h2>
            <p className="text-base lg:text-lg text-[var(--text-neutral-subtle)] leading-relaxed">
              هر رستهٔ صنعتی چالش متمایزی در کاتالوگ دارد. رُخ‌نما معماری نمایش و جریان استعلام را برای الگوی فروش همان صنف مهندسی می‌کند.
            </p>
          </div>

          {/* ابزار ناوبری ریل افقی */}
          <div className="flex items-center gap-4 self-start lg:self-end">
            <div className="text-xs font-bold text-[var(--text-neutral-subtle)] border border-[var(--border-neutral-base)] px-3 py-2 bg-[var(--bg-neutral-subtle)]">
              صنف {toFa(activeSegmentIndex + 1)} از {toFa(b2bSegments.length)}
            </div>
            <div className="flex items-center border border-[var(--border-neutral-base)] divide-x divide-[var(--border-neutral-base)] rtl:divide-x-reverse bg-[var(--bg-neutral-base)]">
              <button
                type="button"
                onClick={() => scrollRail('prev')}
                aria-label="صنف قبلی"
                className="w-11 h-11 flex items-center justify-center hover:bg-[var(--bg-neutral-subtle)] text-[var(--text-neutral-strong)] transition-colors active:translate-y-[1px]"
              >
                <IconChevronRight size={20} stroke={2.2} />
              </button>
              <button
                type="button"
                onClick={() => scrollRail('next')}
                aria-label="صنف بعدی"
                className="w-11 h-11 flex items-center justify-center hover:bg-[var(--bg-neutral-subtle)] text-[var(--text-neutral-strong)] transition-colors active:translate-y-[1px]"
              >
                <IconChevronLeft size={20} stroke={2.2} />
              </button>
            </div>
          </div>
        </div>

        {/* ۲. ریل افقی درگ‌شونده کارت‌های ۴ صنف */}
        <div className="relative pt-10 pb-14">
          {/* راهنمای لمسی یا درگ */}
          <div className="flex items-center justify-between text-xs text-[var(--text-neutral-subtle)] mb-4">
            <span className="flex items-center gap-1.5 font-bold">
              <IconArrowsExchange size={16} stroke={2.2} />
              ریل افقی را بکشید یا برای انتخاب روی کارت کلیک کنید:
            </span>
            <span className="hidden sm:inline font-mono text-[11px] text-[var(--text-neutral-subtle)]">
              [DRAGGABLE RAIL · ۴ CARDS]
            </span>
          </div>

          <div
            ref={railRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex gap-6 overflow-x-auto pb-4 pt-1 cursor-grab select-none no-scrollbar scroll-smooth ${
              isDragging ? 'cursor-grabbing' : ''
            }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {b2bSegments.map((segment, index) => {
              const isSelected = activeSegmentIndex === index;
              return (
                <article
                  key={segment.id}
                  onClick={() => setActiveSegmentIndex(index)}
                  className={`relative flex-shrink-0 w-[320px] sm:w-[380px] p-6 sm:p-7 border transition-all duration-200 rounded-none bg-[var(--bg-neutral-base)] text-right ${
                    isSelected
                      ? 'border-[var(--color-primary-600)] shadow-sm ring-1 ring-[var(--color-primary-600)]'
                      : 'border-[var(--border-neutral-base)] hover:border-[var(--text-neutral-subtle)]'
                  }`}
                >
                  {/* نشان‌های مهندسی تقاطع در چهار گوشه (+) */}
                  <span className="absolute -top-1.5 -right-1.5 text-[var(--color-primary-600)] font-mono text-xs leading-none select-none">
                    +
                  </span>
                  <span className="absolute -top-1.5 -left-1.5 text-[var(--color-primary-600)] font-mono text-xs leading-none select-none">
                    +
                  </span>
                  <span className="absolute -bottom-1.5 -right-1.5 text-[var(--color-primary-600)] font-mono text-xs leading-none select-none">
                    +
                  </span>
                  <span className="absolute -bottom-1.5 -left-1.5 text-[var(--color-primary-600)] font-mono text-xs leading-none select-none">
                    +
                  </span>

                  {/* ردیف بالا: شناسه و آیکون صنف */}
                  <div className="flex items-center justify-between pb-4 border-b border-[var(--border-neutral-subtle)]">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xl font-black text-[var(--color-primary-600)]">
                        {segment.num}
                      </span>
                      <span className="text-xs font-bold text-[var(--text-neutral-subtle)] px-2 py-0.5 bg-[var(--bg-neutral-subtle)] border border-[var(--border-neutral-subtle)]">
                        {segment.accentCategory}
                      </span>
                    </div>
                    <div
                      className={`w-9 h-9 flex items-center justify-center border rounded-none ${
                        isSelected
                          ? 'border-[var(--color-primary-600)] bg-[var(--bg-primary-subtle)] text-[var(--color-primary-600)]'
                          : 'border-[var(--border-neutral-base)] text-[var(--text-neutral-strong)]'
                      }`}
                    >
                      {segmentIconMap[segment.iconName]}
                    </div>
                  </div>

                  {/* عنوان و صنایع هدف */}
                  <div className="pt-4 pb-4">
                    <h3 className="text-lg font-bold text-[var(--text-neutral-strong)] mb-2">
                      {segment.title}
                    </h3>
                    <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                      <strong className="text-[var(--text-neutral-base)] font-bold">صنایع مرتبط: </strong>
                      {segment.industries}
                    </p>
                  </div>

                  {/* مقایسه دو لایه: چالش کاتالوگ سنتی در برابر مزیت رُخ‌نما */}
                  <div className="space-y-3.5 my-3 pt-3 border-t border-dashed border-[var(--border-neutral-subtle)]">
                    {/* چالش */}
                    <div className="p-3 bg-[var(--bg-neutral-subtle)] border-r-2 border-r-[var(--color-error-600)] text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-[var(--color-error-700)] mb-1">
                        <IconAlertCircle size={14} stroke={2.2} />
                        <span>چالش کاتالوگ فعلی:</span>
                      </div>
                      <p className="text-[var(--text-neutral-base)] leading-relaxed">
                        {segment.challengeShort}
                      </p>
                    </div>

                    {/* مزیت رُخ‌نما */}
                    <div className="p-3 bg-[var(--bg-primary-subtle)] border-r-2 border-r-[var(--color-primary-600)] text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-[var(--color-primary-700)] mb-1">
                        <IconSparkles size={14} stroke={2.2} />
                        <span>راهکار رُخ‌نما:</span>
                      </div>
                      <p className="text-[var(--text-neutral-strong)] font-semibold leading-relaxed">
                        {segment.solutionShort}
                      </p>
                    </div>
                  </div>

                  {/* اثر ملموس */}
                  <div className="mt-4 pt-3 border-t border-[var(--border-neutral-subtle)] flex items-center justify-between text-[11px]">
                    <span className="text-[var(--text-neutral-subtle)]">دستاورد عملیاتی:</span>
                    <span className="font-bold text-[var(--color-primary-700)] text-left">
                      {segment.impactMetric}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ۳. پنل متصل شبیه‌سازی مشخصات صنف فعال */}
        <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)] p-6 lg:p-8 relative">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--border-neutral-base)]">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-[var(--color-primary-600)]" />
              <h4 className="text-base font-bold text-[var(--text-neutral-strong)]">
                خروجی تخصصی رُخ‌نما برای «{currentSegment.title}»
              </h4>
              <span className="font-mono text-xs text-[var(--text-neutral-subtle)] border border-[var(--border-neutral-base)] px-2 py-0.5 bg-[var(--bg-neutral-base)]">
                {currentSegment.technicalCode}
              </span>
            </div>
            <span className="text-xs text-[var(--text-neutral-subtle)] font-bold">
              تطبیق داده‌های انبار و فروش بر اساس استاندارد B2B
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {currentSegment.features.map((feature, fIdx) => (
              <div
                key={fIdx}
                className="flex items-start gap-3 p-4 bg-[var(--bg-neutral-base)] border border-[var(--border-neutral-subtle)]"
              >
                <span className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center text-[var(--color-primary-600)] border border-[var(--border-primary-soft)] bg-[var(--bg-primary-subtle)]">
                  <IconCheck size={14} stroke={2.4} />
                </span>
                <span className="text-xs lg:text-sm font-semibold text-[var(--text-neutral-strong)] leading-relaxed">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ۴. خط اتصال دیاگرامی بین دو بخش (Connective Pipeline Marker) */}
        <div className="relative py-14 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-[var(--border-neutral-base)]" />
          </div>
          <div className="relative flex items-center gap-3 bg-[var(--bg-neutral-base)] px-6 py-2 border border-[var(--border-neutral-base)] text-xs font-bold text-[var(--text-neutral-strong)]">
            <span className="w-2 h-2 bg-[var(--color-primary-600)] animate-pulse" />
            <span>مسیر آماده‌سازی: شما فایل‌های فعلی را می‌فرستید؛ مهندسان ما کاتالوگ را می‌سازند</span>
          </div>
        </div>

        {/* ۵. بخش دیاگرام اتصالات ۴ گام مهاجرت («کاتالوگ جدید را خودتان نمی‌سازید») */}
        <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] p-6 lg:p-10 relative">
          {/* نشانه‌های گوشه */}
          <span className="absolute -top-2 -right-2 text-[var(--color-primary-600)] font-mono text-sm leading-none">
            +
          </span>
          <span className="absolute -top-2 -left-2 text-[var(--color-primary-600)] font-mono text-sm leading-none">
            +
          </span>
          <span className="absolute -bottom-2 -right-2 text-[var(--color-primary-600)] font-mono text-sm leading-none">
            +
          </span>
          <span className="absolute -bottom-2 -left-2 text-[var(--color-primary-600)] font-mono text-sm leading-none">
            +
          </span>

          {/* هدر بخش دیاگرام مهاجرت */}
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-neutral-subtle)] border border-[var(--border-neutral-base)] text-[var(--text-neutral-strong)] text-xs font-bold mb-3">
              <span>مسیر تبدیل داده‌ها · ۴ مرحلهٔ منظم</span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-extrabold text-[var(--text-neutral-strong)] mb-2">
              کاتالوگ جدید را خودتان نمی‌سازید
            </h3>
            <p className="text-sm text-[var(--text-neutral-subtle)] leading-relaxed">
              نگرانی از زحمت ورود اطلاعات و بازطراحی را فراموش کنید. فایل‌های موجود (PDF، اکسل و وب‌سایت) را بفرستید؛ تیم رُخ‌نما داده‌ها را پالایش و کاتالوگ را آماده می‌کند.
            </p>
          </div>

          {/* خط لوله دیاگرامی ۴ ایستگاه (Pipeline Connection Grid) */}
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 pt-4 pb-8">
            {/* خط اتصال مهندسی ۱px در دسکتاپ */}
            <div
              className="hidden md:block absolute top-[52px] right-12 left-12 h-[2px] bg-[var(--border-neutral-base)] -z-0"
              aria-hidden="true"
            >
              {/* نشانگر نورانی پیشرفت تا گام فعال */}
              <div
                className="h-full bg-[var(--color-primary-600)] transition-all duration-300"
                style={{
                  width: `${(activeStepIndex / (migrationSteps.length - 1)) * 100}%`,
                }}
              />
            </div>

            {migrationSteps.map((step, sIdx) => {
              const isActive = activeStepIndex === sIdx;
              const isPassed = activeStepIndex > sIdx;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStepIndex(sIdx)}
                  className={`relative z-10 flex flex-col p-5 border transition-all duration-200 cursor-pointer rounded-none text-right ${
                    isActive
                      ? 'border-[var(--color-primary-600)] bg-[var(--bg-primary-subtle)]'
                      : 'border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] hover:border-[var(--text-neutral-subtle)]'
                  }`}
                >
                  {/* دایره ایستگاه مهندسی شارپ */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-10 h-10 flex items-center justify-center font-mono text-sm font-bold border transition-colors ${
                        isActive
                          ? 'bg-[var(--color-primary-600)] text-[var(--color-neutral-50)] border-[var(--color-primary-600)]'
                          : isPassed
                          ? 'bg-[var(--bg-neutral-subtle)] text-[var(--color-primary-700)] border-[var(--color-primary-500)]'
                          : 'bg-[var(--bg-neutral-base)] text-[var(--text-neutral-strong)] border-[var(--border-neutral-base)]'
                      }`}
                    >
                      {step.num}
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 border ${
                        isActive
                          ? 'border-[var(--color-primary-600)] bg-[var(--bg-neutral-base)] text-[var(--color-primary-700)]'
                          : 'border-[var(--border-neutral-subtle)] text-[var(--text-neutral-subtle)]'
                      }`}
                    >
                      {step.stepBadge}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[var(--text-neutral-strong)] mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed flex-grow">
                    {step.shortDesc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[var(--border-neutral-subtle)] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[var(--text-neutral-subtle)]">زمان تخمینی:</span>
                    <span className="font-bold text-[var(--text-neutral-strong)]">
                      {step.durationEstimate}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* باکس تشریح جزئیات گام انتخاب‌شده با لایه‌بندی ورودی و خروجی */}
          <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)] p-6 lg:p-7">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[var(--border-neutral-base)]">
              <div>
                <span className="text-xs font-bold text-[var(--color-primary-700)] block mb-1">
                  جزئیات فنی گام {currentStep.num}
                </span>
                <h4 className="text-lg font-bold text-[var(--text-neutral-strong)]">
                  {currentStep.title} — {currentStep.shortDesc}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-neutral-subtle)]">خروجی نهایی این گام:</span>
                <span className="text-xs font-bold px-3 py-1 bg-[var(--bg-neutral-base)] border border-[var(--border-neutral-base)] text-[var(--color-primary-700)]">
                  {currentStep.output}
                </span>
              </div>
            </div>

            <p className="text-sm text-[var(--text-neutral-base)] leading-relaxed py-4">
              {currentStep.fullDesc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {currentStep.inputs.map((inp, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[var(--bg-neutral-base)] border border-[var(--border-neutral-subtle)] text-xs flex items-center gap-2 text-[var(--text-neutral-strong)]"
                >
                  <span className="w-1.5 h-1.5 bg-[var(--color-secondary-600)]" />
                  <span>ورودی: {inp}</span>
                </div>
              ))}
            </div>

            {/* CTA اقدام مستقیم */}
            <div className="mt-6 pt-5 border-t border-[var(--border-neutral-base)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[var(--text-neutral-subtle)]">
                فایل‌های کاتالوگ فعلی خود را ارسال کنید تا نقشهٔ استخراج و دموی اولیه ظرف ۴۸ ساعت آماده شود.
              </p>
              <Button
                color="primary"
                variant="solid"
                size="md"
                iconAfter={<IconArrowLeft size={18} stroke={2.2} />}
              >
                ارسال فایل کاتالوگ برای تبدیل
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
