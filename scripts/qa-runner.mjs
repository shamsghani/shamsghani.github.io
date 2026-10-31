import { chromium } from 'playwright';
import { preview } from 'astro';

(async () => {
  const server = await preview({
    root: '.',
    server: { port: 4444 }
  });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to http://localhost:4444...');
  await page.goto('http://localhost:4444', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Verify Hero Thesis
  const heroThesis = await page.locator('.hero-thesis').innerText();
  console.log('Hero Thesis:', heroThesis);
  const hasSpacingError = heroThesis.includes('fromsingle') || heroThesis.includes('tocontrastive');
  console.log('Hero Thesis Spacing Issue Present:', hasSpacingError);

  // 2. Capture Hero
  await page.locator('.hero-content').screenshot({ path: 'C:/Users/shams/.gemini/antigravity/brain/735c4996-e520-4774-9f45-81704c92a890/qa-hero.png' });

  // 3. Scroll to Metacognition Figure
  await page.evaluate(() => {
    const el = document.getElementById('fig-metacognition');
    if (el) el.scrollIntoView({ block: 'center' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:/Users/shams/.gemini/antigravity/brain/735c4996-e520-4774-9f45-81704c92a890/qa-metacognition-view.png' });

  // 4. Scroll to Section 04 (Itanz Modules Grid)
  await page.evaluate(() => {
    const el = document.getElementById('embeddings');
    if (el) el.scrollIntoView({ block: 'start' });
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:/Users/shams/.gemini/antigravity/brain/735c4996-e520-4774-9f45-81704c92a890/qa-itanz-view.png' });

  // 5. Test Light Mode
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('shams-theme', 'light');
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/shams/.gemini/antigravity/brain/735c4996-e520-4774-9f45-81704c92a890/qa-itanz-light-view.png' });

  console.log('QA completed successfully!');
  await browser.close();
  await server.stop();
  process.exit(0);
})();
