'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  IconArrowLeft,
  IconBrandTelegram,
  IconClock24,
  IconShieldCheck,
  type Icon,
} from '@tabler/icons-react';
import DemoRequestForm from '@/ui/DemoRequestForm';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PROMISES: { title: string; desc: string; icon: Icon }[] = [
  {
    title: 'محرمانگی اطلاعات',
    desc: 'اطلاعات و فهرست قیمتهای شما تحت قرارداد عدم افشا محفوظ میماند',
    icon: IconShieldCheck,
  },
  {
    title: 'آماده سازی نمونه تا ۴۸ ساعت',
    desc: 'نمونهٔ تعاملی کاتالوگ شما پیش از جلسه آماده میشود',
    icon: IconClock24,
  },
];

/**
 * سکشن «درخواست دمو» (#demo)
 * - در دسکتاپ: حفظ ۱۰۰٪ ظاهر اولیه با کارت شناور داخل content-col، گرادینت‌های اصلی، وعده‌ها، دکمه تلگرام و فرورفتگی mb-12- به فوتر
 * - در موبایل: تمام‌عرض متصل به ریل‌ها با بک سفید، خط جداکننده ۲۴px، و بدون المان‌های شلوغ‌کننده
 */
export default function BackingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameFillRightRef = useRef<HTMLDivElement>(null);
  const frameFillLeftRef = useRef<HTMLDivElement>(null);
  const formBoxRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      const fillTargets = [frameFillRightRef.current, frameFillLeftRef.current].filter(
        Boolean
      ) as HTMLDivElement[];
      if (fillTargets.length) {
        if (isReduced) {
          gsap.set(fillTargets, { scaleY: 1 });
        } else {
          gsap.fromTo(
            fillTargets,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'bottom center',
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      }

      if (isReduced) {
        formBoxRef.current?.setAttribute('data-active', 'true');
        return;
      }

      // انیمیشن ورود ملموس و چشم‌نواز موبایل به سبک Framer Motion
      const mm = gsap.matchMedia();
      mm.add('(max-width: 639px)', () => {
        gsap.fromTo(
          '.demo-entrance',
          { opacity: 0, scale: 0.97, y: 36 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              once: true,
            },
            clearProps: 'all',
          }
        );
      });

      if (formBoxRef.current) {
        ScrollTrigger.create({
          trigger: formBoxRef.current,
          start: 'top 80%',
          end: 'bottom 15%',
          onEnter: () => formBoxRef.current?.setAttribute('data-active', 'true'),
          onLeave: () => formBoxRef.current?.setAttribute('data-active', 'false'),
          onEnterBack: () => formBoxRef.current?.setAttribute('data-active', 'true'),
          onLeaveBack: () => formBoxRef.current?.setAttribute('data-active', 'false'),
        });
      }
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    const box = formBoxRef.current;
    if (!box) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      box.setAttribute('data-active', 'true');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        box.setAttribute('data-active', entry.isIntersecting ? 'true' : 'false');
      },
      { threshold: 0.15 }
    );

    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="demo"
      dir="rtl"
      className="relative w-full scroll-mt-28 overflow-hidden bg-white sm:bg-[var(--color-primary-600)] sm:py-16 tracking-[-0.02em] text-[var(--color-neutral-900)] border-t border-[var(--color-neutral-200)] sm:border-t-0"
    >
      {/* زمینهٔ تیره‌تر در انتهای کارت دسکتاپ که فرم روی آن فرود می‌آید */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 hidden sm:block h-16 bg-[var(--color-primary-800)]"
      />

      {/* خطوط عمودی مویی طرفین در کانتینر ۱۴۷۲px: در موبایل تم سفید (neutral-200 / primary-600) و در دسکتاپ تم تیره اصلی (white/20 / white) */}
      <div className="pointer-events-none absolute inset-0 z-20 flex justify-center overflow-hidden" aria-hidden="true">
        <div className="relative h-full w-[calc(100%-16px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
          <div className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-neutral-200)] sm:bg-white/20" />
          <div
            ref={frameFillRightRef}
            className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-primary-600)] sm:bg-white origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
          <div className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-neutral-200)] sm:bg-white/20" />
          <div
            ref={frameFillLeftRef}
            className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-primary-600)] sm:bg-white origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>
      </div>

      {/* کانتینر: در موبایل تمام‌عرض مماس بر ریل‌ها با انتهای فرورفتگی صفر؛ در دسکتاپ دقیقاً کانتینر content-col با عرض ۱۲۱۶px و فرورفتگی mb-12- به فوتر */}
      <div className="relative z-10 w-[calc(100%-16px)] mx-auto px-0 mb-0 sm:w-full sm:px-10 lg:px-[max(48px,calc((100%-1216px)/2))] sm:-mb-12">
        <div className="relative overflow-hidden bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-[45fr_55fr]">

            {/* ستون معرفی و وعده‌ها: در موبایل تم سفید ساده با فاصله‌های درخواستی، در دسکتاپ گرادینت و ساختار کامل اولیه */}
            <div className="demo-entrance lg:col-span-1 flex flex-col bg-white px-6 py-10 sm:p-10 lg:p-14 sm:bg-gradient-to-b sm:from-white sm:to-[var(--color-primary-100)]/[.72]">
              <div className="flex flex-col gap-4 sm:gap-8">
                <h2 className="text-[26px] font-black leading-[1.25] tracking-[-0.02em] text-[var(--text-neutral-strong)] sm:text-4xl">
                  درخواست دمو
                  <br />
                  <span className="text-xl sm:text-3xl font-bold text-[var(--text-neutral-base)]">
                    کاتالوگ اختصاصی شما
                  </span>
                </h2>
                <p className="sm:hidden text-sm leading-[1.7] text-[var(--text-neutral-base)] font-normal">
                  اطلاعات خود را ثبت کنید؛ نمونهٔ تعاملی کاتالوگ شما تا ۴۸ ساعت آماده می‌شود.
                </p>
                <p className="hidden sm:block text-base leading-[1.7] text-[var(--text-neutral-base)] font-normal">
                  لینک سایت یا کاتالوگ فعلی‌تان را بفرستید. تا ۴۸ ساعت، نمونه‌ای تعاملی از کاتالوگ شما آماده می‌کنیم تا محصول را با اطلاعات واقعی ببینید
                </p>
              </div>

              {/* در موبایل مخفی، در دسکتاپ دقیقاً همان ساختار و استایل اولیه دست‌نخورده با لینک تلگرام */}
              <div className="mt-auto hidden sm:flex flex-col pt-16">
                {PROMISES.map((p) => (
                  <div
                    key={p.title}
                    className="flex items-start gap-3.5 py-3.5 border-b border-[var(--border-neutral-subtle)]"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border-2 border-[var(--color-primary-100)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)]">
                      <p.icon size={18} stroke={2.2} />
                    </span>
                    <div className="flex flex-col gap-1">
                      <strong className="text-sm font-bold text-[var(--text-neutral-strong)]">
                        {p.title}
                      </strong>
                      <p className="text-sm leading-[1.6] font-normal text-[var(--text-neutral-subtle)]">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="pt-6">
                  <a
                    href="https://t.me/RokhnamaBot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-primary-700)] hover:text-[var(--color-primary-800)] transition-colors"
                  >
                    <IconBrandTelegram size={18} stroke={2.2} />
                    <span>یا پیام مستقیم در تلگرام</span>
                    <IconArrowLeft size={16} stroke={2.2} />
                  </a>
                </div>
              </div>
            </div>

            {/* ستون فرم: در موبایل سفید با خط جداکننده بالا، در دسکتاپ پس‌زمینهٔ رنگی اولیه و بدون خط جداکننده */}
            <div
              ref={formBoxRef}
              data-active="false"
              className="demo-entrance group relative overflow-hidden lg:col-span-1 self-stretch sm:self-start flex flex-col gap-5 bg-white border-t border-[var(--color-neutral-200)] px-6 py-10 sm:border-t-0 sm:bg-[var(--color-primary-100)]/[.72] sm:p-10 lg:p-14"
            >
              {/* افکت گلو محیطی در لبهٔ پایین باکس فرم زیر دکمهٔ درخواست دمو مشابه سکشن مهاجرت */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 w-full opacity-0 group-hover:opacity-100 group-data-[active=true]:opacity-100 transition-opacity duration-700 ease-out z-0"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 100% at 50% 100%, color-mix(in srgb, var(--color-primary-100) 80%, transparent), transparent 70%)',
                }}
                aria-hidden="true"
              />

              <div className="relative z-10 w-full">
                <DemoRequestForm />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
