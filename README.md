<h1 align="center">Free Currency Rates API</h1>

<p align="center">
  <img width="460" height="300" src="https://github.com/fawazahmed0/currency-api/raw/1/money.jpg">
</p>

[![](https://data.jsdelivr.com/v1/package/gh/fawazahmed0/currency-api/badge)](https://www.jsdelivr.com/package/gh/fawazahmed0/currency-api)
[![](https://data.jsdelivr.com/v1/package/gh/fawazahmed0/currency-api/badge/rank)](https://www.jsdelivr.com/package/gh/fawazahmed0/currency-api)
[![Fetch-Currencies](https://github.com/fawazahmed0/currency-api/actions/workflows/run.yml/badge.svg)](https://github.com/fawazahmed0/currency-api/actions/workflows/run.yml)

------------

<div style="display: flex">
  <div>
    <div align="center">
      <a href="https://sendletter.org"
        ><img
          src="https://sendletter.org/original-icon.svg"
          width="150"
          alt="SendLetter Brand Image" /></a
      >
    </div>
  </div>
</div>

**Note:**  I would like to tell you about [SendLetter.org](https://sendletter.org), you can use it to Snail Mail 🐌 Forms, Documents, Letters 📄, Invoices, Statements, Invitations, Posters, Flyers, to anywhere in the world.
Have Documents Printed 🖨, Folded and Mailed by them 📮, starting at $1

Visit [SendLetter.org](https://sendletter.org) to know more

------------ 

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
**Note:** Historical rates are only available for last 1 year and some dates may [be missing](https://github.com/fawazahmed0/currency-api/issues/32)

The Endpoints Supports HTTP GET Method and returns the data in two formats:

`/{endpoint}.json`

`/{endpoint}.min.json`

The above formats also work for fallback i.e if `.min.json` link fails, you can use `.json` link and vice versa

**Warning:** You should include fallback mechanism in your code, [to avoid issues](https://github.com/fawazahmed0/currency-api/issues/45)

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

