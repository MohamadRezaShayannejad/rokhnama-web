'use client';

import React, { useState } from 'react';
import {
  IconTool,
  IconBuildingStore,
  IconDeviceDesktopAnalytics,
  IconWorld,
  IconFileSpreadsheet,
  IconAdjustmentsAlt,
  IconLayersIntersect,
  IconWorldWww,
  IconArrowLeft,
  IconCheck,
  IconAlertCircle,
  IconFileText,
  IconDatabase,
  IconNetwork,
  IconBinaryTree,
  IconTerminal2,
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
  'file-import': <IconFileSpreadsheet size={18} stroke={2.2} />,
  'filter-code': <IconAdjustmentsAlt size={18} stroke={2.2} />,
  'layers-interactive': <IconLayersIntersect size={18} stroke={2.2} />,
  'cloud-upload': <IconWorldWww size={18} stroke={2.2} />,
};

/**
 * اتود ۳ — نقشهٔ محیطی اکوسیستم صنعتی + خط انتقال داده از فایل قدیمی به کاتالوگ زنده
 * طراحی معماری با بوم نقشه‌برداری، گره‌های متصل داده‌ای، جریان خط لوله انتقال
 * و تماماً مبتنی بر گوشه‌های تیز (rounded-none)، خطوط مهندسی ۱px و پالت سازمانی رُخ‌نما.
 */
