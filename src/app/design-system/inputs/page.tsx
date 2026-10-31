"use client"

import React, { useState } from 'react';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import { Select } from '../../../ui/Select';
import { Textarea } from '../../../ui/Textarea';
import { IconSearch, IconMail, IconUser, IconLock, IconAlertCircle, IconCircleCheck, IconEyeOff, IconInfoCircle } from '@tabler/icons-react';

// کامپوننت کمکی برای نمایش متن راهنما و کاراکتر شمار
function FieldHelper({ 
  message, 
  icon, 
  intent = "default", 
  currentLength, 
  maxLength 
}: { 
  message?: string, 
  icon?: React.ReactNode, 
  intent?: "default" | "error" | "success" | "subtle",
  currentLength?: number,
  maxLength?: number
}) {
  const intentColors = {
    default: "text-neutral-500",
    subtle: "text-neutral-400",
    error: "text-error-600",
    success: "text-success-600",
  }

  return (
    <div className="flex items-start justify-between gap-4 mt-2">
      <div className={`flex items-center gap-1.5 text-xs font-medium tracking-[-0.02em] ${intentColors[intent]}`}>
        {icon}
        {message && <span>{message}</span>}
      </div>
      {maxLength !== undefined && (
        <span className="text-xs text-neutral-400 tracking-[-0.02em]" dir="rtl">
          {String(maxLength).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)])}/{String(currentLength || 0).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)])}
        </span>
      )}
    </div>
  )
}

