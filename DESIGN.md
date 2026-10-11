---
name: Rokhnama
description: ویترین دیجیتال شفاف — سیستم طراحی کاتالوگ تعاملی و ابزار فروش B2B
colors:
  primary: "#1f2b8f"
  primary-hover: "#182378"
  primary-active: "#11195e"
  primary-subtle: "#f5f6fb"
  secondary: "#d3b05a"
  secondary-hover: "#c79b10"
  secondary-active: "#a8820c"
  neutral-bg: "#f9fafb"
  neutral-surface: "#ffffff"
  neutral-subtle: "#f3f4f6"
  neutral-border: "#d1d5dc"
  neutral-border-subtle: "#e5e7eb"
  neutral-text: "#364153"
  neutral-text-strong: "#101828"
  neutral-text-subtle: "#6a7282"
  success: "#009966"
  warning: "#D08700"
  error: "#e7000b"
typography:
  display:
    fontFamily: "var(--font-abar), ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 900
    lineHeight: "1.1"
  headline:
    fontFamily: "var(--font-abar), ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)"
    fontWeight: 800
    lineHeight: "1.2"
  title:
    fontFamily: "var(--font-abar), ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: "1.4"
  body:
    fontFamily: "var(--font-abar), ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.6"
  label:
    fontFamily: "var(--font-abar), ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: "1.4"
rounded:
  none: "0px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "#3c2d01"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-secondary-hover:
    backgroundColor: "{colors.secondary-hover}"
  input-default:
    backgroundColor: "transparent"
    rounded: "{rounded.none}"
    height: "52px"
---

# Design System: Rokhnama (رُخ‌نما)

<!-- impeccable:design-schema 1 -->

## Overview

**Creative North Star:** «ویترین دیجیتال شفاف» (The Transparent Digital Showcase).

سیستم طراحی رُخ‌نما با الهام از خطوط معمارانه دقیق، ساختار کاتالوگ‌های نفیس و شفافیت مدرن وب توسعه یافته است. رُخ‌نما واسطه‌ای میان دنیای واقعی کاتالوگ‌های فیزیکی و سرعت تعاملی وب است؛ بنابراین هویت بصری آن **پرمیوم، مطمئن، شفاف و مهندسی‌شده** است:
- ساختار هندسی صلب و مستحکم با خطوط راهنما و قاب‌های مشخص.
- سبک بصری دوبعدی (2D line-art / stroke) در تمامی تصویرسازی‌ها و ترسیم‌ها.
- پرهیز از جلوه‌های اغراق‌آمیز، شلوغ یا حبابی و کودکانه.

## Colors

پالت رنگی رُخ‌نما از مقیاس متغیرهای معنایی تعریف‌شده در `src/app/globals.css` بهره می‌گیرد:

- **رنگ اصلی (Primary - سرمه‌ای سیر و اصیل):** نماینده اعتماد، اعتبار صنعتی و استواری سازمانی.
  - رنگ پایه: `var(--color-primary-600)` (`#1f2b8f`)
  - هاور و فوکوس: `var(--color-primary-700)` (`#182378`) و `var(--color-primary-800)` (`#11195e`)
  - سطوح نرم و پس‌زمینه: `var(--color-primary-50)` (`#f5f6fb`)
- **رنگ فرعی (Secondary - خردلی طلایی باوقار):** برای ایجاد تاکیدهای ظریف و حس پرمیوم بودن.
  - رنگ پایه: `var(--color-secondary-500)` (`#d3b05a`)
  - هاور: `var(--color-secondary-600)` (`#c79b10`)
- **رنگ‌های خنثی (Neutrals):**
  - پس‌زمینه اصلی: `var(--bg-neutral-base)` (`#f9fafb`)
  - خطوط و کادرها: `var(--border-neutral-base)` (`#d1d5dc`) و `var(--border-neutral-subtle)` (`#e5e7eb`)
  - متون اصلی: `var(--text-neutral-strong)` (`#101828`) و `var(--text-neutral-base)` (`#364153`)
- **وضعیت‌ها (Status):**
  - موفقیت: `var(--color-success-600)` (`#009966`)
  - هشدار: `var(--color-warning-600)` (`#D08700`)
  - خطا: `var(--color-error-600)` (`#e7000b`)

> **قانون قطعی:** هرگونه استفاده مستقیم از کدهای رنگی Hex در کامپوننت‌ها ممنوع است. فقط و فقط از متغیرهای Tailwind و کلاس‌های مبتنی بر توکن در `globals.css` استفاده می‌شود.

## Typography

- **تایپ‌فیس:** خانواده فونت «اَبَر» (`Abar`) با رندرینگ بهینه و لود فونت‌های محلی WOFF2:
  - وزن معمولی (Regular / 400): متون بدنه و پاراگراف‌ها.
  - وزن نیمه‌ضخیم (SemiBold / 600): برچسب‌ها و فیلدهای فرم.
  - وزن ضخیم (Bold / 700): تیتر بخش‌ها، عناوین کارت‌ها و دکمه‌ها.
  - وزن خیلی ضخیم (ExtraBold / 800) و سیاه (Black / 900): عناوین نمایشی، ارقام بزرگ و هدرهای کلیدی.
