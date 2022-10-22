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
    let passwordWillBeTypedPromise = page.type(
      "input[id ='input-2']",
      password,
      { delay: 100 }
    );
    return passwordWillBeTypedPromise;
  })
  .then(() => {
    // rember me marker clicked persented in page tab
    let rememberMeWillBeClickPromise = page.click(".checkbox-input");
    return rememberMeWillBeClickPromise;
  })
  .then(() => {
    // log in button clicked using page instance and attribute selector
    let loginButtonWillClicked = page.click(
      'button[data-analytics="LoginPassword"]'
    );
  });

console.log("after");
