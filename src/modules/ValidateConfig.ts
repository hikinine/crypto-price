import {
    discordApiKeys, currencyIdDecoding,
    requestIntervalInSeconds, coinGeckoApiURL, currencyList
} from "../../config.json"

class ValidateConfig {
    execute(): void {
        if (currencyIdDecoding.length !== discordApiKeys.length)
            throw new Error("'currencyIdDecoding' and 'currencyIdDecoding' need to be equal!")

        if (!coinGeckoApiURL.includes("https"))
            throw new Error("'coinGeckoApiURL' needs to include http!")

        if (currencyList.length <= 0) throw new Error("'currencyList' needs to be > 0!")

        if (typeof requestIntervalInSeconds !== "number")
            throw new Error("'requestIntervalInSeconds' needs to be a number!")

        if (requestIntervalInSeconds <= 5)
            throw new Error("'requestIntervalInSeconds' needs to be > 5 seconds!")
    }
}

export { ValidateConfig }