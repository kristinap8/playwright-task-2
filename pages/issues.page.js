const {Page} = require("./page");

const downloadLinkNavBar = "a.issues";
const pageHeading = '#content > h2';
const issuesList = 'table[class*="list issues"]';
const statusCheckbox = '#cb_status_id';
const statusDropdown1 = "//select[@id='operators_status_id']";
const statusDropdown2 = '//select[@id="values_status_id_1"]';
const statusDropdownOptions1 = "//select[@id='operators_status_id']//option";
const statusDropdownOptions2 = '//select[@id="values_status_id_1"]//option';
const applyButton = '.buttons > a.icon.icon-checked';
const saveButton = 'a.icon.icon-save';
const statusColumnValues = 'td.status';


class IssuesPage extends Page {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async goToIssues() {
        await super.clickElement(downloadLinkNavBar);
    }

    async getPageHeading() {
        return await super.getElement(pageHeading);
    }

    async getIssuesList() {
        return await super.getElement(issuesList);
    }

    async getStatusCheckbox() {
        return await super.getElement(statusCheckbox);
    }

    async getStatusDropdown1() {
        return await super.getElement(statusDropdown1);
    }

    async getStatusDropdown2() {
        return await super.getElement(statusDropdown2);
    }

    async getStatusFilterOperators() {
        return await (await super.getElement(statusDropdownOptions1)).allInnerTexts();
    }

    async getStatusFilterValues() {
        return await (await super.getElement(statusDropdownOptions2)).allInnerTexts();
    }

    async getStatusColumnValues() {
        return (await super.getElement(statusColumnValues)).allInnerTexts();
    }

    async selectOptionDrodown(option, dropdownIndex) {
        const dropdownElement = (dropdownIndex == 1) ? await this.getStatusDropdown1() : await this.getStatusDropdown2();
        const selectedValue= await dropdownElement.selectOption(option);
        const selectedOption = await dropdownElement.locator(`*[value="${selectedValue}"]`).innerText();
        return selectedOption;
    }

    async isDropdown2Enabled() {
        return await (await this.getStatusDropdown2()).isEnabled();
    }

    async clickApplyButton() {
        await super.clickElement(applyButton);
        await this.page.waitForSelector(statusColumnValues);
    }

    async clickSaveButton() {
        await super.clickElement(saveButton);
    }

}


module.exports = {IssuesPage};