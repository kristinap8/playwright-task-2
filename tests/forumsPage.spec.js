const {test, expect} = require("@playwright/test");
const {LoginPage} = require('../pages/login.page');
const {ForumsPage} = require('../pages/forums.page');
const {ForumPage} = require('../pages/forum.page');
const {NewMessageForumPage} = require('../pages/newMessageForum.page');
const {faker} = require('@faker-js/faker');
const path = require('path');

const validUserData = JSON.parse(JSON.stringify(require('../test-data/userData.json')));
const fileToUpload = './test-data/forumFile.txt';

let loginPage;
let forumsPage;
let forumPage;
let newMessageForumPage;

test("Create a new message in a forum with empty message content", async ({page}) => {
    
    loginPage = new LoginPage(page);

    await loginPage.blockGoogleAds();
    await loginPage.openUrl();
    await loginPage.goToLogin();
    await loginPage.login(validUserData.login, validUserData.password);
    
    forumsPage = new ForumsPage(page);

    await forumsPage.goToForums();
    await expect(forumsPage.page).toHaveTitle(/Forums/);
    await expect(await forumsPage.getPageHeading()).toHaveText("Forums");
    await expect(await forumsPage.getForumsTable()).toBeVisible();
    
    forumPage = new ForumPage(page);
    newMessageForumPage = new NewMessageForumPage(page);

    const forumNames = await forumsPage.getForumNames();
    const expectedColumns = ['Subject', 'Author', 'Created', 'Replies', 'Last message'];

    const forumsNumber = await forumsPage.getForumsNumber();
    for (let i = 0; i < forumsNumber; i++) {
      await forumsPage.goToForum(i);
      await expect(forumPage.page).toHaveTitle(new RegExp(forumNames[i]));
      await expect(await forumPage.getForumMessagesTable()).toBeVisible();
      const columns = await forumPage.getTableHeadersNames();
      expect(columns).toEqual(expectedColumns);

      await forumPage.clickNewMessageButton();
      await expect(await newMessageForumPage.getPageHeader()).toContainText('New message');

      const subject = faker.word.words({ count: { min: 1, max: 6 }});
      await newMessageForumPage.fillForm(subject, fileToUpload);

      await expect(await newMessageForumPage.getSubjectField()).toHaveValue(subject);
      await expect(await newMessageForumPage.getAttachmentLabel()).toHaveValue(path.basename(fileToUpload));

      await newMessageForumPage.clickCreateButton();
      expect(await newMessageForumPage.getErrorMessageText()).toContain('Content cannot be blank');

      await newMessageForumPage.goToForums();
    }

});