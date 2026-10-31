'use client';

import React from 'react';

// ۱. تصویرسازی ۲D کاملاً مینیمال، خطی و غیرایزومتریک درخت
export function FlatTreeIllustration({ treesCount }: { treesCount: number }) {
  const treeNodes = Math.min(5, Math.max(1, Math.ceil(treesCount / 5)));

  return (
    <div className="w-full h-20 flex items-end justify-center py-1 select-none">
      <svg
        viewBox="0 0 160 70"
        className="w-full h-full max-h-16 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="15" y1="64" x2="145" y2="64" stroke="var(--color-neutral-300)" strokeWidth="1" />

        {Array.from({ length: treeNodes }).map((_, i) => {
          const spacing = 130 / (treeNodes + 1);
          const x = 15 + spacing * (i + 1);
          const height = 40 + (i % 2 === 0 ? 6 : 0);
          const yTop = 64 - height;

          return (
            <g key={i} className="transition-all duration-300">
              {/* تنه نازک ۲D */}
              <line x1={x} y1="64" x2={x} y2={yTop + 14} stroke="var(--color-neutral-700)" strokeWidth="1.2" />

              {/* شاخه‌های خطی ۲D */}
              <line x1={x} y1="50" x2={x - 7} y2="44" stroke="var(--color-success-600)" strokeWidth="1" />
              <line x1={x} y1="46" x2={x + 7} y2="40" stroke="var(--color-success-600)" strokeWidth="1" />
              <line x1={x} y1="36" x2={x - 6} y2="30" stroke="var(--color-success-600)" strokeWidth="1" />

              {/* دایره ساده خطی تاج درخت */}
              <circle cx={x} cy={yTop + 8} r="8" fill="#ffffff" stroke="var(--color-success-600)" strokeWidth="1" />
              <circle cx={x} cy={yTop} r="1.5" fill="var(--color-success-600)" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ۲. تصویرسازی ۲D کاملاً مینیمال، خطی و غیرایزومتریک برگه‌های کاغذ
export function FlatPaperIllustration({ sheetsCount }: { sheetsCount: number }) {
  const stackLayers = Math.min(5, Math.max(1, Math.ceil(sheetsCount / 20000)));

  return (
    <div className="w-full h-20 flex items-end justify-center py-1 select-none">
      <svg
        viewBox="0 0 160 70"
        className="w-full h-full max-h-16 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="25" y1="64" x2="135" y2="64" stroke="var(--color-neutral-300)" strokeWidth="1" />

        {Array.from({ length: stackLayers }).map((_, idx) => {
          const yOffset = idx * 4;
          const isTop = idx === stackLayers - 1;

          return (
            <g key={idx} className="transition-all duration-300">
              <rect
                x="56"
                y={52 - yOffset}
                width="48"
                height="8"
                fill="#ffffff"
                stroke={isTop ? 'var(--color-neutral-800)' : 'var(--color-neutral-400)'}
                strokeWidth="1"
              />
              {isTop && (
                <g>
                  <line x1="62" y1={56 - yOffset} x2="78" y2={56 - yOffset} stroke="var(--color-neutral-400)" strokeWidth="0.8" />
                  <line x1="82" y1={56 - yOffset} x2="98" y2={56 - yOffset} stroke="var(--color-neutral-400)" strokeWidth="0.8" />
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ۳. تصویرسازی ۲D کاملاً مینیمال، خطی و غیرایزومتریک بطری آب
export function FlatWaterIllustration({ waterLiters }: { waterLiters: number }) {
  const fillPercent = Math.min(90, Math.max(25, Math.round((waterLiters / 80000) * 100)));
  const waterH = (fillPercent / 100) * 38;

  return (
    <div className="w-full h-20 flex items-end justify-center py-1 select-none">
      <svg
        viewBox="0 0 160 70"
        className="w-full h-full max-h-16 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="30" y1="64" x2="130" y2="64" stroke="var(--color-neutral-300)" strokeWidth="1" />

        {/* بطری آب ۲D خطی در مرکز */}
        <g transform="translate(71, 12)">
          {/* آب درون بطری */}
          <rect
            x="2"
            y={52 - waterH}
            width="14"
            height={waterH}
            fill="#f0f9ff"
            stroke="#0284c7"
            strokeWidth="0.8"
          />

          {/* بدنه شیشه‌ای بطری */}
          <rect
            x="0"
            y="14"
            width="18"
            height="38"
            fill="none"
            stroke="var(--color-neutral-800)"
            strokeWidth="1.2"
          />

          {/* گلوی بطری */}
          <path
            d="M 0 14 L 5 8 L 5 4 L 13 4 L 13 8 L 18 14"
            fill="none"
            stroke="var(--color-neutral-800)"
            strokeWidth="1.2"
          />

          {/* سرپوش و درب بطری */}
          <rect
            x="4"
            y="0"
            width="10"
            height="4"
            fill="#0284c7"
            stroke="#0284c7"
            strokeWidth="0.8"
          />
        </g>
      </svg>
    </div>
  );
}
