'use client';

import React, { useState, useMemo } from 'react';

interface ForestProps {
  treesCount: number; // تعداد واقعی درختان محاسبه‌شده
  className?: string;
}

// مختصات دقیق ۱۶ قطعه زمین ایزومتریک تکه‌تکه در پرسپکتیو ۳۰ درجه (مرتب‌شده از عمق به جلو)
const TERRAIN_PLOTS = [
  // ردیف عقب
  { id: 0, x: 170, y: 44, size: 'sm', delay: 0 },
  { id: 1, x: 135, y: 64, size: 'md', delay: 35 },
  { id: 2, x: 205, y: 64, size: 'sm', delay: 70 },

  // ردیف میانی ۱
  { id: 3, x: 100, y: 84, size: 'md', delay: 105 },
  { id: 4, x: 170, y: 84, size: 'lg', delay: 140 },
  { id: 5, x: 240, y: 84, size: 'md', delay: 175 },

  // ردیف میانی ۲
  { id: 6, x: 65, y: 104, size: 'sm', delay: 210 },
  { id: 7, x: 135, y: 104, size: 'lg', delay: 245 },
  { id: 8, x: 205, y: 104, size: 'lg', delay: 280 },
  { id: 9, x: 275, y: 104, size: 'sm', delay: 315 },

  // ردیف جلو
  { id: 10, x: 100, y: 124, size: 'md', delay: 350 },
  { id: 11, x: 170, y: 124, size: 'lg', delay: 385 },
  { id: 12, x: 240, y: 124, size: 'md', delay: 420 },

  // نوک جلوی جنگل
  { id: 13, x: 135, y: 144, size: 'md', delay: 455 },
  { id: 14, x: 205, y: 144, size: 'sm', delay: 490 },
  { id: 15, x: 170, y: 164, size: 'md', delay: 525 },
];

