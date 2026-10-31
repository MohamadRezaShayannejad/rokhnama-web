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

const toFa = (input: string | number) =>
  String(input)
    .replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])
    .replace(/[.,]/g, (c) => (c === '.' ? '٫' : '،'));

/**
 * اتود ۱ — «پلکان قیمتی»
 * سه کارت با پلکان ارتفاعی: کارت میانی سبک ستون رُخ‌نما در جدول مقایسه
 * (گرادیان primary-100 → سفید + قاب ۲٫۵px) و بیرون‌زدگی عمودی.
 * ردیف‌های قیمت به‌جای تیک/آیکون، معادل‌سنجی چاپی با استایل ردیف‌های سگمنت‌اند.
 */
export default function PricingCardsA() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameFillRightRef = useRef<HTMLDivElement>(null);
  const frameFillLeftRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const root = sectionRef.current;
      const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-card]'));
      const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-equiv-row]'));

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

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 75%', once: true },
      });

      tl.from(cards, {
        opacity: 0,
        y: 44,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.14,
        clearProps: 'all',
      }, 0);

      tl.from(rows, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.08,
        clearProps: 'all',
      }, 0.5);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="relative z-10 w-full py-20 sm:py-28 bg-white text-[var(--text-neutral-strong)] font-sans tracking-[-0.02em] overflow-hidden border-t border-[var(--color-neutral-200)]"
    >
      {/* گلو محیطی پایین سکشن، همساخت سکشن مقایسه */}
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
        {/* سربرگ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 mb-16 sm:mb-20">
          <div className="lg:col-span-6 lg:col-start-4 px-6 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.3] tracking-[-0.02em]">
              سرمایه‌گذاری <span className="font-black">یک‌باره</span>، بدون اشتراک دلاری
            </h2>
            <p className="mt-6 text-base sm:text-lg text-[var(--text-neutral-base)] leading-relaxed font-medium tracking-[-0.02em]">
              هر سطح از نقطهٔ شروع قیمت آغاز می‌شود؛ معادل چاپی همان رقم را کنارش بخوانید.
            </p>
          </div>
        </div>

        {/* گرید کارت‌ها: موبایل انباشته، دسکتاپ پلکان با بیرون‌زدگی میانی */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 lg:items-center">
          {/* ── کارت ۱: قالب نیمه‌آمده ── */}
          <div
            data-card
            className="relative bg-white border border-[var(--color-neutral-200)] lg:border-l-0"
          >
            <div className="p-6 sm:p-8 border-b border-[var(--color-neutral-200)]">
              <span className="block text-xs font-bold text-[var(--color-neutral-500)] mb-1.5">
                نقطهٔ شروع
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-[var(--color-neutral-500)]">از</span>
                <span className="text-3xl sm:text-4xl font-black text-[var(--text-neutral-strong)] tracking-[-0.03em]">
                  {formatNumberFa(19_500_000)}
                </span>
                <span className="text-sm font-bold text-[var(--color-neutral-600)]">تومان</span>
              </div>
              <p className="mt-2 text-sm text-[var(--color-neutral-600)] font-medium">
                پرداخت یک‌بارهٔ ریالی، بدون تمدید سالانه
              </p>
            </div>

            <ul>
              {EQUIVALENCE_ROWS.template.map((row) => (
                <li
                  key={row.pages}
                  data-equiv-row
                  className="group/row flex items-center justify-between gap-3 px-6 sm:px-8 py-4 border-b border-[var(--border-neutral-subtle)] transition-colors duration-300 hover:bg-[var(--color-primary-50)]"
                >
                  <span className="text-sm font-bold text-[var(--text-neutral-strong)] whitespace-nowrap">
                    {printEquivalent(row)}
                  </span>
                  <span className="text-xs text-[var(--text-neutral-subtle)] font-medium text-left leading-snug">
                    {row.tag}
                  </span>
                </li>
              ))}
            </ul>

            <div className="p-6 sm:p-8">
              <Button
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

          {/* ── کارت ۲: طراحی اختصاصی — سبک ستون رُخ‌نما ── */}
          <div
            data-card
            className="relative z-20 lg:-my-8 lg:-mx-2 bg-gradient-to-b from-[var(--color-primary-100)] via-white via-50% to-white shadow-[0_0_0_2.5px_var(--color-primary-600)]"
          >
            <div className="px-6 sm:px-8 pt-8 pb-6 border-b border-[var(--color-neutral-200)]">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-black text-[var(--color-primary-700)]">
                  پرتقاضاترین سطح برای صنایع
                </span>
                <IconSparkles size={18} fill="currentColor" stroke={1.5} className="text-[var(--color-secondary-500)] shrink-0" />
              </div>
              <span className="block text-xs font-bold text-[var(--color-neutral-500)] mb-1.5">
                نقطهٔ شروع
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-[var(--color-primary-700)]">از</span>
                <span className="text-4xl sm:text-5xl font-black text-[var(--color-primary-900)] tracking-[-0.03em]">
                  {formatNumberFa(39_000_000)}
                </span>
                <span className="text-sm font-bold text-[var(--color-primary-800)]">تومان</span>
              </div>
              <p className="mt-2 text-sm text-[var(--color-primary-800)] font-bold">
                پرداخت یک‌بارهٔ ریالی · تعهد رسمی محرمانگی (NDA)
              </p>
            </div>

            <ul>
              {EQUIVALENCE_ROWS.bespoke.map((row) => (
                <li
                  key={row.pages}
                  data-equiv-row
                  className="group/row flex items-center justify-between gap-3 px-6 sm:px-8 py-4 border-b border-[var(--color-neutral-200)] transition-colors duration-300 hover:bg-[var(--color-primary-50)]"
                >
                  <span className="text-sm lg:text-base font-bold text-[var(--color-primary-950)] whitespace-nowrap">
                    {printEquivalent(row)}
                  </span>
                  <span className="text-xs text-[var(--color-primary-700)] font-bold text-left leading-snug">
                    {row.tag}
                  </span>
                </li>
              ))}
            </ul>

            <div className="p-6 sm:p-8">
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

          {/* ── کارت ۳: سازمانی — مراحل ارائهٔ سرویس به‌جای قیمت ── */}
          <div
            data-card
            className="relative bg-[var(--color-neutral-900)] text-white lg:border-l-0 border border-[var(--color-neutral-900)]"
          >
            <div className="p-6 sm:p-8 border-b border-[var(--color-neutral-800)]">
              <span className="block text-xs font-bold text-[var(--color-neutral-400)] mb-1.5">
                معماری چندسطحی و اتصال سازمانی
              </span>
              <span className="block text-2xl sm:text-3xl font-black text-white tracking-[-0.02em]">
                پکیج سازمانی
              </span>
              <p className="mt-2 text-sm text-[var(--color-neutral-400)] font-medium">
                تعرفه پس از ممیزی داده، متناسب با پیاده‌سازی هر سازمان.
              </p>
            </div>

            {/* مراحل ارائه به‌جای لیست قیمت */}
            <ol className="px-6 sm:px-8 py-2">
              {ENTERPRISE_STEPS.map((step, i) => (
                <li
                  key={step.title}
                  data-equiv-row
                  className="flex items-start gap-4 py-4 border-b border-[var(--color-neutral-800)] last:border-b-0"
                >
                  <span className="shrink-0 mt-0.5 text-xs font-black text-[var(--color-secondary-400)]">
                    {formatNumberFa(i + 1)}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-white leading-snug">
                      {step.title}
                    </span>
                    <span className="mt-1 block text-xs text-[var(--color-neutral-400)] leading-relaxed font-medium">
                      {step.desc}
                    </span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="p-6 sm:p-8">
              <Button
                color="white"
                variant="outline"
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
    </section>
  );
}
