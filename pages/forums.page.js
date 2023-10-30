const {Page} = require("./page");

const forumsLinkNavBar = "a.boards";
const forumsTable = 'table[class="list boards"]';
const pageHeading = '#content > h2';
const forumLinks = '//a[@class="board"]';

class ForumsPage extends Page {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async goToForums() {
        await super.clickElement(forumsLinkNavBar);
    }

    async getPageHeading() {
        return await super.getElement(pageHeading);
    }

    async getForumsTable() {
        return await super.getElement(forumsTable);
    }
   
    async getForumLinks() {
        return await super.getElement(forumLinks);
    }
    async getForumNames() {
        return (await this.getForumLinks()).allTextContents();
    }
    
    async getForumsNumber() {
        return (await this.getForumLinks()).count();
    }

    async goToForum(index) {
        await (await this.getForumLinks()).nth(index).click();
    }
}

module.exports = {ForumsPage};