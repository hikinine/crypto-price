import { PriceBot } from "./modules/PriceBot"
import { GetProxies } from "./modules/GetProxies"
import { ValidateConfig } from "./modules/ValidateConfig"

(async () => {
    const getProxies = new GetProxies()
    const priceBot = new PriceBot()
    const validateConfig = new ValidateConfig()

    try {
        validateConfig.execute()

        const proxies = await getProxies.execute()
        priceBot.init(proxies)
    } catch (error) {
        if (error instanceof Error) console.log(error.message)
        process.exit()
    }
})()
