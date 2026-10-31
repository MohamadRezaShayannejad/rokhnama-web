'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  IconCurrencyDollarOff,
  IconBolt,
  IconShieldCheck,
} from '@tabler/icons-react';
import IranMap from '@/ui/IranMap';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    icon: IconCurrencyDollarOff,
    title: 'تعرفهٔ شفاف ریالی',
    body: 'بدون اشتراک دلاری، بدون غافلگیری نرخ ارز. پرداخت یک‌باره، مالکیت کامل.',
  },
  {
    icon: IconBolt,
    title: 'لود زیر یک ثانیه',
    body: 'CDN داخلی، ترافیک نیم‌بها، بدون فیلترشکن — حتی با کش آفلاین نمایشگاهی.',
  },
  {
    icon: IconShieldCheck,
    title: 'پایدار در تحریم و فیلترینگ',
    body: 'در حساس‌ترین روزهای نمایشگاه و مذاکره، کاتالوگ باز می‌ماند.',
  },
];

export default function InfrastructureB() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      gsap.from('.infra-b-card', {
        y: 12,
        opacity: 0,
        duration: 0.45,
        stagger: 0.09,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: { trigger: '.infra-b-stack', start: 'top 82%', once: true },
      });
      gsap.from('.infra-b-map', {
        scale: 0.97,
        opacity: 0,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.infra-b-map-wrap', start: 'top 85%', once: true },
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="infrastructure-b"
      dir="rtl"
      className="relative z-10 w-full bg-[var(--color-primary-900)] text-white py-20 sm:py-28 tracking-[-0.02em] overflow-hidden border-t border-white/10"
    >
      <div
        className="pointer-events-none absolute inset-0 z-20 flex justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div className="relative h-full w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
          <div className="absolute inset-y-0 right-0 w-[1px] bg-white/10" />
          <div className="absolute inset-y-0 left-0 w-[1px] bg-white/10" />
        </div>
      </div>

      <div className="content-col relative z-10">
        {/* هدر — مینیمال */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-[var(--color-secondary-500)] shrink-0" aria-hidden="true" />
            <span className="text-xs font-bold tracking-[-0.02em] text-[var(--color-secondary-300)]">
              زیرساخت بومی · میزبانی داخل ایران
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-[1.2] tracking-[-0.02em] text-white">
            میزبانیِ <span className="text-[var(--color-secondary-300)]">ایران</span>؛ اعتمادی که دیده می‌شود
          </h2>
          <p className="mt-4 text-sm sm:text-base font-normal leading-relaxed tracking-[-0.02em] text-white/70 max-w-2xl">
            یک نقشه، یک شبکه — بدون وابستگی خارجی، با توسعه‌پذیریِ مهندس‌به‌مهندس و تعهد محرمانگی رسمی.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center">
          {/* راست — نقشه مینیمال */}
          <div className="infra-b-map-wrap lg:col-span-5 order-1">
            <div className="relative mx-auto lg:mx-0 max-w-[560px] aspect-[753/685] max-h-[520px] flex items-center justify-center p-6 sm:p-8 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_72%)]">
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden="true"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='11' y='11' width='2.5' height='2.5' fill='%23ffffff' fill-opacity='0.05'/%3E%3C/svg%3E")`,
                  backgroundSize: '24px 24px',
                  backgroundPosition: 'center',
                }}
              />
              <IranMap variant="minimal" className="infra-b-map relative w-full h-full" />
              {/* تک هایلایت طلایی — تهران */}
              <div className="pointer-events-none absolute bottom-4 right-4 bg-white text-[var(--color-primary-900)] text-[11px] font-bold px-3 py-1.5 border border-[var(--color-primary-200)] leading-none tracking-[-0.02em]">
                میزبانی داخل ایران
              </div>
            </div>
            <p className="mt-3 text-center lg:text-right text-xs font-normal text-white/45 tracking-[-0.02em]">
              یک هاب، سراسر ایران
            </p>
          </div>

          <div className="hidden lg:block lg:col-span-1" aria-hidden="true" />

          {/* چپ — ۳ کارتِ فشرده + نوار اعتباری */}
          <div className="lg:col-span-6 order-2">
            <div className="infra-b-stack flex flex-col border border-white/10">
              {ITEMS.map((item, idx) => (
                <div
                  key={item.title}
                  className={`infra-b-card group flex gap-4 sm:gap-5 p-6 sm:p-7 bg-transparent hover:bg-white/[0.05] transition-colors duration-200 ${idx !== ITEMS.length - 1 ? 'border-b border-white/10' : ''}`}
                >
                  <div className="w-11 h-11 flex items-center justify-center bg-white/10 border border-white/15 text-[var(--color-secondary-300)] shrink-0">
                    <item.icon size={22} stroke={1.7} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold leading-snug tracking-[-0.02em] text-white mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-sm font-normal leading-relaxed tracking-[-0.02em] text-white/70">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* نوار اعتباری — استقرار */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 px-4 sm:px-5 py-3.5 bg-white/[0.04] border border-white/10 text-xs leading-none tracking-[-0.02em]">
              <span className="inline-flex items-center gap-2 font-bold text-white/90">
                <span className="w-1 h-1 bg-[var(--color-secondary-400)] shrink-0" aria-hidden="true" />
                دانشگاه شهید بهشتی
                <span className="font-normal text-white/50">برج فناوری · ط ۶</span>
              </span>
              <span className="hidden sm:inline w-px h-3 bg-white/15" aria-hidden="true" />
              <span className="inline-flex items-center gap-2 font-bold text-white/90">
                <span className="w-1 h-1 bg-[var(--color-secondary-400)] shrink-0" aria-hidden="true" />
                مرکز نوآوری همراه اول
              </span>
              <span className="ms-auto hidden sm:inline-flex items-center gap-1.5 text-white/50 font-normal">
                <span className="w-1.5 h-1.5 bg-[var(--color-success-500)] shrink-0" aria-hidden="true" />
                پشتیبانی مهندس‌به‌مهندس
              </span>
            </div>
            {/* نکته: توسعه‌پذیری + NDA به‌عنوان زیرنویسِ نوار، نه کارتِ جدا */}
            <p className="mt-3 text-xs font-normal leading-relaxed tracking-[-0.02em] text-white/45">
              توسعه‌پذیر و قابل ادغام با سامانهٔ اختصاصی شما · محرمانگی با NDA رسمی
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .infra-pulse { animation: infraPulseB 1.9s ease-out infinite; transform-origin: center; }
        @keyframes infraPulseB {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .infra-pulse { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
