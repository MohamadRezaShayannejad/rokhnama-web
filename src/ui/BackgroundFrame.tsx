'use client';

/**
 * فریم پس‌زمینه سایت:
 * - خطوط عمودی و چارچوب کلی صفحه
 * - (خط افقی زیر هدر تا طراحی مجدد هدر غیرفعال شده است)
 */
export default function BackgroundFrame() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* خط افقی تا زمان بازطراحی هدر حذف شد */}
    </div>
  );
}
