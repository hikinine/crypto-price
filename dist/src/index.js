"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PriceBot_1 = require("./modules/PriceBot");
const GetProxies_1 = require("./modules/GetProxies");
const ValidateConfig_1 = require("./modules/ValidateConfig");
(async () => {
    const getProxies = new GetProxies_1.GetProxies();
    const priceBot = new PriceBot_1.PriceBot();
    const validateConfig = new ValidateConfig_1.ValidateConfig();
    try {
        validateConfig.execute();
        const proxies = await getProxies.execute();
        priceBot.init(proxies);
    }
    catch (error) {
        if (error instanceof Error)
            console.log(error.message);
        process.exit();
    }
})();
