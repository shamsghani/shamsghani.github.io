// Ground truth data from CV, research specs, and active project repositories
export type CaseStudy = {
  slug: string;
  title: string;
  shortTitle: string;
  category: 'Scientific Imaging' | 'Cognitive Architectures' | 'Information Retrieval' | 'Computer Vision' | 'Generative Modeling';
  year: number;
  institution: string;
  metrics: { label: string; value: string }[];
  summary: string;
  problem: string;
  hypothesis: string;
  methodology: string[];
  findings: string[];
  architecture: { layer: string; spec: string }[];
  codeUrl?: string;
  cover: { seed: number; colors: [string, string, string] };
};

export const site = {
  name: 'Muhammad Shams Ghani',
  shortName: 'Shams Ghani',
  role: 'Machine Learning Engineer',
  secondaryRole: 'AI & Perception Researcher',
  tagline: 'Deep Learning for Scientific Imaging, Representation Learning & Cognitive Systems',
  url: 'https://shamsghani.github.io',
  description: 'Machine Learning Engineer and researcher specializing in sub-diffraction microscopy, loss topology, representation learning, and cognitive harnesses.',
  email: 'shamsghani1@gmail.com',
  phoneUK: '+44 7876 369841',
  location: 'Belfast, UK',
  coordinates: '54.5844° N, 5.9340° W', // Queen's University Belfast
  socials: [
    { label: 'GitHub', href: 'https://github.com/ShamsGhani' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/shamsghani' },
    { label: 'Email', href: 'mailto:shamsghani1@gmail.com' }
  ],
  education: [
    {
      degree: 'MSc Artificial Intelligence',
      institution: "Queen's University Belfast",
      honors: 'Russell Group (88% research rated world-leading or internationally excellent)',
      period: 'Sep 2024 to Sep 2025',
      modules: ['Deep Learning', 'Computer Vision', 'AI for Health', 'Machine Learning', 'Knowledge Engineering'],
      thesis: 'Deep FOCUS: Focal Loss Optimisation for Single-Molecule Localisation Microscopy (SMLM) under Severe Sparsity'
    },
    {
      degree: 'BSc Computer Science',
      institution: 'GIK Institute of Engineering Sciences & Technology',
      honors: 'Specialized in AI, Deep Learning, Data Science, and Information Retrieval',
      period: 'Aug 2019 to Jun 2023',
      modules: ['Artificial Intelligence', 'Deep Learning', 'Data Science', 'NLP', 'Information Retrieval'],
      thesis: 'Soundstage: Text-Conditional Latent Audio Diffusion Platform'
    }
  ],
  experience: [
    {
      role: 'Graduate Trainee (AI & ML Engineering)',
      organization: 'Itanz',
      type: 'Industrial ML & Enterprise Research',
      period: '2025 to Present',
      bullets: [
        'Fine-tuned dense retrieval encoders (all-MiniLM-L6-v2) via Multiple Negatives Ranking Loss (MNRL) on 57,312 Soulsborne chunks, resolving cross-game polysemy and boosting MRR@10 by +0.13 and Hit Rate@1 to >80%.',
        'Engineered an automated Document AI pipeline rendering scanned clinical PDFs to high-DPI payloads for local Vision-Language Models (Qwen3.5) with Pydantic schema validation.',
        'Conducted systematic GPU-accelerated RAG evaluation benchmarks, establishing optimal Pareto retrieval bounds (K=3) and designing hallucination-safe abstention tripwires.',
        'Executed production MLOps validation: model packaging, concurrency stress testing, drift detection strategies, and API security auditing.'
      ]
    },
    {
      role: 'Graduate Research Assistant (MSc Dissertation)',
      organization: "Queen's University Belfast (Dr. Richard Gault)",
      type: 'Scientific Research',
      period: 'Apr 2025 to Sep 2025',
      bullets: [
        'Formulated Deep FOCUS: systematic evaluation of loss function dynamics (Focal Loss vs MSE/L1/BCE) in Single-Molecule Localization Microscopy (SMLM).',
        'Synthesized a 10,000-sample ground-truth microscopy dataset via ThunderSTORM with controlled photon and FWHM modeling.',
        'Achieved 33.8 dB PSNR with Focal Loss (vs 17 to 20 dB for regression baselines), SSIM of 0.834, and IoU@0.1 of 0.500 (60% to 100% empirical improvement).',
        'Proved that loss function landscape geometry is equally critical as neural architecture in extreme spatial class imbalance (>99.5% zero-photon background pixels).'
      ]
    },
    {
      role: 'Machine Learning Engineer',
      organization: 'Profundus',
      type: 'Computer Vision Startup, Islamabad',
      period: 'Jun 2023 to Jun 2024',
      bullets: [
        'Owned the end-to-end machine learning lifecycle for an eyewear virtual try-on system from dataset collection to real-time client deployment.',
        'Engineered neural background segmentation using contrast maps and image segmentation, eliminating manual product tagging.',
        'Built multi-modal feature extraction and automated cataloging systems validated through production A/B testing and systematic QA.',
        'Contributed ML components embedded in IoT medical hardware within an interdisciplinary engineering team.'
      ]
    },
    {
      role: 'AI Engineering Intern',
      organization: 'Profundus',
      type: 'Computer Vision & Search',
      period: 'Jul 2022 to Oct 2022',
      bullets: [
        'Built a high-dimensional visual search microservice for Gulzari Optics (10,000+ items) using TensorFlow and FAISS indexing.',
        'Deployed via FastAPI with full interactive documentation, error handling, and performance monitoring.'
      ]
    },
    {
      role: 'Volunteer Data Analyst',
      organization: 'National Museums NI',
      type: 'Data Modeling & Analytics',
      period: 'Nov 2024 to Feb 2025',
      bullets: [
        'Modeled visitor footfall dynamics across multiple museum sites to identify seasonal patterns and attendance trends.',
        'Built forecasting models to project future visitor volumes, directly informing staffing and exhibition planning.'
      ]
    },
    {
      role: 'Director of External Operations & Senior Consultant',
      organization: 'GIK Consulting Group',
      type: 'Strategic Engineering Consulting',
      period: 'Feb 2021 to Feb 2023',
      bullets: [
        'Resolved complex engineering case study for Y Combinator-backed startup Byte (pro bono).',
        'Designed analytical training frameworks that improved junior consultant performance metrics by 50%.'
      ]
    }
  ],
  openSourceContributions: [
    {
      project: 'OpenMouse (@openmouse/protocol)',
      role: 'Core Contributor & Protocol Reverse Engineer',
      repoUrl: 'https://github.com/openmouse/openmouse',
      tech: 'Wireshark · WebHID · TypeScript · USB HID Reports',
      desc: 'Reverse-engineered proprietary USB interrupt transfer reports for the Bloody W70 Max and SteelSeries Aerox 3 Wireless. Authored TypeScript driver specifications and native WebHID loopback bridge routines, enabling driverless mouse configuration (DPI stages, polling rate, lift-off distance) directly within the browser without proprietary software suites.'
    }
  ],
  labExperiments: [
    {
      id: 'crt-oscilloscope',
      title: 'CRT Phosphor & Vector Oscilloscope',
      tech: 'GLSL · WebGL · CRT Phosphor Decay',
      desc: 'Simulating cathode-ray tube phosphor excitation, scanline raster distortion, and electron-beam persistence.'
    },
    {
      id: 'gaussian-splatting',
      title: '3D Gaussian Splatting & Depth Reconstruction',
      tech: 'PyTorch · CUDA · Radiance Fields',
      desc: 'Real-time neural radiance reconstruction from sparse multi-view calibrated photography.'
    },
    {
      id: 'soundstage-audio',
      title: 'Soundstage: Continuous Latent Audio Diffusion',
      tech: 'PyTorch · 1D U-Net · SDE Sampling',
      desc: 'Text-conditional latent diffusion model generating expressive audio waveforms with emotion preservation.'
    },
    {
      id: 'neural-style',
      title: 'Real-Time Neural Style Transfer (60+ FPS)',
      tech: 'VGG-19 · Instance Norm · COCO 80k',
      desc: 'Feed-forward style transfer on live video streams with instance normalization preventing contrast wash-out.'
    },
    {
      id: 'polomony-engine',
      title: 'Polomony: Real-Time Distributed Game Engine',
      tech: 'TypeScript · WebSockets · Monorepo',
      desc: 'Full-stack multiplayer board game engine with room lobbies, custom rule toggles, and autonomous game bots.'
    }
  ],
  skills: [
    { group: 'Deep Learning & Vision', items: ['PyTorch (CUDA)', 'U-Net', 'Diffusion Models', 'Vision-Language Models (VLM)', 'OpenCV', 'scikit-image', 'TensorFlow'] },
    { group: 'Retrieval & NLP', items: ['Contrastive Learning (MNRL)', 'SentenceTransformers', 'FAISS', 'PEFT / LoRA (Qwen)', 'Ollama', 'RAG Evaluation'] },
    { group: 'Cognitive & Systems', items: ['Active Inference', 'Free Energy Principle', 'WebHID API', 'Docker', 'FastAPI', 'Linux / Bash', 'C# / .NET'] },
    { group: 'Languages', items: ['Python (Expert)', 'TypeScript / JavaScript', 'SQL', 'C++', 'Rust (Basic)'] },
    { group: 'Scientific Computing', items: ['ThunderSTORM', 'ImageJ', 'LaTeX', 'NumPy / SciPy', 'Matplotlib / Seaborn', 'Jupyter'] }
  ]
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'deep-focus',
    title: 'Deep FOCUS: Focal Loss in Single-Molecule Localization',
    shortTitle: 'Deep FOCUS (SMLM)',
    category: 'Scientific Imaging',
    year: 2025,
    institution: "Queen's University Belfast",
    metrics: [
      { label: 'Reconstruction PSNR', value: '33.8 dB' },
      { label: 'Baseline Gain', value: '+60% to 100%' },
      { label: 'SSIM Index', value: '0.834' },
      { label: 'IoU @ 0.1 Threshold', value: '0.500' },
      { label: 'Spatial Resolution', value: '~20 nm' }
    ],
    summary: 'A systematic empirical investigation demonstrating that loss function landscape geometry is the decisive bottleneck in sub-diffraction single-molecule localization microscopy (SMLM).',
    problem: 'Optical fluorescence microscopy cannot resolve biological structures smaller than ~200 to 250 nm due to wave diffraction (the Abbe limit). While Single-Molecule Localization Microscopy (SMLM) blinks emitters to isolate individual molecules, sensor frames exhibit extreme spatial sparsity (>99.5% background pixels). Existing regression baselines (Deep-STORM) utilize MSE or L1+L2 objectives that dilute emitter signal gradients, producing blurred coordinates and false negatives.',
    hypothesis: 'Modulating the loss landscape with Focal Loss (gamma = 2.0, alpha = 0.25) dynamically suppresses gradients from easy non-emitter background pixels and concentrates backpropagation on sparse emitter centroids, achieving nanoscale resolution without increasing parameter count.',
    methodology: [
      'Generated a rigorous 10,000-sample synthetic dataset via ImageJ ThunderSTORM simulating realistic EMCCD noise, controlled photon counts, and point spread function (PSF) FWHM characteristics.',
      'Reimplemented the Deep-STORM encoder-decoder architecture from scratch in PyTorch with CUDA acceleration (1-32-64-128-512 channel progression with 8x upsampling).',
      'Designed a controlled experimental protocol isolating identical training schedules across four objective functions: L1+L2, Mean Squared Error (MSE), Binary Cross Entropy (BCE), and Focal Loss.',
      'Quantified localization accuracy using Peak Signal-to-Noise Ratio (PSNR), Structural Similarity (SSIM), MSE, and Intersection over Union (IoU).'
    ],
    findings: [
      'Focal Loss achieved 33.8 dB PSNR compared to 20.2 dB for L1+L2 and 17.1 dB for MSE, representing a 60% to 100% empirical improvement in localization fidelity.',
      'BCE suffered catastrophic gradient collapse (-8.3 dB PSNR) due to the overwhelming class imbalance of zero-photon pixels.',
      'Focal Loss attained an SSIM of 0.834 (vs 0.536 for L1+L2 and 0.077 for MSE), recovering sharp emitter point-spread centroids down to 20nm resolution.',
      'Established the generalizable principle that loss landscape geometry dominates neural architecture for sparse scientific inverse problems.'
    ],
    architecture: [
      { layer: 'Input Stage', spec: '1 channel · 208×208 px diffraction-blurred patch' },
      { layer: 'Encoder 1', spec: '1ch → 32ch · 3×3 Conv · BatchNorm · ReLU' },
      { layer: 'Encoder 2', spec: '32ch → 64ch · MaxPool 2×2' },
      { layer: 'Encoder 3', spec: '64ch → 128ch · MaxPool 2×2' },
      { layer: 'Bottleneck', spec: '128ch → 512ch · High-capacity latent bridge' },
      { layer: 'Decoder 3', spec: '512ch → 128ch · Nearest Upsample ×2' },
      { layer: 'Decoder 2', spec: '128ch → 64ch · Nearest Upsample ×2' },
      { layer: 'Decoder 1 & Out', spec: '64ch → 32ch → 1ch · 8× total upsample · High-res emitter coordinate heatmap' }
    ],
    codeUrl: 'https://github.com/ShamsGhani',
    cover: { seed: 1.8, colors: ['#080a0e', '#0f1816', '#00e5a3'] }
  },
  {
    slug: 'metacognitive-harness-scs',
    title: 'SCS-1: Recursive Reasoning & Metacognitive Gating Harness',
    shortTitle: 'Metacognitive Harness (SCS-1)',
    category: 'Cognitive Architectures',
    year: 2026,
    institution: 'Cognitive Systems & Adaptive Inference',
    metrics: [
      { label: 'Halting Signal', value: 'Drift ∧ NLI Entailment' },
      { label: 'Adaptive Compute', value: '-48% Tokens' },
      { label: 'Rumination Escape', value: 'Temperature Ramp' },
      { label: 'Context Buffer', value: 'Sliding Window' },
      { label: 'State Model', value: 'Ongoing Prototype' }
    ],
    summary: 'An ongoing effort to create an executive supervisory harness that acts upon iterative reasoning to explore whether external metacognitive oversight can cultivate adaptive cognitive awareness in neural systems.',
    problem: 'Standard language models lack metacognitive awareness of their own reasoning quality. Naive iterative refinement often degrades into obsessive rumination, circling in local attractor basins where the model repeats identical logical flaws while saturating the context window with redundant history.',
    hypothesis: 'Encapsulating an iterative generative model within an external metacognitive harness combining semantic drift tracking, NLI entailment scoring, a sliding context window, and anti-rumination escape triggers enables adaptive computation without human intervention.',
    methodology: [
      'Calibrated semantic drift ||z_t - z_{t-1}|| against reasoning accuracy to establish when lexical formulation has naturally converged.',
      'Formulated an NLI entailment verifier checking step-to-step directional coherence, preventing premature halting when phrasing stabilizes around logical gaps.',
      'Implemented a conjunctive halting gate (Drift < ε ∧ Entailment > θ) that halts in 1 pass on simple tasks while allocating extended multi-step compute on complex logic.',
      'Designed an anti-rumination escape mechanism that detects persistent low-entailment attractor states and injects temperature ramps (+0.5) to dislodge the reasoning trajectory.',
      'Ablated context-feed strategies, demonstrating that a concise sliding window recap prevents context window decay and outperforms full history accumulation.'
    ],
    findings: [
      'Conjunctive gating achieved 94.2% reasoning accuracy while cutting token expenditure by 48% compared to fixed-iteration baselines.',
      'On simple benchmark queries, the harness triggered immediate early exits at t=1, saving over 68% compute with zero overthinking degradation.',
      'Anti-rumination temperature ramps resolved 76% of persistent stuck-state attractor loops without human intervention.',
      'Demonstrated that adaptive compute and human-like cognitive stopping emerge naturally from multi-signal executive metacognitive supervision.'
    ],
    architecture: [
      { layer: 'Generative Core', spec: 'Autoregressive reasoning model · Hypothesis step generator' },
      { layer: 'Semantic Drift Monitor', spec: 'Vector displacement tracker ||z_t - z_{t-1}|| · Lexical convergence gauge' },
      { layer: 'Logical Entailment Gate', spec: 'NLI directional coherence verifier · Premise-to-hypothesis soundness check' },
      { layer: 'Conjunctive Halting Arbiter', spec: 'Adaptive compute exit rule: HALT iff (Drift < ε) ∧ (Entailment > θ)' },
      { layer: 'Anti-Rumination Circuit', spec: 'Attractor loop detector · Dynamic temperature ramp (+0.5) escape injection' },
      { layer: 'Sliding Window Memory', spec: 'Distilled working memory buffer · Elimination of context saturation' }
    ],
    codeUrl: 'https://github.com/ShamsGhani',
    cover: { seed: 9.4, colors: ['#080a0e', '#131e1d', '#00e5a3'] }
  },
  {
    slug: 'contrastive-representation-adaptation',
    title: 'Domain Adaptation of Retrieval Embeddings via Contrastive Learning',
    shortTitle: 'Contrastive Embedding Adaptation',
    category: 'Information Retrieval',
    year: 2026,
    institution: 'Itanz',
    metrics: [
      { label: 'Corpus Scale', value: '57,312 Chunks' },
      { label: 'Target Model', value: 'all-MiniLM-L6-v2' },
      { label: 'MRR@10 Gain', value: '+0.13 Absolute' },
      { label: 'Hit Rate@1', value: '>80.0%' },
      { label: 'Objective', value: 'MNR Loss' }
    ],
    summary: 'Fine-tuning dense retrieval encoders via Multiple Negatives Ranking Loss (MNRL) on 57,312 chunks to eliminate cross-game polysemy and lexical distractor vulnerability.',
    problem: 'Off-the-shelf embedding models (such as `all-MiniLM-L6-v2`) fail in dense technical domains where distinct entities share names across different contexts (e.g., cross-game homonyms like "Patches" or "Moonlight Greatsword"). Generic embeddings collapse these distinct concepts into overlapping neighborhoods in vector space, degrading retrieval ranking and forcing large top-K context windows that inflate latency and distractor risk.',
    hypothesis: 'Adapting the representation space of the bi-encoder via Multiple Negatives Ranking Loss (MNRL) on (Query, Positive Passage, Hard Negative) triplets pulls true question-passage pairs into tight alignment while pushing plausible lexical distractors into orthogonal vector space.',
    methodology: [
      'Constructed a 57,312-chunk corpus with curated cross-context polysemy test probes.',
      'Fine-tuned `sentence-transformers/all-MiniLM-L6-v2` using contrastive representation learning with in-batch negatives on an RTX 4070 GPU with CUDA 12.4.',
      'Benchmarked against baseline models across Mean Reciprocal Rank (MRR@10), Hit Rate@1, Hit Rate@3, and NDCG@10.',
      'Integrated the adapted encoder into an industrial Document AI and RAG pipeline with GPU acceleration.'
    ],
    findings: [
      'Adapted model achieved >80.0% Hit Rate@1 (up from 65 to 70% baseline) and increased MRR@10 by +0.13 absolute.',
      'Eliminated false-positive entity collisions across homonymous queries.',
      'Reduced required retrieval depth from K=10 to K=3, cutting downstream LLM latency by 45%.'
    ],
    architecture: [
      { layer: 'Bi-Encoder Backbone', spec: 'sentence-transformers/all-MiniLM-L6-v2 (6-layer, 384-dim, 22.7M params)' },
      { layer: 'Loss Formulation', spec: 'Multiple Negatives Ranking Loss (MNRL) with temperature scaling' },
      { layer: 'Hardware Execution', spec: 'PyTorch · CUDA 12.4 · RTX 4070 (8.6 GB VRAM)' },
      { layer: 'Evaluation Suite', spec: 'Strict isolated test split · Hit@K · MRR@10 · Latency benchmarking' }
    ],
    codeUrl: 'https://github.com/ShamsGhani',
    cover: { seed: 5.6, colors: ['#080a0e', '#181b28', '#38bdf8'] }
  }
];
