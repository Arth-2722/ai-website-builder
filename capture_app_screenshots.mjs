import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import puppeteer from 'puppeteer-core';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 400);
    }).on('error', () => {
      resolve(false);
    });
  });
}

async function waitForServer(url, timeoutMs = 25000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await checkUrl(url)) return true;
    await new Promise(r => setTimeout(r, 600));
  }
  return false;
}

async function main() {
  console.log('🚀 Spawning Full-Stack Server in PRODUCTION mode on port 5001 (serving client/dist & APIs)...');
  const serverProc = spawn('node', ['server/server.js'], {
    cwd: __dirname,
    stdio: 'ignore',
    shell: true,
    env: { ...process.env, NODE_ENV: 'production', PORT: '5001' }
  });

  try {
    console.log('⏳ Waiting for Full-Stack Server (http://localhost:5001)...');
    const ready = await waitForServer('http://localhost:5001/');
    if (!ready) {
      throw new Error('Server failed to start within timeout');
    }
    console.log('✓ Full-Stack Server is live!');

    console.log('Launching Chrome to capture screenshots...');
    const tempProfile = path.join(__dirname, '.chrome_cap_' + Date.now());
    const browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: 'new',
      userDataDir: tempProfile,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1600,1050', '--disable-gpu']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

    // 1. Homepage Hero
    console.log('Capturing: 01_home_hero.png');
    await page.goto('http://localhost:5001/', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '01_home_hero.png') });

    // 2. Homepage Features
    console.log('Capturing: 02_home_features.png');
    await page.evaluate(() => {
      window.scrollTo({ top: 600, behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '02_home_features.png') });

    // 3. Builder Studio Overview (with auto-scaffolded template)
    console.log('Capturing: 03_studio_builder_overview.png');
    await page.goto('http://localhost:5001/builder', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 4000));
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '03_studio_builder_overview.png') });

    // 4. Code Editor View
    console.log('Capturing: 04_interactive_code_editor.png');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const codeBtn = buttons.find(b => b.textContent && (b.textContent.includes('Code') || b.textContent.includes('Editor')));
      if (codeBtn) codeBtn.click();
    });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '04_interactive_code_editor.png') });

    // 5. Community Showcase
    console.log('Capturing: 05_community_showcase.png');
    await page.goto('http://localhost:5001/community', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '05_community_showcase.png') });

    // 6. User Dashboard
    console.log('Capturing: 06_user_dashboard.png');
    await page.goto('http://localhost:5001/dashboard', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '06_user_dashboard.png') });

    // 7. Pricing Page
    console.log('Capturing: 07_pricing_tiers.png');
    await page.goto('http://localhost:5001/pricing', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '07_pricing_tiers.png') });

    // 8. API Key Modal on Builder
    console.log('Capturing: 08_api_key_modal.png');
    await page.goto('http://localhost:5001/builder', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 2500));
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const apiBtn = btns.find(b => b.textContent && (b.textContent.includes('API') || b.textContent.includes('Key') || b.title?.includes('API')));
      if (apiBtn) apiBtn.click();
    });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '08_api_key_modal.png') });

    // 9. Export ZIP Modal
    console.log('Capturing: 09_export_zip_modal.png');
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const exportBtn = btns.find(b => b.textContent && (b.textContent.includes('Export') || b.textContent.includes('Download') || b.textContent.includes('ZIP')));
      if (exportBtn) exportBtn.click();
    });
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, '09_export_zip_modal.png') });

    await browser.close();
    console.log('✅ All screenshots captured successfully in ./screenshots/!');
  } finally {
    console.log('Terminating dev server processes...');
    serverProc.kill('SIGTERM');
  }
}

main().catch(err => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
