import * as k from './iso-kit';

export const WIDTH = 760;
export const HEIGHT = 460;

// Dimensions of the SCS-1 Neuromorphic Chassis
export const CHASSIS: k.Plan = { x: -140, y: -72, w: 280, d: 144, r: 8 };
export const CHASSIS_H = 14;
export const FOOT_H = 6;

// Central Global Neuronal Workspace (GNW) Core
export const CORE: k.Plan = { x: -36, y: -34, w: 72, d: 68, r: 4 };
export const CORE_Z = 14;
export const CORE_H = 26;

// Left Bay: Hippocampal Fast Episodic Store (Graph-Vector Cartridge)
export const HIPPO_BAY: k.Plan = { x: -124, y: -32, w: 56, d: 64, r: 3 };
export const HIPPO_Z = 14;
export const HIPPO_H = 18;

// Right Bay: Neocortical Slow Structural Store (LoRA Adaptation Module)
export const NEOCORTEX_BAY: k.Plan = { x: 68, y: -32, w: 56, d: 64, r: 3 };
export const NEOCORTEX_Z = 14;
export const NEOCORTEX_H = 20;

// Hypothalamic Homeostat Dial (Surprisal / Allostatic Budget Galvanometer)
export const HOMEOSTAT_POS = [0, 48] as k.Plane;
export const HOMEOSTAT_R = 18;
export const HOMEOSTAT_Z = 14;
export const HOMEOSTAT_H = 8;

// Thalamic Saccadic Filter Throttle (Shannon Entropy Knob)
export const THALAMUS_POS = [-96, 46] as k.Plane;
export const THALAMUS_R = 12;
export const THALAMUS_Z = 14;
export const THALAMUS_H = 10;

// Basal Ganglia Action Port (POSIX PTY Sensorimotor Bus)
export const BUS_PORT: k.Plan = { x: 74, y: 40, w: 42, d: 24, r: 2 };
export const BUS_Z = 14;
export const BUS_H = 7;

