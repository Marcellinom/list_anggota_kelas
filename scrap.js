import Puppeteer from "puppeteer";
import * as dotenv from 'dotenv'
dotenv.config()
async function run() {
    const browser = await Puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto('https://akademik.its.ac.id/home.php')
    await page.type('input[id=username]', process.env.nrp);
    await page.click('button[id=continue]')
    await page.type('input[id=password]', process.env.password)
    await Promise.all([
      page.click('button[id=login]'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);
    console.log(await page.cookies())
}
run()