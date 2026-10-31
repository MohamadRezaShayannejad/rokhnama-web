'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  IconActivity,
  IconChartBar,
  IconBuildingFactory2,
  IconHanger,
  IconMicroscope,
  IconBuildingSkyscraper,
  IconQrcode,
  IconWorld,
  IconClock,
  IconEye,
  IconDownload,
  IconCheck,
} from '@tabler/icons-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface TelemetryRow {
  id: string;
  name: string;
  icon: React.ComponentType<{ size?: number; stroke?: number; className?: string }>;
  dwellTime: string;
  quoteRate: string;
  topAction: string;
  systemImpact: string;
}

const DATA_ROWS: TelemetryRow[] = [
  {
    id: 'industrial',
    name: 'تولیدکنندگان صنعتی B2B',
    icon: IconBuildingFactory2,
    dwellTime: '۴ دقیقه و ۲۰ ثانیه',
    quoteRate: '۶۸٪ درخواست پیش‌فاکتور',
    topAction: 'بررسی مشخصات فنی در پاپ‌آپ و استعلام انبار',
    systemImpact: 'حذف مغایرت قیمت بین فروش و انبار مرکزی',
  },
  {
    id: 'apparel',
    name: 'عمده‌فروشان پوشاک و نساجی',
    icon: IconHanger,
    dwellTime: '۳ دقیقه و ۱۰ ثانیه',
    quoteRate: '۵۴٪ ثبت قواره و سایزبندی',
    topAction: 'مشاهده ویدیو خط بافت و کالکشن فصلی',
    systemImpact: 'حذف وقفه زمانی چاپ ژورنال در شروع هر فصل',
  },
  {
    id: 'medical',
    name: 'تجهیزات پزشکی و آزمایشگاهی',
    icon: IconMicroscope,
    dwellTime: '۶ دقیقه و ۴۵ ثانیه',
    quoteRate: '۸۲٪ دانلود مستندات مناقصه',
    topAction: 'بررسی و دانلود گواهی IMED و آزمون کالیبراسیون',
    systemImpact: 'ارائه بی‌واسطه اسناد نظارتی به کارشناس خرید بیمارستان',
  },
  {
    id: 'construction',
    name: 'مصالح و تجهیزات ساختمانی',
    icon: IconBuildingSkyscraper,
    dwellTime: '۵ دقیقه و ۱۵ ثانیه',
    quoteRate: '۶۱٪ صدور پیش‌فاکتور رسمی',
    topAction: 'مشاهده آلبوم اجرای پروژه و محاسبه متراژ بار',
    systemImpact: 'رفع ابهام مهندسین ناظر با ارائه نمونه‌های واقعی اجرا',
  },
  {
    id: 'expo',
    name: 'تیم‌های حاضر در نمایشگاه‌های تخصصی',
    icon: IconQrcode,
    dwellTime: '۲ دقیقه و ۵۰ ثانیه',
    quoteRate: '۷۹٪ ذخیره در گوشی بازدیدکننده',
    topAction: 'اسکن نشان غرفه بدون نیاز به نصب اپلیکیشن',
    systemImpact: 'حذف کامل هزینه و باربری کارتن‌های کاتالوگ به غرفه',
  },
  {
    id: 'export',
    name: 'شرکت‌های بازرگانی و صادراتی',
    icon: IconWorld,
    dwellTime: '۴ دقیقه و ۳۰ ثانیه',
    quoteRate: '۴۷٪ استعلام ارزی FOB/CIF',
    topAction: 'تغییر واحد پول به دلار/درهم و سوئیچ زبان',
    systemImpact: 'ارائه نسخه چندزبانه متمرکز برای جلسات تجاری بین‌الملل',
  },
];

