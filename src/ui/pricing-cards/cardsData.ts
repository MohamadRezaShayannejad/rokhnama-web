import { toFa, formatNumberFa } from '@/ui/etudes/pricingCalculations';

/** نرخ تقریبی تمام‌شدهٔ هر صفحه در چاپ سنتی (تومان) — مبنای ردیف‌های معادل‌سنجی */
const PRINT_RATE_PER_PAGE = 17000;

/** قیمت پایهٔ هر سطح (تومان) — مبنای «از …» و محاسبهٔ معادل چاپی */
export const TIER_PRICES = {
  template: 19500000,
  bespoke: 39000000,
} as const;

export interface EquivalenceRow {
  /** تعداد صفحات کاتالوگ چاپی معادل همین سطح */
  pages: number;
  /** برچسب کوتاه ماهیت کارکرد این سطح */
  tag: string;
}

/** ردیف‌های معادل‌سنجی برای دو سطح اول؛ ستون چپ عدد بزرگ، ستون راست معادل ریالی */
export const EQUIVALENCE_ROWS: Record<'template' | 'bespoke', EquivalenceRow[]> = {
  template: [
    { pages: 20, tag: 'کاتالوگ تک‌محصوله یا لیست قیمت فصلی' },
    { pages: 40, tag: 'کاتالوگ کامل یک خط تولید' },
    { pages: 64, tag: 'کاتالوگ نمایشگاهی با صحافی گلاسه' },
  ],
  bespoke: [
    { pages: 100, tag: 'کاتالوگ چندبخشی با جداول فنی' },
    { pages: 160, tag: 'کالکشن فصلی پوشاک یا تجهیزات' },
    { pages: 240, tag: 'کاتالوگ قطعات یدکی با صدها SKU' },
  ],
};

/** مراحل ارائهٔ سرویس در سطح سازمانی — بدون قیمت، جانشین لیست امکانات */
export const ENTERPRISE_STEPS = [
  {
    title: 'جلسهٔ نیازسنجی و ممیزی داده',
    desc: 'بررسی کاتالوگ‌ها، فایل‌ها و سامانه‌های موجود سازمان.',
  },
  {
    title: 'استخراج و ساختاربندی داده‌ها',
    desc: 'تبدیل PDF، اکسل و وب‌سایت به پایگاه دادهٔ ساختاریافته.',
  },
  {
    title: 'طراحی تعاملی و اتصال به انبار',
    desc: 'Hotspotها، نقش‌های قیمتی و پیوند به نرم‌افزار سازمانی.',
  },
  {
    title: 'انتشار، آموزش و پشتیبانی اختصاصی',
    desc: 'تحویل پنل مدیریت روی دامنهٔ سازمانی و آموزش تیم فروش.',
  },
] as const;

/** رشتهٔ «۲۰ صفحه ≈ ۳۴۰٬۰۰٬۰۰ تومان» برای ردیف معادل‌سنجی */
export function printEquivalent(row: EquivalenceRow): string {
  return `${toFa(row.pages)} صفحه ≈ ${formatNumberFa(row.pages * PRINT_RATE_PER_PAGE)} تومان`;
}
