'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  IconSparkles,
  IconEye,
  IconShieldCheck,
  IconCurrencyRiyal,
  IconClock,
} from '@tabler/icons-react';
import IranMap from '@/ui/IranMap';

export default function InfrastructureOverdriveB() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setCoords({ x: x / 15, y: -y / 15 });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  useGSAP(
    () => {
      gsap.from('.overdrive-b-elem', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      dir="rtl"
      className="w-full bg-[var(--color-primary-900)] text-white py-24 px-6 lg:px-14 border-y-2 border-[var(--color-primary-600)] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* هدر اوردرایو */}
        <div className="overdrive-b-elem mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-secondary-500)]/20 border border-[var(--color-secondary-500)]/40 text-[var(--color-secondary-300)] text-xs font-bold mb-3">
            <IconSparkles size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
            OVERDRIVE B — طراحی سینمایی و بازتاب نوری
          </div>
          <h2 className="text-3xl lg:text-5xl font-black tracking-[-0.03em] mb-4">
            تجربه متمایزِ زیرساخت ابری با افکت‌های نوری و عمق بصری
          </h2>
          <p className="text-white/70 text-base leading-relaxed">
            بازطراحی هویت بصری میزبانی بومی با تمرکز بر پرستیژ مهندسی و بازتاب‌های شیشه‌ای مدرن.
          </p>
        </div>

        {/* کارت سینمایی سه‌بعدی با ایونت ماوس */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${coords.y}deg) rotateY(${coords.x}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
          className="overdrive-b-elem relative bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-white/[0.01] border border-white/20 p-8 lg:p-12 shadow-2xl backdrop-blur-xl"
        >
          {/* گرادیان نوری متحرک زیر ماوس */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${50 + coords.x * 2}% ${50 - coords.y * 2}%, rgba(245, 158, 11, 0.25), transparent 60%)`,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* نقشه مینیمال طلایی */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="w-full max-w-[360px] aspect-[753/685] relative">
                <IranMap variant="minimal" className="w-full h-full drop-shadow-[0_0_25px_rgba(245,158,11,0.3)]" />
              </div>
            </div>

            {/* محتوا و ویژگی‌ها */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/[0.04] border border-white/10 p-5">
                  <div className="w-10 h-10 bg-[var(--color-secondary-500)]/20 border border-[var(--color-secondary-500)]/40 flex items-center justify-center text-[var(--color-secondary-300)] mb-3">
                    <IconCurrencyRiyal size={20} />
                  </div>
                  <h3 className="font-bold text-lg mb-1 text-white">تعرفه ثابت ریالی</h3>
                  <p className="text-sm text-white/60">بدون نوسانات ارز و وابستگی به لایسنس‌های دلاری خارجی.</p>
                </div>

                <div className="bg-white/[0.04] border border-white/10 p-5">
                  <div className="w-10 h-10 bg-[var(--color-secondary-500)]/20 border border-[var(--color-secondary-500)]/40 flex items-center justify-center text-[var(--color-secondary-300)] mb-3">
                    <IconClock size={20} />
                  </div>
                  <h3 className="font-bold text-lg mb-1 text-white">سرعت زیر ۱ ثانیه</h3>
                  <p className="text-sm text-white/60">بارگذاری آنی صفحات کاتالوگ با CDN اختصاصی داخل کشور.</p>
                </div>
              </div>

              <div className="bg-white/[0.05] border border-white/15 p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <IconShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">پایداری تضمین‌شده در روزهای تحریم</h4>
                    <p className="text-xs text-white/60">میزبانی ایمن در برج فناوری دانشگاه شهید بهشتی و همراه اول</p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-[var(--color-secondary-500)] text-[var(--color-primary-900)] font-black text-xs">
                  تضمین ۹۹.۹٪
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
