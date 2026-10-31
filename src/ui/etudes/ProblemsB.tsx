'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  IconCoins,
  IconTruckDelivery,
  IconEyeOff,
  IconDeviceMobileOff,
  IconBrandTelegram,
} from '@tabler/icons-react';

gsap.registerPlugin(ScrollTrigger);

// محتوای واقعی سکشن ۲ از docs/landing-content.md — ردیف‌های مهندسی، نه کارت
const ROWS = [
  {
    n: '۱',
    icon: IconCoins,
    title: 'قیمت، خیلی زود قدیمی می‌شود',
    body:
      'ساختار PDF و فایل چاپی ثابت است؛ هر اصلاح یعنی طراحی دوباره، خروجی دوباره و انتشار دوباره.',
    notes: [
      'نرخ قدیمی ممکن است به دست خریدار برسد.',
      'قیمت اشتباه در اختیار تیم فروش، اعتبار برند را آسیب می‌زند.',
    ],
  },
  {
    n: '۲',
    icon: IconTruckDelivery,
    title: 'هزینهٔ تولید، انبار و ارسال',
    body:
      'کاغذ، لیتوگرافی، بسته‌بندی، انبارداری و ارسال؛ هزینه‌هایی که پیش از رسیدن حتی یک نسخه به دست خریدار پرداخت می‌شوند.',
    notes: [
      'کوچک‌ترین تغییر در سبد محصول می‌تواند کل تیراژ را ضایعات کند.',
      'انبار کاتالوگ فضا و هزینه می‌خواهد.',
    ],
  },
  {
    n: '۳',
    icon: IconEyeOff,
    title: 'نقطهٔ کور اطلاعاتی',
    body:
      'کاتالوگ کاغذی و فایل PDF به‌صورت پیش‌فرض داده‌ای از رفتار خریدار ثبت نمی‌کنند.',
    notes: [
      'نمی‌دانید فایل باز شده یا نه.',
      'نمی‌دانید مسیر خریدار کجا متوقف شده است.',
    ],
  },
  {
    n: '۴',
    icon: IconDeviceMobileOff,
    title: 'موبایل؛ جایی که خریدار واقعاً کاتالوگ را می‌بیند',
    body: 'یک PDF حجیم روی اینترنت همراه می‌تواند همان ابتدا مسیر فروش را متوقف کند.',
    notes: [
      'زوم و خواندن طولانی روی نمایشگر موبایل دشوار است.',
      'PDF مسیر مستقیمی برای خرید و استعلام ندارد.',
    ],
  },
] as const;

