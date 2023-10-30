const {Page} = require("./page");

const pageHeader = "//div[@id='add-message']/h2";
const subjectField = "#message_subject";
const fileUploader = 'input[class="file_selector filedrop"]';
const attachmentLabel = "*[name='attachments[1][filename]']";
const createButton = "input[type='submit']";
const errorMessage = "#errorExplanation";
const forumsNavBar = 'a.boards.selected';

class NewMessageForumPage extends Page {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async getPageHeader() {
        return await super.getElement(pageHeader);
    }
    async getSubjectField() {
        return await super.getElement(subjectField);
    }

    async getFileUploader() {
        return await super.getElement(fileUploader);
    }

    async getAttachmentLabel() {
        return await super.getElement(attachmentLabel);
    }

    async fillForm(subjectName, fileToUpload) {
        (await this.getSubjectField()).fill(subjectName);
        await (await this.getFileUploader()).setInputFiles(fileToUpload);
    }

    async clickCreateButton() {
        await super.clickElement(createButton);
    }

    async getErrorMessageText() {
        return (await super.getElement(errorMessage)).textContent();
    }
    
    async goToForums() {
        await super.clickElement(forumsNavBar);
    }
    

}

module.exports = {NewMessageForumPage};