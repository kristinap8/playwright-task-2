const {Page} = require("./page");

const downloadLinkNavBar = 'a.download';
const pageHeading = 'h1:has-text("Download")';
const fileLinks = '//table//td//a';

class DownloadPage extends Page {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async getPageHeading() {
        return await super.getElement(pageHeading);
    }

    async getAllFileLinks() {
        return await super.getElement(fileLinks);
      }

    async getAllFileLinksText() {
        return (await super.getElement(fileLinks)).allTextContents();
    }
    
    async getFileLinksCount() {
        return (await this.getAllFileLinks()).count();
    }

    async gotToDowload() {
        await super.clickElement(downloadLinkNavBar);
    }
    
    async downloadFileByIndex(index, downloadDir) {
        const downloadPromise = this.page.waitForEvent('download');
        const fileLinks = await this.getAllFileLinks();
        await fileLinks.nth(index).click();
        const download = await downloadPromise;
        const downloadPath = downloadDir + download.suggestedFilename();
        await download.saveAs(downloadPath);
        return downloadPath;
    }


}

module.exports = {DownloadPage};