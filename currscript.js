const fs = require('fs')
const path = require('path')
// Requires for md5 hash generations for fonts to check duplicates
const {
  firefox
} = require('playwright')

// Global variables to access browser and page
let browser, page

// stores consolidated currencies in currcode:currname format i.e USD:US Dollar
let allcurr = fs.readFileSync(path.join(__dirname, 'allcurrencies.min.json')).toString();
allcurr = JSON.parse(allcurr)

// spaces to be used for prettify/json.stringify
var prettyindent = 4

let allcurrUpper = {}
for(const [key, value] of Object.entries(allcurr))
allcurrUpper[key.toUpperCase()] = value

// stores  consolidated currencies in lowercased currname:currcode format i.e. us dollar:usd
let allcurrObj = {}
for(const [key, value] of Object.entries(allcurr))
allcurrObj[value.toLowerCase()] = key.toLowerCase()


// Page and browser is a global variable and it can be accessed from anywhere
// function that launches a browser
async function launchBrowser () {
  browser = await firefox.launch({
    headless: false
  })
  const context = await browser.newContext()
  page = await context.newPage()
}

//  Returns values against 1 dollar in curr:val format in an object, eg: inr:70.11
async function getBingCurrencies () {
  const link = 'https://www.bing.com/search?q=1+usd+to+euro'
  await page.goto(link, {
    timeout: 60000
  })

  // Stores number of currencies in bing dropdown
  const currLen = await page.evaluate(() => document.querySelector('#tocurrdd > ul').children.length)
  // Stores the currencies in curr:val format : eg : inr:70.1
  const currObj = {}
  for (let i = 170; i <= currLen; i++) {
    // Wait for few random seconds
    const randomWaitTime = 3000
    await new Promise(r => setTimeout(r, getRandomNo(randomWaitTime)))

    // Have to select 1st option in dropdown in second loop also, after than use incremental values
    // This is done to select all the options in the dropdown, as the selected option get's disappeared
    const j = i === 0 ? 1 : i

    // Query that will select the dropdown value
    const queryStr = '#tocurrdd > ul > li:nth-child(' + j + ')'
    // currency name i.e usd etc
    const currName = await page.evaluate(queryStr => document.querySelector(queryStr).getAttribute('value'), queryStr)
    // click the dropdown option
    await page.evaluate(queryStr => { document.querySelector(queryStr).click() }, queryStr)
    // wait for page to load fully
    await page.waitForLoadState()

    // Go to intial page if #CurrencyAjaxResponse_FCR selector isn't found, as this means bing doesn't have value for that currency (maybe it's outdated currency)
    try {
      await page.waitForSelector('#CurrencyAjaxResponse_FCR', { state: 'attached' })
    } catch (error) {
      await page.goto(link)
      continue
    }

    // Get currency value i.e 1.66 etc
    const currVal = await page.$eval('#CurrencyAjaxResponse_FCR', e => e.textContent)

    // await page.waitForSelector('#cc_tv', { state: 'attached' });
    // let currVal = await page.evaluate(() => document.getElementById('cc_tv').getAttribute("value"))

    currObj[currName.toLowerCase()] = parseFloat(currVal)
   
  }

  return currObj
}

begin()

async function begin () {
  // launch the browser
  await launchBrowser()
 await test()
  // Get bing currency values
  //  let bingCurrObj = await getBingCurrencies()
  //  console.log("bingvalu is ", bingCurrObj)
  //const googCurrObj = await getGoogCurrencies()
  //console.log(googCurrObj)
  // close the browser when everything is done
  await browser.close()
}

// Returns random number, generates random less than the input argument
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomNo (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

//  Returns values against 1 dollar in  curr:val format in an object, eg: inr:70.11
async function getGoogCurrencies () {
  const link = 'https://google.com/search?q=1+usd+to+eur'
  await page.goto(link, {
    timeout: 60000
  })

  const uniqueSelectID = 'mySelectElem133'
  // Set unique id to second selector, so that I can easily access it using id
  await page.evaluate(uniqueSelectID => document.querySelectorAll('select')[1].setAttribute('id', uniqueSelectID), uniqueSelectID)

  // Stores the currencies in currencyName:val format : eg : indian rupee:70.1
  const currObj = {}
  // Stores number of currencies in bing dropdown
  const currLen = await page.evaluate(uniqueSelectID => document.getElementById(uniqueSelectID).children.length, uniqueSelectID)

  for (let i = 145; i < currLen; i++) {
    // Wait for few random seconds
    const randomWaitTime = 3000
    await new Promise(r => setTimeout(r, getRandomNo(randomWaitTime)))
    // Set unique id to second selector, so that I can easily access it using id
    await page.evaluate(uniqueSelectID => document.querySelectorAll('select')[1].setAttribute('id', uniqueSelectID), uniqueSelectID)

    // Remove the element containing the currency rate, so that we can wait for that element after selecting new currency

    await page.evaluate(() => document.querySelector('[data-exchange-rate]').remove())
    // Select the currency from dropdown
    await page.selectOption('#' + uniqueSelectID, { index: i })

    // wait for currency value to come
    await page.waitForSelector('[data-exchange-rate]', { state: 'attached' })
    // Get currency value
    const currVal = await page.evaluate(() => document.querySelector('[data-exchange-rate]').getAttribute('data-exchange-rate'))

    // Get currency name i.e Indian Rupee etc
    const currName = await page.evaluate(i => document.querySelectorAll('select')[1][i].textContent, i)
    // Make sure there isn't any undefined values in here   
    const currCodeName = allcurrObj[currName.toLowerCase()]
    // For future stability getting currency list from bing will be good idea to avoid this sort of error
    if(currCodeName === undefined)
     throw 'Currency code not defined, maybe its a new currency'
    currObj[allcurrObj[currName.toLowerCase()]] = parseFloat(currVal)
  }

  return currObj
}

// lists all the curr avaible.json
async function test(){
 
  const bingCurrObj = await getBingCurrencies()

  const googCurrObj = await getGoogCurrencies()


 let googBingCurrObj = {...googCurrObj, ...bingCurrObj}

 let currlistJSON = {}

 for(const [key, value] of Object.entries(googBingCurrObj))
  currlistJSON[key] =  allcurrUpper[key.toUpperCase()]

 

 console.log("googbingcurrobj\n",googBingCurrObj)

 console.log("currlistjsin\n",currlistJSON)

 fs.writeFileSync(path.join(__dirname, "currencies.min.json"), JSON.stringify(currlistJSON))

 fs.writeFileSync(path.join(__dirname, "currencies.json"), JSON.stringify(currlistJSON, null, prettyindent))

}
