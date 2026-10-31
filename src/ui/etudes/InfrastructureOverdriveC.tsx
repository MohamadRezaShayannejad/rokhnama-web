'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  IconTerminal2,
  IconCpu,
  IconDatabase,
  IconNetwork,
  IconShieldLock,
} from '@tabler/icons-react';
import IranMap from '@/ui/IranMap';

export default function InfrastructureOverdriveC() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ping, setPing] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 3) + 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      gsap.from('.overdrive-c-elem', {
        y: 18,
        opacity: 0,
        duration: 0.55,
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
      className="w-full bg-[var(--color-primary-900)] text-white py-24 px-6 lg:px-14 border-y-2 border-[var(--color-primary-600)] font-mono"
    >
      <div className="max-w-7xl mx-auto">
        {/* هدر اوردرایو */}
        <div className="overdrive-c-elem mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center text-[var(--color-secondary-300)]">
              <IconTerminal2 size={22} />
            </div>
            <div>
              <span className="text-xs text-[var(--color-secondary-300)] font-bold block">
                OVERDRIVE C — مانیتورینگ و تیکر زنده مهندسی
              </span>
              <h2 className="text-2xl lg:text-3xl font-black text-white font-sans tracking-[-0.02em]">
                داشبورد تخصصی زیرساخت بومی رُخ‌نما
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/[0.05] border border-white/15 px-4 py-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-300 font-bold">PING: {ping}ms</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">DATACENTER: TEHRAN-DC1</span>
          </div>
        </div>

        {/* گرید داشبورد */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ستون چپ: نقشه با بافت territory (۶ ستون) */}
          <div className="overdrive-c-elem lg:col-span-6 bg-white/[0.02] border border-white/10 p-6 relative min-h-[400px] flex items-center justify-center">
            <div className="w-full max-w-[420px] aspect-[753/685] opacity-80">
              <IranMap variant="territory" className="w-full h-full" />
            </div>
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur border border-white/20 p-3 text-xs space-y-1">
              <div className="text-[var(--color-secondary-300)] font-bold">بستر توزیع محتوای داخلی (CDN)</div>
              <div className="text-white/60">بدون تاثیر از اختلالات بین‌الملل و فیلترینگ خارجی</div>
            </div>
          </div>

          {/* ستون راست: ترمینال لاگ‌ها و وضعیت سیستم (۶ ستون) */}
          <div className="overdrive-c-elem lg:col-span-6 space-y-4">
            <div className="bg-black/40 border border-white/15 p-5">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs text-white/50">
                <span className="flex items-center gap-2">
                  <IconCpu size={16} className="text-[var(--color-secondary-400)]" />
                  وضعیت سرویس‌دهی کلان
                </span>
                <span className="text-emerald-400 font-bold">NORMAL</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center bg-white/[0.03] p-3 border border-white/5">
                  <span className="text-white/70">تعرفه ریالی و قراردادها</span>
                  <span className="text-[var(--color-secondary-300)] font-bold">بدون وابستگی ارزی</span>
                </div>
                <div className="flex justify-between items-center bg-white/[0.03] p-3 border border-white/5">
                  <span className="text-white/70">سرعت تحویل محتوا (TTFB)</span>
                  <span className="text-emerald-400 font-bold">&lt; 120ms</span>
                </div>
                <div className="flex justify-between items-center bg-white/[0.03] p-3 border border-white/5">
                  <span className="text-white/70">پشتیبانی مهندس‌به‌مهندس</span>
                  <span className="text-[var(--color-secondary-300)] font-bold">فعال (۲۴/۷)</span>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.04] border border-white/15 p-5 text-xs text-white/70 leading-relaxed font-sans">
              <p className="font-bold text-white mb-1">تضمین محرمانگی اطلاعات (NDA رسمی)</p>
              تمامی داده‌های کاتالوگ، استعلام‌ها و ساختار انبار شما در بستر امن داخلی پردازش شده و در اختیار هیچ سرویس شخص ثالث خارجی قرار نمی‌گیرد.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
