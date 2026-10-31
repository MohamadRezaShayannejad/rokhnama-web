'use client';

import { IconArrowLeft } from '@tabler/icons-react';
import { Button } from '@/ui/Button';
import { INDUSTRIES, selectIndustry } from '@/ui/scenarios/scenariosData';

/**
 * اتود ۳ — شاخص تایپوگرافیک (Type Index)
 * نام صنعت‌ها درشت و در دو ستون چهارتایی، مثل فهرست یک نشریه.
 * سرصفحه در ستون راست می‌ماند و همراه اسکرول حرکت می‌کند؛ کارت و کادری در کار نیست.
 */
export default function ScenariosLayout3() {
  const firstColumn = INDUSTRIES.slice(0, 4);
  const secondColumn = INDUSTRIES.slice(4);

  return (
    <section
      className="relative w-full bg-white text-[var(--color-neutral-900)] py-20 sm:py-28 px-4 sm:px-6 lg:px-8 tracking-[-0.02em] border-t border-[var(--color-neutral-200)]"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* سرصفحهٔ چسبان در ستون راست */}
        <div className="lg:col-span-4 lg:sticky lg:top-[136px]">
          <h2 className="tracking-[-0.02em]">
            <span className="block text-2xl sm:text-3xl lg:text-[38px] font-black leading-[1.25] tracking-[-0.025em]">
              کاتالوگ به کار چه کسب‌وکارهایی می‌آید
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[var(--color-neutral-700)] font-medium leading-relaxed">
            صنعت خود را انتخاب کنید؛ فرم درخواست دمو برای همان صنعت پر می‌شود.
          </p>

          <div className="mt-8">
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

        {/* فهرست دوستونه: هشت صنعت با تایپ درشت و خط مویی */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {[firstColumn, secondColumn].map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="border-t border-[var(--color-neutral-300)]"
            >
              {column.map((industry) => (
                <button
                  key={industry.id}
                  type="button"
                  onClick={() => selectIndustry(industry.name, industry.id)}
                  className="group/idx relative block w-full text-right border-b border-[var(--color-neutral-200)] py-7 lg:py-8 cursor-pointer focus-visible:outline-none"
                >
                  <span className="flex items-start justify-between gap-5">
                    <span className="min-w-0">
                      <span className="block text-xl sm:text-2xl lg:text-[26px] font-black text-[var(--color-neutral-900)] leading-[1.25] tracking-[-0.03em] transition-colors duration-300 group-hover/idx:text-[var(--color-primary-800)] group-focus-visible/idx:text-[var(--color-primary-800)]">
                        {industry.name}
                      </span>
                      <span className="block mt-2.5 text-sm text-[var(--color-neutral-600)] font-medium leading-relaxed">
                        {industry.fit}
                      </span>
                      <span className="mt-3 inline-block text-[11px] font-bold text-[var(--color-primary-700)]">
                        {industry.capability}
                      </span>
                    </span>

                    <IconArrowLeft
                      size={20}
                      stroke={2.2}
                      className="mt-1 shrink-0 text-[var(--color-neutral-300)] transition-all duration-300 group-hover/idx:text-[var(--color-primary-600)] group-hover/idx:-translate-x-1.5 group-focus-visible/idx:text-[var(--color-primary-600)]"
                      aria-hidden="true"
                    />
                  </span>

                  {/* خط تاکیدی که از راست زیر ردیف کشیده می‌شود */}
                  <span
                    className="absolute bottom-[-1px] right-0 h-[2px] w-0 bg-[var(--color-primary-600)] transition-[width] duration-500 group-hover/idx:w-full group-focus-visible/idx:w-full"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