export default function ScenariosOverdriveC() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedId, setSelectedId] = useState('industrial');
  const [liveCounter, setLiveCounter] = useState(148);

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveCounter((prev) => prev + (Math.random() > 0.6 ? 1 : 0));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useGSAP(
    () => {
      gsap.from('.overdrive-c-elem', {
        y: 18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  const activeRow = DATA_ROWS.find((r) => r.id === selectedId) || DATA_ROWS[0];

  return (
    <div
      ref={containerRef}
      dir="rtl"
      className="w-full bg-[#0E1338] text-white py-24 sm:py-32 px-4 sm:px-6 lg:px-14 border-t border-b border-[var(--color-primary-600)] tracking-[-0.02em] overflow-hidden font-sans"
    >
      <div className="max-w-7xl mx-auto">
        {/* هدر بخش اوردرایو C */}
        <div className="overdrive-c-elem mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-secondary-500)]/20 border border-[var(--color-secondary-500)]/40 text-[var(--color-secondary-300)] text-xs font-bold mb-3">
              <IconActivity size={15} className="animate-pulse" />
              OVERDRIVE C · تله‌متری رفتار خریدار در صنایع و ماتریس تبدیل B2B
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-[-0.03em] leading-tight">
              پایش زنده تعامل مشتری در هر صنعت
            </h2>
            <p className="text-white/70 text-base sm:text-lg mt-3 max-w-2xl">
              رُخ‌نما تنها یک ویترین نیست؛ تیم فروش شما دقیقاً می‌داند خریدار کدام صنعت روی چه قطعه‌ای مکث کرده، چه اسنادی را بررسی نموده و کِی آماده سفارش است.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 px-4 py-3 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-300 font-bold">تعامل زنده ثبت‌شده امروز: {liveCounter}</span>
          </div>
        </div>

        {/* ماتریس تله‌متری */}
        <div className="overdrive-c-elem grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* جدول صنایع در سمت راست (۷ ستون) */}
          <div className="lg:col-span-7 bg-white/[0.03] border border-white/10 overflow-hidden shadow-xl">
            <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
              <span>صنعت و سگمنت بازار</span>
              <span>مدت مکث میانگین</span>
            </div>

            <div className="divide-y divide-white/5">
              {DATA_ROWS.map((row) => {
                const isSelected = row.id === selectedId;
                const Icon = row.icon;

                return (
                  <div
                    key={row.id}
                    onClick={() => setSelectedId(row.id)}
                    className={`px-6 py-4.5 flex items-center justify-between transition-colors cursor-pointer group ${
                      isSelected
                        ? 'bg-[var(--color-secondary-500)]/15 text-white'
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 flex items-center justify-center border transition-colors ${
                          isSelected
                            ? 'bg-[var(--color-secondary-500)] text-[var(--color-primary-900)] border-[var(--color-secondary-400)]'
                            : 'bg-white/5 text-white/70 border-white/10 group-hover:text-white'
                        }`}
                      >
                        <Icon size={20} stroke={1.7} />
                      </div>
                      <div>
                        <span className="text-sm sm:text-base font-bold text-white block">
                          {row.name}
                        </span>
                        <span className="text-xs text-white/50 line-clamp-1">
                          {row.topAction}
                        </span>
                      </div>
                    </div>

                    <div className="text-left font-mono text-xs text-[var(--color-secondary-300)] shrink-0">
                      <span>{row.dwellTime}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* پنل بینش تحلیلی در سمت چپ (۵ ستون) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#181F54] to-[#121742] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                <IconChartBar size={16} className="text-[var(--color-secondary-400)]" />
                <span>تحلیل رفتار سازمانی · {activeRow.name}</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
                شاخص تبدیل بالا
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-white/50 block mb-1">شاخص صدور استعلام رسمی و پیش‌فاکتور:</span>
                <div className="text-2xl font-black text-white font-mono flex items-center gap-2">
                  <span className="text-[var(--color-secondary-400)]">{activeRow.quoteRate}</span>
                </div>
              </div>

              <div className="p-4 bg-white/[0.04] border border-white/10 space-y-2">
                <span className="text-xs font-bold text-white/80 block">رفتار غالب خریدار در رُخ‌نما:</span>
                <p className="text-sm text-white/70 leading-relaxed font-normal">
                  {activeRow.topAction}
                </p>
              </div>

              <div className="p-4 bg-[var(--color-secondary-500)]/10 border border-[var(--color-secondary-400)]/30 space-y-2">
                <span className="text-xs font-bold text-[var(--color-secondary-300)] flex items-center gap-1.5">
                  <IconCheck size={16} />
                  دستاورد ساختاری برای مدیران این صنعت:
                </span>
                <p className="text-sm text-white leading-relaxed font-medium">
                  {activeRow.systemImpact}
                </p>
              </div>
            </div>

            <div className="pt-2 text-xs text-white/40 border-t border-white/10 flex items-center justify-between">
              <span>گزارش‌گیری لحظه‌ای تیم فروش</span>
              <span className="font-mono text-white/60">CRM / ERP Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
