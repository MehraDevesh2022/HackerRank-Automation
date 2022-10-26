const puppeteer = require('puppeteer');
const code = require('./code');
const loginLink = "https://www.hackerrank.com/auth/login";
const codeArr = require('./code');

// temprory email
let email = "mefiv72384@abudat.com";
// password
const password = "devesh123";

console.log("before");
(async function (){
    const browserWillLaunchedPromise =await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized']
    });

    let newTabPromise =await browserWillLaunchedPromise.newPage();
    await newTabPromise.goto(loginLink);
    await newTabPromise.type("input[id ='input-1']" , email , {delay :200});
    await newTabPromise.type("input[id ='input-2']" , password , {delay : 100});
    await newTabPromise.click('button[data-analytics="LoginPassword"]' , {delay : 50});
    await waitAndClick('.topic-card>a[data-attr1="algorithms"]' , newTabPromise);
    await waitAndClick('input[value="warmup"]' ,newTabPromise );
    let allQuestionArrayPromise =await newTabPromise.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled");
    await questionSolver(newTabPromise , allQuestionArrayPromise[0] , codeArr.answers[0]);

 


})()



// this function wait for html to load and select the target selector and click on it
async function waitAndClick(selector, currentPage) {
     
      await currentPage.waitForSelector(selector);
      await currentPage.click(selector , {delay : 100});
   
    };

// error coming from question solver function

async function questionSolver(page, question, answer) {
   await question.click();
    await waitAndClick(".checkBoxWrapper .ui-checkbox.theme-m .label-wrap .checkbox-wrap", page);
    await page.type(".input.text-area.custominput.auto-width", answer, { delay: 10 })
    await page.keyboard.down("Control");
    await page.keyboard.press("A", { delay: 40 });
    await page.keyboard.press("X");
    await page.keyboard.up("Control");
    await waitAndClick(".hr-monaco-base-editor.showUnused .monaco-editor.no-user-select.vs", page);
    await page.keyboard.down("Control");
    await page.keyboard.press("A", { delay: 40 });
    await page.keyboard.press('V', { delay: 100 })
    await page.click('.hr-monaco__run-code');
    await page.waitForSelector('.testcase-item');
    await page.click('.hr-monaco-submit', { delay: 1000 });
    await waitAndClick('.ui-btn.ui-btn-normal.ui-btn-secondary.submission-wrapper-next-entity-btn.ui-btn-link.ui-btn-styled' , page);
    // await page.clkick('.align-left-conatiner .community-breadcrumb.text-content a[data-attr1="Warmup"]', {delay :50});
 
}

console.log("after");