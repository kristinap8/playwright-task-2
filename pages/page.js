class Page {
  /** 
   * @param {import('playwright').Page} page 
   */
  constructor(page) {
    this.page = page;
  }

  async openUrl() {
    await this.page.goto('https://www.redmine.org/');
    await this.page.waitForLoadState('load');
  }

  async getElement(element) {
    return this.page.locator(element);
  }

  async clickElement(element) {
    await (await this.getElement(element)).click();
  }

  async blockGoogleAds() {
    await this.page.route("**/*", route => {
        route.request().url().startsWith("https://googleads.") ?
          route.abort() : route.continue();
        return;
      });
  }
}

module.exports = {Page};