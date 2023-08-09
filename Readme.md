# HackerRank Automation using Puppeteer

## Introduction to Puppeteer

Puppeteer is a powerful Node.js library used for automating and streamlining frontend development and testing processes. It provides a high-level API to control the Chrome or Chromium browser using the DevTools Protocol. Puppeteer is often used in headless mode, meaning it operates without a visible browser window. It's well-suited for tasks like web scraping, form filling, taking screenshots, and automating interactions with web pages.

[![Puppeteer Logo](https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png)](https://pptr.dev/)

## Project Goals

The aim of this project is to automate various tasks on the HackerRank platform using Puppeteer. Specifically, the project focuses on achieving the following goals:

1. Launch the Chromium browser to interact with web pages programmatically.
2. Automate the process of logging in using your email address and password on the HackerRank authentication page.
3. Select a Data Structures and Algorithms (DSA) problem and provide a solution to it.
4. Once the solution is entered, automate the submission process.

## Installation

To use Puppeteer in your project, make sure you have [Node.js](https://nodejs.org/) installed. Then, follow these steps:

1. Open your terminal or command prompt.
2. Navigate to your project directory.
3. Run the following command to install Puppeteer:

```sh
npm install puppeteer
# or using yarn
# yarn add puppeteer
# or using pnpm
# pnpm install puppeteer

```

## Usage
To use Puppeteer in your JavaScript file, require the puppeteer module:

```js

const puppeteer = require('puppeteer');

``` 

## Running the Automation
 - To run the automation script, follow these steps:

   1. Create a JavaScript file (e.g., hackerrank-automation.js) in your project directory.
   2. Write your Puppeteer automation code in this file.
   3. Open your terminal or command prompt.
   4. Navigate to your project directory.
   5. Run the following command to execute your script:

```sh   
node hackerrank-automation.js
```

 - This will execute your Puppeteer automation, performing the specified tasks on the HackerRank platform.

 - Please note that while this document provides a basic overview of Puppeteer and its usage for HackerRank automation, you can further customize your automation script to suit your specific needs.

 - Remember to handle sensitive information (like passwords) securely and responsibly when implementing such automation scripts.

 ## Contributing
  
   Feel free to contribute to this project. You can fork the repository, make your changes, and submit a pull request. 
   