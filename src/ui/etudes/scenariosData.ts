/**
 * داده‌های مرجع سکشن ۰۶: سگمنت‌بندی صنایع B2B و مسیر مهاجرت ۴ مرحله‌ای کاتالوگ قدیمی
 * منابع موثق:
 * - docs/reports/rokhnama-ia.md (بخش‌های ۰۵ و ۰۷)
 * - docs/04-glossary.md (واژه‌نامه و کلمات مجاز/ممنوع)
 * - docs/voice.md (لحن مطمئن و بدون اغراق)
 */

export interface B2BSegment {
  id: string;
  num: string; // ارقام فارسی: ۰۱ تا ۰۴
  title: string;
  industries: string;
  challenge: string;
  challengeShort: string;
  solutionShort: string;
  features: string[];
  impactMetric: string;
  technicalCode: string;
  accentCategory: string;
  iconName: 'tool' | 'building-store' | 'device-desktop-analytics' | 'world';
  demoDetails: {
    label: string;
    value: string;
    secondaryLabel: string;
    secondaryValue: string;
    tag: string;
  };
}

export interface MigrationStep {
  id: string;
  num: string; // ارقام فارسی: ۰۱ تا ۰۴
  title: string;
  shortDesc: string;
  fullDesc: string;
  inputs: string[];
  output: string;
  stepBadge: string;
  durationEstimate: string;
  iconName: 'file-import' | 'filter-code' | 'layers-interactive' | 'cloud-upload';
}

