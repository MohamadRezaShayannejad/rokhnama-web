'use client';

import React, { useState } from 'react';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';
import { Label } from '@/ui/Label';
import {
  IconArrowLeft,
  IconBrandTelegram,
  IconBuildingSkyscraper,
  IconCertificate,
  IconCheck,
  IconCircleCheck,
  IconDeviceMobileMessage,
  IconExternalLink,
  IconFileText,
  IconLink,
  IconLock,
  IconMapPin,
  IconPhone,
  IconSend,
  IconServer,
  IconShieldCheck,
  IconUpload,
  IconUser,
} from '@tabler/icons-react';

const FLOORS = [
  { code: 'FL ۰۷', title: 'R&D', desc: 'واحد تحقیق و توسعه' },
  { code: 'FL ۰۶', title: 'ما اینجا هستیم ★', desc: 'استقرار تیم رُخ‌نما و مهندسی محصول', isCurrent: true },
  { code: 'FL ۰۵', title: 'TECH', desc: 'توسعه فنی هسته کاتالوگ' },
  { code: 'FL ۰۴', title: 'LAB', desc: 'آزمایشگاه سنجش داده و تعامل' },
  { code: 'FL ۰۳', title: 'MCI', desc: 'مرکز تحقیق و نوآوری همراه اول' },
  { code: 'FL ۰۲', title: 'دیوار', desc: 'دفتر پلتفرم دیوار' },
  { code: 'FL ۰۱', title: 'LOBBY', desc: 'پذیرش و لابی برج فناوری' },
];

