'use client';

import React, { useState } from 'react';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';
import {
  IconArrowLeft,
  IconArrowRight,
  IconBrandTelegram,
  IconBuildingSkyscraper,
  IconCheck,
  IconChevronRight,
  IconCircleCheck,
  IconClipboardCheck,
  IconClock,
  IconCopy,
  IconFileAnalytics,
  IconFileCheck,
  IconFileText,
  IconInfoCircle,
  IconLink,
  IconLock,
  IconMapPin,
  IconPhone,
  IconSend,
  IconShieldCheck,
  IconSparkles,
  IconUpload,
  IconUser,
} from '@tabler/icons-react';

const FLOORS_DATA = [
  {
    code: 'FL ۰۷',
    rawCode: 'FL 07',
    label: 'R&D',
    title: 'مرکز پژوهش و توسعهٔ زیرساخت',
    desc: 'تحقیقات معماری نرم‌افزار، مقیاس‌پذیری و استانداردهای کاتالوگ تعاملی.',
    isUs: false,
  },
  {
    code: 'FL ۰۶',
    rawCode: 'FL 06',
    label: 'ما اینجا هستیم ★',
    title: 'استقرار تیم رُخ‌نما و شتاب‌دهی محصول',
    desc: 'دفتر مهندسی هستهٔ پلتفرم، معماری تعاملات بصری و استخراج دیتای کاتالوگ‌ها.',
    isUs: true,
  },
  {
    code: 'FL ۰۵',
    rawCode: 'FL 05',
    label: 'TECH',
    title: 'آزمایشگاه توسعهٔ وب و فناوری ابری',
    desc: 'توسعهٔ سیستم‌های بدون اینترنت PWA و یکپارچه‌سازی با انبارداری.',
    isUs: false,
  },
  {
    code: 'FL ۰۴',
    rawCode: 'FL 04',
    label: 'LAB',
    title: 'آزمایشگاه سنجش تجربهٔ کاربری B2B',
    desc: 'تحلیل رفتار خرید، نقاط توقف در کاتالوگ و ارزیابی مسیرهای سفارش.',
    isUs: false,
  },
  {
    code: 'FL ۰۳',
    rawCode: 'FL 03',
    label: 'MCI',
    title: 'مرکز تحقیق و نوآوری همراه اول',
    desc: 'پشتیبانی زیرساخت ارتباطی، شبکه‌های پایدار داده و راهکارهای ملی.',
    isUs: false,
  },
  {
    code: 'FL ۰۲',
    rawCode: 'FL 02',
    label: 'دیوار',
    title: 'دفتر فنی و مهندسی پلتفرم دیوار',
    desc: 'همسایگان اکوسیستم فناوری در برج پژوهش دانشگاه شهید بهشتی.',
    isUs: false,
  },
  {
    code: 'FL ۰۱',
    rawCode: 'FL 01',
    label: 'LOBBY',
    title: 'پذیرش و سالن معرفی دستاوردهای فناوری',
    desc: 'ورودی و پذیرش مراجعان رسمی و جلسات تجاری هماهنگ‌شده.',
    isUs: false,
  },
];

const SECTORS = [
  { id: 'tech-parts', name: 'قطعات فنی و ابزارآلات صنعتی', code: 'SEC-۰۱' },
  { id: 'apparel', name: 'بنکداری، نساجی و عمده‌فروشی', code: 'SEC-۰۲' },
  { id: 'capital', name: 'تجهیزات پزشکی و خطوط تولید', code: 'SEC-۰۳' },
  { id: 'expo', name: 'صادرات و شرکت‌های نمایشگاهی', code: 'SEC-۰۴' },
];

