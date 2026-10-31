'use client';

import { useRef, useState } from 'react';
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

const CARDS = [
  {
    icon: IconShieldCheck,
    title: 'پایداری در شرایط محدودیت',
    body: 'دسترسی به کاتالوگ و استعلام، حتی در زمان اختلال و محدودیت اینترنت',
    badge: 'آپ‌تایم ۹۹٫۹٪',
  },
  {
    icon: IconBolt,
    title: 'بارگذاری سریع صفحات',
    body: 'دسترسی سریع به کاتالوگ با زیرساخت داخلی و ترافیک نیم‌بها',
    badge: 'CDN داخلی',
  },
  {
    icon: IconCurrencyDollarOff,
    title: 'هزینه‌گذاری ریالی شفاف',
    body: 'بدون اشتراک دلاری و وابستگی به نوسان ارز، با مالکیت داده‌ها و ساختار کاتالوگ',
    badge: 'پرداخت ریالی',
  },
];

function SingleCard({
  c,
  isLast,
}: {
  c: (typeof CARDS)[number];
  isLast: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const Icon = c.icon;

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!iconRef.current) return;
    const rect = rectRef.current || cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    // محاسبه مختصات محلی درون خود کارت با شروع نرم از مرز ورود
    const normX = Math.max(-1, Math.min(1, (localX - rect.width / 2) / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, (localY - rect.height / 2) / (rect.height / 2)));

    iconRef.current.style.transform = `translate3d(${-normX * 8}px, ${-normY * 8}px, 0)`;
  };

  const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    handleCardMouseMove(e);
  };

  const handleCardMouseLeave = () => {
    setIsHovered(false);
    rectRef.current = null;
    if (iconRef.current) {
      iconRef.current.style.transform = 'translate3d(0, 0, 0)';
    }
  };

  return (
    <div
      ref={cardRef}
      data-infra-card="true"
      onMouseMove={handleCardMouseMove}
      onMouseEnter={handleCardMouseEnter}
      onMouseLeave={handleCardMouseLeave}
      style={{
        borderStyle: 'solid',
        backgroundColor: isHovered ? 'rgba(24, 30, 80, 0.20)' : 'transparent',
        transform: isHovered ? 'scale(1.01)' : 'scale(1)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        transition:
          'background-color 0.45s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.45s cubic-bezier(0.25, 1, 0.5, 1), transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
      className={`infra-card group relative z-20 px-8 py-8 sm:p-9 sm:pb-11 flex flex-col justify-between tracking-[-0.02em] overflow-hidden h-full shadow-none will-change-transform border-solid ${
        isLast ? 'border-b-0 md:border-b' : 'border-b'
      } border-t-0 md:border-t border-l-0 md:border-l border-r-0 md:border-r ${
        isHovered
          ? 'border-[rgba(255,255,255,0.25)] md:border-[rgba(255,255,255,0.20)]'
          : 'border-[rgba(255,255,255,0.15)] md:border-[rgba(255,255,255,0.10)]'
      }`}
    >
      {/* افکت گلو محیطی حساس به اسکرول در موبایل و هاور در دسکتاپ */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full opacity-0 sm:group-hover:opacity-100 max-sm:group-data-[active=true]:opacity-100 transition-opacity duration-500 ease-out z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 100% at 50% 100%, rgba(245, 158, 11, 0.16), transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* خطوط پیشرونده زیرین: پر شدن از طرفین (ریل‌ها) به سمت مرکز در اسکرول موبایل (کارت آخر مستثنی است) */}
      {!isLast && (
        <>
          <span
            data-line-right="true"
            className="sm:hidden pointer-events-none absolute bottom-0 right-0 h-[1px] w-[calc(50%+1px)] origin-right scale-x-0 bg-[var(--color-secondary-400)] z-20 group-data-[border-active=true]:scale-x-100 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
            aria-hidden="true"
          />
          <span
            data-line-left="true"
            className="sm:hidden pointer-events-none absolute bottom-0 left-0 h-[1px] w-[calc(50%+1px)] origin-left scale-x-0 bg-[var(--color-secondary-400)] z-20 group-data-[border-active=true]:scale-x-100 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
            aria-hidden="true"
          />
        </>
      )}

      <div className="relative z-10">
        {/* آیکون با ورود، خروج و حرکت ابریشمی نرم */}
        <div
          ref={iconRef}
          className="text-[var(--color-secondary-500)] max-sm:group-data-[active=true]:text-[var(--color-secondary-400)] mb-3.5 sm:mb-7 will-change-transform inline-block transition-colors duration-300"
          style={{
            transform: 'translate3d(0, 0, 0)',
            transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), color 0.3s ease',
          }}
        >
          <Icon className="w-7 h-7 sm:w-11 sm:h-11" stroke={1.7} />
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
          <h3 className="text-base sm:text-2xl font-bold text-white max-sm:group-data-[active=true]:text-amber-100 transition-colors duration-300">
            {c.title}
          </h3>
          <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white/10 max-sm:group-data-[active=true]:bg-white/20 text-[11px] sm:text-xs font-bold text-white/72 max-sm:group-data-[active=true]:text-white whitespace-nowrap -mt-[2px] sm:mt-0 transition-colors duration-300">
            {c.badge}
          </span>
        </div>

        <p className="text-sm sm:text-base text-white/70 max-sm:group-data-[active=true]:text-white/90 leading-relaxed transition-colors duration-300">
          {c.body}
        </p>
      </div>
    </div>
  );
}

