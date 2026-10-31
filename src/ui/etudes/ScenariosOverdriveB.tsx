'use client';

import React, { useRef, useState } from 'react';
import {
  IconBuildingFactory2,
  IconHanger,
  IconMicroscope,
  IconBuildingSkyscraper,
  IconQrcode,
  IconWorld,
  IconSparkles,
} from '@tabler/icons-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SegmentB {
  id: string;
  code: string;
  Icon: React.ComponentType<{ size?: number; stroke?: number; className?: string }>;
  label: string;
  pain: string;
  solution: string;
  alignClass: string;
  borders: string;
  tag: string;
}

const SEGMENTS: SegmentB[] = [
  {
    id: 'industrial',
    code: 'SEC-01',
    Icon: IconBuildingFactory2,
    label: 'تولیدکنندگان صنعتی B2B',
    pain: 'تنوع محصول بالا، نوسان هفتگی قیمت و نیاز به اتصال مستقیم به انبار.',
    solution: 'قیمت‌ها مستقیماً از انبار به‌روز می‌شوند؛ هر تغییر قیمت، یک انتشار بدون نیاز به چاپ مجدد.',
    alignClass: 'lg:w-[calc(50%+20px)]',
    borders: 'border-b sm:border-e sm:border-b lg:border-e lg:border-b',
    tag: 'همگام‌سازی انبار',
  },
  {
    id: 'apparel',
    code: 'SEC-02',
    Icon: IconHanger,
    label: 'عمده‌فروشان پوشاک و نساجی',
    pain: 'کالکشن‌های فصلی مکرر که چاپ سنتی پاسخگوی سرعت تغییر آنها نیست.',
    solution: 'هر ژورنال تازه به‌محض انتشار جایگزین نسخهٔ قبلی می‌شود؛ کاتالوگ همیشه همگام با فصل جاری است.',
    alignClass: 'lg:w-[calc(50%-20px)]',
    borders: 'border-b sm:border-e-0 sm:border-b lg:border-e-0 lg:border-b',
    tag: 'کالکشن فصلی',
  },
  {
    id: 'medical',
    code: 'SEC-03',
    Icon: IconMicroscope,
    label: 'تجهیزات پزشکی و آزمایشگاهی',
    pain: 'محصولات حساس با مستندات فنی دقیق، گواهی‌ها و فرایند فروش سازمانی بلندمدت.',
    solution: 'گواهینامه‌ها و اسناد ارزیابی به خودِ قطعه الصاق می‌شوند؛ خریدار سازمانی با یک کلیک به همه دسترسی دارد.',
    alignClass: 'lg:w-[calc(50%-20px)]',
    borders: 'border-b sm:border-e sm:border-b lg:border-e lg:border-b',
    tag: 'اسناد ارزیابی',
  },
  {
    id: 'construction',
    code: 'SEC-04',
    Icon: IconBuildingSkyscraper,
    label: 'مصالح و تجهیزات ساختمانی',
    pain: 'وابستگی به قیمت روز بازار و نیاز مبرم به ارائهٔ نمونه‌های کاربرد در پروژه‌های اجراشده.',
    solution: 'نرخ لحظه‌ای در کنار گالری پروژه‌های واقعی قرار می‌گیرد؛ ریسک ارزیابی و استعلام برای مهندس کارفرما حذف می‌شود.',
    alignClass: 'lg:w-[calc(50%+20px)]',
    borders: 'border-b sm:border-e-0 sm:border-b lg:border-e-0 lg:border-b',
    tag: 'استعلام پروژه‌ای',
  },
  {
    id: 'expo',
    code: 'SEC-05',
    Icon: IconQrcode,
    label: 'تیم‌های حاضر در نمایشگاه‌های تخصصی',
    pain: 'حذف هزینه‌های گزاف انبارداری و حمل کارتن‌های سنگین کاتالوگ کاغذی به غرفه.',
    solution: 'اسکن یک نشان اختصاصی روی استند غرفه کافی است تا کل ویترین با سرعت بالا در جیب بازدیدکننده بنشیند.',
    alignClass: 'lg:w-[calc(50%+20px)]',
    borders: 'border-b-0 sm:border-e sm:border-b-0 lg:border-e lg:border-b-0',
    tag: 'اسکن نشان غرفه',
  },
  {
    id: 'export',
    code: 'SEC-06',
    Icon: IconWorld,
    label: 'شرکت‌های صادراتی',
    pain: 'ارائهٔ همزمان کاتالوگ با چند زبان و ارزهای مختلف برای جلسات و خریداران خارجی.',
    solution: 'ویترین با ارز و زبان مبدأ خریدار بین‌المللی بارگذاری می‌شود؛ یک نسخهٔ یکپارچه بدون بازطراحی دوباره.',
    alignClass: 'lg:w-[calc(50%-20px)]',
    borders: 'border-b-0 sm:border-e-0 sm:border-b-0 lg:border-e-0 lg:border-b-0',
    tag: 'چندارزی / چندزبانه',
  },
];

