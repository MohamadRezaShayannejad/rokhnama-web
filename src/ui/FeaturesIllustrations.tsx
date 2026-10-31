'use client';

import React from 'react';

interface IllustrationProps {
  play?: boolean;
}

/**
 * ۱. ایلستریشن پاپ‌آپ و هات‌اسپات (Hotspot & Spec Flyout)
 * طراحی به سبک ایزومتریک ۳۰ درجه با خطوط هیرلاین ۰.۹px
 * نمایش قطعه صنعتی، نقطه هات‌اسپات فعال و پنجره بازشونده مشخصات فنی
 */
export function HotspotIllustration({ play = false }: IllustrationProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 280 180"
        className="w-full h-full max-h-[170px] select-none transition-transform duration-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* پایه/پلیت ایزومتریک */}
        <polygon
          points="140,165 40,115 140,65 240,115"
          fill="#ffffff"
          stroke="#e5e7eb"
          strokeWidth="0.9"
        />
        <line x1="140" y1="165" x2="140" y2="175" stroke="#d1d5dc" strokeWidth="0.9" />
        <line x1="40" y1="115" x2="40" y2="125" stroke="#d1d5dc" strokeWidth="0.9" />
        <line x1="240" y1="115" x2="240" y2="125" stroke="#d1d5dc" strokeWidth="0.9" />
        <polygon points="140,175 40,125 40,115 140,165" fill="#f3f4f6" stroke="#d1d5dc" strokeWidth="0.9" />
        <polygon points="140,175 240,125 240,115 140,165" fill="#e5e7eb" stroke="#d1d5dc" strokeWidth="0.9" />

        {/* قطعه صنعتی اصلی به صورت بلوک ایزومتریک */}
        <g
          style={{
            transform: play ? 'translateY(-3px)' : 'translateY(0)',
            transition: 'transform 300ms ease',
          }}
        >
          {/* وجه بالایی */}
          <polygon points="110,105 70,85 110,65 150,85" fill="#ffffff" stroke="#4a5565" strokeWidth="1" />
          {/* وجه راست */}
          <polygon points="110,105 150,85 150,115 110,135" fill="#f3f4f6" stroke="#4a5565" strokeWidth="1" />
          {/* وجه چپ */}
          <polygon points="110,105 70,85 70,115 110,135" fill="#e5e7eb" stroke="#4a5565" strokeWidth="1" />
          {/* سوراخ/شیار مهندسی روی قطعه */}
          <ellipse cx="110" cy="85" rx="14" ry="7" fill="#ffffff" stroke="#1f2b8f" strokeWidth="0.9" strokeDasharray="2 1" />
        </g>

        {/* نقطه هات‌اسپات فعال روی قطعه */}
        <g>
          <circle cx="120" cy="80" r={play ? 5 : 3.5} fill="#1f2b8f" className="transition-all duration-300" />
          <circle
            cx="120"
            cy="80"
            r={play ? 9 : 6.5}
            stroke="#1f2b8f"
            strokeWidth="0.8"
            opacity={play ? 0.8 : 0.4}
            className="transition-all duration-300"
          />
        </g>

        {/* خط اتصال و راهنما از هات‌اسپات به پنجره پاپ‌آپ */}
        <polyline
          points="120,80 145,55 165,55"
          stroke="#1f2b8f"
          strokeWidth="0.9"
          strokeDasharray="2 1.5"
        />
        <circle cx="165" cy="55" r="1.5" fill="#1f2b8f" />

        {/* پنجره پاپ‌آپ بازشونده مشخصات فنی (Spec Flyout Window) */}
        <g
          style={{
            transform: play ? 'translateY(-4px)' : 'translateY(0)',
            transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* کادر پس‌زمینه پاپ‌آپ با سایه خطی تیز */}
          <rect x="170" y="25" width="95" height="72" fill="#ffffff" stroke="#1f2b8f" strokeWidth="1.1" />
          {/* نوار سربرگ پاپ‌آپ */}
          <rect x="170" y="25" width="95" height="15" fill="#f5f6fb" stroke="#1f2b8f" strokeWidth="0.8" />
          <text x="176" y="36" fill="#1f2b8f" fontSize="7" fontWeight="bold" fontFamily="monospace">SPEC // HOTSPOT</text>
          <line x1="255" y1="30" x2="261" y2="36" stroke="#6a7282" strokeWidth="0.9" />
          <line x1="261" y1="30" x2="255" y2="36" stroke="#6a7282" strokeWidth="0.9" />

          {/* ردیف‌های مشخصات فنی داخل پاپ‌آپ */}
          <rect x="176" y="46" width="34" height="4" fill="#364153" />
          <rect x="220" y="46" width="38" height="4" fill="#d1d5dc" />

          <rect x="176" y="55" width="28" height="4" fill="#6a7282" />
          <rect x="212" y="55" width="46" height="4" fill="#e5e7eb" />

          <rect x="176" y="64" width="38" height="4" fill="#364153" />
          <rect x="226" y="64" width="32" height="4" fill="#d1d5dc" />

          {/* تگ واریانت طلایی در پایین پاپ‌آپ */}
          <rect x="176" y="76" width="44" height="13" fill="#faf6ed" stroke="#d3b05a" strokeWidth="0.8" />
          <text x="198" y="85" fill="#a8820c" fontSize="6.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">۳ VARIANTS</text>
        </g>
      </svg>
    </div>
  );
}

