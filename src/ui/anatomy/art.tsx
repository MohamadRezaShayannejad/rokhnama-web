import * as React from "react";
import { Solid, Line, Dots, FaceText } from "./kit/react/draw";
import {
  WIDTH,
  HEIGHT,
  COLUMN_X,
  COLUMN_Y,
  FEET,
  MOD_CENTRES,
  PILE_BOTTOM,
  SHEET_T,
  P,
  at,
} from "./view";
import { topMatrix } from "./kit/iso-kit";
import {
  pedestal,
  foot,
  pit,
  rackOf,
  column,
  columnCollars,
  crownBase,
  crownBoss,
  gauge,
  wheel,
  ramDie,
  moduleOf,
  batil,
  sheetOfZ,
  rake,
  binBody,
  binGate,
  deck,
  deckRail,
  sled,
} from "./geometry";
import { gaugeTicks } from "./frame";

const rackSolid = rackOf(PILE_BOTTOM);
const ticks = gaugeTicks();

const MODULE_TITLES = [
  "جست‌وجو با کد کالا",
  "مشخصات فنی محصول",
  "قیمت به‌روز و همکاری",
  "صدور پیش‌فاکتور رسمی",
];

export function PressArt() {
  return (
    <svg
      className="iso-svg"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label="پرس اهرمی و کاتالوگ تعاملی رخنما"
    >
      <defs>
        <filter id="ink-grunge" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.09"
            numOctaves="4"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      {/* ---- 1. Base & Pit ---- */}
      <g id="base-layer">
        {FEET.map(([fx, fy], i) => (
          <Solid key={`foot-${i}`} paths={foot(fx, fy)} tone="lo" crease="faint" />
        ))}
        <Solid
          paths={{ ...pedestal.paths, top: pedestal.topFill }}
          tone="mid"
          crease="faint"
        />
        <g id="pit-interior">
          <g dangerouslySetInnerHTML={{ __html: pit.floor }} />
          <g dangerouslySetInnerHTML={{ __html: pit.back }} />
          <g dangerouslySetInnerHTML={{ __html: pit.left }} />
          <g dangerouslySetInnerHTML={{ __html: pit.rim }} />
        </g>
      </g>

      {/* ---- 2. Feeder at the back ---- */}
      <g id="feeder-layer">
        <Solid paths={deck} tone="lo" crease="faint" />
        <Solid paths={deckRail(-42)} tone="mid" crease="faint" />
        <Solid paths={deckRail(42)} tone="mid" crease="faint" />
        <g data-part="sled">
          <Solid paths={sled} tone="hi" crease="faint" />
        </g>
        <Solid paths={binBody} tone="mid" crease="faint" />
        <g data-part="gate">
          <Solid paths={binGate} tone="hi" crease="faint" />
        </g>
      </g>

      {/* ---- 3. Rising Rack (Chassis) & Knockout Rake ---- */}
      <g data-part="rack">
        <Solid paths={rackSolid.paths} tone="mid" crease="faint" />
        <g dangerouslySetInnerHTML={{ __html: rackSolid.sockets }} />
        <g data-part="rake">
          <Solid paths={rake.bar} tone="lo" crease="faint" />
          <Solid paths={rake.blade} tone="mid" crease="faint" />
          <Solid paths={rake.armLeft} tone="lo" crease="none" />
          <Solid paths={rake.armRight} tone="lo" crease="none" />
          <Solid paths={rake.knob} tone="hi" crease="none" />
        </g>
      </g>

      {/* ---- 4. Sheets: 4 Paper Documents ---- */}
      <g id="sheets-layer">
        {[0, 1, 2, 3].map((index) => {
          const z = PILE_BOTTOM + index * SHEET_T;
          return (
            <g key={`sheet-${index}`} data-part={`sheet-${index}`}>
              <Solid paths={sheetOfZ(z)} tone="lo" crease="none" />
              <g data-part={`sheet-content-${index}`}>
                {index === 0 && (
                  /* Sheet 0: spreadsheet table */
                  <g transform={topMatrix([0, -60], z + SHEET_T, P)}>
                    <line x1="-50" y1="-70" x2="50" y2="-70" stroke="var(--anatomy-lo)" strokeWidth="0.8" />
                    <line x1="-50" y1="-40" x2="50" y2="-40" stroke="var(--anatomy-faint)" strokeWidth="0.5" />
                    <line x1="-50" y1="-10" x2="50" y2="-10" stroke="var(--anatomy-faint)" strokeWidth="0.5" />
                    <line x1="-50" y1="20" x2="50" y2="20" stroke="var(--anatomy-faint)" strokeWidth="0.5" />
                    <line x1="-50" y1="50" x2="50" y2="50" stroke="var(--anatomy-faint)" strokeWidth="0.5" />
                    <line x1="-20" y1="-70" x2="-20" y2="70" stroke="var(--anatomy-faint)" strokeWidth="0.5" />
                    <line x1="15" y1="-70" x2="15" y2="70" stroke="var(--anatomy-faint)" strokeWidth="0.5" />
                    <FaceText transform="matrix(1 0 0 1 -40 -50)" size={6} tone="mid">اکسل محصولات و کدهای انبار</FaceText>
                  </g>
                )}
                {index === 1 && (
                  /* Sheet 1: product spec sheet */
                  <g transform={topMatrix([0, -60], z + SHEET_T, P)}>
                    <rect x="-60" y="-75" width="120" height="150" fill="none" stroke="var(--anatomy-faint)" strokeWidth="0.6" />
                    <line x1="-48" y1="-50" x2="48" y2="-50" stroke="var(--anatomy-lo)" strokeWidth="0.8" />
                    <line x1="-48" y1="-30" x2="20" y2="-30" stroke="var(--anatomy-faint)" strokeWidth="0.5" />
                    <line x1="-48" y1="-15" x2="35" y2="-15" stroke="var(--anatomy-faint)" strokeWidth="0.5" />
                    <line x1="-48" y1="0" x2="10" y2="0" stroke="var(--anatomy-faint)" strokeWidth="0.5" />
                    <FaceText transform="matrix(1 0 0 1 -45 -55)" size={6.5} tone="mid">برگه مشخصات فنی کالا</FaceText>
                  </g>
                )}
                {index === 2 && (
                  /* Sheet 2: traditional B2B invoice */
                  <g transform={topMatrix([0, -60], z + SHEET_T, P)}>
                    <rect x="-55" y="-70" width="110" height="140" fill="none" stroke="var(--anatomy-lo)" strokeWidth="0.6" />
                    <circle cx="35" cy="-52" r="8" fill="none" stroke="var(--anatomy-faint)" strokeWidth="0.6" />
                    <line x1="-45" y1="-35" x2="45" y2="-35" stroke="var(--anatomy-lo)" strokeWidth="0.8" />
                    <line x1="-45" y1="-15" x2="45" y2="-15" stroke="var(--anatomy-faint)" strokeWidth="0.5" />
                    <line x1="-45" y1="5" x2="45" y2="5" stroke="var(--anatomy-faint)" strokeWidth="0.5" />
                    <line x1="-45" y1="25" x2="45" y2="25" stroke="var(--anatomy-faint)" strokeWidth="0.5" />
                    <FaceText transform="matrix(1 0 0 1 -45 -48)" size={6.5} tone="mid">پیش‌فاکتور سنتی (کاغذی)</FaceText>
                  </g>
                )}
                {index === 3 && (
                  /* Sheet 3: text / catalog sheet + crimson «باطل شد» stamp */
                  <g transform={topMatrix([0, -60], z + SHEET_T, P)}>
                    <line x1="-50" y1="-65" x2="50" y2="-65" stroke="var(--anatomy-lo)" strokeWidth="0.8" />
                    <line x1="-50" y1="-45" x2="30" y2="-45" stroke="var(--anatomy-faint)" strokeWidth="0.5" />
                    <line x1="-50" y1="-30" x2="45" y2="-30" stroke="var(--anatomy-faint)" strokeWidth="0.5" />
                    <line x1="-50" y1="-15" x2="20" y2="-15" stroke="var(--anatomy-faint)" strokeWidth="0.5" />
                    <FaceText transform="matrix(1 0 0 1 -48 -70)" size={6} tone="mid">کاتالوگ فیزیکی چاپ‌شده</FaceText>
                    {/* Crimson ink stamp */}
                    <g data-part="batil-stamp" style={{ opacity: 0 }}>
                      <g filter="url(#ink-grunge)">
                        <rect
                          x="-38"
                          y="-20"
                          width="76"
                          height="40"
                          fill="none"
                          stroke="var(--anatomy-red)"
                          strokeWidth="2.8"
                        />
                        <rect
                          x="-35"
                          y="-17"
                          width="70"
                          height="34"
                          fill="none"
                          stroke="var(--anatomy-red)"
                          strokeWidth="1.2"
                        />
                        <text
                          x="0"
                          y="6"
                          textAnchor="middle"
                          fill="var(--anatomy-red)"
                          fontSize="22"
                          fontWeight="bold"
                          letterSpacing="0.08em"
                        >
                          باطل شد
                        </text>
                      </g>
                      {/* Vector splatter dots */}
                      <circle cx="-42" cy="-22" r="1.4" fill="var(--anatomy-red)" />
                      <circle cx="43" cy="24" r="1.2" fill="var(--anatomy-red)" />
                      <circle cx="-32" cy="23" r="0.9" fill="var(--anatomy-red)" />
                      <circle cx="39" cy="-18" r="1.1" fill="var(--anatomy-red)" />
                    </g>
                  </g>
                )}
              </g>
            </g>
          );
        })}
      </g>

      {/* ---- 5. Machine Structure: Columns, Crown, Gauge ---- */}
      <g id="structure-layer">
        <Solid paths={column(-COLUMN_X)} tone="mid" crease="faint" />
        <Solid paths={columnCollars(-COLUMN_X)} tone="lo" crease="faint" />
        <Solid paths={column(COLUMN_X)} tone="mid" crease="faint" />
        <Solid paths={columnCollars(COLUMN_X)} tone="lo" crease="faint" />
        <Solid paths={crownBase} tone="hi" crease="faint" />
        <Solid paths={crownBoss} tone="mid" crease="faint" />

        {/* Vertical front-face pressure gauge */}
        <g id="gauge-assembly">
          <g dangerouslySetInnerHTML={{ __html: gauge.body }} />
          <g dangerouslySetInnerHTML={{ __html: gauge.bezel }} />
          <g dangerouslySetInnerHTML={{ __html: gauge.face }} />
          <Line d={ticks.minor} tone="lo" />
          <Line d={ticks.major} tone="mid" />
          <path data-part="needle" className="iso-line" data-tone="lit" strokeWidth="1.2" />
        </g>
      </g>

      {/* ---- 6. Turning Mechanism (Screw & Wheel) ---- */}
      <g id="turning-layer">
        <path data-part="thread" className="iso-line" data-tone="hi" strokeWidth="1.1" />
        <Solid paths={wheel.collar} tone="mid" crease="faint" />
        <Solid paths={wheel.hubCone} tone="lo" crease="faint" />
        <Solid paths={wheel.hub} tone="hi" crease="faint" />
        <Solid paths={wheel.disc} tone="mid" crease="faint" />
        <Line d={wheel.rim} tone="lit" />
        <path data-part="crossbar" className="iso-line" data-tone="lit" strokeWidth="1.8" />
      </g>

      {/* ---- 7. Ram + Die + 4 Interactive Modules ---- */}
      <g data-part="press">
        <Solid paths={ramDie.ram} tone="hi" crease="faint" />
        <Solid paths={ramDie.nut} tone="lo" crease="none" />
        <Solid paths={ramDie.die} tone="mid" crease="faint" />
        <Line d={ramDie.dieRim} tone="mid" />
        <Solid paths={batil} tone="hi" crease="none" />

        {/* 4 Interactive Modules */}
        {MOD_CENTRES.map(([cx, cy], i) => (
          <g key={`module-${i}`} data-part={`module-${i}`}>
            <Solid paths={moduleOf(cx, cy)} tone="hi" crease="faint" lit={true} />
            <g transform={topMatrix([cx, cy], 14, P)}>
              <circle cx="0" cy="0" r="18" fill="none" stroke="var(--anatomy-lo)" strokeWidth="0.6" />
              <circle cx="0" cy="0" r="15" fill="none" stroke="var(--anatomy-faint)" strokeWidth="0.4" />
              <FaceText transform="matrix(1 0 0 1 0 3)" size={5.5} tone="hi" anchor="middle">
                {MODULE_TITLES[i]}
              </FaceText>
            </g>
          </g>
        ))}
      </g>
    </svg>
  );
}
