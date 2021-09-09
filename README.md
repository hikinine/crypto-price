# Crypto price

Discord bot that return price of currencys based on CoinGencko API.

## Setup



```bash
git clone https://github.com/H9Solutions/crypto-price
``` 

```bash
cd crypto-price && yarn install
```
then, create a config.json based on example file.


## config.json
Create and edit your config.json (you can copy sample with below command)
```bash
cp ./config.example.json ./config.json
```
```json
{
  //Collection of Discord bot token key
  "discordApiKey": [
    "ENTER YOUR API KEY HERE"
  ],

  //Collection of cryptocurrencys (coingecko api reference)
  "currencyIdDecode": [
    "wanaka-farm"
  ],
  
  //Collection of currencys
  "currencyList": [
    "usd",
    "brl"
  ],

  //Do not change this
  "coinGeckoApiURL": "https://api.coingecko.com/api/v3/simple",

  //Interval to refresh price in seconds
  "requestIntervalInSeconds": 25

}
```
then just start your program.
```bash
yarn start
```