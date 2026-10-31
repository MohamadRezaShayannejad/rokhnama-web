'use client';

import { IconArrowLeft } from '@tabler/icons-react';
import { Button } from '@/ui/Button';
import { INDUSTRIES, selectIndustry } from '@/ui/scenarios/scenariosData';

/**
 * اتود ۱ — دفتر تطبیق (Fit Ledger)
 * یک جدول مویی: صنعت، کاری که کاتالوگ انجام می‌دهد، و نام آن قابلیت.
 * هر هشت ردیف هم‌زمان دیده می‌شوند؛ تراکم بالا، سر‌و‌صدای کم.
 */
export default function ScenariosLayout1() {
  return (
    <section
      className="relative w-full bg-white text-[var(--color-neutral-900)] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 tracking-[-0.02em] border-t border-[var(--color-neutral-200)]"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        {/* سرصفحه: عنوان دو سطری در راست، توضیح و اقدام در چپ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-12 sm:mb-16">
          <div className="lg:col-span-7">
            <h2 className="tracking-[-0.02em]">
              <span className="block text-2xl sm:text-3xl lg:text-[38px] font-black leading-[1.25] tracking-[-0.025em]">
                کاتالوگ به کار چه کسب‌وکارهایی می‌آید
              </span>
              <span className="block text-xl sm:text-2xl lg:text-[28px] font-bold text-[var(--color-neutral-500)] mt-3 leading-[1.35]">
                و در هر کدام دقیقاً چه کاری انجام می‌دهد
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start gap-6 pt-3">
            <p className="text-base sm:text-lg text-[var(--color-neutral-700)] font-medium leading-relaxed">
              صنعت خود را انتخاب کنید؛ فرم درخواست دمو برای همان صنعت پر می‌شود.
            </p>
            <Button
              asChild
              color="primary"
              variant="solid"
              size="md"
              paperFold
              className="font-black"
            >
              <a href="#demo">درخواست دمو</a>
            </Button>
          </div>
        </div>

        {/* جدول صنایع: هشت ردیف با جداکنندهٔ مویی و یک خط موی سرصفحه */}
        <div className="border-t border-[var(--color-neutral-200)]">
          {INDUSTRIES.map((industry) => (
            <button
              key={industry.id}
              type="button"
              onClick={() => selectIndustry(industry.name, industry.id)}
              className="group/row grid w-full grid-cols-1 lg:grid-cols-[280px_1fr_auto] items-center gap-x-8 gap-y-4 px-4 sm:px-6 py-6 lg:py-7 text-right border-b border-[var(--color-neutral-200)] transition-colors duration-300 hover:bg-[var(--color-primary-50)] focus-visible:outline-none focus-visible:bg-[var(--color-primary-50)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-primary-400)] cursor-pointer"
            >
              <span className="text-base sm:text-lg lg:text-xl font-black text-[var(--color-neutral-900)] leading-[1.3] tracking-[-0.025em] transition-colors duration-300 group-hover/row:text-[var(--color-primary-800)] group-focus-visible/row:text-[var(--color-primary-800)]">
                {industry.name}
              </span>

              <span className="text-sm text-[var(--color-neutral-600)] font-medium leading-relaxed">
                {industry.fit}
              </span>

              <span className="flex items-center justify-between gap-4 lg:justify-end">
                <span className="inline-flex items-center h-8 px-3 text-[11px] font-bold tracking-[-0.01em] bg-[var(--color-primary-50)] text-[var(--color-primary-700)] border border-[var(--color-primary-200)] transition-colors duration-300 group-hover/row:bg-[var(--color-primary-600)] group-hover/row:text-white group-hover/row:border-[var(--color-primary-600)] group-focus-visible/row:bg-[var(--color-primary-600)] group-focus-visible/row:text-white group-focus-visible/row:border-[var(--color-primary-600)]">
                  {industry.capability}
                </span>
                <IconArrowLeft
                  size={18}
                  stroke={2.2}
                  className="shrink-0 text-[var(--color-neutral-300)] transition-all duration-300 group-hover/row:text-[var(--color-primary-600)] group-hover/row:-translate-x-1.5 group-focus-visible/row:text-[var(--color-primary-600)]"
                  aria-hidden="true"
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
