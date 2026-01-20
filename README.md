This is a repo to learn testing APIs with Playwright

The API tested is the following: https://jsonplaceholder.typicode.com/

To run this test suite locally, please follow these guidelines

Install node.js following the appropriate guidelines for your OS 1a. For Windows, go to https://nodejs.org/en/download and download the Windows installer (.msi). After download is complete, click on the executable and follow instructions on screen. For a simple installation, it is advisable to leave default settings.
Verify that node.js and npm (node packet manager) is installed by running the following commands: node -v npm -v
Create a new project directory and cd into it: mkdir automation-with-playwright cd automation-with-playwright
Initialize npm project: npm init -y
Install Playwright: npm init playwright@latest During setup: choose TypeScript, accept default test folder, add GitHub Actions workflow: Yes/No (optional), install Playwright browsers: Yes
Install additional dependencies: npm install @faker-js/faker --save-dev npm install dotenv --save-dev npm install typescript@4.5 --save-dev
Run all tests with the following command: npx playwright test
Run a single test with the following command: npx playwright test tests/e2e-user-journey.spec.ts
Open Playwright report (traceviewer is set as "on") with the following command: npx playwright show-report
To debug, use npx playwright test --debug
To access the traceviewer run npx playwright test --ui