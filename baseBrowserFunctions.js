const puppeteer = require('puppeteer');
let constants = require('./constants.js');
let users = require('./users.json');
const CHROMELOCATION = process.env.CHROME_LOCATION || '0,0';

exports.launchBrowser = async function() {
    return await puppeteer.launch({
        args: ["--start-maximized", "--window-position=${CHROMELOCATION}", "--no-sandbox"],
        headless: true
    });
};

exports.closeBrowser = async function(browser)  {
    await browser.close();
};

exports.createPage = async function(browser) {
    const context = await browser.createIncognitoBrowserContext();
    return await context.newPage();
};

exports.closeModal = async function(page) {
    await page.waitForSelector("[aria-label='Modal'] [data-selector*='button_secondary']", { visible: true, timeout: 0 });
    await page.click("[aria-label='Modal'] [data-selector*='button_secondary']");
    await console.log("Close geo modal");
};

exports.clickHamburgerMenu = async function(page) {
    await page.waitForSelector("[data-selector*='hamburger']", { visible: true, timeout: 0 });
    await page.click("[data-selector*='hamburger']");
    await console.log("Open hamburger menu");
};

exports.clickLogin = async function(page) {
    await page.waitForSelector("[data-selector*='login']", { visible: true, timeout: 0 });
    await page.click("[data-selector*='login'] svg");
    await console.log("Clicks login link");
};

exports.loginWithUser = async function(page) {
    await typeUser(page);
    await typePass(page);
    await login(page);
    const loginResponse = await page.waitForResponse(response => response.url().includes('oauth'));
    expect(await loginResponse.status()).toBe(200);
};

exports.clickAccountHamburgerMenu = async function(page) {
    await page.waitForSelector("#hamburger_svg__a", { visible: true, timeout: 0 });
    await page.click("#hamburger_svg__a");
    await page.waitForSelector("nav[class*='SideNav']", { visible: true, timeout: 0 });
    await page.waitForSelector("[data-testid='sidebar-backdrop']", { visible: true, timeout: 0 });
    await page.waitForSelector("#hamburger_svg__a", { visible: false, timeout: 0 });
    await page.waitForFunction('document.querySelector("[data-testid=\'sidebar-backdrop\']").classList[0].includes("visible")');
    await console.log("Clicks account hamburger menu");
};

exports.clickPayouts = async function(page) {
    await page.waitForSelector("nav[class*='SideNav']", { visible: true, timeout: 0 });
    try {
        await page.waitForSelector("[data-selector='SIDENAV.NAV_ITEMS.PAYOUTS']", { visible: true, timeout: 1000 });
    }
    catch {
        await console.log("Hamburger animation is not loaded yet");
    }
    await page.click("[data-selector='SIDENAV.NAV_ITEMS.PAYOUTS'] svg");
    const paymentHistoryResponse = await page.waitForResponse(response => response.url().includes('payout-history'));
    expect(await paymentHistoryResponse.status()).toBe(200);
    await console.log("Clicks payouts link");
};

exports.getPayoutsText = async function(page) {
    await page.waitForSelector("[class*='InfoScreenContainer'] h2", { visible: true, timeout: 0 });
    let element = await page.$("[class*='InfoScreenContainer'] h2");
    return page.evaluate(el => el.textContent, element);
};

typeUser = async function(page) {
    await page.waitForSelector('#username', { visible: true, timeout: 0 });
    await page.type("#username", users.user);
    await console.log("Enters username");
};

typePass = async function(page) {
    await page.waitForSelector('#password', { visible: true, timeout: 0 });
    await page.type("#password", users.password);
    await console.log("Enters password");
};

login = async function(page) {
    await page.waitForSelector("[type='submit']", { visible: true, timeout: 0 });
    await page.click("[type='submit']");
    await console.log("Clicks login button");
};
