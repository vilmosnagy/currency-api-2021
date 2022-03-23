<h1 align="center">Free Currency Rates API</h1>

<p align="center">
  <img width="460" height="300" src="https://github.com/fawazahmed0/currency-api/raw/1/money.jpg">
</p>

[![](https://data.jsdelivr.com/v1/package/gh/fawazahmed0/currency-api/badge)](https://www.jsdelivr.com/package/gh/fawazahmed0/currency-api)
[![](https://data.jsdelivr.com/v1/package/gh/fawazahmed0/currency-api/badge/rank)](https://www.jsdelivr.com/package/gh/fawazahmed0/currency-api)
[![Fetch-Currencies](https://github.com/fawazahmed0/currency-api/actions/workflows/run.yml/badge.svg)](https://github.com/fawazahmed0/currency-api/actions/workflows/run.yml)


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

**Note:** You should include fallback mechanism in your code, [to avoid issues](https://github.com/fawazahmed0/currency-api/issues/32#issuecomment-985308286)

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

### To Add New Crypto Currency: [See This](https://github.com/fawazahmed0/currency-api/issues/41)

### Any Issues: [Raise here](https://github.com/fawazahmed0/currency-api/issues/new "Raise here")

### Supporters 🎉:
I would like to thank all the Supporters who have helped in supporting this tool:<br>

- Shaheen Alhumaydhi 
- Kaushal Parashar
- Lury Williams
- Fernando Toribio
- Oleg Belozerov


Please Star this repo by clicking on [:star: button](#) above [:arrow_upper_right:](#)

<br>
<br>
<br>

[:pencil2:*Improve this page*](https://github.com/fawazahmed0/currency-api/edit/1/README.md)

