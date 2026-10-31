'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  IconReceipt,
  IconCoins,
  IconTruckDelivery,
  IconEyeOff,
  IconDeviceMobileOff,
  IconBrandTelegram,
} from '@tabler/icons-react';

gsap.registerPlugin(ScrollTrigger);

// محتوای واقعی سکشن ۲ از docs/landing-content.md (بازنویسی کوتاه بر اساس docs/voice.md)
const COSTS = [
  {
    n: '۱',
    icon: IconCoins,
    title: 'قیمت، خیلی زود قدیمی می‌شود',
    problem:
      'ساختار PDF و فایل چاپی ثابت است؛ هر اصلاح یعنی طراحی دوباره، خروجی دوباره و انتشار دوباره.',
    bullets: [
      'نرخ قدیمی ممکن است به دست خریدار برسد.',
      'قیمت اشتباه در اختیار تیم فروش، اعتبار برند را آسیب می‌زند.',
    ],
  },
  {
    n: '۲',
    icon: IconTruckDelivery,
    title: 'هزینهٔ تولید، انبار و ارسال',
    problem:
      'کاغذ، لیتوگرافی، بسته‌بندی، انبارداری و ارسال؛ هزینه‌هایی که پیش از رسیدن حتی یک نسخه به دست خریدار پرداخت می‌شوند.',
    bullets: [
      'کوچک‌ترین تغییر در سبد محصول می‌تواند کل تیراژ را ضایعات کند.',
      'انبار کاتالوگ فضا و هزینه می‌خواهد.',
    ],
  },
  {
    n: '۳',
    icon: IconEyeOff,
    title: 'نقطهٔ کور اطلاعاتی',
    problem:
      'کاتالوگ کاغذی و فایل PDF به‌صورت پیش‌فرض داده‌ای از رفتار خریدار ثبت نمی‌کنند.',
    bullets: [
      'نمی‌دانید فایل باز شده یا نه.',
      'نمی‌دانید مسیر خریدار کجا متوقف شده است.',
    ],
  },
  {
    n: '۴',
    icon: IconDeviceMobileOff,
    title: 'موبایل؛ جایی که خریدار واقعاً کاتالوگ را می‌بیند',
    problem: 'یک PDF حجیم روی اینترنت همراه می‌تواند همان ابتدا مسیر فروش را متوقف کند.',
    bullets: [
      'زوم، جابه‌جایی و خواندن طولانی روی نمایشگر موبایل دشوار است.',
      'PDF مسیر مستقیمی برای خرید و استعلام ندارد.',
    ],
  },
] as const;

// اتود A — «فیش هزینه»: هر هزینه یک فیش حسابداری است که با اسکرول، به‌ترتیب و با فاصلهٔ خطی از کنار (لبهٔ راست) وارد می‌شود
export default function ProblemsA() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // تیتر و ساب‌تیتر سکشن
      gsap.from('.fee-head > *', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.08,
        clearProps: 'all',
        scrollTrigger: { trigger: container.current, start: 'top 78%', once: true },
      });

      // فیش‌ها: ورود خطی و پشت‌سرهم از کنار — بدون مکث بین فیش‌ها
      ScrollTrigger.batch('.fee-receipt', {
        start: 'top 85%',
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            x: 88,
            opacity: 0,
            duration: 0.55,
            ease: 'power3.out',
            stagger: 0.13,
            clearProps: 'all',
          }),
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative bg-[var(--bg-neutral-base)] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">
        {/* سربرگ سکشن */}
        <div className="fee-head mb-14 lg:mb-20 flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 bg-[var(--color-secondary-500)]" aria-hidden="true" />
            <span className="text-xs font-bold text-[var(--color-primary-600)]">سکشن ۲ · مسئله</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-[var(--text-neutral-strong)] leading-tight">
            چهار هزینهٔ پنهان کاتالوگ کاغذی و PDF
          </h2>
          <p className="font-bold text-[var(--text-neutral-subtle)]">
            هزینه‌هایی که معمولاً در فاکتور چاپخانه دیده نمی‌شوند.
          </p>
        </div>

        {/* چهار فیش هزینه */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {COSTS.map((cost) => (
            <article
              key={cost.n}
              className="fee-receipt relative bg-white border border-[var(--border-neutral-base)] flex flex-col transition-[box-shadow,border-color,transform] duration-200 hover:border-[var(--color-primary-300)] hover:shadow-[6px_6px_0_var(--color-primary-100)] hover:-translate-y-0.5"
            >
              {/* نوار بالای فیش */}
              <div className="h-1.5 bg-[var(--color-primary-600)]" aria-hidden="true" />

              <div className="p-6 flex flex-col gap-5 flex-1">
                {/* عدد فارسی درشت + آیکون هزینه */}
                <div className="flex items-start justify-between">
                  <span className="text-6xl font-black leading-none text-[var(--color-primary-600)]">
                    {cost.n}
                  </span>
                  <span className="w-11 h-11 border border-[var(--border-neutral-base)] flex items-center justify-center text-[var(--color-primary-600)]">
                    <cost.icon size={22} stroke={2.2} />
                  </span>
                </div>

                <h3 className="text-lg font-black text-[var(--text-neutral-strong)] leading-snug">
                  {cost.title}
                </h3>

                <p className="text-sm font-medium leading-relaxed text-[var(--text-neutral-base)]">
                  {cost.problem}
                </p>

                {/* دو بولت کوتاه — جدا شده با خط پرفورا */}
                <div className="mt-auto pt-4 border-t border-dashed border-[var(--border-neutral-base)] flex flex-col gap-3">
                  {cost.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-2.5">
                      <span
                        className="mt-[7px] w-1.5 h-1.5 bg-[var(--color-secondary-500)] shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium leading-relaxed text-[var(--text-neutral-subtle)]">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* پانویس فیش */}
              <div className="border-t border-dashed border-[var(--border-neutral-base)] px-6 py-3 flex items-center justify-between">
                <span className="text-[11px] font-bold text-[var(--text-neutral-subtle)]">
                  فیش {cost.n} از ۴
                </span>
                <IconReceipt size={14} stroke={2.2} className="text-[var(--color-neutral-300)]" />
              </div>
            </article>
          ))}
        </div>

        {/* مسیر بحران: مشاوره تلگرام */}
        <div className="mt-12 pt-6 border-t border-dashed border-[var(--border-neutral-base)] flex items-center justify-between">
          <span className="text-xs font-bold text-[var(--text-neutral-subtle)]">مسیر مشاوره</span>
          <a
            href="https://t.me/shayanesfd"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-primary-600)] hover:text-[var(--color-primary-800)] transition-colors duration-200"
          >
            <IconBrandTelegram size={16} stroke={2.2} />
            مشاوره: تلگرام
          </a>
        </div>
      </div>
    </section>
  );
}
