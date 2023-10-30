# Playwright -- testing of Redmine 

## Table of Contents

1. [Summary of Repo](#summary-of-repo)
2. [Requirements](#requirements)
3. [Steps to Install](#steps-to-install)
4. [Steps to Launch](#steps-to-launch)
5. [Steps to Creating the Report](#steps-to-creating-the-report)

## Summary of Repo

This repository contains automated test cases for [Redmine](https://www.redmine.org/) implemented using Playwright. 

## Requirements

- Node.js: Ensure you have Node.js installed.
- Playwright: Install Playwright by running `npm install playwright`.
- Java: (JRE 8 or higher).
- Allure Framework (v2.15.0 or higher).
- Other dependencies: Check the `package.json` file for additional dependencies.

## Steps to Install

1. Clone this repository:

```bash
git clone https://github.com/yourusername/redmine-playwright.git
```

2. Navigate to the project directory:

```bash
cd redmine-playwright
```

3. Install project dependencies:

```bash
npm install
```

## Steps to Launch

1. Run tests using headless mode:

```bash
npm run test
```

2. Run the automated tests using Playwright with UI:

```bash
npm run test-with-ui
```

## Steps to Creating the Report

1. Generate Allure report:

```bash
npm run generate-allure-report
```

2. Open the Allure report in a browser:

```bash
npm run open-allure-report
```