export const b2bSegments: B2BSegment[] = [
  {
    id: 'complex-parts',
    num: '۰۱',
    title: 'قطعات پیچیده و کدهای فنی زیاد',
    industries: 'قطعات خودرو، ابزار صنعتی، مصالح و تأسیسات',
    challenge: 'کاتالوگ‌های چندصد صفحه‌ای و شلوغ، دشواری پیدا کردن کدها میان هزاران ردیف و سردرگمی خریدار در استعلام فنی.',
    challengeShort: 'کاتالوگ حجیم و گم شدن کدها',
    solutionShort: 'جست‌وجوی سریع کد، جدول ابعاد در پاپ‌آپ و استعلام کد به کد',
    features: [
      'جست‌وجوی سریع کد و پارت‌نامبر با صفحه‌کلید و ارقام فارسی',
      'جدول مشخصات و نقشه‌های انفجاری در پاپ‌آپ اختصاصی هر قطعه',
      'ثبت استعلام کد به کد بدون نیاز به بازنویسی دستی مشخصات',
    ],
    impactMetric: 'یافتن قطعه زیر چند ثانیه به‌جای ورق زدن صدها صفحه',
    technicalCode: 'PART-902-ISO',
    accentCategory: 'صنایع سنگین و قطعه‌سازی',
    iconName: 'tool',
    demoDetails: {
      label: 'جست‌وجوی پارت‌نامبر:',
      value: 'مطابقت قطعی کد با انبار',
      secondaryLabel: 'پاپ‌آپ ابعاد فنی:',
      secondaryValue: 'نقشهٔ تلرانس و استاندارد DIN',
      tag: 'استعلام کد به کد',
    },
  },
  {
    id: 'wholesale-distribution',
    num: '۰۲',
    title: 'بنکداری و عمده‌فروشی با تنوع فصلی',
    industries: 'پوشاک، نساجی، کیف و کفش، دکوراسیون',
    challenge: 'نوسان هفتگی قیمت‌ها، تغییر مداوم کالکشن‌های فصلی و اتلاف وقت تیم فروش برای پاسخ به قیمت‌های همکار در پیام‌رسان‌ها.',
    challengeShort: 'نوسان قیمت و کالکشن فصلی',
    solutionShort: 'به‌روزرسانی قیمت در لحظه، سهمیه قیمت همکار و برگ سفارش انبار',
    features: [
      'به‌روزرسانی قیمت کالاها در لحظه و هماهنگ با انبار',
      'سهمیه‌بندی و نمایش تفکیک‌شدهٔ قیمت همکار و قیمت مصرف‌کننده',
      'صدور مستقیم برگ سفارش چاپی A4 با سربرگ شرکتی برای انبار',
    ],
    impactMetric: 'انتشار کالکشن جدید فصلی در چند دقیقه بدون چاپ مجدد',
    technicalCode: 'COLLECTION-W26',
    accentCategory: 'بنکداری و کالکشن‌های فصلی',
    iconName: 'building-store',
    demoDetails: {
      label: 'به‌روزرسانی نرخ:',
      value: 'همگام با منبع مالی',
      secondaryLabel: 'خروجی سفارش:',
      secondaryValue: 'پیش‌فاکتور چاپی با سربرگ شرکتی',
      tag: 'قیمت همکاری',
    },
  },
  {
    id: 'capital-goods',
    num: '۰۳',
    title: 'محصولات سرمایه‌ای و فروش مشاوره‌ای',
    industries: 'تجهیزات پزشکی، ماشین‌آلات صنعتی، خطوط تولید',
    challenge: 'فرایند مذاکره چندماهه با کارفرما، لزوم ارائه گواهی‌ها و ویدیوی تست عملکرد، و نامشخص بودن علاقهٔ واقعی خریدار در جلسات.',
    challengeShort: 'مذاکره چندماهه و لزوم نمایش تست بالینی',
    solutionShort: 'ویدیوی تست عملکرد، چرخش ۳۶۰ درجه و پایش مدت مکث خریدار',
    features: [
      'نمایش ویدیوی تست عملکرد و مستندات تأییدیه مستقیم در صفحهٔ دستگاه',
      'بررسی دقیق قطعات با چرخش ۳۶۰ درجه و شبیه‌سازی زاویه‌های دید',
      'پایش مدت مکث خریدار روی کالاها جهت پیگیری هدفمند تیم فروش',
    ],
    impactMetric: 'شناسایی دقیق قطعهٔ مورد علاقه خریدار پیش از تماس پیگیری',
    technicalCode: 'MACH-SYS-440',
    accentCategory: 'ماشین‌آلات و تجهیزات حساس',
    iconName: 'device-desktop-analytics',
    demoDetails: {
      label: 'مستندات عملکردی:',
      value: 'ویدیوی تست و برگهٔ کالیبراسیون',
      secondaryLabel: 'پایشگر توجه خریدار:',
      secondaryValue: 'ثبت مدت توقف و صفحات مشاهده‌شده',
      tag: 'چرخش ۳۶۰ درجه',
    },
  },
  {
    id: 'export-exhibition',
    num: '۰۴',
    title: 'صادرکنندگان و تیم‌های نمایشگاهی',
    industries: 'غرفه‌داران نمایشگاه‌های بین‌المللی، صادرات مواد غذایی و معدنی',
    challenge: 'هزینه و دردسر باربری کارتن‌های سنگین کاتالوگ به نمایشگاه‌ها، اینترنت ناپایدار و ضعیف سالن‌ها، و زبان و ارز متفاوت خریدار خارجی.',
    challengeShort: 'باربری کارتن‌های کاتالوگ و اینترنت ضعیف سالن',
    solutionShort: 'بارکد QR استند، کارکرد کاملاً آفلاین PWA و سوئیچ ارزی ریال/دلار',
    features: [
      'بارکد QR روی استند غرفه برای باز شدن فوری کاتالوگ بدون دانلود فایل',
      'کارکرد کاملاً آفلاین وب‌اپلیکیشن در سالن‌های نمایشگاهی بدون آنتن',
      'سوئیچ ارزی ریال، دلار و درهم برای خریداران بین‌المللی',
    ],
    impactMetric: 'حذف صددرصدی هزینه‌های باربری کاغذ و کاتالوگ‌های باطله',
    technicalCode: 'EXPO-GLOBAL-PWA',
    accentCategory: 'صادرات و رویدادهای بین‌المللی',
    iconName: 'world',
    demoDetails: {
      label: 'دسترسی در نمایشگاه:',
      value: 'اسکن QR استند با عملکرد آفلاین',
      secondaryLabel: 'نمایش قیمت ارزی:',
      secondaryValue: 'سوئیچ خودکار بین ریال، دلار و درهم',
      tag: 'دسترسی آفلاین',
    },
  },
];

