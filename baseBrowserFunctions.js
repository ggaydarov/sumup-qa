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
    await page.waitForSelector(selectors.MODAL_BUTTON);
    await page.click(selectors.MODAL_BUTTON);
    await console.log("Close geo modal");
};

exports.clickHamburgerMenu = async function(page) {
    await page.waitForSelector(selectors.HAMBURGER_BUTTON);
    await page.waitForSelector(selectors.GET_STARTED, { visible: false});
    await page.click(selectors.HAMBURGER_BUTTON);
    await console.log("Open hamburger menu");
};

exports.clickLogin = async function(page) {
    await page.waitFor(1000);
    await page.waitFor(selectors.LOGIN_BUTTON, {timeout: 60000});
    await page.click(selectors.LOGIN_BUTTON);
    await page.waitFor(selectors.LOGIN_SUBMIT);
    await console.log("Clicks login link");
};

exports.loginWithUser = async function(page) {
    await typeUser(page);
    await typePass(page);
    await login(page);
    const loginResponse = await page.waitForResponse(response => response.url().includes('oauth'));
    expect(await loginResponse.status()).toBe(200);
    await page.waitForSelector(selectors.BUSINESS_DETAILS_SUBMIT);
    await page.waitForSelector(selectors.BUSINESS_DETAILS_ACCOUNT);
    await page.waitForSelector(selectors.BUSINESS_DETAILS_COUNTRY);
};

exports.clickAccountHamburgerMenu = async function(page) {
    await page.waitForSelector(selectors.ACCOUNT_HAMBURGER_MENU);
    await page.click(selectors.ACCOUNT_HAMBURGER_MENU);
    await page.waitForSelector("[data-testid='sidebar-backdrop']");
    await page.waitForSelector(selectors.ACCOUNT_HAMBURGER_MENU);
    await page.waitForFunction('document.querySelector("[data-testid=\'sidebar-backdrop\']").classList[0].includes("visible")');
    await page.waitForSelector(selectors.BUSINESS_DETAILS_SUBMIT);
    await page.waitForSelector(selectors.BUSINESS_DETAILS_ACCOUNT);
    await page.waitForSelector(selectors.BUSINESS_DETAILS_COUNTRY);
    await page.waitForSelector("[data-testid='sidebar-close-button']");
    await console.log("Clicks account hamburger menu");
};

exports.clickPayouts = async function(page) {
    await page.waitForSelector("nav[class*='SideNav']");
    await page.waitForSelector("[class*='PageHeaderContainer']");
    await page.waitForSelector("[class*='selected-sub-nav']");
    await page.waitForSelector("[data-selector='SIDENAV.NAV_ITEMS.SHOP']");
    await page.waitFor(1000);
    await page.waitFor(selectors.PAYOUTS_LINK);
    await page.waitFor(selectors.PAYOUTS_LINK_SVG);
    await page.click(selectors.PAYOUTS_LINK_SVG);
    await console.log("Clicks payouts link");
};

exports.getPayoutsText = async function(page) {
    await page.waitForSelector(selectors.PAYOUTS_EMPTY_PAGE_TEXT);
    let element = await page.$(selectors.PAYOUTS_EMPTY_PAGE_TEXT);
    return page.evaluate(el => el.textContent, element);
};

typeUser = async function(page) {
    await page.waitForSelector(selectors.USERNAME);
    await page.type(selectors.USERNAME, users.user);
    await console.log("Enters username");
};

typePass = async function(page) {
    await page.waitForSelector(selectors.PASSWORD);
    await page.type(selectors.PASSWORD, users.password);
    await console.log("Enters password");
};

login = async function(page) {
    await page.waitForSelector(selectors.LOGIN_SUBMIT);
    await page.click(selectors.LOGIN_SUBMIT);
    await console.log("Clicks login button");
};
