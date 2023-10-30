const {Page} = require("./page");

const pageHeading = "#content > h2";
const queryNameField = "#query_name";
const statusCheckbox = "#cb_status_id";
const filterDropdownMenu = "#add_filter_select";
const trackerCheckbox = "#cb_tracker_id";
const trackerDropdownMenu1 = '#operators_tracker_id';
const trackerDropdownMenu2 = "#values_tracker_id_1";
const trackerDropdownOptions1 = "#operators_tracker_id > option";
const trackerDropdownOptions2 = "#values_tracker_id_1 > option";
const saveButton = 'input[type="submit"]';

class NewQueryPage extends Page {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async getPageHeading() {
        return await super.getElement(pageHeading);
    }
    
    async getQueryNameField() {
        return await super.getElement(queryNameField);
    }
    async getStatusCheckbox() {
        return await super.getElement(statusCheckbox);
    }

    async getFilterDropdownMenu() {
        return await super.getElement(filterDropdownMenu);
    }

    async getTrackerCheckbox() {
        return await super.getElement(trackerCheckbox);
    }

    async getTrackerDropdownOptions1() {
        return await (await super.getElement(trackerDropdownOptions1)).allInnerTexts();
    }

    async getTrackerDropdownOptions2() {
        return await (await super.getElement(trackerDropdownOptions2)).allInnerTexts();
    }

    async getTrackerDropdownMenu1() {
        return await super.getElement(trackerDropdownMenu1);
    }

    async getTrackerDropdownMenu2() {
        return await super.getElement(trackerDropdownMenu2);
    }

    async enterQueryName(name) {
        await (await this.getQueryNameField()).fill(name);
    }

    async addTrackerFilter() {
        await (await this.getStatusCheckbox()).uncheck();
        await (await this.getFilterDropdownMenu()).selectOption("Tracker");
    }

    async selectTrackerFilterOptions(option1, option2) {
        await (await this.getTrackerDropdownMenu1()).selectOption(option1);
        await (await this.getTrackerDropdownMenu2()).selectOption(option2);
    }

    async clickSaveButton() {
        await super.clickElement(saveButton);
    }
}

module.exports = {NewQueryPage};