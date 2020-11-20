const fs = require('fs')
const path = require('path')
// Requires for md5 hash generations for fonts to check duplicates
const {
    firefox
} = require('playwright')

// Global variables to access browser and page
let browser, page

// Page and browser is a global variable and it can be accessed from anywhere
// function that launches a browser
async function launchBrowser() {
    browser = await firefox.launch({
        headless: false
    })
    let context = await browser.newContext()
    page = await context.newPage()
}

//  Returns values against 1 dollar in curr:val format in an object, eg: inr:70.11
async function getBingCurrencies() {

    let link = "https://www.bing.com/search?q=1+usd+to+euro"
    await page.goto(link, {
        timeout: 60000
    })

    // Stores number of currencies in bing dropdown
    let currLen = await page.evaluate(() => document.querySelector("#tocurrdd > ul").children.length)
    // Stores the currencies in curr:val format : eg : inr:70.1
    let currObj = {}
    for (let i = 0; i <= currLen; i++) {
        // Wait for few random seconds
        let randomWaitTime = 3000
        await new Promise(r => setTimeout(r, getRandomNo(randomWaitTime)));

        // Have to select 1st option in dropdown in second loop also, after than use incremental values
        // This is done to select all the options in the dropdown, as the selected option get's disappeared
        let j = i == 0 ? 1 : i

        // Query that will select the dropdown value
        let queryStr = "#tocurrdd > ul > li:nth-child(" + j + ")"
        // currency name i.e usd etc
        let currName = await page.evaluate(queryStr => document.querySelector(queryStr).getAttribute("value"), queryStr);
        // click the dropdown option
        await page.evaluate(queryStr => { document.querySelector(queryStr).click() }, queryStr)
        // wait for page to load fully
        await page.waitForLoadState();

        // Go to intial page if #CurrencyAjaxResponse_FCR selector isn't found, as this means bing doesn't have value for that currency (maybe it's outdated currency)
        try {
            await page.waitForSelector('#CurrencyAjaxResponse_FCR', { state: 'attached' });

        } catch (error) {
            await page.goto(link)
            continue
        }


        // Get currency value i.e 1.66 etc
        let currVal = await page.$eval('#CurrencyAjaxResponse_FCR', e => e.textContent)

        // await page.waitForSelector('#cc_tv', { state: 'attached' });
        //let currVal = await page.evaluate(() => document.getElementById('cc_tv').getAttribute("value"))

        currObj[currName.toLowerCase()] = parseFloat(currVal)
        console.log('currName is ', currName)
        console.log('currVal is ', currVal)
    }


    return currObj
}

begin()


async function begin() {
    //launch the browser
    await launchBrowser()
    // Get bing currency values
  //  let bingCurrObj = await getBingCurrencies()
  //  console.log("bingvalu is ", bingCurrObj)
await test()
      // close the browser when everything is done
//  await browser.close();
}




// Returns random number, generates random less than the input argument
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomNo(max) {
    return Math.floor(Math.random() * Math.floor(max));
}



async function test(){
    let link = "https://google.com/search?q=1+usd+to+eur"
    await page.goto(link, {
        timeout: 60000
    })
    await page.evaluate(() => document.querySelectorAll('select')[1].setAttribute("id","myeditedcurrselector"))

        // Stores the currencies in curr:val format : eg : inr:70.1
        let currObj = {}
    
        let currLen = await page.evaluate(() =>  document.getElementById('myeditedcurrselector').children.length)
    console.log("currlen ",currLen)

    for (let i = 0; i < currLen; i++) {
        // Wait for few random seconds
        let randomWaitTime = 3000
        await new Promise(r => setTimeout(r, getRandomNo(randomWaitTime)));

        await page.evaluate(() => document.querySelectorAll('select')[1].setAttribute("id","myeditedcurrselector"))
    


await page.evaluate(() =>  document.querySelector('[data-exchange-rate]').remove())

await page.selectOption('#myeditedcurrselector', {index : i });



    await page.waitForSelector('[data-exchange-rate]', { state: 'attached' });

let currVal = await page.evaluate(() =>  document.querySelector('[data-exchange-rate]').getAttribute("data-exchange-rate"))
console.log("currval ",currVal)

let currName = await page.evaluate(i => document.querySelectorAll('select')[1][i].textContent,i)
console.log("currname ",currName)
currObj[currName.toLowerCase()] = parseFloat(currVal)
    }



console.log(currObj)
}
