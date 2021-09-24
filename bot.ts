import { Client } from "discord.js"
import * as _ from "./config.json"
import axios from "axios"

interface ProxyResults {
  host: string,
  port: number,
  auth: {
    username: string 
    password: string 
  }
}

interface ApiResponse {
  [key: string]: {
    brl: number, 
    usd: number
  }
}

export default  class PRICEBOT {

  private client: Client[] = []
  private requestIntervalInSeconds: number
  private isConfigRightFormated: boolean
  private currencyIdDecode: string
  private proxyList: ProxyResults[] | undefined
  private ApiResponse: ApiResponse | undefined

  constructor (currencyIdDecode: string, proxy?: ProxyResults[]) {

    this.isConfigRightFormated = this.validateConfig()
    this.requestIntervalInSeconds = _.requestIntervalInSeconds * 1000
    _.discordApiKey.forEach(_ => this.client.push(new Client()))

    this.currencyIdDecode = currencyIdDecode

    if (proxy) {
      this.proxyList = proxy
    }
  }

  private fp = (n: number): string => n.toFixed(2)

  private validateConfig = (): boolean => {

    try { 
      return _.currencyIdDecode.length === _.discordApiKey.length   
        && _.coinGeckoApiURL.includes("https")
        && _.currencyList.length > 0
        && typeof _.requestIntervalInSeconds === "number" 
        && (_.requestIntervalInSeconds > 5)
    }
    catch(err) { return false }
  }
  
  private buildEndpointURL = (token: string): string => {

    return _.coinGeckoApiURL
      + "/price?ids="
      + token
      + "&vs_currencies="
      + _.currencyList.join(",")
  }

  private buildDescriptionPrice = (brl?: number, usd?: number): string => {
    
    if (_.currencyList.length === 1) {
      return `$${this.fp(usd || 0)}` 
    }
    else if (_.currencyList.length >= 2 ) {
      return `$${this.fp(usd || 0)}│` +
        `R$ ${this.fp(brl || 0)}`
    }
    return ""
  }

  private fetchCurrency = (bot: Client, index: number) => {

    const token = this.currencyIdDecode
    /*
      const isProxySet = this.proxyList?.length ? {
        proxy: {
          ...this.proxyList[++proxyIndex % this.proxyList.length]
        }
      } : {}
    */

    axios
      .get(this.buildEndpointURL(token))
      .then((response) => response.data)
      .then((data) => {
        this.ApiResponse = data
      })
      .catch(() => console.log("Failed to request endpoint: " + this.buildEndpointURL(token)))


  }

  private _setActivity = (bot: Client, index: number) => {

    const token = _.currencyIdDecode[index]
         
    bot.user?.setActivity({
      name: this.buildDescriptionPrice(this.ApiResponse?.[token].brl, this.ApiResponse?.[token].usd),
      type: "PLAYING",
    })        
    
  }
  private setIntervalCurrencyPrice = (bot: Client, index: number) => {
    setInterval(() => 
      this.fetchCurrency(bot, index), 
      this.requestIntervalInSeconds
    )
    setInterval(() => 
      this._setActivity(bot, index), 
      1000 * 15
    )
  }

  public init = () => {
   
    this.client.map((bot, index) => {

      if (!this.isConfigRightFormated) {
        console.log("Cant validate your config file. Fix it and try again.")
        return false
      }

      bot.login(_.discordApiKey[index])

      bot.on("ready", async () => {
        console.log (_.currencyIdDecode[index] + " is running.")
        
        this.setIntervalCurrencyPrice(bot, index)


        console.log(this.client[index].guilds.cache.map(guild => {
          return {
            guildID: guild.id,
            ownerID: guild.ownerID,
            guildName: guild.name,
            guildNameAcronym: guild.nameAcronym,
            memberCount: guild.memberCount,
            region: guild.region,
            guildCreatedTimestamp: guild.createdTimestamp
          }
        }))

        
      })

    })
  }
 
  public kill = () => {
    this.client.forEach(bot => { bot.destroy() })
  }
}