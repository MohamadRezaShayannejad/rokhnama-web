# رُخنما — لندینگ

صفحه فرود فارسی و راستبهچپ رُخنما: ویترین دیجیتال کسبوکارهای فیزیکی. ساختهشده با Next.js (App Router) و React 19.

سایت زنده: https://rokhnama-sand.vercel.app

## پیشنیاز

- Node.js نسخه ۲۰.۹ یا بالاتر (تستشده روی ۲۶)
- npm

## راهاندازی

```bash
git clone https://github.com/MohamadRezaShayannejad/rokhnama-web.git
cd rokhnama-web
npm ci
cp .env.example .env.local   # مقادیر را پر کنید
npm run dev
```

سایت روی http://localhost:3000 بالا میآید. برای دیدن از گوشی در همان شبکه، آدرس `Network` که در ترمینال چاپ میشود را باز کنید.

بدون `.env.local` هم پروژه بیلد و اجرا میشود؛ فقط ارسال فرم دمو کار نمیکند.

## متغیرهای محیطی

همه سمت سرور هستند و در `.env.local` قرار میگیرند (در گیت نیست).

| کلید | کاربرد | الزامی |
| --- | --- | --- |
| `SUPABASE_URL` | آدرس پروژه Supabase برای ذخیره درخواستهای دمو | برای فرم |
| `SUPABASE_SERVICE_ROLE_KEY` | کلید سرویس Supabase (فقط سرور) | برای فرم |
| `TELEGRAM_BOT_TOKEN` | توکن ربات تلگرام برای اطلاعرسانی درخواست | برای فرم |
| `TELEGRAM_CHAT_ID` | مقصد پیامهای ربات | برای فرم |
| `NEXT_PUBLIC_SITE_URL` | آدرس عمومی سایت برای canonical و sitemap | خیر |

روی Vercel مقدار `NEXT_PUBLIC_SITE_URL` را لازم ندارید؛ آدرس از دامنه پروژه خوانده میشود.

## اسکریپتها

```bash
npm run dev     # اجرای لوکال
npm run build   # بیلد تولید
npm start       # اجرای بیلد تولید
npm run lint    # بررسی eslint
```

## ساختار

```
src/app/        مسیرها، لایوت، متادیتا، robots/sitemap و تصویر OG
src/app/actions/ سرور اکشن ثبت درخواست دمو
src/ui/         کامپوننتهای لندینگ
src/lib/        ابزارها، Supabase، تلگرام، فرم دمو، ثابتهای سایت
src/fonts/      فونت آبار (ttf)
```

## دیپلوی

پروژه روی Vercel با اتصال گیتهاب دیپلوی میشود: هر پوش روی شاخه `main` یک دیپلوی تولید میسازد. نیازی به دیپلوی دستی نیست.

## سئو

- `src/lib/site.ts` تنها منبع عنوان، توضیح و آدرس سایت است
- `src/app/robots.ts` و `src/app/sitemap.ts` خودکار ساخته میشوند
- `src/app/opengraph-image.tsx` کارت ۱۲۰۰×۶۳۰ شبکههای اجتماعی را میسازد (`twitter-image.tsx` همان را بازاستفاده میکند)
