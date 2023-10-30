const {test, expect} = require("@playwright/test");
const {HomePage} = require("../pages/home.page");

let homePage;

test("Verify redirection to book purchase page from the \"Redmine books\" section", async({page}) => {
    
    homePage = new HomePage(page);
    
    await homePage.blockGoogleAds();
    await homePage.openUrl();
    await expect(await homePage.getPageHeading()).toContainText("Redmine");

    for (let i = 0; i < await homePage.getBooksCount(); i++) {
        expect(await homePage.getBookMatchesByImage(i)).toBeGreaterThan(0);
        expect(await homePage.getBookMatchesByLink(i)).toBeGreaterThan(0);
    }
});
