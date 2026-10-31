'use client';

import React from 'react';

interface PhoneMockupProps {
  play?: boolean;
}

export default function PhoneMockup({ play = false }: PhoneMockupProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center py-2">
      <svg
        viewBox="0 0 160 200"
        className="w-auto h-full max-h-[170px] select-none transition-transform duration-300"
        style={{
          transform: play ? 'translateY(-2px)' : 'translateY(0)',
        }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* شاسی و کادر بیرونی گوشی با خطوط شارپ مهندسی */}
        <rect
          x="35"
          y="10"
          width="90"
          height="180"
          rx="12"
          fill="#ffffff"
          stroke="#4a5565"
          strokeWidth="1.2"
        />

        {/* حاشیه داخلی و صفحه نمایش */}
        <rect
          x="39"
          y="18"
          width="82"
          height="164"
          rx="6"
          fill="#f9fafb"
          stroke="#d1d5dc"
          strokeWidth="0.8"
        />

        {/* بلندگو و ناچ / دوربین بالای گوشی */}
        <rect x="68" y="13" width="24" height="2.5" rx="1" fill="#99a1af" />
        <circle cx="97" cy="14" r="1.2" fill="#6a7282" />

        {/* هدر صفحه کاتالوگ داخل گوشی */}
        <rect x="43" y="24" width="74" height="12" fill="#ffffff" stroke="#e5e7eb" strokeWidth="0.6" />
        <rect x="46" y="28" width="16" height="4" fill="#1f2b8f" />
        <rect x="105" y="28" width="8" height="4" fill="#d1d5dc" />

        {/* محصول شاخص در ویترین گوشی */}
        <rect x="43" y="40" width="74" height="66" fill="#ffffff" stroke="#e5e7eb" strokeWidth="0.6" />
        <rect x="47" y="44" width="66" height="38" fill="#f3f4f6" stroke="#e5e7eb" strokeWidth="0.6" />

        {/* آبجکت شماتیک قطعه صنعتی در گوشی */}
        <rect x="62" y="50" width="36" height="24" stroke="#1f2b8f" strokeWidth="1" strokeDasharray="2 1" fill="#ffffff" />
        <circle cx="80" cy="62" r="5" stroke="#d3b05a" strokeWidth="1" fill="#ffffff" />

        {/* هات‌اسپات تعاملی روی قطعه در گوشی با پالس در زمان هاور */}
        <circle
          cx="88"
          cy="56"
          r={play ? 3.5 : 2.5}
          fill="#1f2b8f"
          className="transition-all duration-300"
        />
        <circle
          cx="88"
          cy="56"
          r={play ? 6 : 4}
          stroke="#1f2b8f"
          strokeWidth="0.6"
          opacity={play ? 0.8 : 0.4}
          className="transition-all duration-300"
        />

        {/* عنوان و کد محصول */}
        <rect x="47" y="86" width="34" height="3" fill="#101828" />
        <rect x="47" y="92" width="20" height="2" fill="#6a7282" />
        <rect x="91" y="87" width="22" height="6" fill="#1f2b8f" rx="1" />

        {/* گرید ۲ تایی محصولات پایین کاتالوگ */}
        <rect x="43" y="110" width="35" height="42" fill="#ffffff" stroke="#e5e7eb" strokeWidth="0.6" />
        <rect x="46" y="113" width="29" height="22" fill="#f3f4f6" />
        <rect x="46" y="139" width="18" height="2" fill="#364153" />

        <rect x="82" y="110" width="35" height="42" fill="#ffffff" stroke="#e5e7eb" strokeWidth="0.6" />
        <rect x="85" y="113" width="29" height="22" fill="#f3f4f6" />
        <rect x="85" y="139" width="18" height="2" fill="#364153" />

        {/* نوار پایینی گوشی (Home indicator) */}
        <rect x="65" y="176" width="30" height="2" rx="1" fill="#99a1af" />

        {/* نشان PWA / نشانگر ارتباط پایدار در کنار گوشی */}
        <g
          style={{
            transform: play ? 'translate(0, -3px)' : 'translate(0, 0)',
            transition: 'transform 300ms ease',
          }}
        >
          <rect x="108" y="32" width="36" height="18" fill="#ffffff" stroke="#1f2b8f" strokeWidth="1" />
          <text x="126" y="44" fill="#1f2b8f" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
            PWA
          </text>
          <line x1="108" y1="41" x2="103" y2="41" stroke="#1f2b8f" strokeWidth="0.8" strokeDasharray="1.5 1" />
        </g>
      </svg>
    </div>
  );
}
