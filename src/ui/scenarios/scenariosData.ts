/**
 * صنایعی که کاتالوگ تعاملی به کارشان می‌آید.
 * هر ردیف به یک قابلیت تأییدشدهٔ محصول متصل است تا ادعا بدون پشتوانه نماند.
 */
export interface IndustryFit {
  id: string;
  name: string;
  /** کاتالوگ تعاملی برای این صنعت چه کاری انجام می‌دهد */
  fit: string;
  /** همان کار، به نام قابلیت */
  capability: string;
}

export const INDUSTRIES: IndustryFit[] = [
  {
    id: 'auto-parts',
    name: 'قطعات یدکی خودرو',
    fit: 'خریدار کد کالا را می‌زند و همان قطعه را می‌بیند، بدون گشتن بین هزاران ردیف.',
    capability: 'جست‌وجوی کد کالا',
  },
  {
    id: 'electrical',
    name: 'برق، ابزار و اتوماسیون',
    fit: 'مشخصات فنی روی خود محصول می‌نشیند و باز شدنشان صفحه را شلوغ نمی‌کند.',
    capability: 'جزئیات فنی در پاپ‌آپ',
  },
  {
    id: 'apparel',
    name: 'پوشاک، کیف و کفش',
    fit: 'کالکشن فصل تازه منتشر می‌شود، بدون تجدید چاپ و بدون انبار کردن نسخهٔ قبلی.',
    capability: 'انتشار بدون چاپ مجدد',
  },
  {
    id: 'medical',
    name: 'تجهیزات پزشکی و آزمایشگاهی',
    fit: 'مستندات فنی و گواهی‌ها فقط برای سطح دسترسی تعیین‌شده باز می‌شوند.',
    capability: 'سطح دسترسی و محرمانگی',
  },
  {
    id: 'building',
    name: 'مصالح و تجهیزات ساختمانی',
    fit: 'قیمت روز از منبع اصلی خوانده می‌شود و نسخهٔ قدیمی دست خریدار نمی‌ماند.',
    capability: 'قیمت به‌روز از منبع اصلی',
  },
  {
    id: 'home-appliance',
    name: 'لوازم خانگی و یراق‌آلات',
    fit: 'نماینده و همکار قیمت همکاری می‌بینند و بازدیدکنندهٔ عادی قیمت عمومی.',
    capability: 'قیمت‌گذاری چندسطحی',
  },
  {
    id: 'machinery',
    name: 'ماشین‌آلات و تجهیزات تولید',
    fit: 'اقلام سنگین با مدل ۳۶۰ درجه و ویدیو روی همان کارت محصول نشان داده می‌شوند.',
    capability: 'مدل ۳۶۰ درجه و ویدیو',
  },
  {
    id: 'valves',
    name: 'شیرآلات و پایپینگ',
    fit: 'استعلام ثبت می‌شود، همراه با محصولی که از آن آمده.',
    capability: 'ثبت سرنخ فروش',
  },
];

/** انتخاب صنعت در سکشن سناریوها: ذخیره، اعلام، پر کردن فرم دمو و اسکرول به آن */
export function selectIndustry(name: string, id: string) {
  if (typeof window === 'undefined') return;

  try {
    sessionStorage.setItem('rokhnama_selected_industry', name);
  } catch {
    /* حافظه موقت در دسترس نیست */
  }

  window.dispatchEvent(
    new CustomEvent('rokhnama:select-industry', {
      detail: { industry: name, industryId: id },
    })
  );

  const field = document.querySelector<HTMLInputElement | HTMLSelectElement>(
    'input[name="industry"], select[name="industry"], #demo-industry-field'
  );
  if (field) {
    field.value = name;
    field.dispatchEvent(new Event('change', { bubbles: true }));
  }

  const demo = document.getElementById('demo') || document.getElementById('demo-request');
  if (demo) demo.scrollIntoView({ behavior: 'smooth' });
}
