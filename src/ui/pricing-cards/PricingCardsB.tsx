'use client';

import { useRef } from 'react';
import { IconArrowLeft, IconSparkles } from '@tabler/icons-react';
import { Button } from '@/ui/Button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { formatNumberFa } from '@/ui/etudes/pricingCalculations';
import {
  EQUIVALENCE_ROWS,
  ENTERPRISE_STEPS,
  printEquivalent,
} from './cardsData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * اتود ۲ — «قاب مهندسی»
 * هر سه سطح داخل یک قاب خطی مشترک با ستون‌های جداکنندهٔ عمودی نشسته‌اند؛
 * کارت میانی از قاب بیرون می‌زند و کادر primary-600 می‌گیرد — همان رفتار
 * ستون رُخ‌نما در جدول مقایسه. سربرگ سکشن چپ‌تراز است، برخلاف اتود ۱.
 */
export default function PricingCardsB() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameFillRightRef = useRef<HTMLDivElement>(null);
  const frameFillLeftRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const root = sectionRef.current;
      const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-panel]'));
      const rules = Array.from(root.querySelectorAll<HTMLElement>('[data-rule]'));

      /* خطوط عمودی کناری با اسکرول پر می‌شوند، هم‌ساخت سکشن «چرا رُخ‌نما متفاوت است» */
      const fillTargets = [frameFillRightRef.current, frameFillLeftRef.current].filter(
        Boolean
      ) as HTMLDivElement[];

      if (fillTargets.length) {
        gsap.fromTo(
          fillTargets,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
            },
          }
        );
      }

      /* خطوط افقی ردیف‌ها از عطف راست کشیده می‌شوند، همساخت دفتر تطبیق */
      gsap.from(rules, {
        scaleX: 0,
        duration: 0.55,
        ease: 'power3.out',
        stagger: 0.05,
        clearProps: 'all',
        scrollTrigger: { trigger: root, start: 'top 70%', once: true },
      });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 72%', once: true },
      });

      tl.from(panels, {
        opacity: 0,
        y: 34,
        duration: 0.65,
        ease: 'power3.out',
        clearProps: 'all',
      }, 0);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative z-10 w-full py-20 sm:py-26 bg-white text-[var(--text-neutral-strong)] font-sans tracking-[-0.02em] overflow-hidden border-t border-[var(--color-neutral-200)]"
    >
      {/* گلو محیطی پایین سکشن، هم‌ساخت سکشن مقایسه */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 w-[140%] h-[60%] z-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 100% at 50% 100%, color-mix(in srgb, var(--color-primary-100) 50%, transparent), transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* خطوط عمودی ممتد طرفین در کانتینر ۱۴۷۲px با رنگ اختصاصی neutral-200 و پرشونده با primary-600 */}
      <div className="pointer-events-none absolute inset-0 z-20 flex justify-center overflow-hidden" aria-hidden="true">
        <div className="relative h-full w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
          <div className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-neutral-200)]" />
          <div
            ref={frameFillRightRef}
            className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-primary-600)] origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
          <div className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-neutral-200)]" />
          <div
            ref={frameFillLeftRef}
            className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-primary-600)] origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* سربرگ چپ‌تراز در گرید ۱۲تایی */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start mb-14 sm:mb-16">
          <div className="lg:col-span-7">
            <h2 className="tracking-[-0.02em]">
              <span className="block text-2xl sm:text-3xl lg:text-[38px] font-black leading-[1.25] tracking-[-0.025em]">
                تعرفهٔ شفاف ریالی
              </span>
              <span className="block text-xl sm:text-2xl lg:text-[28px] font-bold text-[var(--color-neutral-800)] mt-[14px] leading-[1.35]">
                از نقطهٔ شروعِ هر سطح، نه از انتهای قرارداد
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5 pt-3">
            <p className="text-base sm:text-lg text-[var(--color-neutral-700)] font-medium leading-relaxed">
              پرداخت یک‌باره، بدون اشتراک ماهانه و بدون وابستگی به نوسان نرخ ارز.
            </p>
          </div>
        </div>

        {/* قاب مهندسی مشترک */}
        <div className="relative border border-[var(--color-neutral-300)] bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* ── پنل ۱: قالب نیمه‌آماده ── */}
            <div data-panel className="flex flex-col border-b border-[var(--color-neutral-200)] lg:border-b-0 lg:border-l lg:border-l-[var(--color-neutral-200)]">
              <div className="px-6 sm:px-7 pt-8 pb-6 border-b border-[var(--color-neutral-200)]">
                <span className="block text-xs font-bold text-[var(--color-neutral-500)] mb-2">
                  قالب نیمه‌آماده
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-bold text-[var(--color-neutral-500)]">از</span>
                  <span className="text-3xl sm:text-4xl font-black text-[var(--text-neutral-strong)] tracking-[-0.03em]">
                    {formatNumberFa(19_500_000)}
                  </span>
                  <span className="text-sm font-bold text-[var(--color-neutral-600)]">تومان</span>
                </div>
              </div>

              <ul className="flex-1">
                {EQUIVALENCE_ROWS.template.map((row) => (
                  <li
                    key={row.pages}
                    className="group/row relative flex items-center justify-between gap-3 px-6 sm:px-7 py-4 transition-colors duration-300 hover:bg-[var(--color-primary-50)]"
                  >
                    <span data-rule className="pointer-events-none absolute bottom-0 right-0 h-[1px] w-full origin-right bg-[var(--border-neutral-subtle)]" aria-hidden="true" />
                    <span className="text-sm font-bold whitespace-nowrap">
                      {printEquivalent(row)}
                    </span>
                    <span className="text-xs text-[var(--text-neutral-subtle)] font-medium text-left leading-snug">
                      {row.tag}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="p-6 sm:p-7">
                <Button
                  color="primary"
                  variant="outline"
                  size="md"
                  fullWidth
                  iconAfter={<IconArrowLeft size={20} stroke={2.5} />}
                  onClick={() => {
                    const el = document.getElementById('demo') || document.getElementById('demo-request');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>درخواست دمو</span>
                </Button>
              </div>
            </div>

            {/* ── پنل ۲: طراحی اختصاصی — ستون رُخ‌نما ── */}
            <div
              data-panel
              className="relative z-20 flex flex-col lg:-my-7 bg-gradient-to-b from-[var(--color-primary-100)] via-white via-50% to-white shadow-[0_0_0_2.5px_var(--color-primary-600)]"
            >
              <div className="px-6 sm:px-7 pt-8 pb-6 border-b border-[var(--color-neutral-200)]">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-[var(--color-primary-700)]">
                    <IconSparkles size={16} fill="currentColor" stroke={1.5} className="text-[var(--color-secondary-500)] shrink-0" />
                    انتخاب اول صنایع و تولیدکنندگان
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-sm font-bold text-[var(--color-primary-700)]">از</span>
                  <span className="text-4xl sm:text-5xl font-black text-[var(--color-primary-900)] tracking-[-0.03em]">
                    {formatNumberFa(39_000_000)}
                  </span>
                  <span className="text-sm font-bold text-[var(--color-primary-800)]">تومان</span>
                </div>
              </div>

              <ul className="flex-1">
                {EQUIVALENCE_ROWS.bespoke.map((row) => (
                  <li
                    key={row.pages}
                    className="group/row relative flex items-center justify-between gap-3 px-6 sm:px-7 py-4 transition-colors duration-300 hover:bg-[var(--color-primary-50)]"
                  >
                    <span data-rule className="pointer-events-none absolute bottom-0 right-0 h-[1px] w-full origin-right bg-[var(--color-neutral-200)]" aria-hidden="true" />
                    <span className="text-sm lg:text-base font-bold text-[var(--color-primary-950)] whitespace-nowrap">
                      {printEquivalent(row)}
                    </span>
                    <span className="text-xs text-[var(--color-primary-700)] font-bold text-left leading-snug">
                      {row.tag}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="p-6 sm:p-7">
                <Button
                  color="secondary"
                  variant="solid"
                  size="md"
                  fullWidth
                  iconAfter={<IconArrowLeft size={20} stroke={2.5} />}
                  className="text-[var(--text-neutral-strong)] font-bold"
                  onClick={() => {
                    const el = document.getElementById('demo') || document.getElementById('demo-request');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>دریافت مشاوره</span>
                </Button>
              </div>
            </div>

            {/* ── پنل ۳: سازمانی — مراحل ارائه ── */}
            <div data-panel className="flex flex-col border-t border-[var(--color-neutral-200)] lg:border-t-0 lg:border-r lg:border-r-[var(--color-neutral-200)]">
              <div className="px-6 sm:px-7 pt-8 pb-6 border-b border-[var(--color-neutral-200)]">
                <span className="block text-xs font-bold text-[var(--color-neutral-500)] mb-2">
                  پکیج سازمانی
                </span>
                <span className="text-2xl sm:text-[28px] font-black text-[var(--text-neutral-strong)] tracking-[-0.02em] block leading-[1.3]">
                  مسیر چهارمرحله‌ای تحویل
                </span>
                <p className="mt-2 text-sm text-[var(--color-neutral-600)] font-medium leading-relaxed">
                  به‌جای لیست قیمت: هر مرحله خروجی مشخصی به سازمان شما تحویل می‌دهد.
                </p>
              </div>

              <ol className="flex-1">
                {ENTERPRISE_STEPS.map((step, i) => (
                  <li
                    key={step.title}
                    className="relative flex items-start gap-4 px-6 sm:px-7 py-4"
                  >
                    <span data-rule className="pointer-events-none absolute bottom-0 right-0 h-[1px] w-full origin-right bg-[var(--border-neutral-subtle)]" aria-hidden="true" />
                    <span className="shrink-0 mt-0.5 text-xs font-black text-[var(--color-primary-600)]">
                      {formatNumberFa(i + 1)}
                    </span>
                    <span>
                      <span className="block text-sm font-bold leading-snug">{step.title}</span>
                      <span className="mt-1 block text-xs text-[var(--text-neutral-subtle)] leading-relaxed font-medium">
                        {step.desc}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="p-6 sm:p-7">
                <Button
                  color="primary"
                  variant="solid"
                  size="md"
                  fullWidth
                  iconAfter={<IconArrowLeft size={20} stroke={2.5} />}
                  onClick={() => {
                    const el = document.getElementById('demo') || document.getElementById('demo-request');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>شروع ممیزی</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
