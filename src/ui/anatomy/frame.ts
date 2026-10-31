import {
  at,
  P,
  COLUMN_Y,
  DIEBOT_HOME,
  RACK_REST,
  RAKE_BAR_Y0,
  RAKE_SWEEP,
  SCREW_BOTTOM,
  SCREW_R,
  SCREW_TOP,
  SLED_Y0,
  THREAD_PITCH,
  THREAD_TURNS,
  GAUGE_C,
  GAUGE_R,
  GAUGE_SWEEP,
  WHEEL_R,
  PILE_BOTTOM,
  SHEET_T,
} from "./view";
import { iso, pathOf, translateAlong, type Flat } from "./kit/iso-kit";
import { model } from "./stage";

export const pressAt = (dieBot: number) => translateAlong(P, [0, 0, dieBot - DIEBOT_HOME]);
export const rackAt = (rackTop: number) => translateAlong(P, [0, 0, rackTop - RACK_REST]);
export const rakeAt = (rakeY: number, rackTop: number) => translateAlong(P, [0, rakeY - RAKE_BAR_Y0, rackTop - RACK_REST]);
export const sledAt = (sledY: number) => translateAlong(P, [0, sledY - SLED_Y0, 0]);
export const gateAt = (open: number) => translateAlong(P, [0, -4 - open * 9, 0]);

/* ---- screw thread: visible half-turns, advancing with the screw's rotation ---- */
export function threadArcs(theta: number) {
  const [vx, vy] = [Math.SQRT1_2, Math.SQRT1_2];
  const facing = Math.atan2(vy, vx);
  const parts: string[] = [];
  for (let turn = 0; turn <= THREAD_TURNS; turn++) {
    const points: Flat[] = [];
    for (let step = 0; step <= 16; step++) {
      const phi = facing - Math.PI / 2 + (step / 16) * Math.PI;
      const z = SCREW_BOTTOM + (turn + (phi + theta) / (Math.PI * 2)) * THREAD_PITCH;
      if (z < SCREW_BOTTOM - 1 || z > SCREW_TOP - 2) continue;
      points.push(iso([SCREW_R * Math.cos(phi), COLUMN_Y + SCREW_R * Math.sin(phi), z], P));
    }
    if (points.length > 1) parts.push(pathOf(points));
  }
  return parts.join("");
}

/* ---- gauge needle: sweeps the crown's front face in the x–z plane ---- */
const gaugeDir = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [Math.sin(a), 0, Math.cos(a)] as [number, number, number];
};

export function needlePath(value: number) {
  const deg = -GAUGE_SWEEP / 2 + value;
  const [dx, , dz] = gaugeDir(deg);
  const [gx, gy, gz] = GAUGE_C;
  return pathOf([at([gx, gy, gz + 2.6]), at([gx + dx * (GAUGE_R - 6), gy, gz + 2.6 + dz * (GAUGE_R - 6)])]);
}

export function gaugeTicks() {
  const minor: string[] = [];
  const major: string[] = [];
  const [gx, gy, gz] = GAUGE_C;
  for (let index = 0; index <= 20; index++) {
    const deg = -GAUGE_SWEEP / 2 + (index / 20) * GAUGE_SWEEP;
    const [dx, , dz] = gaugeDir(deg);
    const big = index % 5 === 0;
    const inner = GAUGE_R - (big ? 8 : 4);
    const outer = GAUGE_R - 2;
    const line = pathOf([
      at([gx + dx * inner, gy, gz + 2.6 + dz * inner]),
      at([gx + dx * outer, gy, gz + 2.6 + dz * outer]),
    ]);
    (big ? major : minor).push(line);
  }
  minor.push(pathOf([at([gx + gaugeDir(0)[0] * (GAUGE_R - 10), gy, gz + 2.6 + gaugeDir(0)[2] * (GAUGE_R - 10)]), at([gx, gy, gz + 2.6])]));
  return { minor: minor.join(""), major: major.join("") };
}

