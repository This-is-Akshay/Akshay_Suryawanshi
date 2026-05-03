/**
 * LinkedIn Banner PNG Generator
 * 
 * Renders banner.html to a high-quality PNG using Playwright.
 * 
 * Usage:
 *   npm install -D playwright
 *   npx playwright install chromium
 *   node render.js
 * 
 * Output: linkedin-banner.png (1584 x 396 px @ 2x DPI)
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Configuration (defaults; per-banner overrides supported below)
const CONFIG = {
  width: 1584,
  height: 396,
  deviceScaleFactor: 2, // 2x for crisp text (retina quality)
};

// Banners to render. Each entry may override width/height.
const BANNERS = [
  { input: 'banner.html',   output: 'linkedin-banner.png', theme: 'Dark' },
  { input: 'og-image.html', output: 'og-image.png',        theme: 'OG Image', width: 1200, height: 630 },
];

async function renderBanner() {
  const startTime = Date.now();
  const scriptDir = __dirname;
  
  console.log('🚀 Starting LinkedIn banner render...');
  console.log(`   Size:   ${CONFIG.width} x ${CONFIG.height} px`);
  console.log(`   Scale:  ${CONFIG.deviceScaleFactor}x (high DPI)`);
  console.log('');
  
  let browser;
  
  try {
    // Launch browser
    console.log('📦 Launching Chromium...');
    browser = await chromium.launch({
      headless: true,
    });
    
    // Render each banner (per-banner viewport so different sizes render correctly)
    for (const banner of BANNERS) {
      const inputPath = path.join(scriptDir, banner.input);
      const outputPath = path.join(scriptDir, banner.output);

      // Check if input file exists
      if (!fs.existsSync(inputPath)) {
        console.log(`⚠️  Skipping ${banner.theme}: ${banner.input} not found`);
        continue;
      }

      const w = banner.width  || CONFIG.width;
      const h = banner.height || CONFIG.height;

      console.log(`\n📄 Rendering ${banner.theme} theme...`);
      console.log(`   Input:  ${banner.input}`);
      console.log(`   Size:   ${w} x ${h} px @ ${CONFIG.deviceScaleFactor}x`);

      const context = await browser.newContext({
        viewport: { width: w, height: h },
        deviceScaleFactor: CONFIG.deviceScaleFactor,
      });
      const page = await context.newPage();
      
      // Navigate to the HTML file
      const fileUrl = `file://${inputPath.replace(/\\/g, '/')}`;
      await page.goto(fileUrl, {
        waitUntil: 'networkidle',
      });
      
      // Wait for fonts to be ready
      await page.evaluate(() => document.fonts.ready);
      
      // Small delay to ensure complete render
      await page.waitForTimeout(500);
      
      // Find the banner element
      const bannerEl = await page.$('#banner');
      if (!bannerEl) {
        console.log(`   ❌ Could not find #banner element`);
        await page.close();
        await context.close();
        continue;
      }

      // Take screenshot
      await bannerEl.screenshot({
        path: outputPath,
        type: 'png',
      });

      // Verify output
      if (fs.existsSync(outputPath)) {
        const stats = fs.statSync(outputPath);
        const fileSizeKB = (stats.size / 1024).toFixed(1);
        console.log(`   ✅ Saved: ${banner.output} (${fileSizeKB} KB)`);
      }

      await page.close();
      await context.close();
    }
    
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log('');
    console.log(`✅ All banners generated in ${elapsed}s`);
    console.log('🎉 Ready to upload to LinkedIn!');
    
  } catch (error) {
    console.error('');
    console.error('❌ Error rendering banner:');
    console.error(`   ${error.message}`);
    console.error('');
    console.error('💡 Troubleshooting:');
    console.error('   1. Run: npm install -D playwright');
    console.error('   2. Run: npx playwright install chromium');
    process.exit(1);
    
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run
renderBanner();
