'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconBrandTelegram, IconCheck, IconX } from '@tabler/icons-react';
import { Button } from '@/ui/Button';
import { IconButton } from '@/ui/IconButton';

/**
 * تأیید ثبت درخواست دمو.
 * در موبایل برگهای است که از لبهٔ پایین بالا میآید و ریلبهریل مینشیند،
 * بنابراین خطوط عمودی صفحه از پشت آن امتداد پیدا میکنند؛ در دسکتاپ کارت مرکزی.
 */

const TELEGRAM_URL = 'https://t.me/RokhnamaBot';
const EXIT_MS = 180;
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface DemoSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

interface LenisHandle {
  stop: () => void;
  start: () => void;
}

export default function DemoSuccessModal({ open, onClose }: DemoSuccessModalProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const [rendered, setRendered] = useState(open);
  const [wasOpen, setWasOpen] = useState(open);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  /* باز شدن، رندر را همانجا فعال میکند؛ بستن، برگه را تا پایان انیمیشن خروج نگه میدارد */
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setRendered(true);
  }

  useEffect(() => {
    if (open || !rendered) return;
    const timer = window.setTimeout(() => setRendered(false), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [open, rendered]);

  const phase = open ? 'open' : 'closing';
  const active = rendered && open;

  useEffect(() => {
    if (!active) return;
    const sheet = sheetRef.current;
    if (!sheet) return;

    const restoreTo = document.activeElement as HTMLElement | null;
    const html = document.documentElement;
    const lenis = (window as unknown as { __lenis?: LenisHandle }).__lenis;

    /* پشت مودال نباید اسکرول شود؛ عرض اسکرولبار هم جبران میشود تا صفحه نلرزد */
    const previousOverflow = html.style.overflow;
    const previousPad = document.body.style.paddingInlineEnd;
    const scrollbar = window.innerWidth - html.clientWidth;
    html.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingInlineEnd = `${scrollbar}px`;
    lenis?.stop();

    /* فوکوس روی خودِ برگه مینشیند تا عنوان و توضیح برای صفحهخوان خوانده شود */
    sheet.focus({ preventScroll: true });

    function handleKeyDown(event: KeyboardEvent) {
      if (!sheet) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = Array.from(sheet.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const current = document.activeElement;

      if (event.shiftKey && (current === first || current === sheet)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      html.style.overflow = previousOverflow;
      document.body.style.paddingInlineEnd = previousPad;
      lenis?.start();
      /* بازگشت فوکوس به دکمهٔ ارسال؛ افتادن روی body جای تب را گم میکند */
      if (restoreTo && restoreTo !== document.body) restoreTo.focus({ preventScroll: true });
    };
  }, [active]);

  if (!rendered || typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-end justify-center sm:items-center">
      <div
        className="demo-modal-scrim absolute inset-0 bg-[var(--color-neutral-900)]/45 backdrop-blur-[2px]"
        data-state={phase}
        onClick={() => onCloseRef.current()}
        aria-hidden="true"
      />

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-success-title"
        aria-describedby="demo-success-desc"
        data-state={phase}
        tabIndex={-1}
        data-lenis-prevent
        className="demo-sheet relative max-h-[calc(100dvh-16px)] w-[calc(100%-16px)] overflow-y-auto border border-b-0 border-[var(--border-neutral-base)] bg-white px-6 pt-8 pb-[calc(24px+env(safe-area-inset-bottom))] focus:outline-none sm:w-full sm:max-w-[520px] sm:border-b sm:p-10"
      >
        <div className="flex items-start justify-between gap-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[var(--bg-success-solid)] text-white">
            <IconCheck size={26} stroke={2.6} className="demo-success-check" aria-hidden="true" />
          </span>

          <IconButton
            type="button"
            color="primary"
            variant="outline"
            size="sm"
            cursorEffect={false}
            aria-label="بستن"
            onClick={() => onCloseRef.current()}
          >
            <IconX aria-hidden="true" />
          </IconButton>
        </div>

        <h2
          id="demo-success-title"
          className="mt-5 text-2xl leading-[1.25] font-black tracking-[-0.02em] text-[var(--text-neutral-strong)] sm:text-[28px]"
        >
          درخواست شما ثبت شد
        </h2>
        <p
          id="demo-success-desc"
          className="mt-3 text-[15px] leading-[1.8] text-[var(--text-neutral-base)] sm:text-base"
        >
          برای هماهنگی زمان دمو با شما تماس میگیریم. نمونهٔ تعاملی کاتالوگ شما تا ۴۸ ساعت آماده
          میشود.
        </p>

        <div className="mt-7 h-px w-full bg-[var(--border-neutral-subtle)]" aria-hidden="true" />

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button
            type="button"
            color="primary"
            variant="solid"
            size="md"
            cursorEffect={false}
            onClick={() => onCloseRef.current()}
          >
            متوجه شدم
          </Button>

          <Button
            color="primary"
            variant="outline"
            size="md"
            asChild
            cursorEffect={false}
            iconBefore={<IconBrandTelegram size={20} stroke={2} aria-hidden="true" />}
          >
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
              تلگرام
            </a>
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