export const migrationSteps: MigrationStep[] = [
  {
    id: 'step-extract',
    num: '۰۱',
    title: 'استخراج ساختاریافته',
    shortDesc: 'دریافت و استخراج فایل‌های قبلی (PDF، وب‌سایت، جداول اکسل)',
    fullDesc: 'شما فقط فایل‌های موجود را ارسال می‌کنید؛ مهندسان رُخ‌نما مشخصات محصولات، کدهای فنی و ساختار دسته‌بندی را از فایل‌های پراکنده و PDFهای سنگین استخراج می‌کنند.',
    inputs: ['کاتالوگ‌های PDF قدیمی', 'جداول اکسل قیمت و موجودی', 'تصاویر و صفحات وب‌سایت قبلی'],
    output: 'پایگاه دادهٔ تمیز از مشخصات و پارت‌نامبرها',
    stepBadge: 'گام نخست',
    durationEstimate: '۲۴ ساعت',
    iconName: 'file-import',
  },
  {
    id: 'step-refine',
    num: '۰۲',
    title: 'پالایش و کدگذاری',
    shortDesc: 'استانداردسازی ابعاد و کدگذاری تگ‌ها و تصاویر فنی',
    fullDesc: 'ابعاد مهندسی، واحدهای اندازه‌گیری، کدهای فنی و تگ‌های جست‌وجو پالایش می‌شوند و تصاویر با سبک هیرلاین و بدون افت کیفیت برای وب آماده می‌گردند.',
    inputs: ['کدهای بدون ساختار', 'تصاویر با وضوح‌های گوناگون', 'تگ‌های پراکنده کالا'],
    output: 'آرشیو بهینه‌شده با فیلتر سریع و ارقام فارسی',
    stepBadge: 'گام دوم',
    durationEstimate: '۲۴ تا ۴۸ ساعت',
    iconName: 'filter-code',
  },
  {
    id: 'step-hotspots',
    num: '۰۳',
    title: 'طراحی لایه‌های تعاملی',
    shortDesc: 'طراحی لایه‌های تعاملی و پاپ‌آپ‌های فنی (Hotspot)',
    fullDesc: 'روی هر قطعه، پاپ‌آپ‌های ابعاد فنی، نقشه‌های انفجاری، ویدیوهای تست و امکان بررسی ۳۶۰ درجه اضافه می‌شود تا صفحهٔ اصلی همیشه خلوت و خوانا بماند.',
    inputs: ['برگهٔ ابعاد و استانداردها', 'ویدیوهای آزمایش و تست', 'تصاویر چندزاویه‌ای'],
    output: 'ویترین لایه‌ای با پاپ‌آپ‌های فنی روی قطعات',
    stepBadge: 'گام سوم',
    durationEstimate: '۴۸ ساعت',
    iconName: 'layers-interactive',
  },
  {
    id: 'step-deploy',
    num: '۰۴',
    title: 'استقرار و تحویل نهایی',
    shortDesc: 'استقرار نهایی روی دامنه اختصاصی، تحویل لینک‌ها و پنل مدیریت',
    fullDesc: 'کاتالوگ تعاملی روی دامنهٔ اختصاصی شرکت شما فعال می‌شود، لینک‌های اختصاصی هر لاین محصول تحویل می‌گردد و پنل مدیریت برای به‌روزرسانی قیمت‌ها و پایش خریداران در اختیارتان قرار می‌گیرد.',
    inputs: ['دامنهٔ سازمانی شرکت', 'تنظیم خروجی پیش‌فاکتور شرکتی', 'تعریف دسترسی تیم فروش'],
    output: 'کاتالوگ زنده روی دامنه با دسترسی آفلاین و گزارش‌ها',
    stepBadge: 'گام چهارم',
    durationEstimate: 'تحویل و پشتیبانی',
    iconName: 'cloud-upload',
  },
];

/** تبدیل ارقام انگلیسی به فارسی */
export function toFa(n: number | string): string {
  return String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]);
}