// اتود B — «ترازنامهٔ دو ستونه»: ستون راست چسبان با تیتر و جمع‌بندی؛ ستون چپ چهار ردیف خطی مهندسی
// با جداکنندهٔ ۱px و هاور که عدد و متن را ظریف فعال می‌کند. ScrollTrigger فقط برای reveal خطوط.
export default function ProblemsB() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // reveal ردیف‌ها: ورود ظریف از راست (RTL)، یکی‌یکی
      gsap.from('.balance-row', {
        opacity: 0,
        x: 24,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.12,
        clearProps: 'all',
        scrollTrigger: { trigger: '.balance-rows', start: 'top 78%', once: true },
      });
    },
    { scope: container }
  );

  return (
    <section ref={container} className="relative bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-14">
          {/* ستون راست (RTL اول): تیتر و جمع‌بندی چسبان */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 bg-[var(--color-secondary-500)]" aria-hidden="true" />
                <span className="text-xs font-bold text-[var(--color-primary-600)]">
                  سکشن ۲ · مسئله
                </span>
              </div>

              <h2 className="text-3xl lg:text-4xl font-black text-[var(--text-neutral-strong)] leading-tight">
                چهار هزینهٔ پنهان کاتالوگ کاغذی و PDF
              </h2>

              <p className="font-bold text-[var(--text-neutral-subtle)] leading-relaxed">
                هزینه‌هایی که معمولاً در فاکتور چاپخانه دیده نمی‌شوند.
              </p>

              {/* جمع‌بندی چسبان: کادر خطی با نوار طلایی باریک */}
              <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] p-5 flex flex-col gap-3">
                <div className="h-1 w-10 bg-[var(--color-secondary-500)]" aria-hidden="true" />
                <p className="text-sm font-bold leading-relaxed text-[var(--text-neutral-base)]">
                  این چهار هزینه در فاکتور چاپخانه نیست؛ در تیراژ بی‌استفاده، نرخ قدیمی و تماس‌های
                  بدون داده پنهان‌اند.
                </p>
                <p className="text-xs font-bold text-[var(--text-neutral-subtle)]">
                  جمع هر چهار مورد: هزینه‌ای که قبل از فروش پرداخت می‌شود.
                </p>
              </div>
            </div>
          </div>

          {/* ستون چپ: چهار ردیف خطی مهندسی با جداکنندهٔ ۱px */}
          <div className="lg:col-span-8 balance-rows border-t border-[var(--border-neutral-base)]">
            {ROWS.map((row, idx) => (
              <article
                key={row.n}
                className="balance-row group relative border-b border-[var(--border-neutral-base)] transition-colors duration-200 hover:bg-[var(--bg-primary-subtle)]"
              >
                {/* خط فعال‌شوندهٔ هاور روی جداکنندهٔ پایین — از راست پر می‌شود */}
                <span
                  className="absolute bottom-0 right-0 h-px w-full bg-[var(--color-primary-600)] origin-right scale-x-0 transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="px-2 lg:px-4 py-8 lg:py-10 grid grid-cols-[auto_1fr] lg:grid-cols-[auto_auto_1fr] gap-x-5 lg:gap-x-8 items-start">
                  {/* عدد فارسی درشت — در سکون کم‌رنگ، در هاور پررنگ و طلایی */}
                  <span className="text-5xl lg:text-6xl font-black leading-none text-[var(--color-neutral-200)] transition-colors duration-200 group-hover:text-[var(--color-secondary-500)]">
                    {row.n}
                  </span>

                  {/* آیکون — فقط دسکتاپ */}
                  <span className="hidden lg:flex w-11 h-11 border border-[var(--border-neutral-base)] items-center justify-center text-[var(--text-neutral-subtle)] transition-colors duration-200 group-hover:border-[var(--color-primary-300)] group-hover:text-[var(--color-primary-600)]">
                    <row.icon size={22} stroke={2.2} />
                  </span>

                  <div className="col-span-2 lg:col-span-1 flex flex-col gap-3">
                    <h3 className="text-lg lg:text-xl font-black text-[var(--text-neutral-strong)] leading-snug transition-colors duration-200 group-hover:text-[var(--color-primary-800)]">
                      {row.title}
                    </h3>

                    {/* متن مسئله — در سکون کم‌رنگ، در هاور تیره و فعال */}
                    <p className="text-sm lg:text-base font-medium leading-relaxed text-[var(--text-neutral-subtle)] transition-colors duration-200 group-hover:text-[var(--text-neutral-base)]">
                      {row.body}
                    </p>

                    {/* یادداشت‌های ردیف */}
                    <div className="flex flex-col gap-1.5">
                      {row.notes.map((note) => (
                        <span
                          key={note}
                          className="text-xs lg:text-sm font-bold text-[var(--text-neutral-subtle)] opacity-70 transition-all duration-200 group-hover:opacity-100"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* شمارهٔ ترتیب مهندسی در لبهٔ چپ ردیف */}
                <span className="absolute left-4 top-8 hidden lg:block text-[10px] font-bold text-[var(--color-neutral-300)] tracking-widest">
                  {['۰۱ / ۰۴', '۰۲ / ۰۴', '۰۳ / ۰۴', '۰۴ / ۰۴'][idx]}
                </span>
              </article>
            ))}
          </div>
        </div>

        {/* مسیر بحران: مشاوره تلگرام */}
        <div className="mt-16 pt-6 border-t border-[var(--border-neutral-base)] flex items-center justify-between">
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
