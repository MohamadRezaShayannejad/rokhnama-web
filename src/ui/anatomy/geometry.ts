import {
  at,
  P,
  BASE,
  BASE_H,
  FOOT_H,
  FEET,
  WELL,
  WELL_FLOOR,
  RACK,
  RACK_H,
  RACK_REST,
  RACK_DOCK,
  SOCKET_D,
  COLUMN_R,
  COLUMN_X,
  COLUMN_Y,
  CROWN,
  CROWN_Z,
  CROWN_H,
  CROWN_TOP,
  CROWN_FACE_Y,
  WHEEL_R,
  WHEEL_Z,
  WHEEL_H,
  HUB_R,
  HUB_Z,
  HUB_H,
  COLLAR_R,
  SCREW_R,
  SCREW_BOTTOM,
  THREAD_PITCH,
  RAM,
  RAM_H,
  DIE,
  DIE_H,
  PROUD,
  MOD_H,
  MODULE,
  MOD_CENTRES,
  MOD_HOME,
  DIEBOT_HOME,
  SHEET,
  SHEET_T,
  RAKE_BLADE,
  RAKE_Z,
  BIN,
  BIN_Z0,
  BIN_H,
  BIN_TOP,
  DECK,
  DECK_Z0,
  DECK_TOP,
  SLED_BLOCK,
  GAUGE_C,
  GAUGE_R,
  GAUGE_SWEEP,
} from "./view";
import {
  slabOf,
  extrude,
  cylinder,
  ringOf,
  ring,
  lineOnTop,
  segment,
  pathOf,
  onTop,
  planOutline,
  topTicks,
  sideTicks,
  radialTicks,
  knurl,
  circleRing,
  ringSeam,
  sideSeam,
  sideRing,
  insetPlan,
  rise,
  dotGrid,
  iso,
  type SolidPaths,
  type Plan,
  type Point3,
} from "./kit/iso-kit";

/* punched top: outer ring + reversed inner ring (opposite winding, non-zero hole) */
function punch(plan: Plan, hole: Plan): string {
  return pathOf([...ringOf(plan, 14), ...ringOf(hole, 10).reverse()], true);
}

/* ---- pedestal ---- */
const baseRing = ringOf(BASE, 14);
const basePaths = extrude(baseRing, 0, BASE_H, P, { convex: true, bevel: 1.2 });
const baseTopFill = punch(BASE, WELL);

export const pedestal = { paths: basePaths, topFill: baseTopFill };

export const foot = (fx: number, fy: number) => slabOf({ x: fx - 22, y: fy - 11, w: 44, d: 22, r: 3 }, 0, FOOT_H, P);

function pitWall(a: Point3, b: Point3, c: Point3, d: Point3, shade: number) {
  return `<path class="iso-shade" data-shade="${shade}" d="${pathOf([at(a), at(b), at(c), at(d)], true)}"/>`;
}

export const pit = {
  floor: `<path class="iso-shade" data-shade="1" d="${pathOf(ringOf(WELL, 6).map((p) => iso([p[0], p[1], WELL_FLOOR], P)), true)}"/>`,
  back: pitWall([WELL.x, WELL.y, WELL_FLOOR], [WELL.x + WELL.w, WELL.y, WELL_FLOOR], [WELL.x + WELL.w, WELL.y, 58], [WELL.x, WELL.y, 58], 1),
  left: pitWall([WELL.x, WELL.y, WELL_FLOOR], [WELL.x, WELL.y + WELL.d, WELL_FLOOR], [WELL.x, WELL.y + WELL.d, 58], [WELL.x, WELL.y, 58], 0),
  rim: `<path class="iso-line" data-tone="faint" d="${planOutline(WELL, 34, P)}"/>`,
};

/* ---- rack + sockets ---- */
const rackRing = ringOf(RACK, 10);
export const rackOf = (zTop: number) => {
  const z0 = zTop - RACK_H;
  const paths = extrude(rackRing, z0, zTop - z0, P, { convex: true, bevel: 0.9 });
  const socketFloor = zTop - SOCKET_D;
  const sockets: string[] = [];
  for (const [cx, cy] of MOD_CENTRES) {
    const inner = circleRing(cx, cy, 26, 14);
    sockets.push(`<path class="iso-shade" data-shade="2" d="${pathOf(inner.map((p) => iso([p[0], p[1], socketFloor], P)), true)}"/>`);
    sockets.push(`<path class="iso-line" data-tone="faint" d="${pathOf(inner.map((p) => iso([p[0], p[1], zTop - 0.6], P)), true)}"/>`);
    sockets.push(
      `<path class="iso-line" data-tone="lo" d="${inner
        .flatMap((p, i) => (i % 4 === 0 ? [segment([p[0], p[1], socketFloor], [p[0], p[1], zTop - 0.6], P)] : []))
        .join(" ")}"/>`,
    );
  }
  return { paths, sockets: sockets.join("") };
};

