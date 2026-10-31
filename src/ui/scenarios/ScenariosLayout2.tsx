'use client';

import { IconArrowLeft } from '@tabler/icons-react';
import { Button } from '@/ui/Button';
import { INDUSTRIES, selectIndustry } from '@/ui/scenarios/scenariosData';

/**
 * اتود ۲ — نقشهٔ اتصال (Wiring Map)
 * صنعت در راست و قابلیت در چپ، با یک خط موی که بین‌شان کشیده شده است.
 * هاور روی هر ردیف، خط را ضخیم و پررنگ می‌کند؛ چشم مسیر را تا قابلیت دنبال می‌کند.
 */
export default function ScenariosLayout2() {
  return (
    <section
      className="relative w-full bg-white text-[var(--color-neutral-900)] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 tracking-[-0.02em] border-t border-[var(--color-neutral-200)]"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        {/* سرصفحه: عنوان در راست، توضیح و اقدام در چپ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-14 sm:mb-20">
          <div className="lg:col-span-7">
            <h2 className="tracking-[-0.02em]">
              <span className="block text-2xl sm:text-3xl lg:text-[38px] font-black leading-[1.25] tracking-[-0.025em]">
                هر صنعت، یک قابلیت که به کارش می‌آید
              </span>
              <span className="block text-xl sm:text-2xl lg:text-[28px] font-bold text-[var(--color-neutral-500)] mt-3 leading-[1.35]">
                خط را دنبال کنید تا ببینید کدام قابلیت کجای کار می‌نشیند
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
              variant="outline"
              size="md"
              paperFold={false}
              iconAfter={<IconArrowLeft size={18} stroke={2.5} />}
              className="font-bold"
            >
              <a href="#demo">درخواست دمو</a>
            </Button>
          </div>
        </div>

        {/* سرستون‌های دو سوی نقشه */}
        <div className="hidden lg:grid grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)] gap-x-0 pb-3 border-b border-[var(--color-neutral-300)]">
          <span className="text-[11px] font-bold tracking-[0.02em] text-[var(--color-neutral-600)] pe-1">
            صنعت
          </span>
          <span aria-hidden="true" />
          <span className="text-[11px] font-bold tracking-[0.02em] text-[var(--color-neutral-600)] ps-1">
            قابلیتی که به کارش می‌آید
          </span>
        </div>

        {/* نقشه: هر ردیف یک صنعت، یک خط رابط، و یک قابلیت */}
        <div>
          {INDUSTRIES.map((industry) => (
            <button
              key={industry.id}
              type="button"
              onClick={() => selectIndustry(industry.name, industry.id)}
              className="group/wire grid w-full grid-cols-1 lg:grid-cols-[minmax(0,1fr)_88px_minmax(0,1fr)] items-center gap-y-3 px-4 sm:px-6 lg:px-0 py-5 lg:py-6 text-right border-b border-[var(--color-neutral-200)] transition-colors duration-300 hover:bg-[var(--color-primary-50)]/70 focus-visible:outline-none focus-visible:bg-[var(--color-primary-50)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-primary-400)] cursor-pointer"
            >
              <span className="lg:pe-6">
                <span className="block text-base sm:text-lg font-black text-[var(--color-neutral-900)] leading-[1.3] tracking-[-0.025em] transition-colors duration-300 group-hover/wire:text-[var(--color-primary-800)] group-focus-visible/wire:text-[var(--color-primary-800)]">
                  {industry.name}
                </span>
                <span className="block mt-1.5 text-sm text-[var(--color-neutral-600)] font-medium leading-relaxed lg:hidden">
                  {industry.fit}
                </span>
              </span>

              {/* خط رابط: در سکون مویی و کم‌رنگ، در هاور خط پرایمری از راست به چپ پر می‌شود */}
              <span className="hidden lg:flex items-center justify-center relative h-4" aria-hidden="true">
                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[var(--color-neutral-300)]" />
                <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-[var(--color-primary-600)] origin-right scale-x-0 transition-transform duration-300 group-hover/wire:scale-x-100 group-focus-visible/wire:scale-x-100" />
              </span>

              <span className="flex items-start justify-between gap-6 lg:ps-6">
                <span className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold tracking-[0.02em] text-[var(--color-primary-700)] transition-colors duration-300">
                    {industry.capability}
                  </span>
                  <span className="hidden lg:block text-sm text-[var(--color-neutral-600)] font-medium leading-relaxed">
                    {industry.fit}
                  </span>
                </span>
                <IconArrowLeft
                  size={18}
                  stroke={2.2}
                  className="mt-0.5 shrink-0 text-[var(--color-neutral-300)] transition-all duration-300 group-hover/wire:text-[var(--color-primary-600)] group-hover/wire:-translate-x-1.5 group-focus-visible/wire:text-[var(--color-primary-600)]"
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