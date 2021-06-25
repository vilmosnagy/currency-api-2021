<h1 align="center">Free Currency Rates API    </h1>

<p align="center">
  <img width="460" height="300" src="https://github.com/fawazahmed0/currency-api/raw/1/money.jpg">
</p>

[![](https://data.jsdelivr.com/v1/package/gh/fawazahmed0/currency-api/badge)](https://www.jsdelivr.com/package/gh/fawazahmed0/currency-api)
[![](https://data.jsdelivr.com/v1/package/gh/fawazahmed0/currency-api/badge/rank)](https://www.jsdelivr.com/package/gh/fawazahmed0/currency-api)
[![Fetch-Currencies](https://github.com/fawazahmed0/currency-api/actions/workflows/run.yml/badge.svg)](https://github.com/fawazahmed0/currency-api/actions/workflows/run.yml)
[![](https://img.shields.io/badge/Donate-Donate-orange)](https://fawazahmed0.github.io/donate.html?mymsg=Thanks%20for%20this%20API%2C%20I%20am%20Fawaz%20Ahmed%20(fawazahmed0)%20developer%20of%20this%20API%2C%20if%20you%20liked%20my%20work%20consider%20donating%20a%20few%20bucks%20to%20me%20or%20at%20least%20share%20it%20with%20friends%2C%20so%20they%20don%27t%20have%20to%20pay%20for%20any%20currency%20API%20Service%3Cbr%3E%20%3Cbr%3E%20Thanks%20in%20Advance&sharelink=https%3A%2F%2Fgithub.com%2Ffawazahmed0%2Fcurrency-api&smallsharetext=Free%20Currency%20Forex%20Rates%20API&largesharetext=Share%20the%20Free%20Currency%20Forex%20Rates%20API%20with%20150%2B%20Currencies%20Available%20%26%20No%20Rate%20Limits&sharebtnmsg=Share%20the%20Free%20Currency%20API&nodonatebtn=)

**In the name of God, who have guided me to do this work**


**Features:**
- Free & Blazing Fast response
- No Rate limits
- 150+ Currencies, Including Common Cryptocurrencies
- Daily Updated


**URL Structure:**

`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@{apiVersion}/{date}/{endpoint}`

**Formats:**

`date`

The date should either be `latest` or in `YYYY-MM-DD` format <br>
**Note:** Historical rates before `2020-11-22` are not available

The Endpoints Supports HTTP GET Method and returns the data in two formats:

`/{endpoint}.json`

`/{endpoint}.min.json`

The above formats also work for fallback i.e if `.min.json` link fails, you can use `.json` link and vice versa

**Endpoints:**

- `/currencies`<br>
> Lists all the available currencies in prettified json format:<br>
 [https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json](https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json") <br>

> Get a minified version of it:<br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json](https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json")

- `/currencies/{currencyCode}`<br>
> Get the currency list with EUR as base currency:<br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json](https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json") <br>

> Get the currency list with EUR as base currency on date 2020-11-24:<br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/2020-11-24/currencies/eur.json](https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/2020-11-24/currencies/eur.json "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/2020-11-24/currencies/eur.json") <br>

> Get the currency list with BTC as base currency:<br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/btc.json](https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/btc.json "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/btc.json") <br>

> Get the currency list with BTC as base currency in minified format:<br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/btc.min.json](https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/btc.min.json "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/btc.min.json") <br>

- `/currencies/{currencyCode}/{currencyCode}` <br>
> Get the currency value for EUR to JPY:<br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json](https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json")


### Any Issues: [Raise here](https://github.com/fawazahmed0/currency-api/issues/new "Raise here")

### Supporters 🎉:
I would like to thank all the Supporters who have donated:<br>

- Shaheen Alhumaydhi 

### Donate:
I keep the code to run this API service up to date, but it takes time to fix issues, when things fail.<br>
So, Please do consider donating, because I do have to spend time to make sure the Service keeps running :slightly_smiling_face::<br>
[Donate Link](https://fawazahmed0.github.io/donate.html?mymsg=Thanks%20for%20using%20this%20API%2C%20I%20am%20Fawaz%20Ahmed%20(fawazahmed0)%20developer%20of%20this%20tool.%20I%20made%20this%20API%2C%20so%20that%20people%20don%27t%20have%20to%20pay%20to%20get%20currency%20rates.%3Cbr%3E%3Cbr%3E%0AI%20keep%20the%20code%20to%20run%20this%20API%20service%20up%20to%20date%2C%20but%20it%20takes%20time%20to%20fix%20issues%2C%20when%20things%20fail.%20So%2C%20Please%20do%20consider%20donating%2C%20because%20I%20do%20have%20to%20spend%20time%20to%20make%20sure%20the%20Service%20keeps%20running%F0%9F%99%82%3Cbr%3E%3Cbr%3E%0A&sharelink=https%3A%2F%2Fgithub.com%2Ffawazahmed0%2Fcurrency-api%23readme&smallsharetext=Free%20Currency%20API&largesharetext=Free%20Currency%20Exchange%20Rates%20API%20with%20150%2B%20Currencies%20%26%20No%20Rate%20Limits%20&sharebtnmsg=Share%20the%20Free%20Currency%20Exchange%20Rates%20API%20with%20150%2B%20Currencies%20%26%20No%20Rate%20Limits%20&nodonatebtn=)


Also Please Star this repo by clicking on [:star: button](#) above [:arrow_upper_right:](#)

<br>
<br>
<br>

[:pencil2:*Improve this page*](https://github.com/fawazahmed0/currency-api/edit/1/README.md)

