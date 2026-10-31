'use client';

import React, { useState } from 'react';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';
import {
  IconArrowLeft,
  IconBrandTelegram,
  IconBuildingSkyscraper,
  IconCheck,
  IconCircleCheck,
  IconClock,
  IconFileText,
  IconFileX,
  IconLink,
  IconLock,
  IconMapPin,
  IconPhone,
  IconSend,
  IconShieldCheck,
  IconUpload,
  IconUser,
} from '@tabler/icons-react';

const FLOORS = [
  { id: 'fl-07', code: 'FL ۰۷', title: 'R&D', desc: 'تحقیق و توسعهٔ کاربردی', isUs: false },
  { id: 'fl-06', code: 'FL ۰۶', title: 'ما اینجا هستیم ★', desc: 'استقرار تیم رُخ‌نما و مرکز نوآوری', isUs: true },
  { id: 'fl-05', code: 'FL ۰۵', title: 'TECH', desc: 'توسعهٔ هستهٔ تعاملی و وب‌اپلیکیشن', isUs: false },
  { id: 'fl-04', code: 'FL ۰۴', title: 'LAB', desc: 'آزمایشگاه محصول و تجربهٔ کاربری', isUs: false },
  { id: 'fl-03', code: 'FL ۰۳', title: 'MCI', desc: 'مرکز تحقیق و نوآوری همراه اول', isUs: false },
  { id: 'fl-02', code: 'FL ۰۲', title: 'دیوار', desc: 'دفتر مهندسی پلتفرم دیوار', isUs: false },
  { id: 'fl-01', code: 'FL ۰۱', title: 'LOBBY', desc: 'لابی و پذیرش مرکزی برج فناوری', isUs: false },
];

const INDUSTRIES = [
  { id: 'parts', label: 'قطعات فنی و ابزارآلات صنعتی' },
  { id: 'wholesale', label: 'بنکداری، نساجی و پوشاک عمده' },
  { id: 'machinery', label: 'تجهیزات پزشکی و ماشین‌آلات سرمایه‌ای' },
  { id: 'export', label: 'صادرات و شرکت‌های نمایشگاهی' },
];

