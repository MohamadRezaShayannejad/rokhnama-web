'use client';

import React, { useState, useMemo } from 'react';

interface WaterProps {
  waterLiters: number; // مقدار آب بر حسب لیتر
  className?: string;
}

// چیدمان ۶ بطری/مخزن آب شیشه‌ای ایزومتریک روی یک سینی پایه‌دار
const BOTTLE_POSITIONS = [
  // ردیف عقب
  { id: 0, x: 130, y: 80, delay: 0 },
  { id: 1, x: 170, y: 100, delay: 50 },
  { id: 2, x: 210, y: 120, delay: 100 },

  // ردیف جلو
  { id: 3, x: 100, y: 95, delay: 150 },
  { id: 4, x: 140, y: 115, delay: 200 },
  { id: 5, x: 180, y: 135, delay: 250 },
];

export default function IsometricWaterIllustration({
  waterLiters,
  className = '',
}: WaterProps) {
  const [hoveredBottle, setHoveredBottle] = useState<number | null>(null);

  // تعداد بطری‌های پر از آب متناسب با حجم لیتر آب ذخیره‌شده (از ۲ تا ۶ بطری)
  const activeBottles = useMemo(() => {
    if (waterLiters <= 5000) return 2;
    if (waterLiters <= 15000) return 3;
    if (waterLiters <= 30000) return 4;
    if (waterLiters <= 60000) return 5;
    return 6;
  }, [waterLiters]);

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

        {/* ۱. سینی فلزی/شیشه‌ای ایزومتریک پایه */}
        <g>
          {/* صفحه رویی سینی */}
          <polygon
            points="170,65 255,108 170,150 85,108"
            fill="#ffffff"
            stroke="#9ca3af"
            strokeWidth="0.8"
          />
          {/* ضخامت لبه سینی */}
          <line x1="85" y1="108" x2="85" y2="112" stroke="#9ca3af" strokeWidth="0.8" />
          <line x1="170" y1="150" x2="170" y2="154" stroke="#9ca3af" strokeWidth="0.8" />
          <line x1="255" y1="108" x2="255" y2="112" stroke="#9ca3af" strokeWidth="0.8" />
          <polyline
            points="85,112 170,154 255,112"
            stroke="#9ca3af"
            strokeWidth="0.8"
            fill="none"
          />
          {/* شیار داخلی ضدلغزش سینی */}
          <polygon
            points="170,72 245,110 170,144 95,110"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="0.6"
            strokeDasharray="2 1.5"
          />
        </g>

        {/* ۲. بطری‌های آب ایزومتریک خطی هیرلاین */}
        {BOTTLE_POSITIONS.map((pos, idx) => {
          const isActive = idx < activeBottles;
          const isHovered = hoveredBottle === idx;
          const bx = pos.x;
          const by = pos.y;
          const bw = 10; // شعاع افقی بدنه استوانه
          const bh = 5;  // شعاع عمودی مقطع ایزومتریک
          const bodyH = 34; // ارتفاع بدنه بطری

          return (
            <g
              key={pos.id}
              onMouseEnter={() => setHoveredBottle(idx)}
              onMouseLeave={() => setHoveredBottle(null)}
              className="cursor-pointer transition-transform duration-300"
              style={{
                transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
              }}
            >
              {/* بطری آب خطی */}
              <g
                style={{
                  opacity: isActive ? 1 : 0.25,
                  transform: isActive
                    ? 'scale(1) translateY(0)'
                    : 'scale(0.85) translateY(4px)',
                  transformOrigin: `${bx}px ${by}px`,
                  transition: `all 400ms cubic-bezier(0.16, 1, 0.3, 1) ${pos.delay * 0.4}ms`,
                }}
              >
                {/* کف بطری */}
                <ellipse
                  cx={bx}
                  cy={by}
                  rx={bw}
                  ry={bh}
                  fill="#ffffff"
                  stroke={isActive ? '#64748b' : '#cbd5e1'}
                  strokeWidth="0.8"
                />

                {/* آب درون بطری (سطح مایع) */}
                {isActive && (
                  <>
                    <path
                      d={`
                        M ${bx - bw * 0.9} ${by - 2}
                        L ${bx - bw * 0.9} ${by - bodyH * 0.7}
                        A ${bw * 0.9} ${bh * 0.9} 0 0 0 ${bx + bw * 0.9} ${by - bodyH * 0.7}
                        L ${bx + bw * 0.9} ${by - 2}
                        Z
                      `}
                      fill="#f0f9ff"
                      stroke="#0284c7"
                      strokeWidth="0.75"
                    />
                    {/* خط تراز آب / منیسکوس مایع */}
                    <ellipse
                      cx={bx}
                      cy={by - bodyH * 0.7}
                      rx={bw * 0.9}
                      ry={bh * 0.9}
                      fill="#e0f2fe"
                      stroke="#0284c7"
                      strokeWidth="0.8"
                    />
                  </>
                )}

                {/* دیواره‌های شیشه‌ای بطری */}
                <line
                  x1={bx - bw}
                  y1={by}
                  x2={bx - bw}
                  y2={by - bodyH}
                  stroke={isActive ? '#475569' : '#cbd5e1'}
                  strokeWidth="0.85"
                />
                <line
                  x1={bx + bw}
                  y1={by}
                  x2={bx + bw}
                  y2={by - bodyH}
                  stroke={isActive ? '#475569' : '#cbd5e1'}
                  strokeWidth="0.85"
                />

                {/* شانه و گردن بطری */}
                <ellipse
                  cx={bx}
                  cy={by - bodyH}
                  rx={bw}
                  ry={bh}
                  fill="#ffffff"
                  stroke={isActive ? '#475569' : '#cbd5e1'}
                  strokeWidth="0.8"
                />

                {/* شیب گردن بطری به سمت دهانه */}
                <line
                  x1={bx - bw * 0.9}
                  y1={by - bodyH}
                  x2={bx - bw * 0.4}
                  y2={by - bodyH - 6}
                  stroke={isActive ? '#475569' : '#cbd5e1'}
                  strokeWidth="0.8"
                />
                <line
                  x1={bx + bw * 0.9}
                  y1={by - bodyH}
                  x2={bx + bw * 0.4}
                  y2={by - bodyH - 6}
                  stroke={isActive ? '#475569' : '#cbd5e1'}
                  strokeWidth="0.8"
                />

                {/* درب و سرپوش بطری */}
                <ellipse
                  cx={bx}
                  cy={by - bodyH - 6}
                  rx={bw * 0.4}
                  ry={bh * 0.4}
                  fill={isActive ? (isHovered ? '#0284c7' : '#0369a1') : '#94a3b8'}
                  stroke={isActive ? '#0284c7' : '#64748b'}
                  strokeWidth="0.8"
                />
                <line
                  x1={bx - bw * 0.4}
                  y1={by - bodyH - 6}
                  x2={bx - bw * 0.4}
                  y2={by - bodyH - 9}
                  stroke={isActive ? '#0284c7' : '#64748b'}
                  strokeWidth="0.8"
                />
                <line
                  x1={bx + bw * 0.4}
                  y1={by - bodyH - 6}
                  x2={bx + bw * 0.4}
                  y2={by - bodyH - 9}
                  stroke={isActive ? '#0284c7' : '#64748b'}
                  strokeWidth="0.8"
                />
                <ellipse
                  cx={bx}
                  cy={by - bodyH - 9}
                  rx={bw * 0.4}
                  ry={bh * 0.4}
                  fill={isActive ? '#38bdf8' : '#cbd5e1'}
                  stroke={isActive ? '#0284c7' : '#64748b'}
                  strokeWidth="0.8"
                />
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
