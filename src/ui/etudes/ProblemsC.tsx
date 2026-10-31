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
  IconFileOff,
  IconBrandTelegram,
} from '@tabler/icons-react';

gsap.registerPlugin(ScrollTrigger);

// چهار هزینهٔ واقعی سکشن ۲ از docs/landing-content.md — کنار بلوک نمایشی لیست می‌شوند
const COSTS = [
  {
    n: '۱',
    icon: IconCoins,
    title: 'قیمت، خیلی زود قدیمی می‌شود',
    body: 'هر اصلاح یعنی طراحی دوباره، خروجی دوباره و انتشار دوباره.',
  },
  {
    n: '۲',
    icon: IconTruckDelivery,
    title: 'هزینهٔ تولید، انبار و ارسال',
    body: 'کوچک‌ترین تغییر در سبد محصول می‌تواند کل تیراژ را ضایعات کند.',
  },
  {
    n: '۳',
    icon: IconEyeOff,
    title: 'نقطهٔ کور اطلاعاتی',
    body: 'نمی‌دانید مسیر خریدار کجا متوقف شده است.',
  },
  {
    n: '۴',
    icon: IconDeviceMobileOff,
    title: 'موبایل؛ جایی که خریدار واقعاً کاتالوگ را می‌بیند',
    body: 'PDF مسیر مستقیمی برای خرید و استعلام ندارد.',
  },
] as const;

// تعداد «نسخه‌های چاپ‌شده» در گرید نمایشی (۶ × ۴)
const PAPER_COUNT = 24;