export default function DemoA() {
  const [selectedFloor, setSelectedFloor] = useState<string>('fl-06');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState(INDUSTRIES[0].id);
  const [method, setMethod] = useState<'file' | 'link'>('file');
  const [linkUrl, setLinkUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1100);
  };

  return (
    <section dir="rtl" className="w-full bg-[var(--bg-neutral-base)] text-[var(--color-neutral-900)] py-16 px-4 md:px-8 lg:px-14 border-b border-[var(--color-neutral-300)]">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* ===================== بخش ۱۰: استقرار فیزیکی و بلوپرینت معماری ۳ ستونه ===================== */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[var(--color-neutral-300)] pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-[var(--color-primary-600)] mb-1">
                <span className="w-2 h-2 bg-[var(--color-primary-600)] inline-block"></span>
                <span>بخش ۱۰ · اصالت سازمانی و استقرار فیزیکی</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-[var(--color-neutral-900)]">
                ما یک تیم مجازی نیستیم؛ مستقر در برج فناوری دانشگاه شهید بهشتی
              </h2>
            </div>
            <p className="text-sm text-[var(--color-neutral-500)] max-w-md">
              مهندسان و توسعه‌دهندگان رُخ‌نما در هاب فناوری دانشگاه شهید بهشتی و با پشتیبانی مرکز نوآوری همراه اول مستقر هستند.
            </p>
          </div>

          {/* بلوپرینت معماری ۳ ستونه بر اساس دیاگرام رسمی */}
          <div className="border-2 border-[var(--color-neutral-300)] bg-[var(--color-neutral-100)] p-5 md:p-7 relative">
            {/* شناسه فنی بلوپرینت */}
            <div className="flex items-center justify-between border-b border-[var(--color-neutral-300)] pb-3 mb-6 text-xs text-[var(--color-neutral-500)] font-mono">
              <span className="flex items-center gap-1.5 font-bold">
                <IconBuildingSkyscraper size={15} stroke={2.2} />
                <span>TECH TOWER // ELEVATION SPECIFICATION</span>
              </span>
              <span>کد استقرار: SBU-TT-FL06</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

              {/* ستون ۱: دیاگرام ارتفاع طبقات ELEVATION · FLOOR 06 */}
              <div className="lg:col-span-4 bg-white border border-[var(--color-neutral-300)] p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[var(--color-neutral-500)] border-b border-[var(--color-neutral-200)] pb-2 mb-2">
                    <span>ELEVATION · FLOOR ۰۶</span>
                    <span>ساختار طبقات</span>
                  </div>

                  <div className="space-y-1">
                    {FLOORS.map((floor) => {
                      const isActive = floor.isUs;
                      const isHovered = selectedFloor === floor.id;
                      return (
                        <button
                          key={floor.id}
                          type="button"
                          onClick={() => setSelectedFloor(floor.id)}
                          className={`w-full text-start flex items-center justify-between px-2.5 py-1.5 text-xs font-mono transition-colors rounded-none ${
                            isActive
                              ? 'bg-[var(--color-secondary-400)] text-[var(--color-secondary-950)] font-black border border-[var(--color-secondary-600)] shadow-xs'
                              : isHovered
                              ? 'bg-[var(--color-neutral-200)] text-[var(--color-neutral-900)] border-b border-dashed border-[var(--color-neutral-300)]'
                              : 'text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-50)] border-b border-dashed border-[var(--color-neutral-200)]'
                          }`}
                        >
                          <span className="font-bold">{floor.code}</span>
                          <span className="text-[11px] font-sans font-medium">{floor.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--color-neutral-200)] text-[11px] text-[var(--color-neutral-500)] flex items-center justify-between">
                  <span>وضعیت لایهٔ فعلی:</span>
                  <span className="font-bold text-[var(--color-primary-700)]">
                    {FLOORS.find(f => f.id === selectedFloor)?.desc}
                  </span>
                </div>
              </div>

              {/* ستون ۲: آدرس فیزیکی تیم مهندسی */}
              <div className="lg:col-span-4 bg-white border border-[var(--color-neutral-300)] p-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-neutral-500)]">
                    <IconMapPin size={16} stroke={2.2} className="text-[var(--color-primary-600)]" />
                    <span>تیم مهندسی مستقر در:</span>
                  </div>

                  <div className="space-y-1 pt-1">
                    <div className="text-lg font-black text-[var(--color-neutral-900)]">تهران، ولنجک</div>
                    <div className="text-base font-bold text-[var(--color-neutral-800)]">دانشگاه شهید بهشتی</div>
                    <div className="text-lg font-black text-[var(--color-primary-600)]">برج فناوری · طبقهٔ ششم</div>
                  </div>

                  <p className="text-xs text-[var(--color-neutral-600)] leading-relaxed pt-2">
                    جلسات کارشناسی و بازدید دمو با تعیین وقت قبلی در محل استقرار تیم فنی امکان‌پذیر است.
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--color-neutral-200)] flex items-center justify-between text-xs text-[var(--color-neutral-500)] font-mono">
                  <span>مختصات: ۳۵.۸۰ N · ۵۱.۴۰ E</span>
                  <span className="text-[var(--color-success-600)] font-bold font-sans flex items-center gap-1">
                    <span className="w-2 h-2 rounded-none bg-[var(--color-success-600)]"></span>
                    دفتر مرکزی فعال
                  </span>
                </div>
              </div>

              {/* ستون ۳: حامی و شعار هویتی */}
              <div className="lg:col-span-4 bg-white border border-[var(--color-neutral-300)] p-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-neutral-500)]">
                    <IconShieldCheck size={16} stroke={2.2} className="text-[var(--color-secondary-600)]" />
                    <span>تحت حمایت و همکاری:</span>
                  </div>

                  <div className="text-base font-black text-[var(--color-primary-700)] leading-snug">
                    مرکز تحقیق و نوآوری همراه اول (MCI)
                  </div>

                  <div className="bg-[var(--color-secondary-50)] border-s-4 border-[var(--color-secondary-500)] p-3 text-xs text-[var(--color-neutral-800)] font-bold leading-relaxed">
                    «داخل همان اکوسیستمی کار می‌کنیم که برایش محصول می‌سازیم.»
                  </div>

                  <p className="text-xs text-[var(--color-neutral-500)] leading-relaxed">
                    ارتباط مستقیم با مهندسان، بدون واسطه و با آماده‌سازی سریع نمونهٔ آزمایشی.
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--color-neutral-200)] text-xs text-[var(--color-neutral-600)]">
                  <span>هم‌افزایی زیرساختی و میزبانی روی شبکه‌های پایدار مخابراتی</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ===================== بخش ۱۱: فرم درخواست دمو و مشاورهٔ اول ===================== */}
        <div id="demo-form-a" className="border-2 border-[var(--color-neutral-300)] bg-white p-6 md:p-10">
          <div className="max-w-3xl mx-auto space-y-8">

            {/* سربرگ پیام محوری */}
            <div className="text-center space-y-3">
              <span className="inline-block px-3 py-1 bg-[var(--color-primary-50)] text-[var(--color-primary-700)] text-xs font-bold font-mono">
                بخش ۱۱ · اقدام نهایی و ثبت دمو
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-[var(--color-neutral-900)] leading-tight">
                کاتالوگ فعلی‌تان را بفرستید تا نسخه تعاملی آن با محصولات واقعی خودتان ظرف ۲۴ تا ۴۸ ساعت آماده شود.
              </h3>
              <p className="text-sm text-[var(--color-neutral-600)] max-w-xl mx-auto">
                نمونهٔ آزمایشی را روی کالاهای خودتان بررسی کنید؛ بدون هزینه، بدون تعهد و همراه با بررسی رفتار خریدار در پنل مدیریت.
              </p>
            </div>

            {/* نوار ۳ شاخص اطمینان */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-y border-[var(--color-neutral-200)] py-3 text-xs text-[var(--color-neutral-700)]">
              <div className="flex items-center justify-center gap-1.5 font-bold">
                <IconCheck size={16} stroke={2.2} className="text-[var(--color-success-600)]" />
                <span>بدون نیاز به شارژ ارزی یا اشتراک ماهانه</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 font-bold">
                <IconClock size={16} stroke={2.2} className="text-[var(--color-primary-600)]" />
                <span>تحویل دمو ظرف ۲۴ تا ۴۸ ساعت</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 font-bold">
                <IconLock size={16} stroke={2.2} className="text-[var(--color-secondary-600)]" />
                <span>تعهد محرمانگی رسمی اطلاعات (NDA)</span>
              </div>
            </div>

            {/* فرم یا وضعیت موفقیت */}
            {isSubmitted ? (
              <div className="bg-[var(--color-success-50)] border-2 border-[var(--color-success-600)] p-8 text-center space-y-4">
                <div className="w-12 h-12 bg-[var(--color-success-600)] text-white mx-auto flex items-center justify-center">
                  <IconCircleCheck size={28} stroke={2.2} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-black text-[var(--color-neutral-900)]">درخواست دمو با موفقیت ثبت شد</h4>
                  <p className="text-sm text-[var(--color-neutral-700)]">
                    کارشناسان فنی رُخ‌نما ظرف حداکثر ۲۴ ساعت آینده با شمارهٔ {phone} تماس خواهند گرفت.
                  </p>
                </div>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    variant="outline"
                    color="primary"
                    size="md"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullName('');
                      setPhone('');
                      setFileName('');
                      setLinkUrl('');
                    }}
                  >
                    ثبت درخواست کاتالوگ دیگر
                  </Button>
                  <Button
                    variant="solid"
                    color="primary"
                    size="md"
                    onClick={() => window.open('https://t.me/shayanesfd', '_blank')}
                    iconBefore={<IconBrandTelegram size={18} stroke={2.2} />}
                  >
                    پیگیری مستقیم در تلگرام
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* ردیف دوگانه مشخصات فردی */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="demoA-name" required>نام و نام خانوادگی</Label>
                    <Input
                      id="demoA-name"
                      placeholder="مثال: علیرضا پارسا"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      startIcon={<IconUser size={18} stroke={2.2} />}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="demoA-phone" required>شماره تماس مستقیم (همراه یا خط مستقیم)</Label>
                    <Input
                      id="demoA-phone"
                      placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      startIcon={<IconPhone size={18} stroke={2.2} />}
                      required
                    />
                  </div>
                </div>

                {/* انتخاب حوزه فعالیت سازمانی */}
                <div className="space-y-2">
                  <Label>حوزه فعالیت سازمانی</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {INDUSTRIES.map((ind) => (
                      <button
                        key={ind.id}
                        type="button"
                        onClick={() => setIndustry(ind.id)}
                        className={`text-start px-3.5 py-3 text-xs font-bold border-2 transition-all rounded-none flex items-center justify-between ${
                          industry === ind.id
                            ? 'border-[var(--color-primary-600)] bg-[var(--color-primary-50)] text-[var(--color-primary-700)]'
                            : 'border-[var(--color-neutral-200)] text-[var(--color-neutral-700)] hover:border-[var(--color-neutral-300)] bg-transparent'
                        }`}
                      >
                        <span>{ind.label}</span>
                        {industry === ind.id && <IconCheck size={16} stroke={2.2} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ارسال فایل یا پیوند کاتالوگ قدیمی */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>شیوهٔ ارائهٔ کاتالوگ قدیمی</Label>
                    <div className="flex border border-[var(--color-neutral-300)]">
                      <button
                        type="button"
                        onClick={() => setMethod('file')}
                        className={`px-3 py-1 text-xs font-bold transition-colors ${
                          method === 'file'
                            ? 'bg-[var(--color-primary-600)] text-white'
                            : 'bg-white text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)]'
                        }`}
                      >
                        بارگذاری فایل PDF
                      </button>
                      <button
                        type="button"
                        onClick={() => setMethod('link')}
                        className={`px-3 py-1 text-xs font-bold transition-colors ${
                          method === 'link'
                            ? 'bg-[var(--color-primary-600)] text-white'
                            : 'bg-white text-[var(--color-neutral-600)] hover:bg-[var(--color-neutral-100)]'
                        }`}
                      >
                        ارسال لینک وب‌سایت
                      </button>
                    </div>
                  </div>

                  {method === 'file' ? (
                    <div className="border-2 border-dashed border-[var(--color-neutral-300)] hover:border-[var(--color-primary-600)] bg-[var(--color-neutral-50)] p-6 text-center transition-colors relative">
                      <input
                        type="file"
                        accept=".pdf,.zip"
                        id="demoA-file"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex flex-col items-center justify-center gap-2">
                        <IconUpload size={28} stroke={2.2} className="text-[var(--color-neutral-500)]" />
                        {fileName ? (
                          <div className="text-sm font-bold text-[var(--color-primary-700)] flex items-center gap-1">
                            <IconFileText size={16} stroke={2.2} />
                            <span>فایل انتخاب‌شده: {fileName}</span>
                          </div>
                        ) : (
                          <>
                            <span className="text-sm font-bold text-[var(--color-neutral-800)]">
                              فایل کاتالوگ چاپی یا PDF را اینجا رها کنید یا کلیک نمایید
                            </span>
                            <span className="text-xs text-[var(--color-neutral-500)]">
                              حداکثر حجم: ۵۰ مگابایت (PDF، ZIP یا تصاویر)
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Input
                      placeholder="https://example.com/catalog یا پیوند فایل در گوگل درایو"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      startIcon={<IconLink size={18} stroke={2.2} />}
                    />
                  )}
                </div>

                {/* دکمه‌های اقدام: ارسال فرم + ارسال در تلگرام */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Button
                    type="submit"
                    variant="solid"
                    color="primary"
                    size="lg"
                    loading={isSubmitting}
                    fullWidth
                    className="flex-1"
                    iconBefore={<IconSend size={20} stroke={2.2} />}
                  >
                    ثبت درخواست و ساخت دمو تعاملی
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    color="secondary"
                    size="lg"
                    onClick={() => window.open('https://t.me/shayanesfd', '_blank')}
                    iconBefore={<IconBrandTelegram size={20} stroke={2.2} />}
                    className="sm:w-auto"
                  >
                    ارسال مستقیم در تلگرام
                  </Button>
                </div>
              </form>
            )}

          </div>
        </div>

        {/* ===================== فوتر رسمی و حقوقی B2B ===================== */}
        <footer className="border-t-2 border-[var(--color-neutral-300)] pt-12 space-y-10 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* ستون ۱: هویت رُخ‌نما */}
            <div className="space-y-3">
              <div className="text-base font-black text-[var(--color-neutral-900)]">
                رُخ‌نما · ویترین دیجیتال شفاف
              </div>
              <p className="text-[var(--color-neutral-600)] leading-relaxed">
                سیستم کاتالوگ تعاملی و ابزار فروش B2B؛ تبدیل کاتالوگ‌های فیزیکی و PDF به یک تجربهٔ دیجیتال همگام با انبار، با پایش رفتار خریدار و صدور پیش‌فاکتور رسمی.
              </p>
              <div className="pt-2 text-[var(--color-neutral-500)] font-mono">
                نسخهٔ زیرساخت: ۲.۴.۰
              </div>
            </div>

            {/* ستون ۲: پیوندهای سریع ناوبری */}
            <div className="space-y-2">
              <div className="font-bold text-[var(--color-neutral-900)] text-sm mb-3">پیوندهای محصول</div>
              <ul className="space-y-2 text-[var(--color-neutral-600)]">
                <li><a href="#showcase" className="hover:text-[var(--color-primary-600)] transition-colors">ویترین تعاملی محصول</a></li>
                <li><a href="#projects" className="hover:text-[var(--color-primary-600)] transition-colors">نمونه‌پروژه‌های اجراشده</a></li>
                <li><a href="#compare" className="hover:text-[var(--color-primary-600)] transition-colors">مقایسه با چاپ و PDF</a></li>
                <li><a href="#pricing" className="hover:text-[var(--color-primary-600)] transition-colors">برآورد هزینه و تعرفه</a></li>
              </ul>
            </div>

            {/* ستون ۳: امنیت و تضمین‌های حقوقی */}
            <div className="space-y-2">
              <div className="font-bold text-[var(--color-neutral-900)] text-sm mb-3">امنیت و استانداردهای حقوقی</div>
              <ul className="space-y-2 text-[var(--color-neutral-600)]">
                <li className="flex items-center gap-1.5">
                  <IconShieldCheck size={14} className="text-[var(--color-primary-600)]" />
                  <span>انعقاد قرارداد محرمانگی رسمی (NDA)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <IconCheck size={14} className="text-[var(--color-success-600)]" />
                  <span>میزبانی روی شبکه توزیع ابری داخلی (CDN)</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <IconCheck size={14} className="text-[var(--color-success-600)]" />
                  <span>تضمین دسترسی پایدار بدون نیاز به فیلترشکن</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <IconCheck size={14} className="text-[var(--color-success-600)]" />
                  <span>تعرفه شفاف و پرداخت ریالی بدون شارژ ارزی</span>
                </li>
              </ul>
            </div>

            {/* ستون ۴: مشخصات تماس مستقیم */}
            <div className="space-y-3">
              <div className="font-bold text-[var(--color-neutral-900)] text-sm mb-3">ارتباط مستقیم مهندسی</div>
              <div className="space-y-1.5 text-[var(--color-neutral-600)]">
                <div>تهران، ولنجک، دانشگاه شهید بهشتی، برج فناوری · طبقهٔ ششم</div>
                <div>پشتیبانی تلگرام: <a href="https://t.me/shayanesfd" target="_blank" rel="noopener noreferrer" className="font-mono text-[var(--color-primary-600)] font-bold">@shayanesfd</a></div>
                <div className="text-[var(--color-neutral-500)]">ساعات پاسخگویی: شنبه تا چهارشنبه ۹:۰۰ تا ۱۸:۰۰</div>
              </div>
            </div>

          </div>

          <div className="border-t border-[var(--color-neutral-200)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[var(--color-neutral-500)]">
            <div>
              تمامی حقوق این سامانه متعلق به «رُخ‌نما» است · ۱۴۰۳ - ۱۴۰۴
            </div>
            <div className="flex items-center gap-4">
              <span>مرکز تحقیق و نوآوری همراه اول (MCI)</span>
              <span>·</span>
              <span>دانشگاه شهید بهشتی</span>
            </div>
          </div>
        </footer>

      </div>
    </section>
  );
}
