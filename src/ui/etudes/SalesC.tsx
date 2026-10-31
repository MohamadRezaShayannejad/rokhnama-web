'use client';

import { useState, useEffect } from 'react';
import {
  IconChartDots,
  IconClock,
  IconPlayerPlay,
  IconPlayerPause,
  IconRotateClockwise,
  IconFileInvoice,
  IconBuildingWarehouse,
  IconDatabase,
  IconSparkles,
  IconCircleCheck,
  IconPhoneCall,
  IconRoute,
  IconActivity,
} from '@tabler/icons-react';
import { Button } from '@/ui/Button';

/* تبدیل ارقام انگلیسی به فارسی */
const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const toFa = (input: string | number) =>
  String(input).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);

interface TimelineEvent {
  id: number;
  timestamp: string;
  seconds: number;
  title: string;
  category: 'navigation' | 'dwell' | 'action' | 'sync';
  dwellSeconds?: number;
  productCode?: string;
  description: string;
  crmInsight: string;
  isHighInterest?: boolean;
}

const EVENTS: TimelineEvent[] = [
  {
    id: 1,
    timestamp: '۰۰:۰۲',
    seconds: 2,
    title: 'ورود خریدار با لینک اختصاصی',
    category: 'navigation',
    description: 'باز شدن کاتالوگ صنعتی از طریق لینک ارسالی تیم فروش به مدیر تدارکات شرکت پارس.',
    crmInsight: 'سرنخ بازگشتی از جلسه مذاکره اولیه نمایشگاه صنعت.',
  },
  {
    id: 2,
    timestamp: '۰۰:۳۸',
    seconds: 38,
    title: 'مکث روی جدول مشخصات فنی پمپ هیدرولیک',
    category: 'dwell',
    dwellSeconds: 54,
    productCode: 'HP-400-HD',
    isHighInterest: true,
    description: 'خریدار پاپ‌آپ ابعاد و دیاگرام فشار پمپ کد HP-400 را باز کرده و ۵۴ ثانیه بررسی کرد.',
    crmInsight: 'تمرکز اصلی خریدار روی دبی خروجی و فشار نامی ۲۵۰ بار است.',
  },
  {
    id: 3,
    timestamp: '۰۱:۳۲',
    seconds: 92,
    title: 'مشاهده مشخصات گیربکس صنعتی و بررسی واریانت‌ها',
    category: 'dwell',
    dwellSeconds: 28,
    productCode: 'GB-4200',
    description: 'مقایسه نسبت تبدیل گیربکس خورشیدی با دور خروجی الکتروموتور.',
    crmInsight: 'نیاز به خرید بسته‌ای (پمپ به همراه گیربکس مکمل).',
  },
  {
    id: 4,
    timestamp: '۰۲:۰۰',
    seconds: 120,
    title: 'بررسی قیمت همکاری و بازگشت از مسیر رهاشده',
    category: 'action',
    dwellSeconds: 19,
    description: 'خریدار روی قیمت همکاری توقف کرد، ابتدا صفحه را بست اما ظرف ۱۰ ثانیه به برگ سفارش بازگشت.',
    crmInsight: 'حساسیت بالا به درصد تخفیف همکاری تیراژ سازمانی.',
  },
  {
    id: 5,
    timestamp: '۰۲:۱۹',
    seconds: 139,
    title: 'اعتبارسنجی پیامکی و تکمیل شماره تماس',
    category: 'action',
    description: 'ورود شماره ۰۹۱۲۳۴۵۶۷۸۹ و تأیید با پیامک یک‌بارمصرف در ۱۲ ثانیه.',
    crmInsight: 'تأیید هویت قطعی مدیر تدارکات؛ شماره ثبت‌شده معتبر است.',
  },
  {
    id: 6,
    timestamp: '۰۲:۴۵',
    seconds: 165,
    title: 'صدور برگ سفارش A4 و ثبت لحظه‌ای در CRM',
    category: 'sync',
    description: 'صدور پیش‌فاکتور رسمی به ارزش ۳۹۳ میلیون ریال و ثبت سرنخ برای پیگیری تلفنی.',
    crmInsight: 'ثبت آماده پیگیری؛ اولویت تماس: معرفی گارانتی پمپ کد HP-400.',
  },
];

