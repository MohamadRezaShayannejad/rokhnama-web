import {
  BIN_Z0,
  DECK_TOP,
  DIEBOT_HOME,
  DIEBOT_STAMP,
  FALL_DROP,
  FALL_FWD,
  MOD_HOME,
  PILE_BOTTOM,
  PILE_TOP,
  RAKE_SWEEP,
  RAKE_BAR_Y0,
  RACK_DOCK,
  RACK_REST,
  SHEET_T,
  STROKE,
} from "./view";

export const S1 = 0.28;
export const S2 = 0.45;
export const S3 = 0.72;

export const clamp = (value: number, a = 0, b = 1) => Math.min(b, Math.max(a, value));
export const ease = (value: number) => value * value * (3 - 2 * value);
export const smooth = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const s01 = (a: number, b: number) => (p: number) => ease(smooth(p, a, b));

export interface SheetState {
  cx: number;
  cy: number;
  cz: number; // centre z (bottom + half thickness)
  tilt: number; // nose-down radians about the x axis
  content: number; // printed content opacity
  opacity: number;
  phase: "bin" | "drop" | "glide" | "settle" | "pile" | "fall";
}

const RELEASE = [0.005, 0.065, 0.125, 0.185];
const JOURNEY = 0.062;
const PILE_BOTTOM_Z = PILE_BOTTOM;

// the i-th sheet's full life: bin -> drop -> deck glide -> settle -> pile -> stamp -> knock -> fall
export function sheetOf(index: number, p: number): SheetState | null {
  const m = smooth(p, RELEASE[index], RELEASE[index] + JOURNEY);
  if (p < RELEASE[index] + 0.004) return null; // still in the bin (drawn with the stack)

  if (p < RELEASE[index] + JOURNEY) {
    if (m < 0.33) {
      // drop from the bin's gate onto the delivery deck
      const k = m / 0.33;
      const wobble = Math.sin(k * Math.PI * 2.6) * 12 * (1 - k) * (Math.PI / 180);
      return {
        cx: 0,
        cy: -176,
        cz: BIN_Z0 + 0.8 + (DECK_TOP + 0.8 - (BIN_Z0 + 0.8)) * ease(k),
        tilt: wobble,
        content: 1,
        opacity: 1,
        phase: "drop",
      };
    }
    if (m < 0.81) {
      // glide on the deck to over the pile centre
      const k = (m - 0.33) / 0.48;
      return { cx: 0, cy: -176 + 116 * ease(k), cz: DECK_TOP + 0.8, tilt: 0, content: 1, opacity: 1, phase: "glide" };
    }
    // settle: sled pulls back, sheet settles onto the pile (bottom = PILE_BOTTOM + i * SHEET_T)
    const k = ease((m - 0.81) / 0.19);
    const cz = DECK_TOP + 0.8 + (PILE_BOTTOM_Z + index * SHEET_T + 0.8 - (DECK_TOP + 0.8)) * k;
    return { cx: 0, cy: -60, cz, tilt: 0, content: 1, opacity: 1, phase: "settle" };
  }

  // on the pile through the stamp
  const onHold = p < 0.52 + index * 0.016;
  if (onHold) {
    return { cx: 0, cy: -60, cz: PILE_BOTTOM_Z + index * SHEET_T + 0.8, tilt: 0, content: 1, opacity: 1, phase: "pile" };
  }

  // falling with cubic gravity, forward drift, nose-down tumble
  const f = smooth(p, 0.52 + index * 0.016, 0.52 + index * 0.016 + 0.09);
  const t3 = f * f * f;
  return {
    cx: 0,
    cy: -60 + FALL_FWD * Math.pow(f, 1.12),
    cz: PILE_BOTTOM_Z + index * SHEET_T + 0.8 - FALL_DROP * t3,
    tilt: 0.9 * Math.pow(f, 1.35) + 0.1 * Math.sin(f * Math.PI * 2.5),
    content: 1 - smooth(f, 0.16, 0.42),
    opacity: 1 - smooth(f, 0.75, 1),
    phase: "fall",
  };
}

export interface StageState {
  p: number;
  dieBot: number;
  ramBot: number;
  rackTop: number;
  ink: number;
  gauge: number;
  wheel: number;
  eject: number; // rake travel 0..1
  sheets: (SheetState | null)[];
}

const needleFrom = (rs: number) => {
  // press force reads on the gauge; sharp rise at contact, held while stamped, 0 at home
  if (rs <= 0) return 0;
  const contact = smooth(rs, 0.72, 1);
  const press = contact * contact * (3 - 2 * contact);
  return Math.max(0, 260 * rs * (0.06 + 0.94 * press));
};

export function model(p: number): StageState {
  p = clamp(p);
  const phase1 = p < S1;

  // ram: descends, stamps, holds, lifts — all driven by stroke factor rs
  let rs: number;
  if (p < S1) rs = 0;
  else if (p < 0.39) rs = ease(smooth(p, S1, 0.39));
  else if (p < S3) rs = 1;
  else if (p < 0.8) rs = 1 - ease(smooth(p, S3, 0.8));
  else rs = 0;

  const dieBot = DIEBOT_HOME - STROKE * rs;
  const ramBot = dieBot + 20;
  const moduleBot = dieBot - 14;

  // rack rises after the die is home, into the dock position
  const rackTop = RACK_REST + (RACK_DOCK - RACK_REST) * ease(smooth(p, 0.82, 0.93));

  const ink = 1 - smooth(p, 0.39, 0.42);

  const eject = p < 0.46 ? 0 : p > 0.66 ? 1 : Math.max(0, Math.min(1, smooth(p, 0.46, 0.66))) ** 0.9;
  const wheel = (STROKE / 11.5) * 2 * Math.PI * rs;

  return {
    p,
    dieBot,
    ramBot,
    rackTop,
    ink,
    gauge: needleFrom(rs),
    wheel,
    eject,
    sheets: [0, 1, 2, 3].map((i) => sheetOf(i, p)),
  };
}
