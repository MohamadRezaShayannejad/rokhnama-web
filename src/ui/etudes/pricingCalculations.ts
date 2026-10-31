export const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] as const;

/**
 * تبدیل ارقام انگلیسی به فارسی
 */
export function toFa(input: string | number): string {
  return String(input).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

/**
 * فرمت عدد به فرمت ارقام فارسی با جداکننده سه رقمی فارسی
 */
export function formatNumberFa(num: number): string {
  const rounded = Math.round(num);
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '٬');
  return toFa(formatted);
}

/**
 * فرمت قیمت به تومان با جداکننده سه رقمی و پسوند تومان
 */
export function formatTomans(amount: number): string {
  return `${formatNumberFa(amount)} تومان`;
}

/**
 * فرمت عدد با ممیز فارسی برای مقادیر اعشاری (مانند ۲٫۴ اصله درخت)
 */
export function formatDecimalFa(num: number, digits = 1): string {
  const fixed = num.toFixed(digits);
  const [intPart, decPart] = fixed.split('.');
  if (!decPart || Number(decPart) === 0) {
    return toFa(intPart);
  }
  return `${toFa(intPart)}٫${toFa(decPart)}`;
}

export interface PrintCalculationResult {
  pages: number;
  copies: number;
  forms: number;
  zincCost: number;
  sheetsCount: number;
  paperCost: number;
  bindingCost: number;
  subtotalDirectCost: number;
  wasteRiskCost: number;
  totalPrintCost: number;
  // شاخص‌های زیست‌محیطی (حفظ سبزی زمین)
  paperWeightKg: number;
  treesSaved: number;
  waterSavedLiters: number;
  // پکیج پیشنهادی رُخ‌نما
  recommendedTierId: 'template' | 'bespoke' | 'enterprise';
  recommendedTierName: string;
  recommendedCost: number;
  yearOneSavings: number;
  threeYearSavings: number;
}

export interface PricingTier {
  id: 'template' | 'bespoke' | 'enterprise';
  name: string;
  tagline: string;
  badge?: string;
  basePrice: number;
  largePrice: number;
  pageThreshold: number;
  features: string[];
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'template',
    name: 'قالب نیمه‌آماده (Template)',
    tagline: 'راه‌اندازی سریع با ساختار از‌پیش‌آماده بر بستر پایدار',
    basePrice: 19500000,
    largePrice: 31000000,
    pageThreshold: 30,
    features: [
      'استقرار کامل ظرف ۴۸ تا ۷۲ ساعت کاری',
      'جست‌وجوی کد کالا با ارقام فارسی',
      'عملکرد آفلاین روی گوشی خریداران',
      'میزبانی روی توزیع محتوای ابری داخلی (CDN)',
      'یک سال به‌روزرسانی زیرساخت بدون هزینه',
    ],
  },
  {
    id: 'bespoke',
    name: 'طراحی اختصاصی (Bespoke)',
    tagline: 'طراحی منطبق بر هویت بصری برند با جزئیات فنی تعاملی',
    badge: 'انتخاب اول صنایع و تولیدکنندگان',
    basePrice: 39000000,
    largePrice: 57000000,
    pageThreshold: 60,
    features: [
      'طراحی کامل لایه‌ها و گرافیک منطبق بر برندبوک',
      'پاپ‌آپ‌های فنی (Hotspot) برای جدول ابعاد و واریانت‌ها',
      'درج ویدیو، تست عملکرد و بررسی ۳۶۰ درجه قطعات',
      'صدور خودکار برگ سفارش استاندارد A4 برای انبار',
      'اتصال فرم استعلام پیامکی و ثبت شماره خریدار',
      'قرارداد رسمی عدم افشا (NDA) برای محرمانگی قیمت‌ها',
    ],
  },
  {
    id: 'enterprise',
    name: 'پکیج سازمانی (Enterprise)',
    tagline: 'معماری چندسطحی، اتصال به انبار و پنل آنالیتیکس پیشرفته',
    badge: 'مناسب شرکت‌های هلدینگی و صادراتی',
    basePrice: 68000000,
    largePrice: 87000000,
    pageThreshold: 150,
    features: [
      'اتصال مستقیم به نرم‌افزار انبارداری و CRM سازمانی',
      'قیمت‌گذاری چندسطحی بر اساس نقش (همکار / نماینده / خریدار)',
      'پایشگر دقیق مدت توقف خریدار و نقاط رهاشده',
      'دامنه اختصاصی مستقل سازمانی همراه با SSL بومی',
      'پشتیبانی فنی اولویت‌دار و آموزش اختصاصی تیم فروش',
      'تضمین پایداری در رویدادها و نمایشگاه‌های بین‌المللی',
    ],
  },
];

