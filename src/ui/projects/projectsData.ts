import { IconSchool, IconShirt, IconStethoscope } from '@tabler/icons-react';

export interface ProjectCase {
  id: string;
  index: string;
  name: string;
  nameEn: string;
  industry: string;
  /** خلاصهٔ کوتاه کسبوکار برای نمایش روی کارت، مثل «سلامت دیجیتال» */
  summary: string;
  /** یک خط معرفی ارزش — نه لایهٔ چالش/راهکار/دستاورد */
  note: string;
  /** لینک نسخهٔ زنده — لینک واقعی پروژه را اینجا بگذار */
  liveUrl: string;
  /** مسیر تصویر موکاپ (مثلاً '/projects/delband.png')؛ خالی = جای تصویر */
  image: string;
}

/** سه نمونهکار واقعی رُخنما — محتوا از docs/landing-content.md */
export const PROJECTS: ProjectCase[] = [
  {
    id: 'delband',
    index: '۰۱',
    name: 'دلبند',
    nameEn: 'DELBAND HEALTH',
    industry: 'سلامت و تجهیزات پزشکی',
    summary: 'محصولات سلامت دیجیتال',
    note: 'کاتالوگ دوزبانهٔ سازمانی با سناریوی کاربرد بالینی و صدور برگ استعلام رسمی برای بیمارستانها.',
    liveUrl: 'https://catalog.delbandcare.com',
    image: '/projects/delband.png',
  },
  {
    id: 'kntu',
    index: '۰۲',
    name: 'خواجه نصیر',
    nameEn: 'K.N. TOOSI UNIVERSITY',
    industry: 'آموزش عالی و پردیس بینالملل',
    summary: 'آموزش مهندسی بینالمللی',
    note: 'ویترین دوزبانهٔ ۱۱ دانشکده با تور مجازی ۳۶۰ درجهٔ پردیس و جدول شهریهٔ ارزی بهروز.',
    liveUrl: 'https://kntu-catalog.vercel.app',
    image: '/projects/kntu.png',
  },
  {
    id: 'pancho',
    index: '۰۳',
    name: 'پانچو',
    nameEn: 'PANCHO WHOLESALE',
    industry: 'بنکداری و عمدهفروشی پوشاک',
    summary: 'برند لباس ایرانی',
    note: 'ویترین فصلی ۶۴ قلم کالا با جستوجوی سریع کد و برگ سفارش چاپی برای انبار.',
    liveUrl: 'https://mypancho.vercel.app/',
    image: '/projects/pancho.png',
  },
];

/** نشان صنف هر پروژه — کلید همان شناسهٔ پروژه است */
export const PROJECT_ICONS: Record<string, typeof IconSchool> = {
  delband: IconStethoscope,
  kntu: IconSchool,
  pancho: IconShirt,
};
