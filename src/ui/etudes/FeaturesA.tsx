'use client';

import { useState } from 'react';
import {
  IconFocus2,
  IconRotate360,
  IconQrcode,
  IconDatabaseSearch,
  IconArrowLeft,
  IconRuler2,
  IconCheck,
  IconCopy,
  IconWifi,
  IconWifiOff,
  IconPlayerPlay,
  IconPlus,
} from '@tabler/icons-react';
import { Button } from '@/ui/Button';

/* ۴ قابلیت محوری سکشن ۰۲ بر اساس سند معماری اطلاعات */
interface FeatureItem {
  id: 'hotspot' | 'media' | 'pwa' | 'archive';
  num: string;
  title: string;
  shortDesc: string;
  icon: typeof IconFocus2;
  hotspotX: number; // percentage
  hotspotY: number; // percentage
}

const FEATURES: FeatureItem[] = [
  {
    id: 'hotspot',
    num: '۰۱',
    title: 'معماری فشرده و پاپ‌آپ (Hotspot)',
    shortDesc: 'جدول مشخصات و ابعاد با لمس مستقیم قطعه باز می‌شوند؛ صفحه خلوت می‌ماند.',
    icon: IconFocus2,
    hotspotX: 28,
    hotspotY: 42,
  },
  {
    id: 'media',
    num: '۰۲',
    title: 'رسانهٔ غنی و مدل سه‌بعدی ۳۶۰°',
    shortDesc: 'بررسی ۳۶۰ درجه، ویدیوی خط تولید و تست عملکرد مستقیم در صفحهٔ محصول.',
    icon: IconRotate360,
    hotspotX: 58,
    hotspotY: 34,
  },
  {
    id: 'pwa',
    num: '۰۳',
    title: 'دسترسی پایدار آفلاین با PWA و QR',
    shortDesc: 'اسکن بارکد QR در نمایشگاه و باز شدن سریع کاتالوگ حتی در سالن بدون آنتن.',
    icon: IconQrcode,
    hotspotX: 78,
    hotspotY: 58,
  },
  {
    id: 'archive',
    num: '۰۴',
    title: 'آرشیو ساختاریافته و لینک اختصاصی',
    shortDesc: 'دسته‌بندی دقیق کدها و تولید لینک مجزا برای هر لاین محصول برای خریدار خاص.',
    icon: IconDatabaseSearch,
    hotspotX: 42,
    hotspotY: 72,
  },
];

