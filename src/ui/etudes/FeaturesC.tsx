'use client';

import { useState } from 'react';
import {
  IconFocus2,
  IconRotate360,
  IconQrcode,
  IconDatabaseSearch,
  IconArrowLeft,
  IconLayersLinked,
  IconRuler2,
  IconPlus,
  IconCheck,
  IconCopy,
  IconWifi,
  IconWifiOff,
  IconPlayerPlay,
  IconStack2,
} from '@tabler/icons-react';
import { Button } from '@/ui/Button';

/* ۴ لایهٔ پشتهٔ مهندسی کاتالوگ رُخ‌نما بر مبنای سند IA */
interface StackLayer {
  id: 1 | 2 | 3 | 4;
  key: 'hotspot' | 'media' | 'pwa' | 'archive';
  code: string;
  num: string;
  title: string;
  badge: string;
  description: string;
  accentColor: string;
  icon: typeof IconFocus2;
}

const STACK_LAYERS: StackLayer[] = [
  {
    id: 1,
    key: 'hotspot',
    code: 'LAYER-01 · GEOMETRY',
    num: '۰۱',
    title: 'معماری فشرده و پاپ‌آپ (Hotspot)',
    badge: 'پایگاه مشخصات و ابعاد',
    description: 'جدول مشخصات فنی، نقشه ابعاد و مقاطع با لمس مستقیم روی قطعه باز می‌شوند؛ صفحه اصلی سبک و خواناست.',
    accentColor: 'var(--color-secondary-500)',
    icon: IconFocus2,
  },
  {
    id: 2,
    key: 'media',
    code: 'LAYER-02 · MOTION',
    num: '۰۲',
    title: 'رسانهٔ غنی و مدل سه‌بعدی ۳۶۰°',
    badge: 'بررسی حرکتی و عملکردی',
    description: 'ویدیوی خط تولید، تست عملکرد در کارخانه و بررسی ۳۶۰ درجه مستقیم در صفحه کاتالوگ بدون خروج از سند.',
    accentColor: 'var(--color-primary-600)',
    icon: IconRotate360,
  },
  {
    id: 3,
    key: 'pwa',
    code: 'LAYER-03 · NETWORK',
    num: '۰۳',
    title: 'دسترسی پایدار آفلاین با PWA و QR',
    badge: 'پایداری نمایشگاهی بدون آنتن',
    description: 'اسکن بارکد QR در غرفه، لود فوق‌سریع و کش خودکار محلی برای مرور بی‌وقفه حتی در سالن‌های بدون اینترنت.',
    accentColor: 'var(--color-success-600)',
    icon: IconQrcode,
  },
  {
    id: 4,
    key: 'archive',
    code: 'LAYER-04 · COMMERCE',
    num: '۰۴',
    title: 'آرشیو ساختاریافته و ارسال لینک اختصاصی',
    badge: 'فیلتر فنی و توزیع اختصاصی',
    description: 'دسته‌بندی و فیلتر دقیق کدهای فنی؛ امکان ارسال لینک مجزا برای هر لاین محصول برای خریدار یا همکار خاص.',
    accentColor: 'var(--color-primary-800)',
    icon: IconDatabaseSearch,
  },
];

