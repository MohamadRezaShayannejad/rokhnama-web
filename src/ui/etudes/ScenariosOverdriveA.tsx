'use client';

import React, { useState, useRef } from 'react';
import {
  IconBuildingFactory2,
  IconHanger,
  IconMicroscope,
  IconBuildingSkyscraper,
  IconQrcode,
  IconWorld,
  IconFileText,
  IconCheck,
  IconRefresh,
  IconClock,
  IconArrowLeft,
  IconShieldCheck,
  IconDeviceMobile,
  IconDownload,
} from '@tabler/icons-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface SectorItem {
  id: string;
  name: string;
  enCode: string;
  icon: React.ComponentType<{ size?: number; stroke?: number; className?: string }>;
  tagline: string;
  challenge: string;
  solution: string;
  liveStats: { label: string; value: string }[];
  catalogPreview: {
    productName: string;
    productCode: string;
    actionLabel: string;
    badgeText: string;
    detailTitle: string;
    detailContent: string;
  };
}

const SECTORS: SectorItem[] = [
  {
    id: 'industrial',
    name: 'تولیدکنندگان صنعتی B2B',
    enCode: 'B2B-IND-01',
    icon: IconBuildingFactory2,
    tagline: 'همگام‌سازی مستقیم با انبارداری و قیمت‌گذاری چندسطحی',
    challenge: 'تنوع محصول بالا، نوسان هفتگی قیمت و نیاز به اتصال مستقیم به انبار.',
    solution: 'قیمت‌ها مستقیماً از انبار به‌روز می‌شوند؛ هر تغییر قیمت، یک انتشار بدون نیاز به چاپ مجدد.',
    liveStats: [
      { label: 'اقلام متصل به انبار', value: '۱۲,۴۰۰ کد' },
      { label: 'تاخیر به‌روزرسانی قیمت', value: 'آنی (زیر ۳ ثانیه)' },
      { label: 'صرفه‌جویی در چاپ سالانه', value: '۱۰۰٪' },
    ],
    catalogPreview: {
      productName: 'الکتروموتور صنعتی سه‌فاز چدنی ۱۱ کیلووات',
      productCode: 'MOT-3P-11KW-B3',
      actionLabel: 'استعلام قیمت نقش‌محور',
      badgeText: 'موجودی انبار مرکزی: ۴۲ دستگاه',
      detailTitle: 'مشخصات فنی در پاپ‌آپ',
      detailContent: 'دور نامی: ۱۴۵۰ دور در دقیقه · کلاس عایق‌بندی: F · راندمان: IE3 · وزن: ۹۴ کیلوگرم',
    },
  },
  {
    id: 'apparel',
    name: 'عمده‌فروشان پوشاک و نساجی',
    enCode: 'TXT-COL-02',
    icon: IconHanger,
    tagline: 'جایگزینی آنی ژورنال‌های فصلی و ثبت پیش‌سفارش عمده',
    challenge: 'کالکشن‌های فصلی مکرر که چاپ سنتی پاسخگوی سرعت تغییر آنها نیست.',
    solution: 'هر ژورنال تازه به‌محض انتشار جایگزین نسخهٔ قبلی می‌شود؛ کاتالوگ همیشه همگام با فصل جاری است.',
    liveStats: [
      { label: 'زمان بارگذاری کالکشن جدید', value: 'زیر ۲ دقیقه' },
      { label: 'آرشیو هوشمند دوره‌های قبل', value: 'خودکار' },
      { label: 'نمایش ویدیو خط تولید', value: 'تعبیه‌شده' },
    ],
    catalogPreview: {
      productName: 'کالکشن بهار و پاییز — ژاکت مردانه پشمی مدل آرا',
      productCode: 'CLT-ARA-2026',
      actionLabel: 'مشاهده رنگ‌بندی و سایزبندی',
      badgeText: 'حداقل سفارش: ۲۰ قواره',
      detailTitle: 'ویترین چندرسانه‌ای',
      detailContent: 'بافت ۱۰۰٪ الیاف طبیعی شانه شده · عرضه در ۶ رنگ استاندارد · ویدیو بافت پارچه الصاق شده',
    },
  },
  {
    id: 'medical',
    name: 'تجهیزات پزشکی و آزمایشگاهی',
    enCode: 'MED-DEV-03',
    icon: IconMicroscope,
    tagline: 'الصاق گواهی‌های استاندارد، CE و تاییدیه IMED به کالا',
    challenge: 'محصولات حساس با مستندات فنی دقیق، گواهی‌ها و فرایند فروش سازمانی بلندمدت.',
    solution: 'گواهینامه‌ها و اسناد ارزیابی به خودِ قطعه الصاق می‌شوند؛ خریدار سازمانی با یک کلیک به همه دسترسی دارد.',
    liveStats: [
      { label: 'اسناد ارزیابی پیوست', value: 'ISO 13485 / CE' },
      { label: 'سرعت دسترسی خریدار', value: '۱ کلیک' },
      { label: 'صدور پیش‌فاکتور رسمی', value: 'تحت استاندارد' },
    ],
    catalogPreview: {
      productName: 'مانیتور پایش علائم حیاتی بیمارستان مدل مکس-۱۲',
      productCode: 'ICU-MON-MAX12',
      actionLabel: 'دریافت برگه تاییدیه IMED',
      badgeText: 'دارای استاندارد تجهیزات پزشکی',
      detailTitle: 'مستندات نظارتی پیوست',
      detailContent: 'دفترچه راهنمای فارسی · برگه آزمون کالیبراسیون دوره‌ای · گواهی اصالت سامانه انبارداری سلامت',
    },
  },
  {
    id: 'construction',
    name: 'مصالح و تجهیزات ساختمانی',
    enCode: 'BLD-MAT-04',
    icon: IconBuildingSkyscraper,
    tagline: 'اتصال نرخ روزانه بازار به آلبوم پروژه‌های اجراشده',
    challenge: 'وابستگی به قیمت روز بازار و نیاز مبرم به ارائهٔ نمونه‌های کاربرد در پروژه‌های اجراشده.',
    solution: 'نرخ لحظه‌ای در کنار گالری پروژه‌های واقعی قرار می‌گیرد؛ ریسک ارزیابی و استعلام برای مهندس کارفرما حذف می‌شود.',
    liveStats: [
      { label: 'استعلام لحظه‌ای پروژه', value: 'فعال' },
      { label: 'گالری پروژه‌های اجرایی', value: 'کیفیت 4K' },
      { label: 'صدور برگه استعلام A4', value: 'فوری با مهر' },
    ],
    catalogPreview: {
      productName: 'پانل بتن اکسپوز ابعاد ۱۲۰×۶۰ مسلح به الیاف شیشه',
      productCode: 'GFRC-PNL-12060',
      actionLabel: 'مشاهده نمونه اجرا در برج میلاد',
      badgeText: 'شاخص پایه‌کار روز: رسمی',
      detailTitle: 'مشخصات آزمایشگاهی بارگذاری',
      detailContent: 'مقاومت فشاری ۶۰ مگاپاسکال · جذب آب زیر ۴٪ · مقاومت در برابر چرخه ذوب و یخبندان',
    },
  },
  {
    id: 'expo',
    name: 'تیم‌های حاضر در نمایشگاه‌های تخصصی',
    enCode: 'EXP-STN-05',
    icon: IconQrcode,
    tagline: 'حذف کارتن‌های سنگین کاتالوگ و جایگزینی با اسکن QR غرفه',
    challenge: 'حذف هزینه‌های گزاف انبارداری و حمل کارتن‌های سنگین کاتالوگ کاغذی به غرفه.',
    solution: 'اسکن یک نشان اختصاصی روی استند غرفه کافی است تا کل ویترین با سرعت بالا در جیب بازدیدکننده بنشیند.',
    liveStats: [
      { label: 'وزن حمل‌شده به غرفه', value: '۰ کیلوگرم' },
      { label: 'زمان لود کاتالوگ روی موبایل', value: '۰.۸ ثانیه (CDN داخلی)' },
      { label: 'ثبت اطلاعات بازدیدکنندگان', value: 'خودکار' },
    ],
    catalogPreview: {
      productName: 'استند هوشمند دیجیتال رُخ‌نما در سالن ۵ غرفه ۲۴',
      productCode: 'STN-EXPO-2026',
      actionLabel: 'اسکن و ذخیره در PWA موبایل',
      badgeText: 'بدون نیاز به نصب اپلیکیشن یا VPN',
      detailTitle: 'مکانیزم توزیع نمایشگاهی',
      detailContent: 'اسکن بارکد استند کاتالوگ را در حافظه گوشی ذخیره می‌کند و پس از قطع اینترنت نیز در دسترس می‌ماند',
    },
  },
  {
    id: 'export',
    name: 'شرکت‌های بازرگانی و صادراتی',
    enCode: 'EXP-GLB-06',
    icon: IconWorld,
    tagline: 'نمایش کاتالوگ با زبان و ارز اختصاصی کشور مقصد',
    challenge: 'ارائهٔ همزمان کاتالوگ با چند زبان و ارزهای مختلف برای جلسات و خریداران خارجی.',
    solution: 'ویترین با ارز و زبان مبدأ خریدار بین‌المللی بارگذاری می‌شود؛ یک نسخهٔ یکپارچه بدون بازطراحی دوباره.',
    liveStats: [
      { label: 'پشتیبانی ارزی', value: 'USD, EUR, AED, CNY' },
      { label: 'پایداری بین‌المللی', value: 'شبکه توزیع محتوا (CDN)' },
      { label: 'زبان‌های پیش‌فرض', value: 'انگلیسی، عربی، روسی' },
    ],
    catalogPreview: {
      productName: 'Premium Saffron Grade 1 (Super Negin) — Export Packaging',
      productCode: 'EXP-SAF-SNG100',
      actionLabel: 'Switch Currency: USD ($)',
      badgeText: 'FOB Bandar Abbas / CIF Dubai',
      detailTitle: 'International Compliance',
      detailContent: 'SGS Certificate Included · Multi-currency Price Matrix · Origin Certificate Attached',
    },
  },
];