/**
 * ۲. ایلستریشن گوشی هوشمند ایزومتریک (Isometric PWA Phone)
 * منطبق با پرسپکتیو ۳۰ درجه سایر المان‌های Hairline با خطوط مهندسی ۰.۹px
 */
export function IsometricPhoneIllustration({ play = false }: IllustrationProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 240 180"
        className="w-full h-full max-h-[170px] select-none transition-transform duration-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* شاسی و کالبد ایزومتریک گوشی موبایل (زاویه ۳۰ درجه) */}
        <g
          style={{
            transform: play ? 'translateY(-3px)' : 'translateY(0)',
            transition: 'transform 300ms ease',
          }}
        >
          {/* ضخامت جانبی گوشی (لبه پایین و راست) */}
          <polygon points="120,165 60,130 60,136 120,171" fill="#4a5565" stroke="#364153" strokeWidth="0.9" />
          <polygon points="120,165 180,130 180,136 120,171" fill="#6a7282" stroke="#364153" strokeWidth="0.9" />

          {/* صفحه رویی گوشی */}
          <polygon points="120,165 60,130 120,25 180,60" fill="#ffffff" stroke="#364153" strokeWidth="1.2" />

          {/* کادر شیشه‌ای اسکرین داخل گوشی */}
          <polygon points="120,157 68,127 120,35 172,65" fill="#f9fafb" stroke="#d1d5dc" strokeWidth="0.8" />

          {/* ناچ / دوربین بالای گوشی */}
          <ellipse cx="120" cy="42" rx="4" ry="2" fill="#364153" />

          {/* المان‌های ویترین کاتالوگ روی صفحه گوشی */}
          {/* هدر اپ */}
          <polygon points="120,62 82,44 112,38 150,56" fill="#e8ecf6" stroke="#ccd4eb" strokeWidth="0.6" />

          {/* کارت تصویر محصول شاخص در گوشی */}
          <polygon points="120,105 80,82 120,59 160,82" fill="#ffffff" stroke="#e5e7eb" strokeWidth="0.8" />
          <polygon points="120,95 90,78 120,61 150,78" fill="#f3f4f6" stroke="#d1d5dc" strokeWidth="0.6" />

          {/* هات‌اسپات روی صفحه گوشی */}
          <circle cx="125" cy="78" r={play ? 3.5 : 2.5} fill="#1f2b8f" />
          <circle cx="125" cy="78" r={play ? 6 : 4.5} stroke="#1f2b8f" strokeWidth="0.6" opacity="0.5" />

          {/* خطوط متن و مشخصات در گوشی */}
          <polygon points="105,115 85,103 100,100 120,112" fill="#101828" />
          <polygon points="140,118 125,110 135,108 150,116" fill="#1f2b8f" />

          {/* گرید ۲ قلم کالای بعدی در انتهای صفحه گوشی */}
          <polygon points="100,144 75,130 95,118 120,132" fill="#ffffff" stroke="#e5e7eb" strokeWidth="0.6" />
          <polygon points="145,144 120,130 140,118 165,132" fill="#ffffff" stroke="#e5e7eb" strokeWidth="0.6" />
        </g>

        {/* برچسب شناور PWA و نشانگر آفلاین در کنار گوشی */}
        <g
          style={{
            transform: play ? 'translate(0, -4px)' : 'translate(0, 0)',
            transition: 'transform 300ms ease',
          }}
        >
          {/* پلاک ایزومتریک PWA */}
          <polygon points="195,85 165,68 185,57 215,74" fill="#ffffff" stroke="#1f2b8f" strokeWidth="1" />
          <polygon points="195,85 195,89 215,78 215,74" fill="#e8ecf6" stroke="#1f2b8f" strokeWidth="0.8" />
          <text x="190" y="73" fill="#1f2b8f" fontSize="7.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">PWA</text>

          {/* خط راهنمای نقطه اتصال به آنتن/کش */}
          <line x1="165" y1="68" x2="148" y2="78" stroke="#1f2b8f" strokeWidth="0.8" strokeDasharray="1.5 1" />
          <circle cx="148" cy="78" r="1.5" fill="#1f2b8f" />
        </g>
      </svg>
    </div>
  );
}