// اتود C — «کاغذهایی که باطل می‌شوند»: بلوک نمایشی pin شده با scrub کوتاه.
// با اسکرول، گرید نسخه‌های چاپ‌شده به‌تدریج خاکستری/باطل می‌شود (رنگ از success به خنثی) و هزینه‌ها لیست می‌شوند.
export default function ProblemsC() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;

      const papers = gsap.utils.toArray<HTMLElement>('.void-paper');
      const items = gsap.utils.toArray<HTMLElement>('.void-item');

      // تایم‌لاین scrub با pin: کل بلوک نمایشی برای مدت اسکرول قفل می‌شود
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: '+=1800',
          pin: true,
          scrub: 0.6,
        },
      });

      // فاز ۱ (۰ تا ۰.۲۵): کاغذها سالم و سبز در گرید می‌نشینند
      tl.from(papers, {
        opacity: 0,
        y: 14,
        duration: 0.2,
        ease: 'power1.out',
        stagger: { each: 0.006, from: 'start' },
      });

      // فاز ۲ (۰.۲۵ تا ۰.۸۵): نسخه‌ها به‌ترتیب از رنگ success به خنثی می‌روند، کمرنگ و باطل می‌شوند
      tl.to(papers, {
        // هر کاغذ جداگانه باطل می‌شود؛ ترتیب خطی گرید
        '--paper-tone': 0,
        opacity: (i) => 0.32 + (i % 4) * 0.04,
        filter: 'grayscale(1)',
        duration: 0.5,
        ease: 'power1.inOut',
        stagger: { each: 0.012, from: 'start' },
      });

      // مُهر «باطل» روی گرید در پایان فاز ۲
      tl.fromTo(
        '.void-stamp',
        { opacity: 0, scale: 1.6, rotate: -8 },
        { opacity: 1, scale: 1, rotate: -8, duration: 0.08, ease: 'power4.out' },
        0.72
      );

      // فاز ۳ (۰.۳ تا ۰.۹۵): همزمان، چهار هزینه یکی‌یکی در ستون کنار لیست می‌شوند
      items.forEach((item, i) => {
        tl.fromTo(
          item,
          { opacity: 0, x: 28 },
          { opacity: 1, x: 0, duration: 0.1, ease: 'power2.out' },
          0.3 + i * 0.14
        );
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="relative bg-[var(--bg-neutral-base)] overflow-hidden"
    >
      {/* قاب پین‌شده: تمام ارتفاع نمایشگر */}
      <div className="min-h-screen flex items-center py-20 lg:py-0">
        <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-14 items-center">
            {/* ستون راست (RTL اول): تیتر سکشن */}
            <div className="lg:col-span-4 flex flex-col gap-5">
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

              <p className="text-sm font-bold text-[var(--text-neutral-base)] leading-relaxed max-w-md">
                با اسکرول ادامه دهید؛ نسخه‌های چاپ‌شده یکی‌یکی باطل می‌شوند.
              </p>
            </div>

            {/* ستون چپ: بلوک نمایشی «بطلان تیراژ» */}
            <div className="lg:col-span-8">
              <div className="relative border border-[var(--border-neutral-base)] bg-white p-6 lg:p-10">
                {/* سربرگ بلوک نمایشی */}
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[var(--color-success-600)]" aria-hidden="true" />
                    <span className="text-xs font-bold text-[var(--text-neutral-subtle)]">
                      تیراژ چاپ‌شده: ۲۴ نسخه
                    </span>
                  </div>
                  <IconFileOff
                    size={20}
                    stroke={2.2}
                    className="text-[var(--color-neutral-300)]"
                  />
                </div>

                {/* گرید نسخه‌های چاپ‌شده — مقیاس کوچک paper-elements هیرو */}
                <div className="relative grid grid-cols-6 gap-2.5 lg:gap-3.5 max-w-xl mx-auto">
                  {[...Array(PAPER_COUNT)].map((_, i) => (
                    <div
                      key={i}
                      className="void-paper aspect-[3/4] bg-white border border-[var(--border-neutral-base)] p-1.5 flex flex-col gap-1"
                      style={{
                        /* تن رنگی هر نسخه: از ۱ (سالم/success) تا ۰ (باطل/خنثی) */
                        ['--paper-tone' as string]: 1,
                        filter: 'grayscale(0)',
                        backgroundColor: `color-mix(in srgb, var(--color-success-50) calc(var(--paper-tone) * 100%), var(--bg-neutral-subtle))`,
                        borderColor: `color-mix(in srgb, var(--color-success-600) calc(var(--paper-tone) * 100%), var(--border-neutral-subtle))`,
                        willChange: 'opacity, filter',
                      }}
                    >
                      <span
                        className="block h-1 w-2/3"
                        style={{
                          backgroundColor: `color-mix(in srgb, var(--color-success-600) calc(var(--paper-tone) * 100%), var(--color-neutral-300))`,
                        }}
                      />
                      <span className="block h-0.5 w-full bg-[var(--bg-neutral-soft)]" />
                      <span className="block h-0.5 w-3/4 bg-[var(--bg-neutral-soft)]" />
                      <span className="block h-0.5 w-1/2 bg-[var(--bg-neutral-soft)]" />
                    </div>
                  ))}

                  {/* مُهر «باطل» روی گرید */}
                  <div
                    className="void-stamp absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
                    aria-hidden="true"
                  >
                    <span className="border-[3px] border-[var(--color-error-600)] text-[var(--color-error-600)] text-2xl lg:text-3xl font-black px-6 py-2 tracking-widest">
                      باطل
                    </span>
                  </div>
                </div>

                {/* زیرنویس بلوک */}
                <p className="mt-8 text-center text-xs font-bold text-[var(--text-neutral-subtle)]">
                  یک تغییر کوچک در سبد محصول می‌تواند کل تیراژ چاپ‌شده را بی‌اعتبار کند.
                </p>
              </div>

              {/* لیست چهار هزینه کنار بلوک — با scrub یکی‌یکی ظاهر می‌شود */}
              <div className="mt-10 flex flex-col">
                {COSTS.map((cost) => (
                  <div
                    key={cost.n}
                    className="void-item flex items-start gap-4 py-4 border-b border-[var(--border-neutral-subtle)]"
                  >
                    <span className="text-2xl font-black leading-none text-[var(--color-primary-600)] shrink-0 w-7">
                      {cost.n}
                    </span>
                    <div className="flex-1 flex flex-col gap-1">
                      <h3 className="text-base font-black text-[var(--text-neutral-strong)] leading-snug">
                        {cost.title}
                      </h3>
                      <p className="text-sm font-medium text-[var(--text-neutral-subtle)] leading-relaxed">
                        {cost.body}
                      </p>
                    </div>
                    <cost.icon
                      size={20}
                      stroke={2.2}
                      className="text-[var(--text-neutral-subtle)] shrink-0 mt-1"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* مسیر بحران: مشاوره تلگرام — بیرون از قاب پین، پایین سکشن */}
      <div className="max-w-7xl mx-auto px-6 lg:px-14 xl:px-20 pb-10">
        <div className="pt-6 border-t border-dashed border-[var(--border-neutral-base)] flex items-center justify-between">
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