export default function ScenariosOverdriveA() {
  const [selectedId, setSelectedId] = useState('industrial');
  const containerRef = useRef<HTMLDivElement>(null);
  const activeSector = SECTORS.find((s) => s.id === selectedId) || SECTORS[0];

  useGSAP(
    () => {
      gsap.from('.overdrive-a-anim', {
        y: 16,
        opacity: 0,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      dir="rtl"
      className="w-full bg-[var(--color-primary-900)] text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-14 border-t border-b border-[var(--color-primary-600)] tracking-[-0.02em] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* هدر اوردرایو */}
        <div className="overdrive-a-anim flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 mb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--color-secondary-500)]/20 border border-[var(--color-secondary-500)]/40 text-[var(--color-secondary-300)] text-xs font-bold mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--color-secondary-400)] animate-ping" />
              OVERDRIVE A · کنسول تعاملی و مانیتورینگ زنده صنایع
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-[-0.03em] leading-tight">
              کاتالوگ دیجیتال برای هر صنعت چگونه عمل می‌کند؟
            </h2>
            <p className="text-white/70 text-base sm:text-lg mt-3 max-w-2xl">
              صنعت مورد نظر خود را انتخاب کنید تا رفتار واقعی رُخ‌نما، اتصال زنده به انبار و پنل خریدار سازمانی را به‌صورت ملموس بررسی کنید.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-white/60 bg-white/[0.04] p-3 border border-white/10 shrink-0">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              ۶ صنعت معماری‌شده
            </span>
            <span>|</span>
            <span>لود CDN داخلی: ۰.۸ ثانیه</span>
          </div>
        </div>

        {/* گرید کنسول تعاملی */}
        <div className="overdrive-a-anim grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ستون راست (۵ ستون): انتخابگر فهرست صنایع */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="text-xs font-mono uppercase text-white/40 block mb-2 px-1">
              انتخاب صنعت و سناریوی کاربردی
            </span>
            {SECTORS.map((sector) => {
              const isSelected = sector.id === selectedId;
              const Icon = sector.icon;

              return (
                <button
                  key={sector.id}
                  onClick={() => setSelectedId(sector.id)}
                  className={`w-full text-right p-4 sm:p-5 transition-all duration-200 border flex items-center justify-between group relative ${
                    isSelected
                      ? 'bg-white/10 border-[var(--color-secondary-400)] shadow-lg translate-x-1'
                      : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20'
                  }`}
                >
                  {/* نشانگر طلایی فعال بودن */}
                  {isSelected && (
                    <span className="absolute inset-y-0 right-0 w-1 bg-[var(--color-secondary-400)]" />
                  )}

                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 flex items-center justify-center border transition-colors shrink-0 ${
                        isSelected
                          ? 'bg-[var(--color-secondary-500)] text-[var(--color-primary-900)] border-[var(--color-secondary-400)]'
                          : 'bg-white/5 text-white/80 border-white/10 group-hover:text-white'
                      }`}
                    >
                      <Icon size={24} stroke={1.7} />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm sm:text-base font-bold text-white group-hover:text-[var(--color-secondary-300)] transition-colors">
                          {sector.name}
                        </span>
                        <span className="text-[10px] font-mono text-white/40 border border-white/10 px-1 py-0.2">
                          {sector.enCode}
                        </span>
                      </div>
                      <p className="text-xs text-white/60 line-clamp-1">
                        {sector.tagline}
                      </p>
                    </div>
                  </div>

                  <IconArrowLeft
                    size={18}
                    className={`shrink-0 transition-transform ${
                      isSelected
                        ? 'text-[var(--color-secondary-400)] -translate-x-1'
                        : 'text-white/20 group-hover:text-white/60'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* ستون چپ (۷ ستون): نمایشگر شبیه‌ساز زنده کاتالوگ */}
          <div className="lg:col-span-7 bg-[#141B4D] border border-white/15 p-6 sm:p-8 relative shadow-2xl">
            {/* سربرگ شبیه‌ساز */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />
                <span className="text-xs font-mono font-bold text-white tracking-wider">
                  نمای زنده ویترین کاتالوگ · {activeSector.name}
                </span>
              </div>
              <span className="text-xs font-mono text-[var(--color-secondary-300)] bg-[var(--color-secondary-500)]/15 px-2.5 py-1 border border-[var(--color-secondary-500)]/30">
                {activeSector.catalogPreview.badgeText}
              </span>
            </div>

            {/* بدنه تضاد و راهکار صنعت */}
            <div className="mb-6 p-4 bg-white/[0.03] border border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-white/40 block mb-1">چالش کاتالوگ چاپی/سنتی:</span>
                  <p className="text-white/80 leading-relaxed font-normal">
                    {activeSector.challenge}
                  </p>
                </div>
                <div className="sm:border-r sm:border-white/10 sm:pr-4">
                  <span className="text-[var(--color-secondary-400)] font-bold block mb-1">راهکار با رُخ‌نما:</span>
                  <p className="text-white leading-relaxed font-medium">
                    {activeSector.solution}
                  </p>
                </div>
              </div>
            </div>

            {/* ماکت پیش‌نمایش برگه محصول در کاتالوگ */}
            <div className="bg-white text-[var(--color-neutral-900)] p-5 sm:p-6 border border-white/20 shadow-xl mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[var(--border-neutral-base)]">
                <div>
                  <span className="text-[11px] font-mono text-[var(--text-neutral-subtle)] block mb-0.5">
                    کد کالا: {activeSector.catalogPreview.productCode}
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-[var(--text-neutral-strong)]">
                    {activeSector.catalogPreview.productName}
                  </h4>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 bg-[var(--color-primary-900)] hover:bg-[var(--color-primary-800)] text-white text-xs font-bold transition-colors self-start sm:self-auto shrink-0 flex items-center gap-1.5"
                >
                  <IconFileText size={15} />
                  <span>{activeSector.catalogPreview.actionLabel}</span>
                </button>
              </div>

              {/* پاپ‌آپ مشخصات فنی کالا */}
              <div className="p-3.5 bg-[var(--color-primary-50)]/50 border border-[var(--color-primary-200)] text-xs">
                <span className="font-bold text-[var(--color-primary-900)] block mb-1">
                  {activeSector.catalogPreview.detailTitle}:
                </span>
                <p className="text-[var(--text-neutral-base)] leading-relaxed">
                  {activeSector.catalogPreview.detailContent}
                </p>
              </div>
            </div>

            {/* شاخص‌های زنده عملکرد */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {activeSector.liveStats.map((st, idx) => (
                <div key={idx} className="p-3 bg-white/[0.04] border border-white/10 text-center">
                  <span className="text-[11px] text-white/50 block mb-1">{st.label}</span>
                  <span className="text-sm font-bold font-mono text-[var(--color-secondary-300)]">
                    {st.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