/* ---- wheel crossbar: rotates in the wheel's own plane ---- */
export function crossbarPath(angle: number) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const arm = WHEEL_R - 4;
  return pathOf([
    at([-c * arm, COLUMN_Y - s * arm, 214]),
    at([c * arm, COLUMN_Y + s * arm, 214]),
  ]);
}

/* ---- affine that tilts a flat sheet about its own centre line ---- */
const nu = (v: number) => Math.round(v * 1000) / 1000;

export function sheetTilt(cy: number, cz: number, tilt: number, midZ: number) {
  const cos = Math.cos(tilt);
  const sin = Math.sin(tilt);
  const moved = (x: number, y: number) => iso([x, cy + (y + 60) * cos, cz - (y + 60) * sin], P);
  const flat = (x: number, y: number) => iso([x, y, midZ], P);
  const s1 = flat(0, -60);
  const s2 = flat(1, -60);
  const s3 = flat(0, -59);
  const t1 = moved(0, -60);
  const t2 = moved(1, -60);
  const t3 = moved(0, -59);
  const u = [s2[0] - s1[0], s2[1] - s1[1]];
  const v = [s3[0] - s1[0], s3[1] - s1[1]];
  const det = u[0] * v[1] - u[1] * v[0] || 1;
  const U = [t2[0] - t1[0], t2[1] - t1[1]];
  const V = [t3[0] - t1[0], t3[1] - t1[1]];
  const a = (U[0] * v[1] - V[0] * u[1]) / det;
  const b = (U[1] * v[1] - V[1] * u[1]) / det;
  const c = (V[0] * u[0] - U[0] * v[0]) / det;
  const d = (V[1] * u[0] - U[1] * v[0]) / det;
  const e = t1[0] - (a * s1[0] + c * s1[1]);
  const f = t1[1] - (b * s1[0] + d * s1[1]);
  if (Math.abs(a - 1) < 1e-4 && Math.abs(d - 1) < 1e-4 && Math.abs(b) < 1e-4 && Math.abs(c) < 1e-4 && Math.abs(e) < 0.05 && Math.abs(f) < 0.05) return "";
  return `matrix(${nu(a)} ${nu(b)} ${nu(c)} ${nu(d)} ${nu(e)} ${nu(f)})`;
}

export interface SheetShot {
  t: string;
  content: number;
  opacity: number;
}

export interface Frame {
  press: string;
  rack: string;
  rake: string;
  sled: string;
  gate: string;
  sheets: (SheetShot | null)[];
  thread: string;
  needle: string;
  crossbar: string;
  ink: number;
  binCount: number;
  step: number;
  dieBot: number;
  rackTop: number;
  force: number;
}

export function frameOf(p: number): Frame {
  const state = model(p);
  const sheets = state.sheets.map((sheet, index) => {
    if (!sheet) return null;
    const midZ = PILE_BOTTOM + index * SHEET_T + SHEET_T / 2;
    return {
      t: sheetTilt(sheet.cy, sheet.cz, sheet.tilt, midZ),
      content: sheet.content,
      opacity: sheet.opacity,
    };
  });
  const binCount = [0, 1, 2, 3].filter((index) => state.sheets[index] === null).length;
  const step = p < 0.28 ? 0 : p < 0.45 ? 1 : p < 0.72 ? 2 : 3;

  // the shuttle sled carries the sheet being glided; the bin gate parts while a sheet drops
  const gliding = state.sheets.find((sheet) => sheet && sheet.phase === "glide");
  const dropping = state.sheets.some((sheet) => sheet && sheet.phase === "drop");
  const sledY = gliding ? gliding.cy : SLED_Y0;
  return {
    press: pressAt(state.dieBot),
    rack: rackAt(state.rackTop),
    rake: rakeAt(state.eject * RAKE_SWEEP, state.rackTop),
    sled: sledAt(sledY),
    gate: gateAt(dropping ? 1 : 0),
    sheets,
    thread: threadArcs(state.wheel),
    needle: needlePath(state.gauge),
    crossbar: crossbarPath(state.wheel),
    ink: state.ink,
    binCount,
    step,
    dieBot: state.dieBot,
    rackTop: state.rackTop,
    force: Math.round(state.gauge),
  };
}
