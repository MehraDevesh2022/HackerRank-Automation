const puppeteer = require("puppeteer"); 
const loginLink = "https://www.hackerrank.com/auth/login";
const code = require("./code");
// temprory email
let email = "mefiv72384@abudat.com";
// password
const password = "devesh123";
let page;
console.log("before");
// puppeteer launch returns the chromium browser open promise
let browserWillbeLauncedPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
});

browserWillbeLauncedPromise
  .then(function (brwoserInstance) {
    let newTabPromise = brwoserInstance.newPage();

    // newTabPromise instance added into page  for further use
    return newTabPromise;
  })
  .then(function (newTabPromise) {
    // inside the page newTabPromise instance added for further  use
    page = newTabPromise; // hackerrank tab is inside of newTabPromise
    let pageWillbeOpenedPromise = newTabPromise.goto(loginLink);
    return pageWillbeOpenedPromise;
  })
  .then(function () {
    // email typeing promise used using page instance becuase inside of page hackerrank tab insatnce saved .
    let emailWillBeTypedPromise = page.type(
      'input[id="input-1"]',
      // input area selected using attriubute selector
      email, { delay: 100, }); // dealy for latter type

    return emailWillBeTypedPromise;
  })

  .then(() => {
    // password typed with page instance . using attribute selector
    // type() method used for type the text on text filed
    let passwordWillBeTypedPromise = page.type(
      "input[id ='input-2']",
      password,
      { delay: 100 }
    );
    return passwordWillBeTypedPromise;
  })
  .then(() => {
    // rember me marker clicked persented in page tab
    let rememberMeWillBeClickPromise = page.click(".checkbox-input", {
      delay: 80,
    });
    return rememberMeWillBeClickPromise;
  })
  .then(() => {
    // log in button clicked using page instance and attribute selector
    // click()  method used for click  the target area
    let loginButtonWillClicked = page.click(
      'button[data-analytics="LoginPassword"]',
      { delay: 50 }
    );
    return loginButtonWillClicked;
  })
  .then(() => {
    // page tab instance is currently in hackerrank log in stage and when clicked on log in button this will load the page and take a time for goto next page
    // therefore we need to wait for next promoise accomplishment untill html not laoded  main page of hackerrank website
    // after loadding main page we will select algorithm(available in page instance) using selector
    // for that we using function waitAndclick and passing css selector of algorithm section in main page and current state (log in page) of page instance'
    let algoSecClickedPromise = waitAndClick(
      '.topic-card>a[data-attr1="algorithms"]',
      page
    );
    return algoSecClickedPromise;
  })
  .then(function () {
    // now page instanse in Main page of hacerrank and algorithm section is clicked and loading now we need to click on warm up check box inside of  algorithm section for loading time we using waitAndClick() function
    let warmUppWillBeClikedPromise = waitAndClick(
      'input[value="warmup"]',
      page
    );
    return warmUppWillBeClikedPromise;
  })
  .then(function () {
    // now select all 9 question in warm up section from algrothim
    // $$ is  method for selecting multiple values using selector and store in array formate
    let selectAllquestionPromise = page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled"
    );

    return selectAllquestionPromise;
  })
  .then(function (totalQuestions) {

    let questionWillBeSolvedPromise = questionSolver(
      page,
      totalQuestions[0],
      code.answers[0]
    );

    return questionWillBeSolvedPromise;
  });

// this function wait for html to load and select the target selector and click on it
function waitAndClick(selector, currentPage) {
  //  create a promise for wait and select  to a selector when html laoded in currentPage
  return new Promise(function (resolve, reject) {
    // waitForSelector() method is provided by pupeeteer for wait unitll the currentPage html not matched target selector
    let waitToLoadPromise = currentPage.waitForSelector(selector);
    // once html loaded and selector matched then click on it
    waitToLoadPromise
      .then(function () {
        let clickAfterLoad = currentPage.click(selector, { delay: 200 });
        return clickAfterLoad;
      })
      .then(function () {
        resolve();
      })
      .catch(function () {
        reject();
      });
  });
}

function questionSolver(Page, question, answer) {
    return new Promise(function (resolve, reject) {
        let questionWillClickedPromise = question.click();
        questionWillClickedPromise.then(function () {
            let customInputBoxClickedPromise = waitAndClick(".checkBoxWrapper .ui-checkbox.theme-m .label-wrap .checkbox-wrap", page);
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
        }) .then(function(){
          return page.click('.hr-monaco-submit' , {delay : 1000});
        }).then(function(){
          return page.waitForSelector('.submission-wrapper-next-entity-btn');
        }).then(function(){
          resolve();
        }).catch(function(err){
          console.log(err);
        })

    })
}

