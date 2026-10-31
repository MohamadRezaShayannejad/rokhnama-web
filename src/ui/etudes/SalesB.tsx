'use client';

import { useState, useEffect } from 'react';
import {
  IconFileInvoice,
  IconPlayerPlay,
  IconRotateClockwise,
  IconPrinter,
  IconShieldCheck,
  IconBuildingWarehouse,
  IconChartDots,
  IconSparkles,
  IconClock,
  IconBarcode,
  IconCircleCheck,
} from '@tabler/icons-react';
import { Button } from '@/ui/Button';

/* تبدیل ارقام به فارسی */
const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
const toFa = (input: string | number) =>
  String(input).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);

interface OrderItem {
  row: number;
  code: string;
  name: string;
  qty: number;
  unit: string;
  basePrice: number;
  discountRate: number;
  totalPrice: number;
}

const ITEMS: OrderItem[] = [
  {
    row: 1,
    code: 'EM-3150',
    name: 'الکتروموتور سه‌فاز ۱۵ کیلووات پوسته چدن',
    qty: 5,
    unit: 'دستگاه',
    basePrice: 32500000,
    discountRate: 30,
    totalPrice: 113750000,
  },
  {
    row: 2,
    code: 'GB-4200',
    name: 'گیربکس خورشیدی صنعتی نسبت ۱:۲۰ شافت مستقیم',
    qty: 5,
    unit: 'دستگاه',
    basePrice: 48000000,
    discountRate: 30,
    totalPrice: 168000000,
  },
  {
    row: 3,
    code: 'INV-20HP',
    name: 'اینورتر کنترل دور ۲۰ اسب بخار تابلویی',
    qty: 2,
    unit: 'دستگاه',
    basePrice: 54000000,
    discountRate: 30,
    totalPrice: 75600000,
  },
];

