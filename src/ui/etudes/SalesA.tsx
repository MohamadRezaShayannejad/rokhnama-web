'use client';

import { useState } from 'react';
import {
  IconUsers,
  IconBuildingStore,
  IconUser,
  IconShieldCheck,
  IconLock,
  IconBuildingWarehouse,
  IconDatabase,
  IconClock,
  IconCheck,
  IconFileInvoice,
  IconChartDots,
  IconSparkles,
} from '@tabler/icons-react';
import { Button } from '@/ui/Button';

/* تبدیل ارقام انگلیسی به فارسی */
const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const toFa = (input: string | number) =>
  String(input).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);

type RoleKey = 'kharidar' | 'namayande' | 'hamkar';

interface RoleConfig {
  key: RoleKey;
  title: string;
  subtitle: string;
  badge: string;
  unitPrice: number;
  discountPercent: number;
  minOrder: number;
  warehouseAllocation: string;
  requiresOtp: boolean;
  note: string;
}

const ROLES: RoleConfig[] = [
  {
    key: 'kharidar',
    title: 'خریدار',
    subtitle: 'قیمت مصوب مصرف‌کننده و سفارش مستقیم',
    badge: 'مرور آزاد',
    unitPrice: 32500000,
    discountPercent: 0,
    minOrder: 1,
    warehouseAllocation: 'تحویل فوری از انبار مرکزی',
    requiresOtp: false,
    note: 'قیمت مصوب شرکتی همراه با مشخصات کامل فنی و ابعاد.',
  },
  {
    key: 'namayande',
    title: 'نماینده',
    subtitle: 'لیست قیمت منطقه‌ای و سهمیه استانی',
    badge: '۲۰٪ تخفیف شبکه',
    unitPrice: 26000000,
    discountPercent: 20,
    minOrder: 5,
    warehouseAllocation: 'سهمیه تخصیص استانی (۵۰ دستگاه)',
    requiresOtp: false,
    note: 'نمایندگان رسمی استان قیمت و سهمیه انبار مجاز خود را مشاهده می‌کنند.',
  },
  {
    key: 'hamkar',
    title: 'همکار',
    subtitle: 'قیمت همکاری عمده و تخفیف تیراژ سازمانی',
    badge: '۳۰٪ تخفیف همکاری',
    unitPrice: 22750000,
    discountPercent: 30,
    minOrder: 10,
    warehouseAllocation: 'رزرو مستقیم خط تولید',
    requiresOtp: true,
    note: 'دسترسی به تخفیف همکاری پس از احراز شماره تماس با پیامک فعال می‌شود.',
  },
];

