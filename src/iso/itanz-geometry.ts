import * as k from './iso-kit';

export const WIDTH = 760;
export const HEIGHT = 460;

// Dimensions of the Console Bed
export const BED: k.Plan = { x: -136, y: -72, w: 272, d: 144, r: 8 };
export const BED_H = 14;
export const FOOT_H = 6;

// Document Scanning Platen (Left half of bed)
export const PLATEN: k.Plan = { x: -120, y: -56, w: 104, d: 112, r: 3 };
export const PLATEN_H = 3;

// Scanned Medical Letter on Platen
export const DOC: k.Plan = { x: -110, y: -46, w: 84, d: 92, r: 1.5 };

// Linear Scanning Gantry Rails along Y
export const GANTRY_RAIL_LEFT = -124;
export const GANTRY_RAIL_RIGHT = -12;

// Vector Index Drum (HNSW / JAXRetriever 57k Chunks on Right half)
export const DRUM_POS = [56, -16] as k.Plane;
export const DRUM_R = 34;
export const DRUM_Z = 14;
export const DRUM_H = 18;

// Disambiguation Collision Galvanometer ("The Patches Probe")
export const COLLISION_DIAL_POS = [56, 46] as k.Plane;
export const COLLISION_DIAL_R = 16;
export const COLLISION_DIAL_Z = 14;
export const COLLISION_DIAL_H = 8;

// Optical Scanning Carriage (moves along Y across Platen)
export const GANTRY_Y_POSITIONS = [-30, 0, 30]; // [Top, Mid, Bottom]

// Camera Projection
export const P = k.fitProjection(
  [
    ...k.boxCorners(BED, -BED_H - FOOT_H, 0),
    [DRUM_POS[0] + DRUM_R + 6, DRUM_POS[1] + DRUM_R + 6, DRUM_Z + DRUM_H + 12],
    [COLLISION_DIAL_POS[0] + COLLISION_DIAL_R + 6, COLLISION_DIAL_POS[1] + COLLISION_DIAL_R + 6, COLLISION_DIAL_Z + COLLISION_DIAL_H + 8],
    [PLATEN.x, PLATEN.y, 24]
  ],
  WIDTH,
  HEIGHT,
  { pad: 32, azimuth: 44, elevation: 30 }
);

const at = (point: k.Point3): k.Flat => k.iso(point, P);
const S = (paths: k.SolidPaths, style?: k.SolidStyle) => k.solidSvg(paths, style);
const L = (d: string, style?: k.LineStyle) => k.lineSvg(d, style);
const D = (points: k.Flat[], style?: { size?: number; tone?: k.Tone; pulse?: boolean }) => k.dotsSvg(points, style);
const byDepth = (points: k.Plane[]) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));

// Needle for Collision Dial
export function collisionNeedleAt(collisionLevel: number): string {
  // collisionLevel from 0.0 (calm / no collision) to 1.0 (high collision / Patches Probe)
  const angle = (collisionLevel * 90 - 135) * (Math.PI / 180);
  const cx = COLLISION_DIAL_POS[0];
  const cy = COLLISION_DIAL_POS[1];
  const z = COLLISION_DIAL_Z + COLLISION_DIAL_H + 0.6;
  const r = COLLISION_DIAL_R * 0.72;
  const tipX = cx + Math.cos(angle) * r;
  const tipY = cy + Math.sin(angle) * r;
  return k.pathOf([k.iso([cx, cy, z], P), k.iso([tipX, tipY, z], P)]);
}

// Optical Scanning Carriage Bar path
export function gantryCarriageAt(y: number): string {
  const z = 22;
  const bar: k.Plan = { x: GANTRY_RAIL_LEFT + 2, y: y - 4, w: GANTRY_RAIL_RIGHT - GANTRY_RAIL_LEFT - 4, d: 8, r: 1 };
  return S(k.slabOf(bar, z, 4, P, 1, 0.2), { tone: 'hi' });
}

