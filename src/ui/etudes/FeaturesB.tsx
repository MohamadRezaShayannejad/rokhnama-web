'use client';

import { useState } from 'react';
import {
  IconFocus2,
  IconRotate360,
  IconQrcode,
  IconDatabaseSearch,
  IconArrowLeft,
  IconPlus,
  IconCheck,
  IconCopy,
  IconWifi,
  IconWifiOff,
  IconPlayerPlay,
  IconPlayerPause,
  IconFilter,
  IconSearch,
  IconRuler2,
  IconExternalLink,
} from '@tabler/icons-react';
import { Button } from '@/ui/Button';

/* ۴ قابلیت محوری سند IA برای دایرکتوری لایه‌ای */
interface DirectoryFeature {
  id: 'hotspot' | 'media' | 'pwa' | 'archive';
  code: string;
  num: string;
  title: string;
  subTitle: string;
  desc: string;
  techSpec: string;
  icon: typeof IconFocus2;
}

const DIRECTORY_FEATURES: DirectoryFeature[] = [
  {
    id: 'hotspot',
    code: 'LYR-01-POPUP',
    num: '۰۱',
    title: 'معماری فشرده و پاپ‌آپ (Hotspot)',
    subTitle: 'نمایش مشخصات بدون شلوغی صفحه',
    desc: 'جدول ابعاد، مشخصات فنی و متریال با لمس مستقیم روی قطعه باز می‌شوند؛ صفحهٔ اصلی همیشه خلوت و خوانا باقی می‌ماند.',
    techSpec: 'پاپ‌آپ مدال لنگردار · ۳ نقطه تعاملی · پشتیبانی نقشه فنی',
    icon: IconFocus2,
  },
  {
    id: 'media',
    code: 'LYR-02-MEDIA',
    num: '۰۲',
    title: 'رسانهٔ غنی و مدل سه‌بعدی ۳۶۰°',
    subTitle: 'بررسی چندرسانه‌ای قطعات',
    desc: 'ویدیوی خط تولید، تست عملکرد در کارخانه و بررسی ۳۶۰ درجه مستقیم در صفحهٔ محصول، بدون نیاز به نصب نرم‌افزار.',
    techSpec: 'چرخش ۳۶۰ درجه وکتور · شبیه‌ساز تست لرزش · پخش ویدیو',
    icon: IconRotate360,
  },
  {
    id: 'pwa',
    code: 'LYR-03-OFFLINE',
    num: '۰۳',
    title: 'دسترسی پایدار آفلاین با PWA و QR',
    subTitle: 'کارکرد در سالن‌های بدون آنتن نمایشگاه',
    desc: 'یک لینک وب‌اپلیکیشن سبک؛ خریدار با اسکن QR استند، کاتالوگ را باز می‌کند و به کمک کش خودکار، بدون اینترنت مرور می‌کند.',
    techSpec: 'کش خودکار PWA · اسکنر QR نمایشگاهی · لود در ۰.۱۵ ثانیه',
    icon: IconQrcode,
  },
  {
    id: 'archive',
    code: 'LYR-04-ARCHIVE',
    num: '۰۴',
    title: 'آرشیو ساختاریافته و ارسال لینک اختصاصی',
    subTitle: 'فیلتر سریع کدها و تفکیک دسترسی',
    desc: 'دسته‌بندی و فیلتر دقیق کدهای فنی میان هزاران قلم کالا؛ با امکان ارسال لینک مجزا برای هر لاین کالا برای مشتری یا همکار خاص.',
    techSpec: 'فیلتر زنده کد فنی · تولید لینک همکار · تفکیک قیمت به‌روز',
    icon: IconDatabaseSearch,
  },
];

