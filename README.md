### Currency API                                                                                     
**In the name of God, who have guided me to do this work and I seek refuge in him from the evil of everything***

This is a Free Currency Exchange Rates API

**Features:**
- Free & Blazing Fast response
- No Rate limits
- 150+ Currencies, Including Common Crypto Currencies
- Daily Updated


**URL Structure:**

`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@{apiVersion}/{date}/{endpoint}`


**Formats:**

`date`<br>
The date should be either `latest` or in `YYYY-MM-DD` format <br>
**Note:** Historical rates before `22-11-2020` are not available

The Endpoints Supports HTTP GET Method and returns the data in two formats:

`/{endpoint}.json`

`/{endpoint}.min.json`

**Endpoints:**

- `/currencies`<br>
> Lists all the available currencies in prettified json format:<br>
 [https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json](https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json") <br>

> Get a minified version of it:<br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json](https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json")

- `/currencies/{currencyCode}`<br>
> Get the currency list with EUR as base currency:<br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json](https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json") <br>


- `/currencies/{currencyCode}/{currencyCode}` <br>
> Get EUR to JPY list:<br>
[https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json](https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json")


### Any Issues: [Raise here](https://github.com/fawazahmed0/currency-api/issues/new "Raise here")

### Donate/Share:

[Donate/Share](https://serveonline.pp.ua/donate.html?mymsg=Thanks%20for%20this%20API%2C%20I%20am%20Fawaz%20Ahmed%20(fawazahmed0)%20developer%20of%20this%20API%2C%20if%20you%20liked%20my%20work%20consider%20donating%20a%20few%20bucks%20to%20me%20or%20at%20least%20share%20it%20with%20friends%2C%20so%20they%20don%27t%20have%20to%20pay%20for%20any%20currency%20API%20Service%3Cbr%3E%20%3Cbr%3E%20Thanks%20in%20Advance&sharelink=https%3A%2F%2Fgithub.com%2Ffawazahmed0%2Fcurrency-api&smallsharetext=Free%20Currency%20Forex%20Rates%20API&largesharetext=Share%20the%20Free%20Currency%20Forex%20Rates%20API%20with%20150%2B%20Currencies%20Available%20%26%20No%20Rate%20Limits&sharebtnmsg=Share%20the%20Free%20Currency%20API&nodonatebtn=)


Also Please Star this repo by clicking on [:star: button](#) above [:arrow_upper_right:](#)

<br>
<br>
<br>

[:pencil2:*Improve this page*](https://github.com/fawazahmed0/currency-api/edit/1/README.md)