// Camera Projection
export const P = k.fitProjection(
  [
    ...k.boxCorners(CHASSIS, -CHASSIS_H - FOOT_H, 0),
    [0, 0, CORE_Z + CORE_H + 12],
    [HIPPO_BAY.x, HIPPO_BAY.y, HIPPO_Z + HIPPO_H + 6],
    [NEOCORTEX_BAY.x + NEOCORTEX_BAY.w, NEOCORTEX_BAY.y + NEOCORTEX_BAY.d, NEOCORTEX_Z + NEOCORTEX_H + 6]
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

// Needle endpoint calculation for Homeostat Galvanometer
export function homeostatNeedleAt(turn: number): string {
  // turn is from -1.0 (calm/low surprise) to +1.0 (high surprise)
  const angle = (turn * 48 - 90) * (Math.PI / 180);
  const cx = HOMEOSTAT_POS[0];
  const cy = HOMEOSTAT_POS[1];
  const z = HOMEOSTAT_Z + HOMEOSTAT_H + 0.6;
  const r = HOMEOSTAT_R * 0.75;
  const tipX = cx + Math.cos(angle) * r;
  const tipY = cy + Math.sin(angle) * r;
  return k.pathOf([k.iso([cx, cy, z], P), k.iso([tipX, tipY, z], P)]);
}

// Cognitive Bus Pulses
export function busConduits(): string {
  const z = 14.5;
  const paths: string[] = [];
  // Conduit from Hippocampus to Core
  paths.push(k.pathOf([
    k.iso([HIPPO_BAY.x + HIPPO_BAY.w, HIPPO_BAY.y + HIPPO_BAY.d / 2, z], P),
    k.iso([CORE.x, CORE.y + CORE.d / 2, z], P)
  ]));
  // Conduit from Core to Neocortex
  paths.push(k.pathOf([
    k.iso([CORE.x + CORE.w, CORE.y + CORE.d / 2, z], P),
    k.iso([NEOCORTEX_BAY.x, NEOCORTEX_BAY.y + NEOCORTEX_BAY.d / 2, z], P)
  ]));
  // Conduit from Thalamus to Core
  paths.push(k.pathOf([
    k.iso([THALAMUS_POS[0] + THALAMUS_R, THALAMUS_POS[1], z], P),
    k.iso([CORE.x + 8, CORE.y + CORE.d - 4, z], P)
  ]));
  // Conduit from Homeostat to Core
  paths.push(k.pathOf([
    k.iso([HOMEOSTAT_POS[0], HOMEOSTAT_POS[1] - HOMEOSTAT_R, z], P),
    k.iso([CORE.x + CORE.w / 2, CORE.y + CORE.d, z], P)
  ]));
  return paths.join('');
}

// Build Static Substrate Geometry
export function buildScsRig() {
  const out: string[] = [
    `<path class="iso-halo" d="${k.haloOf(CHASSIS, -CHASSIS_H - FOOT_H, CHASSIS_H, P)}"/>`
  ];

  // 1. Damping Feet
  for (const [x, y] of byDepth(k.corners(CHASSIS, 20))) {
    out.push(S(k.cylinder(x, y, 7.5, -CHASSIS_H - FOOT_H, 2, P, 24), { tone: 'lo' }));
    out.push(S(k.cylinder(x, y, 5.8, -CHASSIS_H - FOOT_H + 2, FOOT_H - 2, P, 24), { tone: 'mid' }));
  }

  // 2. Base Chassis Slab
  out.push(S(k.slabOf(CHASSIS, -CHASSIS_H, CHASSIS_H, P, 8, 1.4), { tone: 'mid' }));
  out.push(L(k.planOutline(k.insetPlan(CHASSIS, 5.5), 0, P), { tone: 'lo' }));

  // Corner Screws
  const chassisScrews = k.corners(CHASSIS, 10);
  out.push(L(chassisScrews.map(([x, y]) => k.ring(x, y, 2.5, 0, P, 16)).join(''), { tone: 'lo' }));
  out.push(D(chassisScrews.map(([x, y]) => at([x, y, 0])), { size: 0.5, tone: 'mid' }));

  // Bus Ribbon Traces engraved on deck
  out.push(L(busConduits(), { tone: 'lo' }));

  // 3. Central Global Neuronal Workspace (GNW) Core
  out.push(S(k.slabOf(k.insetPlan(CORE, -3), 0, 2, P, 5, 0.4), { tone: 'lo' }));
  out.push(S(k.slabOf(CORE, 2, CORE_H, P, 4, 1.0), { tone: 'hi' }));

  // Working Memory Core Illuminated Facets / Prism Aperture
  const coreAperture: k.Plan = { x: CORE.x + 8, y: CORE.y + 8, w: CORE.w - 16, d: CORE.d - 16, r: 2 };
  out.push(S(k.slabOf(coreAperture, CORE_Z + CORE_H - 2, 2.5, P, 2), { tone: 'mid' }));
  out.push(L(k.planOutline(coreAperture, CORE_Z + CORE_H + 0.6, P), { tone: 'lit' }));
  
  // Working Memory Active Token Grid
  const tokenDots = k.dotGrid(coreAperture.x + 8, coreAperture.y + 8, 4, 4, 10, CORE_Z + CORE_H + 0.7, P);
  out.push(D(tokenDots, { size: 0.7, tone: 'lit' }));

  // 4. Left Bay: Hippocampal Fast Episodic Store
  out.push(S(k.slabOf(k.insetPlan(HIPPO_BAY, -2), 0, 2, P, 4), { tone: 'lo' }));
  out.push(S(k.slabOf(HIPPO_BAY, 2, HIPPO_H, P, 3, 0.8), { tone: 'mid' }));
  
  // Episodic Vector Cartridge Slots (Graph-Vector Index)
  for (let i = 0; i < 4; i++) {
    const slotX = HIPPO_BAY.x + 6 + i * 12;
    const slot: k.Plan = { x: slotX, y: HIPPO_BAY.y + 6, w: 8, d: HIPPO_BAY.d - 12, r: 1 };
    out.push(S(k.slabOf(slot, HIPPO_Z + HIPPO_H, 4, P, 1), { tone: 'lo' }));
    out.push(D([at([slotX + 4, HIPPO_BAY.y + 12, HIPPO_Z + HIPPO_H + 4.1])], { size: 0.5, tone: 'lit' }));
  }

  // 5. Right Bay: Neocortical Structural Adaptation Store (LoRA Unit)
  out.push(S(k.slabOf(k.insetPlan(NEOCORTEX_BAY, -2), 0, 2, P, 4), { tone: 'lo' }));
  out.push(S(k.slabOf(NEOCORTEX_BAY, 2, NEOCORTEX_H, P, 3, 0.8), { tone: 'mid' }));
  
  // Cooling Fins / Parameter Ranks on Neocortex
  for (let i = 0; i < 5; i++) {
    const finY = NEOCORTEX_BAY.y + 8 + i * 10;
    out.push(S(k.slabOf({ x: NEOCORTEX_BAY.x + 4, y: finY, w: NEOCORTEX_BAY.w - 8, d: 4, r: 0.5 }, NEOCORTEX_Z + NEOCORTEX_H, 5, P), { tone: 'hi' }));
  }

  // 6. Hypothalamic Homeostat Galvanometer (Allostatic Budget Dial)
  out.push(S(k.cylinder(HOMEOSTAT_POS[0], HOMEOSTAT_POS[1], HOMEOSTAT_R + 2, 0, 2, P, 32), { tone: 'lo' }));
  out.push(S(k.cylinder(HOMEOSTAT_POS[0], HOMEOSTAT_POS[1], HOMEOSTAT_R, 2, HOMEOSTAT_H, P, 32, 0.6), { tone: 'mid' }));
  // Galvanometer Face Rim & Ticks
  out.push(L(k.ring(HOMEOSTAT_POS[0], HOMEOSTAT_POS[1], HOMEOSTAT_R - 2.5, HOMEOSTAT_Z + HOMEOSTAT_H + 0.1, P, 32), { tone: 'lo' }));
  const homeoTicks = k.radialTicks(HOMEOSTAT_POS[0], HOMEOSTAT_POS[1], HOMEOSTAT_R - 2.5, 32, 4, HOMEOSTAT_Z + HOMEOSTAT_H + 0.2, [1.2, 2.5], P);
  out.push(L(homeoTicks.minor, { tone: 'lo' }), L(homeoTicks.major, { tone: 'mid' }));
  // Galvanometer Needle (Dynamic in runtime)
  out.push(`<path id="scsNeedle" class="iso-line-lit" d="${homeostatNeedleAt(-0.35)}" stroke="#00e5a3" stroke-width="1.8" stroke-linecap="round"/>`);
  out.push(D([at([HOMEOSTAT_POS[0], HOMEOSTAT_POS[1], HOMEOSTAT_Z + HOMEOSTAT_H + 0.8])], { size: 0.8, tone: 'lit' }));

  // 7. Thalamic Saccadic Entropy Throttle
  out.push(S(k.cylinder(THALAMUS_POS[0], THALAMUS_POS[1], THALAMUS_R + 1.5, 0, 2, P, 24), { tone: 'lo' }));
  out.push(S(k.cylinder(THALAMUS_POS[0], THALAMUS_POS[1], THALAMUS_R, 2, THALAMUS_H, P, 24), { tone: 'hi' }));
  // Knurled grip ridges around knob
  out.push(L(k.knurl(THALAMUS_POS[0], THALAMUS_POS[1], THALAMUS_R, 4, THALAMUS_Z + THALAMUS_H, 20, P), { tone: 'lo' }));
  // Top Index Pointer on Thalamus
  out.push(L(k.segment([THALAMUS_POS[0], THALAMUS_POS[1], THALAMUS_Z + THALAMUS_H + 0.2], [THALAMUS_POS[0] - THALAMUS_R + 2, THALAMUS_POS[1], THALAMUS_Z + THALAMUS_H + 0.2], P), { tone: 'lit' }));

  // 8. Basal Ganglia Action Port (PTY Execution Harness)
  out.push(S(k.slabOf(BUS_PORT, 0, BUS_H, P, 2), { tone: 'lo' }));
  const portAperture: k.Plan = { x: BUS_PORT.x + 4, y: BUS_PORT.y + 4, w: BUS_PORT.w - 8, d: BUS_PORT.d - 8, r: 1 };
  out.push(S(k.slabOf(portAperture, BUS_H, 1, P, 1), { tone: 'mid' }));
  out.push(D([at([BUS_PORT.x + 8, BUS_PORT.y + 12, BUS_H + 1.2]), at([BUS_PORT.x + BUS_PORT.w - 8, BUS_PORT.y + 12, BUS_H + 1.2])], { size: 0.5, tone: 'lit' }));

  const svg = `<svg viewBox="0 0 ${WIDTH} ${HEIGHT}" width="100%" height="100%" class="iso-svg" xmlns="http://www.w3.org/2000/svg">${out.join('')}</svg>`;
  return { svg, P };
}