export default function FeaturesC() {
  const [activeLayerId, setActiveLayerId] = useState<1 | 2 | 3 | 4>(1);
  const [viewMode, setViewMode] = useState<'stack' | 'single'>('stack');
  const [showGuides, setShowGuides] = useState(true);

  // استیت‌های لایه ۱: پاپ‌آپ ابعاد
  const [activeHotspot, setActiveHotspot] = useState<'chamber' | 'flange' | 'motor'>('chamber');

  // استیت‌های لایه ۲: چرخش ۳۶۰ درجه
  const [rotAngle, setRotAngle] = useState(45);

  // استیت‌های لایه ۳: وضعیت آفلاین
  const [isOffline, setIsOffline] = useState(false);

  // استیت‌های لایه ۴: لینک اختصاصی
  const [copied, setCopied] = useState(false);

  const currentLayer = STACK_LAYERS.find((l) => l.id === activeLayerId)!;

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('https://rokhnama.ir/c/px3000-partner-spec');
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative w-full bg-[var(--bg-neutral-base)] py-16 md:py-24 border-b border-[var(--border-neutral-base)] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* سربرگ بخش ۰۲ با نشانه‌های پشتهٔ لایه‌ای */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-2 border-[var(--color-primary-600)] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-primary-subtle)] border border-[var(--border-primary-soft)] text-xs font-bold text-[var(--color-primary-700)] mb-3">
              <span className="w-1.5 h-1.5 bg-[var(--color-secondary-500)] inline-block" />
              <span>سکشن ۰۲ · پشتهٔ لایه‌ای کاتالوگ و کنترل‌های مهندسی</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-neutral-strong)] tracking-tight">
              کاتالوگ تعاملی چه شکلی است؟
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-neutral-base)] max-w-2xl font-normal leading-relaxed">
              کاتالوگ چاپی سنتی یک صفحه تخت و شلوغ بود. رُخ‌نما داده‌های محصول را به چهار لایهٔ سوییچ‌شونده تفکیک می‌کند تا خریدار به آسانی قطعات را بررسی کند.
            </p>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 bg-white border border-[var(--border-neutral-base)] text-xs text-[var(--text-neutral-subtle)] font-mono self-start md:self-auto">
            <span>STACK-SYS: ۴ لایه مهندسی</span>
          </div>
        </div>

        {/* جعبه ماکت پشته‌ای با کنترل‌های مهندسی */}
        <div className="border-2 border-[var(--border-neutral-base)] bg-white p-4 sm:p-6 lg:p-8 relative shadow-sm">

          {/* علائم چهارگوشه نقشه فنی (+ CornerMark) */}
          <div className="absolute top-2.5 right-2.5 text-[var(--color-primary-400)] pointer-events-none select-none">
            <IconPlus size={16} stroke={1.5} />
          </div>
          <div className="absolute top-2.5 left-2.5 text-[var(--color-primary-400)] pointer-events-none select-none">
            <IconPlus size={16} stroke={1.5} />
          </div>
          <div className="absolute bottom-2.5 right-2.5 text-[var(--color-primary-400)] pointer-events-none select-none">
            <IconPlus size={16} stroke={1.5} />
          </div>
          <div className="absolute bottom-2.5 left-2.5 text-[var(--color-primary-400)] pointer-events-none select-none">
            <IconPlus size={16} stroke={1.5} />
          </div>

          {/* نوار بالایی کنترل‌های مهندسی (Engineering Controls Bar) */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-neutral-base)] pb-4 mb-6">

            {/* انتخابگر لایه‌های پشته (۴ کلید با شماره فارسی) */}
            <div className="flex flex-wrap items-center gap-1.5">
              {STACK_LAYERS.map((layer) => {
                const isSelected = activeLayerId === layer.id;
                return (
                  <button
                    key={`tab-layer-${layer.id}`}
                    type="button"
                    onClick={() => setActiveLayerId(layer.id)}
                    className={`px-3 py-2 text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[var(--color-primary-600)] text-white border-[var(--color-primary-600)] shadow-sm'
                        : 'bg-white text-[var(--text-neutral-base)] border-[var(--border-neutral-base)] hover:bg-[var(--bg-neutral-subtle)]'
                    }`}
                  >
                    <span className="font-mono text-[11px] opacity-80">{layer.num}</span>
                    <span>{layer.title.split(' ')[0]} {layer.title.split(' ')[1]}</span>
                  </button>
                );
              })}
            </div>

            {/* کلیدهای کنترل وضعیت دیداری (View Mode & Guides) */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'stack' ? 'single' : 'stack')}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold border border-[var(--border-neutral-base)] bg-white hover:bg-[var(--bg-neutral-subtle)] text-[var(--text-neutral-strong)]"
              >
                {viewMode === 'stack' ? <IconStack2 size={15} stroke={1.5} /> : <IconLayersLinked size={15} stroke={1.5} />}
                <span>{viewMode === 'stack' ? 'نمای پشتهٔ ایزومتریک' : 'نمای تک‌لایه متمرکز'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowGuides(!showGuides)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold border transition-colors ${
                  showGuides
                    ? 'bg-[var(--color-primary-100)] text-[var(--color-primary-800)] border-[var(--color-primary-300)]'
                    : 'bg-white text-[var(--text-neutral-base)] border-[var(--border-neutral-base)]'
                }`}
              >
                <IconRuler2 size={15} stroke={1.5} />
                <span>خطوط راهنما</span>
              </button>
            </div>
          </div>

          {/* محفظه اصلی بوم پشته (The Stack Canvas) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[480px]">

            {/* سمت چپ: نمای بصری ایزومتریک یا ارتوگرافیک پشته (۷ ستون) */}
            <div className="lg:col-span-7 relative bg-[var(--bg-neutral-base)] border border-[var(--border-neutral-base)] p-4 sm:p-6 overflow-hidden flex items-center justify-center min-h-[380px]">

              {/* بوم SVG هیرلاین پشتهٔ ۴ لایه */}
              <svg className="w-full h-80 select-none" viewBox="0 0 600 360" fill="none">
                <defs>
                  <pattern
                    id="featuresC-dots"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="2" cy="2" r="1" fill="var(--color-neutral-300)" />
                  </pattern>
                  <pattern
                    id="featuresC-hatch"
                    width="8"
                    height="8"
                    patternTransform="rotate(45 0 0)"
                    patternUnits="userSpaceOnUse"
                  >
                    <line x1="0" y1="0" x2="0" y2="8" stroke="var(--color-primary-200)" strokeWidth="1" />
                  </pattern>
                </defs>

                <rect width="600" height="360" fill="url(#featuresC-dots)" opacity="0.4" />

                {/* در حالت نمای پشته ایزومتریک (Exploded Isometric Stack) */}
                {viewMode === 'stack' ? (
                  <g className="transition-all duration-300">
                    {/* خطوط اتصال عمودی پروژکشن بین ۴ لایه */}
                    {showGuides && (
                      <g stroke="var(--color-primary-300)" strokeWidth="1" strokeDasharray="3 3">
                        <line x1="120" y1="260" x2="120" y2="60" />
                        <line x1="480" y1="260" x2="480" y2="60" />
                        <line x1="180" y1="320" x2="180" y2="120" />
                        <line x1="540" y1="320" x2="540" y2="120" />
                      </g>
                    )}

                    {/* رسم ۴ لایه به صورت صفحات متوازی‌الاضلاع ایزومتریک */}
                    {STACK_LAYERS.map((layer, idx) => {
                      const isCurrent = activeLayerId === layer.id;
                      const yOffset = 230 - idx * 55; // فاصله لایه‌ها از پایین به بالا

                      return (
                        <g
                          key={`iso-layer-${layer.id}`}
                          onClick={() => setActiveLayerId(layer.id)}
                          className="cursor-pointer group"
                        >
                          {/* صفحه کاتالوگ با زاویه ایزومتریک */}
                          <polygon
                            points={`120,${yOffset} 480,${yOffset} 420,${yOffset + 60} 60,${yOffset + 60}`}
                            stroke={isCurrent ? 'var(--color-primary-700)' : 'var(--color-neutral-400)'}
                            strokeWidth={isCurrent ? '2' : '1.25'}
                            fill={isCurrent ? '#ffffff' : 'var(--color-neutral-100)'}
                            className="transition-all duration-200"
                          />

                          {/* خطوط داخلی نقشه فنی روی لایه */}
                          <line
                            x1="160"
                            y1={yOffset + 25}
                            x2="380"
                            y2={yOffset + 25}
                            stroke={isCurrent ? 'var(--color-primary-300)' : 'var(--color-neutral-300)'}
                            strokeWidth="1"
                          />
                          <line
                            x1="180"
                            y1={yOffset + 40}
                            x2="320"
                            y2={yOffset + 40}
                            stroke={isCurrent ? 'var(--color-primary-300)' : 'var(--color-neutral-300)'}
                            strokeWidth="1"
                          />

                          {/* برچسب شماره و نام لایه */}
                          <text
                            x="495"
                            y={yOffset + 35}
                            fill={isCurrent ? 'var(--color-primary-800)' : 'var(--text-neutral-subtle)'}
                            fontSize="11"
                            fontWeight="bold"
                            fontFamily="var(--font-sans)"
                          >
                            لایه {layer.num}: {layer.title.split(' ')[0]}
                          </text>

                          {/* نقطه پالس‌دار روی لایه فعال */}
                          {isCurrent && (
                            <circle
                              cx="240"
                              cy={yOffset + 30}
                              r="6"
                              fill="var(--color-secondary-500)"
                              className="animate-pulse"
                            />
                          )}
                        </g>
                      );
                    })}
                  </g>
                ) : (
                  /* در حالت نمای تک‌لایه متمرکز (Focused Single Layer) */
                  <g className="transition-all duration-300">
                    {/* کادر ارتوگرافیک مهندسی تمام صفحه */}
                    <rect
                      x="70"
                      y="40"
                      width="460"
                      height="260"
                      stroke="var(--color-primary-700)"
                      strokeWidth="1.5"
                      fill="#ffffff"
                    />

                    {/* مقطع شماتیک قطعه هیدرولیک هیرلاین */}
                    <rect x="140" y="90" width="320" height="150" stroke="var(--color-primary-600)" strokeWidth="1.25" fill="#ffffff" />
                    <rect x="200" y="120" width="200" height="90" stroke="var(--color-primary-600)" strokeWidth="1" fill="url(#featuresC-hatch)" />

                    {/* خط اندازه بالای کادر */}
                    {showGuides && (
                      <g>
                        <line x1="70" y1="25" x2="530" y2="25" stroke="var(--color-neutral-600)" strokeWidth="1" />
                        <line x1="70" y1="18" x2="70" y2="32" stroke="var(--color-neutral-700)" strokeWidth="1.5" />
                        <line x1="530" y1="18" x2="530" y2="32" stroke="var(--color-neutral-700)" strokeWidth="1.5" />
                        <rect x="250" y="15" width="100" height="20" fill="#ffffff" stroke="var(--border-neutral-base)" strokeWidth="1" />
                        <text x="300" y="29" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--text-neutral-strong)" fontFamily="var(--font-sans)">
                          ۱۲۰۰ میلی‌متر
                        </text>
                      </g>
                    )}

                    {/* هات‌اسپات‌های تعاملی */}
                    <circle cx="220" cy="165" r="9" stroke="var(--color-secondary-500)" strokeWidth="2" fill="#ffffff" />
                    <circle cx="220" cy="165" r="4" fill="var(--color-secondary-500)" />

                    <circle cx="380" cy="165" r="9" stroke="var(--color-primary-600)" strokeWidth="2" fill="#ffffff" />
                    <circle cx="380" cy="165" r="4" fill="var(--color-primary-600)" />
                  </g>
                )}
              </svg>

              {/* نشانگر لایه در گوشه کادر */}
              <div className="absolute bottom-3 start-3 bg-white px-2.5 py-1 border border-[var(--border-neutral-base)] text-[11px] font-mono font-bold text-[var(--color-primary-700)]">
                {currentLayer.code}
              </div>
            </div>

            {/* سمت راست: پنل آزمون و کنترل اختصاصی لایه فعال (۵ ستون) */}
            <div className="lg:col-span-5 space-y-5">

              <div className="border-b border-[var(--border-neutral-base)] pb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-bold text-[var(--color-primary-600)]">
                    {currentLayer.code} · لایه {currentLayer.num}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-[var(--bg-primary-subtle)] text-[var(--color-primary-700)] border border-[var(--border-primary-soft)]">
                    {currentLayer.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-neutral-strong)]">
                  {currentLayer.title}
                </h3>
                <p className="text-xs text-[var(--text-neutral-base)] leading-relaxed mt-2">
                  {currentLayer.description}
                </p>
              </div>

              {/* کنترل‌های زنده وابسته به هر لایه */}
              <div className="bg-[var(--bg-neutral-subtle)] p-4 border border-[var(--border-neutral-base)] space-y-3">

                {/* تعامل لایه ۱: سوئیچ هات‌اسپات و نمایش مشخصات */}
                {activeLayerId === 1 && (
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-[var(--text-neutral-strong)] block">
                      آزمون باز شدن مشخصات با لمس مستقیم:
                    </span>
                    <div className="grid grid-cols-3 gap-1.5 text-xs">
                      <button
                        type="button"
                        onClick={() => setActiveHotspot('chamber')}
                        className={`p-2 border text-center transition-colors font-bold ${
                          activeHotspot === 'chamber'
                            ? 'bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)] border-[var(--color-secondary-600)]'
                            : 'bg-white text-[var(--text-neutral-base)] border-[var(--border-neutral-base)]'
                        }`}
                      >
                        محفظه سیلندر
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveHotspot('flange')}
                        className={`p-2 border text-center transition-colors font-bold ${
                          activeHotspot === 'flange'
                            ? 'bg-[var(--color-primary-600)] text-white border-[var(--color-primary-700)]'
                            : 'bg-white text-[var(--text-neutral-base)] border-[var(--border-neutral-base)]'
                        }`}
                      >
                        فلنج اتصال
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveHotspot('motor')}
                        className={`p-2 border text-center transition-colors font-bold ${
                          activeHotspot === 'motor'
                            ? 'bg-[var(--color-success-600)] text-white border-[var(--color-success-700)]'
                            : 'bg-white text-[var(--text-neutral-base)] border-[var(--border-neutral-base)]'
                        }`}
                      >
                        شفت و روتور
                      </button>
                    </div>

                    <div className="p-2.5 bg-white border border-[var(--border-neutral-base)] text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="text-[var(--text-neutral-subtle)]">فشار کاری:</span>
                        <span className="font-bold text-[var(--text-neutral-strong)]">۴۰۰ بار</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-neutral-subtle)]">قطر اسمی:</span>
                        <span className="font-bold text-[var(--text-neutral-strong)]">DN50 / ۱۶۰ میلی‌متر</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--text-neutral-subtle)]">جنس آلیاژ:</span>
                        <span className="font-bold text-[var(--text-neutral-strong)]">چدن داکتیل GGG-40</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* تعامل لایه ۲: چرخش ۳۶۰ درجه و تست ویدیو */}
                {activeLayerId === 2 && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-[var(--text-neutral-strong)]">کنترل چرخش ۳۶۰ درجه:</span>
                      <span className="font-mono text-[var(--color-primary-700)] font-bold">{rotAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="15"
                      value={rotAngle}
                      onChange={(e) => setRotAngle(Number(e.target.value))}
                      className="w-full accent-[var(--color-primary-600)] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[var(--text-neutral-subtle)] font-mono">
                      <span>۰°</span>
                      <span>۹۰°</span>
                      <span>۱۸۰°</span>
                      <span>۲۷۰°</span>
                      <span>۳۶۰°</span>
                    </div>

                    <button
                      type="button"
                      className="w-full py-2 bg-white border border-[var(--border-neutral-base)] hover:bg-[var(--bg-primary-subtle)] text-xs font-bold text-[var(--text-neutral-strong)] flex items-center justify-center gap-1.5"
                    >
                      <IconPlayerPlay size={15} stroke={1.5} />
                      <span>مشاهده ویدیوی تست عملکرد قطعه</span>
                    </button>
                  </div>
                )}

                {/* تعامل لایه ۳: تست آفلاین PWA و اسکن QR */}
                {activeLayerId === 3 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[var(--text-neutral-strong)]">تست سالن بدون آنتن:</span>
                      <span
                        className={`px-2 py-0.5 text-[11px] font-bold ${
                          isOffline
                            ? 'bg-[var(--color-warning-100)] text-[var(--color-warning-800)]'
                            : 'bg-[var(--color-success-100)] text-[var(--color-success-800)]'
                        }`}
                      >
                        {isOffline ? 'آفلاین (کش PWA فعال)' : 'آنلاین (سرور داخلی)'}
                      </span>
                    </div>

                    <p className="text-xs text-[var(--text-neutral-base)] leading-relaxed">
                      {isOffline
                        ? 'کاتالوگ بدون نیاز به اینترنت از کش داخلی لود شد؛ سرعت باز شدن: ۰.۱۸ ثانیه.'
                        : 'خریدار با اسکن QR استند، صفحه را باز کرده و حتی با قطع اینترنت دسترسی دارد.'}
                    </p>

                    <button
                      type="button"
                      onClick={() => setIsOffline(!isOffline)}
                      className={`w-full py-2 text-xs font-bold border transition-colors flex items-center justify-center gap-1.5 ${
                        isOffline
                          ? 'bg-[var(--color-primary-600)] text-white border-[var(--color-primary-600)]'
                          : 'bg-white text-[var(--color-warning-700)] border-[var(--color-warning-600)] hover:bg-[var(--color-warning-50)]'
                      }`}
                    >
                      {isOffline ? <IconWifi size={14} stroke={2} /> : <IconWifiOff size={14} stroke={2} />}
                      <span>{isOffline ? 'اتصال مجدد آنلاین' : 'شبیه‌سازی قطع اینترنت سالن'}</span>
                    </button>
                  </div>
                )}

                {/* تعامل لایه ۴: لینک اختصاصی و آرشیو */}
                {activeLayerId === 4 && (
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-[var(--text-neutral-strong)] block">
                      تولید لینک اختصاصی برای همکاران:
                    </span>
                    <div className="flex items-center border border-[var(--border-neutral-base)] bg-white p-1">
                      <span className="text-xs font-mono text-[var(--text-neutral-base)] truncate flex-1 px-2 text-left" dir="ltr">
                        rokhnama.ir/c/px3000-partner-spec
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white"
                      >
                        {copied ? (
                          <>
                            <IconCheck size={14} stroke={2} />
                            <span>کپی شد</span>
                          </>
                        ) : (
                          <>
                            <IconCopy size={14} stroke={1.5} />
                            <span>کپی</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-[11px] text-[var(--text-neutral-subtle)] space-y-0.5">
                      <div>✓ تفکیک قیمت همکاری از قیمت عمومی</div>
                      <div>✓ اتصال به فرم ثبت استعلام سازمانی</div>
                    </div>
                  </div>
                )}
              </div>

              {/* راهنمای ناوبری بین لایه‌ها */}
              <div className="flex items-center justify-between pt-2 border-t border-[var(--border-neutral-subtle)] text-xs">
                <button
                  type="button"
                  disabled={activeLayerId === 1}
                  onClick={() => setActiveLayerId((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3 | 4) : prev))}
                  className="px-3 py-1.5 border border-[var(--border-neutral-base)] bg-white text-[var(--text-neutral-strong)] disabled:opacity-30 disabled:pointer-events-none hover:bg-[var(--bg-neutral-subtle)] font-bold"
                >
                  ← لایهٔ قبلی
                </button>
                <span className="font-mono text-xs text-[var(--text-neutral-subtle)]">
                  لایه {currentLayer.num} از ۰۴
                </span>
                <button
                  type="button"
                  disabled={activeLayerId === 4}
                  onClick={() => setActiveLayerId((prev) => (prev < 4 ? ((prev + 1) as 1 | 2 | 3 | 4) : prev))}
                  className="px-3 py-1.5 border border-[var(--border-neutral-base)] bg-white text-[var(--text-neutral-strong)] disabled:opacity-30 disabled:pointer-events-none hover:bg-[var(--bg-neutral-subtle)] font-bold"
                >
                  لایهٔ بعدی →
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* فوتر اقدام نهایی سکشن */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white border border-[var(--border-neutral-base)]">
          <div className="text-right">
            <h4 className="text-sm font-bold text-[var(--text-neutral-strong)]">
              کاتالوگ شما در قالب این پشتهٔ ۴ لایه پیاده‌سازی می‌شود
            </h4>
            <p className="text-xs text-[var(--text-neutral-subtle)] mt-0.5">
              برای دریافت نمونهٔ پیش‌نمایش کاتالوگ با محصولات شرکت خودتان، فایل فعلی را ارسال کنید.
            </p>
          </div>
          <Button
            color="primary"
            variant="solid"
            size="md"
            iconAfter={<IconArrowLeft size={18} stroke={2} />}
          >
            درخواست دمو و تبدیل کاتالوگ
          </Button>
        </div>

      </div>
    </section>
  );
}