export default function DemoC() {
  // مرحله‌های فرم پیپ‌لاین (۱: انتخاب فایل و حوزه، ۲: اطلاعات متقاضی، ۳: پیش‌نمایش دمو و صدور رسید)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // داده‌های مرحله ۱
  const [selectedSector, setSelectedSector] = useState(SECTORS[0].id);
  const [fileName, setFileName] = useState('کاتالوگ_محصولات_۱۴۰۳.pdf');
  const [catalogUrl, setCatalogUrl] = useState('');
  const [mode, setMode] = useState<'file' | 'link'>('file');

  // داده‌های مرحله ۲
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userRole, setUserRole] = useState<'manager' | 'sales'>('manager');

  // استیت‌های لودینگ و ثبت
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // استیت طبقه انتخاب‌شده در بلوپرینت
  const [activeFloorCode, setActiveFloorCode] = useState('FL 06');
  const activeFloor = FLOORS_DATA.find((f) => f.rawCode === activeFloorCode) || FLOORS_DATA[1];

  const handleCopyAddress = () => {
    navigator.clipboard?.writeText('تهران، ولنجک، دانشگاه شهید بهشتی، برج فناوری، طبقهٔ ششم');
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2200);
  };

  const handleStep1Next = () => {
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userPhone.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 900);
  };

  return (
    <section dir="rtl" className="w-full bg-[var(--bg-neutral-base)] text-[var(--color-neutral-900)] py-16 px-4 md:px-8 lg:px-14 border-b border-[var(--color-neutral-300)]">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* ===================== بخش ۱۰: استقرار فیزیکی و بلوپرینت تعاملی معماری ===================== */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[var(--color-neutral-300)] pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--color-primary-600)] mb-1">
                <span className="w-2 h-2 bg-[var(--color-primary-600)]"></span>
                <span>بخش ۱۰ · دیاگرام معمارانه و پشتوانهٔ سازمانی</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-[var(--color-neutral-900)]">
                پشتیبانی، استقرار سازمانی و مرکز نوآوری
              </h2>
            </div>
            <div className="text-xs font-mono text-[var(--color-neutral-500)] flex items-center gap-2">
              <span>LOCATION: TEHRAN / SBU TECH TOWER</span>
              <span className="w-1.5 h-1.5 bg-[var(--color-success-600)]"></span>
            </div>
          </div>

          {/* کارت بلوپرینت معماری ۳ ستونه با خطوط فنی هیرلاین */}
          <div className="border-2 border-[var(--color-neutral-300)] bg-[var(--color-neutral-100)] p-6 relative">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

              {/* ستون ۱: دیاگرام ارتفاعی طبقات ELEVATION · FLOOR 06 */}
              <div className="lg:col-span-4 bg-white border border-[var(--color-neutral-300)] p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--color-neutral-500)] border-b border-[var(--color-neutral-200)] pb-2 mb-2">
                    <span className="font-bold text-[var(--color-neutral-800)]">ELEVATION · FLOOR ۰۶</span>
                    <span>۷ طبقهٔ فناوری</span>
                  </div>

                  <div className="space-y-1 font-mono text-xs">
                    {FLOORS_DATA.map((fl) => {
                      const isTarget = fl.rawCode === activeFloorCode;
                      const isOurFloor = fl.isUs;
                      return (
                        <button
                          key={fl.rawCode}
                          type="button"
                          onClick={() => setActiveFloorCode(fl.rawCode)}
                          className={`w-full text-start flex items-center justify-between px-2.5 py-1.5 border transition-all rounded-none ${
                            isOurFloor
                              ? 'bg-[var(--color-secondary-400)] text-[var(--color-secondary-950)] font-black border-[var(--color-secondary-600)]'
                              : isTarget
                              ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-800)] font-bold border-[var(--color-primary-400)]'
                              : 'text-[var(--color-neutral-700)] border-dashed border-[var(--color-neutral-200)] hover:bg-[var(--color-neutral-50)]'
                          }`}
                        >
                          <span className="font-bold">{fl.code}</span>
                          <span className="text-[11px] font-sans font-medium">{fl.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--color-neutral-200)] text-xs text-[var(--color-neutral-600)] space-y-1">
                  <div className="font-bold text-[var(--color-primary-700)]">{activeFloor.title}</div>
                  <div className="text-[11px] text-[var(--color-neutral-500)] leading-tight">{activeFloor.desc}</div>
                </div>
              </div>

              {/* ستون ۲: آدرس فیزیکی تیم مهندسی با امکان کپی */}
              <div className="lg:col-span-4 bg-white border border-[var(--color-neutral-300)] p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-neutral-500)]">
                    <IconMapPin size={16} className="text-[var(--color-primary-600)]" />
                    <span>تیم مهندسی مستقر در:</span>
                  </div>

                  <div className="space-y-1 pt-1">
                    <div className="text-xl font-black text-[var(--color-neutral-900)]">تهران، ولنجک</div>
                    <div className="text-base font-bold text-[var(--color-neutral-700)]">دانشگاه شهید بهشتی</div>
                    <div className="text-lg font-black text-[var(--color-primary-700)]">برج فناوری · طبقهٔ ششم</div>
                  </div>

                  <p className="text-xs text-[var(--color-neutral-600)] leading-relaxed">
                    استقرار متمرکز معماران پلتفرم در دانشگاه؛ امکان حضور و بررسی نمونه کاتالوگ با هماهنگی اولیه تیم مهندسی.
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--color-neutral-200)] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary-700)] hover:text-[var(--color-primary-800)]"
                  >
                    {copiedAddress ? (
                      <>
                        <IconCheck size={14} className="text-[var(--color-success-600)]" />
                        <span>نشانی کپی شد</span>
                      </>
                    ) : (
                      <>
                        <IconCopy size={14} />
                        <span>کپی نشانی رسمی جلسات</span>
                      </>
                    )}
                  </button>
                  <span className="text-[11px] font-mono text-[var(--color-neutral-400)]">ZONE-۰۱</span>
                </div>
              </div>

              {/* ستون ۳: حامی و شعار هویتی همراه اول */}
              <div className="lg:col-span-4 bg-white border border-[var(--color-neutral-300)] p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-neutral-500)]">
                    <IconBuildingSkyscraper size={16} className="text-[var(--color-secondary-600)]" />
                    <span>تحت حمایت و همکاری:</span>
                  </div>

                  <div className="text-base font-black text-[var(--color-primary-800)] leading-tight">
                    مرکز تحقیق و نوآوری همراه اول (MCI)
                  </div>

                  <div className="bg-[var(--color-secondary-50)] border-s-4 border-[var(--color-secondary-500)] p-3 text-xs text-[var(--color-neutral-900)] font-bold leading-relaxed">
                    «داخل همان اکوسیستمی کار می‌کنیم که برایش محصول می‌سازیم.»
                  </div>

                  <p className="text-xs text-[var(--color-neutral-600)] leading-relaxed">
                    ارتباط مستقیم با مهندسان، بدون واسطه و با آماده‌سازی سریع نمونهٔ آزمایشی.
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--color-neutral-200)] flex items-center justify-between text-xs text-[var(--color-neutral-500)] font-mono">
                  <span>پایداری سرور: ۹۹.۹۵٪</span>
                  <span className="font-sans text-[var(--color-success-600)] font-bold">زیرساخت ابری ملی</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ===================== بخش ۱۱: مسیر سریع ۳ مرحله‌ای ارسال PDF و پیش‌نمایش درجا ===================== */}
        <div className="border-2 border-[var(--color-neutral-300)] bg-white p-6 md:p-10 space-y-8">

          {/* سربرگ پیام اصلی ارزش پیشنهادی */}
          <div className="space-y-3 border-b border-[var(--color-neutral-200)] pb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <span className="text-xs font-bold text-[var(--color-primary-600)] font-mono">
                بخش ۱۱ · مسیر ۳ مرحله‌ای آماده‌سازی کاتالوگ تعاملی
              </span>
              <span className="text-xs bg-[var(--color-secondary-50)] text-[var(--color-secondary-950)] border border-[var(--color-secondary-400)] px-2.5 py-1 font-bold">
                تحویل ۲۴ تا ۴۸ ساعته
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-[var(--color-neutral-900)]">
              کاتالوگ فعلی‌تان را بفرستید تا نسخه تعاملی آن با محصولات واقعی خودتان ظرف ۲۴ تا ۴۸ ساعت آماده شود.
            </h3>
            <p className="text-sm text-[var(--color-neutral-600)]">
              فایل‌های پراکنده، PDF یا اکسل فعلی را ارائه دهید؛ مهندسان داده‌ها را استخراج و ساختاربندی می‌کنند و کاتالوگ زنده تحویل می‌شود.
            </p>
          </div>

          {/* شاخص مراحل (Steps Progress Bar) */}
          <div className="grid grid-cols-3 border border-[var(--color-neutral-300)] text-xs font-bold">
            <div
              className={`p-3 text-center transition-colors ${
                step === 1
                  ? 'bg-[var(--color-primary-600)] text-white'
                  : 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)]'
              }`}
            >
              ۱. فایل کاتالوگ و حوزه
            </div>
            <div
              className={`p-3 text-center border-x border-[var(--color-neutral-300)] transition-colors ${
                step === 2
                  ? 'bg-[var(--color-primary-600)] text-white'
                  : 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)]'
              }`}
            >
              ۲. مشخصات نماینده سازمان
            </div>
            <div
              className={`p-3 text-center transition-colors ${
                step === 3
                  ? 'bg-[var(--color-primary-600)] text-white'
                  : 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)]'
              }`}
            >
              ۳. رسید پیگیری و تحویل دمو
            </div>
          </div>

          {/* محتوای مرحله ۱: انتخاب حوزه و بارگذاری فایل کاتالوگ */}
          {step === 1 && (
            <div className="space-y-6">

              {/* حوزه فعالیت */}
              <div className="space-y-2">
                <Label>۱. حوزه فعالیت و نوع کالاهای شرکت</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                  {SECTORS.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSector(s.id)}
                      className={`text-start p-3 border-2 transition-all rounded-none flex flex-col justify-between h-[82px] ${
                        selectedSector === s.id
                          ? 'border-[var(--color-primary-600)] bg-[var(--color-primary-50)] text-[var(--color-primary-800)]'
                          : 'border-[var(--color-neutral-200)] text-[var(--color-neutral-700)] hover:border-[var(--color-neutral-300)]'
                      }`}
                    >
                      <span className="text-[11px] font-mono font-bold text-[var(--color-neutral-500)]">{s.code}</span>
                      <span className="text-xs font-bold leading-snug">{s.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* فایل یا لینک */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>۲. فایل کاتالوگ قدیمی یا پیوند اینترنتی</Label>
                  <div className="flex gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setMode('file')}
                      className={`px-3 py-1 font-bold border ${
                        mode === 'file'
                          ? 'bg-[var(--color-primary-600)] text-white border-[var(--color-primary-600)]'
                          : 'bg-white text-[var(--color-neutral-600)] border-[var(--color-neutral-300)]'
                      }`}
                    >
                      فایل PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('link')}
                      className={`px-3 py-1 font-bold border ${
                        mode === 'link'
                          ? 'bg-[var(--color-primary-600)] text-white border-[var(--color-primary-600)]'
                          : 'bg-white text-[var(--color-neutral-600)] border-[var(--color-neutral-300)]'
                      }`}
                    >
                      پیوند وب‌سایت
                    </button>
                  </div>
                </div>

                {mode === 'file' ? (
                  <div className="border-2 border-dashed border-[var(--color-neutral-300)] hover:border-[var(--color-primary-600)] p-6 bg-[var(--color-neutral-50)] relative">
                    <input
                      type="file"
                      accept=".pdf,.zip"
                      onChange={(e) => setFileName(e.target.files?.[0]?.name || 'کاتالوگ_سفارشی.pdf')}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] flex items-center justify-center shrink-0">
                          <IconFileText size={22} stroke={2.2} />
                        </div>
                        <div className="text-start">
                          <div className="text-sm font-bold text-[var(--color-neutral-900)]">
                            {fileName}
                          </div>
                          <div className="text-xs text-[var(--color-neutral-500)]">
                            حجم فایل: ۱۸ مگابایت · تخمین آماده‌سازی دمو: ۲۴ ساعت
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[var(--color-primary-600)] underline">
                        تغییر فایل انتخابی
                      </span>
                    </div>
                  </div>
                ) : (
                  <Input
                    placeholder="https://example.com/products یا لینک درایو کاتالوگ"
                    value={catalogUrl}
                    onChange={(e) => setCatalogUrl(e.target.value)}
                    startIcon={<IconLink size={18} stroke={2.2} />}
                  />
                )}
              </div>

              {/* دکمه حرکت به مرحله ۲ */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="solid"
                  color="primary"
                  size="md"
                  onClick={handleStep1Next}
                  iconAfter={<IconArrowLeft size={18} stroke={2.2} />}
                >
                  مرحله بعد: مشخصات تماس و تحویل
                </Button>

                <Button
                  type="button"
                  variant="text"
                  color="secondary"
                  size="md"
                  onClick={() => window.open('https://t.me/shayanesfd', '_blank')}
                  iconBefore={<IconBrandTelegram size={18} stroke={2.2} />}
                >
                  یا ارسال مستقیم فایل کاتالوگ در تلگرام
                </Button>
              </div>

            </div>
          )}

          {/* محتوای مرحله ۲: مشخصات متقاضی و تأیید ثبت */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="demoC-name" required>نام و نام خانوادگی نماینده</Label>
                  <Input
                    id="demoC-name"
                    placeholder="مهندس علیرضا پارسا"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    startIcon={<IconUser size={18} stroke={2.2} />}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="demoC-phone" required>شماره تماس مستقیم</Label>
                  <Input
                    id="demoC-phone"
                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    startIcon={<IconPhone size={18} stroke={2.2} />}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>نقش شما در سازمان</Label>
                <div className="grid grid-cols-2 gap-3 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setUserRole('manager')}
                    className={`p-3 border-2 transition-all rounded-none text-start ${
                      userRole === 'manager'
                        ? 'border-[var(--color-primary-600)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)]'
                        : 'border-[var(--color-neutral-200)] text-[var(--color-neutral-700)]'
                    }`}
                  >
                    مدیر عامل / مدیر بازرگانی و فروش
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserRole('sales')}
                    className={`p-3 border-2 transition-all rounded-none text-start ${
                      userRole === 'sales'
                        ? 'border-[var(--color-primary-600)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)]'
                        : 'border-[var(--color-neutral-200)] text-[var(--color-neutral-700)]'
                    }`}
                  >
                    کارشناس ارشد فروش / سرپرست مارکتینگ
                  </button>
                </div>
              </div>

              {/* خلاصه پرونده انتخابی */}
              <div className="bg-[var(--color-neutral-50)] border border-[var(--color-neutral-200)] p-4 text-xs space-y-1">
                <div className="font-bold text-[var(--color-neutral-900)]">خلاصه پرونده دمو:</div>
                <div className="text-[var(--color-neutral-600)]">
                  حوزه: {SECTORS.find((s) => s.id === selectedSector)?.name} · فایل منبع: {fileName}
                </div>
              </div>

              {/* دکمه‌های ناوبری مرحله ۲ */}
              <div className="pt-2 flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  color="primary"
                  size="md"
                  onClick={() => setStep(1)}
                  iconBefore={<IconArrowRight size={18} stroke={2.2} />}
                >
                  بازگشت به انتخاب فایل
                </Button>

                <Button
                  type="submit"
                  variant="solid"
                  color="primary"
                  size="md"
                  loading={isProcessing}
                  iconBefore={<IconClipboardCheck size={18} stroke={2.2} />}
                >
                  تأیید و صدور نوبت ساخت دمو تعاملی
                </Button>
              </div>

            </form>
          )}

          {/* محتوای مرحله ۳: پیش‌نمایش فیش پیگیری و دمو */}
          {step === 3 && (
            <div className="space-y-6">

              <div className="bg-[var(--color-neutral-50)] border-2 border-[var(--color-primary-600)] p-6 space-y-5">

                {/* هدر رسید */}
                <div className="flex items-center justify-between border-b border-[var(--color-neutral-200)] pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[var(--color-primary-600)] text-white flex items-center justify-center">
                      <IconCheck size={20} stroke={2.2} />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-[var(--color-neutral-900)]">
                        رسید نوبت ساخت دمو تعاملی صادر شد
                      </h4>
                      <span className="text-xs text-[var(--color-neutral-500)] font-mono">
                        DOCKET ID: RK-۷۳۹۰ · زمان آماده‌سازی: ۲۴ تا ۴۸ ساعت
                      </span>
                    </div>
                  </div>
                  <span className="text-xs bg-[var(--color-success-50)] text-[var(--color-success-700)] border border-[var(--color-success-600)] px-2.5 py-1 font-bold">
                    در صف استخراج داده
                  </span>
                </div>

                {/* مشخصات نوبت */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-[var(--color-neutral-500)] block">نماینده متقاضی:</span>
                    <span className="font-bold text-[var(--color-neutral-900)]">{userName}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[var(--color-neutral-500)] block">شماره تماس مستقیم:</span>
                    <span className="font-bold font-mono text-[var(--color-neutral-900)]">{userPhone}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[var(--color-neutral-500)] block">حوزهٔ انتخابی:</span>
                    <span className="font-bold text-[var(--color-neutral-900)]">
                      {SECTORS.find((s) => s.id === selectedSector)?.name}
                    </span>
                  </div>
                </div>

                {/* اطلاعیه مراحل بعدی */}
                <div className="bg-white border border-[var(--color-neutral-200)] p-3.5 text-xs text-[var(--color-neutral-700)] leading-relaxed space-y-1">
                  <div className="font-bold text-[var(--color-primary-700)] flex items-center gap-1.5">
                    <IconInfoCircle size={15} />
                    اقدام تیم مهندسی رُخ‌نما:
                  </div>
                  <p>
                    کارشناسان فنی داده‌های محصولات را استخراج کرده، نقاط تعاملی (Hotspot) را روی کالاهای واقعی شرکت شما پیاده‌سازی نموده و لینک دمو را ظرف ۴۸ ساعت آینده برای شمارهٔ ثبت‌شده ارسال می‌کنند.
                  </p>
                </div>

              </div>

              {/* اکشن‌های پایان مرحله */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  color="primary"
                  size="md"
                  onClick={() => {
                    setStep(1);
                    setUserName('');
                    setUserPhone('');
                  }}
                >
                  ثبت پرونده کاتالوگ جدید
                </Button>

                <Button
                  type="button"
                  variant="solid"
                  color="primary"
                  size="md"
                  onClick={() => window.open('https://t.me/shayanesfd', '_blank')}
                  iconBefore={<IconBrandTelegram size={18} stroke={2.2} />}
                >
                  ارتباط مستقیم و ارسال فایل در تلگرام
                </Button>
              </div>

            </div>
          )}

        </div>

        {/* ===================== فوتر استاندارد و حقوقی B2B ===================== */}
        <footer className="border-t-2 border-[var(--color-neutral-300)] pt-10 space-y-8 text-xs text-[var(--color-neutral-600)]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            <div className="space-y-2">
              <span className="font-black text-sm text-[var(--color-neutral-900)]">سامانه رُخ‌نما</span>
              <p className="leading-relaxed">
                ویترین دیجیتال شفاف برای تولیدکنندگان و عمده‌فروشان B2B؛ تبدیل کاتالوگ‌های سنتی به تجربهٔ زنده با اتصال به انبار، فرم پیامکی و گزارش‌گیری رفتار خریدار.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-[var(--color-neutral-900)] block mb-1">مسیرهای اصلی</span>
              <ul className="space-y-1.5">
                <li><a href="#showcase" className="hover:text-[var(--color-primary-600)]">ویترین تعاملی</a></li>
                <li><a href="#projects" className="hover:text-[var(--color-primary-600)]">نمونه‌پروژه‌های واقعی</a></li>
                <li><a href="#compare" className="hover:text-[var(--color-primary-600)]">مقایسه با کاتالوگ کاغذی</a></li>
                <li><a href="#pricing" className="hover:text-[var(--color-primary-600)]">ماشین‌حساب چاپ و تعرفه</a></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-[var(--color-neutral-900)] block mb-1">تعهدات و امنیت</span>
              <div className="flex items-center gap-1.5"><IconShieldCheck size={14} className="text-[var(--color-primary-600)]" /> قرارداد رسمی عدم افشای اطلاعات (NDA)</div>
              <div className="flex items-center gap-1.5"><IconCheck size={14} className="text-[var(--color-success-600)]" /> میزبانی توزیع‌شده ابری داخل کشور (CDN)</div>
              <div className="flex items-center gap-1.5"><IconCheck size={14} className="text-[var(--color-success-600)]" /> پایداری در برابر تحریم و قطعی اینترنت</div>
              <div className="flex items-center gap-1.5"><IconCheck size={14} className="text-[var(--color-success-600)]" /> پرداخت ریالی شفاف و بدون شارژ دلاری</div>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-[var(--color-neutral-900)] block mb-1">مرکز نوآوری و استقرار</span>
              <div>تهران، ولنجک، دانشگاه شهید بهشتی، برج فناوری · طبقهٔ ششم</div>
              <div>تحت حمایت و همکاری: مرکز تحقیق و نوآوری همراه اول (MCI)</div>
              <div>تلگرام: <a href="https://t.me/shayanesfd" className="text-[var(--color-primary-600)] font-bold">@shayanesfd</a></div>
            </div>

          </div>

          <div className="border-t border-[var(--color-neutral-200)] pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[var(--color-neutral-500)] text-[11px]">
            <div>رُخ‌نما · تمامی حقوق محفوظ است · ۱۴۰۳ - ۱۴۰۴</div>
            <div className="font-mono">BUILD: PROD-۲.۴ · SBU TECH TOWER</div>
          </div>
        </footer>

      </div>
    </section>
  );
}
