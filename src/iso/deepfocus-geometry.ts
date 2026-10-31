import * as k from './iso-kit';

export const WIDTH = 760;
export const HEIGHT = 460;

// Dimensions of the Inverted Nanoscopy Microscope Base
export const BASE: k.Plan = { x: -130, y: -70, w: 260, d: 140, r: 8 };
export const BASE_H = 14;
export const FOOT_H = 6;

// Inverted Microscope Main Body Column / Arm
export const ARM: k.Plan = { x: -50, y: -58, w: 100, d: 52, r: 4 };
export const ARM_H = 48;

// Objective Turret (4-position rotating nosepiece under stage)
export const NOSEPIECE_POS = [0, 8] as k.Plane;
export const NOSEPIECE_R = 30;
export const NOSEPIECE_Z = 22;
export const NOSEPIECE_H = 10;

// Piezo Nanometer Specimen Stage Plate (Mounted above objective turret)
export const STAGE: k.Plan = { x: -44, y: -32, w: 88, d: 80, r: 3 };
export const STAGE_Z = 48;
export const STAGE_H = 6;

// Glass Specimen Slide on Stage
export const SLIDE: k.Plan = { x: -26, y: -18, w: 52, d: 52, r: 1.5 };
export const SLIDE_Z = STAGE_Z + STAGE_H;

// Laser Optical Launch Tube (Rear 488nm excitation)
export const LASER_TUBE_FROM = [-120, -32, 26] as k.Point3;
export const LASER_TUBE_TO = [-40, -10, 26] as k.Point3;

// Coaxial Coarse & Fine Focus Knobs (On right side of microscope body)
export const FOCUS_KNOB_POS = [58, -32] as k.Plane;
export const FOCUS_COARSE_R = 14;
export const FOCUS_FINE_R = 9;

// Camera Projection
export const P = k.fitProjection(
  [
    ...k.boxCorners(BASE, -BASE_H - FOOT_H, 0),
    [ARM.x + ARM.w / 2, ARM.y, ARM_H + 16],
    [STAGE.x + STAGE.w + 10, STAGE.y + STAGE.d + 10, STAGE_Z + STAGE_H + 20],
    [FOCUS_KNOB_POS[0] + 16, FOCUS_KNOB_POS[1], 36]
  ],
  WIDTH,
  HEIGHT,
  { pad: 32, azimuth: 46, elevation: 28 }
);

const at = (point: k.Point3): k.Flat => k.iso(point, P);
const S = (paths: k.SolidPaths, style?: k.SolidStyle) => k.solidSvg(paths, style);
const L = (d: string, style?: k.LineStyle) => k.lineSvg(d, style);
const D = (points: k.Flat[], style?: { size?: number; tone?: k.Tone; pulse?: boolean }) => k.dotsSvg(points, style);
const byDepth = (points: k.Plane[]) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

// Laser excitation ray to focal center
export function excitationRay(): string {
  const p1 = at(LASER_TUBE_FROM);
  const p2 = at(LASER_TUBE_TO);
  const p3 = at([0, 8, NOSEPIECE_Z + 8]); // Dichroic center
  const focalPt = at([0, 8, SLIDE_Z + 2.5]); // Specimen focal point
  return k.pathOf([p1, p2, p3, focalPt]);
}