- **چینش و جهت‌گیری:** جهت کاملاً راست‌به‌چپ (RTL) در تمام صفحات و بخش‌ها.
- **ارقام فارسی:** تمامی اعداد و قیمت‌ها باید با فرمت ارقام فارسی (۰ تا ۹) نمایش داده شوند.

## Layout

- **واکنش‌گرایی (Responsive):** لایه‌بندی یکپارچه در سه بریک‌پوینت اصلی:
  - موبایل (< 640px)
  - تبلت (640px - 1024px)
  - دسکتاپ (> 1024px)
- **ساختار گرید:** تکیه بر گرید منظم، فواصل استاندارد ۴/۸/۱۶/۲۴/۳۲/۴۸/۶۴ پیکسلی و هم‌راستایی لبه‌ها.

## Elevation & Depth

- **لایه‌بندی شیشه‌ای و مرزی (Border-driven):** به جای سایه‌های پخش و کدر، عمق از طریق کادرهای خطی ۱ و ۲ پیکسلی، تقابل رنگ‌های پس‌زمینه و لایه‌های با شفافیت کنترل‌شده ایجاد می‌شود.
- **سایه‌های ساختاری:** سایه‌ها در صورت استفاده، بسیار تمیز و جهت‌دار هستند و حالت تار یا کثیف ایجاد نمی‌کنند.

## Shapes

- **گوشه‌های تیز (Sharp Geometry / 0px):** مشخصه بنیادین رُخ‌نما استفاده از گوشه‌های بدون انحنا (`rounded-none` / `border-radius: 0px`) است. تمام دکمه‌ها، فیلدهای ورودی، تب‌ها، کارت‌ها و مدال‌ها با لبه‌های تیز و دقیق مهندسی اجرا می‌شوند.
- **کادرهای خطی استوار:** بوردرهای ۲ پیکسلی در دکمه‌های Outline و فیلدهای Input برای ساختار بصری محکم.

## Components

### ۱. دکمه‌ها (Button)
- ارتفاع‌های استاندارد:
  - کوچک (Small): `44px`
  - متوسط (Medium - پیش‌فرض): `52px`
  - بزرگ (Large): `60px`
- سبک‌ها:
  - `solid`: پس‌زمینه یکپارچه پرمیوم، ترنزیشن سریع، جابجایی ۲ پیکسلی رو به پایین در زمان کلیک (`active:translate-y-[2px]`).
  - `outline`: کادر ۲ پیکسلی با انیمیشن پر شدن از مرکز به هنگام هاور (`[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]`).
  - `text`: مینیمال با خط زیرین دکوراتیو ۳.۵ پیکسلی با آفست ۶ پیکسل.

### ۲. فیلدهای ورودی (Input)
- هماهنگی کامل ارتفاع با دکمه‌ها (`44px`، `52px`، `60px`).
- کادر ۲ پیکسلی، گوشه‌های کاملاً تیز (`rounded-none`).
- کرت (Caret) اختصاصی سفارشی و تبدیل خودکار به اعداد فارسی.

### ۳. آیکون‌ها (Icons)
- **قانون انحصاری:** تمامی آیکون‌ها منحصراً و بدون استثنا از کتابخانه `@tabler/icons-react` ایمپورت می‌شوند.
- ضخامت استاندارد خط آیکون‌ها: `stroke-[2.2px]`.

### ۴. موشن و انیمیشن (Motion)
- **انیمیشن‌های عمومی پلتفرم:** تخت، سریع، سبک و مینیمال (بین ۱۵۰ تا ۳۰۰ میلی‌ثانیه).
- **انیمیشن‌های فیزیکی سنگین و ملموس (Showcase):**
  - اختصاص یافته به سکشن‌های خاص و المان‌های تعاملی شاخص.
  - مانند لودر اسپینر مکعب غلطان (`TumblingCubeLoader`) با شبیه‌سازی فیزیک سقوط آزاد، تکانه و برخورد به زمین.
- **تصویرسازی‌ها:** منحصراً خطی و ۲ بعدی (2D line-art).

## Do's and Don'ts

### بایدها (Do's)
- از کلاس‌های مبتنی بر توکن و متغیرهای `globals.css` برای استایل‌دهی استفاده کنید.
- از گوشه‌های تیز (`rounded-none`) در تمامی اجزا محافظت کنید.
- فقط از آیکون‌های `@tabler/icons-react` استفاده کنید.
- ارقام را فارسی نمایش دهید.
- ادبیات و واژگان محصول را با `docs/04-glossary.md` و لحن `docs/voice.md` تطبیق دهید.

### نبایدها (Don'ts)
- از کدهای رنگی هاردکد شده نظیر `#1f2b8f` یا `bg-[#...]` مستقیماً داخل کدهای React استفاده نکنید.
- از پکیج‌های متفرقه آیکون (Lucide, Heroicons, FontAwesome) یا SVG دستی استفاده نکنید.
- گوشه‌های گرد (مثل `rounded-lg` یا `rounded-full`) روی دکمه‌ها و فیلدها اعمال نکنید.
- واژه‌های ممنوعه تبلیغاتی («انقلابی»، «بی‌نظیر»، «معجزه»، «فوق‌العاده»، «بهترین» و...) را هرگز در متن‌ها به کار نبرید.
