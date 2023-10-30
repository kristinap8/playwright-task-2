const {Page} = require("./page");

const pageHeading = ".wiki.wiki-page > h1";
const bookImages = '//table[@class="wiki-class-noborder"]//img';
const bookNames = '//table[@class="wiki-class-noborder"]//td//em';
const bookLinks = '//table[@class="wiki-class-noborder"]//a[@class="external"]';

class HomePage extends Page {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async getPageHeading() {
       return await super.getElement(pageHeading);
    }
    
    async getBookImages() {
        return await super.getElement(bookImages);
    }

    async getBookLinks() {
        return await super.getElement(bookLinks);
    }

    async getBookNames() {
        return await super.getElement(bookNames);
    }

    async getBooksCount() {
        return await (await this.getBookNames()).count();
    }

    async clickBookImage(index) {
        await (await this.getBookImages()).nth(index).click();
    }

    async clickBookLink(index) {
        await (await this.getBookLinks()).nth(index).click();
    }

    async getBookName(index) {
        return (await (await this.getBookNames()).nth(index).innerText()).split(' ').slice(0, 2).join(' ');
    }

    async getBookMatchesByImage(index) {
        const bookName = await this.getBookName(index);
        await this.clickBookImage(index);
        await this.page.waitForLoadState();
        const foundBookNamesCount = await this.page.getByText(bookName).count();
        await this.page.goBack();
        return foundBookNamesCount;
    }

    async getBookMatchesByLink(index) {
        const bookName = await this.getBookName(index);
        await this.clickBookLink(index);
        await this.page.waitForLoadState();
        const foundBookNamesCount = await this.page.getByText(bookName).count();
        await this.page.goBack();
        return foundBookNamesCount;
    }
}

module.exports = {HomePage};