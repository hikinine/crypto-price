"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceBot = void 0;
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
const buildEndpointUrl_1 = require("../utils/buildEndpointUrl");
const fixStringNumberTo2_1 = require("../utils/fixStringNumberTo2");
const config_json_1 = require("../../config.json");
class PriceBot {
    constructor() {
        this.clients = [];
        this.apiResponse = {};
        this.proxies = [];
        this.buildDescriptionPrice = (brl = 0, usd = 0) => {
            const uspFp = (0, fixStringNumberTo2_1.fixStringNumberTo2)(usd);
            if (config_json_1.currencyList.length === 1)
                return `$${uspFp}`;
            const brlFp = (0, fixStringNumberTo2_1.fixStringNumberTo2)(brl);
            if (config_json_1.currencyList.length >= 2)
                return `$${uspFp}│` + `R$ ${brlFp}`;
            return "";
        };
        config_json_1.discordApiKeys.forEach((_) => this.clients.push(new discord_js_1.Client()));
    }
    setActivityOnClient(client, index) {
        var _a, _b, _c;
        const token = config_json_1.currencyIdDecoding[index];
        (_a = client.user) === null || _a === void 0 ? void 0 : _a.setActivity({
            name: this.buildDescriptionPrice((_b = this.apiResponse[token]) === null || _b === void 0 ? void 0 : _b.brl, (_c = this.apiResponse[token]) === null || _c === void 0 ? void 0 : _c.usd),
            type: "PLAYING",
        });
    }
    async fetchCurrency(bot, index) {
        const currencyListJoined = config_json_1.currencyList.join(",");
        const token = config_json_1.currencyIdDecoding.join(",");
        const buildedEnpointUrl = (0, buildEndpointUrl_1.buildEndpointUrl)({
            coinGeckoApiURL: config_json_1.coinGeckoApiURL,
            token,
            currencyListJoined
        });
        /*
          const isProxySet = this.proxyList?.length ? {
            proxy: {
              ...this.proxyList[++proxyIndex % this.proxyList.length]
            }
          } : {}
        */
        try {
            const response = await (0, axios_1.default)(buildedEnpointUrl);
            const data = response.data;
            this.apiResponse = data;
        }
        catch (error) {
            console.log(`> Failed to request endpoint: ${buildedEnpointUrl}`);
        }
    }
    setIntervalCurrencyPrice(client, index) {
        setInterval(() => this.fetchCurrency(client, index), config_json_1.requestIntervalInSeconds);
        setInterval(() => this.setActivityOnClient(client, index), config_json_1.requestIntervalInSeconds + 1000);
    }
    init(proxies) {
        this.proxies = proxies;
        this.clients.forEach((client, index) => {
            client.login(config_json_1.discordApiKeys[index]);
            client.on("ready", async () => {
                console.log(`> ${config_json_1.currencyIdDecoding[index]} is running...`); //Não entendi a utilidade deste console
                this.setIntervalCurrencyPrice(client, index);
            });
        });
    }
    kill() {
        this.clients.forEach((client) => client.destroy());
    }
}
exports.PriceBot = PriceBot;