export default function IsometricForestIllustration({
  treesCount,
  className = '',
}: ForestProps) {
  const [hoveredPlot, setHoveredPlot] = useState<number | null>(null);

  // نگاشت تعداد درختان به ۱۶ قطعه زمین ایزومتریک
  const activeCount = useMemo(() => {
    if (treesCount <= 1) return 2;
    if (treesCount <= 3) return 4;
    if (treesCount <= 6) return 7;
    if (treesCount <= 10) return 10;
    if (treesCount <= 18) return 13;
    return 16;
  }, [treesCount]);

  return (
    <div className={`relative w-full select-none ${className}`}>
      <svg
        viewBox="0 0 340 195"
        className="w-full h-auto max-h-[175px] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* خطوط راهنمای ظریف پس‌زمینه با خط‌چین ۰.۶px */}
        <g opacity="0.4">
          <ellipse cx="170" cy="105" rx="145" ry="72" stroke="#d1d5dc" strokeWidth="0.6" strokeDasharray="3 3" />
        </g>

        {/* ۱۶ قطعه زمین و درختان خطی هیرلاین — چیدمان بر اساس عمق */}
        {TERRAIN_PLOTS.map((plot, index) => {
          const isActive = index < activeCount;
          const isHovered = hoveredPlot === index;
          const pw = plot.size === 'lg' ? 24 : plot.size === 'md' ? 20 : 16;
          const ph = pw * 0.5; // زاویه ۳۰ درجه
          const cx = plot.x;
          const cy = plot.y;
          const treeHeight = plot.size === 'lg' ? 36 : plot.size === 'md' ? 30 : 24;

          return (
            <g
              key={plot.id}
              onMouseEnter={() => setHoveredPlot(index)}
              onMouseLeave={() => setHoveredPlot(null)}
              className="cursor-pointer transition-transform duration-300"
              style={{
                transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
              }}
            >
              {/* ۱. سکوی ایزومتریک خطی مینیمال */}
              <polygon
                points={`
                  ${cx},${cy - ph}
                  ${cx + pw},${cy}
                  ${cx},${cy + ph}
                  ${cx - pw},${cy}
                `}
                fill={isActive ? (isHovered ? '#f9fafb' : '#ffffff') : 'transparent'}
                stroke={isActive ? '#9ca3af' : '#e5e7eb'}
                strokeWidth={isActive ? '0.85' : '0.6'}
                strokeDasharray={isActive ? 'none' : '2 1.5'}
                className="transition-colors duration-200"
              />

              {/* خطوط لبه ضخامت سکو (فقط خطوط بدون فیل سنگین) */}
              {isActive && (
                <>
                  <line x1={cx - pw} y1={cy} x2={cx - pw} y2={cy + 3} stroke="#9ca3af" strokeWidth="0.8" />
                  <line x1={cx} y1={cy + ph} x2={cx} y2={cy + ph + 3} stroke="#9ca3af" strokeWidth="0.8" />
                  <line x1={cx + pw} y1={cy} x2={cx + pw} y2={cy + 3} stroke="#9ca3af" strokeWidth="0.8" />
                  <polyline
                    points={`${cx - pw},${cy + 3} ${cx},${cy + ph + 3} ${cx + pw},${cy + 3}`}
                    stroke="#9ca3af"
                    strokeWidth="0.8"
                    fill="none"
                  />
                </>
              )}

              {/* ۲. درخت ایزومتریک خطی مینیمال (Pure Hairline Line-Art Tree) */}
              <g
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive
                    ? `scale(1) translateY(0)`
                    : `scale(0.1) translateY(10px)`,
                  transformOrigin: `${cx}px ${cy}px`,
                  transition: `all 400ms cubic-bezier(0.16, 1, 0.3, 1) ${plot.delay * 0.35}ms`,
                }}
              >
                {/* تنه خطی مینیمال */}
                <line x1={cx} y1={cy} x2={cx} y2={cy - 6} stroke="#475569" strokeWidth="1" />

                {/* طبقه ۱ شاخ و برگ (پایین) — خطوط خالص ایزومتریک */}
                <polygon
                  points={`
                    ${cx - pw * 0.6},${cy - 6}
                    ${cx},${cy - 6 - treeHeight * 0.42}
                    ${cx + pw * 0.6},${cy - 6}
                    ${cx},${cy - 4}
                  `}
                  fill="#ffffff"
                  stroke={isHovered ? '#059669' : '#047857'}
                  strokeWidth="0.85"
                />
                {/* خط عطف مرکزی طبقه ۱ */}
                <line
                  x1={cx}
                  y1={cy - 4}
                  x2={cx}
                  y2={cy - 6 - treeHeight * 0.42}
                  stroke="#10b981"
                  strokeWidth="0.65"
                />

                {/* طبقه ۲ شاخ و برگ (میانی) */}
                <polygon
                  points={`
                    ${cx - pw * 0.46},${cy - 6 - treeHeight * 0.3}
                    ${cx},${cy - 6 - treeHeight * 0.72}
                    ${cx + pw * 0.46},${cy - 6 - treeHeight * 0.3}
                    ${cx},${cy - 4 - treeHeight * 0.3}
                  `}
                  fill="#ffffff"
                  stroke={isHovered ? '#059669' : '#047857'}
                  strokeWidth="0.85"
                />
                {/* خط عطف مرکزی طبقه ۲ */}
                <line
                  x1={cx}
                  y1={cy - 4 - treeHeight * 0.3}
                  x2={cx}
                  y2={cy - 6 - treeHeight * 0.72}
                  stroke="#10b981"
                  strokeWidth="0.65"
                />

                {/* طبقه ۳ تاج درخت (بالاترین منشور هیرلاین) */}
                <polygon
                  points={`
                    ${cx - pw * 0.3},${cy - 6 - treeHeight * 0.6}
                    ${cx},${cy - 6 - treeHeight}
                    ${cx + pw * 0.3},${cy - 6 - treeHeight * 0.6}
                    ${cx},${cy - 4 - treeHeight * 0.6}
                  `}
                  fill="#ffffff"
                  stroke="#047857"
                  strokeWidth="0.9"
                />
                {/* خط عطف مرکزی تاج */}
                <line
                  x1={cx}
                  y1={cy - 4 - treeHeight * 0.6}
                  x2={cx}
                  y2={cy - 6 - treeHeight}
                  stroke="#059669"
                  strokeWidth="0.75"
                />

                {/* نقطه راس مهندسی روی نوک درخت */}
                <circle
                  cx={cx}
                  cy={cy - 6 - treeHeight}
                  r="1"
                  fill="#047857"
                />
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