// Build Static Rig Geometry
export function buildItanzRig() {
  const out: string[] = [
    `<path class="iso-halo" d="${k.haloOf(BED, -BED_H - FOOT_H, BED_H, P)}"/>`
  ];

  // 1. Damping Feet
  for (const [x, y] of byDepth(k.corners(BED, 20))) {
    out.push(S(k.cylinder(x, y, 7.5, -BED_H - FOOT_H, 2, P, 24), { tone: 'lo' }));
    out.push(S(k.cylinder(x, y, 5.8, -BED_H - FOOT_H + 2, FOOT_H - 2, P, 24), { tone: 'mid' }));
  }

  // 2. Base Console Bed
  out.push(S(k.slabOf(BED, -BED_H, BED_H, P, 8, 1.4), { tone: 'mid' }));
  out.push(L(k.planOutline(k.insetPlan(BED, 5.5), 0, P), { tone: 'lo' }));

  // Corner M6 lockdown screws
  const bedScrews = k.corners(BED, 10);
  out.push(L(bedScrews.map(([x, y]) => k.ring(x, y, 2.5, 0, P, 16)).join(''), { tone: 'lo' }));
  out.push(D(bedScrews.map(([x, y]) => at([x, y, 0])), { size: 0.5, tone: 'mid' }));

  // 3. Document Platen Well & Glass Plate (Left side)
  out.push(S(k.slabOf(PLATEN, 0, PLATEN_H, P, 3, 0.4), { tone: 'lo' }));
  out.push(L(k.planOutline(k.insetPlan(PLATEN, 2), PLATEN_H, P), { tone: 'lit' }));

  // Scanned Document Sheet on Glass
  out.push(S(k.slabOf(DOC, PLATEN_H, 0.6, P, 1.5), { tone: 'hi', crease: 'none' }));

  // Document Text & Layout Blocks (Scanned Clinical Correspondence)
  // Header block
  out.push(L(k.lineOnTop([-102, -40], [-50, -40], PLATEN_H + 0.8, P), { tone: 'lo' }));
  out.push(L(k.lineOnTop([-102, -34], [-65, -34], PLATEN_H + 0.8, P), { tone: 'lo' }));
  // Recipient / Patient info block
  out.push(L(k.lineOnTop([-102, -24], [-75, -24], PLATEN_H + 0.8, P), { tone: 'lo' }));
  out.push(L(k.lineOnTop([-102, -18], [-80, -18], PLATEN_H + 0.8, P), { tone: 'lo' }));
  // Prescription / Clinical Action table
  out.push(L(k.lineOnTop([-102, -6], [-38, -6], PLATEN_H + 0.8, P), { tone: 'lit' }));
  out.push(L(k.lineOnTop([-102, 2], [-44, 2], PLATEN_H + 0.8, P), { tone: 'lit' }));
  out.push(L(k.lineOnTop([-102, 10], [-52, 10], PLATEN_H + 0.8, P), { tone: 'lo' }));
  // Catch-all misc_notes bucket
  out.push(L(k.lineOnTop([-102, 22], [-40, 22], PLATEN_H + 0.8, P), { tone: 'lo' }));
  out.push(L(k.lineOnTop([-102, 28], [-60, 28], PLATEN_H + 0.8, P), { tone: 'lo' }));

  // Gantry Guide Rails flanking Platen
  for (const x of [GANTRY_RAIL_LEFT, GANTRY_RAIL_RIGHT]) {
    out.push(S(k.slabOf({ x: x - 2, y: -60, w: 4, d: 120, r: 1 }, 0, 8, P), { tone: 'mid' }));
  }

  // 4. Vector Index Drum (JAXRetriever / HNSW 57,312 Chunks)
  out.push(S(k.cylinder(DRUM_POS[0], DRUM_POS[1], DRUM_R + 2, 0, 2, P, 32), { tone: 'lo' }));
  out.push(S(k.cylinder(DRUM_POS[0], DRUM_POS[1], DRUM_R, 2, DRUM_H, P, 32, 0.8), { tone: 'hi' }));
  // Knurled sector dial around drum perimeter
  out.push(L(k.knurl(DRUM_POS[0], DRUM_POS[1], DRUM_R, 6, DRUM_Z + DRUM_H, 32, P), { tone: 'lo' }));
  // Inner Vector Embedding Core
  out.push(S(k.cylinder(DRUM_POS[0], DRUM_POS[1], DRUM_R - 8, DRUM_Z + DRUM_H, 4, P, 24), { tone: 'mid' }));
  out.push(L(k.ring(DRUM_POS[0], DRUM_POS[1], DRUM_R - 10, DRUM_Z + DRUM_H + 4.1, P, 24), { tone: 'lit' }));
  // Concentric Vector Cluster Rings
  out.push(L(k.ring(DRUM_POS[0], DRUM_POS[1], DRUM_R - 16, DRUM_Z + DRUM_H + 4.1, P, 24), { tone: 'lo' }));
  out.push(D([at([DRUM_POS[0], DRUM_POS[1], DRUM_Z + DRUM_H + 4.2])], { size: 0.8, tone: 'lit' }));

  // 5. Disambiguation Collision Galvanometer ("The Patches Probe")
  out.push(S(k.cylinder(COLLISION_DIAL_POS[0], COLLISION_DIAL_POS[1], COLLISION_DIAL_R + 2, 0, 2, P, 28), { tone: 'lo' }));
  out.push(S(k.cylinder(COLLISION_DIAL_POS[0], COLLISION_DIAL_POS[1], COLLISION_DIAL_R, 2, COLLISION_DIAL_H, P, 28, 0.6), { tone: 'mid' }));
  // Dial face rim and graduations
  out.push(L(k.ring(COLLISION_DIAL_POS[0], COLLISION_DIAL_POS[1], COLLISION_DIAL_R - 2.5, COLLISION_DIAL_Z + COLLISION_DIAL_H + 0.1, P, 28), { tone: 'lo' }));
  const dialTicks = k.radialTicks(COLLISION_DIAL_POS[0], COLLISION_DIAL_POS[1], COLLISION_DIAL_R - 2.5, 24, 4, COLLISION_DIAL_Z + COLLISION_DIAL_H + 0.2, [1.0, 2.2], P);
  out.push(L(dialTicks.minor, { tone: 'lo' }), L(dialTicks.major, { tone: 'mid' }));
  // Collision Needle (dynamic in runtime)
  out.push(`<path id="collisionNeedle" class="iso-line-lit" d="${collisionNeedleAt(0.12)}" stroke="#38bdf8" stroke-width="1.8" stroke-linecap="round"/>`);
  out.push(D([at([COLLISION_DIAL_POS[0], COLLISION_DIAL_POS[1], COLLISION_DIAL_Z + COLLISION_DIAL_H + 0.8])], { size: 0.8, tone: 'lit' }));

  // Optical scanning sweep line across document
  out.push(`<g id="gantryCarriageGroup">${gantryCarriageAt(0)}</g>`);
  out.push(`<path id="scanLaserLine" d="${k.segment([-108, 0, PLATEN_H + 1.2], [-14, 0, PLATEN_H + 1.2], P)}" stroke="#00e5a3" stroke-width="2.0" opacity="0.85"/>`);

  const svg = `<svg viewBox="0 0 ${WIDTH} ${HEIGHT}" width="100%" height="100%" class="iso-svg" xmlns="http://www.w3.org/2000/svg">${out.join('')}</svg>`;
  return { svg, P };
}
