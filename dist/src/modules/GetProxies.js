"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProxies = void 0;
const axios_1 = __importDefault(require("axios"));
const config_json_1 = require("../../config.json");
class GetProxies {
    constructor() {
        this.proxies = [];
    }
    async execute() {
        const response = await axios_1.default.get(config_json_1.proxyApiUrl, {
            headers: {
                Authorization: config_json_1.proxyApiKey,
            },
        });
        const data = response.data;
        const proxies = data.results;
        proxies.forEach(proxy => {
            const port = proxy.ports.http;
            this.proxies.push({
                auth: {
                    username: proxy.username,
                    password: proxy.password,
                },
                host: proxy.proxy_address,
                port: port,
            });
        });
        return this.proxies;
    }
}
exports.GetProxies = GetProxies;