export default function DemoB() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [businessField, setBusinessField] = useState('قطعات یدکی و تجهیزات صنعتی');
  const [fileMode, setFileMode] = useState<'upload' | 'url'>('upload');
  const [catalogFile, setCatalogFile] = useState<string>('');
  const [catalogUrl, setCatalogUrl] = useState('');
  const [smsSent, setSmsSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSendOtp = () => {
    if (!phone.trim()) return;
    setSmsSent(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <section dir="rtl" className="w-full bg-[var(--bg-neutral-base)] text-[var(--color-neutral-900)] py-16 px-4 md:px-8 lg:px-14 border-b border-[var(--color-neutral-300)]">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* سربرگ معرفی اتود و ارزش پیشنهادی */}
        <div className="border-b-2 border-[var(--color-neutral-300)] pb-6 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--color-primary-600)]">
            <span className="w-2 h-2 bg-[var(--color-primary-600)]"></span>
            <span>اتود ۲ · چیدمان دو ستونه عریض (فرم اعتبارسنجی سرنخ + استقرار همراه اول)</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-black text-[var(--color-neutral-900)]">
              کاتالوگ فعلی‌تان را بفرستید تا نسخه تعاملی آن با محصولات واقعی خودتان ظرف ۲۴ تا ۴۸ ساعت آماده شود.
            </h2>
            <div className="text-xs text-[var(--color-neutral-600)] shrink-0 font-medium bg-[var(--color-neutral-100)] border border-[var(--color-neutral-300)] px-3 py-2">
              بررسی بدون تعهد مالی · تعهد محرمانگی رسمی (NDA)
            </div>
          </div>
        </div>

        {/* چیدمان دو ستونه عریض (Right: Form / Left: Engineering Deployment Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ===================== ستون راست: فرم اعتبارسنجی سرنخ و دریافت دمو ===================== */}
          <div className="lg:col-span-7 bg-white border-2 border-[var(--color-neutral-300)] p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--color-neutral-200)] pb-4">
              <div>
                <span className="text-xs font-bold text-[var(--color-primary-600)] font-mono">بخش ۱۱ · فرم دریافت سرنخ</span>
                <h3 className="text-xl font-black text-[var(--color-neutral-900)]">مشخصات اولیهٔ دریافت دمو</h3>
              </div>
              <span className="text-xs text-[var(--color-neutral-500)] bg-[var(--color-neutral-100)] px-2.5 py-1 font-bold">
                زمان تحویل: ۲۴ تا ۴۸ ساعت
              </span>
            </div>

            {isSuccess ? (
              <div className="bg-[var(--color-success-50)] border-2 border-[var(--color-success-600)] p-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--color-success-600)] text-white flex items-center justify-center shrink-0">
                    <IconCircleCheck size={24} stroke={2.2} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-[var(--color-neutral-900)]">
                      درخواست آماده‌سازی کاتالوگ با موفقیت ثبت شد
                    </h4>
                    <p className="text-xs text-[var(--color-neutral-700)]">
                      کد پیگیری: <span className="font-mono font-bold">RK-۵۸۲۰</span> · کارشناس مسئول ظرف ۲۴ ساعت با شما تماس می‌گیرد.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    color="primary"
                    size="sm"
                    onClick={() => {
                      setIsSuccess(false);
                      setFullName('');
                      setPhone('');
                      setSmsSent(false);
                      setCatalogFile('');
                      setCatalogUrl('');
                    }}
                  >
                    ارسال کاتالوگ برای لاین محصول جدید
                  </Button>
                  <Button
                    variant="solid"
                    color="primary"
                    size="sm"
                    onClick={() => window.open('https://t.me/shayanesfd', '_blank')}
                    iconBefore={<IconBrandTelegram size={16} stroke={2.2} />}
                  >
                    پیگیری مستقیم در تلگرام مهندسی
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* نام و شماره تماس */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="demoB-name" required>نام و نام خانوادگی نماینده</Label>
                    <Input
                      id="demoB-name"
                      placeholder="علیرضا پارسا"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      startIcon={<IconUser size={18} stroke={2.2} />}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="demoB-phone" required>شماره تماس مستقیم</Label>
                    <div className="relative">
                      <Input
                        id="demoB-phone"
                        placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        startIcon={<IconPhone size={18} stroke={2.2} />}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* اعتبارسنجی پیامکی اختیاری */}
                <div className="bg-[var(--color-neutral-50)] border border-[var(--color-neutral-200)] p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--color-neutral-800)] flex items-center gap-1.5">
                      <IconDeviceMobileMessage size={16} stroke={2.2} className="text-[var(--color-primary-600)]" />
                      تأیید پیامکی شماره جهت دریافت لینک اختصاصی
                    </span>
                    {!smsSent ? (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-xs text-[var(--color-primary-600)] font-bold hover:underline"
                      >
                        ارسال کد پیامک
                      </button>
                    ) : (
                      <span className="text-[11px] text-[var(--color-success-600)] font-bold">کد ارسال شد</span>
                    )}
                  </div>
                  {smsSent && (
                    <div className="flex items-center gap-2 pt-1">
                      <Input
                        placeholder="کد ۴ رقمی ارسال‌شده (مثال: ۱۲۳۴)"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        inputSize="sm"
                        className="max-w-[200px]"
                      />
                      <span className="text-[11px] text-[var(--color-neutral-500)]">
                        پیامک امنیتی زیرساخت مخابراتی
                      </span>
                    </div>
                  )}
                </div>

                {/* حوزه فعالیت سازمانی */}
                <div className="space-y-1.5">
                  <Label htmlFor="demoB-field">حوزه فعالیت سازمانی</Label>
                  <select
                    id="demoB-field"
                    value={businessField}
                    onChange={(e) => setBusinessField(e.target.value)}
                    className="w-full h-[52px] bg-transparent border-2 border-[var(--color-neutral-200)] px-4 text-sm font-semibold text-[var(--color-neutral-900)] outline-none rounded-none hover:border-[var(--color-neutral-300)] focus:border-[var(--color-primary-600)]"
                  >
                    <option value="قطعات یدکی و تجهیزات صنعتی">قطعات یدکی، ابزارآلات و تأسیسات صنعتی</option>
                    <option value="بنکداری، پوشاک و عمده‌فروشی">بنکداری، نساجی و عمده‌فروشی پوشاک</option>
                    <option value="تجهیزات پزشکی و خطوط تولید">تجهیزات پزشکی، ماشین‌آلات و خطوط تولید</option>
                    <option value="صادرات کالا و غرفه‌داری نمایشگاهی">صادرات مواد غذایی، معدنی و غرفه‌های نمایشگاهی</option>
                    <option value="سایر صنایع">سایر حوزه‌های تولیدی و بازرگانی</option>
                  </select>
                </div>

                {/* شیوه ارسال کاتالوگ */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--color-neutral-700)]">
                    <Label>فایل یا آدرس کاتالوگ فعلی</Label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setFileMode('upload')}
                        className={`text-xs px-2 py-0.5 border ${
                          fileMode === 'upload'
                            ? 'border-[var(--color-primary-600)] text-[var(--color-primary-700)] font-black bg-[var(--color-primary-50)]'
                            : 'border-[var(--color-neutral-300)] text-[var(--color-neutral-600)]'
                        }`}
                      >
                        ارسال فایل PDF
                      </button>
                      <button
                        type="button"
                        onClick={() => setFileMode('url')}
                        className={`text-xs px-2 py-0.5 border ${
                          fileMode === 'url'
                            ? 'border-[var(--color-primary-600)] text-[var(--color-primary-700)] font-black bg-[var(--color-primary-50)]'
                            : 'border-[var(--color-neutral-300)] text-[var(--color-neutral-600)]'
                        }`}
                      >
                        درج لینک اینترنتی
                      </button>
                    </div>
                  </div>

                  {fileMode === 'upload' ? (
                    <div className="border-2 border-dashed border-[var(--color-neutral-300)] hover:border-[var(--color-primary-600)] p-4 text-center bg-[var(--color-neutral-50)] relative">
                      <input
                        type="file"
                        accept=".pdf,.zip,.rar"
                        onChange={(e) => setCatalogFile(e.target.files?.[0]?.name || '')}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <div className="flex items-center justify-center gap-2 text-xs text-[var(--color-neutral-700)]">
                        <IconUpload size={20} stroke={2.2} className="text-[var(--color-primary-600)]" />
                        {catalogFile ? (
                          <span className="font-bold text-[var(--color-primary-700)]">
                            فایل آمادهٔ استخراج: {catalogFile}
                          </span>
                        ) : (
                          <span>انتخاب یا رهاسازی فایل کاتالوگ (PDF یا فشرده تا ۵۰ مگابایت)</span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Input
                      placeholder="https://your-company.com/catalog.pdf"
                      value={catalogUrl}
                      onChange={(e) => setCatalogUrl(e.target.value)}
                      startIcon={<IconLink size={18} stroke={2.2} />}
                    />
                  )}
                </div>

                {/* دکمه‌های اقدام */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    variant="solid"
                    color="primary"
                    size="md"
                    loading={isSubmitting}
                    fullWidth
                    className="flex-1"
                    iconBefore={<IconSend size={18} stroke={2.2} />}
                  >
                    دریافت نسخه تعاملی دمو
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    color="secondary"
                    size="md"
                    onClick={() => window.open('https://t.me/shayanesfd', '_blank')}
                    iconBefore={<IconBrandTelegram size={18} stroke={2.2} />}
                  >
                    ارتباط در تلگرام
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[var(--color-neutral-500)] pt-1">
                  <IconLock size={14} className="text-[var(--color-neutral-500)] shrink-0" />
                  <span>کلیه اطلاعات محصولات بر مبنای قرارداد رسمی عدم افشای اطلاعات (NDA) محرمانه خواهد ماند.</span>
                </div>
              </form>
            )}

          </div>

          {/* ===================== ستون چپ: کارت مهندسی استقرار همراه اول و برج فناوری ===================== */}
          <div className="lg:col-span-5 space-y-6">

            {/* سربرگ مشخصات استقرار */}
            <div className="border-2 border-[var(--color-primary-600)] bg-[var(--color-neutral-100)] p-6 space-y-5">

              <div className="border-b border-[var(--color-neutral-300)] pb-3 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-[var(--color-primary-700)] flex items-center gap-1.5">
                  <IconBuildingSkyscraper size={16} stroke={2.2} />
                  <span>SECTION ۱۰ // PHYSICAL HQ</span>
                </span>
                <span className="text-[var(--color-neutral-500)]">ELEVATION SPEC</span>
              </div>

              {/* بلوپرینت ۳ ستونه منسجم در کادر مهندسی */}
              <div className="space-y-4">

                {/* بخش اول: ساختار طبقات ELEVATION · FLOOR 06 */}
                <div className="bg-white border border-[var(--color-neutral-300)] p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[var(--color-neutral-500)] border-b border-[var(--color-neutral-200)] pb-1.5">
                    <span>ELEVATION · FLOOR ۰۶</span>
                    <span>برج فناوری</span>
                  </div>

                  <div className="space-y-1">
                    {FLOORS.map((floor, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between px-2 py-1 text-xs font-mono ${
                          floor.isCurrent
                            ? 'bg-[var(--color-secondary-400)] text-[var(--color-secondary-950)] font-black border border-[var(--color-secondary-600)]'
                            : 'text-[var(--color-neutral-700)] border-b border-dashed border-[var(--color-neutral-200)]'
                        }`}
                      >
                        <span className="font-bold">{floor.code}</span>
                        <span className="text-[11px] font-sans font-medium">{floor.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* بخش دوم: نشانی مهندسی */}
                <div className="bg-white border border-[var(--color-neutral-300)] p-4 space-y-2">
                  <span className="text-[11px] font-bold text-[var(--color-neutral-500)] flex items-center gap-1">
                    <IconMapPin size={14} className="text-[var(--color-primary-600)]" />
                    تیم مهندسی مستقر در:
                  </span>
                  <div className="text-sm font-black text-[var(--color-neutral-900)] leading-snug">
                    تهران، ولنجک، دانشگاه شهید بهشتی، برج فناوری · طبقهٔ ششم
                  </div>
                  <p className="text-xs text-[var(--color-neutral-600)]">
                    دسترسی مستقیم جهت جلسات فنی حضوری و تحلیل ساختار کاتالوگ کالاها با تعیین وقت قبلی.
                  </p>
                </div>

                {/* بخش سوم: حامی و شعار هویتی همراه اول */}
                <div className="bg-white border border-[var(--color-neutral-300)] p-4 space-y-2.5">
                  <span className="text-[11px] font-bold text-[var(--color-neutral-500)] flex items-center gap-1">
                    <IconCertificate size={14} className="text-[var(--color-secondary-600)]" />
                    تحت حمایت و همکاری:
                  </span>
                  <div className="text-sm font-black text-[var(--color-primary-700)]">
                    مرکز تحقیق و نوآوری همراه اول (MCI)
                  </div>
                  <div className="bg-[var(--color-secondary-50)] border-s-4 border-[var(--color-secondary-500)] p-2.5 text-xs font-bold text-[var(--color-neutral-800)]">
                    «داخل همان اکوسیستمی کار می‌کنیم که برایش محصول می‌سازیم.»
                  </div>
                  <div className="text-[11px] text-[var(--color-neutral-500)]">
                    ارتباط مستقیم با مهندسان، بدون واسطه و با آماده‌سازی سریع نمونهٔ آزمایشی.
                  </div>
                </div>

              </div>

              {/* نوار وضعیت استقرار */}
              <div className="border-t border-[var(--color-neutral-300)] pt-3 flex items-center justify-between text-xs text-[var(--color-neutral-600)]">
                <span className="flex items-center gap-1.5 font-bold">
                  <IconServer size={14} className="text-[var(--color-success-600)]" />
                  زیرساخت ابری پایدار
                </span>
                <span className="font-mono text-[var(--color-neutral-500)]">LATENCY: &lt; ۲۵ms</span>
              </div>

            </div>

          </div>

        </div>

        {/* ===================== فوتر رسمی و جامع B2B ===================== */}
        <footer className="border-t-2 border-[var(--color-neutral-300)] pt-10 space-y-8 text-xs text-[var(--color-neutral-600)]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className="space-y-2">
              <span className="font-black text-sm text-[var(--color-neutral-900)]">رُخ‌نما (Rokhnama)</span>
              <p className="leading-relaxed">
                سامانه تعاملی‌سازی کاتالوگ و ارتقای فروش B2B. جایگزین مدرن فایل‌های کاتالوگ چاپی و PDF بدون نیاز به نصب.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-[var(--color-neutral-900)] block mb-2">لینک‌های سریع</span>
              <div><a href="#showcase" className="hover:text-[var(--color-primary-600)]">ویترین تعاملی محصول</a></div>
              <div><a href="#projects" className="hover:text-[var(--color-primary-600)]">پرونده‌های اجراشده</a></div>
              <div><a href="#compare" className="hover:text-[var(--color-primary-600)]">جدول مقایسه ۴ شاخص</a></div>
              <div><a href="#pricing" className="hover:text-[var(--color-primary-600)]">محاسبه‌گر هزینه چاپ و تعرفه</a></div>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-[var(--color-neutral-900)] block mb-2">امنیت و گواهی‌ها</span>
              <div className="flex items-center gap-1"><IconShieldCheck size={14} /> قرارداد عدم افشای دیتای تجاری (NDA)</div>
              <div className="flex items-center gap-1"><IconCheck size={14} /> میزبانی توزیع‌شده ابری داخل کشور</div>
              <div className="flex items-center gap-1"><IconCheck size={14} /> بدون قطعی و مستقل از فیلترشکن</div>
              <div className="flex items-center gap-1"><IconCheck size={14} /> محاسبه ریالی و پرداخت شفاف</div>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-[var(--color-neutral-900)] block mb-2">استقرار و تماس</span>
              <div>تهران، ولنجک، دانشگاه شهید بهشتی، برج فناوری · طبقه ششم</div>
              <div>تلگرام مدیریت محصول: <a href="https://t.me/shayanesfd" className="text-[var(--color-primary-600)] font-bold">@shayanesfd</a></div>
              <div className="text-[var(--color-neutral-500)]">پاسخگویی سریع ۲۴ تا ۴۸ ساعته</div>
            </div>

          </div>

          <div className="border-t border-[var(--color-neutral-200)] pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[var(--color-neutral-500)] text-[11px]">
            <div>حقوق معنوی و تجاری رُخ‌نما محفوظ است · ۱۴۰۳ - ۱۴۰۴</div>
            <div>همکاری و استقرار: مرکز تحقیق و نوآوری همراه اول (MCI)</div>
          </div>
        </footer>

      </div>
    </section>
  );
}
