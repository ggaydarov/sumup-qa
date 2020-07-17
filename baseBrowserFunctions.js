const puppeteer = require('puppeteer');
let constants = require('./constants.js');
let selectors = require('./selectors.js');
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
    await page.waitForSelector(selectors.MODAL_BUTTON, { visible: true, timeout: 0 });
    await page.click(selectors.MODAL_BUTTON);
    await page.waitForSelector(selectors.MODAL_BUTTON, { visible: false, timeout: 0 });
    await console.log("Close geo modal");
};

exports.clickHamburgerMenu = async function(page) {
    await page.waitForSelector(selectors.HAMBURGER_BUTTON, { visible: true, timeout: 0 });
    await page.waitForSelector(selectors.GET_STARTED, { visible: false, timeout: 0 });
    await page.click(selectors.HAMBURGER_BUTTON);
    await console.log("Open hamburger menu");
};

exports.clickLogin = async function(page) {
    await page.waitForSelector(selectors.LOGIN_BUTTON, { visible: true, timeout: 0 });
    await page.click(selectors.LOGIN_BUTTON_SVG);
    await page.waitForSelector(selectors.LOGIN_SUBMIT, { visible: true, timeout: 0 });
    await console.log("Clicks login link");
};

exports.loginWithUser = async function(page) {
    await typeUser(page);
    await typePass(page);
    await login(page);
    const loginResponse = await page.waitForResponse(response => response.url().includes('oauth'));
    expect(await loginResponse.status()).toBe(200);
    await page.waitForSelector(selectors.BUSINESS_DETAILS_SUBMIT, { visible: true, timeout: 0 });
    await page.waitForSelector(selectors.BUSINESS_DETAILS_ACCOUNT, { visible: true, timeout: 0 });
    await page.waitForSelector(selectors.BUSINESS_DETAILS_COUNTRY, { visible: true, timeout: 0 });
};

exports.clickAccountHamburgerMenu = async function(page) {
    await page.waitForSelector(selectors.ACCOUNT_HAMBURGER_MENU, { visible: true, timeout: 0 });
    await page.click(selectors.ACCOUNT_HAMBURGER_MENU);
    await page.waitForSelector("[data-testid='sidebar-backdrop']", { visible: true, timeout: 0 });
    await page.waitForSelector(selectors.ACCOUNT_HAMBURGER_MENU, { visible: false, timeout: 0 });
    await page.waitForFunction('document.querySelector("[data-testid=\'sidebar-backdrop\']").classList[0].includes("visible")');
    await page.waitForSelector(selectors.BUSINESS_DETAILS_SUBMIT, { visible: false, timeout: 0 });
    await page.waitForSelector(selectors.BUSINESS_DETAILS_ACCOUNT, { visible: false, timeout: 0 });
    await page.waitForSelector(selectors.BUSINESS_DETAILS_COUNTRY, { visible: false, timeout: 0 });
    await console.log("Clicks account hamburger menu");
};

exports.clickPayouts = async function(page) {
    await page.waitForSelector("nav[class*='SideNav']", { visible: true, timeout: 2000 });
    await page.waitForSelector("[class*='PageHeaderContainer']", { visible: true, timeout: 2000 });
    await page.waitForSelector("[class*='selected-sub-nav']", { visible: true, timeout: 2000 });
    try {
        await page.waitForSelector(selectors.PAYOUTS_LINK, { visible: true, timeout: 5000 });
    }
    catch {
        await console.log("Hamburger animation is not loaded yet");
    }
    await page.click(selectors.PAYOUTS_LINK_SVG);
    await console.log("Clicks payouts link");
};

exports.getPayoutsText = async function(page) {
    await page.waitForSelector(selectors.PAYOUTS_EMPTY_PAGE_TEXT, { visible: true, timeout: 0 });
    let element = await page.$(selectors.PAYOUTS_EMPTY_PAGE_TEXT);
    return page.evaluate(el => el.textContent, element);
};

typeUser = async function(page) {
    await page.waitForSelector(selectors.USERNAME, { visible: true, timeout: 0 });
    await page.type(selectors.USERNAME, users.user);
    await console.log("Enters username");
};

typePass = async function(page) {
    await page.waitForSelector(selectors.PASSWORD, { visible: true, timeout: 0 });
    await page.type(selectors.PASSWORD, users.password);
    await console.log("Enters password");
};

login = async function(page) {
    await page.waitForSelector(selectors.LOGIN_SUBMIT, { visible: true, timeout: 0 });
    await page.click(selectors.LOGIN_SUBMIT);
    await console.log("Clicks login button");
};