export default function SalesC() {
  const [activeStep, setActiveStep] = useState<number>(5);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<'all' | 'highInterest'>('all');

  // کنترل پخش زنده رویدادهای تایم‌لاین خریدار
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= EVENTS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleTogglePlay = () => {
    if (activeStep >= EVENTS.length - 1) {
      setActiveStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveStep(EVENTS.length - 1);
  };

  const filteredEvents =
    filterType === 'highInterest'
      ? EVENTS.filter((e) => e.isHighInterest || e.category === 'sync')
      : EVENTS;

  const currentEvent = EVENTS[activeStep] || EVENTS[0];

  return (
    <section
      dir="rtl"
      className="relative w-full bg-[var(--bg-neutral-base)] text-[var(--text-neutral-strong)] py-20 px-4 sm:px-6 lg:px-12 border-b border-[var(--border-neutral-base)]"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* ۱. هدر رسمی سکشن طبق سند معماری اطلاعات */}
        <div className="space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-primary-soft)] border border-[var(--border-primary-soft)] text-xs font-bold text-[var(--color-primary-700)] rounded-none">
            <IconSparkles size={14} stroke={2.2} />
            <span>بخش ۰۵ · موتور فروش و تحلیل رفتار</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--color-primary-950)] leading-tight tracking-tight">
            کاتالوگی که می‌فروشد؛ داده‌ای که سازمان را تغذیه می‌کند
          </h2>

          <p className="text-base sm:text-lg text-[var(--text-neutral-base)] leading-relaxed font-normal">
            تبدیل هر تعامل خریدار به دیتای زنده برای تیم‌های فروش، مارکتینگ و انبار.
          </p>
        </div>

        {/* ۲. کنسول تایم‌لاین مهندسی و پایشگر مدت مکث */}
        <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-surface)]">
          {/* نوار ابزار بالای کنسول */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)] px-6 py-4 gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[var(--color-primary-600)] inline-block" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-neutral-subtle)] block">
                  پایشگر زنده رفتار خریدار (Dwell Time Monitor)
                </span>
                <span className="text-sm font-bold text-[var(--text-neutral-strong)]">
                  ثبت نقاط توقف، کالاهای پرتوجه و توصیه‌های پیگیری تیم فروش
                </span>
              </div>
            </div>

            {/* کنترل‌های تعاملی تایم‌لاین */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex border border-[var(--border-neutral-base)] bg-white p-0.5">
                <button
                  type="button"
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1 text-xs font-bold rounded-none ${
                    filterType === 'all'
                      ? 'bg-[var(--color-primary-600)] text-white'
                      : 'text-[var(--text-neutral-base)] hover:bg-[var(--bg-neutral-subtle)]'
                  }`}
                >
                  همه رویدادها ({toFa(EVENTS.length)})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('highInterest')}
                  className={`px-3 py-1 text-xs font-bold rounded-none ${
                    filterType === 'highInterest'
                      ? 'bg-[var(--color-primary-600)] text-white'
                      : 'text-[var(--text-neutral-base)] hover:bg-[var(--bg-neutral-subtle)]'
                  }`}
                >
                  کالاهای پرتوجه
                </button>
              </div>

              <Button
                size="sm"
                color="primary"
                paperFold={false}
                onClick={handleTogglePlay}
                iconBefore={
                  isPlaying ? (
                    <IconPlayerPause size={16} stroke={2.2} />
                  ) : (
                    <IconPlayerPlay size={16} stroke={2.2} />
                  )
                }
              >
                {isPlaying ? 'توقف پخش' : 'شبیه‌سازی جلسه خرید'}
              </Button>

              <Button
                size="sm"
                variant="outline"
                color="primary"
                paperFold={false}
                onClick={handleReset}
                iconBefore={<IconRotateClockwise size={16} stroke={2.2} />}
              >
                بازنشانی
              </Button>
            </div>
          </div>

          {/* بدنه کنسول: دو ستونه (ستون راست: تایم‌لاین خطی مهندسی / ستون چپ: پنل اتصال سرنخ به CRM و انبار) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-[var(--border-neutral-base)]">
            {/* ستون راست: تایم‌لاین رویدادهای زنده با نشانگرهای مدت مکث */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--border-neutral-subtle)] pb-3">
                <div className="flex items-center gap-2">
                  <IconRoute size={18} stroke={2.2} className="text-[var(--color-primary-600)]" />
                  <span className="text-sm font-bold text-[var(--text-neutral-strong)]">
                    مسیر گام‌به‌گام جلسه خرید · جلسه شماره ROKH-SES-489
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[var(--text-neutral-subtle)]">
                  مدت کل: {toFa('۰۲:۴۵')} دقیقه
                </span>
              </div>

              {/* لیست رویدادهای تایم‌لاین با خطوط اتصال هیرلاین ۱px */}
              <div className="relative pr-4 space-y-6 before:absolute before:top-2 before:bottom-2 before:right-[7px] before:w-[2px] before:bg-[var(--border-neutral-subtle)]">
                {filteredEvents.map((evt) => {
                  const isPassed = activeStep >= evt.id - 1;
                  const isCurrent = activeStep === evt.id - 1;

                  return (
                    <div
                      key={evt.id}
                      onClick={() => setActiveStep(evt.id - 1)}
                      className={`relative cursor-pointer transition-all ${
                        isCurrent
                          ? 'opacity-100 scale-[1.01]'
                          : isPassed
                          ? 'opacity-90'
                          : 'opacity-40'
                      }`}
                    >
                      {/* نقطه گره تایم‌لاین روی خط عمودی */}
                      <span
                        className={`absolute -right-[15px] top-1.5 w-3.5 h-3.5 border-2 rounded-none transition-colors ${
                          isCurrent
                            ? 'bg-[var(--color-primary-600)] border-[var(--color-primary-800)] ring-4 ring-[var(--bg-primary-soft)]'
                            : isPassed
                            ? 'bg-white border-[var(--color-primary-600)]'
                            : 'bg-white border-[var(--border-neutral-base)]'
                        }`}
                      />

                      {/* کادر اطلاعات رویداد */}
                      <div
                        className={`p-4 border transition-all ${
                          isCurrent
                            ? 'border-[var(--color-primary-500)] bg-[var(--bg-primary-subtle)] shadow-xs'
                            : 'border-[var(--border-neutral-base)] bg-white hover:bg-[var(--bg-neutral-subtle)]'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold px-1.5 py-0.5 bg-[var(--color-neutral-200)] text-[var(--color-neutral-800)]">
                              {evt.timestamp}
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold text-[var(--text-neutral-strong)]">
                              {evt.title}
                            </h4>
                          </div>

                          {/* نشانگر مدت توقف (Dwell Time Badge) */}
                          {evt.dwellSeconds && (
                            <div className="flex items-center gap-1 text-xs font-mono font-bold text-[var(--color-primary-800)] bg-white px-2 py-0.5 border border-[var(--border-neutral-base)] shrink-0">
                              <IconClock size={13} stroke={2.2} />
                              <span>توقف: {toFa(evt.dwellSeconds)} ثانیه</span>
                              {evt.isHighInterest && (
                                <span className="text-[10px] font-bold text-[var(--color-warning-700)] mr-1">
                                  (کالای پرتوجه)
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        <p className="text-xs text-[var(--text-neutral-base)] leading-relaxed">
                          {evt.description}
                        </p>

                        {evt.productCode && (
                          <div className="mt-2 flex items-center gap-2 text-[11px] font-mono text-[var(--color-primary-700)]">
                            <span className="font-bold">کد کالای انتخابی:</span>
                            <span className="bg-white px-1.5 py-0.2 border border-[var(--border-neutral-base)]">
                              {evt.productCode}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ستون چپ: پنل تحلیل رفتار، هوش تیم فروش و اتصال به CRM */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[var(--bg-neutral-subtle)] space-y-6">
              {/* کارت تحلیل بلادرنگ برای سرپرست فروش */}
              <div className="border border-[var(--border-neutral-base)] bg-white p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--border-neutral-subtle)] pb-3">
                  <div className="flex items-center gap-2">
                    <IconActivity size={18} stroke={2.2} className="text-[var(--color-primary-600)]" />
                    <span className="text-xs font-bold text-[var(--color-primary-800)] uppercase">
                      هوش عملیاتی برای تیم فروش
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[var(--color-success-700)] bg-[var(--bg-success-subtle)] px-2 py-0.5">
                    سرنخ داغ (امتیاز: {toFa(85)}/۱۰۰)
                  </span>
                </div>

                {/* توصیه طلایی به تیم فروش مبتنی بر نقطه توقف */}
                <div className="p-3.5 border-r-4 border-[var(--color-primary-600)] bg-[var(--bg-primary-soft)] space-y-1.5">
                  <span className="text-xs font-bold text-[var(--color-primary-950)] block flex items-center gap-1.5">
                    <IconPhoneCall size={15} stroke={2.2} className="text-[var(--color-primary-700)]" />
                    توصیهٔ آغاز تماس برای کارشناس فروش:
                  </span>
                  <p className="text-xs text-[var(--text-neutral-strong)] leading-relaxed font-medium">
                    «خریدار ۵۴ ثانیه روی دیاگرام دبی و فشار پمپ هیدرولیک (کد HP-400) مکث داشته است. در تماس پیگیری، مکالمه را مستقیم از تست فشار و گارانتی این کالا شروع کنید.»
                  </p>
                </div>

                {/* تحلیل رویداد انتخابی فعلی */}
                <div className="space-y-2 text-xs border-t border-[var(--border-neutral-subtle)] pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-neutral-subtle)]">رویداد در حال بررسی:</span>
                    <strong className="text-[var(--text-neutral-strong)]">{currentEvent.title}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-neutral-subtle)]">تحلیل ثبت‌شده در CRM:</span>
                    <strong className="text-[var(--color-primary-700)] text-left">{currentEvent.crmInsight}</strong>
                  </div>
                </div>
              </div>

              {/* همگام‌سازی مستقیم با انبار و CRM سازمان */}
              <div className="border border-[var(--border-neutral-base)] bg-white p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--border-neutral-subtle)] pb-3">
                  <div className="flex items-center gap-2">
                    <IconDatabase size={18} stroke={2.2} className="text-[var(--color-primary-600)]" />
                    <span className="text-xs font-bold text-[var(--text-neutral-strong)]">
                      اتصال مستقیم به انبار و CRM
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[var(--text-neutral-subtle)]">
                    SYNC STATUS: 200 OK
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)] space-y-1">
                    <div className="flex items-center justify-between font-bold text-[var(--text-neutral-strong)]">
                      <span className="flex items-center gap-1.5">
                        <IconCircleCheck size={16} stroke={2.5} className="text-[var(--color-success-600)]" />
                        ثبت خودکار سرنخ در CRM
                      </span>
                      <span className="font-mono text-[var(--color-primary-700)]">CRM-LEAD-8841</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-neutral-subtle)]">
                      اختصاص به کارشناس تجهیزات هیدرولیک · همراه با بازپخش کامل مسیر توقف‌ها.
                    </p>
                  </div>

                  <div className="p-3 border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)] space-y-1">
                    <div className="flex items-center justify-between font-bold text-[var(--text-neutral-strong)]">
                      <span className="flex items-center gap-1.5">
                        <IconBuildingWarehouse size={16} stroke={2.2} className="text-[var(--color-primary-700)]" />
                        وضعیت انبار و پیش‌بینی تقاضا
                      </span>
                      <span className="text-[var(--color-success-700)]">۱۸ عدد موجود در انبار</span>
                    </div>
                    <p className="text-[11px] text-[var(--text-neutral-subtle)]">
                      رزرو موقت ۴۸ ساعته جهت جلوگیری از پیش‌فروش همزمان اقلام پرتقاضا.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    size="sm"
                    color="primary"
                    fullWidth
                    paperFold={false}
                    iconAfter={<IconFileInvoice size={18} stroke={2.2} />}
                  >
                    صدور برگ سفارش A4 برای این سرنخ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ۳. سه بلوک فشرده زیرین (دقیقاً بر اساس سند مصوب معماری اطلاعات) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[var(--border-neutral-base)]">
          {/* بلوک ۱ */}
          <div className="p-6 border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-surface)] space-y-3">
            <div className="w-10 h-10 bg-[var(--bg-primary-soft)] border border-[var(--border-primary-soft)] flex items-center justify-center text-[var(--color-primary-600)]">
              <IconFileInvoice size={22} stroke={2.2} />
            </div>
            <h4 className="text-base font-bold text-[var(--text-neutral-strong)]">
              ۱. موتور فروش و صدور سفارش در ۳۰ ثانیه
            </h4>
            <p className="text-xs leading-relaxed text-[var(--text-neutral-base)]">
              قیمت‌گذاری چندسطحی بر اساس نقش (همکار / نماینده / خریدار)، تأیید شماره تماس با پیامک و صدور خودکار برگ سفارش استاندارد A4.
            </p>
          </div>

          {/* بلوک ۲ */}
          <div className="p-6 border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-surface)] space-y-3">
            <div className="w-10 h-10 bg-[var(--bg-primary-soft)] border border-[var(--border-primary-soft)] flex items-center justify-center text-[var(--color-primary-600)]">
              <IconChartDots size={22} stroke={2.2} />
            </div>
            <h4 className="text-base font-bold text-[var(--text-neutral-strong)]">
              ۲. استخراج رفتار بازار برای تیم مارکتینگ و فروش
            </h4>
            <p className="text-xs leading-relaxed text-[var(--text-neutral-base)]">
              ثبت دقیق نقاط توقف، کالاهای پرتوجه و مسیرهای رهاشده؛ تیم فروش دقیقاً می‌داند خریدار کجا مکث کرده.
            </p>
          </div>

          {/* بلوک ۳ */}
          <div className="p-6 border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-surface)] space-y-3">
            <div className="w-10 h-10 bg-[var(--bg-primary-soft)] border border-[var(--border-primary-soft)] flex items-center justify-center text-[var(--color-primary-600)]">
              <IconBuildingWarehouse size={22} stroke={2.2} />
            </div>
            <h4 className="text-base font-bold text-[var(--text-neutral-strong)]">
              ۳. اتصال مستقیم به انبار و CRM سازمان
            </h4>
            <p className="text-xs leading-relaxed text-[var(--text-neutral-base)]">
              ثبت خودکار سرنخ در CRM، پیش‌بینی تقاضای بازار و توقف خودکار نمایش اقلام ناموجود.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
