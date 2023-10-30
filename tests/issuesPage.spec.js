const {test, expect} = require('@playwright/test');
const {IssuesPage} = require("../pages/issues.page");
const {LoginPage} = require("../pages/login.page");
const {NewQueryPage} = require('../pages/newQuery.page');
const {CustomQueryPage} = require('../pages/customQuery.page');
const {faker} = require('@faker-js/faker');

const validUserData = JSON.parse(JSON.stringify(require('../test-data/userData.json')));
let issuesPage;
let loginPage;
let newQueryPage;
let customQueryPage;

test.describe("Validate the working of \"Issues\" page functionality", async () => {

    test("Filter issues by status", async({page}) => {

        issuesPage = new IssuesPage(page);

        await issuesPage.blockGoogleAds();
        await issuesPage.openUrl();
        
        await issuesPage.goToIssues();
        await expect(issuesPage.page).toHaveTitle(/Issues/);
        await expect(await issuesPage.getPageHeading()).toContainText("Issues");

        await expect(await issuesPage.getIssuesList()).toBeVisible();
        await expect(await issuesPage.getStatusCheckbox()).toBeChecked();
        
        const statusFilterValues = await issuesPage.getStatusFilterValues();

        for(const option1 of await issuesPage.getStatusFilterOperators()) {
            const selectedOption1 = await issuesPage.selectOptionDrodown(option1, 1);
            expect(selectedOption1).toBe(option1);
            if (await issuesPage.isDropdown2Enabled()) {
                for (const option2 of statusFilterValues) {
                    const selectedOption2 = await issuesPage.selectOptionDrodown(option2, 2);
                    expect(selectedOption2).toBe(option2);

                    await issuesPage.clickApplyButton();

                    let statuses = await issuesPage.getStatusColumnValues();
                    if (selectedOption1 == "is") {
                        expect(statuses).toContainEqual(selectedOption2);
                    } else if (selectedOption1 == "is not") {
                        expect(statuses).not.toContainEqual(selectedOption2);
                    }  
                }
            } else {
                await issuesPage.clickApplyButton();

                let statuses = await issuesPage.getStatusColumnValues();
                if (selectedOption1 == "open") {
                    expect(statuses).not.toContainEqual('Closed');
                } else if (selectedOption1 == "closed") {
                    expect(statuses).toContainEqual('Closed');
                } else if (selectedOption1 == "any") {
                    expect(statusFilterValues).toEqual(expect.arrayContaining([...new Set(statuses)]));
                }
            }
            
        }
    });
     
    test("Create a custom query for filtering issues by tracker", async({page}) => {

        loginPage = new LoginPage(page);

        await loginPage.openUrl();
        await loginPage.goToLogin();
        await loginPage.login(validUserData.login, validUserData.password);
        
        issuesPage = new IssuesPage(page);
        await issuesPage.goToIssues();
        await expect(issuesPage.page).toHaveTitle(/Issues/);
        await expect(await issuesPage.getPageHeading()).toContainText("Issues");

        await expect(await issuesPage.getIssuesList()).toBeVisible();
        
        await issuesPage.clickSaveButton();
        
        newQueryPage = new NewQueryPage(page);
        await expect(await newQueryPage.getPageHeading()).toHaveText("New query");
        
        const queryName = faker.word.words({ count: { min: 1, max: 3 }});

        await newQueryPage.enterQueryName(queryName);
        await expect(await newQueryPage.getQueryNameField()).toHaveValue(queryName);
   
        await newQueryPage.addTrackerFilter();
        await expect(await newQueryPage.getStatusCheckbox()).not.toBeChecked();
        await expect(await newQueryPage.getTrackerCheckbox()).toBeVisible();
        await expect(await newQueryPage.getTrackerCheckbox()).toBeChecked();

        const option1 = faker.helpers.arrayElement(await newQueryPage.getTrackerDropdownOptions1());
        const option2 = faker.helpers.arrayElement(await newQueryPage.getTrackerDropdownOptions2());
        await newQueryPage.selectTrackerFilterOptions(option1, option2);
         
        await newQueryPage.clickSaveButton();
        
        customQueryPage = new CustomQueryPage(page);
        await expect(customQueryPage.page).toHaveTitle(new RegExp(queryName));
        await expect(await customQueryPage.getSuccessMessage()).toHaveText("Successful creation.");
        await expect(await customQueryPage.getSelectedQuery()).toHaveText(queryName);

        const trackerNames = await customQueryPage.getTrackerColumnValues();
        if(option1 == "is") {
            expect(trackerNames.every(item => item === option2)).toBe(true);
        } else if(option1 == "is not"){
            expect(trackerNames.every(item => item !== option2)).toBe(true);
        }

        await customQueryPage.deleteQuery();

    });
});