export default function FeaturesB() {
  const [activeTab, setActiveTab] = useState<'hotspot' | 'media' | 'pwa' | 'archive'>('hotspot');

  // استیت‌های لایه ۱: هات‌اسپات
  const [selectedValvePart, setSelectedValvePart] = useState<'body' | 'solenoid' | 'spool'>('body');

  // استیت‌های لایه ۲: رسانه ۳۶۰ درجه
  const [angle360, setAngle360] = useState(60);
  const [isPlayingTest, setIsPlayingTest] = useState(false);

  // استیت‌های لایه ۳: PWA و QR
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(false);

  // استیت‌های لایه ۴: آرشیو و جستجو
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const [copiedLink, setCopiedLink] = useState(false);

  const activeFeature = DIRECTORY_FEATURES.find((f) => f.id === activeTab)!;

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('https://rokhnama.ir/catalog/hyd-valves?partner=true');
    }
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section className="relative w-full bg-[var(--bg-neutral-base)] py-16 md:py-24 border-b border-[var(--border-neutral-base)] text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* سربرگ بخش ۰۲ با نشانه‌گذاری دایرکتوری */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b-2 border-[var(--color-primary-600)] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-primary-subtle)] border border-[var(--border-primary-soft)] text-xs font-bold text-[var(--color-primary-700)] mb-3">
              <span className="w-1.5 h-1.5 bg-[var(--color-secondary-500)] inline-block" />
              <span>سکشن ۰۲ · دایرکتوری ساختاریافته و پیش‌نمایش لایه‌ها</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-neutral-strong)] tracking-tight">
              کاتالوگ تعاملی چه شکلی است؟
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[var(--text-neutral-base)] max-w-2xl font-normal leading-relaxed">
              دایرکتوری چهار قابلیت اساسی رُخ‌نما؛ برای مشاهدهٔ پیش‌نمایش خطی و رفتار هر قابلیت روی گوشی یا دسکتاپ خریدار، لایه‌ها را انتخاب کنید.
            </p>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 bg-white border border-[var(--border-neutral-base)] text-xs text-[var(--text-neutral-subtle)] font-mono self-start md:self-auto">
            <span className="w-2 h-2 bg-[var(--color-success-600)]" />
            <span>DIR-INDEX: ۰۴ لایه فعال</span>
          </div>
        </div>

        {/* چیدمان دوتکه: دایرکتوری لایه‌ها (راست) + میزکار آزمون زنده (چپ) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ستون راست: ایندکس دایرکتوری ۴ قابلیت (۵ ستون از ۱۲ ستون دسکتاپ) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="border border-[var(--border-neutral-base)] bg-white p-3 mb-2 flex items-center justify-between text-xs font-bold text-[var(--text-neutral-subtle)]">
              <span>فهرست ساختاریافتهٔ قابلیت‌ها</span>
              <span>۴ شاخص کلیدی</span>
            </div>

            {DIRECTORY_FEATURES.map((feature) => {
              const isActive = activeTab === feature.id;
              const Icon = feature.icon;
              return (
                <div
                  key={`dir-${feature.id}`}
                  onClick={() => setActiveTab(feature.id)}
                  className={`text-right p-5 border-2 transition-all cursor-pointer relative ${
                    isActive
                      ? 'border-[var(--color-primary-600)] bg-white shadow-md'
                      : 'border-[var(--border-neutral-base)] bg-[var(--bg-neutral-surface)] hover:border-[var(--border-neutral-strong)] hover:bg-white'
                  }`}
                >
                  {/* خط نشانگر لبهٔ فعال */}
                  {isActive && (
                    <span className="absolute top-0 bottom-0 right-0 w-1.5 bg-[var(--color-secondary-500)]" />
                  )}

                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[var(--color-primary-600)]">
                      {feature.code} · {feature.num}
                    </span>
                    <div
                      className={`p-1.5 border ${
                        isActive
                          ? 'border-[var(--color-primary-600)] bg-[var(--bg-primary-subtle)] text-[var(--color-primary-700)]'
                          : 'border-[var(--border-neutral-base)] bg-white text-[var(--text-neutral-base)]'
                      }`}
                    >
                      <Icon size={18} stroke={1.5} />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[var(--text-neutral-strong)] mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-[var(--text-neutral-base)] leading-relaxed mb-3">
                    {feature.desc}
                  </p>

                  <div className="flex items-center justify-between pt-2.5 border-t border-[var(--border-neutral-subtle)] text-[11px]">
                    <span className="font-mono text-[var(--text-neutral-subtle)]">
                      {feature.techSpec}
                    </span>
                    <span
                      className={`font-bold transition-colors ${
                        isActive ? 'text-[var(--color-secondary-700)]' : 'text-[var(--text-neutral-subtle)]'
                      }`}
                    >
                      {isActive ? 'در حال نمایش ←' : 'مشاهده پیش‌نمایش'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ستون چپ: میزکار پیش‌نمایش خطی هیرلاین (۷ ستون از ۱۲ ستون دسکتاپ) */}
          <div className="lg:col-span-7 border-2 border-[var(--border-neutral-base)] bg-white p-5 sm:p-7 relative shadow-sm min-h-[560px] flex flex-col justify-between">

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

            {/* نوار بالایی میزکار */}
            <div className="flex items-center justify-between border-b border-[var(--border-neutral-base)] pb-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-[var(--bg-primary-subtle)] border border-[var(--border-primary-soft)] text-[var(--color-primary-700)]">
                  {activeFeature.code}
                </span>
                <span className="text-xs font-bold text-[var(--text-neutral-strong)]">
                  {activeFeature.subTitle}
                </span>
              </div>
              <div className="text-[11px] text-[var(--text-neutral-subtle)] font-mono">
                HAIRLINE-STROKE: ۱.۲۵px
              </div>
            </div>

            {/* بدنه محتوای تعاملی متناسب با لایه فعال */}
            <div className="flex-1 flex flex-col justify-center">

              {/* === ۱. لایه معماری فشرده و پاپ‌آپ (Hotspot) === */}
              {activeTab === 'hotspot' && (
                <div className="space-y-6">
                  {/* دیاگرام هیرلاین شیر هیدرولیک با هات‌اسپات‌ها */}
                  <div className="relative border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] p-4">
                    <svg className="w-full h-56 select-none" viewBox="0 0 600 240" fill="none">
                      <defs>
                        <pattern
                          id="featuresB-hatch-45"
                          width="8"
                          height="8"
                          patternTransform="rotate(45 0 0)"
                          patternUnits="userSpaceOnUse"
                        >
                          <line x1="0" y1="0" x2="0" y2="8" stroke="var(--color-primary-200)" strokeWidth="1" />
                        </pattern>
                      </defs>

                      {/* شاسی شیر هیدرولیک */}
                      <rect x="120" y="60" width="360" height="120" stroke="var(--color-primary-700)" strokeWidth="1.5" fill="#ffffff" />

                      {/* پورت‌های بالایی A و B */}
                      <rect x="200" y="20" width="50" height="40" stroke="var(--color-primary-700)" strokeWidth="1.25" fill="url(#featuresB-hatch-45)" />
                      <rect x="350" y="20" width="50" height="40" stroke="var(--color-primary-700)" strokeWidth="1.25" fill="url(#featuresB-hatch-45)" />
                      <text x="225" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="var(--color-primary-800)" fontFamily="var(--font-sans)">پورت A</text>
                      <text x="375" y="45" textAnchor="middle" fontSize="12" fontWeight="bold" fill="var(--color-primary-800)" fontFamily="var(--font-sans)">پورت B</text>

                      {/* سلونوئید تحریک مغناطیسی در دو طرف */}
                      <rect x="40" y="80" width="80" height="80" stroke="var(--color-primary-700)" strokeWidth="1.25" fill="#ffffff" />
                      <rect x="480" y="80" width="80" height="80" stroke="var(--color-primary-700)" strokeWidth="1.25" fill="#ffffff" />
                      <line x1="60" y1="80" x2="60" y2="160" stroke="var(--color-primary-300)" strokeWidth="1" />
                      <line x1="100" y1="80" x2="100" y2="160" stroke="var(--color-primary-300)" strokeWidth="1" />
                      <line x1="500" y1="80" x2="500" y2="160" stroke="var(--color-primary-300)" strokeWidth="1" />
                      <line x1="540" y1="80" x2="540" y2="160" stroke="var(--color-primary-300)" strokeWidth="1" />

                      {/* خط اندازه عرض کل */}
                      <line x1="40" y1="205" x2="560" y2="205" stroke="var(--color-neutral-600)" strokeWidth="1" />
                      <line x1="40" y1="195" x2="40" y2="215" stroke="var(--color-neutral-700)" strokeWidth="1.5" />
                      <line x1="560" y1="195" x2="560" y2="215" stroke="var(--color-neutral-700)" strokeWidth="1.5" />
                      <rect x="250" y="195" width="100" height="20" fill="#ffffff" stroke="var(--border-neutral-base)" strokeWidth="1" />
                      <text x="300" y="210" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--text-neutral-strong)" fontFamily="var(--font-sans)">
                        ۴۸۰ میلی‌متر
                      </text>

                      {/* هات‌اسپات ۱: بدنه اصلی شیر */}
                      <circle cx="300" cy="120" r="12" stroke="var(--color-secondary-500)" strokeWidth="2" fill="#ffffff" />
                      <circle cx="300" cy="120" r="5" fill="var(--color-secondary-500)" />

                      {/* هات‌اسپات ۲: سلونوئید چپ */}
                      <circle cx="80" cy="120" r="12" stroke="var(--color-primary-600)" strokeWidth="2" fill="#ffffff" />
                      <circle cx="80" cy="120" r="5" fill="var(--color-primary-600)" />

                      {/* هات‌اسپات ۳: پورت فوقانی */}
                      <circle cx="225" cy="40" r="10" stroke="var(--color-success-600)" strokeWidth="2" fill="#ffffff" />
                      <circle cx="225" cy="40" r="4" fill="var(--color-success-600)" />
                    </svg>

                    {/* دکمه‌های مستقیم انتخاب قطعات برای کاربران تاچ/کلیک */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setSelectedValvePart('body')}
                        className={`px-3 py-1 text-xs font-bold border transition-colors ${
                          selectedValvePart === 'body'
                            ? 'bg-[var(--color-secondary-500)] text-[var(--color-secondary-950)] border-[var(--color-secondary-600)]'
                            : 'bg-white text-[var(--text-neutral-base)] border-[var(--border-neutral-base)]'
                        }`}
                      >
                        ۱. بدنه و اسپول شیر
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedValvePart('solenoid')}
                        className={`px-3 py-1 text-xs font-bold border transition-colors ${
                          selectedValvePart === 'solenoid'
                            ? 'bg-[var(--color-primary-600)] text-white border-[var(--color-primary-700)]'
                            : 'bg-white text-[var(--text-neutral-base)] border-[var(--border-neutral-base)]'
                        }`}
                      >
                        ۲. سلونوئید فرمان ۲۴ ولت
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedValvePart('spool')}
                        className={`px-3 py-1 text-xs font-bold border transition-colors ${
                          selectedValvePart === 'spool'
                            ? 'bg-[var(--color-success-600)] text-white border-[var(--color-success-700)]'
                            : 'bg-white text-[var(--text-neutral-base)] border-[var(--border-neutral-base)]'
                        }`}
                      >
                        ۳. پورت‌های خروجی فشار
                      </button>
                    </div>
                  </div>

                  {/* پاپ‌آپ بازشده مستقیم از قطعه انتخابی */}
                  <div className="border-2 border-[var(--border-neutral-base)] bg-[var(--bg-primary-subtle)] p-4">
                    <div className="flex justify-between items-center pb-2 mb-2 border-b border-[var(--border-primary-soft)] text-xs font-bold">
                      <span className="text-[var(--color-primary-800)]">
                        {selectedValvePart === 'body' && 'مشخصات بدنه و اسپول مرکزی شیر هیدرولیک'}
                        {selectedValvePart === 'solenoid' && 'مشخصات بوبین و محرک الکترومغناطیسی'}
                        {selectedValvePart === 'spool' && 'مشخصات پورت‌های ورودی و خروجی استاندارد'}
                      </span>
                      <span className="text-[10px] font-mono bg-white px-2 py-0.5 border border-[var(--border-neutral-base)]">
                        کد: VLV-480-H
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="bg-white p-2 border border-[var(--border-neutral-base)]">
                        <span className="text-[10px] text-[var(--text-neutral-subtle)] block">حداکثر فشار:</span>
                        <span className="font-bold text-[var(--text-neutral-strong)]">۳۱۵ بار</span>
                      </div>
                      <div className="bg-white p-2 border border-[var(--border-neutral-base)]">
                        <span className="text-[10px] text-[var(--text-neutral-subtle)] block">دبی جریان:</span>
                        <span className="font-bold text-[var(--text-neutral-strong)]">۸۰ لیتر/دقیقه</span>
                      </div>
                      <div className="bg-white p-2 border border-[var(--border-neutral-base)]">
                        <span className="text-[10px] text-[var(--text-neutral-subtle)] block">ولتاژ بوبین:</span>
                        <span className="font-bold text-[var(--text-neutral-strong)]">۲۴ ولت DC</span>
                      </div>
                      <div className="bg-white p-2 border border-[var(--border-neutral-base)]">
                        <span className="text-[10px] text-[var(--text-neutral-subtle)] block">تحمل حرارت:</span>
                        <span className="font-bold text-[var(--text-neutral-strong)]">+۸۰ درجه</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* === ۲. لایه رسانه غنی و مدل سه‌بعدی ۳۶۰ درجه === */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  {/* بوم چرخش ۳۶۰ درجه هیرلاین */}
                  <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] p-5 relative">
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-bold text-[var(--text-neutral-strong)]">مدل خطی شفت و روتور هیدرولیک</span>
                      <span className="font-mono text-[var(--color-primary-700)] font-bold">
                        زاویه: {angle360}°
                      </span>
                    </div>

                    {/* گرافیک هیرلاین چرخشی بر اساس زاویه */}
                    <div className="h-44 flex items-center justify-center">
                      <svg className="w-56 h-36 select-none" viewBox="0 0 200 140" fill="none">
                        <defs>
                          <pattern
                            id="featuresB-media-hatch"
                            width="6"
                            height="6"
                            patternTransform="rotate(45 0 0)"
                            patternUnits="userSpaceOnUse"
                          >
                            <line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-primary-300)" strokeWidth="1" />
                          </pattern>
                        </defs>

                        {/* سیلندر چرخان با تغییر بیضی بر حسب زاویه */}
                        <g transform={`rotate(${angle360 * 0.4} 100 70)`}>
                          <rect x="50" y="45" width="100" height="50" stroke="var(--color-primary-700)" strokeWidth="1.5" fill="#ffffff" />
                          <line x1="75" y1="45" x2="75" y2="95" stroke="var(--color-primary-300)" strokeWidth="1" />
                          <line x1="125" y1="45" x2="125" y2="95" stroke="var(--color-primary-300)" strokeWidth="1" />
                          <ellipse cx="100" cy="70" rx={35 + Math.sin((angle360 * Math.PI) / 180) * 8} ry="22" stroke="var(--color-secondary-500)" strokeWidth="1.5" fill="none" />
                          <circle cx="100" cy="70" r="8" stroke="var(--color-primary-700)" strokeWidth="1.25" fill="url(#featuresB-media-hatch)" />
                        </g>

                        {/* خطوط راهنمای افقی و قائم */}
                        <line x1="20" y1="70" x2="180" y2="70" stroke="var(--color-neutral-300)" strokeWidth="1" strokeDasharray="3 3" />
                        <line x1="100" y1="15" x2="100" y2="125" stroke="var(--color-neutral-300)" strokeWidth="1" strokeDasharray="3 3" />
                      </svg>
                    </div>

                    {/* اسلایدر زاویه چرخش */}
                    <div className="mt-2 space-y-1">
                      <input
                        type="range"
                        min="0"
                        max="360"
                        step="10"
                        value={angle360}
                        onChange={(e) => setAngle360(Number(e.target.value))}
                        className="w-full accent-[var(--color-primary-600)] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-[var(--text-neutral-subtle)] font-mono">
                        <span>۰°</span>
                        <span>۹۰°</span>
                        <span>۱۸۰°</span>
                        <span>۲۷۰°</span>
                        <span>۳۶۰°</span>
                      </div>
                    </div>
                  </div>

                  {/* نوار کنترل‌های رسانه‌ای */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => setIsPlayingTest(!isPlayingTest)}
                      className={`flex items-center justify-center gap-2 p-3 border font-bold transition-colors ${
                        isPlayingTest
                          ? 'bg-[var(--color-warning-50)] border-[var(--color-warning-600)] text-[var(--color-warning-800)]'
                          : 'bg-white border-[var(--border-neutral-base)] text-[var(--text-neutral-strong)] hover:bg-[var(--bg-neutral-subtle)]'
                      }`}
                    >
                      {isPlayingTest ? <IconPlayerPause size={16} stroke={1.5} /> : <IconPlayerPlay size={16} stroke={1.5} />}
                      <span>{isPlayingTest ? 'توقف تست ارتعاش' : 'پخش تست ارتعاش در کارخانه'}</span>
                    </button>

                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 p-3 border border-[var(--border-neutral-base)] bg-white text-[var(--text-neutral-strong)] font-bold hover:bg-[var(--bg-primary-subtle)]"
                    >
                      <IconRotate360 size={16} stroke={1.5} />
                      <span>ویدیوی معرفی ۳۶۰ درجه</span>
                    </button>
                  </div>
                </div>
              )}

              {/* === ۳. لایه دسترسی پایدار آفلاین با PWA و QR === */}
              {activeTab === 'pwa' && (
                <div className="space-y-6">
                  {/* شبیه‌ساز ماکت گوشی و کیوسک نمایشگاهی */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* کارت بارکد QR غرفه */}
                    <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-base)] p-4 flex flex-col items-center justify-center text-center">
                      <div className="bg-white p-2 border border-[var(--border-neutral-base)] shadow-sm mb-3">
                        <IconQrcode size={88} stroke={1.5} className="text-[var(--color-primary-900)]" />
                      </div>
                      <span className="text-xs font-bold text-[var(--text-neutral-strong)]">
                        استند نمایشگاهی شماره ۴۲
                      </span>
                      <span className="text-[11px] text-[var(--text-neutral-subtle)] mt-0.5">
                        اسکن با دوربین گوشی بدون نیاز به نصب اپ
                      </span>
                    </div>

                    {/* کارت شبیه‌ساز موبایل و تست آفلاین */}
                    <div className="border border-[var(--border-neutral-base)] bg-white p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-2 mb-3 border-b border-[var(--border-neutral-subtle)]">
                          <span className="text-xs font-bold text-[var(--text-neutral-strong)]">وضعیت اتصال:</span>
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 ${
                              isSimulatedOffline
                                ? 'bg-[var(--color-warning-100)] text-[var(--color-warning-800)] border border-[var(--color-warning-300)]'
                                : 'bg-[var(--color-success-100)] text-[var(--color-success-800)] border border-[var(--color-success-300)]'
                            }`}
                          >
                            {isSimulatedOffline ? <IconWifiOff size={12} stroke={2} /> : <IconWifi size={12} stroke={2} />}
                            {isSimulatedOffline ? 'قطع اینترنت سالن' : 'آنلاین (سرور داخلی)'}
                          </span>
                        </div>

                        <p className="text-xs text-[var(--text-neutral-base)] leading-relaxed">
                          {isSimulatedOffline
                            ? 'کش آفلاین فعال است: کاتالوگ با ۶۴ قلم کالا و جداول ابعاد، بدون افت سرعت و در ۰.۱۵ ثانیه از حافظه مرورگر خوانده می‌شود.'
                            : 'کاتالوگ همگام با آخرین قیمت‌هاست و با قطع ارتباط نیز همه صفحات و مشخصات فنی باز می‌مانند.'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsSimulatedOffline(!isSimulatedOffline)}
                        className={`w-full py-2.5 text-xs font-bold border transition-colors mt-4 flex items-center justify-center gap-2 ${
                          isSimulatedOffline
                            ? 'bg-[var(--color-primary-600)] text-white border-[var(--color-primary-600)]'
                            : 'bg-white text-[var(--color-warning-700)] border-[var(--color-warning-600)] hover:bg-[var(--color-warning-50)]'
                        }`}
                      >
                        {isSimulatedOffline ? 'اتصال مجدد به شبکه' : 'تست قطع اینترنت سالن نمایشگاه'}
                      </button>
                    </div>
                  </div>

                  {/* نوار تضمین سرعت */}
                  <div className="p-3 bg-[var(--bg-neutral-subtle)] border border-[var(--border-neutral-base)] flex items-center justify-between text-xs">
                    <span className="text-[var(--text-neutral-subtle)]">حجم دانلود اولیه کاتالوگ:</span>
                    <span className="font-mono font-bold text-[var(--color-primary-700)]">کمتر از ۱.۲ مگابایت</span>
                    <span className="text-[var(--text-neutral-subtle)]">زمان باز شدن:</span>
                    <span className="font-mono font-bold text-[var(--color-success-700)]">۰.۱۵ ثانیه</span>
                  </div>
                </div>
              )}

              {/* === ۴. لایه آرشیو ساختاریافته و ارسال لینک اختصاصی === */}
              {activeTab === 'archive' && (
                <div className="space-y-5">
                  {/* فیلتر و جستجوی کدهای فنی */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="جست‌وجوی کد کالا (مثلاً PX-3000، ولو، هیدرولیک)..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full h-10 px-3 ps-9 border border-[var(--border-neutral-base)] text-xs text-[var(--text-neutral-strong)] focus:outline-none focus:border-[var(--color-primary-600)]"
                        />
                        <span className="absolute start-3 top-3 text-[var(--text-neutral-subtle)]">
                          <IconSearch size={15} stroke={1.5} />
                        </span>
                      </div>
                    </div>

                    {/* چیپ‌های دسته‌بندی */}
                    <div className="flex flex-wrap gap-1.5 text-xs">
                      {['همه', 'پمپ‌های فشار قوی', 'شیرآلات هیدرولیک', 'الکتروموتور صنعتی'].map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-2.5 py-1 text-xs border transition-colors ${
                            selectedCategory === cat
                              ? 'bg-[var(--color-primary-600)] text-white border-[var(--color-primary-600)] font-bold'
                              : 'bg-white text-[var(--text-neutral-base)] border-[var(--border-neutral-base)] hover:bg-[var(--bg-neutral-subtle)]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* نمونه کارت‌های آرشیو یافته */}
                  <div className="border border-[var(--border-neutral-base)] divide-y divide-[var(--border-neutral-subtle)] bg-white text-xs">
                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[var(--text-neutral-strong)] block">
                          پمپ پیستونی فشار قوی PX-3000
                        </span>
                        <span className="text-[11px] text-[var(--text-neutral-subtle)] font-mono">
                          کد: HYD-PX3000 · ۴۰۰ بار · ۱۲۰ لیتر/دقیقه
                        </span>
                      </div>
                      <span className="px-2 py-0.5 bg-[var(--bg-primary-subtle)] text-[var(--color-primary-700)] font-bold border border-[var(--border-primary-soft)]">
                        قیمت به‌روز انبار
                      </span>
                    </div>

                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-[var(--text-neutral-strong)] block">
                          شیر برقی هیدرولیک مدولار VLV-480
                        </span>
                        <span className="text-[11px] text-[var(--text-neutral-subtle)] font-mono">
                          کد: HYD-VLV480 · ۳۱۵ بار · ۲۴ ولت
                        </span>
                      </div>
                      <span className="px-2 py-0.5 bg-[var(--bg-primary-subtle)] text-[var(--color-primary-700)] font-bold border border-[var(--border-primary-soft)]">
                        قیمت همکاری
                      </span>
                    </div>
                  </div>

                  {/* جعبه تولید و کپی لینک اختصاصی برای خریدار یا همکار */}
                  <div className="border border-[var(--border-primary-soft)] bg-[var(--bg-primary-subtle)] p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-[var(--color-primary-800)]">
                        لینک اختصاصی لاین هیدرولیک برای همکاران:
                      </span>
                      <span className="text-[10px] text-[var(--color-primary-700)] font-mono">
                        SHARE-CODE: HYD-PARTNER
                      </span>
                    </div>

                    <div className="flex items-center border border-[var(--border-neutral-base)] bg-white p-1">
                      <span className="text-xs font-mono text-[var(--text-neutral-base)] truncate flex-1 px-2 text-left" dir="ltr">
                        rokhnama.ir/catalog/hyd-valves?partner=true
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-white transition-colors"
                      >
                        {copiedLink ? (
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
                  </div>
                </div>
              )}
            </div>

            {/* نوار وضعیت پایینی میزکار */}
            <div className="mt-6 pt-3 border-t border-[var(--border-neutral-subtle)] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[var(--text-neutral-subtle)]">
              <span>طراحی وکتور با خطوط ۱px مونو‌لاین و هندسه تیز</span>
              <span className="font-mono text-[var(--color-primary-600)]">STATUS: READY · 0 ERRORS</span>
            </div>
          </div>
        </div>

        {/* فوتر اقدام و لینک به دریافت مشاوره */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white border border-[var(--border-neutral-base)]">
          <div className="text-right">
            <h4 className="text-sm font-bold text-[var(--text-neutral-strong)]">
              آرشیو محصولات شرکت شما هم می‌تواند به این سرعت دسته‌بندی شود
            </h4>
            <p className="text-xs text-[var(--text-neutral-subtle)] mt-0.5">
              فایل‌های کاتالوگ یا اکسل‌های موجود را برای ما ارسال کنید تا ساختار لایه‌ای آن پیاده‌سازی شود.
            </p>
          </div>
          <Button
            color="primary"
            variant="solid"
            size="md"
            iconAfter={<IconArrowLeft size={18} stroke={2} />}
          >
            درخواست دمو و مشاوره اولیه
          </Button>
        </div>

      </div>
    </section>
  );
}