export default function ScenariosC() {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState(0);
  const [selectedStepIndex, setSelectedStepIndex] = useState(0);

  const activeSegment = b2bSegments[selectedNodeIndex];
  const activeStep = migrationSteps[selectedStepIndex];

  return (
    <section
      dir="rtl"
      className="relative bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] border-b border-[var(--border-neutral-base)] py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">
        {/* ۱. هدر فنی سکشن */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-primary-subtle)] border border-[var(--border-primary-soft)] text-xs font-bold text-[var(--color-primary-700)] mb-3 rounded-none">
            <span className="w-1.5 h-1.5 bg-[var(--color-primary-600)]" />
            <span>نقشهٔ اکوسیستم صنعتی و خط لوله انتقال اطلاعات</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-neutral-strong)] leading-tight mb-3">
            معماری پیوند کاتالوگ با ۴ قطب عملیاتی بازار B2B
          </h2>
          <p className="text-base lg:text-lg text-[var(--text-neutral-subtle)] leading-relaxed">
            رُخ‌نما کاتالوگ را از یک فایل منزوی خارج کرده و به رگ ارتباطی میان انبار، مشتریان عمده، کارشناسان فنی و غرفه‌های صادراتی تبدیل می‌کند.
          </p>
        </div>

        {/* ۲. نقشهٔ محیطی اکوسیستم صنعتی (Blueprint Environment Map) */}
        <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] p-6 lg:p-10 relative mb-16">
          {/* نشان‌های مهندسی گوشه (+) */}
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

          {/* نوار وضعیت بالای بوم */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border-neutral-base)] mb-8 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-mono font-bold text-[var(--text-neutral-strong)]">
                [GRID · ۴ SECTOR NODES]
              </span>
              <span className="text-[var(--text-neutral-subtle)]">
                برای بررسی معماری هر بخش روی گره مورد نظر کلیک کنید
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--color-primary-700)] bg-[var(--bg-neutral-subtle)] border border-[var(--border-neutral-base)] px-2.5 py-1">
              <span>ACTIVE NODE:</span>
              <span className="font-bold">{activeSegment.num}</span>
            </div>
          </div>

          {/* گرید ۴ قطب صنعتی با خطوط اتصال دیاگرامی هیرلاین */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {b2bSegments.map((segment, idx) => {
              const isSelected = selectedNodeIndex === idx;
              return (
                <div
                  key={segment.id}
                  onClick={() => setSelectedNodeIndex(idx)}
                  className={`p-5 border transition-all duration-200 cursor-pointer rounded-none relative text-right ${
                    isSelected
                      ? 'border-[var(--color-primary-600)] bg-[var(--bg-primary-subtle)] shadow-sm'
                      : 'border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] hover:border-[var(--text-neutral-subtle)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-lg font-black text-[var(--color-primary-600)]">
                      {segment.num}
                    </span>
                    <div
                      className={`w-8 h-8 flex items-center justify-center border ${
                        isSelected
                          ? 'border-[var(--color-primary-600)] bg-[var(--bg-neutral-base)] text-[var(--color-primary-600)]'
                          : 'border-[var(--border-neutral-base)] text-[var(--text-neutral-strong)]'
                      }`}
                    >
                      {segmentIconMap[segment.iconName]}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-[var(--text-neutral-strong)] mb-1">
                    {segment.title}
                  </h3>
                  <p className="text-xs text-[var(--text-neutral-subtle)] line-clamp-2 leading-relaxed">
                    {segment.industries}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[var(--border-neutral-subtle)] flex items-center justify-between text-[11px]">
                    <span className="text-[var(--text-neutral-subtle)]">کد رسته:</span>
                    <span className="font-mono font-bold text-[var(--text-neutral-strong)]">
                      {segment.technicalCode}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* مانیتور تحلیل مشخصات قطب فعال در اکوسیستم */}
          <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)] p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-4 space-y-3">
                <span className="text-xs font-bold text-[var(--color-primary-700)] block">
                  تحلیل تخصصی رُخ‌نما برای قطب {activeSegment.num}
                </span>
                <h4 className="text-lg lg:text-xl font-extrabold text-[var(--text-neutral-strong)]">
                  {activeSegment.title}
                </h4>
                <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                  <strong className="text-[var(--text-neutral-base)]">چالش سنتی: </strong>
                  {activeSegment.challenge}
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-[var(--bg-neutral-base)] border border-[var(--border-neutral-subtle)]">
                  <span className="text-xs font-bold text-[var(--color-primary-700)] block mb-2">
                    راهکار متصل رُخ‌نما:
                  </span>
                  <p className="text-xs font-semibold text-[var(--text-neutral-strong)] leading-relaxed">
                    {activeSegment.solutionShort}
                  </p>
                  <ul className="mt-3 space-y-1 text-[11px] text-[var(--text-neutral-base)]">
                    {activeSegment.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-[var(--color-primary-600)]" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[var(--bg-neutral-base)] border border-[var(--border-neutral-subtle)] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[var(--text-neutral-strong)] block mb-2">
                      مشخصهٔ فنی و عملیاتی:
                    </span>
                    <div className="text-xs space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[var(--text-neutral-subtle)]">{activeSegment.demoDetails.label}</span>
                        <span className="font-bold text-[var(--text-neutral-strong)]">{activeSegment.demoDetails.value}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[var(--text-neutral-subtle)]">{activeSegment.demoDetails.secondaryLabel}</span>
                        <span className="font-bold text-[var(--color-primary-700)]">{activeSegment.demoDetails.secondaryValue}</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-[var(--border-neutral-subtle)] text-[11px] font-bold text-[var(--color-primary-700)]">
                    دستاورد: {activeSegment.impactMetric}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ۳. خط انتقال داده از فایل قدیمی به کاتالوگ زنده («کاتالوگ جدید را خودتان نمی‌سازید») */}
        <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] p-6 lg:p-10 relative">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[var(--border-neutral-base)] mb-8">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-neutral-subtle)] border border-[var(--border-neutral-base)] text-xs font-bold text-[var(--text-neutral-strong)]">
                <IconTerminal2 size={15} stroke={2.2} />
                <span>خط لوله مهاجرت داده · تبدیل فایل قدیمی به کاتالوگ زنده</span>
              </div>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-[var(--text-neutral-strong)]">
                کاتالوگ جدید را خودتان نمی‌سازید
              </h3>
              <p className="text-sm text-[var(--text-neutral-subtle)] leading-relaxed">
                مهندسان رُخ‌نما داده‌های کاتالوگ، جداول اکسل و فایل‌های شما را استخراج و ساختاربندی می‌کنند. شما فقط فایل اولیه را می‌دهید و خروجی زنده را تحویل می‌گیرید.
              </p>
            </div>
            <div className="font-mono text-xs text-[var(--text-neutral-subtle)] bg-[var(--bg-neutral-subtle)] border border-[var(--border-neutral-base)] px-3 py-2">
              [PIPELINE STATUS: FULLY MANAGED]
            </div>
          </div>

          {/* استیج‌های خط لوله انتقال داده (Horizontal Data Pipeline) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {migrationSteps.map((step, idx) => {
              const isActive = selectedStepIndex === idx;
              return (
                <div
                  key={step.id}
                  onClick={() => setSelectedStepIndex(idx)}
                  className={`p-5 border transition-all duration-200 cursor-pointer rounded-none relative text-right ${
                    isActive
                      ? 'border-[var(--color-primary-600)] bg-[var(--bg-primary-subtle)] ring-1 ring-[var(--color-primary-600)]'
                      : 'border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] hover:border-[var(--text-neutral-subtle)]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono font-bold text-sm text-[var(--color-primary-600)]">
                      {step.num}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 border border-[var(--border-neutral-subtle)] bg-[var(--bg-neutral-base)]">
                      {step.stepBadge}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-[var(--text-neutral-strong)] mb-1">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[var(--text-neutral-subtle)] line-clamp-2 leading-relaxed">
                    {step.shortDesc}
                  </p>

                  <div className="mt-4 pt-2.5 border-t border-[var(--border-neutral-subtle)] text-[11px] font-mono text-[var(--text-neutral-subtle)]">
                    زمان: {step.durationEstimate}
                  </div>
                </div>
              );
            })}
          </div>

          {/* تشریح مرحله فعال خط انتقال داده */}
          <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)] p-6 lg:p-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-neutral-base)] mb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center bg-[var(--color-primary-600)] text-[var(--color-neutral-50)] text-xs font-bold">
                  {activeStep.num}
                </span>
                <div>
                  <h5 className="text-base font-bold text-[var(--text-neutral-strong)]">
                    {activeStep.title} — {activeStep.shortDesc}
                  </h5>
                  <span className="text-xs text-[var(--text-neutral-subtle)] font-mono">
                    فرآیند استاندارد تبدیل مهندسی
                  </span>
                </div>
              </div>

              <div className="text-xs font-bold px-3 py-1.5 bg-[var(--bg-neutral-base)] border border-[var(--border-neutral-base)] text-[var(--color-primary-700)] self-start sm:self-auto">
                خروجی: {activeStep.output}
              </div>
            </div>

            <p className="text-sm text-[var(--text-neutral-base)] leading-relaxed mb-6">
              {activeStep.fullDesc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeStep.inputs.map((inp, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[var(--bg-neutral-base)] border border-[var(--border-neutral-subtle)] text-xs flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[var(--color-primary-600)]" />
                  <span className="text-[var(--text-neutral-strong)] font-medium">مستندات مبنا: {inp}</span>
                </div>
              ))}
            </div>

            {/* نوار دعوت به اقدام */}
            <div className="mt-8 pt-6 border-t border-[var(--border-neutral-base)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[var(--text-neutral-subtle)]">
                فایل‌های کاتالوگ قبلی‌تان را ارسال کنید تا دموی تعاملی محصولات واقعی‌تان آماده شود.
              </span>
              <Button
                color="primary"
                variant="solid"
                size="md"
                iconAfter={<IconArrowLeft size={18} stroke={2.2} />}
              >
                شروع تبدیل و درخواست دمو
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