export default function SalesB() {
  // فازهای شبیه‌ساز صدور: ۰: آماده، ۱: سربرگ، ۲: ردیف‌های جدول، ۳: جمع مبالغ، ۴: مهر شرکتی (تکمیل)
  const [step, setStep] = useState<number>(4);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(24.8);

  // شبیه‌سازی زنده صدور گام‌به‌گام برگ سفارش A4 در ۲۴٫۸ ثانیه
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGenerating) {
      if (step === 0) {
        timer = setTimeout(() => {
          setStep(1);
          setElapsedSeconds(6.2);
        }, 600);
      } else if (step === 1) {
        timer = setTimeout(() => {
          setStep(2);
          setElapsedSeconds(14.5);
        }, 700);
      } else if (step === 2) {
        timer = setTimeout(() => {
          setStep(3);
          setElapsedSeconds(20.1);
        }, 700);
      } else if (step === 3) {
        timer = setTimeout(() => {
          setStep(4);
          setElapsedSeconds(24.8);
          setIsGenerating(false);
        }, 800);
      }
    }
    return () => clearTimeout(timer);
  }, [isGenerating, step]);

  const handleStartGeneration = () => {
    setStep(0);
    setElapsedSeconds(1.2);
    setIsGenerating(true);
  };

  const handleReset = () => {
    setStep(4);
    setElapsedSeconds(24.8);
    setIsGenerating(false);
  };

  return (
    <section
      dir="rtl"
      className="relative w-full bg-[var(--bg-neutral-base)] text-[var(--text-neutral-strong)] py-20 px-4 sm:px-6 lg:px-12 border-b border-[var(--border-neutral-base)]"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* ۱. هدر رسمی سکشن */}
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

        {/* ۲. محفظه شبیه‌ساز سند A4 با کنترل‌های تعاملی */}
        <div className="border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-surface)]">
          {/* نوار کنترل شبیه‌ساز مهندسی */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)] px-6 py-4 gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[var(--color-primary-600)] inline-block" />
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-neutral-subtle)] block">
                  شبیه‌ساز صدور برگ سفارش رسمی A4
                </span>
                <span className="text-sm font-bold text-[var(--text-neutral-strong)]">
                  تولید خودکار پیش‌فاکتور با خطوط هیرلاین، بارکد و مُهر شرکتی
                </span>
              </div>
            </div>

            {/* کنترل‌های تعاملی صدور */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 border border-[var(--border-neutral-base)] bg-white text-xs font-mono font-bold">
                <IconClock size={16} stroke={2.2} className="text-[var(--color-primary-600)]" />
                <span>زمان صدور:</span>
                <span className="text-[var(--color-primary-700)] font-black">
                  {toFa(elapsedSeconds.toFixed(1))} ثانیه
                </span>
                <span className="text-[10px] text-[var(--text-neutral-subtle)]">(کمتر از ۳۰ ثانیه)</span>
              </div>

              <Button
                size="sm"
                color="primary"
                paperFold={false}
                onClick={handleStartGeneration}
                disabled={isGenerating}
                iconBefore={<IconPlayerPlay size={16} stroke={2.2} />}
              >
                {isGenerating ? 'در حال صدور...' : 'شبیه‌سازی صدور زنده'}
              </Button>

              <Button
                size="sm"
                variant="outline"
                color="primary"
                paperFold={false}
                onClick={handleReset}
                iconBefore={<IconRotateClockwise size={16} stroke={2.2} />}
              >
                نمایش کامل
              </Button>

              <Button
                size="sm"
                variant="outline"
                color="primary"
                paperFold={false}
                onClick={() => typeof window !== 'undefined' && window.print()}
                iconBefore={<IconPrinter size={16} stroke={2.2} />}
              >
                چاپ برگ A4
              </Button>
            </div>
          </div>

          {/* بدنه شبیه‌ساز سند رسمی قطع A4 */}
          <div className="p-6 sm:p-10 lg:p-14 bg-[var(--color-neutral-100)] flex justify-center">
            {/* صفحه A4 با فریم مهندسی ۱px و گرید ظریف هیرلاین */}
            <div className="relative w-full max-w-4xl bg-white border border-[var(--border-neutral-base)] shadow-sm p-6 sm:p-10 space-y-8 min-h-[750px] overflow-hidden select-none">
              {/* خطوط راهنمای برش گوشه (Printer Crop Marks) برای حس برگه مهندسی */}
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-[var(--color-neutral-400)] pointer-events-none" />
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-[var(--color-neutral-400)] pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-[var(--color-neutral-400)] pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-[var(--color-neutral-400)] pointer-events-none" />

              {/* ۱. سربرگ رسمی سند */}
              <div
                className={`transition-opacity duration-500 ${
                  step >= 1 ? 'opacity-100' : 'opacity-20'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-[var(--color-primary-800)] pb-6 gap-6">
                  {/* عنوان و مشخصات صادرکننده */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-[var(--color-primary-800)] text-white font-bold text-xs flex items-center justify-center">
                        رُ
                      </div>
                      <span className="text-xl font-black text-[var(--color-primary-950)] tracking-tight">
                        برگ سفارش و پیش‌فاکتور رسمی شرکتی
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-neutral-subtle)]">
                      سامانهٔ فروش و توزیع B2B رُخ‌نما · صادرشده به سفارش شرکت صنعتی
                    </p>
                  </div>

                  {/* متادیتای شماره سریال و تاریخ با خطوط هیرلاین */}
                  <div className="border border-[var(--border-neutral-base)] text-xs divide-y divide-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)]">
                    <div className="px-3 py-1 flex items-center justify-between gap-4">
                      <span className="text-[var(--text-neutral-subtle)]">شماره برگ سفارش:</span>
                      <span className="font-mono font-bold text-[var(--color-primary-800)]">
                        ۱۴۰۳/س-{toFa('۹۸۲')}
                      </span>
                    </div>
                    <div className="px-3 py-1 flex items-center justify-between gap-4">
                      <span className="text-[var(--text-neutral-subtle)]">تاریخ صدور:</span>
                      <span className="font-mono font-bold text-[var(--text-neutral-strong)]">
                        {toFa('۱۴۰۳/۰۷/۲۴')}
                      </span>
                    </div>
                    <div className="px-3 py-1 flex items-center justify-between gap-4">
                      <span className="text-[var(--text-neutral-subtle)]">اعتبار پیش‌فاکتور:</span>
                      <span className="font-bold text-[var(--color-warning-700)]">
                        {toFa(7)} روز کاری
                      </span>
                    </div>
                  </div>
                </div>

                {/* کارت مشخصات خریدار / همکار */}
                <div className="mt-6 border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)] p-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-[var(--text-neutral-subtle)] block">نام خریدار / سازمان:</span>
                      <strong className="text-[var(--text-neutral-strong)] text-sm">
                        شرکت پیشرو صنعت پایا
                      </strong>
                    </div>
                    <div>
                      <span className="text-[var(--text-neutral-subtle)] block">نقش و سطح قیمت:</span>
                      <strong className="text-[var(--color-primary-700)]">
                        همکار رسمی (تخفیف ۳۰٪ سازمانی)
                      </strong>
                    </div>
                    <div>
                      <span className="text-[var(--text-neutral-subtle)] block">احراز پیامکی:</span>
                      <strong className="text-[var(--color-success-700)] flex items-center gap-1 font-mono">
                        <IconCircleCheck size={14} stroke={2.5} />
                        ۰۹۱۲۳۴۵۶۷۸۹ (تأییدشده)
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* ۲. جدول مهندسی ردیف‌های کالا (با انیمیشن پر شدن خطوط هیرلاین) */}
              <div
                className={`transition-opacity duration-500 ${
                  step >= 2 ? 'opacity-100' : 'opacity-20'
                }`}
              >
                <div className="border border-[var(--border-neutral-base)] overflow-x-auto">
                  <table className="w-full text-xs text-right border-collapse">
                    <thead>
                      <tr className="bg-[var(--bg-primary-soft)] border-b border-[var(--border-neutral-base)] text-[var(--color-primary-900)] font-bold">
                        <th className="p-3 w-10 text-center border-l border-[var(--border-neutral-base)]">ردیف</th>
                        <th className="p-3 border-l border-[var(--border-neutral-base)]">کد کالا</th>
                        <th className="p-3 border-l border-[var(--border-neutral-base)]">شرح مشخصات کالا</th>
                        <th className="p-3 w-16 text-center border-l border-[var(--border-neutral-base)]">تعداد</th>
                        <th className="p-3 w-20 text-center border-l border-[var(--border-neutral-base)]">واحد</th>
                        <th className="p-3 border-l border-[var(--border-neutral-base)]">قیمت مصوب (ریال)</th>
                        <th className="p-3 border-l border-[var(--border-neutral-base)]">تخفیف همکار</th>
                        <th className="p-3 text-left">مبلغ کل ردیف (ریال)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-neutral-base)] font-medium">
                      {ITEMS.map((item, idx) => (
                        <tr
                          key={item.code}
                          className={`hover:bg-[var(--bg-neutral-subtle)] transition-all ${
                            step >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                          }`}
                          style={{ transitionDelay: `${idx * 150}ms` }}
                        >
                          <td className="p-3 text-center border-l border-[var(--border-neutral-base)] font-mono">
                            {toFa(item.row)}
                          </td>
                          <td className="p-3 border-l border-[var(--border-neutral-base)] font-mono font-bold text-[var(--color-primary-700)]">
                            {item.code}
                          </td>
                          <td className="p-3 border-l border-[var(--border-neutral-base)] font-bold text-[var(--text-neutral-strong)]">
                            {item.name}
                          </td>
                          <td className="p-3 text-center border-l border-[var(--border-neutral-base)] font-bold">
                            {toFa(item.qty)}
                          </td>
                          <td className="p-3 text-center border-l border-[var(--border-neutral-base)] text-[var(--text-neutral-subtle)]">
                            {item.unit}
                          </td>
                          <td className="p-3 border-l border-[var(--border-neutral-base)] font-mono text-left">
                            {toFa(item.basePrice.toLocaleString('fa-IR'))}
                          </td>
                          <td className="p-3 border-l border-[var(--border-neutral-base)] text-[var(--color-success-700)] font-bold text-center">
                            {toFa(item.discountRate)}٪
                          </td>
                          <td className="p-3 font-mono font-bold text-left text-[var(--color-primary-950)]">
                            {toFa(item.totalPrice.toLocaleString('fa-IR'))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ۳. جدول جمع محاسبات مالی و ارزش افزوده */}
              <div
                className={`transition-opacity duration-500 ${
                  step >= 3 ? 'opacity-100' : 'opacity-20'
                }`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-t border-[var(--border-neutral-base)] pt-6">
                  {/* نکات حقوقی برگ سفارش و پیوند به انبار */}
                  <div className="w-full sm:w-1/2 space-y-3 text-[11px] text-[var(--text-neutral-subtle)] leading-relaxed">
                    <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-neutral-strong)]">
                      <IconBarcode size={18} stroke={2.2} className="text-[var(--color-primary-700)]" />
                      <span>کد رهگیری سامانه انبارداری: ROKH-ORD-8841-SYS</span>
                    </div>
                    <p>
                      * کالاهای مندرج در این پیش‌فاکتور به مدت ۴۸ ساعت در انبار مرکزی رزرو قطعی گردیده‌اند.
                    </p>
                    <p>
                      * صدور خودکار سند توسط سامانه فروش رُخ‌نما انجام شده و فاقد هرگونه نیاز به بازنویسی دستی است.
                    </p>
                  </div>

                  {/* جعبه سرجمع مبالغ با فونت درشت و دقیق */}
                  <div className="w-full sm:w-1/2 border border-[var(--border-neutral-base)] bg-[var(--bg-neutral-subtle)] text-xs divide-y divide-[var(--border-neutral-base)]">
                    <div className="p-2.5 flex items-center justify-between">
                      <span className="text-[var(--text-neutral-subtle)]">جمع ناخالص اقلام:</span>
                      <span className="font-mono font-bold">{toFa('۵۱۰٬۵۰۰٬۰۰۰')} ریال</span>
                    </div>
                    <div className="p-2.5 flex items-center justify-between text-[var(--color-success-700)]">
                      <span className="font-bold">تخفیف همکاری اعمال‌شده (۳۰٪):</span>
                      <span className="font-mono font-bold">{toFa('۱۵۳٬۱۵۰٬۰۰۰-')} ریال</span>
                    </div>
                    <div className="p-2.5 flex items-center justify-between">
                      <span className="text-[var(--text-neutral-subtle)]">مالیات بر ارزش افزوده (۱۰٪):</span>
                      <span className="font-mono font-bold">{toFa('۳۵٬۷۳۵٬۰۰۰')} ریال</span>
                    </div>
                    <div className="p-3 bg-[var(--bg-primary-soft)] flex items-center justify-between text-sm">
                      <span className="font-black text-[var(--color-primary-950)]">مبلغ نهایی پیش‌فاکتور:</span>
                      <span className="font-mono font-black text-base text-[var(--color-primary-800)]">
                        {toFa('۳۹۳٬۰۸۵٬۰۰۰')} ریال
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ۴. مُهر شرکتی رسمی با زاویه چرخش، افکت ضرب فیزیکی و امضا */}
              <div
                className={`flex flex-col sm:flex-row items-center justify-between border-t border-[var(--border-neutral-subtle)] pt-6 gap-6 transition-all duration-700 ${
                  step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                }`}
              >
                <div className="text-xs text-[var(--text-neutral-subtle)] space-y-1">
                  <div>تأییدیه واحد فروش و انبار مرکزی:</div>
                  <div className="font-bold text-[var(--text-neutral-strong)]">
                    امضای الکترونیکی ثبت‌شده در سامانه CRM
                  </div>
                </div>

                {/* استامپ و مُهر شرکتی مهندسی */}
                <div className="relative inline-flex items-center justify-center p-3 border-2 border-dashed border-[var(--color-primary-700)] bg-[var(--bg-primary-subtle)] rotate-[-3deg] shadow-xs select-none">
                  <div className="border border-[var(--color-primary-600)] px-4 py-2 text-center space-y-0.5">
                    <div className="flex items-center justify-center gap-1 text-[11px] font-black text-[var(--color-primary-800)]">
                      <IconShieldCheck size={14} stroke={2.5} />
                      <span>رُخ‌نما · سامانه رسمی صدور سفارش</span>
                    </div>
                    <div className="text-[10px] font-bold text-[var(--color-primary-700)]">
                      تأیید سیستمی · احراز پیامکی معتبر
                    </div>
                    <div className="text-[9px] font-mono text-[var(--text-neutral-subtle)]">
                      VERIFIED · SERIAL: {toFa('982-A4')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ۳. سه بلوک فشرده زیرین (دقیقاً بر اساس سند معماری اطلاعات) */}
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