// Build Static Microscope Body Geometry
export function buildDeepFocusRig() {
  const out: string[] = [
    `<path class="iso-halo" d="${k.haloOf(BASE, -BASE_H - FOOT_H, BASE_H, P)}"/>`
  ];

  // 1. Damping Feet
  for (const [x, y] of byDepth(k.corners(BASE, 20))) {
    out.push(S(k.cylinder(x, y, 7.5, -BASE_H - FOOT_H, 2, P, 24), { tone: 'lo' }));
    out.push(S(k.cylinder(x, y, 5.8, -BASE_H - FOOT_H + 2, FOOT_H - 2, P, 24), { tone: 'mid' }));
  }

  // 2. Heavy Cast-Iron Microscope Base
  out.push(S(k.slabOf(BASE, -BASE_H, BASE_H, P, 8, 1.4), { tone: 'mid' }));
  out.push(L(k.planOutline(k.insetPlan(BASE, 5.5), 0, P), { tone: 'lo' }));

  // Base Corner M6 hex bolts
  const screws = k.corners(BASE, 10);
  out.push(L(screws.map(([x, y]) => k.ring(x, y, 2.5, 0, P, 16)).join(''), { tone: 'lo' }));
  out.push(D(screws.map(([x, y]) => at([x, y, 0])), { size: 0.5, tone: 'mid' }));

  // 3. Vertical Body Column / Cast Arm
  out.push(S(k.slabOf(ARM, 0, ARM_H, P, 4, 1.2), { tone: 'hi' }));
  out.push(L(k.planOutline(k.insetPlan(ARM, 3), ARM_H, P), { tone: 'lo' }));

  // 4. Optical Laser Delivery Tube (488nm launch from rear)
  out.push(S(k.cylinder(LASER_TUBE_FROM[0], LASER_TUBE_FROM[1], 6, 0, LASER_TUBE_FROM[2], P, 20), { tone: 'lo' }));
  out.push(S(k.cylinder(LASER_TUBE_FROM[0], LASER_TUBE_FROM[1], 8, LASER_TUBE_FROM[2] - 4, 8, P, 20), { tone: 'hi' }));
  out.push(`<path d="${k.segment(LASER_TUBE_FROM, LASER_TUBE_TO, P)}" stroke="#38bdf8" stroke-width="2.6" stroke-linecap="round" fill="none" opacity="0.85"/>`);

  // 5. Dichroic Filter Cube Cage (Center under nosepiece)
  const dichroicCage: k.Plan = { x: -16, y: -8, w: 32, d: 32, r: 2 };
  out.push(S(k.slabOf(dichroicCage, 10, 12, P, 2, 0.4), { tone: 'lo' }));
  out.push(L(k.planOutline(dichroicCage, 22, P), { tone: 'lit' }));

  // 6. Inverted 4-Position Objective Nosepiece Turret
  out.push(S(k.cylinder(NOSEPIECE_POS[0], NOSEPIECE_POS[1], NOSEPIECE_R, 18, 4, P, 32, 0.5), { tone: 'lo' }));
  // Knurled turret indexing ring
  out.push(L(k.knurl(NOSEPIECE_POS[0], NOSEPIECE_POS[1], NOSEPIECE_R, 18, 22, 28, P), { tone: 'lo' }));

  // High-NA 1.49 Oil Immersion Objective (Active in focal position pointing up)
  const objZ = 22;
  const objH = 24;
  out.push(S(k.cylinder(NOSEPIECE_POS[0], NOSEPIECE_POS[1], 10, objZ, 6, P, 24), { tone: 'hi' }));
  out.push(S(k.cylinder(NOSEPIECE_POS[0], NOSEPIECE_POS[1], 7.5, objZ + 6, objH - 6, P, 24, 0.5), { tone: 'hi' }));
  // Brass/gold ring band on NA 1.49 objective
  out.push(L(k.ring(NOSEPIECE_POS[0], NOSEPIECE_POS[1], 7.6, objZ + 14, P, 24), { tone: 'lit' }));

  // Inactive auxiliary objectives on turret
  for (const angle of [90, 180, 270]) {
    const rad = (angle * Math.PI) / 180;
    const ax = NOSEPIECE_POS[0] + Math.cos(rad) * 18;
    const ay = NOSEPIECE_POS[1] + Math.sin(rad) * 18;
    out.push(S(k.cylinder(ax, ay, 6, objZ, 14, P, 18), { tone: 'mid' }));
  }

  // 7. Piezo Nanometer Specimen Stage Plate (Above Turret)
  out.push(S(k.slabOf(STAGE, STAGE_Z, STAGE_H, P, 3, 0.6), { tone: 'mid' }));
  // Central Optical Stage Aperture
  out.push(L(k.ring(NOSEPIECE_POS[0], NOSEPIECE_POS[1], 14, STAGE_Z + STAGE_H + 0.1, P, 28), { tone: 'lo' }));

  // Slide Hold-down Spring Clips
  out.push(S(k.slabOf({ x: -38, y: -4, w: 10, d: 24, r: 1 }, STAGE_Z + STAGE_H, 2.5, P), { tone: 'hi' }));
  out.push(S(k.slabOf({ x: 28, y: -4, w: 10, d: 24, r: 1 }, STAGE_Z + STAGE_H, 2.5, P), { tone: 'hi' }));

  // 8. Quartz Specimen Slide & Localized Emitter Point
  out.push(S(k.slabOf(SLIDE, STAGE_Z + STAGE_H, 1.8, P, 1.5, 0.2), { tone: 'hi' }));
  out.push(L(k.planOutline(SLIDE, SLIDE_Z + 1.8, P), { tone: 'lit' }));

  // Single-Molecule Emitter (Controlled in runtime via loss function)
  const focalPoint = at([0, 8, SLIDE_Z + 2.0]);
  out.push(`
    <g id="smlmEmitter">
      <circle id="emitterHalo" cx="${focalPoint[0]}" cy="${focalPoint[1]}" r="8" fill="#00e5a3" fill-opacity="0.35" filter="blur(2px)"/>
      <circle id="emitterCore" cx="${focalPoint[0]}" cy="${focalPoint[1]}" r="2.8" fill="#00e5a3" stroke="#eef3f8" stroke-width="0.8"/>
    </g>
  `);

  // 9. Coaxial Fine/Coarse Micrometer Focus Knobs (Right side of Arm)
  out.push(S(k.cylinder(FOCUS_KNOB_POS[0], FOCUS_KNOB_POS[1], FOCUS_COARSE_R, 16, 12, P, 24), { tone: 'mid' }));
  out.push(L(k.knurl(FOCUS_KNOB_POS[0], FOCUS_KNOB_POS[1], FOCUS_COARSE_R, 16, 28, 24, P), { tone: 'lo' }));
  out.push(S(k.cylinder(FOCUS_KNOB_POS[0] + 6, FOCUS_KNOB_POS[1], FOCUS_FINE_R, 18, 14, P, 20), { tone: 'hi' }));
  out.push(L(k.knurl(FOCUS_KNOB_POS[0] + 6, FOCUS_KNOB_POS[1], FOCUS_FINE_R, 18, 32, 18, P), { tone: 'lo' }));

  // Excitation Laser Beam
  out.push(`<path id="smlmLaserBeam" d="${excitationRay()}" stroke="#38bdf8" stroke-width="2.2" stroke-dasharray="4 2" fill="none" opacity="0.9"/>`);

  const svg = `<svg viewBox="0 0 ${WIDTH} ${HEIGHT}" width="100%" height="100%" class="iso-svg" xmlns="http://www.w3.org/2000/svg">${out.join('')}</svg>`;
  return { svg, P };
}