/**
 * محاسبه کلیه پارامترهای هزینه چاپ، شاخص‌های محیط‌زیست و تعرفه متناظر
 */
export function calculatePrintAndRokhnama(pages: number, copies: number): PrintCalculationResult {
  // ۱. فرم‌های چاپی و زینک (هر ۸ یا ۱۶ صفحه یک فرم ۴ رنگ)
  const forms = Math.max(1, Math.ceil(pages / 8));
  const zincCost = forms * 4 * 600000; // ۶۰۰ هزار تومان برای هر زینک لیتوگرافی

  // ۲. کاغذ گلاسه ۱۵۰ گرم و چاپ افست (هر برگ دو رو = ۲ صفحه)
  const sheetsCount = Math.round((pages / 2) * copies);
  const paperCost = sheetsCount * 2200; // ۲٬۲۰۰ تومان به‌ازای هر برگ چاپ ۴ رنگ رو و پشت

  // ۳. سلفون جلد، صحافی چسب گرم و بسته‌بندی شیرینگ
  const bindingCost = copies * 22000; // ۲۲٬۰۰۰ تومان به‌ازای هر جلد

  // ۴. زیرجمع هزینه‌های مستقیم
  const subtotalDirectCost = zincCost + paperCost + bindingCost;

  // ۵. ریسک باطله شدن به دلیل نوسان قیمت، تغییر کد و مشخصات (محافظه‌کارانه ۲۵٪)
  const wasteRiskCost = Math.round(subtotalDirectCost * 0.25);

  // ۶. جمع کل هزینه چاپ سالانه
  const totalPrintCost = subtotalDirectCost + wasteRiskCost;

  // ۷. شاخص‌های زیست‌محیطی حفظ سبزی زمین
  // وزن هر برگ گلاسه حدود ۱۰ گرم
  const paperWeightKg = Math.round(sheetsCount * 0.01);
  // هر اصله درخت تنومند معادل حدود ۸٬۳۰۰ برگ کاغذ A4
  const treesSaved = Number((sheetsCount / 8300).toFixed(1));
  // تولید هر برگ کاغذ ویرجین حدود ۱۰ لیتر آب مصرف می‌کند
  const waterSavedLiters = sheetsCount * 10;

  // ۸. پکیج بهینه رُخ‌نما
  let recommendedTierId: 'template' | 'bespoke' | 'enterprise' = 'bespoke';
  let recommendedTierName = 'طراحی اختصاصی (Bespoke)';
  let recommendedCost = PRICING_TIERS[1].basePrice;

  if (pages <= 30) {
    recommendedTierId = 'template';
    recommendedTierName = 'قالب نیمه‌آماده (Template)';
    recommendedCost = PRICING_TIERS[0].basePrice;
  } else if (pages <= 150) {
    recommendedTierId = 'bespoke';
    recommendedTierName = 'طراحی اختصاصی (Bespoke)';
    recommendedCost = pages > 60 ? PRICING_TIERS[1].largePrice : PRICING_TIERS[1].basePrice;
  } else {
    recommendedTierId = 'enterprise';
    recommendedTierName = 'پکیج سازمانی (Enterprise)';
    recommendedCost = pages > 200 ? PRICING_TIERS[2].largePrice : PRICING_TIERS[2].basePrice;
  }

  const yearOneSavings = Math.max(0, totalPrintCost - recommendedCost);
  const threeYearSavings = Math.max(0, totalPrintCost * 3 - recommendedCost);

  return {
    pages,
    copies,
    forms,
    zincCost,
    sheetsCount,
    paperCost,
    bindingCost,
    subtotalDirectCost,
    wasteRiskCost,
    totalPrintCost,
    paperWeightKg,
    treesSaved,
    waterSavedLiters,
    recommendedTierId,
    recommendedTierName,
    recommendedCost,
    yearOneSavings,
    threeYearSavings,
  };
}
