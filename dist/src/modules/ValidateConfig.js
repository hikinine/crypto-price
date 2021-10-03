"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateConfig = void 0;
const config_json_1 = require("../../config.json");
class ValidateConfig {
    execute() {
        if (config_json_1.currencyIdDecoding.length !== config_json_1.discordApiKeys.length)
            throw new Error("'currencyIdDecoding' and 'currencyIdDecoding' need to be equal!");
        if (!config_json_1.coinGeckoApiURL.includes("https"))
            throw new Error("'coinGeckoApiURL' needs to include http!");
        if (config_json_1.currencyList.length <= 0)
            throw new Error("'currencyList' needs to be > 0!");
        if (typeof config_json_1.requestIntervalInSeconds !== "number")
            throw new Error("'requestIntervalInSeconds' needs to be a number!");
        if (config_json_1.requestIntervalInSeconds <= 5)
            throw new Error("'requestIntervalInSeconds' needs to be > 5 seconds!");
    }
}
exports.ValidateConfig = ValidateConfig;
