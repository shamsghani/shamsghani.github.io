import { chromium } from 'playwright';
import path from 'path';

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Muhammad Shams Ghani - Curriculum Vitae</title>
<style>
  @page {
    size: A4;
    margin: 14mm 16mm 14mm 16mm;
  }
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #1e293b;
    background: #ffffff;
    font-size: 9.5pt;
    line-height: 1.42;
    -webkit-print-color-adjust: exact;
  }
  a {
    color: #0369a1;
    text-decoration: none;
  }
  .header {
    border-bottom: 1.5px solid #0f172a;
    padding-bottom: 8px;
    margin-bottom: 12px;
  }
  .name {
    font-size: 20pt;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #0f172a;
    line-height: 1.1;
  }
  .title {
    font-size: 10.5pt;
    font-weight: 600;
    color: #059669;
    margin-top: 3px;
    letter-spacing: 0.02em;
  }
  .contact-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    font-size: 8.5pt;
    color: #475569;
    margin-top: 5px;
  }
  .contact-item {
    display: inline-flex;
    align-items: center;
    gap: 3px;
  }
  .visa-callout {
    margin-top: 5px;
    font-size: 8.5pt;
    font-weight: 600;
    color: #0f766e;
    background: #f0fdfa;
    padding: 3px 8px;
    border-left: 3px solid #0d9488;
    display: inline-block;
  }
  .section {
    margin-bottom: 11px;
  }
  .section-title {
    font-size: 10pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #0f172a;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 2px;
    margin-bottom: 6px;
  }
  .entry {
    margin-bottom: 7px;
  }
  .entry-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .entry-title {
    font-weight: 700;
    color: #0f172a;
    font-size: 9.5pt;
  }
  .entry-sub {
    font-weight: 600;
    color: #334155;
    font-size: 9pt;
  }
  .entry-date {
    font-size: 8.5pt;
    color: #64748b;
    font-variant-numeric: tabular-nums;
    font-weight: 500;
  }
  ul {
    padding-left: 15px;
    margin-top: 2px;
  }
  li {
    margin-bottom: 2px;
    color: #334155;
  }
  li strong {
    color: #0f172a;
  }
  .skills-grid {
    display: grid;
    grid-template-columns: 140px 1fr;
    row-gap: 3px;
    column-gap: 8px;
    font-size: 9pt;
  }
  .skill-label {
    font-weight: 600;
    color: #0f172a;
  }
  .skill-items {
    color: #334155;
  }
</style>
</head>
<body>

<div class="header">
  <div class="name">Muhammad Shams Ghani</div>
  <div class="title">Machine Learning Engineer · Computer Vision & Representation Learning</div>
  <div class="contact-bar">
    <span class="contact-item">📧 shamsghani1@gmail.com</span>
    <span class="contact-item">📱 +44 7876 369841 (UK) · +92 322 5000155 (PK)</span>
    <span class="contact-item">📍 Islamabad, Pakistan</span>
    <span class="contact-item">🔗 <a href="https://linkedin.com/in/shamsghani">linkedin.com/in/shamsghani</a></span>
    <span class="contact-item">💻 <a href="https://github.com/ShamsGhani">github.com/ShamsGhani</a></span>
    <span class="contact-item">🌐 <a href="https://shamsghani.github.io">shamsghani.github.io</a></span>
  </div>
  <div class="visa-callout">
    Status: Valid UK Visa until January 2028 · Available for immediate relocation to the UK (No immediate sponsorship required)
  </div>
</div>

