'use client';

import { useSyncExternalStore } from 'react';
import { IconReceipt2, IconAlertTriangle } from '@tabler/icons-react';
import { toPersianDigits } from '@/lib/fa';

/* تاریخ فقط سمت کلاینت خوانده میشود تا رندر سرور و هیدریشن یکسان بماند */
const subscribeNothing = () => () => {};
const clientIssueDate = () =>
  new Intl.DateTimeFormat('fa-IR', { dateStyle: 'short' }).format(new Date());

export interface InvoiceLine {
  label: string;
  detail: string;
  amount: number;
}

interface PaperInvoiceProps {
  serial: string;
  pages: number;
  volume: number;
  lines: InvoiceLine[];
  total: number;
  className?: string;
}

/* مهر جوهری «باطل شد» — دو حلقه هممرکز با چرخش ملایم و تراکم جوهر روی کاغذ */
function VoidStamp() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-9 end-5 z-20 rotate-[-13deg] select-none mix-blend-multiply"
    >
      <div className="border-[3px] border-[var(--color-error-600)] p-[3px] opacity-90">
        <div className="border border-[var(--color-error-300)] px-4 py-1.5">
          <span className="block text-[26px] leading-none font-black tracking-[0.06em] text-[var(--color-error-600)]">
            باطل شد
          </span>
          <span className="mt-1.5 block text-[9px] font-bold tracking-[0.34em] text-[var(--color-error-700)]">
            VOID · ROKHNAMA
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PaperInvoice({
  serial,
  pages,
  volume,
  lines,
  total,
  className = '',
}: PaperInvoiceProps) {
  const issueDate = useSyncExternalStore(subscribeNothing, clientIssueDate, () => '');

  return (
    <div className={`relative ${className}`}>
      <div className="relative rotate-[-1.1deg] border-2 border-[var(--color-neutral-300)] bg-white px-6 py-7 shadow-[8px_8px_0_0_var(--color-neutral-200)] sm:px-8">
        {/* سرصفحه فاکتور */}
        <div className="flex items-start justify-between gap-4 border-b-2 border-dashed border-[var(--color-neutral-300)] pb-5">
          <div className="flex items-center gap-3">
            <div className="border-2 border-[var(--color-neutral-300)] p-2 text-[var(--color-neutral-700)]">
              <IconReceipt2 size={20} stroke={2} />
            </div>
            <div>
              <h4 className="text-base font-black text-[var(--color-neutral-900)]">
                فاکتور هزینه چاپ سنتی
              </h4>
              <span className="text-[11px] font-medium text-[var(--color-neutral-500)]">
                چاپخانه افست · تعرفه بازار داخلی
              </span>
            </div>
          </div>

          <div className="text-end">
            <span className="block text-[11px] font-bold text-[var(--color-neutral-600)]">
              شماره {toPersianDigits(serial)}
            </span>
            <span className="block text-[11px] font-medium text-[var(--color-neutral-500)]">
              تاریخ {issueDate || '—'}
            </span>
          </div>
        </div>

        {/* مشخصات سفارش */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-b border-[var(--color-neutral-200)] py-4 text-[11px]">
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-[var(--color-neutral-500)]">تعداد صفحات</span>
            <span className="font-bold text-[var(--color-neutral-800)]">
              {toPersianDigits(pages)} صفحه
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-[var(--color-neutral-500)]">تیراژ سالانه</span>
            <span className="font-bold text-[var(--color-neutral-800)]">
              {toPersianDigits(volume)} نسخه
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-[var(--color-neutral-500)]">دوره چاپ</span>
            <span className="font-bold text-[var(--color-neutral-800)]">۱ نوبت در سال</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="font-medium text-[var(--color-neutral-500)]">وضعیت سند</span>
            <span className="font-black text-[var(--color-error-600)]">باطل</span>
          </div>
        </div>

        {/* اقلام */}
        <ul className="divide-y divide-dotted divide-[var(--color-neutral-300)] py-2">
          {lines.map((line) => (
            <li key={line.label} className="py-3">
              <div className="flex items-end gap-3">
                <span className="shrink-0 text-sm font-bold text-[var(--color-neutral-800)]">
                  {line.label}
                </span>
                <span
                  aria-hidden="true"
                  className="mb-1.5 flex-1 border-b border-dotted border-[var(--color-neutral-300)]"
                />
                <span className="shrink-0 text-sm font-black tabular-nums text-[var(--color-neutral-900)]">
                  {toPersianDigits(line.amount)}
                </span>
              </div>
              <span className="mt-1 block text-[11px] font-medium text-[var(--color-neutral-500)]">
                {line.detail}
              </span>
            </li>
          ))}
        </ul>

        {/* جمع کل */}
        <div className="flex items-end justify-between gap-4 border-t-2 border-[var(--color-neutral-800)] pt-5 pe-2">
          <div>
            <span className="block text-xs font-bold text-[var(--color-neutral-600)]">
              مبلغ قابل پرداخت سالانه
            </span>
            <span className="mt-1 flex items-center gap-1.5 text-[11px] font-bold text-[var(--color-error-600)]">
              <IconAlertTriangle size={14} stroke={2.2} />
              <span>هزینه تکرارشونده و غیرقابل بازیافت</span>
            </span>
          </div>
          <div className="flex shrink-0 items-baseline gap-1.5">
            <span className="text-3xl font-black tabular-nums text-[var(--color-neutral-900)] sm:text-4xl">
              {toPersianDigits(total)}
            </span>
            <span className="text-sm font-bold text-[var(--color-neutral-700)]">تومان</span>
          </div>
        </div>

        {/* پاورقی سند */}
        <div className="mt-6 flex items-end justify-between gap-4 border-t border-dashed border-[var(--color-neutral-300)] pt-4">
          <div className="flex items-end gap-[3px] opacity-80" aria-hidden="true">
            {[3, 1, 2, 1, 3, 1, 1, 2, 3, 1].map((w, i) => (
              <span
                key={i}
                className="block h-7 bg-[var(--color-neutral-800)]"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
          <span className="max-w-[62%] text-end text-[10px] leading-relaxed font-medium text-[var(--color-neutral-500)]">
            این سند برای هر نوبت چاپ مجدد صادر و پیش از موعد باطل میشود؛ اقلام آن به برند شما منتقل
            نمیگردد.
          </span>
        </div>

        <VoidStamp />
      </div>
    </div>
  );
}
