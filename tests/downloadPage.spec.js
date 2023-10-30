const {test, expect} = require("@playwright/test");
const {DownloadPage} = require("../pages/download.page");
const {promises: fs} = require('fs'); 

let downloadPage;
const downloadDir = './test-data/';

test("Download the latest release file", async({page}) => {

    downloadPage = new DownloadPage(page);

    await downloadPage.blockGoogleAds();
    await downloadPage.openUrl();

    await downloadPage.gotToDowload();
    await expect(downloadPage.page).toHaveTitle(/Download/);
    await expect(await downloadPage.getPageHeading()).toContainText("Download");

    expect((await downloadPage.getAllFileLinksText()).every(link => link.endsWith('.zip') || link.endsWith('.tar.gz'))).toBe(true);

    for (let i = 0; i < await downloadPage.getFileLinksCount(); i++) {
        const downloadPath = await downloadPage.downloadFileByIndex(i, downloadDir);

        const isDownloaded = await fs.access(downloadPath)
        .then(() => true)
        .catch(() => false);
        expect(isDownloaded).toBe(true);

        await fs.unlink(downloadPath);
    };
  });

