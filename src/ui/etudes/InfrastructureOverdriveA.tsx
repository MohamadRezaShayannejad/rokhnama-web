'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  IconServer,
  IconActivity,
  IconShieldLock,
  IconCpu,
  IconCheck,
  IconChevronLeft,
} from '@tabler/icons-react';
import IranMap from '@/ui/IranMap';

const HUBS = [
  { id: 'tehran', name: 'تهران (مرکزی)', latency: '4ms', load: '12%', status: 'پایدار', x: 290, y: 300 },
  { id: 'isfahan', name: 'اصفهان (هاب مرکز)', latency: '8ms', load: '18%', status: 'پایدار', x: 350, y: 380 },
  { id: 'shiraz', name: 'شیراز (هاب جنوب)', latency: '12ms', load: '15%', status: 'پایدار', x: 380, y: 520 },
  { id: 'mashhad', name: 'مشهد (هاب شرق)', latency: '11ms', load: '22%', status: 'پایدار', x: 550, y: 220 },
  { id: 'tabriz', name: 'تبریز (هاب غرب)', latency: '9ms', load: '14%', status: 'پایدار', x: 175, y: 170 },
];

export default function InfrastructureOverdriveA() {
  const [activeHub, setActiveHub] = useState(HUBS[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.overdrive-a-elem', {
        y: 16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      dir="rtl"
      className="w-full bg-[var(--color-primary-900)] text-white py-24 px-6 lg:px-14 border-y-2 border-[var(--color-primary-600)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* هدر اوردرایو */}
        <div className="overdrive-a-elem mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-secondary-500)]/20 border border-[var(--color-secondary-500)]/40 text-[var(--color-secondary-300)] text-xs font-bold mb-3">
              <IconActivity size={14} className="animate-pulse" />
              OVERDRIVE A — تله‌متری و شبکه زنده
            </div>
            <h2 className="text-3xl lg:text-4xl font-black tracking-[-0.02em]">
              پایش آنی هاب‌های ارتباطی و مسیرهای داده
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-white/60 bg-white/[0.04] p-3 border border-white/10">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              سیستم عملیاتی
            </span>
            <span>|</span>
            <span>آپ‌تایم: ۹۹.۹۸٪</span>
            <span>|</span>
            <span>ترافیک داخلی: ۱۰۰٪ نیم‌بها</span>
          </div>
        </div>

        {/* گرید اصلی */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* نقشه تعاملی هاب‌ها (۷ ستون) */}
          <div className="overdrive-a-elem lg:col-span-7 relative bg-white/[0.02] border border-white/10 p-6 flex flex-col items-center justify-center min-h-[460px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)] pointer-events-none" />
            <div className="w-full max-w-[480px] aspect-[753/685] relative z-10">
              <IranMap variant="network" className="w-full h-full" />
            </div>

            {/* دکمه‌های انتخاب هاب روی نقشه */}
            <div className="absolute inset-x-6 bottom-6 z-20 flex flex-wrap items-center justify-center gap-2">
              {HUBS.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setActiveHub(h)}
                  className={`px-3 py-1.5 text-xs font-bold border transition-all ${
                    activeHub.id === h.id
                      ? 'bg-[var(--color-secondary-500)] text-[var(--color-primary-900)] border-[var(--color-secondary-400)] shadow-lg'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  {h.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* پنل جزئیات زنده هاب (۵ ستون) */}
          <div className="overdrive-a-elem lg:col-span-5 bg-white/[0.04] border border-white/15 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <span className="text-xs font-mono text-white/50">شناسه هاب: {activeHub.id.toUpperCase()}</span>
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  {activeHub.status}
                </span>
              </div>

              <h3 className="text-2xl font-black mb-2 text-white">{activeHub.name}</h3>
              <p className="text-sm text-white/70 mb-6">
                اتصال مستقیم به باختر و شبکه ملی اطلاعات با پهنای باند اختصاصی و پینگ زیر ۱۰ میلی‌ثانیه.
              </p>

              {/* متریک‌ها */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/[0.03] border border-white/10 p-4">
                  <span className="text-xs text-white/50 block mb-1">تاخیر (Latency)</span>
                  <span className="text-xl font-black text-[var(--color-secondary-300)] font-mono">{activeHub.latency}</span>
                </div>
                <div className="bg-white/[0.03] border border-white/10 p-4">
                  <span className="text-xs text-white/50 block mb-1">بار پردازشی (Load)</span>
                  <span className="text-xl font-black text-emerald-400 font-mono">{activeHub.load}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <IconCheck size={16} className="text-[var(--color-secondary-400)] shrink-0" />
                  <span>پشتیبانی از پروتکل‌های امن و رمزنگاری TLS 1.3</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <IconCheck size={16} className="text-[var(--color-secondary-400)] shrink-0" />
                  <span>کش خودکار کاتالوگ و استعلام قیمت در حافظه فلش سرور</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/40">بروزرسانی لحظه‌ای</span>
              <span className="text-xs font-mono text-[var(--color-secondary-300)]">SECURE-NODE-IR</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