export default function SalesA() {
  const [activeRoleKey, setActiveRoleKey] = useState<RoleKey>('hamkar');
  const [phone, setPhone] = useState('۰۹۱۲۳۴۵۶۷۸۹');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('۵۸۲۴');
  const [verified, setVerified] = useState(false);
  const [leadRegistered, setLeadRegistered] = useState(false);
  const [orderIssued, setOrderIssued] = useState(false);
  const timeRemaining = '۰۱:۴۵';

  const activeRole = ROLES.find((r) => r.key === activeRoleKey) || ROLES[0];
  const isLocked = activeRole.requiresOtp && !verified;

  const handleSendOtp = () => {
    setOtpSent(true);
    setVerified(false);
    setLeadRegistered(false);
    setOrderIssued(false);
  };

  const handleVerifyOtp = () => {
    setVerified(true);
    setLeadRegistered(true);
    setOrderIssued(true);
  };

  const handleResetVerification = () => {
    setOtpSent(false);
    setVerified(false);
    setLeadRegistered(false);
    setOrderIssued(false);
  };

  return (
    <section
      dir="rtl"
      className="relative w-full bg-[var(--bg-neutral-base)] text-[var(--text-neutral-strong)] py-20 px-4 sm:px-6 lg:px-12 border-b border-[var(--border-neutral-base)]"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* ۱. هدر سکشن با تیتر و زیرتیتر رسمی معماری اطلاعات */}
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

        {/* ۲. کنسول تعاملی ۳ نقشی و زنجیرهٔ احراز پیامکی */}
        <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-surface)] shadow-none">
          {/* نوار بالایی کنسول با خطوط هیرلاین مهندسی */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)] px-6 py-4 gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[var(--color-primary-600)] inline-block" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-neutral-subtle)] block">
                  کنسول تعاملی دسترسی و قیمت‌گذاری
                </span>
                <span className="text-sm font-bold text-[var(--text-neutral-strong)]">
                  سوییچ ۳ نقش: خریدار، نماینده و همکار تجاری
                </span>
              </div>
            </div>

            {/* تب‌های نقش‌محور شارپ */}
            <div className="inline-flex border border-[var(--border-neutral-base)] bg-white p-1">
              {ROLES.map((role) => {
                const isSelected = activeRoleKey === role.key;
                return (
                  <button
                    key={role.key}
                    type="button"
                    onClick={() => setActiveRoleKey(role.key)}
                    className={`px-4 py-2 text-xs font-bold transition-colors rounded-none flex items-center gap-2 ${
                      isSelected
                        ? 'bg-[var(--color-primary-600)] text-white'
                        : 'text-[var(--text-neutral-base)] hover:bg-[var(--bg-neutral-subtle)]'
                    }`}
                  >
                    {role.key === 'kharidar' && <IconUser size={14} stroke={2.2} />}
                    {role.key === 'namayande' && <IconBuildingStore size={14} stroke={2.2} />}
                    {role.key === 'hamkar' && <IconUsers size={14} stroke={2.2} />}
                    <span>{role.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* بدنه کنسول: دو ستونه در دسکتاپ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x lg:divide-x-reverse divide-[var(--border-neutral-base)]">
            {/* ستون راست: کارت مشخصات محصول صنعتی و قیمت به‌روز نقش */}
            <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-neutral-subtle)] pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-[var(--color-primary-600)] bg-[var(--bg-primary-soft)] px-2 py-0.5 border border-[var(--border-primary-soft)] inline-block mb-1">
                    کد قطعه: EM-3150-HD
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--text-neutral-strong)]">
                    الکتروموتور سه‌فاز صنعتی ۱۵ کیلووات پوسته چدن
                  </h3>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-[var(--text-neutral-subtle)] block">نقش جاری:</span>
                  <span className="text-sm font-bold text-[var(--color-primary-700)]">
                    {activeRole.title} ({activeRole.badge})
                  </span>
                </div>
              </div>

              {/* مشخصات مهندسی در جدول هیرلاین */}
              <div className="border border-[var(--border-neutral-base)] text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-x-reverse divide-[var(--border-neutral-base)] border-b border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)] font-bold text-[var(--text-neutral-subtle)] p-2.5">
                  <div>توان نامی</div>
                  <div className="pr-2">سرعت دوران</div>
                  <div className="pr-2">کلاس عایقی</div>
                  <div className="pr-2">موجودی انبار</div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-x-reverse divide-[var(--border-neutral-base)] p-2.5 font-medium text-[var(--text-neutral-strong)]">
                  <div>۱۵ کیلووات (۲۰ اسب)</div>
                  <div className="pr-2">۱۴۵۰ دور در دقیقه</div>
                  <div className="pr-2">Class F (حفاظت IP55)</div>
                  <div className="pr-2 text-[var(--color-success-700)] font-bold">۲۴ دستگاه آماده تحویل</div>
                </div>
              </div>

              {/* باکس قیمت دینامیک وابسته به نقش */}
              <div
                className={`p-6 border transition-all ${
                  isLocked
                    ? 'border-[var(--color-warning-500)] bg-[var(--bg-warning-subtle)]'
                    : 'border-[var(--color-primary-500)] bg-[var(--bg-primary-subtle)]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[var(--text-neutral-subtle)] block">
                      {activeRole.subtitle}
                    </span>
                    <div className="flex items-baseline gap-2">
                      {isLocked ? (
                        <div className="flex items-center gap-2 text-[var(--color-warning-700)]">
                          <IconLock size={22} stroke={2.2} />
                          <span className="text-xl sm:text-2xl font-black">
                            {toFa(activeRole.unitPrice.toLocaleString('fa-IR'))} ریال
                          </span>
                        </div>
                      ) : (
                        <span className="text-2xl sm:text-3xl font-black text-[var(--color-primary-950)]">
                          {toFa(activeRole.unitPrice.toLocaleString('fa-IR'))} ریال
                        </span>
                      )}
                      <span className="text-xs text-[var(--text-neutral-subtle)]">به‌ازای هر دستگاه</span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-r border-[var(--border-neutral-base)] pt-3 sm:pt-0 sm:pr-4 space-y-1">
                    <div className="text-xs font-medium text-[var(--text-neutral-subtle)]">
                      حداقل سفارش: <span className="font-bold text-[var(--text-neutral-strong)]">{toFa(activeRole.minOrder)} دستگاه</span>
                    </div>
                    <div className="text-xs font-medium text-[var(--text-neutral-subtle)]">
                      تخصیص انبار: <span className="font-bold text-[var(--color-primary-800)]">{activeRole.warehouseAllocation}</span>
                    </div>
                  </div>
                </div>

                {isLocked && (
                  <div className="mt-4 pt-3 border-t border-[var(--color-warning-200)] flex items-center gap-2 text-xs font-bold text-[var(--color-warning-800)]">
                    <IconLock size={16} stroke={2.2} className="shrink-0" />
                    <span>
                      قیمت همکاری برای این کالا قفل است. شماره تماس خود را در پنل روبرو تأیید کنید تا دسترسی باز شود.
                    </span>
                  </div>
                )}

                {!isLocked && activeRole.key === 'hamkar' && verified && (
                  <div className="mt-4 pt-3 border-t border-[var(--color-primary-200)] flex items-center gap-2 text-xs font-bold text-[var(--color-success-700)]">
                    <IconShieldCheck size={16} stroke={2.2} className="shrink-0" />
                    <span>احراز پیامکی با موفقیت انجام شد؛ ۳۰٪ تخفیف همکاری روی برگ سفارش اعمال گردید.</span>
                  </div>
                )}
              </div>

              {/* یادداشت توضیحی نقش */}
              <p className="text-xs text-[var(--text-neutral-subtle)] leading-relaxed">
                {activeRole.note}
              </p>
            </div>

            {/* ستون چپ: زنجیره احراز پیامکی و ثبت سرنخ در CRM */}
            <div className="lg:col-span-5 p-6 sm:p-8 bg-[var(--bg-neutral-subtle)] space-y-6">
              <div className="border-b border-[var(--border-neutral-base)] pb-3">
                <span className="text-xs font-bold text-[var(--color-primary-700)] uppercase block mb-1">
                  زنجیرهٔ احراز پیامکی و صدور سفارش
                </span>
                <h4 className="text-base font-bold text-[var(--text-neutral-strong)]">
                  تأیید شماره تماس و ثبت مستقیم در CRM
                </h4>
              </div>

              {/* گام‌های زنجیره */}
              <div className="space-y-4">
                {/* گام ۱: شماره همراه */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[var(--text-neutral-strong)] block">
                    ۱. شماره تماس خریدار / همکار
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      dir="ltr"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={otpSent && verified}
                      className="w-full h-[44px] px-3 bg-white border border-[var(--border-neutral-base)] text-sm font-mono font-bold text-center focus:border-[var(--color-primary-600)] focus:outline-none rounded-none disabled:bg-neutral-100"
                    />
                    {!otpSent ? (
                      <Button
                        size="sm"
                        color="primary"
                        paperFold={false}
                        onClick={handleSendOtp}
                        className="shrink-0"
                      >
                        ارسال پیامک
                      </Button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResetVerification}
                        className="text-xs text-[var(--color-primary-600)] underline px-2 shrink-0 font-medium"
                      >
                        ویرایش شماره
                      </button>
                    )}
                  </div>
                </div>

                {/* گام ۲: کد تأیید پیامک */}
                {otpSent && !verified && (
                  <div className="p-4 border border-[var(--border-neutral-base)] bg-white space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[var(--text-neutral-strong)]">
                        ۲. ورود کد یک‌بارمصرف پیامکی
                      </span>
                      <span className="font-mono text-[var(--text-neutral-subtle)] flex items-center gap-1">
                        <IconClock size={14} stroke={2.2} />
                        {timeRemaining}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        dir="ltr"
                        maxLength={4}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="w-full h-[44px] px-3 bg-white border border-[var(--color-primary-500)] text-center text-lg font-mono font-black tracking-widest focus:outline-none rounded-none"
                      />
                      <Button
                        size="sm"
                        color="secondary"
                        paperFold={false}
                        onClick={handleVerifyOtp}
                        className="shrink-0"
                      >
                        تأیید کد
                      </Button>
                    </div>

                    <p className="text-[11px] text-[var(--text-neutral-subtle)]">
                      کد آزمایشی برای بررسی: <strong className="font-mono text-[var(--color-primary-700)]">۵۸۲۴</strong>
                    </p>
                  </div>
                )}

                {/* گام ۳: وضعیت اتصال به CRM و صدور برگ سفارش */}
                <div className="border border-[var(--border-neutral-base)] bg-white p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-[var(--border-neutral-subtle)] pb-2">
                    <span className="text-xs font-bold text-[var(--text-neutral-strong)] flex items-center gap-1.5">
                      <IconDatabase size={16} stroke={2.2} className="text-[var(--color-primary-600)]" />
                      همگام‌سازی لحظه‌ای با سیستم‌های سازمان
                    </span>
                    <span className="text-[11px] font-mono font-bold text-[var(--color-success-700)] bg-[var(--bg-success-subtle)] px-2 py-0.5">
                      اتصال فعال
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-[var(--border-neutral-subtle)]">
                      <span className="text-[var(--text-neutral-subtle)]">ثبت سرنخ در CRM:</span>
                      <span className="font-bold text-[var(--text-neutral-strong)] flex items-center gap-1">
                        {leadRegistered ? (
                          <>
                            <IconCheck size={14} stroke={3} className="text-[var(--color-success-600)]" />
                            ثبت شد (کد پیگیری: {toFa('۹۸۲۱')})
                          </>
                        ) : (
                          'در انتظار تأیید پیامک'
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-[var(--border-neutral-subtle)]">
                      <span className="text-[var(--text-neutral-subtle)]">موجودی انبار مرکزی:</span>
                      <span className="font-bold text-[var(--text-neutral-strong)]">
                        {toFa(24)} دستگاه (موجود)
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1">
                      <span className="text-[var(--text-neutral-subtle)]">زمان صدور برگ سفارش:</span>
                      <span className="font-mono font-bold text-[var(--color-primary-700)]">
                        کمتر از {toFa(30)} ثانیه
                      </span>
                    </div>
                  </div>

                  {orderIssued && (
                    <div className="pt-2">
                      <Button
                        size="sm"
                        color="primary"
                        fullWidth
                        paperFold={false}
                        iconAfter={<IconFileInvoice size={18} stroke={2.2} />}
                      >
                        صدور خودکار برگ سفارش استاندارد A4
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ۳. سه بلوک فشرده زیرین (دقیقاً طبق سند مصوب معماری اطلاعات) */}
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