/* ---- columns + crown ---- */
const colRing = (x: number) => circleRing(x, COLUMN_Y, COLUMN_R, 24);
export const column = (x: number) => extrude(colRing(x), 60, 130, P);
export const columnCollars = (x: number) => extrude(circleRing(x, COLUMN_Y, 24, 20), 152, 12, P);

export const crownBase = extrude(ringOf(CROWN, 12), CROWN_Z, CROWN_H, P, { convex: true, bevel: 1.4 });
export const crownFace = (plan: Plan) => extrude(ringOf(plan, 8), CROWN_Z, CROWN_H, P, { convex: true });
export const crownBoss = cylinder(0, COLUMN_Y, 22, CROWN_TOP, 10, P, 24);

/* gauge: a recessed dial on the crown's vertical front face (x–z plane, facing +y) */
const GAUGE_FACE_Y = CROWN_FACE_Y + 0.8;
export const gauge = (() => {
  const [gx, , gz] = GAUGE_C;
  return {
    body: `<path class="iso-shade" data-shade="0" d="${sideRing([gx, GAUGE_FACE_Y - 2.4, gz], GAUGE_R + 7, "y", P)}"/>`,
    bezel: `<path class="iso-line" data-tone="mid" d="${sideRing([gx, GAUGE_FACE_Y, gz], GAUGE_R + 7, "y", P)}"/>`,
    face: `<path class="iso-fill" d="${sideRing([gx, GAUGE_FACE_Y + 0.4, gz], GAUGE_R, "y", P)}"/>`,
  };
})();

/* handwheel: disc, rim, hub + rim ring; crossbar rotates in the frame */
export const wheel = {
  disc: extrude(circleRing(0, COLUMN_Y, WHEEL_R, 40), WHEEL_Z, WHEEL_H, P, { convex: true, bevel: 0.6 }),
  rim: ring(0, COLUMN_Y, WHEEL_R + 4, WHEEL_Z + WHEEL_H + 2.4, P, 44),
  hub: cylinder(0, COLUMN_Y, HUB_R, HUB_Z, HUB_H, P, 24),
  collar: cylinder(0, COLUMN_Y, COLLAR_R, CROWN_TOP, 8, P, 24),
  hubCone: cylinder(0, COLUMN_Y, 9, CROWN_TOP + 6, 18, P, 20),
};

/* ---- ram + die + modules (built at die bottom = DIEBOT_HOME, moved in frame) ---- */
export const ramDie = {
  ram: slabOf(RAM, DIEBOT_HOME + DIE_H, RAM_H, P),
  nut: cylinder(0, COLUMN_Y, 13, DIEBOT_HOME + DIE_H + RAM_H - 9, 9, P, 20),
  die: extrude(ringOf(DIE, 12), DIEBOT_HOME, DIE_H, P, { convex: true, bevel: 1.6 }),
  dieRim: sideSeam(DIE, DIEBOT_HOME + DIE_H, P, 12),
};

export const moduleOf = (cx: number, cy: number) =>
  extrude(ringOf({ x: cx - 28, y: cy - 28, w: 56, d: 56, r: 6 }, 9), 0, 14, P, { convex: true, bevel: 0.8 });

/* batil stamp plate under the die's face, prints the crimson frame on the top sheet */
export const batil = extrude(ringOf({ x: -34, y: -94, w: 68, d: 54, r: 6 }, 8), 0, 2.6, P, { convex: true });

/* sheets — one per slot, drawn at rest pile depth then translated */
export const sheetOfZ = (z: number) => extrude(ringOf(SHEET, 1), z, SHEET_T, P);

/* ejector knockout rake */
export const rake = {
  bar: extrude(ringOf({ x: -92, y: -170, w: 184, d: 8, r: 3 }, 8), RAKE_Z + 4, 8, P, { convex: true, bevel: 0.6 }),
  blade: extrude(ringOf({ x: -88, y: -163, w: 176, d: 5, r: 2 }, 8), RAKE_Z - 12, RAKE_BLADE + 2, P, { convex: true }),
  armLeft: extrude(ringOf({ x: -88 - 4, y: -174, w: 4, d: 16, r: 1 }, 4), 8, RAKE_Z + 8, P),
  armRight: extrude(ringOf({ x: 88, y: -174, w: 4, d: 16, r: 1 }, 4), 8, RAKE_Z + 8, P),
  knob: cylinder(-90, -166, 7, RAKE_Z + 10, 8, P, 16),
};



/* ---- feeder: bin, deck, sled ---- */
export const binBody = extrude(ringOf(BIN, 8), 60, BIN_TOP - 60, P, { convex: true });
export const binGate = slabOf({ x: -78, y: -176, w: 156, d: 4, r: 2 }, BIN_Z0, 2, P);
export const deck = extrude(ringOf(DECK, 8), DECK_Z0, DECK_TOP - DECK_Z0, P, { convex: true, bevel: 0.7 });
export const deckRail = (rx: number) => extrude(ringOf({ x: rx - 3, y: -236, w: 6, d: 48, r: 2 }, 8), DECK_TOP, 5, P);
export const sled = extrude(ringOf(SLED_BLOCK, 10), DECK_TOP, 3.4, P, { convex: true, bevel: 0.5 });
