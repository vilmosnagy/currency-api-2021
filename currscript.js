
const fs = require('fs-extra')
const path = require('path')
// Requires for md5 hash generations for fonts to check duplicates
const {
  firefox
} = require('playwright')

// Global variables to access browser
let browser

// spaces to be used for prettify/json.stringify
const indent = 4

// curr means currency
// stores consolidated currencies in currcode:currname format i.e USD:US Dollar
let allcurr = fs.readFileSync(path.join(__dirname, 'allcurrencies.min.json')).toString()
allcurr = JSON.parse(allcurr)

// Takes allcurr and have all the keys in uppercase
const allcurrKeyUpper = {}
for (const [key, value] of Object.entries(allcurr)) { allcurrKeyUpper[key.toUpperCase()] = value }

// Takes allcurr and store in lowercase currname:currcode format i.e. us dollar:usd
const allcurrLower = {}
for (const [key, value] of Object.entries(allcurr)) { allcurrLower[value.toLowerCase()] = key.toLowerCase() }

// Page and browser is a global variable and it can be accessed from anywhere
// function that launches a browser
async function launchBrowser () {
  browser = await firefox.launch({
    headless: true
  })
}

//  Returns values against 1 dollar in curr:val format in an object, eg: inr:70.11
async function getBingCurrencies () {
  const context = await browser.newContext()
  const page = await context.newPage()

  const link = 'https://www.bing.com/search?q=1+usd+to+euro'
  await page.goto(link, {
    timeout: 60000
  })

  // Stores number of currencies in bing dropdown
  const currLen = await page.evaluate(() => document.querySelector('#tocurrdd > ul').children.length)
  // Stores the currencies in curr:val format : eg : inr:70.1
  const currObj = {}
  for (let i = 0; i <= currLen; i++) {
    // Wait for few random seconds
    const randomWaitTime = 3000
    await new Promise(resolve => setTimeout(resolve, getRandomNo(randomWaitTime)))

    // Have to select 1st option in dropdown in second loop also, after than use incremental values
    // This is done to select all the options in the dropdown, as the selected option gets disappeared
    const j = i === 0 ? 1 : i

    // Query that will select the dropdown value
    const queryStr = '#tocurrdd > ul > li:nth-child(' + j + ')'
    // currency name i.e usd etc
    const currName = await page.evaluate(queryStr => document.querySelector(queryStr).getAttribute('value'), queryStr)
    // click the dropdown option
    await page.evaluate(queryStr => { document.querySelector(queryStr).click() }, queryStr)
    // wait for page to load fully
    await page.waitForLoadState('load', { timeout: 60000 })

    // Go to initial page if #CurrencyAjaxResponse_FCR selector isn't found, as this means bing doesn't have value for that currency (maybe it's outdated currency)
    try {
      await page.waitForSelector('#CurrencyAjaxResponse_FCR', { state: 'attached', timeout: 2000 })
    } catch (error) {
      await page.goto(link, {
        timeout: 60000
      })
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
// Begins the program
async function begin () {
  // launch the browser
  await launchBrowser()

  // Backup the latest currency files to date folder, for historical currency access
  // Todays date
  const date = new Date()
  // Set the date to yesterday
  date.setDate(date.getDate() - 1)
  // Get yesterdays date in YYYY-MM-DD format
  const dateYesterday = date.toISOString().substring(0, 10)
  const dateDir = path.join(__dirname, dateYesterday)
  const latestDir = path.join(__dirname, 'latest')
  fs.mkdirSync(dateDir, {
    recursive: true
  })
  fs.copySync(latestDir, dateDir)

  // google & bing currencies against 1 usd
  const googBingCurrJSON = await getGoogBingCurrencies()
  // Get & Save All the available currencies in api
  const availCurrListObj = await getAvailCurrencyJSON(googBingCurrJSON)
  fs.writeFileSync(path.join(latestDir, 'currencies.min.json'), JSON.stringify(availCurrListObj))
  fs.writeFileSync(path.join(latestDir, 'currencies.json'), JSON.stringify(availCurrListObj, null, indent))

  // Generate API files using // google & bing currencies against 1 usd
  await generateFiles(googBingCurrJSON)
  // Close the browser
  await browser.close()
}

// Returns random number, generates random less than the input argument
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomNo (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

//  Returns values against 1 dollar in  curr:val format in an object, eg: inr:70.11
async function getGoogCurrencies () {
  const context = await browser.newContext()
  const page = await context.newPage()

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

  for (let i = 0; i < currLen; i++) {
    // Wait for few random seconds
    const randomWaitTime = 3000
    await new Promise(resolve => setTimeout(resolve, getRandomNo(randomWaitTime)))
    // Set unique id to second selector, so that I can easily access it using id
    await page.evaluate(uniqueSelectID => document.querySelectorAll('select')[1].setAttribute('id', uniqueSelectID), uniqueSelectID)

    // Remove the element containing the currency rate, so that we can wait for that element after selecting new currency

    await page.evaluate(() => document.querySelector('[data-exchange-rate]').remove())
    // Select the currency from dropdown
    await page.selectOption('#' + uniqueSelectID, { index: i })
    try {
      // wait for currency value to come
      await page.waitForSelector('[data-exchange-rate]', { state: 'attached', timeout: 60000 })
    } catch (error) {
      await page.goto(link, {
        timeout: 60000
      })
      // Ignore the currency if it doesn't come, happens with cuban peso
      continue
    }

    // Get currency value
    const currVal = await page.evaluate(() => document.querySelector('[data-exchange-rate]').getAttribute('data-exchange-rate'))

    // Get currency name i.e Indian Rupee etc
    const currName = await page.evaluate(i => document.querySelectorAll('select')[1][i].textContent, i)

    const currCodeName = allcurrLower[currName.toLowerCase()]

    // Make sure there isn't any undefined values in here
    // For future stability getting currency list from bing will be good idea to avoid this sort of error
    if (currCodeName === undefined) {
      console.log('Currency code not defined for ' + currName + ', its value needs to be added in allcurrencies json file')
      continue
    }

    currObj[currCodeName] = parseFloat(currVal)
  }

  return currObj
}

// Returns all the available currencies in the API
async function getAvailCurrencyJSON (googBingCurrObj) {
  const availCurrListObj = {}
  for (const key of Object.keys(googBingCurrObj)) { availCurrListObj[key] = allcurrKeyUpper[key.toUpperCase()] }

  return availCurrListObj
}

async function getGoogBingCurrencies () {
  // Fetch google and bing currency list concurrently
  const [googCurrObj, bingCurrObj] = await Promise.all([getGoogCurrencies(), getBingCurrencies()])
  // Currencies from google gets more priority than bing, as the later object overwrites by first object values
  const googBingCurrJSON = { ...bingCurrObj, ...googCurrObj, usd: 1 }
  // return sorted object
  return sortObjByKeys(googBingCurrJSON)
}

// Sorts an object by keys and returns the sorted object
function sortObjByKeys (obj) {
  const sortedObj = {}
  const sortedKeys = Object.keys(obj).sort()
  for (const key of sortedKeys) { sortedObj[key] = obj[key] }
  return sortedObj
}

// Generates the api files
async function generateFiles (googBingCurrJSON) {
  const currenciesDir = path.join(__dirname, 'latest', 'currencies')
  for (const [fromKey, fromValue] of Object.entries(googBingCurrJSON)) {
    const tempObj = {}
    tempObj[fromKey] = {}
    const fromKeyDir = path.join(__dirname, 'latest', 'currencies', fromKey)
    fs.mkdirSync(fromKeyDir, {
      recursive: true
    })

    for (const [toKey, toValue] of Object.entries(googBingCurrJSON)) {
      const tempSingleObj = {}
      tempObj[fromKey][toKey] = currencyValue(fromValue, toValue)
      tempSingleObj[toKey] = tempObj[fromKey][toKey]
      fs.writeFileSync(path.join(fromKeyDir, toKey + '.min.json'), JSON.stringify(tempSingleObj))
      fs.writeFileSync(path.join(fromKeyDir, toKey + '.json'), JSON.stringify(tempSingleObj, null, indent))
    }
    fs.writeFileSync(path.join(currenciesDir, fromKey + '.min.json'), JSON.stringify(tempObj))
    fs.writeFileSync(path.join(currenciesDir, fromKey + '.json'), JSON.stringify(tempObj, null, indent))
  }
}

// return 1 fromCurr as base currency for toCurr
// fromCurr & toCurr is against 1 USD
// For example, if you pass 74 INR & 0.84 EUR and 1 INR = 0.011 Eur
// It returns 0.011 , with numbers upto 6 decimal places
function currencyValue (fromCurr, toCurr) {
  return parseFloat((toCurr / fromCurr).toFixed(6))
}
