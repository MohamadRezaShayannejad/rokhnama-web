'use client';

import React, { useState } from 'react';
import {
  IconTool,
  IconBuildingStore,
  IconDeviceDesktopAnalytics,
  IconWorld,
  IconChevronDown,
  IconChevronUp,
  IconFileSpreadsheet,
  IconAdjustmentsAlt,
  IconLayersIntersect,
  IconWorldWww,
  IconAlertTriangle,
  IconCheck,
  IconArrowLeft,
  IconSearch,
  IconLayersSubtract,
  IconDeviceMobile,
  IconClock,
} from '@tabler/icons-react';
import { Button } from '@/ui/Button';
import { b2bSegments, migrationSteps, toFa, type B2BSegment } from './scenariosData';

const segmentIconMap: Record<B2BSegment['iconName'], React.ReactNode> = {
  tool: <IconTool size={20} stroke={2.2} />,
  'building-store': <IconBuildingStore size={20} stroke={2.2} />,
  'device-desktop-analytics': <IconDeviceDesktopAnalytics size={20} stroke={2.2} />,
  world: <IconWorld size={20} stroke={2.2} />,
};

const migrationIconMap: Record<string, React.ReactNode> = {
  'file-import': <IconFileSpreadsheet size={20} stroke={2.2} />,
  'filter-code': <IconAdjustmentsAlt size={20} stroke={2.2} />,
  'layers-interactive': <IconLayersIntersect size={20} stroke={2.2} />,
  'cloud-upload': <IconWorldWww size={20} stroke={2.2} />,
};

/**
 * اتود ۲ — ماتریس دو ستونهٔ تطبیق صنف و درد مشترک + آکاردئون خطی مراحل آماده‌سازی
 * طراحی مهندسی با مقایسه ساختاریافته در یک شبکه منظم دو ستونه و آکاردئون خطی مینیمال
 * بر اساس قوانین هویت بصری رُخ‌نما: گوشه‌های کاملاً تیز، خطوط ۱px، ارقام فارسی.
 */
