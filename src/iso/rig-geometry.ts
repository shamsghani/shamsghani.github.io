import * as k from './iso-kit';

export const WIDTH = 760;
export const HEIGHT = 460;

// Dimensions of the SMLM optical bench
export const PLATE: k.Plan = { x: -140, y: -70, w: 280, d: 140, r: 8 };
export const PLATE_H = 12;
export const FOOT_H = 6;

// Left Laser Fixture
export const LASER_BASE: k.Plan = { x: -124, y: -22, w: 46, d: 44, r: 3 };
export const LASER_BASE_H = 14;
export const LASER_POST = [-104, 0] as k.Plane;
export const LASER_POST_TOP = 110;
export const LASER_HEAD_Z = 75;

// Guide rails along X axis
export const RAIL_FROM = -30;
export const RAIL_TO = 115;

// Sliding Nanometer Specimen Stage Carriage
export const CARRIAGE: k.Plan = { x: -28, y: -24, w: 56, d: 48, r: 3 };
export const CARRIAGE_Z = 3;
export const CARRIAGE_TOP = 9;

// Inverted Objective & Nanometer Focal Dial
export const OBJECTIVE_POS = [58, 0] as k.Plane;
export const DIAL_R = 22;
export const DIAL_Z = 86;
export const DIAL_H = 10;
export const DIAL_TOP = DIAL_Z + DIAL_H;

// Slide carriage stops (positions along X)
export const STOPS = [-10, 25, 58]; // [Unloaded, Approaching, Focal Zone]
export const FOCAL_STOP = 58;

// Fit camera projection
export const P = k.fitProjection(
  [
    ...k.boxCorners(PLATE, -PLATE_H - FOOT_H, 0),
    [LASER_POST[0], LASER_POST[1], LASER_POST_TOP + 4],
    [OBJECTIVE_POS[0] + DIAL_R + 6, OBJECTIVE_POS[1] + DIAL_R + 6, DIAL_TOP + 10]
  ],
  WIDTH,
  HEIGHT,
  { pad: 32, azimuth: 42, elevation: 28 }
);

const at = (point: k.Point3): k.Flat => k.iso(point, P);
const S = (paths: k.SolidPaths, style?: k.SolidStyle) => k.solidSvg(paths, style);
const L = (d: string, style?: k.LineStyle) => k.lineSvg(d, style);
const D = (points: k.Flat[], style?: { size?: number; tone?: k.Tone; pulse?: boolean }) => k.dotsSvg(points, style);
const byDepth = (points: k.Plane[]) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

// Base Optical Table
function baseTable() {
  const out: string[] = [
    `<path class="iso-halo" d="${k.haloOf(PLATE, -PLATE_H - FOOT_H, PLATE_H, P)}"/>`
  ];

  // 4 vibration-isolation damping feet
  for (const [x, y] of byDepth(k.corners(PLATE, 22))) {
    out.push(S(k.cylinder(x, y, 7.5, -PLATE_H - FOOT_H, 2, P, 24), { tone: "lo" }));
    out.push(S(k.cylinder(x, y, 5.8, -PLATE_H - FOOT_H + 2, FOOT_H - 2, P, 24), { tone: "mid" }));
  }

  // Optical breadboard slab
  out.push(S(k.slabOf(PLATE, -PLATE_H, PLATE_H, P, 8, 1.4), { tone: "mid" }));

  // Inset boundary groove
  out.push(L(k.planOutline(k.insetPlan(PLATE, 5.5), 0, P), { tone: "lo" }));

  // Corner M6 mounting hex screws with counterbores
  const screws = k.corners(PLATE, 11);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.5, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5, tone: "mid" }));

  // Vernier tick ruler strip along front edge
  const strip: k.Plan = { x: -120, y: PLATE.y + PLATE.d - 16, w: 240, d: 8, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.8, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 5, 5, strip.y + 1, 0.8, [2, 3.8], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(D([at([strip.x + 2, strip.y + 4, 0.8]), at([strip.x + strip.w - 2, strip.y + 4, 0.8])], { size: 0.45, tone: "faint" }));

  return out.join("");
}

// Dual Guide Rails
function guideRails() {
  const out: string[] = [];
  // Rails along Y offsets
  for (const y of [-22, 16]) {
    out.push(S(k.slabOf({ x: RAIL_FROM, y, w: RAIL_TO - RAIL_FROM, d: 6, r: 1 }, 0, 3.2, P, 3, 0.4), { tone: "mid" }));
    out.push(D([RAIL_FROM + 6, RAIL_TO - 6].map((x) => at([x, y + 3, 3.2])), { size: 0.4, tone: "lo" }));
  }
  // Rail end-stop blocks
  for (const x of [RAIL_FROM - 5, RAIL_TO]) {
    out.push(S(k.slabOf({ x, y: -25, w: 5, d: 50, r: 1.2 }, 0, 7.5, P, 3, 0.5), { tone: "mid" }));
    out.push(D([at([x + 2.5, -20, 7.5]), at([x + 2.5, 20, 7.5])], { size: 0.45, tone: "faint" }));
  }
  return out.join("");
}

