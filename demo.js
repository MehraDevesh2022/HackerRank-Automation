const puppeteer = require("puppeteer");

console.log("before");
// this is promise returns chromium brwoser intsnace
let browserOpenPromise = puppeteer.launch({
  headless: false, // puppeteer bydeafult headless that mean it works but that action not visible therefore  headless: false required
  args: ["--start-maximized"], // for full screen of tab
  defaultViewport: null, // full viewoprt of screen
});
browserOpenPromise
  .then((brwoserInstance) => {
    let newTabPromise = brwoserInstance.newPage();
    return newTabPromise; // new tab promise instance
  })
  .then((newTabPromise) => {
    let linkedinOpenPromise = newTabPromise.goto(
      "https://www.linkedin.com/feed/"
    ); // linkdin page open promise using newTabPromise promise resolve
  });

console.log("after");
