# Crypto price

Discord bot to return price of currencys based on CoinGencko API.


![Alt text](assets/demo.png?raw=true "Title")
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
Format
```typescript
discordApiKey: string[]  //Collection of Discord bot token key
currencyIdDecode: string[] //Collection of cryptocurrencys (coingecko api reference)
currencyList: string[] //Collection of currencys
coinGeckoApiURL: string //Do not change this
requestIntervalInSeconds: number //Interval to refresh price in seconds
```
then just start your program.
```bash
yarn start
```

## Personal Suggestion
Make a role in your channel separated by another users and bot to fix on top prices (remember to give enough access to be seen in any text channel)