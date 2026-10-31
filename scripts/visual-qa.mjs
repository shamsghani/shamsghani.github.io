import { chromium } from 'playwright';
import { preview } from 'astro';

(async () => {
  const server = await preview({
    root: '.',
    server: { port: 4422 }
  });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Dark Mode
  await page.goto('http://localhost:4422', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await page.waitForTimeout(500);

  // Screenshot hero & shipped
  await page.locator('#hero').screenshot({ path: 'shot-dark-hero.png' });
  await page.locator('#shipped').screenshot({ path: 'shot-dark-shipped.png' });
  await page.locator('#research').screenshot({ path: 'shot-dark-deepfocus.png' });
  await page.locator('#metacognition').screenshot({ path: 'shot-dark-scs1.png' });
  await page.locator('#record').screenshot({ path: 'shot-dark-record.png' });
  await page.locator('#contact').screenshot({ path: 'shot-dark-footer.png' });

  // 2. Light Mode
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('shams-theme', 'light');
  });
  await page.waitForTimeout(500);

  await page.locator('#hero').screenshot({ path: 'shot-light-hero.png' });
  await page.locator('#shipped').screenshot({ path: 'shot-light-shipped.png' });
  await page.locator('#research').screenshot({ path: 'shot-light-deepfocus.png' });
  await page.locator('#metacognition').screenshot({ path: 'shot-light-scs1.png' });
  await page.locator('#record').screenshot({ path: 'shot-light-record.png' });
  await page.locator('#contact').screenshot({ path: 'shot-light-footer.png' });

  console.log('Screenshots captured successfully!');
  await browser.close();
  await server.stop();
  process.exit(0);
})();