// 488nm Laser Source & Articulated Mount
function laserSource() {
  const out: string[] = [];
  // Heavy magnetic clamp base
  out.push(S(k.slabOf(LASER_BASE, 0, 12, P, 4, 0.8), { tone: "mid" }));
  out.push(S(k.slabOf(k.insetPlan(LASER_BASE, 1.2), 12, LASER_BASE_H - 12, P, 4, 0.6), { tone: "mid" }));
  out.push(L(k.planOutline(k.insetPlan(LASER_BASE, 3.5), LASER_BASE_H, P), { tone: "faint" }));
  
  // Knurled base adjustment lock
  const knob = [LASER_BASE.x + 34, LASER_BASE.y + 30];
  out.push(S(k.cylinder(knob[0], knob[1], 6.5, LASER_BASE_H, 4.5, P, 24), { tone: "mid" }));
  out.push(L(k.knurl(knob[0], knob[1], 6.5, LASER_BASE_H, LASER_BASE_H + 4.5, 24, P), { tone: "lo" }));
  out.push(D([at([knob[0], knob[1], LASER_BASE_H + 4.5])], { size: 0.5, tone: "hi" }));

  // Vertical steel post
  out.push(S(k.cylinder(LASER_POST[0], LASER_POST[1], 4.2, LASER_BASE_H, LASER_POST_TOP - LASER_BASE_H, P, 28), { tone: "mid" }));
  out.push(L([45, 75, 95].map((z) => k.sideArc(LASER_POST[0], LASER_POST[1], 4.2, z, P, 16)).join(""), { tone: "faint" }));

  // Laser housing mounted on post
  const headPlan: k.Plan = { x: LASER_POST[0] - 8, y: -16, w: 42, d: 32, r: 2 };
  out.push(S(k.slabOf(headPlan, LASER_HEAD_Z, 22, P, 4, 0.8), { tone: "hi" }));

  // Collimator barrel pointing right toward the sample
  out.push(S(k.cylinder(headPlan.x + headPlan.w + 6, 0, 7, LASER_HEAD_Z + 5, 12, P, 24), { tone: "lit" }));

  // Laser label on housing
  out.push(k.faceTextSvg(k.topMatrix([headPlan.x + 4, headPlan.y + 4], LASER_HEAD_Z + 22, P), "λ: 488nm CW", { size: 3.2, tone: "hi" }));

  return out.join("");
}

// Sliding Carriage with Nanometer Specimen Stage & Sample Slide
export function specimenCarriage() {
  const out: string[] = [
    `<path class="iso-halo" d="${k.haloOf(k.insetPlan(CARRIAGE, 3), CARRIAGE_Z, 0.1, P)}" style="filter:blur(4px)"/>`
  ];

  // Carriage block
  out.push(S(k.slabOf(CARRIAGE, CARRIAGE_Z, CARRIAGE_TOP - CARRIAGE_Z, P, 4, 0.6), { tone: "mid" }));
  out.push(D([-20, -6, 6, 20].map((x) => at([x, CARRIAGE.y + CARRIAGE.d - 2.8, CARRIAGE_TOP])), { size: 0.4, tone: "lo" }));

  // Brass slide clip holder
  const clipPlan: k.Plan = { x: -22, y: -16, w: 44, d: 32, r: 1.5 };
  out.push(S(k.slabOf(clipPlan, CARRIAGE_TOP, 3, P, 3, 0.4), { tone: "hi", crease: "lo" }));

  // Glass Cover Slip Specimen
  const slidePlan: k.Plan = { x: -16, y: -12, w: 32, d: 24, r: 1 };
  out.push(S(k.slabOf(slidePlan, CARRIAGE_TOP + 3, 1.4, P, 2, 0.2), { tone: "lit" }));

  // Fluorescent fluorophore emitter center spot on the slide
  const centerP = at([0, 0, CARRIAGE_TOP + 4.5]);
  out.push(`<circle id="emitterCore" cx="${centerP[0].toFixed(1)}" cy="${centerP[1].toFixed(1)}" r="3" fill="#00e5a3" />`);
  out.push(`<circle id="emitterHalo" cx="${centerP[0].toFixed(1)}" cy="${centerP[1].toFixed(1)}" r="8" fill="none" stroke="#00e5a3" stroke-width="0.8" stroke-dasharray="2 2" opacity="0.7" />`);

  // Carriage adjustment thumb screw
  const handle = [CARRIAGE.x + CARRIAGE.w - 6, CARRIAGE.y + CARRIAGE.d + 3];
  out.push(S(k.slabOf({ x: handle[0] - 2, y: CARRIAGE.y + CARRIAGE.d - 1, w: 4, d: 4, r: 1 }, CARRIAGE_Z + 1, 3, P, 2), { tone: "mid", crease: "none" }));
  out.push(S(k.cylinder(handle[0], handle[1] + 1, 3.2, CARRIAGE_Z, 5, P, 18), { tone: "mid" }));
  out.push(L(k.knurl(handle[0], handle[1] + 1, 3.2, CARRIAGE_Z, CARRIAGE_Z + 5, 18, P), { tone: "lo" }));

  return out.join("");
}