<div class="section">
  <div class="section-title">Education</div>
  <div class="entry">
    <div class="entry-head">
      <div>
        <span class="entry-title">MSc Artificial Intelligence</span> — <span class="entry-sub">Queen's University Belfast, UK</span>
      </div>
      <span class="entry-date">Sep 2024 – Sep 2025</span>
    </div>
    <ul>
      <li><strong>MSc Dissertation:</strong> <em>"Deep FOCUS: Focal Loss Optimisation for Single-Molecule Localisation Microscopy (SMLM) under Severe Sparsity"</em> (Supervised by Dr. Richard Gault).</li>
      <li>Systematically evaluated four loss functions (L1+L2, MSE, BCE, Focal Loss) across 10,000 synthetic microscopy samples generated with ImageJ ThunderSTORM.</li>
      <li><strong>Key Finding:</strong> Demonstrated Focal Loss achieved superior reconstruction (33.8 dB PSNR, +13.6 dB vs L1+L2 and +16.7 dB vs MSE baselines) at ~20 nm spatial resolution, establishing that loss landscape geometry matters at least as much as architecture under extreme spatial class imbalance (>99.5% background).</li>
      <li><strong>Core Modules:</strong> Deep Learning, Computer Vision, AI for Health, Machine Learning, Knowledge Engineering.</li>
    </ul>
  </div>

  <div class="entry">
    <div class="entry-head">
      <div>
        <span class="entry-title">BSc Computer Science</span> — <span class="entry-sub">GIK Institute of Engineering Sciences & Technology</span>
      </div>
      <span class="entry-date">Aug 2019 – Jun 2023</span>
    </div>
    <ul>
      <li>Specialized in Artificial Intelligence, Deep Learning, Data Science, and Information Retrieval.</li>
      <li><strong>BSc Thesis:</strong> <em>Text-Conditional Latent Audio Diffusion Platform</em> with emotion-preserving representation synthesis.</li>
    </ul>
  </div>
</div>

<div class="section">
  <div class="section-title">Professional Experience</div>
  <div class="entry">
    <div class="entry-head">
      <div>
        <span class="entry-title">Graduate Trainee (AI & ML Engineering)</span> — <span class="entry-sub">Itanz</span>
      </div>
      <span class="entry-date">Oct 2026 – Present</span>
    </div>
    <ul>
      <li><strong>Document AI & Clinical Extraction (001):</strong> Built pipeline rendering clinical PDFs (PyMuPDF) to local Vision-Language Models (Qwen3.5) with Pydantic validation and LLM-as-a-judge scoring.</li>
      <li><strong>Grounded RAG & Abstention (002):</strong> Ingested 57,312 corpus documents, establishing sub-3ms exact dense retrieval in JAX with attribution and 100% precision abstention on unanswerable queries.</li>
      <li><strong>Reliability & Threat Modeling (003):</strong> Audited RAG claims with bit-exact reproduction, enforcing 8 production quality gates, circuit breaker failovers, and OWASP Top 10 for LLMs defense.</li>
      <li><strong>Contrastive Representation Learning (004):</strong> Fine-tuned bi-encoders via MNRL on 57,312 chunks to eliminate entity polysemy, achieving 100% Hit Rate@1 on adversarial test sets with 64s re-indexing.</li>
      <li><strong>MLOps Validation & Hybrid Serving (005):</strong> Deployed containerized FastAPI service with Hybrid Dense + BM25 RRF (67.4% Hit@1 full-corpus), Prometheus metrics, and 0.94ms atomic model rollback.</li>
      <li><strong>Predictive ML Systems (006):</strong> Built supervised classification pipeline on CERN Higgs benchmark across 28 continuous kinematic predictors with leakage-free stratified validation.</li>
    </ul>
  </div>

  <div class="entry">
    <div class="entry-head">
      <div>
        <span class="entry-title">Machine Learning Engineer</span> — <span class="entry-sub">Profundus (Computer Vision Startup, Islamabad)</span>
      </div>
      <span class="entry-date">Jun 2023 – Jun 2024</span>
    </div>
    <ul>
      <li>Owned end-to-end ML pipeline for an eyewear virtual try-on system from dataset collection to real-time client deployment.</li>
      <li>Engineered neural background segmentation using contrast maps and image segmentation, eliminating manual product tagging.</li>
      <li>Built multimodal feature extraction and automated cataloging systems processing 10,000+ product images.</li>
    </ul>
  </div>

  <div class="entry">
    <div class="entry-head">
      <div>
        <span class="entry-title">AI Engineering Intern</span> — <span class="entry-sub">Profundus</span>
      </div>
      <span class="entry-date">Jul 2022 – Oct 2022</span>
    </div>
    <ul>
      <li>Built visual search microservice for Gulzari Optics (10,000+ items) using VGG16 embeddings + Annoy via DeepImageSearch, served via FastAPI (later updated to FAISS).</li>
      <li>Deployed microservice with full interactive documentation, robust error handling, and performance monitoring.</li>
    </ul>
  </div>
