import axios from "axios"

import { Client } from "discord.js"
import { IProxy } from "./GetProxies"

import { buildEndpointUrl } from "../utils/buildEndpointUrl"
import { fixStringNumberTo2 } from "../utils/fixStringNumberTo2"

import {
    discordApiKeys, currencyIdDecoding,
    requestIntervalInSeconds, coinGeckoApiURL, currencyList
} from "../../config.json"

interface IApiResponse {
    [key: string]: {
        brl: number
        usd: number
    }
}

class PriceBot {
    private clients: Client[] = []
    private apiResponse: IApiResponse = {}
    private proxies: IProxy[] = []

    constructor() {
        discordApiKeys.forEach((_) => this.clients.push(new Client()))
    }

    private buildDescriptionPrice = (brl: number = 0, usd: number = 0): string => {
        const uspFp = fixStringNumberTo2(usd)
        if (currencyList.length === 1) return `$${uspFp}`
        const brlFp = fixStringNumberTo2(brl)
        if (currencyList.length >= 2) return `$${uspFp}│` + `R$ ${brlFp}`
        return ""
    }

    private setActivityOnClient(client: Client, index: number) {
        const token = currencyIdDecoding[index]

        client.user?.setActivity({
            name: this.buildDescriptionPrice(
                this.apiResponse[token]?.brl,
                this.apiResponse[token]?.usd
            ),
            type: "PLAYING",
        })
    }

    private async fetchCurrency(bot: Client, index: number) {
        const currencyListJoined = currencyList.join(",")
        const token = currencyIdDecoding.join(",")

        const buildedEnpointUrl = buildEndpointUrl({
            coinGeckoApiURL,
            token,
            currencyListJoined
        })

        /*
          const isProxySet = this.proxyList?.length ? {
            proxy: {
              ...this.proxyList[++proxyIndex % this.proxyList.length]
            }
          } : {}
        */

        try {
            const response = await axios(buildedEnpointUrl)
            const data = response.data

            this.apiResponse = data
        } catch (error) {
            console.log(`> Failed to request endpoint: ${buildedEnpointUrl}`)
        }
    }


    private setIntervalCurrencyPrice(client: Client, index: number) {
        setInterval(() => this.fetchCurrency(client, index), requestIntervalInSeconds)
        setInterval(() => this.setActivityOnClient(client, index), requestIntervalInSeconds + 1000)
    }

    public init(proxies: IProxy[]): void {
        this.proxies = proxies

        this.clients.forEach((client, index) => {
            client.login(discordApiKeys[index])

            client.on("ready", async () => {
                console.log(`> ${currencyIdDecoding[index]} is running...`) //Não entendi a utilidade deste console
                this.setIntervalCurrencyPrice(client, index)
            })
        })
    }

    public kill(): void {
        this.clients.forEach((client) => client.destroy())
    }
}

export { PriceBot }