/**
 * ۳. ایلستریشن صدور برگ سفارش و پیش‌فاکتور A4
 * نمایش برگه رسمی با خطوط استاندارد، سربرگ شرکتی، جدول اقلام، مهر و امضا
 */
export function OrderSheetIllustration({ play = false }: IllustrationProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 280 180"
        className="w-full h-full max-h-[170px] select-none transition-transform duration-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* سطح یا تخته مهندسی زیرین (Clipboard / Base Plate) */}
        <polygon
          points="140,168 30,105 140,42 250,105"
          fill="#f9fafb"
          stroke="#d1d5dc"
          strokeWidth="0.9"
        />
        <polygon points="140,174 30,111 30,105 140,168" fill="#e5e7eb" stroke="#d1d5dc" strokeWidth="0.9" />
        <polygon points="140,174 250,111 250,105 140,168" fill="#d1d5dc" stroke="#99a1af" strokeWidth="0.9" />

        {/* برگه رسمی سفارش A4 (شناور با انیمیشن در زمان هاور) */}
        <g
          style={{
            transform: play ? 'translateY(-6px)' : 'translateY(0)',
            transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* سایه خطی زیر کاغذ A4 */}
          <polygon
            points="140,158 50,106 140,54 230,106"
            fill="#000000"
            fillOpacity="0.04"
          />

          {/* برگ سفید A4 با کادر دقیق مهندسی */}
          <polygon
            points="140,154 50,102 140,50 230,102"
            fill="#ffffff"
            stroke="#1f2b8f"
            strokeWidth="1.1"
          />

          {/* تاخوردگی ظریف گوشه بالای کاغذ (Dog-ear) */}
          <polygon points="140,50 132,55 140,59 148,55" fill="#f5f6fb" stroke="#ccd4eb" strokeWidth="0.8" />

          {/* سربرگ رسمی پیش‌فاکتور (Company Header) */}
          <polygon points="120,68 70,74 77,70 127,64" fill="#1f2b8f" />
          <polygon points="190,80 140,86 147,82 197,76" fill="#6a7282" />
          <line x1="72" y1="78" x2="208" y2="78" stroke="#1f2b8f" strokeWidth="0.9" />

          {/* جدول ۴ ستونه اقلام سفارش داخل برگه A4 */}
          {/* سطر ۱: عنوان ستون‌ها */}
          <polygon points="140,94 68,88 140,78 212,84" fill="#f5f6fb" stroke="#ccd4eb" strokeWidth="0.6" />

          {/* سطر ۲: قلم کالا ۱ */}
          <polygon points="140,106 68,100 140,90 212,96" fill="#ffffff" stroke="#e5e7eb" strokeWidth="0.5" />
          <rect x="90" y="94" width="24" height="2" fill="#364153" transform="skewX(-30)" />
          <rect x="140" y="92" width="16" height="2" fill="#1f2b8f" transform="skewX(-30)" />

          {/* سطر ۳: قلم کالا ۲ */}
          <polygon points="140,118 68,112 140,102 212,108" fill="#ffffff" stroke="#e5e7eb" strokeWidth="0.5" />
          <rect x="90" y="106" width="30" height="2" fill="#364153" transform="skewX(-30)" />
          <rect x="140" y="104" width="16" height="2" fill="#1f2b8f" transform="skewX(-30)" />

          {/* سطر ۴: قلم کالا ۳ */}
          <polygon points="140,130 68,124 140,114 212,120" fill="#ffffff" stroke="#e5e7eb" strokeWidth="0.5" />
          <rect x="90" y="118" width="20" height="2" fill="#364153" transform="skewX(-30)" />
          <rect x="140" y="116" width="16" height="2" fill="#1f2b8f" transform="skewX(-30)" />

          {/* جمع کل سفارش */}
          <polygon points="140,140 120,135 170,128 190,133" fill="#faf6ed" stroke="#d3b05a" strokeWidth="0.8" />
          <rect x="135" y="132" width="28" height="2.5" fill="#a8820c" transform="skewX(-30)" />

          {/* مهر و امضای رسمی در گوشه پایین برگه (Corporate Stamp) */}
          <g>
            <ellipse cx="88" cy="128" rx="12" ry="7" fill="#f5f6fb" stroke="#1f2b8f" strokeWidth="0.9" strokeDasharray="2 1" />
            <text x="88" y="130" fill="#1f2b8f" fontSize="5.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">VERIFIED</text>
          </g>
        </g>
      </svg>
    </div>
  );
}
