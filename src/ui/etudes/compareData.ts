/**
 * داده‌های مرجع سکشن ۰۴: مقایسهٔ سه شیوهٔ ارائهٔ کاتالوگ بر پایهٔ ۴ ملاک قطعی
 * مستخرج دقیق از سند معماری اطلاعات docs/reports/rokhnama-ia.md و docs/reports/rokhnama-ia.html
 * با رعایت کامل واژه‌نامهٔ محصول (docs/04-glossary.md) و لحن مطمئن (docs/voice.md)
 */

export interface ComparisonCriterion {
  id: string;
  numPersian: string;
  title: string;
  shortTitle: string;
  systemTag: string;
  paper: {
    badge: string;
    statusType: 'error';
    desc: string;
    technicalFlaw: string;
  };
  foreign: {
    badge: string;
    statusType: 'warning';
    desc: string;
    technicalFlaw: string;
  };
  rok: {
    badge: string;
    statusType: 'success';
    desc: string;
    technicalAdvantage: string;
  };
}

export const COMPARISON_CRITERIA: ComparisonCriterion[] = [
  {
    id: '01',
    numPersian: '۱',
    title: 'به‌روزرسانی لحظه‌ای قیمت و مشخصات',
    shortTitle: 'به‌روزرسانی قیمت و مشخصات',
    systemTag: 'پایگاه داده و انبار',
    paper: {
      badge: 'غیرممکن',
      statusType: 'error',
      desc: 'قیمت روی کاغذ ثابت است؛ هر تغییر یعنی چاپ مجدد یک تیراژ کامل.',
      technicalFlaw: 'عدم امکان اصلاح پس از لیتوگرافی و چاپ، ریسک باطله شدن کل تیراژ با نوسان ارز.',
    },
    foreign: {
      badge: 'نامتصل',
      statusType: 'warning',
      desc: 'به انبار متصل نیست و هر عدد باید دستی وارد شود.',
      technicalFlaw: 'خطای انسانی در ورود دستی، تاخیر در اعمال تغییرات انبار و عدم انطباق با نرم‌افزارهای مالی.',
    },
    rok: {
      badge: 'همگام با انبار (دارد)',
      statusType: 'success',
      desc: 'قیمت مستقیماً از منبع مالی و انبار خوانده شده و با یک کلیک منتشر می‌شود.',
      technicalAdvantage: 'اتصال مستقیم به پایگاه داده و نرم‌افزار حسابداری؛ انتشار هماهنگ تغییرات در کسری از ثانیه.',
    },
  },
  {
    id: '02',
    numPersian: '۲',
    title: 'جذب سرنخ و اتصال به CRM',
    shortTitle: 'جذب سرنخ و اتصال به CRM',
    systemTag: 'فروش و بازاریابی',
    paper: {
      badge: 'صفر',
      statusType: 'error',
      desc: 'کاغذ فرم ندارد؛ نهایتاً یک شمارهٔ تماس پشت جلد قرار می‌گیرد.',
      technicalFlaw: 'نرخ تبدیل نامعلوم؛ وابستگی کامل به تماس خود خریدار بدون ثبت اطلاعات اولیه.',
    },
    foreign: {
      badge: 'درگاه دلاری',
      statusType: 'warning',
      desc: 'فرم ساده دارد، اما اتصال به CRMهای داخلی نیازمند شارژ ارزی است.',
      technicalFlaw: 'هزینه ارزی ماهانه، اختلال در وب‌هوک‌های بین‌المللی و ناسازگاری با CRMهای بومی سازمانی.',
    },
    rok: {
      badge: 'فرم پیامکی + CRM (دارد)',
      statusType: 'success',
      desc: 'شمارهٔ موبایل با SMS اعتبارسنجی شده و سرنخ مستقیماً در CRM ثبت می‌شود.',
      technicalAdvantage: 'احراز هویت پیامکی (SMS OTP) و هدایت خودکار سرنخ به خط لوله فروش سازمان.',
    },
  },
  {
    id: '03',
    numPersian: '۳',
    title: 'تحلیل رفتار و گزارش فروش',
    shortTitle: 'تحلیل رفتار و گزارش فروش',
    systemTag: 'تحلیل داده و هوش تجاری',
    paper: {
      badge: 'غیرممکن',
      statusType: 'error',
      desc: 'کاغذ داده‌ای ثبت نمی‌کند؛ نمی‌دانید خوانده شد یا دور انداخته شد.',
      technicalFlaw: 'تاریکی کامل اطلاعاتی؛ عدم تفکیک بین کاتالوگ دورریخته‌شده و مطالعه‌شده.',
    },
    foreign: {
      badge: 'فقط کلیک‌های کلی',
      statusType: 'warning',
      desc: 'آمار کلی بازدید صفحات، بدون تحلیل رفتار کالایی.',
      technicalFlaw: 'داده‌های سطحی و فله‌ای؛ مشخص نبودن مدت زمان مکث روی نقشه قطعات و کدهای فنی.',
    },
    rok: {
      badge: 'پایشگر دقیق توقف (دارد)',
      statusType: 'success',
      desc: 'مدت توقف روی هر محصول، باز شدن پاپ‌آپ‌ها و صفحات رهاشده ثبت می‌شوند.',
      technicalAdvantage: 'ثبت مدت زمان مکث روی قطعه و تعامل با جدول مشخصات؛ درک دقیق علایق خریدار.',
    },
  },
  {
    id: '04',
    numPersian: '۴',
    title: 'ثبت سفارش آنلاین و استعلام',
    shortTitle: 'ثبت سفارش آنلاین و استعلام',
    systemTag: 'عملیات رسمی B2B',
    paper: {
      badge: 'غیرممکن',
      statusType: 'error',
      desc: 'خریدار باید مشخصات را یادداشت کرده یا در واتساپ تایپ کند.',
      technicalFlaw: 'خطای خوانش کد فنی، پیام‌های پراکنده در پیام‌رسان‌ها و اصطکاک بالا در تبدیل به خرید.',
    },
    foreign: {
      badge: 'پیچیده و غیربومی',
      statusType: 'warning',
      desc: 'فرایندهای عمومی فروشگاه‌های مصرفی که با روال رسمی B2B همخوان نیستند.',
      technicalFlaw: 'ناسازگار با استعلام رسمی شرکتی، فقدان سربرگ شرکتی و الزامات صدور پیش‌فاکتور داخلی.',
    },
    rok: {
      badge: 'برگ سفارش A4 (دارد)',
      statusType: 'success',
      desc: 'انتخاب‌های خریدار با یک کلیک به پیش‌فاکتور رسمی شرکتی با سربرگ تبدیل می‌شوند.',
      technicalAdvantage: 'صدور فوری برگ استعلام رسمی استاندارد A4 همراه با مهر و سربرگ، آمادهٔ ارسال به انبار و بایگانی.',
    },
  },
];
