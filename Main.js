const puppeteer = require('puppeteer');

let browserOpenPromise = puppeteer.launch({
    headless : false,
    args : ['--start-minimization'],
    defaultViewport : null
})

browserOpenPromise.then((brwoserInstance) =>{
 let newTabPromise= brwoserInstance.newPage();
 return newTabPromise
}).then((newTabPromise)=>{
    let hackerrankPagePromise = newTabPromise.goto("https://www.hackerrank.com/");

})