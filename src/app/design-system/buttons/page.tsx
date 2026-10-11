"use client"

import React, { useState } from 'react';
import { Button } from '../../../ui/Button';
import { IconArrowLeft, IconFileText, IconSend, IconDownload } from '@tabler/icons-react';

/**
 * دکمه تعاملی برای شوکیس: با کلیک کاربر به آرامی و با وقار وارد حالت لودینگ می‌شود
 */
function InteractiveShowcaseButton({
  children,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const [loading, setLoading] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.variant !== "text" && !props.disabled && !props.loading) {
      setLoading(true);
      setTimeout(() => setLoading(false), 2600);
    }
    onClick?.(e);
  };

  return (
    <Button {...props} loading={loading || props.loading} onClick={handleClick}>
      {children}
    </Button>
  );
}

export default function ButtonShowcase() {
  const colors = [
    { id: 'primary', label: 'پرایمری (Primary)', desc: 'اقدام‌های اصلی محصول مثل درخواست دمو و استعلام' },
    { id: 'secondary', label: 'سکندری (Secondary)', desc: 'اقدام‌های مکمل مثل مقایسه با کاتالوگ کاغذی و مشاهده نمونه' },
    { id: 'white', label: 'سفید (White)', desc: 'مخصوص سطوح و کانتینرهای تیره پلتفرم' },
    { id: 'success', label: 'موفقیت (Success)', desc: 'تأیید نهایی، صدور پیش‌فاکتور و ثبت موفق سفارش' },
    { id: 'warning', label: 'هشدار (Warning)', desc: 'پایان اعتبار استعلام، تغییر لحظه‌ای موجودی و هشدار انبار' },
    { id: 'error', label: 'ارور (Error)', desc: 'حذف از برگ سفارش، لغو استعلام و ابطال نسخه' },
  ] as const;

  const styleRows = [
    {
      id: 'solid-fold',
      label: 'سالید با تاخوردگی (paperFold=true)',
      variant: 'solid' as const,
      paperFold: true,
      desc: 'گوشه ۸×۸ تاخورده و انیمیشن قطری ورق زدن کاغذ'
    },
    {
      id: 'solid-plain',
      label: 'سالید ساده (paperFold=false)',
      variant: 'solid' as const,
      paperFold: false,
      desc: 'بدون مثلث؛ انیمیشن هاور دقیقاً مشابه اوتلاین با گسترش از محل موس'
    },
    {
      id: 'outline',
      label: 'اوتلاین (Outline)',
      variant: 'outline' as const,
      paperFold: false,
      desc: 'حاشیه ۲ پیکسلی با انیمیشن پر شدن جهتی ماوس'
    },
    {
      id: 'text',
      label: 'متنی / لینک (Text)',
      variant: 'text' as const,
      paperFold: false,
      desc: 'خط زیرین متصل بدون لودینگ'
    },
  ];

  // کنترل‌های آیکون قبل (راست) و بعد (چپ)
  const [showIconBefore, setShowIconBefore] = useState<boolean>(true);
  const [showIconAfter, setShowIconAfter] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] p-6 md:p-12 lg:p-16" dir="rtl">
      <div className="max-w-[1440px] mx-auto space-y-12">
        {/* هدر مستندات */}
        <header className="border-b border-[var(--border-neutral-subtle)] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-primary-subtle)] text-[var(--color-primary-700)] text-xs font-bold tracking-wide">
              <span>ROKHNAMA DESIGN SYSTEM</span>
              <span>·</span>
              <span>COMPONENTS / BUTTON</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-[var(--text-neutral-strong)]">
              سیستم جامع کامپوننت دکمه
            </h1>
            <p className="text-base text-[var(--text-neutral-subtle)] max-w-2xl leading-relaxed">
              راهنمای تعاملی دکمه‌ها همراه با پشتیبانی کامل از آیکون قبل (راست) و بعد (چپ)، انیمیشن لودینگ باوقار و تم‌های سالید و اوتلاین.
            </p>
          </div>

          {/* کنترلرهای تست آیکون چپ و راست */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[var(--bg-neutral-subtle)] p-3 border border-[var(--border-neutral-subtle)]">
            <span className="text-xs font-bold text-[var(--text-neutral-strong)]">کنترل آیکون‌ها:</span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowIconBefore(!showIconBefore)}
                className={`px-3 py-1.5 text-xs font-bold transition-colors border ${
                  showIconBefore
                    ? 'bg-[var(--bg-primary-solid)] text-white border-transparent'
                    : 'bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] border-[var(--border-neutral-base)]'
                }`}
              >
                آیکون قبل / راست: {showIconBefore ? 'روشن (ON)' : 'خاموش (OFF)'}
              </button>

              <button
                onClick={() => setShowIconAfter(!showIconAfter)}
                className={`px-3 py-1.5 text-xs font-bold transition-colors border ${
                  showIconAfter
                    ? 'bg-[var(--bg-primary-solid)] text-white border-transparent'
                    : 'bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] border-[var(--border-neutral-base)]'
                }`}
              >
                آیکون بعد / چپ: {showIconAfter ? 'روشن (ON)' : 'خاموش (OFF)'}
              </button>
            </div>
          </div>
        </header>

        {/* مشخصات کلی سیستم (Key Metrics) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[var(--bg-neutral-subtle)] border border-[var(--border-neutral-subtle)] text-sm">
          <div>
            <span className="block text-xs text-[var(--text-neutral-subtle)] mb-1">Corner Radius</span>
            <span className="font-bold text-[var(--text-neutral-strong)]">0px (کاملاً تیز / Sharp)</span>
          </div>
          <div>
            <span className="block text-xs text-[var(--text-neutral-subtle)] mb-1">Icons Support</span>
            <span className="font-bold text-[var(--text-neutral-strong)]">iconBefore & iconAfter</span>
          </div>
          <div>
            <span className="block text-xs text-[var(--text-neutral-subtle)] mb-1">Standard Heights</span>
            <span className="font-bold text-[var(--text-neutral-strong)]">SM: 44px | MD: 52px | LG: 60px</span>
          </div>
          <div>
            <span className="block text-xs text-[var(--text-neutral-subtle)] mb-1">Pressed Reaction</span>
            <span className="font-bold text-[var(--text-neutral-strong)]">-0.5% Scale + 2px Shift</span>
          </div>
        </div>

        {/* بخش ویژه مقایسه مستقیم حالت‌های آیکون */}
        <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border-neutral-subtle)] pb-3">
            <h2 className="text-lg font-black text-[var(--text-neutral-strong)]">
              نمای اختصاصی چیدمان آیکون‌ها (Icons Placement Demo)
            </h2>
            <span className="text-xs text-[var(--text-neutral-subtle)] font-mono">
              iconBefore &bull; iconAfter
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {/* ۱. فقط متن */}
            <div className="p-4 bg-[var(--bg-neutral-base)] border border-[var(--border-neutral-subtle)] space-y-3">
              <span className="text-xs font-bold text-[var(--text-neutral-subtle)] block">فقط متن (Text Only)</span>
              <Button color="primary" variant="solid" size="md" className="w-full">
                ثبت استعلام
              </Button>
            </div>

            {/* ۲. آیکون قبل (راست) */}
            <div className="p-4 bg-[var(--bg-neutral-base)] border border-[var(--border-neutral-subtle)] space-y-3">
              <span className="text-xs font-bold text-[var(--text-neutral-subtle)] block">آیکون قبل (iconBefore)</span>
              <Button color="primary" variant="solid" size="md" iconBefore={<IconFileText />} className="w-full">
                ثبت استعلام
              </Button>
            </div>

            {/* ۳. آیکون بعد (چپ) */}
            <div className="p-4 bg-[var(--bg-neutral-base)] border border-[var(--border-neutral-subtle)] space-y-3">
              <span className="text-xs font-bold text-[var(--text-neutral-subtle)] block">آیکون بعد (iconAfter)</span>
              <Button color="primary" variant="solid" size="md" iconAfter={<IconArrowLeft />} className="w-full">
                ثبت استعلام
              </Button>
            </div>

            {/* ۴. هر دو آیکون */}
            <div className="p-4 bg-[var(--bg-neutral-base)] border border-[var(--border-neutral-subtle)] space-y-3">
              <span className="text-xs font-bold text-[var(--text-neutral-subtle)] block">هر دو آیکون (Both Icons)</span>
              <Button color="primary" variant="solid" size="md" iconBefore={<IconFileText />} iconAfter={<IconArrowLeft />} className="w-full">
                ثبت استعلام
              </Button>
            </div>
          </div>
        </div>

        {/* ماتریس دکمه‌ها به تفکیک رنگ و استایل */}
        <div className="space-y-16">
          {colors.map((color) => {
            const isDarkContainer = color.id === 'white';
            return (
              <div
                key={color.id}
                className={`border ${isDarkContainer ? 'bg-neutral-950 border-neutral-800' : 'bg-[var(--bg-neutral-base)] border-[var(--border-neutral-subtle)]'} overflow-hidden`}
              >
                {/* تیتر پالت */}
                <div className={`p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-2 ${isDarkContainer ? 'border-neutral-800 bg-neutral-900/60' : 'border-[var(--border-neutral-subtle)] bg-[var(--bg-neutral-subtle)]/70'}`}>
                  <div>
                    <h2 className={`text-xl font-black ${isDarkContainer ? 'text-white' : 'text-[var(--text-neutral-strong)]'}`}>
                      {color.label}
                    </h2>
                    <p className={`text-xs mt-0.5 ${isDarkContainer ? 'text-neutral-400' : 'text-[var(--text-neutral-subtle)]'}`}>
                      {color.desc}
                    </p>
                  </div>
                  <code className={`text-xs px-2.5 py-1 font-mono ${isDarkContainer ? 'bg-neutral-800 text-neutral-300' : 'bg-[var(--border-neutral-subtle)] text-[var(--text-neutral-strong)]'}`}>
                    {`color="${color.id}"`}
                  </code>
                </div>

                {/* گرید مقایسه‌ای استایل‌ها، سایزها و استیت‌ها */}
                <div className="divide-y divide-[var(--border-neutral-subtle)]">
                  {styleRows.map((row) => (
                    <div
                      key={row.id}
                      className={`p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center ${isDarkContainer ? 'divide-neutral-800' : ''}`}
                    >
                      {/* ستون متاداده استایل */}
                      <div className="lg:col-span-3 space-y-1">
                        <span className={`text-sm font-bold block ${isDarkContainer ? 'text-white' : 'text-[var(--text-neutral-strong)]'}`}>
                          {row.label}
                        </span>
                        <span className={`text-xs font-mono block ${isDarkContainer ? 'text-neutral-400' : 'text-[var(--text-neutral-subtle)]'}`}>
                          {row.desc}
                        </span>
                      </div>

                      {/* ستون سایزها (با اتصال به کنترلرهای آیکون) */}
                      <div className="lg:col-span-5 flex flex-wrap items-center gap-4">
                        <InteractiveShowcaseButton
                          color={color.id}
                          variant={row.variant}
                          paperFold={row.paperFold}
                          size="sm"
                          iconBefore={showIconBefore ? <IconFileText /> : undefined}
                          iconAfter={showIconAfter ? <IconArrowLeft /> : undefined}
                        >
                          ثبت استعلام
                        </InteractiveShowcaseButton>
                        <InteractiveShowcaseButton
                          color={color.id}
                          variant={row.variant}
                          paperFold={row.paperFold}
                          size="md"
                          iconBefore={showIconBefore ? <IconSend /> : undefined}
                          iconAfter={showIconAfter ? <IconArrowLeft /> : undefined}
                        >
                          درخواست دمو
                        </InteractiveShowcaseButton>
                        <InteractiveShowcaseButton
                          color={color.id}
                          variant={row.variant}
                          paperFold={row.paperFold}
                          size="lg"
                          iconBefore={showIconBefore ? <IconDownload /> : undefined}
                          iconAfter={showIconAfter ? <IconArrowLeft /> : undefined}
                        >
                          صدور پیش‌فاکتور
                        </InteractiveShowcaseButton>
                      </div>

                      {/* ستون وضعیت‌های ثابت: لودینگ دائم و غیرفعال */}
                      <div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-3 flex-wrap">
                        {/* دکمه لودینگ دائم (فقط برای سالید و اوتلاین؛ لینک‌ها لودینگ ندارند) */}
                        {row.variant !== "text" && (
                          <Button
                            color={color.id}
                            variant={row.variant}
                            paperFold={row.paperFold}
                            size="md"
                            loading
                            iconBefore={showIconBefore ? <IconFileText /> : undefined}
                          >
                            در حال بررسی
                          </Button>
                        )}
                        <Button
                          color={color.id}
                          variant={row.variant}
                          paperFold={row.paperFold}
                          size="md"
                          disabled
                          iconBefore={showIconBefore ? <IconFileText /> : undefined}
                        >
                          تکمیل ظرفیت
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