export default function InputShowcase() {
  const [demoText, setDemoText] = useState('سلام ۱۲۳');

  const intents = [
    { id: 'default', label: 'پیش‌فرض (Default)', desc: 'حالت عادی فیلدهای ورودی برای دریافت اطلاعات کاربر' },
    { id: 'error', label: 'ارور (Error)', desc: 'هنگام اعتبارسنجی ناموفق فرم، خالی بودن فیلد اجباری یا فرمت اشتباه' },
    { id: 'success', label: 'موفقیت (Success)', desc: 'تایید درستی اطلاعات وارد شده (مثل در دسترس بودن نام کاربری)' },
  ] as const;

  const styleRows = [
    {
      id: 'basic',
      label: 'ساده (Basic)',
      desc: 'فیلد متنی استاندارد بدون آیکون'
    },
    {
      id: 'with-start-icon',
      label: 'آیکون شروع (Start Icon)',
      desc: 'دارای آیکون راهنما در سمت راست (شروع فیلد)'
    },
    {
      id: 'with-end-icon',
      label: 'آیکون پایان (End Icon)',
      desc: 'دارای آیکون عملیاتی یا وضعیت در سمت چپ (پایان فیلد)'
    },
    {
      id: 'with-both-icons',
      label: 'دو آیکون (Both Icons)',
      desc: 'ترکیبی از آیکون راهنما و آیکون وضعیت'
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-neutral-base)] text-[var(--text-neutral-base)] p-6 md:p-12 lg:p-16" dir="rtl">
      <div className="max-w-[1440px] mx-auto space-y-12">
        {/* هدر مستندات */}
        <header className="border-b border-[var(--border-neutral-subtle)] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-primary-subtle)] text-[var(--color-primary-700)] text-xs font-bold tracking-wide">
              <span>ROKHNAMA DESIGN SYSTEM</span>
              <span>·</span>
              <span>COMPONENTS / INPUT</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-[var(--text-neutral-strong)]">
              سیستم جامع فیلد ورودی (Input)
            </h1>
            <p className="text-base text-[var(--text-neutral-subtle)] max-w-2xl leading-relaxed" style={{ fontFamily: "'Digi Almas Bold', sans-serif" }}>
              فیلدهای ورودی با حاشیه تیز (Radius: 0)، کرسر اختصاصی I-Beam کلاسیک متحرک، مخفی شدن Placeholder در زمان فوکوس و تبدیل خودکار اعداد به فارسی.
            </p>
          </div>

          <div className="text-xs text-[var(--text-neutral-subtle)] bg-[var(--bg-neutral-subtle)] p-3 border border-[var(--border-neutral-subtle)] max-w-xs">
            💡 <strong>تست زنده:</strong> اعداد انگلیسی تایپ کنید تا به صورت خودکار به فارسی (۱۲۳۴۵) تبدیل شوند.
          </div>
        </header>

        {/* مشخصات کلی سیستم (Key Metrics) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[var(--bg-neutral-subtle)] border border-[var(--border-neutral-subtle)] text-sm">
          <div>
            <span className="block text-xs text-[var(--text-neutral-subtle)] mb-1">Numbers</span>
            <span className="font-bold text-[var(--text-neutral-strong)]">Auto Persian Conversion</span>
          </div>
          <div>
            <span className="block text-xs text-[var(--text-neutral-subtle)] mb-1">Focus State</span>
            <span className="font-bold text-[var(--text-neutral-strong)]">Solid Primary Border + Hide Placeholder</span>
          </div>
          <div>
            <span className="block text-xs text-[var(--text-neutral-subtle)] mb-1">Helper</span>
            <span className="font-bold text-[var(--text-neutral-strong)]">Text + Icon + Char Count</span>
          </div>
          <div>
            <span className="block text-xs text-[var(--text-neutral-subtle)] mb-1">Layout Gap</span>
            <span className="font-bold text-[var(--text-neutral-strong)]">10px (بین لیبل و اینپوت)</span>
          </div>
        </div>

        {/* تست تعاملی تبدیل اعداد و کاراکتر شمار */}
        <section className="bg-white p-8 border border-[var(--border-neutral-subtle)] flex flex-col gap-4">
          <h2 className="text-xl font-bold">تست زنده (تبدیل اعداد و کاراکتر شمار)</h2>
          <div className="max-w-md">
            <Label htmlFor="interactive-demo">متن حاوی عدد (مثال: شماره موبایل)</Label>
            <Input 
              id="interactive-demo"
              value={demoText}
              onChange={(e) => setDemoText(e.target.value)}
              placeholder="اعداد انگلیسی تایپ کنید..."
              className="mt-2.5"
            />
            <FieldHelper 
              message="اعداد وارد شده در این فیلد به صورت درنگام به فارسی تبدیل می‌شوند." 
              icon={<IconInfoCircle className="size-4" />}
              currentLength={demoText.length}
              maxLength={100}
            />
          </div>
        </section>

        {/* ماتریس اینپوت‌ها به تفکیک استیت و استایل */}
        <div className="space-y-16">
          {intents.map((intentItem) => {
            return (
              <div
                key={intentItem.id}
                className="border bg-[var(--bg-neutral-base)] border-[var(--border-neutral-subtle)] overflow-hidden"
              >
                {/* تیتر پالت */}
                <div className="p-6 border-b flex flex-col md:flex-row md:items-center justify-between gap-2 border-[var(--border-neutral-subtle)] bg-[var(--bg-neutral-subtle)]/70">
                  <div>
                    <h2 className="text-xl font-black text-[var(--text-neutral-strong)]">
                      {intentItem.label}
                    </h2>
                    <p className="text-xs mt-0.5 text-[var(--text-neutral-subtle)]" style={{ fontFamily: "'Digi Almas Bold', sans-serif" }}>
                      {intentItem.desc}
                    </p>
                  </div>
                  <code className="text-xs px-2.5 py-1 font-mono bg-[var(--border-neutral-subtle)] text-[var(--text-neutral-strong)]">
                    {`intent="${intentItem.id}"`}
                  </code>
                </div>

                {/* گرید مقایسه‌ای استایل‌ها، سایزها و استیت‌ها */}
                <div className="divide-y divide-[var(--border-neutral-subtle)]">
                  {styleRows.map((row) => (
                    <div
                      key={row.id}
                      className="p-6 grid grid-cols-1 xl:grid-cols-12 gap-8 items-start"
                    >
                      {/* ستون متاداده استایل */}
                      <div className="xl:col-span-3 space-y-1 mt-2">
                        <span className="text-sm font-bold block text-[var(--text-neutral-strong)]">
                          {row.label}
                        </span>
                        <span className="text-xs block text-[var(--text-neutral-subtle)]" style={{ fontFamily: "'Digi Almas Bold', sans-serif" }}>
                          {row.desc}
                        </span>
                      </div>

                      {/* ستون سایزها */}
                      <div className="xl:col-span-9 flex flex-col md:flex-row items-start gap-6">
                        
                        <div className="flex flex-col w-full md:w-64">
                          <Label htmlFor={`${intentItem.id}-${row.id}-sm`} intent={intentItem.id === 'default' ? 'default' : intentItem.id} className="mb-2.5">
                            اندازه کوچک (sm)
                          </Label>
                          <Input
                            id={`${intentItem.id}-${row.id}-sm`}
                            intent={intentItem.id}
                            inputSize="sm"
                            placeholder="نام کاربری..."
                            startIcon={
                              (row.id === 'with-start-icon' || row.id === 'with-both-icons') ? <IconUser className="size-4" /> : undefined
                            }
                            endIcon={
                              (row.id === 'with-end-icon' || row.id === 'with-both-icons') ? (
                                intentItem.id === 'error' ? <IconAlertCircle className="size-4 text-error-500" /> :
                                intentItem.id === 'success' ? <IconCircleCheck className="size-4 text-success-500" /> :
                                <IconSearch className="size-4" />
                              ) : undefined
                            }
                          />
                        </div>

                        <div className="flex flex-col w-full md:w-72">
                          <Label htmlFor={`${intentItem.id}-${row.id}-md`} intent={intentItem.id === 'default' ? 'default' : intentItem.id} className="mb-2.5">
                            اندازه متوسط (md)
                          </Label>
                          <Input
                            id={`${intentItem.id}-${row.id}-md`}
                            intent={intentItem.id}
                            inputSize="md"
                            placeholder="آدرس ایمیل..."
                            startIcon={
                              (row.id === 'with-start-icon' || row.id === 'with-both-icons') ? <IconMail className="size-5" /> : undefined
                            }
                            endIcon={
                              (row.id === 'with-end-icon' || row.id === 'with-both-icons') ? (
                                intentItem.id === 'error' ? <IconAlertCircle className="size-5 text-error-500" /> :
                                intentItem.id === 'success' ? <IconCircleCheck className="size-5 text-success-500" /> :
                                <IconSearch className="size-5" />
                              ) : undefined
                            }
                          />
                          {intentItem.id === 'error' && (
                            <FieldHelper 
                              intent="error" 
                              message="این فیلد الزامی است." 
                              icon={<IconAlertCircle className="size-4" />} 
                            />
                          )}
                          {intentItem.id === 'success' && (
                            <FieldHelper 
                              intent="success" 
                              message="نام کاربری آزاد است." 
                              icon={<IconCircleCheck className="size-4" />} 
                            />
                          )}
                        </div>

                        <div className="flex flex-col w-full md:w-80">
                          <Label htmlFor={`${intentItem.id}-${row.id}-lg`} intent={intentItem.id === 'default' ? 'default' : intentItem.id} className="mb-2.5">
                            اندازه بزرگ (lg)
                          </Label>
                          <Input
                            id={`${intentItem.id}-${row.id}-lg`}
                            intent={intentItem.id}
                            inputSize="lg"
                            placeholder="جستجوی پیشرفته..."
                            startIcon={
                              (row.id === 'with-start-icon' || row.id === 'with-both-icons') ? <IconSearch className="size-6" /> : undefined
                            }
                            endIcon={
                              (row.id === 'with-end-icon' || row.id === 'with-both-icons') ? (
                                intentItem.id === 'error' ? <IconAlertCircle className="size-6 text-error-500" /> :
                                intentItem.id === 'success' ? <IconCircleCheck className="size-6 text-success-500" /> :
                                <IconCircleCheck className="size-6" />
                              ) : undefined
                            }
                          />
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* سایر حالت‌های ویژه (غیرفعال، رمز عبور، چپ‌چین) */}
          <div className="border bg-[var(--bg-neutral-base)] border-[var(--border-neutral-subtle)] overflow-hidden">
            <div className="p-6 border-b border-[var(--border-neutral-subtle)] bg-[var(--bg-neutral-subtle)]/70">
              <h2 className="text-xl font-black text-[var(--text-neutral-strong)]">حالت‌های ویژه (Special States)</h2>
              <p className="text-xs mt-0.5 text-[var(--text-neutral-subtle)]" style={{ fontFamily: "'Digi Almas Bold', sans-serif" }}>غیرفعال (با رنگ فیلد)، تنظیمات چیدمان متن (Alignment) و رمز عبور</p>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              
              <div className="flex flex-col w-full">
                <Label htmlFor="special-disabled" intent="subtle" className="mb-2.5">غیرفعال (Disabled)</Label>
                <Input 
                  id="special-disabled"
                  disabled 
                  placeholder="این فیلد قفل شده است" 
                  startIcon={<IconLock className="size-5" />} 
                />
                <FieldHelper 
                  intent="subtle" 
                  message="دسترسی مسدود شده است" 
                  icon={<IconLock className="size-4" />} 
                />
              </div>

              <div className="flex flex-col w-full">
                <Label htmlFor="special-left" className="mb-2.5">{`متن چپ‌چین (textAlign="left")`}</Label>
                <Input 
                  id="special-left"
                  textAlign="left" 
                  placeholder="09123456789" 
                  dir="ltr"
                />
                <FieldHelper 
                  message="با وجود چپ‌چین بودن، اعداد فارسی می‌مانند" 
                  icon={<IconInfoCircle className="size-4" />} 
                />
              </div>

              <div className="flex flex-col w-full">
                <Label htmlFor="special-password" required className="mb-2.5">رمز عبور (راست‌چین)</Label>
                <Input 
                  id="special-password"
                  type="password" 
                  placeholder="رمز عبور خود را وارد کنید" 
                  startIcon={<IconLock className="size-5" />}
                  endIcon={<IconEyeOff className="size-5 cursor-pointer hover:text-neutral-700" />}
                />
                <FieldHelper 
                  message="در نوع Password به صورت پیش‌فرض راست‌چین است" 
                  icon={<IconInfoCircle className="size-4" />} 
                />
              </div>

            </div>
          </div>

          {/* انتخابگر و متن بلند (Select / Textarea) */}
          <div className="border bg-[var(--bg-neutral-base)] border-[var(--border-neutral-subtle)] overflow-hidden">
            <div className="p-6 border-b border-[var(--border-neutral-subtle)] bg-[var(--bg-neutral-subtle)]/70">
              <h2 className="text-xl font-black text-[var(--text-neutral-strong)]">انتخابگر و متن بلند (Select / Textarea)</h2>
              <p className="text-xs mt-0.5 text-[var(--text-neutral-subtle)]" style={{ fontFamily: "'Digi Almas Bold', sans-serif" }}>همان ماتریس intent × inputSize، بههمراه گزینهٔ خالی، شمارندهٔ کاراکتر و برچسب اختیاری</p>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 items-start">

              <div className="flex flex-col w-full">
                <Label htmlFor="pick-industry" required className="mb-2.5">حوزهٔ فعالیت</Label>
                <Select
                  id="pick-industry"
                  defaultValue=""
                  placeholder="یک گزینه را انتخاب کنید"
                >
                  <option value="finance">بانک، بیمه و پرداخت</option>
                  <option value="retail">خردهفروشی و فروشگاه زنجیرهای</option>
                </Select>
                <FieldHelper
                  message="گزینهٔ خالی با prop placeholder ساخته میشود"
                  icon={<IconInfoCircle className="size-4" />}
                />
              </div>

              <div className="flex flex-col w-full">
                <Label htmlFor="pick-error" className="mb-2.5">انتخابگر در حالت خطا</Label>
                <Select id="pick-error" intent="error" placeholder="یک گزینه را انتخاب کنید">
                  <option value="finance">بانک، بیمه و پرداخت</option>
                </Select>
                <FieldHelper
                  intent="error"
                  message="یک گزینه را انتخاب کنید"
                  icon={<IconAlertCircle className="size-4" />}
                />
              </div>

              <div className="flex flex-col w-full">
                <Label htmlFor="note-optional" optional className="mb-2.5">توضیحات</Label>
                <Textarea
                  id="note-optional"
                  resize="vertical"
                  maxLength={500}
                  placeholder="اولویتها یا نکتهٔ خاصی هست؟"
                />
                <FieldHelper currentLength={0} maxLength={500} />
              </div>

              <div className="flex flex-col w-full">
                <Label htmlFor="note-disabled" intent="subtle" className="mb-2.5">متن بلند غیرفعال</Label>
                <Textarea id="note-disabled" disabled placeholder="این فیلد قفل شده است" />
                <FieldHelper
                  intent="subtle"
                  message="دسترسی مسدود شده است"
                  icon={<IconLock className="size-4" />}
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
