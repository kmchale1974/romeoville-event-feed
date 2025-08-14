const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  await page.goto('https://kmchale1974.github.io/romeoville-event-feed/', {
    waitUntil: 'networkidle0'
  });

  const outputDir = path.join(__dirname, 'output');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `output/events-${timestamp}.png`;

  await page.setViewport({ width: 616, height: 960 });
  await page.screenshot({ path: filename });

  console.log(`Screenshot saved to ${filename}`);
  await browser.close();
})();