export default function InfrastructureA() {
  const containerRef = useRef<HTMLElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null);
  const frameFillRightRef = useRef<HTMLDivElement>(null);
  const frameFillLeftRef = useRef<HTMLDivElement>(null);
  const mapXTo = useRef<gsap.QuickToFunc | null>(null);
  const mapYTo = useRef<gsap.QuickToFunc | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
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
                trigger: containerRef.current,
                start: 'top 80%',
                end: 'bottom center',
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      }

      if (isReduced) return;

      if (mapWrapperRef.current) {
        mapXTo.current = gsap.quickTo(mapWrapperRef.current, 'x', { duration: 0.45, ease: 'power2.out' });
        mapYTo.current = gsap.quickTo(mapWrapperRef.current, 'y', { duration: 0.45, ease: 'power2.out' });
      }

      // حساسیت حرکت ایران نسبت به کل ویوپورت
      const handleViewportMouseMove = (e: MouseEvent) => {
        const normX = Math.max(-1, Math.min(1, (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)));
        const normY = Math.max(-1, Math.min(1, (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)));

        mapXTo.current?.(-normX * 8);
        mapYTo.current?.(-normY * 8);
      };

      window.addEventListener('mousemove', handleViewportMouseMove, { passive: true });

      // انیمیشن لودینگ ملموس و چشم‌نواز به سبک Framer Motion
      // ۱. نقشه ایران هنگام ورود به اسکرین
      gsap.fromTo(
        '.infra-map-wrap',
        { opacity: 0, scale: 0.92, y: 36 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.infra-map-wrap', start: 'top 85%', once: true },
          clearProps: 'all',
        }
      );

      // ۲. عنوان و بدج هنگام ورود به اسکرین
      gsap.fromTo(
        '.infra-header',
        { opacity: 0, scale: 0.97, y: 32 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.infra-header', start: 'top 85%', once: true },
          clearProps: 'all',
        }
      );

      // ۳. آبشار کارت‌ها با استگر ملموس
      gsap.fromTo(
        '.infra-card-wrap',
        { opacity: 0, scale: 0.96, y: 36 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.infra-cards-grid', start: 'top 85%', once: true },
          clearProps: 'all',
        }
      );

      // فعال‌سازی مرحله‌ای کارت‌ها و پر شدن بوردر پایین منطبق با حرکت نوک ریل (منحصراً در نمای موبایل)
      const mm = gsap.matchMedia();
      mm.add('(max-width: 639px)', () => {
        const allCards = Array.from(
          containerRef.current?.querySelectorAll<HTMLElement>('.infra-card') || []
        );
        const cardEls = allCards.slice(0, 2);

        cardEls.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top center',
            end: 'bottom center',
            onEnter: () => card.setAttribute('data-active', 'true'),
            onLeave: () => card.setAttribute('data-active', 'false'),
            onEnterBack: () => card.setAttribute('data-active', 'true'),
            onLeaveBack: () => card.setAttribute('data-active', 'false'),
            onRefresh: (self) => {
              card.setAttribute('data-active', self.isActive ? 'true' : 'false');
            },
          });

          ScrollTrigger.create({
            trigger: card,
            start: 'center center',
            end: () => {
              const next = allCards[i + 1];
              const h = next ? next.offsetHeight : card.offsetHeight;
              return `bottom+=${Math.round(h * 0.3)} center`;
            },
            onEnter: () => card.setAttribute('data-border-active', 'true'),
            onLeave: () => card.setAttribute('data-border-active', 'false'),
            onEnterBack: () => card.setAttribute('data-border-active', 'true'),
            onLeaveBack: () => card.setAttribute('data-border-active', 'false'),
            onRefresh: (self) => {
              card.setAttribute('data-border-active', self.isActive ? 'true' : 'false');
            },
          });
        });
      });

      return () => {
        window.removeEventListener('mousemove', handleViewportMouseMove);
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="infrastructure"
      dir="rtl"
      className="relative z-10 w-full bg-[var(--color-primary-900)] text-white pt-16 pb-0 sm:pt-32 sm:pb-32 tracking-[-0.02em] overflow-hidden border-t border-white/10"
    >
      {/* افکت گلو محیطی بیضی شکل که روی کارت‌ها و زمینه می‌افتد (z-30) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] z-30 sm:hidden"
        style={{
          background: 'radial-gradient(ellipse 150% 100% at 50% 100%, rgba(245, 158, 11, 0.2), transparent 75%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] z-30 hidden sm:block"
        style={{
          background: 'radial-gradient(ellipse 85% 100% at 50% 100%, rgba(245, 158, 11, 0.2), transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* خطوط عمودی پیشرونده با رنگ پرایمری ۴۰۰ در حال پر شدن */}
      <div className="pointer-events-none absolute inset-0 z-30 flex justify-center overflow-hidden" aria-hidden="true">
        <div className="relative h-full w-[calc(100%-16px)] sm:w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
          <div className="absolute inset-y-0 right-0 w-[1px] bg-white/15" />
          <div
            ref={frameFillRightRef}
            className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-primary-400)] origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
          <div className="absolute inset-y-0 left-0 w-[1px] bg-white/15" />
          <div
            ref={frameFillLeftRef}
            className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-primary-400)] origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>
      </div>

      {/* شطرنجی بک‌گراند — در موبایل تا لبه بالایی اولین کارت کاملاً محو می‌شود؛ در دسکتاپ استایل اصلی حفظ می‌شود */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[438px] z-0 sm:hidden"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.11) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.11) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0) 100%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[80%] z-0 hidden sm:block"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.11) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.11) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="content-col relative z-20 flex flex-col max-md:!w-[calc(100%-16px)] max-md:!px-0 max-md:mx-auto">
        {/* ۱. نقشه ایران (بلر مستقیماً روی تک‌تک شهرهای نقشه اعمال شده و کانتینر شفاف است) */}
        <div className="infra-map-wrap flex items-center justify-center w-full mb-0 will-change-transform">
          <div
            ref={mapWrapperRef}
            className="relative w-full max-w-[340px] sm:max-w-[628px] aspect-[753/685] flex items-center justify-center will-change-transform mx-auto"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 80%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 80%, rgba(0,0,0,0) 100%)',
            }}
          >
            <IranMap variant="network" className="w-full h-full max-sm:translate-x-[12px]" />
          </div>
        </div>

        {/* ۲. عنوان و بدج بخش */}
        <div className="infra-header text-center max-w-3xl mx-auto -mt-[52px] sm:-mt-[130px] mb-0 sm:mb-16 relative z-10 will-change-transform">
          <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 bg-[var(--color-secondary-600)]/20 text-[var(--color-secondary-500)] text-[11px] sm:text-xs font-bold mb-8 sm:mb-8">
            <IconShieldCheck size={16} className="text-[var(--color-secondary-500)]" />
            زیرساخت بومی برای کسب‌وکارها
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-[44px] sm:leading-[1.3] mb-4">
            میزبانی داخلی کاتالوگ شما <br />
            <span className="font-bold text-[var(--color-secondary-500)]">پایدار در هر شرایطی</span>
          </h2>
        </div>

        {/* ۳. ۳ کارت کنار هم (ورود فریمری با scale: 0.92 و استگر) */}
        <div className="infra-cards-grid grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 px-0 w-full">
          {CARDS.map((c, idx) => (
            <div key={c.title} className="infra-card-wrap h-full will-change-transform">
              <SingleCard
                c={c}
                isLast={idx === CARDS.length - 1}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
