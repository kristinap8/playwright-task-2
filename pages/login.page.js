const {Page} = require("./page");

const loginLink = "a.login";
const loginField = "#username";
const passwordField = "#password";
const submitButton = "#login-submit";

class LoginPage extends Page {
    constructor(page) {
        super(page);
        this.page = page;
    }

    async getLoginField() {
        return await super.getElement(loginField);
    }

    async getPasswordField() {
        return await super.getElement(passwordField);
    }
    
    async goToLogin() {
        await super.clickElement(loginLink);
    }

    async clickSubmitButton() {
        await super.clickElement(submitButton);
    }

    async login(username, password) {
        await (await this.getLoginField()).fill(username);
        await (await this.getPasswordField()).fill(password);
        await this.clickSubmitButton();
    }

}

module.exports = {LoginPage};
