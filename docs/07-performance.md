# راهنمای پرفورمنس فرانت‌اند و انیمیشن · رُخ‌نما

> این سند، چارچوب مهندسی عملکرد رابط کاربری و انیمیشن‌ها در پروژه رُخ‌نما است. هدف آن تضمین نرخ فریم پایدار (۶۰ تا ۱۲۰ فریم بر ثانیه)، حفظ روانی تعامل کاربر و پرهیز از افت فریم و ری‌رندرهای مکرر در صفحات پروژه است.

---

## ۱. انیمیشن بدون ری‌رندر ری‌اکت (Bypassing React State in High-Frequency Events)

در رخدادهایی با بسامد بالا (مانند `mousemove`، `scroll`، `touchmove` یا حلقهٔ `requestAnimationFrame`)، هرگز نباید از `useState` برای ثبت مختصات یا حرکت المان‌ها استفاده شود. هر بار تغییر استیت، یک چرخهٔ کامل رندر ری‌اکت و محاسبهٔ مجدد Virtual DOM را تحمیل می‌کند.

### قاعدهٔ عملی:
* برای ترنسفورم‌ها و تغییرات سریع بصری، مستقیماً از `useRef` و متدهای GSAP نظیر `gsap.quickTo` یا انتساب مستقیم `style.transform` استفاده کنید.
* استیت ری‌اکت صرفاً باید برای مقادیر گسسته (مانند باز/بسته شدن منو یا وضعیت Boolean تغییریافته) به کار رود.

**غلط:**
```tsx
const [offset, setOffset] = useState({ x: 0, y: 0 });

const handleMouseMove = (e: React.MouseEvent) => {
  // ری‌رندر کل کامپوننت با هر پیکسل حرکت ماوس
  setOffset({ x: e.clientX, y: e.clientY });
};

return <div style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }} />;
```

**درست:**
```tsx
const elementRef = useRef<HTMLDivElement>(null);
const xTo = useRef<gsap.QuickToFunc | null>(null);

useGSAP(() => {
  if (elementRef.current) {
    xTo.current = gsap.quickTo(elementRef.current, "x", { duration: 0.4, ease: "power2.out" });
  }
});

const handleMouseMove = (e: React.MouseEvent) => {
  xTo.current?.(e.clientX);
};

return <div ref={elementRef} />;
```

---

## ۲. پیشگیری از افت فریم و بازچینی پیوسته (Layout Thrashing)

صدا زدن متدهایی که نیازمند محاسبهٔ هندسی مجدد هستند (نظیر `getBoundingClientRect`، `elementFromPoint`، `offsetHeight` یا `scrollTop`) در هر فریم اسکرول یا حرکت ماوس، مرورگر را مجبور به همگام‌سازی فوری استایل و بازچینی (Reflow) می‌کند.

### قاعدهٔ عملی:
* برای تشخیص المان هدف، به جای `document.elementFromPoint` از `e.target` موجود در رویداد استفاده کنید.
* متغیرهای ابعاد پنجره یا محفظه را کش کنید یا از `ResizeObserver` و `IntersectionObserver` به جای شنود پیوسته استفاده نمایید.

**غلط:**
```tsx
const handleMouseMove = (e: MouseEvent) => {
  // Layout Thrashing شدید در تمام فریم‌های حرکت نشانگر
  const el = document.elementFromPoint(e.clientX, e.clientY);
  const isDark = el?.closest('.dark-area');
};
```

**درست:**
```tsx
const handleMouseMove = (e: MouseEvent) => {
  // استفاده از المان آماده رویداد بدون نیاز به بازخوانی هندسه صفحه
  const el = e.target as HTMLElement | null;
  const isDark = Boolean(el?.closest('.dark-area'));
};
```

---

## ۳. اسکوپ‌بندی و مدیریت چرخهٔ حیات در GSAP

استفاده از هوک رسمی `@gsap/react` با تنظیم `scope` مانع از نشت حافظه (Memory Leak) و سرچ‌های سراسری در سراسر ساختار DOM می‌شود.

### قاعدهٔ عملی:
* همواره `scope` کامپوننت را به `useGSAP` پاس دهید.
* انتخاب‌گرها (Selectors) را به رفرنس والد محدود کنید و از `document.querySelectorAll` بپرهیزید.
* در کامپوننت‌های اسکرولی، انیمیشن‌های سنگین را به بخش مرئی (Viewport) محدود کنید.

**غلط:**
```tsx
useGSAP(() => {
  // جست‌وجوی سراسری در کل بدنه داکیومنت
  const cards = document.querySelectorAll('.card-item');
  gsap.from(cards, { opacity: 0 });
});
```

**درست:**
```tsx
const container = useRef<HTMLElement>(null);

useGSAP(() => {
  // محدود به المنت‌های داخل کانتینر
  gsap.from('.card-item', { opacity: 0 });
}, { scope: container });
```

---

