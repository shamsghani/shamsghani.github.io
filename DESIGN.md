# DESIGN.md — Shams Ghani Portfolio

## Phase 0: Brief
- **Subject:** Shams Ghani — Machine Learning Engineer & Perception Researcher.
- **Academic Pedigree:** MSc Artificial Intelligence, Queen's University Belfast (Russell Group); BSc Computer Science, GIK Institute of Engineering Sciences & Technology.
- **Current Role:** Ongoing Graduate Traineeship at Itanz (Advanced AI/ML Engineering, Model Adaptation, RAG Evals).
- **Audience:** Frontier AI/ML research labs, top-tier engineering leads, technical founders, and creative technologists.
- **The Site's Job:** Establish undeniable scientific depth, mathematical rigor, and engineering craftsmanship. Demonstrate how deep learning optimization resolves signal from noise—across sub-diffraction microscopy, contrastive representation learning, autonomous agentic systems, and low-level hardware reverse engineering.
- **Hosting Target:** Production deployment (Vercel / GitHub Pages `shamsghani.github.io`).

---

## Phase 1: Concept

### Concept Card
```
Idea:        An optical resolving instrument that recovers nanoscale physical truth from blurry, diffraction-limited signals.
Metaphor:    Single-Molecule Localization Microscopy (SMLM) and focal-loss objective landscape geometry.
Signature:   The 3-Stage Scroll Resolving Engine: Overlapping Gaussian blur -> Sub-pixel point localization -> Macro-structure optical zoom-out.
Emotion:     Calibrated laboratory precision, empirical stillness, scientific revelation.
Motion verb: Resolve from blur: elements crystallize from stochastic diffraction clouds into sharp coordinate vectors.
Screenshot:  The Hero Reticle Stage at progress p=0.85: localized fluorophore emitters snapping into an illuminated microtubule lattice with live PSNR (33.8 dB) telemetry.
```

### Territory Scoring
1. **Territory 2 (Material of the Profession): The Resolving Lens / Sub-Diffraction Localization**
   - *Anchor:* Shams' MSc dissertation on *Deep FOCUS* at Queen's University Belfast, proving that designing loss function geometry (Focal Loss) achieves 60–100% gains over regression baselines (33.8 dB PSNR vs 17–20 dB) across 10,000 synthetic optical microscopy frames.
   - *Scores:* Originality: 5/5, Fit: 5/5, Feasibility: 5/5, Portability: 1/5 (uniquely anchored in Shams' specific research).
2. **Territory 4 (Process Metaphor): The Cognitive Epistemic Clock**
   - *Anchor:* Autonomous agent stopping conditions and metacognitive architectures (Odysseus, SCS project).
   - *Scores:* Originality: 4/5, Fit: 4/5, Feasibility: 4/5, Portability: 3/5.
3. **Territory 1 (Name & Identity): Shams (شمس) — Photon Emission Field**
   - *Anchor:* "Shams" = solar emission; photon detection in dark-field optical microscopy.
   - *Scores:* Originality: 4/5, Fit: 4/5, Feasibility: 5/5, Portability: 2/5.

**Selected Concept:** **Concept 1: The Resolving Lens (Sub-Diffraction Localization)**.

---

## Phase 2: Art Direction System

### Palette: Calibrated Dark-Field Optical Ground & Fluorophore Emission
- `--ground`: `#080a0e` (laboratory optical table obsidian)
- `--ground-card`: `#0f131a` (specimen chamber / CNC stage mount)
- `--ink`: `#eef3f8` (polished optical chrome / high-contrast data)
- `--muted`: `#78879b` (calibrated slate gray, passes WCAG AA contrast ratio ≥ 4.5:1 on `--ground`)
- `--line`: `rgba(238, 243, 248, 0.08)` (precision optical reticle hairlines)
- `--accent`: `#00e5a3` (525nm GFP fluorophore emission green)
- `--accent-alt`: `#38bdf8` (488nm laser excitation cyan)
- `--curtain`: `#050608`

### Typography
- **Primary Display & Headings:** `Host Grotesk` (clean, contemporary neo-grotesk with geometric poise and optical clarity).
- **Body & Editorial:** `Host Grotesk` 400 / 500, font-size fluid 16–18px, line-height 1.55, tracking -0.01em.
- **Instrument Telemetry & Reticle Data:** `JetBrains Mono` / `DM Mono` (tabular figures, coordinates `[x, y, σ]`, metric labels `dB`, `FWHM`, `IoU`).

### Grid & Rhythm
- 12-column responsive layout with fluid gutters: `clamp(1.25rem, 1rem + 2vw, 3rem)`.
- Asymmetric section rhythms:
  1. Sticky Stage Hero (200svh scroll track with locked optical resolving viewport).
  2. Four-corner instrument framing (Coordinates `54.5844° N, 5.9340° W` Belfast, Status `Graduate Trainee @ Itanz`, System Telemetry).
  3. Flagship Empirical Case Studies (Deep FOCUS, Odysseus, Contrastive Adaptation, Profundus).
  4. The Experimental Lab (CRT Oscilloscope, Gaussian Splatting, Soundstage Audio Diffusion, OpenMouse Reverse Engineering).
  5. Interactive Visitor Log & Inquiries Terminal.

---

## Phase 3: Signature Moment Specification

### The 3-Stage Scroll Resolving Engine
```
Scroll Progress: 0.0 ──────────────> 0.40 ──────────────> 0.75 ──────────────> 1.0
┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│ [RETICLE: 488nm / 525nm]│  │ [FOCAL LOSS CONVERGING] │  │ [RESOLVED NANOSTRUCTURE]│
│                         │  │                         │  │   \  /    \  /   •-•    │
│    ( ( (   ░░░   ) ) )  │  │      •        •         │  │    \/      \/   /   \   │
│   ( (  ░░░░░░░░░  ) )   │  │   •     •  •     •      │  │    /\      /\  •-•-•-•  │
│    ( ( (   ░░░   ) ) )  │  │      •        •         │  │   /  \    /  \        │
│                         │  │                         │  │ (Microtubule Network)   │
│  "Diffraction limit"    │  │  "PSNR: 18dB -> 33.8dB" │  │ "Sub-diffraction truth" │
└─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘
 Phase 1: Overlapping Blur    Phase 2: Point Localization   Phase 3: Macro Zoom-out
```

- **Phase 1 ($p \in [0.0, 0.35]$) — The Diffraction Limit:**
  A framed optical viewport displaying overlapping 2D Gaussian point spread functions (diffraction-limited optical blur). Subtle chromatic dispersion and an idle breathing motion on pointer hover.
- **Phase 2 ($p \in [0.35, 0.70]$) — Focal Loss Localization:**
  As the visitor scrolls, the Gaussian standard deviation $\sigma$ contracts. Blurry fields resolve into pinpoint emitter coordinates with sub-pixel centroids. Live monospace telemetry streams: `PSF FWHM: 280nm → 20nm`, `Loss: Focal Loss (γ = 2.0)`, `PSNR: 18.2 dB → 33.8 dB`.
- **Phase 3 ($p \in [0.70, 1.0]$) — Macro-Scale Nanostructure Reveal:**
  The optical viewport zooms out smoothly, revealing that the localized point coordinates form a biological microtubule/neural fiber lattice that frames the introduction to Shams Ghani's work.
- **Reduced Motion Fallback:** Displays the resolved, static nanostructure with full contrast, zero scroll-scrub latency, and clean typography.

