const {Page} = require("./page");

const successMessage = "#flash_notice";
const selectedQuery = ".query.selected";
const trackerColumnValues = "td.tracker";
const deleteQueryButton = ".icon.icon-del";

class CustomQueryPage extends Page {
    constructor(page) {
        super(page);
        this.page = page;
    }
    
    async getSuccessMessage() {
        return await super.getElement(successMessage);
    }

    async getSelectedQuery() {
        return await super.getElement(selectedQuery);
    }

    async getTrackerColumnValues() {
        return (await super.getElement(trackerColumnValues)).allInnerTexts();
    }

    async deleteQuery() {
        await this.page.on('dialog', dialog => dialog.accept());
        return await super.clickElement(deleteQueryButton);
    }
}

module.exports = {CustomQueryPage};
