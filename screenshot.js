const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const baseUrl = "https://kmchale1974.github.io/romeoville-event-feed/?page=";

  if (!fs.existsSync("output")) fs.mkdirSync("output");

  for (let i = 1; i <= 4; i++) {
    await page.goto(`${baseUrl}${i}`, { waitUntil: "networkidle0" });
    await page.waitForTimeout(2000); // let animations complete
    await page.screenshot({ path: `output/page${i}.png`, fullPage: true });
    console.log(`Generated page${i}.png`);
  }

  await browser.close();
})();