// Inverted Objective Turret & Nanometer Focal Plane Dial
function objectiveAndDial() {
  const out: string[] = [];
  const [x, y] = OBJECTIVE_POS;

  // Vertical support pillar
  out.push(S(k.cylinder(x, y, 4, 20, DIAL_Z - 20, P, 24), { tone: "mid" }));
  out.push(L([35, 55, 75].map((z) => k.sideArc(x, y, 4, z, P, 16)).join(""), { tone: "lo" }));

  // Lower High-NA Objective Turret (pointing downward toward specimen slide)
  out.push(S(k.cylinder(x, y, 12, 16, 12, P, 32, 0.6), { tone: "hi" }));
  out.push(L(k.knurl(x, y, 12, 18, 26, 40, P), { tone: "lo" }));
  out.push(S(k.cylinder(x, y, 8, 4, 12, P, 28, 0.4), { tone: "lit" }));
  out.push(k.faceTextSvg(k.topMatrix([x - 12, y + 14], 28, P), "NA 1.49 OIL", { size: 2.8, tone: "hi" }));

  // Upper Nanometer Focal Dial Housing
  out.push(S(k.cylinder(x, y, DIAL_R, DIAL_Z, DIAL_H, P, 64, 0.8), { tone: "hi", crease: "lo" }));
  out.push(L(k.knurl(x, y, DIAL_R, DIAL_TOP - 3.5, DIAL_TOP, 72, P, 0.3), { tone: "lo" }));
  out.push(L(k.ring(x, y, DIAL_R - 2.5, DIAL_TOP, P, 64), { tone: "lo" }));

  // Radial tick marks on dial face
  const ticks = k.radialTicks(x, y, DIAL_R - 3.2, 50, 5, DIAL_TOP, [1.5, 3.2], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(L(k.ring(x, y, 1.8, DIAL_TOP, P, 16), { tone: "mid" }));

  // Dial text
  out.push(k.faceTextSvg(k.topMatrix([x, y + 10], DIAL_TOP, P), "ΔZ (nm)", { size: 2.6, tone: "lo", anchor: "middle" }));

  return out.join("");
}

// Needle angle on dial face: 0 turn = focused Z=0; 1 turn = 100nm drift
export const needleAt = (turn: number) => {
  const angle = turn * Math.PI * 2;
  const [x, y] = OBJECTIVE_POS;
  return k.lineOnTop(
    [x - Math.sin(angle) * 3.6, y + Math.cos(angle) * 3.6],
    [x + Math.sin(angle) * (DIAL_R - 4.5), y - Math.cos(angle) * (DIAL_R - 4.5)],
    DIAL_TOP + 0.2,
    P
  );
};

export const laserBeamPath = (x: number): string => {
  const p1 = at([LASER_POST[0] + 34, 0, LASER_HEAD_Z + 11]);
  const p2 = at([x, 0, CARRIAGE_TOP + 4.5]);
  return `M${p1[0].toFixed(1)} ${p1[1].toFixed(1)} L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
};

export const emitBeamPath = (x: number): string => {
  const p1 = at([x, 0, CARRIAGE_TOP + 4.5]);
  const p2 = at([OBJECTIVE_POS[0], OBJECTIVE_POS[1], 16]);
  return `M${p1[0].toFixed(1)} ${p1[1].toFixed(1)} L${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
};

// Assemble Full Interactive SVG Figure
export function buildAnatomyRig(): { svg: string } {
  const startX = STOPS[2]; // Placed in the focal zone at start
  const initialTurn = 0.0; // Perfectly focused at start

  // Optical laser beams
  const laserEmitP = at([LASER_POST[0] + 34, 0, LASER_HEAD_Z + 11]);
  const focalP = at([startX, 0, CARRIAGE_TOP + 4.5]);
  const objectiveP = at([OBJECTIVE_POS[0], OBJECTIVE_POS[1], 16]);

  const bodyParts = [
    baseTable(),
    guideRails(),
    laserSource(),
    `<g id="rigCarriage" data-part="carriage" transform="${k.translateAlong(P, [startX, 0, 0])}">${specimenCarriage()}</g>`,
    objectiveAndDial(),
    `<path id="rigNeedle" data-part="needle" class="iso-line" data-tone="lit" data-free="start" d="${needleAt(initialTurn)}" style="stroke-width:1.4; stroke:#00e5a3;"/>`,
    // Laser excitation beam: 488nm cyan
    `<path id="rigLaserBeam" class="iso-line" data-tone="blue" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" d="${laserBeamPath(startX)}" />`,
    // Emission beam: 525nm GFP green
    `<path id="rigEmitBeam" class="iso-line" data-tone="green" stroke="#00e5a3" stroke-width="3" stroke-linecap="round" d="${emitBeamPath(startX)}" />`
  ];

  const svg = k.figureSvg({
    width: WIDTH,
    height: HEIGHT,
    label: "SMLM Optical Localization Test Rig with nanometer specimen carriage, excitation laser and high-NA objective.",
    body: bodyParts
  });

  return { svg };
}

export const buildRigGeometry = buildAnatomyRig;
export { translateAlong } from './iso-kit';
export { at };
