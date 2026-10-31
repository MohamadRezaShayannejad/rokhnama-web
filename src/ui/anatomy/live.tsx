"use client";

import * as React from "react";
import { frameOf } from "./frame";
import { asksForStillness, useLoop } from "./kit/react/live";

interface LiveProps {
  progress?: number;
  onProgressChange?: (p: number) => void;
  children: React.ReactNode;
}

export function PressLive({ progress: externalP, onProgressChange, children }: LiveProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [internalP, setInternalP] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [readout, setReadout] = React.useState("مرحله ۱: تغذیه و بارگذاری برگه‌ها");

  const p = externalP !== undefined ? externalP : internalP;

  // Cache SVG node references
  const nodes = React.useRef<{
    press: SVGGElement | null;
    rack: SVGGElement | null;
    rake: SVGGElement | null;
    sled: SVGGElement | null;
    gate: SVGGElement | null;
    sheets: (SVGGElement | null)[];
    sheetContents: (SVGGElement | null)[];
    batilStamp: SVGGElement | null;
    thread: SVGPathElement | null;
    needle: SVGPathElement | null;
    crossbar: SVGPathElement | null;
  }>({
    press: null,
    rack: null,
    rake: null,
    sled: null,
    gate: null,
    sheets: [],
    sheetContents: [],
    batilStamp: null,
    thread: null,
    needle: null,
    crossbar: null,
  });

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    nodes.current = {
      press: el.querySelector('[data-part="press"]'),
      rack: el.querySelector('[data-part="rack"]'),
      rake: el.querySelector('[data-part="rake"]'),
      sled: el.querySelector('[data-part="sled"]'),
      gate: el.querySelector('[data-part="gate"]'),
      sheets: [0, 1, 2, 3].map((i) => el.querySelector(`[data-part="sheet-${i}"]`)),
      sheetContents: [0, 1, 2, 3].map((i) => el.querySelector(`[data-part="sheet-content-${i}"]`)),
      batilStamp: el.querySelector('[data-part="batil-stamp"]'),
      thread: el.querySelector('[data-part="thread"]'),
      needle: el.querySelector('[data-part="needle"]'),
      crossbar: el.querySelector('[data-part="crossbar"]'),
    };
  }, []);

  // Update frame imperatively on ref nodes
  React.useEffect(() => {
    const frame = frameOf(p);
    const n = nodes.current;

    if (n.press) n.press.setAttribute("transform", frame.press);
    if (n.rack) n.rack.setAttribute("transform", frame.rack);
    if (n.rake) n.rake.setAttribute("transform", frame.rake);
    if (n.sled) n.sled.setAttribute("transform", frame.sled);
    if (n.gate) n.gate.setAttribute("transform", frame.gate);

    frame.sheets.forEach((sheet, i) => {
      const sNode = n.sheets[i];
      const cNode = n.sheetContents[i];
      if (!sNode) return;
      if (!sheet) {
        sNode.style.display = "none";
      } else {
        sNode.style.display = "";
        sNode.setAttribute("transform", sheet.t);
        sNode.style.opacity = String(sheet.opacity);
        if (cNode) cNode.style.opacity = String(sheet.content);
      }
    });

    if (n.batilStamp) {
      n.batilStamp.style.opacity = String(frame.ink);
    }
    if (n.thread) n.thread.setAttribute("d", frame.thread);
    if (n.needle) n.needle.setAttribute("d", frame.needle);
    if (n.crossbar) n.crossbar.setAttribute("d", frame.crossbar);

    // Caption readout text
    const captions = [
      `مرحله ۱: بارگذاری برگه‌ها (${frame.binCount} برگه در مخزن)`,
      `مرحله ۲: فرود اهرم و ضربه مهر باطل شد (نیرو: ${frame.force}N)`,
      `مرحله ۳: سقوط اسناد سنتی و رهایی ماژول‌های داده`,
      `مرحله ۴: اتصال ماژول‌ها به شاسی کاتالوگ دیجیتال`,
    ];
    setReadout(captions[frame.step]);
  }, [p]);

  // Autoplay loop
  useLoop((dt) => {
    if (!playing || asksForStillness()) return false;
    setInternalP((prev) => {
      const next = prev + dt * 0.15;
      const wrapped = next > 1 ? 0 : next;
      onProgressChange?.(wrapped);
      return wrapped;
    });
    return true;
  }, playing);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setInternalP(val);
    onProgressChange?.(val);
  };

  const jumpTo = (targetP: number) => {
    setInternalP(targetP);
    onProgressChange?.(targetP);
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center w-full">
      {/* Interactive Controls Bar */}
      <div className="w-full max-w-2xl px-4 py-3 mb-4 flex flex-col gap-3 rounded-none border border-neutral-800 bg-[#121212] text-xs font-mono text-neutral-300">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setPlaying(!playing)}
            className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 rounded-none border border-neutral-700 transition-colors"
          >
            {playing ? "توقف ⏸" : "پخش خودکار ▶"}
          </button>
          <div className="flex-1 text-center font-bold text-neutral-200 truncate">
            {readout}
          </div>
          <div className="text-neutral-400 font-mono">
            {(p * 100).toFixed(0)}%
          </div>
        </div>

        {/* Progress scrub slider */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.002"
          value={p}
          onChange={handleSliderChange}
          className="w-full h-1.5 bg-neutral-800 accent-neutral-300 cursor-pointer"
        />

        {/* 4 Stage jump buttons */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {[
            { label: "۱. انباشت اسناد", target: 0.14 },
            { label: "۲. ضربه مهر باطل شد", target: 0.38 },
            { label: "۳. سقوط و تفکیک", target: 0.60 },
            { label: "۴. اتصال به کاتالوگ", target: 0.95 },
          ].map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => jumpTo(s.target)}
              className="py-1 px-1.5 text-center truncate rounded-none border border-neutral-800 hover:border-neutral-600 bg-neutral-900/60 hover:bg-neutral-800/80 text-[11px] text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* The SVG Artwork */}
      <div className="w-full max-w-3xl aspect-[700/760] relative">
        {children}
      </div>
    </div>
  );
}
