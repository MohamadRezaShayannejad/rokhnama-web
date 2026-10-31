'use client';

import React, { useState, useMemo } from 'react';

interface PaperProps {
  sheetsCount: number; // تعداد برگ‌های مصرفی سالانه
  kgCount: number;     // وزن کاغذ بر حسب کیلوگرم
  className?: string;
}

export default function IsometricPaperIllustration({
  sheetsCount,
  kgCount,
  className = '',
}: PaperProps) {
  const [isHovered, setIsHovered] = useState(false);

  // تعداد برگه‌ها و لایه‌های ایزومتریک چاپی در دسته (از ۲ لایه تا ۱۲ لایه متناسب با تیراژ)
  const stackLayers = useMemo(() => {
    if (sheetsCount <= 8000) return 3;
    if (sheetsCount <= 24000) return 5;
    if (sheetsCount <= 64000) return 8;
    if (sheetsCount <= 128000) return 10;
    return 12; // حداکثر ضخامت دسته کاغذ
  }, [sheetsCount]);

  // ابعاد ایزومتریک استاندارد برگ A4 (زاویه ۳۰ درجه)
  // عرض: ۵۶، ارتفاع ایزومتریک: ۲۸
  const cx = 170;
  const baseY = 135;
  const pw = 48; // نصف قطر افقی
  const ph = 24; // نصف قطر عمودی

  return (
    <div className={`relative w-full select-none ${className}`}>
      <svg
        viewBox="0 0 340 195"
        className="w-full h-auto max-h-[175px] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* خطوط راهنمای ظریف پس‌زمینه با خط‌چین ۰.۶px */}
        <g opacity="0.4">
          <ellipse cx="170" cy="105" rx="145" ry="72" stroke="#d1d5dc" strokeWidth="0.6" strokeDasharray="3 3" />
        </g>

        {/* ۱. پدال/سکوی پایه چوبی یا میز بازبینی ایزومتریک خطی */}
        <g>
          {/* صفحه رویی سکو */}
          <polygon
            points="170,118 245,155 170,192 95,155"
            fill="#ffffff"
            stroke="#9ca3af"
            strokeWidth="0.8"
          />
          {/* ضخامت سکو */}
          <line x1="95" y1="155" x2="95" y2="160" stroke="#9ca3af" strokeWidth="0.8" />
          <line x1="170" y1="192" x2="170" y2="197" stroke="#9ca3af" strokeWidth="0.8" />
          <line x1="245" y1="155" x2="245" y2="160" stroke="#9ca3af" strokeWidth="0.8" />
          <polyline
            points="95,160 170,197 245,160"
            stroke="#9ca3af"
            strokeWidth="0.8"
            fill="none"
          />

          {/* خطوط هاشور مقیاس مهندسی روی سکو */}
          <line x1="110" y1="162" x2="125" y2="170" stroke="#e5e7eb" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
          <line x1="215" y1="170" x2="230" y2="162" stroke="#e5e7eb" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
        </g>

        {/* ۲. بسته/دسته‌های کاغذ گلاسه ایزومتریک که با افزایش تیراژ بالا می‌روند */}
        <g
          className="transition-transform duration-300"
          style={{
            transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
          }}
        >
          {/* رندرسازی لایه‌های انباشته‌شده کاغذ از پایین به بالا */}
          {Array.from({ length: stackLayers }).map((_, idx) => {
            const layerY = baseY - idx * 5.5;
            const isTopSheet = idx === stackLayers - 1;
            const delay = idx * 30;

            return (
              <g
                key={idx}
                style={{
                  transform: `translateY(0)`,
                  transition: `all 350ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
                }}
              >
                {/* بدنه و لبه جانبی برگه (ضخامت کاغذ) */}
                <polygon
                  points={`
                    ${cx - pw},${layerY}
                    ${cx},${layerY + ph}
                    ${cx + pw},${layerY}
                    ${cx + pw},${layerY + 3}
                    ${cx},${layerY + ph + 3}
                    ${cx - pw},${layerY + 3}
                  `}
                  fill="#f9fafb"
                  stroke="#9ca3af"
                  strokeWidth="0.75"
                />

                {/* صفحه سفید گلاسه هر لایه */}
                <polygon
                  points={`
                    ${cx},${layerY - ph}
                    ${cx + pw},${layerY}
                    ${cx},${layerY + ph}
                    ${cx - pw},${layerY}
                  `}
                  fill={isTopSheet ? '#ffffff' : '#fcfcfc'}
                  stroke={isTopSheet ? '#475569' : '#9ca3af'}
                  strokeWidth={isTopSheet ? '0.9' : '0.7'}
                />

                {/* اگر برگه رویی باشد: خطوط فنی کاتالوگ و گوشه تاشده مهندسی */}
                {isTopSheet && (
                  <g>
                    {/* کادر مارجین خطی داخل برگه */}
                    <polygon
                      points={`
                        ${cx},${layerY - ph + 4}
                        ${cx + pw - 8},${layerY}
                        ${cx},${layerY + ph - 4}
                        ${cx - pw + 8},${layerY}
                      `}
                      fill="none"
                      stroke="#cbd5e1"
                      strokeWidth="0.6"
                      strokeDasharray="2 1.5"
                    />

                    {/* خطوط ایزومتریک شبیه‌ساز متن و محتوای کاتالوگ */}
                    <line
                      x1={cx - 24}
                      y1={layerY - 4}
                      x2={cx - 6}
                      y2={layerY + 5}
                      stroke="#94a3b8"
                      strokeWidth="0.8"
                    />
                    <line
                      x1={cx - 18}
                      y1={layerY - 7}
                      x2={cx}
                      y2={layerY + 2}
                      stroke="#94a3b8"
                      strokeWidth="0.8"
                    />
                    <line
                      x1={cx}
                      y1={layerY - 7}
                      x2={cx + 18}
                      y2={layerY + 2}
                      stroke="#94a3b8"
                      strokeWidth="0.8"
                    />
                    <line
                      x1={cx + 6}
                      y1={layerY - 4}
                      x2={cx + 24}
                      y2={layerY + 5}
                      stroke="#94a3b8"
                      strokeWidth="0.8"
                    />

                    {/* گوشه تاشده معمارانه در راس بالایی برگه (Fold Corner) */}
                    <polygon
                      points={`
                        ${cx},${layerY - ph}
                        ${cx + 8},${layerY - ph + 4}
                        ${cx},${layerY - ph + 8}
                        ${cx - 8},${layerY - ph + 4}
                      `}
                      fill="#f1f5f9"
                      stroke="#475569"
                      strokeWidth="0.75"
                    />
                  </g>
                )}
              </g>
            );
          })}

          {/* یک برگ کاغذ جداشده و معلق بالای دسته در حالت هاور */}
          {isHovered && (
            <g
              style={{
                transform: 'translateY(-14px)',
                transition: 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <polygon
                points={`
                  ${cx},${baseY - stackLayers * 5.5 - ph}
                  ${cx + pw * 0.85},${baseY - stackLayers * 5.5}
                  ${cx},${baseY - stackLayers * 5.5 + ph}
                  ${cx - pw * 0.85},${baseY - stackLayers * 5.5}
                `}
                fill="#ffffff"
                stroke="#047857"
                strokeWidth="0.9"
              />
              <line
                x1={cx - 15}
                y1={baseY - stackLayers * 5.5}
                x2={cx + 15}
                y2={baseY - stackLayers * 5.5}
                stroke="#10b981"
                strokeWidth="0.65"
                strokeDasharray="2 1.5"
              />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}