export default function ScenariosB() {
  const [selectedSegmentId, setSelectedSegmentId] = useState(b2bSegments[0].id);
  const [openStepId, setOpenStepId] = useState<string>(migrationSteps[0].id);

  const toggleStep = (stepId: string) => {
    setOpenStepId((prev) => (prev === stepId ? '' : stepId));
  };

  const activeSegment = b2bSegments.find((s) => s.id === selectedSegmentId) || b2bSegments[0];

  return (
    <section
      dir="rtl"
      className="relative bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] border-b border-[var(--border-neutral-base)] py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">
        {/* ۱. هدر سکشن با تیتر و زیرتیتر استاندارد */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-neutral-subtle)] border border-[var(--border-neutral-base)] text-xs font-bold text-[var(--text-neutral-strong)] mb-4 rounded-none">
            <span className="w-1.5 h-1.5 bg-[var(--color-primary-600)]" />
            <span>ماتریس تطبیق صنایع و مسیر تبدیل کاتالوگ</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-neutral-strong)] leading-tight mb-4">
            پاسخ به چالش‌های اختصاصی هر رسته در بازار B2B
          </h2>
          <p className="text-base lg:text-lg text-[var(--text-neutral-subtle)] leading-relaxed">
            کاتالوگ‌های سنتی برای همه صنایع نسخهٔ یکسان می‌پیچند؛ اما نیاز تأمین‌کننده قطعات با عمده‌فروش پوشاک یا صادرکننده کاملاً متفاوت است.
          </p>
        </div>

        {/* ۲. بخش اول: ماتریس دو ستونهٔ تطبیق صنف و درد مشترک */}
        <div className="mb-20">
          {/* تب‌های انتخاب سریع صنف */}
          <div className="flex flex-wrap border-b border-[var(--border-neutral-base)] mb-8">
            {b2bSegments.map((segment) => {
              const isSelected = selectedSegmentId === segment.id;
              return (
                <button
                  key={segment.id}
                  type="button"
                  onClick={() => setSelectedSegmentId(segment.id)}
                  className={`flex items-center gap-2.5 px-5 py-3.5 text-xs lg:text-sm font-bold border-b-2 transition-all rounded-none ${
                    isSelected
                      ? 'border-b-[var(--color-primary-600)] text-[var(--color-primary-700)] bg-[var(--bg-primary-subtle)]'
                      : 'border-b-transparent text-[var(--text-neutral-subtle)] hover:text-[var(--text-neutral-strong)] hover:bg-[var(--bg-neutral-subtle)]'
                  }`}
                >
                  <span className="font-mono text-xs">{segment.num}</span>
                  <span>{segment.title}</span>
                </button>
              );
            })}
          </div>

          {/* ساختار ماتریس دو ستونه (درد مشترک در برابر راهکار رُخ‌نما) */}
          <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)]">
            {/* سرستون‌های ماتریس */}
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)]">
              <div className="p-4 lg:p-5 flex items-center justify-between border-b md:border-b-0 md:border-l border-[var(--border-neutral-base)]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--color-error-600)]" />
                  <span className="text-xs font-bold text-[var(--color-error-700)]">
                    چالش مزمن کاتالوگ سنتی (PDF یا چاپ)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[var(--text-neutral-subtle)]">
                  [ISSUE LOG]
                </span>
              </div>
              <div className="p-4 lg:p-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[var(--color-primary-600)]" />
                  <span className="text-xs font-bold text-[var(--color-primary-700)]">
                    معماری راهکار و مزیت عملیاتی رُخ‌نما
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[var(--text-neutral-subtle)]">
                  [SOLUTION STACK]
                </span>
              </div>
            </div>

            {/* محتوای فعال ماتریس برای صنف انتخاب‌شده */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* ستون راست: چالش و درد */}
              <div className="p-6 lg:p-8 border-b md:border-b-0 md:border-l border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-neutral-subtle)] mb-3">
                    <span className="px-2 py-0.5 bg-[var(--bg-neutral-subtle)] border border-[var(--border-neutral-subtle)]">
                      {activeSegment.accentCategory}
                    </span>
                    <span>صنایع: {activeSegment.industries}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[var(--text-neutral-strong)] mb-4">
                    {activeSegment.challengeShort}
                  </h3>

                  <p className="text-sm text-[var(--text-neutral-base)] leading-relaxed mb-6">
                    {activeSegment.challenge}
                  </p>

                  <div className="p-4 bg-[var(--bg-neutral-subtle)] border-r-2 border-r-[var(--color-error-600)] text-xs text-[var(--text-neutral-strong)] leading-relaxed space-y-1.5">
                    <div className="font-bold text-[var(--color-error-700)] flex items-center gap-1.5">
                      <IconAlertTriangle size={15} stroke={2.2} />
                      <span>نتیجهٔ ادامهٔ شیوهٔ سنتی:</span>
                    </div>
                    <div>اتلاف وقت مکرر تیم فروش، از دست رفتن سرنخ‌های خریدار و هزینه‌های مداوم اصلاح و چاپ مجدد.</div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--border-neutral-subtle)] flex items-center justify-between text-xs text-[var(--text-neutral-subtle)]">
                  <span>شناسهٔ الگوی صنعتی:</span>
                  <span className="font-mono font-bold text-[var(--text-neutral-strong)]">
                    {activeSegment.technicalCode}
                  </span>
                </div>
              </div>

              {/* ستون چپ: راهکار رُخ‌نما */}
              <div className="p-6 lg:p-8 bg-[var(--bg-primary-subtle)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[var(--color-primary-700)]">
                      قابلیت‌های تعبیه‌شده برای این صنف
                    </span>
                    <span className="w-8 h-8 flex items-center justify-center bg-[var(--bg-neutral-base)] border border-[var(--border-primary-soft)] text-[var(--color-primary-600)]">
                      {segmentIconMap[activeSegment.iconName]}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[var(--color-primary-800)] mb-4">
                    {activeSegment.solutionShort}
                  </h3>

                  <ul className="space-y-3 mb-6">
                    {activeSegment.features.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs lg:text-sm text-[var(--text-neutral-strong)] leading-relaxed"
                      >
                        <span className="w-4 h-4 mt-0.5 flex-shrink-0 flex items-center justify-center bg-[var(--color-primary-600)] text-[var(--color-neutral-50)] text-[10px]">
                          <IconCheck size={12} stroke={2.6} />
                        </span>
                        <span className="font-semibold">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* بلوک شبیه‌سازی مشخصه فنی */}
                  <div className="p-3.5 bg-[var(--bg-neutral-base)] border border-[var(--border-primary-soft)] text-xs space-y-2">
                    <div className="flex items-center justify-between text-[11px] pb-2 border-b border-[var(--border-neutral-subtle)]">
                      <span className="text-[var(--text-neutral-subtle)]">{activeSegment.demoDetails.label}</span>
                      <span className="font-bold text-[var(--text-neutral-strong)]">{activeSegment.demoDetails.value}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[var(--text-neutral-subtle)]">{activeSegment.demoDetails.secondaryLabel}</span>
                      <span className="font-bold text-[var(--color-primary-700)]">{activeSegment.demoDetails.secondaryValue}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--border-primary-soft)] flex items-center justify-between text-xs">
                  <span className="text-[var(--text-neutral-subtle)]">سنجش دستاورد:</span>
                  <span className="font-bold text-[var(--color-primary-700)]">
                    {activeSegment.impactMetric}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ۳. بخش دوم: آکاردئون خطی مراحل آماده‌سازی («کاتالوگ جدید را خودتان نمی‌سازید») */}
        <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] p-6 lg:p-10 relative">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[var(--border-neutral-base)] mb-8">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-bold text-[var(--color-primary-700)] tracking-wider block">
                مسیر تبدیل داده و مهاجرت · ۴ مرحله
              </span>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-[var(--text-neutral-strong)]">
                کاتالوگ جدید را خودتان نمی‌سازید
              </h3>
              <p className="text-sm text-[var(--text-neutral-subtle)] leading-relaxed">
                مهندسان رُخ‌نما داده‌های کاتالوگ فعلی شما را تحویل می‌گیرند، استانداردسازی می‌کنند و نسخهٔ تعاملی را روی دامنه شما می‌نشانند.
              </p>
            </div>
            <div className="text-xs font-bold text-[var(--text-neutral-strong)] border border-[var(--border-neutral-base)] px-4 py-2 bg-[var(--bg-neutral-subtle)] self-start lg:self-end">
              مدت تبدیل اولیه: ظرف ۴۸ ساعت
            </div>
          </div>

          {/* آکاردئون خطی مهندسی ۴ گام */}
          <div className="divide-y divide-[var(--border-neutral-base)] border-y border-[var(--border-neutral-base)]">
            {migrationSteps.map((step) => {
              const isOpen = openStepId === step.id;
              return (
                <div key={step.id} className="transition-colors">
                  {/* دکمهٔ سطر آکاردئون */}
                  <button
                    type="button"
                    onClick={() => toggleStep(step.id)}
                    className="w-full py-5 lg:py-6 px-2 flex items-center justify-between text-right hover:bg-[var(--bg-neutral-subtle)] transition-colors rounded-none group"
                  >
                    <div className="flex items-center gap-4 lg:gap-6">
                      <span className="w-10 h-10 flex items-center justify-center font-mono font-bold text-sm border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] group-hover:border-[var(--color-primary-600)] transition-colors">
                        {step.num}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-base lg:text-lg font-bold text-[var(--text-neutral-strong)]">
                            {step.title}
                          </h4>
                          <span className="text-[11px] font-bold px-2 py-0.5 bg-[var(--bg-neutral-subtle)] border border-[var(--border-neutral-subtle)] text-[var(--text-neutral-subtle)]">
                            {step.stepBadge}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text-neutral-subtle)] line-clamp-1">
                          {step.shortDesc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="hidden sm:inline text-xs font-mono text-[var(--text-neutral-subtle)]">
                        {step.durationEstimate}
                      </span>
                      <div className="w-8 h-8 flex items-center justify-center border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] text-[var(--text-neutral-strong)]">
                        {isOpen ? (
                          <IconChevronUp size={16} stroke={2.2} />
                        ) : (
                          <IconChevronDown size={16} stroke={2.2} />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* بدنهٔ بازشوندهٔ آکاردئون */}
                  {isOpen && (
                    <div className="pb-6 pt-2 px-4 lg:px-16 bg-[var(--bg-neutral-subtle)] border-t border-[var(--border-neutral-subtle)]">
                      <p className="text-sm text-[var(--text-neutral-base)] leading-relaxed mb-5">
                        {step.fullDesc}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* ورودی‌ها */}
                        <div className="p-4 bg-[var(--bg-neutral-base)] border border-[var(--border-neutral-subtle)]">
                          <span className="text-xs font-bold text-[var(--text-neutral-strong)] block mb-2">
                            ورودی‌های لازم از سمت شما:
                          </span>
                          <ul className="space-y-1.5 text-xs text-[var(--text-neutral-base)]">
                            {step.inputs.map((inp, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[var(--color-primary-600)]" />
                                <span>{inp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* خروجی */}
                        <div className="p-4 bg-[var(--bg-primary-subtle)] border border-[var(--border-primary-soft)]">
                          <span className="text-xs font-bold text-[var(--color-primary-700)] block mb-2">
                            خروجی تحویلی مهندسان رُخ‌نما:
                          </span>
                          <p className="text-xs font-semibold text-[var(--text-neutral-strong)] leading-relaxed">
                            {step.output}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* نوار پایانی آکاردئون با دعوت به اقدام */}
          <div className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[var(--text-neutral-subtle)]">
              برای آغاز، کافی است فایل کاتالوگ فعلی یا لیست اقلام خود را بارگذاری کنید.
            </span>
            <Button
              color="primary"
              variant="outline"
              size="md"
              iconAfter={<IconArrowLeft size={18} stroke={2.2} />}
            >
              ارسال فایل‌ها و استعلام زمان‌بندی
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
