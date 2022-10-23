const puppeteer = require("puppeteer");
const loginLink = "https://www.hackerrank.com/auth/login";
// temprory email 
let email = "mefiv72384@abudat.com";
// 
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
    let emailWillBeTypedPromise = page.type('input[id="input-1"]', email, { // input area selected using attriubute selector 
      delay: 100, // dealy for latter type
    });

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
    let rememberMeWillBeClickPromise = page.click(".checkbox-input", {delay : 80});
    return rememberMeWillBeClickPromise;
  })
  .then(() => {
    // log in button clicked using page instance and attribute selector
    // click()  method used for click  the target area
    let loginButtonWillClicked = page.click(
      'button[data-analytics="LoginPassword"]'
     , {delay : 50});
     return loginButtonWillClicked
  }).then(() =>{
    // page tab instance is currently in hackerrank log in stage and when clicked on log in button this will load the page and take a time for goto next page
    // therefore we need to wait for next promoise accomplishment untill html not laoded  main page of hackerrank website
    // after loadding main page we will select algorithm(available in page instance) using selector  
    // for that we using function waitAndclick and passing css selector of algorithm section in main page and current state (log in page) of page instance' 
    let algoSecClickedPromise = waitAndClick('.topic-card>a[data-attr1="algorithms"]',page);
    return algoSecClickedPromise
  }).then(function(){
    // now page instanse in Main page of hacerrank and algorithm section is clicked and loading now we need to click on warm up check box inside of  algorithm section for loading time we using waitAndClick() function   
    let warmUppWillBEClikedPromise = waitAndClick('input[value="warmup"]' , page);
    return warmUpWillBeClikedPromise;
  }).then(function(){
    console.log('warmUpSectionClicked');
  })




// this function wait for html to load and select the target selector and click on it
  function waitAndClick(selector , currentPage){
    //  create a promise for wait and select  to a selector when html laoded in currentPage
    return new Promise(function(resolve , reject){
      // waitForSelector() method is provided by pupeeteer for wait unitll the currentPage html not matched target selector
      let waitToLoadPromise = currentPage.waitForSelector(selector);
      // once html loaded and selector matched then click on it
      waitToLoadPromise
        .then(function () {
          let clickAfterLoad = currentPage.click(selector, { delay: 100 });
          return clickAfterLoad;
        })
        .then(function () {
          resolve();
        })
        .catch(function () {
          reject();
        });
    })
  }

console.log("after");