</div>

<div class="section">
  <div class="section-title">Open Source & Technical Research</div>
  <div class="entry">
    <div class="entry-head">
      <div>
        <span class="entry-title">OpenMouse (@openmouse/protocol)</span> — <span class="entry-sub">Core Contributor & Protocol Reverse Engineer</span>
      </div>
      <span class="entry-date">2026</span>
    </div>
    <ul>
      <li>Reverse-engineered proprietary USB interrupt transfer reports for gaming mice via Wireshark. Authored TypeScript driver specifications and native WebHID loopback bridge routines, enabling driverless mouse configuration directly in-browser.</li>
    </ul>
  </div>
  <div class="entry">
    <div class="entry-head">
      <div>
        <span class="entry-title">SCS-1 Reasoning Harness</span> — <span class="entry-sub">Experimental Research Prototype</span>
      </div>
      <span class="entry-date">2026</span>
    </div>
    <ul>
      <li>Prototyping an external executive supervisory harness for iterative LLM reasoning that tracks semantic drift between reasoning steps, checks directional NLI entailment to decide when to halt, and applies a temperature ramp when the model enters rumination loops.</li>
    </ul>
  </div>
</div>

<div class="section">
  <div class="section-title">Leadership & Extracurricular</div>
  <div class="entry">
    <div class="entry-head">
      <div>
        <span class="entry-title">Director of External Operations & Senior Consultant</span> — <span class="entry-sub">GIK Consulting Group</span>
      </div>
      <span class="entry-date">Feb 2021 – Feb 2023</span>
    </div>
    <ul>
      <li>Resolved complex engineering case study for Y Combinator-backed startup Byte (pro bono). Designed analytical training frameworks that improved junior consultant performance metrics by 50%.</li>
    </ul>
  </div>
  <div class="entry">
    <div class="entry-head">
      <div>
        <span class="entry-title">President</span> — <span class="entry-sub">Microsoft Learn Student Ambassadors Club</span>
      </div>
      <span class="entry-date">2021 – 2023</span>
    </div>
    <ul>
      <li>Led technical training workshops on cloud computing and Python for 100+ students at GIKI.</li>
    </ul>
  </div>
</div>

<div class="section">
  <div class="section-title">Technical Capabilities</div>
  <div class="skills-grid">
    <div class="skill-label">Languages:</div>
    <div class="skill-items">Python (Expert), TypeScript, JavaScript, C++, SQL</div>
    <div class="skill-label">Deep Learning & Vision:</div>
    <div class="skill-items">PyTorch (CUDA), U-Net, Diffusion Models, Vision-Language Models (VLM), OpenCV, scikit-image, TensorFlow</div>
    <div class="skill-label">Retrieval & NLP:</div>
    <div class="skill-items">Contrastive Learning (MNRL), SentenceTransformers, FAISS, PEFT / LoRA (Qwen), RAG Evaluation, Hugging Face</div>
    <div class="skill-label">Systems & Tools:</div>
    <div class="skill-items">Docker, FastAPI, WebHID API, Linux / Bash, Git, ImageJ / ThunderSTORM, LaTeX</div>
  </div>
</div>

</body>
</html>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'load' });
  const outputPath = path.resolve('public', 'cv.pdf');
  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    margin: {
      top: '12mm',
      right: '14mm',
      bottom: '12mm',
      left: '14mm'
    }
  });
  console.log('CV PDF generated successfully at:', outputPath);
  await browser.close();
})();
