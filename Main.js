const puppeteer = require("puppeteer");
const loginLink = "https://www.hackerrank.com/auth/login";
let email = "mefiv72384@abudat.com";
const password = "devesh123";
let page;
console.log("before");

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
     page = newTabPromise;
    let pageWillbeOpenedPromise = newTabPromise.goto(loginLink);
    return pageWillbeOpenedPromise;
  })
  .then(function () {
   let emailWillBeTypedPromise = page.type('input[id="input-1"]' , email , {delay : 200})

   return emailWillBeTypedPromise; 
  }).then(()=>{
    let passwordWillBeTypedPromise = page.type("input[id ='input-2']" , password , {delay : 150});
    return passwordWillBeTypedPromise
  })

  console.log("after");
