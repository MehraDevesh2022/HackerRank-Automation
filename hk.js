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
    console.log(allQuestionArrayPromise.length);
     
    await questionSolver(newTabPromise , allQuestionArrayPromise[0] , code[0]);




})()



// this function wait for html to load and select the target selector and click on it
async function waitAndClick(selector, currentPage) {
     
      await currentPage.waitForSelector(selector);
      await currentPage.click(selector , {delay : 100});
   
    };


function questionSolver(Page, question, answer) {
    return new Promise(function (resolve, reject) {
        let questionWillClickedPromise = question.click();
        questionWillClickedPromise.then(function () {
            let customInputBoxClickedPromise = waitAndClick(".checkBoxWrapper .ui-checkbox.theme-m .label-wrap .checkbox-wrap", Page);
            return customInputBoxClickedPromise;
        }).then(function () {
            return page.type(".input.text-area.custominput.auto-width", answer, { delay: 10 })
        }).then(function () {
            let ctrlIsPressedPromise = page.keyboard.down("Control");
            return ctrlIsPressedPromise;
        }).then(function () {
            let AisPressedPromise = page.keyboard.press("A", { delay: 40 });
            return AisPressedPromise;
        }).then(function () {
            let XisPressedPromise = page.keyboard.press("X");
            return XisPressedPromise;
        }).then(function () {
            let ctrlKeyUpPromoise = page.keyboard.up("Control");
            return ctrlKeyUpPromoise;
        }).then(function () {
            let eidtorSectionClickedPromise = waitAndClick(
                ".hr-monaco-base-editor.showUnused .monaco-editor.no-user-select.vs", page);
            return eidtorSectionClickedPromise;
        }).then(function () {
            let ctrlIsPressedPromise = page.keyboard.down("Control");
            return ctrlIsPressedPromise;
        }).then(function () {
            let AisPressedPromise = page.keyboard.press("A", { delay: 40 });
            return AisPressedPromise;
        }).then(function () {
            return page.keyboard.press('V', { delay: 100 })

        })
            .then(function () {
                return page.click('.hr-monaco__run-code');
            }).then(function () {
                return page.waitForSelector('.testcase-item');
            }).then(function () {
                return page.click('.hr-monaco-submit', { delay: 1000 });
            }).then(function () {
                return page.waitForSelector('.submission-wrapper-next-entity-btn');
            }).then(function () {
                resolve();
            }).catch(function (err) {
                console.log(err);
            })

    })
}

console.log("after");