import { fitProjection, iso, type Flat, type Plan, type Point3, type Projection, axisVector } from "./kit/iso-kit";

export const WIDTH = 700;
export const HEIGHT = 760;
const PAD = 38;

export const AZIMUTH = 45;
export const ELEVATION = 30;

/* ---- machine layout (world units ≈ 1 mm of the real thing) ---- */

// pedestal
export const BASE: Plan = { x: -180, y: -210, w: 360, d: 300, r: 18 };
export const BASE_H = 60;
export const FOOT_H = 12;
export const FEET: [number, number][] = [
  [-152, -182],
  [152, -182],
  [-152, 62],
  [152, 62],
];
export const WELL: Plan = { x: -100, y: -176, w: 200, d: 212, r: 10 };
export const WELL_FLOOR = 4;

// rack + sockets (the catalog chassis)
export const RACK: Plan = { x: -94, y: -166, w: 188, d: 198, r: 8 };
export const RACK_H = 46;
export const RACK_REST = 12;
export const RACK_DOCK = 82;
export const SOCKET_D = 12;

// columns + crown (throat widened: columns at x = ±118)
export const COLUMN_R = 16;
export const COLUMN_X = 118;
export const COLUMN_Y = -60;
export const CROWN: Plan = { x: -150, y: -120, w: 300, d: 120, r: 14 };
export const CROWN_Z = 166;
export const CROWN_H = 24;
export const CROWN_TOP = CROWN_Z + CROWN_H;
export const CROWN_FACE_Y = 0;

// screw + handwheel (fixed in z, both only turn)
export const SCREW_R = 9;
export const SCREW_BOTTOM = 110;
export const SCREW_TOP = 202;
export const THREAD_PITCH = 11.5;
export const THREAD_TURNS = 8;
export const COLLAR_R = 18;
export const HUB_R = 15;
export const HUB_Z = 194;
export const HUB_H = 20;
export const WHEEL_R = 52;
export const WHEEL_Z = 200;
export const WHEEL_H = 8;

// ram + die plate
export const RAM: Plan = { x: -34, y: -94, w: 68, d: 68, r: 4 };
export const RAM_H = 62;
export const DIE: Plan = { x: -63, y: -123, w: 126, d: 126, r: 8 };
export const DIE_H = 20;
export const MOD_H = 26;
export const MODULE: Plan = { x: -28, y: -88, w: 56, d: 56, r: 6 };
export const MOD_CENTRES: [number, number][] = [
  [-31.5, -31.5],
  [31.5, -31.5],
  [-31.5, 31.5],
  [31.5, 31.5],
].map(([x, y]) => [x, y - 60] as [number, number]);

// die / module travel — modules hang PROUD below the die's face
export const PROUD = 14;
export const PILE_BOTTOM = RACK_REST;
export const PILE_TOP = PILE_BOTTOM + 4 * 1.6;
export const MOD_HOME = RACK_DOCK - SOCKET_D; // 70 — bottom of a seated module
export const DIEBOT_HOME = MOD_HOME + PROUD; // 84
export const DIEBOT_STAMP = PILE_TOP + PROUD; // 32.4
export const STROKE = DIEBOT_HOME - DIEBOT_STAMP; // 51.6
export const RAM_TOP_HOME = DIEBOT_HOME + DIE_H + RAM_H; // 166 = CROWN_Z

// sheets + pile
export const SHEET: Plan = { x: -78, y: -158, w: 156, d: 196, r: 0 };
export const SHEET_T = 1.6;

// magazine bin (drop hopper) + delivery deck + shuttle sled at the back
export const BIN: Plan = { x: -78, y: -226, w: 156, d: 50, r: 6 };
export const BIN_Z0 = 76;
export const BIN_H = 42;
export const BIN_TOP = BIN_Z0 + BIN_H;
export const BIN_GATE_Y = -176;
export const DECK: Plan = { x: -82, y: -236, w: 164, d: 66, r: 4 };
export const DECK_Z0 = 16;
export const DECK_TOP = 20;
export const SLED_BLOCK: Plan = { x: -75, y: -202, w: 150, d: 12, r: 3 };
export const SLED_Y0 = -196; // loading, under the bin
export const SLED_Y1 = -60; // delivery, over the pile centre

// ejector knockout rake (slides on the rack's top edges, own schedule)
export const RAKE_BAR_Y0 = -166;
export const RAKE_SWEEP = 184;
export const RAKE_ARM_X = 92;
export const RAKE_Z = 22;
export const RAKE_BLADE = 12;
export const RAKE_GROOVE_D = 90; // arm length along y

// pressure gauge on the crown's front face
export const GAUGE_C = [-86, CROWN_FACE_Y, 170] as Point3;
export const GAUGE_R = 26;
export const GAUGE_SWEEP = 260; // needle arcs 0..260°, knots at every °

// falling sheets
export const FALL_FWD = 118;
export const FALL_DROP = 56;

/* ---- projection ---- */

function fit(points: Point3[]): Projection {
  const flat = points.map((point) => iso(point, { origin: [0, 0], scale: 1, azimuth: AZIMUTH, elevation: ELEVATION }));
  const xs = flat.map(([x]) => x);
  const ys = flat.map(([, y]) => y);
  const left = Math.min(...xs);
  const right = Math.max(...xs);
  const up = Math.min(...ys);
  const down = Math.max(...ys);
  const scale = Math.min((WIDTH - PAD * 2) / (right - left), (HEIGHT - PAD * 2) / (down - up));
  return {
    origin: [WIDTH / 2 - ((left + right) / 2) * scale, HEIGHT / 2 - ((up + down) / 2) * scale],
    scale,
    azimuth: AZIMUTH,
    elevation: ELEVATION,
  };
}

const corners = ({ x, y, w, d }: Plan, z0: number, z1: number): Point3[] => {
  const out: Point3[] = [];
  for (const px of [x, x + w]) for (const py of [y, y + d]) for (const z of [z0, z1]) out.push([px, py, z]);
  return out;
};

const SPAN: Point3[] = [
  ...corners(BASE, -FOOT_H, BASE_H),
  ...corners(CROWN, CROWN_Z, CROWN_TOP),
  ...corners({ x: -52, y: -112, w: 104, d: 104, r: 0 }, HUB_Z, WHEEL_Z + WHEEL_H + 8),
  ...corners(BIN, BIN_Z0, BIN_TOP),
  ...corners(DECK, DECK_Z0, DECK_TOP),
  ...corners({ x: -80, y: -40, w: 160, d: 190, r: 0 }, -48, 26),
  ...corners({ x: -90, y: -170, w: 180, d: 206, r: 0 }, 34, RACK_DOCK + 4),
];

export const P: Projection = fit(SPAN);

export const at = (point: Point3): Flat => iso(point, P);
export const EZ: Flat = axisVector(P, [0, 0, 1]);

export const fitScale = P.scale;
