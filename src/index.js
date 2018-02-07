import 'babel-polyfill'
import puppeteer from 'puppeteer'

const launchArgs = {
  headless: false,
  args: ['--no-sandbox', '--disable-notifications'],
  slowMo: 50
};

(async () => {
  const browser = await puppeteer.launch(launchArgs)
  const page = await browser.newPage()
  await page.goto('https://amazon.com')
  await page.screenshot({path: 'example.png'})

  await browser.close()
})()
