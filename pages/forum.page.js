const {Page} = require("./page");

const forumMessagesTable = "table[class='list messages']";
const tableHeaders = "//thead//th";
const newMessageButton = ".icon.icon-add";


class ForumPage extends Page {
    constructor(page) {
        super(page);
        this.page = page;
    }
    
    async getForumMessagesTable() {
        return await super.getElement(forumMessagesTable);
    }

    async getTableHeadersNames() {
        await this.page.waitForSelector(tableHeaders);
        return (await super.getElement(tableHeaders)).allInnerTexts();
    }

    async clickNewMessageButton() {
        await super.clickElement(newMessageButton);
    }
}

module.exports = {ForumPage};