let baseBrowser = require('./baseBrowserFunctions.js');
let constants = require('./constants.js');

jest.setTimeout(constants.JESTTIMEOUT);

let browser;
let page;

beforeEach(async () => {
    browser = await baseBrowser.launchBrowser();
    page = await baseBrowser.createPage(browser);
    await console.log("Open browser");
    await page.setViewport(constants.MOBILE_VIEWPORT);
});

afterEach(async () => {
    await baseBrowser.closeBrowser(browser);
}, constants.JESTTIMEOUT);

it('Verify no transactions page', async () => {
    await page.goto(constants.HOME);
    await baseBrowser.closeModal(page);
    await baseBrowser.clickHamburgerMenu(page);
    await baseBrowser.clickLogin(page);
    await baseBrowser.loginWithUser(page);
    await baseBrowser.clickAccountHamburgerMenu(page);
    await baseBrowser.clickPayouts(page);
    expect(await page.title()).toBe('SumUp Dashboard');
    const text = await baseBrowser.getPayoutsText(page);
    expect(text).toBe('We couldn’t find anything that matches your search.');
});