export default function FeaturesA() {
  const [activeFeature, setActiveFeature] = useState<'hotspot' | 'media' | 'pwa' | 'archive'>('hotspot');
  const [showDimensions, setShowDimensions] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(45);
  const [isOfflineSimulated, setIsOfflineSimulated] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const activeIndex = FEATURES.findIndex((f) => f.id === activeFeature);

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('https://rokhnama.ir/c/px-3000-industrial');
    }
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2200);
  };

  return (
    <section className="relative w-full bg-[var(--bg-neutral-base)] py-16 md:py-24 border-b border-[var(--border-neutral-base)] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* سربرگ سکشن ۰۲ با نشانه‌های فنی */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-2 border-[var(--color-primary-600)] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-primary-subtle)] border border-[var(--border-primary-soft)] text-xs font-bold text-[var(--color-primary-700)] mb-3">
              <span className="w-1.5 h-1.5 bg-[var(--color-secondary-500)] inline-block" />
              <span>سکشن ۰۲ · کشش بصری و اثبات کارکرد</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-neutral-strong)] tracking-tight">
              کاتالوگ تعاملی چه شکلی است؟
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-neutral-base)] max-w-2xl font-normal leading-relaxed">
              به جای صفحات شلوغ PDF، اطلاعات در لایه‌های مهندسی قرار می‌گیرند تا خریدار قطعات را با لمس مستقیم بررسی کند؛ خلوت، سریع و با وایت‌اسپیس فراوان.
            </p>
          </div>

          {/* کلیدهای کنترل مهندسی نقشه */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setShowDimensions(!showDimensions)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold border transition-colors ${
                showDimensions
                  ? 'bg-[var(--color-primary-600)] text-white border-[var(--color-primary-600)]'
                  : 'bg-white text-[var(--text-neutral-base)] border-[var(--border-neutral-base)] hover:bg-[var(--bg-neutral-subtle)]'
              }`}
            >
              <IconRuler2 size={16} stroke={1.5} />
              <span>خطوط اندازه و تیک‌ها</span>
            </button>
            <div className="hidden sm:flex items-center px-3 py-2 bg-white border border-[var(--border-neutral-base)] text-xs font-mono text-[var(--text-neutral-subtle)]">
              <span>RK-SCHEMATIC-PX3000</span>
            </div>
          </div>
        </div>

        {/* بوم دیاگرام هیرلاین (Hairline Blueprint Canvas) */}
        <div className="relative w-full border-2 border-[var(--border-neutral-base)] bg-white p-4 sm:p-6 lg:p-8 overflow-hidden shadow-sm">

          {/* علائم چهارگوشه نقشه فنی (+ CornerMark) */}
          <div className="absolute top-2 right-2 text-[var(--color-primary-400)] pointer-events-none select-none">
            <IconPlus size={16} stroke={1.5} />
          </div>
          <div className="absolute top-2 left-2 text-[var(--color-primary-400)] pointer-events-none select-none">
            <IconPlus size={16} stroke={1.5} />
          </div>
          <div className="absolute bottom-2 right-2 text-[var(--color-primary-400)] pointer-events-none select-none">
            <IconPlus size={16} stroke={1.5} />
          </div>
          <div className="absolute bottom-2 left-2 text-[var(--color-primary-400)] pointer-events-none select-none">
            <IconPlus size={16} stroke={1.5} />
          </div>

          {/* نوار بالایی شماتیک با مشخصات نقشه */}
          <div className="flex items-center justify-between border-b border-[var(--border-neutral-subtle)] pb-3 mb-6 text-xs text-[var(--text-neutral-subtle)]">
            <div className="flex items-center gap-4">
              <span className="font-bold text-[var(--color-primary-700)]">ماکت فنی: پمپ فشار قوی صنعتی PX-3000</span>
              <span className="hidden sm:inline">مقیاس: ۱:۱۰</span>
              <span className="hidden sm:inline">واحد: میلی‌متر</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-[var(--color-secondary-500)]" />
              <span>نقطهٔ فعال: {FEATURES[activeIndex].title}</span>
            </div>
          </div>

          {/* محفظه اصلی بوم SVG و پاپ‌آپ‌های وابسته */}
          <div className="relative min-h-[440px] md:min-h-[520px] flex items-center justify-center">

            {/* وکتور هیرلاین با خطوط مونو‌لاین ۱px تا ۱.۵px */}
            <svg
              className="w-full h-full max-h-[520px] select-none"
              viewBox="0 0 1000 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* هاشور ۴۵ درجه مهندسی */}
                <pattern
                  id="featuresA-hatch-45"
                  width="8"
                  height="8"
                  patternTransform="rotate(45 0 0)"
                  patternUnits="userSpaceOnUse"
                >
                  <line x1="0" y1="0" x2="0" y2="8" stroke="var(--color-primary-200)" strokeWidth="1" />
                </pattern>

                {/* گرید پس‌زمینه با نقاط ظریف */}
                <pattern
                  id="featuresA-dots-grid"
                  width="24"
                  height="24"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1" fill="var(--color-neutral-300)" />
                </pattern>
              </defs>

              {/* شبکه پس‌زمینه ملایم مهندسی */}
              <rect width="1000" height="600" fill="url(#featuresA-dots-grid)" opacity="0.45" />

              {/* خطوط تقارن و محور مرکزی دستگاه (Centerlines) */}
              <line
                x1="80"
                y1="340"
                x2="920"
                y2="340"
                stroke="var(--color-primary-300)"
                strokeWidth="1"
                strokeDasharray="14 4 3 4"
              />
              <line
                x1="500"
                y1="80"
                x2="500"
                y2="540"
                stroke="var(--color-primary-300)"
                strokeWidth="1"
                strokeDasharray="14 4 3 4"
              />

              {/* ۱. شاسی و پایه دستگاه (Base Mounting Plate) */}
              <rect
                x="160"
                y="420"
                width="680"
                height="45"
                stroke="var(--color-primary-700)"
                strokeWidth="1.5"
                fill="url(#featuresA-hatch-45)"
              />
              {/* پیچ‌ها و شیارهای اتصال شاسی */}
              <rect x="180" y="445" width="40" height="10" stroke="var(--color-primary-700)" strokeWidth="1" fill="#fff" />
              <rect x="480" y="445" width="40" height="10" stroke="var(--color-primary-700)" strokeWidth="1" fill="#fff" />
              <rect x="780" y="445" width="40" height="10" stroke="var(--color-primary-700)" strokeWidth="1" fill="#fff" />

              {/* ۲. محفظه الکتروموتور محرک (Electric Motor Section) */}
              <rect
                x="540"
                y="190"
                width="280"
                height="230"
                stroke="var(--color-primary-700)"
                strokeWidth="1.5"
                fill="#ffffff"
              />
              {/* پره‌های خنک‌کننده الکتروموتور (Cooling Fins - خطوط مونو‌لاین موازی) */}
              {[...Array(11)].map((_, i) => (
                <line
                  key={`fin-${i}`}
                  x1={560 + i * 22}
                  y1="190"
                  x2={560 + i * 22}
                  y2="420"
                  stroke="var(--color-primary-300)"
                  strokeWidth="1"
                />
              ))}
              {/* جعبه تقسیم و اتصالات برق موتور */}
              <rect
                x="630"
                y="130"
                width="100"
                height="60"
                stroke="var(--color-primary-700)"
                strokeWidth="1.5"
                fill="#ffffff"
              />
              <line x1="680" y1="130" x2="680" y2="190" stroke="var(--color-primary-400)" strokeWidth="1" />
              {/* خروجی کابل برق */}
              <circle cx="705" cy="160" r="8" stroke="var(--color-primary-700)" strokeWidth="1.25" fill="#ffffff" />

              {/* ۳. کوپلینگ و غلاف محافظ شفت میانی (Intermediate Coupling) */}
              <rect
                x="450"
                y="260"
                width="90"
                height="120"
                stroke="var(--color-primary-700)"
                strokeWidth="1.5"
                fill="url(#featuresA-hatch-45)"
              />
              <circle cx="495" cy="320" r="28" stroke="var(--color-primary-700)" strokeWidth="1.25" fill="#ffffff" />
              <circle cx="495" cy="320" r="14" stroke="var(--color-secondary-500)" strokeWidth="1.5" fill="none" />

              {/* ۴. بدنه اصلی پمپ هیدرولیک فشار قوی (Hydraulic Pump Block) */}
              <rect
                x="200"
                y="210"
                width="250"
                height="210"
                stroke="var(--color-primary-800)"
                strokeWidth="1.5"
                fill="#ffffff"
              />
              {/* برش مقطع هیدرولیک با پورت‌های ورودی و خروجی */}
              <rect
                x="240"
                y="140"
                width="70"
                height="70"
                stroke="var(--color-primary-700)"
                strokeWidth="1.5"
                fill="#ffffff"
              />
              {/* فلنج خروجی فشار بالا با پیچ‌های دور */}
              <rect x="230" y="125" width="90" height="15" stroke="var(--color-primary-700)" strokeWidth="1.5" fill="#ffffff" />
              <circle cx="245" cy="132" r="3" fill="var(--color-primary-700)" />
              <circle cx="305" cy="132" r="3" fill="var(--color-primary-700)" />

              {/* پورت مکش روغن و منیفولد پایینی */}
              <rect
                x="340"
                y="360"
                width="80"
                height="50"
                stroke="var(--color-primary-700)"
                strokeWidth="1.25"
                fill="#ffffff"
              />
              <line x1="380" y1="360" x2="380" y2="410" stroke="var(--color-primary-400)" strokeWidth="1" strokeDasharray="3 3" />

              {/* ۵. پلاک فنی آلومینیومی مشخصات (Data Plate) */}
              <rect
                x="230"
                y="290"
                width="95"
                height="65"
                stroke="var(--color-primary-600)"
                strokeWidth="1"
                fill="#ffffff"
              />
              <line x1="240" y1="305" x2="315" y2="305" stroke="var(--color-primary-300)" strokeWidth="1" />
              <line x1="240" y1="318" x2="295" y2="318" stroke="var(--color-primary-300)" strokeWidth="1" />
              <line x1="240" y1="332" x2="305" y2="332" stroke="var(--color-primary-300)" strokeWidth="1" />

              {/* خطوط اندازه مهندسی (Dimension Lines with Tick Marks) */}
              {showDimensions && (
                <g className="transition-opacity duration-300">
                  {/* خط اندازه طول کل: ۱۲۰۰ میلی‌متر */}
                  <g>
                    <line x1="160" y1="495" x2="840" y2="495" stroke="var(--color-neutral-600)" strokeWidth="1.25" />
                    {/* تیک‌های شروع و پایان */}
                    <line x1="160" y1="480" x2="160" y2="510" stroke="var(--color-neutral-700)" strokeWidth="1.5" />
                    <line x1="840" y1="480" x2="840" y2="510" stroke="var(--color-neutral-700)" strokeWidth="1.5" />
                    {/* فلش یا اسلش ۴۵ درجه تیک مهندسی */}
                    <line x1="155" y1="500" x2="165" y2="490" stroke="var(--color-neutral-700)" strokeWidth="1.5" />
                    <line x1="835" y1="500" x2="845" y2="490" stroke="var(--color-neutral-700)" strokeWidth="1.5" />
                    {/* برچسب رقم فارسی با کادر سفید */}
                    <rect x="445" y="482" width="110" height="24" fill="#ffffff" stroke="var(--border-neutral-base)" strokeWidth="1" />
                    <text
                      x="500"
                      y="499"
                      fill="var(--text-neutral-strong)"
                      fontSize="13"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="var(--font-sans)"
                    >
                      ۱۲۰۰ میلی‌متر
                    </text>
                  </g>

                  {/* خط اندازه ارتفاع کل: ۴۵۰ میلی‌متر */}
                  <g>
                    <line x1="110" y1="125" x2="110" y2="465" stroke="var(--color-neutral-600)" strokeWidth="1.25" />
                    <line x1="95" y1="125" x2="125" y2="125" stroke="var(--color-neutral-700)" strokeWidth="1.5" />
                    <line x1="95" y1="465" x2="125" y2="465" stroke="var(--color-neutral-700)" strokeWidth="1.5" />
                    <line x1="105" y1="130" x2="115" y2="120" stroke="var(--color-neutral-700)" strokeWidth="1.5" />
                    <line x1="105" y1="470" x2="115" y2="460" stroke="var(--color-neutral-700)" strokeWidth="1.5" />
                    <rect x="65" y="283" width="90" height="24" fill="#ffffff" stroke="var(--border-neutral-base)" strokeWidth="1" />
                    <text
                      x="110"
                      y="300"
                      fill="var(--text-neutral-strong)"
                      fontSize="13"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="var(--font-sans)"
                    >
                      ۴۵۰ میلی‌متر
                    </text>
                  </g>

                  {/* خط اندازه قطر فلنج فشار: ۱۶۰ میلی‌متر */}
                  <g>
                    <line x1="230" y1="95" x2="320" y2="95" stroke="var(--color-secondary-600)" strokeWidth="1" />
                    <line x1="230" y1="88" x2="230" y2="102" stroke="var(--color-secondary-600)" strokeWidth="1.5" />
                    <line x1="320" y1="88" x2="320" y2="102" stroke="var(--color-secondary-600)" strokeWidth="1.5" />
                    <text
                      x="275"
                      y="88"
                      fill="var(--color-secondary-800)"
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="var(--font-sans)"
                    >
                      ۱۶۰ میلی‌متر (DN50)
                    </text>
                  </g>
                </g>
              )}

              {/* خطوط لیدر متصل از هات‌اسپات‌ها به پاپ‌آپ فعال */}
              {activeFeature === 'hotspot' && (
                <path
                  d="M 280 250 L 220 200 L 160 200"
                  stroke="var(--color-secondary-500)"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  fill="none"
                />
              )}
              {activeFeature === 'media' && (
                <path
                  d="M 580 205 L 580 150 L 530 150"
                  stroke="var(--color-primary-600)"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  fill="none"
                />
              )}
              {activeFeature === 'pwa' && (
                <path
                  d="M 780 350 L 830 350 L 860 380"
                  stroke="var(--color-success-600)"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  fill="none"
                />
              )}
              {activeFeature === 'archive' && (
                <path
                  d="M 420 430 L 420 470 L 370 470"
                  stroke="var(--color-primary-800)"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  fill="none"
                />
              )}
            </svg>

            {/* نقاط تعاملی پالس‌دار روی صحنه (Pulsing Hotspots) */}
            {FEATURES.map((feature) => {
              const isActive = activeFeature === feature.id;
              return (
                <div
                  key={`hs-${feature.id}`}
                  style={{
                    left: `${feature.hotspotX}%`,
                    top: `${feature.hotspotY}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFeature(feature.id)}
                    aria-label={feature.title}
                    className="relative flex items-center justify-center p-2 focus:outline-none"
                  >
                    {/* حلقه موج پالس‌دار */}
                    <span
                      className={`absolute w-8 h-8 rounded-full border transition-all ${
                        isActive
                          ? 'border-[var(--color-secondary-500)] scale-150 animate-ping opacity-75'
                          : 'border-[var(--color-primary-500)] opacity-40 group-hover:scale-125'
                      }`}
                    />
                    {/* حلقه بیرونی صلب */}
                    <span
                      className={`w-6 h-6 border-2 flex items-center justify-center transition-all ${
                        isActive
                          ? 'border-[var(--color-secondary-500)] bg-white text-[var(--color-secondary-950)] scale-110 shadow-md'
                          : 'border-[var(--color-primary-600)] bg-white text-[var(--color-primary-600)] group-hover:border-[var(--color-primary-800)]'
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 transition-colors ${
                          isActive ? 'bg-[var(--color-secondary-500)]' : 'bg-[var(--color-primary-600)]'
                        }`}
                      />
                    </span>

                    {/* برچسب شناور شماره نقطه */}
                    <span
                      className={`absolute -top-7 right-1/2 translate-x-1/2 px-2 py-0.5 text-[11px] font-bold whitespace-nowrap border shadow-sm transition-opacity ${
                        isActive
                          ? 'bg-[var(--color-primary-900)] text-white border-[var(--color-primary-700)] opacity-100'
                          : 'bg-white text-[var(--text-neutral-strong)] border-[var(--border-neutral-base)] opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {feature.num}
                    </span>
                  </button>
                </div>
              );
            })}

            {/* پاپ‌آپ‌های مقیاس‌شونده و تعاملی از دل نقطهٔ فعال */}

            {/* ۱. پاپ‌آپ معماری فشرده و مشخصات فنی (Hotspot) */}
            {activeFeature === 'hotspot' && (
              <div
                className="absolute top-4 sm:top-8 right-4 sm:right-10 z-30 w-80 sm:w-96 bg-white border-2 border-[var(--color-secondary-500)] p-4 sm:p-5 shadow-xl animate-in fade-in zoom-in-95 duration-200"
                style={{ direction: 'rtl' }}
              >
                <div className="flex items-start justify-between border-b border-[var(--border-neutral-subtle)] pb-2 mb-3">
                  <div>
                    <span className="text-[11px] font-bold text-[var(--color-secondary-700)] block">
                      نقطهٔ ۱ · پاپ‌آپ مشخصات فنی
                    </span>
                    <h4 className="text-base font-bold text-[var(--text-neutral-strong)]">
                      بدنهٔ پمپ هیدرولیک PX-3000
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 bg-[var(--color-secondary-100)] text-[10px] font-bold text-[var(--color-secondary-950)] border border-[var(--color-secondary-300)]">
                    فشار قوی
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[var(--border-neutral-subtle)]">
                    <span className="text-[var(--text-neutral-subtle)]">فشار کاری پیوسته:</span>
                    <span className="font-bold text-[var(--text-neutral-strong)]">۴۰۰ بار</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-neutral-subtle)]">
                    <span className="text-[var(--text-neutral-subtle)]">دبی خروجی نامی:</span>
                    <span className="font-bold text-[var(--text-neutral-strong)]">۱۲۰ لیتر بر دقیقه</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-neutral-subtle)]">
                    <span className="text-[var(--text-neutral-subtle)]">آلیاژ محفظه سیلندر:</span>
                    <span className="font-bold text-[var(--text-neutral-strong)]">چدن داکتیل GGG-40</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--border-neutral-subtle)]">
                    <span className="text-[var(--text-neutral-subtle)]">فلنج اتصال ورودی:</span>
                    <span className="font-bold text-[var(--text-neutral-strong)]">DN50 / استاندارد DIN 2501</span>
                  </div>
                </div>

                <p className="mt-3 text-[11px] text-[var(--text-neutral-base)] leading-relaxed bg-[var(--bg-neutral-subtle)] p-2 border border-[var(--border-neutral-subtle)]">
                  خریدار با انتخاب مستقیم قطعه به جداول و ابعاد دسترسی دارد؛ نیازی به گشتن در فایل‌های حجیم نیست.
                </p>
              </div>
            )}

            {/* ۲. پاپ‌آپ رسانهٔ غنی و مدل سه‌بعدی ۳۶۰ درجه */}
            {activeFeature === 'media' && (
              <div
                className="absolute top-4 sm:top-8 left-4 sm:left-10 z-30 w-80 sm:w-96 bg-white border-2 border-[var(--color-primary-600)] p-4 sm:p-5 shadow-xl animate-in fade-in zoom-in-95 duration-200"
                style={{ direction: 'rtl' }}
              >
                <div className="flex items-start justify-between border-b border-[var(--border-neutral-subtle)] pb-2 mb-3">
                  <div>
                    <span className="text-[11px] font-bold text-[var(--color-primary-600)] block">
                      نقطهٔ ۲ · رسانه و چرخش ۳۶۰ درجه
                    </span>
                    <h4 className="text-base font-bold text-[var(--text-neutral-strong)]">
                      شفت و کوپلینگ محرک موتور
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 bg-[var(--color-primary-100)] text-[10px] font-bold text-[var(--color-primary-800)] border border-[var(--color-primary-300)]">
                    نمای تعاملی
                  </span>
                </div>

                {/* کنترل زاویه چرخش ۳۶۰ درجه */}
                <div className="bg-[var(--bg-neutral-subtle)] p-3 border border-[var(--border-neutral-subtle)] mb-3">
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span>زاویه چرخش قطعه:</span>
                    <span className="text-[var(--color-primary-700)] font-mono">{rotationAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="15"
                    value={rotationAngle}
                    onChange={(e) => setRotationAngle(Number(e.target.value))}
                    className="w-full accent-[var(--color-primary-600)] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[var(--text-neutral-subtle)] mt-1">
                    <span>۰° (روبرو)</span>
                    <span>۹۰° (جانبی)</span>
                    <span>۱۸۰° (پشت)</span>
                    <span>۲۷۰°</span>
                    <span>۳۶۰°</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-1.5 py-2 px-2 border border-[var(--border-neutral-base)] bg-white hover:bg-[var(--bg-primary-subtle)] font-bold text-[var(--text-neutral-strong)]"
                  >
                    <IconPlayerPlay size={14} stroke={1.5} />
                    <span>تست ارتعاش</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-1.5 py-2 px-2 border border-[var(--border-neutral-base)] bg-white hover:bg-[var(--bg-primary-subtle)] font-bold text-[var(--text-neutral-strong)]"
                  >
                    <IconRotate360 size={14} stroke={1.5} />
                    <span>خط تولید</span>
                  </button>
                </div>
                <p className="mt-2.5 text-[11px] text-[var(--text-neutral-subtle)]">
                  بدون خروج از صفحه و بدون نصب اپلیکیشن سنگین.
                </p>
              </div>
            )}

            {/* ۳. پاپ‌آپ دسترسی پایدار آفلاین با PWA و QR */}
            {activeFeature === 'pwa' && (
              <div
                className="absolute bottom-4 sm:bottom-8 left-4 sm:left-12 z-30 w-80 sm:w-96 bg-white border-2 border-[var(--color-success-600)] p-4 sm:p-5 shadow-xl animate-in fade-in zoom-in-95 duration-200"
                style={{ direction: 'rtl' }}
              >
                <div className="flex items-start justify-between border-b border-[var(--border-neutral-subtle)] pb-2 mb-3">
                  <div>
                    <span className="text-[11px] font-bold text-[var(--color-success-700)] block">
                      نقطهٔ ۳ · دسترسی نمایشگاهی
                    </span>
                    <h4 className="text-base font-bold text-[var(--text-neutral-strong)]">
                      عملکرد آفلاین PWA و بارکد QR
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 bg-[var(--color-success-100)] text-[10px] font-bold text-[var(--color-success-800)] border border-[var(--color-success-300)]">
                    کش خودکار
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-[var(--bg-neutral-subtle)] p-3 border border-[var(--border-neutral-subtle)] mb-3">
                  {/* شماتیک بارکد QR */}
                  <div className="w-16 h-16 bg-white border border-[var(--border-neutral-base)] p-1 shrink-0 flex items-center justify-center">
                    <IconQrcode size={52} stroke={1.5} className="text-[var(--text-neutral-strong)]" />
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="font-bold text-[var(--text-neutral-strong)]">اسکن استند نمایشگاهی</div>
                    <div className="text-[11px] text-[var(--text-neutral-subtle)]">لینک سبک: rokhnama.ir/qr/px</div>
                    <div className="text-[10px] font-mono text-[var(--color-success-700)]">سرعت لود: ۰.۱۸ ثانیه</div>
                  </div>
                </div>

                {/* کلید شبیه‌سازی وضعیت آفلاین */}
                <div className="flex items-center justify-between p-2 border border-[var(--border-neutral-base)] bg-white text-xs">
                  <span className="font-medium">شبیه‌سازی سالن بدون آنتن:</span>
                  <button
                    type="button"
                    onClick={() => setIsOfflineSimulated(!isOfflineSimulated)}
                    className={`px-2.5 py-1 text-xs font-bold border transition-colors flex items-center gap-1 ${
                      isOfflineSimulated
                        ? 'bg-[var(--color-warning-600)] text-white border-[var(--color-warning-600)]'
                        : 'bg-[var(--color-success-600)] text-white border-[var(--color-success-600)]'
                    }`}
                  >
                    {isOfflineSimulated ? (
                      <>
                        <IconWifiOff size={13} stroke={2} />
                        <span>آفلاین (کش فعال)</span>
                      </>
                    ) : (
                      <>
                        <IconWifi size={13} stroke={2} />
                        <span>آنلاین</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ۴. پاپ‌آپ آرشیو ساختاریافته و ارسال لینک اختصاصی */}
            {activeFeature === 'archive' && (
              <div
                className="absolute bottom-4 sm:bottom-8 right-4 sm:right-12 z-30 w-80 sm:w-96 bg-white border-2 border-[var(--color-primary-800)] p-4 sm:p-5 shadow-xl animate-in fade-in zoom-in-95 duration-200"
                style={{ direction: 'rtl' }}
              >
                <div className="flex items-start justify-between border-b border-[var(--border-neutral-subtle)] pb-2 mb-3">
                  <div>
                    <span className="text-[11px] font-bold text-[var(--color-primary-700)] block">
                      نقطهٔ ۴ · انتشار و لینک اختصاصی
                    </span>
                    <h4 className="text-base font-bold text-[var(--text-neutral-strong)]">
                      آرشیو لاین محصولات هیدرولیک
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 bg-[var(--color-primary-100)] text-[10px] font-bold text-[var(--color-primary-900)] border border-[var(--color-primary-300)]">
                    قیمت به‌روز
                  </span>
                </div>

                <div className="space-y-2 text-xs mb-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[var(--text-neutral-subtle)]">کد فنی محصول:</span>
                    <span className="font-mono font-bold text-[var(--text-neutral-strong)]">HYD-PX-3000-HD</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[var(--text-neutral-subtle)]">دسترسی خریدار:</span>
                    <span className="font-bold text-[var(--color-secondary-700)]">قیمت همکاری + فرم استعلام</span>
                  </div>
                </div>

                {/* جعبه کپی لینک اختصاصی */}
                <div className="flex items-center border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)] p-1.5 mb-2">
                  <span className="text-xs font-mono text-[var(--text-neutral-base)] truncate flex-1 px-1.5 text-left" dir="ltr">
                    rokhnama.ir/c/px-hyd
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white"
                  >
                    {isLinkCopied ? (
                      <>
                        <IconCheck size={14} stroke={2} />
                        <span>کپی شد</span>
                      </>
                    ) : (
                      <>
                        <IconCopy size={14} stroke={1.5} />
                        <span>کپی لینک</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-[11px] text-[var(--text-neutral-subtle)]">
                  ارسال مستقیم برای خریدار بدون ارسال فایل‌های چند ده مگابایتی.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* نوار ۴ قابلیت سکشن ۰۲ در پایین بوم برای هدایت و انتخاب */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {FEATURES.map((feature) => {
            const isActive = activeFeature === feature.id;
            const Icon = feature.icon;
            return (
              <button
                key={`btn-${feature.id}`}
                type="button"
                onClick={() => setActiveFeature(feature.id)}
                className={`text-right p-5 border-2 transition-all cursor-pointer relative ${
                  isActive
                    ? 'border-[var(--color-primary-600)] bg-white shadow-md'
                    : 'border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] hover:bg-white hover:border-[var(--border-neutral-strong)]'
                }`}
              >
                {/* نوار بالای کارت فعال */}
                {isActive && (
                  <span className="absolute top-0 right-0 left-0 h-1 bg-[var(--color-secondary-500)]" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold font-mono text-[var(--color-primary-600)]">
                    {feature.num}
                  </span>
                  <div
                    className={`p-2 border ${
                      isActive
                        ? 'border-[var(--color-primary-600)] bg-[var(--bg-primary-subtle)] text-[var(--color-primary-700)]'
                        : 'border-[var(--border-neutral-base)] bg-white text-[var(--text-neutral-base)]'
                    }`}
                  >
                    <Icon size={20} stroke={1.5} />
                  </div>
                </div>

                <h3 className="text-sm font-bold text-[var(--text-neutral-strong)] mb-1.5 leading-snug">
                  {feature.title}
                </h3>
                <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                  {feature.shortDesc}
                </p>
              </button>
            );
          })}
        </div>

        {/* فوتر اقدام و دعوت به عمل سکشن */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white border border-[var(--border-neutral-base)]">
          <div className="text-right">
            <h4 className="text-sm font-bold text-[var(--text-neutral-strong)]">
              آماده‌اید کاتالوگ محصولات خود را در این قالب تعاملی ببینید؟
            </h4>
            <p className="text-xs text-[var(--text-neutral-subtle)] mt-0.5">
              کاتالوگ قبلی‌تان را بفرستید تا نسخهٔ تعاملی آن با محصولات واقعی‌تان ظرف ۴۸ ساعت آماده شود.
            </p>
          </div>
          <Button
            color="primary"
            variant="solid"
            size="md"
            iconAfter={<IconArrowLeft size={18} stroke={2} />}
          >
            درخواست دمو و مشاهده نحوه کارکرد
          </Button>
        </div>

      </div>
    </section>
  );
}
