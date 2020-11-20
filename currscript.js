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
    let googCurrObj = await getGoogCurrencies()
    console.log(googCurrObj)
    // close the browser when everything is done
    await browser.close();
}




// Returns random number, generates random less than the input argument
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomNo(max) {
    return Math.floor(Math.random() * Math.floor(max))
}



async function getGoogCurrencies() {

    let link = "https://google.com/search?q=1+usd+to+eur"
    await page.goto(link, {
        timeout: 60000
    })

    let uniqueSelectID = 'mySelectElem133'
    // Set unique id to second selector, so that I can easily access it using id
    await page.evaluate(uniqueSelectID => document.querySelectorAll('select')[1].setAttribute('id', uniqueSelectID), uniqueSelectID)

    // Stores the currencies in currencyName:val format : eg : indian rupee:70.1
    let currObj = {}
    // Stores number of currencies in bing dropdown
    let currLen = await page.evaluate(uniqueSelectID => document.getElementById(uniqueSelectID).children.length, uniqueSelectID)

    for (let i = 0; i < currLen; i++) {
        // Wait for few random seconds
        let randomWaitTime = 3000
        await new Promise(r => setTimeout(r, getRandomNo(randomWaitTime)));
        // Set unique id to second selector, so that I can easily access it using id
        await page.evaluate(uniqueSelectID => document.querySelectorAll('select')[1].setAttribute('id', uniqueSelectID), uniqueSelectID)

        // Remove the element containing the currency rate, so that we can wait for that element after selecting new currency

        await page.evaluate(() => document.querySelector('[data-exchange-rate]').remove())
        // Select the currency from dropdown
        await page.selectOption('#' + uniqueSelectID, { index: i });


        // wait for currency value to come
        await page.waitForSelector('[data-exchange-rate]', { state: 'attached' });
        // Get currency value
        let currVal = await page.evaluate(() => document.querySelector('[data-exchange-rate]').getAttribute("data-exchange-rate"))

        // Get currency name i.e Indian Rupee etc
        let currName = await page.evaluate(i => document.querySelectorAll('select')[1][i].textContent, i)

        currObj[currName.toLowerCase()] = parseFloat(currVal)
    }


    return currObj
}
