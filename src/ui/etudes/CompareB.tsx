'use client';

import { useState } from 'react';
import {
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconArrowLeft,
  IconArrowRight,
  IconLayoutGrid,
  IconFocus2,
  IconRefresh,
  IconDeviceMobile,
  IconChartBar,
  IconFileText,
  IconSparkles,
} from '@tabler/icons-react';
import { Button } from '@/ui/Button';
import { COMPARISON_CRITERIA } from './compareData';

export default function CompareB() {
  // حالت سوییچ: 'grid' (دید ماتریسی ۴ کارت) یا 'focus' (میکروسکوپ تحلیلی ملاک‌به‌ملاک)
  const [viewMode, setViewMode] = useState<'grid' | 'focus'>('grid');
  const [selectedCriterionIdx, setSelectedCriterionIdx] = useState<number>(0);

  const activeCriterion = COMPARISON_CRITERIA[selectedCriterionIdx];

  const getMetricIcon = (id: string) => {
    switch (id) {
      case '01':
        return <IconRefresh className="w-5 h-5 text-[var(--color-primary-600)]" />;
      case '02':
        return <IconDeviceMobile className="w-5 h-5 text-[var(--color-primary-600)]" />;
      case '03':
        return <IconChartBar className="w-5 h-5 text-[var(--color-primary-600)]" />;
      case '04':
        return <IconFileText className="w-5 h-5 text-[var(--color-primary-600)]" />;
      default:
        return <IconFileText className="w-5 h-5 text-[var(--color-primary-600)]" />;
    }
  };

  return (
    <section
      dir="rtl"
      id="compare-etude-b"
      className="relative w-full py-16 lg:py-24 bg-[var(--bg-neutral-base)] text-[var(--text-neutral-strong)] font-sans overflow-hidden"
    >
      {/* گرید هندسی هیرلاین پس‌زمینه */}
      <div className="absolute inset-0 pointer-events-none opacity-30 [background-image:linear-gradient(to_right,var(--border-neutral-subtle)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-neutral-subtle)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* هدر بخش و کنترل سوییچ حالت نمایش */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 lg:mb-14 pb-6 border-b border-[var(--border-neutral-base)]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-secondary-50)] border border-[var(--color-secondary-300)] text-[var(--color-secondary-900)] text-xs font-bold mb-3">
              <span className="font-mono">۰۴</span>
              <span className="w-1.5 h-1.5 bg-[var(--color-secondary-500)]" />
              <span>بخش چهارم · تمایز قاطع</span>
              <span className="text-[var(--text-neutral-subtle)]">|</span>
              <span>کارت‌های مقایسه‌ای ملاک‌به‌ملاک</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-neutral-strong)] leading-tight tracking-tight">
              مقایسهٔ سه شیوهٔ ارائهٔ کاتالوگ
            </h2>

            <p className="mt-2 text-sm sm:text-base font-medium text-[var(--text-neutral-base)] max-w-2xl leading-relaxed">
              ارزیابی ساختاریافتهٔ ۴ ملاک حیاتی فروش و انبارداری در قالب کارت‌های مهندسی تفکیک‌شده.
            </p>
          </div>

          {/* تب سوییچ بین حالت ماتریسی و میکروسکوپ تحلیلی */}
          <div className="inline-flex p-1 bg-[var(--bg-neutral-subtle)] border border-[var(--border-neutral-base)] self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[var(--color-primary-600)] text-white shadow-sm'
                  : 'text-[var(--text-neutral-base)] hover:text-[var(--text-neutral-strong)]'
              }`}
            >
              <IconLayoutGrid className="w-4 h-4" />
              <span>دید کلی ۴ ملاک</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('focus')}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-bold transition-colors ${
                viewMode === 'focus'
                  ? 'bg-[var(--color-primary-600)] text-white shadow-sm'
                  : 'text-[var(--text-neutral-base)] hover:text-[var(--text-neutral-strong)]'
              }`}
            >
              <IconFocus2 className="w-4 h-4" />
              <span>میکروسکوپ تحلیلی (گام‌به‌گام)</span>
            </button>
          </div>
        </div>

        {/* حالت ۱: دید کلی ۴ ملاک (ماتریس کارت‌ها) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {COMPARISON_CRITERIA.map((criterion) => (
              <div
                key={criterion.id}
                className="relative border border-[var(--border-neutral-base)] bg-white p-5 lg:p-6 shadow-sm flex flex-col justify-between"
              >
                {/* گوشه مهندسی */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--color-primary-600)]" />

                {/* سربرگ کارت */}
                <div>
                  <div className="flex items-center justify-between gap-3 pb-3.5 mb-4 border-b border-[var(--border-neutral-subtle)]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-[var(--bg-primary-subtle)] border border-[var(--color-primary-200)] flex items-center justify-center shrink-0">
                        {getMetricIcon(criterion.id)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[var(--color-primary-600)]">
                            ملاک شمارهٔ {criterion.numPersian}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 bg-[var(--bg-neutral-subtle)] border border-[var(--border-neutral-subtle)] text-[var(--text-neutral-subtle)]">
                            {criterion.systemTag}
                          </span>
                        </div>
                        <h3 className="text-base font-extrabold text-[var(--text-neutral-strong)] mt-0.5">
                          {criterion.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* سه ردیف مقایسه‌ای داخل هر کارت با خطوط هیرلاین */}
                  <div className="space-y-3">
                    {/* سطح ۱: کاتالوگ چاپی و PDF */}
                    <div className="p-3 bg-[var(--color-neutral-50)] border border-[var(--border-neutral-subtle)] flex items-start gap-3">
                      <div className="w-6 h-6 shrink-0 bg-[var(--color-error-50)] border border-[var(--color-error-200)] flex items-center justify-center text-[var(--color-error-600)] mt-0.5">
                        <IconX className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-[var(--text-neutral-strong)]">
                            کاتالوگ چاپی و PDF
                          </span>
                          <span className="text-[11px] font-bold text-[var(--color-error-600)] px-1.5 bg-[var(--color-error-50)] border border-[var(--color-error-200)]">
                            {criterion.paper.badge}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                          {criterion.paper.desc}
                        </p>
                      </div>
                    </div>

                    {/* سطح ۲: سرویس‌های خارجی */}
                    <div className="p-3 bg-[var(--color-neutral-50)] border border-[var(--border-neutral-subtle)] flex items-start gap-3">
                      <div className="w-6 h-6 shrink-0 bg-[var(--color-warning-50)] border border-[var(--color-warning-200)] flex items-center justify-center text-[var(--color-warning-700)] mt-0.5">
                        <IconAlertTriangle className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-[var(--text-neutral-strong)]">
                            سرویس‌های خارجی
                          </span>
                          <span className="text-[11px] font-bold text-[var(--color-warning-700)] px-1.5 bg-[var(--color-warning-50)] border border-[var(--color-warning-200)]">
                            {criterion.foreign.badge}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                          {criterion.foreign.desc}
                        </p>
                      </div>
                    </div>

                    {/* سطح ۳: کاتالوگ تعاملی رُخ‌نما با کادر ۲px طلایی */}
                    <div className="p-3.5 bg-[var(--color-secondary-50)]/70 border-2 border-[var(--color-secondary-500)] flex items-start gap-3 relative">
                      <div className="w-6 h-6 shrink-0 bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)] flex items-center justify-center mt-0.5">
                        <IconCheck className="w-4 h-4 stroke-[3]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-black text-[var(--color-primary-950)] flex items-center gap-1.5">
                            <span>کاتالوگ تعاملی رُخ‌نما</span>
                            <span className="w-1.5 h-1.5 bg-[var(--color-secondary-500)]" />
                          </span>
                          <span className="text-[11px] font-bold text-[var(--color-secondary-950)] px-2 py-0.5 bg-[var(--color-secondary-300)] border border-[var(--color-secondary-500)]">
                            {criterion.rok.badge}
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs font-medium text-[var(--color-primary-950)] leading-relaxed">
                          {criterion.rok.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* فوتر هر کارت: نتیجه مهندسی */}
                <div className="mt-4 pt-3 border-t border-[var(--border-neutral-subtle)] text-[11px] text-[var(--text-neutral-subtle)] flex items-center justify-between">
                  <span>وضعیت انطباق سازمانی:</span>
                  <span className="font-bold text-[var(--color-primary-700)]">
                    تضمین پیاده‌سازی در رُخ‌نما
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* حالت ۲: میکروسکوپ تحلیلی ملاک‌به‌ملاک (کاوش عمیق تعاملی) */}
        {viewMode === 'focus' && (
          <div className="border border-[var(--border-neutral-base)] bg-white shadow-sm">
            {/* ناوبری گام‌های ۴ گانه */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-b border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)]">
              {COMPARISON_CRITERIA.map((criterion, idx) => {
                const isSelected = selectedCriterionIdx === idx;
                return (
                  <button
                    key={criterion.id}
                    type="button"
                    onClick={() => setSelectedCriterionIdx(idx)}
                    className={`p-3.5 lg:p-4 text-right transition-colors border-l border-[var(--border-neutral-base)] flex items-center gap-3 relative ${
                      isSelected
                        ? 'bg-white border-t-2 border-t-[var(--color-primary-600)] shadow-xs'
                        : 'hover:bg-white/60 text-[var(--text-neutral-subtle)]'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                        isSelected
                          ? 'bg-[var(--color-primary-600)] text-white'
                          : 'bg-[var(--border-neutral-base)] text-[var(--text-neutral-strong)]'
                      }`}
                    >
                      {criterion.numPersian}
                    </span>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono text-[var(--text-neutral-subtle)] block">
                        ملاک {criterion.id}
                      </span>
                      <span className="text-xs font-extrabold text-[var(--text-neutral-strong)] truncate block">
                        {criterion.shortTitle}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* بدنهٔ میکروسکوپ تحلیلی برای ملاک فعال */}
            <div className="p-6 lg:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--border-neutral-subtle)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--bg-primary-subtle)] border border-[var(--color-primary-200)] flex items-center justify-center shrink-0">
                    {getMetricIcon(activeCriterion.id)}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[var(--color-primary-600)]">
                      ملاک ارزیابی {activeCriterion.numPersian} از ۴ · حوزهٔ {activeCriterion.systemTag}
                    </span>
                    <h3 className="text-lg lg:text-xl font-black text-[var(--text-neutral-strong)]">
                      {activeCriterion.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-auto">
                  <button
                    type="button"
                    disabled={selectedCriterionIdx === 0}
                    onClick={() => setSelectedCriterionIdx((prev) => Math.max(0, prev - 1))}
                    className="p-2 border border-[var(--border-neutral-base)] bg-white disabled:opacity-40 hover:bg-[var(--bg-neutral-subtle)] text-[var(--text-neutral-strong)]"
                    aria-label="ملاک قبلی"
                  >
                    <IconArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-[var(--text-neutral-subtle)] px-2">
                    {activeCriterion.numPersian} / ۴
                  </span>
                  <button
                    type="button"
                    disabled={selectedCriterionIdx === COMPARISON_CRITERIA.length - 1}
                    onClick={() => setSelectedCriterionIdx((prev) => Math.min(COMPARISON_CRITERIA.length - 1, prev + 1))}
                    className="p-2 border border-[var(--border-neutral-base)] bg-white disabled:opacity-40 hover:bg-[var(--bg-neutral-subtle)] text-[var(--text-neutral-strong)]"
                    aria-label="ملاک بعدی"
                  >
                    <IconArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* مقایسه سه‌جانبهٔ دقیق با کارت‌های مقایسهٔ تفصیلی */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* شیوهٔ ۱: کاغذ */}
                <div className="border border-[var(--color-error-200)] bg-[var(--color-error-50)]/30 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--color-error-200)]">
                      <span className="text-xs font-bold text-[var(--color-neutral-700)]">
                        ۱. کاتالوگ چاپی و PDF
                      </span>
                      <span className="px-2 py-0.5 bg-[var(--color-error-50)] border border-[var(--color-error-200)] text-[var(--color-error-600)] text-xs font-bold">
                        {activeCriterion.paper.badge}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-neutral-strong)] leading-relaxed font-medium mb-4">
                      {activeCriterion.paper.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[var(--color-error-200)]/60 text-xs text-[var(--color-error-700)]">
                    <strong>علت بن‌بست فنی:</strong> {activeCriterion.paper.technicalFlaw}
                  </div>
                </div>

                {/* شیوهٔ ۲: خارجی */}
                <div className="border border-[var(--color-warning-200)] bg-[var(--color-warning-50)]/30 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--color-warning-200)]">
                      <span className="text-xs font-bold text-[var(--color-neutral-700)]">
                        ۲. سرویس‌های خارجی
                      </span>
                      <span className="px-2 py-0.5 bg-[var(--color-warning-50)] border border-[var(--color-warning-200)] text-[var(--color-warning-700)] text-xs font-bold">
                        {activeCriterion.foreign.badge}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-neutral-strong)] leading-relaxed font-medium mb-4">
                      {activeCriterion.foreign.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[var(--color-warning-200)]/60 text-xs text-[var(--color-warning-800)]">
                    <strong>نقطهٔ اصطکاک:</strong> {activeCriterion.foreign.technicalFlaw}
                  </div>
                </div>

                {/* شیوهٔ ۳: رُخ‌نما با کادر ۲px طلایی و پس‌زمینه پرمیوم */}
                <div className="border-2 border-[var(--color-secondary-500)] bg-[var(--color-secondary-50)]/60 p-5 flex flex-col justify-between relative shadow-sm">
                  <div className="absolute -top-3 left-4 px-2.5 py-0.5 bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)] text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                    <IconSparkles className="w-3 h-3" />
                    <span>برتری قطعی</span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--color-secondary-300)]">
                      <span className="text-xs font-black text-[var(--color-primary-900)]">
                        ۳. کاتالوگ تعاملی رُخ‌نما
                      </span>
                      <span className="px-2 py-0.5 bg-[var(--color-secondary-200)] border border-[var(--color-secondary-500)] text-[var(--color-secondary-950)] text-xs font-black">
                        {activeCriterion.rok.badge}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-primary-950)] leading-relaxed font-bold mb-4">
                      {activeCriterion.rok.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[var(--color-secondary-300)] text-xs text-[var(--color-secondary-950)]">
                    <strong>راهکار فنی رُخ‌نما:</strong> {activeCriterion.rok.technicalAdvantage}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* جعبه اقدام سریع و تماس پایین اتود */}
        <div className="mt-8 p-6 bg-white border border-[var(--border-neutral-base)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[var(--color-primary-600)] block mb-1">
              آیا کاتالوگ فعلی شما در این ۴ ملاک دچار اصطکاک است؟
            </span>
            <p className="text-sm text-[var(--text-neutral-base)]">
              نسخهٔ آزمایشی کاتالوگ سازمانی خود را با داده‌های واقعی محصولاتتان مشاهده کنید.
            </p>
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
              <span>درخواست کاتالوگ تعاملی</span>
              <IconArrowLeft className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
