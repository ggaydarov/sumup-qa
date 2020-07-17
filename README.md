# SumUp QA task

Basic framework using puppeteer and jest.
The tests verify that registered customer can log in and verify 
that customer doesn't have any transactions.
Test is running against mobile, tablet and desktop resolutions.
Default setting runs all tests in parallel and in headless mode.

## Install steps

1. Download and install Nodejs - https://nodejs.org/en/download/
2. Clone the repo - https://github.com/ggaydarov/sumup-qa
3. Checkout 'master' branch
4. Open git console and run `npm install`

## Run the tests

Open git console in the project folder and run `npm test`
This command runs all tests in parallel in headless mode.

Run specific test suite with `npm test -t "suite-file"`
All options:
* login.desktop.test.js
* login.mobile.test.js
* login.tablet.test.js

Example: `npm test -t "login.desktop.test.js"`

To stop headless mode:
1. Open project folder.
2. Open baseBrowserFunctions.js file
3. Go to launchBrowser method.
4. Edit "headless" property to "false".

##Note

Puppeteer uses chrome driver and the tests will be executed only on Chrome.

#Task 2

https://github.com/ggaydarov/sumup-qa/blob/master/sumup-login-api.pdf

#Task 3

https://github.com/ggaydarov/sumup-qa/blob/master/task3.sql
