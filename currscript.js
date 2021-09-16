const fs = require('fs-extra')
const path = require('path')
const fetch = require('node-fetch')


// spaces to be used for prettify/json.stringify
const indent = 4

// By market capitalization
// Ref: https://coinmarketcap.com/all/views/all/
let topCryptoCurrency = ["BTC","ETH","ADA","BNB","USDT","XRP","SOL","DOT","DOGE","USDC","UNI","LUNA","LINK","AVAX","LTC","BUSD","BCH","ALGO","WBTC","ICP","MATIC","FIL","TRX","FTT","XLM","VET","ATOM","ETC","THETA","DAI"]

let currLink, cryptoLink
if (process.env.CI) {
  currLink = process.env.currlink
  cryptoLink = process.env.cryptolink
} else {
  [currLink, cryptoLink] = fs.readFileSync(path.join(__dirname, 'links.ini')).toString().split(/\r?\n/).map(e => e.trim())
}
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

const dateToday = new Date().toISOString().substring(0, 10)


begin()
// Begins the program
async function begin() {
  // launch the browser
 // await launchBrowser()

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

  const currJSON = await getCurrencies()
  // Get & Save All the available currencies in api
  const availCurrListObj = await getAvailCurrencyJSON(currJSON)
  fs.writeFileSync(path.join(latestDir, 'currencies.min.json'), JSON.stringify(availCurrListObj))
  fs.writeFileSync(path.join(latestDir, 'currencies.json'), JSON.stringify(availCurrListObj, null, indent))

  // Generate API files
  await generateFiles(currJSON)
  // Close the browser
//  await browser.close()
}


// Returns all the available currencies in the API
async function getAvailCurrencyJSON(CurrObj) {
  const availCurrListObj = {}
  for (const key of Object.keys(CurrObj)) { 
    availCurrListObj[key] = allcurrKeyUpper[key.toUpperCase()] || ""
    if(!allcurrKeyUpper[key.toUpperCase()])
    console.log(key,"currency code doesn't exist in allcurrencies.min.json")
   }

  return availCurrListObj
}

async function getCurrencies() {
let currDataObj = await getCurrData()
currDataObj = toLowerCaseKeysBaseCurr(currDataObj)

let cryptoDataObj = await getCryptoData()
// we also need to convert base usd to eur
cryptoDataObj = toLowerCaseKeysBaseCurr(cryptoDataObj,currDataObj['usd'])
  const CurrJSON = { ...cryptoDataObj, ...currDataObj, eur: 1 }
  // return sorted object
  return sortObjByKeys(CurrJSON)
}

// Euro as base rates
async function getCurrData(){
  let response = await fetch(currLink)
  let data = await response.json()
  return data.rates
}

// USD as base rates
async function getCryptoData(){
  let response = await fetch(cryptoLink)
  let data = await response.json()
  return Object.fromEntries(                                                           // Dividing value by 1 to convert to 1 USD as base rate
    Object.entries(data.rates).filter(([k, v]) => topCryptoCurrency.includes(k)).map(([k,v])=>[k,1/v]) )
}

// convert object keys to lowercase and values to float
// tocurr parameter
// convert object having a base currency value to object of another base currency value
// For example: pass object with base currency as usd, pass tocurr as 1Eur to 1.17USD i.e 1.17 to convert object to base currency as EUR
function toLowerCaseKeysBaseCurr(obj, tocurr=1){
tocurr = parseFloat(tocurr)
let newobj = {}
for(let [key,value] of Object.entries(obj))
    newobj[key.toLowerCase()] = parseFloat(value)*tocurr
return newobj
}


// Sorts an object by keys and returns the sorted object
function sortObjByKeys(obj) {
  const sortedObj = {}
  const sortedKeys = Object.keys(obj).sort()
  for (const key of sortedKeys) { sortedObj[key] = obj[key] }
  return sortedObj
}

// Generates the api files
async function generateFiles(googBingCurrJSON) {
  const currenciesDir = path.join(__dirname, 'latest', 'currencies')
  for (const [fromKey, fromValue] of Object.entries(googBingCurrJSON)) {
    const tempObj = {}
    tempObj['date'] = dateToday;
    tempObj[fromKey] = {}
    const fromKeyDir = path.join(__dirname, 'latest', 'currencies', fromKey)
    fs.mkdirSync(fromKeyDir, {
      recursive: true
    })

    for (const [toKey, toValue] of Object.entries(googBingCurrJSON)) {
      const tempSingleObj = {}
      tempObj[fromKey][toKey] = currencyValue(fromValue, toValue)
      tempSingleObj['date'] = dateToday;
      tempSingleObj[toKey] = tempObj[fromKey][toKey]
      fs.writeFileSync(path.join(fromKeyDir, toKey + '.min.json'), JSON.stringify(tempSingleObj))
      fs.writeFileSync(path.join(fromKeyDir, toKey + '.json'), JSON.stringify(tempSingleObj, null, indent))
    }
    fs.writeFileSync(path.join(currenciesDir, fromKey + '.min.json'), JSON.stringify(tempObj))
    fs.writeFileSync(path.join(currenciesDir, fromKey + '.json'), JSON.stringify(tempObj, null, indent))
  }
}

// return 1 fromCurr as base currency for toCurr
// fromCurr & toCurr is against 1 USD or 1 EUR or something common
// For example, if you pass 74 INR & 0.84 EUR and 1 INR = 0.011 Eur
// It returns 0.011 , with numbers upto 6 decimal places
function currencyValue(fromCurr, toCurr) {
  return parseFloat((toCurr / fromCurr).toFixed(6))
}