## ۴. احترام به تنظیمات دسترسی‌پذیری و کاهش موشن (prefers-reduced-motion)

برخی کاربران به دلایل فیزیولوژیک یا ترجیح شخصی، انیمیشن‌های سریع و پیچیده را در تنظیمات سیستم‌عامل خود خاموش می‌کنند.

### قاعدهٔ عملی:
* پیش از اجرای انیمیشن‌های طولانی یا اسکرول‌های پین‌شده، وضعیت `prefers-reduced-motion` بررسی شود.
* در صورت فعال بودن کاهش موشن، محتوا در حالت پایانی (Static Resolved State) بدون پرش به کاربر عرضه شود.

**الگوی استاندارد:**
```tsx
useGSAP(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    // تثبیت المان‌ها در وضعیت نهایی
    gsap.set('.animated-element', { opacity: 1, scale: 1, y: 0 });
    return;
  }

  // اجرای تایم‌لاین کامل در صورت تمایل کاربر به موشن
  gsap.timeline({ ... });
}, { scope: container });
```

---

## ۵. شتاب‌دهی سخت‌ازفاری و ایزوله‌سازی رندر (GPU Acceleration & Containment)

المان‌هایی که تحت تغییر پیوسته هستند باید در لایهٔ اختصاصی پردازشگر گرافیکی (Compositing Layer) قرار گیرند تا موجب بازطراحی لایه‌های مجاور نشوند.

### قاعدهٔ عملی:
* از خواص `transform` (به‌ویژه `translate3d`) و `opacity` استفاده کنید و از تغییر دادن خواص هندسی نظیر `top`، `left`، `width` و `height` در حین انیمیشن پرهیز نمایید.
* برای المان‌های متحرک از کلاس `will-change-transform` استفاده کنید، اما از اعمال بی‌رویه آن به تعداد زیادی المان که سبب مصرف بیش‌ازحد حافظه VRAM می‌شود خودداری فرمایید.

---

## ۶. باز و بسته شدن آکاردئون‌ها بدون افت فریم (Zero-Layout-Shift Accordions)

انیمیشن دادن به `height: auto` یا ترنزیشن‌های سنتی `max-height` موجب Layout Thrashing شدید و افت فریم در پردازنده‌های موبایل می‌شود.

### قاعدهٔ عملی:
* برای باز و بسته شدن روان آکاردئون‌ها، از تکنیک مدرن CSS Grid با مقدار `grid-template-rows: 0fr` به `grid-template-rows: 1fr` به همراه `transition-[grid-template-rows,opacity]` استفاده کنید.
* داخل محفظهٔ آکاردئون حتماً کلاس‌های `overflow-hidden min-h-0` قرار دهید تا محتوا هنگام بسته بودن کاملاً صفر پیکسل شود و ترنزیشن محتوای درونی GPU-accelerated باشد.
* برای رعایت دسترسی‌پذیری و جلوگیری از تاچ ناخواسته هنگام بسته بودن، در وضعیت بسته کلاس `pointer-events-none` را اعمال کنید.
* پس از تغییر وضعیت، با یک تاخیر کوتاه (همگام با اتمام ترنزیشن) متد `ScrollTrigger.refresh()` را فراخوانی کنید تا مختصات اسکرول سایر سکشن‌ها همگام بماند.

```tsx
<div
  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
  }`}
>
  <div className="overflow-hidden min-h-0">
    {/* محتوای آکاردئون */}
  </div>
</div>
```

---

## ۷. انیمیشن افزایشی اعداد و شمارنده‌ها (Direct-to-DOM Counter Animation)

اجرای انیمیشن تغییر اعداد، ارقام مالی و شمارنده‌ها از طریق استیت ری‌اکت (`useState`) باعث ده‌ها ری‌رندر در ثانیه و لگ در تعاملات لمسی اسلایدر یا فرم‌ها می‌شود.

### قاعدهٔ عملی:
* استیت ری‌اکت صرفاً باید نگهدارنده مقدار هدف یا قطعی (Discrete State) باشد.
* تغییر تدریجی متن ارقام را با متصل کردن `ref` مستقیم به المان متنی و به‌روزرسانی `textContent` در تابع `onUpdate` کتابخانه GSAP انجام دهید.
* در صورت فعال بودن `prefers-reduced-motion`، انیمیشن عددی باید نادیده گرفته شده و مستقیماً مقدار نهایی در DOM قرار گیرد.

```tsx
const priceRef = useRef<HTMLElement>(null);
const valRef = useRef({ current: targetPrice });

useEffect(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (priceRef.current) priceRef.current.textContent = format(targetPrice);
    return;
  }

  const tween = gsap.to(valRef.current, {
    current: targetPrice,
    duration: 0.35,
    ease: 'power1.out',
    onUpdate: () => {
      if (priceRef.current) {
        priceRef.current.textContent = format(valRef.current.current);
      }
    },
  });

  return () => tween.kill();
}, [targetPrice]);
```
