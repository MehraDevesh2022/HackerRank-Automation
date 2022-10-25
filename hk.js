const puppeteer = require('puppeteer');
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
     

})()