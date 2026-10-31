// Ground truth data from CV, research specs, and active project repositories
export type ItanzModule = {
  id: string;
  code: string;
  title: string;
  focus: string;
  stack: string[];
  desc: string;
  metrics: string;
};

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
  secondaryRole: 'Computer Vision & Representation Learning',
  tagline: 'Computer Vision, Loss Topology, Representation Learning & Cognitive Systems',
  url: 'https://shamsghani.github.io',
  description: 'Machine Learning Engineer with production computer vision experience and research in scientific imaging.',
  email: 'shamsghani1@gmail.com',
  phoneUK: '+44 7876 369841',
  phonePK: '+92 322 5000155',
  location: 'Islamabad, Pakistan',
  visaStatus: 'Valid UK Visa until Jan 2028 (Available to relocate to the UK, no immediate sponsorship required)',
  socials: [
    { label: 'GitHub', href: 'https://github.com/ShamsGhani' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/shamsghani' },
    { label: 'Email', href: 'mailto:shamsghani1@gmail.com' }
  ],
  shippedSystems: [
    {
      title: 'Eyewear Virtual Try-On',
      desc: 'Owned the machine learning pipeline from dataset collection to real-time client personalization.'
    },
    {
      title: 'Visual Search Microservice',
      desc: 'Microservice over 10,000+ catalog items, served via FastAPI (VGG16 embeddings + Annoy, later migrated to FAISS).'
    },
    {
      title: 'Automated Cataloging',
      desc: 'Multimodal feature extraction and segmentation-based background removal using contrast maps across 10,000+ product images.'
    }
  ],
  itanzModules: [
    {
      id: '001',
      code: 'MODULE_001',
      title: 'Clinical Document AI & VLM Extraction',
      focus: 'VLM & Schema Validation',
      stack: ['PyMuPDF', 'Qwen3.5 VLM', 'Pydantic', 'Ollama', 'FastAPI'],
      desc: 'Bypassed brittle OCR coordinate matching by feeding high-DPI rendered clinical PDFs directly into Vision-Language Models, enforcing strict Pydantic schema validation and evaluating extraction fidelity via an LLM-as-a-judge.',
      metrics: 'Zero OCR reliance · Schema validated · LLM-as-a-judge scoring'
    },
    {
      id: '002',
      code: 'MODULE_002',
      title: 'Soulsborne Grounded RAG Pipeline',
      focus: 'Dense Retrieval & Abstention',
      stack: ['all-MiniLM-L6-v2', 'JAX', 'Ollama (Llama 3.1 8B)', 'Python'],
      desc: 'Engineered an end-to-end grounded RAG pipeline across 57,312 knowledge chunks with sub-3ms JAX vectorized similarity retrieval, provenance attribution, and a 3-way state machine enforcing strict abstention on unanswerable queries.',
      metrics: '57,312 corpus chunks · < 3ms JAX search · 100% abstention accuracy'
    },
    {
      id: '003',
      code: 'MODULE_003',
      title: 'AI Reliability, Quality Gates & Threat Modeling',
      focus: 'Reliability & Quality Gates',
      stack: ['Decoupled Eval', 'OWASP LLM Top 10', 'Circuit Breakers', 'Prometheus'],
      desc: 'Audited empirical RAG claims with 100% precision reproduction, established 8 automated production quality gates, circuit breaker failovers, structured JSON telemetry with PII hashing, and prompt injection defense suites.',
      metrics: '100% audit reproduction · 8 production gates · OWASP Top 10 audited'
    },
    {
      id: '004',
      code: 'MODULE_004',
      title: 'Contrastive Representation Learning (MNRL)',
      focus: 'Contrastive Representation',
      stack: ['Sentence Transformers', 'MNRL', 'PyTorch / CUDA', 'GPU Profiling'],
      desc: 'Fine-tuned dense retrieval encoders (all-MiniLM-L6-v2) via Multiple Negatives Ranking Loss across 57,312 chunks to eliminate domain entity polysemy and cross-game homonyms, achieving 100% Hit Rate@1 on adversarial test sets.',
      metrics: 'Hit Rate@1: 86.4% → 100.0% · MRR@10: 0.91 → 1.00 · 64s re-indexing'
    },
    {
      id: '005',
      code: 'MODULE_005',
      title: 'ML System Validation & Hybrid RRF Serving',
      focus: 'Hybrid Serving & MLOps',
      stack: ['FastAPI', 'Docker (Non-Root)', 'BM25 + Dense RRF', 'Prometheus'],
      desc: 'Forensic audit scaling retrieval evaluation to the full unconstrained 57,312-chunk corpus, deploying a Hybrid Dense + BM25 Reciprocal Rank Fusion service (67.4% Hit@1, 88.9% Hit@10) with 0.94ms atomic model rollback.',
      metrics: '67.41% Hit@1 (Full Corpus) · 0.94ms atomic rollback · 16-worker verified'
    },
    {
      id: '006',
      code: 'MODULE_006',
      title: 'CERN Higgs Particle Classification (Predictive ML)',
      focus: 'Predictive Tabular ML',
      stack: ['Scikit-Learn', 'Gradient Boosting', 'Feature Engineering', 'EDA'],
      desc: 'Formulated an end-to-end supervised predictive system on the CERN Higgs benchmark across 28 continuous kinematic predictors (21 detector observables + 7 invariant masses) with zero-leakage stratified validation.',
      metrics: '28 kinematic predictors · Resonant mass features · Zero-leakage split'
    }
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
      period: 'Oct 2026 to Present',
      bullets: [
        'Document AI Pipeline (Module 001): Built an automated clinical extraction pipeline bypassing brittle OCR via direct PDF rendering (PyMuPDF) into local Vision-Language Models (Qwen3.5), validated by strict Pydantic schemas and evaluated using Qwen2.5-Coder as an LLM-as-a-judge.',
        'Knowledge-Dense RAG Architecture (Module 002): Ingested and chunked 57,312 corpus documents, establishing sub-3ms exact dense retrieval using all-MiniLM-L6-v2 in JAX and implementing an attribution-grounded state machine with strict unanswerable query abstention.',
        'AI Evaluation, Reliability & Guardrails (Module 003): Audited empirical RAG claims with 100% precision reproduction, decoupled retrieval and generation metrics, established 8 automated production quality gates, circuit breaker failovers, and OWASP Top 10 for LLMs prompt injection defenses.',
        'Contrastive Representation Learning (Module 004): Fine-tuned dense bi-encoders using Multiple Negatives Ranking Loss (MNRL) on 57,312 domain chunks to resolve entity polysemy and cross-game homonyms, achieving 100% Hit Rate@1 on adversarial test sets with zero latency regression (10.37ms P50).',
        'ML System Validation & Hybrid Deployment (Module 005): Conducted full-corpus forensic audits, deployed a Hybrid Dense + BM25 Reciprocal Rank Fusion service (67.4% Hit@1, 88.9% Hit@10), containerized non-root FastAPI service with Prometheus telemetry, and implemented 0.94ms atomic model rollback.',
        'Predictive Machine Learning (Module 006): Formulated an end-to-end supervised predictive system on the CERN Higgs benchmark across 28 continuous kinematic predictors (21 detector observables + 7 invariant masses) with zero-leakage stratified validation.'
      ]
    },
    {
      role: 'MSc Dissertation Project (Supervised by Dr. Richard Gault)',
      organization: "Queen's University Belfast",
      type: 'Scientific Research',
      period: 'Apr 2025 to Sep 2025',
      bullets: [
        'Formulated Deep FOCUS: systematic evaluation of loss function dynamics (Focal Loss vs MSE, L1+L2, and BCE) in Single-Molecule Localization Microscopy (SMLM).',
        'Synthesized a 10,000-sample ground-truth microscopy dataset via ThunderSTORM simulation benchmark with controlled photon statistics and emitter density.',
        'Achieved 33.8 dB PSNR with Focal Loss (+13.6 dB vs L1+L2 and +16.7 dB vs MSE baselines) at ~20 nm spatial resolution; BCE failed to train usefully (-8.3 dB), attributed to extreme spatial sparsity (>99.5% zero-photon background).',
        'Demonstrated on simulated data that under severe class imbalance, the training objective matters at least as much as neural architecture.'
      ]
    },
    {
      role: 'Machine Learning Engineer',
      organization: 'Profundus',
      type: 'Computer Vision Startup, Islamabad',
      period: 'Jun 2023 to Jun 2024',
      bullets: [
        'Owned the end-to-end machine learning pipeline for an eyewear virtual try-on system from dataset collection to real-time client personalization.',
        'Engineered neural background segmentation using contrast maps and image segmentation, eliminating manual product tagging.',
        'Built multi-modal feature extraction and automated cataloging systems processing 10,000+ product images.',
        'Delivered scalable image processing pipelines for production ML systems.'
      ]
    },
    {
      role: 'AI Engineering Intern',
      organization: 'Profundus',
      type: 'Computer Vision & Search',
      period: 'Jul 2022 to Oct 2022',
      bullets: [
        'Built a visual search microservice for Gulzari Optics (10,000+ items) using VGG16 embeddings + Annoy via DeepImageSearch, served via FastAPI (later updated to FAISS).',
        'Deployed via FastAPI with full interactive documentation, error handling, and performance monitoring.'
      ]
    }
  ],
  leadership: [
    {
      role: 'Director of External Operations & Senior Consultant',
      organization: 'GIK Consulting Group',
      type: 'Leadership & Extracurricular',
      period: 'Feb 2021 to Feb 2023',
      bullets: [
        'Resolved complex engineering case study for Y Combinator-backed startup Byte (pro bono).',
        'Designed analytical training frameworks that improved junior consultant performance metrics by 50%.'
      ]
    },
    {
      role: 'President',
      organization: 'Microsoft Learn Student Ambassadors Club',
      type: 'Leadership & Extracurricular',
      period: '2021 to 2023',
      bullets: [
        'Led technical training workshops on cloud computing and Python for 100+ students at GIKI.',
        'Organized coding challenges and hackathons to expand student developer engagement.'
      ]
    },
    {
      role: 'National Organizational Development Lead',
      organization: 'AIESEC Pakistan',
      type: 'Leadership & Extracurricular',
      period: 'Aug 2021 to Feb 2022',
      bullets: [
        'Redesigned succession frameworks and annual planning processes across 11 local committees.'
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
      { label: 'Gain vs L1+L2', value: '+13.6 dB' },
      { label: 'Gain vs MSE', value: '+16.7 dB' },
      { label: 'SSIM Index', value: '0.834' },
      { label: 'Spatial Resolution', value: '~20 nm' }
    ],
    summary: 'On a 10,000-sample synthetic benchmark, a focal-loss objective outperformed the MSE, L1+L2 and BCE objectives used in regression baselines such as Deep-STORM: 33.8 dB PSNR versus 20.2 dB (L1+L2) and 17.1 dB (MSE).',
    problem: 'Optical fluorescence microscopy cannot resolve biological structures smaller than ~200 to 250 nm due to wave diffraction (the Abbe limit). While Single-Molecule Localization Microscopy (SMLM) blinks emitters to isolate individual molecules, sensor frames exhibit extreme spatial sparsity (>99.5% background pixels). Existing regression baselines (Deep-STORM) utilize MSE or L1+L2 objectives that dilute emitter signal gradients, producing blurred coordinates and false negatives.',
    hypothesis: 'Modulating the loss landscape with Focal Loss (gamma = 2.0, alpha = 0.25) dynamically downweights gradients from easy non-emitter background pixels and concentrates backpropagation on sparse emitter centroids, recovering nanoscale resolution without increasing parameter count.',
    methodology: [
      'Generated a rigorous 10,000-sample synthetic dataset via ImageJ ThunderSTORM simulating realistic EMCCD noise, controlled photon counts, and point spread function (PSF) FWHM characteristics.',
      'Reimplemented the Deep-STORM encoder-decoder architecture from scratch in PyTorch with CUDA acceleration (1-32-64-128-512 channel progression with 8x upsampling).',
      'Designed a controlled experimental protocol isolating identical training schedules across four objective functions: L1+L2, Mean Squared Error (MSE), Binary Cross Entropy (BCE), and Focal Loss.',
      'Quantified localization accuracy using Peak Signal-to-Noise Ratio (PSNR), Structural Similarity (SSIM), MSE, and Intersection over Union (IoU).'
    ],
    findings: [
      'Focal Loss achieved 33.8 dB PSNR compared to 20.2 dB for L1+L2 and 17.1 dB for MSE on simulated ThunderSTORM data (+13.6 dB and +16.7 dB improvements).',
      'BCE failed to train usefully (-8.3 dB PSNR), attributed to the extreme class imbalance of zero-photon background pixels.',
      'Focal Loss attained an SSIM of 0.834 (vs 0.536 for L1+L2 and 0.077 for MSE), recovering sharp emitter point-spread centroids down to ~20 nm resolution.',
      'Results suggest that, in this regime, the training objective matters at least as much as the architecture. Evaluation is on simulated data.'
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
    title: 'SCS-1: Supervisory Harness for Iterative Reasoning',
    shortTitle: 'SCS-1 Reasoning Harness',
    category: 'Cognitive Architectures',
    year: 2026,
    institution: 'Cognitive Systems & Adaptive Inference',
    metrics: [
      { label: 'Halting Signal', value: 'Drift ∧ NLI' },
      { label: 'Escape Circuit', value: 'Temperature Ramp' },
      { label: 'Working Memory', value: 'Sliding Window' },
      { label: 'Status', value: 'Ongoing Prototype' }
    ],
    summary: 'An experimental supervisory harness for iterative LLM reasoning. It tracks semantic drift between reasoning steps, checks NLI entailment to decide when to halt, and applies a temperature ramp when the model gets stuck in repeated reasoning.',
    problem: 'Standard language models lack an external executive mechanism to evaluate the quality of their own iterative reasoning steps. Unsupervised multi-pass generation frequently slips into circular rumination, repeating identical errors while saturating the context window.',
    hypothesis: 'Encapsulating an autoregressive generator within an external supervisory harness combining semantic drift tracking, directional NLI entailment verification, a sliding context window, and anti-rumination temperature ramps enables grounded multi-pass reasoning.',
    methodology: [
      'Calibrated semantic drift ||z_t - z_{t-1}|| across successive step embeddings to identify lexical and thematic divergence.',
      'Formulated an NLI entailment verifier checking step-to-step directional coherence, preventing premature halting when phrasing stabilizes around logical gaps.',
      'Implemented a conjunctive halting gate (Drift < ε ∧ Entailment > θ) that halts multi-pass iteration when drift stabilizes and directional entailment holds.',
      'Designed an anti-rumination escape mechanism that detects persistent attractor loops and injects temperature ramps (+0.5) to dislodge reasoning trajectories.',
      'Employed a concise sliding window memory buffer to prevent context window saturation during extended iteration.'
    ],
    findings: [
      'Architectural decoupling separates the generative reasoning core from the executive verification harness.',
      'Conjunctive gating checks both semantic stabilization and directional entailment before emitting an exit signal.',
      'Anti-rumination circuits detect non-converging attractor states and trigger temperature ramps to escape repetitive loops.',
      'Sliding window memory maintains a distilled token buffer without saturating the attention context.'
    ],
    architecture: [
      { layer: 'Generative Core', spec: 'Autoregressive reasoning model · Hypothesis step generator' },
      { layer: 'Semantic Drift Monitor', spec: 'Vector displacement tracker ||z_t - z_{t-1}|| · Step stability gauge' },
      { layer: 'Logical Entailment Gate', spec: 'NLI directional coherence verifier · Premise-to-hypothesis consistency' },
      { layer: 'Conjunctive Halting Arbiter', spec: 'Adaptive exit rule: HALT iff (Drift < ε) ∧ (Entailment > θ)' },
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