export default function ScenariosOverdriveB() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameFillRightRef = useRef<HTMLDivElement>(null);
  const frameFillLeftRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReduced) {
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
                trigger: containerRef.current,
                start: 'top 85%',
                end: 'bottom 40%',
                scrub: 0.5,
              },
            }
          );
        }
      }

      gsap.from('.overdrive-b-elem', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      dir="rtl"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative z-10 w-full bg-[var(--color-primary-900)] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-14 border-t border-b border-[var(--color-primary-600)] tracking-[-0.02em] overflow-hidden"
    >
      {/* گلو هاور کهربایی سراسری */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-40"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.12), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* خطوط عمودی پیشرونده اطراف سکشن */}
      <div className="pointer-events-none absolute inset-0 z-30 flex justify-center overflow-hidden" aria-hidden="true">
        <div className="relative h-full w-[calc(100%-48px)] lg:w-[calc(100%-64px)] max-w-[1472px]">
          <div className="absolute inset-y-0 right-0 w-[1px] bg-white/15" />
          <div
            ref={frameFillRightRef}
            className="absolute inset-y-0 right-0 w-[1px] bg-[var(--color-secondary-400)] origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
          <div className="absolute inset-y-0 left-0 w-[1px] bg-white/15" />
          <div
            ref={frameFillLeftRef}
            className="absolute inset-y-0 left-0 w-[1px] bg-[var(--color-secondary-400)] origin-top"
            style={{ transform: 'scaleY(0)' }}
          />
        </div>
      </div>

      {/* شطرنجی پس‌زمینه ۵۶ پیکسل مهندسی */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[75%] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-20 max-w-7xl mx-auto">
        {/* هدر بخش */}
        <div className="overdrive-b-elem text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[var(--color-secondary-500)]/20 text-[var(--color-secondary-300)] text-xs font-bold mb-6 tracking-[-0.02em] border border-[var(--color-secondary-400)]/30">
            <IconSparkles size={16} className="text-[var(--color-secondary-400)]" />
            OVERDRIVE B · طراحی سینمایی و بازتاب نوری کهربایی
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-[-0.03em] leading-[1.25] mb-4">
            کاتالوگ دیجیتال برای چه کسانی ساخته شده؟
          </h2>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed font-normal">
            اگر با یکی از این چالش‌ها در نمایش و فروش کالای خود روبرو هستید، رُخ‌نما برای حل مستقیم همان مسئله معماری شده است.
          </p>
        </div>

        {/* گرید ۲ ستونه با انحراف ۲۰ پیکسلی و بوردر فقط در درزهای تقاطع */}
        <div className="overdrive-b-elem flex flex-wrap w-full bg-white/[0.03] backdrop-blur-xl border border-white/10 shadow-2xl">
          {SEGMENTS.map((card) => (
            <article
              key={card.id}
              className={`w-full sm:w-1/2 ${card.alignClass} ${card.borders} border-white/10 p-8 sm:p-10 lg:p-12 relative group hover:bg-white/[0.06] transition-all duration-300 flex flex-col justify-between overflow-hidden`}
            >
              {/* خط انیمیشنی لبه پایین کهربایی */}
              <span
                className="absolute bottom-0 right-0 h-[2px] w-full bg-[var(--color-secondary-400)] scale-x-0 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 pointer-events-none origin-right"
                aria-hidden="true"
              />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 text-[var(--color-secondary-400)] shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[var(--color-secondary-500)] group-hover:text-[var(--color-primary-900)]">
                      <card.Icon size={30} stroke={1.7} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-white/40 block mb-0.5">
                        {card.code}
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-white leading-snug tracking-[-0.02em] group-hover:text-[var(--color-secondary-300)] transition-colors">
                        {card.label}
                      </h3>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-white/60 bg-white/5 px-2.5 py-1 border border-white/10">
                    {card.tag}
                  </span>
                </div>

                <div className="space-y-3">
                  <p className="text-sm sm:text-base text-white/60 leading-relaxed font-normal">
                    {card.pain}
                  </p>
                  <p className="text-sm sm:text-base text-white font-medium leading-relaxed border-r-2 border-[var(--color-secondary-400)]/60 pr-3">
                    {card.solution}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
